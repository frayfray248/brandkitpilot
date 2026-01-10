#!/bin/sh

# if NODE_ENV is set to development, run in dev mode
if [ "$NODE_ENV" = "development" ]; then
  nodemon --exec tsx src/lib/worker/brandkit.worker.ts
else
  NODE_ENV="production" tsx src/lib/worker/brandkit.worker.ts
fi