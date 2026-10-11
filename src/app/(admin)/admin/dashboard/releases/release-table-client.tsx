'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Download, 
  Trash2, 
  Loader2
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
    const toastId = toast.loading(`Updating release status to ${newStatus}...`);

    try {
      const res = await updateReleaseStatus(id, newStatus);
      if (res.success) {
        toast.success(`Release status updated to ${newStatus}`, { id: toastId });
        router.refresh();
      } else {
        toast.error(res.error || 'Failed to update release status', { id: toastId });
      }
    } catch {
      toast.error('A network error occurred.', { id: toastId });
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id: string, version: string) => {
    if (!confirm(`Are you sure you want to delete release v${version}? The APK file will also be removed from storage.`)) {
      return;
    }

    setLoadingId(id);
    const toastId = toast.loading(`Deleting release v${version}...`);

    try {
      const res = await deleteRelease(id);
      if (res.success) {
        toast.success(`Release v${version} deleted successfully.`, { id: toastId });
        router.refresh();
      } else {
        toast.error(res.error || 'Failed to delete release', { id: toastId });
      }
    } catch {
      toast.error('A network error occurred.', { id: toastId });
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-neutral-800 bg-neutral-900/70">
      <table className="w-full text-left text-xs text-neutral-300">
        <thead className="bg-neutral-950/80 text-neutral-400 font-semibold uppercase tracking-wider border-b border-neutral-800">
          <tr>
            <th className="py-4 px-5">Version & Build</th>
            <th className="py-4 px-5">Release Title</th>
            <th className="py-4 px-5">File Size</th>
            <th className="py-4 px-5">Publication Status</th>
            <th className="py-4 px-5">Published Date</th>
            <th className="py-4 px-5 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-800/60">
          {initialReleases.length > 0 ? (
            initialReleases.map((release) => {
              const isLoading = loadingId === release.id;

              return (
                <tr key={release.id} className="hover:bg-neutral-800/40 transition-colors">
                  <td className="py-4 px-5 font-bold text-white">
                    v{release.version}
                    <span className="block text-[10px] text-neutral-500 font-normal">
                      Build Code: {release.version_code}
                    </span>
                  </td>

                  <td className="py-4 px-5">
                    <div className="font-semibold text-neutral-200 max-w-xs truncate">
                      {release.title}
                    </div>
                    <div className="text-[10px] text-neutral-400 truncate max-w-xs">
                      {release.changelog.slice(0, 60)}...
                    </div>
                  </td>

                  <td className="py-4 px-5 font-mono text-neutral-300">
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
                            ? 'bg-neutral-800 text-neutral-400 border-neutral-700'
                            : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                        }`}
                      >
                        <option value="DRAFT" className="bg-neutral-900 text-amber-400">DRAFT</option>
                        <option value="PUBLISHED" className="bg-neutral-900 text-emerald-400">PUBLISHED</option>
                        <option value="ARCHIVED" className="bg-neutral-900 text-neutral-400">ARCHIVED</option>
                      </select>
                    </div>
                  </td>

                  <td className="py-4 px-5 text-neutral-400">
                    {formatDate(release.published_at || release.created_at)}
                  </td>

                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {(release.file_path || release.download_url) && (
                        <a
                          href={(release.download_url || release.file_path)!}
                          download
                          title="Download APK File"
                          className="p-2 rounded-lg text-[#FFE8B3] hover:text-white bg-[#B38D46]/10 hover:bg-[#B38D46]/20 border border-[#B38D46]/20 transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </a>
                      )}

                      <button
                        type="button"
                        disabled={isLoading}
                        onClick={() => handleDelete(release.id, release.version)}
                        title="Delete Release"
                        className="p-2 rounded-lg text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-colors disabled:opacity-50 cursor-pointer"
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
              <td colSpan={6} className="py-12 text-center text-neutral-500">
                No releases uploaded yet. Click &quot;Upload New APK Release&quot; above to create one.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
