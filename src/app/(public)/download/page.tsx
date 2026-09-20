import { Metadata } from 'next';
import { Download, Smartphone, CheckCircle, AlertTriangle, ShieldCheck, HardDrive, Calendar, FileCode, ArrowRight } from 'lucide-react';
import { getPublishedReleases } from '@/lib/actions/release-actions';
import { formatBytes, formatDate } from '@/lib/utils';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Download APK Android',
  description: 'Unduh rilis resmi aplikasi Android Pranata Gatra langsung dari cloud storage terverifikasi.',
};

export const dynamic = 'force-dynamic';

export default async function DownloadPage() {
  const publishedReleases = await getPublishedReleases();
  const latestRelease = publishedReleases.length > 0 ? publishedReleases[0] : null;
  const olderReleases = publishedReleases.length > 1 ? publishedReleases.slice(1) : [];

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-semibold">
          <Download className="w-3.5 h-3.5 text-cyan-400" />
          <span>Pusat Distribusi Resmi APK</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Unduh Aplikasi <span className="gradient-text">Pranata Gatra</span>
        </h1>
        <p className="text-slate-300 text-base leading-relaxed">
          Dapatkan paket instalasi Android (.apk) versi stabil dan teruji. Selalu pastikan mengunduh dari tautan resmi untuk menjamin integritas dan keamanan data instansi Anda.
        </p>
      </div>

      {/* Main Release Card */}
      {latestRelease ? (
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900/95 via-[#0d1627] to-slate-900/95 border-2 border-cyan-500/30 shadow-2xl shadow-cyan-950/40 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Release Info */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  Rilis Terbaru (Stabil)
                </span>
                <span className="text-xs text-slate-400">
                  Dipublikasikan: {formatDate(latestRelease.published_at || latestRelease.created_at)}
                </span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {latestRelease.title}
                </h2>
                <p className="text-cyan-400 font-medium text-sm mt-1">
                  Versi {latestRelease.version} (Build {latestRelease.version_code})
                </p>
              </div>

              {/* Specs Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-center sm:text-left">
                  <div className="text-[11px] text-slate-400">Ukuran Berkas</div>
                  <div className="text-sm font-bold text-white mt-0.5">{formatBytes(latestRelease.file_size)}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-center sm:text-left">
                  <div className="text-[11px] text-slate-400">Min. Android</div>
                  <div className="text-sm font-bold text-white mt-0.5">OS 8.0+ (Oreo)</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-center sm:text-left">
                  <div className="text-[11px] text-slate-400">Arsitektur</div>
                  <div className="text-sm font-bold text-white mt-0.5">arm64-v8a / all</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-center sm:text-left">
                  <div className="text-[11px] text-slate-400">Integritas</div>
                  <div className="text-sm font-bold text-emerald-400 mt-0.5 flex items-center justify-center sm:justify-start gap-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Terverifikasi</span>
                  </div>
                </div>
              </div>

              {/* Changelog summary */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Ringkasan Pembaruan:
                </h3>
                <div className="text-sm text-slate-300 whitespace-pre-line bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 font-mono text-xs leading-relaxed max-h-36 overflow-y-auto">
                  {latestRelease.changelog}
                </div>
              </div>
            </div>

            {/* Right Download Button & Safety */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center gap-4 bg-slate-950/60 p-6 rounded-2xl border border-slate-800 text-center">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <Smartphone className="w-8 h-8 text-cyan-400" />
              </div>

              <div className="space-y-1">
                <div className="text-base font-bold text-white">Siap Dipasang di HP Anda</div>
                <p className="text-xs text-slate-400">
                  Unduh langsung berkas .apk dan buka pada smartphone Anda.
                </p>
              </div>

              <a
                href={latestRelease.file_path}
                download
                className="w-full inline-flex items-center justify-center gap-3 py-4 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold text-base shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all"
              >
                <Download className="w-5 h-5" />
                <span>Download APK Sekarang</span>
              </a>

              <Link
                href="/changelog"
                className="text-xs text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1"
              >
                <span>Lihat riwayat pembaruan lengkap</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto">
            <Download className="w-8 h-8 text-cyan-400" />
          </div>
          <h2 className="text-xl font-bold text-white">Belum Ada Rilis Publik Yang Dipublikasikan</h2>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Tim developer sedang menyiapkan paket rilis perdana. Silakan periksa kembali beberapa saat lagi atau login ke portal admin untuk mengunggah rilis baru.
          </p>
          <Link
            href="/admin/login"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-semibold border border-slate-700"
          >
            <span>Masuk Admin Panel</span>
          </Link>
        </div>
      )}

      {/* Older Releases Section */}
      {olderReleases.length > 0 && (
        <div className="space-y-6 pt-8 border-t border-slate-800/80">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Riwayat Versi Terdahulu</h2>
              <p className="text-xs text-slate-400">Arsip versi stabil sebelumnya yang masih dapat diunduh untuk pengujian</p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/80 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-4 px-6">Versi</th>
                  <th className="py-4 px-6">Judul Rilis</th>
                  <th className="py-4 px-6">Ukuran</th>
                  <th className="py-4 px-6">Tanggal Rilis</th>
                  <th className="py-4 px-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {olderReleases.map((release) => (
                  <tr key={release.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-6 font-semibold text-white">
                      v{release.version}
                      <span className="text-xs text-slate-500 font-normal block sm:inline sm:ml-2">
                        (Code: {release.version_code})
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-200">
                      {release.title}
                    </td>
                    <td className="py-4 px-6 text-slate-400">
                      {formatBytes(release.file_size)}
                    </td>
                    <td className="py-4 px-6 text-slate-400">
                      {formatDate(release.published_at || release.created_at)}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <a
                        href={release.file_path}
                        download
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 border border-slate-700 hover:border-cyan-500/40 text-xs font-semibold transition-all"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Unduh</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Installation Guide & Instructions */}
      <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          <span>Panduan Instalasi APK di Perangkat Android</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="space-y-2 p-4 rounded-xl bg-slate-950/60 border border-slate-800/60">
            <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex items-center justify-center">
              1
            </span>
            <div className="font-semibold text-white">Unduh File APK</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Klik tombol unduh di atas menggunakan browser di smartphone Anda hingga selesai.
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-slate-950/60 border border-slate-800/60">
            <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex items-center justify-center">
              2
            </span>
            <div className="font-semibold text-white">Izinkan Sumber Tak Dikenal</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Jika muncul peringatan keamanan, buka Pengaturan &gt; Keamanan &gt; Izinkan Instalasi dari Sumber Ini (Install Unknown Apps).
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-slate-950/60 border border-slate-800/60">
            <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex items-center justify-center">
              3
            </span>
            <div className="font-semibold text-white">Selesaikan Instalasi</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Buka berkas unduhan dan pilih &quot;Pasang / Install&quot;. Aplikasi Pranata Gatra siap digunakan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
