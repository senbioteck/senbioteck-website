import { test, expect, Page, Locator } from '@playwright/test';

export type AccessibilityFixtures = {
  injectAxe: () => Promise<void>;
  getViolations: () => Promise<any[]>;
};

export const a11yTest = test.extend<AccessibilityFixtures>({
  injectAxe: async ({ page }, use) => {
    await page.goto('/');
    await page.evaluate(() => {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.9.0/axe.min.js';
      script.integrity = 'sha512-U70Cr8Nq8P9cd3zVUtl STJcS2vZ45F0OTSCLjZLJ4xL9F6hM4zLtEfERjKVetjXVFjUo0XgM4NU6syxY';
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    });
    await page.waitForTimeout(1000);
    await use();
  },

  getViolations: async ({ page }, use) => {
    const getViolations = async () => {
      return await page.evaluate(async () => {
        // @ts-ignore
        if (typeof axe === 'undefined') {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.9.0/axe.min.js';
          document.head.appendChild(script);
          await new Promise(resolve => script.onload = resolve);
        }
        // @ts-ignore
        return await axe.run();
      });
    };
    await use(getViolations);
  },
});

export async function checkAccessibility(page: Page, url: string): Promise<any> {
  await page.goto(url);
  await page.waitForLoadState('networkidle');
  
  return await page.evaluate(async () => {
    // @ts-ignore
    if (typeof axe === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.9.0/axe.min.js';
      document.head.appendChild(script);
      await new Promise(resolve => script.onload = resolve);
    }
    // @ts-ignore
    return await axe.run();
  });
}

export async function logViolations(violations: any[]): Promise<void> {
  if (violations.length > 0) {
    console.log(`\n🚨 Found ${violations.length} accessibility violations:`);
    violations.forEach((v, i) => {
      console.log(`\n${i + 1}. ${v.id}: ${v.description}`);
      console.log(`   Impact: ${v.impact}`);
      console.log(`   Help: ${v.helpUrl}`);
      console.log(`   HTML: ${v.nodes[0]?.html}`);
    });
  }
}
