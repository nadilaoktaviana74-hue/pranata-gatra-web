'use server';

import { createClient, createAdminClient } from '@/lib/supabase/server';
import { BugReport, BugStatus } from '@/types/database';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const BugReportSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(255),
  email: z.string().email('Invalid email address format').max(255),
  title: z.string().min(4, 'Title must be at least 4 characters').max(255),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  app_version: z.string().min(1, 'Application version is required').max(50),
  device: z.string().min(1, 'Device model is required').max(100),
  os_version: z.string().min(1, 'Android / OS version is required').max(100),
});

export async function submitBugReport(formData: FormData) {
  try {
    const rawData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      app_version: formData.get('app_version') as string,
      device: formData.get('device') as string,
      os_version: formData.get('os_version') as string,
    };

    const validated = BugReportSchema.safeParse(rawData);
    if (!validated.success) {
      const firstError = validated.error.issues[0]?.message || 'Invalid input provided.';
      return { success: false, error: firstError };
    }

    const attachment = formData.get('attachment') as File | null;
    let attachment_path: string | null = null;

    const adminClient = createAdminClient();

    if (attachment && attachment.size > 0) {
      if (attachment.size > 10 * 1024 * 1024) {
        return { success: false, error: 'Attachment file size exceeds 10MB limit.' };
      }

      const safeName = `reports/${Date.now()}_${attachment.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const buffer = await attachment.arrayBuffer();

      const { error: uploadError } = await adminClient.storage
        .from('bug-attachments')
        .upload(safeName, buffer, {
          contentType: attachment.type || 'application/octet-stream',
          upsert: false,
        });

      if (uploadError) {
        console.error('Error uploading bug attachment:', uploadError);
        return { success: false, error: `Failed to upload attachment: ${uploadError.message}` };
      }

      attachment_path = safeName;
    }

    const { data: inserted, error: dbError } = await adminClient
      .from('bug_reports')
      .insert({
        name: validated.data.name,
        email: validated.data.email,
        title: validated.data.title,
        description: validated.data.description,
        app_version: validated.data.app_version,
        device: validated.data.device,
        os_version: validated.data.os_version,
        attachment_path,
        status: 'OPEN' as BugStatus,
      })
      .select()
      .single();

    if (dbError) {
      console.error('Error inserting bug report:', dbError);
      return { success: false, error: `Failed to save bug report: ${dbError.message}` };
    }

    revalidatePath('/admin/dashboard');
    revalidatePath('/admin/dashboard/bug-reports');

    return { success: true, bugReport: inserted as unknown as BugReport };
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : 'System error while submitting bug report.';
    console.error('Unexpected error submitting bug report:', err);
    return { success: false, error: errorMsg };
  }
}

export async function getBugReports(status?: string): Promise<BugReport[]> {
  try {
    const supabase = await createClient();
    let query = supabase
      .from('bug_reports')
      .select('*')
      .order('created_at', { ascending: false });

    if (status && status !== 'ALL') {
      query = query.eq('status', status as BugStatus);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching bug reports:', error);
      return [];
    }

    return (data as unknown as BugReport[]) || [];
  } catch (err) {
    console.error('Unexpected error fetching bug reports:', err);
    return [];
  }
}

export async function updateBugStatus(id: string, status: BugStatus) {
  try {
    const adminClient = createAdminClient();
    const { error } = await adminClient
      .from('bug_reports')
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath('/admin/dashboard');
    revalidatePath('/admin/dashboard/bug-reports');

    return { success: true };
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to update bug report status.';
    return { success: false, error: errorMsg };
  }
}

export async function getAttachmentSignedUrl(attachmentPath: string): Promise<string | null> {
  try {
    if (!attachmentPath) return null;
    const adminClient = createAdminClient();
    const { data, error } = await adminClient.storage
      .from('bug-attachments')
      .createSignedUrl(attachmentPath, 3600);

    if (error || !data?.signedUrl) {
      console.error('Error creating signed URL for attachment:', error);
      return null;
    }

    return data.signedUrl;
  } catch (err) {
    console.error('Unexpected error getting signed URL:', err);
    return null;
  }
}

export async function getDashboardStats() {
  try {
    const adminClient = createAdminClient();

    const { data: releases } = await adminClient.from('releases').select('status');
    const allReleases = (releases as Array<{ status: string }> | null) || [];
    const totalReleases = allReleases.length;
    const publishedReleases = allReleases.filter(r => r.status === 'PUBLISHED').length;

    const { data: bugs } = await adminClient.from('bug_reports').select('status');
    const allBugs = (bugs as Array<{ status: string }> | null) || [];
    const totalBugReports = allBugs.length;
    const openBugs = allBugs.filter(b => b.status === 'OPEN').length;
    const resolvedBugs = allBugs.filter(b => b.status === 'RESOLVED').length;

    return {
      totalReleases,
      publishedReleases,
      totalBugReports,
      openBugs,
      resolvedBugs,
    };
  } catch (err) {
    console.error('Error fetching dashboard stats:', err);
    return {
      totalReleases: 0,
      publishedReleases: 0,
      totalBugReports: 0,
      openBugs: 0,
      resolvedBugs: 0,
    };
  }
}
