import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Pranata Gatra - Workspace & Productivity Platform for Android',
    template: '%s | Pranata Gatra',
  },
  description:
    'Official website and distribution portal for the Pranata Gatra Android application. Centralize tasks, subjects, schedules, team collaboration, and verified APK releases.',
  keywords: [
    'Pranata Gatra',
    'Android Application',
    'Workspace Management',
    'Task Management',
    'Academic Productivity',
    'Download APK',
    'Schedule Planner',
    'Team Collaboration',
  ],
  authors: [{ name: 'Pranata Gatra Team' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Pranata Gatra - Workspace & Productivity Platform for Android',
    description:
      'The modern companion for academic and project productivity. Download the official Android APK and explore release changelogs.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <body className="min-h-screen bg-[#09090b] text-neutral-100 antialiased flex flex-col selection:bg-[#B38D46]/30 selection:text-[#FFE8B3]">
        {children}
        <Toaster
          position="top-right"
          richColors
          theme="dark"
          toastOptions={{
            style: {
              background: '#121215',
              borderColor: '#27272a',
              color: '#f4f4f5',
            },
          }}
        />
      </body>
    </html>
  );
}
