#!/bin/sh

# docker-compose exec apache php bin/console cache:clear --env=prod --no-debug
# make cinstall-prod
# make cache-clear

SERVER=groupe7@hack-php

echo 'Determine deploy server'
if [ ! -z "$1" ]; then
    SERVER=$1
fi

make jwt
make compile
make cache-clear
# sudo systemctl reload php-fpm
rsync -azv --exclude-from='./server/.rsyncignore' ./server/ $SERVER:~/src/ --progress --delete-after

ssh $SERVER bash -c "'
    cd src
    bin/console doctrine:migrations:migrate --no-interaction
    exit
  '"
