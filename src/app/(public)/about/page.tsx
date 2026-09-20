import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Layers, 
  CheckCircle2, 
  Calendar, 
  Users, 
  Bell, 
  ShieldCheck, 
  Download,
  Flame,
  Lock
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Pranata Gatra: the productivity and collaboration ecosystem unifying tasks, workspaces, subjects, schedules, and notifications.',
};

export default function AboutPage() {
  const pillars = [
    {
      icon: Layers,
      title: 'Unified Workspaces',
      description: 'One versatile container that adapts to a semester, course group, project team, or club activity. No rigid schema locks.',
    },
    {
      icon: CheckCircle2,
      title: 'Contextual Tasks',
      description: 'Tasks belong to a workspace and can link directly to a subject, complete with deadlines, assignees, and automatic priority tiers.',
    },
    {
      icon: Calendar,
      title: 'Academic Schedules',
      description: 'Centralize lectures, rooms, and weekly schedules with quick access to your "Today\'s Schedule" overview.',
    },
    {
      icon: Users,
      title: 'Real-time Collaboration',
      description: 'Invite members via email, manage roles, and coordinate shared workspace deliverables effortlessly.',
    },
    {
      icon: Bell,
      title: 'Proactive Notifications',
      description: 'Foreground, background, and closed-app notifications ensure deadline reminders and schedule notices always reach you.',
    },
    {
      icon: Lock,
      title: 'Data Isolation',
      description: 'Rigorous permission checks and Row Level Security guarantee workspace data stays isolated only to designated collaborators.',
    },
  ];

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16 pb-24 pt-24 sm:pt-28">
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B38D46]/10 border border-[#B38D46]/25 text-[#FFE8B3] text-xs font-semibold">
          <span>About Pranata Gatra</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Reimagining Productivity for <br />
          <span className="gold-gradient-text">Teams & Academia</span>
        </h1>
        <p className="text-neutral-300 text-base leading-relaxed">
          Pranata Gatra was engineered to solve the fragmentation students, developers, and teams face daily—eliminating the friction of juggling disconnected task boards, chat threads, and class timetables.
        </p>
      </div>

      {/* The Core Concept */}
      <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-6">
        <div className="flex items-center gap-2 text-[#FFE8B3] text-xs font-bold uppercase tracking-wider">
          <Flame className="w-4 h-4 text-[#B38D46]" />
          <span>The Philosophy</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          The Universal Workspace Container
        </h2>
        <div className="space-y-4 text-neutral-300 text-sm leading-relaxed">
          <p>
            Traditional productivity platforms impose rigid structures: you either use an academic planner that can&apos;t handle projects, or a corporate task manager that ignores semesters, course schedules, and lecturers.
          </p>
          <p>
            Pranata Gatra introduces a single, unified primitive: the <strong>Workspace</strong>. A Workspace represents whatever collaborative boundary you need. Inside it, you can create Subjects (with lecturer names, room locations, and meeting hours) and Tasks (with due dates, time precision, and assignees).
          </p>
          <p>
            Tasks can optionally reference a Subject. For example, in the workspace <em>&quot;Semester 5&quot;</em>, you can create the subject <em>&quot;Software Architecture&quot;</em> and tie the task <em>&quot;Submit Design Patterns Critique&quot;</em> directly to it.
          </p>
        </div>
      </div>

      {/* 6 Core Pillars Grid */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            What Pranata Gatra Centralizes
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            A harmonious mobile application architecture designed around six core pillars
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 hover:border-[#B38D46]/30 transition-all duration-300 space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#B38D46]/15 border border-[#B38D46]/30 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#FFE8B3]" />
                </div>
                <h3 className="text-base font-bold text-white">{pillar.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{pillar.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile-First Engine & Security */}
      <div className="p-8 rounded-3xl bg-neutral-900/40 border border-neutral-800 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[#FFE8B3] text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-[#B38D46]" />
            <span>Under the Hood</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Native Android Performance & Cloud Integrity
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            The Pranata Gatra mobile client is built specifically for Android to ensure low battery consumption, rapid startup times, and seamless push notifications via system services.
          </p>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            All data synchronization, session validation, and APK binaries are hosted with Supabase PostgreSQL and Storage, protected with cryptographic signatures and Row Level Security.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-4">
          <div className="text-xs font-bold text-white uppercase tracking-wider">Quick Specifications</div>
          <div className="space-y-2 text-xs text-neutral-400">
            <div className="flex justify-between py-1 border-b border-neutral-800/80">
              <span>Platform Support</span>
              <strong className="text-neutral-200">Android 8.0+ (API 26+)</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-neutral-800/80">
              <span>Architecture</span>
              <strong className="text-neutral-200">arm64-v8a / universal</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-neutral-800/80">
              <span>Authentication</span>
              <strong className="text-neutral-200">Supabase Auth (OTP & Password)</strong>
            </div>
            <div className="flex justify-between py-1">
              <span>Cloud Storage</span>
              <strong className="text-[#FFE8B3]">Supabase Storage</strong>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/download"
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl gold-gradient text-neutral-950 font-bold text-xs shadow-md shadow-[#B38D46]/20 transition-all hover:scale-[1.02]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Get the Latest Android Build</span>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
