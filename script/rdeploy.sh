#!/bin/sh

# docker-compose exec apache php bin/console cache:clear --env=prod --no-debug
# make cinstall-prod
# make cache-clear

make jwt
make compile
make cache-clear
# sudo systemctl reload php-fpm
rsync -azv --exclude-from='./server/.rsyncignore' ./server/ groupe7@hack-php:~/src/ --progress --delete-after

ssh groupe7@hack-php bash -c "'
    cd src
    bin/console doctrine:migrations:migrate --no-interaction
    exit
  '"
