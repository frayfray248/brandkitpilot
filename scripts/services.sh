#!/bin/bash

# ENV_FILE is a file path. Its contents are not visible in the docker compose file.

COMPOSE_PROFILE=""

# Check for --test flag
if [[ "$*" == *"--test"* ]]; then
    export NODE_ENV=test
    COMPOSE_PROFILE="--profile test"
    echo "--test flag detected: Starting services with ${COMPOSE_PROFILE}"
else 
    export NODE_ENV="development"
    COMPOSE_PROFILE="--profile development"
    echo "No --test flag detected: Starting services with ${COMPOSE_PROFILE}"
fi


# Generate MongoDB keyfile for authentication only if it doesn't already exist
if [ ! -f generated/mongodb-test-keyfile ]; then
    mkdir -p generated
    openssl rand -base64 756 > generated/mongodb-test-keyfile
    chmod 400 generated/mongodb-test-keyfile
fi


# if arg is "start":
if [ "$1" = "start" ]; then

    if [ "$2" = "detached" ] || [ "$3" = "detached" ]; then

        
        ENV_FILE=../.env.$NODE_ENV.local docker compose $COMPOSE_PROFILE -f docker/docker-compose.yml up -d

    else

        ENV_FILE=../.env.$NODE_ENV.local docker compose $COMPOSE_PROFILE -f docker/docker-compose.yml up

    fi
elif [ "$1" = "stop" ]; then

    docker compose $COMPOSE_PROFILE -f docker/docker-compose.yml down

elif [ "$1" = "build" ]; then

    docker compose $COMPOSE_PROFILE -f docker/docker-compose.yml build

fi