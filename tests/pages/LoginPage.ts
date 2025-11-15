import { Page } from '@playwright/test';

// Page Object Model for Login Page
export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/login');
  }

  async fillEmail(email: string) {
    await this.page.fill('[name="email"]', email);
  }

  async clickSendMagicLink() {
    await this.page.click('button[type="submit"]:has-text("Send Magic Link")');
  }

  async login(email: string) {
    await this.fillEmail(email);
    await this.clickSendMagicLink();
  }
}