import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Release } from '@/types/database';
import { DownloadApkButton } from '@/components/releases/DownloadApkButton';
import { HomeMobilePreview } from './HomeMobilePreview';

interface HeroSectionProps {
  latestRelease: Release | null;
}

export function HeroSection({ latestRelease }: HeroSectionProps) {
  return (
    <section className="relative pt-12 sm:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Hero Content */}
        <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
          {/* Live Release Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B38D46]/10 border border-[#B38D46]/30 text-[#FFE8B3] text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-[#B38D46] animate-pulse" />
            <span>
              {latestRelease
                ? `Latest Release Available: v${latestRelease.version}`
                : 'Official Android APK Release Portal'}
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
            {/* Dynamic Download APK Button with direct APK download priority */}
            <DownloadApkButton
              release={latestRelease}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full gold-gradient text-neutral-950 font-bold text-sm shadow-xl shadow-[#B38D46]/20 hover:shadow-[#B38D46]/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            />

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

        {/* Right Hero Graphic: Replaceable Mobile App Visual */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <HomeMobilePreview />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
