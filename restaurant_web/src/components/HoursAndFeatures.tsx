export default function HoursAndFeatures() {
  return (
    <section className="section-reveal mx-auto max-w-6xl px-6 py-20">
      <div className="grid gap-5 sm:grid-cols-2">
        {/* Hours */}
        <div className="glass-card group relative overflow-hidden rounded-xl p-6 transition-all duration-500 hover:-translate-y-0.5 hover:border-ember/30">
          <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-brand/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="relative">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
              🔥 营业时间
            </div>
            <p className="text-sm text-text-secondary">周一至周日</p>
            <p className="mt-1 font-serif text-3xl font-bold text-gold">11:00 – 22:00</p>
          </div>
        </div>

        {/* Scores & Amenities */}
        <div className="glass-card group relative overflow-hidden rounded-xl p-6 transition-all duration-500 hover:-translate-y-0.5 hover:border-ember/30">
          <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-brand/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="relative">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
              📋 店铺特色
            </div>

            {/* Score bars */}
            <div className="space-y-3">
              {[
                { label: "口味", score: 4.7 },
                { label: "环境", score: 4.6 },
                { label: "服务", score: 4.6 },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="w-8 text-xs text-text-muted">{item.label}</span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-border">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-brand to-ember transition-all duration-700"
                      style={{ width: `${(item.score / 5) * 100}%` }}
                    />
                  </div>
                  <span className="w-6 text-right text-xs font-medium text-text-secondary">
                    {item.score}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2 text-xs text-text-secondary">
              {["包厢", "免费停车", "宝宝椅", "可预订"].map((a) => (
                <span key={a} className="rounded-full border border-border/60 px-3 py-1 text-text-muted">
                  {a}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
