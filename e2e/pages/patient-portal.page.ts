import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class PatientPortalPage extends BasePage {
  readonly appointmentsLink: Locator;
  readonly healthResourcesLink: Locator;
  readonly contactLink: Locator;
  readonly profileLink: Locator;
  readonly logoutButton: Locator;
  readonly welcomeMessage: Locator;

  constructor(page: Page) {
    super(page, '/portal');
    this.appointmentsLink = page.getByRole('link', { name: /appointments/i });
    this.healthResourcesLink = page.getByRole('link', { name: /health resources/i });
    this.contactLink = page.getByRole('link', { name: /contact/i });
    this.profileLink = page.getByRole('link', { name: /profile/i });
    this.logoutButton = page.getByRole('button', { name: /logout/i });
    this.welcomeMessage = page.getByRole('heading', { name: /welcome/i });
  }

  async navigateToAppointments(): Promise<void> {
    await this.appointmentsLink.click();
  }

  async navigateToHealthResources(): Promise<void> {
    await this.healthResourcesLink.click();
  }

  async navigateToContact(): Promise<void> {
    await this.contactLink.click();
  }

  async logout(): Promise<void> {
    await this.logoutButton.click();
  }
}
