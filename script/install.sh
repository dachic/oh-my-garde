#!/bin/sh

echo -e 'Checking environment variables file `.env`'
if [ ! -f ".env" ]; then
    echo -e "==> App environment variables are not set"
    echo -e "==> Copy environment variable '.env'"
    echo -e "==> Make sure to have all environment variables set"
    exit 2
fi

echo -e 'Checking docker-compose.yml'
if [ -f docker-compose.yml ]; then
    while true; do
        echo -e "==> docker-compose.yml already exists 😅."
        read -p "Do you want to override it anyway ? [y/N] : " REP
        case $REP in
        [Yy]*)
            echo -e "==> Well, docker-compose.$1.yml will be copied into docker-compose.yml"
            break
            ;;
        [N]*)
            echo -e "==> Installation cancelled ❌"
            exit
            ;;
        *) echo "Please answer yes(y or Y) or no(N)." ;;
        esac
    done
fi

echo -e 'Copying appropriate docker-compose.yml'
if [ "$1" == "dev" ]; then
    cp docker-compose.dev.yml docker-compose.yml
elif [ "$1" == "prod" ]; then
    cp docker-compose.prod.yml docker-compose.yml
elif [ "$1" == "server" ]; then
    cp docker-compose.server.yml docker-compose.yml
else
    echo "The option 'dev' or 'prod' or 'server' is missing"
    exit 1
fi

echo -e 'Building docker environment'
make build

if [ "$1" == "prod" ]; then
    echo -e "==> Installing composer dependencies for $1"
    make cinstall-prod
else
    echo -e "==> Installing composer dependencies for $1"
    make cinstall
fi

echo -e 'Install front dependencies'
make yinstall

echo -e 'Dumping your routes into the public'
make route-sync

if [ "$1" == "dev" ] || [ "$1" == "server" ]; then
    echo -e 'Building front assets for development environment'
    make ydev

    echo -e "==> Clearing cache for development"
    make cache-clear

elif [ "$1" == "prod" ]; then
    echo -e "==> Building front assets for production"
    make ybuild
fi

echo -e "==> Running migrations"
make migrate

echo -e "==> Installing assets"
make assets-install

echo -e "==> Clearing cache"
make cache-clear

echo -e "==> Installation done ✅"
exit 0
