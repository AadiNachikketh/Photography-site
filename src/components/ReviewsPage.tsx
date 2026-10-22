import React, { useState } from 'react';
import { Star, Plus, CheckCircle2, ArrowUpRight } from 'lucide-react';
import type { ClientReview, PortfolioCategory, StudioPageRoute } from '../types/studio';

interface ReviewsPageProps {
  reviews: ClientReview[];
  onAddReview: (review: Partial<ClientReview>) => Promise<void>;
  onNavigate: (page: StudioPageRoute, options?: { category?: PortfolioCategory }) => void;
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({
  reviews,
  onAddReview,
  onNavigate,
}) => {
  const [filterCat, setFilterCat] = useState<'ALL' | PortfolioCategory>('ALL');
  const [showForm, setShowForm] = useState(false);

  const [clientName, setClientName] = useState('');
  const [role, setRole] = useState('');
  const [organization, setOrganization] = useState('');
  const [category, setCategory] = useState<PortfolioCategory>('Editorial & Fashion');
  const [projectTitle, setProjectTitle] = useState('');
  const [metricHighlight, setMetricHighlight] = useState('');
  const [quote, setQuote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const filteredReviews =
    filterCat === 'ALL' ? reviews : reviews.filter((r) => r.category === filterCat);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !quote.trim()) return;
    setSubmitting(true);
    try {
      await onAddReview({
        clientName: clientName.trim(),
        role: role.trim() || 'Creative Director',
        organization: organization.trim() || 'Brand Partner',
        category,
        rating: 5,
        projectTitle: projectTitle.trim() || 'Commissioned Production',
        metricHighlight:
          metricHighlight.trim() || '48-hour 16-bit master plate delivery on schedule',
        quote: quote.trim(),
      });
      setClientName('');
      setRole('');
      setOrganization('');
      setProjectTitle('');
      setMetricHighlight('');
      setQuote('');
      setShowForm(false);
      setSubmittedSuccess(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-16 sm:py-20 max-w-7xl mx-auto px-6 space-y-14">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#1F1F23] pb-8">
        <div className="space-y-2">
          <p className="text-xs font-mono-tabular text-[#E5A93C]">
            PAGE 07 · VERIFIED CLIENT REVIEWS & PRODUCTION OUTCOMES
          </p>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#F4F4F0]">
            Client Endorsements & Proof
          </h1>
          <p className="text-sm text-[#9F9FA9] max-w-2xl">
            Attributable reviews from fashion houses, horology maisons, and architectural practices across 310+ global productions.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start">
          <button
            type="button"
            onClick={() => setShowForm((prev) => !prev)}
            className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium text-[#F4F4F0] bg-[#141418] hover:bg-[#1C1C22] border border-[#27272E] rounded-xl transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[#E5A93C]" />
            <span>{showForm ? 'Close Review Form' : 'Submit Client Review'}</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('booking')}
            className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-[#070708] bg-[#E5A93C] hover:bg-[#F2B705] rounded-xl transition-colors cursor-pointer"
          >
            <span>Book Your Production</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Quantitative Proof Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-6 rounded-2xl bg-[#111114] border border-[#1F1F25]">
        <div>
          <span className="text-2xl sm:text-3xl font-semibold font-mono-tabular text-[#E5A93C]">
            4.98 / 5.0
          </span>
          <span className="text-xs text-[#9F9FA9] block mt-1">
            Verified Producer Satisfaction
          </span>
        </div>
        <div>
          <span className="text-2xl sm:text-3xl font-semibold font-mono-tabular text-[#F4F4F0]">
            99.4%
          </span>
          <span className="text-xs text-[#9F9FA9] block mt-1">
            On-Time Master File Delivery
          </span>
        </div>
        <div>
          <span className="text-2xl sm:text-3xl font-semibold font-mono-tabular text-[#F4F4F0]">
            48 Hours
          </span>
          <span className="text-xs text-[#9F9FA9] block mt-1">
            Average Color-Graded Turnaround
          </span>
        </div>
        <div>
          <span className="text-2xl sm:text-3xl font-semibold font-mono-tabular text-[#F4F4F0]">
            94%
          </span>
          <span className="text-xs text-[#9F9FA9] block mt-1">
            Repeat Seasonal Brand Commissions
          </span>
        </div>
      </div>

      {submittedSuccess && (
        <div className="p-4 rounded-xl bg-[#141814] border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Your verified client review has been published to the studio ledger.</span>
          </div>
          <button
            type="button"
            onClick={() => setSubmittedSuccess(false)}
            className="text-emerald-400 hover:underline cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Add New Review Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="p-6 sm:p-8 rounded-2xl bg-[#111115] border border-[#27272E] space-y-5"
        >
          <div className="flex items-center justify-between border-b border-[#1F1F23] pb-3">
            <h2 className="text-base font-semibold text-[#F4F4F0]">
              Submit a Verified Production Review
            </h2>
            <span className="text-xs font-mono-tabular text-[#9F9FA9]">
              POST /api/reviews
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-[#9F9FA9] mb-1.5">Full Name *</label>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g., Vikramaditya Rao"
                className="w-full px-3.5 py-2 text-sm bg-[#09090B] border border-[#27272E] rounded-lg text-[#F4F4F0]"
              />
            </div>
            <div>
              <label className="block text-xs text-[#9F9FA9] mb-1.5">Role / Title</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g., Creative Director"
                className="w-full px-3.5 py-2 text-sm bg-[#09090B] border border-[#27272E] rounded-lg text-[#F4F4F0]"
              />
            </div>
            <div>
              <label className="block text-xs text-[#9F9FA9] mb-1.5">Brand / Agency</label>
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="e.g., Studio Lotus / Vogue"
                className="w-full px-3.5 py-2 text-sm bg-[#09090B] border border-[#27272E] rounded-lg text-[#F4F4F0]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-[#9F9FA9] mb-1.5">Discipline</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as PortfolioCategory)}
                className="w-full px-3.5 py-2 text-sm bg-[#09090B] border border-[#27272E] rounded-lg text-[#F4F4F0]"
              >
                <option value="Editorial & Fashion">Editorial & Fashion</option>
                <option value="Architecture & Spatial">Architecture & Spatial</option>
                <option value="Commercial Still Life">Commercial Still Life</option>
                <option value="Fine Art Portrait">Fine Art Portrait</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-[#9F9FA9] mb-1.5">Campaign / Project Name</label>
              <input
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                placeholder="e.g., Resort 2027 Lookbook"
                className="w-full px-3.5 py-2 text-sm bg-[#09090B] border border-[#27272E] rounded-lg text-[#F4F4F0]"
              />
            </div>
            <div>
              <label className="block text-xs text-[#9F9FA9] mb-1.5">Measurable Outcome</label>
              <input
                type="text"
                value={metricHighlight}
                onChange={(e) => setMetricHighlight(e.target.value)}
                placeholder="e.g., Delivered 24 plates in 48 hours"
                className="w-full px-3.5 py-2 text-sm bg-[#09090B] border border-[#27272E] rounded-lg text-[#F4F4F0]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-[#9F9FA9] mb-1.5">Review Statement *</label>
            <textarea
              rows={3}
              required
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              placeholder="Share your experience with the studio stages, tether pipeline, and final plates..."
              className="w-full px-3.5 py-2 text-sm bg-[#09090B] border border-[#27272E] rounded-lg text-[#F4F4F0]"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 text-xs font-semibold text-[#070708] bg-[#E5A93C] hover:bg-[#F2B705] rounded-lg cursor-pointer"
            >
              {submitting ? 'Publishing Review...' : 'Publish Verified Review'}
            </button>
          </div>
        </form>
      )}

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-1 p-1 bg-[#111114] border border-[#232329] rounded-xl self-start w-fit">
        {(['ALL', 'Editorial & Fashion', 'Architecture & Spatial', 'Commercial Still Life', 'Fine Art Portrait'] as const).map(
          (cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilterCat(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                filterCat === cat
                  ? 'bg-[#F4F4F0] text-[#070708]'
                  : 'text-[#9F9FA9] hover:text-[#F4F4F0]'
              }`}
            >
              {cat === 'ALL' ? 'All Disciplines' : cat}
            </button>
          )
        )}
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredReviews.map((rev) => (
          <blockquote
            key={rev.id}
            className="p-7 rounded-2xl bg-[#111114] border border-[#1F1F25] flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono-tabular text-[#9F9FA9]">
                <div className="flex items-center gap-1 text-[#E5A93C]">
                  {Array.from({ length: rev.rating }).map((_, idx) => (
                    <Star key={idx} className="w-3.5 h-3.5 fill-[#E5A93C]" />
                  ))}
                  <span className="ml-1.5 text-[#F4F4F0]">5.0</span>
                </div>
                <span>
                  {rev.category} · {rev.date}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#0B0B0E] border border-[#1F1F23] text-xs font-mono-tabular text-[#E5A93C]">
                Outcome: {rev.metricHighlight}
              </div>

              <p className="text-sm sm:text-base text-[#D4D4D8] leading-relaxed">
                “{rev.quote}”
              </p>
            </div>

            <footer className="pt-4 border-t border-[#1F1F25] flex items-center justify-between gap-4 text-xs">
              <div>
                <p className="font-semibold text-[#F4F4F0]">{rev.clientName}</p>
                <p className="text-[#9F9FA9] mt-0.5">
                  {rev.role} · {rev.organization}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('booking', { category: rev.category })}
                className="text-[#E5A93C] hover:underline font-medium shrink-0 cursor-pointer"
              >
                Book Similar →
              </button>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
};
