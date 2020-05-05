#!/bin/sh

SERVER=groupe7@hack-php

echo 'Determine deploy server'
if [ ! -z "$1" ]; then
    SERVER=$1
fi

echo -e "==> Update JWT private/public key"
make jwt

echo -e "==> Compiling emails templates 📨"
make compile

# sudo systemctl reload php-fpm
rsync -azv --exclude-from='./server/.rsyncignore' ./server/ $SERVER:~/src/ --progress --delete-after

ssh $SERVER bash -c "'
    cd src
    bin/console doctrine:migrations:migrate --no-interaction
    bin/console cache:clear
    chmod 777 -R var/log
    exit
  '"
