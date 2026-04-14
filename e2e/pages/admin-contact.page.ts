import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class AdminContactMessagesPage extends BasePage {
  readonly pageTitle: Locator;
  readonly messageList: Locator;
  readonly unreadFilter: Locator;
  readonly searchInput: Locator;
  readonly emptyStateMessage: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    super(page, '/admin/contact-messages');
    this.pageTitle = page.getByRole('heading', { name: /contact messages/i });
    this.messageList = page.getByTestId('message-list');
    this.unreadFilter = page.getByTestId('unread-filter');
    this.searchInput = page.getByTestId('message-search');
    this.emptyStateMessage = page.getByText(/no messages found/i);
    this.successMessage = page.getByTestId('message-success');
  }

  async getMessageCards(): Promise<Locator> {
    return this.page.getByTestId('message-card');
  }

  async filterUnreadOnly(unread: boolean): Promise<void> {
    await this.unreadFilter.check();
  }

  async searchMessages(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.searchInput.press('Enter');
  }

  async openMessage(messageId: string): Promise<void> {
    await this.page.getByTestId(`message-${messageId}`).click();
    await expect(this.page.getByTestId('message-detail-modal')).toBeVisible();
  }

  async markAsRead(messageId: string): Promise<void> {
    await this.page.getByTestId(`mark-read-${messageId}`).click();
  }

  async markAsReplied(messageId: string): Promise<void> {
    await this.page.getByTestId(`mark-replied-${messageId}`).click();
  }

  async deleteMessage(messageId: string): Promise<void> {
    await this.page.getByTestId(`delete-${messageId}`).click();
    await this.page.getByTestId('confirm-delete').click();
  }

  async closeDetailModal(): Promise<void> {
    await this.page.getByTestId('message-detail-modal').getByRole('button', { name: /close/i }).click();
  }
}
