# Oh My Garde

## Installation

Copy docker env variables

```shell
cp .env.example .env
```

Install dev environment

```shell
make install env=dev
```

Run client

```shell
make ystart
```

Migrations

```shell
docker-compose exec apache php bin/console m:m
docker-compose exec apache php bin/console d:m:m
```

Load fixtures

```shell
docker-compose exec apache php bin/console doctrine:fixtures:load
```

Drop and Recreate Database

```shell
make db-drop
make db-create
make db-update
```

## App base url

- [Server - http://api.localhost](http://api.localhost)
- [Client - http://localhost](http://localhost)
- [Adminer DB - http://adminer.localhost](http://adminer.localhost)
- [Api Docs - Api Route base - http://api.localhost/api](http://api.localhost/api)
- [Mail Dev - http://maildev.localhost/](http://maildev.localhost/)
