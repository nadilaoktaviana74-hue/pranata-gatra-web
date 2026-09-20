import { Metadata } from 'next';
import Link from 'next/link';
import { 
  KeyRound, 
  Layers, 
  MailPlus, 
  CheckSquare, 
  Flame, 
  BookOpen, 
  CalendarDays, 
  BellRing, 
  Users2, 
  ShieldCheck,
  CheckCircle2,
  Download
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Core Features',
  description: 'Detailed showcase of the 10 core capabilities in the Pranata Gatra Android productivity ecosystem.',
};

export default function FeaturesPage() {
  const coreFeatures = [
    {
      number: '01',
      icon: KeyRound,
      title: 'Authentication & Profile',
      tag: 'Live in App',
      description: 'Secure onboarding with standard email registration, email sign-in, OTP verification, and personalized profile management.',
      items: [
        'Email & password registration',
        'Secure email sign-in workflow',
        'One-Time Password (OTP) validation',
        'User profile custom name and avatar attributes',
      ],
    },
    {
      number: '02',
      icon: Layers,
      title: 'Workspace Management',
      tag: 'Core Primitive',
      description: 'The foundation of all collaboration. Create and customize workspaces for semesters, teams, projects, or study circles.',
      items: [
        'Create, edit, and delete workspaces',
        'Workspace membership and access control',
        'Defined workspace roles (Owner, Admin, Member)',
        'Option to leave or archive inactive workspaces',
      ],
    },
    {
      number: '03',
      icon: MailPlus,
      title: 'Workspace Invitations',
      tag: 'Live in App',
      description: 'Seamless member onboarding via email invitations with automated notifications and instant membership linking upon acceptance.',
      items: [
        'Invite peers using email addresses',
        'Real-time invitation notifications to recipients',
        'Accept or decline invitation controls',
        'Automatic workspace membership creation upon acceptance',
      ],
    },
    {
      number: '04',
      icon: CheckSquare,
      title: 'Comprehensive Task Management',
      tag: 'Live in App',
      description: 'Track deliverables with precision. Add due dates, due times, detailed descriptions, priority tiers, and task assignees.',
      items: [
        'Create, edit, and delete task cards',
        'Due date and exact due time assignment',
        'Custom task priority and execution statuses',
        'Assign tasks directly to specific workspace members',
      ],
    },
    {
      number: '05',
      icon: Flame,
      title: 'Automatic Task Priority',
      tag: 'Smart Logic',
      description: 'Eliminates guesswork. Task priority can be dynamically computed based on deadline proximity—the closer the due date, the higher the urgency tier.',
      items: [
        'Dynamic urgency escalation as deadlines near',
        'Proximity-based color cues and sorting',
        'Clear distinction between routine and urgent work',
        'Reduces manual priority adjustments',
      ],
    },
    {
      number: '06',
      icon: BookOpen,
      title: 'Academic Subjects',
      tag: 'Academic Focus',
      description: 'Organize courses and modules within a workspace. Associate tasks with subjects to keep assignments grouped by curriculum.',
      items: [
        'Create Subjects inside any Workspace',
        'Subject name and detailed syllabus description',
        'Optional Subject Schedule with meeting hours',
        'Lecturer details and classroom location tracking',
      ],
    },
    {
      number: '07',
      icon: CalendarDays,
      title: 'Schedule Management',
      tag: 'Live in App',
      description: 'Never miss a class or team meeting. View recurring weekly time slots alongside a dedicated "Today\'s Schedule" dashboard.',
      items: [
        'Subject schedules with start and end times',
        'Dedicated "Today\'s Schedule" morning agenda view',
        'Workspace-scoped timetables',
        'Early schedule warning reminders',
      ],
    },
    {
      number: '08',
      icon: BellRing,
      title: 'Proactive Notifications',
      tag: 'System Services',
      description: 'Timely reminders for task deadlines, subject classes, and invitation updates delivered across all operating states.',
      items: [
        'Workspace invitation notifications',
        'Task deadline proximity reminders',
        'Upcoming subject/class alerts',
        'Full support: Foreground, Background, and Closed-App states',
      ],
    },
    {
      number: '09',
      icon: Users2,
      title: 'Collaborative Workspace Sharing',
      tag: 'Live in App',
      description: 'Bring teams together with transparent task delegation, synchronized schedules, and shared deliverables in one unified view.',
      items: [
        'Visible workspace member directory',
        'Member role hierarchy and permissions',
        'Task assignment with accountability tracking',
        'Instant synchronization across all active devices',
      ],
    },
    {
      number: '10',
      icon: ShieldCheck,
      title: 'Cross-Workspace Data Isolation',
      tag: 'Security Guarantee',
      description: 'Strict boundary enforcement ensures data in one workspace is completely isolated from unauthorized users and other workspaces.',
      items: [
        'Scoped database queries with Supabase RLS',
        'Zero leakage between different workspace rosters',
        'Access revocations take effect immediately',
        'Cryptographic token authorization on all requests',
      ],
    },
  ];

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 pb-24 pt-24 sm:pt-28">
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B38D46]/10 border border-[#B38D46]/25 text-[#FFE8B3] text-xs font-semibold">
          <span>Production Capabilities</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Every Feature Engineered for <br />
          <span className="gold-gradient-text">Real-World Flow</span>
        </h1>
        <p className="text-neutral-300 text-base leading-relaxed">
          Explore the 10 core capabilities of the Pranata Gatra Android application. All features listed are implemented and active in the official build.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {coreFeatures.map((feat) => {
          const Icon = feat.icon;
          return (
            <div
              key={feat.number}
              className="p-8 rounded-3xl bg-neutral-900/50 border border-neutral-800 hover:border-[#B38D46]/35 transition-all duration-300 space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#B38D46]/15 border border-[#B38D46]/30 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#FFE8B3]" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-neutral-950 text-[#FFE8B3] border border-neutral-800">
                      {feat.tag}
                    </span>
                    <span className="text-xs font-mono font-bold text-neutral-600">
                      {feat.number}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-white">{feat.title}</h2>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                {/* Sub features bullet points */}
                <div className="pt-2 space-y-2 border-t border-neutral-800/80">
                  {feat.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-neutral-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#B38D46] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Download CTA */}
      <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900/60 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <h2 className="text-2xl font-bold text-white">Experience All 10 Features Firsthand</h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            Download the official Android APK and start organizing your workspaces today.
          </p>
        </div>
        <Link
          href="/download"
          className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-full gold-gradient text-neutral-950 font-bold text-xs shadow-lg shadow-[#B38D46]/20 transition-all hover:scale-[1.02]"
        >
          <Download className="w-4 h-4" />
          <span>Download Android APK</span>
        </Link>
      </div>
    </div>
  );
}
