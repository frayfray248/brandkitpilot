/**
 * Redis Connection Management Module
 * 
 * Provides centralized Redis connection management with singleton pattern,
 * connection pooling, and health monitoring for the BrandKit Pilot application.
 */

export {
    getRedisConnection,
    getRedisStatus,
    checkRedisHealth,
    closeRedisConnection,
    forceCloseRedisConnection,
    default as RedisManager
} from './connection';

// Re-export constants for external use
export * from './const';

// Re-export types for external use
export type { RedisOptions } from 'ioredis';