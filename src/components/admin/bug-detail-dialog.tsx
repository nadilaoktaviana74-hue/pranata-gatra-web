'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  X, 
  User, 
  Mail, 
  Smartphone, 
  Layers, 
  Calendar, 
  FileText, 
  Paperclip, 
  ExternalLink, 
  Clock, 
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import { BugReport, BugStatus } from '@/types/database';
import { updateBugStatus, getAttachmentSignedUrl } from '@/lib/actions/bug-actions';
import { formatDateTime } from '@/lib/utils';

interface BugDetailDialogProps {
  report: BugReport;
  isOpen: boolean;
  onClose: () => void;
}

const STATUS_CONFIG: Record<BugStatus, { label: string; color: string }> = {
  OPEN: { label: 'OPEN', color: 'bg-rose-500/15 text-rose-400 border-rose-500/30' },
  INVESTIGATING: { label: 'INVESTIGATING', color: 'bg-amber-500/15 text-amber-400 border-amber-500/30' },
  IN_PROGRESS: { label: 'IN PROGRESS', color: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
  RESOLVED: { label: 'RESOLVED', color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
  CLOSED: { label: 'CLOSED', color: 'bg-neutral-500/15 text-neutral-400 border-neutral-500/30' },
};

export function BugDetailDialog({ report, isOpen, onClose }: BugDetailDialogProps) {
  const [currentStatus, setCurrentStatus] = useState<BugStatus>(report.status);
  const [isUpdating, setIsUpdating] = useState(false);
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [loadingAttachment, setLoadingAttachment] = useState(() => Boolean(report.attachment_path));

  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    if (report.attachment_path) {
      getAttachmentSignedUrl(report.attachment_path)
        .then((url) => {
          if (isMounted) {
            setSignedUrl(url);
            setLoadingAttachment(false);
          }
        })
        .catch(() => {
          if (isMounted) setLoadingAttachment(false);
        });
    }

    return () => {
      isMounted = false;
    };
  }, [report.attachment_path]);

  if (!isOpen) return null;

  const handleStatusChange = async (newStatus: BugStatus) => {
    if (newStatus === currentStatus) return;
    setIsUpdating(true);
    const toastId = toast.loading(`Updating ticket status to ${newStatus}...`);

    try {
      const res = await updateBugStatus(report.id, newStatus);
      if (res.success) {
        setCurrentStatus(newStatus);
        toast.success(`Ticket marked as ${newStatus}`, { id: toastId });
        router.refresh();
      } else {
        toast.error(res.error || 'Failed to update status', { id: toastId });
      }
    } catch {
      toast.error('A network error occurred.', { id: toastId });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-md text-xs font-bold border ${STATUS_CONFIG[currentStatus].color}`}>
              {STATUS_CONFIG[currentStatus].label}
            </span>
            <span className="text-xs text-neutral-400">
              Ticket ID: <span className="font-mono text-neutral-300">{report.id.slice(0, 8)}</span>
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Title */}
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white leading-snug">{report.title}</h2>
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <Calendar className="w-3.5 h-3.5 text-neutral-500" />
              <span>Reported on {formatDateTime(report.created_at)}</span>
            </div>
          </div>

          {/* Reporter & Device Specs Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Reporter */}
            <div className="p-4 rounded-2xl bg-neutral-950/70 border border-neutral-800 space-y-2">
              <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                Reporter Details
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <User className="w-4 h-4 text-[#B38D46]" />
                <span>{report.name}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-300">
                <Mail className="w-4 h-4 text-neutral-500" />
                <a href={`mailto:${report.email}`} className="hover:text-[#FFE8B3] transition-colors">
                  {report.email}
                </a>
              </div>
            </div>

            {/* Device Environment */}
            <div className="p-4 rounded-2xl bg-neutral-950/70 border border-neutral-800 space-y-2">
              <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                Application Environment
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-200">
                <Smartphone className="w-4 h-4 text-[#B38D46]" />
                <span>Device: <strong className="text-white">{report.device}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-200">
                <Layers className="w-4 h-4 text-[#B38D46]" />
                <span>OS Version: <strong className="text-white">{report.os_version}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-200">
                <Clock className="w-4 h-4 text-[#B38D46]" />
                <span>App Version: <strong className="text-[#FFE8B3]">{report.app_version}</strong></span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#B38D46]" />
              <span>Full Issue Chronology</span>
            </div>
            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800/90 text-sm text-neutral-200 whitespace-pre-line leading-relaxed">
              {report.description}
            </div>
          </div>

          {/* Attachment Preview */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
              <Paperclip className="w-4 h-4 text-[#B38D46]" />
              <span>Attached Screenshot / File</span>
            </div>

            {report.attachment_path ? (
              loadingAttachment ? (
                <div className="flex items-center gap-2 p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-400">
                  <Loader2 className="w-4 h-4 animate-spin text-[#B38D46]" />
                  <span>Generating secure signed URL from storage...</span>
                </div>
              ) : signedUrl ? (
                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-400 truncate max-w-xs font-mono">
                      {report.attachment_path}
                    </span>
                    <a
                      href={signedUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#B38D46]/15 hover:bg-[#B38D46]/25 text-[#FFE8B3] text-xs font-semibold border border-[#B38D46]/30 transition-colors"
                    >
                      <span>Open Full Size</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#B38D46]" />
                    </a>
                  </div>

                  {/* Inline Preview */}
                  <div className="relative h-60 w-full rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900 flex items-center justify-center">
                    <Image
                      src={signedUrl}
                      alt="Bug attachment preview"
                      fill
                      unoptimized
                      className="object-contain"
                    />
                  </div>
                </div>
              ) : (
                <p className="text-xs text-rose-400">Unable to load attachment signed URL.</p>
              )
            ) : (
              <p className="text-xs text-neutral-500 italic p-3 rounded-xl bg-neutral-950 border border-neutral-800/60">
                No screenshot or log file was attached to this ticket.
              </p>
            )}
          </div>

          {/* Quick Status Changer */}
          <div className="space-y-2 pt-3 border-t border-neutral-800">
            <div className="text-xs font-semibold text-neutral-300">
              Update Ticket Status:
            </div>
            <div className="flex flex-wrap gap-2">
              {(['OPEN', 'INVESTIGATING', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'] as BugStatus[]).map((st) => (
                <button
                  key={st}
                  type="button"
                  disabled={isUpdating}
                  onClick={() => handleStatusChange(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    currentStatus === st
                      ? STATUS_CONFIG[st].color + ' ring-2 ring-[#B38D46]/40'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800'
                  }`}
                >
                  {STATUS_CONFIG[st].label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-neutral-950/60 border-t border-neutral-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
