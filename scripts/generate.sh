#!/bin/bash

# If NODE_ENV is not set, default to development
if [ -z "$NODE_ENV" ]; then
  export NODE_ENV=development
fi

# Determine which env file to use
ENV_FILE=".env.${NODE_ENV}.local"

# Generate Prisma client (doesn't need env vars)
npx prisma generate

# Generate Better Auth with environment variables loaded (skip if "noauth" flag is passed)
if [ "$1" != "noauth" ]; then
  npx dotenv-cli -e "$ENV_FILE" -- npx @better-auth/cli generate --config /src/auth/auth.ts
fi