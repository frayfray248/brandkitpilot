import './envConfig.ts'
import path from "node:path";
import { defineConfig, env } from "prisma/config";

const SEED_SCRIPTS: Record<string, string> = {
    "test": "tsx prisma/seed/seed.test.ts",
    "development": "tsx prisma/seed/seed.dev.ts",
    "production": "tsx prisma/seed/seed.prod.ts",
};

export default defineConfig({
    schema: path.join("prisma", "schema.prisma"),
    migrations: {
        path: path.join("prisma", "migrations"),
        seed: SEED_SCRIPTS[process.env.NODE_ENV || "development"] || SEED_SCRIPTS["development"],
    },
    engine: "classic",
    datasource: {
        url: env("DATABASE_URL"),
    }
});