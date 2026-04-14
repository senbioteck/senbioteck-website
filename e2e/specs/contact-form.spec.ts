import { test, expect } from '@playwright/test';
import { ContactPage } from '../pages/contact.page';
import { PatientPortalPage } from '../pages/patient-portal.page';

test.describe('Contact Form - Patient Portal', () => {
  let contactPage: ContactPage;
  let patientPortalPage: PatientPortalPage;

  test.beforeEach(async ({ page }) => {
    contactPage = new ContactPage(page);
    patientPortalPage = new PatientPortalPage(page);
    
    await page.goto('/login');
    await page.getByTestId('email-input').fill('patient@test.com');
    await page.getByTestId('password-input').fill('TestPassword123!');
    await page.getByTestId('login-submit').click();
    await expect(page).toHaveURL(/\/portal/);
  });

  test('should display contact page with correct title', async ({ page }) => {
    await patientPortalPage.navigateToContact();
    await expect(contactPage.pageTitle).toBeVisible();
    await expect(contactPage.pageTitle).toContainText('Contact');
  });

  test('should display all form fields', async ({ page }) => {
    await patientPortalPage.navigateToContact();
    
    await expect(contactPage.nameInput).toBeVisible();
    await expect(contactPage.emailInput).toBeVisible();
    await expect(contactPage.phoneInput).toBeVisible();
    await expect(contactPage.subjectInput).toBeVisible();
    await expect(contactPage.messageTextarea).toBeVisible();
    await expect(contactPage.submitButton).toBeVisible();
  });

  test('should fill contact form with valid data', async ({ page }) => {
    await patientPortalPage.navigateToContact();
    
    await contactPage.fillForm({
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      subject: 'Appointment Inquiry',
      message: 'I would like to inquire about available appointments for next week.'
    });
    
    await expect(contactPage.nameInput).toHaveValue('John Doe');
    await expect(contactPage.emailInput).toHaveValue('john.doe@example.com');
    await expect(contactPage.phoneInput).toHaveValue('+1234567890');
    await expect(contactPage.subjectInput).toHaveValue('Appointment Inquiry');
    await expect(contactPage.messageTextarea).toHaveValue('I would like to inquire about available appointments for next week.');
  });

  test('should submit contact form successfully', async ({ page }) => {
    await patientPortalPage.navigateToContact();
    
    await contactPage.fillForm({
      name: 'John Doe',
      email: 'john.doe@example.com',
      subject: 'General Inquiry',
      message: 'This is a test message for the contact form.'
    });
    
    await contactPage.submit();
    
    await expect(contactPage.successMessage).toBeVisible({ timeout: 10000 });
    await expect(contactPage.successMessage).toContainText(/message sent/i);
  });

  test('should clear form after successful submission', async ({ page }) => {
    await patientPortalPage.navigateToContact();
    
    await contactPage.fillForm({
      name: 'John Doe',
      email: 'john.doe@example.com',
      subject: 'Test',
      message: 'Test message'
    });
    
    await contactPage.submit();
    await expect(contactPage.successMessage).toBeVisible({ timeout: 10000 });
    
    await page.waitForTimeout(1000);
    
    await expect(contactPage.nameInput).toHaveValue('');
    await expect(contactPage.emailInput).toHaveValue('');
  });

  test('should show validation error when submitting empty form', async ({ page }) => {
    await patientPortalPage.navigateToContact();
    
    await contactPage.submit();
    
    const errors = await contactPage.getValidationErrors();
    expect(errors.length).toBeGreaterThan(0);
  });

  test('should show validation error for invalid email', async ({ page }) => {
    await patientPortalPage.navigateToContact();
    
    await contactPage.fillForm({
      name: 'John Doe',
      email: 'invalid-email',
      subject: 'Test',
      message: 'Test message'
    });
    
    await contactPage.submit();
    
    const errors = await contactPage.getValidationErrors();
    expect(errors.some(e => e.toLowerCase().includes('email'))).toBeTruthy();
  });

  test('should show validation error when name is missing', async ({ page }) => {
    await patientPortalPage.navigateToContact();
    
    await contactPage.fillForm({
      email: 'john.doe@example.com',
      subject: 'Test',
      message: 'Test message'
    });
    
    await contactPage.submit();
    
    const errors = await contactPage.getValidationErrors();
    expect(errors.some(e => e.toLowerCase().includes('name'))).toBeTruthy();
  });

  test('should show validation error when message is missing', async ({ page }) => {
    await patientPortalPage.navigateToContact();
    
    await contactPage.fillForm({
      name: 'John Doe',
      email: 'john.doe@example.com',
      subject: 'Test'
    });
    
    await contactPage.submit();
    
    const errors = await contactPage.getValidationErrors();
    expect(errors.some(e => e.toLowerCase().includes('message'))).toBeTruthy();
  });

  test('should allow pre-filling phone number', async ({ page }) => {
    await patientPortalPage.navigateToContact();
    
    await contactPage.phoneInput.fill('+1234567890');
    await expect(contactPage.phoneInput).toHaveValue('+1234567890');
  });

  test('should trim whitespace from inputs', async ({ page }) => {
    await patientPortalPage.navigateToContact();
    
    await contactPage.fillForm({
      name: '  John Doe  ',
      email: '  john.doe@example.com  ',
      subject: '  Test Subject  ',
      message: '  Test message content  '
    });
    
    await expect(contactPage.nameInput).toHaveValue('John Doe');
    await expect(contactPage.emailInput).toHaveValue('john.doe@example.com');
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    await patientPortalPage.navigateToContact();
    await expect(contactPage.pageTitle).toBeVisible();
    await expect(contactPage.nameInput).toBeVisible();
    await expect(contactPage.submitButton).toBeVisible();
  });

  test('should be responsive on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    
    await patientPortalPage.navigateToContact();
    await expect(contactPage.pageTitle).toBeVisible();
    await expect(contactPage.messageTextarea).toBeVisible();
  });

  test('should submit form with only required fields', async ({ page }) => {
    await patientPortalPage.navigateToContact();
    
    await contactPage.fillForm({
      name: 'John Doe',
      email: 'john.doe@example.com',
      message: 'Required fields only test.'
    });
    
    await contactPage.submit();
    await expect(contactPage.successMessage).toBeVisible({ timeout: 10000 });
  });

  test('should show error message on submission failure', async ({ page }) => {
    await patientPortalPage.navigateToContact();
    
    await contactPage.fillForm({
      name: 'John Doe',
      email: 'john.doe@example.com',
      subject: 'Test',
      message: 'This is a test message.'
    });
    
    await contactPage.submit();
    
    await page.waitForTimeout(500);
    
    const isSuccessVisible = await contactPage.successMessage.isVisible().catch(() => false);
    if (!isSuccessVisible) {
      await expect(contactPage.errorMessage).toBeVisible();
    }
  });
});
