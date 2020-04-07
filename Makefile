up:
	docker-compose up -d --force-recreate --build
down:
	docker-compose down
restart: down up
bash:
	docker-compose exec -T apache bash
ywatch:
	docker-compose exec -T apache yarn watch
yinstall:
	docker-compose run -T node yarn install
ybuild:
	docker-compose exec -T apache yarn build
ydev:
	docker-compose exec -T apache yarn dev
ystart:
	docker-compose run -T node yarn start
build:
	docker-compose up -d --build
cinstall:
	docker-compose exec -T apache composer install
cinstall-prod:
	docker-compose exec -T apache composer install --no-dev --optimize-autoloader
cupdate:
	docker-compose exec -T apache composer update
install:
	chmod +x ./script/install.sh && ./script/install.sh ${env}
migrate:
	docker-compose exec -T apache bin/console doctrine:migrations:migrate --no-interaction
db-drop:
	docker-compose exec apache php bin/console doctrine:database:drop --force
db-create:
	docker-compose exec apache php bin/console doctrine:database:create
db-create-entity:
	docker-compose exec apache php bin/console make:entity
db-update:
	docker-compose exec apache php bin/console d:s:u --force
db-migration:
	docker-compose exec apache php bin/console make:migration
cache-clear:
	docker-compose exec -T apache bin/console cache:clear
	docker-compose exec -T apache php bin/console cache:warmup
db-fix-load:
	docker-compose exec apache php bin/console doctrine:fixtures:load
db-reload:
	make db-drop && make db-create && make migrate && make db-fix-load
deploy:
	chmod +x ./script/deploy.sh && ./script/deploy.sh
assets-install:
	docker-compose exec -T apache bin/console assets:install --symlink public
route-sync:
	docker-compose exec -T apache bin/console fos:js-routing:dump --format=json --target=public/js/fos_js_routes.json
copy-ci:
	cp docker-compose.ci.yml docker-compose.yml
compile:
	docker-compose exec -T apache bin/console mjml:compiler
test:
	docker-compose exec -T apache ./bin/phpunit
jwt:
	chmod +x ./script/jwt.sh && ./script/jwt.sh
wait_db_to_ready:
	chmod +x ./script/wait_for_db.sh && ./script/wait_for_db.sh
rdeploy:
	chmod +x ./script/rdeploy.sh && ./script/rdeploy.sh
