'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Loader2,
  ShieldAlert
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
  CLOSED: { label: 'CLOSED', color: 'bg-slate-500/15 text-slate-400 border-slate-500/30' },
};

export function BugDetailDialog({ report, isOpen, onClose }: BugDetailDialogProps) {
  const [currentStatus, setCurrentStatus] = useState<BugStatus>(report.status);
  const [isUpdating, setIsUpdating] = useState(false);
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [loadingAttachment, setLoadingAttachment] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setCurrentStatus(report.status);

    if (report.attachment_path) {
      setLoadingAttachment(true);
      getAttachmentSignedUrl(report.attachment_path)
        .then((url) => setSignedUrl(url))
        .finally(() => setLoadingAttachment(false));
    } else {
      setSignedUrl(null);
    }
  }, [report]);

  if (!isOpen) return null;

  const handleStatusChange = async (newStatus: BugStatus) => {
    if (newStatus === currentStatus) return;
    setIsUpdating(true);
    const toastId = toast.loading(`Mengubah status laporan ke ${newStatus}...`);

    try {
      const res = await updateBugStatus(report.id, newStatus);
      if (res.success) {
        setCurrentStatus(newStatus);
        toast.success(`Status berhasil diubah menjadi ${newStatus}`, { id: toastId });
        router.refresh();
      } else {
        toast.error(res.error || 'Gagal mengubah status', { id: toastId });
      }
    } catch {
      toast.error('Terjadi kesalahan jaringan.', { id: toastId });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-md text-xs font-bold border ${STATUS_CONFIG[currentStatus].color}`}>
              {STATUS_CONFIG[currentStatus].label}
            </span>
            <span className="text-xs text-slate-400">
              ID: <span className="font-mono text-slate-300">{report.id.slice(0, 8)}...</span>
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Title */}
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white leading-snug">{report.title}</h2>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>Dilaporkan pada {formatDateTime(report.created_at)}</span>
            </div>
          </div>

          {/* Reporter & Device Specs Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Pelapor */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Informasi Pelapor
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <User className="w-4 h-4 text-cyan-400" />
                <span>{report.name}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Mail className="w-4 h-4 text-slate-500" />
                <a href={`mailto:${report.email}`} className="hover:text-cyan-400 transition-colors">
                  {report.email}
                </a>
              </div>
            </div>

            {/* Perangkat */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Lingkungan Aplikasi
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-200">
                <Smartphone className="w-4 h-4 text-teal-400" />
                <span>Device: <strong className="text-white">{report.device}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-200">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Versi OS: <strong className="text-white">{report.os_version}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-200">
                <Clock className="w-4 h-4 text-indigo-400" />
                <span>App Version: <strong className="text-cyan-400">{report.app_version}</strong></span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Deskripsi Lengkap Kendala</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 text-sm text-slate-200 whitespace-pre-line leading-relaxed">
              {report.description}
            </div>
          </div>

          {/* Attachment Preview */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Paperclip className="w-4 h-4 text-cyan-400" />
              <span>Lampiran Berkas (Screenshot/Log)</span>
            </div>

            {report.attachment_path ? (
              loadingAttachment ? (
                <div className="flex items-center gap-2 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
                  <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                  <span>Memuat berkas dari Supabase Storage...</span>
                </div>
              ) : signedUrl ? (
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 truncate max-w-xs font-mono">
                      {report.attachment_path}
                    </span>
                    <a
                      href={signedUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-400 text-xs font-semibold border border-cyan-500/30 transition-colors"
                    >
                      <span>Buka Tab Penuh</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* If image, display inline preview */}
                  <div className="max-h-60 rounded-xl overflow-hidden border border-slate-800 bg-slate-900 flex items-center justify-center">
                    <img
                      src={signedUrl}
                      alt="Attachment screenshot"
                      className="max-h-60 w-auto object-contain"
                      onError={(e) => {
                        // If file is not image (e.g. PDF)
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              ) : (
                <p className="text-xs text-rose-400">Gagal memuat URL lampiran.</p>
              )
            ) : (
              <p className="text-xs text-slate-500 italic p-3 rounded-xl bg-slate-950 border border-slate-800/60">
                Tidak ada lampiran screenshot yang diunggah untuk tiket ini.
              </p>
            )}
          </div>

          {/* Quick Status Changer */}
          <div className="space-y-2 pt-3 border-t border-slate-800">
            <div className="text-xs font-semibold text-slate-300">
              Perbarui Status Tiket:
            </div>
            <div className="flex flex-wrap gap-2">
              {(['OPEN', 'INVESTIGATING', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'] as BugStatus[]).map((st) => (
                <button
                  key={st}
                  type="button"
                  disabled={isUpdating}
                  onClick={() => handleStatusChange(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    currentStatus === st
                      ? STATUS_CONFIG[st].color + ' ring-2 ring-cyan-500/40'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {STATUS_CONFIG[st].label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950/60 border-t border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
