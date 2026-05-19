"use client";

import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { supabase } from "@/lib/supabase";

const PRICE_PER_PERSON = 69.9;
const PHONE_REGEX = /^1[3-9]\d{9}$/;

interface OrderModalProps {
  open: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  phone: string;
  notes: string;
}

type Mode = "form" | "success";

export default function OrderModal({ open, onClose }: OrderModalProps) {
  const { state, dispatch } = useCart();
  const [mode, setMode] = useState<Mode>("form");
  const [form, setForm] = useState<FormData>({ name: "", phone: "", notes: "" });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const totalPrice = state.guestCount * PRICE_PER_PERSON;
  const orderNo = `ORD-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${String(Math.floor(1000 + Math.random() * 9000))}`;

  function validate(): boolean {
    const e: Partial<FormData> = {};
    if (!form.name.trim() || form.name.trim().length < 2) {
      e.name = "请输入姓名（至少2个字）";
    }
    if (!PHONE_REGEX.test(form.phone.trim())) {
      e.phone = "请输入正确的手机号";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;
    setSubmitting(true);
    setSubmitError("");

    const { error } = await supabase.from("orders").insert({
      items: state.items.map((i) => ({ name: i.name, quantity: i.quantity })),
      total: totalPrice,
      customer_name: form.name.trim(),
      customer_phone: form.phone.trim(),
      notes: form.notes.trim() || null,
    });

    setSubmitting(false);

    if (error) {
      setSubmitError("网络异常，请重试");
      return;
    }

    setMode("success");
  }

  function handleClose() {
    if (mode === "success") {
      dispatch({ type: "CLEAR_CART" });
    }
    setMode("form");
    setForm({ name: "", phone: "", notes: "" });
    setErrors({});
    setSubmitError("");
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative w-full max-w-sm rounded-2xl border border-border/60 bg-surface p-6 shadow-2xl">
        {mode === "form" ? (
          <>
            <h3 className="text-lg font-semibold text-text">提交备餐单</h3>

            {/* Name */}
            <div className="mt-4">
              <label className="text-xs text-text-muted">姓名 *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="您的称呼"
                className="mt-1 w-full rounded-lg border border-border/60 bg-bg px-3 py-2 text-sm text-text placeholder:text-text-muted/50 transition-colors focus:border-brand/50 focus:outline-none focus:ring-1 focus:ring-brand/30"
              />
              {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
            </div>

            {/* Phone */}
            <div className="mt-3">
              <label className="text-xs text-text-muted">手机号 *</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="18884652634"
                className="mt-1 w-full rounded-lg border border-border/60 bg-bg px-3 py-2 text-sm text-text placeholder:text-text-muted/50 transition-colors focus:border-brand/50 focus:outline-none focus:ring-1 focus:ring-brand/30"
              />
              {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
            </div>

            {/* Notes */}
            <div className="mt-3">
              <label className="text-xs text-text-muted">备注</label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="如：有小孩、过敏信息等"
                rows={2}
                maxLength={200}
                className="mt-1 w-full resize-none rounded-lg border border-border/60 bg-bg px-3 py-2 text-sm text-text placeholder:text-text-muted/50 transition-colors focus:border-brand/50 focus:outline-none focus:ring-1 focus:ring-brand/30"
              />
            </div>

            {/* Summary */}
            <div className="mt-4 rounded-lg bg-bg/50 p-3">
              {state.items.length > 0 && (
                <div className="mb-2 text-xs text-text-muted">
                  {state.items.map((i) => `${i.name} ×${i.quantity}`).join(" · ")}
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">
                  {state.guestCount} 位 × ¥{PRICE_PER_PERSON}
                </span>
                <span className="font-semibold text-gold">¥{totalPrice.toFixed(1)}</span>
              </div>
            </div>

            {/* Error */}
            {submitError && (
              <p className="mt-2 text-center text-xs text-red-400">{submitError}</p>
            )}

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="mt-4 w-full rounded-lg bg-brand py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-ember disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  提交中...
                </span>
              ) : (
                "确认提交"
              )}
            </button>

            <p className="mt-3 text-center text-[11px] text-text-muted">到店支付，无需在线付款</p>
          </>
        ) : (
          <>
            <div className="py-4 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-2xl">
                ✅
              </div>
              <h3 className="mt-4 text-lg font-semibold text-text">备餐单已提交！</h3>
              <p className="mt-2 font-mono text-sm text-gold">{orderNo}</p>
              <div className="mt-4 space-y-1 text-sm text-text-secondary">
                <p>顾客：{form.name}</p>
                <p>到店人数：{state.guestCount} 位</p>
                {state.items.length > 0 && (
                  <p className="text-xs text-text-muted">
                    {state.items.map((i) => `${i.name} ×${i.quantity}`).join(" · ")}
                  </p>
                )}
              </div>
              <p className="mt-4 text-xs text-text-muted">到店后请告知店员您的订单号</p>
            </div>
            <button
              onClick={handleClose}
              className="mt-2 w-full rounded-lg border border-brand/40 py-2.5 text-sm font-medium text-brand transition-colors hover:bg-brand/10"
            >
              返回菜单
            </button>
          </>
        )}
      </div>
    </div>
  );
}
