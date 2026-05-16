# 烤肉餐厅官网

## What This Is

一家真实烤肉餐厅的在线官网。展示餐厅信息、菜单、支持在线预约和在线点单。目标让顾客在到店前就能了解餐厅、查看菜单、完成预约和点单。

## Core Value

**顾客能快速找到餐厅信息并完成预约/点单** — 如果预约和点单不能用，这个网站就没有意义。

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] 首页：餐厅介绍、营业时间、在线预约按钮、地图导航
- [ ] 餐单页：展示菜品分类（烤肉、水果、果汁、饮料、小吃），支持在线点单
- [ ] 关于页：餐厅故事、环境介绍
- [ ] 联系页：地址、电话、地图嵌入、联系表单
- [ ] 在线预约：表单提交，数据存入 Supabase
- [ ] 在线点单：浏览菜单 → 加入购物车 → 提交订单（先无支付，到店付）
- [ ] 地图导航：嵌入地图组件，帮助顾客找到餐厅
- [ ] 内容管理：从 MD 文档读取内容填充网页，修改 MD 后重新部署生效

### Out of Scope

- 在线支付（支付宝/微信支付） — v1 不做，后期再加
- 后台管理系统 — v1 通过 MD 文件更新内容，无需后台
- 用户注册/登录 — v1 不需要，预约和点单可以是游客模式
- 订单实时通知 — v1 仅存数据库，不推通知

## Context

- **餐厅类型：** 烤肉餐厅，供应烤肉、水果、果汁、饮料、小吃
- **设计风格：** 深色高端，暖色调（暗红、深棕、橘色系）
- **内容来源：** 用户提供 MD 文档，构建时读取写入页面
- **目标市场：** 中文用户，面向中国大陆食客

## Constraints

- **技术栈:** Next.js (App Router) + Tailwind CSS — 已确定
- **数据库:** Supabase — 已确定
- **部署:** Vercel — 已确定
- **支付:** 支付宝 + 微信支付 — v2，v1 不做
- **内容:** 通过 MD 文件管理，构建时加载
- **语言:** 全中文

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| V1 不做在线支付 | 降低初期复杂度，先验证核心体验 | — Pending |
| 内容通过 MD 文件管理 | 无需 CMS，简单可控，非技术人员也能编辑 | — Pending |
| Supabase 替代自建后端 | PostgreSQL 数据库 + API 开箱即用，与 Next.js 生态匹配 | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-16 after initialization*
