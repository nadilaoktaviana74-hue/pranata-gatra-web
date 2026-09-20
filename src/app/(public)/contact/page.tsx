import { Metadata } from 'next';
import { Mail, MessageSquare, ShieldCheck, Clock, ExternalLink } from 'lucide-react';
import { GithubIcon, InstagramIcon } from '@/components/shared/icons';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact & Support',
  description: 'Official contact channels, developer repository, and support ticket submissions for Pranata Gatra.',
};

export default function ContactPage() {
  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B38D46]/10 border border-[#B38D46]/25 text-[#FFE8B3] text-xs font-semibold">
          <Mail className="w-3.5 h-3.5 text-[#B38D46]" />
          <span>Official Communication</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Contact the <span className="gold-gradient-text">Pranata Gatra Team</span>
        </h1>
        <p className="text-neutral-300 text-base leading-relaxed">
          Reach out for technical inquiries, open-source collaboration, bug report follow-ups, or institutional partnerships.
        </p>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Support Email */}
        <div className="p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-4 hover:border-[#B38D46]/35 transition-all flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#B38D46]/15 border border-[#B38D46]/30 flex items-center justify-center">
              <Mail className="w-6 h-6 text-[#FFE8B3]" />
            </div>
            <h3 className="text-lg font-bold text-white">Support Email</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Send us an inquiry regarding authentication, releases, or account integration questions.
            </p>
          </div>
          <div className="pt-4 border-t border-neutral-800/80">
            <a
              href="mailto:pranatagatra.id@gmail.com"
              className="text-sm font-semibold text-[#FFE8B3] hover:text-white break-all flex items-center gap-1.5 transition-colors"
            >
              <span>pranatagatra.id@gmail.com</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0 text-[#B38D46]" />
            </a>
          </div>
        </div>

        {/* GitHub Repository */}
        <div className="p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-4 hover:border-[#B38D46]/35 transition-all flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-neutral-800 border border-neutral-700 flex items-center justify-center">
              <GithubIcon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white">GitHub Repository</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Audit our open-source codebase, track release tags, and inspect documentation.
            </p>
          </div>
          <div className="pt-4 border-t border-neutral-800/80">
            <a
              href="https://github.com/dzakiluqman/pranata-gatra"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-[#FFE8B3] hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <span>dzakiluqman/pranata-gatra</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0 text-[#B38D46]" />
            </a>
          </div>
        </div>

        {/* Official Instagram */}
        <div className="p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-4 hover:border-[#B38D46]/35 transition-all flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#B38D46]/15 border border-[#B38D46]/30 flex items-center justify-center">
              <InstagramIcon className="w-6 h-6 text-[#FFE8B3]" />
            </div>
            <h3 className="text-lg font-bold text-white">Official Instagram</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Follow official product announcements, update releases, and visual guides.
            </p>
          </div>
          <div className="pt-4 border-t border-neutral-800/80">
            <a
              href="https://www.instagram.com/pranatagatra.id"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-[#FFE8B3] hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <span>@pranatagatra.id</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0 text-[#B38D46]" />
            </a>
          </div>
        </div>

        {/* Bug Tracking */}
        <div className="p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-4 hover:border-[#B38D46]/35 transition-all flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/15 border border-rose-500/25 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-rose-400" />
            </div>
            <h3 className="text-lg font-bold text-white">Issue Tracking</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Encountered a crash or discrepancy? Submit a direct ticket to our engineering team.
            </p>
          </div>
          <div className="pt-4 border-t border-neutral-800/80">
            <Link
              href="/report"
              className="text-sm font-semibold text-[#FFE8B3] hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <span>Open Bug Report Form</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0 text-[#B38D46]" />
            </Link>
          </div>
        </div>
      </div>

      {/* SLA & Security Card */}
      <div className="p-8 sm:p-10 rounded-3xl bg-neutral-900/40 border border-neutral-800 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[#FFE8B3] font-semibold text-xs">
            <Clock className="w-4 h-4 text-[#B38D46]" />
            <span>Response Times & SLA</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Monitored & Responsive Follow-Up
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            Our engineering team regularly reviews incoming bug reports and inquiry requests Monday through Friday. Critical issue submissions receive top prioritization.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-neutral-950/80 border border-neutral-800/80 space-y-3">
          <div className="flex items-center gap-2 text-[#FFE8B3] font-semibold text-xs">
            <ShieldCheck className="w-4 h-4 text-[#B38D46]" />
            <span>Encrypted Data Handling</span>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            All reports and screenshot uploads are routed through secure Supabase infrastructure with Row Level Security (RLS) policies to protect user privacy.
          </p>
        </div>
      </div>
    </div>
  );
}
