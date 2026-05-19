"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

const PHONE_REGEX = /^1[3-9]\d{9}$/;
const WEEKDAY_OPEN = "10:30";
const WEEKDAY_CLOSE = "22:30";
const WEEKEND_OPEN = "10:30";
const WEEKEND_CLOSE = "23:00";

interface FormData {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  notes: string;
}

interface ReserveFormProps {
  onSuccess: (data: { name: string; date: string; time: string; guests: number }) => void;
}

function getDayType(date: Date): "weekday" | "weekend" {
  const day = date.getDay();
  return day === 0 || day === 6 ? "weekend" : "weekday";
}

function getBusinessHours(date: Date): { open: string; close: string } {
  return getDayType(date) === "weekday"
    ? { open: WEEKDAY_OPEN, close: WEEKDAY_CLOSE }
    : { open: WEEKEND_OPEN, close: WEEKEND_CLOSE };
}

function formatTime(date: Date): string {
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function maxDateStr(): string {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().slice(0, 10);
}

function validate(form: FormData): Partial<Record<keyof FormData, string>> {
  const e: Partial<Record<keyof FormData, string>> = {};

  if (!form.name.trim() || form.name.trim().length < 2) {
    e.name = "请输入姓名（至少2个字）";
  }

  if (!PHONE_REGEX.test(form.phone.trim())) {
    e.phone = "请输入正确的手机号";
  }

  if (!form.date) {
    e.date = "请选择日期";
  } else {
    const d = new Date(form.date + "T12:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const maxD = new Date(today);
    maxD.setDate(maxD.getDate() + 30);
    if (d < today) e.date = "不能选择过去的日期";
    else if (d > maxD) e.date = "最多可预约30天内";
  }

  if (!form.time) {
    e.time = "请选择时间";
  } else if (form.date) {
    const d = new Date(form.date + "T12:00:00");
    const hours = getBusinessHours(d);
    if (form.time < hours.open || form.time > hours.close) {
      const label = getDayType(d) === "weekday" ? "周一至周五" : "周六至周日";
      e.time = `营业时间：${label} ${hours.open}-${hours.close}`;
    }
    if (form.date === todayStr()) {
      const minTime = new Date(Date.now() + 60 * 60 * 1000);
      const minStr = formatTime(minTime);
      if (form.time < minStr) e.time = "预约需至少提前1小时";
    }
  }

  if (!form.guests || form.guests < 1) e.guests = "至少1位";
  else if (form.guests > 50) e.guests = "最多50位，团体请致电";

  return e;
}

export default function ReserveForm({ onSuccess }: ReserveFormProps) {
  const [form, setForm] = useState<FormData>({
    name: "", phone: "", date: "", time: "", guests: 4, notes: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function handleChange(field: keyof FormData, value: string | number) {
    const next = { ...form, [field]: value };
    setForm(next);
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function handleSubmit() {
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    setSubmitError("");

    const { error } = await supabase.from("reservations").insert({
      name: form.name.trim(),
      phone: form.phone.trim(),
      date: form.date,
      time: form.time,
      guests: form.guests,
      notes: form.notes.trim() || null,
    });

    setSubmitting(false);
    if (error) {
      setSubmitError("网络异常，请稍后再试");
      return;
    }

    onSuccess({ name: form.name.trim(), date: form.date, time: form.time, guests: form.guests });
  }

  const selectedDate = form.date ? new Date(form.date + "T12:00:00") : null;
  const timeRange = selectedDate ? getBusinessHours(selectedDate) : null;

  return (
    <div className="rounded-xl border border-border/60 bg-surface/80 p-6 backdrop-blur-sm">
      <h2 className="text-lg font-semibold text-text">预约信息</h2>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs text-text-muted">姓名 *</label>
          <input type="text" value={form.name} onChange={(e) => handleChange("name", e.target.value)}
            placeholder="您的称呼"
            className="mt-1 w-full rounded-lg border border-border/60 bg-bg px-3 py-2 text-sm text-text placeholder:text-text-muted/50 transition-colors focus:border-brand/50 focus:outline-none focus:ring-1 focus:ring-brand/30" />
          {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
        </div>
        <div>
          <label className="text-xs text-text-muted">手机号 *</label>
          <input type="tel" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="18884652634"
            className="mt-1 w-full rounded-lg border border-border/60 bg-bg px-3 py-2 text-sm text-text placeholder:text-text-muted/50 transition-colors focus:border-brand/50 focus:outline-none focus:ring-1 focus:ring-brand/30" />
          {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
        </div>
        <div>
          <label className="text-xs text-text-muted">日期 *</label>
          <input type="date" value={form.date} onChange={(e) => handleChange("date", e.target.value)}
            min={todayStr()} max={maxDateStr()}
            className="mt-1 w-full rounded-lg border border-border/60 bg-bg px-3 py-2 text-sm text-text transition-colors focus:border-brand/50 focus:outline-none focus:ring-1 focus:ring-brand/30" />
          {errors.date && <p className="mt-1 text-xs text-red-400">{errors.date}</p>}
        </div>
        <div>
          <label className="text-xs text-text-muted">时间 *</label>
          <input type="time" value={form.time} onChange={(e) => handleChange("time", e.target.value)}
            min={timeRange?.open ?? ""} max={timeRange?.close ?? ""}
            className="mt-1 w-full rounded-lg border border-border/60 bg-bg px-3 py-2 text-sm text-text transition-colors focus:border-brand/50 focus:outline-none focus:ring-1 focus:ring-brand/30" />
          {errors.time && <p className="mt-1 text-xs text-red-400">{errors.time}</p>}
        </div>
        <div>
          <label className="text-xs text-text-muted">人数 *</label>
          <div className="mt-1 flex items-center gap-3">
            <button type="button" onClick={() => handleChange("guests", Math.max(1, form.guests - 1))}
              disabled={form.guests <= 1}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border/50 text-sm text-text-muted transition-colors hover:border-ember hover:text-ember disabled:opacity-30">−</button>
            <span className="w-8 text-center text-lg font-medium text-text">{form.guests}</span>
            <button type="button" onClick={() => handleChange("guests", Math.min(50, form.guests + 1))}
              disabled={form.guests >= 50}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/20 text-sm text-brand transition-colors hover:bg-brand/30 disabled:opacity-30">+</button>
          </div>
          {errors.guests && <p className="mt-1 text-xs text-red-400">{errors.guests}</p>}
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs text-text-muted">备注</label>
          <textarea value={form.notes} onChange={(e) => handleChange("notes", e.target.value)}
            placeholder="如：有小孩、过敏信息等" rows={2} maxLength={200}
            className="mt-1 w-full resize-none rounded-lg border border-border/60 bg-bg px-3 py-2 text-sm text-text placeholder:text-text-muted/50 transition-colors focus:border-brand/50 focus:outline-none focus:ring-1 focus:ring-brand/30" />
        </div>
      </div>

      {submitError && <p className="mt-3 text-center text-sm text-red-400">{submitError}</p>}

      <button onClick={handleSubmit} disabled={submitting}
        className="mt-5 w-full rounded-lg bg-brand py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-ember disabled:cursor-not-allowed disabled:opacity-50">
        {submitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            提交中...
          </span>
        ) : "确认预约"}
      </button>
    </div>
  );
}
