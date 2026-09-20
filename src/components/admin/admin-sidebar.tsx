'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  Bug, 
  Settings, 
  LogOut, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { logoutAdmin } from '@/lib/actions/auth-actions';
import { Logo } from '@/components/shared/logo';

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
      label: 'Manage Releases',
      icon: Package,
      exact: false,
    },
    {
      href: '/admin/dashboard/bug-reports',
      label: 'Bug Reports',
      icon: Bug,
      exact: false,
    },
    {
      href: '/admin/dashboard/settings',
      label: 'Settings & Account',
      icon: Settings,
      exact: false,
    },
  ];

  const isActive = (href: string, exact: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-64 bg-[#0c0c0f] border-r border-neutral-800 flex flex-col justify-between h-screen sticky top-0 shrink-0 z-30">
      <div className="space-y-6 p-4">
        {/* Brand Header */}
        <div className="px-2 py-3 border-b border-neutral-800/80">
          <Logo size="sm" showText={true} />
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
                    ? 'bg-[#B38D46]/15 text-[#FFE8B3] border border-[#B38D46]/30 shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-[#FFE8B3]' : 'text-neutral-400'}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom User Profile & Actions */}
      <div className="p-4 border-t border-neutral-800/80 space-y-3">
        {/* Link back to public site */}
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800/50 text-xs transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-[#B38D46]" />
            <span>View Public Website</span>
          </span>
        </Link>

        {/* Admin session badge */}
        <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800/80 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-neutral-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="truncate font-medium">{userEmail || 'Administrator'}</span>
          </div>
          <span className="text-[10px] text-neutral-500 block">Authenticated Session</span>
        </div>

        {/* Logout button */}
        <form action={logoutAdmin}>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 text-xs font-semibold transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
