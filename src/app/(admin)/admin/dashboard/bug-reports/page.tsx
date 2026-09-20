import { Bug } from 'lucide-react';
import { getBugReports } from '@/lib/actions/bug-actions';
import { BugTableClient } from './bug-table-client';

export const dynamic = 'force-dynamic';

export default async function AdminBugReportsPage() {
  const reports = await getBugReports('ALL');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
          <Bug className="w-6 h-6 text-[#B38D46]" />
          <span>User Bug Reports & Feedback</span>
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 mt-1">
          Review, investigate, and update resolution statuses for user-submitted technical issues.
        </p>
      </div>

      {/* Table */}
      <BugTableClient initialReports={reports} />
    </div>
  );
}
