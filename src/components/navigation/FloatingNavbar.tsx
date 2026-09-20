'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Download, Menu, X } from 'lucide-react';

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
    <header className="fixed top-3 sm:top-5 inset-x-0 z-50 px-3 sm:px-6 lg:px-8 pointer-events-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">

        {/* ====================================================
            1. LEFT SEPARATE PILL: Full Image Brand Logo Island
           ==================================================== */}
        <div className="pointer-events-auto bg-black/30 backdrop-blur-xl border border-white/10 rounded-full h-[50px] px-3.5 sm:px-4.5 flex items-center shrink-0 transition-transform duration-200 hover:scale-[1.01] shadow-lg shadow-black/20">
          <Link href="/" className="flex items-center select-none" aria-label="Pranata Gatra Home">
            <Image
              src="/images/pranata-gatra-logo.png"
              alt="Pranata Gatra"
              width={180}
              height={32}
              className="h-6 sm:h-7 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        {/* ====================================================
            2. CENTER SEPARATE PILL: Navigation Links Island
           ==================================================== */}
        <nav className="pointer-events-auto hidden md:flex items-center gap-5 lg:gap-7 bg-black/30 backdrop-blur-xl border border-white/10 rounded-full h-[50px] px-5 sm:px-6 shadow-lg shadow-black/20">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs transition-colors duration-200 ${active
                    ? 'text-[#FFE8B3] font-semibold'
                    : 'text-neutral-400 font-medium hover:text-white'
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* ====================================================
            3. RIGHT SEPARATE PILL: Download APK Button Island
           ==================================================== */}
        <div className="pointer-events-auto flex items-center gap-2 h-[50px] shrink-0">
          <Link
            href="/download"
            className="h-full px-4 sm:px-5 rounded-full gold-gradient text-neutral-950 font-bold text-xs sm:text-xs shadow-md shadow-[#B38D46]/25 hover:shadow-lg hover:shadow-[#B38D46]/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center gap-1.5 sm:gap-2"
          >
            <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-950 stroke-[2.2]" />
            <span>Download APK</span>
          </Link>

          {/* Mobile Drawer Toggle (Under md breakpoint) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden h-full aspect-square rounded-full bg-black/30 backdrop-blur-xl border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white transition-colors shadow-lg shadow-black/20"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer / Glass Modal for Navigation Links on small screens */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden mt-2 max-w-sm mx-auto bg-[#09090b]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 space-y-3 animate-in fade-in slide-in-from-top-3 duration-200 shadow-2xl">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition-colors ${active
                      ? 'text-[#FFE8B3] font-semibold'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
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
        </div>
      )}
    </header>
  );
}

