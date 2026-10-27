import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Sliders,
  Compass,
  Home,
  Grid,
  Package,
  Calendar,
  Menu,
  X,
  PhoneCall,
} from 'lucide-react';
import type {
  BookingRecord,
  ClientReview,
  CommissionPackage,
  JournalArticle,
  PortfolioCategory,
  PortfolioItem,
  ProductionAddon,
  StudioInquiry,
  StudioPageRoute,
  StudioStage,
} from './types/studio';
import { HomePortfolioScrollPage } from './components/HomePortfolioScrollPage';
import { ExhibitionsPage } from './components/ExhibitionsPage';
import { ServicesPage } from './components/ServicesPage';
import { PackagesPage } from './components/PackagesPage';
import { StagesPage } from './components/StagesPage';
import { JournalPage } from './components/JournalPage';
import { ReviewsPage } from './components/ReviewsPage';
import { BookingSection } from './components/BookingSection';
import { ContactPage } from './components/ContactPage';
import { LightboxModal } from './components/LightboxModal';
import { BackendStudioDrawer } from './components/BackendStudioDrawer';
import { DEFAULT_STUDIO_DATABASE, type StudioDatabase } from './data/studioFallbackData';

const LOCAL_STORAGE_KEY = 'atelier_vance_studio_db_v4';

function loadLocalStudioDb(): StudioDatabase {
  try {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('atelier_vance_studio_db_v1');
      window.localStorage.removeItem('atelier_vance_studio_db_v2');
      window.localStorage.removeItem('atelier_vance_studio_db_v3');
    }
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return DEFAULT_STUDIO_DATABASE;
    const parsed = JSON.parse(raw) as Partial<StudioDatabase>;

    // If cache still contains legacy SVG plates in portfolio, stages, or journal, refresh to real photographs
    const hasLegacySvg =
      parsed.portfolio?.some(
        (p) => p.imageUrl?.includes('/api/plates/') || p.imageUrl?.endsWith('.svg')
      ) ||
      parsed.stages?.some(
        (s) => s.previewImageUrl?.includes('/api/plates/') || s.previewImageUrl?.endsWith('.svg')
      ) ||
      parsed.journal?.some(
        (j) => j.coverImageUrl?.includes('/api/plates/') || j.coverImageUrl?.endsWith('.svg')
      );

    if (hasLegacySvg) {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_STUDIO_DATABASE));
      return DEFAULT_STUDIO_DATABASE;
    }

    return {
      portfolio: parsed.portfolio?.length ? parsed.portfolio : DEFAULT_STUDIO_DATABASE.portfolio,
      stages: parsed.stages?.length ? parsed.stages : DEFAULT_STUDIO_DATABASE.stages,
      packages: parsed.packages?.length ? parsed.packages : DEFAULT_STUDIO_DATABASE.packages,
      addons: parsed.addons?.length ? parsed.addons : DEFAULT_STUDIO_DATABASE.addons,
      bookings: parsed.bookings?.length ? parsed.bookings : DEFAULT_STUDIO_DATABASE.bookings,
      journal: parsed.journal?.length ? parsed.journal : DEFAULT_STUDIO_DATABASE.journal,
      reviews: parsed.reviews?.length ? parsed.reviews : DEFAULT_STUDIO_DATABASE.reviews,
      inquiries: parsed.inquiries?.length ? parsed.inquiries : DEFAULT_STUDIO_DATABASE.inquiries,
    };
  } catch {
    return DEFAULT_STUDIO_DATABASE;
  }
}

function saveLocalStudioDb(db: StudioDatabase): void {
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(db));
  } catch {
    // Ignore storage quota errors in private browsing
  }
}

const NINE_PAGES: {
  route: StudioPageRoute;
  index: string;
  shortLabel: string;
  fullTitle: string;
}[] = [
  { route: 'home', index: '01', shortLabel: 'Home', fullTitle: 'Scroll Portfolio & Finale' },
  { route: 'exhibitions', index: '02', shortLabel: 'Exhibitions', fullTitle: 'Bento Archive & Loupe' },
  { route: 'services', index: '03', shortLabel: 'Services', fullTitle: '4 Disciplines & Pipeline' },
  { route: 'packages', index: '04', shortLabel: 'Packages', fullTitle: 'Starter / Standard / Premium (₹)' },
  { route: 'stages', index: '05', shortLabel: 'Stages', fullTitle: 'Soundstages A, B & C' },
  { route: 'journal', index: '06', shortLabel: 'Journal', fullTitle: 'Editorial Lighting Blog' },
  { route: 'reviews', index: '07', shortLabel: 'Reviews', fullTitle: 'Verified Client Proof' },
  { route: 'booking', index: '08', shortLabel: 'Booking', fullTitle: 'Appointment Scheduler' },
  { route: 'contact', index: '09', shortLabel: 'Contact', fullTitle: 'Concierge & Analytics' },
];

export default function App() {
  const [activePage, setActivePage] = useState<StudioPageRoute>('home');

  // Initialize immediately with fallback/localStorage data so static hosts (GitHub Pages) never render blank
  const initialDb = loadLocalStudioDb();
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(initialDb.portfolio);
  const [stages, setStages] = useState<StudioStage[]>(initialDb.stages);
  const [packages, setPackages] = useState<CommissionPackage[]>(initialDb.packages);
  const [addons, setAddons] = useState<ProductionAddon[]>(initialDb.addons);
  const [bookings, setBookings] = useState<BookingRecord[]>(initialDb.bookings);
  const [journal, setJournal] = useState<JournalArticle[]>(initialDb.journal);
  const [reviews, setReviews] = useState<ClientReview[]>(initialDb.reviews);
  const [inquiries, setInquiries] = useState<StudioInquiry[]>(initialDb.inquiries);

  // Modal & Bottom Sheet states
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null);
  const [isBackendOpen, setIsBackendOpen] = useState<boolean>(false);
  const [isPageDirectoryOpen, setIsPageDirectoryOpen] = useState<boolean>(false);
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState<boolean>(false);

  // Contextual navigation pre-selections
  const [preselectedCategory, setPreselectedCategory] = useState<PortfolioCategory | null>(null);
  const [preselectedPackageId, setPreselectedPackageId] = useState<string | null>(null);
  const [preselectedStageId, setPreselectedStageId] = useState<string | null>(null);
  const [preselectedKeyword, setPreselectedKeyword] = useState<string | null>(null);

  const applyStudioDb = useCallback((data: StudioDatabase) => {
    setPortfolio(data.portfolio || DEFAULT_STUDIO_DATABASE.portfolio);
    setStages(data.stages || DEFAULT_STUDIO_DATABASE.stages);
    setPackages(data.packages || DEFAULT_STUDIO_DATABASE.packages);
    setAddons(data.addons || DEFAULT_STUDIO_DATABASE.addons);
    setBookings(data.bookings || DEFAULT_STUDIO_DATABASE.bookings);
    setJournal(data.journal || DEFAULT_STUDIO_DATABASE.journal);
    setReviews(data.reviews || DEFAULT_STUDIO_DATABASE.reviews);
    setInquiries(data.inquiries || DEFAULT_STUDIO_DATABASE.inquiries);
    saveLocalStudioDb(data);
  }, []);

  const fetchStudioData = useCallback(async () => {
    try {
      const res = await fetch('/api/studio-data');
      const contentType = res.headers.get('content-type') || '';
      if (!res.ok || !contentType.includes('application/json')) {
        throw new Error('Static host environment detected');
      }
      const data = (await res.json()) as StudioDatabase;
      applyStudioDb(data);
    } catch {
      const localDb = loadLocalStudioDb();
      applyStudioDb(localDb);
    }
  }, [applyStudioDb]);

  useEffect(() => {
    fetchStudioData();
  }, [fetchStudioData]);

  const handleNavigate = useCallback(
    (
      page: StudioPageRoute,
      options?: {
        category?: PortfolioCategory;
        packageId?: string;
        stageId?: string;
        keyword?: string;
      }
    ) => {
      if (options?.category) setPreselectedCategory(options.category);
      if (options?.packageId) setPreselectedPackageId(options.packageId);
      if (options?.stageId) setPreselectedStageId(options.stageId);
      if (options?.keyword) setPreselectedKeyword(options.keyword);

      setLightboxItem(null);
      setIsPageDirectoryOpen(false);
      setIsMobileSheetOpen(false);
      setActivePage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    []
  );

  // Backend mutation handlers with static GitHub Pages fallback
  const handleAddPlate = async (newPlate: Partial<PortfolioItem>) => {
    try {
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPlate),
      });
      if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
        await fetchStudioData();
        return;
      }
    } catch {
      // Static fallback
    }
    const localDb = loadLocalStudioDb();
    const nextIndex = localDb.portfolio.length + 1;
    const created: PortfolioItem = {
      id: `plate-${Date.now()}`,
      plateNumber: newPlate.plateNumber || `PLATE ${String(nextIndex).padStart(2, '0')}`,
      title: newPlate.title || 'Untitled Studio Plate',
      subtitle: newPlate.subtitle || 'Commissioned Studio Plate',
      category: newPlate.category || 'Editorial & Fashion',
      client: newPlate.client || 'Private Commission',
      location: newPlate.location || 'Stage A · North Daylight Loft',
      year: newPlate.year || '2026',
      aspectRatio: newPlate.aspectRatio || '4:3',
      bentoSpan: newPlate.bentoSpan || '1x1',
      imageUrl: newPlate.imageUrl || '/api/plates/silhouette-alabaster.svg',
      featuredInHero: Boolean(newPlate.featuredInHero),
      curatorNote:
        newPlate.curatorNote ||
        'Captured in-studio on calibrated 16-bit medium format digital back with custom strobe diffusion.',
      exif: {
        camera: newPlate.exif?.camera || 'Hasselblad H6D-100c',
        lens: newPlate.exif?.lens || 'HC 80mm f/2.8',
        focalLength: newPlate.exif?.focalLength || '80mm',
        aperture: newPlate.exif?.aperture || 'f/5.6',
        shutterSpeed: newPlate.exif?.shutterSpeed || '1/160s',
        iso: newPlate.exif?.iso || 'ISO 64',
        lightingSetup: newPlate.exif?.lightingSetup || 'Profoto Pro-11 Key + Scrim Fill',
        colorProfile: newPlate.exif?.colorProfile || '16-Bit HNCS Master',
      },
      dominantTone: newPlate.dominantTone || '#18181B',
    };
    if (created.featuredInHero) {
      localDb.portfolio = localDb.portfolio.map((p) => ({ ...p, featuredInHero: false }));
    }
    localDb.portfolio.unshift(created);
    applyStudioDb(localDb);
  };

  const handleUpdatePlate = async (id: string, updates: Partial<PortfolioItem>) => {
    try {
      const res = await fetch(`/api/portfolio/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
        await fetchStudioData();
        return;
      }
    } catch {
      // Static fallback
    }
    const localDb = loadLocalStudioDb();
    if (updates.featuredInHero) {
      localDb.portfolio = localDb.portfolio.map((p) => ({ ...p, featuredInHero: false }));
    }
    localDb.portfolio = localDb.portfolio.map((item) =>
      item.id === id
        ? { ...item, ...updates, exif: { ...item.exif, ...(updates.exif || {}) } }
        : item
    );
    applyStudioDb(localDb);
  };

  const handleDeletePlate = async (id: string) => {
    try {
      const res = await fetch(`/api/portfolio/${id}`, {
        method: 'DELETE',
      });
      if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
        await fetchStudioData();
        return;
      }
    } catch {
      // Static fallback
    }
    const localDb = loadLocalStudioDb();
    localDb.portfolio = localDb.portfolio.filter((item) => item.id !== id);
    applyStudioDb(localDb);
  };

  const handleSubmitBooking = async (payload: Partial<BookingRecord>): Promise<BookingRecord> => {
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.headers.get('content-type')?.includes('application/json')) {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Booking conflict detected.');
        }
        await fetchStudioData();
        return data as BookingRecord;
      }
    } catch (err) {
      if (err instanceof Error && err.message.includes('active production hold')) {
        throw err;
      }
    }

    const localDb = loadLocalStudioDb();
    const conflicting = localDb.bookings.find(
      (b) =>
        b.date === payload.date &&
        b.status !== 'Completed' &&
        (b.timeSlot === payload.timeSlot ||
          b.timeSlot === 'Full Day (08:00 – 18:00)' ||
          payload.timeSlot === 'Full Day (08:00 – 18:00)')
    );
    if (conflicting) {
      throw new Error(
        `Selected date (${payload.date}) already has an active production hold (${conflicting.timeSlot}). Please choose another date or time slot.`
      );
    }
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const createdBooking: BookingRecord = {
      id: `bk-${Date.now()}`,
      referenceCode: `AV-2026-${randomCode}`,
      createdAt: new Date().toISOString(),
      bookingType: payload.bookingType || 'Commissioned Production',
      packageOrStageId: payload.packageOrStageId || 'pkg-standard',
      packageOrStageName:
        payload.packageOrStageName || 'STANDARD — Commercial Campaign & Brand Suite',
      category: payload.category || 'Editorial & Fashion',
      date: payload.date || new Date().toISOString().split('T')[0],
      timeSlot: payload.timeSlot || 'Full Day (08:00 – 18:00)',
      addons: payload.addons || [],
      estimatedTotal: Number(payload.estimatedTotal) || 28000,
      currency: 'INR',
      clientName: payload.clientName || 'Studio Client',
      clientEmail: payload.clientEmail || 'client@example.com',
      clientOrganization: payload.clientOrganization || 'Independent Commission',
      projectBrief: payload.projectBrief || '',
      aspectRatioPreference: payload.aspectRatioPreference || '4:3 Editorial Standard',
      status: 'Confirmed',
    };
    localDb.bookings.unshift(createdBooking);
    applyStudioDb(localDb);
    return createdBooking;
  };

  const handleUpdateBookingStatus = async (id: string, status: BookingRecord['status']) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
        await fetchStudioData();
        return;
      }
    } catch {
      // Static fallback
    }
    const localDb = loadLocalStudioDb();
    localDb.bookings = localDb.bookings.map((b) => (b.id === id ? { ...b, status } : b));
    applyStudioDb(localDb);
  };

  const handleAddReview = async (review: Partial<ClientReview>) => {
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review),
      });
      if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
        await fetchStudioData();
        return;
      }
    } catch {
      // Static fallback
    }
    const localDb = loadLocalStudioDb();
    const createdReview: ClientReview = {
      id: `rev-${Date.now()}`,
      clientName: review.clientName || 'Studio Client',
      role: review.role || 'Creative Producer',
      organization: review.organization || 'Commissioning Partner',
      category: review.category || 'Editorial & Fashion',
      rating: Number(review.rating) || 5,
      date: 'October 2026',
      projectTitle: review.projectTitle || 'Studio Production Commission',
      metricHighlight: review.metricHighlight || '100MP 16-bit archival delivery on schedule',
      quote: review.quote || '',
    };
    localDb.reviews.unshift(createdReview);
    applyStudioDb(localDb);
  };

  const handleSubmitInquiry = async (inquiry: Partial<StudioInquiry>) => {
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiry),
      });
      if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
        await fetchStudioData();
        return;
      }
    } catch {
      // Static fallback
    }
    const localDb = loadLocalStudioDb();
    const createdInquiry: StudioInquiry = {
      id: `inq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      name: inquiry.name || 'Client',
      email: inquiry.email || '',
      phone: inquiry.phone || '',
      company: inquiry.company || 'Private Inquiry',
      keywordIntent: inquiry.keywordIntent || 'LET’S CREATE TOGETHER',
      preferredTier: inquiry.preferredTier || 'STANDARD — Commercial Campaign & Brand Suite',
      message: inquiry.message || '',
      status: 'New',
    };
    localDb.inquiries.unshift(createdInquiry);
    applyStudioDb(localDb);
  };

  const handleResetDemo = async () => {
    try {
      const res = await fetch('/api/reset-demo', { method: 'POST' });
      if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
        await fetchStudioData();
        return;
      }
    } catch {
      // Static fallback
    }
    window.localStorage.removeItem(LOCAL_STORAGE_KEY);
    applyStudioDb(DEFAULT_STUDIO_DATABASE);
  };

  const currentPageMeta =
    NINE_PAGES.find((p) => p.route === activePage) || NINE_PAGES[0];

  return (
    <div className="min-h-screen bg-[#070708] text-[#F4F4F0] flex flex-col pb-16 lg:pb-0">
      {/* Strict 3-Zone Top Bar Contract (Compact 56px on Mobile/Tablet to honor 15% Sticky Cap) */}
      <header className="sticky top-0 z-40 h-14 lg:h-auto flex items-center justify-between gap-4 lg:gap-8 px-4 sm:px-6 lg:py-4 border-b border-[#1F1F23] bg-[#070708]/95 backdrop-blur-md">
        {/* Zone 1: Single text element wordmark */}
        <button
          type="button"
          onClick={() => handleNavigate('home')}
          className="min-h-[44px] flex items-center text-base sm:text-lg font-semibold tracking-tight text-[#F4F4F0] whitespace-nowrap shrink-0 cursor-pointer"
        >
          Atelier Vance
        </button>

        {/* Zone 2: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-6 text-sm font-medium text-[#9F9FA9]">
          {NINE_PAGES.slice(0, 5).map((pg) => (
            <button
              key={pg.route}
              type="button"
              onClick={() => handleNavigate(pg.route)}
              className={`min-h-[44px] flex items-center transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activePage === pg.route
                  ? 'text-[#E5A93C] underline underline-offset-8'
                  : 'hover:text-[#F4F4F0]'
              }`}
            >
              {pg.shortLabel}
            </button>
          ))}
        </nav>

        {/* Mobile Active Page Indicator */}
        <button
          type="button"
          onClick={() => setIsMobileSheetOpen(true)}
          className="md:hidden min-h-[44px] px-3 flex items-center gap-1.5 text-xs font-mono-tabular text-[#D4D4D8] truncate cursor-pointer"
        >
          <span className="text-[#E5A93C]">{currentPageMeta.index}.</span>
          <span className="truncate">{currentPageMeta.shortLabel}</span>
        </button>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={() => handleNavigate('booking')}
            className="min-h-[40px] sm:min-h-[44px] px-3.5 sm:px-4 py-2 text-xs font-semibold text-[#070708] bg-[#E5A93C] hover:bg-[#F2B705] active:scale-[0.98] rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            Reserve Studio
          </button>
        </div>
      </header>

      {/* Desktop-Only 9-Page Architectural Index Bar */}
      <div className="hidden lg:block border-b border-[#1A1A20] bg-[#0A0A0D] px-6 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 flex-wrap">
            {NINE_PAGES.map((pg) => {
              const isCurrent = activePage === pg.route;
              return (
                <button
                  key={pg.route}
                  type="button"
                  onClick={() => handleNavigate(pg.route)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono-tabular transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isCurrent
                      ? 'bg-[#F4F4F0] text-[#070708] font-semibold'
                      : 'text-[#9F9FA9] hover:text-[#F4F4F0] hover:bg-[#14141A]'
                  }`}
                >
                  {pg.index}. {pg.shortLabel}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsPageDirectoryOpen((prev) => !prev)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#D4D4D8] hover:text-[#F4F4F0] bg-[#141418] border border-[#25252E] rounded-lg whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-[#E5A93C]" />
              <span>9-Page Index</span>
            </button>

            <button
              type="button"
              onClick={() => setIsBackendOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#E5A93C] bg-[#141418] hover:bg-[#1C1C24] border border-[#2A2A34] rounded-lg whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Backend CMS</span>
            </button>
          </div>
        </div>

        {isPageDirectoryOpen && (
          <div className="max-w-7xl mx-auto pt-4 pb-2 grid grid-cols-9 gap-2.5 border-t border-[#1F1F25] mt-2.5">
            {NINE_PAGES.map((pg) => (
              <button
                key={pg.route}
                type="button"
                onClick={() => handleNavigate(pg.route)}
                className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                  activePage === pg.route
                    ? 'bg-[#181820] border-[#E5A93C] text-[#F4F4F0]'
                    : 'bg-[#0E0E12] border-[#1F1F26] text-[#9F9FA9] hover:text-[#F4F4F0]'
                }`}
              >
                <span className="text-[10px] font-mono-tabular text-[#E5A93C] block">
                  PAGE {pg.index}
                </span>
                <span className="text-xs font-semibold text-[#F4F4F0] block mt-0.5">
                  {pg.shortLabel}
                </span>
                <span className="text-[11px] text-[#9F9FA9] block truncate mt-0.5">
                  {pg.fullTitle}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Routed Page Viewport */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
          >
            {activePage === 'home' && (
              <HomePortfolioScrollPage
                portfolio={portfolio}
                currency="INR"
                onToggleCurrency={() => {}}
                onInspectPlate={(item) => setLightboxItem(item)}
                onNavigate={(page, opts) => handleNavigate(page, opts)}
              />
            )}

            {activePage === 'exhibitions' && (
              <ExhibitionsPage
                portfolio={portfolio}
                onInspectPlate={(item) => setLightboxItem(item)}
                onOpenBackendCms={() => setIsBackendOpen(true)}
                onNavigate={(page, opts) => handleNavigate(page, opts)}
              />
            )}

            {activePage === 'services' && (
              <ServicesPage onNavigate={(page, opts) => handleNavigate(page, opts)} />
            )}

            {activePage === 'packages' && (
              <PackagesPage
                packages={packages}
                addons={addons}
                onSelectPackageForBooking={(pkg) =>
                  handleNavigate('booking', {
                    packageId: pkg.id,
                    category: pkg.category,
                  })
                }
                onNavigate={(page, opts) => handleNavigate(page, opts)}
              />
            )}

            {activePage === 'stages' && (
              <StagesPage
                stages={stages}
                onBookStage={(stageId) => handleNavigate('booking', { stageId })}
                onNavigate={(page) => handleNavigate(page)}
              />
            )}

            {activePage === 'journal' && (
              <JournalPage
                articles={journal}
                onNavigate={(page, opts) => handleNavigate(page, opts)}
              />
            )}

            {activePage === 'reviews' && (
              <ReviewsPage
                reviews={reviews}
                onAddReview={handleAddReview}
                onNavigate={(page, opts) => handleNavigate(page, opts)}
              />
            )}

            {activePage === 'booking' && (
              <BookingSection
                packages={packages}
                stages={stages}
                addons={addons}
                bookings={bookings}
                preselectedCategory={preselectedCategory}
                preselectedPackageId={preselectedPackageId}
                preselectedStageId={preselectedStageId}
                preselectedKeyword={preselectedKeyword}
                onSubmitBooking={handleSubmitBooking}
              />
            )}

            {activePage === 'contact' && (
              <ContactPage
                portfolio={portfolio}
                bookings={bookings}
                reviews={reviews}
                inquiries={inquiries}
                currency="INR"
                preselectedKeyword={preselectedKeyword}
                onSubmitInquiry={handleSubmitInquiry}
                onOpenBackendCms={() => setIsBackendOpen(true)}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Quiet Editorial Footer with 9-Page Sitemap */}
      <footer className="border-t border-[#1F1F23] bg-[#070708] py-10 sm:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 text-xs text-[#9F9FA9]">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-[#F4F4F0]">
              Atelier Vance — Photography Studio & Production House
            </p>
            <p>
              Mumbai Kala Ghoda · New York SoHo · Paris Le Marais · +91 98201 44890 · concierge@ateliervance.studio
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {NINE_PAGES.map((pg) => (
              <button
                key={pg.route}
                type="button"
                onClick={() => handleNavigate(pg.route)}
                className={`min-h-[36px] px-1 hover:text-[#F4F4F0] transition-colors cursor-pointer ${
                  activePage === pg.route ? 'text-[#E5A93C] font-medium' : ''
                }`}
              >
                {pg.index}. {pg.shortLabel}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setIsBackendOpen(true)}
              className="min-h-[36px] px-1 text-[#E5A93C] hover:underline cursor-pointer font-medium"
            >
              Backend Image CMS
            </button>
          </div>
        </div>
      </footer>

      {/* Mobile & Tablet Fixed Bottom Thumb-Zone Navigation Dock (< 1024px) */}
      <nav
        aria-label="Mobile & Tablet Bottom Navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#09090C]/95 backdrop-blur-md border-t border-[#1F1F25] pb-safe"
      >
        <div className="grid grid-cols-5 items-center h-16 max-w-xl mx-auto px-2">
          <button
            type="button"
            onClick={() => handleNavigate('home')}
            className={`min-h-[48px] flex flex-col items-center justify-center transition-colors cursor-pointer ${
              activePage === 'home' ? 'text-[#E5A93C]' : 'text-[#9F9FA9] hover:text-[#F4F4F0]'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-medium tracking-tight mt-1">Portfolio</span>
          </button>

          <button
            type="button"
            onClick={() => handleNavigate('exhibitions')}
            className={`min-h-[48px] flex flex-col items-center justify-center transition-colors cursor-pointer ${
              activePage === 'exhibitions' ? 'text-[#E5A93C]' : 'text-[#9F9FA9] hover:text-[#F4F4F0]'
            }`}
          >
            <Grid className="w-5 h-5" />
            <span className="text-[10px] font-medium tracking-tight mt-1">Archive</span>
          </button>

          <button
            type="button"
            onClick={() => handleNavigate('packages')}
            className={`min-h-[48px] flex flex-col items-center justify-center transition-colors cursor-pointer ${
              activePage === 'packages' ? 'text-[#E5A93C]' : 'text-[#9F9FA9] hover:text-[#F4F4F0]'
            }`}
          >
            <Package className="w-5 h-5" />
            <span className="text-[10px] font-medium tracking-tight mt-1">Packages</span>
          </button>

          <button
            type="button"
            onClick={() => handleNavigate('booking')}
            className={`min-h-[48px] flex flex-col items-center justify-center transition-colors cursor-pointer ${
              activePage === 'booking' ? 'text-[#E5A93C]' : 'text-[#9F9FA9] hover:text-[#F4F4F0]'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span className="text-[10px] font-medium tracking-tight mt-1">Book</span>
          </button>

          <button
            type="button"
            onClick={() => setIsMobileSheetOpen(true)}
            className={`min-h-[48px] flex flex-col items-center justify-center transition-colors cursor-pointer ${
              isMobileSheetOpen || ['services', 'stages', 'journal', 'reviews', 'contact'].includes(activePage)
                ? 'text-[#E5A93C]'
                : 'text-[#9F9FA9] hover:text-[#F4F4F0]'
            }`}
          >
            <Menu className="w-5 h-5" />
            <span className="text-[10px] font-medium tracking-tight mt-1">All 9 Pages</span>
          </button>
        </div>
      </nav>

      {/* Mobile & Tablet Slide-Up Bottom Sheet Drawer for All 9 Pages & Backend CMS */}
      <AnimatePresence>
        {isMobileSheetOpen && (
          <div
            className="lg:hidden fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex flex-col justify-end"
            onClick={() => setIsMobileSheetOpen(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0B0B0F] border-t border-[#27272E] rounded-t-3xl p-5 pb-8 max-h-[85vh] overflow-y-auto space-y-5"
            >
              {/* Centered Grab Handle Bar */}
              <div className="w-10 h-1.5 bg-[#2E2E38] rounded-full mx-auto my-1" />

              <div className="flex items-center justify-between border-b border-[#1F1F25] pb-3">
                <div>
                  <h2 className="text-base font-semibold text-[#F4F4F0]">
                    9-Page Studio Navigation
                  </h2>
                  <p className="text-xs text-[#9F9FA9]">
                    Jump directly to any studio page or manage backend plates
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsMobileSheetOpen(false)}
                  aria-label="Close navigation sheet"
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-[#14141A] text-[#F4F4F0] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* 9-Page Touch Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {NINE_PAGES.map((pg) => {
                  const isCurrent = activePage === pg.route;
                  return (
                    <button
                      key={pg.route}
                      type="button"
                      onClick={() => handleNavigate(pg.route)}
                      className={`min-h-[56px] p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all active:scale-[0.98] cursor-pointer ${
                        isCurrent
                          ? 'bg-[#181822] border-[#E5A93C] text-[#F4F4F0]'
                          : 'bg-[#111116] border-[#1F1F26] text-[#D4D4D8]'
                      }`}
                    >
                      <div>
                        <span className="text-[11px] font-mono-tabular text-[#E5A93C] block">
                          PAGE {pg.index} · {pg.shortLabel.toUpperCase()}
                        </span>
                        <span className="text-xs text-[#9F9FA9] block mt-0.5">
                          {pg.fullTitle}
                        </span>
                      </div>
                      {isCurrent && (
                        <span className="text-xs font-mono-tabular text-[#E5A93C] font-semibold">
                          Active
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Bottom Sheet Quick Controls: Backend CMS + Direct Concierge */}
              <div className="pt-3 border-t border-[#1F1F25] flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileSheetOpen(false);
                    setIsBackendOpen(true);
                  }}
                  className="flex-1 min-h-[48px] px-4 rounded-2xl bg-[#14141C] border border-[#2A2A34] text-xs font-medium text-[#E5A93C] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sliders className="w-4 h-4" />
                  <span>Backend Image CMS</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleNavigate('contact')}
                  className="flex-1 min-h-[48px] px-4 rounded-2xl bg-[#E5A93C] text-[#070708] text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Contact Concierge</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* High-Resolution Fullscreen Lightbox Modal */}
      <LightboxModal
        item={lightboxItem}
        allItems={portfolio}
        onClose={() => setLightboxItem(null)}
        onSelectItem={(nextItem) => setLightboxItem(nextItem)}
        onBookSimilar={(item) =>
          handleNavigate('booking', {
            category: item.category,
            keyword: item.title.toUpperCase(),
          })
        }
      />

      {/* Backend Studio CMS Drawer */}
      <BackendStudioDrawer
        isOpen={isBackendOpen}
        onClose={() => setIsBackendOpen(false)}
        portfolio={portfolio}
        bookings={bookings}
        onAddPlate={handleAddPlate}
        onUpdatePlate={handleUpdatePlate}
        onDeletePlate={handleDeletePlate}
        onUpdateBookingStatus={handleUpdateBookingStatus}
        onResetDemo={handleResetDemo}
      />
    </div>
  );
}
