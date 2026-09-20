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
  name: z.string().min(2, 'Full name must be at least 2 characters').max(255),
  email: z.string().email('Please enter a valid email address').max(255),
  title: z.string().min(5, 'Issue title must be at least 5 characters').max(255),
  description: z.string().min(15, 'Please provide a detailed description of at least 15 characters'),
  app_version: z.string().min(1, 'Application version is required (e.g., v1.0.0)').max(50),
  device: z.string().min(2, 'Device model is required (e.g., Samsung Galaxy S23)').max(100),
  os_version: z.string().min(1, 'Android/OS version is required (e.g., Android 14)').max(100),
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
        toast.error('Attachment size exceeds the 10MB limit.');
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
    const toastId = toast.loading('Submitting bug report...');

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
        toast.success('Bug report submitted successfully! The team has received your ticket.', {
          id: toastId,
        });
        setIsSubmitted(true);
        reset();
        setSelectedFile(null);
      } else {
        toast.error(res.error || 'Failed to submit report. Please check input and try again.', {
          id: toastId,
        });
      }
    } catch {
      toast.error('Network or server error encountered.', {
        id: toastId,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12 pb-24 pt-24 sm:pt-28">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B38D46]/10 border border-[#B38D46]/25 text-[#FFE8B3] text-xs font-semibold">
          <Bug className="w-3.5 h-3.5 text-[#B38D46]" />
          <span>Support & Technical Feedback</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Report a <span className="gold-gradient-text">Bug or Issue</span>
        </h1>
        <p className="text-neutral-300 text-base leading-relaxed max-w-2xl mx-auto">
          Help us improve Pranata Gatra. Provide details of the issue you encountered along with optional screenshots or device logs.
        </p>
      </div>

      {isSubmitted ? (
        <div className="p-8 sm:p-14 rounded-3xl bg-neutral-900/80 border border-[#B38D46]/40 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-[#B38D46]/20 border border-[#B38D46]/40 text-[#FFE8B3] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8 text-[#B38D46]" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Your Bug Report Has Been Received!</h2>
            <p className="text-neutral-300 text-sm max-w-lg mx-auto leading-relaxed">
              Thank you for helping us maintain software quality. Your ticket has been logged with status <strong className="text-[#FFE8B3]">OPEN</strong>. Our engineers will review it promptly.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="px-7 py-3 rounded-full gold-gradient text-neutral-950 font-bold text-xs shadow-lg shadow-[#B38D46]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Submit Another Report
          </button>
        </div>
      ) : (
        <div className="p-6 sm:p-10 rounded-3xl bg-neutral-900/60 border border-neutral-800 shadow-2xl backdrop-blur-md">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Reporter Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-neutral-300 flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-[#B38D46]" />
                  <span>Full Name *</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Alex Morgan"
                  {...register('name')}
                  className={`w-full px-4 py-3 rounded-xl bg-neutral-950 border text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#B38D46] transition-all placeholder:text-neutral-600 ${
                    errors.name ? 'border-rose-500/80' : 'border-neutral-800'
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
                <label className="text-xs font-semibold text-neutral-300 flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#B38D46]" />
                  <span>Email Address *</span>
                </label>
                <input
                  type="email"
                  placeholder="alex@university.edu"
                  {...register('email')}
                  className={`w-full px-4 py-3 rounded-xl bg-neutral-950 border text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#B38D46] transition-all placeholder:text-neutral-600 ${
                    errors.email ? 'border-rose-500/80' : 'border-neutral-800'
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
                <label className="text-xs font-semibold text-neutral-300 flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-[#B38D46]" />
                  <span>App Version *</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. v1.0.0"
                  {...register('app_version')}
                  className={`w-full px-4 py-3 rounded-xl bg-neutral-950 border text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#B38D46] transition-all placeholder:text-neutral-600 ${
                    errors.app_version ? 'border-rose-500/80' : 'border-neutral-800'
                  }`}
                />
                {errors.app_version && (
                  <p className="text-xs text-rose-400">{errors.app_version.message}</p>
                )}
              </div>

              {/* Device Model */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-neutral-300 flex items-center gap-2">
                  <Smartphone className="w-3.5 h-3.5 text-[#B38D46]" />
                  <span>Device Model *</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Pixel 8 / Galaxy S24"
                  {...register('device')}
                  className={`w-full px-4 py-3 rounded-xl bg-neutral-950 border text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#B38D46] transition-all placeholder:text-neutral-600 ${
                    errors.device ? 'border-rose-500/80' : 'border-neutral-800'
                  }`}
                />
                {errors.device && (
                  <p className="text-xs text-rose-400">{errors.device.message}</p>
                )}
              </div>

              {/* OS Version */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-neutral-300 flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-[#B38D46]" />
                  <span>Android / OS *</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Android 14"
                  {...register('os_version')}
                  className={`w-full px-4 py-3 rounded-xl bg-neutral-950 border text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#B38D46] transition-all placeholder:text-neutral-600 ${
                    errors.os_version ? 'border-rose-500/80' : 'border-neutral-800'
                  }`}
                />
                {errors.os_version && (
                  <p className="text-xs text-rose-400">{errors.os_version.message}</p>
                )}
              </div>
            </div>

            {/* Issue Title */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-300 flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-[#B38D46]" />
                <span>Issue Summary / Title *</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Task priority fails to auto-calculate after changing deadline date"
                {...register('title')}
                className={`w-full px-4 py-3 rounded-xl bg-neutral-950 border text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#B38D46] transition-all placeholder:text-neutral-600 ${
                  errors.title ? 'border-rose-500/80' : 'border-neutral-800'
                }`}
              />
              {errors.title && (
                <p className="text-xs text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.title.message}</span>
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-300 flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-[#B38D46]" />
                <span>Detailed Description & Reproduction Steps *</span>
              </label>
              <textarea
                rows={5}
                placeholder="Please explain: 1. Steps to reproduce 2. Expected behavior 3. What actually happened..."
                {...register('description')}
                className={`w-full px-4 py-3 rounded-xl bg-neutral-950 border text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#B38D46] transition-all leading-relaxed placeholder:text-neutral-600 ${
                  errors.description ? 'border-rose-500/80' : 'border-neutral-800'
                }`}
              />
              {errors.description && (
                <p className="text-xs text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.description.message}</span>
                </p>
              )}
            </div>

            {/* Attachment Upload */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-300 flex items-center gap-2">
                <Paperclip className="w-3.5 h-3.5 text-[#B38D46]" />
                <span>Screenshot or Attachment (Optional, max 10MB)</span>
              </label>

              {!selectedFile ? (
                <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-neutral-800 hover:border-[#B38D46]/50 rounded-2xl cursor-pointer bg-neutral-950/40 hover:bg-neutral-950/70 transition-all text-center">
                  <UploadCloud className="w-8 h-8 text-[#B38D46] mb-2" />
                  <span className="text-sm font-semibold text-white">Click to select screenshot or log file</span>
                  <span className="text-xs text-neutral-400 mt-1">Supports PNG, JPG, JPEG, or PDF formats</span>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                  <div className="flex items-center gap-3">
                    <Paperclip className="w-4 h-4 text-[#B38D46]" />
                    <div>
                      <div className="text-sm font-semibold text-white truncate max-w-xs">{selectedFile.name}</div>
                      <div className="text-xs text-neutral-400">{(selectedFile.size / 1024).toFixed(1)} KB</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full gold-gradient text-neutral-950 font-bold text-sm shadow-xl shadow-[#B38D46]/20 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Ticket...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Bug Report</span>
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
