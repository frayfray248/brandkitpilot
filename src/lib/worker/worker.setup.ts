import { Worker, Job } from "bullmq";
import { getRedisConnection, closeRedisConnection } from "@/lib/redis/connection";

export interface WorkerConfig<T> {
  queueName: string;
  concurrency?: number;
  jobProcessor: (job: Job) => Promise<T>;
}

export interface WorkerEventHandlers<T> {
  onCompleted?: (job: Job, result: T) => void;
  onFailed?: (job: Job | undefined, error: Error) => void;
  onError?: (error: Error) => void;
  onReady?: () => void;
}

export const createWorker = async <T>(
  config: WorkerConfig<T>, 
  eventHandlers?: WorkerEventHandlers<T>
): Promise<Worker> => {
  console.log(`🔄 Initializing worker for queue: ${config.queueName}`);
  
  const connection = await getRedisConnection();

  const worker = new Worker(config.queueName, config.jobProcessor, {
    connection,
    concurrency: config.concurrency || 3
  });

  // Set up event listeners
  if (eventHandlers?.onCompleted) {
    worker.on('completed', eventHandlers.onCompleted);
  }
  
  if (eventHandlers?.onFailed) {
    worker.on('failed', eventHandlers.onFailed);
  }
  
  if (eventHandlers?.onError) {
    worker.on('error', eventHandlers.onError);
  }
  
  if (eventHandlers?.onReady) {
    worker.on('ready', eventHandlers.onReady);
  }

  return worker;
}

export const setupGracefulShutdown = (worker: Worker): void => {
  let isShuttingDown = false;
  
  const shutdown = async (signal: string) => {
    if (isShuttingDown) {
      console.log(`Shutdown already in progress, ignoring ${signal}`);
      return;
    }
    
    isShuttingDown = true;
    console.log(`Received ${signal}, closing worker...`);
    
    try {
      await worker.close();
      await closeRedisConnection();
      console.log('✅ Worker and Redis connection closed gracefully');
      process.exit(0);
    } catch (error) {
      console.error('Error during shutdown:', error);
      process.exit(1);
    }
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}