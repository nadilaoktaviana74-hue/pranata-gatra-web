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
    default: 'Pranata Gatra - Platform Pendukung Aplikasi Mobile',
    template: '%s | Pranata Gatra',
  },
  description:
    'Platform pendukung dan portal resmi aplikasi Android Pranata Gatra. Unduh rilis APK terbaru, pantau riwayat changelog, dan sampaikan laporan kendala secara realtime.',
  keywords: [
    'Pranata Gatra',
    'Aplikasi Android',
    'Download APK',
    'Platform Pendukung',
    'Changelog APK',
    'Sistem Terpadu',
  ],
  authors: [{ name: 'Tim Pranata Gatra' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Pranata Gatra - Platform Pendukung Aplikasi Mobile',
    description:
      'Portal resmi aplikasi Android Pranata Gatra. Unduh rilis APK terbaru dan dapatkan pembaruan terkini.',
    type: 'website',
    locale: 'id_ID',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <body className="min-h-screen bg-[#090d16] text-slate-100 antialiased flex flex-col selection:bg-cyan-500/20 selection:text-cyan-300">
        {children}
        <Toaster
          position="top-right"
          richColors
          theme="dark"
          toastOptions={{
            style: {
              background: '#0f172a',
              borderColor: '#1e293b',
              color: '#f8fafc',
            },
          }}
        />
      </body>
    </html>
  );
}
