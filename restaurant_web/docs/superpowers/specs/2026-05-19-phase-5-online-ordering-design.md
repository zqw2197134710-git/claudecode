# Phase 5: 在线点单 — 设计规格

**日期:** 2026-05-19
**状态:** Approved
**前置依赖:** Phase 4 (Menu Display) ✅

## 概述

自助烤肉餐厅的"在线点单"本质是**到店登记 + 备餐参考**。顾客浏览菜单，标记想吃的菜品（帮助餐厅预估食材），填写到店信息，提交订单。到店支付，无需在线付款。

## 核心流程

```
浏览菜单 → 标记菜品(选填) → 填写到店信息 → 提交 → 确认页面
```

## 组件架构

```
MenuClient (existing, modified)
├── CartProvider (React Context + useReducer)
│   ├── DishCard (modified) — 加 "+/-" 按钮
│   ├── CartSidebar (new) — 桌面端右侧固定栏
│   ├── CartDrawer (new) — 移动端底部抽屉
│   ├── OrderModal (new) — 提交订单弹窗
│   └── OrderConfirm (new) — 提交成功显示
```

### 新增文件

| 文件 | 用途 | 类型 |
|------|------|------|
| `src/hooks/useCart.ts` | 购物车状态 | hook (client) |
| `src/components/CartSidebar.tsx` | 桌面端右侧备餐单 | client component |
| `src/components/CartDrawer.tsx` | 移动端底部抽屉 | client component |
| `src/components/OrderModal.tsx` | 提交订单弹窗 | client component |
| `src/components/OrderConfirm.tsx` | 提交成功确认 | client component |

### 修改文件

| 文件 | 变更 |
|------|------|
| `src/components/MenuClient.tsx` | 包裹 CartProvider，加右侧备餐单栏 + 移动端浮动按钮 |
| `src/components/DishCard.tsx` | 底部加 "+/-" 按钮和数量 |

## 购物车状态 (useCart)

```typescript
interface CartItem {
  name: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  guestCount: number;
}

interface CartActions {
  addItem: (name: string) => void;
  removeItem: (name: string) => void;
  updateQuantity: (name: string, qty: number) => void;
  setGuestCount: (n: number) => void;
  clearCart: () => void;
  totalItems: number;
  items: CartItem[];
}
```

- `guestCount` 默认 1
- 同一菜品重复加 → 累加 quantity
- quantity 为 0 时自动移除

## DishCard 修改

每张卡片底部加操作区:
- quantity > 0: 显示 `[-] [数量] [+]`
- quantity = 0: 显示 `[+] 加入备餐单`
- 点击 "+" 时短缩放动画反馈

## 布局

### 桌面端 (>1024px)

```
[分类侧栏 200px] | [搜索 + 菜品 Grid] | [备餐单侧栏 220px]
```

备餐单侧栏包含:
- 标题 "备餐单" + 清空按钮
- 已选列表（名称 × 数量，无单价）
- 分割线
- 人数输入（数字，默认 1）
- 总计: `人数 × ¥69.9`
- "提交订单" 按钮（禁用态：空备餐单或人数 < 1）

### 移动端 (<1024px)

菜品 Grid 下方贴一个浮动栏:
```
[备餐单 (N 件) — ¥XXX.XX ▸]
```
点击展开底部 Drawer，内容同桌面端侧栏，加 "提交订单"。

## 提交订单弹窗 (OrderModal)

点击"提交订单"弹出 Modal（半透明遮罩 + 居中卡片）：

**表单字段:**
| 字段 | 类型 | 必填 | 校验 |
|------|------|------|------|
| 姓名 | text | 是 | 非空，≥2 字符 |
| 手机号 | tel | 是 | 匹配 `/^1[3-9]\d{9}$/` |
| 到店人数 | number | 是 | 1-50 |
| 预计到店时间 | time | 否 | - |
| 备注 | textarea | 否 | 最多 200 字 |

**订单摘要:**
- 已选菜品列表
- 人数 × ¥69.9 = 总计

**提交按钮:**
- 默认: "确认提交"
- 提交中: loading 旋转 + "提交中..."
- 成功: 关闭弹窗 → 显示 OrderConfirm
- 失败: 显示错误提示，可重试

**用户体验细节:**
- 表单聚焦时自动弹键盘（移动端）
- 提交后表单禁用，防止重复提交
- 错误信息内联显示在按钮上方

## 确认页面 (OrderConfirm)

提交成功后，关闭 OrderModal，显示 OrderConfirm（全屏 Modal 覆盖）:

```
✅ 备餐单已提交！

订单号: #ORD-20260519-XXXX
顾客: [姓名]
到店人数: [N] 位
预计到店: [时间]

到店后请告知店员您的订单号

[返回菜单] 按钮
```

- 点击"返回菜单" → 关闭 OrderConfirm，重置购物车，菜单浏览状态保留
- 订单号生成: 客户端用 `ORD-` + 日期 + 4 位随机数（纯展示用，非业务依赖）

## Supabase

利用已有的 `orders` 表，无需迁移:

```sql
-- 已有表结构
CREATE TABLE IF NOT EXISTS orders (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  items JSONB NOT NULL DEFAULT '[]',
  total NUMERIC(10,2) NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

写入数据格式:
```json
{
  "items": [{"name": "厚切五花", "quantity": 2}, {"name": "部队锅", "quantity": 1}],
  "total": 279.6,
  "customer_name": "张三",
  "customer_phone": "18884652634",
  "notes": "4位，预计18:30到"
}
```

## 边界状态与错误处理

| 场景 | 表现 |
|------|------|
| 购物车为空 | "提交订单"禁用，提示"请添加菜品或直接填写人数" |
| 人数 < 1 | 禁用提交，输入框红色边框 |
| 手机号格式错误 | 内联提示"请输入正确的手机号" |
| Supabase 不可达 | 提交按钮→"网络异常，请重试"，不清除表单 |
| 提交成功 | 显示确认页 |
| 超时（>10s） | 显示"服务器响应超时，请稍后查询订单状态" |
| 极窄屏幕 (<360px) | 备餐单 Drawer 全宽，文字适当缩小 |

## 设计约束

- 保持深色暖色调设计系统（与站点一致）
- 所有新增组件用 `"use client"`
- 无额外 npm 依赖
- 无图片加载（菜单无图片，备餐参考无需图片）
- 无在线支付（v1 不涉及）

## 不做的事

- 购物车数据持久化（刷新即重置，用户应在到店前完成）
- 后台管理订单列表（v1 通过 Supabase Dashboard 查看）
- 订单状态跟踪（无"已确认/准备中/已完成"状态）
- 在线支付
- 用户登录
