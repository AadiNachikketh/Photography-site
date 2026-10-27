import React from 'react';
import { ArrowUpRight, Camera, Layers, Cpu, ShieldCheck } from 'lucide-react';
import type { PortfolioCategory, StudioPageRoute } from '../types/studio';
import { ResilientPlateImage } from './ResilientPlateImage';

interface ServicesPageProps {
  onNavigate: (
    page: StudioPageRoute,
    options?: { category?: PortfolioCategory; keyword?: string }
  ) => void;
}

const DISCIPLINES: {
  index: string;
  title: string;
  category: PortfolioCategory;
  subtitle: string;
  imageUrl: string;
  description: string;
  specs: string[];
  deliverableStandard: string;
}[] = [
  {
    index: '01',
    title: 'Haute Couture & Editorial Lookbooks',
    category: 'Editorial & Fashion',
    subtitle: 'Sculptural lighting for fashion houses, designer archives, and global print campaigns.',
    imageUrl: '/assets/aistudio/images__5__cd21517d.jpg',
    description:
      'We combine 18-foot north-facing industrial casement daylight with high-speed Profoto Pro-11 strobe shaping to render fabric drape, metallic embroidery, and silhouette geometry without artificial flatness.',
    specs: [
      'Hasselblad H6D-100c & X2D 100C 16-Bit HNCS Color Pipeline',
      'Live EIZO CG2700X hardware-calibrated tether village for Art Directors',
      'On-set garment preparation suite, private VIP styling rooms & high-speed sync',
    ],
    deliverableStandard: '100MP Master TIFF + Press CMYK Separations + Social 9:16 Reels',
  },
  {
    index: '02',
    title: 'Architectural & Spatial Monographs',
    category: 'Architecture & Spatial',
    subtitle: 'Zero-distortion technical camera documentation for architects, museums, and pavilions.',
    imageUrl: '/assets/aistudio/low-angle-greyscale-building-with-modern-brutalist-architecture-sunlight_181624-21352_999d8e52.jpg',
    description:
      'Using Phase One XT 150MP field cameras paired with Rodenstock tilt-shift optics, we record buildings across full dawn-to-dusk solar trajectories while maintaining mathematically parallel verticals.',
    specs: [
      'Phase One XT IQ4 150MP + Rodenstock 23mm & 32mm HR Digaron Optics',
      'Pre-shoot sun-path azimuth modeling & Lens Cast Calibration (LCC)',
      'Multi-exposure 16-stop dynamic range blending for interior/exterior equilibrium',
    ],
    deliverableStandard: '150MP Perspective-Corrected Plates + Monograph Sequence Layout',
  },
  {
    index: '03',
    title: 'Haute Horology, Jewelry & Macro Still-Life',
    category: 'Commercial Still Life',
    subtitle: 'Sub-millimeter focus-stacked plates on pneumatic anti-vibration optical tables.',
    imageUrl: '/assets/aistudio/6571dc95832885.5ea088774b854_d8027c19.jpg',
    description:
      'Engineered in Stage C for timepieces, fragrance flacons, and industrial design objects. Automated 40-to-60 frame focus stacking eliminates optical diffraction while fiber-optic snoots carve tourbillon bridges.',
    specs: [
      'Motorized sub-micron focus-stacking rail + pneumatic vibration isolation',
      '40+ natural stone, basalt, travertine & optical glass plinth surfaces',
      'Dedolight projection imagers & Broncolor Para 88 specular shaping',
    ],
    deliverableStandard: '100MP–400MP Focus-Stacked Master Plates with Precision Alpha Masks',
  },
  {
    index: '04',
    title: 'Fine Art & Executive Sitters Archive',
    category: 'Fine Art Portrait',
    subtitle: 'Closed-set monochromatic and 16-bit color sittings for cultural & executive leaders.',
    imageUrl: '/assets/aistudio/GettyImages-544268210_f4e8d19d.jpg',
    description:
      'Intimate, unrushed portrait sittings utilizing true achromatic medium-format sensors and feathered octabanks. Designed for authors, conductors, founders, and museum publications.',
    specs: [
      'Phase One IQ4 150MP True Achromatic (B&W) & Hasselblad 16-Bit Color',
      '100% Acoustic & Visual Privacy in Stage A or Stage B Black Box',
      'Hand-graded retouching preserving authentic skin grain and tonal depth',
    ],
    deliverableStandard: 'Archival Exhibition Prints + 24-Hour Express Press Kit Delivery',
  },
];

const WORKFLOW_STEPS = [
  {
    step: 'PHASE 01',
    title: 'Creative Pre-Lighting & Sun-Path Scouting',
    detail:
      'Before call time, our lighting directors build a 3D photometric diagram of your set or model the exact solar incidence window for Stage A daylight shoots.',
  },
  {
    step: 'PHASE 02',
    title: 'Tethered 16-Bit Medium Format Capture',
    detail:
      'Every frame streams instantaneously via fiber-optic tether to dual 27-inch EIZO ColorEdge monitors with custom ICC look-up tables.',
  },
  {
    step: 'PHASE 03',
    title: 'Focus-Stacking & LCC Sensor Calibration',
    detail:
      'Macro and architectural plates undergo sub-pixel optical alignment and Lens Cast Calibration to guarantee edge-to-edge chromatic neutrality.',
  },
  {
    step: 'PHASE 04',
    title: 'Non-Destructive Frequency Retouching & Delivery',
    detail:
      'Within 24 to 48 hours, master 16-bit TIFFs, press-ready CMYK separations, and web-optimized proof galleries are delivered via encrypted cloud vault.',
  },
];

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  return (
    <section className="py-16 sm:py-20 max-w-7xl mx-auto px-6 space-y-20">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#1F1F23] pb-8">
        <div className="space-y-2">
          <p className="text-xs font-mono-tabular text-[#E5A93C]">
            PAGE 03 · PRODUCTION DISCIPLINES & OPTICAL PIPELINE
          </p>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#F4F4F0]">
             Specialized Studio Services
          </h1>
          <p className="text-sm text-[#9F9FA9] max-w-2xl">
            End-to-end creative direction, medium-format capture, and archival retouching tailored to four distinct visual disciplines.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('packages')}
            className="px-4 py-2.5 text-xs font-medium text-[#F4F4F0] bg-[#141418] hover:bg-[#1C1C22] border border-[#27272E] rounded-xl transition-colors cursor-pointer"
          >
            View Pricing Packages
          </button>
          <button
            type="button"
            onClick={() => onNavigate('booking')}
            className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-[#070708] bg-[#E5A93C] hover:bg-[#F2B705] rounded-xl transition-colors cursor-pointer"
          >
            <span>Book a Service</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 4 Core Disciplines Matrix */}
      <div className="space-y-12">
        {DISCIPLINES.map((disc, idx) => (
          <div
            key={disc.index}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch p-6 sm:p-8 rounded-2xl bg-[#111114] border border-[#1F1F25]"
          >
            <div
              className={`lg:col-span-5 ${
                idx % 2 === 1 ? 'lg:order-2' : ''
              } relative min-h-[280px] rounded-xl overflow-hidden border border-[#27272E]`}
            >
              <ResilientPlateImage
                src={disc.imageUrl}
                alt={disc.title}
                plateNumber={`SERVICE ${disc.index}`}
                category={disc.category}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            <div
              className={`lg:col-span-7 ${
                idx % 2 === 1 ? 'lg:order-1' : ''
              } flex flex-col justify-between space-y-6`}
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#E5A93C]">
                  <span>{disc.index}.</span>
                  <span>·</span>
                  <span>{disc.category}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-semibold text-[#F4F4F0]">
                  {disc.title}
                </h2>

                <p className="font-editorial italic text-lg text-[#D4D4D8]">
                  {disc.subtitle}
                </p>

                <p className="text-sm text-[#9F9FA9] leading-relaxed pt-2">
                  {disc.description}
                </p>

                <ul className="space-y-2 pt-3 text-xs text-[#D4D4D8]">
                  {disc.specs.map((sp, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#E5A93C] font-mono-tabular">·</span>
                      <span>{sp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[#1F1F25] flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs font-mono-tabular text-[#9F9FA9]">
                  Deliverable Standard: <span className="text-[#F4F4F0]">{disc.deliverableStandard}</span>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onNavigate('booking', {
                      category: disc.category,
                      keyword: disc.title.toUpperCase(),
                    })
                  }
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#070708] bg-[#E5A93C] hover:bg-[#F2B705] rounded-lg transition-colors cursor-pointer"
                >
                  <span>Commission {disc.category}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4-Phase Production Pipeline */}
      <div className="border-t border-[#1F1F23] pt-16 space-y-8">
        <div>
          <p className="text-xs font-mono-tabular text-[#E5A93C] mb-1">
            END-TO-END ARCHIVAL WORKFLOW
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#F4F4F0]">
            From Pre-Lighting Photometrics to 16-Bit Master Plates
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WORKFLOW_STEPS.map((wf) => (
            <div
              key={wf.step}
              className="p-6 rounded-2xl bg-[#111114] border border-[#1F1F25] flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <span className="text-xs font-mono-tabular text-[#E5A93C]">
                  {wf.step}
                </span>
                <h3 className="text-base font-semibold text-[#F4F4F0]">
                  {wf.title}
                </h3>
                <p className="text-xs text-[#9F9FA9] leading-relaxed">
                  {wf.detail}
                </p>
              </div>
              <div className="pt-3 border-t border-[#1F1F25] text-[11px] font-mono-tabular text-[#9F9FA9]">
                ISO 12647 Certified Stage
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Camera Vault Summary */}
      <div className="p-8 rounded-2xl bg-[#111115] border border-[#27272E] grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-start gap-3.5">
          <Camera className="w-5 h-5 text-[#E5A93C] shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-[#F4F4F0]">
              Medium Format Camera Vault
            </h3>
            <p className="text-xs text-[#9F9FA9] mt-1 leading-relaxed">
              Hasselblad H6D-100c, Hasselblad X2D 100C, Phase One XT IQ4 150MP, and Phase One IQ4 150MP Achromatic bodies maintained in-house.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3.5">
          <Layers className="w-5 h-5 text-[#E5A93C] shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-[#F4F4F0]">
              Rodenstock & HC Prime Optics
            </h3>
            <p className="text-xs text-[#9F9FA9] mt-1 leading-relaxed">
              Full set of Rodenstock HR Digaron-S tilt-shift lenses (23mm–90mm) and Hasselblad HC/XCD central-shutter primes syncing up to 1/4000s.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3.5">
          <Cpu className="w-5 h-5 text-[#E5A93C] shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-[#F4F4F0]">
              Encrypted Client Proofing & SEO
            </h3>
            <p className="text-xs text-[#9F9FA9] mt-1 leading-relaxed">
              Every delivered plate embeds structured IPTC/EXIF rights metadata, calibrated ICC profiles, and simultaneous web/print derivatives.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
