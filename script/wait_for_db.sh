#!/bin/sh

while !(docker-compose logs postgres | grep "ready to accept connections") ; do
    sleep 3
    echo "Waiting for mysql ..."
done

echo "PostgreSQL is now ready 🔥"
