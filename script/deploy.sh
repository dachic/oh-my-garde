#!/bin/sh

echo -e '==> Pulling last changes from repository'
git pull origin $(git rev-parse --abbrev-ref HEAD)

echo -e "==> Running migrations (db update)"
make migrate

echo -e "==> Installing composer dependencies"
make cinstall-prod

echo -e "==> Dumping your routes into the public"
make route-sync

echo -e 'Install front dependencies'
make yinstall

echo -e "==> Building front assets for production"
make ybuild

echo -e "==> Installing assets"
make assets-install

echo -e "==> Clearing cache for production"
make cache-clear
