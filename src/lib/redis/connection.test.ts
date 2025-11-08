import { describe, it, expect, afterAll } from 'vitest';
import { 
    getRedisConnection, 
    getRedisStatus, 
    checkRedisHealth,
    closeRedisConnection 
} from '@/lib/redis/connection';
import { getBrandkitQueue } from '@/lib/queue/queue';
import {
    REDIS_STATUS_READY,
    REDIS_STATUS_DISCONNECTED,
    TEST_KEY_NAME,
    TEST_KEY_VALUE,
    TEST_CONNECT_TIMEOUT_EXPECTED,
    TEST_COMMAND_TIMEOUT_EXPECTED,
    BULLMQ_MAX_RETRIES_PER_REQUEST,
    BULLMQ_ENABLE_READY_CHECK,
    BULLMQ_LAZY_CONNECT,
    BULLMQ_ENABLE_AUTO_PIPELINING
} from '@/lib/redis/const';

describe('Redis Connection Pooling & Singleton Pattern', () => {
    
    afterAll(async () => {
        // Clean up connections after tests
        await closeRedisConnection();
    });

    describe('Redis Connection Manager', () => {
        it('should return the same connection instance (singleton pattern)', async () => {
            const connection1 = await getRedisConnection();
            const connection2 = await getRedisConnection();
            
            expect(connection1).toBe(connection2);
        });

        it('should establish a working Redis connection', async () => {
            const connection = await getRedisConnection();
            
            expect(connection.status).toBe(REDIS_STATUS_READY);
            
            // Test basic Redis operations
            await connection.set(TEST_KEY_NAME, TEST_KEY_VALUE);
            const value = await connection.get(TEST_KEY_NAME);
            expect(value).toBe(TEST_KEY_VALUE);
            
            // Clean up
            await connection.del(TEST_KEY_NAME);
        });

        it('should report correct connection status', async () => {
            // Ensure connection is established
            await getRedisConnection();
            
            const status = getRedisStatus();
            expect(status.isConnected).toBe(true);
            expect(status.status).toBe(REDIS_STATUS_READY);
            expect(status.connectedAt).toBeInstanceOf(Date);
        });

        it('should pass health check', async () => {
            const isHealthy = await checkRedisHealth();
            expect(isHealthy).toBe(true);
        });
    });

    describe('Queue Integration', () => {
        it('should create queue with shared Redis connection', async () => {
            const queue = await getBrandkitQueue();
            expect(queue).toBeDefined();
            
            // Test that queue uses the same connection
            const redisConnection = await getRedisConnection();
            expect(queue.opts.connection).toBe(redisConnection);
        });

        it('should reuse same queue instance', async () => {
            const queue1 = await getBrandkitQueue();
            const queue2 = await getBrandkitQueue();
            
            expect(queue1).toBe(queue2);
        });
    });

    describe('Connection Configuration', () => {
        it('should have BullMQ-optimized settings', async () => {
            const connection = await getRedisConnection();
            
            // Check BullMQ-required settings
            expect(connection.options.maxRetriesPerRequest).toBe(BULLMQ_MAX_RETRIES_PER_REQUEST);
            expect(connection.options.enableReadyCheck).toBe(BULLMQ_ENABLE_READY_CHECK);
            
            // Check optimization settings
            expect(connection.options.connectTimeout).toBe(TEST_CONNECT_TIMEOUT_EXPECTED);
            expect(connection.options.commandTimeout).toBe(TEST_COMMAND_TIMEOUT_EXPECTED);
            expect(connection.options.lazyConnect).toBe(BULLMQ_LAZY_CONNECT);
            expect(connection.options.enableAutoPipelining).toBe(BULLMQ_ENABLE_AUTO_PIPELINING);
        });
    });

    describe('Error Handling', () => {
        it('should handle connection status when disconnected', async () => {
            // Close connection
            await closeRedisConnection();
            
            const status = getRedisStatus();
            expect(status.isConnected).toBe(false);
            expect(status.status).toBe(REDIS_STATUS_DISCONNECTED);
        });

        it('should handle health check when disconnected', async () => {
            // Ensure connection is closed
            await closeRedisConnection();
            
            const isHealthy = await checkRedisHealth();
            expect(isHealthy).toBe(false);
        });
    });
});

describe('Health Check API Integration', () => {
    it('should provide comprehensive health status', async () => {
        // This would typically be tested with a request to /api/health
        // For now, we'll test the underlying functionality
        
        const status = getRedisStatus();
        const health = await checkRedisHealth();
        
        expect(typeof status.status).toBe('string');
        expect(typeof status.isConnected).toBe('boolean');
        expect(typeof health).toBe('boolean');
    });
});