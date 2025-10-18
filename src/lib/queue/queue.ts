import serverEnv from "@/lib/env/serverEnv";
import { BRANDKIT_QUEUE_NAME } from "@/lib/queue/const";
import { Queue } from "bullmq";
import IORedis from "ioredis";

export const connection = new IORedis(serverEnv.REDIS_URL, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
})

export const brandkitQueue = new Queue(BRANDKIT_QUEUE_NAME, { connection})