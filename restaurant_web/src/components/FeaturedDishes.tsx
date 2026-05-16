const dishes = [
  { name: "芝士火鸡面", recommends: 13, rank: 1 },
  { name: "芝士肥牛石锅拌饭", recommends: 12, rank: 2 },
  { name: "厚切五花", recommends: 9, rank: 3 },
  { name: "韩式炸鸡", recommends: 9, rank: 4 },
  { name: "雪花牛肋条", recommends: 9, rank: 5 },
];

export default function FeaturedDishes() {
  return (
    <section className="section-reveal mx-auto max-w-6xl px-6 py-20">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_4px_rgba(224,120,42,0.6)]" />
          TOP 5
        </span>
        <h2 className="font-serif text-2xl font-bold text-text">
          网友推荐 <span className="text-gold">人气菜品</span>
        </h2>
      </div>

      {/* Dish cards — horizontal scroll */}
      <div className="flex gap-4 overflow-x-auto pb-4 [-webkit-overflow-scrolling:touch] [scrollbar-width:thin]">
        {dishes.map((dish) => (
          <div
            key={dish.name}
            className="glass-card group relative min-w-[160px] shrink-0 overflow-hidden rounded-xl transition-all duration-500 hover:-translate-y-1 hover:border-ember/30 hover:shadow-[0_8px_30px_rgba(224,120,42,0.1)]"
          >
            {/* Image placeholder */}
            <div className="flex h-28 items-center justify-center bg-gradient-to-br from-surface via-card to-border">
              <span className="text-3xl opacity-15 select-none">🥩</span>
            </div>

            <div className="p-4">
              <p className="text-sm font-medium text-text">{dish.name}</p>
              <p className="mt-1 text-xs text-brand">{dish.recommends} 人推荐</p>
            </div>

            {/* Rank badge */}
            <div className="absolute left-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-brand to-ember text-xs font-bold text-[#1a0a02] shadow-[0_2px_8px_rgba(224,120,42,0.4)]">
              {dish.rank}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
