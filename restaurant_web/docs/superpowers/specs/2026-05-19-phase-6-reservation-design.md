# Phase 6: 预约系统 — 设计规格

**日期:** 2026-05-19
**状态:** Approved
**前置依赖:** Phase 1 (Foundation) ✅

## 概述

独立预约页面 `/reserve`，顾客填写姓名/电话/日期/时间/人数提交预约，数据存入 Supabase `reservations` 表。

## 核心流程

```
/reserve 页面 → 填写表单 → 客户端校验 → Supabase insert → 确认信息
```

## 页面布局（双栏）

桌面端:
```
[Hero 区块 — 炭火光晕 + "在线预约" 标题]
[                                        ]
[  表单列 (flex: 1.5)    |  信息侧栏 (flex: 1) ]
[                        |  营业时间          ]
[  姓名    |  手机号      |  地址/电话         ]
[  日期    |  时间        |                   ]
[  人数    |              |                   ]
[  备注    |              |                   ]
[  确认预约按钮           |                   ]
```

移动端: 信息侧栏折叠到表单下方或隐藏，核心信息在 Hero 区域展示。

## 组件架构

| 文件 | 用途 | 类型 |
|------|------|------|
| `src/app/reserve/page.tsx` | 页面路由，加载 MD + 组装组件 | server |
| `src/components/ReserveHero.tsx` | Hero 区块（复用炭火视觉） | client |
| `src/components/ReserveForm.tsx` | 预约表单 + 校验 + 提交 | client |
| `src/components/ReserveConfirm.tsx` | 提交成功确认 | client |
| `src/content/reserve.md` | 页面文案 | content |

## 表单字段

| 字段 | 类型 | 必填 | 校验 |
|------|------|------|------|
| 姓名 | text | 是 | ≥2 字符 |
| 手机号 | tel | 是 | `/^1[3-9]\d{9}$/` |
| 日期 | date | 是 | 非过去，不超过 30 天后 |
| 时间 | time | 是 | 工作日 10:30-22:30，周末 10:30-23:00；选今天则 ≥ 当前时间+1h |
| 人数 | number | 是 | 1-50 |
| 备注 | textarea | 否 | ≤200 字 |

## 校验逻辑（客户端）

- 实时校验: blur 时触发单字段校验，显示内联错误
- 提交校验: 全部字段运行，滚动到第一个错误
- 日期/时间联动: 选择日期后，时间 input 的 min/max 动态更新
- 今天选择: 时间最小值 = max(营业开始时间, 当前时间 + 1 小时)
- 提交时二次校验（防止浏览器篡改）

## 提交流程

- 默认: "确认预约" 按钮
- loading: spinner + "提交中..."
- Supabase insert → `reservations` 表
- 成功: 显示 `ReserveConfirm` 确认信息
- 错误: 内联错误提示，表单保留，可重试
- 重复提交: 提交后表单禁用，防止双击

## 确认信息 (ReserveConfirm)

表单隐藏，显示确认卡片:
```
✅ 预约成功！

张三 · 4 位
2026-05-20 18:30

预约编号: RSV-20260520-XXXX
到店后报手机号即可

[返回首页] 按钮
```

- 点击"返回首页" → 跳转 `/`
- 预约编号生成: `RSV-` + 日期 + 4 位随机数

## Supabase

利用已有的 `reservations` 表，无需迁移:

```sql
-- 已有表结构
CREATE TABLE IF NOT EXISTS reservations (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  guests INT NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
-- RLS: Allow anon inserts 已配置
```

## 边界状态

| 场景 | 表现 |
|------|------|
| 手机号格式错误 | blur 时内联提示"请输入正确的手机号" |
| 选过去日期 | min 属性阻止，额外提示"请选择今天或未来的日期" |
| 选今天但时间已过 | 时间选择器 min 动态调整，提示"所选时间已过" |
| 人数超过 50 | 提示"最多 50 位，团体请致电" |
| Supabase 不可达 | "网络异常，请稍后再试"，表单保留 |
| 成功提交 | 显示确认信息 |

## 设计约束

- 保持深色暖色调（炭火设计系统一致）
- 从 ContactForm 和 OrderModal 复用校验 + Supabase 模式
- 无额外 npm 依赖
- `reserve.md` 内容驱动 Hero 文案
- 导航栏自动高亮 `/reserve`
