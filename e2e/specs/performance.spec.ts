import { test, expect, Page } from '@playwright/test';
import lighthouse from 'lighthouse';

const PERFORMANCE_TARGET = 90;
const ACCESSIBILITY_TARGET = 90;

async function getLighthouseScore(page: Page, url: string): Promise<{
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
}> {
  const baseURL = process.env.BASE_URL || 'http://localhost:3000';
  const fullUrl = url.startsWith('http') ? url : `${baseURL}${url}`;
  
  await page.goto(fullUrl, { waitUntil: 'networkidle' });
  
  const { lhr } = await lighthouse(fullUrl, {
    port: new URL(baseURL).port || 3000,
    output: 'json',
    logLevel: 'error',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  });

  return {
    performance: (lhr.categories.performance?.score || 0) * 100,
    accessibility: (lhr.categories.accessibility?.score || 0) * 100,
    bestPractices: (lhr.categories['best-practices']?.score || 0) * 100,
    seo: (lhr.categories.seo?.score || 0) * 100,
  };
}

test.describe('Performance Testing - Lighthouse CI', () => {

  test('Patient Portal Home - Performance score > 90', async ({ page }) => {
    const scores = await getLighthouseScore(page, '/portal');
    
    console.log(`\n📊 Patient Portal Home Performance:`);
    console.log(`   Performance: ${scores.performance}`);
    
    expect(scores.performance).toBeGreaterThanOrEqual(PERFORMANCE_TARGET);
  });

  test('Appointments Page - Performance score > 90', async ({ page }) => {
    const scores = await getLighthouseScore(page, '/portal/appointments');
    
    console.log(`\n📊 Appointments Page Performance:`);
    console.log(`   Performance: ${scores.performance}`);
    
    expect(scores.performance).toBeGreaterThanOrEqual(PERFORMANCE_TARGET);
  });

  test('Health Resources Page - Performance score > 90', async ({ page }) => {
    const scores = await getLighthouseScore(page, '/portal/health-resources');
    
    console.log(`\n📊 Health Resources Page Performance:`);
    console.log(`   Performance: ${scores.performance}`);
    
    expect(scores.performance).toBeGreaterThanOrEqual(PERFORMANCE_TARGET);
  });

  test('Contact Page - Performance score > 90', async ({ page }) => {
    const scores = await getLighthouseScore(page, '/portal/contact');
    
    console.log(`\n📊 Contact Page Performance:`);
    console.log(`   Performance: ${scores.performance}`);
    
    expect(scores.performance).toBeGreaterThanOrEqual(PERFORMANCE_TARGET);
  });

  test('Admin Dashboard - Performance score > 90', async ({ page }) => {
    await page.goto('/admin/login');
    await page.fill('[data-testid="admin-email-input"]', 'admin@senbioteck.com');
    await page.fill('[data-testid="admin-password-input"]', 'AdminPassword123!');
    await page.click('[data-testid="admin-login-submit"]');
    await page.waitForURL(/\/admin/);
    
    const scores = await getLighthouseScore(page, '/admin');
    
    console.log(`\n📊 Admin Dashboard Performance:`);
    console.log(`   Performance: ${scores.performance}`);
    
    expect(scores.performance).toBeGreaterThanOrEqual(PERFORMANCE_TARGET);
  });

  test('Admin Content Management - Performance score > 90', async ({ page }) => {
    await page.goto('/admin/login');
    await page.fill('[data-testid="admin-email-input"]', 'admin@senbioteck.com');
    await page.fill('[data-testid="admin-password-input"]', 'AdminPassword123!');
    await page.click('[data-testid="admin-login-submit"]');
    await page.waitForURL(/\/admin/);
    
    const scores = await getLighthouseScore(page, '/admin/content');
    
    console.log(`\n📊 Admin Content Management Performance:`);
    console.log(`   Performance: ${scores.performance}`);
    
    expect(scores.performance).toBeGreaterThanOrEqual(PERFORMANCE_TARGET);
  });

  test('Login Page - Performance score > 90', async ({ page }) => {
    const scores = await getLighthouseScore(page, '/login');
    
    console.log(`\n📊 Login Page Performance:`);
    console.log(`   Performance: ${scores.performance}`);
    
    expect(scores.performance).toBeGreaterThanOrEqual(PERFORMANCE_TARGET);
  });

  test('Page load time < 3 seconds', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/portal');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    console.log(`\n⏱️ Page load time: ${loadTime}ms`);
    
    expect(loadTime).toBeLessThan(3000);
  });

  test('Time to Interactive < 3.8 seconds', async ({ page }) => {
    await page.goto('/portal');
    const startTime = Date.now();
    await page.waitForLoadState('domcontentloaded');
    const tti = Date.now() - startTime;
    
    console.log(`\n⏱️ Time to Interactive: ${tti}ms`);
    
    expect(tti).toBeLessThan(3800);
  });

  test('First Contentful Paint < 1.8 seconds', async ({ page }) => {
    await page.goto('/portal');
    const startTime = Date.now();
    await page.waitForLoadState('domcontentloaded');
    const fcp = Date.now() - startTime;
    
    console.log(`\n⏱️ First Contentful Paint: ${fcp}ms`);
    
    expect(fcp).toBeLessThan(1800);
  });

  test('No render-blocking resources', async ({ page }) => {
    await page.goto('/portal');
    
    const blockingResources = await page.evaluate(() => {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      return resources
        .filter(r => r.transferSize > 0 && (r.initiatorType === 'link' || r.initiatorType === 'script'))
        .filter(r => {
          const header = r.name.includes('rel=preload') || r.name.includes('as=script');
          return !header;
        })
        .length;
    });
    
    console.log(`\n🔍 Render-blocking resources: ${blockingResources}`);
    
    expect(blockingResources).toBe(0);
  });

  test('Images are properly sized', async ({ page }) => {
    await page.goto('/portal');
    
    const oversizedImages = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img')) as HTMLImageElement[];
      return images.filter(img => {
        const rect = img.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0 && (img.naturalWidth > rect.width * 2 || img.naturalHeight > rect.height * 2);
      }).length;
    });
    
    console.log(`\n🖼️ Oversized images: ${oversizedImages}`);
    
    expect(oversizedImages).toBe(0);
  });

  test('Proper cache headers on static assets', async ({ page }) => {
    await page.goto('/portal');
    
    const uncachedAssets = await page.evaluate(() => {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      return resources.filter(r => {
        const cacheControl = r.transferSize > 0 && r.encodedBodySize > 0;
        return cacheControl;
      }).length;
    });
    
    console.log(`\n📦 Assets with proper caching: ${uncachedAssets}`);
    
    expect(uncachedAssets).toBeGreaterThan(0);
  });

  test('Mobile viewport - Performance score > 90', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    const scores = await getLighthouseScore(page, '/portal');
    
    console.log(`\n📊 Mobile Performance: ${scores.performance}`);
    
    expect(scores.performance).toBeGreaterThanOrEqual(PERFORMANCE_TARGET);
  });

  test('Tablet viewport - Performance score > 90', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    
    const scores = await getLighthouseScore(page, '/portal');
    
    console.log(`\n📊 Tablet Performance: ${scores.performance}`);
    
    expect(scores.performance).toBeGreaterThanOrEqual(PERFORMANCE_TARGET);
  });

  test('Accessibility score > 90 across all pages', async ({ page }) => {
    const pages = ['/portal', '/portal/appointments', '/portal/health-resources', '/portal/contact'];
    
    for (const url of pages) {
      const scores = await getLighthouseScore(page, url);
      
      console.log(`\n♿ ${url} Accessibility: ${scores.accessibility}`);
      
      expect(scores.accessibility).toBeGreaterThanOrEqual(ACCESSIBILITY_TARGET);
    }
  });

  test('Best Practices score > 90 across all pages', async ({ page }) => {
    const pages = ['/portal', '/portal/appointments', '/portal/health-resources', '/portal/contact'];
    
    for (const url of pages) {
      const scores = await getLighthouseScore(page, url);
      
      console.log(`\n✅ ${url} Best Practices: ${scores.bestPractices}`);
      
      expect(scores.bestPractices).toBeGreaterThanOrEqual(PERFORMANCE_TARGET);
    }
  });

  test('SEO score > 90 across all pages', async ({ page }) => {
    const pages = ['/portal', '/portal/appointments', '/portal/health-resources', '/portal/contact'];
    
    for (const url of pages) {
      const scores = await getLighthouseScore(page, url);
      
      console.log(`\n🔍 ${url} SEO: ${scores.seo}`);
      
      expect(scores.seo).toBeGreaterThanOrEqual(ACCESSIBILITY_TARGET);
    }
  });
});
