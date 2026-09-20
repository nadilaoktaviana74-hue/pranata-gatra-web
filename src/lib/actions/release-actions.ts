'use server';

import { createClient, createAdminClient } from '@/lib/supabase/server';
import { Release, ReleaseStatus } from '@/types/database';
import { revalidatePath } from 'next/cache';

export async function getPublishedReleases(): Promise<Release[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('releases')
      .select('*')
      .eq('status', 'PUBLISHED')
      .order('version_code', { ascending: false });

    if (error) {
      console.error('Error fetching published releases:', error);
      return [];
    }

    return (data as unknown as Release[]) || [];
  } catch (err) {
    console.error('Unexpected error fetching published releases:', err);
    return [];
  }
}

export async function getLatestRelease(): Promise<Release | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('releases')
      .select('*')
      .eq('status', 'PUBLISHED')
      .order('version_code', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      // If no published release found, it's normal initially
      return null;
    }

    return data as unknown as Release;
  } catch {
    return null;
  }
}

export async function getAllReleases(): Promise<Release[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('releases')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all releases:', error);
      return [];
    }

    return (data as unknown as Release[]) || [];
  } catch (err) {
    console.error('Unexpected error fetching all releases:', err);
    return [];
  }
}

export async function createRelease(formData: FormData) {
  try {
    const version = formData.get('version') as string;
    const versionCodeRaw = formData.get('version_code') as string;
    const title = formData.get('title') as string;
    const changelog = formData.get('changelog') as string;
    const status = (formData.get('status') as ReleaseStatus) || 'DRAFT';
    const apkFile = formData.get('apk_file') as File | null;

    if (!version || !versionCodeRaw || !title || !changelog) {
      return { success: false, error: 'Harap lengkapi semua kolom yang wajib diisi.' };
    }

    const version_code = parseInt(versionCodeRaw, 10);
    if (isNaN(version_code)) {
      return { success: false, error: 'Version code harus berupa angka integer valid.' };
    }

    if (!apkFile || apkFile.size === 0) {
      return { success: false, error: 'File APK wajib diunggah.' };
    }

    // Check extension
    if (!apkFile.name.toLowerCase().endsWith('.apk')) {
      return { success: false, error: 'File yang diunggah harus berekstensi .apk' };
    }

    const adminClient = createAdminClient();
    const safeFileName = `releases/${Date.now()}_v${version.replace(/[^a-zA-Z0-9.-]/g, '_')}_${apkFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

    const fileBuffer = await apkFile.arrayBuffer();
    const { error: uploadError } = await adminClient.storage
      .from('apks')
      .upload(safeFileName, fileBuffer, {
        contentType: 'application/vnd.android.package-archive',
        upsert: false,
      });

    if (uploadError) {
      console.error('Error uploading APK to Supabase Storage:', uploadError);
      return { success: false, error: `Gagal mengunggah file APK: ${uploadError.message}` };
    }

    const { data: publicUrlData } = adminClient.storage.from('apks').getPublicUrl(safeFileName);
    const file_path = publicUrlData.publicUrl;
    const file_size = apkFile.size;

    const published_at = status === 'PUBLISHED' ? new Date().toISOString() : null;

    const insertPayload = {
      version,
      version_code,
      title,
      changelog,
      file_path,
      file_size,
      status,
      published_at,
    };

    const { data: insertedData, error: dbError } = await adminClient
      .from('releases')
      .insert(insertPayload as any)
      .select()
      .single();

    if (dbError) {
      console.error('Error inserting release to DB:', dbError);
      return { success: false, error: `Gagal menyimpan metadata rilis: ${dbError.message}` };
    }

    revalidatePath('/');
    revalidatePath('/download');
    revalidatePath('/changelog');
    revalidatePath('/admin/dashboard');
    revalidatePath('/admin/dashboard/releases');

    return { success: true, release: insertedData as unknown as Release };
  } catch (err: any) {
    console.error('Unexpected error creating release:', err);
    return { success: false, error: err?.message || 'Terjadi kesalahan sistem saat membuat rilis.' };
  }
}

export async function updateReleaseStatus(id: string, status: ReleaseStatus) {
  try {
    const adminClient = createAdminClient();
    
    // Check if transition to published
    const updatePayload: any = { status };
    if (status === 'PUBLISHED') {
      updatePayload.published_at = new Date().toISOString();
    }

    const { error } = await (adminClient.from('releases') as any)
      .update(updatePayload)
      .eq('id', id);

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath('/');
    revalidatePath('/download');
    revalidatePath('/changelog');
    revalidatePath('/admin/dashboard');
    revalidatePath('/admin/dashboard/releases');

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Gagal mengubah status rilis.' };
  }
}

export async function deleteRelease(id: string) {
  try {
    const adminClient = createAdminClient();

    // Fetch existing release to get file_path
    const { data } = await adminClient
      .from('releases')
      .select('file_path')
      .eq('id', id)
      .single();

    const release = data as any;
    if (release && release.file_path) {
      try {
        const url = new URL(release.file_path);
        const parts = url.pathname.split('/apks/');
        if (parts.length > 1) {
          const storagePath = decodeURIComponent(parts[1]);
          await adminClient.storage.from('apks').remove([storagePath]);
        }
      } catch (e) {
        console.warn('Could not parse or remove storage file:', e);
      }
    }

    const { error } = await adminClient.from('releases').delete().eq('id', id);

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath('/');
    revalidatePath('/download');
    revalidatePath('/changelog');
    revalidatePath('/admin/dashboard');
    revalidatePath('/admin/dashboard/releases');

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Gagal menghapus rilis.' };
  }
}
