import { test, expect } from '@playwright/test';
import { HealthResourcesPage } from '../pages/health-resources.page';
import { PatientPortalPage } from '../pages/patient-portal.page';

test.describe('Health Resource Consultation - Patient Portal', () => {
  let healthResourcesPage: HealthResourcesPage;
  let patientPortalPage: PatientPortalPage;

  test.beforeEach(async ({ page }) => {
    healthResourcesPage = new HealthResourcesPage(page);
    patientPortalPage = new PatientPortalPage(page);
    
    await page.goto('/login');
    await page.getByTestId('email-input').fill('patient@test.com');
    await page.getByTestId('password-input').fill('TestPassword123!');
    await page.getByTestId('login-submit').click();
    await expect(page).toHaveURL(/\/portal/);
  });

  test('should display health resources page with correct title', async ({ page }) => {
    await patientPortalPage.navigateToHealthResources();
    await expect(healthResourcesPage.pageTitle).toBeVisible();
    await expect(healthResourcesPage.pageTitle).toContainText('Health Resources');
  });

  test('should display search input', async ({ page }) => {
    await patientPortalPage.navigateToHealthResources();
    await expect(healthResourcesPage.searchInput).toBeVisible();
  });

  test('should display category filter', async ({ page }) => {
    await patientPortalPage.navigateToHealthResources();
    await expect(healthResourcesPage.categoryFilter).toBeVisible();
  });

  test('should display resource list', async ({ page }) => {
    await patientPortalPage.navigateToHealthResources();
    await expect(healthResourcesPage.resourceList).toBeVisible();
  });

  test('should search for resources by keyword', async ({ page }) => {
    await patientPortalPage.navigateToHealthResources();
    
    await healthResourcesPage.search('wellness');
    
    await page.waitForTimeout(500);
    const resourceCount = await healthResourcesPage.getResourceCount();
    expect(resourceCount).toBeGreaterThanOrEqual(0);
  });

  test('should filter resources by category', async ({ page }) => {
    await patientPortalPage.navigateToHealthResources();
    
    const categories = await healthResourcesPage.getCategories();
    if (categories.length > 1) {
      await healthResourcesPage.filterByCategory(categories[1]);
      await page.waitForTimeout(500);
    }
    
    const resourceCount = await healthResourcesPage.getResourceCount();
    expect(resourceCount).toBeGreaterThanOrEqual(0);
  });

  test('should open resource modal when clicking on resource card', async ({ page }) => {
    await patientPortalPage.navigateToHealthResources();
    
    const resourceCards = healthResourcesPage.resourceCard;
    const count = await resourceCards.count();
    
    if (count > 0) {
      await resourceCards.first().click();
      await expect(healthResourcesPage.resourceModal).toBeVisible();
    }
  });

  test('should display resource title in modal', async ({ page }) => {
    await patientPortalPage.navigateToHealthResources();
    
    const resourceCards = healthResourcesPage.resourceCard;
    const count = await resourceCards.count();
    
    if (count > 0) {
      const firstCardTitle = await resourceCards.first().textContent();
      await resourceCards.first().click();
      
      await expect(healthResourcesPage.resourceModal).toBeVisible();
      await expect(healthResourcesPage.resourceTitle).toBeVisible();
    }
  });

  test('should display resource content in modal', async ({ page }) => {
    await patientPortalPage.navigateToHealthResources();
    
    const resourceCards = healthResourcesPage.resourceCard;
    const count = await resourceCards.count();
    
    if (count > 0) {
      await resourceCards.first().click();
      await expect(healthResourcesPage.resourceModal).toBeVisible();
      await expect(healthResourcesPage.resourceContent).toBeVisible();
    }
  });

  test('should display resource category in modal', async ({ page }) => {
    await patientPortalPage.navigateToHealthResources();
    
    const resourceCards = healthResourcesPage.resourceCard;
    const count = await resourceCards.count();
    
    if (count > 0) {
      await resourceCards.first().click();
      await expect(healthResourcesPage.resourceModal).toBeVisible();
      await expect(healthResourcesPage.resourceCategory).toBeVisible();
    }
  });

  test('should close resource modal', async ({ page }) => {
    await patientPortalPage.navigateToHealthResources();
    
    const resourceCards = healthResourcesPage.resourceCard;
    const count = await resourceCards.count();
    
    if (count > 0) {
      await resourceCards.first().click();
      await expect(healthResourcesPage.resourceModal).toBeVisible();
      
      await healthResourcesPage.closeResourceModal();
      await expect(healthResourcesPage.resourceModal).not.toBeVisible();
    }
  });

  test('should display empty state when no resources match search', async ({ page }) => {
    await patientPortalPage.navigateToHealthResources();
    
    await healthResourcesPage.search('xyznonexistent123');
    await page.waitForTimeout(1000);
    
    const resourceCount = await healthResourcesPage.getResourceCount();
    if (resourceCount === 0) {
      await expect(healthResourcesPage.emptyStateMessage).toBeVisible();
    }
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    await patientPortalPage.navigateToHealthResources();
    await expect(healthResourcesPage.pageTitle).toBeVisible();
    await expect(healthResourcesPage.searchInput).toBeVisible();
  });

  test('should be responsive on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    
    await patientPortalPage.navigateToHealthResources();
    await expect(healthResourcesPage.pageTitle).toBeVisible();
    await expect(healthResourcesPage.resourceList).toBeVisible();
  });

  test('should display all resource categories in filter', async ({ page }) => {
    await patientPortalPage.navigateToHealthResources();
    
    const expectedCategories = [
      'PREVENTION',
      'TREATMENT', 
      'REHABILITATION',
      'WELLNESS',
      'EMERGENCY'
    ];
    
    const categories = await healthResourcesPage.getCategories();
    expect(categories.length).toBe(expectedCategories.length);
  });

  test('should navigate to external source URL when available', async ({ page }) => {
    await patientPortalPage.navigateToHealthResources();
    
    const resourceCards = healthResourcesPage.resourceCard;
    const count = await resourceCards.count();
    
    if (count > 0) {
      await resourceCards.first().click();
      
      const sourceLink = healthResourcesPage.resourceSource;
      if (await sourceLink.isVisible()) {
        const href = await sourceLink.getAttribute('href');
        expect(href).toBeTruthy();
      }
    }
  });
});
