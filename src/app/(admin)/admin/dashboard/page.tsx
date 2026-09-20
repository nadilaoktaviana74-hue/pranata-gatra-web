import Link from 'next/link';
import { 
  Package, 
  Bug, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight
} from 'lucide-react';
import { getDashboardStats, getBugReports } from '@/lib/actions/bug-actions';
import { getLatestRelease } from '@/lib/actions/release-actions';
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
            System Overview
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Monitor APK package distribution and review incoming user bug reports.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <ReleaseDialog />
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Releases */}
        <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-400">Total Releases</span>
            <div className="w-8 h-8 rounded-lg bg-[#B38D46]/10 border border-[#B38D46]/20 flex items-center justify-center text-[#FFE8B3]">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">{stats.totalReleases}</div>
          <p className="text-[11px] text-neutral-500">All registered builds</p>
        </div>

        {/* Published Releases */}
        <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-400">Published Builds</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-400">{stats.publishedReleases}</div>
          <p className="text-[11px] text-neutral-500">Available to public</p>
        </div>

        {/* Total Bug Reports */}
        <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-400">Total Bug Tickets</span>
            <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-300">
              <Bug className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">{stats.totalBugReports}</div>
          <p className="text-[11px] text-neutral-500">All submitted reports</p>
        </div>

        {/* Open Bugs */}
        <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-400">Open Tickets</span>
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-rose-400">{stats.openBugs}</div>
          <p className="text-[11px] text-neutral-500">Awaiting investigation</p>
        </div>

        {/* Resolved Bugs */}
        <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-400">Resolved</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-blue-400">{stats.resolvedBugs}</div>
          <p className="text-[11px] text-neutral-500">Marked as RESOLVED</p>
        </div>
      </div>

      {/* Two Column Layout: Active Release Highlight & Recent Bug Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Active Published Release Card */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-neutral-900/80 border border-neutral-800 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Live Public Release
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                ACTIVE
              </span>
            </div>

            {latestRelease ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-extrabold text-white">
                    {latestRelease.title}
                  </h3>
                  <p className="text-xs text-[#FFE8B3] font-semibold mt-0.5">
                    Version {latestRelease.version} (Build {latestRelease.version_code})
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-neutral-400">
                    <span>File Size:</span>
                    <strong className="text-white font-mono">{formatBytes(latestRelease.file_size)}</strong>
                  </div>
                  <div className="flex items-center justify-between text-neutral-400">
                    <span>Published On:</span>
                    <strong className="text-white">
                      {formatDate(latestRelease.published_at || latestRelease.created_at)}
                    </strong>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                    Release Notes:
                  </span>
                  <p className="text-xs text-neutral-300 line-clamp-3 bg-neutral-950 p-3 rounded-lg border border-neutral-850 font-mono">
                    {latestRelease.changelog}
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center rounded-2xl bg-neutral-950/60 border border-neutral-800 space-y-2">
                <Package className="w-8 h-8 text-neutral-500 mx-auto" />
                <p className="text-xs text-neutral-400">No release currently marked as PUBLISHED.</p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-neutral-800">
            <Link
              href="/admin/dashboard/releases"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-[#FFE8B3] text-xs font-semibold border border-neutral-700 transition-colors"
            >
              <span>Manage All Releases</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#B38D46]" />
            </Link>
          </div>
        </div>

        {/* Recent Bug Reports Table */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-neutral-900/80 border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">Recent Bug Reports</h2>
              <p className="text-xs text-neutral-400">Recently submitted feedback tickets</p>
            </div>
            <Link
              href="/admin/dashboard/bug-reports"
              className="text-xs text-[#FFE8B3] hover:text-white font-semibold flex items-center gap-1 transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#B38D46]" />
            </Link>
          </div>

          {recentBugs.length > 0 ? (
            <div className="overflow-x-auto rounded-xl border border-neutral-800">
              <table className="w-full text-left text-xs text-neutral-300">
                <thead className="bg-neutral-950 text-neutral-400 font-semibold uppercase tracking-wider border-b border-neutral-800">
                  <tr>
                    <th className="py-3 px-4">Reporter</th>
                    <th className="py-3 px-4">Summary</th>
                    <th className="py-3 px-4">Environment</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Received</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60 bg-neutral-950/40">
                  {recentBugs.slice(0, 5).map((bug) => (
                    <tr key={bug.id} className="hover:bg-neutral-800/30 transition-colors">
                      <td className="py-3 px-4 font-semibold text-white">
                        {bug.name}
                        <span className="block text-[10px] text-neutral-500 font-normal">
                          {bug.email}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-neutral-200 max-w-xs truncate">
                        {bug.title}
                      </td>
                      <td className="py-3 px-4 text-neutral-400 font-mono text-[11px]">
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
                      <td className="py-3 px-4 text-right text-neutral-400 text-[11px]">
                        {formatDateTime(bug.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center rounded-2xl bg-neutral-950/60 border border-neutral-800 space-y-2">
              <Bug className="w-8 h-8 text-neutral-500 mx-auto" />
              <p className="text-xs text-neutral-400">No bug reports have been submitted yet.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
