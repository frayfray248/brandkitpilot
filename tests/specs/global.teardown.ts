
import prisma from '@/db/db';
import { test as teardown } from '@playwright/test';

teardown('delete database', async ({ }) => {
    if (process.env.NODE_ENV === 'test') {
        try {


            
            await prisma.user.delete({ where: { email: process.env.TESTMAIL_USER_EMAIL! } });
            

            console.log('✅ Test database cleaned up successfully');
        } catch (error) {
            console.error('❌ Test database teardown failed:', error);
            await prisma.$disconnect();
            throw error;
        }
    }
});