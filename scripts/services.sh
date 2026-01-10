#!/bin/bash

# Check for --test flag
if [[ "$*" == *"--test"* ]]; then
    export NODE_ENV=test
else 
    export NODE_ENV="development"
fi

# if arg is "start":
if [ "$1" = "start" ]; then

    if [ "$2" = "detached" ] || [ "$3" = "detached" ]; then

        ENV_FILE=../.env.$NODE_ENV.local docker compose -f docker/docker-compose.yml up -d

    else

        ENV_FILE=../.env.$NODE_ENV.local docker compose -f docker/docker-compose.yml up

    fi
elif [ "$1" = "stop" ]; then

    docker compose -f docker/docker-compose.yml down

elif [ "$1" = "build" ]; then

    docker compose -f docker/docker-compose.yml build

fi