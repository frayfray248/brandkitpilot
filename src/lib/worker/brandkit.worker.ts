import { generateBrandKit, generateSlogan } from "@/lib/ai/openai";
import { getFrameworkBySlug } from "@/lib/dal/brandFrameworks";
import { updateBrandKitById } from "@/lib/dal/brandkits";
import { BRANDKIT_QUEUE_NAME } from "@/lib/queue/const";
import { BrandKitRequestData } from "@/lib/queue/schemas";
import { getRedisConnection, closeRedisConnection } from "@/lib/redis/connection";
import { Worker } from "bullmq";

console.log("Starting BrandKit worker with Redis connection pooling...");

// Initialize and start the worker
const startWorker = async () => {
    try {
        console.log('🔄 Initializing worker with shared Redis connection...');
        const connection = await getRedisConnection();

        const worker = new Worker(BRANDKIT_QUEUE_NAME, async job => {

            const startTime = Date.now()
            let brandKitId: string | undefined

            try {

                console.log("Processing job:", job.id);

                const data: BrandKitRequestData & { brandKitId: string } = job.data;

                if (!data.brandKitId) {
                    throw new Error("Missing brandKitId in job data");
                }

                brandKitId = data.brandKitId;

                const framework = await getFrameworkBySlug(data.frameworkSlug);

                if (!framework) {
                    throw new Error(`Framework not found: ${data.frameworkSlug}`);
                }

                const response = await generateBrandKit(framework, data.inputs);

                if (!response) {
                    throw new Error("No response from generateBrandKit");
                }
                if (!response.sections) {
                    throw new Error("No sections in response from generateBrandKit");
                }

                const createdBrandKit = await updateBrandKitById(
                    data.brandKitId,
                    {
                        status: "COMPLETED",
                        outputs: Object.entries(response.sections).map(([title, content]) => ({ title, content }))
                    }
                );

                const duration = Date.now() - startTime;
                console.log(`✅ Brand kit complete: ${createdBrandKit.id} (${duration}ms)`);

                return createdBrandKit;

            } catch (error) {
                console.error("Error processing job:", job.id, error);

                if (brandKitId) {
                    await updateBrandKitById(
                        brandKitId,
                        {
                            status: "FAILED",
                        }
                    );
                }
                throw error;
            }

        }, {
            connection,
            concurrency: 3
        });

        // Set up event listeners
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

        // Graceful shutdown handlers
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

        console.log('✅ Worker initialized successfully with Redis connection pooling');
        return worker;

    } catch (error) {
        console.error('❌ Failed to initialize worker:', error);
        process.exit(1);
    }
};

// Start the worker
startWorker().catch(error => {
    console.error('❌ Critical error starting worker:', error);
    process.exit(1);
});