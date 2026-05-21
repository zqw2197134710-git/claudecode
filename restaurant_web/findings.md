# 发现与决策

## 需求
- 烤肉餐厅官网，4 页面（首页/餐单/关于/联系）
- 在线预约（表单 → Supabase）+ 在线点单（购物车 → Supabase）
- v1 无支付、无后台、无用户登录
- 内容由用户提供 MD 文档填充

## 研究发现
- Next.js App Router 适合多页面项目，Server Components 可做构建时 MD 加载
- Supabase 提供 `@supabase/supabase-js` 客户端 + PostgreSQL 数据库
- Tailwind CSS v4 用 CSS-first 配置方式，比 v3 更简洁
- 地图可用 Leaflet（免费）或 Google Maps Embed API

## 技术决策
| 决策 | 理由 |
|------|------|
| Next.js 15 + App Router | 用户指定，最新稳定版 |
| Tailwind CSS v4 | CSS-first 配置，体积更小 |
| `@supabase/supabase-js` | 官方 SDK，开箱即用 |
| `gray-matter` 读取 MD frontmatter | 轻量，支持 YAML 元数据 |
| 地图用 Leaflet + OpenStreetMap | 免费，无需 API Key |
| Contentlayer 替代方案 → 自己写 MD loader | 更简单，无第三方依赖 |

## 遇到的问题
| 问题 | 解决方案 |
|------|---------|

## 资源
- Next.js 文档：https://nextjs.org/docs
- Tailwind CSS v4：https://tailwindcss.com/docs/v4-beta
- Supabase JS Client：https://supabase.com/docs/reference/javascript

---
*每执行2次查看/浏览器/搜索操作后更新此文件*
*防止视觉信息丢失*
