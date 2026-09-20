import { Metadata } from 'next';
import { History, Download, Calendar, Tag, CheckCircle2, Sparkles, HardDrive, ArrowRight } from 'lucide-react';
import { getPublishedReleases } from '@/lib/actions/release-actions';
import { formatBytes, formatDate } from '@/lib/utils';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Riwayat Catatan Rilis (Changelog)',
  description: 'Daftar log perubahan lengkap, perbaikan bug, dan fitur baru pada setiap versi rilis aplikasi Android Pranata Gatra.',
};

export const dynamic = 'force-dynamic';

export default async function ChangelogPage() {
  const publishedReleases = await getPublishedReleases();

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-semibold">
          <History className="w-3.5 h-3.5 text-cyan-400" />
          <span>Transparansi Pembaruan</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Catatan Rilis & <span className="gradient-text">Changelog</span>
        </h1>
        <p className="text-slate-300 text-base leading-relaxed max-w-2xl mx-auto">
          Pantau seluruh evolusi fitur baru, optimasi performa, dan penanganan bug pada setiap versi aplikasi Android Pranata Gatra.
        </p>
      </div>

      {/* Timeline Section */}
      {publishedReleases.length > 0 ? (
        <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-8 space-y-12 py-4">
          {publishedReleases.map((release, index) => {
            const isLatest = index === 0;

            return (
              <div key={release.id} className="relative pl-6 sm:pl-10">
                {/* Timeline Node Badge */}
                <div
                  className={`absolute -left-[17px] top-1 w-8 h-8 rounded-full border-4 border-[#090d16] flex items-center justify-center ${
                    isLatest
                      ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30 ring-4 ring-cyan-500/20'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {isLatest ? <Sparkles className="w-3.5 h-3.5" /> : <Tag className="w-3 h-3" />}
                </div>

                {/* Release Card */}
                <div
                  className={`p-6 sm:p-8 rounded-2xl border transition-all ${
                    isLatest
                      ? 'bg-gradient-to-br from-slate-900/90 to-[#0c1424] border-cyan-500/30 shadow-xl shadow-cyan-950/30'
                      : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  {/* Top Bar Info */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                        <span>v{release.version}</span>
                        {isLatest && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold uppercase tracking-wider">
                            Terbaru
                          </span>
                        )}
                      </h2>
                      <span className="text-xs text-slate-400">
                        (Build {release.version_code})
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        <span>{formatDate(release.published_at || release.created_at)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <HardDrive className="w-3.5 h-3.5 text-slate-500" />
                        <span>{formatBytes(release.file_size)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <div className="pt-4 pb-2">
                    <h3 className="text-base sm:text-lg font-semibold text-cyan-300">
                      {release.title}
                    </h3>
                  </div>

                  {/* Changelog Content */}
                  <div className="pt-2 text-sm text-slate-300 whitespace-pre-line leading-relaxed font-sans bg-slate-950/50 p-4 rounded-xl border border-slate-800/80">
                    {release.changelog}
                  </div>

                  {/* Action */}
                  <div className="pt-5 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-mono">
                      Format: .apk | Status: PUBLISHED
                    </span>
                    <a
                      href={release.file_path}
                      download
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 font-semibold text-xs border border-cyan-500/30 transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Unduh Versi Ini</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <History className="w-10 h-10 text-cyan-400 mx-auto" />
          <h2 className="text-xl font-bold text-white">Belum Ada Riwayat Rilis</h2>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Seluruh catatan rilis versi publik akan otomatis muncul di sini setelah dipublikasikan melalui panel admin.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-cyan-400 hover:underline pt-2"
          >
            <span>Kembali ke Beranda</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      )}
    </div>
  );
}
