import { Page } from '@playwright/test';

// Page Object Model for Signup Page
export class SignupPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/signup');
  }

  async fillName(name: string) {
    await this.page.fill('[name="name"]', name);
  }

  async fillEmail(email: string) {
    await this.page.fill('[name="email"]', email);
  }

  async clickSignUp() {
    await this.page.click('button[type="submit"]');
  }

  async signup(name: string, email: string) {
    await this.fillName(name);
    await this.fillEmail(email);
    await this.clickSignUp();
  }

  async getSuccessMessage() {
    return await this.page.textContent('text=/magic.*link.*sent|check.*email/i');
  }

  async getErrorMessage() {
    return await this.page.textContent('[data-testid="error-message"]');
  }
}