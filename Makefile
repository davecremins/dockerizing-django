build:
	@docker-compose build
env: 
	@docker-compose up -d
destroy-env:
	@docker-compose down
env-logs: env
	@docker-compose logs -f
bapi-bash: env
	@docker-compose exec web bash
db-bash: env
	@docker-compose exec db bash