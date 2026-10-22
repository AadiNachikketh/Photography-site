export type StudioPageRoute =
  | 'home'
  | 'exhibitions'
  | 'services'
  | 'packages'
  | 'stages'
  | 'journal'
  | 'reviews'
  | 'booking'
  | 'contact';

export type CurrencyCode = 'INR' | 'USD';

export type PortfolioCategory =
  | 'Editorial & Fashion'
  | 'Architecture & Spatial'
  | 'Commercial Still Life'
  | 'Fine Art Portrait';

export type BentoSpan = '2x2' | '2x1' | '1x2' | '1x1';

export interface ExifMetadata {
  camera: string;
  lens: string;
  focalLength: string;
  aperture: string;
  shutterSpeed: string;
  iso: string;
  lightingSetup: string;
  colorProfile: string;
}

export interface PortfolioItem {
  id: string;
  plateNumber: string;
  title: string;
  subtitle: string;
  category: PortfolioCategory;
  client: string;
  location: string;
  year: string;
  aspectRatio: '16:9' | '4:3' | '3:4' | '1:1';
  bentoSpan: BentoSpan;
  imageUrl: string;
  featuredInHero?: boolean;
  curatorNote: string;
  exif: ExifMetadata;
  dominantTone: string;
}

export interface StudioStage {
  id: string;
  code: string;
  name: string;
  dimensions: string;
  ceilingHeight: string;
  daylightRate: number;
  fullDayRate: number;
  daylightRateInr: number;
  fullDayRateInr: number;
  orientation: string;
  keySpecs: string[];
  includedGear: string[];
  idealFor: string;
  previewImageUrl: string;
}

export interface CommissionPackage {
  id: string;
  index: string;
  name: string;
  tierBadge?: string;
  popular?: boolean;
  category: PortfolioCategory;
  startingRate: number;
  startingRateInr: number;
  inrRangeLabel: string;
  usdRangeLabel: string;
  durationLabel: string;
  deliverables: string;
  resolutionSpec: string;
  turnaroundHours: number;
  summary: string;
  includedServices: string[];
}

export interface ProductionAddon {
  id: string;
  name: string;
  category: 'Capture' | 'Crew' | 'Lighting' | 'Post-Production' | 'Retainer';
  rate: number;
  rateInr: number;
  unit: string;
}

export interface BookingRecord {
  id: string;
  referenceCode: string;
  createdAt: string;
  bookingType: 'Commissioned Production' | 'Stage Rental';
  packageOrStageId: string;
  packageOrStageName: string;
  category: PortfolioCategory;
  date: string;
  timeSlot:
    | 'Full Day (08:00 – 18:00)'
    | 'Morning Half-Day (08:00 – 13:00)'
    | 'Afternoon / Twilight (14:00 – 20:00)';
  addons: string[];
  estimatedTotal: number;
  currency: CurrencyCode;
  clientName: string;
  clientEmail: string;
  clientOrganization: string;
  projectBrief: string;
  aspectRatioPreference: string;
  status: 'Confirmed' | 'Pending Review' | 'Completed';
}

export interface JournalArticle {
  id: string;
  slug: string;
  issueNumber: string;
  title: string;
  subtitle: string;
  category: string;
  publishedAt: string;
  readTime: string;
  author: string;
  authorRole: string;
  coverImageUrl: string;
  excerpt: string;
  sections: {
    heading: string;
    body: string;
  }[];
  technicalTakeaway: string;
}

export interface ClientReview {
  id: string;
  clientName: string;
  role: string;
  organization: string;
  category: PortfolioCategory;
  rating: number;
  date: string;
  projectTitle: string;
  metricHighlight: string;
  quote: string;
}

export interface StudioInquiry {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  keywordIntent: string;
  preferredTier: string;
  message: string;
  status: 'New' | 'Responded';
}
