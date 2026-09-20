interface HomeMobilePreviewProps {
  className?: string;
}

/**
 * HomeMobilePreview renders the single image visual representation of the
 * Pranata Gatra mobile application on the Home page.
 * To replace the placeholder with your actual mobile screenshot/mockup later,
 * simply change the `imageSrc` below or replace the image at
 * `/images/home-mobile-preview-placeholder.png`.
 */
export function HomeMobilePreview({ className = '' }: HomeMobilePreviewProps) {
  const imageSrc = '/images/home-mobile-preview-placeholder.png';

  return (
    <div className={`relative flex items-center justify-center w-full max-w-[360px] sm:max-w-[400px] ${className}`}>
      {/* Subtle ambient gold glow behind preview */}
      <div
        className="absolute inset-0 bg-[#B38D46]/15 blur-3xl rounded-full pointer-events-none transform scale-95"
        aria-hidden="true"
      />

      <img
        src={imageSrc}
        alt="Pranata Gatra Mobile Application"
        className="relative z-10 w-full h-auto max-h-[660px] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)] transition-transform duration-300 hover:scale-[1.01]"
        loading="eager"
      />
    </div>
  );
}
