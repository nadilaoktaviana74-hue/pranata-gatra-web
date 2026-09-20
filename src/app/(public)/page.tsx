import Link from 'next/link';
import { 
  Download, 
  Smartphone, 
  ShieldCheck, 
  Zap, 
  MapPin, 
  Bell, 
  Database, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  FileText,
  Clock,
  HardDrive
} from 'lucide-react';
import { getLatestRelease } from '@/lib/actions/release-actions';
import { formatBytes, formatDate } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const latestRelease = await getLatestRelease();

  const features = [
    {
      icon: MapPin,
      title: 'Geofencing & Presensi Akurat',
      description: 'Verifikasi lokasi berbasis GPS presisi tinggi untuk validasi kehadiran tugas lapangan tanpa manipulasi koordinat.',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      icon: Layers,
      title: 'Monitoring Penugasan Realtime',
      description: 'Lacak progres kerja lapangan, inspeksi operasional, dan rincian tugas terpusat dengan update status seketika.',
      color: 'from-teal-500 to-emerald-500',
    },
    {
      icon: Database,
      title: 'Arsitektur Offline-First',
      description: 'Tetap bekerja tanpa kendala sinyal. Data tersimpan aman di perangkat dan tersinkronisasi otomatis saat jaringan pulih.',
      color: 'from-indigo-500 to-purple-500',
    },
    {
      icon: Bell,
      title: 'Notifikasi & Broadcast Cepat',
      description: 'Terima instruksi penugasan genting, jadwal darurat, dan pengumuman instansi langsung melalui push notification.',
      color: 'from-amber-500 to-orange-500',
    },
    {
      icon: ShieldCheck,
      title: 'Keamanan Data Berlapis',
      description: 'Enkripsi data end-to-end, otentikasi token JWT yang ketat, dan perlindungan privasi data personil.',
      color: 'from-emerald-500 to-cyan-500',
    },
    {
      icon: FileText,
      title: 'Audit Trail & Rekap Terpadu',
      description: 'Laporan otomatis terstandarisasi yang siap diekspor untuk kebutuhan pertanggungjawaban dan evaluasi kinerja tim.',
      color: 'from-pink-500 to-rose-500',
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Background Glows */}
      <div className="hero-glow top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-75" />
      <div className="hero-glow bottom-40 right-10 opacity-30" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 md:pt-28 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>
                {latestRelease ? `Rilis Resmi Tersedia v${latestRelease.version}` : 'Portal Resmi Distribusi APK'}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
              Sistem Operasional & <br />
              <span className="gradient-text">Aplikasi Pranata Gatra</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Solusi mobilitas terpadu untuk pengawasan operasional, presensi terverifikasi, dan pelaporan lapangan terstandar. Unduh paket instalasi resmi APK dan pantau perkembangan versi terbaru.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/download"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-[#090d16] font-bold text-base shadow-xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:-translate-y-0.5 transition-all duration-200"
              >
                <Download className="w-5 h-5" />
                <span>Unduh APK Terbaru</span>
              </Link>

              <Link
                href="#features"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-base border border-slate-700/80 transition-all duration-200"
              >
                <span>Pelajari Fitur</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
              <div>
                <p className="text-xl sm:text-2xl font-bold text-white">100%</p>
                <p className="text-xs text-slate-400">Terverifikasi Bebas Virus</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-cyan-400">Android</p>
                <p className="text-xs text-slate-400">Dukungan OS 8.0+</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-emerald-400">Direct</p>
                <p className="text-xs text-slate-400">Unduhan Berkecepatan Tinggi</p>
              </div>
            </div>
          </div>

          {/* Right Hero Graphic: Phone Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[340px] aspect-[9/18] rounded-[44px] bg-slate-900/90 border-[7px] border-slate-700/80 p-4 shadow-2xl shadow-cyan-500/20 glass-panel">
              {/* Phone Speaker Notch */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-800 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-slate-900 mr-2" />
                <div className="w-10 h-1 bg-slate-700 rounded-full" />
              </div>

              {/* Inside Phone Screen UI */}
              <div className="w-full h-full bg-[#0a101d] rounded-[32px] pt-7 px-4 pb-4 flex flex-col justify-between overflow-hidden border border-slate-800/60">
                <div className="space-y-4">
                  {/* Mock App Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-cyan-500 flex items-center justify-center text-slate-950 font-black text-xs">
                        PG
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white leading-tight">Pranata Gatra</div>
                        <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                          Online
                        </div>
                      </div>
                    </div>
                    <Bell className="w-4 h-4 text-slate-400" />
                  </div>

                  {/* Mock Status Card */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-br from-cyan-950/70 to-slate-900 border border-cyan-500/30 space-y-2">
                    <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">Status Petugas</span>
                    <div className="text-sm font-semibold text-white">Inspeksi Zona Wilayah A</div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-teal-400" />
                      <span>Geofence Terverifikasi</span>
                    </div>
                  </div>

                  {/* Mock Quick Grid */}
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                      <div className="text-[11px] font-semibold text-white">Presensi</div>
                      <div className="text-[9px] text-slate-400">07:45 WIB</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                      <Layers className="w-4 h-4 text-teal-400 mx-auto mb-1" />
                      <div className="text-[11px] font-semibold text-white">Tugas Aktif</div>
                      <div className="text-[9px] text-slate-400">4 Selesai</div>
                    </div>
                  </div>
                </div>

                {/* Mock Phone Bottom Bar */}
                <div className="pt-3 border-t border-slate-800/80">
                  <div className="py-2.5 px-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-center">
                    <span className="text-xs font-semibold text-cyan-300">Aplikasi Siap Operasional</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Release Highlight Widget Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900/95 via-[#0d1627]/90 to-slate-900/95 border border-cyan-500/20 shadow-2xl shadow-cyan-950/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Rilis Resmi Terkini</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                {latestRelease ? latestRelease.title : 'Pranata Gatra APK - Versi Publik'}
              </h2>
              
              <p className="text-slate-300 text-sm leading-relaxed">
                {latestRelease 
                  ? latestRelease.changelog.slice(0, 180) + (latestRelease.changelog.length > 180 ? '...' : '')
                  : 'Unduh file APK resmi untuk instalasi di smartphone Android Anda. Selalu perbarui aplikasi agar mendapatkan fitur keamanan dan stabilitas terbaik.'}
              </p>

              {latestRelease && (
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                  <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-700/60">
                    <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Versi {latestRelease.version} (Build {latestRelease.version_code})</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-700/60">
                    <HardDrive className="w-3.5 h-3.5 text-teal-400" />
                    <span>{formatBytes(latestRelease.file_size)}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-700/60">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{formatDate(latestRelease.published_at || latestRelease.created_at)}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto shrink-0">
              {latestRelease?.file_path ? (
                <a
                  href={latestRelease.file_path}
                  download
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Unduh APK (v{latestRelease.version})</span>
                </a>
              ) : (
                <Link
                  href="/download"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Ke Halaman Download</span>
                </Link>
              )}

              <Link
                href="/changelog"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700/80 transition-all"
              >
                <span>Lihat Semua Catatan Rilis</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
              <span>Tentang Platform</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Membangun Disiplin, Akurasi, dan Efisiensi Operasional Lapangan
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Pranata Gatra didesain khusus untuk memenuhi kebutuhan pengawasan tugas dan pelaporan personil dengan keandalan tinggi. Integrasi mobile app dan web platform memastikan komunikasi tanpa hambatan antara tim operasional di lapangan dengan pusat pengendali.
            </p>
            <div className="space-y-3 pt-2">
              {[
                'Verifikasi kehadiran bebas kecurangan berbasis radius geografis',
                'Sinkronisasi data otomatis dengan perlindungan enkripsi penuh',
                'Transparansi catatan rilis APK dan pembaruan fitur berkelanjutan',
                'Saluran pelaporan kendala (bug report) yang ditangani secara langsung',
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-300 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-base font-bold text-white">Ringan & Cepat</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dioptimalkan untuk performa tinggi bahkan pada spesifikasi perangkat Android standar.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-teal-400" />
              </div>
              <h3 className="text-base font-bold text-white">Aman & Terpercaya</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Proses validasi file APK terverifikasi secara kriptografis untuk mencegah aplikasi tiruan.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-base font-bold text-white">UI Ergonomis</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tampilan antarmuka yang ramah pengguna, mudah digunakan dalam kondisi lapangan yang dinamis.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Database className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-base font-bold text-white">Storage Terpusat</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Penyimpanan cloud Supabase berkapasitas tinggi untuk riwayat rilis dan berkas pendukung.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
            <span>Kemampuan Sistem</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Fitur Utama Aplikasi Mobile Pranata Gatra
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Eksplorasi modul lengkap yang telah dirancang untuk menjamin kelancaran, akurasi, dan transparansi kegiatan tim di lapangan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-slate-900/50 hover:bg-slate-900/80 border border-slate-800/80 hover:border-cyan-500/30 transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/20 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} p-0.5 shadow-md`}>
                    <div className="w-full h-full bg-[#090d16] rounded-[10px] flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bug Report & Support Banner CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-10">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-[#0a1324] to-slate-900 border border-slate-800 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white max-w-xl mx-auto">
            Menemukan Kendala atau Memiliki Pertanyaan Teknis?
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto leading-relaxed">
            Tim developer Pranata Gatra selalu siap menindaklanjuti laporan kendala operasional Anda secara cepat dan terkoordinasi.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/report"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-bold text-sm shadow-md hover:brightness-110 transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>Kirim Laporan Bug</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-all"
            >
              <span>Hubungi Kontak Resmi</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
