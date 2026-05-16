export default function MapSection() {
  return (
    <section className="section-reveal mx-auto max-w-6xl px-6 py-20">
      <div className="glass-card overflow-hidden rounded-xl">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-border/40 px-6 py-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
            📍 位置
          </span>
          <h2 className="font-serif text-xl font-bold text-text">
            餐厅<span className="text-gold">位置</span>
          </h2>
        </div>

        {/* Map iframe */}
        <div className="relative">
          <iframe
            title="餐厅地图"
            width="100%"
            height="320"
            frameBorder="0"
            scrolling="no"
            src="https://www.openstreetmap.org/export/embed.html?bbox=114.038%2C32.9679%2C114.058%2C32.9879&layer=mapnik&marker=32.9779%2C114.048"
            className="block bg-surface"
            loading="lazy"
          />
          {/* Dark overlay for map consistency */}
          <div className="pointer-events-none absolute inset-0 bg-bg/20" />
        </div>

        {/* Address */}
        <div className="border-t border-border/40 px-6 py-4">
          <p className="text-sm font-medium text-text">
            乐山大道玖隆茂购物中心 7 楼
          </p>
          <p className="mt-0.5 text-xs text-text-muted">
            位于玖隆茂购物公园内
          </p>
        </div>
      </div>
    </section>
  );
}
