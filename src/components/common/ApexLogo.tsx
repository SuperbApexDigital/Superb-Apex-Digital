import React from 'react';

interface ApexLogoProps {
  className?: string;
  variant?: 'header' | 'icon' | 'badge' | 'full';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * Superb Apex Digital Official Brand Vector Emblem
 * Mathematical geometric apex summit chevron with dual-faceted planes
 * and illuminated apex vertex node.
 */
export const ApexEmblemSvg: React.FC<{
  className?: string;
  glow?: boolean;
}> = ({ className = 'w-6 h-6', glow = false }) => {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      <defs>
        {/* Left ascending wing gradient */}
        <linearGradient id="apexLeftGrad" x1="8" y1="42" x2="24" y2="6" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00D2FF" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>

        {/* Right descending wing gradient */}
        <linearGradient id="apexRightGrad" x1="24" y1="6" x2="40" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="50%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>

        {/* Inner vertex diamond glow */}
        <linearGradient id="apexCoreGrad" x1="20" y1="18" x2="28" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>

        {/* Ambient subtle glow filter */}
        <filter id="apexGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Optional ambient back-glow */}
      {glow && (
        <path
          d="M24 6L8 42H17L24 24L31 42H40L24 6Z"
          fill="url(#apexLeftGrad)"
          opacity="0.35"
          filter="url(#apexGlow)"
        />
      )}

      {/* Left Summit Wing - Ascending Facet */}
      <path
        d="M24 6L7 42H16.5L24 23.5L24 6Z"
        fill="url(#apexLeftGrad)"
      />

      {/* Right Summit Wing - Descending Interlocking Facet */}
      <path
        d="M24 6L24 23.5L31.5 42H41L24 6Z"
        fill="url(#apexRightGrad)"
      />

      {/* Apex Summit Peak Crown - Precision Diamond Inset */}
      <polygon
        points="24,14 27.5,21 24,28 20.5,21"
        fill="url(#apexCoreGrad)"
        opacity="0.95"
      />

      {/* Geometric Base Horizon Accent */}
      <path
        d="M19 33L24 28L29 33L24 37L19 33Z"
        fill="#FFFFFF"
        fillOpacity="0.85"
      />
    </svg>
  );
};

export const ApexLogo: React.FC<ApexLogoProps> = ({
  className = '',
  variant = 'header',
  size = 'md',
}) => {
  // Dimensions for container & emblem
  const sizeMap = {
    sm: {
      container: 'w-7 h-7 rounded-lg',
      emblem: 'w-4 h-4',
      title: 'text-sm sm:text-base',
      subtitle: 'text-[8px] tracking-[0.25em]',
      gap: 'gap-2',
    },
    md: {
      container: 'w-9 h-9 rounded-xl',
      emblem: 'w-5 h-5',
      title: 'text-base sm:text-lg',
      subtitle: 'text-[9px] tracking-[0.28em]',
      gap: 'gap-2.5',
    },
    lg: {
      container: 'w-12 h-12 rounded-2xl',
      emblem: 'w-7 h-7',
      title: 'text-lg sm:text-xl',
      subtitle: 'text-[10px] tracking-[0.32em]',
      gap: 'gap-3',
    },
    xl: {
      container: 'w-20 h-20 rounded-3xl',
      emblem: 'w-12 h-12',
      title: 'text-2xl sm:text-3xl',
      subtitle: 'text-xs tracking-[0.38em]',
      gap: 'gap-4',
    },
  };

  const currentSize = sizeMap[size];

  // 1. Icon-only presentation
  if (variant === 'icon') {
    return (
      <div
        className={`relative inline-flex items-center justify-center shrink-0 bg-gradient-to-br from-[#FFFFFF] to-[#EEF2F8] dark:from-[#121923] dark:to-[#0B0F14] border border-[#CBD5E1] dark:border-[#283343] shadow-xs dark:shadow-md transition-colors ${currentSize.container} ${className}`}
        aria-label="Superb Apex Digital"
      >
        <ApexEmblemSvg className={currentSize.emblem} />
      </div>
    );
  }

  // 2. Badge / Full Card Presentation (e.g., About Showcase, Hero highlight)
  if (variant === 'badge' || variant === 'full') {
    return (
      <div
        className={`relative inline-flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B0F14] border border-[#DCE3EE] dark:border-[#283343] shadow-lg dark:shadow-2xl overflow-hidden select-none transition-colors ${className}`}
      >
        {/* Subtle Ambient Radial Highlight */}
        <div className="absolute inset-0 bg-radial from-[#365DE8]/5 dark:from-[#00E5FF]/10 via-transparent to-transparent pointer-events-none" />

        {/* Large Emblem Showcase */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#EEF2F8] to-[#FFFFFF] dark:from-[#192331] dark:to-[#0B0F14] border border-[#CBD5E1] dark:border-[#283343] shadow-md dark:shadow-inner">
          <ApexEmblemSvg className="w-14 h-14 sm:w-16 sm:h-16" glow />
        </div>

        {/* Brand Wordmark with Precision Letterspacing */}
        <div className="mt-5 text-center space-y-1.5">
          <div className="flex items-center justify-center gap-1.5">
            <span className="font-display font-extrabold text-xl sm:text-2xl tracking-tight text-[#0F172A] dark:text-[#FFFFFF] transition-colors">
              SUPERB
            </span>
            <span className="font-display font-black text-xl sm:text-2xl tracking-wide bg-gradient-to-r from-[#0284C7] via-[#2563EB] to-[#7C3AED] dark:from-[#00E5FF] dark:via-[#3B82F6] dark:to-[#A855F7] bg-clip-text text-transparent">
              ΛPEX
            </span>
          </div>

          <div className="flex items-center justify-center gap-2">
            <div className="h-[1.5px] w-6 bg-gradient-to-r from-transparent to-[#0284C7] dark:to-[#00E5FF]" />
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.35em] text-[#475569] dark:text-[#CBD5E1] font-semibold">
              DIGITAL
            </span>
            <div className="h-[1.5px] w-6 bg-gradient-to-r from-[#7C3AED] dark:from-[#A855F7] to-transparent" />
          </div>

          <p className="text-xs text-[#526078] dark:text-[#94A3B8] pt-1">
            Digital Communities & Creator Creative
          </p>
        </div>
      </div>
    );
  }

  // 3. Header / Default Horizontal Lockup (Navbar, Footer, Section Headers)
  return (
    <div className={`inline-flex items-center ${currentSize.gap} select-none ${className}`}>
      {/* Precision Apex Vector Emblem */}
      <div
        className={`relative shrink-0 flex items-center justify-center bg-gradient-to-br from-[#FFFFFF] to-[#EEF2F8] dark:from-[#121923] dark:to-[#0B0F14] border border-[#CBD5E1] dark:border-[#283343] shadow-xs dark:shadow-sm transition-colors ${currentSize.container}`}
      >
        <ApexEmblemSvg className={currentSize.emblem} />
      </div>

      {/* Brand Wordmark matching exact brand typography */}
      <div className="flex flex-col justify-center text-left leading-none">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-display font-extrabold ${currentSize.title} tracking-tight text-[#0F172A] dark:text-[#FFFFFF] transition-colors`}
          >
            SUPERB
          </span>
          <span
            className={`font-display font-black ${currentSize.title} tracking-wide bg-gradient-to-r from-[#0284C7] via-[#2563EB] to-[#7C3AED] dark:from-[#00E5FF] dark:via-[#3B82F6] dark:to-[#A855F7] bg-clip-text text-transparent transition-all`}
          >
            ΛPEX
          </span>
        </div>

        <div className="flex items-center gap-1.5 mt-1">
          <div className="h-[1px] w-3 bg-gradient-to-r from-[#0284C7] to-[#7C3AED] dark:from-[#00E5FF] dark:to-[#A855F7]" />
          <span
            className={`font-mono uppercase ${currentSize.subtitle} font-bold text-[#475569] dark:text-[#94A3B8] transition-colors`}
          >
            DIGITAL
          </span>
          <div className="h-[1px] w-3 bg-gradient-to-r from-[#7C3AED] to-transparent dark:from-[#A855F7] to-transparent" />
        </div>
      </div>
    </div>
  );
};
