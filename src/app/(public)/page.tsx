import Link from 'next/link';
import { 
  Download, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  HardDrive,
  Layers,
  Calendar,
  Bell,
  Users2,
  Lock,
  Flame
} from 'lucide-react';
import { getLatestRelease } from '@/lib/actions/release-actions';
import { formatBytes, formatDate } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const latestRelease = await getLatestRelease();

  return (
    <div className="relative overflow-hidden space-y-24 sm:space-y-32 pb-24">
      {/* Background Soft Glows */}
      <div className="gold-hero-glow top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 opacity-80" />
      <div className="gold-hero-glow bottom-40 right-10 opacity-30" />

      {/* ========================================================
          1. HERO SECTION
         ======================================================== */}
      <section className="relative pt-12 sm:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Live Release Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B38D46]/10 border border-[#B38D46]/30 text-[#FFE8B3] text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#B38D46] animate-pulse" />
              <span>
                {latestRelease ? `Latest Release Available: v${latestRelease.version}` : 'Official Android APK Release Portal'}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
              Unify Your Workspaces, <br className="hidden sm:inline" />
              <span className="gold-gradient-text">Master Your Schedule.</span>
            </h1>

            {/* Short Product Description */}
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Pranata Gatra is an Android productivity and collaboration application designed to centralize tasks, academic subjects, schedules, and team assignments into unified Workspaces with automatic priority tracking.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-1">
              <Link
                href="/download"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full gold-gradient text-neutral-950 font-bold text-sm shadow-xl shadow-[#B38D46]/20 hover:shadow-[#B38D46]/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <Download className="w-4 h-4 text-neutral-950" />
                <span>Download APK {latestRelease ? `(v${latestRelease.version})` : ''}</span>
              </Link>

              <Link
                href="/features"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 hover:text-white font-semibold text-sm border border-neutral-700/80 hover:border-[#B38D46]/40 transition-all duration-200"
              >
                <span>Explore Features</span>
                <ArrowRight className="w-4 h-4 text-[#B38D46]" />
              </Link>
            </div>

            {/* Trust & Architecture Metrics */}
            <div className="pt-6 border-t border-neutral-800/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
              <div>
                <p className="text-xl sm:text-2xl font-black text-white">Unified</p>
                <p className="text-xs text-neutral-400">Flexible Workspaces</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-[#FFE8B3]">Smart</p>
                <p className="text-xs text-neutral-400">Deadline Proximity</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-white">Android</p>
                <p className="text-xs text-neutral-400">SDK & Native Speed</p>
              </div>
            </div>
          </div>

          {/* Right Hero Graphic: Phone Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[340px] aspect-[9/18.5] rounded-[46px] bg-[#0E0E12] border-[7px] border-neutral-800 p-3.5 shadow-2xl shadow-black/80 liquid-glass-card">
              {/* Phone Speaker Notch */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-4 bg-neutral-900 rounded-full flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-950 mr-2" />
                <div className="w-8 h-1 bg-neutral-800 rounded-full" />
              </div>

              {/* Inside Mobile App UI Mockup */}
              <div className="w-full h-full bg-[#0b0b0e] rounded-[34px] pt-7 px-4 pb-4 flex flex-col justify-between overflow-hidden border border-neutral-800/60">
                <div className="space-y-4">
                  {/* Mock App Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-800/80">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg gold-gradient flex items-center justify-center text-neutral-950 font-black text-[11px] shadow-sm">
                        PG
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white leading-tight">Semester 5 Workspace</div>
                        <div className="text-[10px] text-[#FFE8B3]/90 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#B38D46] animate-pulse" />
                          4 Active Tasks
                        </div>
                      </div>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-400">
                      <Bell className="w-3 h-3" />
                    </div>
                  </div>

                  {/* Mock Workspace Highlight Card */}
                  <div className="p-3.5 rounded-2xl bg-neutral-900/90 border border-[#B38D46]/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFE8B3]">Subject Schedule</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#B38D46]/20 text-[#FFE8B3] font-semibold">Today</span>
                    </div>
                    <div className="text-xs font-bold text-white">Software Architecture</div>
                    <div className="flex items-center justify-between text-[11px] text-neutral-400">
                      <span>Room 304 • Lab C</span>
                      <span className="font-mono text-[#FFE8B3]">10:00 - 12:30</span>
                    </div>
                  </div>

                  {/* Mock Automatic Priority Task */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">High Urgency Tasks</span>
                    <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-white">Final Project Sprint</span>
                        <span className="inline-flex items-center gap-1 text-[9px] font-bold text-amber-300 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                          <Flame className="w-2.5 h-2.5 text-[#B38D46]" />
                          Due in 4h
                        </span>
                      </div>
                      <div className="text-[10px] text-neutral-400">Assigned to: Dzacky & Nadila</div>
                    </div>
                  </div>

                  {/* Mock Collaboration Pill */}
                  <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800/80 flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-2 text-neutral-300">
                      <Users2 className="w-3.5 h-3.5 text-[#B38D46]" />
                      <span>Workspace Members</span>
                    </div>
                    <span className="text-[10px] font-semibold text-[#FFE8B3]">6 Members</span>
                  </div>
                </div>

                {/* Mock Bottom App Bar */}
                <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-around text-neutral-500 text-[10px]">
                  <span className="text-[#FFE8B3] font-semibold">Tasks</span>
                  <span>Schedule</span>
                  <span>Subjects</span>
                  <span>Profile</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          2. LATEST RELEASE SPOTLIGHT SECTION
         ======================================================== */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 sm:p-10 rounded-3xl bg-neutral-900/60 border border-neutral-800 hover:border-[#B38D46]/30 transition-all duration-300 relative overflow-hidden shadow-2xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B38D46]/15 border border-[#B38D46]/30 text-[#FFE8B3] text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#B38D46] animate-pulse" />
                <span>Verified Release Channel</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                {latestRelease ? latestRelease.title : 'Pranata Gatra Android Application'}
              </h2>
              
              <p className="text-neutral-300 text-sm leading-relaxed">
                {latestRelease 
                  ? latestRelease.changelog.slice(0, 180) + (latestRelease.changelog.length > 180 ? '...' : '')
                  : 'Install the official Android package to manage your workspaces, track task deadlines, and coordinate schedules with your team.'}
              </p>

              {latestRelease && (
                <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400 pt-1">
                  <div className="flex items-center gap-1.5 bg-neutral-950/80 px-3 py-1.5 rounded-lg border border-neutral-800">
                    <span className="text-[#FFE8B3] font-semibold">Version {latestRelease.version}</span>
                    <span className="text-neutral-500">(Build {latestRelease.version_code})</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-neutral-950/80 px-3 py-1.5 rounded-lg border border-neutral-800">
                    <HardDrive className="w-3.5 h-3.5 text-[#B38D46]" />
                    <span>{formatBytes(latestRelease.file_size)}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-neutral-950/80 px-3 py-1.5 rounded-lg border border-neutral-800">
                    <Clock className="w-3.5 h-3.5 text-neutral-400" />
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
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full gold-gradient text-neutral-950 font-bold text-sm shadow-lg shadow-[#B38D46]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download APK (v{latestRelease.version})</span>
                </a>
              ) : (
                <Link
                  href="/download"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full gold-gradient text-neutral-950 font-bold text-sm shadow-lg shadow-[#B38D46]/20 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Visit Download Page</span>
                </Link>
              )}

              <Link
                href="/changelog"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-neutral-950 hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs font-semibold border border-neutral-800 transition-all"
              >
                <span>View Full Changelog</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#B38D46]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. PRODUCT CONTEXT & WORKSPACE ARCHITECTURE
         ======================================================== */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B38D46]/10 border border-[#B38D46]/25 text-[#FFE8B3] text-xs font-semibold">
              <span>One Unified Model</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              A Workspace Is Any Realm You Need It To Be
            </h2>
            <p className="text-neutral-300 text-base leading-relaxed">
              Instead of fragmenting work into restrictive, separate tools, Pranata Gatra uses a single, flexible Workspace container. A Workspace can represent a semester, an academic course group, a team project, or a student organization.
            </p>
            <div className="space-y-3.5 pt-1">
              {[
                { title: 'Isolated Collaboration', desc: 'Each Workspace holds its own members, tasks, and schedules with strict data privacy.' },
                { title: 'Subject Association', desc: 'Tasks can optionally reference a Subject (e.g. "Complete Wireframes" under "UI/UX Design").' },
                { title: 'Member Delegation', desc: 'Assign specific tasks to collaborators and track progress in real time.' },
                { title: 'Email Invitations', desc: 'Invite peers seamlessly via email with instant notification and role management.' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#B38D46] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-sm font-semibold text-white">{item.title}: </span>
                    <span className="text-sm text-neutral-400">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pillars Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-[#B38D46]/30 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#B38D46]/15 border border-[#B38D46]/30 flex items-center justify-center">
                <Layers className="w-5 h-5 text-[#FFE8B3]" />
              </div>
              <h3 className="text-base font-bold text-white">Workspaces</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Centralize activities, course rosters, and project milestones into clean, unified workspaces.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-[#B38D46]/30 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#B38D46]/15 border border-[#B38D46]/30 flex items-center justify-center">
                <Flame className="w-5 h-5 text-[#FFE8B3]" />
              </div>
              <h3 className="text-base font-bold text-white">Automatic Priority</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Smart priority algorithm dynamically elevates tasks as their deadlines draw closer.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-[#B38D46]/30 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#B38D46]/15 border border-[#B38D46]/30 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[#FFE8B3]" />
              </div>
              <h3 className="text-base font-bold text-white">Class Schedules</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Attach lecturer details, room locations, and weekly recurring slots with automated reminders.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-[#B38D46]/30 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#B38D46]/15 border border-[#B38D46]/30 flex items-center justify-center">
                <Lock className="w-5 h-5 text-[#FFE8B3]" />
              </div>
              <h3 className="text-base font-bold text-white">Data Isolation</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Supabase Row Level Security guarantees data is scoped strictly to authorized members.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. CORE CAPABILITIES PREVIEW
         ======================================================== */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#B38D46]/10 border border-[#B38D46]/25 text-[#FFE8B3] text-xs font-semibold">
            <span>Engineered for Execution</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Designed to Reduce Friction, Not Add It
          </h2>
          <p className="text-neutral-400 text-base leading-relaxed">
            Every feature in Pranata Gatra exists to solve real academic and project organizational friction on Android.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Task Management */}
          <div className="p-7 rounded-3xl bg-neutral-900/50 border border-neutral-800 hover:border-[#B38D46]/30 transition-all duration-300 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#B38D46]/15 border border-[#B38D46]/30 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-[#FFE8B3]" />
            </div>
            <h3 className="text-lg font-bold text-white">Task Management & Due Dates</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Create tasks with descriptions, due dates, due times, and assignees. The closer the deadline, the higher its automatic urgency level.
            </p>
          </div>

          {/* Card 2: Subjects & Classes */}
          <div className="p-7 rounded-3xl bg-neutral-900/50 border border-neutral-800 hover:border-[#B38D46]/30 transition-all duration-300 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#B38D46]/15 border border-[#B38D46]/30 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-[#FFE8B3]" />
            </div>
            <h3 className="text-lg font-bold text-white">Subjects & Class Schedules</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Organize classes within a workspace with lecturer names, room codes, and times. Get a clear overview of &quot;Today&apos;s Schedule&quot; every morning.
            </p>
          </div>

          {/* Card 3: Multi-state Notifications */}
          <div className="p-7 rounded-3xl bg-neutral-900/50 border border-neutral-800 hover:border-[#B38D46]/30 transition-all duration-300 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#B38D46]/15 border border-[#B38D46]/30 flex items-center justify-center">
              <Bell className="w-6 h-6 text-[#FFE8B3]" />
            </div>
            <h3 className="text-lg font-bold text-white">Push & Local Notifications</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Never miss a deadline or scheduled lecture. Supported seamlessly whether the application is running in foreground, background, or closed.
            </p>
          </div>
        </div>

        <div className="text-center pt-8">
          <Link
            href="/features"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#FFE8B3] hover:text-white transition-colors"
          >
            <span>Read full technical feature specifications</span>
            <ArrowRight className="w-4 h-4 text-[#B38D46]" />
          </Link>
        </div>
      </section>

      {/* ========================================================
          5. BOTTOM CTA BANNER
         ======================================================== */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-neutral-900 via-[#101014] to-neutral-900 border border-[#B38D46]/30 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="gold-hero-glow -top-32 left-1/2 -translate-x-1/2 opacity-30" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to Streamline Your Academic & Project Life?
            </h2>
            <p className="text-neutral-300 text-sm leading-relaxed">
              Download the Pranata Gatra Android APK package directly from our verified repository and experience organized collaboration today.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/download"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full gold-gradient text-neutral-950 font-bold text-sm shadow-xl shadow-[#B38D46]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download Official APK</span>
            </Link>
            <Link
              href="/report"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-neutral-950 hover:bg-neutral-800 text-neutral-200 font-semibold text-sm border border-neutral-800 transition-all"
            >
              <span>Report an Issue</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
