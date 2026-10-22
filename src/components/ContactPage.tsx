import React, { useState } from 'react';
import {
  PhoneCall,
  MessageSquare,
  MapPin,
  BarChart3,
  Sliders,
  CheckCircle2,
  Send,
  Globe,
} from 'lucide-react';
import type {
  BookingRecord,
  ClientReview,
  CurrencyCode,
  PortfolioItem,
  StudioInquiry,
} from '../types/studio';

interface ContactPageProps {
  portfolio: PortfolioItem[];
  bookings: BookingRecord[];
  reviews: ClientReview[];
  inquiries: StudioInquiry[];
  currency: CurrencyCode;
  preselectedKeyword: string | null;
  onSubmitInquiry: (inquiry: Partial<StudioInquiry>) => Promise<void>;
  onOpenBackendCms: () => void;
}

const STUDIO_LOCATIONS = [
  {
    city: 'Mumbai · Kala Ghoda Flagship',
    address: '18 Rampart Row, Kala Ghoda Heritage Precinct, Fort, Mumbai 400001',
    hours: 'Mon – Sat · 08:00 – 21:00 IST',
    phone: '+91 22 6849 3020',
    whatsapp: '+91 98201 44890',
    email: 'mumbai@ateliervance.studio',
    coords: '18.9281° N, 72.8324° E',
    stagesAvailable: 'Stage A Daylight Loft · Stage C Macro Lab',
  },
  {
    city: 'New York · SoHo Cast-Iron Complex',
    address: '482 Broome Street, SoHo Historic District, New York, NY 10013',
    hours: 'Mon – Sat · 07:30 – 20:30 EST',
    phone: '+1 (212) 555-0194',
    whatsapp: '+1 (917) 555-0148',
    email: 'ny@ateliervance.studio',
    coords: '40.7223° N, 74.0018° W',
    stagesAvailable: 'Stage A · Stage B 32ft Cyclorama · Stage C',
  },
  {
    city: 'Paris · Le Marais Production Atelier',
    address: '14 Rue de Turenne, 75004 Paris, France',
    hours: 'Mon – Fri · 08:30 – 20:00 CET',
    phone: '+33 1 42 78 90 11',
    whatsapp: '+33 6 12 45 89 30',
    email: 'paris@ateliervance.studio',
    coords: '48.8566° N, 2.3622° E',
    stagesAvailable: 'Daylight Salon & Archival Darkroom Suite',
  },
];

export const ContactPage: React.FC<ContactPageProps> = ({
  portfolio,
  bookings,
  reviews,
  inquiries,
  currency,
  preselectedKeyword,
  onSubmitInquiry,
  onOpenBackendCms,
}) => {
  const [activeView, setActiveView] = useState<'concierge' | 'analytics'>('concierge');
  const [selectedCityIdx, setSelectedCityIdx] = useState(0);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [keywordIntent, setKeywordIntent] = useState(
    preselectedKeyword || "LET'S CREATE SOMETHING ICONIC"
  );
  const [preferredTier, setPreferredTier] = useState(
    'STANDARD — Commercial Campaign & Brand Suite (₹20,000 – ₹35,000)'
  );
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const activeLocation = STUDIO_LOCATIONS[selectedCityIdx] || STUDIO_LOCATIONS[0];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitting(true);
    try {
      await onSubmitInquiry({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        company: company.trim() || 'Private Commission',
        keywordIntent,
        preferredTier,
        message: message.trim(),
      });
      setName('');
      setEmail('');
      setPhone('');
      setCompany('');
      setMessage('');
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  // Analytics calculations
  const totalPipelineUsd = bookings.reduce(
    (sum, b) => sum + (b.currency === 'INR' ? Math.round(b.estimatedTotal / 84) : b.estimatedTotal),
    0
  );
  const totalPipelineInr = bookings.reduce(
    (sum, b) => sum + (b.currency === 'INR' ? b.estimatedTotal : b.estimatedTotal * 84),
    0
  );

  return (
    <section className="py-16 sm:py-20 max-w-7xl mx-auto px-6 space-y-14">
      {/* Page Header + View Switcher (Concierge Contact vs Studio Analytics Dashboard) */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#1F1F23] pb-8">
        <div className="space-y-2">
          <p className="text-xs font-mono-tabular text-[#E5A93C]">
            PAGE 09 · STUDIO CONCIERGE, LOCATIONS & ANALYTICS DASHBOARD
          </p>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#F4F4F0]">
            Initiate Your Commission
          </h1>
          <p className="text-sm text-[#9F9FA9] max-w-2xl">
            Connect directly with our executive producers via WhatsApp, phone, or concierge brief—or inspect real-time studio performance in the Analytics Dashboard.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 self-start">
          <div className="flex items-center gap-1 p-1 bg-[#111114] border border-[#232329] rounded-xl">
            <button
              type="button"
              onClick={() => setActiveView('concierge')}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                activeView === 'concierge'
                  ? 'bg-[#F4F4F0] text-[#070708]'
                  : 'text-[#9F9FA9] hover:text-[#F4F4F0]'
              }`}
            >
              Contact & Locations
            </button>
            <button
              type="button"
              onClick={() => setActiveView('analytics')}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                activeView === 'analytics'
                  ? 'bg-[#F4F4F0] text-[#070708]'
                  : 'text-[#9F9FA9] hover:text-[#F4F4F0]'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Analytics Dashboard</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onOpenBackendCms}
            className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-[#070708] bg-[#E5A93C] hover:bg-[#F2B705] rounded-xl transition-colors cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Open Backend Image CMS</span>
          </button>
        </div>
      </div>

      {activeView === 'concierge' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left 7 Columns: Concierge Inquiry Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#111114] border border-[#232329] space-y-6">
            <div className="flex items-center justify-between border-b border-[#1F1F25] pb-4">
              <div>
                <h2 className="text-xl font-semibold text-[#F4F4F0]">
                  Direct Producer Inquiry Brief
                </h2>
                <p className="text-xs text-[#9F9FA9] mt-0.5">
                  Guaranteed response within 4 business hours with stage availability & estimate
                </p>
              </div>
              <span className="text-xs font-mono-tabular text-[#E5A93C]">
                POST /api/inquiries
              </span>
            </div>

            {submitted && (
              <div className="p-4 rounded-xl bg-[#141814] border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    Your production inquiry has been logged in the studio backend. Our senior producer will reach out shortly.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-emerald-400 hover:underline ml-3 cursor-pointer"
                >
                  New
                </button>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-[#9F9FA9] mb-1.5">
                  Selected Production Keyword / Intent
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    "LET'S CREATE SOMETHING ICONIC",
                    'EDITORIAL CAMPAIGN',
                    'ARCHITECTURAL MONOGRAPH',
                    'HOROLOGY & STILL LIFE',
                    'STAGE RENTAL',
                  ].map((kw) => (
                    <button
                      key={kw}
                      type="button"
                      onClick={() => setKeywordIntent(kw)}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-mono-tabular border transition-colors cursor-pointer ${
                        keywordIntent === kw
                          ? 'bg-[#E5A93C] text-[#070708] border-[#E5A93C] font-semibold'
                          : 'bg-[#09090B] text-[#9F9FA9] border-[#232329] hover:text-[#F4F4F0]'
                      }`}
                    >
                      {kw}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs text-[#9F9FA9] mb-1.5">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Rohan Kapoor"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#09090B] border border-[#27272E] rounded-lg text-[#F4F4F0] focus:outline-none focus:border-[#E5A93C]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#9F9FA9] mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="youremail@brand.com"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#09090B] border border-[#27272E] rounded-lg text-[#F4F4F0] focus:outline-none focus:border-[#E5A93C]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#9F9FA9] mb-1.5">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98201 XXXXX"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#09090B] border border-[#27272E] rounded-lg text-[#F4F4F0] focus:outline-none focus:border-[#E5A93C]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#9F9FA9] mb-1.5">
                    Brand / Company / Studio
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g., Maison Valen / Architectural Practice"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#09090B] border border-[#27272E] rounded-lg text-[#F4F4F0] focus:outline-none focus:border-[#E5A93C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#9F9FA9] mb-1.5">
                  Preferred Package Tier (INR ₹)
                </label>
                <select
                  value={preferredTier}
                  onChange={(e) => setPreferredTier(e.target.value)}
                  className="w-full min-h-[44px] px-3.5 py-2.5 text-sm bg-[#09090B] border border-[#27272E] rounded-lg text-[#F4F4F0]"
                >
                  <option value="STARTER — ₹10,000 – ₹18,000">
                    STARTER — ₹10,000 – ₹18,000
                  </option>
                  <option value="STANDARD (Most Popular) — ₹20,000 – ₹35,000">
                    STANDARD (Most Popular) — ₹20,000 – ₹35,000
                  </option>
                  <option value="PREMIUM — ₹40,000 – ₹70,000">
                    PREMIUM — ₹40,000 – ₹70,000
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-[#9F9FA9] mb-1.5">
                  Project Scope, Timeline & Moodboard Notes *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your upcoming shoot, preferred dates, look count, or studio stage requirements..."
                  className="w-full px-3.5 py-2.5 text-sm bg-[#09090B] border border-[#27272E] rounded-lg text-[#F4F4F0] focus:outline-none focus:border-[#E5A93C]"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 px-6 rounded-xl bg-[#E5A93C] hover:bg-[#F2B705] text-[#070708] text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{submitting ? 'Transmitting Brief...' : 'Send Concierge Brief'}</span>
              </button>
            </form>
          </div>

          {/* Right 5 Columns: Instant WhatsApp / Call Buttons & Interactive Studio Locations */}
          <div className="lg:col-span-5 space-y-6">
            {/* Instant WhatsApp & Call Card */}
            <div className="p-6 rounded-2xl bg-[#111114] border border-[#232329] space-y-4">
              <p className="text-xs font-mono-tabular text-[#E5A93C]">
                INSTANT PRODUCER HOTLINE
              </p>
              <h3 className="text-lg font-semibold text-[#F4F4F0]">
                Direct WhatsApp & Studio Call Desk
              </h3>
              <p className="text-xs text-[#9F9FA9] leading-relaxed">
                Need immediate same-day stage availability or equipment hold confirmation? Reach our floor producer directly.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <a
                  href={`https://wa.me/919820144890?text=${encodeURIComponent(
                    `Hello Atelier Vance, I would like to inquire about: ${keywordIntent}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#070708] text-xs font-semibold transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Concierge</span>
                </a>

                <a
                  href={`tel:${activeLocation.phone.replace(/\s+/g, '')}`}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#18181F] hover:bg-[#22222B] border border-[#2D2D38] text-[#F4F4F0] text-xs font-medium transition-colors"
                >
                  <PhoneCall className="w-4 h-4 text-[#E5A93C]" />
                  <span>Call {activeLocation.phone}</span>
                </a>
              </div>
            </div>

            {/* Interactive Global Studio Locations & Map Coordinates */}
            <div className="p-6 rounded-2xl bg-[#111114] border border-[#232329] space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-tabular text-[#E5A93C]">
                  STUDIO LOCATIONS & MAPS
                </span>
                <Globe className="w-4 h-4 text-[#9F9FA9]" />
              </div>

              <div className="flex flex-wrap gap-1.5">
                {STUDIO_LOCATIONS.map((loc, idx) => (
                  <button
                    key={loc.city}
                    type="button"
                    onClick={() => setSelectedCityIdx(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      selectedCityIdx === idx
                        ? 'bg-[#F4F4F0] text-[#070708]'
                        : 'bg-[#09090B] text-[#9F9FA9] hover:text-[#F4F4F0]'
                    }`}
                  >
                    {loc.city.split('·')[0].trim()}
                  </button>
                ))}
              </div>

              <div className="p-5 rounded-xl bg-[#09090B] border border-[#1F1F25] space-y-3 text-xs">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-semibold text-[#F4F4F0]">
                    {activeLocation.city}
                  </h4>
                  <span className="font-mono-tabular text-[11px] text-[#E5A93C]">
                    {activeLocation.coords}
                  </span>
                </div>

                <p className="text-[#D4D4D8] flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#E5A93C] shrink-0 mt-0.5" />
                  <span>{activeLocation.address}</span>
                </p>

                <div className="border-t border-[#1F1F25] pt-3 space-y-1 text-[#9F9FA9] font-mono-tabular">
                  <p>Hours: {activeLocation.hours}</p>
                  <p>Stages: {activeLocation.stagesAvailable}</p>
                  <p>Direct Email: {activeLocation.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Studio Analytics Dashboard View */
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#111114] border border-[#1F1F25]">
              <span className="text-xs text-[#9F9FA9] block">Active Backend Portfolio Plates</span>
              <span className="text-3xl font-semibold font-mono-tabular text-[#F4F4F0] mt-2 block">
                {portfolio.length} Plates
              </span>
              <span className="text-xs text-[#E5A93C] font-mono-tabular mt-1 block">
                100% 16-Bit Calibrated
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-[#111114] border border-[#1F1F25]">
              <span className="text-xs text-[#9F9FA9] block">Confirmed Production Bookings</span>
              <span className="text-3xl font-semibold font-mono-tabular text-[#F4F4F0] mt-2 block">
                {bookings.length} Holds
              </span>
              <span className="text-xs text-[#E5A93C] font-mono-tabular mt-1 block">
                Stage A, B & C Active
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-[#111114] border border-[#1F1F25]">
              <span className="text-xs text-[#9F9FA9] block">Total Booked Pipeline (INR)</span>
              <span className="text-3xl font-semibold font-mono-tabular text-[#E5A93C] mt-2 block">
                ₹{totalPipelineInr.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-[#9F9FA9] font-mono-tabular mt-1 block">
                50% Advance Collected
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-[#111114] border border-[#1F1F25]">
              <span className="text-xs text-[#9F9FA9] block">Client Reviews & Inquiries</span>
              <span className="text-3xl font-semibold font-mono-tabular text-[#F4F4F0] mt-2 block">
                {reviews.length} Reviews · {inquiries.length} Briefs
              </span>
              <span className="text-xs text-[#E5A93C] font-mono-tabular mt-1 block">
                4.98 / 5.0 Avg Rating
              </span>
            </div>
          </div>

          {/* Recent Inquiries & Bookings Table */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#111114] border border-[#1F1F25] space-y-4">
              <h3 className="text-base font-semibold text-[#F4F4F0]">
                Recent Concierge Inquiries ({inquiries.length})
              </h3>
              <div className="space-y-3">
                {inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="p-4 rounded-xl bg-[#09090B] border border-[#1F1F23] text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between font-mono-tabular text-[#E5A93C]">
                      <span>{inq.keywordIntent}</span>
                      <span>{inq.status}</span>
                    </div>
                    <p className="font-semibold text-[#F4F4F0]">
                      {inq.name} · {inq.company} ({inq.email})
                    </p>
                    <p className="text-[#9F9FA9]">{inq.message}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#111114] border border-[#1F1F25] space-y-4">
              <h3 className="text-base font-semibold text-[#F4F4F0]">
                Portfolio Discipline Distribution
              </h3>
              <div className="space-y-3">
                {(
                  [
                    'Editorial & Fashion',
                    'Architecture & Spatial',
                    'Commercial Still Life',
                    'Fine Art Portrait',
                  ] as const
                ).map((cat) => {
                  const count = portfolio.filter((p) => p.category === cat).length;
                  const pct = portfolio.length
                    ? Math.round((count / portfolio.length) * 100)
                    : 0;
                  return (
                    <div key={cat} className="space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[#D4D4D8]">{cat}</span>
                        <span className="font-mono-tabular text-[#9F9FA9]">
                          {count} plates ({pct}%)
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#09090B] overflow-hidden border border-[#1F1F25]">
                        <div
                          className="h-full bg-[#E5A93C]"
                          style={{ width: `${Math.max(pct, 8)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
