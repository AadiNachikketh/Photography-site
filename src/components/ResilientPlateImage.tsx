import React, { useState } from 'react';
import { Aperture } from 'lucide-react';
import { resolveStudioPlateUrl } from '../data/studioFallbackData';

interface ResilientPlateImageProps {
  src: string;
  alt: string;
  plateNumber?: string;
  category?: string;
  dominantTone?: string;
  className?: string;
}

export const ResilientPlateImage: React.FC<ResilientPlateImageProps> = ({
  src,
  alt,
  plateNumber = 'PLATE',
  category = 'Medium Format Archive',
  dominantTone = '#141416',
  className = '',
}) => {
  const [hasError, setHasError] = useState(false);
  const resolvedSrc = resolveStudioPlateUrl(src);

  if (hasError || !resolvedSrc) {
    return (
      <div
        className={`relative flex flex-col justify-between p-6 overflow-hidden bg-[#111114] text-[#F4F4F0] ${className}`}
        style={{
          background: `radial-gradient(circle at 35% 30%, ${dominantTone} 0%, #09090B 100%)`,
        }}
      >
        <div className="flex items-center justify-between text-xs font-mono-tabular text-[#9F9FA9] border-b border-white/10 pb-3">
          <span>{plateNumber}</span>
          <span>16-BIT RAW ARCHIVE</span>
        </div>
        <div className="my-auto flex flex-col items-center text-center py-8">
          <Aperture className="w-9 h-9 text-[#E5A93C]/80 mb-3 stroke-[1.25]" />
          <p className="font-editorial italic text-xl text-[#F4F4F0] max-w-xs">{alt}</p>
          <p className="text-xs text-[#9F9FA9] mt-1">
            {category} · Calibrated Studio Plate
          </p>
        </div>
        <div className="flex items-center justify-between text-[11px] font-mono-tabular text-[#9F9FA9]/70 border-t border-white/10 pt-3">
          <span>ATELIER VANCE</span>
          <span>BACKEND ASSET SLOT</span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
