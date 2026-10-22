import React, { useState } from 'react';
import { BookOpen, ArrowUpRight, ArrowLeft, Camera } from 'lucide-react';
import type { JournalArticle, StudioPageRoute } from '../types/studio';
import { ResilientPlateImage } from './ResilientPlateImage';

interface JournalPageProps {
  articles: JournalArticle[];
  onNavigate: (page: StudioPageRoute, options?: { keyword?: string }) => void;
}

export const JournalPage: React.FC<JournalPageProps> = ({ articles, onNavigate }) => {
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);

  if (selectedArticle) {
    return (
      <article className="py-16 sm:py-20 max-w-4xl mx-auto px-6 space-y-10">
        <button
          type="button"
          onClick={() => setSelectedArticle(null)}
          className="flex items-center gap-2 text-xs font-medium text-[#E5A93C] hover:underline cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Editorial Journal Issues</span>
        </button>

        <header className="space-y-4 border-b border-[#1F1F23] pb-8">
          <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#9F9FA9]">
            <span className="text-[#E5A93C]">{selectedArticle.issueNumber}</span>
            <span>·</span>
            <span>{selectedArticle.category}</span>
            <span>·</span>
            <span>{selectedArticle.publishedAt}</span>
            <span>·</span>
            <span>{selectedArticle.readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#F4F4F0] leading-[1.1]">
            {selectedArticle.title}
          </h1>

          <p className="font-editorial italic text-xl text-[#D4D4D8]">
            {selectedArticle.subtitle}
          </p>

          <div className="pt-2 text-xs text-[#9F9FA9]">
            Written by <span className="text-[#F4F4F0] font-medium">{selectedArticle.author}</span> ·{' '}
            <span>{selectedArticle.authorRole}</span>
          </div>
        </header>

        <div className="rounded-2xl overflow-hidden border border-[#27272E] aspect-[16/9] bg-[#111114]">
          <ResilientPlateImage
            src={selectedArticle.coverImageUrl}
            alt={selectedArticle.title}
            plateNumber={selectedArticle.issueNumber}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-8">
          <p className="text-base text-[#D4D4D8] leading-relaxed font-medium">
            {selectedArticle.excerpt}
          </p>

          {selectedArticle.sections.map((sec, i) => (
            <div key={i} className="space-y-3 pt-4 border-t border-[#1F1F23]">
              <h2 className="text-xl font-semibold text-[#F4F4F0]">{sec.heading}</h2>
              <p className="text-sm sm:text-base text-[#9F9FA9] leading-relaxed">
                {sec.body}
              </p>
            </div>
          ))}
        </div>

        <div className="p-6 rounded-2xl bg-[#111115] border border-[#27272E] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#E5A93C]">
              <Camera className="w-3.5 h-3.5" />
              <span>OPTICAL & CAPTURE SPECIFICATION</span>
            </div>
            <p className="text-xs font-mono-tabular text-[#F4F4F0]">
              {selectedArticle.technicalTakeaway}
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              onNavigate('booking', { keyword: selectedArticle.title.toUpperCase() })
            }
            className="px-5 py-2.5 rounded-xl bg-[#E5A93C] hover:bg-[#F2B705] text-[#070708] text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer"
          >
            Book This Lighting Setup
          </button>
        </div>
      </article>
    );
  }

  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <section className="py-16 sm:py-20 max-w-7xl mx-auto px-6 space-y-14">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#1F1F23] pb-8">
        <div className="space-y-2">
          <p className="text-xs font-mono-tabular text-[#E5A93C]">
            PAGE 06 · EDITORIAL BLOG & TECHNICAL LIGHTING MONOGRAPHS
          </p>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#F4F4F0]">
            The Darkroom Journal
          </h1>
          <p className="text-sm text-[#9F9FA9] max-w-2xl">
            Technical notes on medium-format optics, architectural sun-path geometry, and behind-the-scenes lighting diagrams from our New York, Paris, and Mumbai productions.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('contact', { keyword: 'PRESS & EDITORIAL INQUIRY' })}
          className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium text-[#F4F4F0] bg-[#141418] hover:bg-[#1C1C22] border border-[#27272E] rounded-xl transition-colors self-start cursor-pointer"
        >
          <span>Press & Publication Inquiries</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#E5A93C]" />
        </button>
      </div>

      {/* Featured Lead Essay */}
      {featured && (
        <div
          onClick={() => setSelectedArticle(featured)}
          className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch p-6 sm:p-8 rounded-2xl bg-[#111114] border border-[#232329] hover:border-[#E5A93C]/60 transition-colors cursor-pointer"
        >
          <div className="lg:col-span-7 relative min-h-[320px] rounded-xl overflow-hidden border border-[#27272E]">
            <ResilientPlateImage
              src={featured.coverImageUrl}
              alt={featured.title}
              plateNumber={featured.issueNumber}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#9F9FA9]">
                <span className="text-[#E5A93C]">{featured.issueNumber}</span>
                <span>·</span>
                <span>{featured.category}</span>
                <span>·</span>
                <span>{featured.readTime}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-semibold text-[#F4F4F0] group-hover:text-[#E5A93C] transition-colors">
                {featured.title}
              </h2>

              <p className="font-editorial italic text-lg text-[#D4D4D8]">
                {featured.subtitle}
              </p>

              <p className="text-xs sm:text-sm text-[#9F9FA9] leading-relaxed pt-2">
                {featured.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-[#1F1F25] flex items-center justify-between text-xs">
              <span className="text-[#9F9FA9]">
                {featured.author} · {featured.publishedAt}
              </span>
              <span className="flex items-center gap-1 text-[#E5A93C] font-semibold">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Read Full Monograph</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Secondary Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {rest.map((art) => (
          <article
            key={art.id}
            onClick={() => setSelectedArticle(art)}
            className="group p-6 rounded-2xl bg-[#111114] border border-[#1F1F25] hover:border-[#E5A93C]/60 transition-colors cursor-pointer flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="aspect-[16/9] rounded-xl overflow-hidden border border-[#27272E] bg-[#09090B]">
                <ResilientPlateImage
                  src={art.coverImageUrl}
                  alt={art.title}
                  plateNumber={art.issueNumber}
                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                />
              </div>

              <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#9F9FA9]">
                <span className="text-[#E5A93C]">{art.issueNumber}</span>
                <span>·</span>
                <span>{art.category}</span>
                <span>·</span>
                <span>{art.readTime}</span>
              </div>

              <h3 className="text-xl font-semibold text-[#F4F4F0] group-hover:text-[#E5A93C] transition-colors">
                {art.title}
              </h3>

              <p className="text-xs text-[#9F9FA9] leading-relaxed">
                {art.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-[#1F1F25] flex items-center justify-between text-xs">
              <span className="font-mono-tabular text-[#9F9FA9]">
                {art.technicalTakeaway.slice(0, 42)}...
              </span>
              <span className="text-[#E5A93C] font-medium flex items-center gap-1 shrink-0">
                <span>Read Essay</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
