import { test, expect } from '@playwright/test';
import { AdminLoginPage } from '../pages/admin-login.page';
import { AdminDashboardPage } from '../pages/admin-dashboard.page';

test.describe('Admin Authentication - Admin Portal', () => {
  let adminLoginPage: AdminLoginPage;
  let adminDashboardPage: AdminDashboardPage;

  test.beforeEach(async ({ page }) => {
    adminLoginPage = new AdminLoginPage(page);
    adminDashboardPage = new AdminDashboardPage(page);
  });

  test('should display login page with correct title', async ({ page }) => {
    await page.goto('/admin/login');
    await expect(page).toHaveTitle(/Admin/);
  });

  test('should display email input field', async ({ page }) => {
    await page.goto('/admin/login');
    await expect(adminLoginPage.emailInput).toBeVisible();
  });

  test('should display password input field', async ({ page }) => {
    await page.goto('/admin/login');
    await expect(adminLoginPage.passwordInput).toBeVisible();
  });

  test('should display submit button', async ({ page }) => {
    await page.goto('/admin/login');
    await expect(adminLoginPage.submitButton).toBeVisible();
  });

  test('should login with valid admin credentials', async ({ page }) => {
    await page.goto('/admin/login');
    await adminLoginPage.login('admin@senbioteck.com', 'AdminPassword123!');
    await expect(page).toHaveURL(/\/admin/);
    await expect(adminDashboardPage.pageTitle).toBeVisible();
  });

  test('should show error with invalid credentials', async ({ page }) => {
    await page.goto('/admin/login');
    await adminLoginPage.login('invalid@example.com', 'WrongPassword!');
    await expect(adminLoginPage.errorMessage).toBeVisible();
    await expect(adminLoginPage.errorMessage).toContainText(/invalid/i);
  });

  test('should show error with empty email', async ({ page }) => {
    await page.goto('/admin/login');
    await adminLoginPage.login('', 'SomePassword123!');
    await expect(adminLoginPage.errorMessage).toBeVisible();
  });

  test('should show error with empty password', async ({ page }) => {
    await page.goto('/admin/login');
    await adminLoginPage.login('admin@senbioteck.com', '');
    await expect(adminLoginPage.errorMessage).toBeVisible();
  });

  test('should redirect to login when accessing admin without auth', async ({ page }) => {
    await page.goto('/admin');
    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test('should redirect to login when accessing content management without auth', async ({ page }) => {
    await page.goto('/admin/content');
    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test('should redirect to login when accessing appointments without auth', async ({ page }) => {
    await page.goto('/admin/appointments');
    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/admin/login');
    await expect(adminLoginPage.emailInput).toBeVisible();
    await expect(adminLoginPage.passwordInput).toBeVisible();
    await expect(adminLoginPage.submitButton).toBeVisible();
  });

  test('should logout from admin dashboard', async ({ page }) => {
    await page.goto('/admin/login');
    await adminLoginPage.login('admin@senbioteck.com', 'AdminPassword123!');
    await expect(page).toHaveURL(/\/admin/);
    await adminDashboardPage.logout();
    await expect(page).toHaveURL(/\/admin\/login/);
  });
});
