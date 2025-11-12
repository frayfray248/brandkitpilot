"use server"

import { createBrandKit } from "@/lib/dal/brandkits"
import { GENERATE_BRANDKIT_JOB_NAME } from "@/lib/queue/const"
import { getBrandkitQueue } from "@/lib/queue/queue"
import { BrandKitRequestData, BrandKitRequestDataSchema } from "@/lib/queue/schemas"

export const startGenerateBrandKitJob = async (data : unknown) => {

    const parsedData: BrandKitRequestData = BrandKitRequestDataSchema.parse(data)

    const createdBrandKit = await createBrandKit(parsedData.userId, "New Brand Kit")

    // Get queue instance with shared Redis connection
    const queue = await getBrandkitQueue()
    
    await queue.add(GENERATE_BRANDKIT_JOB_NAME, {
        ...parsedData,
        brandKitId: createdBrandKit.id
    })

    return createdBrandKit.id
}