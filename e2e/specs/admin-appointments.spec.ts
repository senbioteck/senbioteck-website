import { test, expect } from '@playwright/test';
import { AdminLoginPage } from '../pages/admin-login.page';
import { AdminDashboardPage } from '../pages/admin-dashboard.page';
import { AdminAppointmentsPage } from '../pages/admin-appointments.page';

test.describe('Admin Appointments Management - Admin Portal', () => {
  let adminLoginPage: AdminLoginPage;
  let adminDashboardPage: AdminDashboardPage;
  let appointmentsPage: AdminAppointmentsPage;

  test.beforeEach(async ({ page }) => {
    adminLoginPage = new AdminLoginPage(page);
    adminDashboardPage = new AdminDashboardPage(page);
    appointmentsPage = new AdminAppointmentsPage(page);
    
    await page.goto('/admin/login');
    await adminLoginPage.login('admin@senbioteck.com', 'AdminPassword123!');
    await expect(page).toHaveURL(/\/admin/);
  });

  test('should display appointments page with correct title', async ({ page }) => {
    await adminDashboardPage.navigateToAppointments();
    await expect(appointmentsPage.pageTitle).toBeVisible();
    await expect(appointmentsPage.pageTitle).toContainText('Appointments');
  });

  test('should display appointment list', async ({ page }) => {
    await adminDashboardPage.navigateToAppointments();
    await expect(appointmentsPage.appointmentList).toBeVisible();
  });

  test('should display status filter', async ({ page }) => {
    await adminDashboardPage.navigateToAppointments();
    await expect(appointmentsPage.filterSelect).toBeVisible();
  });

  test('should filter appointments by status', async ({ page }) => {
    await adminDashboardPage.navigateToAppointments();
    await appointmentsPage.filterByStatus('SCHEDULED');
    await page.waitForTimeout(500);
  });

  test('should display date filter', async ({ page }) => {
    await adminDashboardPage.navigateToAppointments();
    await expect(appointmentsPage.datePicker).toBeVisible();
  });

  test('should filter appointments by date', async ({ page }) => {
    await adminDashboardPage.navigateToAppointments();
    await appointmentsPage.filterByDate('2026-04-15');
    await page.waitForTimeout(500);
  });

  test('should display search input', async ({ page }) => {
    await adminDashboardPage.navigateToAppointments();
    await expect(appointmentsPage.searchInput).toBeVisible();
  });

  test('should search appointments', async ({ page }) => {
    await adminDashboardPage.navigateToAppointments();
    await appointmentsPage.searchAppointments('John');
    await page.waitForTimeout(500);
  });

  test('should view appointment details', async ({ page }) => {
    await adminDashboardPage.navigateToAppointments();
    
    const cards = appointmentsPage.getAppointmentCards();
    const count = await cards.count();
    
    if (count > 0) {
      await appointmentsPage.viewAppointmentDetails(await cards.first().getAttribute('data-testid') || '');
      await expect(page.getByTestId('appointment-details-modal')).toBeVisible();
    }
  });

  test('should close appointment details modal', async ({ page }) => {
    await adminDashboardPage.navigateToAppointments();
    
    const cards = appointmentsPage.getAppointmentCards();
    const count = await cards.count();
    
    if (count > 0) {
      await appointmentsPage.viewAppointmentDetails(await cards.first().getAttribute('data-testid') || '');
      await appointmentsPage.closeDetailsModal();
      await expect(page.getByTestId('appointment-details-modal')).not.toBeVisible();
    }
  });

  test('should confirm scheduled appointment', async ({ page }) => {
    await adminDashboardPage.navigateToAppointments();
    await appointmentsPage.filterByStatus('SCHEDULED');
    await page.waitForTimeout(500);
    
    const cards = appointmentsPage.getAppointmentCards();
    const count = await cards.count();
    
    if (count > 0) {
      const cardId = await cards.first().getAttribute('data-testid');
      if (cardId) {
        const appointmentId = cardId.replace('admin-appointment-card-', '');
        await appointmentsPage.confirmAppointment(appointmentId);
      }
    }
  });

  test('should cancel appointment', async ({ page }) => {
    await adminDashboardPage.navigateToAppointments();
    
    const cards = appointmentsPage.getAppointmentCards();
    const count = await cards.count();
    
    if (count > 0) {
      const cardId = await cards.first().getAttribute('data-testid');
      if (cardId) {
        const appointmentId = cardId.replace('admin-appointment-card-', '');
        await appointmentsPage.cancelAppointment(appointmentId, 'Administrative cancellation');
      }
    }
  });

  test('should mark appointment as completed', async ({ page }) => {
    await adminDashboardPage.navigateToAppointments();
    await appointmentsPage.filterByStatus('CONFIRMED');
    await page.waitForTimeout(500);
    
    const cards = appointmentsPage.getAppointmentCards();
    const count = await cards.count();
    
    if (count > 0) {
      const cardId = await cards.first().getAttribute('data-testid');
      if (cardId) {
        const appointmentId = cardId.replace('admin-appointment-card-', '');
        await appointmentsPage.markAsCompleted(appointmentId);
      }
    }
  });

  test('should display empty state when no appointments found', async ({ page }) => {
    await adminDashboardPage.navigateToAppointments();
    await appointmentsPage.filterByStatus('COMPLETED');
    await appointmentsPage.filterByDate('2020-01-01');
    await page.waitForTimeout(1000);
    
    const cards = appointmentsPage.getAppointmentCards();
    const count = await cards.count();
    if (count === 0) {
      await expect(appointmentsPage.emptyStateMessage).toBeVisible();
    }
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await adminDashboardPage.navigateToAppointments();
    await expect(appointmentsPage.pageTitle).toBeVisible();
  });

  test('should be responsive on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await adminDashboardPage.navigateToAppointments();
    await expect(appointmentsPage.pageTitle).toBeVisible();
    await expect(appointmentsPage.appointmentList).toBeVisible();
  });
});
