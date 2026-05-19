"use client";

import { useCart } from "@/hooks/useCart";

const PRICE_PER_PERSON = 69.9;

interface CartSidebarProps {
  onCheckout: () => void;
}

export default function CartSidebar({ onCheckout }: CartSidebarProps) {
  const { state, dispatch } = useCart();
  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = state.guestCount * PRICE_PER_PERSON;

  return (
    <aside className="w-[220px] shrink-0">
      <div className="sticky top-24 rounded-xl border border-border/60 bg-surface/80 p-4 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-text">备餐单</h3>
          {totalItems > 0 && (
            <button
              onClick={() => dispatch({ type: "CLEAR_CART" })}
              className="text-xs text-text-muted transition-colors hover:text-ember"
            >
              清空
            </button>
          )}
        </div>

        {/* Items list */}
        <div className="mt-3 space-y-2">
          {state.items.length === 0 ? (
            <p className="text-xs text-text-muted">浏览菜品，点击"加入"标记想吃的</p>
          ) : (
            state.items.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <span className="truncate text-text-secondary">{item.name}</span>
                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  <button
                    onClick={() =>
                      dispatch({
                        type: "UPDATE_QUANTITY",
                        name: item.name,
                        quantity: item.quantity - 1,
                      })
                    }
                    className="flex h-5 w-5 items-center justify-center rounded-full border border-border/50 text-xs text-text-muted transition-colors hover:border-ember hover:text-ember"
                    aria-label={`减少 ${item.name}`}
                  >
                    −
                  </button>
                  <span className="w-4 text-center text-xs font-medium text-ember">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => dispatch({ type: "ADD_ITEM", name: item.name })}
                    className="flex h-5 w-5 items-center justify-center rounded-full bg-brand/20 text-xs text-brand transition-colors hover:bg-brand/30"
                    aria-label={`增加 ${item.name}`}
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Guest count */}
        <div className="mt-4 flex items-center justify-between">
          <label className="text-xs text-text-secondary">到店人数</label>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => dispatch({ type: "SET_GUEST_COUNT", count: state.guestCount - 1 })}
              disabled={state.guestCount <= 1}
              className="flex h-5 w-5 items-center justify-center rounded-full border border-border/50 text-xs text-text-muted transition-colors hover:border-ember hover:text-ember disabled:opacity-30"
              aria-label="减少人数"
            >
              −
            </button>
            <span className="w-5 text-center text-sm font-medium text-text">{state.guestCount}</span>
            <button
              onClick={() => dispatch({ type: "SET_GUEST_COUNT", count: state.guestCount + 1 })}
              className="flex h-5 w-5 items-center justify-center rounded-full bg-brand/20 text-xs text-brand transition-colors hover:bg-brand/30"
              aria-label="增加人数"
            >
              +
            </button>
          </div>
        </div>

        {/* Total */}
        <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-3">
          <span className="text-xs text-text-secondary">总计</span>
          <span className="text-sm font-semibold text-gold">¥{totalPrice.toFixed(1)}</span>
        </div>

        {/* Submit */}
        <button
          onClick={onCheckout}
          disabled={state.guestCount < 1}
          className="mt-3 w-full rounded-lg bg-brand py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-ember disabled:cursor-not-allowed disabled:opacity-40"
        >
          {state.guestCount < 1 ? "请填写人数" : "提交订单"}
        </button>
      </div>
    </aside>
  );
}
