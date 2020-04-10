#!/bin/sh

echo "==> Installing composer dependencies"
make cinstall-prod

echo -e "==> Update JWT private/public key"
make jwt

echo -e "==> Compiling emails"
make compile

echo -e "==> Clearing cache for production"
make cache-clear-prod

echo -e "==> Deployment done ✅"
exit 0
