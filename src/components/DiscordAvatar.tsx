import React, { useState, useEffect } from 'react';
import { resolveAvatarUrl } from '../utils/imageUrl';

interface DiscordAvatarProps {
  name: string;
  initials: string;
  avatarUrl?: string;
  theme?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showStatus?: boolean;
  status?: string;
  onClick?: () => void;
  isClickable?: boolean;
}

export const DiscordAvatar: React.FC<DiscordAvatarProps> = ({
  name,
  initials,
  avatarUrl,
  theme = 'blue',
  size = 'lg',
  showStatus = true,
  status = 'Online',
  onClick,
  isClickable = false,
}) => {
  const [resolvedSrc, setResolvedSrc] = useState<string | undefined>(() => resolveAvatarUrl(avatarUrl));
  const [imgError, setImgError] = useState(false);

  // When avatarUrl updates (e.g. via cloud sync on mobile), immediately reset error state
  useEffect(() => {
    setResolvedSrc(resolveAvatarUrl(avatarUrl));
    setImgError(false);
  }, [avatarUrl]);

  const handleImgError = () => {
    // If the path was pointing to /images/... and failed, attempt /src/assets/images/... or vice versa
    if (resolvedSrc && !resolvedSrc.startsWith('data:') && resolvedSrc.includes('/images/')) {
      const filename = resolvedSrc.split('/').pop();
      if (filename && !resolvedSrc.includes('/src/assets/images/')) {
        setResolvedSrc(`/src/assets/images/${filename}`);
        return;
      }
    }
    setImgError(true);
  };

  const sizeMap = {
    sm: 'w-10 h-10 text-xs',
    md: 'w-14 h-14 text-sm',
    lg: 'w-20 h-20 text-lg',
    xl: 'w-24 h-24 text-xl',
    '2xl': 'w-32 h-32 text-2xl',
  };

  const statusSizeMap = {
    sm: 'w-3 h-3 right-0 bottom-0 border-[2px]',
    md: 'w-4 h-4 right-0 bottom-0 border-[2.5px]',
    lg: 'w-5 h-5 right-1 bottom-1 border-[3px]',
    xl: 'w-6 h-6 right-1.5 bottom-1.5 border-[3.5px]',
    '2xl': 'w-7 h-7 right-2 bottom-2 border-[4px]',
  };

  const normalized = name.toLowerCase();

  // Custom visual SVG emblems fallback
  const renderFallbackEmblem = () => {
    if (normalized.includes('captaindav')) {
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full p-2.5 drop-shadow" fill="none">
          <circle cx="50" cy="50" r="45" fill="url(#grad-captain)" />
          <path
            d="M30 46 L50 24 L70 46 L64 56 L36 56 Z"
            fill="#FDE047"
            stroke="#FEF08A"
            strokeWidth="2"
          />
          <circle cx="50" cy="42" r="6" fill="#1E293B" />
          <path
            d="M26 60 C26 56 74 56 74 60 C74 74 26 74 26 60 Z"
            fill="#0F172A"
            stroke="#38BDF8"
            strokeWidth="2"
          />
          <path d="M42 66 L50 72 L58 66" stroke="#FDE047" strokeWidth="2.5" strokeLinecap="round" />
          <polygon points="50,30 52,34 56,34 53,37 54,41 50,38 46,41 47,37 44,34 48,34" fill="#FFFFFF" />
          <defs>
            <linearGradient id="grad-captain" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0284C7" />
              <stop offset="1" stopColor="#0F172A" />
            </linearGradient>
          </defs>
        </svg>
      );
    }

    if (normalized.includes('kryonace')) {
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full p-2.5 drop-shadow" fill="none">
          <circle cx="50" cy="50" r="45" fill="url(#grad-ace)" />
          <path
            d="M50 20 C42 32 30 42 30 54 C30 64 38 70 46 68 C47.5 67.7 48.8 66.8 50 65 C51.2 66.8 52.5 67.7 54 68 C62 70 70 64 70 54 C70 42 58 32 50 20 Z"
            fill="#A855F7"
            stroke="#E9D5FF"
            strokeWidth="2.5"
          />
          <path d="M50 65 L46 78 L54 78 Z" fill="#E9D5FF" />
          <text
            x="50"
            y="52"
            fill="#FFFFFF"
            fontSize="18"
            fontWeight="900"
            textAnchor="middle"
            fontFamily="sans-serif"
          >
            A
          </text>
          <defs>
            <linearGradient id="grad-ace" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6D28D9" />
              <stop offset="1" stopColor="#090D16" />
            </linearGradient>
          </defs>
        </svg>
      );
    }

    if (normalized.includes('kryonpyper')) {
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full p-2.5 drop-shadow" fill="none">
          <circle cx="50" cy="50" r="45" fill="url(#grad-pyper)" />
          <rect x="24" y="42" width="6" height="16" rx="3" fill="#34D399" />
          <rect x="34" y="32" width="6" height="36" rx="3" fill="#6EE7B7" />
          <rect x="44" y="22" width="6" height="56" rx="3" fill="#A7F3D0" />
          <rect x="54" y="30" width="6" height="40" rx="3" fill="#6EE7B7" />
          <rect x="64" y="38" width="6" height="24" rx="3" fill="#34D399" />
          <circle cx="50" cy="50" r="30" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
          <defs>
            <linearGradient id="grad-pyper" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#047857" />
              <stop offset="1" stopColor="#064E3B" />
            </linearGradient>
          </defs>
        </svg>
      );
    }

    if (normalized.includes('daveee')) {
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full p-2.5 drop-shadow" fill="none">
          <circle cx="50" cy="50" r="45" fill="url(#grad-daveee)" />
          <polygon points="50,22 76,37 76,67 50,82 24,67 24,37" fill="#1E293B" stroke="#F59E0B" strokeWidth="2.5" />
          <polyline points="24,37 50,52 76,37" stroke="#F59E0B" strokeWidth="2" />
          <line x1="50" y1="52" x2="50" y2="82" stroke="#F59E0B" strokeWidth="2" />
          <circle cx="50" cy="52" r="5" fill="#FBBF24" />
          <defs>
            <linearGradient id="grad-daveee" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#B45309" />
              <stop offset="1" stopColor="#18181B" />
            </linearGradient>
          </defs>
        </svg>
      );
    }

    if (normalized.includes('jamiu')) {
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full p-2.5 drop-shadow" fill="none">
          <circle cx="50" cy="50" r="45" fill="url(#grad-jamiu)" />
          <polygon points="50,18 78,50 50,82 22,50" fill="#1E3A8A" stroke="#60A5FA" strokeWidth="2.5" />
          <path
            d="M52 28 L40 48 L50 48 L46 68 L60 46 L50 46 Z"
            fill="#38BDF8"
            stroke="#E0F2FE"
            strokeWidth="1.5"
          />
          <defs>
            <linearGradient id="grad-jamiu" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1D4ED8" />
              <stop offset="1" stopColor="#0B132B" />
            </linearGradient>
          </defs>
        </svg>
      );
    }

    if (normalized.includes('temple')) {
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full p-2.5 drop-shadow" fill="none">
          <circle cx="50" cy="50" r="45" fill="url(#grad-temple)" />
          <path d="M26 38 L50 24 L74 38 Z" fill="#FB7185" stroke="#FECDD3" strokeWidth="2" />
          <rect x="28" y="38" width="44" height="5" fill="#FFE4E6" />
          <rect x="32" y="45" width="6" height="26" rx="2" fill="#FDA4AF" />
          <rect x="42" y="45" width="6" height="26" rx="2" fill="#FDA4AF" />
          <rect x="52" y="45" width="6" height="26" rx="2" fill="#FDA4AF" />
          <rect x="62" y="45" width="6" height="26" rx="2" fill="#FDA4AF" />
          <rect x="24" y="73" width="52" height="6" rx="2" fill="#FFE4E6" />
          <defs>
            <linearGradient id="grad-temple" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#BE123C" />
              <stop offset="1" stopColor="#1E1B4B" />
            </linearGradient>
          </defs>
        </svg>
      );
    }

    // Default high-tech monogram
    return (
      <div className="w-full h-full rounded-full flex items-center justify-center font-black tracking-wider text-white bg-[#1E293B]">
        {initials}
      </div>
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((isClickable || onClick) && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <div
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={isClickable || onClick ? 'button' : undefined}
      tabIndex={isClickable || onClick ? 0 : undefined}
      className={`relative inline-block ${sizeMap[size]} shrink-0 select-none group touch-manipulation ${
        isClickable || onClick
          ? 'cursor-pointer hover:scale-105 active:scale-95 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-[#365DE8] dark:focus-visible:ring-[#6C8CFF]'
          : ''
      }`}
      title={isClickable || onClick ? `Click to view ${name}'s full profile picture` : `${name}'s profile picture`}
      aria-label={isClickable || onClick ? `View ${name}'s profile picture` : undefined}
    >
      {/* Outer Glow Ring */}
      <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#365DE8]/40 to-[#6C8CFF]/30 blur-xs group-hover:blur-sm transition-all" />

      {/* Main Avatar Circle */}
      <div className="relative w-full h-full rounded-full overflow-hidden bg-[#121923] border-2 border-[#DCE3EE] dark:border-[#283548] shadow-md flex items-center justify-center">
        {resolvedSrc && !imgError ? (
          <img
            src={resolvedSrc}
            alt={`${name} profile avatar`}
            loading="eager"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={handleImgError}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          renderFallbackEmblem()
        )}

        {/* Hover zoom overlay if clickable */}
        {(isClickable || onClick) && (
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-full">
            <svg className="w-5 h-5 text-white drop-shadow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
            </svg>
          </div>
        )}
      </div>

      {/* Discord Online Status Pip */}
      {showStatus && (
        <span
          title={status}
          className={`absolute rounded-full bg-[#22C55E] border-[#FFFFFF] dark:border-[#121923] shadow-sm z-10 ${statusSizeMap[size]}`}
        />
      )}
    </div>
  );
};
