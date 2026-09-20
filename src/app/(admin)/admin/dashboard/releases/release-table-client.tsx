'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Download, 
  Trash2, 
  Check, 
  Clock, 
  Archive, 
  Loader2, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { toast } from 'sonner';
import { Release, ReleaseStatus } from '@/types/database';
import { updateReleaseStatus, deleteRelease } from '@/lib/actions/release-actions';
import { formatBytes, formatDate } from '@/lib/utils';

interface ReleaseTableClientProps {
  initialReleases: Release[];
}

export function ReleaseTableClient({ initialReleases }: ReleaseTableClientProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const router = useRouter();

  const handleStatusChange = async (id: string, newStatus: ReleaseStatus) => {
    setLoadingId(id);
    const toastId = toast.loading(`Mengubah status rilis ke ${newStatus}...`);

    try {
      const res = await updateReleaseStatus(id, newStatus);
      if (res.success) {
        toast.success(`Status rilis berhasil diubah menjadi ${newStatus}`, { id: toastId });
        router.refresh();
      } else {
        toast.error(res.error || 'Gagal mengubah status', { id: toastId });
      }
    } catch {
      toast.error('Terjadi kesalahan jaringan.', { id: toastId });
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id: string, version: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus rilis v${version}? Berkas APK pada storage juga akan dihapus.`)) {
      return;
    }

    setLoadingId(id);
    const toastId = toast.loading(`Menghapus rilis v${version}...`);

    try {
      const res = await deleteRelease(id);
      if (res.success) {
        toast.success(`Rilis v${version} berhasil dihapus.`, { id: toastId });
        router.refresh();
      } else {
        toast.error(res.error || 'Gagal menghapus rilis', { id: toastId });
      }
    } catch {
      toast.error('Terjadi kesalahan jaringan.', { id: toastId });
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/70">
      <table className="w-full text-left text-xs text-slate-300">
        <thead className="bg-slate-950/80 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
          <tr>
            <th className="py-4 px-5">Versi & Code</th>
            <th className="py-4 px-5">Judul Rilis</th>
            <th className="py-4 px-5">Ukuran Berkas</th>
            <th className="py-4 px-5">Status</th>
            <th className="py-4 px-5">Tanggal Publikasi</th>
            <th className="py-4 px-5 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60">
          {initialReleases.length > 0 ? (
            initialReleases.map((release) => {
              const isLoading = loadingId === release.id;

              return (
                <tr key={release.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-5 font-bold text-white">
                    v{release.version}
                    <span className="block text-[10px] text-slate-500 font-normal">
                      Code: {release.version_code}
                    </span>
                  </td>

                  <td className="py-4 px-5">
                    <div className="font-semibold text-slate-200 max-w-xs truncate">
                      {release.title}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate max-w-xs">
                      {release.changelog.slice(0, 60)}...
                    </div>
                  </td>

                  <td className="py-4 px-5 font-mono text-slate-300">
                    {formatBytes(release.file_size)}
                  </td>

                  <td className="py-4 px-5">
                    <div className="flex items-center gap-1.5">
                      <select
                        disabled={isLoading}
                        value={release.status}
                        onChange={(e) => handleStatusChange(release.id, e.target.value as ReleaseStatus)}
                        className={`text-[10px] font-bold px-2.5 py-1.5 rounded-lg border outline-none cursor-pointer ${
                          release.status === 'PUBLISHED'
                            ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                            : release.status === 'ARCHIVED'
                            ? 'bg-slate-800 text-slate-400 border-slate-700'
                            : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                        }`}
                      >
                        <option value="DRAFT" className="bg-slate-900 text-amber-400">DRAFT</option>
                        <option value="PUBLISHED" className="bg-slate-900 text-emerald-400">PUBLISHED</option>
                        <option value="ARCHIVED" className="bg-slate-900 text-slate-400">ARCHIVED</option>
                      </select>
                    </div>
                  </td>

                  <td className="py-4 px-5 text-slate-400">
                    {formatDate(release.published_at || release.created_at)}
                  </td>

                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {release.file_path && (
                        <a
                          href={release.file_path}
                          download
                          title="Download Berkas APK"
                          className="p-2 rounded-lg text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </a>
                      )}

                      <button
                        type="button"
                        disabled={isLoading}
                        onClick={() => handleDelete(release.id, release.version)}
                        title="Hapus Rilis"
                        className="p-2 rounded-lg text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-colors disabled:opacity-50"
                      >
                        {isLoading ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={6} className="py-12 text-center text-slate-500">
                Belum ada rilis APK yang diunggah. Klik tombol &quot;Buat Rilis APK Baru&quot; di atas untuk menambahkan rilis.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
