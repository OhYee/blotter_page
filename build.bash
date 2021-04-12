#!/bin/bash

SHELL_FOLDER=$(cd "$(dirname "$0")";pwd)
IMAGE="node:15.14.0"


# 拉取镜像
if [[ $(docker images ${IMAGE} | wc -l) -eq "1" ]]; then
    echo "Pulling docker image ${IMAGE}..."
    docker pull ${IMAGE}
fi

# 更新代码
echo "Pulling latest code..."
git pull


# 在 docker 中挂载当前目录编译
echo "Building execute in docker..."

docker run --rm \
    -v ${SHELL_FOLDER}:/data/blotter_page \
    ${IMAGE} \
    bash -c "cd /data/blotter_page && echo 'Generating...' && yarn && yarn build"

echo "Build finished"

docker build -t blotter_page .

echo "Docker image 'blotter' build finished."
echo 'Using `docker run --rm --name=frontend --link backend:backend blotter_page` to start server.'