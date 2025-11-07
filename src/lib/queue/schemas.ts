import z from "zod";

export const BrandKitRequestDataSchema = z.object({
    userId: z.string().min(1),
    title: z.string().min(1),
})

export type BrandKitRequestData = z.infer<typeof BrandKitRequestDataSchema>;