import Link from 'next/link';
import { Mail, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { GithubIcon, InstagramIcon } from '@/components/shared/icons';
import { Logo } from '@/components/shared/logo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-neutral-800/80 bg-[#070709] text-neutral-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="md" showText={true} />
            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              The official companion platform for the Pranata Gatra Android application. Centralizing workspaces, task priority workflows, academic schedules, and verified APK distribution.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#B38D46]/10 border border-[#B38D46]/20 text-[#FFE8B3] text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-[#B38D46] animate-pulse" />
              <span>Official Release Channel • Secure APK</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-neutral-200 tracking-wider uppercase">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-[#FFE8B3] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#FFE8B3] transition-colors">
                  About Pranata Gatra
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-[#FFE8B3] transition-colors">
                  Core Features
                </Link>
              </li>
              <li>
                <Link href="/download" className="hover:text-[#FFE8B3] transition-colors">
                  Download APK
                </Link>
              </li>
              <li>
                <Link href="/changelog" className="hover:text-[#FFE8B3] transition-colors">
                  Release Changelog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Community */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-neutral-200 tracking-wider uppercase">Support & Issues</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/report" className="hover:text-[#FFE8B3] transition-colors">
                  Report a Bug
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#FFE8B3] transition-colors">
                  Contact Team
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-[#FFE8B3] transition-colors flex items-center gap-1.5">
                  <span>Admin Console</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-500" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-neutral-200 tracking-wider uppercase">Official Channels</h3>
            <div className="space-y-2.5 text-sm">
              <a
                href="https://github.com/dzakiluqman/pranata-gatra"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-[#FFE8B3] transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Repository</span>
                <ArrowUpRight className="w-3 h-3 text-neutral-600 ml-auto" />
              </a>
              <a
                href="https://www.instagram.com/pranatagatra.id"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-[#FFE8B3] transition-colors"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>Instagram</span>
                <ArrowUpRight className="w-3 h-3 text-neutral-600 ml-auto" />
              </a>
              <a
                href="mailto:pranatagatra.id@gmail.com"
                className="flex items-center gap-2 hover:text-[#FFE8B3] transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="truncate">pranatagatra.id@gmail.com</span>
              </a>
            </div>
            <p className="text-xs text-neutral-500 pt-2 leading-relaxed">
              All published APK packages are verified for cryptographic integrity and stored securely on cloud storage.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {currentYear} Pranata Gatra. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Built for reliability, speed, and collaborative productivity</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
