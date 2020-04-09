#!/bin/sh

docker-compose exec -T apache mkdir -p var
docker-compose exec -T apache ls -la var
docker-compose exec -T apache chmod 777 var
docker-compose exec -T apache bash -c '
    set -e
    apt-get install openssl
    mkdir -p config/jwt
    jwt_passhrase=$(grep ''^JWT_PASSPHRASE='' .env | cut -f 2 -d ''='')
    echo "$jwt_passhrase" | openssl genpkey -out config/jwt/private.pem -pass stdin -aes256 -algorithm rsa -pkeyopt rsa_keygen_bits:4096
    echo "$jwt_passhrase" | openssl pkey -in config/jwt/private.pem -passin stdin -out config/jwt/public.pem -pubout
    chmod -R 755 config/jwt/
'
