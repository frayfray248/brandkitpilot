import { getRedisConnection } from "@/lib/redis/connection";
import { BRANDKIT_QUEUE_NAME } from "@/lib/queue/const";
import { Queue } from "bullmq";

// Cached queue instance
let _brandkitQueue: Queue | null = null;

/**
 * Get or create the brandkit queue with shared Redis connection
 */
export const getBrandkitQueue = async (): Promise<Queue> => {
    if (_brandkitQueue) {
        return _brandkitQueue;
    }

    const connection = await getRedisConnection();
    _brandkitQueue = new Queue(BRANDKIT_QUEUE_NAME, { connection });
    
    console.log('✅ BrandKit queue initialized with shared Redis connection');
    return _brandkitQueue;
};