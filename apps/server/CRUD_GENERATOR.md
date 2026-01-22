# NestJS CRUD 生成器使用指南

## 安装 NestJS CLI (如果还没有)

```bash
pnpm add -g @nestjs/cli
```

## 生成 CRUD 资源

使用 NestJS CLI 可以快速生成完整的 CRUD 资源:

```bash
# 生成完整的 CRUD 资源(包括 Module, Controller, Service, Entity, DTO)
nest g resource [name]

# 示例:生成账目(transaction)资源
nest g resource transactions
```

## 生成选项

运行命令后会提示选择:
1. **传输层**: 选择 `REST API`
2. **是否生成 CRUD**: 选择 `Yes`

这将自动生成:
- `transactions.module.ts` - 模块
- `transactions.controller.ts` - 控制器
- `transactions.service.ts` - 服务
- `entities/transaction.entity.ts` - 实体
- `dto/create-transaction.dto.ts` - 创建 DTO
- `dto/update-transaction.dto.ts` - 更新 DTO

## 其他常用生成命令

```bash
# 生成模块
nest g module [name]

# 生成控制器
nest g controller [name]

# 生成服务
nest g service [name]

# 生成守卫
nest g guard [name]

# 生成拦截器
nest g interceptor [name]
```

## 示例:生成账目管理模块

```bash
cd apps/server
nest g resource transactions

# 然后修改生成的 entity 添加字段
# 运行迁移生成
pnpm run migration:generate src/migrations/CreateTransactionTable
pnpm run migration:run
```
