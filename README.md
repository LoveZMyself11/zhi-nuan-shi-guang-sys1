# 智暖食光（适老化健康点餐系统）- 后端 Sys1

> NestJS + TypeORM + Oracle 企业级后端核心服务

## 📋 项目简介

**智暖食光**是一款面向老年人群体的适老化健康点餐系统。本仓库（Sys1）为系统的后端核心服务，基于 [NestJS](https://nestjs.com/) 框架构建，提供稳定、规范、可扩展的 RESTful API 支持。

## 🏗️ 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| NestJS | ^11.x | 后端框架 |
| TypeORM | ^0.3.x | ORM 框架 |
| OracleDB | ^6.x | Oracle 数据库驱动 |
| class-validator | ^0.15.x | 参数校验 |
| @nestjs/config | ^4.x | 环境变量管理 |

## 📁 项目结构

```
src/
├── main.ts                              # 应用入口（全局拦截器/过滤器/管道注册）
├── app.module.ts                        # 根模块（数据库连接配置）
├── users/                               # 用户模块
│   └── entities/
│       └── user.entity.ts               # 用户实体（Oracle 规范）
├── common/
│   ├── interceptors/
│   │   └── transform.interceptor.ts     # 全局统一响应拦截器
│   └── filters/
│       └── http-exception.filter.ts     # 全局异常过滤器
```

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

> 若缺少 NestJS CLI，请先全局安装：`npm install -g @nestjs/cli`

### 2. 配置环境变量

复制示例文件并修改：

```bash
cp .env.example .env
```

编辑 `.env`：

```env
DB_HOST=localhost
DB_PORT=1521
DB_USER=system
DB_PASSWORD=your_password
DB_SID=XE
PORT=3000
```

### 3. 启动服务

```bash
# 开发模式
npx nest start --watch

# 生产模式
npm run build
npm run start:prod
```

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

## 📝 开发命令

```bash
# 生成新模块（CRUD）
nest g resource users

# 运行测试
npm run test

# 代码格式化
npm run format
```

## 📄 许可证

[MIT](LICENSE)
