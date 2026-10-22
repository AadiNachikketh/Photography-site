import React, { useMemo, useState } from 'react';
import { Maximize2, Search, Sliders, ArrowUpRight } from 'lucide-react';
import type { PortfolioCategory, PortfolioItem, StudioPageRoute } from '../types/studio';
import { ResilientPlateImage } from './ResilientPlateImage';

interface ExhibitionsPageProps {
  portfolio: PortfolioItem[];
  onInspectPlate: (item: PortfolioItem) => void;
  onOpenBackendCms: () => void;
  onNavigate: (page: StudioPageRoute, options?: { category?: PortfolioCategory }) => void;
}

const CATEGORIES: ('All Works' | PortfolioCategory)[] = [
  'All Works',
  'Editorial & Fashion',
  'Architecture & Spatial',
  'Commercial Still Life',
  'Fine Art Portrait',
];

export const ExhibitionsPage: React.FC<ExhibitionsPageProps> = ({
  portfolio,
  onInspectPlate,
  onOpenBackendCms,
  onNavigate,
}) => {
  const [activeCategory, setActiveCategory] = useState<'All Works' | PortfolioCategory>('All Works');
  const [aspectFilter, setAspectFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredItems = useMemo(() => {
    return portfolio.filter((item) => {
      const matchesCat = activeCategory === 'All Works' || item.category === activeCategory;
      const matchesAspect = aspectFilter === 'ALL' || item.aspectRatio === aspectFilter;
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.client.toLowerCase().includes(q) ||
        item.exif.camera.toLowerCase().includes(q) ||
        item.plateNumber.toLowerCase().includes(q);
      return matchesCat && matchesAspect && matchesQuery;
    });
  }, [portfolio, activeCategory, aspectFilter, searchQuery]);

  return (
    <section className="py-16 sm:py-20 max-w-7xl mx-auto px-6 space-y-12">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#1F1F23] pb-8">
        <div className="space-y-2">
          <p className="text-xs font-mono-tabular text-[#E5A93C]">
            PAGE 02 · ARCHIVAL EXHIBITIONS & CONTACT SHEET
          </p>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#F4F4F0]">
            Curated Monograph Gallery
          </h1>
          <p className="text-sm text-[#9F9FA9] max-w-2xl">
            Filter by photography discipline, sensor aspect ratio, or camera body. Click any plate to launch the 200% Optical Loupe and full 16-bit EXIF readout.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onOpenBackendCms}
            className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium text-[#E5A93C] bg-[#141418] hover:bg-[#1C1C22] border border-[#2A2A32] rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Set / Upload Backend Images ({portfolio.length})</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('booking')}
            className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-[#070708] bg-[#E5A93C] hover:bg-[#F2B705] rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Book Similar Shoot</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive Filter & Search Controls (Horizontal Touch Scroll on Mobile) */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        <div className="flex items-center gap-1 p-1 bg-[#111114] border border-[#232329] rounded-xl overflow-x-auto no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`min-h-[40px] px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#F4F4F0] text-[#070708]'
                  : 'text-[#9F9FA9] hover:text-[#F4F4F0]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-[#9F9FA9] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search title, client, Hasselblad..."
              className="w-full min-h-[44px] pl-9 pr-3.5 py-2 text-xs bg-[#111114] border border-[#232329] rounded-xl text-[#F4F4F0] focus:outline-none focus:border-[#E5A93C]"
            />
          </div>

          <select
            aria-label="Filter by Aspect Ratio"
            value={aspectFilter}
            onChange={(e) => setAspectFilter(e.target.value)}
            className="min-h-[44px] px-3.5 py-2 text-xs font-mono-tabular bg-[#111114] border border-[#232329] rounded-xl text-[#F4F4F0] cursor-pointer"
          >
            <option value="ALL">All Aspect Ratios</option>
            <option value="4:3">4:3 Medium Format</option>
            <option value="16:9">16:9 Architectural</option>
            <option value="3:4">3:4 Vertical</option>
            <option value="1:1">1:1 Square 6×6</option>
          </select>
        </div>
      </div>

      {/* Bento Exhibition Grid */}
      {filteredItems.length === 0 ? (
        <div className="p-12 sm:p-16 text-center rounded-2xl bg-[#111114] border border-[#1F1F23] space-y-4">
          <p className="text-sm text-[#D4D4D8]">No plates match your current filter criteria.</p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory('All Works');
              setAspectFilter('ALL');
              setSearchQuery('');
            }}
            className="min-h-[44px] px-4 py-2 text-xs font-semibold text-[#070708] bg-[#E5A93C] rounded-xl cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[280px] sm:auto-rows-[320px] lg:auto-rows-[340px] gap-5 sm:gap-6">
          {filteredItems.map((item) => {
            const spanClasses =
              item.bentoSpan === '2x2'
                ? 'md:col-span-2 md:row-span-2'
                : item.bentoSpan === '2x1'
                ? 'md:col-span-2 md:row-span-1'
                : 'col-span-1 row-span-1';

            return (
              <article
                key={item.id}
                onClick={() => onInspectPlate(item)}
                className={`group relative rounded-2xl overflow-hidden border border-[#232329] bg-[#111114] cursor-pointer flex flex-col justify-end ${spanClasses}`}
              >
                <ResilientPlateImage
                  src={item.imageUrl}
                  alt={item.title}
                  plateNumber={item.plateNumber}
                  category={item.category}
                  dominantTone={item.dominantTone}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                />

                <div className="relative z-10 p-6 bg-gradient-to-t from-black/90 via-black/45 to-transparent pt-20 flex flex-col justify-end">
                  <div className="flex items-center gap-2 text-xs text-[#D4D4D8] font-mono-tabular mb-1">
                    <span>{item.plateNumber}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.client}</span>
                  </div>

                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <h2 className="text-lg sm:text-xl font-semibold text-[#F4F4F0] group-hover:text-[#E5A93C] transition-colors">
                        {item.title}
                      </h2>
                      <p className="text-xs font-mono-tabular text-[#9F9FA9] mt-1">
                        {item.exif.camera} · {item.exif.lens} · {item.exif.aperture}
                      </p>
                    </div>

                    <span className="p-2 rounded-lg bg-black/60 border border-white/10 text-[#F4F4F0] group-hover:bg-[#E5A93C] group-hover:text-[#070708] transition-colors shrink-0">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};
