import React, { useState } from 'react';
import { Layers, Camera, ArrowUpRight, Zap, Maximize } from 'lucide-react';
import type { StudioPageRoute, StudioStage } from '../types/studio';
import { ResilientPlateImage } from './ResilientPlateImage';

interface StagesPageProps {
  stages: StudioStage[];
  onBookStage: (stageId: string) => void;
  onNavigate: (page: StudioPageRoute) => void;
}

export const StagesPage: React.FC<StagesPageProps> = ({
  stages,
  onBookStage,
}) => {
  const [selectedStageId, setSelectedStageId] = useState<string>(stages[0]?.id || 'stage-a');

  const currentStage = stages.find((s) => s.id === selectedStageId) || stages[0];

  return (
    <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 space-y-14">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#1F1F23] pb-8">
        <div className="space-y-2">
          <p className="text-xs font-mono-tabular text-[#E5A93C]">
            PAGE 05 · ARCHITECTURAL SOUNDSTAGES & DAYLIGHT LOFTS (INR ₹)
          </p>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#F4F4F0]">
            Three Purpose-Built Stages
          </h1>
          <p className="text-sm text-[#9F9FA9] max-w-2xl">
            4,192 sq ft of acoustically isolated shooting space featuring 18ft north-facing casements, a 32-foot heated infinity cyclorama, and a pneumatic vibration-isolated macro laboratory.
          </p>
        </div>

        <div className="text-xs font-mono-tabular text-[#9F9FA9] self-start lg:self-end">
          Includes Profoto Pro-11 Strobe Pack & Calibrated EIZO Tether Cart
        </div>
      </div>

      {/* Stage Selector Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stages.map((stg) => {
          const isSelected = stg.id === currentStage?.id;
          const fullRate = `₹${(stg.fullDayRateInr || 28000).toLocaleString('en-IN')}`;

          return (
            <button
              key={stg.id}
              type="button"
              onClick={() => setSelectedStageId(stg.id)}
              className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-4 ${
                isSelected
                  ? 'bg-[#15151B] border-[#E5A93C]'
                  : 'bg-[#111114] border-[#1F1F25] hover:border-[#32323D]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono-tabular">
                  <span className="text-[#E5A93C] font-semibold">{stg.code}</span>
                  <span className="text-[#F4F4F0] font-semibold">{fullRate} / full day</span>
                </div>
                <h2 className="text-lg font-semibold text-[#F4F4F0] mt-1">{stg.name}</h2>
                <p className="text-xs text-[#9F9FA9] font-mono-tabular mt-0.5">
                  {stg.dimensions} · {stg.ceilingHeight}
                </p>
              </div>

              <div className="text-xs text-[#9F9FA9] border-t border-[#1F1F25] pt-3 flex items-center justify-between">
                <span>{stg.orientation.slice(0, 36)}...</span>
                <span className="text-[#E5A93C] font-medium">Inspect Stage →</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detailed Stage Blueprint & Equipment Breakdown */}
      {currentStage && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch p-6 sm:p-10 rounded-2xl bg-[#111114] border border-[#232329]">
          <div className="lg:col-span-5 relative min-h-[300px] sm:min-h-[340px] rounded-xl overflow-hidden border border-[#27272E]">
            <ResilientPlateImage
              src={currentStage.previewImageUrl}
              alt={currentStage.name}
              plateNumber={currentStage.code}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
              <p className="text-xs font-mono-tabular text-[#E5A93C]">
                {currentStage.code} · {currentStage.dimensions}
              </p>
              <p className="text-sm font-medium text-[#F4F4F0] mt-0.5">
                {currentStage.orientation}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[#1F1F25] pb-5">
                <div>
                  <span className="text-xs font-mono-tabular text-[#E5A93C]">
                    {currentStage.code} TECHNICAL DOSSIER
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-semibold text-[#F4F4F0] mt-0.5">
                    {currentStage.name}
                  </h3>
                </div>

                <div className="text-right font-mono-tabular">
                  <span className="text-xs text-[#9F9FA9] block">10-Hour Full Day Lockout</span>
                  <span className="text-2xl sm:text-3xl font-semibold text-[#E5A93C]">
                    ₹{(currentStage.fullDayRateInr || 28000).toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-[#9F9FA9] block mt-0.5">
                    5h Half-Day: ₹{(currentStage.daylightRateInr || 18000).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <p className="text-sm text-[#D4D4D8] leading-relaxed">
                {currentStage.idealFor}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="p-4 rounded-xl bg-[#0B0B0E] border border-[#1F1F25] space-y-2.5">
                  <h4 className="text-xs font-semibold text-[#F4F4F0] flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#E5A93C]" />
                    <span>Architectural & Electrical Specs</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-[#9F9FA9] leading-relaxed">
                    {currentStage.keySpecs.map((spec, i) => (
                      <li key={i}>· {spec}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-[#0B0B0E] border border-[#1F1F25] space-y-2.5">
                  <h4 className="text-xs font-semibold text-[#F4F4F0] flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-[#E5A93C]" />
                    <span>Included Strobe, Tether & Grip Package</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-[#9F9FA9] leading-relaxed">
                    {currentStage.includedGear.map((gear, i) => (
                      <li key={i}>· {gear}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t border-[#1F1F25] pt-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-xs text-[#9F9FA9] font-mono-tabular">
                <span className="flex items-center gap-1">
                  <Maximize className="w-3.5 h-3.5 text-[#E5A93C]" />
                  {currentStage.dimensions}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-[#E5A93C]" />
                  200A 3-Phase Cam-Lock
                </span>
              </div>

              <button
                type="button"
                onClick={() => onBookStage(currentStage.id)}
                className="min-h-[48px] flex items-center gap-2 px-6 py-3 text-xs font-semibold text-[#070708] bg-[#E5A93C] hover:bg-[#F2B705] active:scale-[0.98] rounded-xl transition-all cursor-pointer"
              >
                <span>Reserve {currentStage.code} Now</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
