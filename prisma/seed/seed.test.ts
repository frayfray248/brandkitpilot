import { auth } from "@/auth/auth";
import { PrismaClient } from "../../generated/prisma";
import frameworks from "./data/frameworks";
import { getDatabaseUrl } from "@/db/utils";

const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL || getDatabaseUrl()
});


const main = async () => {

    await auth.api.createUser({
        body: {
            name: process.env.TESTMAIL_USER_NAME!,
            email: process.env.TESTMAIL_USER_EMAIL!,
            password: "TemporaryPassword123!"
        }
    })

    for (const framework of frameworks) {
        const existing = await prisma.brandFramework.upsert({
            where: { slug: framework.slug },
            update: {},
            create: {
                ...framework,
            }
        });
        console.log(`Upserted framework: ${existing.slug}`);
    }
};

; (async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();