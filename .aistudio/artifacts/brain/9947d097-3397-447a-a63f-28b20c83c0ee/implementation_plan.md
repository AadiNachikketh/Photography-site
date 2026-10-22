# Atelier Vance — 9-Page Luxury Photography Studio & Production Platform

A complete architectural transformation of **Atelier Vance** from a single-page layout into a 9-page, multi-route luxury photography platform. The **Home** page is dedicated exclusively to an immersive, scroll-animated medium-format portfolio experience that culminates in a magnetic **"Let's Create Something Iconic"** finale, while 8 additional dedicated pages deliver the full Premium tier capabilities (Exhibitions, Services, Packages with INR/USD toggle, Studio Stages, Editorial Journal/Blog, Verified Client Reviews, Appointment Booking Engine, and Contact Concierge with WhatsApp/Call & Studio Analytics).

### User Review & Critical Decisions

> [!IMPORTANT]
> Please review the confirmed architectural and design decisions below before we build the 9-page experience. Click **Proceed** when ready or let us know if you would like any adjustments.

- **Confirmed Decision 1 — 9 Dedicated Pages Architecture**: Instead of stacking sections on one page, the platform is structured into 9 independent, full-screen routed views: **1. Home (Scroll-Animated Portfolio)**, **2. Exhibitions (Curated Monographs & Lightbox)**, **3. Services (Disciplines & Production Workflow)**, **4. Packages (Starter / Standard / Premium Tiers with INR ₹ & USD $ Toggle)**, **5. Stages (3 Soundstages & Equipment Specs)**, **6. Journal (Editorial Blog & Lighting Essays)**, **7. Reviews (Verified Client Testimonials & Outcomes)**, **8. Booking (Interactive Appointment & Stage Scheduler)**, and **9. Contact (Concierge Inquiry, Location Map, WhatsApp/Call Actions & Backend Analytics/CMS)**.
- **Confirmed Decision 2 — Pure Portfolio Home with Parallax Scroll Animations**: The **Home** page contains strictly the visual portfolio narrative—featuring full-viewport parallax plates, scroll-linked scale and opacity reveals (`motion/react`), floating technical EXIF indices, and chapter progress indicators.
- **Confirmed Decision 3 — Magnetic "Let's Create" Finale & INR/USD Currency Support**: Reaching the bottom of the Home portfolio triggers a dramatic curtain-reveal finale (**"Let's Create Something Iconic — Initiate Your Commission"**) with direct routing to the Booking Engine and Contact Concierge, plus seamless INR (`₹`) and USD (`$`) pricing switching on the Packages & Booking pages.

---

### 1. Overview & Core Concept

- **What It Does**: Delivers a bespoke, agency-grade 9-page website for a premier photography studio. Visitors experience an uninterrupted, cinema-grade scroll portfolio on the Home page and navigate effortlessly across dedicated pages for services, tiered pricing, studio stage blueprints, editorial blog posts, verified client reviews, live appointment booking, and studio contact/analytics.
- **Target Audience / Persona**: Fashion creative directors, architectural firms, luxury brands, and private portrait clients seeking high-end photography production or studio stage rentals, alongside the studio owner managing backend images, bookings, and analytics.
- **Key Value**: Eliminates single-page clutter by giving every core business function its own curated space while checking every feature of a high-converting Premium studio website (Appointment Booking, Services, Blog Section, Reviews Integration, Analytics Dashboard, WhatsApp & Direct Call triggers, and Custom Scroll Motion).

---

### 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Home (Pure Scroll Portfolio + Magnetic Finale)**: User lands on a full-bleed cinematic aperture hero and scrolls through sequential full-screen medium-format plates. Each plate smoothly scales (`1.08 → 1.0`) with parallax caption reveals and live chapter counters (`01 / 07` through `07 / 07`). Scrolling to the bottom unveils a monumental finale section with an interactive **"Let's Create Together — Book a Session or Reach Out"** call-to-action.
  2. **Exhibitions**: Filterable Bento & Masonry archive with 200% Optical Loupe fullscreen lightbox and full 16-bit EXIF telemetry.
  3. **Services**: Detailed breakdown of the studio's 4 core disciplines (*Editorial & Haute Couture*, *Architectural & Spatial Monographs*, *Haute Horology & Macro Still-Life*, *Fine Art & Executive Portraiture*) and end-to-end production workflow.
  4. **Packages**: Interactive pricing matrix featuring **Starter**, **Standard (Most Popular)**, and **Premium** production & studio tiers, complete with an instant **INR (`₹`) / USD (`$`)** currency switcher, optional add-ons, and 50% advance payment terms.
  5. **Stages**: Interactive architectural blueprints, lighting inventories, and floor dimensions for Stage A (Daylight Loft), Stage B (32ft Infinity Cyclorama), and Stage C (Optical Macro Lab).
  6. **Journal (Blog)**: Editorial essays on medium-format lighting, architectural solar incidence, and behind-the-scenes campaign breakdowns with full article reader modals.
  7. **Reviews**: Verified client reviews with star ratings, production category filters, concrete campaign metrics, and an interactive form for clients to submit new verified reviews.
  8. **Booking**: Multi-step appointment and studio stage reservation engine with real-time date conflict checking, equipment add-ons, INR/USD estimate calculation, and downloadable call sheets.
  9. **Contact (+ Studio Analytics & Backend CMS)**: Direct studio concierge form, instant WhatsApp & Phone Call action buttons, interactive New York / Paris / Mumbai studio location cards, and quick toggle access to the **Studio Analytics Dashboard & Backend Image CMS**.
- **Visual Identity & Theme**:
  - *Aesthetic Direction*: Avant-Garde Editorial Monograph meets Swiss Precision Darkroom.
  - *Color Palette & Mood*: 60% Stark Obsidian Canvas (`#070708`), 30% Darkroom Slate & Zinc Hairlines (`#111114` / `#1F1F23`) with Warm Alabaster typography (`#F4F4F0`), and 10% Burnished Gold Accent (`#E5A93C`) for primary CTAs and active indicators.
  - *Typography & Hierarchy*: `Plus Jakarta Sans` for bold geometric headers and crisp UI controls, `Cormorant Garamond` for expressive editorial serifs and italics, and `JetBrains Mono` (`tabular-nums`) for EXIF telemetry, frame counters, and pricing tables.
  - *Component Styling & Layout*: Full 1440px desktop presence, clean unboxed metadata with typographic separators (`·`), zero static pill clutter, and a streamlined top navigation bar with active page state indicators.
- **Interactive Feedback & Motion**:
  - Hardware-accelerated scroll progress bar, parallax image framing, smooth page-to-page transitions using `motion/react`, interactive hover loupe previews, and real-time backend persistence across all forms.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Dedicated 9-Page Client Router with Persistent Top Navigation & Quick-Jump Index**
  - *Chosen Approach*: Implement a clean client-side multi-page router supporting all 9 views with automatic scroll-to-top on route change, URL hash syncing (`#home`, `#exhibitions`, `#services`, `#packages`, `#stages`, `#journal`, `#reviews`, `#booking`, `#contact`), and an expandableIndex Drawer for mobile/tablet ergonomics.
  - *Why*: Gives each page the breathing room of a luxury magazine while keeping navigation instantaneous without full-page reloads.
  - *Alternatives Considered*: Single-page anchor scrolling was rejected because it crowds distinct workflows and dilutes the pure portfolio impact of the Home page.
- **Decision 2: Unified Express Backend (`server.ts`) for Portfolio Plates, Bookings, Reviews, Blog Posts, and Analytics**
  - *Chosen Approach*: Extend the persistent JSON store (`data/studio-db.json`) and Express REST endpoints so images, client bookings, submitted reviews, contact inquiries, and studio analytics metrics are all managed dynamically from the backend.
  - *Why*: Lets the studio owner effortlessly replace or upload portfolio images in the backend CMS while ensuring visitor bookings, reviews, and inquiries persist across sessions.

---

### 4. Technical Architecture & Data Strategy *(Technical Reference)*

- **Architecture & Component Diagram**:

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                     Persistent Express Backend (server.ts)                   │
│  ┌────────────────┐  ┌───────────────┐  ┌───────────────┐  ┌──────────────┐  │
│  │ /api/portfolio │  │ /api/bookings │  │ /api/reviews  │  │ /api/inquire │  │
│  │ & /api/plates  │  │ & /api/stages │  │ & /api/blog   │  │ & /analytics │  │
│  └───────┬────────┘  └───────┬───────┘  └───────┬───────┘  └──────┬───────┘  │
└──────────┼───────────────────┼──────────────────┼─────────────────┼──────────┘
           │                   │                  │                 │
           ▼                   ▼                  ▼                 ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                Multi-Page Studio State & Currency Store (INR / USD)          │
└──────────┬───────────────────────────────────────────────────────────────────┘
           │
           ├──► [Page 1: Home] ────────► Full-Viewport Parallax Portfolio Chapters
           │                             + Scroll Progress Rail + "Let's Create" Finale
           │
           ├──► [Page 2: Exhibitions] ─► Filterable Bento Archive + 200% Optical Lightbox
           │
           ├──► [Page 3: Services] ────► 4 Core Disciplines + Production Workflow Timeline
           │
           ├──► [Page 4: Packages] ────► Starter / Standard / Premium Tiers (INR ₹ & USD $)
           │                             + Optional Retouching/Hosting Add-ons
           │
           ├──► [Page 5: Stages] ──────► Stage A / B / C Blueprints, Power & Strobe Specs
           │
           ├──► [Page 6: Journal] ─────► Editorial Photography Blog + Full Article Reader
           │
           ├──► [Page 7: Reviews] ─────► Verified Client Testimonials + Submit Review Form
           │
           ├──► [Page 8: Booking] ─────► Live Date/Slot Scheduler + Call-Sheet Generator
           │
           └──► [Page 9: Contact] ─────► Concierge Inquiry Form + WhatsApp/Call Triggers
                                         + Studio Locations + Backend CMS & Analytics Modal
```

- **Data Model & State**:
  - `PortfolioItem`: Plate number, title, subtitle, category, client, year, aspect ratio, bento span, image URL, EXIF telemetry, and curator notes.
  - `PackageTier`: Starter, Standard (Most Popular), and Premium tiers with dual pricing (`priceInrRange`, `priceUsd`, `basePriceInr`, `basePriceUsd`), deliverables list, and add-ons.
  - `JournalArticle`: Slug, title, category, read time, publication date, lead excerpt, full markdown/editorial body, and cover plate.
  - `ClientReview`: Client name, role, brand/company, rating, discipline category, project date, verified outcome quote, and campaign metric.
  - `StudioInquiry`: Name, email, phone/WhatsApp, preferred keyword/service, budget currency & tier, message, and timestamp.
- **Interactive Component & State Mapping**:
  - **Home Scroll Engine**: Tracks scroll progress across each full-screen portfolio plate, animating frame scale, parallax offset, and EXIF counter transitions, culminating in the magnetic bottom CTA that routes directly to `#booking` or `#contact` with pre-filled context.
  - **Currency Switcher (`INR ₹` / `USD $`)**: Globally toggles package rates, add-on prices, and booking estimates between Indian Rupees and US Dollars.
  - **Backend Studio CMS & Analytics**: Accessible from the Contact/Admin header action, allowing real-time image URL updates, local file uploads, booking status changes, and live inspection of conversion/inquiry analytics.
