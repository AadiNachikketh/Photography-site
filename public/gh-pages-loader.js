/**
 * Atelier Vance — Zero-Build GitHub Pages Runtime Loader
 * Compiles and mounts ./src/main.tsx directly in the browser when GitHub Pages
 * deploys the repository root branch without a Node/Vite build step.
 */
window.__bootstrapAtelierVanceGitHubPages = async function bootstrapAtelierVanceOnGitHubPages() {
  if (window.__ATELIER_VANCE_BOOTSTRAPPED__) return;
  window.__ATELIER_VANCE_BOOTSTRAPPED__ = true;

  const rootEl = document.getElementById('root');
  if (rootEl && !rootEl.innerHTML.trim()) {
    rootEl.innerHTML = `
      <div style="min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#070708;color:#F4F4F0;font-family:'Plus Jakarta Sans',sans-serif;padding:24px;text-align:center;">
        <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.2em;color:#E5A93C;margin-bottom:12px;">ATELIER VANCE · MEDIUM FORMAT ARCHIVE</div>
        <div style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:28px;color:#F4F4F0;margin-bottom:16px;">Calibrating 16-Bit Optical Plates…</div>
        <div style="width:180px;height:2px;background:#1F1F23;overflow:hidden;border-radius:2px;">
          <div style="width:65%;height:100%;background:#E5A93C;"></div>
        </div>
      </div>
    `;
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.async = true;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  try {
    await Promise.all([
      loadScript('https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4'),
      loadScript('https://cdn.jsdelivr.net/npm/@babel/standalone@7.26.9/babel.min.js'),
      (async () => {
        if (window.__ATELIER_VANCE_EMBEDDED_PHOTOS__) return;
        try {
          await loadScript('./public/studio-photos-cache.js');
        } catch {
          try {
            await loadScript('./studio-photos-cache.js');
          } catch {
            // Will fall back to direct ./public/assets/aistudio/ paths
          }
        }
      })(),
    ]);

    const MODULE_GRAPH = [
      'src/types/studio.ts',
      'src/data/embeddedStudioPhotos.ts',
      'src/data/studioFallbackData.ts',
      'src/components/ResilientPlateImage.tsx',
      'src/components/HomePortfolioScrollPage.tsx',
      'src/components/ExhibitionsPage.tsx',
      'src/components/ServicesPage.tsx',
      'src/components/PackagesPage.tsx',
      'src/components/StagesPage.tsx',
      'src/components/JournalPage.tsx',
      'src/components/ReviewsPage.tsx',
      'src/components/BookingSection.tsx',
      'src/components/ContactPage.tsx',
      'src/components/LightboxModal.tsx',
      'src/components/BackendStudioDrawer.tsx',
      'src/App.tsx',
      'src/main.tsx',
    ];

    const EXTERNAL_IMPORTS = {
      react: 'https://esm.sh/react@19.0.0',
      'react-dom': 'https://esm.sh/react-dom@19.0.0',
      'react-dom/client': 'https://esm.sh/react-dom@19.0.0/client',
      'react/jsx-runtime': 'https://esm.sh/react@19.0.0/jsx-runtime',
      'lucide-react': 'https://esm.sh/lucide-react@0.475.0?deps=react@19.0.0',
      'motion/react': 'https://esm.sh/motion@12.4.7/react?deps=react@19.0.0,react-dom@19.0.0',
    };

    const rawSources = {};
    const cacheBust = Date.now();
    await Promise.all(
      MODULE_GRAPH.map(async (relPath) => {
        const res = await fetch(`./${relPath}?v=${cacheBust}`, { cache: 'no-store' });
        if (!res.ok) {
          throw new Error(`Failed to fetch ./${relPath} (${res.status})`);
        }
        rawSources[relPath] = await res.text();
      })
    );

    function normalizePath(baseFile, spec) {
      const baseParts = baseFile.split('/');
      baseParts.pop();
      const specParts = spec.split('/');
      for (const part of specParts) {
        if (part === '.' || part === '') continue;
        if (part === '..') baseParts.pop();
        else baseParts.push(part);
      }
      const joined = baseParts.join('/');
      const candidates = [joined, `${joined}.tsx`, `${joined}.ts`];
      for (const c of candidates) {
        if (rawSources[c] !== undefined) return c;
      }
      return joined;
    }

    const blobUrls = {};

    for (const modPath of MODULE_GRAPH) {
      let source = rawSources[modPath];
      source = source.replace(/import\s+['"][^'"]*\.css['"]\s*;?/g, '');

      const transpiled =
        window.Babel.transform(source, {
          filename: modPath,
          presets: [
            ['react', { runtime: 'classic' }],
            ['typescript', { isTSX: modPath.endsWith('.tsx'), allExtensions: true }],
          ],
        }).code || 'export {};';

      const rewritten = transpiled.replace(
        /(from\s+|import\s*\(\s*|import\s+)(['"])([^'"]+)\2/g,
        (fullMatch, prefix, quote, specifier) => {
          if (EXTERNAL_IMPORTS[specifier]) {
            return `${prefix}${quote}${EXTERNAL_IMPORTS[specifier]}${quote}`;
          }
          if (specifier.startsWith('.')) {
            const targetMod = normalizePath(modPath, specifier);
            if (blobUrls[targetMod]) {
              return `${prefix}${quote}${blobUrls[targetMod]}${quote}`;
            }
          }
          return fullMatch;
        }
      );

      const blob = new Blob([rewritten], { type: 'application/javascript' });
      blobUrls[modPath] = URL.createObjectURL(blob);
    }

    await import(blobUrls['src/main.tsx']);
  } catch (err) {
    console.error('Atelier Vance GitHub Pages Bootstrap Error:', err);
    if (rootEl) {
      rootEl.innerHTML = `
        <div style="min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#070708;color:#F4F4F0;font-family:sans-serif;padding:24px;text-align:center;">
          <h1 style="font-size:20px;margin-bottom:8px;color:#E5A93C;">Atelier Vance Studio Loader</h1>
          <p style="font-size:13px;color:#9F9FA9;max-width:480px;">${String(err && err.message ? err.message : err)}</p>
        </div>
      `;
    }
  }
};

if (
  window.location.hostname.indexOf('github.io') !== -1 &&
  !document.querySelector('script[src*="atelier-vance.js"]')
) {
  window.__bootstrapAtelierVanceGitHubPages();
}
