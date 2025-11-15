import { Page } from '@playwright/test';

// Authentication helper utilities
export class AuthHelper {
    constructor(private page: Page) {
    }

    async isLoggedIn() {
        try {
            // Check for session-specific elements
            await this.page.waitForSelector('button:has-text("Sign Out")', { timeout: 3000 });
            return true;
        } catch {
            return false;
        }
    }
}