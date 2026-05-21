# 任务计划：烤肉餐厅官网

## 目标
搭建烤肉餐厅官网 Phase 1 Foundation — Next.js + Tailwind + Supabase 项目脚手架，深色高端设计系统，MD 内容加载基础设施。

## 当前阶段
阶段 4

## 各阶段

### 阶段 1：项目脚手架与设计系统
- [x] 初始化 Next.js 项目 (App Router + TypeScript + Tailwind CSS v4)
- [x] 配置深色高端设计系统（暗红、深棕、橘色暖色调）
- [x] 创建全局布局（导航栏 + 页脚）
- [x] 创建 4 个页面路由骨架（`/`, `/menu`, `/about`, `/contact`）
- [x] 配置 Supabase 客户端
- [x] 搭建 MD 内容加载系统（构建时读取 `src/content/` 下 MD 文件）
- **状态：** complete

### 阶段 2：首页 (Home)
- [x] Hero 全屏视觉（炭火光晕 + 火星粒子动画）
- [x] 营业时间展示 + 评分进度条
- [x] 团购优惠卡片（单人/双人）
- [x] 人气菜品 Top 5 横向滚动
- [x] 预约按钮 × 2 + OpenStreetMap 地图嵌入
- [x] 全局设计系统重做（木纹纹理、玻璃卡片、级联入场动画）
- **状态：** complete

### 阶段 3：关于与联系 (About & Contact)
- [x] 关于页（餐厅故事、环境介绍 — MD 加载 + 评分 + 特色标签）
- [x] 联系页（地址、电话、营业时间、地图、交通指引）
- [x] 联系表单 → Supabase contacts 表（含手机号校验、loading/success/error 状态）
- **状态：** complete

### 阶段 4：餐单展示 (Menu Display)
- [ ] 分类展示（烤肉、水果、果汁、饮料、小吃）
- [ ] 菜品详情（名称、价格、图片、描述 — MD 加载）
- [ ] 分类筛选与搜索
- **前置依赖清除**：categories + menu_items 表已建，RLS 已配，分类种子数据已填充
- **状态：** ready (pending implementation)

### 阶段 5：在线点单 (Online Ordering)
- [ ] 购物车组件
- [ ] 数量修改
- [ ] 提交订单 → Supabase orders 表
- **状态：** pending

### 阶段 6：预约系统 (Reservation)
- [ ] 预约表单（姓名、电话、日期、时间、人数）
- [ ] 表单校验
- [ ] 存入 Supabase reservations 表
- **状态：** pending

## 关键问题
1. 用户何时提供 MD 文档内容？（先写占位内容）
2. ~~Supabase 项目是否已创建？~~ ✅ 已创建，表已建，RLS 已配置

## 当前完成
- Supabase 连接验证通过
- 5 张表已创建：contacts, categories, menu_items, reservations, orders
- RLS 策略已配置（contacts/orders/reservations 可 anon INSERT，categories/menu_items 可 anon SELECT）
- 分类种子数据已填充（烤肉/水果/果汁/饮料/小吃）
- 联系表单提交正常 2026-05-17

## 已做决策
| 决策 | 理由 |
|------|------|
| Next.js App Router + Tailwind + Supabase | 用户确定 |
| 深色高端风格 | 烤肉餐厅定位 |
| Vercel 部署 | 用户确定 |
| pnpm 包管理 | 性能优于 npm |
| 阶段 2-6 依赖阶段 1 完成 | ROADMAP 依赖关系 |

## 遇到的错误
| 错误 | 尝试次数 | 解决方案 |
|------|---------|---------|
| create-next-app 拒绝覆盖现有文件 | 1 | 在 temp 目录创建后移至根目录 |
| 以 `_` 开头的 npm 项目名无效 | 1 | 改用字母开头目录名 |
| Google Fonts 网络不可达 | 1 | 换用系统字体栈（PingFang SC 等） |

## 备注
- MD 内容文件放 `src/content/`，构建时读取
- Supabase 表：reservations, orders, contacts, menu_items
- 不建议在主会话中做简单文件搜索 → 委派 Explore agent
