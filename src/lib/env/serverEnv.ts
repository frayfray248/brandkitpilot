import { z } from "zod";

const serverSchema = z.object({
    // NODE
    NODE_ENV: z.enum(["development", "production", "test"]),
    // APP
    APP_NAME: z.string().min(1),
    APP_URL: z.url(),
    // STRIPE
    STRIPE_SECRET_KEY: z.string().min(1),
    STRIPE_WEBHOOK_SECRET: z.string().min(1),
    // DB - APP DATA
    // DATABASE_URL: z.string().min(1),
    // AUTH
    BETTER_AUTH_SECRET: z.string().min(1),
    // EMAIL
    EMAIL_SERVER_USER: z.string().min(1),
    EMAIL_SERVER_PASSWORD: z.string().min(1),
    EMAIL_SERVER_HOST: z.string().min(1),
    EMAIL_SERVER_PORT: z.coerce.number().min(1),
    EMAIL_FROM: z.email(),
})

const _server = serverSchema.safeParse(process.env);

if (!_server.success) {
    console.error("❌ Invalid server env:", z.treeifyError(_server.error));
    throw new Error("Invalid server env");
}

const serverEnv = {
    ..._server.data,
} as const;
Object.freeze(serverEnv);

export default serverEnv;