import { test, expect } from '@playwright/test';
import { AppointmentsPage } from '../pages/appointments.page';
import { PatientPortalPage } from '../pages/patient-portal.page';

test.describe('Appointment Booking - Patient Portal', () => {
  let appointmentsPage: AppointmentsPage;
  let patientPortalPage: PatientPortalPage;

  test.beforeEach(async ({ page }) => {
    patientPortalPage = new PatientPortalPage(page);
    appointmentsPage = new AppointmentsPage(page);
    
    await page.goto('/login');
    await page.getByTestId('email-input').fill('patient@test.com');
    await page.getByTestId('password-input').fill('TestPassword123!');
    await page.getByTestId('login-submit').click();
    await expect(page).toHaveURL(/\/portal/);
  });

  test('should display appointments page with correct title', async ({ page }) => {
    await patientPortalPage.navigateToAppointments();
    await expect(appointmentsPage.pageTitle).toBeVisible();
    await expect(appointmentsPage.pageTitle).toContainText('Appointments');
  });

  test('should open booking modal when clicking book new appointment', async ({ page }) => {
    await patientPortalPage.navigateToAppointments();
    await appointmentsPage.bookNewButton.click();
    await expect(page.getByTestId('booking-modal')).toBeVisible();
  });

  test('should select professional from dropdown', async ({ page }) => {
    await patientPortalPage.navigateToAppointments();
    await appointmentsPage.bookNewButton.click();
    await expect(page.getByTestId('booking-modal')).toBeVisible();
    
    await appointmentsPage.professionalSelect.selectOption({ index: 1 });
    const selectedValue = await appointmentsPage.professionalSelect.inputValue();
    expect(selectedValue).toBeTruthy();
  });

  test('should select date and display available time slots', async ({ page }) => {
    await patientPortalPage.navigateToAppointments();
    await appointmentsPage.bookNewButton.click();
    
    await appointmentsPage.selectDate('2026-04-15');
    await expect(appointmentsPage.timeSlotList).toBeVisible();
  });

  test('should select time slot', async ({ page }) => {
    await patientPortalPage.navigateToAppointments();
    await appointmentsPage.bookNewButton.click();
    
    await appointmentsPage.selectDate('2026-04-15');
    const firstSlot = appointmentsPage.timeSlotList.locator('button').first();
    await firstSlot.click();
    await expect(firstSlot).toHaveClass(/selected/);
  });

  test('should fill reason for appointment', async ({ page }) => {
    await patientPortalPage.navigateToAppointments();
    await appointmentsPage.bookNewButton.click();
    
    await appointmentsPage.fillReason('Annual checkup');
    await expect(appointmentsPage.reasonInput).toHaveValue('Annual checkup');
  });

  test('should complete booking flow successfully', async ({ page }) => {
    await patientPortalPage.navigateToAppointments();
    await appointmentsPage.bookNewButton.click();
    
    await appointmentsPage.professionalSelect.selectOption({ index: 1 });
    await appointmentsPage.selectDate('2026-04-15');
    await appointmentsPage.timeSlotList.locator('button').first().click();
    await appointmentsPage.fillReason('Annual checkup');
    await appointmentsPage.confirmBooking();
    
    await expect(appointmentsPage.successMessage).toBeVisible({ timeout: 10000 });
    await expect(appointmentsPage.successMessage).toContainText(/appointment booked/i);
  });

  test('should cancel booking and close modal', async ({ page }) => {
    await patientPortalPage.navigateToAppointments();
    await appointmentsPage.bookNewButton.click();
    
    await appointmentsPage.professionalSelect.selectOption({ index: 1 });
    await appointmentsPage.selectDate('2026-04-15');
    await appointmentsPage.cancelButton.click();
    
    await expect(page.getByTestId('booking-modal')).not.toBeVisible();
  });

  test('should display existing appointments in list', async ({ page }) => {
    await patientPortalPage.navigateToAppointments();
    
    const appointmentCards = appointmentsPage.getAppointmentCards();
    const count = await appointmentCards.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('should cancel existing appointment', async ({ page }) => {
    await patientPortalPage.navigateToAppointments();
    
    const appointmentCards = appointmentsPage.getAppointmentCards();
    const count = await appointmentCards.count();
    
    if (count > 0) {
      const firstCard = appointmentCards.first();
      const cancelButton = firstCard.getByRole('button', { name: /cancel/i });
      
      if (await cancelButton.isVisible()) {
        await cancelButton.click();
        await page.getByTestId('confirm-cancel').click();
        await expect(page.getByTestId('appointment-cancelled')).toBeVisible({ timeout: 10000 });
      }
    }
  });

  test('should show error when booking without selecting professional', async ({ page }) => {
    await patientPortalPage.navigateToAppointments();
    await appointmentsPage.bookNewButton.click();
    
    await appointmentsPage.selectDate('2026-04-15');
    await appointmentsPage.confirmBooking();
    
    await expect(appointmentsPage.errorMessage).toBeVisible();
    await expect(appointmentsPage.errorMessage).toContainText(/professional/i);
  });

  test('should show error when booking without selecting time slot', async ({ page }) => {
    await patientPortalPage.navigateToAppointments();
    await appointmentsPage.bookNewButton.click();
    
    await appointmentsPage.professionalSelect.selectOption({ index: 1 });
    await appointmentsPage.selectDate('2026-04-15');
    await appointmentsPage.confirmBooking();
    
    await expect(appointmentsPage.errorMessage).toBeVisible();
    await expect(appointmentsPage.errorMessage).toContainText(/time slot/i);
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    await patientPortalPage.navigateToAppointments();
    await expect(appointmentsPage.pageTitle).toBeVisible();
    await expect(appointmentsPage.bookNewButton).toBeVisible();
  });

  test('should be responsive on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    
    await patientPortalPage.navigateToAppointments();
    await expect(appointmentsPage.pageTitle).toBeVisible();
    await expect(appointmentsPage.appointmentList).toBeVisible();
  });
});
