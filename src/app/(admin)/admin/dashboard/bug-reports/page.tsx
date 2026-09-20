import { Bug } from 'lucide-react';
import { getBugReports } from '@/lib/actions/bug-actions';
import { BugTableClient } from './bug-table-client';

export const dynamic = 'force-dynamic';

export default async function AdminBugReportsPage() {
  const bugReports = await getBugReports('ALL');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
          <Bug className="w-6 h-6 text-rose-400" />
          <span>Laporan Kendala & Bug Pengguna</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Tinjau seluruh tiket kendala teknis yang dikirimkan oleh pengguna aplikasi Android Pranata Gatra.
        </p>
      </div>

      {/* Bug Table Client */}
      <BugTableClient initialReports={bugReports} />
    </div>
  );
}
