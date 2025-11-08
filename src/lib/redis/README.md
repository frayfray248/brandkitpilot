# Redis Connection Pooling & Singleton Pattern

This module provides a centralized Redis connection management system with singleton pattern and connection pooling for the BrandKit Pilot application.

## Features

- **Singleton Pattern**: Single Redis connection instance shared across the application
- **Connection Pooling**: Optimized Redis connection configuration with pooling
- **BullMQ Integration**: Specifically configured for BullMQ queue operations
- **Health Monitoring**: Built-in health checks and connection status monitoring
- **Graceful Shutdown**: Proper connection cleanup on application termination
- **Error Recovery**: Automatic reconnection and error handling

## Usage

### Basic Connection

```typescript
import { getRedisConnection } from '@/lib/redis/connection';

// Get shared Redis connection
const redis = await getRedisConnection();

// Use Redis commands
await redis.set('key', 'value');
const value = await redis.get('key');
```

### Queue Integration

```typescript
import { getBrandkitQueue } from '@/lib/queue/queue';

// Get queue with shared Redis connection
const queue = await getBrandkitQueue();

// Add job to queue
await queue.add('job-name', { data: 'example' });
```

### Health Monitoring

```typescript
import { getRedisStatus, checkRedisHealth } from '@/lib/redis/connection';

// Get connection status
const status = getRedisStatus();
console.log('Connected:', status.isConnected);
console.log('Status:', status.status);

// Perform health check (ping)
const isHealthy = await checkRedisHealth();
console.log('Redis healthy:', isHealthy);
```

### Health Check API

The system provides a health check endpoint at `/api/health` that returns:

```json
{
  "status": "healthy",
  "timestamp": "2025-11-07T20:00:00.000Z",
  "services": {
    "redis": {
      "status": "ready",
      "connected": true,
      "pingSuccessful": true,
      "connectedAt": "2025-11-07T20:00:00.000Z"
    }
  },
  "version": "0.3.0",
  "environment": "development"
}
```

## Configuration

The Redis connection is configured with the following optimizations:

### BullMQ Requirements
- `maxRetriesPerRequest: null` - Required for BullMQ
- `enableReadyCheck: false` - Required for BullMQ

### Performance Optimizations
- `connectTimeout: 10000` - 10 second connection timeout
- `commandTimeout: 5000` - 5 second command timeout
- `lazyConnect: true` - Connect only when needed
- `enableAutoPipelining: true` - Automatic command pipelining
- `keepAlive: 30000` - 30 second keep-alive interval

### Error Recovery
- Automatic reconnection on Redis failover
- Connection health monitoring
- Graceful error handling and logging

## Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Application   │    │  Redis Manager   │    │   Redis Server  │
│                 │    │   (Singleton)    │    │                 │
├─────────────────┤    ├──────────────────┤    ├─────────────────┤
│ Queue Actions   │───▶│ getConnection()  │───▶│   Connection    │
│ Worker Process  │───▶│ Health Checks    │───▶│   Pool          │
│ Health API      │───▶│ Status Monitor   │───▶│   Commands      │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## Migration from Previous Implementation

### Before (Multiple Connections)
```typescript
// queue.ts
const connection = new IORedis(serverEnv.REDIS_URL, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
});

// worker.ts
const connection = new IORedis(serverEnv.REDIS_URL, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
});
```

### After (Shared Connection)
```typescript
// queue.ts
import { getRedisConnection } from '@/lib/redis/connection';
const connection = await getRedisConnection();

// worker.ts
import { getRedisConnection } from '@/lib/redis/connection';
const connection = await getRedisConnection();
```

## Benefits

1. **Memory Efficiency**: Single connection instead of multiple instances
2. **Connection Management**: Centralized configuration and monitoring
3. **Better Performance**: Connection pooling and optimization
4. **Health Monitoring**: Built-in health checks and status reporting
5. **Maintainability**: Single point of configuration for Redis settings
6. **Reliability**: Improved error handling and recovery mechanisms

## Environment Variables

Required environment variables:

- `REDIS_URL`: Redis connection string (e.g., `redis://localhost:6379`)

## Development

### Running Tests

```bash
npm test src/lib/redis/connection.test.ts
```

### Monitoring Connection

Check the health endpoint:
```bash
curl http://localhost:3000/api/health
```

### Docker Development

The Redis server runs in Docker during development:
```bash
npm run containers:start-dev
```

This starts a Valkey (Redis-compatible) instance on port 6379.

## Troubleshooting

### Connection Issues

1. **Check Redis Server**: Ensure Redis/Valkey is running
2. **Verify URL**: Check `REDIS_URL` environment variable
3. **Network**: Ensure network connectivity to Redis server
4. **Health Check**: Use `/api/health` endpoint to diagnose issues

### Performance Issues

1. **Monitor Connections**: Check connection status and health
2. **Review Logs**: Look for reconnection patterns or errors
3. **Check Configuration**: Verify timeout and pooling settings
4. **Resource Usage**: Monitor Redis server resource consumption

### Common Errors

- **Connection Timeout**: Increase `connectTimeout` if needed
- **Command Timeout**: Increase `commandTimeout` for slow operations
- **Max Connections**: Monitor Redis server connection limits

## Future Enhancements

- [ ] Connection metrics and monitoring dashboard
- [ ] Multiple Redis instances support (clustering)
- [ ] Connection retry strategies configuration
- [ ] Performance monitoring and alerts
- [ ] Redis Sentinel support for high availability