"use server"

import { createBrandKit } from "@/lib/dal/brandkits"
import { GENERATE_BRANDKIT_JOB_NAME } from "@/lib/queue/const"
import { brandkitQueue } from "@/lib/queue/queue"
import { generateBrandKitJobDataSchema } from "@/lib/queue/schemas"

export const startGenerateBrandKitJob = async (userId: string, title: string) => {

    const data = generateBrandKitJobDataSchema.parse({
        userId,
        title,
    })

    const createdBrandKit = await createBrandKit(data.userId, data.title)

    await brandkitQueue.add(GENERATE_BRANDKIT_JOB_NAME, {
        brandKitId: createdBrandKit.id
    })

    return createdBrandKit.id
}