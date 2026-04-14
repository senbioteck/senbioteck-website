import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class AdminDashboardPage extends BasePage {
  readonly pageTitle: Locator;
  readonly contentManagementLink: Locator;
  readonly appointmentsLink: Locator;
  readonly contactMessagesLink: Locator;
  readonly teamMembersLink: Locator;
  readonly settingsLink: Locator;
  readonly logoutButton: Locator;
  readonly sidebar: Locator;
  readonly mainContent: Locator;

  constructor(page: Page) {
    super(page, '/admin');
    this.pageTitle = page.getByRole('heading', { name: /admin dashboard/i });
    this.contentManagementLink = page.getByRole('link', { name: /content management/i });
    this.appointmentsLink = page.getByRole('link', { name: /appointments/i });
    this.contactMessagesLink = page.getByRole('link', { name: /contact messages/i });
    this.teamMembersLink = page.getByRole('link', { name: /team members/i });
    this.settingsLink = page.getByRole('link', { name: /settings/i });
    this.logoutButton = page.getByRole('button', { name: /logout/i });
    this.sidebar = page.getByTestId('admin-sidebar');
    this.mainContent = page.getByTestId('admin-main-content');
  }

  async navigateToContentManagement(): Promise<void> {
    await this.contentManagementLink.click();
  }

  async navigateToAppointments(): Promise<void> {
    await this.appointmentsLink.click();
  }

  async navigateToContactMessages(): Promise<void> {
    await this.contactMessagesLink.click();
  }

  async navigateToTeamMembers(): Promise<void> {
    await this.teamMembersLink.click();
  }

  async navigateToSettings(): Promise<void> {
    await this.settingsLink.click();
  }

  async logout(): Promise<void> {
    await this.logoutButton.click();
  }
}
