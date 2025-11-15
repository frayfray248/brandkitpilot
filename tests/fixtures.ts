import { test as base } from '@playwright/test';
import { AuthHelper } from './helpers/AuthHelper';
import { TestEmail } from './helpers/TestEmail';

// Test user interface
export interface TestUser {
    email: string;
    name: string;
}

// Test context interface
export interface TestContext {
    testUser: TestUser;
    realTestInbox?: { email: string; inboxId: string };
    authHelper: AuthHelper;
    testEmail: TestEmail;
}

// Extended test fixture with auth helpers
export const test = base.extend<TestContext>({
    testUser: async ({ }, use) => {
        const user = {
            name: process.env.TESTMAIL_USER_NAME!,
            email: process.env.TESTMAIL_USER_EMAIL!,
        }
        await use(user);
    },

    authHelper: async ({ page }, use) => {
        const authHelper = new AuthHelper(page);
        await use(authHelper);
    },

    testEmail: async ({ }, use) => {
        const testEmail = new TestEmail(process.env.TESTMAIL_APIKEY!, process.env.TESTMAIL_NAMESPACE!);
        await use(testEmail);
    }

});

export { expect } from '@playwright/test';