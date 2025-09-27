import z from "zod";

export class InvalidCheckoutRequestError extends Error {
    constructor(message: string = "Invalid checkout request") {
        super(message);
        this.name = "InvalidCheckoutRequestError";
    }
}

export const CheckoutRequestSchema = z.object({
    productId: z
        .string()
        .min(1, "Product ID is required")
        .max(100, "Product ID too long")
        .regex(/^[a-zA-Z0-9_-]+$/, "Invalid product ID format"),
});

export type ValidCheckoutRequest = z.infer<typeof CheckoutRequestSchema>;

export const validateCheckoutRequest = (
    data: unknown,
): ValidCheckoutRequest => {
    const result = CheckoutRequestSchema.safeParse(data);

    if (!result.success) {
        throw new InvalidCheckoutRequestError(
            `Invalid request data: ${result.error.message}`,
        );
    }

    return result.data;
};
