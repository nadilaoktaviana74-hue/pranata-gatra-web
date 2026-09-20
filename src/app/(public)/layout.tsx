import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100 relative selection:bg-cyan-500/20 selection:text-cyan-300">
      <Navbar />
      <main className="flex-1 w-full flex flex-col">
        {children}
      </main>
      <Footer />
    </div>
  );
}
