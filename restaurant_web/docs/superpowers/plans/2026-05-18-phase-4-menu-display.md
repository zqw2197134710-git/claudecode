# Phase 4: Menu Display — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a menu browsing page with category sidebar navigation, search filtering, and CSS-texture decorative dish cards, driven by menu.md content.

**Architecture:** Server component (`page.tsx`) reads and parses `menu.md` at build time; passes structured data to a client component (`MenuClient`) that manages tab selection and search state. Three new presentational components (`DishCard`, `PriceBanner`, `MenuTabs`) render the UI. Uses existing `glass-card`, `stagger-reveal`, `fire-glow` design tokens from globals.css.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS, gray-matter

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `src/components/DishCard.tsx` | Create | Decorative dish card with CSS texture zone |
| `src/components/PriceBanner.tsx` | Create | Buffet price hero strip |
| `src/components/MenuClient.tsx` | Create | Client state (tab/search), layout orchestration |
| `src/app/menu/page.tsx` | Modify | Server component: MD parsing, passes data to MenuClient |

---

### Task 1: Create DishCard component

**Files:**
- Create: `src/components/DishCard.tsx`

- [ ] **Step 1: Write DishCard component**

```tsx
const categoryGradients: Record<string, { from: string; to: string; glow: string }> = {
  "招牌烤肉": { from: "rgba(240,160,64,0.2)", to: "rgba(224,120,42,0.05)", glow: "rgba(240,160,64,0.4)" },
  "韩式料理": { from: "rgba(248,192,80,0.2)", to: "rgba(240,160,64,0.05)", glow: "rgba(248,192,80,0.35)" },
  "炸物小吃": { from: "rgba(224,120,42,0.2)", to: "rgba(200,90,20,0.05)", glow: "rgba(224,120,42,0.35)" },
  "凉菜冷面": { from: "rgba(100,180,180,0.15)", to: "rgba(80,140,160,0.05)", glow: "rgba(120,180,180,0.3)" },
  "甜品": { from: "rgba(200,140,180,0.15)", to: "rgba(180,100,140,0.05)", glow: "rgba(200,140,180,0.3)" },
  "水果": { from: "rgba(140,200,120,0.15)", to: "rgba(180,200,60,0.05)", glow: "rgba(160,200,100,0.3)" },
  "酒水饮料": { from: "rgba(100,160,200,0.15)", to: "rgba(80,140,200,0.05)", glow: "rgba(120,170,210,0.3)" },
};

interface Dish {
  name: string;
  description: string;
  category: string;
}

export default function DishCard({ dish }: { dish: Dish }) {
  const g = categoryGradients[dish.category] || categoryGradients["招牌烤肉"];

  return (
    <div className="glass-card group relative overflow-hidden rounded-xl transition-all duration-500 hover:-translate-y-0.5 hover:border-ember/30">
      {/* Texture zone */}
      <div
        className="relative h-24 overflow-hidden"
        style={{
          background: `
            linear-gradient(135deg, ${g.from} 0%, transparent 50%),
            linear-gradient(225deg, ${g.to} 0%, transparent 40%),
            radial-gradient(circle at 60% 30%, ${g.glow} 0%, transparent 40%),
            radial-gradient(circle at 30% 70%, rgba(0,0,0,0.4) 0%, transparent 30%)
          `,
        }}
      >
        {/* Grain lines overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `
              repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(80,40,20,0.3) 2px, rgba(80,40,20,0.3) 3px),
              repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(60,30,15,0.2) 30px, rgba(60,30,15,0.2) 32px)
            `,
          }}
        />
        {/* Ember dot */}
        <div
          className="absolute rounded-full"
          style={{
            right: "20%",
            top: "30%",
            width: 3,
            height: 3,
            background: g.glow,
            boxShadow: `0 0 8px ${g.glow}`,
            animation: "ember-glow 2s ease-in-out infinite",
          }}
        />
      </div>

      {/* Content zone */}
      <div className="relative p-4">
        <h3 className="font-medium text-text text-base">{dish.name}</h3>
        <p className="mt-1.5 text-sm text-text-secondary leading-relaxed line-clamp-2">
          {dish.description}
        </p>
        <span className="mt-3 inline-block rounded-full bg-brand/10 px-2.5 py-0.5 text-[11px] text-brand">
          {dish.category}
        </span>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npx next build 2>&1 | tail -5`
Expected: `Errors: 0 | Warnings: 0`

- [ ] **Step 3: Commit**

```bash
git add src/components/DishCard.tsx
git commit -m "feat(menu): add DishCard component with CSS texture decoration"
```

---

### Task 2: Create PriceBanner component

**Files:**
- Create: `src/components/PriceBanner.tsx`

- [ ] **Step 1: Write PriceBanner component**

```tsx
interface PriceBannerProps {
  priceSingle: number;
  priceDouble: number;
  priceOriginal: number;
}

export default function PriceBanner({ priceSingle, priceDouble, priceOriginal }: PriceBannerProps) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-[#1f1008] via-[#2a1810] to-[#1a0f08] p-8 sm:p-10">
      {/* Inner glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 70% 50%, rgba(224,120,42,0.12) 0%, transparent 60%)," +
            "radial-gradient(ellipse 40% 30% at 30% 40%, rgba(240,160,64,0.06) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_6px_rgba(248,192,80,0.6)]" />
            自助畅吃
          </div>
          <h1 className="mt-4 font-serif text-3xl font-bold leading-tight text-text sm:text-4xl">
            自助餐单
          </h1>
          <p className="mt-2 text-sm text-text-muted">
            驻马店烤肉自助好评榜 · 第 1 名
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-xs text-text-muted">单人</p>
            <p className="mt-1 font-serif text-3xl font-bold text-gold">
              ¥{priceSingle}
            </p>
            <p className="text-xs text-text-muted line-through">¥{priceOriginal}</p>
          </div>
          <div className="h-12 w-px bg-border/60" />
          <div className="text-center">
            <p className="text-xs text-text-muted">双人</p>
            <p className="mt-1 font-serif text-3xl font-bold text-gold">
              ¥{priceDouble}
            </p>
            <p className="text-xs text-text-muted line-through">¥{priceOriginal * 2}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npx next build 2>&1 | tail -5`
Expected: `Errors: 0 | Warnings: 0`

- [ ] **Step 3: Commit**

```bash
git add src/components/PriceBanner.tsx
git commit -m "feat(menu): add PriceBanner component"
```

---

### Task 3: Create MenuClient component

**Files:**
- Create: `src/components/MenuClient.tsx`
- Depends on: DishCard, PriceBanner, CtaBanner (existing)

- [ ] **Step 1: Write MenuClient component**

```tsx
"use client";

import { useState, useMemo, useCallback } from "react";
import DishCard from "@/components/DishCard";
import PriceBanner from "@/components/PriceBanner";
import CtaBanner from "@/components/CtaBanner";

interface Dish {
  name: string;
  description: string;
  category: string;
}

interface Category {
  name: string;
  dishes: Dish[];
}

interface MenuClientProps {
  priceSingle: number;
  priceDouble: number;
  priceOriginal: number;
  categories: Category[];
}

export default function MenuClient({
  priceSingle,
  priceDouble,
  priceOriginal,
  categories,
}: MenuClientProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.name ?? "");
  const [search, setSearch] = useState("");

  const currentCategory = categories.find((c) => c.name === activeCategory);

  const filteredDishes = useMemo(() => {
    if (!currentCategory) return [];
    if (!search.trim()) return currentCategory.dishes;
    const q = search.trim().toLowerCase();
    return currentCategory.dishes.filter(
      (d) => d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q)
    );
  }, [currentCategory, search]);

  const handleCategoryChange = useCallback((name: string) => {
    setActiveCategory(name);
    setSearch("");
  }, []);

  return (
    <main className="flex-1">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <PriceBanner
          priceSingle={priceSingle}
          priceDouble={priceDouble}
          priceOriginal={priceOriginal}
        />

        <div className="mt-10 flex gap-8">
          {/* Desktop Sidebar */}
          <nav className="hidden w-52 shrink-0 lg:block">
            <ul className="sticky top-24 space-y-1">
              {categories.map((cat) => {
                const isActive = cat.name === activeCategory;
                return (
                  <li key={cat.name}>
                    <button
                      onClick={() => handleCategoryChange(cat.name)}
                      className={`w-full rounded-r-lg border-l-2 px-4 py-2.5 text-left text-sm transition-all duration-200 ${
                        isActive
                          ? "border-ember bg-brand/5 font-medium text-gold"
                          : "border-transparent text-text-secondary hover:border-border hover:text-text"
                      }`}
                    >
                      {cat.name}
                      <span className="ml-2 text-xs text-text-muted">({cat.dishes.length})</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Mobile Tabs + Content */}
          <div className="min-w-0 flex-1">
            {/* Mobile category tabs */}
            <div className="mb-6 -mx-1 overflow-x-auto pb-2 lg:hidden">
              <div className="flex gap-1.5 px-1">
                {categories.map((cat) => {
                  const isActive = cat.name === activeCategory;
                  return (
                    <button
                      key={cat.name}
                      onClick={() => handleCategoryChange(cat.name)}
                      className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-brand/20 text-ember border border-brand/40"
                          : "border border-border/60 text-text-secondary hover:border-border"
                      }`}
                    >
                      {cat.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
                </svg>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="搜索菜品..."
                  className="w-full rounded-lg border border-border/60 bg-surface py-2.5 pl-10 pr-4 text-sm text-text placeholder:text-text-muted/60 transition-colors focus:border-brand/50 focus:outline-none focus:ring-1 focus:ring-brand/30"
                />
              </div>
            </div>

            {/* Dish grid */}
            {filteredDishes.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 stagger-reveal">
                {filteredDishes.map((dish) => (
                  <DishCard key={dish.name} dish={dish} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <p className="text-4xl">🔍</p>
                <p className="mt-4 text-sm text-text-muted">未找到匹配菜品</p>
                <button
                  onClick={() => setSearch("")}
                  className="mt-3 text-sm text-brand hover:text-ember transition-colors"
                >
                  清除搜索
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <CtaBanner />
    </main>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npx next build 2>&1 | tail -5`
Expected: `Errors: 0 | Warnings: 0`

- [ ] **Step 3: Commit**

```bash
git add src/components/MenuClient.tsx
git commit -m "feat(menu): add MenuClient with category nav and search"
```

---

### Task 4: Rewrite menu/page.tsx

**Files:**
- Modify: `src/app/menu/page.tsx`

- [ ] **Step 1: Rewrite page.tsx as server component with MD parsing**

```tsx
import { getContent } from "@/lib/content";
import MenuClient from "@/components/MenuClient";

interface Dish {
  name: string;
  description: string;
  category: string;
}

interface Category {
  name: string;
  dishes: Dish[];
}

interface MenuPrices {
  priceSingle: number;
  priceDouble: number;
  priceOriginal: number;
}

function parseMenu(body: string): Category[] {
  const categories: Category[] = [];
  const blocks = body.split(/\n(?=## )/);

  for (const block of blocks) {
    const headingMatch = block.match(/^## (.+)/);
    if (!headingMatch) continue;

    const name = headingMatch[1].trim();
    const lines = block.replace(/^## .+\n?/, "").trim().split("\n");
    const dishes: Dish[] = [];

    let inTable = false;
    for (const line of lines) {
      if (line.includes("|---")) {
        inTable = true;
        continue;
      }
      if (!inTable) continue;
      const match = line.match(/^\|\s*(.+?)\s*\|\s*(.+?)\s*\|$/);
      if (match) {
        dishes.push({
          name: match[1].trim(),
          description: match[2].trim(),
          category: name,
        });
      }
    }

    if (dishes.length > 0) {
      categories.push({ name, dishes });
    }
  }

  return categories;
}

export default function MenuPage() {
  const data = getContent("menu.md");

  if (!data) {
    return (
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-20 text-center text-text-muted">
        菜单内容加载中...
      </main>
    );
  }

  const categories = parseMenu(data.body);
  const prices: MenuPrices = {
    priceSingle: Number(data.frontmatter.price_single) || 69.9,
    priceDouble: Number(data.frontmatter.price_double) || 139.8,
    priceOriginal: Number(data.frontmatter.price_original) || 99.9,
  };

  return (
    <MenuClient
      priceSingle={prices.priceSingle}
      priceDouble={prices.priceDouble}
      priceOriginal={prices.priceOriginal}
      categories={categories}
    />
  );
}
```

- [ ] **Step 2: Verify build and check all routes**

Run: `npx next build 2>&1`
Expected: `Errors: 0 | Warnings: 0`, all 4 routes (/, /menu, /about, /contact) generated

- [ ] **Step 3: Verify menu page renders correctly in dev server**

Run: `npx next dev -p 3456 &` (background), then `curl -s http://localhost:3456/menu | head -20`
Expected: HTML contains "自助餐单", dish names

- [ ] **Step 4: Commit**

```bash
git add src/app/menu/page.tsx
git commit -m "feat(menu): rewrite menu page with MD-driven content"
```

---

### Task 5: Update OpenWolf files

**Files:**
- Modify: `.wolf/anatomy.md`
- Append: `.wolf/memory.md`

- [ ] **Step 1: Update anatomy.md with new components**

Add to the `## src/components/` section:
```
- `DishCard.tsx` — DishCard — CSS texture decorative card (~80 tok)
- `MenuClient.tsx` — MenuClient — client state, sidebar, search, grid (~120 tok)
- `PriceBanner.tsx` — PriceBanner — buffet price hero (~100 tok)
```

Update `src/app/menu/` entry:
```
- `page.tsx` — MenuPage — server MD parser (~100 tok)
```

- [ ] **Step 2: Append to memory.md**

```
| 18:30 | commit Phase 4 (menu page) | DishCard, MenuClient, PriceBanner, menu/page.tsx | build OK, 4 routes | ~800 |
```

- [ ] **Step 3: Commit**

```bash
git add .wolf/anatomy.md .wolf/memory.md
git commit -m "chore: update OpenWolf files for Phase 4"
```

---

### Task 6: Update roadmap and state

**Files:**
- Modify: `.planning/ROADMAP.md`
- Modify: `.planning/STATE.md`

- [ ] **Step 1: Mark Phase 4 complete in ROADMAP.md**

Change `- [ ] **Phase 4: Menu Display**` to `- [x] **Phase 4: Menu Display**`
Update progress table row to `Completed | 2026-05-18`

- [ ] **Step 2: Update STATE.md**

Set `Current Focus` to `Phase 5 Online Ordering`
Update progress: `4/6 phases complete`

- [ ] **Step 3: Commit**

```bash
git add .planning/ROADMAP.md .planning/STATE.md
git commit -m "chore: mark Phase 4 complete in roadmap"
```
