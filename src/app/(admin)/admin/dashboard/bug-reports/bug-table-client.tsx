'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Eye, 
  Paperclip
} from 'lucide-react';
import { BugReport, BugStatus } from '@/types/database';
import { formatDateTime } from '@/lib/utils';
import { BugDetailDialog } from '@/components/admin/bug-detail-dialog';
import { updateBugStatus } from '@/lib/actions/bug-actions';
import { toast } from 'sonner';

interface BugTableClientProps {
  initialReports: BugReport[];
}

const STATUS_FILTERS: Array<BugStatus | 'ALL'> = [
  'ALL',
  'OPEN',
  'INVESTIGATING',
  'IN_PROGRESS',
  'RESOLVED',
  'CLOSED',
];

const STATUS_CONFIG: Record<BugStatus, { label: string; color: string }> = {
  OPEN: { label: 'OPEN', color: 'bg-rose-500/15 text-rose-400 border-rose-500/30' },
  INVESTIGATING: { label: 'INVESTIGATING', color: 'bg-amber-500/15 text-amber-400 border-amber-500/30' },
  IN_PROGRESS: { label: 'IN PROGRESS', color: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
  RESOLVED: { label: 'RESOLVED', color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
  CLOSED: { label: 'CLOSED', color: 'bg-neutral-500/15 text-neutral-400 border-neutral-500/30' },
};

export function BugTableClient({ initialReports }: BugTableClientProps) {
  const [selectedFilter, setSelectedFilter] = useState<BugStatus | 'ALL'>('ALL');
  const [selectedReport, setSelectedReport] = useState<BugReport | null>(null);
  const router = useRouter();

  const filteredReports = initialReports.filter((r) => {
    if (selectedFilter === 'ALL') return true;
    return r.status === selectedFilter;
  });

  const handleQuickStatus = async (id: string, newStatus: BugStatus) => {
    const toastId = toast.loading(`Updating report status to ${newStatus}...`);
    try {
      const res = await updateBugStatus(id, newStatus);
      if (res.success) {
        toast.success(`Status updated to ${newStatus}`, { id: toastId });
        router.refresh();
      } else {
        toast.error(res.error || 'Failed to update status', { id: toastId });
      }
    } catch {
      toast.error('A network error occurred.', { id: toastId });
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter Status Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-neutral-400 mr-1 font-semibold">Filter:</span>
        {STATUS_FILTERS.map((st) => {
          const count = st === 'ALL' 
            ? initialReports.length 
            : initialReports.filter(r => r.status === st).length;

          return (
            <button
              key={st}
              type="button"
              onClick={() => setSelectedFilter(st)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedFilter === st
                  ? 'gold-gradient text-neutral-950 border-[#B38D46] shadow-md shadow-[#B38D46]/20'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <span>{st}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                selectedFilter === st ? 'bg-neutral-950/25 text-neutral-950' : 'bg-neutral-800 text-neutral-400'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-neutral-800 bg-neutral-900/70">
        <table className="w-full text-left text-xs text-neutral-300">
          <thead className="bg-neutral-950/80 text-neutral-400 font-semibold uppercase tracking-wider border-b border-neutral-800">
            <tr>
              <th className="py-4 px-5">Reporter</th>
              <th className="py-4 px-5">Issue Summary</th>
              <th className="py-4 px-5">Device & Version</th>
              <th className="py-4 px-5">Attachment</th>
              <th className="py-4 px-5">Status</th>
              <th className="py-4 px-5">Received Date</th>
              <th className="py-4 px-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800/60">
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-neutral-800/40 transition-colors">
                  <td className="py-4 px-5 font-semibold text-white">
                    {report.name}
                    <span className="block text-[10px] text-neutral-400 font-normal">
                      {report.email}
                    </span>
                  </td>

                  <td className="py-4 px-5 max-w-xs">
                    <div className="font-semibold text-neutral-200 truncate">{report.title}</div>
                    <div className="text-[10px] text-neutral-400 truncate">{report.description}</div>
                  </td>

                  <td className="py-4 px-5">
                    <div className="text-neutral-200">{report.device}</div>
                    <div className="text-[10px] text-[#FFE8B3] font-mono">
                      {report.app_version} • {report.os_version}
                    </div>
                  </td>

                  <td className="py-4 px-5">
                    {report.attachment_path ? (
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#FFE8B3] font-medium">
                        <Paperclip className="w-3.5 h-3.5 text-[#B38D46]" />
                        <span>Attached</span>
                      </span>
                    ) : (
                      <span className="text-[11px] text-neutral-600">-</span>
                    )}
                  </td>

                  <td className="py-4 px-5">
                    <select
                      value={report.status}
                      onChange={(e) => handleQuickStatus(report.id, e.target.value as BugStatus)}
                      className={`text-[10px] font-bold px-2 py-1 rounded-lg border outline-none cursor-pointer ${STATUS_CONFIG[report.status].color}`}
                    >
                      <option value="OPEN" className="bg-neutral-900 text-rose-400">OPEN</option>
                      <option value="INVESTIGATING" className="bg-neutral-900 text-amber-400">INVESTIGATING</option>
                      <option value="IN_PROGRESS" className="bg-neutral-900 text-blue-400">IN PROGRESS</option>
                      <option value="RESOLVED" className="bg-neutral-900 text-emerald-400">RESOLVED</option>
                      <option value="CLOSED" className="bg-neutral-900 text-neutral-400">CLOSED</option>
                    </select>
                  </td>

                  <td className="py-4 px-5 text-neutral-400 text-[11px]">
                    {formatDateTime(report.created_at)}
                  </td>

                  <td className="py-4 px-5 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedReport(report)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-[#B38D46]/20 text-[#FFE8B3] hover:text-white border border-neutral-700 hover:border-[#B38D46]/40 text-xs font-semibold transition-all cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#B38D46]" />
                      <span>Details</span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-12 text-center text-neutral-500">
                  No bug reports found with status {selectedFilter}.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {selectedReport && (
        <BugDetailDialog
          key={selectedReport.id}
          report={selectedReport}
          isOpen={!!selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}
    </div>
  );
}
