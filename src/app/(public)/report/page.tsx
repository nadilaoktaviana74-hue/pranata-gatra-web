'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { 
  Bug, 
  Send, 
  UploadCloud, 
  CheckCircle2, 
  AlertCircle, 
  Smartphone, 
  FileText, 
  User, 
  Mail, 
  Layers, 
  Paperclip,
  Loader2,
  X
} from 'lucide-react';
import { submitBugReport } from '@/lib/actions/bug-actions';

const reportSchema = z.object({
  name: z.string().min(2, 'Nama lengkap minimal 2 karakter').max(255),
  email: z.string().email('Format alamat email tidak valid').max(255),
  title: z.string().min(5, 'Judul kendala minimal 5 karakter').max(255),
  description: z.string().min(15, 'Harap jelaskan masalah secara rinci minimal 15 karakter'),
  app_version: z.string().min(1, 'Versi aplikasi wajib diisi (contoh: v1.0.2)').max(50),
  device: z.string().min(2, 'Model perangkat / HP wajib diisi (contoh: Samsung Galaxy A54)').max(100),
  os_version: z.string().min(1, 'Versi Android wajib diisi (contoh: Android 13 / OneUI 5.1)').max(100),
});

type ReportFormValues = z.infer<typeof reportSchema>;

export default function ReportBugPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReportFormValues>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      name: '',
      email: '',
      title: '',
      description: '',
      app_version: '',
      device: '',
      os_version: '',
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Ukuran file maksimal 10MB.');
        return;
      }
      setSelectedFile(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  const onSubmit = async (values: ReportFormValues) => {
    setIsSubmitting(true);
    const toastId = toast.loading('Mengirimkan laporan bug...');

    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('app_version', values.app_version);
      formData.append('device', values.device);
      formData.append('os_version', values.os_version);

      if (selectedFile) {
        formData.append('attachment', selectedFile);
      }

      const res = await submitBugReport(formData);

      if (res.success) {
        toast.success('Laporan bug berhasil dikirim! Tim teknis akan segera menindaklanjuti.', {
          id: toastId,
        });
        setIsSubmitted(true);
        reset();
        setSelectedFile(null);
      } else {
        toast.error(res.error || 'Gagal mengirim laporan. Silakan coba lagi.', {
          id: toastId,
        });
      }
    } catch (err: any) {
      toast.error('Terjadi kesalahan jaringan atau sistem.', {
        id: toastId,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-300 text-xs font-semibold">
          <Bug className="w-3.5 h-3.5 text-rose-400" />
          <span>Formulir Dukungan & Kendala Teknis</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Laporkan <span className="gradient-text">Bug & Masalah</span>
        </h1>
        <p className="text-slate-300 text-base leading-relaxed max-w-2xl mx-auto">
          Bantu kami meningkatkan kualitas aplikasi Pranata Gatra. Sampaikan detail kendala yang Anda alami beserta screenshot jika memungkinkan.
        </p>
      </div>

      {isSubmitted ? (
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/80 border border-emerald-500/30 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Laporan Anda Telah Diterima!</h2>
            <p className="text-slate-300 text-sm max-w-lg mx-auto">
              Terima kasih telah berkontribusi. Tiket laporan telah terdaftar dengan status <strong className="text-cyan-400">OPEN</strong>. Tim pengembang kami akan menganalisis dan menindaklanjutinya secepat mungkin.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all"
          >
            Kirim Laporan Lain
          </button>
        </div>
      ) : (
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/70 border border-slate-800 shadow-2xl shadow-cyan-950/20 backdrop-blur-md">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Pelapor Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Nama */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Nama Lengkap Pelapor *</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Budi Santoso"
                  {...register('name')}
                  className={`w-full px-4 py-3 rounded-xl bg-slate-950/80 border text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
                    errors.name ? 'border-rose-500/80' : 'border-slate-800 focus:border-cyan-500'
                  }`}
                />
                {errors.name && (
                  <p className="text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.name.message}</span>
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Alamat Email Aktif *</span>
                </label>
                <input
                  type="email"
                  placeholder="budi@instansi.go.id"
                  {...register('email')}
                  className={`w-full px-4 py-3 rounded-xl bg-slate-950/80 border text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
                    errors.email ? 'border-rose-500/80' : 'border-slate-800 focus:border-cyan-500'
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.email.message}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Device & Environment Specs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* App Version */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Versi Aplikasi *</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: v1.0.0"
                  {...register('app_version')}
                  className={`w-full px-4 py-3 rounded-xl bg-slate-950/80 border text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
                    errors.app_version ? 'border-rose-500/80' : 'border-slate-800 focus:border-cyan-500'
                  }`}
                />
                {errors.app_version && (
                  <p className="text-xs text-rose-400">{errors.app_version.message}</p>
                )}
              </div>

              {/* Device Model */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                  <Smartphone className="w-3.5 h-3.5 text-teal-400" />
                  <span>Model Perangkat *</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Xiaomi Redmi Note 12"
                  {...register('device')}
                  className={`w-full px-4 py-3 rounded-xl bg-slate-950/80 border text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
                    errors.device ? 'border-rose-500/80' : 'border-slate-800 focus:border-cyan-500'
                  }`}
                />
                {errors.device && (
                  <p className="text-xs text-rose-400">{errors.device.message}</p>
                )}
              </div>

              {/* OS Version */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Versi Android / OS *</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Android 14"
                  {...register('os_version')}
                  className={`w-full px-4 py-3 rounded-xl bg-slate-950/80 border text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
                    errors.os_version ? 'border-rose-500/80' : 'border-slate-800 focus:border-cyan-500'
                  }`}
                />
                {errors.os_version && (
                  <p className="text-xs text-rose-400">{errors.os_version.message}</p>
                )}
              </div>
            </div>

            {/* Judul Kendala */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>Judul Laporan / Ringkasan Singkat *</span>
              </label>
              <input
                type="text"
                placeholder="Contoh: Aplikasi crash saat menekan tombol validasi presensi GPS"
                {...register('title')}
                className={`w-full px-4 py-3 rounded-xl bg-slate-950/80 border text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
                  errors.title ? 'border-rose-500/80' : 'border-slate-800 focus:border-cyan-500'
                }`}
              />
              {errors.title && (
                <p className="text-xs text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.title.message}</span>
                </p>
              )}
            </div>

            {/* Deskripsi Masalah */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>Kronologi & Deskripsi Masalah Secara Rinci *</span>
              </label>
              <textarea
                rows={5}
                placeholder="Jelaskan langkah-langkah terjadinya kendala (reproduce steps), pesan error yang muncul, dan kondisi jaringan saat kejadian..."
                {...register('description')}
                className={`w-full px-4 py-3 rounded-xl bg-slate-950/80 border text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all leading-relaxed ${
                  errors.description ? 'border-rose-500/80' : 'border-slate-800 focus:border-cyan-500'
                }`}
              />
              {errors.description && (
                <p className="text-xs text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.description.message}</span>
                </p>
              )}
            </div>

            {/* Screenshot Attachment Upload */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                <Paperclip className="w-3.5 h-3.5 text-cyan-400" />
                <span>Lampiran Berkas / Screenshot (Opsional)</span>
              </label>

              {!selectedFile ? (
                <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-800 hover:border-cyan-500/50 rounded-2xl cursor-pointer bg-slate-950/40 hover:bg-slate-950/70 transition-all">
                  <UploadCloud className="w-8 h-8 text-cyan-400 mb-2" />
                  <span className="text-sm font-semibold text-white">Klik untuk memilih file tangkapan layar</span>
                  <span className="text-xs text-slate-400 mt-1">Mendukung format PNG, JPG, JPEG, atau PDF (Maks. 10MB)</span>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center gap-3">
                    <Paperclip className="w-4 h-4 text-cyan-400" />
                    <div>
                      <div className="text-sm font-semibold text-white truncate max-w-xs">{selectedFile.name}</div>
                      <div className="text-xs text-slate-400">{(selectedFile.size / 1024).toFixed(1)} KB</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Mengirimkan Laporan...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Kirim Laporan Kendala</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
