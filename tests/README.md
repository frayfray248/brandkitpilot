# E2E Test Structure Documentation

## Overview
Playwright E2E tests for Brand Kit Pilot with Docker-based test execution, database seeding, and real email testing using Testmail.app. The test suite validates authentication flows including magic link signup and login.

## Architecture

### Docker-Based Testing
Tests run in isolated Docker containers to ensure consistent environments and proper dependency management. The test container includes:
- Node.js runtime
- Playwright browsers (Chromium, Firefox, WebKit)
- Better Auth CLI for schema generation
- All project dependencies

### Database Setup
Before each test run, the database is automatically seeded with test data via the global setup script. This ensures tests have access to necessary baseline data.

## Email Testing with Testmail.app

### Setup
1. Sign up for a free account at [https://testmail.app](https://testmail.app)
2. Create a namespace for your tests
3. Get your API key from the dashboard
4. Configure environment variables in `.env.test.local`:
   ```bash
   TESTMAIL_APIKEY=your-api-key-here
   TESTMAIL_NAMESPACE=your-namespace
   TESTMAIL_USER_EMAIL=your-test-email@testmail.app
   TESTMAIL_USER_NAME=Test User
   ```

### How It Works
- **Real Email Testing**: Tests send actual emails and wait for them to arrive at Testmail.app
- **Magic Link Extraction**: Automatically extracts verification URLs from email content
- **Live Query**: Uses Testmail's live query feature to poll for new emails with configurable timeout

### Email Flow
1. Test triggers email (signup/login form submission)
2. `TestEmail.waitForMagicLink()` polls Testmail API for new emails
3. Email content is fetched and parsed
4. Magic link URL is extracted using regex patterns
5. Test navigates to the extracted URL to complete authentication

## Directory Structure

```
tests/
├── fixtures.ts              # Test fixtures and dependency injection
├── index.ts                  # Main exports for test utilities
├── helpers/                 # Test utility classes
│   ├── AuthHelper.ts        # Authentication state checking
│   └── TestEmail.ts         # Email testing with Testmail.app
├── pages/                   # Page Object Model classes
│   ├── LoginPage.ts         # Login page interactions
│   ├── SignupPage.ts        # Signup page interactions
│   └── DashboardPage.ts     # Dashboard page interactions
└── specs/                   # Test specification files
    ├── global.setup.ts      # Database seeding before test run
    └── magiclink.spec.ts    # Magic link authentication tests
```

## Configuration

### Playwright Config (`playwright.config.ts`)
- **Test Directory**: `./tests/specs`
- **Projects**: 
  - `setup db`: Runs global setup (database seeding)
  - `chromium`: Main test execution (depends on setup)
- **Web Server**: Automatically starts Next.js app before tests
  - Generates Prisma client
  - Builds production bundle
  - Starts Next.js server on port 3000
- **Base URL**: `http://localhost:3000` (configurable via `APP_URL` env var)

### Environment Variables (`.env.test.local`)
Required for test execution:
```bash
# Testmail.app Configuration
TESTMAIL_APIKEY=your-api-key
TESTMAIL_NAMESPACE=your-namespace
TESTMAIL_USER_EMAIL=testuser@yourdomain.testmail.app
TESTMAIL_USER_NAME=Test User

# Application URL (optional)
APP_URL=http://localhost:3000

# Database Configuration
DATABASE_URL=mongodb+srv://...
# ... other app-specific env vars
```

## Test Fixtures

### `testUser`
Provides test user credentials from environment variables:
```typescript
{
  name: process.env.TESTMAIL_USER_NAME,
  email: process.env.TESTMAIL_USER_EMAIL
}
```

### `authHelper`
Authentication helper instance for checking login state:
```typescript
const { authHelper } = context;
await authHelper.isLoggedIn(); // Returns true/false
```

### `testEmail`
Testmail.app client for email operations:
```typescript
const { testEmail } = context;

// Wait for and extract magic link
const magicLink = await testEmail.waitForMagicLink(timestamp, timeout);

// Get raw email
const email = await testEmail.waitForEmail(timestamp, timeout);

// Extract link manually
const link = testEmail.extractMagicLink(email.text);
```

## Usage

### Running Tests

```bash
# Build test Docker image (first time or after Dockerfile changes)
npm run containers:build-test

# Run all tests
npm run test

# Run specific test file
npm run test -- magiclink.spec.ts

# Run with UI mode (not recommended in Docker)
npm run test -- --ui

# Run with headed browsers (requires X11 forwarding)
npm run test -- --headed
```

### Writing Tests

**Import fixtures and utilities:**
```typescript
import { test, expect } from '../fixtures';
import { SignupPage, LoginPage, AuthHelper } from '../index';
```

**Basic test structure:**
```typescript
test.describe('Feature Tests', () => {
  let signupPage: SignupPage;
  let authHelper: AuthHelper;

  test.beforeEach(async ({ page }) => {
    signupPage = new SignupPage(page);
    authHelper = new AuthHelper(page);
  });

  test('should authenticate with magic link', async ({ page, testUser, testEmail }) => {
    const timestamp = Date.now();
    
    // Trigger email
    await signupPage.goto();
    await signupPage.signup(testUser.name, testUser.email);
    
    // Wait for and extract magic link
    const magicLink = await testEmail.waitForMagicLink(timestamp, 30000);
    
    // Navigate to magic link
    await page.goto(magicLink);
    
    // Verify authentication
    expect(await authHelper.isLoggedIn()).toBe(true);
  });
});
```

## API Reference

## Page Objects

### LoginPage
- `goto()` - Navigate to `/login`
- `fillEmail(email)` - Fill email input field
- `clickSendMagicLink()` - Click submit button
- `login(email)` - Complete login flow (fill email + submit)

### SignupPage
- `goto()` - Navigate to `/signup`
- `fillName(name)` - Fill name input field
- `fillEmail(email)` - Fill email input field
- `clickSignUp()` - Click submit button
- `signup(name, email)` - Complete signup flow
- `getSuccessMessage()` - Get success message text
- `getErrorMessage()` - Get error message text

### DashboardPage
- `goto()` - Navigate to `/dashboard`
- `isLoggedIn()` - Check authentication state
- `logout()` - Perform logout action

## Helpers

### AuthHelper
```typescript
class AuthHelper {
  constructor(page: Page)
  
  // Check if user is logged in by looking for "Sign Out" button
  async isLoggedIn(): Promise<boolean>
}
```

### TestEmail
```typescript
class TestEmail {
  constructor(apiKey: string, namespace: string)
  
  // Wait for email to arrive and return parsed email object
  async waitForEmail(fromTime: number, timeout?: number): Promise<Email>
  
  // Extract magic link URL from email text content
  extractMagicLink(emailText: string): string | null
  
  // Wait for email and extract magic link in one step
  async waitForMagicLink(fromTime: number, timeout?: number): Promise<string>
}
```

**Email Object Schema:**
```typescript
{
  oid: string;      // Email ID
  from: string;     // Sender email
  to: string;       // Recipient email
  text: string;     // Email body text
  date: number;     // Unix timestamp
}
```

## Global Setup

The `global.setup.ts` file runs before any tests execute and handles database initialization:

```typescript
// Runs database seeding if NODE_ENV=test
setup('Seed test database', async () => {
  if (process.env.NODE_ENV === 'test') {
    execSync('npm run db:seed');
  }
});
```

This ensures your test database has baseline data before tests run. The setup project runs as a dependency for all test projects.

## Docker Configuration

### Dockerfile (`docker/Dockerfile.playwright`)
- Base image: `mcr.microsoft.com/playwright:v1.56.1-noble`
- Installs project dependencies
- Installs Better Auth CLI globally
- Copies project files into container

### Running in Docker
The `npm run test` command:
1. Mounts project directory to `/app` in container
2. Preserves `node_modules` and `generated` folders via volume mounts
3. Loads environment variables from `.env.test.local`
4. Sets `NODE_ENV=test`
5. Runs Playwright tests with full browser support

## Troubleshooting

### Common Issues

**Email timeout errors:**
- Verify Testmail.app API key is correct
- Check namespace matches your Testmail.app settings
- Increase timeout value if emails are slow to arrive
- Check Testmail.app dashboard for email delivery status

**Database seed errors:**
- Ensure `DATABASE_URL` is properly configured in `.env.test.local`
- Verify database connection is accessible from Docker container
- Check that seed script (`npm run db:seed`) works outside Docker

**"Sign Out" button not found:**
- Application may not have proper authentication state
- Check that magic link navigation actually completed
- Verify Better Auth is configured correctly
- Check application logs for authentication errors

**Container environment variables not loading:**
- Ensure `.env.test.local` file exists in project root
- Verify file is not in `.gitignore` or `.dockerignore`
- Check that `--env-file` flag points to correct file
- Use `docker exec` to inspect environment variables in running container

### Debug Mode

View test execution in real-time:
```bash
# Run with headed browsers (requires X11 forwarding on Linux)
npm run test -- --headed

# Run with debug mode
npm run test -- --debug

# View test traces after failure
npx playwright show-report
```

### Debugging in Container

```bash
# Get container ID
docker ps

# Execute into running container
docker exec -it <container-id> bash

# Check environment variables
env | grep TESTMAIL

# Run tests manually
npx playwright test --headed
```

## Best Practices

1. **Timestamps**: Always capture `Date.now()` BEFORE triggering email actions to ensure you don't miss emails
2. **Timeouts**: Use appropriate timeouts for email operations (30-60 seconds recommended)
3. **Email Extraction**: Magic link patterns are defined in `TestEmail.extractMagicLink()` - update regex if email format changes
4. **Isolation**: Each test should be independent - don't rely on state from previous tests
5. **Database State**: Global setup seeds the database once - tests share this baseline data
6. **Environment Variables**: Keep `.env.test.local` separate from `.env.local` to avoid conflicts

## Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Testmail.app Documentation](https://testmail.app/docs)
- [Better Auth Documentation](https://www.better-auth.com/docs)
- [Docker Documentation](https://docs.docker.com/)