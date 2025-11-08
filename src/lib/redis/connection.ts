import serverEnv from "@/lib/env/serverEnv";
import IORedis, { RedisOptions } from "ioredis";
import {
    REDIS_CONNECT_TIMEOUT_MS,
    REDIS_COMMAND_TIMEOUT_MS,
    REDIS_KEEP_ALIVE_MS,
    REDIS_IP_FAMILY,
    REDIS_STATUS_READY,
    REDIS_STATUS_DISCONNECTED,
    REDIS_PING_RESPONSE,
    REDIS_RECONNECT_ERROR_TYPES,
    BULLMQ_MAX_RETRIES_PER_REQUEST,
    BULLMQ_ENABLE_READY_CHECK,
    BULLMQ_LAZY_CONNECT,
    BULLMQ_ENABLE_AUTO_PIPELINING
} from "./const";

/**
 * Redis Connection Manager with Singleton Pattern
 * 
 * Provides centralized Redis connection management with:
 * - Singleton pattern to prevent multiple connections
 * - Connection pooling and optimization
 * - Health monitoring and retry logic
 * - Graceful shutdown handling
 */
class RedisConnectionManager {
    private static instance: RedisConnectionManager;
    private connection: IORedis | null = null;
    private isConnecting = false;
    private connectionPromise: Promise<IORedis> | null = null;
    private connectedAt: Date | null = null;

    private constructor() { }

    /**
     * Get singleton instance of RedisConnectionManager
     */
    public static getInstance(): RedisConnectionManager {
        if (!RedisConnectionManager.instance) {
            RedisConnectionManager.instance = new RedisConnectionManager();
        }
        return RedisConnectionManager.instance;
    }

    /**
     * Get Redis connection configuration optimized for BullMQ and general use
     */
    private getConnectionConfig(): RedisOptions {


        return {
            // Connection settings optimized for BullMQ
            maxRetriesPerRequest: BULLMQ_MAX_RETRIES_PER_REQUEST, // Required for BullMQ
            enableReadyCheck: BULLMQ_ENABLE_READY_CHECK,    // Required for BullMQ

            // Connection pooling and optimization
            connectTimeout: REDIS_CONNECT_TIMEOUT_MS,  // Connection timeout
            commandTimeout: REDIS_COMMAND_TIMEOUT_MS,   // Command timeout
            lazyConnect: BULLMQ_LAZY_CONNECT,          // Don't connect immediately

            // Keep-alive settings
            keepAlive: REDIS_KEEP_ALIVE_MS,           // Keep-alive interval

            // Connection pool settings
            family: REDIS_IP_FAMILY,                  // IPv4

            // Health check
            enableAutoPipelining: BULLMQ_ENABLE_AUTO_PIPELINING,

            // Event handlers
            reconnectOnError: (err) => {
                return REDIS_RECONNECT_ERROR_TYPES.some(errorType => err.message.includes(errorType));
            },
        };
    }

    /**
     * Get or create Redis connection
     */
    public async getConnection(): Promise<IORedis> {
        // Return existing connection if available and ready
        if (this.connection && this.connection.status === REDIS_STATUS_READY) {
            return this.connection;
        }

        // If already connecting, wait for that promise
        if (this.isConnecting && this.connectionPromise) {
            return this.connectionPromise;
        }

        // Create new connection
        this.isConnecting = true;
        this.connectionPromise = this.createConnection();

        try {
            this.connection = await this.connectionPromise;
            return this.connection;
        } finally {
            this.isConnecting = false;
            this.connectionPromise = null;
        }
    }

    /**
     * Create new Redis connection with proper error handling
     */
    private async createConnection(): Promise<IORedis> {
        const config = this.getConnectionConfig();
        const connection = new IORedis(serverEnv.REDIS_URL, config);

        // Set up event listeners for monitoring
        this.setupEventListeners(connection);

        // Wait for connection to be ready
        await new Promise<void>((resolve, reject) => {
            connection.once('ready', () => {
                this.connectedAt = new Date();
                console.log('✅ Redis connection established successfully');
                resolve();
            });

            connection.once('error', (error) => {
                console.error('❌ Redis connection failed:', error);
                reject(error);
            });

            // Connect manually since we're using lazyConnect
            connection.connect().catch(reject);
        });

        return connection;
    }

    /**
     * Set up event listeners for connection monitoring
     */
    private setupEventListeners(connection: IORedis): void {
        connection.on('connect', () => {
            console.log('🔗 Redis connecting...');
        });

        connection.on('ready', () => {
            console.log('✅ Redis connection ready');
        });

        connection.on('error', (error) => {
            console.error('❌ Redis error:', error);
        });

        connection.on('close', () => {
            console.log('🔴 Redis connection closed');
        });

        connection.on('reconnecting', (delay: number) => {
            console.log(`🔄 Redis reconnecting in ${delay}ms...`);
        });

        connection.on('end', () => {
            console.log('🔚 Redis connection ended');
        });
    }

    /**
     * Get connection status and health information
     */
    public getConnectionStatus(): {
        status: string;
        isConnected: boolean;
        connectedAt?: Date;
    } {
        if (!this.connection) {
            return {
                status: REDIS_STATUS_DISCONNECTED,
                isConnected: false,
            };
        }

        return {
            status: this.connection.status,
            isConnected: this.connection.status === REDIS_STATUS_READY,
            connectedAt: this.connection.status === REDIS_STATUS_READY ? this.connectedAt ?? undefined : undefined,
        };
    }

    /**
     * Health check - ping Redis server
     */
    public async healthCheck(): Promise<boolean> {
        try {
            if (!this.connection || this.connection.status !== REDIS_STATUS_READY) {
                return false;
            }

            const result = await this.connection.ping();
            return result === REDIS_PING_RESPONSE;
        } catch (error) {
            console.error('Redis health check failed:', error);
            return false;
        }
    }

    /**
     * Gracefully close Redis connection
     */
    public async disconnect(): Promise<void> {
        if (this.connection) {
            console.log('🔄 Closing Redis connection...');
            await this.connection.quit();
            this.connection = null;
            this.connectedAt = null;
            console.log('✅ Redis connection closed gracefully');
        }
    }

    /**
     * Force close connection (for emergencies)
     */
    public async forceDisconnect(): Promise<void> {
        if (this.connection) {
            console.log('⚠️ Force closing Redis connection...');
            this.connection.disconnect();
            this.connection = null;
            this.connectedAt = null;
            console.log('✅ Redis connection force closed');
        }
    }
}

/**
 * Singleton instance of Redis connection manager
 */
const redisManager = RedisConnectionManager.getInstance();

/**
 * Get shared Redis connection
 * 
 * @returns Promise<IORedis> - Shared Redis connection instance
 */
export const getRedisConnection = async (): Promise<IORedis> => {
    return redisManager.getConnection();
};

/**
 * Get Redis connection status
 */
export const getRedisStatus = () => {
    return redisManager.getConnectionStatus();
};

/**
 * Perform Redis health check
 */
export const checkRedisHealth = async (): Promise<boolean> => {
    return redisManager.healthCheck();
};

/**
 * Gracefully close Redis connection
 */
export const closeRedisConnection = async (): Promise<void> => {
    return redisManager.disconnect();
};

/**
 * Force close Redis connection
 */
export const forceCloseRedisConnection = async (): Promise<void> => {
    return redisManager.forceDisconnect();
};

// Signal handlers removed to avoid conflicts with worker-level shutdown logic.

export default redisManager;