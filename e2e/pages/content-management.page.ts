import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class ContentManagementPage extends BasePage {
  readonly pageTitle: Locator;
  readonly pagesTab: Locator;
  readonly blogPostsTab: Locator;
  readonly categoriesTab: Locator;
  readonly healthResourcesTab: Locator;
  readonly createNewButton: Locator;
  readonly searchInput: Locator;
  readonly contentList: Locator;
  readonly emptyStateMessage: Locator;

  constructor(page: Page) {
    super(page, '/admin/content');
    this.pageTitle = page.getByRole('heading', { name: /content management/i });
    this.pagesTab = page.getByRole('tab', { name: /pages/i });
    this.blogPostsTab = page.getByRole('tab', { name: /blog posts/i });
    this.categoriesTab = page.getByRole('tab', { name: /categories/i });
    this.healthResourcesTab = page.getByRole('tab', { name: /health resources/i });
    this.createNewButton = page.getByRole('button', { name: /create new/i });
    this.searchInput = page.getByTestId('content-search');
    this.contentList = page.getByTestId('content-list');
    this.emptyStateMessage = page.getByText(/no content found/i);
  }

  async switchToPagesTab(): Promise<void> {
    await this.pagesTab.click();
  }

  async switchToBlogPostsTab(): Promise<void> {
    await this.blogPostsTab.click();
  }

  async switchToCategoriesTab(): Promise<void> {
    await this.categoriesTab.click();
  }

  async switchToHealthResourcesTab(): Promise<void> {
    await this.healthResourcesTab.click();
  }

  async openCreateModal(): Promise<void> {
    await this.createNewButton.click();
    await expect(page.getByTestId('create-content-modal')).toBeVisible();
  }

  async searchContent(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.searchInput.press('Enter');
  }

  async getContentItems(): Promise<Locator> {
    return this.page.getByTestId('content-item');
  }

  async editContent(contentId: string): Promise<void> {
    await this.page.getByTestId(`edit-${contentId}`).click();
  }

  async deleteContent(contentId: string): Promise<void> {
    await this.page.getByTestId(`delete-${contentId}`).click();
    await this.page.getByTestId('confirm-delete').click();
  }
}
