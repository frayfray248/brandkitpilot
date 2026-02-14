import serverEnv from "@/lib/env/serverEnv";
import { PrismaClient } from "../../generated/prisma";
import { getDatabaseUrl } from "@/db/utils";

const globalForPrisma = global as unknown as {
    prisma: PrismaClient
}

const prisma = globalForPrisma.prisma || new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL || getDatabaseUrl()
}).$extends({
    name: "Default User termsAccepted",
    query: { 
        user: {
            async create({ model, operation, args, query }) {

                // Automatically set termsAccepted on user creation to a default value
                // Prisma doesn't support default composite fields and Better Auth doesn't support JS object as additional fields.
                // So we set it here in the Prisma client extension.
                if (!args.data.termsAccepted) {
                    args.data.termsAccepted = {
                        timestamp: new Date().toISOString(),
                        version: ""
                    }
                }

                return query(args);
            }
        }
    }
})

if (serverEnv.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma