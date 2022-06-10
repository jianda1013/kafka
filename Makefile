DC=docker-compose
CN=broker
TP=kafka-topics
PR=producer

all:start

build: ## Build the project stack
	@echo "build\n"
	$(DC) build
start: ## Build and launch the project in background
	@echo "Launch dettached projet and build\n"
	mkdir consumer/static/images
	$(DC) up -d --build
stop: ## Stop the project stack
	$(DC) stop
clean: ## Stop and delete the project stack
	$(DC) down
logs: ## Attach to standard output of containers (to see logs)
	$(DC) -f docker-compose.yml logs -f $(CN)
producer:
	$(DC) -f docker-compose.yml logs -f $(PR)

re: clean start

exec: ## Execute command inside api container, need to use command=
	$(DC) exec $(CN) bash

topic: ## Create new kafka topic, need to use topic=
	$(DC) exec $(CN) kafka-topics --bootstrap-server broker:9092 --create --topic ${topic}

list:
	$(DC) exec $(CN) kafka-topics --bootstrap-server broker:9092 --list

del:
	$(DC) exec $(CN) kafka-topics --bootstrap-server broker:9092 --delete --topic ${topic}

install_dc: ## Install docker
	@echo "install docker"
	sudo curl https://get.docker.com | sudo sh -

install_dcc: ## Install docker-compose
	@echo "install docker compose"
	COMPOSE_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep 'tag_name' | cut -d\" -f4)
	echo "version $(COMPOSE_VERSION)"
	sudo sh -c "curl -L https://github.com/docker/compose/releases/download/${COMPOSE_VERSION}/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose"
	sudo chmod +x /usr/local/bin/docker-compose
	sudo sh -c "curl -L https://raw.githubusercontent.com/docker/compose/${COMPOSE_VERSION}/contrib/completion/bash/docker-compose > /etc/bash_completion.d/docker-compose"
	docker-compose -v