export default function AboutHero() {
  return (
    <section className="relative flex min-h-[40vh] items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f0804] via-[#1a0f08] to-bg" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 70%, rgba(224,120,42,0.1) 0%, transparent 60%)," +
            "radial-gradient(ellipse 40% 40% at 30% 50%, rgba(240,160,64,0.05) 0%, transparent 50%)",
        }}
      />

      {/* Subtle embers */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[
          { l: "20%", d: 0, s: 2 },
          { l: "45%", d: 1.5, s: 2 },
          { l: "70%", d: 3.0, s: 3 },
          { l: "85%", d: 2.0, s: 2 },
        ].map((p, i) => (
          <span
            key={i}
            className="absolute bottom-0 rounded-full"
            style={{
              left: p.l,
              width: p.s,
              height: p.s,
              background: i % 2 === 0 ? "#f0a040" : "#e0782a",
              animation: `ember-rise ${4 + i * 0.7}s ease-in-out ${p.d}s infinite`,
              "--drift": `${i % 2 === 0 ? 8 : -6}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/5 px-4 py-1.5 text-xs font-medium text-ember backdrop-blur-sm">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_6px_rgba(248,192,80,0.6)]" />
          关于我们
        </div>
        <h1 className="mt-6 font-serif text-4xl font-bold leading-tight text-text sm:text-5xl">
          姜胖胖
          <span className="mt-2 block bg-gradient-to-r from-gold via-ember to-brand bg-clip-text text-transparent">
            韩式自助烤肉
          </span>
        </h1>
        <p className="mt-4 text-sm text-text-muted">驻马店玖隆茂店</p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg to-transparent" />
    </section>
  );
}
