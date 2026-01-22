# 开发环境配置

## PostgreSQL 数据库

使用 Docker Compose 管理开发环境的 PostgreSQL 数据库。

### 启动数据库

```bash
cd dev
docker-compose up -d
```

### 停止数据库

```bash
docker-compose down
```

### 查看日志

```bash
docker-compose logs -f postgres
```

### 连接信息

- **Host**: localhost
- **Port**: 5432
- **Database**: account_book
- **User**: postgres
- **Password**: postgres

### 数据持久化

数据库数据存储在 `dev/postgres-data` 目录中,该目录已被 git 忽略。

### 重置数据库

如果需要完全重置数据库:

```bash
docker-compose down -v
rm -rf postgres-data
docker-compose up -d
```
