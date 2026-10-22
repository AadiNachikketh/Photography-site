import React, { useEffect, useMemo, useState } from 'react';
import {
  Calendar,
  Clock,
  CheckCircle2,
  Sliders,
  Download,
  AlertCircle,
} from 'lucide-react';
import type {
  BookingRecord,
  CommissionPackage,
  PortfolioCategory,
  ProductionAddon,
  StudioStage,
} from '../types/studio';

interface BookingSectionProps {
  packages: CommissionPackage[];
  stages: StudioStage[];
  addons: ProductionAddon[];
  bookings: BookingRecord[];
  preselectedCategory: PortfolioCategory | null;
  preselectedPackageId?: string | null;
  preselectedStageId: string | null;
  preselectedKeyword?: string | null;
  onSubmitBooking: (payload: Partial<BookingRecord>) => Promise<BookingRecord>;
}

const TIME_SLOTS: BookingRecord['timeSlot'][] = [
  'Full Day (08:00 – 18:00)',
  'Morning Half-Day (08:00 – 13:00)',
  'Afternoon / Twilight (14:00 – 20:00)',
];

const UPCOMING_DATES = [
  { date: '2026-10-26', label: 'Mon, Oct 26' },
  { date: '2026-10-27', label: 'Tue, Oct 27' },
  { date: '2026-10-28', label: 'Wed, Oct 28' },
  { date: '2026-10-29', label: 'Thu, Oct 29' },
  { date: '2026-10-30', label: 'Fri, Oct 30' },
  { date: '2026-11-02', label: 'Mon, Nov 02' },
  { date: '2026-11-03', label: 'Tue, Nov 03' },
  { date: '2026-11-04', label: 'Wed, Nov 04' },
  { date: '2026-11-05', label: 'Thu, Nov 05' },
  { date: '2026-11-06', label: 'Fri, Nov 06' },
];

export const BookingSection: React.FC<BookingSectionProps> = ({
  packages,
  stages,
  addons,
  bookings,
  preselectedCategory,
  preselectedPackageId,
  preselectedStageId,
  preselectedKeyword,
  onSubmitBooking,
}) => {
  const [bookingType, setBookingType] = useState<'Commissioned Production' | 'Stage Rental'>(
    'Commissioned Production'
  );
  const [selectedPackageId, setSelectedPackageId] = useState<string>(
    packages[1]?.id || packages[0]?.id || 'pkg-standard'
  );
  const [selectedStageId, setSelectedStageId] = useState<string>(stages[0]?.id || 'stage-a');
  const [selectedDate, setSelectedDate] = useState<string>('2026-10-29');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<BookingRecord['timeSlot']>(
    'Full Day (08:00 – 18:00)'
  );
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>(['addon-digitech']);
  const [aspectRatioPreference, setAspectRatioPreference] = useState<string>(
    '4:3 Medium Format Standard'
  );

  // Client fields
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientOrganization, setClientOrganization] = useState('');
  const [projectBrief, setProjectBrief] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);

  useEffect(() => {
    if (preselectedPackageId) {
      setBookingType('Commissioned Production');
      setSelectedPackageId(preselectedPackageId);
    } else if (preselectedCategory) {
      setBookingType('Commissioned Production');
      const matchedPkg = packages.find((p) => p.category === preselectedCategory);
      if (matchedPkg) {
        setSelectedPackageId(matchedPkg.id);
      }
    }
  }, [preselectedCategory, preselectedPackageId, packages]);

  useEffect(() => {
    if (preselectedStageId) {
      setBookingType('Stage Rental');
      setSelectedStageId(preselectedStageId);
    }
  }, [preselectedStageId]);

  useEffect(() => {
    if (preselectedKeyword && !projectBrief) {
      setProjectBrief(`Inquiry Keyword: ${preselectedKeyword} — `);
    }
  }, [preselectedKeyword, projectBrief]);

  const activePackage = useMemo(
    () => packages.find((p) => p.id === selectedPackageId) || packages[0],
    [packages, selectedPackageId]
  );

  const activeStage = useMemo(
    () => stages.find((s) => s.id === selectedStageId) || stages[0],
    [stages, selectedStageId]
  );

  const formatInr = (amount: number) => `₹${amount.toLocaleString('en-IN')}`;

  const baseRate = useMemo(() => {
    if (bookingType === 'Commissioned Production') {
      const pkgRate = activePackage?.startingRateInr || 28000;
      return selectedTimeSlot === 'Full Day (08:00 – 18:00)'
        ? pkgRate
        : Math.round(pkgRate * 0.65);
    }
    const fullRate = activeStage?.fullDayRateInr || 28000;
    const halfRate = activeStage?.daylightRateInr || 18000;
    return selectedTimeSlot === 'Full Day (08:00 – 18:00)' ? fullRate : halfRate;
  }, [bookingType, activePackage, activeStage, selectedTimeSlot]);

  const addonsTotal = useMemo(() => {
    return addons
      .filter((a) => selectedAddonIds.includes(a.id))
      .reduce((acc, item) => acc + (item.rateInr || 5500), 0);
  }, [addons, selectedAddonIds]);

  const estimatedTotal = baseRate + addonsTotal;

  const isDateOccupied = (dateStr: string) => {
    return bookings.some(
      (b) =>
        b.date === dateStr &&
        b.status !== 'Completed' &&
        b.timeSlot === 'Full Day (08:00 – 18:00)'
    );
  };

  const toggleAddon = (id: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!clientName.trim() || !clientEmail.trim()) {
      setErrorMessage('Please enter your full name and production contact email.');
      return;
    }

    setSubmitting(true);
    try {
      const chosenAddonNames = addons
        .filter((a) => selectedAddonIds.includes(a.id))
        .map((a) => a.name);

      const created = await onSubmitBooking({
        bookingType,
        packageOrStageId:
          bookingType === 'Commissioned Production'
            ? activePackage?.id
            : activeStage?.id,
        packageOrStageName:
          bookingType === 'Commissioned Production'
            ? activePackage?.name
            : `${activeStage?.code} — ${activeStage?.name}`,
        category:
          bookingType === 'Commissioned Production'
            ? activePackage?.category || 'Editorial & Fashion'
            : 'Editorial & Fashion',
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        addons: chosenAddonNames,
        estimatedTotal,
        currency: 'INR',
        clientName: clientName.trim(),
        clientEmail: clientEmail.trim(),
        clientOrganization: clientOrganization.trim() || 'Private Commission',
        projectBrief: projectBrief.trim(),
        aspectRatioPreference,
      });

      setConfirmedBooking(created);
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Unable to schedule this date/slot. Please select an open production date.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDownloadCallSheet = () => {
    if (!confirmedBooking) return;
    const textContent = [
      'ATELIER VANCE — MUMBAI · NEW YORK · PARIS',
      'PRODUCTION BOOKING & CALL SHEET CONFIRMATION',
      '==================================================',
      `Reference Code:    ${confirmedBooking.referenceCode}`,
      `Status:            ${confirmedBooking.status}`,
      `Production Type:   ${confirmedBooking.bookingType}`,
      `Commission/Stage:  ${confirmedBooking.packageOrStageName}`,
      `Scheduled Date:    ${confirmedBooking.date}`,
      `Call Time Window:  ${confirmedBooking.timeSlot}`,
      `Aspect Standard:   ${confirmedBooking.aspectRatioPreference}`,
      `Client / Producer: ${confirmedBooking.clientName} (${confirmedBooking.clientOrganization})`,
      `Contact Email:     ${confirmedBooking.clientEmail}`,
      `Equipment & Crew:  ${confirmedBooking.addons.join(', ') || 'Standard Stage Package'}`,
      `Estimated Total:   ₹${confirmedBooking.estimatedTotal.toLocaleString('en-IN')} (INR)`,
      `Payment Terms:     50% advance to start · 50% on delivery`,
      '',
      'Creative Brief & Lighting Notes:',
      confirmedBooking.projectBrief || 'Standard calibrated medium-format capture.',
      '==================================================',
    ].join('\n');

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${confirmedBooking.referenceCode}-Call-Sheet.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#1F1F23] pb-8">
        <div className="space-y-2">
          <p className="text-xs font-mono-tabular text-[#E5A93C]">
            PAGE 08 · REAL-TIME APPOINTMENT & STAGE SCHEDULER (INR ₹)
          </p>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#F4F4F0]">
            Reserve a Commission or Stage
          </h1>
          <p className="text-sm text-[#9F9FA9] max-w-2xl">
            Lock your production date with live stage conflict verification, custom optical add-ons, and instant call-sheet confirmation in INR (₹).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 self-start">
          {/* Mode Switcher */}
          <div className="flex items-center gap-1 p-1 bg-[#111114] border border-[#232329] rounded-xl">
            <button
              type="button"
              onClick={() => {
                setBookingType('Commissioned Production');
                setConfirmedBooking(null);
              }}
              className={`min-h-[40px] px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                bookingType === 'Commissioned Production'
                  ? 'bg-[#F4F4F0] text-[#070708]'
                  : 'text-[#9F9FA9] hover:text-[#F4F4F0]'
              }`}
            >
              Commissioned Package
            </button>
            <button
              type="button"
              onClick={() => {
                setBookingType('Stage Rental');
                setConfirmedBooking(null);
              }}
              className={`min-h-[40px] px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                bookingType === 'Stage Rental'
                  ? 'bg-[#F4F4F0] text-[#070708]'
                  : 'text-[#9F9FA9] hover:text-[#F4F4F0]'
              }`}
            >
              Raw Stage Rental
            </button>
          </div>
        </div>
      </div>

      {confirmedBooking ? (
        <div className="p-6 sm:p-10 rounded-2xl bg-[#111114] border border-[#27272E] max-w-3xl mx-auto space-y-6">
          <div className="flex items-start justify-between gap-4 border-b border-[#1F1F23] pb-6">
            <div className="flex items-start gap-3.5">
              <CheckCircle2 className="w-6 h-6 text-[#E5A93C] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-mono-tabular text-[#E5A93C]">
                  PRODUCTION HOLD CONFIRMED · {confirmedBooking.referenceCode}
                </p>
                <h2 className="text-2xl font-semibold text-[#F4F4F0] mt-1">
                  {confirmedBooking.packageOrStageName}
                </h2>
                <p className="text-sm text-[#9F9FA9] mt-1">
                  Scheduled for {confirmedBooking.date} · {confirmedBooking.timeSlot}
                </p>
              </div>
            </div>

            <div className="text-right font-mono-tabular">
              <span className="text-xs text-[#9F9FA9] block">Estimated Production Total</span>
              <span className="text-2xl font-semibold text-[#F4F4F0]">
                ₹{confirmedBooking.estimatedTotal.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#09090B] border border-[#1F1F23]">
              <span className="text-[#9F9FA9] block">Client & Producer</span>
              <span className="text-[#F4F4F0] font-medium mt-1 block">
                {confirmedBooking.clientName} · {confirmedBooking.clientOrganization}
              </span>
              <span className="text-[#9F9FA9] font-mono-tabular mt-0.5 block">
                {confirmedBooking.clientEmail}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#09090B] border border-[#1F1F23]">
              <span className="text-[#9F9FA9] block">Capture Format & Add-ons</span>
              <span className="text-[#F4F4F0] font-medium mt-1 block">
                {confirmedBooking.aspectRatioPreference}
              </span>
              <span className="text-[#9F9FA9] mt-0.5 block truncate">
                {confirmedBooking.addons.length > 0
                  ? confirmedBooking.addons.join(' · ')
                  : 'Base Medium Format Package'}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <button
              type="button"
              onClick={handleDownloadCallSheet}
              className="min-h-[44px] flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#070708] bg-[#E5A93C] hover:bg-[#F2B705] rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Production Call Sheet (.TXT)</span>
            </button>

            <button
              type="button"
              onClick={() => setConfirmedBooking(null)}
              className="min-h-[44px] px-4 py-2 text-xs font-medium text-[#9F9FA9] hover:text-[#F4F4F0] transition-colors cursor-pointer"
            >
              Schedule Another Commission
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 8 Columns */}
          <div className="lg:col-span-8 space-y-8">
            {/* Step 1 */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#111114] border border-[#1F1F23] space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-[#F4F4F0]">
                  1. Select {bookingType === 'Commissioned Production' ? 'Package Tier' : 'Studio Stage'}
                </h2>
                <span className="text-xs text-[#9F9FA9] font-mono-tabular">
                  50% advance to start · 50% on delivery
                </span>
              </div>

              {bookingType === 'Commissioned Production' ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {packages.map((pkg) => {
                    const isSelected = pkg.id === selectedPackageId;
                    const priceText = `₹${pkg.startingRateInr.toLocaleString('en-IN')}`;
                    return (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => setSelectedPackageId(pkg.id)}
                        className={`text-left p-5 rounded-xl border transition-colors cursor-pointer flex flex-col justify-between gap-4 ${
                          isSelected
                            ? 'bg-[#17171C] border-[#E5A93C]'
                            : 'bg-[#0B0B0E] border-[#1F1F25] hover:border-[#34343E]'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between text-xs text-[#9F9FA9] font-mono-tabular mb-1.5">
                            <span className="text-[#E5A93C] font-semibold">
                              {pkg.tierBadge || pkg.index}
                            </span>
                            <span className="text-[#F4F4F0] font-semibold">{priceText}</span>
                          </div>
                          <h3 className="text-sm font-semibold text-[#F4F4F0]">{pkg.name}</h3>
                          <p className="text-xs text-[#9F9FA9] mt-1.5 leading-relaxed">
                            {pkg.deliverables}
                          </p>
                        </div>

                        <div className="text-[11px] text-[#9F9FA9] font-mono-tabular border-t border-[#1F1F25] pt-2.5 flex items-center justify-between">
                          <span>{pkg.inrRangeLabel}</span>
                          <span>{pkg.turnaroundHours}h</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {stages.map((stg) => {
                    const isSelected = stg.id === selectedStageId;
                    const rateText = `₹${(stg.fullDayRateInr || 28000).toLocaleString('en-IN')}/day`;
                    return (
                      <button
                        key={stg.id}
                        type="button"
                        onClick={() => setSelectedStageId(stg.id)}
                        className={`text-left p-5 rounded-xl border transition-colors cursor-pointer flex flex-col justify-between gap-4 ${
                          isSelected
                            ? 'bg-[#17171C] border-[#E5A93C]'
                            : 'bg-[#0B0B0E] border-[#1F1F25] hover:border-[#34343E]'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between text-xs font-mono-tabular text-[#9F9FA9] mb-1">
                            <span className="text-[#E5A93C]">{stg.code}</span>
                            <span className="text-[#F4F4F0] font-semibold">{rateText}</span>
                          </div>
                          <h3 className="text-sm font-semibold text-[#F4F4F0]">{stg.name}</h3>
                          <p className="text-xs text-[#9F9FA9] mt-1 font-mono-tabular">
                            {stg.dimensions}
                          </p>
                        </div>
                        <div className="text-[11px] text-[#9F9FA9] border-t border-[#1F1F25] pt-2.5">
                          Half-day:{' '}
                          <span className="font-mono-tabular">
                            ₹{(stg.daylightRateInr || 18000).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Step 2 */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#111114] border border-[#1F1F23] space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-base font-semibold text-[#F4F4F0] flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#E5A93C]" />
                  <span>2. Production Date & Call-Time Window</span>
                </h2>
                <span className="text-xs text-[#9F9FA9] font-mono-tabular">
                  Live Stage Availability Sync
                </span>
              </div>

              <div className="space-y-3">
                <label className="block text-xs text-[#9F9FA9]">
                  Swipe or Tap Available Production Date (or choose custom date below)
                </label>
                <div className="flex overflow-x-auto sm:grid sm:grid-cols-5 gap-2.5 pb-2 sm:pb-0 no-scrollbar">
                  {UPCOMING_DATES.map((d) => {
                    const occupied = isDateOccupied(d.date);
                    const isSelected = selectedDate === d.date;
                    return (
                      <button
                        key={d.date}
                        type="button"
                        disabled={occupied}
                        onClick={() => setSelectedDate(d.date)}
                        className={`min-h-[56px] min-w-[116px] sm:min-w-0 p-3 rounded-xl border text-left transition-all shrink-0 font-mono-tabular ${
                          occupied
                            ? 'bg-[#09090B] border-[#1B1B20] text-[#52525B] opacity-60 cursor-not-allowed'
                            : isSelected
                            ? 'bg-[#17171C] border-[#E5A93C] text-[#F4F4F0] cursor-pointer'
                            : 'bg-[#0B0B0E] border-[#1F1F25] text-[#D4D4D8] hover:border-[#34343E] active:scale-[0.98] cursor-pointer'
                        }`}
                      >
                        <span className="block text-xs font-semibold">{d.label}</span>
                        <span className="block text-[10px] mt-0.5 text-[#9F9FA9]">
                          {occupied ? 'Booked (Hold)' : 'Available'}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center gap-2">
                    <label htmlFor="custom-date-input" className="text-xs text-[#9F9FA9]">
                      Custom Calendar Date:
                    </label>
                    <input
                      id="custom-date-input"
                      type="date"
                      value={selectedDate}
                      min="2026-10-23"
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="min-h-[44px] px-3 py-1.5 text-xs font-mono-tabular bg-[#0B0B0E] border border-[#27272E] rounded-lg text-[#F4F4F0] focus:outline-none focus:border-[#E5A93C]"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2.5 border-t border-[#1F1F23] pt-5">
                <label className="block text-xs text-[#9F9FA9] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#E5A93C]" />
                  <span>Call-Time Shift</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = selectedTimeSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`min-h-[48px] px-4 py-3 rounded-xl border text-xs font-medium text-left transition-all active:scale-[0.98] cursor-pointer ${
                          isSelected
                            ? 'bg-[#17171C] border-[#E5A93C] text-[#F4F4F0]'
                            : 'bg-[#0B0B0E] border-[#1F1F25] text-[#9F9FA9] hover:text-[#F4F4F0]'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#111114] border border-[#1F1F23] space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-[#F4F4F0] flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#E5A93C]" />
                  <span>3. Optical Upgrades, Hosting & Retainers</span>
                </h2>
                <span className="text-xs text-[#9F9FA9]">Optional add-ons (₹)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {addons.map((addon) => {
                  const checked = selectedAddonIds.includes(addon.id);
                  const addonRate = `₹${(addon.rateInr || 5500).toLocaleString('en-IN')}`;
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-4 rounded-xl border text-left transition-colors cursor-pointer flex items-start justify-between gap-3 ${
                        checked
                          ? 'bg-[#17171C] border-[#E5A93C]'
                          : 'bg-[#0B0B0E] border-[#1F1F25] hover:border-[#34343E]'
                      }`}
                    >
                      <div>
                        <span className="text-[11px] text-[#9F9FA9] block">
                          {addon.category}
                        </span>
                        <span className="text-xs font-medium text-[#F4F4F0] mt-0.5 block">
                          {addon.name}
                        </span>
                      </div>
                      <div className="text-right font-mono-tabular shrink-0">
                        <span className="text-xs font-semibold text-[#F4F4F0] block">
                          +{addonRate}
                        </span>
                        <span className="text-[10px] text-[#9F9FA9]">{addon.unit}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#111114] border border-[#1F1F23] space-y-5">
              <h2 className="text-base font-semibold text-[#F4F4F0]">
                4. Producer Contact & Creative Direction Brief
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#9F9FA9] mb-1.5">
                    Full Name / Executive Producer *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g., Rohan Kapoor"
                    className="w-full min-h-[44px] px-3.5 py-2.5 text-sm bg-[#0B0B0E] border border-[#27272E] rounded-lg text-[#F4F4F0] focus:outline-none focus:border-[#E5A93C]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#9F9FA9] mb-1.5">
                    Production Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="producer@agency.com"
                    className="w-full min-h-[44px] px-3.5 py-2.5 text-sm bg-[#0B0B0E] border border-[#27272E] rounded-lg text-[#F4F4F0] focus:outline-none focus:border-[#E5A93C]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#9F9FA9] mb-1.5">
                    Brand / Fashion House / Architectural Practice
                  </label>
                  <input
                    type="text"
                    value={clientOrganization}
                    onChange={(e) => setClientOrganization(e.target.value)}
                    placeholder="e.g., House of Zari / Studio Lotus"
                    className="w-full min-h-[44px] px-3.5 py-2.5 text-sm bg-[#0B0B0E] border border-[#27272E] rounded-lg text-[#F4F4F0] focus:outline-none focus:border-[#E5A93C]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#9F9FA9] mb-1.5">
                    Primary Plate Aspect & Framing Standard
                  </label>
                  <select
                    value={aspectRatioPreference}
                    onChange={(e) => setAspectRatioPreference(e.target.value)}
                    className="w-full min-h-[44px] px-3.5 py-2.5 text-sm bg-[#0B0B0E] border border-[#27272E] rounded-lg text-[#F4F4F0] focus:outline-none focus:border-[#E5A93C]"
                  >
                    <option value="4:3 Medium Format Standard">4:3 Medium Format Standard</option>
                    <option value="3:4 Vertical Editorial Monograph">3:4 Vertical Editorial Monograph</option>
                    <option value="16:9 Architectural Wide Plate">16:9 Architectural Wide Plate</option>
                    <option value="1:1 Hasselblad 6×6 Square">1:1 Hasselblad 6×6 Square</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#9F9FA9] mb-1.5">
                  Creative Brief, Lighting References & Set Requirements
                </label>
                <textarea
                  rows={3}
                  value={projectBrief}
                  onChange={(e) => setProjectBrief(e.target.value)}
                  placeholder="Specify number of looks/plates, lighting mood, surface materials, or tether requirements..."
                  className="w-full px-3.5 py-2.5 text-sm bg-[#0B0B0E] border border-[#27272E] rounded-lg text-[#F4F4F0] focus:outline-none focus:border-[#E5A93C]"
                />
              </div>
            </div>
          </div>

          {/* Right 4 Columns: Live Itemized Production Estimate Summary in INR */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 p-6 sm:p-8 rounded-2xl bg-[#111114] border border-[#27272E] space-y-6">
            <div className="border-b border-[#1F1F23] pb-4">
              <p className="text-xs font-mono-tabular text-[#9F9FA9]">
                ITEMIZED PRODUCTION ESTIMATE (INR ₹)
              </p>
              <h2 className="text-xl font-semibold text-[#F4F4F0] mt-1">
                {bookingType === 'Commissioned Production'
                  ? activePackage?.name
                  : `${activeStage?.code} — ${activeStage?.name}`}
              </h2>
              <p className="text-xs text-[#9F9FA9] mt-1">
                {selectedDate} · {selectedTimeSlot}
              </p>
            </div>

            <dl className="space-y-3 text-xs">
              <div className="flex items-center justify-between text-[#D4D4D8]">
                <dt>
                  {bookingType === 'Commissioned Production'
                    ? 'Base Package Fee'
                    : 'Stage Rental Rate'}
                </dt>
                <dd className="font-mono-tabular font-medium">
                  {formatInr(baseRate)}
                </dd>
              </div>

              {addons
                .filter((a) => selectedAddonIds.includes(a.id))
                .map((addon) => (
                  <div
                    key={addon.id}
                    className="flex items-start justify-between gap-4 text-[#9F9FA9]"
                  >
                    <dt>{addon.name}</dt>
                    <dd className="font-mono-tabular text-[#D4D4D8] shrink-0">
                      +{formatInr(addon.rateInr || 5500)}
                    </dd>
                  </div>
                ))}

              <div className="border-t border-[#1F1F23] pt-3 flex items-center justify-between text-xs text-[#9F9FA9]">
                <dt>50% Advance Deposit Due to Lock Date</dt>
                <dd className="font-mono-tabular text-[#F4F4F0]">
                  {formatInr(Math.round(estimatedTotal * 0.5))}
                </dd>
              </div>

              <div className="border-t border-[#27272E] pt-4 flex items-baseline justify-between">
                <dt className="text-sm font-semibold text-[#F4F4F0]">Estimated Total</dt>
                <dd className="text-2xl font-semibold font-mono-tabular text-[#E5A93C]">
                  {formatInr(estimatedTotal)}
                </dd>
              </div>
            </dl>

            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 flex items-start gap-2.5 text-xs text-rose-200">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full min-h-[48px] py-3.5 px-5 text-xs font-semibold text-[#070708] bg-[#E5A93C] hover:bg-[#F2B705] active:scale-[0.98] rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              {submitting ? 'Confirming Production Hold...' : 'Confirm Studio Reservation (₹)'}
            </button>

            <p className="text-[11px] text-[#9F9FA9] leading-relaxed">
              Payment terms: 50% advance to start · 50% on delivery. Instant call-sheet reference generated upon submission.
            </p>
          </aside>
        </form>
      )}
    </section>
  );
};
