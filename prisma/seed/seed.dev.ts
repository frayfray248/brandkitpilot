import {  PrismaClient } from "../../generated/prisma";
import frameworks from "./data/frameworks";
const prisma = new PrismaClient();


const main = async () => {

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