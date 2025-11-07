"use server"

import { createBrandKit } from "@/lib/dal/brandkits"
import { GENERATE_BRANDKIT_JOB_NAME } from "@/lib/queue/const"
import { brandkitQueue } from "@/lib/queue/queue"
import { BrandKitRequestData, BrandKitRequestDataSchema } from "@/lib/queue/schemas"

export const startGenerateBrandKitJob = async (data : unknown) => {

    const parsedData: BrandKitRequestData = BrandKitRequestDataSchema.parse(data)

    const createdBrandKit = await createBrandKit(parsedData.userId, parsedData.title)

    await brandkitQueue.add(GENERATE_BRANDKIT_JOB_NAME, {
        ...parsedData,
        brandKitId: createdBrandKit.id
    })

    return createdBrandKit.id
}