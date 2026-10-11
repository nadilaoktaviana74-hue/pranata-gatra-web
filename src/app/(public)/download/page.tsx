import { Metadata } from 'next';
import { Download, AlertTriangle } from 'lucide-react';
import { getPublishedReleases } from '@/lib/actions/release-actions';
import { formatBytes, formatDate } from '@/lib/utils';
import { ReleaseCard } from '@/components/releases/ReleaseCard';
import { DownloadApkButton } from '@/components/releases/DownloadApkButton';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Download Android APK',
  description: 'Download the official, verified Android installation package (.apk) for Pranata Gatra.',
};

export const dynamic = 'force-dynamic';

export default async function DownloadPage() {
  const publishedReleases = await getPublishedReleases();
  // Ensure the top item in the query result is treated as the primary/pinned latest release
  const latestRelease = publishedReleases.length > 0 ? publishedReleases[0] : null;
  const olderReleases = publishedReleases.length > 1 ? publishedReleases.slice(1) : [];

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 pb-24 pt-24 sm:pt-28">
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B38D46]/10 border border-[#B38D46]/25 text-[#FFE8B3] text-xs font-semibold">
          <Download className="w-3.5 h-3.5 text-[#B38D46]" />
          <span>Official Distribution Channel</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Download <span className="gold-gradient-text">Pranata Gatra APK</span>
        </h1>
        <p className="text-neutral-300 text-base leading-relaxed">
          Obtain the official Android application package (.apk) verified for stability and cryptographic integrity. Direct downloads hosted via cloud storage.
        </p>
      </div>

      {/* Main Release Card */}
      {latestRelease ? (
        <ReleaseCard release={latestRelease} isLatest />
      ) : (
        /* Empty State */
        <div className="p-12 text-center rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-4 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-[#B38D46]/15 border border-[#B38D46]/30 flex items-center justify-center mx-auto">
            <Download className="w-8 h-8 text-[#FFE8B3]" />
          </div>
          <h2 className="text-xl font-bold text-white">No Public Release Currently Published</h2>
          <p className="text-sm text-neutral-400 leading-relaxed">
            The engineering team is finalizing the upcoming stable release. Please check back shortly or access the admin console to publish an active build.
          </p>
          <Link
            href="/admin/login"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-[#FFE8B3] text-xs font-semibold border border-neutral-700 transition-all"
          >
            <span>Admin Console</span>
          </Link>
        </div>
      )}

      {/* Older Releases Table */}
      {olderReleases.length > 0 && (
        <div className="space-y-6 pt-8 border-t border-neutral-800/80">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Previous Stable Releases</h2>
            <p className="text-xs text-neutral-400">Archive of older published packages available for legacy testing</p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-neutral-800 bg-neutral-900/60">
            <table className="w-full text-left text-sm text-neutral-300">
              <thead className="bg-neutral-950/80 text-xs font-semibold text-neutral-400 uppercase tracking-wider border-b border-neutral-800">
                <tr>
                  <th className="py-4 px-6">Version</th>
                  <th className="py-4 px-6">Title</th>
                  <th className="py-4 px-6">File Size</th>
                  <th className="py-4 px-6">Published Date</th>
                  <th className="py-4 px-6 text-right">Download</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                {olderReleases.map((release) => (
                  <tr key={release.id} className="hover:bg-neutral-800/40 transition-colors">
                    <td className="py-4 px-6 font-semibold text-white">
                      v{release.version}
                      <span className="text-xs text-neutral-500 font-normal block sm:inline sm:ml-2">
                        (Code: {release.version_code})
                      </span>
                    </td>
                    <td className="py-4 px-6 text-neutral-200">
                      {release.title}
                    </td>
                    <td className="py-4 px-6 text-neutral-400 font-mono text-xs">
                      {formatBytes(release.file_size)}
                    </td>
                    <td className="py-4 px-6 text-neutral-400 text-xs">
                      {formatDate(release.published_at || release.created_at)}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <DownloadApkButton
                        release={release}
                        customLabel="Download"
                        size="sm"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-[#B38D46]/20 text-[#FFE8B3] border border-neutral-700 hover:border-[#B38D46]/40 text-xs font-semibold transition-all"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Step-by-Step Android Installation Guide */}
      <div className="p-8 rounded-3xl bg-neutral-900/40 border border-neutral-800 space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-[#B38D46]" />
          <span>Step-by-Step Android Installation Guide</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="space-y-2 p-5 rounded-2xl bg-neutral-950/70 border border-neutral-800/80">
            <span className="w-6 h-6 rounded-full bg-[#B38D46]/20 text-[#FFE8B3] text-xs font-bold flex items-center justify-center">
              1
            </span>
            <div className="font-semibold text-white">Download APK File</div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Click the download button above on your Android browser to download the .apk file to your device storage.
            </p>
          </div>

          <div className="space-y-2 p-5 rounded-2xl bg-neutral-950/70 border border-neutral-800/80">
            <span className="w-6 h-6 rounded-full bg-[#B38D46]/20 text-[#FFE8B3] text-xs font-bold flex items-center justify-center">
              2
            </span>
            <div className="font-semibold text-white">Allow Unknown Apps</div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              If prompted by Android security, open Settings &gt; Security &gt; Allow Installation from this Source.
            </p>
          </div>

          <div className="space-y-2 p-5 rounded-2xl bg-neutral-950/70 border border-neutral-800/80">
            <span className="w-6 h-6 rounded-full bg-[#B38D46]/20 text-[#FFE8B3] text-xs font-bold flex items-center justify-center">
              3
            </span>
            <div className="font-semibold text-white">Complete Installation</div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Tap the downloaded file from notifications or file manager, choose &quot;Install&quot;, and launch Pranata Gatra.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
