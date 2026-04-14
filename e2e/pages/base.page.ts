import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  protected page: Page;
  readonly url: string;

  constructor(page: Page, url: string = '/') {
    this.page = page;
    this.url = url;
  }

  async navigate(): Promise<void> {
    await this.page.goto(this.url);
  }

  async getByTestId(testId: string): Promise<Locator> {
    return this.page.getByTestId(testId);
  }

  async getByLabel(label: string): Promise<Locator> {
    return this.page.getByLabel(label);
  }

  async getByRole(role: 'button' | 'link' | 'heading' | 'textbox', name: string): Promise<Locator> {
    return this.page.getByRole(role, { name });
  }

  async waitForUrl(pattern: RegExp | string): Promise<void> {
    await expect(this.page).toHaveURL(pattern);
  }
}
