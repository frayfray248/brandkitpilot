import { test, expect } from '../fixtures';
import { waitForMagicLink } from '../helpers/email';
import { SignupPage, AuthHelper, LoginPage } from '../index';

test.describe('Magic Link Signup Flow', () => {
    let signupPage: SignupPage;
    let loginPage: LoginPage;
    let authHelper: AuthHelper;

    test.beforeEach(async ({ page }) => {
        signupPage = new SignupPage(page);
        authHelper = new AuthHelper(page);
        loginPage = new LoginPage(page);
    });

    test('should handle signup email with magic link', async ({ page, testUser }) => {

        const now = Date.now();
        await signupPage.goto();
        await signupPage.signup(testUser.name, testUser.email);

        const magicLink = await waitForMagicLink(now, 30000);

        // Navigate to the magic link
        await page.goto(magicLink);


        const isLoggedIn = await authHelper.isLoggedIn();
        expect(isLoggedIn).toBe(true);
    });

    test('should handle signin email with magic link', async ({ page, testUser }) => {
        const now = Date.now();
        await loginPage.goto();
        await loginPage.login(testUser.email);

        const magicLink = await waitForMagicLink(now, 30000);

        // Navigate to the magic link
        await page.goto(magicLink);

        const isLoggedIn = await authHelper.isLoggedIn();
        expect(isLoggedIn).toBe(true);
    });


});