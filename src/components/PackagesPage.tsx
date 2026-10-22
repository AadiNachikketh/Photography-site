import React from 'react';
import { Check, ArrowUpRight, Sparkles, ShieldCheck, PhoneCall } from 'lucide-react';
import type {
  CommissionPackage,
  PortfolioCategory,
  ProductionAddon,
  StudioPageRoute,
} from '../types/studio';

interface PackagesPageProps {
  packages: CommissionPackage[];
  addons: ProductionAddon[];
  onSelectPackageForBooking: (pkg: CommissionPackage) => void;
  onNavigate: (
    page: StudioPageRoute,
    options?: { category?: PortfolioCategory; keyword?: string }
  ) => void;
}

export const PackagesPage: React.FC<PackagesPageProps> = ({
  packages,
  onSelectPackageForBooking,
  onNavigate,
}) => {
  return (
    <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 space-y-14">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#1F1F23] pb-8">
        <div className="space-y-2">
          <p className="text-xs font-mono-tabular text-[#E5A93C]">
            PAGE 04 · TRANSPARENT PRODUCTION & STUDIO PACKAGES (INR ₹)
          </p>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#F4F4F0]">
            Studio & Production Packages
          </h1>
          <p className="text-sm text-[#9F9FA9] max-w-2xl">
            Structured tiers for fast lookbook launches, full commercial brand campaigns, and multi-day flagship monographs. All rates in Indian Rupees (₹).
          </p>
        </div>

        <div className="text-xs font-mono-tabular text-[#9F9FA9] self-start lg:self-end">
          Payment Terms: <span className="text-[#F4F4F0]">50% advance to start · 50% on delivery</span>
        </div>
      </div>

      {/* 3-Column Tier Cards: Tablet 2-Column + Desktop 3-Column */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
        {packages.map((pkg) => {
          const isPopular = Boolean(pkg.popular);
          const priceRange = pkg.inrRangeLabel;
          const bookingBase = `₹${pkg.startingRateInr.toLocaleString('en-IN')}`;

          return (
            <div
              key={pkg.id}
              className={`relative rounded-2xl flex flex-col justify-between overflow-hidden transition-colors ${
                isPopular
                  ? 'bg-[#121318] border-2 border-[#E5A93C] md:col-span-2 lg:col-span-1'
                  : 'bg-[#111114] border border-[#232329]'
              }`}
            >
              {/* Top Tier Header Band */}
              <div>
                <div
                  className={`px-6 sm:px-7 py-5 border-b flex items-center justify-between ${
                    isPopular
                      ? 'bg-[#E5A93C]/15 border-[#E5A93C]/40'
                      : 'bg-[#0B0B0E] border-[#1F1F25]'
                  }`}
                >
                  <div>
                    <span className="text-xs font-mono-tabular tracking-wider font-semibold text-[#F4F4F0]">
                      {pkg.tierBadge || pkg.name.split('—')[0]}
                    </span>
                    <p className="text-xs text-[#9F9FA9] mt-0.5">{pkg.durationLabel}</p>
                  </div>

                  {isPopular && (
                    <span className="text-xs font-mono-tabular font-semibold text-[#E5A93C] flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>MOST POPULAR</span>
                    </span>
                  )}
                </div>

                {/* Price Range & Deliverable Summary */}
                <div className="p-6 sm:p-7 space-y-6">
                  <div className="border-b border-[#1F1F25] pb-6">
                    <p className="text-2xl sm:text-4xl font-semibold font-mono-tabular text-[#F4F4F0]">
                      {priceRange}
                    </p>
                    <p className="text-xs text-[#9F9FA9] mt-2 leading-relaxed">
                      {pkg.summary}
                    </p>
                    <p className="text-xs font-mono-tabular text-[#E5A93C] mt-3">
                      Standard Booking Base: {bookingBase} · {pkg.turnaroundHours}h Delivery
                    </p>
                  </div>

                  {/* Checklist of Included Services */}
                  <div className="space-y-3">
                    <p className="text-xs font-semibold text-[#F4F4F0]">
                      Included Production & Digital Features:
                    </p>
                    <ul className="space-y-3 text-xs text-[#D4D4D8]">
                      {pkg.includedServices.map((srv, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-[#E5A93C] shrink-0 mt-0.5" />
                          <span className={idx === 0 && isPopular ? 'font-semibold text-[#F4F4F0]' : ''}>
                            {srv}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Card Footer CTA */}
              <div className="p-6 sm:p-7 pt-0 space-y-3">
                <div className="p-3.5 rounded-xl bg-[#09090B] border border-[#1F1F23] text-[11px] font-mono-tabular text-[#9F9FA9]">
                  Deliverables: <span className="text-[#F4F4F0]">{pkg.deliverables}</span>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectPackageForBooking(pkg)}
                  className={`w-full min-h-[48px] py-3.5 px-5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer ${
                    isPopular
                      ? 'bg-[#E5A93C] hover:bg-[#F2B705] text-[#070708]'
                      : 'bg-[#1B1B22] hover:bg-[#E5A93C] text-[#F4F4F0] hover:text-[#070708] border border-[#2C2C36]'
                  }`}
                >
                  <span>Select {pkg.tierBadge || 'Package'} & Book</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Optional Add-Ons Banner (Strictly INR ₹) */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#111116] border border-[#27272E] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#E5A93C]">
            <span>OPTIONAL ADD-ONS & ANNUAL RETAINERS</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#F4F4F0]">
            Archival Cloud Hosting, Optical Upgrades & Monthly Campaign Management
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#09090B] border border-[#1F1F25]">
              <p className="text-xs font-semibold text-[#F4F4F0]">
                Hosting, Domain & Gallery Maintenance
              </p>
              <p className="text-sm font-mono-tabular text-[#E5A93C] mt-1">
                ₹3,000 – ₹8,000 / year
              </p>
              <p className="text-xs text-[#9F9FA9] mt-1">
                Keeps your site and high-resolution client proof galleries fast, secure, and ranking higher on Google.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#09090B] border border-[#1F1F25]">
              <p className="text-xs font-semibold text-[#F4F4F0]">
                Monthly SEO & Google Business Management
              </p>
              <p className="text-sm font-mono-tabular text-[#E5A93C] mt-1">
                ₹5,000 – ₹15,000 / month
              </p>
              <p className="text-xs text-[#9F9FA9] mt-1">
                Continuous seasonal portfolio drops, press kit updates, and local search visibility.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 p-6 rounded-xl bg-[#09090B] border border-[#1F1F25] space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#F4F4F0]">
            <ShieldCheck className="w-4 h-4 text-[#E5A93C]" />
            <span>Payment & Booking Terms</span>
          </div>
          <p className="text-xs text-[#D4D4D8] font-mono-tabular">
            50% advance to start · 50% on delivery
          </p>
          <p className="text-xs text-[#9F9FA9] leading-relaxed">
            Prices are indicative and may vary based on requirements, look count, and number of production days.
          </p>
          <button
            type="button"
            onClick={() =>
              onNavigate('contact', { keyword: 'CUSTOM PACKAGE QUOTE' })
            }
            className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-[#18181F] hover:bg-[#24242E] border border-[#2C2C38] text-xs font-medium text-[#F4F4F0] flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#E5A93C]" />
            <span>Request Custom Estimate (₹)</span>
          </button>
        </div>
      </div>
    </section>
  );
};
