import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import {
  Maximize2,
  ArrowUpRight,
  ArrowDown,
  Camera,
  Sparkles,
  Calendar,
  Compass,
} from 'lucide-react';
import type {
  CurrencyCode,
  PortfolioCategory,
  PortfolioItem,
  StudioPageRoute,
} from '../types/studio';
import { ResilientPlateImage } from './ResilientPlateImage';

interface HomePortfolioScrollPageProps {
  portfolio: PortfolioItem[];
  currency: CurrencyCode;
  onToggleCurrency: (currency: CurrencyCode) => void;
  onInspectPlate: (item: PortfolioItem) => void;
  onNavigate: (
    page: StudioPageRoute,
    options?: { category?: PortfolioCategory; keyword?: string }
  ) => void;
}

const MAGNETIC_KEYWORDS = [
  {
    keyword: "LET'S CREATE SOMETHING ICONIC",
    tagline: 'Flagship Campaign & Medium Format Direction',
    category: 'Editorial & Fashion' as PortfolioCategory,
  },
  {
    keyword: 'INITIATE HAUTE COUTURE LOOKBOOK',
    tagline: 'Stage A Daylight Loft · 100MP Hasselblad Tether',
    category: 'Editorial & Fashion' as PortfolioCategory,
  },
  {
    keyword: 'COMMISSION ARCHITECTURAL MONOGRAPH',
    tagline: 'Phase One XT 150MP · Zero-Distortion Tilt-Shift',
    category: 'Architecture & Spatial' as PortfolioCategory,
  },
  {
    keyword: 'CAPTURE SUB-MILLIMETER HOROLOGY',
    tagline: 'Stage C Pneumatic Macro Table · 42-Frame Focus Stack',
    category: 'Commercial Still Life' as PortfolioCategory,
  },
  {
    keyword: 'BOOK PRIVATE SITTER PORTRAIT',
    tagline: 'True Achromatic Silver-Gelatin & 16-Bit Color',
    category: 'Fine Art Portrait' as PortfolioCategory,
  },
];

interface ParallaxPlateChapterProps {
  item: PortfolioItem;
  index: number;
  total: number;
  onInspect: (item: PortfolioItem) => void;
  onCommissionCategory: (category: PortfolioCategory) => void;
}

const ParallaxPlateChapter: React.FC<ParallaxPlateChapterProps> = ({
  item,
  index,
  total,
  onInspect,
  onCommissionCategory,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  const imageScale = useTransform(smoothProgress, [0, 0.5, 1], [1.12, 1.0, 1.05]);
  const imageY = useTransform(smoothProgress, [0, 1], ['-5%', '5%']);
  const captionY = useTransform(smoothProgress, [0.15, 0.5, 0.85], [36, 0, -24]);
  const captionOpacity = useTransform(
    smoothProgress,
    [0.05, 0.22, 0.78, 0.96],
    [0.15, 1, 1, 0.2]
  );

  const isEven = index % 2 === 0;

  return (
    <section
      ref={sectionRef}
      id={`home-plate-${index}`}
      className="relative min-h-[84vh] lg:min-h-[92vh] w-full flex items-center py-12 sm:py-16 lg:py-24 border-b border-[#18181C] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
        {/* Parallax Image Frame (Tall 4:5 on Mobile Portrait, 4:3 on Tablet, 16:10 on Desktop) */}
        <div
          className={`lg:col-span-8 ${
            isEven ? 'lg:order-1' : 'lg:order-2'
          } relative rounded-2xl overflow-hidden border border-[#24242C] bg-[#0E0E12] aspect-[4/5] sm:aspect-[4/3] lg:aspect-[16/10] cursor-pointer group`}
          onClick={() => onInspect(item)}
        >
          <motion.div
            style={{ scale: imageScale, y: imageY }}
            className="w-full h-full will-change-transform"
          >
            <ResilientPlateImage
              src={item.imageUrl}
              alt={item.title}
              plateNumber={item.plateNumber}
              category={item.category}
              dominantTone={item.dominantTone}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Top-Left Chapter Counter */}
          <div className="absolute top-3.5 left-3.5 sm:top-5 sm:left-5 z-10 flex items-center gap-2 text-xs font-mono-tabular text-[#F4F4F0] bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
            <span className="text-[#E5A93C] font-semibold">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span>/</span>
            <span className="text-[#9F9FA9]">{String(total).padStart(2, '0')}</span>
            <span className="text-[#9F9FA9]">·</span>
            <span>{item.plateNumber}</span>
          </div>

          {/* Bottom Scrim with Touch-Friendly 44px Optical Loupe Button */}
          <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/45 to-transparent flex items-end justify-between gap-3">
            <div className="text-xs font-mono-tabular text-[#D4D4D8] truncate">
              <span>{item.exif.camera}</span>
              <span className="mx-1.5 text-[#9F9FA9]">·</span>
              <span>{item.exif.lens}</span>
              <span className="mx-1.5 text-[#9F9FA9] hidden md:inline">·</span>
              <span className="hidden md:inline">
                {item.exif.aperture} · {item.exif.shutterSpeed}
              </span>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onInspect(item);
              }}
              className="min-h-[44px] flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#F4F4F0] bg-black/80 hover:bg-[#E5A93C] hover:text-[#070708] active:scale-[0.98] border border-white/15 rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>200% Loupe</span>
            </button>
          </div>
        </div>

        {/* Scroll-Animated Editorial Caption Monograph Column */}
        <motion.div
          style={{ y: captionY, opacity: captionOpacity }}
          className={`lg:col-span-4 ${
            isEven ? 'lg:order-2' : 'lg:order-1'
          } flex flex-col justify-between space-y-5 sm:space-y-6 will-change-transform`}
        >
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 text-xs text-[#9F9FA9] font-mono-tabular">
              <span className="text-[#E5A93C]">{item.category}</span>
              <span aria-hidden="true">·</span>
              <span>{item.year}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#F4F4F0] leading-[1.12]">
              {item.title}
            </h2>

            <p className="font-editorial italic text-lg sm:text-xl text-[#D4D4D8]">
              {item.subtitle}
            </p>

            <p className="text-xs sm:text-sm text-[#9F9FA9] leading-relaxed pt-2 border-t border-[#1F1F25]">
              {item.curatorNote}
            </p>
          </div>

          {/* Unboxed Technical Provenance List */}
          <div className="space-y-4 pt-3 sm:pt-4 border-t border-[#1F1F25]">
            <div className="text-xs space-y-1.5">
              <div className="flex items-center justify-between gap-2 text-[#9F9FA9]">
                <span>Client</span>
                <span className="text-[#F4F4F0] font-medium truncate">{item.client}</span>
              </div>
              <div className="flex items-center justify-between gap-2 text-[#9F9FA9]">
                <span>Stage / Location</span>
                <span className="text-[#D4D4D8] truncate">{item.location}</span>
              </div>
              <div className="flex items-center justify-between gap-2 text-[#9F9FA9]">
                <span>Lighting</span>
                <span className="text-[#D4D4D8] truncate max-w-[200px]">
                  {item.exif.lightingSetup}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => onInspect(item)}
                className="flex-1 min-h-[44px] flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-medium text-[#F4F4F0] bg-[#121216] hover:bg-[#1B1B22] active:scale-[0.98] border border-[#27272E] rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5 text-[#E5A93C]" />
                <span>Inspect Full Plate</span>
              </button>

              <button
                type="button"
                onClick={() => onCommissionCategory(item.category)}
                className="min-h-[44px] flex items-center justify-center gap-1 px-4 py-2.5 text-xs font-semibold text-[#070708] bg-[#E5A93C] hover:bg-[#F2B705] active:scale-[0.98] rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Commission</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export const HomePortfolioScrollPage: React.FC<HomePortfolioScrollPageProps> = ({
  portfolio,
  currency,
  onToggleCurrency,
  onInspectPlate,
  onNavigate,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedKeywordIndex, setSelectedKeywordIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0.15]);
  const heroScale = useTransform(scrollYProgress, [0, 0.12], [1, 0.96]);

  const activeMagnetic = MAGNETIC_KEYWORDS[selectedKeywordIndex] || MAGNETIC_KEYWORDS[0];

  const scrollToChapter = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Top Scroll Progress Indicator Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-14 lg:top-[57px] left-0 right-0 h-[2px] bg-[#E5A93C] origin-left z-40 pointer-events-none"
      />

      {/* Right-Hand Floating Chapter Rail (Desktop xl:) */}
      <aside
        aria-label="Portfolio Scroll Chapters"
        className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 flex-col items-end gap-2.5 bg-[#0B0B0E]/85 backdrop-blur-md p-3 rounded-xl border border-[#1F1F25]"
      >
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-[10px] font-mono-tabular text-[#9F9FA9] hover:text-[#E5A93C] transition-colors cursor-pointer"
        >
          OVERTURE
        </button>
        {portfolio.map((plate, idx) => (
          <button
            key={plate.id}
            type="button"
            onClick={() => scrollToChapter(`home-plate-${idx}`)}
            title={plate.title}
            className="group flex items-center gap-2 text-[11px] font-mono-tabular text-[#9F9FA9] hover:text-[#F4F4F0] transition-colors cursor-pointer"
          >
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-[#D4D4D8] max-w-[120px] truncate">
              {plate.title}
            </span>
            <span className="w-5 text-right group-hover:text-[#E5A93C]">
              {String(idx + 1).padStart(2, '0')}
            </span>
          </button>
        ))}
        <button
          type="button"
          onClick={() => scrollToChapter('home-finale-cta')}
          className="text-[10px] font-mono-tabular text-[#E5A93C] hover:underline pt-1 border-t border-[#1F1F25] cursor-pointer"
        >
          CONTACT
        </button>
      </aside>

      {/* 1. Opening Portfolio Overture */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-[82vh] lg:min-h-[86vh] flex flex-col justify-between max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-14 pb-12 sm:pb-16 border-b border-[#1F1F23] will-change-transform"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] sm:text-xs text-[#9F9FA9] font-mono-tabular">
          <div className="flex items-center gap-2">
            <span className="text-[#F4F4F0]">MONOGRAPH EXHIBITION 2026</span>
            <span>·</span>
            <span>{portfolio.length} PLATES</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">100MP & 150MP MEDIUM FORMAT</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span>SCROLL</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#E5A93C] animate-bounce" />
          </div>
        </div>

        <div className="my-auto py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end">
          <div className="lg:col-span-8 space-y-4 sm:space-y-6">
            <p className="text-xs text-[#E5A93C] font-mono-tabular tracking-wider">
              ATELIER VANCE · NEW YORK · PARIS · MUMBAI
            </p>
            <h1 className="text-3xl sm:text-5xl lg:text-[4.25rem] font-semibold tracking-tight leading-[1.06] text-[#F4F4F0]">
              Where Light Becomes{' '}
              <span className="font-editorial italic font-normal text-[#E5A93C]">
                Permanent Architecture.
              </span>
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-[#9F9FA9] max-w-2xl leading-relaxed">
              Scroll through our continuous medium-format portfolio sequence. Every plate is captured in 16-bit color depth across our three purpose-built daylight and cyclorama soundstages.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
            <button
              type="button"
              onClick={() => scrollToChapter('home-plate-0')}
              className="flex-1 min-h-[48px] flex items-center justify-between px-5 py-3.5 rounded-xl bg-[#111115] hover:bg-[#18181F] active:scale-[0.98] border border-[#27272E] text-xs font-medium text-[#F4F4F0] transition-all cursor-pointer"
            >
              <span>Begin Portfolio Scroll</span>
              <ArrowDown className="w-4 h-4 text-[#E5A93C]" />
            </button>

            <button
              type="button"
              onClick={() => scrollToChapter('home-finale-cta')}
              className="flex-1 min-h-[48px] flex items-center justify-between px-5 py-3.5 rounded-xl bg-[#E5A93C] hover:bg-[#F2B705] active:scale-[0.98] text-xs font-semibold text-[#070708] transition-all cursor-pointer"
            >
              <span>Skip to Commission Finale</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile/Tablet Quick Plate Jump Strip */}
        <div className="xl:hidden pb-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <span className="text-[11px] font-mono-tabular text-[#9F9FA9] shrink-0">
              Jump to Plate:
            </span>
            {portfolio.map((plate, idx) => (
              <button
                key={plate.id}
                type="button"
                onClick={() => scrollToChapter(`home-plate-${idx}`)}
                className="min-h-[38px] px-3 py-1.5 rounded-lg bg-[#111115] border border-[#23232C] text-xs font-mono-tabular text-[#D4D4D8] active:bg-[#E5A93C] active:text-[#070708] shrink-0 cursor-pointer"
              >
                {String(idx + 1).padStart(2, '0')} · {plate.title.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Ribbon of Overture */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-[#1F1F23] text-xs">
          <div>
            <span className="text-[#9F9FA9] block">Capture Standard</span>
            <span className="text-[#F4F4F0] font-mono-tabular font-medium mt-0.5 block">
              Hasselblad & Phase One
            </span>
          </div>
          <div>
            <span className="text-[#9F9FA9] block">Optical Resolution</span>
            <span className="text-[#F4F4F0] font-mono-tabular font-medium mt-0.5 block">
              100MP – 400MP RAW
            </span>
          </div>
          <div>
            <span className="text-[#9F9FA9] block">Disciplines</span>
            <span className="text-[#F4F4F0] font-medium mt-0.5 block">
              Couture · Spatial · Macro
            </span>
          </div>
          <div>
            <span className="text-[#9F9FA9] block">Full-Screen Loupe</span>
            <span className="text-[#E5A93C] font-medium mt-0.5 block">
              Tap any plate for 200% zoom
            </span>
          </div>
        </div>
      </motion.section>

      {/* 2. Continuous Scroll-Animated Portfolio Chapters */}
      <div>
        {portfolio.map((item, idx) => (
          <ParallaxPlateChapter
            key={item.id}
            item={item}
            index={idx}
            total={portfolio.length}
            onInspect={onInspectPlate}
            onCommissionCategory={(cat) => onNavigate('booking', { category: cat })}
          />
        ))}
      </div>

      {/* 3. Kinetic Marquee Transition Into Finale */}
      <div
        aria-hidden="true"
        className="border-b border-[#1F1F23] bg-[#0B0B0E] py-4 overflow-hidden select-none"
      >
        <div className="animate-editorial-marquee flex items-center gap-10 text-xs text-[#9F9FA9] tracking-widest">
          {Array.from({ length: 2 }).map((_, idx) => (
            <div key={idx} className="flex items-center gap-10 shrink-0">
              <span>END OF PORTFOLIO SEQUENCE</span>
              <span>·</span>
              <span className="font-editorial italic text-base text-[#E5A93C]">
                ready to initiate your next visual landmark?
              </span>
              <span>·</span>
              <span>BOOK STAGE A / B / C</span>
              <span>·</span>
              <span className="font-editorial italic text-base text-[#F4F4F0]">
                let’s create something iconic together
              </span>
              <span>·</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Monumental End-of-Scroll Finale: Magnetic "Let's Create / Contact" Curtain */}
      <section
        id="home-finale-cta"
        className="relative min-h-[84vh] flex items-center py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-[#070708] via-[#0B0B0F] to-[#11100E]"
      >
        <div className="max-w-7xl mx-auto w-full space-y-10 sm:space-y-14">
          {/* Top Bar of Finale: Interactive Keyword & INR Rate Standard */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#232329] pb-6 sm:pb-8">
            <div className="space-y-1">
              <p className="text-xs font-mono-tabular text-[#E5A93C] flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>FINAL CHAPTER · INITIATE YOUR COMMISSION</span>
              </p>
              <p className="text-xs text-[#9F9FA9]">
                Tap a production keyword below to tailor your inquiry or studio booking
              </p>
            </div>

            <div className="text-xs font-mono-tabular text-[#9F9FA9] self-start sm:self-center">
              All Packages & Stages Billed in <span className="text-[#F4F4F0] font-semibold">INR (₹)</span>
            </div>
          </div>

          {/* Horizontal Touch-Scrollable Keyword Selector on Mobile, Wrap on Tablet/Desktop */}
          <div className="space-y-3">
            <p className="text-xs text-[#9F9FA9] font-mono-tabular">
              CHOOSE YOUR PRODUCTION KEYWORD TO LAUNCH:
            </p>
            <div className="flex overflow-x-auto sm:flex-wrap gap-2.5 pb-2 sm:pb-0 no-scrollbar">
              {MAGNETIC_KEYWORDS.map((item, idx) => {
                const isSelected = idx === selectedKeywordIndex;
                return (
                  <button
                    key={item.keyword}
                    type="button"
                    onClick={() => setSelectedKeywordIndex(idx)}
                    className={`min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-mono-tabular transition-all active:scale-[0.98] shrink-0 cursor-pointer border ${
                      isSelected
                        ? 'bg-[#E5A93C] text-[#070708] border-[#E5A93C] font-semibold'
                        : 'bg-[#111115] text-[#D4D4D8] border-[#25252D] hover:border-[#E5A93C]/60'
                    }`}
                  >
                    {item.keyword}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Giant Magnetic Headline & Conversion Actions */}
          <motion.div
            key={activeMagnetic.keyword}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="p-6 sm:p-10 lg:p-12 rounded-2xl bg-[#111115] border border-[#27272E] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-8 space-y-4">
              <p className="text-xs font-mono-tabular text-[#E5A93C]">
                {activeMagnetic.tagline}
              </p>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#F4F4F0] leading-[1.08]">
                {activeMagnetic.keyword === "LET'S CREATE SOMETHING ICONIC" ? (
                  <>
                    You’ve Seen the Archive. Now{' '}
                    <span className="font-editorial italic font-normal text-[#E5A93C]">
                      Let’s Create Yours.
                    </span>
                  </>
                ) : (
                  activeMagnetic.keyword
                )}
              </h2>
              <p className="text-xs sm:text-base text-[#9F9FA9] max-w-2xl leading-relaxed">
                Direct producer response within 4 business hours. Packages start at{' '}
                <span className="text-[#F4F4F0] font-mono-tabular font-semibold">
                  ₹10,000 – ₹18,000
                </span>{' '}
                for Starter sessions and{' '}
                <span className="text-[#F4F4F0] font-mono-tabular font-semibold">
                  ₹20,000 – ₹35,000
                </span>{' '}
                for full commercial campaigns.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <button
                type="button"
                onClick={() =>
                  onNavigate('contact', {
                    keyword: activeMagnetic.keyword,
                    category: activeMagnetic.category,
                  })
                }
                className="w-full min-h-[48px] flex items-center justify-between px-5 py-3.5 rounded-xl bg-[#E5A93C] hover:bg-[#F2B705] active:scale-[0.98] text-[#070708] text-xs font-semibold transition-all cursor-pointer"
              >
                <span>Contact Studio Concierge</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() =>
                  onNavigate('booking', {
                    category: activeMagnetic.category,
                    keyword: activeMagnetic.keyword,
                  })
                }
                className="w-full min-h-[48px] flex items-center justify-between px-5 py-3.5 rounded-xl bg-[#18181E] hover:bg-[#22222A] active:scale-[0.98] border border-[#2E2E38] text-[#F4F4F0] text-xs font-medium transition-all cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#E5A93C]" />
                  <span>Reserve Production Date</span>
                </span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('packages')}
                className="w-full min-h-[44px] flex items-center justify-between px-5 py-3 rounded-xl bg-transparent hover:bg-[#141419] border border-[#23232B] text-[#9F9FA9] hover:text-[#F4F4F0] text-xs transition-colors cursor-pointer"
              >
                <span>Compare Starter / Standard / Premium</span>
                <Compass className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

          {/* Directory Grid to All 8 Other Dedicated Studio Pages */}
          <div className="pt-6 border-t border-[#1F1F23]">
            <p className="text-xs font-mono-tabular text-[#9F9FA9] mb-4">
              EXPLORE ALL 9 DEDICATED STUDIO PAGES:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { route: 'exhibitions' as StudioPageRoute, index: '02', label: 'Exhibitions & Lightbox' },
                { route: 'services' as StudioPageRoute, index: '03', label: 'Services & Workflow' },
                { route: 'packages' as StudioPageRoute, index: '04', label: 'Packages & Pricing (₹)' },
                { route: 'stages' as StudioPageRoute, index: '05', label: 'Soundstages A / B / C' },
                { route: 'journal' as StudioPageRoute, index: '06', label: 'Editorial Journal (Blog)' },
                { route: 'reviews' as StudioPageRoute, index: '07', label: 'Verified Client Reviews' },
                { route: 'booking' as StudioPageRoute, index: '08', label: 'Appointment Booking' },
                { route: 'contact' as StudioPageRoute, index: '09', label: 'Contact & Analytics' },
              ].map((pg) => (
                <button
                  key={pg.route}
                  type="button"
                  onClick={() => onNavigate(pg.route)}
                  className="min-h-[60px] p-3.5 sm:p-4 rounded-xl bg-[#0D0D10] hover:bg-[#15151B] active:scale-[0.98] border border-[#1F1F26] text-left transition-all group cursor-pointer flex items-center justify-between gap-2"
                >
                  <div className="min-w-0">
                    <span className="text-[10px] sm:text-[11px] font-mono-tabular text-[#E5A93C] block">
                      PAGE {pg.index}
                    </span>
                    <span className="text-xs font-medium text-[#F4F4F0] mt-0.5 block truncate">
                      {pg.label}
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#9F9FA9] group-hover:text-[#E5A93C] transition-colors shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
