'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Download, Menu, X } from 'lucide-react';
import { PranataGatraLogo } from '@/components/branding/PranataGatraLogo';

interface NavLinkItem {
  href: string;
  label: string;
}

const NAV_LINKS: NavLinkItem[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/features', label: 'Features' },
  { href: '/changelog', label: 'Changelogs' },
  { href: '/report', label: 'Report' },
];

export function FloatingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-3 sm:top-5 inset-x-0 z-50 max-w-5xl mx-auto px-3 sm:px-6 pointer-events-none">
      {/* Floating Pill Container */}
      <div className="pointer-events-auto liquid-glass-nav rounded-full px-3.5 py-2 sm:px-5 sm:py-2.5 flex items-center justify-between transition-all duration-300">
        
        {/* ====================================================
            1. LEFT AREA: Pranata Gatra Logo (Full Image)
           ==================================================== */}
        <div className="flex items-center shrink-0">
          <PranataGatraLogo />
        </div>

        {/* ====================================================
            2. CENTER AREA: Exactly 5 Navigation Items
           ==================================================== */}
        <nav className="hidden md:flex items-center gap-1 justify-center">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  active
                    ? 'text-[#FFE8B3] bg-[#B38D46]/20 border border-[#B38D46]/40 shadow-sm shadow-[#B38D46]/10'
                    : 'text-neutral-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* ====================================================
            3. RIGHT AREA: Download APK Button
           ==================================================== */}
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/download"
            className="gold-gradient text-neutral-950 font-semibold text-xs px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-md shadow-[#B38D46]/25 hover:shadow-lg hover:shadow-[#B38D46]/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-neutral-950" />
            <span>Download APK</span>
          </Link>

          {/* Mobile Drawer Toggle (Under md breakpoint) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer / Glass Modal for Center Navigation Links */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden mt-2 liquid-glass-nav rounded-2xl p-4 space-y-3 animate-in fade-in slide-in-from-top-3 duration-200">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? 'text-[#FFE8B3] bg-[#B38D46]/20 border border-[#B38D46]/30'
                      : 'text-neutral-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{link.label}</span>
                  {active && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFE8B3]" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            <Link
              href="/download"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full gold-gradient text-neutral-950 font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-[#B38D46]/20"
            >
              <Download className="w-4 h-4" />
              <span>Download APK</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
