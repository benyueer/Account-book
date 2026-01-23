---
trigger: always_on
glob:
description:
---

1. 本项目为 repo ，使用 moon 管理，包管理工具为 pnpm，分为 3 个包：
    - server: 服务端
    - client: 客户端
    - types: 类型定义
2. 前端的请求都定义在 api 下，公共组件在 components 下，页面在 pages 下，路由在 routes 下，状态管理在 stores 下，工具函数在 utils 下
3. 对于前后端同时使用到的类型，需要在types 包下定义，例如接口的输入输出格式、实体类型等
4. 前端技术栈，vite + react + typescript + unocss + rustand；在实现需求是优先使用已有技术栈和包
5. 后端技术栈：nestjs + pg
6. 后端创建新的模块需要在 modules 下创建新的目录
7. 使用 typeorm-ts-node-commonjs 管理数据库迁移，迁移脚本在 migrations 目录下