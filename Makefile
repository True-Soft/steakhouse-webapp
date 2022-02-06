IMG ?= docker.io/andriisoft/steakhouse-webapp
TAG ?= $(shell git rev-parse --abbrev-ref HEAD)-$(shell git log -n 1 --format=%h)
IMAGE_OPERATOR ?= docker
ENV_FILE_PATH ?= $(shell pwd)/back/.env
EXPOSE_PORT ?= 3000


build:
	$(IMAGE_OPERATOR) build --build-arg PORT=$(EXPOSE_PORT) ./back -t $(IMG):$(TAG)
	echo $(IMG):$(TAG) built

push:
	$(IMAGE_OPERATOR) push $(IMG):$(TAG)
	echo $(IMG):$(TAG) pushed

build-and-push: build push
	echo $(IMG):$(TAG) built and pushed
