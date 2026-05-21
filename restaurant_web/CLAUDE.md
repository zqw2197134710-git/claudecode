# OpenWolf

@.wolf/OPENWOLF.md

This project uses OpenWolf for context management. Read and follow .wolf/OPENWOLF.md every session. Check .wolf/cerebrum.md before generating code. Check .wolf/anatomy.md before reading files.

---

# 烤肉餐厅官网

## Agent Routing

主会话用于架构设计、复杂代码实现、多文件重构。简单独立任务委派给 subagent：

| 任务 | Agent |
|------|-------|
| 跨文件搜索/定位代码 | Explore |
| 1-2 文件独立修改 | cavecrew-builder |
| Diff/PR 审查 | cavecrew-reviewer |
| UI 设计质量评估 | `openwolf designqc` |

主会话保持上下文干净，简单任务不占主会话 token。

## Tech Stack

- Next.js (App Router) + Tailwind CSS + TypeScript
- Supabase (PostgreSQL)
- Vercel 部署
- pnpm 优先

## 项目概述

烤肉餐厅官网，4 个页面：首页 `/`、餐单 `/menu`、关于 `/about`、联系 `/contact`。
深色高端风格，暖色调（暗红、深棕、橘色）。全中文。

## 功能

- 在线预约：表单提交 → Supabase reservations 表
- 在线点单：分类浏览 → 购物车 → 提交订单（v1 无支付，到店付）
- 地图导航嵌入
- 内容：MD 文档驱动，构建时加载

## v1 范围外

在线支付、后台管理、用户登录、实时通知

## Supabase 表（计划）

`reservations` / `orders` / `contacts` / `menu_items`

## 内容更新流程

用户提供 MD 文档 → 放入 `src/content/` → 构建时读取 → 填充页面 → 部署
