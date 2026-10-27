import type {
  BookingRecord,
  ClientReview,
  CommissionPackage,
  JournalArticle,
  PortfolioItem,
  ProductionAddon,
  StudioInquiry,
  StudioStage,
} from '../types/studio';
import { EMBEDDED_STUDIO_PHOTOS } from './embeddedStudioPhotos';

export interface StudioDatabase {
  portfolio: PortfolioItem[];
  stages: StudioStage[];
  packages: CommissionPackage[];
  addons: ProductionAddon[];
  bookings: BookingRecord[];
  journal: JournalArticle[];
  reviews: ClientReview[];
  inquiries: StudioInquiry[];
}

export function renderPhotographicPlateSvg(plateSlug: string): string {
  const cleanSlug = plateSlug.replace(/^\/api\/plates\//i, '').replace(/\.svg$/i, '');

  const commonDefs = `
    <defs>
      <filter id="filmGrain" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" result="noise"/>
        <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.055 0" in="noise" result="coloredNoise"/>
        <feComposite operator="in" in2="SourceGraphic"/>
      </filter>
      <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="28" result="blur"/>
      </filter>
      <filter id="causticBlur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="12" result="blur"/>
      </filter>
    </defs>
  `;

  switch (cleanSlug) {
    case 'silhouette-alabaster':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1200" width="1600" height="1200">
        ${commonDefs}
        <defs>
          <linearGradient id="bgAlabaster" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#191817"/>
            <stop offset="48%" stop-color="#0D0C0C"/>
            <stop offset="100%" stop-color="#050506"/>
          </linearGradient>
          <linearGradient id="windowBeam" x1="0" y1="0" x2="1" y2="0.6">
            <stop offset="0%" stop-color="#F5EFE6" stop-opacity="0.34"/>
            <stop offset="55%" stop-color="#D8C8B4" stop-opacity="0.11"/>
            <stop offset="100%" stop-color="#0D0C0C" stop-opacity="0"/>
          </linearGradient>
          <linearGradient id="coatSculpt" x1="0.2" y1="0" x2="0.85" y2="1">
            <stop offset="0%" stop-color="#EAE3D5"/>
            <stop offset="32%" stop-color="#9B9082"/>
            <stop offset="68%" stop-color="#282523"/>
            <stop offset="100%" stop-color="#09090A"/>
          </linearGradient>
          <radialGradient id="rimStrobe" cx="0.64" cy="0.36" r="0.48">
            <stop offset="0%" stop-color="#F7E7CE" stop-opacity="0.55"/>
            <stop offset="45%" stop-color="#C89D54" stop-opacity="0.12"/>
            <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="1600" height="1200" fill="url(#bgAlabaster)"/>
        <polygon points="0,0 920,0 1480,1200 180,1200" fill="url(#windowBeam)"/>
        <rect x="240" y="0" width="14" height="1200" fill="#070708" opacity="0.55" transform="skewX(22)"/>
        <rect x="560" y="0" width="14" height="1200" fill="#070708" opacity="0.55" transform="skewX(22)"/>
        <rect x="0" y="480" width="1600" height="10" fill="#070708" opacity="0.45"/>
        <circle cx="960" cy="440" r="460" fill="url(#rimStrobe)" filter="url(#softGlow)"/>
        <line x1="0" y1="960" x2="1600" y2="960" stroke="#2E2B27" stroke-width="1.5"/>
        <g transform="translate(520, 140)">
          <ellipse cx="380" cy="890" rx="390" ry="48" fill="#030304" opacity="0.85" filter="url(#causticBlur)"/>
          <path d="M270,130 C350,120 430,175 465,280 L575,860 L125,860 L205,270 C220,180 240,135 270,130 Z" fill="#101012"/>
          <path d="M278,128 C335,132 395,190 435,310 L515,860 L315,860 L265,360 Z" fill="url(#coatSculpt)"/>
          <circle cx="295" cy="92" r="48" fill="#181716"/>
          <path d="M295,44 C322,44 343,65 343,92 C343,119 322,140 295,140 C288,140 282,138 276,134 C298,126 312,108 312,88 C312,68 298,52 280,46 Z" fill="#EFE8DC"/>
          <path d="M335,134 L452,300 L562,860" fill="none" stroke="#F6EBD8" stroke-width="3.5" opacity="0.85"/>
          <path d="M235,145 L178,420 L132,860" fill="none" stroke="#5A5248" stroke-width="1.5" opacity="0.6"/>
        </g>
        <rect x="36" y="36" width="1528" height="1128" fill="none" stroke="#EAE3D5" stroke-opacity="0.16" stroke-width="1"/>
        <rect width="1600" height="1200" filter="url(#filmGrain)" opacity="0.4"/>
      </svg>`;

    case 'brutalist-pavilion':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900">
        ${commonDefs}
        <defs>
          <linearGradient id="travertineWall" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#35302A"/>
            <stop offset="55%" stop-color="#1E1B18"/>
            <stop offset="100%" stop-color="#0E0D0C"/>
          </linearGradient>
          <linearGradient id="sunShaft" x1="0" y1="0" x2="1" y2="0.8">
            <stop offset="0%" stop-color="#F5D393" stop-opacity="0.52"/>
            <stop offset="50%" stop-color="#D99B4E" stop-opacity="0.22"/>
            <stop offset="100%" stop-color="#181512" stop-opacity="0"/>
          </linearGradient>
          <linearGradient id="skySlot" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#E7DEC8"/>
            <stop offset="100%" stop-color="#9A8970"/>
          </linearGradient>
        </defs>
        <rect width="1600" height="900" fill="#0B0B0C"/>
        <polygon points="0,0 680,0 520,680 0,840" fill="url(#travertineWall)"/>
        <polygon points="680,0 1040,0 820,640 520,680" fill="url(#skySlot)" opacity="0.88"/>
        <polygon points="940,0 1600,0 1600,900 760,690" fill="#171615"/>
        <polygon points="0,840 520,680 1600,760 1600,900 0,900" fill="#121110"/>
        <polygon points="520,680 820,640 1490,900 680,900" fill="url(#sunShaft)"/>
        <polygon points="680,0 1040,0 1490,900 680,900" fill="url(#sunShaft)" opacity="0.65"/>
        <line x1="520" y1="0" x2="520" y2="680" stroke="#474038" stroke-width="1" opacity="0.6"/>
        <line x1="280" y1="0" x2="210" y2="775" stroke="#474038" stroke-width="1" opacity="0.45"/>
        <line x1="0" y1="340" x2="600" y2="310" stroke="#474038" stroke-width="1" opacity="0.4"/>
        <polygon points="180,790 1320,740 1520,900 80,900" fill="#080809" stroke="#3A332C" stroke-width="1"/>
        <line x1="580" y1="775" x2="980" y2="880" stroke="#E5A93C" stroke-opacity="0.35" stroke-width="2"/>
        <rect x="32" y="32" width="1536" height="836" fill="none" stroke="#EAE3D5" stroke-opacity="0.16" stroke-width="1"/>
      </svg>`;

    case 'horology-macro':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900">
        ${commonDefs}
        <defs>
          <radialGradient id="slateSurface" cx="0.5" cy="0.5" r="0.65">
            <stop offset="0%" stop-color="#1E2229"/>
            <stop offset="60%" stop-color="#0E1014"/>
            <stop offset="100%" stop-color="#050608"/>
          </radialGradient>
          <linearGradient id="titaniumBezel" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#F4F4F6"/>
            <stop offset="28%" stop-color="#8E95A2"/>
            <stop offset="52%" stop-color="#252830"/>
            <stop offset="78%" stop-color="#B8BFC9"/>
            <stop offset="100%" stop-color="#181A20"/>
          </linearGradient>
          <linearGradient id="goldBridge" x1="0" y1="0" x2="1" y2="0.5">
            <stop offset="0%" stop-color="#F7D794"/>
            <stop offset="50%" stop-color="#C88A2B"/>
            <stop offset="100%" stop-color="#6B4610"/>
          </linearGradient>
        </defs>
        <rect width="1200" height="900" fill="url(#slateSurface)"/>
        <ellipse cx="600" cy="450" rx="420" ry="310" fill="#E5A93C" opacity="0.08" filter="url(#softGlow)"/>
        <line x1="0" y1="710" x2="1200" y2="210" stroke="#2B303A" stroke-width="1.5"/>
        <g transform="translate(600, 450)">
          <path d="M-150,-320 L-95,-210 L95,-210 L150,-320 Z" fill="url(#titaniumBezel)" opacity="0.85"/>
          <path d="M-150,320 L-95,210 L95,210 L150,320 Z" fill="url(#titaniumBezel)" opacity="0.85"/>
          <circle r="270" fill="url(#titaniumBezel)"/>
          <circle r="236" fill="#090B0E" stroke="#4A505C" stroke-width="2"/>
          <circle r="222" fill="none" stroke="#9EA4B0" stroke-width="1" stroke-dasharray="3 9"/>
          <circle r="196" fill="none" stroke="#2E333D" stroke-width="1"/>
          <circle cx="-92" cy="0" r="56" fill="#0F1217" stroke="#5A606E" stroke-width="1.5"/>
          <circle cx="92" cy="0" r="56" fill="#0F1217" stroke="#5A606E" stroke-width="1.5"/>
          <circle cx="0" cy="108" r="62" fill="#060709" stroke="url(#goldBridge)" stroke-width="2.5"/>
          <line x1="-68" y1="108" x2="68" y2="108" stroke="url(#goldBridge)" stroke-width="5"/>
          <circle cx="0" cy="108" r="18" fill="none" stroke="#F4D084" stroke-width="2"/>
          <polygon points="-8,24 0,-176 8,24 0,42" fill="#F4F4F0" transform="rotate(-38)"/>
          <polygon points="-6,20 0,-205 6,20 0,34" fill="#E5A93C" transform="rotate(62)"/>
          <circle r="10" fill="#F7D794"/>
          <path d="M-190,-140 A240,240 0 0,1 180,-150 L80,190 A240,240 0 0,1 -190,-140 Z" fill="#93C5FD" opacity="0.045"/>
        </g>
        <rect x="28" y="28" width="1144" height="844" fill="none" stroke="#EAE3D5" stroke-opacity="0.16" stroke-width="1"/>
      </svg>`;

    case 'silver-portrait':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200" width="1200" height="1200">
        ${commonDefs}
        <defs>
          <radialGradient id="octabankLight" cx="0.38" cy="0.35" r="0.62">
            <stop offset="0%" stop-color="#E4E4E7" stop-opacity="0.28"/>
            <stop offset="55%" stop-color="#52525B" stop-opacity="0.08"/>
            <stop offset="100%" stop-color="#050506" stop-opacity="0"/>
          </radialGradient>
          <linearGradient id="silverFace" x1="0.15" y1="0.1" x2="0.88" y2="0.9">
            <stop offset="0%" stop-color="#F4F4F5"/>
            <stop offset="38%" stop-color="#A1A1AA"/>
            <stop offset="68%" stop-color="#27272A"/>
            <stop offset="100%" stop-color="#09090B"/>
          </linearGradient>
        </defs>
        <rect width="1200" height="1200" fill="#070708"/>
        <circle cx="480" cy="420" r="560" fill="url(#octabankLight)"/>
        <g transform="translate(300, 170)">
          <path d="M40,920 C75,690 175,600 300,600 C425,600 525,690 560,920 Z" fill="#121215"/>
          <path d="M55,920 C88,710 175,615 295,602 L295,920 Z" fill="#27272C"/>
          <rect x="242" y="450" width="116" height="175" rx="36" fill="url(#silverFace)"/>
          <ellipse cx="300" cy="310" rx="142" ry="188" fill="#111114"/>
          <path d="M300,122 C222,122 158,206 158,310 C158,414 222,498 300,498 C318,498 332,485 332,462 C310,430 296,375 296,310 C296,235 314,175 340,132 C327,125 314,122 300,122 Z" fill="url(#silverFace)"/>
          <polygon points="332,305 388,305 352,368" fill="#D4D4D8" opacity="0.48" filter="url(#causticBlur)"/>
          <circle cx="242" cy="282" r="4.5" fill="#FFFFFF" opacity="0.9"/>
          <circle cx="358" cy="282" r="3" fill="#E4E4E7" opacity="0.55"/>
        </g>
        <rect x="32" y="32" width="1136" height="1136" fill="none" stroke="#EAE3D5" stroke-opacity="0.18" stroke-width="1"/>
      </svg>`;

    case 'amber-vessel':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1200" width="900" height="1200">
        ${commonDefs}
        <defs>
          <radialGradient id="amberCaustic" cx="0.52" cy="0.56" r="0.46">
            <stop offset="0%" stop-color="#F59E0B" stop-opacity="0.62"/>
            <stop offset="42%" stop-color="#B45309" stop-opacity="0.24"/>
            <stop offset="100%" stop-color="#090807" stop-opacity="0"/>
          </radialGradient>
          <linearGradient id="glassBody" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#FDE68A" stop-opacity="0.85"/>
            <stop offset="35%" stop-color="#D97706" stop-opacity="0.75"/>
            <stop offset="75%" stop-color="#451A03" stop-opacity="0.92"/>
            <stop offset="100%" stop-color="#1C0D06" stop-opacity="0.98"/>
          </linearGradient>
        </defs>
        <rect width="900" height="1200" fill="#0B0908"/>
        <polygon points="110,860 790,860 860,1200 40,1200" fill="#1C1917"/>
        <line x1="110" y1="860" x2="790" y2="860" stroke="#44403C" stroke-width="2"/>
        <ellipse cx="480" cy="640" rx="340" ry="280" fill="url(#amberCaustic)" filter="url(#softGlow)"/>
        <ellipse cx="560" cy="910" rx="220" ry="42" fill="#F59E0B" opacity="0.28" filter="url(#causticBlur)"/>
        <g transform="translate(270, 250)">
          <rect x="115" y="0" width="130" height="96" rx="8" fill="#18181B" stroke="#52525B" stroke-width="1.5"/>
          <rect x="148" y="96" width="64" height="44" fill="#27272A"/>
          <rect x="30" y="140" width="300" height="470" rx="28" fill="url(#glassBody)" stroke="#FCD34D" stroke-opacity="0.45" stroke-width="2"/>
          <path d="M46,240 Q180,258 314,240 L314,580 Q180,598 46,580 Z" fill="#92400E" opacity="0.45"/>
          <rect x="82" y="290" width="196" height="210" fill="#F5F5F4" opacity="0.92"/>
          <line x1="112" y1="345" x2="248" y2="345" stroke="#1C1917" stroke-width="2"/>
          <line x1="132" y1="380" x2="228" y2="380" stroke="#78716C" stroke-width="1.5"/>
          <line x1="148" y1="445" x2="212" y2="445" stroke="#1C1917" stroke-width="1"/>
        </g>
        <rect x="28" y="28" width="844" height="1144" fill="none" stroke="#EAE3D5" stroke-opacity="0.16" stroke-width="1"/>
      </svg>`;

    case 'nocturne-drapery':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900">
        ${commonDefs}
        <defs>
          <linearGradient id="silkWave" x1="0" y1="0.2" x2="1" y2="0.8">
            <stop offset="0%" stop-color="#F5F3EF" stop-opacity="0.9"/>
            <stop offset="38%" stop-color="#C7B299" stop-opacity="0.55"/>
            <stop offset="72%" stop-color="#4A3F35" stop-opacity="0.25"/>
            <stop offset="100%" stop-color="#09090B" stop-opacity="0"/>
          </linearGradient>
          <linearGradient id="motionTrail" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#E5A93C" stop-opacity="0"/>
            <stop offset="50%" stop-color="#E5A93C" stop-opacity="0.32"/>
            <stop offset="100%" stop-color="#F4F4F0" stop-opacity="0.75"/>
          </linearGradient>
        </defs>
        <rect width="1200" height="900" fill="#08080A"/>
        <path d="M120,680 C340,220 620,760 1060,240" fill="none" stroke="url(#motionTrail)" stroke-width="110" filter="url(#softGlow)"/>
        <path d="M180,540 C420,140 740,620 980,190 C840,510 560,690 240,760 Z" fill="url(#silkWave)"/>
        <path d="M290,480 C510,180 790,530 1020,230" fill="none" stroke="#FAF8F5" stroke-width="3" opacity="0.85"/>
        <rect x="28" y="28" width="1144" height="844" fill="none" stroke="#EAE3D5" stroke-opacity="0.16" stroke-width="1"/>
      </svg>`;

    case 'gypsum-stairwell':
    default:
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900">
        ${commonDefs}
        <defs>
          <linearGradient id="gypsumGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#E7E2D8"/>
            <stop offset="45%" stop-color="#8C857B"/>
            <stop offset="82%" stop-color="#2B2926"/>
            <stop offset="100%" stop-color="#0E0E10"/>
          </linearGradient>
          <linearGradient id="zenithGlow" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stop-color="#FAF6EE" stop-opacity="0.65"/>
            <stop offset="100%" stop-color="#141416" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <rect width="1600" height="900" fill="#0E0E10"/>
        <ellipse cx="800" cy="120" rx="680" ry="380" fill="url(#zenithGlow)" filter="url(#softGlow)"/>
        <path d="M-100,900 C240,340 680,120 1700,480 L1700,900 Z" fill="url(#gypsumGrad)"/>
        <path d="M-80,900 C360,480 860,280 1680,740 L1680,900 Z" fill="#141416"/>
        <path d="M120,0 C420,520 980,660 1650,180" fill="none" stroke="#F4EFE6" stroke-width="2.5" opacity="0.7"/>
        <rect x="32" y="32" width="1536" height="836" fill="none" stroke="#EAE3D5" stroke-opacity="0.16" stroke-width="1"/>
      </svg>`;
  }
}

const LEGACY_PLATE_TO_PHOTO_MAP: Record<string, string> = {
  'silhouette-alabaster': '/assets/aistudio/pexels-photo-7462603_cfbc76d1.jpg',
  'brutalist-pavilion': '/assets/aistudio/images__2__32f9c414.jpg',
  'horology-macro': '/assets/aistudio/31_a4b61f36.jpg',
  'silver-portrait': '/assets/aistudio/wide_20847189.jpeg',
  'amber-vessel': '/assets/aistudio/Portrait_photography_shot_of_model_39c143b3.jpg',
  'nocturne-drapery': '/assets/aistudio/creative-wedding-photography_00187c97.jpg',
  'gypsum-stairwell': '/assets/aistudio/na-cover_ae278ee9.jpg',
  'stage-a-loft': '/assets/aistudio/pexels-photo-7462603_cfbc76d1.jpg',
};

export function getStudioPlateCandidateUrls(src: string): string[] {
  if (!src) return [];

  let normalizedSrc = src.trim();
  if (normalizedSrc.startsWith('/api/plates/')) {
    const cleanSlug = normalizedSrc.replace(/^\/api\/plates\//i, '').replace(/\.svg$/i, '');
    if (LEGACY_PLATE_TO_PHOTO_MAP[cleanSlug]) {
      normalizedSrc = LEGACY_PLATE_TO_PHOTO_MAP[cleanSlug];
    } else {
      const svgMarkup = renderPhotographicPlateSvg(normalizedSrc);
      return [`data:image/svg+xml;utf8,${encodeURIComponent(svgMarkup)}`];
    }
  }

  if (normalizedSrc.startsWith('data:') || normalizedSrc.startsWith('http://') || normalizedSrc.startsWith('https://')) {
    return [normalizedSrc];
  }

  const fileName = normalizedSrc.split('/').pop() || '';
  const candidates: string[] = [];

  if (fileName && EMBEDDED_STUDIO_PHOTOS[fileName]) {
    candidates.push(EMBEDDED_STUDIO_PHOTOS[fileName]);
  }

  if (typeof window !== 'undefined') {
    const embeddedCache = (window as unknown as { __ATELIER_VANCE_EMBEDDED_PHOTOS__?: Record<string, string> })
      .__ATELIER_VANCE_EMBEDDED_PHOTOS__;
    if (embeddedCache && fileName && embeddedCache[fileName]) {
      candidates.push(embeddedCache[fileName]);
    }
  }

  const cleanAssetPath = normalizedSrc.replace(/^\.?\//, '').replace(/^public\//, '');

  if (typeof window !== 'undefined') {
    const isGitHubPages = window.location.hostname.indexOf('github.io') !== -1;
    const isZeroBuildBootstrapped = Boolean(
      (window as unknown as { __ATELIER_VANCE_BOOTSTRAPPED__?: boolean }).__ATELIER_VANCE_BOOTSTRAPPED__
    );
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    const repoName = pathSegments[0] || '';

    if (isZeroBuildBootstrapped || isGitHubPages) {
      candidates.push(`./public/${cleanAssetPath}`);
      candidates.push(`./${cleanAssetPath}`);
      if (repoName) {
        candidates.push(`/${repoName}/public/${cleanAssetPath}`);
        candidates.push(`/${repoName}/${cleanAssetPath}`);
      }
      candidates.push(`/${cleanAssetPath}`);
    } else {
      candidates.push(`/${cleanAssetPath}`);
      candidates.push(`./${cleanAssetPath}`);
      candidates.push(`./public/${cleanAssetPath}`);
    }
  } else {
    candidates.push(`/${cleanAssetPath}`);
  }

  return Array.from(new Set(candidates));
}

export function resolveStudioPlateUrl(src: string): string {
  const candidates = getStudioPlateCandidateUrls(src);
  return candidates[0] || src || '';
}


export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: 'plate-01',
    plateNumber: 'PLATE 01',
    title: 'Silhouette in Alabaster & Obsidian',
    subtitle: 'Haute Couture & Platinum Blonde Editorial',
    category: 'Editorial & Fashion',
    client: 'Maison Valen Paris',
    location: 'Stage A · North Daylight Loft',
    year: '2026',
    aspectRatio: '3:4',
    bentoSpan: '2x2',
    imageUrl: '/assets/aistudio/pexels-photo-7462603_cfbc76d1.jpg',
    featuredInHero: true,
    curatorNote:
      'Captured on medium format digital back with single-source directional daylight, carving delicate facial contours and platinum blonde locks against an archival neutral tone.',
    exif: {
      camera: 'Hasselblad H6D-100c',
      lens: 'HC 80mm f/2.8',
      focalLength: '80mm',
      aperture: 'f/4.0',
      shutterSpeed: '1/200s',
      iso: 'ISO 64',
      lightingSetup: 'North Casement Light + Negative Fill Flag',
      colorProfile: '16-Bit HNCS Neutral',
    },
    dominantTone: '#222120',
  },
  {
    id: 'plate-02',
    plateNumber: 'PLATE 02',
    title: 'Memorial Void & Sunset Skyline',
    subtitle: 'Architectural Reflection Monograph',
    category: 'Architecture & Spatial',
    client: 'Kengo & Partners Architects',
    location: 'Lower Manhattan Monograph',
    year: '2026',
    aspectRatio: '16:9',
    bentoSpan: '2x1',
    imageUrl: '/assets/aistudio/images__2__32f9c414.jpg',
    curatorNote:
      'Zero-distortion architectural plate capturing the infinity cascade of the reflecting pool framed by dusk illumination across downtown skyscrapers.',
    exif: {
      camera: 'Phase One XT IQ4 150MP',
      lens: 'Rodenstock HR Digaron-S 23mm',
      focalLength: '23mm',
      aperture: 'f/11',
      shutterSpeed: '1/8s',
      iso: 'ISO 50',
      lightingSetup: 'Dusk Golden Hour Horizon',
      colorProfile: '16-Bit Linear Architectural Profile',
    },
    dominantTone: '#1C2025',
  },
  {
    id: 'plate-03',
    plateNumber: 'PLATE 03',
    title: 'Ignition & Crimson Lip Macro',
    subtitle: 'Sub-Millimeter Beauty & Pyrotechnic Detail',
    category: 'Commercial Still Life',
    client: 'Atelier Orlov Grasse & Vogue',
    location: 'Stage C · Optical Macro Lab',
    year: '2026',
    aspectRatio: '4:3',
    bentoSpan: '1x1',
    imageUrl: '/assets/aistudio/camera-angle-extreme-close-up-rodolfoclix_12769e5d.jpg',
    curatorNote:
      'Macro optical capture freezing the combustion wavefront of a phosphor match held between deep velvet berry lips, resolving enamel textures and heat ripples.',
    exif: {
      camera: 'Hasselblad X2D 100C',
      lens: 'XCD 120mm Macro f/3.5',
      focalLength: '120mm',
      aperture: 'f/8.0',
      shutterSpeed: '1/800s',
      iso: 'ISO 64',
      lightingSetup: 'Broncolor Scoro 3200S High-Speed Pulse + Optical Spot',
      colorProfile: '16-Bit AdobeRGB Master Plate',
    },
    dominantTone: '#2A121A',
  },
  {
    id: 'plate-04',
    plateNumber: 'PLATE 04',
    title: 'Tempest on the Ocean Cliffs',
    subtitle: 'Dramatic Coastal Bridal Monograph',
    category: 'Editorial & Fashion',
    client: 'Haute Mariée International',
    location: 'Uluwatu Cliffs & Coastal Arch',
    year: '2026',
    aspectRatio: '16:9',
    bentoSpan: '2x1',
    imageUrl: '/assets/aistudio/creative-wedding-photography_00187c97.jpg',
    curatorNote:
      'High-wind coastal editorial suspending a 14-foot crystalline silk tulle veil against Pacific breakers and dramatic overcast cloud formations.',
    exif: {
      camera: 'Phase One IQ4 150MP',
      lens: 'Schneider Kreuznach 45mm LS',
      focalLength: '45mm',
      aperture: 'f/6.3',
      shutterSpeed: '1/500s',
      iso: 'ISO 100',
      lightingSetup: 'Ambient Storm Light + Feathered Off-Axis Flash',
      colorProfile: '16-Bit Capture One Master',
    },
    dominantTone: '#2B2824',
  },
  {
    id: 'plate-05',
    plateNumber: 'PLATE 05',
    title: 'Prismatic Arachnid Bio-Optics',
    subtitle: '48-Frame Focus-Stacked Macro Study',
    category: 'Commercial Still Life',
    client: 'National Geographic & Zeiss Optics',
    location: 'Stage C · Optical Macro Lab',
    year: '2026',
    aspectRatio: '4:3',
    bentoSpan: '1x1',
    imageUrl: '/assets/aistudio/31_a4b61f36.jpg',
    curatorNote:
      'Extreme micro-photography isolating the iridescent multi-faceted ocular cluster and micro-setae of a jumping spider mirrored on calibrated optical glass.',
    exif: {
      camera: 'Hasselblad X2D 100C',
      lens: 'Mitutoyo M Plan Apo 5X + Rail',
      focalLength: '100mm',
      aperture: 'f/5.6 effective',
      shutterSpeed: '1/125s',
      iso: 'ISO 64',
      lightingSetup: 'Dual Fiber-Optic Snoots + Polarized Ring',
      colorProfile: '16-Bit Linear ProPhoto',
    },
    dominantTone: '#141C25',
  },
  {
    id: 'plate-06',
    plateNumber: 'PLATE 06',
    title: 'The Human Ocular Cosmos',
    subtitle: 'Heterochromatic Iris Fine Art Monograph',
    category: 'Fine Art Portrait',
    client: 'Permanent Archive Collection',
    location: 'Stage C · Optical Macro Lab',
    year: '2026',
    aspectRatio: '16:9',
    bentoSpan: '2x1',
    imageUrl: '/assets/aistudio/na-cover_ae278ee9.jpg',
    curatorNote:
      'Macro ophthalmic portrait recording the intricate trabecular meshwork, amber crypts, and pupillary sphincter fibers in high resolution.',
    exif: {
      camera: 'Hasselblad H6D-100c',
      lens: 'HC 120mm Macro II + Extension',
      focalLength: '120mm',
      aperture: 'f/11',
      shutterSpeed: '1/160s',
      iso: 'ISO 64',
      lightingSetup: 'Continuous CRI 98 LED Collimated Slit-Lamp',
      colorProfile: '16-Bit Phocus Master',
    },
    dominantTone: '#251C15',
  },
  {
    id: 'plate-07',
    plateNumber: 'PLATE 07',
    title: 'Kinetic Leap at Golden Dusk',
    subtitle: 'Dynamic High-Speed Silhouette Series',
    category: 'Fine Art Portrait',
    client: 'Movement & Form Quarterly',
    location: 'Stage B & Open Grounds',
    year: '2026',
    aspectRatio: '4:3',
    bentoSpan: '1x1',
    imageUrl: '/assets/aistudio/action-photography-101_9570506e.jpg',
    curatorNote:
      'Sub-millisecond shutter capture suspending mid-air athletic propulsion against the fiery sunset sphere mirrored in rain-washed earth.',
    exif: {
      camera: 'Phase One XT 150MP',
      lens: 'Rodenstock 32mm f/4',
      focalLength: '32mm',
      aperture: 'f/5.6',
      shutterSpeed: '1/4000s',
      iso: 'ISO 200',
      lightingSetup: 'Pure Backlit Golden-Hour Silhouette',
      colorProfile: '16-Bit Master Film Profile',
    },
    dominantTone: '#321A10',
  },
  {
    id: 'plate-08',
    plateNumber: 'PLATE 08',
    title: 'Golden Dust Horizon',
    subtitle: 'Rural Americana Youth Monograph',
    category: 'Fine Art Portrait',
    client: 'Jake Olson Fine Art Guild',
    location: 'Open Farmland Ridge',
    year: '2026',
    aspectRatio: '16:9',
    bentoSpan: '2x1',
    imageUrl: '/assets/aistudio/wide_20847189.jpeg',
    curatorNote:
      'Atmospheric backlight bathing two toddlers running down a rural gravel road in warm amber haze, preserving edge glow and dusty road textures.',
    exif: {
      camera: 'Canon 1D X Medium Back',
      lens: '85mm f/1.2L II',
      focalLength: '85mm',
      aperture: 'f/1.8',
      shutterSpeed: '1/1250s',
      iso: 'ISO 100',
      lightingSetup: 'Pure Low-Angle Golden-Hour Sun',
      colorProfile: 'Warm Film Emulation Master',
    },
    dominantTone: '#342215',
  },
  {
    id: 'plate-09',
    plateNumber: 'PLATE 09',
    title: 'Denim & The Cobalt Portal',
    subtitle: 'Urban Industrial Fashion Spread',
    category: 'Editorial & Fashion',
    client: 'The School of Photography Archive',
    location: 'Stage A Exterior Casement',
    year: '2026',
    aspectRatio: '3:4',
    bentoSpan: '1x1',
    imageUrl: '/assets/aistudio/Portrait_photography_shot_of_model_39c143b3.jpg',
    curatorNote:
      'Natural open shade balanced against weathered red brick and patinated cobalt doors, rendering tactile denim weave and natural skin tones.',
    exif: {
      camera: 'Hasselblad X2D 100C',
      lens: 'XCD 55mm f/2.5V',
      focalLength: '55mm',
      aperture: 'f/2.8',
      shutterSpeed: '1/320s',
      iso: 'ISO 64',
      lightingSetup: 'Open Ambient Daylight + Silver Reflector Fill',
      colorProfile: '16-Bit Natural Color Solution',
    },
    dominantTone: '#222D3B',
  },
  {
    id: 'plate-10',
    plateNumber: 'PLATE 10',
    title: 'The Aviator in Autumn Grass',
    subtitle: 'Childhood Dreamscape Monograph',
    category: 'Fine Art Portrait',
    client: 'Iwona Podlasińska Fine Art Series',
    location: 'Amber Prairie Sanctuary',
    year: '2026',
    aspectRatio: '4:3',
    bentoSpan: '1x1',
    imageUrl: '/assets/aistudio/types-of-photography-iwona-podlasinska-child-plane_27f9a1f9.jpg',
    curatorNote:
      'Poetic golden-hour environmental portrait of a young child holding a carved yellow biplane amidst luminous tall prairie grasses.',
    exif: {
      camera: 'Hasselblad H6D-100c',
      lens: 'HC 100mm f/2.2',
      focalLength: '100mm',
      aperture: 'f/2.2',
      shutterSpeed: '1/640s',
      iso: 'ISO 100',
      lightingSetup: 'Backlit Setting Sun + Natural Meadow Bounce',
      colorProfile: '16-Bit Editorial Curve',
    },
    dominantTone: '#2E2417',
  },
  {
    id: 'plate-11',
    plateNumber: 'PLATE 11',
    title: 'Sacred Stone Courtyard Wedding',
    subtitle: 'Courage, Vows & Heritage Architecture',
    category: 'Editorial & Fashion',
    client: 'The Knot & Architectural Weddings',
    location: 'Historic Stone Hacienda',
    year: '2026',
    aspectRatio: '4:3',
    bentoSpan: '2x1',
    imageUrl: '/assets/aistudio/18598c58-9e27-4b3d-b0d4-18883007f7bb_576006df.jpg',
    curatorNote:
      'Emotional and dignified documentary ceremony capture of bride in wheelchair holding groom\'s hand before a rustic stone hearth and cypress avenue.',
    exif: {
      camera: 'Phase One IQ4 150MP',
      lens: 'Schneider Kreuznach 55mm LS',
      focalLength: '55mm',
      aperture: 'f/4.0',
      shutterSpeed: '1/400s',
      iso: 'ISO 100',
      lightingSetup: 'Late Afternoon Sun through Cypress',
      colorProfile: '16-Bit Wedding Master',
    },
    dominantTone: '#2C2522',
  },
  {
    id: 'plate-12',
    plateNumber: 'PLATE 12',
    title: 'Heart-Shaped Sky in Wet Asphalt',
    subtitle: 'Metropolitan Street Perspective',
    category: 'Architecture & Spatial',
    client: 'Urban Monograph Collective',
    location: 'Downtown Financial District',
    year: '2026',
    aspectRatio: '3:4',
    bentoSpan: '1x1',
    imageUrl: '/assets/aistudio/images_46525990.jpg',
    curatorNote:
      'High-angle urban capture isolating a pedestrian stride mirrored inside an organic heart-shaped puddle reflecting deep cerulean clouds.',
    exif: {
      camera: 'Leica SL2 Medium Format Back',
      lens: '38mm f/2.8',
      focalLength: '38mm',
      aperture: 'f/5.6',
      shutterSpeed: '1/500s',
      iso: 'ISO 125',
      lightingSetup: 'Diffused Overcast Skies with High Pavement Contrast',
      colorProfile: 'B&W High-Acitance Profile',
    },
    dominantTone: '#22252A',
  },
  {
    id: 'plate-13',
    plateNumber: 'PLATE 13',
    title: 'Arboreal Sentinel in Emerald Flora',
    subtitle: 'Vivid Herpetological Macro Study',
    category: 'Commercial Still Life',
    client: 'Botanical & Zoological Press',
    location: 'Stage C · Optical Macro Lab',
    year: '2026',
    aspectRatio: '4:3',
    bentoSpan: '1x1',
    imageUrl: '/assets/aistudio/images__1__91a2c125.jpg',
    curatorNote:
      'Pinpoint focus on the scarlet ocular rings and orange pads of a tree frog concealed within vertical sansevieria foliage.',
    exif: {
      camera: 'Hasselblad X2D 100C',
      lens: 'XCD 120mm Macro',
      focalLength: '120mm',
      aperture: 'f/8.0',
      shutterSpeed: '1/250s',
      iso: 'ISO 64',
      lightingSetup: 'Continuous CRI 98 LED Panels with Scrim Flags',
      colorProfile: '16-Bit True Color',
    },
    dominantTone: '#19281C',
  },
  {
    id: 'plate-14',
    plateNumber: 'PLATE 14',
    title: 'Offering of Field Chamomile',
    subtitle: 'Innocence & Micro-Botanical Study',
    category: 'Fine Art Portrait',
    client: 'Sitter Archive Quarterly',
    location: 'Open Meadow Sanctuary',
    year: '2026',
    aspectRatio: '4:3',
    bentoSpan: '1x1',
    imageUrl: '/assets/aistudio/9-Detail-Shot_-an-isolated-element_9a4c7dea.jpg',
    curatorNote:
      'Shallow depth of field drawing immediate focus to the delicate yellow-centered chamomile blooms clutched in small outstretched fingers.',
    exif: {
      camera: 'Hasselblad H6D-100c',
      lens: 'HC 80mm f/2.8',
      focalLength: '80mm',
      aperture: 'f/2.8',
      shutterSpeed: '1/1000s',
      iso: 'ISO 64',
      lightingSetup: 'Soft Afternoon Sunlight',
      colorProfile: '16-Bit HNCS Soft',
    },
    dominantTone: '#2F2A22',
  },
  {
    id: 'plate-15',
    plateNumber: 'PLATE 15',
    title: 'Canopy Reverie in Dappled Light',
    subtitle: 'Editorial Foliage & Natural Portrait',
    category: 'Editorial & Fashion',
    client: 'Harper\'s Bazaar Natural World',
    location: 'Stage A · Sunlit Botanical Set',
    year: '2026',
    aspectRatio: '3:4',
    bentoSpan: '1x1',
    imageUrl: '/assets/aistudio/images__4__a6db3db8.jpg',
    curatorNote:
      'Upward profile portrait framed by weeping willow fronds catching back-illuminated solar flare and rim highlights across profile and hair.',
    exif: {
      camera: 'Hasselblad X2D 100C',
      lens: 'XCD 90mm f/2.5V',
      focalLength: '90mm',
      aperture: 'f/2.5',
      shutterSpeed: '1/800s',
      iso: 'ISO 64',
      lightingSetup: 'Filtered Sunlight through Canopy',
      colorProfile: '16-Bit Fine Grain',
    },
    dominantTone: '#1D241C',
  },
  {
    id: 'plate-16',
    plateNumber: 'PLATE 16',
    title: 'Tender Generations in Orchard Shade',
    subtitle: 'Intimate Family Heritage Monograph',
    category: 'Fine Art Portrait',
    client: 'Private Family Commission',
    location: 'Historic Orchard Pavilion',
    year: '2026',
    aspectRatio: '4:3',
    bentoSpan: '1x1',
    imageUrl: '/assets/aistudio/images__3__c9c21b5b.jpg',
    curatorNote:
      'Soft-focus environmental portrait framed by foreground leaf veils, capturing mother, father, and newborn child in gentle morning shadow.',
    exif: {
      camera: 'Phase One IQ4 150MP',
      lens: 'Schneider Kreuznach 80mm LS',
      focalLength: '80mm',
      aperture: 'f/3.2',
      shutterSpeed: '1/400s',
      iso: 'ISO 100',
      lightingSetup: 'Dappled Orchard Daylight + White Linen Reflector',
      colorProfile: '16-Bit Tonal Balance',
    },
    dominantTone: '#232A20',
  },
  {
    id: 'plate-17',
    plateNumber: 'PLATE 17',
    title: 'The Lens Over Twilight Seas',
    subtitle: 'Behind-The-Scenes Coastal Production',
    category: 'Commercial Still Life',
    client: 'Atelier Vance Production House',
    location: 'Adriatic Coastal Outpost',
    year: '2026',
    aspectRatio: '4:3',
    bentoSpan: '1x1',
    imageUrl:
      '/assets/aistudio/closeup-focus-shot-woman-taking-picture-sea-concept-photography_181624-35137_900a9a3e.jpg',
    curatorNote:
      'Behind-the-scenes master plate of the principal director framing coastal twilight exposures with high-grade optical glass as sea breezes lift hair.',
    exif: {
      camera: 'Hasselblad X2D 100C',
      lens: 'XCD 38mm f/2.5V',
      focalLength: '38mm',
      aperture: 'f/3.5',
      shutterSpeed: '1/320s',
      iso: 'ISO 64',
      lightingSetup: 'Setting Golden Sun over Open Waters',
      colorProfile: '16-Bit Cinema Curve',
    },
    dominantTone: '#22252A',
  },
];

export const INITIAL_STAGES: StudioStage[] = [
  {
    id: 'stage-a',
    code: 'STAGE A',
    name: 'The North Daylight Loft',
    dimensions: '54 ft × 36 ft (1,944 sq ft)',
    ceilingHeight: '16 ft Timber & Cast-Iron',
    daylightRate: 1450,
    fullDayRate: 2400,
    daylightRateInr: 18000,
    fullDayRateInr: 28000,
    orientation: 'Continuous North & West Industrial Casements',
    keySpecs: [
      '18ft floor-to-ceiling steel casement windows with motorized blackout & sheer linen scrims',
      'Honed limestone & bleached wide-plank Scandinavian oak flooring zones',
      '3-phase 200A cam-lock power distribution + silent HVAC for live audio sync',
    ],
    includedGear: [
      '2× Profoto Pro-11 2400Ws Generators + 4× ProHead Plus',
      'Calibrated EIZO ColorEdge CG2700X Rolling Tether Cart',
      'Full Matthews C-Stand, V-Flat & 12×12 Butterfly Scrim Package',
    ],
    idealFor: 'Editorial fashion lookbooks, natural-light portraiture, luxury furniture & lifestyle campaigns.',
    previewImageUrl: '/assets/aistudio/pexels-photo-7462603_cfbc76d1.jpg',
  },
  {
    id: 'stage-b',
    code: 'STAGE B',
    name: 'The 32-Foot Infinity Cyclorama',
    dimensions: '48 ft × 34 ft (1,632 sq ft)',
    ceilingHeight: '22 ft Clear Grid Height',
    daylightRate: 1650,
    fullDayRate: 2800,
    daylightRateInr: 22000,
    fullDayRateInr: 35000,
    orientation: '100% Light-Controlled Acoustic Blackout Box',
    keySpecs: [
      '32 ft × 26 ft × 20 ft heated 2-wall hard infinity cove (freshly painted matte white or custom chromatic)',
      'Motorized overhead truss grid with pre-hung Broncolor & ARRI SkyPanel fixtures',
      'Direct street-level drive-in elephant doors & private VIP talent styling suite',
    ],
    includedGear: [
      '3× Profoto Pro-11 2400Ws Packs + Broncolor Para 177 Reflector',
      'Motorized Overhead Softbox Bank (10ft × 6ft)',
      'Dedicated High-Speed Fiber Workstation + Client Lounge Monitor',
    ],
    idealFor: 'High-fashion commercial campaigns, sculptural silhouettes, automotive/large object plates, motion reels.',
    previewImageUrl: '/assets/aistudio/creative-wedding-photography_00187c97.jpg',
  },
  {
    id: 'stage-c',
    code: 'STAGE C',
    name: 'Optical Macro & Still-Life Suite',
    dimensions: '28 ft × 22 ft (616 sq ft)',
    ceilingHeight: '14 ft Precision Rail Grid',
    daylightRate: 1100,
    fullDayRate: 1850,
    daylightRateInr: 14000,
    fullDayRateInr: 22000,
    orientation: 'Vibration-Isolated Darkroom & Tabletop Sanctuary',
    keySpecs: [
      'Pneumatic anti-vibration optical table for sub-millimeter focus stacking',
      'Curated surface library of 40+ stone slabs (Nero Marquina, Travertine, Basalt, Brushed Aluminum)',
      'Dedolight precision optical projection system & robotic turntable integration',
    ],
    includedGear: [
      'Hasselblad H6D / X2D Macro Rail System & Motorized Focus Stacker',
      'Broncolor Scoro 3200S + Optical Spot & Fiber-Optic Snoot Kit',
      'On-site Wet Prep Bar, Steamers, and Micro-Rigging Armature Kit',
    ],
    idealFor: 'Haute horology, fine jewelry, fragrance vessels, industrial design objects, archival art reproduction.',
    previewImageUrl: '/assets/aistudio/31_a4b61f36.jpg',
  },
];

export const INITIAL_PACKAGES: CommissionPackage[] = [
  {
    id: 'pkg-starter',
    index: '01',
    name: 'STARTER — Essential Portfolio & Lookbook',
    tierBadge: 'STARTER',
    popular: false,
    category: 'Fine Art Portrait',
    startingRate: 1800,
    startingRateInr: 15000,
    inrRangeLabel: '₹10,000 – ₹18,000',
    usdRangeLabel: '$1,200 – $1,800',
    durationLabel: 'Half-Day (5 Hours) Studio Session',
    deliverables: '8 Master Retouched 16-Bit Plates + Web Proof Gallery',
    resolutionSpec: '100MP Medium Format TIFF & Mobile-Ready sRGB',
    turnaroundHours: 48,
    summary:
      'Perfect to launch an editorial lookbook, founder portrait series, or capsule product line fast with medium-format precision.',
    includedServices: [
      '4–5 Core Look / Set Configurations in Stage A or Stage C',
      'Mobile-Friendly Online Client Proofing & Selection Gallery',
      'Direct WhatsApp & Producer Call Concierge Coordination',
      'Location Scouting & Studio Map Logistics Integration',
      '100MP Hasselblad X2D Capture + Basic Color Grading',
    ],
  },
  {
    id: 'pkg-standard',
    index: '02',
    name: 'STANDARD — Commercial Campaign & Brand Suite',
    tierBadge: 'STANDARD',
    popular: true,
    category: 'Commercial Still Life',
    startingRate: 3200,
    startingRateInr: 28000,
    inrRangeLabel: '₹20,000 – ₹35,000',
    usdRangeLabel: '$2,400 – $3,600',
    durationLabel: 'Full 10-Hour Production Day',
    deliverables: '18 High-Resolution Master Plates + Raw Contact Archive',
    resolutionSpec: '100MP–150MP 16-Bit TIFF + Press & Billboard Separations',
    turnaroundHours: 48,
    summary:
      'Best for growing fashion labels, architectural studios, and luxury retail brands requiring complete multi-disciplinary production.',
    includedServices: [
      'Everything in Starter Package + Full 10-Hour Stage Access',
      'Priority Appointment & Multi-Set Stage Booking',
      'Dedicated Creative Direction across Fashion, Still-Life & Spatial Sets',
      'Full EXIF & ICC Profile Metadata Calibration for Print & Web SEO',
      'Google Business & Press Kit High-Resolution Asset Formatting',
      'Live Tethered EIZO ColorEdge Client Review Station',
    ],
  },
  {
    id: 'pkg-premium',
    index: '03',
    name: 'PREMIUM — Bespoke Monograph & Flagship Production',
    tierBadge: 'PREMIUM',
    popular: false,
    category: 'Editorial & Fashion',
    startingRate: 5600,
    startingRateInr: 55000,
    inrRangeLabel: '₹40,000 – ₹70,000',
    usdRangeLabel: '$4,800 – $7,500',
    durationLabel: '2-Day Multi-Stage Lockout + Post-Production',
    deliverables: '36 Archival Master Plates + Behind-The-Scenes Editorial Essay',
    resolutionSpec: '150MP Phase One IQ4 Master Archive + Exhibition Prints',
    turnaroundHours: 24,
    summary:
      'Complete flagship production presence with custom set architecture, focus-stacked macro plates, editorial blog feature, and analytics tracking.',
    includedServices: [
      'Everything in Standard Package + Dual-Stage Lockout (Stage A & B)',
      'Dedicated Editorial Journal / Behind-the-Scenes Campaign Feature',
      'Verified Client Review & Press Crediting Integration',
      'Real-Time Campaign Asset Analytics & Delivery Dashboard',
      'Bespoke Set Design, Custom Lighting Architecture & 24h Express Retouching',
      'Phase One XT IQ4 150MP + Rodenstock Tilt-Shift & Macro Optics',
    ],
  },
];

export const INITIAL_ADDONS: ProductionAddon[] = [
  {
    id: 'addon-phaseone',
    name: 'Phase One IQ4 150MP + Rodenstock Optics Upgrade',
    category: 'Capture',
    rate: 650,
    rateInr: 5500,
    unit: 'per day',
  },
  {
    id: 'addon-digitech',
    name: 'Dedicated On-Set Digital Tech + Dual EIZO Tether Station',
    category: 'Crew',
    rate: 750,
    rateInr: 6500,
    unit: 'per day',
  },
  {
    id: 'addon-archive',
    name: 'Archival Cloud Vault, Raw Hosting & Color Maintenance',
    category: 'Retainer',
    rate: 450,
    rateInr: 5500,
    unit: 'per year (₹3,000 – ₹8,000 / yr)',
  },
  {
    id: 'addon-retainer',
    name: 'Monthly Editorial Content, Press SEO & Campaign Management',
    category: 'Retainer',
    rate: 950,
    rateInr: 10000,
    unit: 'per month (₹5,000 – ₹15,000 / mo)',
  },
];

export const INITIAL_JOURNAL: JournalArticle[] = [
  {
    id: 'jrnl-01',
    slug: 'sculpting-wool-with-single-source-north-daylight',
    issueNumber: 'ISSUE 14',
    title: 'Sculpting Heavy Wool with Single-Source North Daylight',
    subtitle: 'How directional window latitude outperforms synthetic softboxes in haute couture.',
    category: 'Lighting Architecture',
    publishedAt: 'October 14, 2026',
    readTime: '6 min read',
    author: 'Julian Vance',
    authorRole: 'Principal Photographer & Founder',
    coverImageUrl: '/assets/aistudio/pexels-photo-7462603_cfbc76d1.jpg',
    excerpt:
      'When photographing architectural outerwear in Stage A, the 18-foot north-facing steel casements provide collimated shafts of light that wrap fabric grain without flattening micro-contrast.',
    sections: [
      {
        heading: '01. The Inverse-Square Falloff of Tall Casements',
        body: 'Unlike close-proximity studio strobes that suffer rapid inverse-square falloff across a standing figure, northern skylight enters Stage A at an effective infinity distance. By flagging the lower 6 feet of our 18-foot casement windows with black duvetyne, we create a steep 52-degree top-down key light that carves the collarbone and coat lapel while preserving deep obsidian shadow density.',
      },
      {
        heading: '02. Balancing 5600K Daylight with a 20-Degree Honeycomb Rim',
        body: 'To separate dark charcoal wool from a dark plaster cyclorama without introducing artificial haloing, we place a single Profoto Pro-11 head at 14 feet behind the subject, fitted with a 20-degree honeycomb grid and a quarter CTO gel. Fired at 1/4 stop below ambient exposure, it traces only the microscopic surface fibers along the shoulder seam.',
      },
    ],
    technicalTakeaway:
      'Hasselblad H6D-100c · HC 80mm at f/5.6 · ISO 64 · 16-Bit HNCS Linear Profile',
  },
  {
    id: 'jrnl-02',
    slug: 'sub-millimeter-focus-stacking-for-haute-horology',
    issueNumber: 'ISSUE 13',
    title: '42-Frame Focus Stacking for Brushed Titanium Watch Calibres',
    subtitle: 'Eliminating diffraction while maintaining front-to-back tourbillon sharpness.',
    category: 'Optical Engineering',
    publishedAt: 'September 28, 2026',
    readTime: '8 min read',
    author: 'Elena Rostova',
    authorRole: 'Head of Macro & Still-Life Direction',
    coverImageUrl: '/assets/aistudio/31_a4b61f36.jpg',
    excerpt:
      'Stopping a medium-format macro lens down to f/22 introduces severe optical diffraction that softens hand-polished bevels. Here is how Stage C achieves infinite depth of field at f/8.0.',
    sections: [
      {
        heading: '01. The Sweet Spot of the XCD 120mm Macro',
        body: 'On a 100-megapixel medium format sensor with a 3.76-micron pixel pitch, the airy disk diffraction limit begins encroaching past f/9.5. To preserve razor-sharp Côtes de Genève striping and anglage bevels, every frame must be captured at the lens’s optical peak of f/8.0, where depth of field at 1:1 magnification is less than 0.4 millimeters.',
      },
      {
        heading: '02. Pneumatic Isolation & Fiber-Optic Specular Control',
        body: 'Even footsteps on a concrete floor cause 15-micron oscillations during a 42-step motorized rail sequence. Stage C mounts the timepiece on a pneumatic air-floated granite slab while dual fiber-optic snoots place pinpoint specular highlights on the sapphire crystal and balance wheel.',
      },
    ],
    technicalTakeaway:
      'Hasselblad X2D 100C · XCD 120mm Macro at f/8.0 · 42-Step Helicon Raw Pipeline',
  },
  {
    id: 'jrnl-03',
    slug: 'recording-solar-incidence-on-board-formed-concrete',
    issueNumber: 'ISSUE 12',
    title: 'Recording Solar Incidence on Board-Formed Concrete & Travertine',
    subtitle: 'Using technical camera rise and LCC calibration for architectural monographs.',
    category: 'Architectural Monograph',
    publishedAt: 'September 09, 2026',
    readTime: '5 min read',
    author: 'Julian Vance',
    authorRole: 'Principal Photographer & Founder',
    coverImageUrl: '/assets/aistudio/images__2__32f9c414.jpg',
    excerpt:
      'Architecture does not stand still; it is a sundial. Our pre-production sun-path modeling predicts to the minute when golden-hour rays align with interior structural joints.',
    sections: [
      {
        heading: '01. Zero-Distortion Perspective with Rodenstock 23mm Optics',
        body: 'Tilting a conventional camera upward to capture a 24-foot pavilion ceiling causes converging vertical lines that compromise architectural integrity. By keeping the Phase One XT sensor plane strictly plumb with a laser inclinometer and applying 12mm of mechanical vertical lens rise, verticals remain mathematically parallel.',
      },
      {
        heading: '02. Lens Cast Calibration (LCC) for Uniform Shadow Neutrality',
        body: 'Extreme mechanical movements on symmetric wide-angle lenses introduce color shifts toward the frame edges. Every architectural plate at Atelier Vance is paired with an immediate translucent white Acrylic LCC reference frame to neutralize vignetting and color cast in 16-bit raw processing.',
      },
    ],
    technicalTakeaway:
      'Phase One XT IQ4 150MP · Rodenstock HR Digaron-S 23mm · +12mm Mechanical Rise',
  },
];

export const INITIAL_REVIEWS: ClientReview[] = [
  {
    id: 'rev-01',
    clientName: 'Céline Laurent',
    role: 'VP of Creative Direction',
    organization: 'Maison Valen Paris',
    category: 'Editorial & Fashion',
    rating: 5,
    date: 'October 2026',
    projectTitle: 'Autumn/Winter 36-Look Monolith Campaign',
    metricHighlight: 'Cut post-production color grading from 14 days to 48 hours',
    quote:
      'Moving our seasonal campaign to Atelier Vance Stage A transformed our workflow. Their 100MP Hasselblad tether pipeline matched our physical wool and silk swatches with zero metamerism, delivering press-ready spreads in two days.',
  },
  {
    id: 'rev-02',
    clientName: 'Henrik Lindqvist',
    role: 'Head of Brand Heritage',
    organization: 'Aethelgard Horology Geneva',
    category: 'Commercial Still Life',
    rating: 5,
    date: 'September 2026',
    projectTitle: 'Perpetual Calendar Calibre 89 Global Launch',
    metricHighlight: '12 billboard-grade macro plates captured in 1 session',
    quote:
      'Photographing brushed titanium tourbillon bridges usually requires days of composite retouching to fix glare. Stage C’s pneumatic optical table and 42-frame focus stacking delivered 12 flawless plates in a single 10-hour booking.',
  },
  {
    id: 'rev-03',
    clientName: 'Dr. Lukas Meyer',
    role: 'Senior Partner',
    organization: 'Kengo & Partners Architects Zurich',
    category: 'Architecture & Spatial',
    rating: 5,
    date: 'August 2026',
    projectTitle: 'Basel Pavilion & Cultural Foundation Monograph',
    metricHighlight: 'Featured across 3 double-page spreads in Architectural Digest',
    quote:
      'Their Phase One XT 150MP architectural plates with Rodenstock tilt-shift optics preserved every board-formed concrete joint and travertine vein across our pavilion monograph.',
  },
  {
    id: 'rev-04',
    clientName: 'Aarav Mehta',
    role: 'Founder & Creative Director',
    organization: 'House of Zari Mumbai',
    category: 'Editorial & Fashion',
    rating: 5,
    date: 'August 2026',
    projectTitle: 'Bridal Couture & Heritage Textile Archive',
    metricHighlight: '+210% increase in private showroom appointments',
    quote:
      'The way Atelier Vance lit our metallic zardozi embroidery on Stage B’s 32-foot cyclorama gave the garments a three-dimensional sculptural presence we had never achieved before.',
  },
];

export const INITIAL_INQUIRIES: StudioInquiry[] = [
  {
    id: 'inq-01',
    createdAt: '2026-10-21T11:30:00Z',
    name: 'Sora Takahashi',
    email: 's.takahashi@kurokawa-arch.jp',
    phone: '+81 3-5550-1920',
    company: 'Kurokawa Spatial Design Tokyo',
    keywordIntent: 'ARCHITECTURAL MONOGRAPH',
    preferredTier: 'PREMIUM — Bespoke Monograph & Flagship Production',
    message:
      'Looking to commission a 5-day architectural documentation of our new Kyoto timber museum pavilion in late November.',
    status: 'Responded',
  },
];

export const INITIAL_BOOKINGS: BookingRecord[] = [
  {
    id: 'bk-101',
    referenceCode: 'AV-2026-8419',
    createdAt: '2026-10-18T14:20:00Z',
    bookingType: 'Commissioned Production',
    packageOrStageId: 'pkg-premium',
    packageOrStageName: 'PREMIUM — Bespoke Monograph & Flagship Production',
    category: 'Editorial & Fashion',
    date: '2026-10-28',
    timeSlot: 'Full Day (08:00 – 18:00)',
    addons: ['Dedicated On-Set Digital Tech + Dual EIZO Tether Station'],
    estimatedTotal: 61500,
    currency: 'INR',
    clientName: 'Céline Laurent',
    clientEmail: 'c.laurent@maisonvalen.fr',
    clientOrganization: 'Maison Valen Paris',
    projectBrief:
      'Resort 2027 structured outerwear capsule. 14 looks, emphasis on harsh north-window architectural shadows and monochrome silver-gelatin contrast.',
    aspectRatioPreference: '3:4 Vertical Monograph',
    status: 'Confirmed',
  },
  {
    id: 'bk-102',
    referenceCode: 'AV-2026-8452',
    createdAt: '2026-10-20T09:15:00Z',
    bookingType: 'Commissioned Production',
    packageOrStageId: 'pkg-standard',
    packageOrStageName: 'STANDARD — Commercial Campaign & Brand Suite',
    category: 'Commercial Still Life',
    date: '2026-11-03',
    timeSlot: 'Full Day (08:00 – 18:00)',
    addons: ['Phase One IQ4 150MP + Rodenstock Optics Upgrade'],
    estimatedTotal: 33500,
    currency: 'INR',
    clientName: 'Henrik Lindqvist',
    clientEmail: 'hlindqvist@nordichorology.ch',
    clientOrganization: 'Aethelgard Horology Geneva',
    projectBrief:
      'Macro campaign for the Perpetual Calendar Calibre 89 in brushed tantalum. Requires focus-stacked movement plates on raw basalt.',
    aspectRatioPreference: '4:3 Horizontal Campaign',
    status: 'Confirmed',
  },
];

export const DEFAULT_STUDIO_DATABASE: StudioDatabase = {
  portfolio: INITIAL_PORTFOLIO,
  stages: INITIAL_STAGES,
  packages: INITIAL_PACKAGES,
  addons: INITIAL_ADDONS,
  bookings: INITIAL_BOOKINGS,
  journal: INITIAL_JOURNAL,
  reviews: INITIAL_REVIEWS,
  inquiries: INITIAL_INQUIRIES,
};
