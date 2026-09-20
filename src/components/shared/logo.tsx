import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', showText = true, size = 'md' }: LogoProps) {
  const dimensions = {
    sm: { img: 28, text: 'text-sm', sub: 'text-[10px]' },
    md: { img: 36, text: 'text-base', sub: 'text-[11px]' },
    lg: { img: 44, text: 'text-xl', sub: 'text-xs' },
  }[size];

  return (
    <Link href="/" className={`flex items-center gap-3 group select-none ${className}`}>
      <div className="relative shrink-0 transition-transform duration-300 group-hover:scale-105">
        <Image
          src="/images/logo.svg"
          alt="Pranata Gatra Logo"
          width={dimensions.img}
          height={dimensions.img}
          className="rounded-xl shadow-md shadow-[#B38D46]/10"
          priority
        />
      </div>
      {showText && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-center gap-1.5">
            <span className={`font-bold tracking-tight text-white ${dimensions.text}`}>
              Pranata Gatra
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[#B38D46]/15 text-[#FFE8B3] border border-[#B38D46]/30">
              App
            </span>
          </div>
          <span className={`text-neutral-400 font-medium ${dimensions.sub}`}>
            Workspace & Productivity
          </span>
        </div>
      )}
    </Link>
  );
}
