import { createClient } from '@/lib/supabase/server';
import { 
  Settings, 
  User, 
  ShieldCheck, 
  Database, 
  HardDrive, 
  LogOut, 
  Server, 
  Globe,
  Key
} from 'lucide-react';
import { logoutAdmin } from '@/lib/actions/auth-actions';
import { formatDate } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
          <Settings className="w-6 h-6 text-[#B38D46]" />
          <span>Administrator Settings & Account</span>
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 mt-1">
          Active administrative session details and cloud connectivity status parameters.
        </p>
      </div>

      {/* Profile Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/80 border border-neutral-800 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#B38D46]/15 border border-[#B38D46]/30 flex items-center justify-center">
            <User className="w-7 h-7 text-[#FFE8B3]" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Administrator Profile</h2>
            <p className="text-xs text-neutral-400">Authenticated via Supabase Auth</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-neutral-800">
          <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800/80 space-y-1">
            <span className="text-[11px] text-neutral-500 font-semibold uppercase tracking-wider">
              Email Address
            </span>
            <div className="text-sm font-semibold text-white truncate">
              {user?.email || '-'}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800/80 space-y-1">
            <span className="text-[11px] text-neutral-500 font-semibold uppercase tracking-wider">
              User ID (UID)
            </span>
            <div className="text-xs font-mono text-[#FFE8B3] truncate">
              {user?.id || '-'}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800/80 space-y-1">
            <span className="text-[11px] text-neutral-500 font-semibold uppercase tracking-wider">
              Role Authority
            </span>
            <div className="text-sm font-semibold text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>{user?.role || 'authenticated'}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800/80 space-y-1">
            <span className="text-[11px] text-neutral-500 font-semibold uppercase tracking-wider">
              Last Sign-In
            </span>
            <div className="text-xs text-neutral-300">
              {user?.last_sign_in_at ? formatDate(user.last_sign_in_at) : 'Active Session'}
            </div>
          </div>
        </div>

        {/* Logout button */}
        <div className="pt-4 border-t border-neutral-800 flex justify-end">
          <form action={logoutAdmin}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 hover:text-rose-300 font-bold text-xs border border-rose-500/30 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out of Admin Console</span>
            </button>
          </form>
        </div>
      </div>

      {/* System & Storage Environment Information */}
      <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Server className="w-4 h-4 text-[#B38D46]" />
          <span>Infrastructure & Environment Status</span>
        </h2>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
            <span className="text-neutral-400 flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-[#B38D46]" />
              <span>Supabase PostgreSQL Endpoint</span>
            </span>
            <span className="font-mono text-[#FFE8B3]">
              {process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Configured (Active)' : 'Unset'}
            </span>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
            <span className="text-neutral-400 flex items-center gap-2">
              <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
              <span>APK Storage Bucket</span>
            </span>
            <span className="font-mono text-emerald-400">bucket: &apos;apks&apos; (Public CDN)</span>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
            <span className="text-neutral-400 flex items-center gap-2">
              <Key className="w-3.5 h-3.5 text-amber-400" />
              <span>Bug Attachment Bucket</span>
            </span>
            <span className="font-mono text-amber-400">bucket: &apos;bug-attachments&apos; (Private Signed URLs)</span>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
            <span className="text-neutral-400 flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-[#B38D46]" />
              <span>App Host URL</span>
            </span>
            <span className="font-mono text-neutral-300">
              {process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
