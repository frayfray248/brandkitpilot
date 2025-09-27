"use server";
import serverEnv from "@/lib/env/serverEnv";
import Stripe from "stripe";

export interface StripeProduct {
    id: string;
    name: string;
    description: string;
    price: string;
    tokens: number;
}

const getProducts = async (): Promise<StripeProduct[]> => {
    try {
        const stripe = new Stripe(serverEnv.STRIPE_SECRET_KEY);
        const products = await stripe.products.list();

        const productPromises = products.data.map(async (product) => {
            try {
                if (!product.active) {
                    return null;
                }

                // Skip products without default_price
                if (!product.default_price) {
                    console.warn(
                        `Product ${product.id} has no default price, skipping`,
                    );
                    return null;
                }

                const price = await stripe.prices.retrieve(
                    product.default_price as string,
                );
                const tokens = product.metadata?.tokens;

                // Skip products with invalid price or missing tokens
                if (!price.unit_amount) {
                    console.warn(
                        `Product ${product.id} has no price amount, skipping`,
                    );
                    return null;
                }

                if (!tokens) {
                    console.warn(
                        `Product ${product.id} has no tokens metadata, skipping`,
                    );
                    return null;
                }

                const parsedTokens = parseInt(tokens, 10);
                if (isNaN(parsedTokens) || parsedTokens <= 0) {
                    console.warn(
                        `Product ${product.id} has invalid tokens value: ${tokens}, skipping`,
                    );
                    return null;
                }

                return {
                    id: product.id,
                    name: product.name,
                    description: product.description || "",
                    price: (price.unit_amount / 100).toFixed(2),
                    tokens: parsedTokens,
                };
            } catch (error) {
                console.error(`Error processing product ${product.id}:`, error);
                return null;
            }
        });

        const results = await Promise.all(productPromises);

        // Filter out null values (invalid products)
        return results.filter(
            (product): product is StripeProduct => product !== null,
        );
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};

export default getProducts;
