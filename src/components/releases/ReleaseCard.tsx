import React from 'react';
import Link from 'next/link';
import { Smartphone, ShieldCheck, ArrowRight } from 'lucide-react';
import { Release } from '@/types/database';
import { formatBytes, formatDate } from '@/lib/utils';
import { DownloadApkButton } from './DownloadApkButton';

interface ReleaseCardProps {
  release: Release;
  isLatest?: boolean;
}

export function ReleaseCard({ release, isLatest = true }: ReleaseCardProps) {
  return (
    <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900/70 border-2 border-[#B38D46]/30 shadow-2xl relative overflow-hidden">
      <div className="gold-hero-glow -top-24 -right-24 opacity-40 pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Release Info */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            {isLatest && (
              <span className="px-3 py-1 rounded-full bg-[#B38D46]/20 border border-[#B38D46]/40 text-[#FFE8B3] text-xs font-bold uppercase tracking-wider">
                Latest Stable Release
              </span>
            )}
            <span className="text-xs text-neutral-400">
              Published: {formatDate(release.published_at || release.created_at)}
            </span>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {release.title}
            </h2>
            <p className="text-[#FFE8B3] font-medium text-sm mt-1">
              Version {release.version} (Build {release.version_code})
            </p>
          </div>

          {/* Specs Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 text-center sm:text-left">
              <div className="text-[11px] text-neutral-400">File Size</div>
              <div className="text-sm font-bold text-white mt-0.5 font-mono">{formatBytes(release.file_size)}</div>
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
              {release.changelog}
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

          {/* Dynamic APK Download button bound to latestRelease */}
          <DownloadApkButton
            release={release}
            className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-full gold-gradient text-neutral-950 font-bold text-sm shadow-xl shadow-[#B38D46]/25 hover:shadow-[#B38D46]/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
          />

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
  );
}

export default ReleaseCard;
