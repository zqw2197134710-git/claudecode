const categoryGradients: Record<string, { from: string; to: string; glow: string }> = {
  "招牌烤肉": { from: "rgba(240,160,64,0.2)", to: "rgba(224,120,42,0.05)", glow: "rgba(240,160,64,0.4)" },
  "韩式料理": { from: "rgba(248,192,80,0.2)", to: "rgba(240,160,64,0.05)", glow: "rgba(248,192,80,0.35)" },
  "炸物小吃": { from: "rgba(224,120,42,0.2)", to: "rgba(200,90,20,0.05)", glow: "rgba(224,120,42,0.35)" },
  "凉菜冷面": { from: "rgba(100,180,180,0.15)", to: "rgba(80,140,160,0.05)", glow: "rgba(120,180,180,0.3)" },
  "甜品": { from: "rgba(200,140,180,0.15)", to: "rgba(180,100,140,0.05)", glow: "rgba(200,140,180,0.3)" },
  "水果": { from: "rgba(140,200,120,0.15)", to: "rgba(180,200,60,0.05)", glow: "rgba(160,200,100,0.3)" },
  "酒水饮料": { from: "rgba(100,160,200,0.15)", to: "rgba(80,140,200,0.05)", glow: "rgba(120,170,210,0.3)" },
};

interface Dish {
  name: string;
  description: string;
  category: string;
}

export default function DishCard({ dish }: { dish: Dish }) {
  const grad = categoryGradients[dish.category] || categoryGradients["招牌烤肉"];

  return (
    <div className="glass-card group relative overflow-hidden rounded-xl transition-all duration-500 hover:-translate-y-0.5 hover:border-ember/30">
      {/* Texture zone */}
      <div
        aria-hidden="true"
        className="relative h-24 overflow-hidden"
        style={{
          background: `
            linear-gradient(135deg, ${grad.from} 0%, transparent 50%),
            linear-gradient(225deg, ${grad.to} 0%, transparent 40%),
            radial-gradient(circle at 60% 30%, ${grad.glow} 0%, transparent 40%),
            radial-gradient(circle at 30% 70%, rgba(0,0,0,0.4) 0%, transparent 30%)
          `,
        }}
      >
        {/* Grain lines overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-20"
          style={{
            background: `
              repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(80,40,20,0.3) 2px, rgba(80,40,20,0.3) 3px),
              repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(60,30,15,0.2) 30px, rgba(60,30,15,0.2) 32px)
            `,
          }}
        />
        {/* Ember dot */}
        <div
          aria-hidden="true"
          className="absolute rounded-full"
          style={{
            right: "20%",
            top: "30%",
            width: 3,
            height: 3,
            background: g.glow,
            boxShadow: `0 0 8px ${grad.glow}`,
            animation: "ember-glow 2s ease-in-out infinite",
          }}
        />
      </div>

      {/* Content zone */}
      <div className="relative p-4">
        <h3 className="font-medium text-text text-base">{dish.name}</h3>
        <p className="mt-1.5 text-sm text-text-secondary leading-relaxed line-clamp-2">
          {dish.description}
        </p>
        <span className="mt-3 inline-block rounded-full bg-brand/10 px-2.5 py-0.5 text-[11px] text-brand">
          {dish.category}
        </span>
      </div>
    </div>
  );
}
