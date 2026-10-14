import React from 'react';

export type ServiceIconType =
  | 'discord'
  | 'twitch'
  | 'youtube'
  | 'social-media'
  | 'community-management'
  | 'creator-branding';

interface ServiceIconBadgeProps {
  type: ServiceIconType;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showLabel?: boolean;
}

export const ServiceIconBadge: React.FC<ServiceIconBadgeProps> = ({
  type,
  size = 'md',
  className = '',
  showLabel = false,
}) => {
  const containerSizes = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-10 h-10 rounded-xl',
    lg: 'w-14 h-14 rounded-2xl',
    xl: 'w-20 h-20 rounded-3xl',
  };

  const svgSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-7 h-7',
    xl: 'w-10 h-10',
  };

  const renderIcon = () => {
    switch (type) {
      case 'discord':
        return (
          <div
            className={`flex items-center justify-center bg-[#5865F2]/15 text-[#5865F2] border border-[#5865F2]/30 shadow-sm shrink-0 ${containerSizes[size]}`}
            title="Discord Server Architecture & Operations"
          >
            {/* Authentic Discord Clyde Mark */}
            <svg viewBox="0 0 24 24" fill="currentColor" className={svgSizes[size]}>
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
          </div>
        );

      case 'twitch':
        return (
          <div
            className={`flex items-center justify-center bg-[#9146FF]/15 text-[#9146FF] border border-[#9146FF]/30 shadow-sm shrink-0 ${containerSizes[size]}`}
            title="Twitch Channel Broadcast & Overlays"
          >
            {/* Authentic Twitch Glitch Mark */}
            <svg viewBox="0 0 24 24" fill="currentColor" className={svgSizes[size]}>
              <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
            </svg>
          </div>
        );

      case 'youtube':
        return (
          <div
            className={`flex items-center justify-center bg-[#FF0000]/15 text-[#FF0000] border border-[#FF0000]/30 shadow-sm shrink-0 ${containerSizes[size]}`}
            title="YouTube Channel Art & Thumbnail Systems"
          >
            {/* Authentic YouTube Mark */}
            <svg viewBox="0 0 24 24" fill="currentColor" className={svgSizes[size]}>
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </div>
        );

      case 'social-media':
        return (
          <div
            className={`flex items-center justify-center bg-gradient-to-br from-[#E1306C]/15 via-[#1DA1F2]/15 to-[#00F2FE]/15 text-[#00F2FE] border border-[#00F2FE]/30 shadow-sm shrink-0 ${containerSizes[size]}`}
            title="Multi-Platform Social Media Systems"
          >
            {/* Multi-Network Feed & Storyboard Icon */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={svgSizes[size]}>
              <rect width="18" height="18" x="3" y="3" rx="4" />
              <path d="M3 9h18" />
              <path d="M9 21V9" />
              <circle cx="6" cy="6" r="1" fill="currentColor" />
            </svg>
          </div>
        );

      case 'community-management':
        return (
          <div
            className={`flex items-center justify-center bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 shadow-sm shrink-0 ${containerSizes[size]}`}
            title="Community Governance & Active Moderation"
          >
            {/* Community Shield & Protection Icon */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={svgSizes[size]}>
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
        );

      case 'creator-branding':
        return (
          <div
            className={`flex items-center justify-center bg-[#8B5CF6]/15 text-[#8B5CF6] border border-[#8B5CF6]/30 shadow-sm shrink-0 ${containerSizes[size]}`}
            title="Creator Brand Identity & Design Systems"
          >
            {/* Vector Apex Monogram & Diamond Icon */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={svgSizes[size]}>
              <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
            </svg>
          </div>
        );

      default:
        return null;
    }
  };

  const labels = {
    discord: 'Discord Platform',
    twitch: 'Twitch Broadcast',
    youtube: 'YouTube Video & Shorts',
    'social-media': 'Cross-Platform Social',
    'community-management': 'Community Governance',
    'creator-branding': 'Visual Identity & Systems',
  };

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {renderIcon()}
      {showLabel && (
        <span className="text-xs font-semibold text-[#172033] dark:text-[#F5F7FA]">
          {labels[type]}
        </span>
      )}
    </div>
  );
};
