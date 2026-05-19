"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";

interface CartItem {
  name: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  guestCount: number;
}

type CartAction =
  | { type: "ADD_ITEM"; name: string }
  | { type: "REMOVE_ITEM"; name: string }
  | { type: "UPDATE_QUANTITY"; name: string; quantity: number }
  | { type: "SET_GUEST_COUNT"; count: number }
  | { type: "CLEAR_CART" };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.name === action.name);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.name === action.name ? { ...i, quantity: i.quantity + 1 } : i,
          ),
        };
      }
      return { ...state, items: [...state.items, { name: action.name, quantity: 1 }] };
    }
    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter((i) => i.name !== action.name) };
    case "UPDATE_QUANTITY":
      if (action.quantity <= 0) {
        return { ...state, items: state.items.filter((i) => i.name !== action.name) };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.name === action.name ? { ...i, quantity: action.quantity } : i,
        ),
      };
    case "SET_GUEST_COUNT":
      return { ...state, guestCount: Math.max(1, action.count) };
    case "CLEAR_CART":
      return { items: [], guestCount: 1 };
    default:
      return state;
  }
}

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], guestCount: 1 });
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
