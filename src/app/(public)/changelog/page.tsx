import { Metadata } from 'next';
import { History, Download, Calendar, Tag, Sparkles, HardDrive, ArrowRight } from 'lucide-react';
import { getPublishedReleases } from '@/lib/actions/release-actions';
import { formatBytes, formatDate } from '@/lib/utils';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Changelog & Releases',
  description: 'Version history, new features, and bug fixes for the Pranata Gatra Android application.',
};

export const dynamic = 'force-dynamic';

export default async function ChangelogPage() {
  const publishedReleases = await getPublishedReleases();

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B38D46]/10 border border-[#B38D46]/25 text-[#FFE8B3] text-xs font-semibold">
          <History className="w-3.5 h-3.5 text-[#B38D46]" />
          <span>Release Chronicle</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Release History & <span className="gold-gradient-text">Changelogs</span>
        </h1>
        <p className="text-neutral-300 text-base leading-relaxed max-w-2xl mx-auto">
          Trace every update, feature expansion, and stability enhancement across all verified Android releases.
        </p>
      </div>

      {/* Timeline Section */}
      {publishedReleases.length > 0 ? (
        <div className="relative border-l-2 border-neutral-800 ml-4 sm:ml-8 space-y-12 py-4">
          {publishedReleases.map((release, index) => {
            const isLatest = index === 0;

            return (
              <div key={release.id} className="relative pl-6 sm:pl-10">
                {/* Timeline Node Badge */}
                <div
                  className={`absolute -left-[17px] top-1 w-8 h-8 rounded-full border-4 border-[#09090b] flex items-center justify-center ${
                    isLatest
                      ? 'gold-gradient text-neutral-950 shadow-lg shadow-[#B38D46]/30 ring-4 ring-[#B38D46]/20'
                      : 'bg-neutral-800 text-neutral-400'
                  }`}
                >
                  {isLatest ? <Sparkles className="w-3.5 h-3.5 text-neutral-950" /> : <Tag className="w-3 h-3" />}
                </div>

                {/* Release Card */}
                <div
                  className={`p-6 sm:p-8 rounded-3xl border transition-all ${
                    isLatest
                      ? 'bg-neutral-900/80 border-[#B38D46]/40 shadow-xl shadow-black/50'
                      : 'bg-neutral-900/40 border-neutral-800/80 hover:border-neutral-700'
                  }`}
                >
                  {/* Top Bar Info */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-neutral-800">
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                        <span>v{release.version}</span>
                        {isLatest && (
                          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#B38D46]/20 text-[#FFE8B3] border border-[#B38D46]/30 font-semibold uppercase tracking-wider">
                            Latest
                          </span>
                        )}
                      </h2>
                      <span className="text-xs text-neutral-400">
                        (Build {release.version_code})
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-neutral-400">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                        <span>{formatDate(release.published_at || release.created_at)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <HardDrive className="w-3.5 h-3.5 text-neutral-500" />
                        <span className="font-mono">{formatBytes(release.file_size)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <div className="pt-4 pb-2">
                    <h3 className="text-base sm:text-lg font-semibold text-[#FFE8B3]">
                      {release.title}
                    </h3>
                  </div>

                  {/* Changelog Content */}
                  <div className="pt-2 text-sm text-neutral-300 whitespace-pre-line leading-relaxed font-sans bg-neutral-950/60 p-4 rounded-2xl border border-neutral-800/80">
                    {release.changelog}
                  </div>

                  {/* Action */}
                  <div className="pt-5 flex items-center justify-between">
                    <span className="text-xs text-neutral-500 font-mono">
                      Format: .apk | Status: PUBLISHED
                    </span>
                    <a
                      href={release.file_path}
                      download
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#B38D46]/15 hover:bg-[#B38D46]/25 text-[#FFE8B3] font-semibold text-xs border border-[#B38D46]/30 transition-all"
                    >
                      <Download className="w-3.5 h-3.5 text-[#B38D46]" />
                      <span>Download v{release.version}</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-4">
          <History className="w-10 h-10 text-[#B38D46] mx-auto" />
          <h2 className="text-xl font-bold text-white">No Release Notes Available</h2>
          <p className="text-sm text-neutral-400 max-w-md mx-auto">
            Public release logs will automatically appear here once published via the administrative console.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-[#FFE8B3] hover:underline pt-2"
          >
            <span>Return to Home</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      )}
    </div>
  );
}
