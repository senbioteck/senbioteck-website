import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class ContactPage extends BasePage {
  readonly pageTitle: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly subjectInput: Locator;
  readonly messageTextarea: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;
  readonly errorMessage: Locator;
  readonly formValidationErrors: Locator;

  constructor(page: Page) {
    super(page, '/portal/contact');
    this.pageTitle = page.getByRole('heading', { name: /contact/i });
    this.nameInput = page.getByTestId('contact-name');
    this.emailInput = page.getByTestId('contact-email');
    this.phoneInput = page.getByTestId('contact-phone');
    this.subjectInput = page.getByTestId('contact-subject');
    this.messageTextarea = page.getByTestId('contact-message');
    this.submitButton = page.getByRole('button', { name: /send message/i });
    this.successMessage = page.getByTestId('contact-success');
    this.errorMessage = page.getByTestId('contact-error');
    this.formValidationErrors = page.getByTestId('form-validation-errors');
  }

  async fillForm(data: {
    name?: string;
    email?: string;
    phone?: string;
    subject?: string;
    message?: string;
  }): Promise<void> {
    if (data.name) await this.nameInput.fill(data.name);
    if (data.email) await this.emailInput.fill(data.email);
    if (data.phone) await this.phoneInput.fill(data.phone);
    if (data.subject) await this.subjectInput.fill(data.subject);
    if (data.message) await this.messageTextarea.fill(data.message);
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }

  async clearForm(): Promise<void> {
    await this.nameInput.clear();
    await this.emailInput.clear();
    await this.phoneInput.clear();
    await this.subjectInput.clear();
    await this.messageTextarea.clear();
  }

  async getValidationErrors(): Promise<string[]> {
    return this.formValidationErrors.locator('li').allTextContents();
  }

  async isFormValid(): Promise<boolean> {
    const errors = await this.getValidationErrors();
    return errors.length === 0;
  }
}
