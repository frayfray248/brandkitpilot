import { test as setup } from '@playwright/test';
import { execSync } from 'child_process';

setup('Seed test database', async ({ }) => {

    if (process.env.NODE_ENV === 'test') {
        try {

            // Run seed script to populate test data
            execSync('npm run seed', { stdio: 'pipe' });

            console.log('✅ Test database setup completed');
        } catch (error) {
            console.error('❌ Test database setup failed:', error);
            throw error;
        }
    }
})