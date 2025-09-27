import z from "zod";

export const TokenCheckoutSessionMetaSchema = z.object({
    userId: z.string().min(1, "User ID is required"),
    userEmail: z.email("Valid email is required"),
    productId: z.string().min(1, "Product ID is required"),
});

export type TokenCheckoutSessionMeta = z.infer<
    typeof TokenCheckoutSessionMetaSchema
>;