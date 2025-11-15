import { Page } from '@playwright/test';

// Page Object Model for Dashboard/Protected Pages
export class DashboardPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/dashboard');
  }

  async isLoggedIn() {
    // Check for user-specific content or logout button
    return await this.page.isVisible('[data-testid="user-menu"]') || 
           await this.page.isVisible('text=Dashboard');
  }

  async logout() {
    // Click user menu/profile dropdown
    await this.page.click('[data-testid="user-menu"]');
    // Click logout option
    await this.page.click('text=Logout');
  }
}