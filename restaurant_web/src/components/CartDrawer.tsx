"use client";

import { useState } from "react";
import { useCart } from "@/hooks/useCart";

const PRICE_PER_PERSON = 69.9;

interface CartDrawerProps {
  onCheckout: () => void;
}

export default function CartDrawer({ onCheckout }: CartDrawerProps) {
  const { state, dispatch } = useCart();
  const [open, setOpen] = useState(false);
  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = state.guestCount * PRICE_PER_PERSON;

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-white shadow-lg shadow-brand/30 transition-all hover:bg-ember"
        >
          备餐单 {totalItems > 0 && `(${totalItems} 件)`} — ¥{totalPrice.toFixed(1)} ▸
        </button>
      )}

      {/* Overlay + Drawer */}
      {open && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[70vh] overflow-y-auto rounded-t-2xl border-t border-border/60 bg-surface p-5 pb-8">
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border" />

            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-text">备餐单</h3>
              {totalItems > 0 && (
                <button
                  onClick={() => dispatch({ type: "CLEAR_CART" })}
                  className="text-xs text-text-muted transition-colors hover:text-ember"
                >
                  清空
                </button>
              )}
            </div>

            {/* Items */}
            <div className="mt-3 space-y-3">
              {state.items.length === 0 ? (
                <p className="text-sm text-text-muted">浏览菜品，点击"加入"标记想吃的</p>
              ) : (
                state.items.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">{item.name}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          dispatch({
                            type: "UPDATE_QUANTITY",
                            name: item.name,
                            quantity: item.quantity - 1,
                          })
                        }
                        className="flex h-6 w-6 items-center justify-center rounded-full border border-border/50 text-xs text-text-muted transition-colors hover:border-ember hover:text-ember"
                        aria-label={`减少 ${item.name}`}
                      >
                        −
                      </button>
                      <span className="w-5 text-center text-sm font-medium text-ember">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => dispatch({ type: "ADD_ITEM", name: item.name })}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-brand/20 text-xs text-brand transition-colors hover:bg-brand/30"
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
            <div className="mt-5 flex items-center justify-between">
              <label className="text-sm text-text-secondary">到店人数</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => dispatch({ type: "SET_GUEST_COUNT", count: state.guestCount - 1 })}
                  disabled={state.guestCount <= 1}
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-border/50 text-sm text-text-muted transition-colors hover:border-ember hover:text-ember disabled:opacity-30"
                >
                  −
                </button>
                <span className="w-6 text-center text-base font-medium text-text">{state.guestCount}</span>
                <button
                  onClick={() => dispatch({ type: "SET_GUEST_COUNT", count: state.guestCount + 1 })}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-brand/20 text-sm text-brand transition-colors hover:bg-brand/30"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total */}
            <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-4">
              <span className="text-sm text-text-secondary">总计</span>
              <span className="text-lg font-semibold text-gold">¥{totalPrice.toFixed(1)}</span>
            </div>

            <button
              onClick={() => {
                setOpen(false);
                onCheckout();
              }}
              disabled={state.guestCount < 1}
              className="mt-4 w-full rounded-lg bg-brand py-3 text-base font-medium text-white transition-all duration-200 hover:bg-ember disabled:cursor-not-allowed disabled:opacity-40"
            >
              {state.guestCount < 1 ? "请填写人数" : "提交订单"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
