import { test, expect } from '@playwright/test';
import { checkAccessibility, logViolations } from '../fixtures/accessibility.fixture';

test.describe('WCAG 2.1 AA Accessibility - Admin Portal', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/admin/login');
    await page.fill('[data-testid="admin-email-input"]', 'admin@senbioteck.com');
    await page.fill('[data-testid="admin-password-input"]', 'AdminPassword123!');
    await page.click('[data-testid="admin-login-submit"]');
    await page.waitForURL(/\/admin/);
  });

  test('Admin Dashboard - No critical accessibility violations', async ({ page }) => {
    const results = await checkAccessibility(page, '/admin');
    
    const criticalViolations = results.violations.filter(
      (v: any) => v.impact === 'critical' || v.impact === 'serious'
    );
    
    await logViolations(criticalViolations);
    expect(criticalViolations.length).toBe(0);
  });

  test('Content Management Page - WCAG 2.1 AA compliance', async ({ page }) => {
    await page.goto('/admin/content');
    await page.waitForLoadState('networkidle');
    
    const results = await checkAccessibility(page, '/admin/content');
    
    const criticalViolations = results.violations.filter(
      (v: any) => v.impact === 'critical' || v.impact === 'serious'
    );
    
    await logViolations(criticalViolations);
    expect(criticalViolations.length).toBe(0);
  });

  test('Appointments Management Page - WCAG 2.1 AA compliance', async ({ page }) => {
    await page.goto('/admin/appointments');
    await page.waitForLoadState('networkidle');
    
    const results = await checkAccessibility(page, '/admin/appointments');
    
    const criticalViolations = results.violations.filter(
      (v: any) => v.impact === 'critical' || v.impact === 'serious'
    );
    
    await logViolations(criticalViolations);
    expect(criticalViolations.length).toBe(0);
  });

  test('Contact Messages Page - WCAG 2.1 AA compliance', async ({ page }) => {
    await page.goto('/admin/contact-messages');
    await page.waitForLoadState('networkidle');
    
    const results = await checkAccessibility(page, '/admin/contact-messages');
    
    const criticalViolations = results.violations.filter(
      (v: any) => v.impact === 'critical' || v.impact === 'serious'
    );
    
    await logViolations(criticalViolations);
    expect(criticalViolations.length).toBe(0);
  });

  test('Admin Login Page - Accessibility compliance', async ({ page }) => {
    await page.goto('/admin/login');
    await page.waitForLoadState('networkidle');
    
    const results = await checkAccessibility(page, '/admin/login');
    
    const criticalViolations = results.violations.filter(
      (v: any) => v.impact === 'critical' || v.impact === 'serious'
    );
    
    await logViolations(criticalViolations);
    expect(criticalViolations.length).toBe(0);
  });

  test('All form inputs have labels', async ({ page }) => {
    await page.goto('/admin/content');
    
    const inputs = page.locator('input:not([type="hidden"]), textarea, select');
    const count = await inputs.count();
    
    for (let i = 0; i < count; i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledby = await input.getAttribute('aria-labelledby');
      const label = page.locator(`label[for="${id}"]`);
      const hasLabel = id && (await label.count() > 0) || ariaLabel || ariaLabelledby;
      expect(hasLabel).toBeTruthy();
    }
  });

  test('Buttons have accessible names', async ({ page }) => {
    await page.goto('/admin/content');
    
    const buttons = page.locator('button');
    const count = await buttons.count();
    
    for (let i = 0; i < count; i++) {
      const button = buttons.nth(i);
      const text = await button.textContent();
      const ariaLabel = await button.getAttribute('aria-label');
      expect(text?.trim() || ariaLabel).toBeTruthy();
    }
  });

  test('Links have accessible names', async ({ page }) => {
    await page.goto('/admin');
    
    const links = page.locator('a');
    const count = await links.count();
    
    for (let i = 0; i < count; i++) {
      const link = links.nth(i);
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');
      expect(text?.trim() || ariaLabel).toBeTruthy();
    }
  });

  test('Color contrast meets WCAG AA standards', async ({ page }) => {
    const results = await checkAccessibility(page, '/admin');
    
    const contrastViolations = results.violations.filter(
      (v: any) => v.id === 'color-contrast'
    );
    
    await logViolations(contrastViolations);
    expect(contrastViolations.length).toBe(0);
  });

  test('Images have alt text', async ({ page }) => {
    const results = await checkAccessibility(page, '/admin');
    
    const imageViolations = results.violations.filter(
      (v: any) => v.id === 'image-alt'
    );
    
    await logViolations(imageViolations);
    expect(imageViolations.length).toBe(0);
  });

  test('Heading hierarchy is correct', async ({ page }) => {
    await page.goto('/admin');
    
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    const levels: number[] = [];
    
    for (const heading of headings) {
      const tag = await heading.evaluate((el: Element) => el.tagName.toLowerCase());
      const level = parseInt(tag.replace('h', ''));
      levels.push(level);
    }
    
    let prevLevel = 0;
    for (const level of levels) {
      expect(level - prevLevel).toBeLessThanOrEqual(1);
      prevLevel = level;
    }
  });

  test('Focus order is logical', async ({ page }) => {
    await page.goto('/admin/content');
    
    const results = await checkAccessibility(page, '/admin/content');
    
    const focusViolations = results.violations.filter(
      (v: any) => v.id === 'focus-order' || v.id === 'focus-visible'
    );
    
    await logViolations(focusViolations);
    expect(focusViolations.length).toBe(0);
  });

  test('No duplicate IDs on page', async ({ page }) => {
    const results = await checkAccessibility(page, '/admin');
    
    const duplicateIdViolations = results.violations.filter(
      (v: any) => v.id === 'duplicate-id'
    );
    
    await logViolations(duplicateIdViolations);
    expect(duplicateIdViolations.length).toBe(0);
  });

  test('Mobile viewport - No critical violations', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    const results = await checkAccessibility(page, '/admin');
    
    const criticalViolations = results.violations.filter(
      (v: any) => v.impact === 'critical' || v.impact === 'serious'
    );
    
    await logViolations(criticalViolations);
    expect(criticalViolations.length).toBe(0);
  });

  test('Tablet viewport - No critical violations', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    
    const results = await checkAccessibility(page, '/admin');
    
    const criticalViolations = results.violations.filter(
      (v: any) => v.impact === 'critical' || v.impact === 'serious'
    );
    
    await logViolations(criticalViolations);
    expect(criticalViolations.length).toBe(0);
  });
});
