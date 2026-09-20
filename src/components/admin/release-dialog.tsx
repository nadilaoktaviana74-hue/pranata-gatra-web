'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Plus, 
  UploadCloud, 
  X, 
  Package, 
  FileCode, 
  HardDrive, 
  Check, 
  AlertCircle, 
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
        toast.error('Berkas harus berekstensi .apk');
        return;
      }
      setSelectedFile(file);

      // Try auto-guessing version if filename is like app-v1.0.2.apk or similar
      const match = file.name.match(/v?(\d+\.\d+(\.\d+)?)/i);
      if (match && !version) {
        setVersion(match[1]);
      }
      if (!title) {
        setTitle(`Pranata Gatra Android v${match ? match[1] : 'Rilis Baru'}`);
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
      toast.error('Harap pilih file .apk terlebih dahulu');
      return;
    }
    if (!version || !versionCode || !title || !changelog) {
      toast.error('Harap isi seluruh field wajib');
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading('Mengunggah file APK ke Supabase Storage dan menyimpan metadata...');

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
        toast.success(`Rilis v${version} berhasil dibuat!`, { id: toastId });
        resetForm();
        router.refresh();
      } else {
        toast.error(res.error || 'Gagal membuat rilis.', { id: toastId });
      }
    } catch (err: any) {
      toast.error('Terjadi kegagalan jaringan atau server.', { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all"
      >
        <Plus className="w-4 h-4" />
        <span>Buat Rilis APK Baru</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                  <Package className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Unggah & Terbitkan Rilis APK</h2>
                  <p className="text-xs text-slate-400">Tambahkan paket instalasi baru ke bucket penyimpanan cloud</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => !isSubmitting && setIsOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto flex-1">
              
              {/* APK File Upload Area */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                  <HardDrive className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Berkas APK (.apk) *</span>
                </label>

                {!selectedFile ? (
                  <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-800 hover:border-cyan-500/50 rounded-2xl cursor-pointer bg-slate-950/40 hover:bg-slate-950/70 transition-all text-center">
                    <UploadCloud className="w-8 h-8 text-cyan-400 mb-2" />
                    <span className="text-sm font-semibold text-white">Pilih berkas Android (.apk)</span>
                    <span className="text-xs text-slate-400 mt-1">Ukuran berkas akan dikalkulasi secara otomatis</span>
                    <input
                      type="file"
                      accept=".apk,application/vnd.android.package-archive"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-cyan-500/30">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-cyan-500/15 text-cyan-400 flex items-center justify-center font-bold text-xs">
                        APK
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{selectedFile.name}</div>
                        <div className="text-xs text-cyan-400 font-mono">
                          Ukuran: {formatBytes(selectedFile.size)} ({selectedFile.size.toLocaleString()} bytes)
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedFile(null)}
                      className="text-xs text-rose-400 hover:text-rose-300 px-2 py-1 rounded bg-rose-500/10"
                    >
                      Ganti Berkas
                    </button>
                  </div>
                )}
              </div>

              {/* Version & Version Code Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Nomor Versi (version name) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="1.0.0"
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Kode Versi (version code / integer) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="1"
                    value={versionCode}
                    onChange={(e) => setVersionCode(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                  />
                </div>
              </div>

              {/* Judul Rilis */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Judul Rilis / Highlight Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Rilis Perdana Pranata Gatra Android - Stabilitas Lapangan"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                />
              </div>

              {/* Status Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Status Publikasi Rilis *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setStatus('PUBLISHED')}
                    className={`py-2.5 px-4 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      status === 'PUBLISHED'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Check className={`w-3.5 h-3.5 ${status === 'PUBLISHED' ? 'opacity-100' : 'opacity-0'}`} />
                    <span>PUBLISHED (Siap Unduh)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus('DRAFT')}
                    className={`py-2.5 px-4 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      status === 'DRAFT'
                        ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Check className={`w-3.5 h-3.5 ${status === 'DRAFT' ? 'opacity-100' : 'opacity-0'}`} />
                    <span>DRAFT (Arsip / Internal)</span>
                  </button>
                </div>
              </div>

              {/* Changelog Textarea */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Catatan Rilis / Changelog *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="- Menambahkan fitur geofencing GPS akurat&#10;- Peningkatan sinkronisasi saat offline&#10;- Perbaikan bug autentikasi sesi"
                  value={changelog}
                  onChange={(e) => setChangelog(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:ring-2 focus:ring-cyan-500 outline-none leading-relaxed"
                />
              </div>

              {/* Footer Buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 text-xs font-semibold transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 disabled:opacity-50 transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Mengunggah APK...</span>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="w-4 h-4" />
                      <span>Simpan & Publikasikan</span>
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
