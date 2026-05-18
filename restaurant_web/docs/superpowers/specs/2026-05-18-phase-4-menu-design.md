# Phase 4: Menu Display — Design Spec

**Date:** 2026-05-18
**Status:** Approved
**Scope:** 餐单浏览页 — 分类导航、菜品展示、搜索过滤

## 1. Architecture

```
src/app/menu/page.tsx          (Server) — reads menu.md, parses tables, passes structured props
  └─ MenuClient               (Client) — tab/search/filter state
       ├─ PriceBanner          — buffet price hero
       ├─ CategorySidebar      — desktop left nav (w-52)
       ├─ CategoryTabs         — mobile horizontal scroll tabs
       ├─ SearchBar            — text input with debounce
       ├─ DishGrid             — responsive card grid
       │    └─ DishCard × N    — CSS-texture decorative card
       └─ CtaBanner            — reuse existing component
```

Data flow: `menu.md` → `getContent()` → `parseMenu()` → structured `MenuData` → `MenuClient` props.

## 2. Components

### 2.1 page.tsx (Server Component)

- Calls `getContent("menu.md")`
- Parses frontmatter: `price_single`, `price_double`, `price_original`
- Parses body: splits by `##` headings into categories, parses markdown tables (`| 菜名 | 描述 |`) into dish arrays
- Passes `{ prices, categories }` to `<MenuClient />`

### 2.2 MenuClient (Client Component)

- State: `activeCategory: string` (defaults to first), `search: string`
- Desktop: renders sidebar + content grid side by side
- Mobile: renders horizontal scroll tabs above content
- Filters dishes: by activeCategory AND search query (case-insensitive)
- Empty state when no results match search

### 2.3 PriceBanner

- Hero strip showing `¥69.9/人 自助畅吃` with gradient text
- Lightweight, sits above the main layout

### 2.4 CategorySidebar (Desktop only)

- Fixed-width left column (`hidden lg:block w-52`)
- Vertical list of category names
- Active category: `border-l-2 border-ember`, text turns gold
- Click updates `activeCategory`

### 2.5 CategoryTabs (Mobile only)

- Horizontal scroll container (`lg:hidden`, `overflow-x-auto`)
- Pill-style tab buttons for each category
- Active tab: `bg-brand/20 text-ember border-brand/40`
- ScrollIntoView behavior when tab changes

### 2.6 SearchBar

- Text input with search icon, full-width on desktop
- 200ms debounce before filtering
- Filters dishes within the currently selected category

### 2.7 DishCard

- No images — CSS decorative texture zone at top
- Texture zone (`h-24`): dark background with radial-gradient ember glow, unique per category:
  - 招牌烤肉: ember warm orange gradient
  - 韩式料理: gold gradient
  - 炸物小吃: brand orange-red gradient
  - 凉菜冷面: cool teal-gray gradient
  - 甜品: warm pink-purple gradient
  - 水果: green-gold gradient
  - 酒水饮料: cyan-blue gradient
- Content zone: dish name (font-medium), description (text-sm muted), category tag pill
- Hover: `-translate-y-0.5`, texture glow intensifies
- Follows existing `glass-card` pattern with border, rounded-xl

### 2.8 CtaBanner

- Reuse existing `src/components/CtaBanner.tsx`
- Text: "¥69.9 自助畅吃，立即预约到店"
- Button links to `/contact`

## 3. Responsive Breakpoints

| Breakpoint | Sidebar | Tabs | Grid |
|-----------|---------|------|------|
| Mobile (< lg) | Hidden | Horizontal scroll pills | 1 col (sm: 2 col) |
| Desktop (>= lg) | Fixed left w-52 | Hidden | 3 col |

## 4. States

- **Loading:** Not applicable (content is build-time static)
- **Empty search:** "未找到匹配菜品" message with icon
- **Empty category:** "该分类暂无菜品" (should not happen with current data)
- **Content missing:** menu.md not found → fallback message

## 5. Files to Create/Modify

| File | Action |
|------|--------|
| `src/content/menu.md` | Already created (27 dishes, 7 categories) |
| `src/app/menu/page.tsx` | Rewrite — server component with MD parsing |
| `src/components/MenuClient.tsx` | Create — client state + layout |
| `src/components/DishCard.tsx` | Create — decorative card |
| `src/components/PriceBanner.tsx` | Create — price hero |

## 6. Content Format (menu.md)

Frontmatter with pricing, body with `##` category sections containing markdown tables of `| 菜名 | 描述 |`.

Already written and committed at `src/content/menu.md`.

## 7. Design System Consistency

- Colors: uses existing tokens (`bg`, `text`, `brand`, `ember`, `gold`, `border`, `surface`)
- Cards: `glass-card` pattern from about/contact pages
- Animations: `stagger-reveal`, `ember-rise` keyframes from globals.css
- Typography: existing `font-serif` for headings, system sans for body
