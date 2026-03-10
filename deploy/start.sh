#!/bin/bash

sudo docker compose -f ./docker-compose.yml up -d

# 启动后端
pnpm run server:run

# 启动前端
sudo nginx -c ${PWD}/deploy/nginx.conf