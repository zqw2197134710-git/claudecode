"use client";

import { useState, FormEvent } from "react";
import { supabase } from "@/lib/supabase";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const phoneRegex = /^1[3-9]\d{9}$/;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim() || !phone.trim() || !message.trim()) {
      setErrorMsg("请填写所有必填字段");
      return;
    }
    if (!phoneRegex.test(phone.trim())) {
      setErrorMsg("请输入有效的手机号码");
      return;
    }

    setStatus("loading");

    const { error } = await supabase.from("contacts").insert({
      name: name.trim(),
      phone: phone.trim(),
      message: message.trim(),
    });

    if (error) {
      setStatus("error");
      setErrorMsg("提交失败，请稍后再试");
      return;
    }

    setStatus("success");
    setName("");
    setPhone("");
    setMessage("");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div>
        <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-text-secondary">
          姓名 <span className="text-brand">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={status === "loading"}
          className="w-full rounded-lg border border-border/60 bg-surface px-4 py-3 text-sm text-text placeholder:text-text-muted/60 transition-colors focus:border-brand/50 focus:outline-none focus:ring-1 focus:ring-brand/30 disabled:opacity-50"
          placeholder="请输入您的姓名"
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="contact-phone" className="mb-1.5 block text-sm font-medium text-text-secondary">
          电话 <span className="text-brand">*</span>
        </label>
        <input
          id="contact-phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={status === "loading"}
          className="w-full rounded-lg border border-border/60 bg-surface px-4 py-3 text-sm text-text placeholder:text-text-muted/60 transition-colors focus:border-brand/50 focus:outline-none focus:ring-1 focus:ring-brand/30 disabled:opacity-50"
          placeholder="请输入您的手机号码"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-text-secondary">
          留言 <span className="text-brand">*</span>
        </label>
        <textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={status === "loading"}
          rows={4}
          className="w-full resize-none rounded-lg border border-border/60 bg-surface px-4 py-3 text-sm text-text placeholder:text-text-muted/60 transition-colors focus:border-brand/50 focus:outline-none focus:ring-1 focus:ring-brand/30 disabled:opacity-50"
          placeholder="请输入您的留言"
        />
      </div>

      {/* Error */}
      {errorMsg && (
        <p className="text-sm text-red-400">{errorMsg}</p>
      )}

      {/* Success */}
      {status === "success" && (
        <div className="rounded-lg border border-emerald-700/40 bg-emerald-900/20 px-4 py-3">
          <p className="text-sm text-emerald-300">提交成功，我们会尽快与您联系。</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-brand to-ember px-8 py-3.5 text-sm font-bold text-[#1a0a02] shadow-[0_4px_24px_rgba(224,120,42,0.4)] transition-all duration-300 hover:shadow-[0_6px_32px_rgba(240,160,64,0.6)] hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <>
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            提交中...
          </>
        ) : (
          <>
            提交留言
            <span className="text-base transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </>
        )}
      </button>
    </form>
  );
}
