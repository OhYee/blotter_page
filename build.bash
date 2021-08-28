#!/bin/bash

TAG=$(git describe --abbrev=0 --tags 2>/dev/null || git rev-parse --short HEAD)
IMAGE="ohyee/blotter_page:${TAG}"
echo $IMAGE
docker build -t ${IMAGE} .