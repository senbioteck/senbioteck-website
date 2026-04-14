import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class AdminAppointmentsPage extends BasePage {
  readonly pageTitle: Locator;
  readonly appointmentList: Locator;
  readonly filterSelect: Locator;
  readonly datePicker: Locator;
  readonly searchInput: Locator;
  readonly emptyStateMessage: Locator;
  readonly successMessage: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page, '/admin/appointments');
    this.pageTitle = page.getByRole('heading', { name: /manage appointments/i });
    this.appointmentList = page.getByTestId('admin-appointment-list');
    this.filterSelect = page.getByTestId('status-filter');
    this.datePicker = page.getByTestId('date-filter');
    this.searchInput = page.getByTestId('appointment-search');
    this.emptyStateMessage = page.getByText(/no appointments found/i);
    this.successMessage = page.getByTestId('appointment-success');
    this.errorMessage = page.getByTestId('appointment-error');
  }

  async getAppointmentCards(): Promise<Locator> {
    return this.page.getByTestId('admin-appointment-card');
  }

  async filterByStatus(status: string): Promise<void> {
    await this.filterSelect.selectOption(status);
  }

  async filterByDate(date: string): Promise<void> {
    await this.datePicker.fill(date);
  }

  async searchAppointments(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.searchInput.press('Enter');
  }

  async confirmAppointment(appointmentId: string): Promise<void> {
    await this.page.getByTestId(`confirm-${appointmentId}`).click();
    await expect(this.successMessage).toBeVisible({ timeout: 5000 });
  }

  async cancelAppointment(appointmentId: string, reason?: string): Promise<void> {
    await this.page.getByTestId(`cancel-${appointmentId}`).click();
    if (reason) {
      await this.page.getByTestId('cancellation-reason').fill(reason);
    }
    await this.page.getByTestId('confirm-cancel').click();
    await expect(this.successMessage).toBeVisible({ timeout: 5000 });
  }

  async markAsCompleted(appointmentId: string): Promise<void> {
    await this.page.getByTestId(`complete-${appointmentId}`).click();
    await expect(this.successMessage).toBeVisible({ timeout: 5000 });
  }

  async viewAppointmentDetails(appointmentId: string): Promise<void> {
    await this.page.getByTestId(`view-${appointmentId}`).click();
    await expect(this.page.getByTestId('appointment-details-modal')).toBeVisible();
  }

  async closeDetailsModal(): Promise<void> {
    await this.page.getByTestId('appointment-details-modal').getByRole('button', { name: /close/i }).click();
  }
}
