#!/bin/bash

npm run build-services

npm run start-services -- detached --test

docker build -t brandkitpilot-playwright -f ./docker/Dockerfile.playwright .
docker run -it --rm --init --ipc=host --network=host -v $PWD:/app -v /app/node_modules -v /app/generated -w /app --env-file .env.test.local -e NODE_ENV=test brandkitpilot-playwright npx playwright test

npm run stop-services -- --test