import { test as setup } from '@playwright/test';
import { execSync } from 'child_process';

/**
 * Global test setup - Seeds the test database before any tests run.
 * 
 * This runs once before all test files when using the 'setup db' project.
 * It ensures the database has the required test data.
 */
setup('Seed test database', async ({ }) => {
    // Only seed in test environment to prevent accidental production modifications
    if (process.env.NODE_ENV !== 'test') {
        console.log('⚠️ Skipping database seed: NODE_ENV is not "test"');
        return;
    }

    const maxRetries = 3;
    const retryDelay = 2000; // 2 seconds

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(`🌱 Seeding test database (attempt ${attempt}/${maxRetries})...`);
            
            // Run seed script with increased timeout for CI environments
            execSync('npm run seed', { 
                stdio: 'pipe',
                timeout: 60000, // 60 second timeout
                env: { ...process.env, NODE_ENV: 'test' }
            });
            
            console.log('✅ Test database setup completed');
            return; // Success - exit the retry loop
            
        } catch (error) {
            const isLastAttempt = attempt === maxRetries;
            
            if (isLastAttempt) {
                console.error('❌ Test database setup failed after all retries:', error);
                throw error;
            }
            
            console.warn(`⚠️ Seed attempt ${attempt} failed, retrying in ${retryDelay}ms...`);
            await new Promise(resolve => setTimeout(resolve, retryDelay));
        }
    }
})