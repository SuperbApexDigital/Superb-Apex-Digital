import React, { useState } from 'react';
import { Layers } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1' | '3:2';
  title?: string;
  category?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = '16:9',
  title,
  category,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const aspectClasses = {
    '16:9': 'aspect-[16/9]',
    '4:3': 'aspect-[4/3]',
    '1:1': 'aspect-square',
    '3:2': 'aspect-[3/2]',
  };

  if (hasError || !src) {
    return (
      <div
        className={`relative overflow-hidden flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#121923] to-[#192331] text-[#B2BDCB] border border-[#283343] rounded-xl ${aspectClasses[aspectRatio]} ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="w-12 h-12 rounded-lg bg-[#6C8CFF]/10 flex items-center justify-center text-[#6C8CFF] mb-3">
          <Layers className="w-6 h-6" />
        </div>
        {category && (
          <span className="text-xs uppercase tracking-wider text-[#6C8CFF] font-medium mb-1">
            {category}
          </span>
        )}
        <p className="text-sm font-medium text-center text-[#F5F7FA]">
          {title || alt}
        </p>
        <span className="text-[11px] text-[#B2BDCB] mt-1">Superb Apex Digital Asset</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#121923]/40 ${aspectClasses[aspectRatio]} ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#121923] animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#6C8CFF]/20 border-t-[#6C8CFF] animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};
