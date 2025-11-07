import { generateSlogan } from "@/lib/ai/openai";
import { updateBrandKit } from "@/lib/dal/brandkits";
import serverEnv from "@/lib/env/serverEnv";
import { BRANDKIT_QUEUE_NAME } from "@/lib/queue/const";
import { BrandKitRequestData } from "@/lib/queue/schemas";
import { Worker } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis(serverEnv.REDIS_URL, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
});

console.log("Starting BrandKit worker...");

const worker = new Worker(BRANDKIT_QUEUE_NAME, async job => {

    const startTime = Date.now()
    let brandKitId: string | undefined

    try {

        console.log("Processing job:", job.id);

        const data: BrandKitRequestData & { brandKitId: string } = job.data;

        if (!data.brandKitId) {
            throw new Error("Missing brandKitId in job data");
        }

        if (!data.title?.trim()) {
            throw new Error("Missing or empty title in job data");
        }

        brandKitId = data.brandKitId;

        const slogan = await generateSlogan(data.title);

        if (!slogan?.trim()) {
            throw new Error("Failed to generate slogan - empty result");
        }

        const createdBrandKit = await updateBrandKit(
            data.brandKitId,
            "COMPLETED",
            {
                "0": slogan
            }
        );

        const duration = Date.now() - startTime;
        console.log(`✅ Brand kit complete: ${createdBrandKit.id} (${duration}ms)`);

        return createdBrandKit;

    } catch (error) {
        console.error("Error processing job:", job.id, error);

        if (brandKitId) {
            await updateBrandKit(
                brandKitId,
                "FAILED",
                {}
            );
        }
        throw error;
    }

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