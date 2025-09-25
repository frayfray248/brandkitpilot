import { z } from "zod";

const clientSchema = z.object({
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1),
    NEXT_PUBLIC_STRIPE_CHECKOUT_ENDPOINT: z.string().min(1),
})

const _client = clientSchema.safeParse({
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY : process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_STRIPE_CHECKOUT_ENDPOINT : process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_ENDPOINT,
});

if (!_client.success) {
    console.error("❌ Invalid client env:", z.treeifyError(_client.error));
    throw new Error("Invalid client env");
}

const clientEnv = {
    ..._client.data,
} as const;
Object.freeze(clientEnv);

export default clientEnv;