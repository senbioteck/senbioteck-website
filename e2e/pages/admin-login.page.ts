import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class AdminLoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page, '/admin/login');
    this.emailInput = page.getByTestId('admin-email-input');
    this.passwordInput = page.getByTestId('admin-password-input');
    this.submitButton = page.getByTestId('admin-login-submit');
    this.errorMessage = page.getByTestId('admin-login-error');
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
