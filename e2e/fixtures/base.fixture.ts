import { test as base, Page, Locator, expect } from '@playwright/test';

export type TestFixtures = {
  page: Page;
  authenticatedPage: Page;
  patientPortalPage: Page;
};

export type CustomFixtures = {
  takeScreenshot: (name: string) => Promise<void>;
};

export const test = base.extend<TestFixtures & CustomFixtures>({
  page: async ({ page }, use) => {
    await page.goto('/');
    await use(page);
  },

  authenticatedPage: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('/login');
    await page.fill('[data-testid="email-input"]', 'patient@test.com');
    await page.fill('[data-testid="password-input"]', 'TestPassword123!');
    await page.click('[data-testid="login-submit"]');
    await expect(page).toHaveURL(/\/portal/);
    await use(page);
    await context.close();
  },

  patientPortalPage: async ({ authenticatedPage }, use) => {
    await authenticatedPage.goto('/portal');
    await use(authenticatedPage);
  },

  takeScreenshot: async ({ page }, use) => {
    const takeScreenshot = async (name: string) => {
      await page.screenshot({ path: `e2e/screenshots/${name}.png`, fullPage: true });
    };
    await use(takeScreenshot);
  },
});

export { expect, Page, Locator };
