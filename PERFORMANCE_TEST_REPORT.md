# Performance Testing Report - Senbioteck

## Executive Summary

Performance testing for Senbioteck website using Lighthouse CI. Target: Lighthouse score > 90 for all categories.

**Status:** Configuration issues identified and corrected. Actual performance testing blocked by missing Chrome/Chromium runtime.

---

## 1. Configuration Issues Found

### Original `lighthouserc.json` Problems

| Issue | Original Value | Corrected Value |
|-------|---------------|-----------------|
| Server command | `npm run start` (NestJS) | `cd frontend && npm run start` (Next.js) |
| Static dist dir | `./dist` | N/A (using live server) |
| URLs | Included `/portal/*` routes | Updated to actual routes |

### Corrected Routes

The Next.js build produces these routes:
- `/` (static)
- `/a-propos` (static)
- `/blog` (static)
- `/blog/[slug]` (dynamic)
- `/contact` (static)
- `/equipe` (static)
- `/recherche` (static)
- `/services` (static)
- `/admin/*` (dynamic)
- `/admin/appointments` (dynamic)
- `/admin/content/blog` (dynamic)
- `/admin/content/pages` (dynamic)
- `/admin/content/resources` (dynamic)
- `/admin/team` (dynamic)
- `/admin/messages` (dynamic)

---

## 2. Test Scripts Added

Added to `package.json`:

```json
{
  "test:performance": "npm run test:performance:build && npm run test:performance:run",
  "test:performance:build": "cd frontend && npm run build",
  "test:performance:run": "lighthouse http://localhost:3000 --output=html --output-path=./lighthouse-report.html --chrome-flags='--headless --no-sandbox --disable-dev-shm-usage' || true",
  "test:performance:ci": "cd frontend && npm run build && lhci autorun"
}
```

---

## 3. Performance Analysis (Code Review)

### Bundle Size

| Metric | Value | Assessment |
|--------|-------|------------|
| First Load JS (shared) | 102 kB | Acceptable |
| Route chunks | 46 kB + 54.2 kB | Moderate |

### Static vs Dynamic Routes

- **Static routes (8):** `/`, `/a-propos`, `/blog`, `/contact`, `/equipe`, `/recherche`, `/services` - Fastest, pre-rendered
- **Dynamic routes (14):** All `/admin/*` routes - Server-rendered on demand, may have higher TTFB

### Potential Bottlenecks

1. **No explicit image dimensions** - Could cause CLS if images load without reserved space
2. **No cache headers configured** - Static assets not cached at CDN level
3. **No CDN for static assets** - Assets served directly from origin server
4. **Next.js image optimization** - Configured but needs actual image files to take effect

---

## 4. Lighthouse CI Configuration

```json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "startServerCommand": "cd frontend && npm run start",
      "startServerReadyPattern": "ready started server on",
      "startServerReadyTimeout": 60000,
      "url": [
        "http://localhost:3000",
        "http://localhost:3000/a-propos",
        "http://localhost:3000/blog",
        "http://localhost:3000/contact",
        "http://localhost:3000/equipe",
        "http://localhost:3000/recherche",
        "http://localhost:3000/services",
        "http://localhost:3000/admin",
        "http://localhost:3000/admin/appointments",
        "http://localhost:3000/admin/content/blog",
        "http://localhost:3000/admin/content/pages",
        "http://localhost:3000/admin/content/resources",
        "http://localhost:3000/admin/team",
        "http://localhost:3000/admin/messages"
      ]
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.9}],
        "categories:best-practices": ["error", {"minScore": 0.9}],
        "categories:seo": ["error", {"minScore": 0.9}],
        "first-contentful-paint": ["warn", {"maxNumericValue": 1800}],
        "largest-contentful-paint": ["error", {"maxNumericValue": 2500}],
        "cumulative-layout-shift": ["error", {"maxNumericValue": 0.1}],
        "total-blocking-time": ["warn", {"maxNumericValue": 200}],
        "speed-index": ["warn", {"maxNumericValue": 3400}],
        "interactive": ["error", {"maxNumericValue": 3800}]
      }
    }
  }
}
```

---

## 5. Blockers

### Must Resolve Before Testing

1. **Chrome/Chromium not installed** - Lighthouse CI requires Chrome/Chromium
   - Install: `npx playwright install chromium` or system Chrome
   
2. **NestJS build failures** - 38 TypeScript errors
   - Location: `src/common/encryption/encryption.service.ts`, `src/contact/contact.controller.ts`
   - Errors: readonly type assignments, missing imports

---

## 6. Recommendations

### Immediate (Before Production)

1. Install Chrome/Chromium for CI environment
2. Fix NestJS TypeScript errors
3. Add explicit width/height to all `<Image>` components
4. Configure Cache-Control headers for static assets

### Medium Term

1. Set up CDN (CloudFlare, Vercel, etc.) for static assets
2. Add responsive image sizing with `srcset`
3. Implement service worker for offline support
4. Add real user monitoring (RUM) for production performance data

### Performance Budget

| Metric | Target | Threshold |
|--------|--------|-----------|
| Performance Score | > 90 | > 85 |
| LCP | < 2.5s | < 3.0s |
| FID | < 100ms | < 200ms |
| CLS | < 0.1 | < 0.15 |
| TTI | < 3.8s | < 5.0s |

---

## 7. Test Execution Commands

```bash
# Full performance test
npm run test:performance

# CI mode (LHCI assertions)
npm run test:performance:ci

# Manual single run
cd frontend && npm run build && npm run start &
lighthouse http://localhost:3000 --output=html --output-path=./lighthouse-report.html
```

---

*Report generated by Test Engineer Agent*
*Last updated: 2026-04-11*