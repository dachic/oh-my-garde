#!/bin/sh

while !(docker-compose logs mysql | grep "ready for connections") ; do
    sleep 3
    echo "Waiting for mysql ..."
done

echo "MySQL is now ready 🔥"
