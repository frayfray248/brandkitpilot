import { MAGIC_LINK_EXPIRY_LENGTH, SESSION_EXPIRY_LENGTH, SESSION_UPDATE_AGE_LENGTH } from "@/auth/const";
import prisma from "@/db/db";
import { sendEmail } from "@/lib/email";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { magicLink } from "better-auth/plugins";

if (!process.env.APP_NAME) {
    throw new Error("APP_NAME is not defined");
}

export const auth = betterAuth({
    telemetry: { enabled: false },
    database: prismaAdapter(prisma, {
        provider: "mongodb"
    }),
    session: {
        expiresIn: SESSION_EXPIRY_LENGTH,
        updateAge: SESSION_UPDATE_AGE_LENGTH
    },
    plugins: [
        magicLink({
            sendMagicLink: async ({ email, url}) => {
                await sendEmail(email, `${process.env.APP_NAME}: Signin link`, `Click here to sign in: ${url}. This link will expire in ${MAGIC_LINK_EXPIRY_LENGTH / 60} minutes.`);
            },
            expiresIn: MAGIC_LINK_EXPIRY_LENGTH
        })
    ]
});