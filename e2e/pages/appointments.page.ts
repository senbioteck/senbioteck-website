import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class AppointmentsPage extends BasePage {
  readonly pageTitle: Locator;
  readonly bookNewButton: Locator;
  readonly appointmentList: Locator;
  readonly emptyStateMessage: Locator;
  readonly professionalSelect: Locator;
  readonly datePicker: Locator;
  readonly timeSlotList: Locator;
  readonly reasonInput: Locator;
  readonly confirmButton: Locator;
  readonly cancelButton: Locator;
  readonly successMessage: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page, '/portal/appointments');
    this.pageTitle = page.getByRole('heading', { name: /appointments/i });
    this.bookNewButton = page.getByRole('button', { name: /book new appointment/i });
    this.appointmentList = page.getByTestId('appointment-list');
    this.emptyStateMessage = page.getByText(/no appointments scheduled/i);
    this.professionalSelect = page.getByTestId('professional-select');
    this.datePicker = page.getByTestId('date-picker');
    this.timeSlotList = page.getByTestId('time-slot-list');
    this.reasonInput = page.getByTestId('appointment-reason');
    this.confirmButton = page.getByRole('button', { name: /confirm/i });
    this.cancelButton = page.getByRole('button', { name: /cancel/i });
    this.successMessage = page.getByTestId('appointment-success');
    this.errorMessage = page.getByTestId('appointment-error');
  }

  async openBookingModal(): Promise<void> {
    await this.bookNewButton.click();
    await expect(page.getByTestId('booking-modal')).toBeVisible();
  }

  async selectProfessional(professionalName: string): Promise<void> {
    await this.professionalSelect.selectOption(professionalName);
  }

  async selectDate(date: string): Promise<void> {
    await this.datePicker.fill(date);
  }

  async selectTimeSlot(slotTime: string): Promise<void> {
    await this.timeSlotList.getByText(slotTime).click();
  }

  async fillReason(reason: string): Promise<void> {
    await this.reasonInput.fill(reason);
  }

  async confirmBooking(): Promise<void> {
    await this.confirmButton.click();
  }

  async cancelBooking(): Promise<void> {
    await this.cancelButton.click();
  }

  async getAppointmentCards(): Promise<Locator> {
    return this.page.getByTestId('appointment-card');
  }

  async cancelAppointment(appointmentId: string): Promise<void> {
    await this.page.getByTestId(`cancel-${appointmentId}`).click();
    await this.page.getByTestId('confirm-cancel').click();
  }
}
