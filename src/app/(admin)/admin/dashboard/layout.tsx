import { createClient } from '@/lib/supabase/server';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { redirect } from 'next/navigation';

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-neutral-100 flex flex-col md:flex-row selection:bg-[#B38D46]/25 selection:text-[#FFE8B3]">
      {/* Sidebar */}
      <AdminSidebar userEmail={user.email} />

      {/* Main Dashboard Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Navbar */}
        <header className="h-16 border-b border-neutral-800/80 bg-[#0c0c0f]/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-400">Pranata Gatra</span>
            <span className="text-neutral-600">/</span>
            <span className="text-xs font-semibold text-[#FFE8B3]">Admin Console</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-neutral-300 bg-neutral-900 px-3 py-1.5 rounded-full border border-neutral-800">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Database Connected</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          {children}
        </main>
      </div>
    </div>
  );
}
