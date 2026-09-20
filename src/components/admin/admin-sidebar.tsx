'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  Bug, 
  Settings, 
  LogOut, 
  Smartphone, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { logoutAdmin } from '@/lib/actions/auth-actions';

interface AdminSidebarProps {
  userEmail?: string | null;
}

export function AdminSidebar({ userEmail }: AdminSidebarProps) {
  const pathname = usePathname();

  const links = [
    {
      href: '/admin/dashboard',
      label: 'Overview',
      icon: LayoutDashboard,
      exact: true,
    },
    {
      href: '/admin/dashboard/releases',
      label: 'Kelola Rilis APK',
      icon: Package,
      exact: false,
    },
    {
      href: '/admin/dashboard/bug-reports',
      label: 'Laporan Kendala',
      icon: Bug,
      exact: false,
    },
    {
      href: '/admin/dashboard/settings',
      label: 'Pengaturan & Akun',
      icon: Settings,
      exact: false,
    },
  ];

  const isActive = (href: string, exact: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-64 bg-[#090d16] border-r border-slate-800 flex flex-col justify-between h-screen sticky top-0 shrink-0 z-30">
      <div className="space-y-6 p-4">
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-2 py-3 border-b border-slate-800/80">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center p-0.5 shadow-md shadow-cyan-500/20">
            <div className="w-full h-full bg-[#090d16] rounded-[10px] flex items-center justify-center">
              <Smartphone className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
              <span>Pranata Gatra</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-semibold">
                Admin
              </span>
            </div>
            <p className="text-[11px] text-slate-500">Pusat Kendali Sistem</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1.5">
          {links.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href, link.exact);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  active
                    ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom User Profile & Actions */}
      <div className="p-4 border-t border-slate-800/80 space-y-3">
        {/* Link back to public site */}
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 text-xs transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Lihat Website Publik</span>
          </span>
        </Link>

        {/* Admin info badge */}
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="truncate font-medium">{userEmail || 'Administrator'}</span>
          </div>
          <span className="text-[10px] text-slate-500 block">Sesi Terotentikasi</span>
        </div>

        {/* Logout button */}
        <form action={logoutAdmin}>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 text-xs font-semibold transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar (Logout)</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
