DOCKER_COMPOSE:=docker-compose
UP:=up -d --build
DOWN:=stop
DB_NAME:=food_db
EXEC:=docker exec

start:
	${DOCKER_COMPOSE} ${UP}

stop:
	${DOCKER_COMPOSE} ${DOWN}

prune:
	docker volume prune

db:
	${EXEC} -ti ${DB_NAME} psql -U user -d FOOD -w

truncate:
	${EXEC} -i ${DB_NAME} psql -U user -d FOOD -c "TRUNCATE \"order\" CASCADE"
	${EXEC} -i ${DB_NAME} psql -U user -d FOOD -c "TRUNCATE \"menu\" CASCADE"
	${EXEC} -i ${DB_NAME} psql -U user -d FOOD -c "TRUNCATE \"restaurant\" CASCADE"
	${EXEC} -i ${DB_NAME} psql -U user -d FOOD -c "TRUNCATE \"user\" CASCADE"

insert-data: truncate
	${EXEC} -i ${DB_NAME} psql -U user -d FOOD < database/data.sql