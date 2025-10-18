import z from "zod";

export const generateBrandKitJobDataSchema = z.object({
    userId: z.string().min(1),
    title: z.string().min(1),
})

export type GenerateBrandKitJobData = z.infer<typeof generateBrandKitJobDataSchema>;