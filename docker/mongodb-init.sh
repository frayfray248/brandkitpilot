#!/bin/sh
set -e

if [ ! -f /data/db/.initialized ]; then
  echo "First run - initializing replica set and creating admin user..."
  mongod --replSet rs0 --bind_ip_all &
  MONGO_PID=$!
  
  until mongosh --quiet --eval "db.adminCommand('ping')" > /dev/null 2>&1; do
    echo "Waiting for MongoDB to start..."
    sleep 1
  done
  
  mongosh --quiet --eval "
    rs.initiate({
      _id: 'rs0',
      members: [{_id: 0, host: 'mongodb-test:27017'}]
    });
  "
  
  sleep 2
  
  mongosh --quiet --eval "
    db.getSiblingDB('admin').createUser({
      user: 'admin',
      pwd: 'test',
      roles: [{role: 'root', db: 'admin'}]
    });
  "
  
  mongosh --quiet --eval "
    use test;
    db.createCollection('users');
  "
  
  touch /data/db/.initialized
  kill $MONGO_PID
  wait $MONGO_PID
  echo "Initialization complete. Starting with authentication..."
fi

chmod 400 /data/keyfile
chown 999:999 /data/keyfile
exec mongod --replSet rs0 --bind_ip_all --keyFile /data/keyfile
