import { Metadata } from 'next';
import { Download, Smartphone, ShieldCheck, ArrowRight, AlertTriangle } from 'lucide-react';
import { getPublishedReleases } from '@/lib/actions/release-actions';
import { formatBytes, formatDate } from '@/lib/utils';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Download Android APK',
  description: 'Download the official, verified Android installation package (.apk) for Pranata Gatra.',
};

export const dynamic = 'force-dynamic';

export default async function DownloadPage() {
  const publishedReleases = await getPublishedReleases();
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
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900/70 border-2 border-[#B38D46]/30 shadow-2xl relative overflow-hidden">
          <div className="gold-hero-glow -top-24 -right-24 opacity-40 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Release Info */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[#B38D46]/20 border border-[#B38D46]/40 text-[#FFE8B3] text-xs font-bold uppercase tracking-wider">
                  Latest Stable Release
                </span>
                <span className="text-xs text-neutral-400">
                  Published: {formatDate(latestRelease.published_at || latestRelease.created_at)}
                </span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {latestRelease.title}
                </h2>
                <p className="text-[#FFE8B3] font-medium text-sm mt-1">
                  Version {latestRelease.version} (Build {latestRelease.version_code})
                </p>
              </div>

              {/* Specs Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 text-center sm:text-left">
                  <div className="text-[11px] text-neutral-400">File Size</div>
                  <div className="text-sm font-bold text-white mt-0.5 font-mono">{formatBytes(latestRelease.file_size)}</div>
                </div>
                <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 text-center sm:text-left">
                  <div className="text-[11px] text-neutral-400">Min. OS</div>
                  <div className="text-sm font-bold text-white mt-0.5">Android 8.0+</div>
                </div>
                <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 text-center sm:text-left">
                  <div className="text-[11px] text-neutral-400">Architecture</div>
                  <div className="text-sm font-bold text-white mt-0.5">Universal / ARM64</div>
                </div>
                <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 text-center sm:text-left">
                  <div className="text-[11px] text-neutral-400">Integrity</div>
                  <div className="text-sm font-bold text-[#FFE8B3] mt-0.5 flex items-center justify-center sm:justify-start gap-1">
                    <ShieldCheck className="w-4 h-4 text-[#B38D46]" />
                    <span>Verified</span>
                  </div>
                </div>
              </div>

              {/* Changelog Summary */}
              <div className="space-y-2 pt-2 border-t border-neutral-800">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Release Notes & Changelog:
                </h3>
                <div className="text-sm text-neutral-300 whitespace-pre-line bg-neutral-950/70 p-4 rounded-2xl border border-neutral-800/80 font-mono text-xs leading-relaxed max-h-40 overflow-y-auto">
                  {latestRelease.changelog}
                </div>
              </div>
            </div>

            {/* Right Download Button Card */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center gap-4 bg-neutral-950/70 p-7 rounded-3xl border border-neutral-800 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#B38D46]/15 border border-[#B38D46]/30 flex items-center justify-center">
                <Smartphone className="w-8 h-8 text-[#FFE8B3]" />
              </div>

              <div className="space-y-1">
                <div className="text-base font-bold text-white">Ready for Android Install</div>
                <p className="text-xs text-neutral-400">
                  Download package directly to your smartphone and install in seconds.
                </p>
              </div>

              <a
                href={latestRelease.file_path}
                download
                className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-full gold-gradient text-neutral-950 font-bold text-sm shadow-xl shadow-[#B38D46]/25 hover:shadow-[#B38D46]/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download APK Now</span>
              </a>

              <Link
                href="/changelog"
                className="text-xs text-[#FFE8B3] hover:text-white font-medium inline-flex items-center gap-1 transition-colors"
              >
                <span>View all past versions</span>
                <ArrowRight className="w-3 h-3 text-[#B38D46]" />
              </Link>
            </div>
          </div>
        </div>
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
                      <a
                        href={release.file_path}
                        download
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-[#B38D46]/20 text-[#FFE8B3] border border-neutral-700 hover:border-[#B38D46]/40 text-xs font-semibold transition-all"
                      >
                        <Download className="w-3.5 h-3.5 text-[#B38D46]" />
                        <span>Download</span>
                      </a>
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
