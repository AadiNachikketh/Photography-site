import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import type {
  BookingRecord,
  ClientReview,
  PortfolioItem,
  StudioInquiry,
} from './src/types/studio.ts';
import {
  DEFAULT_STUDIO_DATABASE,
  INITIAL_ADDONS,
  INITIAL_BOOKINGS,
  INITIAL_INQUIRIES,
  INITIAL_JOURNAL,
  INITIAL_PACKAGES,
  INITIAL_PORTFOLIO,
  INITIAL_REVIEWS,
  INITIAL_STAGES,
  renderPhotographicPlateSvg,
  type StudioDatabase,
} from './src/data/studioFallbackData.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const DB_PATH = path.join(DATA_DIR, 'studio-db.json');

function ensureDatabase(): StudioDatabase {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  const defaultDb: StudioDatabase = {
    portfolio: INITIAL_PORTFOLIO,
    stages: INITIAL_STAGES,
    packages: INITIAL_PACKAGES,
    addons: INITIAL_ADDONS,
    bookings: INITIAL_BOOKINGS,
    journal: INITIAL_JOURNAL,
    reviews: INITIAL_REVIEWS,
    inquiries: INITIAL_INQUIRIES,
  };

  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify(defaultDb, null, 2), 'utf-8');
    return defaultDb;
  }
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    const parsed = JSON.parse(raw) as Partial<StudioDatabase>;

    const hasLegacySvg =
      parsed.portfolio?.some(
        (p) => p.imageUrl?.includes('/api/plates/') || p.imageUrl?.endsWith('.svg')
      ) ||
      parsed.stages?.some(
        (s) => s.previewImageUrl?.includes('/api/plates/') || s.previewImageUrl?.endsWith('.svg')
      ) ||
      parsed.journal?.some(
        (j) => j.coverImageUrl?.includes('/api/plates/') || j.coverImageUrl?.endsWith('.svg')
      );

    if (hasLegacySvg) {
      fs.writeFileSync(DB_PATH, JSON.stringify(defaultDb, null, 2), 'utf-8');
      return defaultDb;
    }

    const merged: StudioDatabase = {
      portfolio: parsed.portfolio?.length ? parsed.portfolio : INITIAL_PORTFOLIO,
      stages: parsed.stages?.length ? parsed.stages : INITIAL_STAGES,
      packages: parsed.packages?.length ? parsed.packages : INITIAL_PACKAGES,
      addons: parsed.addons?.length ? parsed.addons : INITIAL_ADDONS,
      bookings: parsed.bookings?.length ? parsed.bookings : INITIAL_BOOKINGS,
      journal: parsed.journal?.length ? parsed.journal : INITIAL_JOURNAL,
      reviews: parsed.reviews?.length ? parsed.reviews : INITIAL_REVIEWS,
      inquiries: parsed.inquiries?.length ? parsed.inquiries : INITIAL_INQUIRIES,
    };
    return merged;
  } catch {
    fs.writeFileSync(DB_PATH, JSON.stringify(defaultDb, null, 2), 'utf-8');
    return defaultDb;
  }
}

function saveDatabase(db: StudioDatabase): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '15mb' }));
  app.use('/public', express.static(path.join(__dirname, 'public')));

  ensureDatabase();

  // High-resolution procedural studio plate endpoint
  app.get('/api/plates/:plateSlug', (req, res) => {
    const svg = renderPhotographicPlateSvg(req.params.plateSlug);
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(svg);
  });

  // GET full studio dataset
  app.get('/api/studio-data', (_req, res) => {
    const db = ensureDatabase();
    res.json(db);
  });

  // GET portfolio items
  app.get('/api/portfolio', (_req, res) => {
    const db = ensureDatabase();
    res.json(db.portfolio);
  });

  // POST new portfolio item (Backend CMS)
  app.post('/api/portfolio', (req, res) => {
    const db = ensureDatabase();
    const body = req.body as Partial<PortfolioItem>;

    if (!body.title || !body.imageUrl) {
      res.status(400).json({ error: 'Title and Image URL (or uploaded file) are required.' });
      return;
    }

    const nextIndex = db.portfolio.length + 1;
    const newItem: PortfolioItem = {
      id: `plate-${Date.now()}`,
      plateNumber: body.plateNumber || `PLATE ${String(nextIndex).padStart(2, '0')}`,
      title: body.title,
      subtitle: body.subtitle || 'Commissioned Studio Plate',
      category: body.category || 'Editorial & Fashion',
      client: body.client || 'Private Commission',
      location: body.location || 'Stage A · North Daylight Loft',
      year: body.year || '2026',
      aspectRatio: body.aspectRatio || '4:3',
      bentoSpan: body.bentoSpan || '1x1',
      imageUrl: body.imageUrl,
      featuredInHero: Boolean(body.featuredInHero),
      curatorNote:
        body.curatorNote ||
        'Captured in-studio on calibrated 16-bit medium format digital back with custom strobe diffusion.',
      exif: {
        camera: body.exif?.camera || 'Hasselblad H6D-100c',
        lens: body.exif?.lens || 'HC 80mm f/2.8',
        focalLength: body.exif?.focalLength || '80mm',
        aperture: body.exif?.aperture || 'f/5.6',
        shutterSpeed: body.exif?.shutterSpeed || '1/160s',
        iso: body.exif?.iso || 'ISO 64',
        lightingSetup: body.exif?.lightingSetup || 'Profoto Pro-11 Key + Scrim Fill',
        colorProfile: body.exif?.colorProfile || '16-Bit HNCS Master',
      },
      dominantTone: body.dominantTone || '#18181B',
    };

    if (newItem.featuredInHero) {
      db.portfolio = db.portfolio.map((item) => ({ ...item, featuredInHero: false }));
    }

    db.portfolio.unshift(newItem);
    saveDatabase(db);
    res.status(201).json(newItem);
  });

  // PUT update portfolio item
  app.put('/api/portfolio/:id', (req, res) => {
    const db = ensureDatabase();
    const { id } = req.params;
    const updates = req.body as Partial<PortfolioItem>;

    const idx = db.portfolio.findIndex((item) => item.id === id);
    if (idx === -1) {
      res.status(404).json({ error: 'Portfolio plate not found.' });
      return;
    }

    if (updates.featuredInHero) {
      db.portfolio = db.portfolio.map((item) => ({ ...item, featuredInHero: false }));
    }

    const existing = db.portfolio[idx];
    const updated: PortfolioItem = {
      ...existing,
      ...updates,
      exif: {
        ...existing.exif,
        ...(updates.exif || {}),
      },
    };

    db.portfolio[idx] = updated;
    saveDatabase(db);
    res.json(updated);
  });

  // DELETE portfolio item
  app.delete('/api/portfolio/:id', (req, res) => {
    const db = ensureDatabase();
    const { id } = req.params;
    const filtered = db.portfolio.filter((item) => item.id !== id);
    if (filtered.length === db.portfolio.length) {
      res.status(404).json({ error: 'Portfolio plate not found.' });
      return;
    }
    db.portfolio = filtered;
    saveDatabase(db);
    res.json({ success: true, portfolio: db.portfolio });
  });

  // GET bookings
  app.get('/api/bookings', (_req, res) => {
    const db = ensureDatabase();
    res.json(db.bookings);
  });

  // POST new client booking
  app.post('/api/bookings', (req, res) => {
    const db = ensureDatabase();
    const body = req.body as Partial<BookingRecord>;

    if (!body.clientName || !body.clientEmail || !body.date || !body.packageOrStageId) {
      res.status(400).json({ error: 'Client name, email, date, and selected package/stage are required.' });
      return;
    }

    const conflicting = db.bookings.find(
      (b) =>
        b.date === body.date &&
        b.status !== 'Completed' &&
        (b.timeSlot === body.timeSlot ||
          b.timeSlot === 'Full Day (08:00 – 18:00)' ||
          body.timeSlot === 'Full Day (08:00 – 18:00)')
    );

    if (conflicting) {
      res.status(409).json({
        error: `Selected date (${body.date}) already has an active production hold (${conflicting.timeSlot}). Please choose another date or time slot.`,
      });
      return;
    }

    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const newBooking: BookingRecord = {
      id: `bk-${Date.now()}`,
      referenceCode: `AV-2026-${randomCode}`,
      createdAt: new Date().toISOString(),
      bookingType: body.bookingType || 'Commissioned Production',
      packageOrStageId: body.packageOrStageId,
      packageOrStageName: body.packageOrStageName || 'STANDARD — Commercial Campaign & Brand Suite',
      category: body.category || 'Editorial & Fashion',
      date: body.date,
      timeSlot: body.timeSlot || 'Full Day (08:00 – 18:00)',
      addons: body.addons || [],
      estimatedTotal: Number(body.estimatedTotal) || 3200,
      currency: body.currency || 'INR',
      clientName: body.clientName,
      clientEmail: body.clientEmail,
      clientOrganization: body.clientOrganization || 'Independent Commission',
      projectBrief: body.projectBrief || '',
      aspectRatioPreference: body.aspectRatioPreference || '4:3 Editorial Standard',
      status: 'Confirmed',
    };

    db.bookings.unshift(newBooking);
    saveDatabase(db);
    res.status(201).json(newBooking);
  });

  // PATCH booking status
  app.patch('/api/bookings/:id', (req, res) => {
    const db = ensureDatabase();
    const { id } = req.params;
    const { status } = req.body as { status?: BookingRecord['status'] };

    const booking = db.bookings.find((b) => b.id === id);
    if (!booking || !status) {
      res.status(404).json({ error: 'Booking not found or status missing.' });
      return;
    }

    booking.status = status;
    saveDatabase(db);
    res.json(booking);
  });

  // POST new client review
  app.post('/api/reviews', (req, res) => {
    const db = ensureDatabase();
    const body = req.body as Partial<ClientReview>;

    if (!body.clientName || !body.quote) {
      res.status(400).json({ error: 'Client name and review quote are required.' });
      return;
    }

    const newReview: ClientReview = {
      id: `rev-${Date.now()}`,
      clientName: body.clientName,
      role: body.role || 'Creative Producer',
      organization: body.organization || 'Commissioning Partner',
      category: body.category || 'Editorial & Fashion',
      rating: Number(body.rating) || 5,
      date: 'October 2026',
      projectTitle: body.projectTitle || 'Studio Production Commission',
      metricHighlight: body.metricHighlight || '100MP 16-bit archival delivery on schedule',
      quote: body.quote,
    };

    db.reviews.unshift(newReview);
    saveDatabase(db);
    res.status(201).json(newReview);
  });

  // POST new contact inquiry
  app.post('/api/inquiries', (req, res) => {
    const db = ensureDatabase();
    const body = req.body as Partial<StudioInquiry>;

    if (!body.name || !body.email || !body.message) {
      res.status(400).json({ error: 'Name, email, and message are required.' });
      return;
    }

    const newInquiry: StudioInquiry = {
      id: `inq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      name: body.name,
      email: body.email,
      phone: body.phone || '',
      company: body.company || 'Private Inquiry',
      keywordIntent: body.keywordIntent || 'LET’S CREATE TOGETHER',
      preferredTier: body.preferredTier || 'STANDARD — Commercial Campaign & Brand Suite',
      message: body.message,
      status: 'New',
    };

    db.inquiries.unshift(newInquiry);
    saveDatabase(db);
    res.status(201).json(newInquiry);
  });

  // POST reset default portfolio & demo data
  app.post('/api/reset-demo', (_req, res) => {
    saveDatabase(DEFAULT_STUDIO_DATABASE);
    res.json(DEFAULT_STUDIO_DATABASE);
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        if (e instanceof Error) {
          vite.ssrFixStacktrace(e);
        }
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Atelier Vance 9-Page Studio Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
