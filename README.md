# Oh My Garde

## Important

After updating your entity run, these two commands to keep database migrations

```shell
make db-migration
make migrate
```

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
make db-fix-load
```

Make entity

```shell
make db-create-entity
```

Drop and Recreate Database

```shell
make db-drop
make db-create
make db-update
```

Reload database

```shell
make db-reload
```

## Database

Backup Database as version

```shell
docker-compose exec -T postgres pg_dump --inserts -U user ohmygarde > docker/backup/dump_`date +%d-%m-%Y"_"%H_%M_%S`.sql
```

Backup Database with specific name

```shell
docker-compose exec -T postgres pg_dump --inserts -U user ohmygarde > docker/backup/db.sql
```

Restore Database

```shell
cat docker/backup/db.sql | docker-compose exec -T postgres psql -U user -d ohmygarde
```

## App base url

- [Server - http://api.localhost](http://api.localhost)
- [Client - http://localhost](http://localhost)
- [Adminer DB - http://adminer.localhost](http://adminer.localhost)
- [Api Docs - Api Route base - http://api.localhost/api](http://api.localhost/api)
- [Mail Dev - http://maildev.localhost/](http://maildev.localhost/)

## Useful links

- [react-bootstrap-table2](https://react-bootstrap-table.github.io/react-bootstrap-table2)
