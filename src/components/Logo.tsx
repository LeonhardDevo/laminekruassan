import { useId } from 'react';

interface MarkProps {
  className?: string;
  mono?: boolean;
}

export const LogoMark = ({ className = 'h-10 w-10', mono = false }: MarkProps) => {
  const uid = useId().replace(/:/g, '');
  const grad = `lm-grad-${uid}`;
  const paint = mono ? 'currentColor' : `url(#${grad})`;

  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={grad} x1="10" y1="12" x2="54" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#F6E3BF" />
          <stop offset="0.5" stopColor="#C8A26B" />
          <stop offset="1" stopColor="#8C6A3C" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="none" stroke={paint} strokeWidth="0.9" opacity="0.7" />
      <g fill={paint} stroke="#0A0806" strokeWidth="1.8" transform="translate(32 32) scale(1.16) translate(-32 -34.5)">
        <ellipse cx="16.5" cy="43.5" rx="5" ry="7.2" transform="rotate(-62 16.5 43.5)" />
        <ellipse cx="47.5" cy="43.5" rx="5" ry="7.2" transform="rotate(62 47.5 43.5)" />
        <ellipse cx="22.5" cy="35.5" rx="7.6" ry="9.8" transform="rotate(-30 22.5 35.5)" />
        <ellipse cx="41.5" cy="35.5" rx="7.6" ry="9.8" transform="rotate(30 41.5 35.5)" />
        <ellipse cx="32" cy="31" rx="9.4" ry="12.2" />
      </g>
    </svg>
  );
};

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo = ({ className = '', showTagline = true, size = 'md' }: LogoProps) => {
  const markSize = { sm: 'h-8 w-8', md: 'h-11 w-11', lg: 'h-20 w-20' }[size];
  const wordSize = { sm: 'text-xl', md: 'text-[26px]', lg: 'text-5xl' }[size];

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark className={markSize} />
      <span className="flex flex-col leading-none">
        <span className={`font-serif font-medium tracking-[0.22em] text-cream ${wordSize}`}>
          LAMIN<span className="text-gold">É</span>
        </span>
        {showTagline && (
          <span className="mt-1.5 text-[8.5px] font-medium uppercase tracking-[0.42em] text-smoke">
            Maison de croissant
          </span>
        )}
      </span>
    </span>
  );
};
