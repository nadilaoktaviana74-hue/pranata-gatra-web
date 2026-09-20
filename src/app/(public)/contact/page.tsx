import { Metadata } from 'next';
import { Mail, MessageSquare, MapPin, Phone, ShieldCheck, Clock, ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/components/shared/icons';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Kontak & Dukungan Resmi',
  description: 'Hubungi tim pengembang dan pengelola platform Pranata Gatra untuk kebutuhan integrasi, dukungan teknis, dan informasi instansi.',
};

export default function ContactPage() {
  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-semibold">
          <Mail className="w-3.5 h-3.5 text-cyan-400" />
          <span>Saluran Komunikasi Resmi</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Hubungi Tim <span className="gradient-text">Pranata Gatra</span>
        </h1>
        <p className="text-slate-300 text-base leading-relaxed">
          Kami siap membantu integrasi sistem, menjawab pertanyaan teknis seputar aplikasi Android, serta menampung masukan Anda.
        </p>
      </div>

      {/* Grid Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Support Email */}
        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4 hover:border-cyan-500/30 transition-all flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <Mail className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-lg font-bold text-white">Email Dukungan</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Kirimkan email untuk pertanyaan umum, kendala otentikasi akun, atau konsultasi teknis.
            </p>
          </div>
          <div className="pt-4 border-t border-slate-800/80">
            <a
              href="mailto:support@pranatagatra.my.id"
              className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 break-all flex items-center gap-1.5"
            >
              <span>support@pranatagatra.my.id</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>
          </div>
        </div>

        {/* GitHub Repository */}
        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4 hover:border-cyan-500/30 transition-all flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center">
              <GithubIcon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white">Repositori GitHub</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Akses repositori kode, issue tracker, dokumentasi teknis, dan audit rilis open-source.
            </p>
          </div>
          <div className="pt-4 border-t border-slate-800/80">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5"
            >
              <span>github.com/pranata-gatra</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>
          </div>
        </div>

        {/* Bug Tracking */}
        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4 hover:border-cyan-500/30 transition-all flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-rose-400" />
            </div>
            <h3 className="text-lg font-bold text-white">Pelaporan Kendala</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Menemukan bug pada aplikasi smartphone? Laporkan langsung melalui formulir terverifikasi kami.
            </p>
          </div>
          <div className="pt-4 border-t border-slate-800/80">
            <Link
              href="/report"
              className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5"
            >
              <span>Buka Formulir Lapor Bug</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </Link>
          </div>
        </div>
      </div>

      {/* Operational SLA & Security Info */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/40 border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
            <Clock className="w-4 h-4" />
            <span>Jam Operasional & SLA Penanganan</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Monitoring & Tindak Lanjut Responsif
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Tim developer dan administrator memantau tiket masuk setiap hari kerja (Senin - Jumat, 08:00 - 17:00 WIB). Laporan kendala kategori kritis mendapatkan prioritas penanganan dalam waktu 1x24 jam.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>Keamanan Saluran</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Seluruh data pelaporan bug, berkas screenshot, dan informasi log disimpan dalam database terenkripsi Supabase dengan perlindungan Row Level Security (RLS) berstandar industri.
          </p>
        </div>
      </div>
    </div>
  );
}
