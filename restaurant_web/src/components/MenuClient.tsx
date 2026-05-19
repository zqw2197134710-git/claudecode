"use client";

import { useState, useMemo, useCallback } from "react";
import DishCard from "@/components/DishCard";
import PriceBanner from "@/components/PriceBanner";
import CtaBanner from "@/components/CtaBanner";
import { CartProvider } from "@/hooks/useCart";
import CartSidebar from "@/components/CartSidebar";
import CartDrawer from "@/components/CartDrawer";
import OrderModal from "@/components/OrderModal";

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

function MenuContent({
  priceSingle,
  priceDouble,
  priceOriginal,
  categories,
}: MenuClientProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.name ?? "");
  const [search, setSearch] = useState("");
  const [showOrderModal, setShowOrderModal] = useState(false);

  const currentCategory = categories.find((c) => c.name === activeCategory);

  const filteredDishes = useMemo(() => {
    if (!currentCategory) return [];
    if (!search.trim()) return currentCategory.dishes;
    const q = search.trim().toLowerCase();
    return currentCategory.dishes.filter(
      (d) => d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q),
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

          {/* Main content */}
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
                  aria-label="搜索菜品"
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
                  className="mt-3 text-sm text-brand transition-colors hover:text-ember"
                >
                  清除搜索
                </button>
              </div>
            )}
          </div>

          {/* Desktop Cart Sidebar — hidden on mobile */}
          <div className="hidden lg:block">
            <CartSidebar onCheckout={() => setShowOrderModal(true)} />
          </div>
        </div>
      </div>

      {/* Mobile Cart Drawer */}
      <div className="lg:hidden">
        <CartDrawer onCheckout={() => setShowOrderModal(true)} />
      </div>

      <CtaBanner />

      <OrderModal open={showOrderModal} onClose={() => setShowOrderModal(false)} />
    </main>
  );
}

export default function MenuClient(props: MenuClientProps) {
  return (
    <CartProvider>
      <MenuContent {...props} />
    </CartProvider>
  );
}
