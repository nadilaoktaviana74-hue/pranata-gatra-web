'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Bug, 
  Eye, 
  Smartphone, 
  Calendar, 
  Paperclip, 
  Layers,
  Clock,
  CheckCircle2,
  AlertCircle
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
  CLOSED: { label: 'CLOSED', color: 'bg-slate-500/15 text-slate-400 border-slate-500/30' },
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
    const toastId = toast.loading(`Mengubah status laporan ke ${newStatus}...`);
    try {
      const res = await updateBugStatus(id, newStatus);
      if (res.success) {
        toast.success(`Status berhasil diubah ke ${newStatus}`, { id: toastId });
        router.refresh();
      } else {
        toast.error(res.error || 'Gagal mengubah status', { id: toastId });
      }
    } catch {
      toast.error('Terjadi kesalahan jaringan.', { id: toastId });
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter Status Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-400 mr-1 font-semibold">Filter Status:</span>
        {STATUS_FILTERS.map((st) => {
          const count = st === 'ALL' 
            ? initialReports.length 
            : initialReports.filter(r => r.status === st).length;

          return (
            <button
              key={st}
              type="button"
              onClick={() => setSelectedFilter(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                selectedFilter === st
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{st}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                selectedFilter === st ? 'bg-slate-950/30 text-slate-900' : 'bg-slate-800 text-slate-400'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/70">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950/80 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
            <tr>
              <th className="py-4 px-5">Pelapor</th>
              <th className="py-4 px-5">Judul Laporan</th>
              <th className="py-4 px-5">Perangkat & Versi</th>
              <th className="py-4 px-5">Lampiran</th>
              <th className="py-4 px-5">Status</th>
              <th className="py-4 px-5">Tanggal Masuk</th>
              <th className="py-4 px-5 text-right">Detail</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-5 font-semibold text-white">
                    {report.name}
                    <span className="block text-[10px] text-slate-400 font-normal">
                      {report.email}
                    </span>
                  </td>

                  <td className="py-4 px-5 max-w-xs">
                    <div className="font-semibold text-slate-200 truncate">{report.title}</div>
                    <div className="text-[10px] text-slate-400 truncate">{report.description}</div>
                  </td>

                  <td className="py-4 px-5">
                    <div className="text-slate-200">{report.device}</div>
                    <div className="text-[10px] text-cyan-400 font-mono">
                      {report.app_version} • {report.os_version}
                    </div>
                  </td>

                  <td className="py-4 px-5">
                    {report.attachment_path ? (
                      <span className="inline-flex items-center gap-1 text-[11px] text-cyan-400 font-medium">
                        <Paperclip className="w-3.5 h-3.5" />
                        <span>Ada</span>
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-600">-</span>
                    )}
                  </td>

                  <td className="py-4 px-5">
                    <select
                      value={report.status}
                      onChange={(e) => handleQuickStatus(report.id, e.target.value as BugStatus)}
                      className={`text-[10px] font-bold px-2 py-1 rounded-lg border outline-none cursor-pointer ${STATUS_CONFIG[report.status].color}`}
                    >
                      <option value="OPEN" className="bg-slate-900 text-rose-400">OPEN</option>
                      <option value="INVESTIGATING" className="bg-slate-900 text-amber-400">INVESTIGATING</option>
                      <option value="IN_PROGRESS" className="bg-slate-900 text-blue-400">IN PROGRESS</option>
                      <option value="RESOLVED" className="bg-slate-900 text-emerald-400">RESOLVED</option>
                      <option value="CLOSED" className="bg-slate-900 text-slate-400">CLOSED</option>
                    </select>
                  </td>

                  <td className="py-4 px-5 text-slate-400">
                    {formatDateTime(report.created_at)}
                  </td>

                  <td className="py-4 px-5 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedReport(report)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 border border-slate-700 hover:border-cyan-500/40 text-xs font-semibold transition-all"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Rincian</span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-500">
                  Tidak ada laporan bug dengan status {selectedFilter}.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {selectedReport && (
        <BugDetailDialog
          report={selectedReport}
          isOpen={!!selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}
    </div>
  );
}
