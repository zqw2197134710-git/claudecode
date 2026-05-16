export default function HeroSection() {
  return (
    <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f0804] via-[#1a0f08] to-bg" />

      {/* Charcoal fire glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 70%, rgba(224,120,42,0.15) 0%, transparent 60%)," +
            "radial-gradient(ellipse 40% 40% at 30% 50%, rgba(240,160,64,0.08) 0%, transparent 50%)," +
            "radial-gradient(ellipse 30% 30% at 70% 60%, rgba(248,192,80,0.05) 0%, transparent 50%)",
        }}
      />

      {/* Ember particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[
          { l: "15%", d: 0, s: 3, drift: 8 },
          { l: "30%", d: 1.2, s: 2, drift: -10 },
          { l: "48%", d: 2.5, s: 4, drift: 15 },
          { l: "55%", d: 0.7, s: 2, drift: -6 },
          { l: "68%", d: 3.2, s: 3, drift: 12 },
          { l: "80%", d: 1.8, s: 2, drift: -14 },
          { l: "90%", d: 4.0, s: 3, drift: 8 },
          { l: "42%", d: 3.8, s: 2, drift: -8 },
          { l: "62%", d: 2.0, s: 3, drift: 10 },
          { l: "25%", d: 4.5, s: 2, drift: -12 },
        ].map((p, i) => (
          <span
            key={i}
            className="absolute bottom-0 rounded-full"
            style={{
              left: p.l,
              width: p.s,
              height: p.s,
              background: i % 3 === 0 ? "#f8c050" : i % 3 === 1 ? "#f0a040" : "#e0782a",
              animation: `ember-rise ${3.5 + (i % 3) * 0.8}s ease-in-out ${p.d}s infinite`,
              "--drift": `${p.drift}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center stagger-reveal">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/5 px-4 py-1.5 text-xs font-medium text-ember backdrop-blur-sm">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_6px_rgba(248,192,80,0.6)]" />
          驻马店烤肉自助好评榜 · 第 1 名
        </div>

        {/* Title */}
        <h1 className="mt-6 font-serif text-5xl font-bold leading-tight tracking-tight text-text sm:text-6xl lg:text-7xl">
          姜胖胖
          <span className="mt-2 block bg-gradient-to-r from-gold via-ember to-brand bg-clip-text text-transparent">
            韩式自助烤肉
          </span>
        </h1>

        {/* Tagline */}
        <p className="mx-auto mt-4 max-w-lg text-base text-text-secondary">
          匠心烤肉，极致美味 —— 精选上等肉品，炭火直烤，体验正宗韩式自助烤肉
        </p>

        {/* Stats row */}
        <div className="mt-8 flex items-center justify-center gap-8 text-sm">
          <div className="flex flex-col items-center">
            <span className="font-serif text-2xl font-bold text-gold">4.6</span>
            <span className="text-xs text-text-muted">大众点评评分</span>
          </div>
          <span className="h-8 w-px bg-border" />
          <div className="flex flex-col items-center">
            <span className="font-serif text-2xl font-bold text-gold">¥60</span>
            <span className="text-xs text-text-muted">人均消费</span>
          </div>
          <span className="h-8 w-px bg-border" />
          <div className="flex flex-col items-center">
            <span className="font-serif text-2xl font-bold text-gold">5,142</span>
            <span className="text-xs text-text-muted">条真实评价</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="mt-6 flex items-center justify-center gap-4 text-xs text-text-secondary">
          <span className="flex items-center gap-1.5">
            <span className="text-brand">🏠</span> 包厢
          </span>
          <span className="text-border">·</span>
          <span className="flex items-center gap-1.5">
            <span className="text-brand">🅿️</span> 免费停车
          </span>
          <span className="text-border">·</span>
          <span className="flex items-center gap-1.5">
            <span className="text-brand">👶</span> 宝宝椅
          </span>
        </div>

        {/* CTA Buttons */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <a
            href="/contact"
            className="animate-pulse-glow group relative inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-brand to-ember px-8 py-3.5 text-sm font-bold text-[#1a0a02] shadow-[0_4px_24px_rgba(224,120,42,0.4)] transition-all duration-300 hover:shadow-[0_6px_32px_rgba(240,160,64,0.6)] hover:brightness-110"
          >
            立即预约
            <span className="text-base transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </a>
          <a
            href="/menu"
            className="rounded-lg border border-border/60 px-8 py-3.5 text-sm font-medium text-text-secondary backdrop-blur-sm transition-all duration-300 hover:border-ember/40 hover:text-text hover:shadow-[0_0_20px_rgba(224,120,42,0.1)]"
          >
            浏览餐单
          </a>
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent" />
    </section>
  );
}
