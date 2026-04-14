import { Page } from '@playwright/test';
import lighthouse from 'lighthouse';

export interface LighthouseResult {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  pwa: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  totalBlockingTime: number;
  speedIndex: number;
  interactive: number;
}

export async function runLighthouse(page: Page, url: string): Promise<LighthouseResult> {
  const baseURL = process.env.BASE_URL || 'http://localhost:3000';
  const fullUrl = url.startsWith('http') ? url : `${baseURL}${url}`;
  
  await page.goto(fullUrl, { waitUntil: 'networkidle' });
  
  const { lhr } = await lighthouse(fullUrl, {
    port: new URL(baseURL).port || 3000,
    output: 'json',
    logLevel: 'error',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo', 'pwa'],
  });

  return {
    performance: (lhr.categories.performance?.score || 0) * 100,
    accessibility: (lhr.categories.accessibility?.score || 0) * 100,
    bestPractices: (lhr.categories['best-practices']?.score || 0) * 100,
    seo: (lhr.categories.seo?.score || 0) * 100,
    pwa: (lhr.categories.pwa?.score || 0) * 100,
    firstContentfulPaint: lhr.audits['first-contentful-paint']?.numericValue || 0,
    largestContentfulPaint: lhr.audits['largest-contentful-paint']?.numericValue || 0,
    cumulativeLayoutShift: lhr.audits['cumulative-layout-shift']?.numericValue || 0,
    totalBlockingTime: lhr.audits['total-blocking-time']?.numericValue || 0,
    speedIndex: lhr.audits['speed-index']?.numericValue || 0,
    interactive: lhr.audits['interactive']?.numericValue || 0,
  };
}

export function logLighthouseResults(result: LighthouseResult): void {
  console.log('\n📊 Lighthouse Performance Results:');
  console.log(`   Performance: ${result.performance.toFixed(0)}/100`);
  console.log(`   Accessibility: ${result.accessibility.toFixed(0)}/100`);
  console.log(`   Best Practices: ${result.bestPractices.toFixed(0)}/100`);
  console.log(`   SEO: ${result.seo.toFixed(0)}/100`);
  console.log(`   PWA: ${result.pwa.toFixed(0)}/100`);
  console.log('\n⏱️ Core Web Vitals:');
  console.log(`   First Contentful Paint: ${(result.firstContentfulPaint / 1000).toFixed(2)}s`);
  console.log(`   Largest Contentful Paint: ${(result.largestContentfulPaint / 1000).toFixed(2)}s`);
  console.log(`   Cumulative Layout Shift: ${result.cumulativeLayoutShift.toFixed(3)}`);
  console.log(`   Total Blocking Time: ${result.totalBlockingTime.toFixed(0)}ms`);
  console.log(`   Speed Index: ${(result.speedIndex / 1000).toFixed(2)}s`);
  console.log(`   Time to Interactive: ${(result.interactive / 1000).toFixed(2)}s`);
}
