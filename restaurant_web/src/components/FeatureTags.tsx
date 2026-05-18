interface FeatureTagsProps {
  tags: string[];
}

export default function FeatureTags({ tags }: FeatureTagsProps) {
  const icons: Record<string, string> = {
    "有包厢": "🏠",
    "包厢": "🏠",
    "免费停车": "🅿️",
    "有宝宝椅": "👶",
    "可预订": "📋",
    "宝宝椅": "👶",
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/80 px-3.5 py-2 text-sm text-text-secondary backdrop-blur-sm transition-colors hover:border-ember/30 hover:text-text"
        >
          <span className="text-brand">{icons[tag] || "✦"}</span>
          {tag}
        </span>
      ))}
    </div>
  );
}
