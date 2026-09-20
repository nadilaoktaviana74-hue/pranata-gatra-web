'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Plus, 
  UploadCloud, 
  X, 
  Package, 
  HardDrive, 
  Check, 
  Loader2 
} from 'lucide-react';
import { toast } from 'sonner';
import { createRelease } from '@/lib/actions/release-actions';
import { formatBytes } from '@/lib/utils';
import { ReleaseStatus } from '@/types/database';

export function ReleaseDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Form states
  const [version, setVersion] = useState('');
  const [versionCode, setVersionCode] = useState('');
  const [title, setTitle] = useState('');
  const [changelog, setChangelog] = useState('');
  const [status, setStatus] = useState<ReleaseStatus>('DRAFT');

  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.name.toLowerCase().endsWith('.apk')) {
        toast.error('File must have a .apk extension.');
        return;
      }
      setSelectedFile(file);

      // Auto-guess version if filename contains pattern like v1.0.2.apk
      const match = file.name.match(/v?(\d+\.\d+(\.\d+)?)/i);
      if (match && !version) {
        setVersion(match[1]);
      }
      if (!title) {
        setTitle(`Pranata Gatra Android v${match ? match[1] : 'Release'}`);
      }
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setVersion('');
    setVersionCode('');
    setTitle('');
    setChangelog('');
    setStatus('DRAFT');
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      toast.error('Please select an .apk binary file.');
      return;
    }
    if (!version || !versionCode || !title || !changelog) {
      toast.error('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading('Uploading APK to Supabase Storage and recording metadata...');

    try {
      const formData = new FormData();
      formData.append('version', version.trim());
      formData.append('version_code', versionCode.trim());
      formData.append('title', title.trim());
      formData.append('changelog', changelog.trim());
      formData.append('status', status);
      formData.append('apk_file', selectedFile);

      const res = await createRelease(formData);

      if (res.success) {
        toast.success(`Release v${version} created successfully!`, { id: toastId });
        resetForm();
        router.refresh();
      } else {
        toast.error(res.error || 'Failed to create release.', { id: toastId });
      }
    } catch {
      toast.error('A network or server error occurred.', { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full gold-gradient text-neutral-950 font-bold text-xs shadow-lg shadow-[#B38D46]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        <span>Upload New APK Release</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#B38D46]/15 border border-[#B38D46]/30 flex items-center justify-center">
                  <Package className="w-5 h-5 text-[#FFE8B3]" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Upload & Publish APK Release</h2>
                  <p className="text-xs text-neutral-400">Push a new binary package to cloud storage and register release notes</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => !isSubmitting && setIsOpen(false)}
                className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto flex-1">
              
              {/* APK File Upload Area */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-neutral-300 flex items-center gap-2">
                  <HardDrive className="w-3.5 h-3.5 text-[#B38D46]" />
                  <span>APK File (.apk) *</span>
                </label>

                {!selectedFile ? (
                  <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-neutral-800 hover:border-[#B38D46]/50 rounded-2xl cursor-pointer bg-neutral-950/40 hover:bg-neutral-950/70 transition-all text-center">
                    <UploadCloud className="w-8 h-8 text-[#B38D46] mb-2" />
                    <span className="text-sm font-semibold text-white">Select Android binary (.apk)</span>
                    <span className="text-xs text-neutral-400 mt-1">File size and hash will be calculated automatically</span>
                    <input
                      type="file"
                      accept=".apk,application/vnd.android.package-archive"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-950 border border-[#B38D46]/30">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#B38D46]/20 text-[#FFE8B3] flex items-center justify-center font-bold text-xs">
                        APK
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{selectedFile.name}</div>
                        <div className="text-xs text-[#FFE8B3] font-mono">
                          Size: {formatBytes(selectedFile.size)} ({selectedFile.size.toLocaleString()} bytes)
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedFile(null)}
                      className="text-xs text-rose-400 hover:text-rose-300 px-2.5 py-1 rounded-lg bg-rose-500/10 cursor-pointer"
                    >
                      Change File
                    </button>
                  </div>
                )}
              </div>

              {/* Version & Version Code Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-300">
                    Version Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="1.0.0"
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:ring-2 focus:ring-[#B38D46] outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-300">
                    Version Code (Integer) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="1"
                    value={versionCode}
                    onChange={(e) => setVersionCode(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:ring-2 focus:ring-[#B38D46] outline-none"
                  />
                </div>
              </div>

              {/* Release Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-300">
                  Release Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pranata Gatra Android v1.0.0 - Workspace Collaboration"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:ring-2 focus:ring-[#B38D46] outline-none"
                />
              </div>

              {/* Status Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-300">
                  Publication Status *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setStatus('PUBLISHED')}
                    className={`py-2.5 px-4 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      status === 'PUBLISHED'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Check className={`w-3.5 h-3.5 ${status === 'PUBLISHED' ? 'opacity-100' : 'opacity-0'}`} />
                    <span>PUBLISHED (Available to Public)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus('DRAFT')}
                    className={`py-2.5 px-4 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      status === 'DRAFT'
                        ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Check className={`w-3.5 h-3.5 ${status === 'DRAFT' ? 'opacity-100' : 'opacity-0'}`} />
                    <span>DRAFT (Internal / Hidden)</span>
                  </button>
                </div>
              </div>

              {/* Changelog Textarea */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-300">
                  Changelog Notes *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="- Automatic task priority calculation by deadline proximity&#10;- Subject and class schedule notifications&#10;- Resolved background sync session timeout"
                  value={changelog}
                  onChange={(e) => setChangelog(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs font-mono focus:ring-2 focus:ring-[#B38D46] outline-none leading-relaxed"
                />
              </div>

              {/* Footer Buttons */}
              <div className="pt-4 border-t border-neutral-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 text-xs font-semibold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full gold-gradient text-neutral-950 font-bold text-xs shadow-lg shadow-[#B38D46]/20 disabled:opacity-50 transition-all cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Uploading Binary...</span>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="w-4 h-4" />
                      <span>Upload & Save Release</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
