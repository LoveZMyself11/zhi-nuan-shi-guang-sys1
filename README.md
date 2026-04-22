# 智暖食光（适老化健康点餐系统）- 后端 Sys1

> **版本：2.0.0** | NestJS + TypeORM + Oracle 企业级后端核心服务

## 📋 项目简介

**智暖食光**是一款面向老年人群体的适老化健康点餐系统。本仓库（Sys1）为系统的**后端核心服务**，基于 [NestJS](https://nestjs.com/) 框架构建，提供稳定、规范、可扩展的 RESTful API 支持。

## 🏗️ 系统架构

```
┌─────────────────────────────────────────────────────────────┐
│                    智暖食光 系统架构                           │
├─────────────────────────┬───────────────────────────────────┤
│      Sys2 (前端)         │           Sys1 (后端)              │
│   Vue 3 + Vite + TS     │    NestJS + TypeORM + Oracle      │
│   http://localhost:5173  │     http://localhost:3000         │
│                         │                                   │
│  · 适老化界面            │  · RESTful API                   │
│  · 语音点餐              │  · Oracle 数据库                  │
│  · 大字体高对比度         │  · JWT 鉴权（预留）               │
│  · 代点人下单            │  · Swagger 文档                   │
└─────────────────────────┴───────────────────────────────────┘
                              │
                              ▼ HTTP /api
```

- **Sys2 前端仓库**：https://github.com/LoveZMyself11/zhi-nuan-shi-guang-sys2
- **Sys1 后端仓库**：https://github.com/LoveZMyself11/zhi-nuan-shi-guang-sys1

## 🏗️ 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| NestJS | ^11.x | 后端框架 |
| TypeORM | ^0.3.x | ORM 框架 |
| OracleDB | ^6.x | Oracle 数据库驱动 |
| class-validator | ^0.15.x | 参数校验 |
| @nestjs/config | ^4.x | 环境变量管理 |
| @nestjs/swagger | ^11.x | API 文档 |

## 📁 项目结构

```
src/
├── main.ts                              # 应用入口
│   ├── ValidationPipe（全局参数校验）
│   ├── TransformInterceptor（统一响应拦截器）
│   ├── HttpExceptionFilter（全局异常过滤器）
│   └── SwaggerModule（API 文档 /api）
├── app.module.ts                        # 根模块（数据库连接配置）
├── users/                               # 用户模块
│   ├── entities/
│   │   └── user.entity.ts               # Oracle 规范实体
│   ├── dto/
│   │   ├── create-user.dto.ts           # 创建用户 DTO
│   │   └── update-user.dto.ts           # 更新用户 DTO
│   ├── users.controller.ts              # REST API 控制器
│   ├── users.service.ts                 # 业务逻辑层
│   └── users.module.ts                  # 用户模块定义
└── common/                              # 公共基建
    ├── interceptors/
    │   └── transform.interceptor.ts     # 统一响应格式 {code,message,data}
    └── filters/
        └── http-exception.filter.ts     # 异常过滤（屏蔽 SQL 报错）
```

## 🚀 快速开始

### 前置条件

- Node.js ≥ 18
- Oracle 数据库（本地或远程）

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

```bash
cp .env.example .env
```

编辑 `.env`：

```env
DB_HOST=localhost
DB_PORT=1521
DB_USER=zhi_nuan
DB_PASSWORD=your_password
DB_SERVICE_NAME=XEPDB1
PORT=3000
```

> 支持 `DB_SID` 和 `DB_SERVICE_NAME` 两种连接模式。

### 3. 启动服务

```bash
# 方式 A：开发模式（热更新）
npm run start:dev

# 方式 B：编译后运行（更稳定，推荐）
npx tsc
node dist/main.js
```

启动成功后：
- API 服务：`http://localhost:3000`
- Swagger 文档：`http://localhost:3000/api`

## 📐 接口规范

### 成功响应格式

```json
{
  "code": 200,
  "message": "success",
  "data": { ... }
}
```

### 异常响应格式

```json
{
  "code": 500,
  "message": "Internal server error",
  "timestamp": "2026-04-22T13:00:00.000Z",
  "path": "/api/users"
}
```

> ⚠️ 系统已配置异常过滤器，**严禁暴露 Oracle 数据库底层 SQL 报错**。

## 🗄️ 数据库规范（Oracle）

本项目严格遵循 Oracle 命名规范：

- 实体类名：`User`
- 表名映射：`@Entity('SYS_USER')`
- 列名必须**全大写**：`@Column({ name: 'PHONE_NUMBER' })`

示例参见：`src/users/entities/user.entity.ts`

## 🔗 与 Sys2 前端对接

Sys2 通过 Vite 代理将 `/api` 请求转发到本服务：

```ts
// Sys2 vite.config.ts
proxy: {
  '/api': {
    target: 'http://localhost:3000',
    changeOrigin: true,
  },
}
```

启动顺序：**先启动 Sys1 后端，再启动 Sys2 前端。**

## 📝 开发命令

```bash
# 生成新模块（CRUD）
nest g resource orders

# 运行测试
npm run test

# 代码格式化
npm run format
```

## 📄 许可证

[MIT](LICENSE)
