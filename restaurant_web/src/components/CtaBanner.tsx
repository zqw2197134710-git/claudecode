export default function CtaBanner() {
  return (
    <section className="section-reveal mx-auto max-w-6xl px-6 py-20">
      <div className="fire-glow relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-[#1f1008] via-[#2a1810] to-[#1a0f08] p-10 text-center sm:p-16">
        {/* Inner glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(224,120,42,0.1) 0%, transparent 60%)," +
              "radial-gradient(ellipse at 30% 40%, rgba(240,160,64,0.05) 0%, transparent 50%)",
          }}
        />

        {/* Floating embers */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {[15, 35, 55, 72, 88].map((l, i) => (
            <span
              key={i}
              className="absolute bottom-0 rounded-full"
              style={{
                left: `${l}%`,
                width: i % 2 === 0 ? 2 : 3,
                height: i % 2 === 0 ? 2 : 3,
                background: i % 2 === 0 ? "#f0a040" : "#f8c050",
                animation: `ember-rise ${4 + i * 0.3}s ease-in-out ${i * 0.6}s infinite`,
                "--drift": `${i % 2 === 0 ? 8 : -8}px`,
              } as React.CSSProperties}
            />
          ))}
        </div>

        <div className="relative z-10 stagger-reveal">
          <h2 className="font-serif text-2xl font-bold text-text sm:text-3xl">
            准备好体验正宗
            <span className="bg-gradient-to-r from-gold via-ember to-brand bg-clip-text text-transparent">
              韩式烤肉
            </span>
            了吗？
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-text-secondary">
            人均 ¥60 · 好评榜第 1 名 · 5,142 条好评 · 随时退 · 过期自动退
          </p>
          <a
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-brand to-ember px-10 py-3.5 text-sm font-bold text-[#1a0a02] shadow-[0_4px_24px_rgba(224,120,42,0.4)] transition-all duration-300 hover:shadow-[0_6px_36px_rgba(240,160,64,0.6)] hover:brightness-110"
          >
            立即预约
            <span className="text-base transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
