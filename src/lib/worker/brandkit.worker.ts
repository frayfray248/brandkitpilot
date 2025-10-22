import { updateBrandKit } from "@/lib/dal/brandkits";
import serverEnv from "@/lib/env/serverEnv";
import { BRANDKIT_QUEUE_NAME } from "@/lib/queue/const";
import { Worker } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis(serverEnv.REDIS_URL, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
});

console.log("Starting BrandKit worker...");

const worker = new Worker(BRANDKIT_QUEUE_NAME, async job => {
    console.log("Processing job:", job.id);

    const { brandKitId } = job.data
    
    const createdBrandKit = await updateBrandKit(brandKitId, "COMPLETED")
    
    console.log("Brand kit complete:", createdBrandKit.id);
    
    return createdBrandKit;
}, { 
    connection, 
    concurrency: 3 
});

worker.on('completed', job => { 
    console.log(`✅ Job ${job.id} has completed!`);
});

worker.on('failed', (job, err) => { 
    console.log(`❌ Job ${job?.id} has failed with ${err.message}`);
    console.error(err);
});

worker.on('error', err => {
    console.error('Worker error:', err);
});

worker.on('ready', () => {
    console.log('🚀 Worker is ready and waiting for jobs...');
});

// Graceful shutdown
process.on('SIGTERM', async () => {
    console.log('Received SIGTERM, closing worker...');
    await worker.close();
    await connection.quit();
    process.exit(0);
});

process.on('SIGINT', async () => {
    console.log('Received SIGINT, closing worker...');
    await worker.close();
    await connection.quit();
    process.exit(0);
});