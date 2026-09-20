import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#09090b] text-neutral-100 relative selection:bg-[#B38D46]/30 selection:text-[#FFE8B3]">
      <Navbar />

      <main className="flex-1 w-full flex flex-col">
        {children}
      </main>
      <Footer />
    </div>
  );
}
