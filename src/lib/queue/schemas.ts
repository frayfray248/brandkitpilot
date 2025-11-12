import z from "zod";
import { BrandFrameworkInputType } from "@/generated/prisma"

export const BrandKitRequestDataSchema = z.object({
    userId: z.string().min(1, "User ID is required"),
    frameworkSlug: z.string().min(1, "Framework slug is required"),
    inputs: z.array(z.object({
        label: z.string().min(1, "Label is required"),
        value: z.string().min(1, "Value is required").max(1000, "Value is too long"),
    })).min(1, "At least one input is required")
})

export type BrandKitRequestData = z.infer<typeof BrandKitRequestDataSchema>;