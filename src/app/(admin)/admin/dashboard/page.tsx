import Link from 'next/link';
import { 
  Package, 
  Bug, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Smartphone, 
  Clock, 
  HardDrive,
  Download,
  Calendar,
  Sparkles
} from 'lucide-react';
import { getDashboardStats, getBugReports } from '@/lib/actions/bug-actions';
import { getLatestRelease, getAllReleases } from '@/lib/actions/release-actions';
import { formatBytes, formatDate, formatDateTime } from '@/lib/utils';
import { ReleaseDialog } from '@/components/admin/release-dialog';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardOverviewPage() {
  const stats = await getDashboardStats();
  const latestRelease = await getLatestRelease();
  const recentBugs = await getBugReports('ALL');

  return (
    <div className="space-y-8">
      {/* Top Welcome & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Dashboard Ikhtisar
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Pantau status distribusi APK dan penanganan kendala pengguna dalam satu kendali.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <ReleaseDialog />
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Releases */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Rilis</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">{stats.totalReleases}</div>
          <p className="text-[11px] text-slate-500">Semua versi yang terdaftar</p>
        </div>

        {/* Published Releases */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Rilis Publik</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-400">{stats.publishedReleases}</div>
          <p className="text-[11px] text-slate-500">Dapat diunduh pengguna</p>
        </div>

        {/* Total Bug Reports */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Tiket Bug</span>
            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300">
              <Bug className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">{stats.totalBugReports}</div>
          <p className="text-[11px] text-slate-500">Laporan yang masuk</p>
        </div>

        {/* Open Bugs */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Bug Terbuka (Open)</span>
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-rose-400">{stats.openBugs}</div>
          <p className="text-[11px] text-slate-500">Menunggu investigasi</p>
        </div>

        {/* Resolved Bugs */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Terselesaikan</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-blue-400">{stats.resolvedBugs}</div>
          <p className="text-[11px] text-slate-500">Tiket berstatus RESOLVED</p>
        </div>
      </div>

      {/* Two Column Layout: Active Release Highlight & Recent Bug Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Active Published Release Card */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Rilis Aktif Publik
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                LIVE
              </span>
            </div>

            {latestRelease ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-extrabold text-white">
                    {latestRelease.title}
                  </h3>
                  <p className="text-xs text-cyan-400 font-semibold mt-0.5">
                    Versi {latestRelease.version} (Build {latestRelease.version_code})
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Ukuran Berkas:</span>
                    <strong className="text-white">{formatBytes(latestRelease.file_size)}</strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Tanggal Terbit:</span>
                    <strong className="text-white">
                      {formatDate(latestRelease.published_at || latestRelease.created_at)}
                    </strong>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Catatan Rilis:
                  </span>
                  <p className="text-xs text-slate-300 line-clamp-3 bg-slate-950 p-3 rounded-lg border border-slate-850 font-mono">
                    {latestRelease.changelog}
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center rounded-2xl bg-slate-950/60 border border-slate-850 space-y-2">
                <Package className="w-8 h-8 text-slate-500 mx-auto" />
                <p className="text-xs text-slate-400">Belum ada rilis berstatus PUBLISHED.</p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-800">
            <Link
              href="/admin/dashboard/releases"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 text-cyan-400 text-xs font-semibold border border-slate-700 transition-colors"
            >
              <span>Kelola Seluruh Rilis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Recent Bug Reports Table */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">Laporan Kendala Terbaru</h2>
              <p className="text-xs text-slate-400">Tiket masalah yang baru saja dikirimkan oleh pengguna</p>
            </div>
            <Link
              href="/admin/dashboard/bug-reports"
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
            >
              <span>Lihat Semua</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentBugs.length > 0 ? (
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Pelapor</th>
                    <th className="py-3 px-4">Judul Kendala</th>
                    <th className="py-3 px-4">Perangkat</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Waktu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 bg-slate-950/40">
                  {recentBugs.slice(0, 5).map((bug) => (
                    <tr key={bug.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 px-4 font-semibold text-white">
                        {bug.name}
                        <span className="block text-[10px] text-slate-500 font-normal">
                          {bug.email}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-200 max-w-xs truncate">
                        {bug.title}
                      </td>
                      <td className="py-3 px-4 text-slate-400">
                        {bug.device} ({bug.app_version})
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                          bug.status === 'OPEN'
                            ? 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                            : bug.status === 'RESOLVED'
                            ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                            : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                        }`}>
                          {bug.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right text-slate-400">
                        {formatDateTime(bug.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center rounded-2xl bg-slate-950/60 border border-slate-850 space-y-2">
              <Bug className="w-8 h-8 text-slate-500 mx-auto" />
              <p className="text-xs text-slate-400">Belum ada laporan kendala yang masuk.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
