import prisma from "@/db/db";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

export const auth = betterAuth({
    telemetry: { enabled: false },
    database: prismaAdapter(prisma, {
        provider: "mongodb"
    }),
    emailAndPassword: {
        enabled: true,
    }
});