import { test, expect } from '@playwright/test';
import { checkAccessibility, logViolations } from '../fixtures/accessibility.fixture';

test.describe('WCAG 2.1 AA Accessibility - Patient Portal', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('[data-testid="email-input"]', 'patient@test.com');
    await page.fill('[data-testid="password-input"]', 'TestPassword123!');
    await page.click('[data-testid="login-submit"]');
    await page.waitForURL(/\/portal/);
  });

  test('Patient Portal Home - No critical accessibility violations', async ({ page }) => {
    const results = await checkAccessibility(page, '/portal');
    
    const criticalViolations = results.violations.filter(
      (v: any) => v.impact === 'critical' || v.impact === 'serious'
    );
    
    await logViolations(criticalViolations);
    expect(criticalViolations.length).toBe(0);
  });

  test('Appointments Page - WCAG 2.1 AA compliance', async ({ page }) => {
    await page.goto('/portal/appointments');
    await page.waitForLoadState('networkidle');
    
    const results = await checkAccessibility(page, '/portal/appointments');
    
    const criticalViolations = results.violations.filter(
      (v: any) => v.impact === 'critical' || v.impact === 'serious'
    );
    
    await logViolations(criticalViolations);
    expect(criticalViolations.length).toBe(0);
  });

  test('Health Resources Page - WCAG 2.1 AA compliance', async ({ page }) => {
    await page.goto('/portal/health-resources');
    await page.waitForLoadState('networkidle');
    
    const results = await checkAccessibility(page, '/portal/health-resources');
    
    const criticalViolations = results.violations.filter(
      (v: any) => v.impact === 'critical' || v.impact === 'serious'
    );
    
    await logViolations(criticalViolations);
    expect(criticalViolations.length).toBe(0);
  });

  test('Contact Page - WCAG 2.1 AA compliance', async ({ page }) => {
    await page.goto('/portal/contact');
    await page.waitForLoadState('networkidle');
    
    const results = await checkAccessibility(page, '/portal/contact');
    
    const criticalViolations = results.violations.filter(
      (v: any) => v.impact === 'critical' || v.impact === 'serious'
    );
    
    await logViolations(criticalViolations);
    expect(criticalViolations.length).toBe(0);
  });

  test('Login Page - Accessibility compliance', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    
    const results = await checkAccessibility(page, '/login');
    
    const criticalViolations = results.violations.filter(
      (v: any) => v.impact === 'critical' || v.impact === 'serious'
    );
    
    await logViolations(criticalViolations);
    expect(criticalViolations.length).toBe(0);
  });

  test('Page title is descriptive', async ({ page }) => {
    await page.goto('/portal');
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
  });

  test('All form inputs have labels', async ({ page }) => {
    await page.goto('/portal/contact');
    
    const inputs = page.locator('input, textarea, select');
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
    await page.goto('/portal/appointments');
    
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
    await page.goto('/portal');
    
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
    const results = await checkAccessibility(page, '/portal');
    
    const contrastViolations = results.violations.filter(
      (v: any) => v.id === 'color-contrast'
    );
    
    await logViolations(contrastViolations);
    expect(contrastViolations.length).toBe(0);
  });

  test('Images have alt text', async ({ page }) => {
    const results = await checkAccessibility(page, '/portal');
    
    const imageViolations = results.violations.filter(
      (v: any) => v.id === 'image-alt'
    );
    
    await logViolations(imageViolations);
    expect(imageViolations.length).toBe(0);
  });

  test('Heading hierarchy is correct', async ({ page }) => {
    await page.goto('/portal');
    
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
    await page.goto('/portal/contact');
    
    const results = await checkAccessibility(page, '/portal/contact');
    
    const focusViolations = results.violations.filter(
      (v: any) => v.id === 'focus-order' || v.id === 'focus-visible'
    );
    
    await logViolations(focusViolations);
    expect(focusViolations.length).toBe(0);
  });

  test('No duplicate IDs on page', async ({ page }) => {
    const results = await checkAccessibility(page, '/portal');
    
    const duplicateIdViolations = results.violations.filter(
      (v: any) => v.id === 'duplicate-id'
    );
    
    await logViolations(duplicateIdViolations);
    expect(duplicateIdViolations.length).toBe(0);
  });

  test('Mobile viewport - No critical violations', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    const results = await checkAccessibility(page, '/portal');
    
    const criticalViolations = results.violations.filter(
      (v: any) => v.impact === 'critical' || v.impact === 'serious'
    );
    
    await logViolations(criticalViolations);
    expect(criticalViolations.length).toBe(0);
  });

  test('Tablet viewport - No critical violations', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    
    const results = await checkAccessibility(page, '/portal');
    
    const criticalViolations = results.violations.filter(
      (v: any) => v.impact === 'critical' || v.impact === 'serious'
    );
    
    await logViolations(criticalViolations);
    expect(criticalViolations.length).toBe(0);
  });
});
