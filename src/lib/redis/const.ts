/**
 * Redis Connection Constants
 * 
 * Centralized configuration values for Redis connection management,
 * BullMQ integration, and health monitoring.
 */

// Connection Timeouts (milliseconds)
export const REDIS_CONNECT_TIMEOUT_MS = 10000; // 10 seconds
export const REDIS_COMMAND_TIMEOUT_MS = 30000;  // 30 seconds
export const REDIS_KEEP_ALIVE_MS = 30000;      // 30 seconds

// Network Configuration
export const REDIS_IP_FAMILY = 4; // IPv4

// Connection Status Values
export const REDIS_STATUS_READY = 'ready';
export const REDIS_STATUS_DISCONNECTED = 'disconnected';
export const REDIS_STATUS_ERROR = 'error';

// Health Check Response Values
export const REDIS_PING_RESPONSE = 'PONG';

// Error Types for Reconnection Logic
export const REDIS_RECONNECT_ERROR_TYPES = [
    'READONLY',
    'ENOTFOUND', 
    'ECONNRESET',
    'ETIMEDOUT'
] as const;

// Test Constants
export const TEST_KEY_NAME = 'test-key';
export const TEST_KEY_VALUE = 'test-value';
export const TEST_CONNECT_TIMEOUT_EXPECTED = 10000;
export const TEST_COMMAND_TIMEOUT_EXPECTED = 5000;

// Health API Constants
export const HEALTH_STATUS_HEALTHY = 'healthy';
export const HEALTH_STATUS_UNHEALTHY = 'unhealthy';
export const HEALTH_STATUS_ERROR = 'error';

// HTTP Status Codes
export const HTTP_STATUS_OK = 200;
export const HTTP_STATUS_SERVICE_UNAVAILABLE = 503;
export const HTTP_STATUS_INTERNAL_SERVER_ERROR = 500;

// Cache Control Headers
export const CACHE_CONTROL_NO_CACHE = 'no-cache, no-store, must-revalidate';
export const PRAGMA_NO_CACHE = 'no-cache';
export const EXPIRES_IMMEDIATE = '0';

// Environment Fallback Values  
export const UNKNOWN_VERSION = 'unknown';
export const UNKNOWN_ENVIRONMENT = 'unknown';

// BullMQ Required Configuration
export const BULLMQ_MAX_RETRIES_PER_REQUEST = null;
export const BULLMQ_ENABLE_READY_CHECK = false;
export const BULLMQ_LAZY_CONNECT = true;
export const BULLMQ_ENABLE_AUTO_PIPELINING = true;