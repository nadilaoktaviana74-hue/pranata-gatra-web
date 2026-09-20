import Link from 'next/link';

interface PranataGatraLogoProps {
  className?: string;
}

/**
 * PranataGatraLogo renders the brand logo strictly as a full image.
 * To replace the placeholder later, update `logoSrc` below or replace
 * the image file at `/images/pranata-gatra-logo-placeholder.png`.
 */
export function PranataGatraLogo({ className = '' }: PranataGatraLogoProps) {
  const logoSrc = '/images/pranata-gatra-logo-placeholder.png';

  return (
    <Link
      href="/"
      className={`inline-flex items-center select-none shrink-0 group transition-transform duration-200 hover:opacity-90 ${className}`}
      aria-label="Pranata Gatra Home"
    >
      <img
        src={logoSrc}
        alt="Pranata Gatra"
        className="h-7 sm:h-8 md:h-9 w-auto object-contain max-w-[170px] sm:max-w-[210px] md:max-w-[250px]"
      />
    </Link>
  );
}
