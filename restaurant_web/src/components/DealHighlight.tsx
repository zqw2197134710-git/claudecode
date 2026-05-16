const deals = [
  { name: "单人韩式自助烤肉", price: 64.9, originalPrice: 99.9, discount: "6.5", tag: "可叠加使用" },
  { name: "双人韩式自助烤肉", price: 134.8, originalPrice: 199.8, discount: "6.8", tag: "随时退 · 过期自动退" },
];

export default function DealHighlight() {
  return (
    <section className="section-reveal relative mx-auto max-w-6xl px-6 py-20">
      {/* Section header */}
      <div className="mb-8 flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_4px_rgba(224,120,42,0.6)]" />
          HOT
        </span>
        <h2 className="font-serif text-2xl font-bold text-text">
          炙烤一夏 · <span className="text-gold">团购优惠</span>
        </h2>
      </div>

      {/* Deal cards */}
      <div className="grid gap-5 sm:grid-cols-2">
        {deals.map((deal) => (
          <div
            key={deal.name}
            className="glass-card group relative overflow-hidden rounded-xl p-6 transition-all duration-500 hover:-translate-y-1 hover:border-ember/30 hover:shadow-[0_8px_40px_rgba(224,120,42,0.1)]"
          >
            {/* Inner glow on hover */}
            <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-brand/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative">
              <p className="text-xs font-medium text-text-muted uppercase tracking-wider">
                炙烤一夏
              </p>
              <h3 className="mt-1 font-serif text-lg font-bold text-text">
                {deal.name}
              </h3>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gold">¥{deal.price}</span>
                <span className="text-sm text-text-muted line-through">
                  ¥{deal.originalPrice}
                </span>
                <span className="rounded bg-brand/15 px-1.5 py-0.5 text-xs font-bold text-brand">
                  {deal.discount}折
                </span>
              </div>

              <p className="mt-3 text-xs text-text-muted">{deal.tag}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
