import { getRedisStatus, checkRedisHealth } from "@/lib/redis/connection";
import { NextResponse } from "next/server";
import {
    HEALTH_STATUS_HEALTHY,
    HEALTH_STATUS_UNHEALTHY,
    HEALTH_STATUS_ERROR,
    HTTP_STATUS_OK,
    HTTP_STATUS_SERVICE_UNAVAILABLE,
    HTTP_STATUS_INTERNAL_SERVER_ERROR,
    CACHE_CONTROL_NO_CACHE,
    PRAGMA_NO_CACHE,
    EXPIRES_IMMEDIATE,
    UNKNOWN_VERSION,
    UNKNOWN_ENVIRONMENT,
    REDIS_STATUS_ERROR
} from "@/lib/redis/const";

/**
 * Health check endpoint for Redis connection and system status
 * 
 * GET /api/health
 * Returns Redis connection status and overall system health
 */
export async function GET() {
    try {
        // Get Redis connection status
        const redisStatus = getRedisStatus();
        
        // Perform Redis health check (ping)
        const redisHealthy = await checkRedisHealth();
        
        // Calculate overall health
        const isHealthy = redisStatus.isConnected && redisHealthy;
        
        const healthData = {
            status: isHealthy ? HEALTH_STATUS_HEALTHY : HEALTH_STATUS_UNHEALTHY,
            timestamp: new Date().toISOString(),
            services: {
                redis: {
                    status: redisStatus.status,
                    connected: redisStatus.isConnected,
                    pingSuccessful: redisHealthy,
                    connectedAt: redisStatus.connectedAt,
                }
            },
            version: process.env.npm_package_version || UNKNOWN_VERSION,
            environment: process.env.NODE_ENV || UNKNOWN_ENVIRONMENT,
        };

        // Return appropriate HTTP status
        const statusCode = isHealthy ? HTTP_STATUS_OK : HTTP_STATUS_SERVICE_UNAVAILABLE;
        
        return NextResponse.json(healthData, { 
            status: statusCode,
            headers: {
                'Cache-Control': CACHE_CONTROL_NO_CACHE,
                'Pragma': PRAGMA_NO_CACHE,
                'Expires': EXPIRES_IMMEDIATE,
            }
        });

    } catch (error) {
        console.error('Health check failed:', error);
        
        const errorResponse = {
            status: HEALTH_STATUS_ERROR,
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : 'Unknown error',
            services: {
                redis: {
                    status: REDIS_STATUS_ERROR,
                    connected: false,
                    pingSuccessful: false,
                }
            }
        };

        return NextResponse.json(errorResponse, { 
            status: HTTP_STATUS_INTERNAL_SERVER_ERROR,
            headers: {
                'Cache-Control': CACHE_CONTROL_NO_CACHE,
                'Pragma': PRAGMA_NO_CACHE,
                'Expires': EXPIRES_IMMEDIATE,
            }
        });
    }
}