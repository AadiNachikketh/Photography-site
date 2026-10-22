import React, { useEffect, useState } from 'react';
import {
  X,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Camera,
  Sliders,
} from 'lucide-react';
import type { PortfolioItem } from '../types/studio';
import { ResilientPlateImage } from './ResilientPlateImage';

interface LightboxModalProps {
  item: PortfolioItem | null;
  allItems: PortfolioItem[];
  onClose: () => void;
  onSelectItem: (item: PortfolioItem) => void;
  onBookSimilar: (item: PortfolioItem) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  item,
  allItems,
  onClose,
  onSelectItem,
  onBookSimilar,
}) => {
  const [zoomed, setZoomed] = useState(false);
  const [showExifPanel, setShowExifPanel] = useState(true);

  useEffect(() => {
    setZoomed(false);
  }, [item?.id]);

  useEffect(() => {
    if (!item) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        const idx = allItems.findIndex((i) => i.id === item.id);
        if (idx !== -1 && allItems.length > 1) {
          onSelectItem(allItems[(idx + 1) % allItems.length]);
        }
      }
      if (e.key === 'ArrowLeft') {
        const idx = allItems.findIndex((i) => i.id === item.id);
        if (idx !== -1 && allItems.length > 1) {
          onSelectItem(allItems[(idx - 1 + allItems.length) % allItems.length]);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, allItems, onClose, onSelectItem]);

  if (!item) return null;

  const currentIndex = allItems.findIndex((i) => i.id === item.id);

  const handlePrev = () => {
    if (allItems.length <= 1) return;
    const prevIdx = (currentIndex - 1 + allItems.length) % allItems.length;
    onSelectItem(allItems[prevIdx]);
  };

  const handleNext = () => {
    if (allItems.length <= 1) return;
    const nextIdx = (currentIndex + 1) % allItems.length;
    onSelectItem(allItems[nextIdx]);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#050506]/95 backdrop-blur-md flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label={`High-resolution lightbox for ${item.title}`}
    >
      {/* Lightbox Top Bar with 44px Touch Targets */}
      <div className="flex items-center justify-between gap-2 px-4 sm:px-6 py-3 border-b border-[#1F1F23] bg-[#070708]">
        <div className="flex items-center gap-2 text-xs text-[#9F9FA9] font-mono-tabular truncate">
          <span className="text-[#F4F4F0] font-medium">{item.plateNumber}</span>
          <span aria-hidden="true">·</span>
          <span>
            {currentIndex + 1}/{allItems.length}
          </span>
          <span aria-hidden="true" className="hidden sm:inline">·</span>
          <span className="hidden sm:inline truncate">{item.category}</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setZoomed((prev) => !prev)}
            className="min-h-[44px] flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#F4F4F0] bg-[#141418] hover:bg-[#1F1F26] border border-[#27272E] rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {zoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
            <span className="hidden sm:inline">
              {zoomed ? '100% Fit' : '200% Optical Loupe'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setShowExifPanel((prev) => !prev)}
            className="min-h-[44px] flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#F4F4F0] bg-[#141418] hover:bg-[#1F1F26] border border-[#27272E] rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Sliders className="w-4 h-4 text-[#E5A93C]" />
            <span>{showExifPanel ? 'Hide EXIF' : 'EXIF Spec'}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close high-resolution viewer"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-[#070708] bg-[#F4F4F0] hover:bg-[#E5A93C] rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Close</span>
          </button>
        </div>
      </div>

      {/* Main Split Inspection Workspace */}
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row overflow-hidden">
        {/* Left/Center Canvas */}
        <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8 overflow-auto select-none">
          {allItems.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous plate"
                className="fixed lg:absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-[#111114]/90 hover:bg-[#1F1F26] border border-[#27272E] text-[#F4F4F0] transition-transform active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next plate"
                className="fixed lg:absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-[#111114]/90 hover:bg-[#1F1F26] border border-[#27272E] text-[#F4F4F0] transition-transform active:scale-95 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          <div
            onClick={() => setZoomed((prev) => !prev)}
            className={`transition-transform duration-200 cursor-zoom-in ${
              zoomed ? 'scale-150 cursor-zoom-out' : 'scale-100 max-h-full max-w-5xl'
            }`}
          >
            <ResilientPlateImage
              src={item.imageUrl}
              alt={item.title}
              plateNumber={item.plateNumber}
              category={item.category}
              dominantTone={item.dominantTone}
              className="max-h-[48vh] sm:max-h-[62vh] lg:max-h-[74vh] w-auto object-contain rounded-xl border border-[#27272A]"
            />
          </div>
        </div>

        {/* Right / Bottom Technical EXIF & Provenance Drawer */}
        {showExifPanel && (
          <aside className="w-full lg:w-[400px] max-h-[42vh] lg:max-h-none shrink-0 border-t lg:border-t-0 lg:border-l border-[#1F1F23] bg-[#0B0B0E] p-5 sm:p-8 overflow-y-auto flex flex-col justify-between gap-5">
            <div className="space-y-4 sm:space-y-6">
              <div>
                <div className="text-xs text-[#9F9FA9] flex items-center gap-2 mb-1.5">
                  <span>{item.client}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-tabular">{item.year}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#F4F4F0]">
                  {item.title}
                </h2>
                <p className="font-editorial italic text-base sm:text-lg text-[#D4D4D8] mt-0.5">
                  {item.subtitle}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#9F9FA9] leading-relaxed border-t border-[#1F1F23] pt-3.5">
                {item.curatorNote}
              </p>

              {/* Optical & Capture Telemetry */}
              <div className="border-t border-[#1F1F23] pt-4">
                <div className="flex items-center gap-2 text-xs font-medium text-[#F4F4F0] mb-3">
                  <Camera className="w-3.5 h-3.5 text-[#E5A93C]" />
                  <span>Medium Format EXIF Readout</span>
                </div>

                <dl className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs border border-[#1F1F23] rounded-xl p-3.5 sm:p-4 bg-[#111115]">
                  <div>
                    <dt className="text-[#9F9FA9]">Camera Body</dt>
                    <dd className="text-[#F4F4F0] font-mono-tabular mt-0.5">{item.exif.camera}</dd>
                  </div>
                  <div>
                    <dt className="text-[#9F9FA9]">Optics</dt>
                    <dd className="text-[#F4F4F0] font-mono-tabular mt-0.5">{item.exif.lens}</dd>
                  </div>
                  <div>
                    <dt className="text-[#9F9FA9]">Aperture & Focal</dt>
                    <dd className="text-[#F4F4F0] font-mono-tabular mt-0.5">
                      {item.exif.aperture} · {item.exif.focalLength}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#9F9FA9]">Exposure</dt>
                    <dd className="text-[#F4F4F0] font-mono-tabular mt-0.5">
                      {item.exif.shutterSpeed} · {item.exif.iso}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="border-t border-[#1F1F23] pt-4">
              <button
                type="button"
                onClick={() => onBookSimilar(item)}
                className="w-full min-h-[48px] flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold text-[#070708] bg-[#E5A93C] hover:bg-[#F2B705] rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Commission Similar Production</span>
              </button>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};
