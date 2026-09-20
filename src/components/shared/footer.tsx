import Link from 'next/link';
import { Smartphone, Mail, ShieldCheck, Heart, ArrowUpRight, Activity } from 'lucide-react';
import { GithubIcon } from '@/components/shared/icons';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-800/80 bg-[#060911] text-slate-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 p-0.5 shadow-md shadow-cyan-500/20">
                <div className="w-full h-full bg-[#090d16] rounded-[10px] flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div>
                <span className="font-bold text-lg text-white tracking-tight">Pranata Gatra</span>
                <p className="text-xs text-slate-500">Aplikasi & Platform Terpadu</p>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Platform resmi pendukung ekosistem aplikasi mobile Pranata Gatra. Menyediakan distribusi rilis APK terverifikasi, catatan pembaruan transparan, serta penanganan kendala teknis responsif.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Seluruh Sistem & Repositori Normal</span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Navigasi</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-cyan-400 transition-colors">
                  Tentang Aplikasi
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-cyan-400 transition-colors">
                  Fitur Utama
                </Link>
              </li>
              <li>
                <Link href="/download" className="hover:text-cyan-400 transition-colors">
                  Unduh APK
                </Link>
              </li>
              <li>
                <Link href="/changelog" className="hover:text-cyan-400 transition-colors">
                  Riwayat Changelog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Community */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Dukungan</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/report" className="hover:text-cyan-400 transition-colors">
                  Lapor Kendala / Bug
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyan-400 transition-colors">
                  Hubungi Pengembang
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                  <span>Portal Administrator</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & External */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Tautan Resmi</h3>
            <div className="space-y-2 text-sm">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Repository</span>
                <ArrowUpRight className="w-3 h-3 text-slate-500 ml-auto" />
              </a>
              <a
                href="mailto:support@pranatagatra.my.id"
                className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>support@pranatagatra.my.id</span>
              </a>
            </div>
            <p className="text-xs text-slate-500 pt-2">
              Distribusi resmi file instalasi `.apk` aman, terenkripsi, dan bebas malware.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} Pranata Gatra. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex items-center gap-6">
            <span>Dirancang dengan dedikasi untuk performa & kehandalan</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
