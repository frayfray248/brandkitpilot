import prisma from '@/db/db';
import { test as teardown } from '@playwright/test';

/**
 * Global test teardown - Cleans up test data after all tests complete.
 * 
 * This runs once after all test files when using the 'cleanup db' project.
 * It removes test-specific data to keep the test database clean.
 */
teardown('delete database', async ({ }) => {
    // Only cleanup in test environment
    if (process.env.NODE_ENV !== 'test') {
        console.log('⚠️ Skipping database cleanup: NODE_ENV is not "test"');
        return;
    }

    const testEmail = process.env.TESTMAIL_USER_EMAIL;
    
    if (!testEmail) {
        console.warn('⚠️ TESTMAIL_USER_EMAIL not set, skipping user cleanup');
        return;
    }

    try {
        console.log(`🧹 Cleaning up test user: ${testEmail}`);
        
        // Use deleteMany to avoid errors if user doesn't exist
        const result = await prisma.user.deleteMany({ 
            where: { email: testEmail } 
        });
        
        if (result.count > 0) {
            console.log(`✅ Deleted ${result.count} test user(s)`);
        } else {
            console.log('ℹ️ No test users found to delete');
        }
        
        console.log('✅ Test database cleaned up successfully');
        
    } catch (error) {
        // Log but don't fail - teardown errors shouldn't mask test failures
        console.error('⚠️ Test database teardown encountered an error:', error);
        
    } finally {
        // Always disconnect to prevent hanging connections
        await prisma.$disconnect();
    }
});