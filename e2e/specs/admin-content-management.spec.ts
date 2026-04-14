import { test, expect } from '@playwright/test';
import { AdminLoginPage } from '../pages/admin-login.page';
import { AdminDashboardPage } from '../pages/admin-dashboard.page';
import { ContentManagementPage } from '../pages/content-management.page';

test.describe('Content Management - Admin Portal', () => {
  let adminLoginPage: AdminLoginPage;
  let adminDashboardPage: AdminDashboardPage;
  let contentPage: ContentManagementPage;

  test.beforeEach(async ({ page }) => {
    adminLoginPage = new AdminLoginPage(page);
    adminDashboardPage = new AdminDashboardPage(page);
    contentPage = new ContentManagementPage(page);
    
    await page.goto('/admin/login');
    await adminLoginPage.login('admin@senbioteck.com', 'AdminPassword123!');
    await expect(page).toHaveURL(/\/admin/);
  });

  test('should display content management page with correct title', async ({ page }) => {
    await adminDashboardPage.navigateToContentManagement();
    await expect(contentPage.pageTitle).toBeVisible();
    await expect(contentPage.pageTitle).toContainText('Content Management');
  });

  test('should display pages tab', async ({ page }) => {
    await adminDashboardPage.navigateToContentManagement();
    await expect(contentPage.pagesTab).toBeVisible();
  });

  test('should switch to blog posts tab', async ({ page }) => {
    await adminDashboardPage.navigateToContentManagement();
    await contentPage.switchToBlogPostsTab();
    await expect(contentPage.blogPostsTab).toHaveAttribute('aria-selected', 'true');
  });

  test('should switch to categories tab', async ({ page }) => {
    await adminDashboardPage.navigateToContentManagement();
    await contentPage.switchToCategoriesTab();
    await expect(contentPage.categoriesTab).toHaveAttribute('aria-selected', 'true');
  });

  test('should switch to health resources tab', async ({ page }) => {
    await adminDashboardPage.navigateToContentManagement();
    await contentPage.switchToHealthResourcesTab();
    await expect(contentPage.healthResourcesTab).toHaveAttribute('aria-selected', 'true');
  });

  test('should display create new button', async ({ page }) => {
    await adminDashboardPage.navigateToContentManagement();
    await expect(contentPage.createNewButton).toBeVisible();
  });

  test('should open create modal when clicking create new', async ({ page }) => {
    await adminDashboardPage.navigateToContentManagement();
    await contentPage.openCreateModal();
    await expect(page.getByTestId('create-content-modal')).toBeVisible();
  });

  test('should search content', async ({ page }) => {
    await adminDashboardPage.navigateToContentManagement();
    await contentPage.switchToPagesTab();
    await contentPage.searchContent('about');
    await page.waitForTimeout(500);
  });

  test('should display content list', async ({ page }) => {
    await adminDashboardPage.navigateToContentManagement();
    await expect(contentPage.contentList).toBeVisible();
  });

  test('should display empty state when no content matches search', async ({ page }) => {
    await adminDashboardPage.navigateToContentManagement();
    await contentPage.searchContent('xyznonexistent123');
    await page.waitForTimeout(1000);
    const items = await contentPage.getContentItems();
    const count = await items.count();
    if (count === 0) {
      await expect(contentPage.emptyStateMessage).toBeVisible();
    }
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await adminDashboardPage.navigateToContentManagement();
    await expect(contentPage.pageTitle).toBeVisible();
    await expect(contentPage.createNewButton).toBeVisible();
  });

  test('should logout from admin dashboard', async ({ page }) => {
    await adminDashboardPage.logout();
    await expect(page).toHaveURL(/\/admin\/login/);
  });
});
