interface PriceBannerProps {
  priceSingle: number;
  priceDouble: number;
  priceOriginal: number;
}

export default function PriceBanner({ priceSingle, priceDouble, priceOriginal }: PriceBannerProps) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-[#1f1008] via-[#2a1810] to-[#1a0f08] p-8 sm:p-10">
      {/* Inner glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 70% 50%, rgba(224,120,42,0.12) 0%, transparent 60%)," +
            "radial-gradient(ellipse 40% 30% at 30% 40%, rgba(240,160,64,0.06) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_6px_rgba(248,192,80,0.6)]" />
            自助畅吃
          </div>
          <h1 className="mt-4 font-serif text-3xl font-bold leading-tight text-text sm:text-4xl">
            自助餐单
          </h1>
          <p className="mt-2 text-sm text-text-muted">
            驻马店烤肉自助好评榜 · 第 1 名
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-xs text-text-muted">单人</p>
            <p className="mt-1 font-serif text-3xl font-bold text-gold">
              ¥{priceSingle}
            </p>
            <p className="text-xs text-text-muted line-through">¥{priceOriginal}</p>
          </div>
          <div className="h-12 w-px bg-border/60" />
          <div className="text-center">
            <p className="text-xs text-text-muted">双人</p>
            <p className="mt-1 font-serif text-3xl font-bold text-gold">
              ¥{priceDouble}
            </p>
            <p className="text-xs text-text-muted line-through">¥{priceOriginal * 2}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
