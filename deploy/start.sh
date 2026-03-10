#!/bin/bash

docker compose -f ./docker-compose.yml up -d

# 启动后端
pnpm run server:run

# 启动前端
nginx -c ${PWD}/deploy/nginx.conf