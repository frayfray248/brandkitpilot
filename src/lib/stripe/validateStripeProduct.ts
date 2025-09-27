import Stripe from "stripe";
import z from "zod";

export class InvalidProductError extends Error {
    constructor(message: string = "Invalid product") {
        super(message);
        this.name = "InvalidProductError";
    }
}

export const StripeProductSchema = z.object({
    id: z.string(),
    active: z.boolean(),
    default_price: z.string().nullable(),
    metadata: z
        .object({
            tokens: z.string().optional(),
        })
        .optional(),
});

export type ValidStripeProduct = z.infer<typeof StripeProductSchema>;

export const validateStripeProduct = (
    product: Stripe.Product | null,
): { validProduct: ValidStripeProduct; tokenAmount: number } => {
    if (!product) {
        throw new InvalidProductError("Product not found");
    }

    const result = StripeProductSchema.safeParse(product);
    if (!result.success) {
        throw new InvalidProductError(
            `Invalid product structure for product ${product.id}: ${result.error.message}`,
        );
    }

    const validProduct = result.data;

    if (!validProduct.active) {
        throw new InvalidProductError(
            `Product ${validProduct.id} is not active`,
        );
    }

    if (!validProduct.default_price) {
        throw new InvalidProductError(
            `Product ${validProduct.id} has no price`,
        );
    }

    if (!validProduct.metadata?.tokens) {
        throw new InvalidProductError(
            `Product ${validProduct.id} has no token metadata`,
        );
    }

    const tokenAmount = parseInt(validProduct.metadata.tokens, 10);
    if (isNaN(tokenAmount) || tokenAmount <= 0) {
        throw new InvalidProductError(
            `Product ${validProduct.id} has invalid token amount`,
        );
    }

    return { validProduct, tokenAmount };
};
