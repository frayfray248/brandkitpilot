// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const dalConfig = {
    files: ["src/**/*.{js,ts,jsx,tsx}"],
    ignores: ["src/lib/dal/**/*.{js,ts,jsx,tsx}", "src/auth/auth.ts"],
    rules: {
        // Prevent direct Prisma usage outside the data access layer
        "no-restricted-imports": [
            "error",
            {
                paths: [
                    {
                        name: "@prisma/client",
                        message: "Please use the data access layer (src/lib/dal) instead of importing Prisma Client directly.",
                    },
                    {
                        name: "@/db/db",
                        message: "Please use the data access layer (src/lib/dal) instead of importing the database client directly.",
                    }
                ]
            }
        ]
    }
}

const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    ...storybook.configs["flat/recommended"],
    dalConfig
];

export default eslintConfig;
