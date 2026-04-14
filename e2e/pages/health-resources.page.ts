import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class HealthResourcesPage extends BasePage {
  readonly pageTitle: Locator;
  readonly searchInput: Locator;
  readonly categoryFilter: Locator;
  readonly resourceList: Locator;
  readonly resourceCard: Locator;
  readonly emptyStateMessage: Locator;
  readonly resourceModal: Locator;
  readonly resourceTitle: Locator;
  readonly resourceContent: Locator;
  readonly resourceCategory: Locator;
  readonly resourceSource: Locator;

  constructor(page: Page) {
    super(page, '/portal/health-resources');
    this.pageTitle = page.getByRole('heading', { name: /health resources/i });
    this.searchInput = page.getByTestId('resource-search');
    this.categoryFilter = page.getByTestId('category-filter');
    this.resourceList = page.getByTestId('resource-list');
    this.resourceCard = page.getByTestId('resource-card');
    this.emptyStateMessage = page.getByText(/no resources found/i);
    this.resourceModal = page.getByTestId('resource-modal');
    this.resourceTitle = page.getByTestId('resource-title');
    this.resourceContent = page.getByTestId('resource-content');
    this.resourceCategory = page.getByTestId('resource-category');
    this.resourceSource = page.getByTestId('resource-source');
  }

  async search(keyword: string): Promise<void> {
    await this.searchInput.fill(keyword);
    await this.searchInput.press('Enter');
  }

  async filterByCategory(category: string): Promise<void> {
    await this.categoryFilter.selectOption(category);
  }

  async openResource(resourceTitle: string): Promise<void> {
    await this.resourceCard.filter({ hasText: resourceTitle }).click();
    await expect(this.resourceModal).toBeVisible();
  }

  async closeResourceModal(): Promise<void> {
    await this.resourceModal.getByRole('button', { name: /close/i }).click();
    await expect(this.resourceModal).not.toBeVisible();
  }

  async getCategories(): Promise<string[]> {
    return this.categoryFilter.locator('option').allTextContents();
  }

  async getResourceCount(): Promise<number> {
    return this.resourceCard.count();
  }
}
