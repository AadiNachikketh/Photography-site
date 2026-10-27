import React, { useState } from 'react';
import {
  X,
  Plus,
  Trash2,
  Upload,
  Check,
  RotateCcw,
  Star,
  Image as ImageIcon,
  Calendar,
} from 'lucide-react';
import type {
  BentoSpan,
  BookingRecord,
  PortfolioCategory,
  PortfolioItem,
} from '../types/studio';
import { ResilientPlateImage } from './ResilientPlateImage';

interface BackendStudioDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  portfolio: PortfolioItem[];
  bookings: BookingRecord[];
  onAddPlate: (plate: Partial<PortfolioItem>) => Promise<void>;
  onUpdatePlate: (id: string, updates: Partial<PortfolioItem>) => Promise<void>;
  onDeletePlate: (id: string) => Promise<void>;
  onUpdateBookingStatus: (id: string, status: BookingRecord['status']) => Promise<void>;
  onResetDemo: () => Promise<void>;
}

const PRESET_BACKEND_PLATES = [
  { label: 'Photo 01 · Editorial Platinum Blonde', url: '/assets/aistudio/pexels-photo-7462603_cfbc76d1.jpg' },
  { label: 'Photo 02 · Manhattan Memorial & Dusk', url: '/assets/aistudio/images__2__32f9c414.jpg' },
  { label: 'Photo 03 · Ignition & Berry Lip Macro', url: '/assets/aistudio/camera-angle-extreme-close-up-rodolfoclix_12769e5d.jpg' },
  { label: 'Photo 04 · Cliffside Bridal Veil', url: '/assets/aistudio/creative-wedding-photography_00187c97.jpg' },
  { label: 'Photo 05 · Jumping Spider Bio-Optic', url: '/assets/aistudio/31_a4b61f36.jpg' },
  { label: 'Photo 06 · Heterochromatic Iris Macro', url: '/assets/aistudio/na-cover_ae278ee9.jpg' },
  { label: 'Photo 07 · Golden Sunset Leap', url: '/assets/aistudio/action-photography-101_9570506e.jpg' },
  { label: 'Photo 08 · Country Road Toddlers', url: '/assets/aistudio/wide_20847189.jpeg' },
  { label: 'Photo 09 · Cobalt Door Model Portrait', url: '/assets/aistudio/Portrait_photography_shot_of_model_39c143b3.jpg' },
  { label: 'Photo 10 · Golden Meadow Toy Biplane', url: '/assets/aistudio/types-of-photography-iwona-podlasinska-child-plane_27f9a1f9.jpg' },
];

export const BackendStudioDrawer: React.FC<BackendStudioDrawerProps> = ({
  isOpen,
  onClose,
  portfolio,
  bookings,
  onAddPlate,
  onUpdatePlate,
  onDeletePlate,
  onUpdateBookingStatus,
  onResetDemo,
}) => {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'bookings'>('portfolio');
  const [showAddForm, setShowAddForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editUrlValue, setEditUrlValue] = useState('');

  // New plate form state
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<PortfolioCategory>('Editorial & Fashion');
  const [client, setClient] = useState('');
  const [location, setLocation] = useState('Stage A · North Daylight Loft, NY');
  const [bentoSpan, setBentoSpan] = useState<BentoSpan>('1x1');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '4:3' | '3:4' | '1:1'>('4:3');
  const [imageUrl, setImageUrl] = useState('/assets/aistudio/pexels-photo-7462603_cfbc76d1.jpg');
  const [camera, setCamera] = useState('Hasselblad H6D-100c');
  const [lens, setLens] = useState('HC 80mm f/2.8');
  const [aperture, setAperture] = useState('f/5.6');
  const [shutterSpeed, setShutterSpeed] = useState('1/160s');
  const [iso, setIso] = useState('ISO 64');
  const [lightingSetup, setLightingSetup] = useState('Profoto Pro-11 Key + 12x12 Scrim');
  const [curatorNote, setCuratorNote] = useState('');
  const [featuredInHero, setFeaturedInHero] = useState(false);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, targetPlateId?: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      if (targetPlateId) {
        await onUpdatePlate(targetPlateId, { imageUrl: dataUrl });
      } else {
        setImageUrl(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !imageUrl.trim()) return;
    setIsSaving(true);
    try {
      await onAddPlate({
        title: title.trim(),
        subtitle: subtitle.trim() || 'Commissioned Studio Archive',
        category,
        client: client.trim() || 'Private Commission',
        location: location.trim(),
        year: '2026',
        bentoSpan,
        aspectRatio,
        imageUrl: imageUrl.trim(),
        featuredInHero,
        curatorNote:
          curatorNote.trim() ||
          'Captured on calibrated medium format digital back in Atelier Vance New York.',
        exif: {
          camera,
          lens,
          focalLength: lens.match(/\d+mm/)?.[0] || '80mm',
          aperture,
          shutterSpeed,
          iso,
          lightingSetup,
          colorProfile: '16-Bit HNCS Master',
        },
      });
      setTitle('');
      setSubtitle('');
      setClient('');
      setCuratorNote('');
      setFeaturedInHero(false);
      setShowAddForm(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveInlineUrl = async (id: string) => {
    if (!editUrlValue.trim()) return;
    await onUpdatePlate(id, { imageUrl: editUrlValue.trim() });
    setEditingId(null);
    setEditUrlValue('');
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Studio Backend CMS & Booking Console"
    >
      <div className="w-full max-w-4xl bg-[#09090B] border-l border-[#1F1F23] h-full flex flex-col overflow-hidden">
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#1F1F23] bg-[#070708]">
          <div>
            <h2 className="text-lg font-semibold text-[#F4F4F0]">
              Studio Backend CMS & Production Ledger
            </h2>
            <p className="text-xs text-[#9F9FA9] mt-0.5">
              Persisted in <span className="font-mono-tabular">data/studio-db.json</span> via Express API (<span className="font-mono-tabular">/api/portfolio</span> · <span className="font-mono-tabular">/api/bookings</span>)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onResetDemo}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#9F9FA9] hover:text-[#F4F4F0] bg-[#141418] hover:bg-[#1C1C22] border border-[#27272E] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Default Plates</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-[#070708] bg-[#F4F4F0] hover:bg-[#E5A93C] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Close CMS</span>
            </button>
          </div>
        </div>

        {/* Interactive Workspace Switcher */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-[#1F1F23] bg-[#0B0B0E]">
          <div className="flex items-center gap-1 p-1 bg-[#141418] rounded-lg border border-[#232329]">
            <button
              type="button"
              onClick={() => setActiveTab('portfolio')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'portfolio'
                  ? 'bg-[#F4F4F0] text-[#070708]'
                  : 'text-[#9F9FA9] hover:text-[#F4F4F0]'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Portfolio Plates ({portfolio.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('bookings')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'bookings'
                  ? 'bg-[#F4F4F0] text-[#070708]'
                  : 'text-[#9F9FA9] hover:text-[#F4F4F0]'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Client Bookings ({bookings.length})</span>
            </button>
          </div>

          {activeTab === 'portfolio' && (
            <button
              type="button"
              onClick={() => setShowAddForm((prev) => !prev)}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-[#070708] bg-[#E5A93C] hover:bg-[#F2B705] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{showAddForm ? 'Cancel New Plate' : 'Add Portfolio Plate'}</span>
            </button>
          )}
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'portfolio' ? (
            <>
              {/* Add New Portfolio Plate Form */}
              {showAddForm && (
                <form
                  onSubmit={handleCreateSubmit}
                  className="p-6 rounded-xl bg-[#111115] border border-[#27272E] space-y-5"
                >
                  <div className="flex items-center justify-between border-b border-[#1F1F23] pb-3">
                    <h3 className="text-sm font-semibold text-[#F4F4F0]">
                      Register New High-Resolution Plate in Backend
                    </h3>
                    <span className="text-xs text-[#9F9FA9] font-mono-tabular">
                      POST /api/portfolio
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[#9F9FA9] mb-1.5">
                        Plate Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g., Monolith Study in Raw Silk"
                        className="w-full px-3.5 py-2 text-sm bg-[#09090B] border border-[#27272E] rounded-lg text-[#F4F4F0] focus:outline-none focus:border-[#E5A93C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-[#9F9FA9] mb-1.5">
                        Series / Subtitle
                      </label>
                      <input
                        type="text"
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        placeholder="e.g., Autumn/Winter Editorial Archive"
                        className="w-full px-3.5 py-2 text-sm bg-[#09090B] border border-[#27272E] rounded-lg text-[#F4F4F0] focus:outline-none focus:border-[#E5A93C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-[#9F9FA9] mb-1.5">
                        Discipline Category
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as PortfolioCategory)}
                        className="w-full px-3.5 py-2 text-sm bg-[#09090B] border border-[#27272E] rounded-lg text-[#F4F4F0] focus:outline-none focus:border-[#E5A93C]"
                      >
                        <option value="Editorial & Fashion">Editorial & Fashion</option>
                        <option value="Architecture & Spatial">Architecture & Spatial</option>
                        <option value="Commercial Still Life">Commercial Still Life</option>
                        <option value="Fine Art Portrait">Fine Art Portrait</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-[#9F9FA9] mb-1.5">
                        Commissioning Client
                      </label>
                      <input
                        type="text"
                        value={client}
                        onChange={(e) => setClient(e.target.value)}
                        placeholder="e.g., Saint Laurent Rive Droite"
                        className="w-full px-3.5 py-2 text-sm bg-[#09090B] border border-[#27272E] rounded-lg text-[#F4F4F0] focus:outline-none focus:border-[#E5A93C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-[#9F9FA9] mb-1.5">
                        Bento Grid Footprint
                      </label>
                      <select
                        value={bentoSpan}
                        onChange={(e) => setBentoSpan(e.target.value as BentoSpan)}
                        className="w-full px-3.5 py-2 text-sm bg-[#09090B] border border-[#27272E] rounded-lg text-[#F4F4F0] focus:outline-none focus:border-[#E5A93C]"
                      >
                        <option value="2x2">2×2 Flagship Showcase</option>
                        <option value="2x1">2×1 Wide Panoramic</option>
                        <option value="1x1">1×1 Standard Monograph Tile</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-[#9F9FA9] mb-1.5">
                        Aspect Ratio
                      </label>
                      <select
                        value={aspectRatio}
                        onChange={(e) =>
                          setAspectRatio(e.target.value as '16:9' | '4:3' | '3:4' | '1:1')
                        }
                        className="w-full px-3.5 py-2 text-sm bg-[#09090B] border border-[#27272E] rounded-lg text-[#F4F4F0] focus:outline-none focus:border-[#E5A93C]"
                      >
                        <option value="4:3">4:3 Medium Format Standard</option>
                        <option value="16:9">16:9 Architectural Wide</option>
                        <option value="3:4">3:4 Vertical Portrait</option>
                        <option value="1:1">1:1 Hasselblad 6×6 Square</option>
                      </select>
                    </div>
                  </div>

                  {/* Image Source: URL, Preset Plate, or Local Upload */}
                  <div className="space-y-3 border-t border-[#1F1F23] pt-4">
                    <label className="block text-xs text-[#9F9FA9]">
                      Backend Image Source (Paste URL, Choose Studio Plate, or Upload Local File)
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="/api/plates/silhouette-alabaster.svg or https://..."
                        className="flex-1 px-3.5 py-2 text-xs font-mono-tabular bg-[#09090B] border border-[#27272E] rounded-lg text-[#F4F4F0] focus:outline-none focus:border-[#E5A93C]"
                      />
                      <label className="flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-medium bg-[#18181E] hover:bg-[#23232C] border border-[#2E2E38] rounded-lg text-[#F4F4F0] cursor-pointer whitespace-nowrap shrink-0">
                        <Upload className="w-3.5 h-3.5 text-[#E5A93C]" />
                        <span>Upload File</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e)}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {PRESET_BACKEND_PLATES.map((preset) => (
                        <button
                          key={preset.url}
                          type="button"
                          onClick={() => setImageUrl(preset.url)}
                          className={`px-2.5 py-1 text-[11px] rounded border transition-colors cursor-pointer ${
                            imageUrl === preset.url
                              ? 'bg-[#E5A93C]/20 border-[#E5A93C] text-[#F4F4F0]'
                              : 'bg-[#09090B] border-[#232329] text-[#9F9FA9] hover:text-[#F4F4F0]'
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* EXIF Fields */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-[#1F1F23] pt-4">
                    <div>
                      <label className="block text-[11px] text-[#9F9FA9] mb-1">Camera</label>
                      <input
                        type="text"
                        value={camera}
                        onChange={(e) => setCamera(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs font-mono-tabular bg-[#09090B] border border-[#27272E] rounded text-[#F4F4F0]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#9F9FA9] mb-1">Lens</label>
                      <input
                        type="text"
                        value={lens}
                        onChange={(e) => setLens(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs font-mono-tabular bg-[#09090B] border border-[#27272E] rounded text-[#F4F4F0]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#9F9FA9] mb-1">Aperture</label>
                      <input
                        type="text"
                        value={aperture}
                        onChange={(e) => setAperture(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs font-mono-tabular bg-[#09090B] border border-[#27272E] rounded text-[#F4F4F0]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#9F9FA9] mb-1">Shutter / ISO</label>
                      <input
                        type="text"
                        value={`${shutterSpeed} · ${iso}`}
                        onChange={(e) => {
                          const parts = e.target.value.split('·');
                          setShutterSpeed(parts[0]?.trim() || '1/160s');
                          setIso(parts[1]?.trim() || 'ISO 64');
                        }}
                        className="w-full px-2.5 py-1.5 text-xs font-mono-tabular bg-[#09090B] border border-[#27272E] rounded text-[#F4F4F0]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <label className="flex items-center gap-2 text-xs text-[#D4D4D8] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={featuredInHero}
                        onChange={(e) => setFeaturedInHero(e.target.checked)}
                        className="rounded border-[#27272E] accent-[#E5A93C]"
                      />
                      <span>Set as Primary Hero Split Flagship Plate</span>
                    </label>

                    <button
                      type="submit"
                      disabled={isSaving}
                      className="px-5 py-2 text-xs font-semibold text-[#070708] bg-[#E5A93C] hover:bg-[#F2B705] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {isSaving ? 'Saving to Backend...' : 'Save Plate to Backend'}
                    </button>
                  </div>
                </form>
              )}

              {/* Existing Backend Portfolio List */}
              <div className="space-y-3">
                {portfolio.map((plate) => (
                  <div
                    key={plate.id}
                    className="p-4 rounded-xl bg-[#111115] border border-[#1F1F25] flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
                  >
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      <div className="w-24 h-18 rounded-lg overflow-hidden shrink-0 border border-[#27272E] bg-[#070708]">
                        <ResilientPlateImage
                          src={plate.imageUrl}
                          alt={plate.title}
                          plateNumber={plate.plateNumber}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 text-xs text-[#9F9FA9] font-mono-tabular">
                          <span className="text-[#F4F4F0]">{plate.plateNumber}</span>
                          <span aria-hidden="true">·</span>
                          <span>{plate.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>Grid {plate.bentoSpan}</span>
                          {plate.featuredInHero && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="text-[#E5A93C] font-medium">Hero Flagship</span>
                            </>
                          )}
                        </div>

                        <h4 className="text-sm font-semibold text-[#F4F4F0] truncate mt-0.5">
                          {plate.title}
                        </h4>

                        <p className="text-xs text-[#9F9FA9] truncate">
                          {plate.client} · {plate.exif.camera} · {plate.exif.lens}
                        </p>

                        {editingId === plate.id ? (
                          <div className="mt-2 flex items-center gap-2">
                            <input
                              type="text"
                              value={editUrlValue}
                              onChange={(e) => setEditUrlValue(e.target.value)}
                              placeholder="Enter new image URL or /api/plates/..."
                              className="flex-1 px-2.5 py-1 text-xs font-mono-tabular bg-[#070708] border border-[#E5A93C] rounded text-[#F4F4F0]"
                            />
                            <button
                              type="button"
                              onClick={() => handleSaveInlineUrl(plate.id)}
                              className="px-2.5 py-1 text-xs font-medium bg-[#E5A93C] text-[#070708] rounded cursor-pointer"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingId(null)}
                              className="px-2 py-1 text-xs text-[#9F9FA9] hover:text-[#F4F4F0] cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="mt-1.5 flex items-center gap-3 text-[11px]">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingId(plate.id);
                                setEditUrlValue(plate.imageUrl);
                              }}
                              className="text-[#E5A93C] hover:underline cursor-pointer"
                            >
                              Edit Image URL
                            </button>
                            <span className="text-[#27272E]">·</span>
                            <label className="text-[#9F9FA9] hover:text-[#F4F4F0] cursor-pointer">
                              <span>Upload Replacement File</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileUpload(e, plate.id)}
                                className="hidden"
                              />
                            </label>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <select
                        aria-label={`Grid size for ${plate.title}`}
                        value={plate.bentoSpan}
                        onChange={(e) =>
                          onUpdatePlate(plate.id, { bentoSpan: e.target.value as BentoSpan })
                        }
                        className="px-2.5 py-1.5 text-xs font-mono-tabular bg-[#09090B] border border-[#27272E] rounded-lg text-[#F4F4F0] cursor-pointer"
                      >
                        <option value="2x2">2×2 Large</option>
                        <option value="2x1">2×1 Wide</option>
                        <option value="1x1">1×1 Tile</option>
                      </select>

                      <button
                        type="button"
                        onClick={() => onUpdatePlate(plate.id, { featuredInHero: true })}
                        title="Set as Hero Split Flagship Image"
                        className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                          plate.featuredInHero
                            ? 'bg-[#E5A93C]/15 border-[#E5A93C] text-[#E5A93C]'
                            : 'bg-[#09090B] border-[#27272E] text-[#9F9FA9] hover:text-[#F4F4F0]'
                        }`}
                      >
                        <Star className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDeletePlate(plate.id)}
                        title="Remove plate from portfolio"
                        className="p-2 rounded-lg bg-[#09090B] border border-[#27272E] text-[#9F9FA9] hover:text-rose-400 hover:border-rose-500/40 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* Client Bookings Ledger Tab */
            <div className="space-y-4">
              {bookings.length === 0 ? (
                <div className="p-12 text-center border border-[#1F1F23] rounded-xl bg-[#111115]">
                  <p className="text-sm text-[#9F9FA9]">No studio bookings recorded yet.</p>
                </div>
              ) : (
                bookings.map((bk) => (
                  <div
                    key={bk.id}
                    className="p-5 rounded-xl bg-[#111115] border border-[#1F1F25] space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1F1F23] pb-3">
                      <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#9F9FA9]">
                        <span className="text-[#E5A93C] font-semibold">{bk.referenceCode}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-[#F4F4F0]">{bk.date}</span>
                        <span aria-hidden="true">·</span>
                        <span>{bk.timeSlot}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-sm font-mono-tabular font-semibold text-[#F4F4F0]">
                          ₹{bk.estimatedTotal.toLocaleString('en-IN')}
                        </span>
                        <select
                          aria-label={`Status for booking ${bk.referenceCode}`}
                          value={bk.status}
                          onChange={(e) =>
                            onUpdateBookingStatus(
                              bk.id,
                              e.target.value as BookingRecord['status']
                            )
                          }
                          className="px-2.5 py-1 text-xs font-medium bg-[#09090B] border border-[#27272E] rounded-lg text-[#F4F4F0] cursor-pointer"
                        >
                          <option value="Confirmed">Status: Confirmed</option>
                          <option value="Pending Review">Status: Pending Review</option>
                          <option value="Completed">Status: Completed</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <p className="text-[#9F9FA9]">Client & Organization</p>
                        <p className="text-[#F4F4F0] font-medium mt-0.5">
                          {bk.clientName} · {bk.clientOrganization} ({bk.clientEmail})
                        </p>
                      </div>
                      <div>
                        <p className="text-[#9F9FA9]">Selected Production / Stage</p>
                        <p className="text-[#F4F4F0] font-medium mt-0.5">
                          {bk.packageOrStageName} · {bk.aspectRatioPreference}
                        </p>
                      </div>
                    </div>

                    {bk.projectBrief && (
                      <p className="text-xs text-[#9F9FA9] bg-[#09090B] p-3 rounded-lg border border-[#1F1F23]">
                        {bk.projectBrief}
                      </p>
                    )}

                    {bk.addons.length > 0 && (
                      <div className="text-[11px] text-[#9F9FA9] font-mono-tabular">
                        Add-ons: {bk.addons.join(' · ')}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
