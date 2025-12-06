import { Job } from "bullmq";
import { BRANDKIT_QUEUE_NAME } from "@/lib/queue/const";
import { createWorker, setupGracefulShutdown } from "@/lib/worker/worker.setup";
import { processBrandKitJob, ProcessBrandKitJobData } from "@/lib/worker/brandkit.processor";

console.log("Starting BrandKit worker...");

const startBrandKitWorker = async () => {
  try {
    const worker = await createWorker({
      queueName: BRANDKIT_QUEUE_NAME,
      concurrency: 3,
      jobProcessor: async (job: Job<ProcessBrandKitJobData>) => {
        console.log(`Processing job: ${job.id}`);
        const result = await processBrandKitJob(job.data);
        
        if (!result.success) {
          throw new Error(result.error);
        }
        
        return result;
      }
    }, {
      onCompleted: (job, result) => {
        console.log(`✅ Job ${job.id} completed in ${result.duration}ms`);
      },
      onFailed: (job, error) => {
        console.log(`❌ Job ${job?.id} failed: ${error.message}`);
      },
      onError: (error) => {
        console.error('Worker error:', error);
      },
      onReady: () => {
        console.log('🚀 BrandKit worker ready and waiting for jobs...');
      }
    });

    setupGracefulShutdown(worker);
    console.log('✅ BrandKit worker initialized successfully');
    
    return worker;

  } catch (error) {
    console.error('❌ Failed to initialize BrandKit worker:', error);
    process.exit(1);
  }
}

// Start the worker
startBrandKitWorker().catch(error => {
  console.error('❌ Critical error starting BrandKit worker:', error);
  process.exit(1);
});