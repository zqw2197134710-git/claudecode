import { getContent } from "@/lib/content";
import AboutHero from "@/components/AboutHero";
import FeatureTags from "@/components/FeatureTags";

function parseSections(body: string): { heading: string; content: string }[] {
  const sections: { heading: string; content: string }[] = [];
  const blocks = body.split(/\n(?=## )/);
  for (const block of blocks) {
    const match = block.match(/^## (.+)/);
    if (match) {
      sections.push({
        heading: match[1],
        content: block.replace(/^## .+\n?/, "").trim(),
      });
    }
  }
  return sections;
}

function parseRatings(content: string): { label: string; score: number }[] {
  const items: { label: string; score: number }[] = [];
  const lines = content.split("\n");
  let inTable = false;
  for (const line of lines) {
    if (line.includes("|---")) { inTable = true; continue; }
    if (!inTable) continue;
    const match = line.match(/^\|\s*(.+?)\s*\|\s*([\d.]+)\s*\|/);
    if (match) {
      items.push({ label: match[1].trim(), score: parseFloat(match[2]) });
    }
  }
  return items;
}

function mdToHtml(md: string): string {
  let html = md
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br/>");
  html = "<p>" + html + "</p>";
  return html;
}

export default function AboutPage() {
  const data = getContent("about.md");
  if (!data) {
    return (
      <main className="flex-1">
        <AboutHero />
        <div className="mx-auto max-w-4xl px-6 py-20 text-center text-text-muted">
          内容加载中...
        </div>
      </main>
    );
  }

  const sections = parseSections(data.body);
  const storySection = sections.find((s) => s.heading.includes("品牌故事"));
  const envSection = sections.find((s) => s.heading.includes("环境"));
  const ratingSection = sections.find((s) => s.heading.includes("评分"));
  const featureSection = sections.find((s) => s.heading.includes("特色"));

  const scores = ratingSection ? parseRatings(ratingSection.content) : [];
  const featureText = featureSection?.content || "";
  const tags = ["有包厢", "免费停车", "有宝宝椅", "可预订"].filter((t) =>
    featureText.includes(t)
  );

  return (
    <main className="flex-1">
      <AboutHero />

      <div className="mx-auto max-w-4xl px-6 py-16 space-y-6 stagger-reveal">
        {/* Brand Story */}
        {storySection && (
          <div className="glass-card group relative overflow-hidden rounded-xl p-6 sm:p-8 transition-all duration-500 hover:-translate-y-0.5 hover:border-ember/30">
            <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-brand/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
                📖 {storySection.heading}
              </div>
              <div
                className="prose-p:text-text-secondary prose-p:leading-relaxed text-sm text-text-secondary space-y-3"
                dangerouslySetInnerHTML={{ __html: mdToHtml(storySection.content) }}
              />
            </div>
          </div>
        )}

        {/* Environment */}
        {envSection && (
          <div className="glass-card group relative overflow-hidden rounded-xl p-6 sm:p-8 transition-all duration-500 hover:-translate-y-0.5 hover:border-ember/30">
            <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-brand/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
                🏠 {envSection.heading}
              </div>
              <div
                className="prose-p:text-text-secondary prose-p:leading-relaxed text-sm text-text-secondary space-y-3"
                dangerouslySetInnerHTML={{ __html: mdToHtml(envSection.content) }}
              />
            </div>
          </div>
        )}

        {/* Ratings */}
        {scores.length > 0 && (
          <div className="glass-card group relative overflow-hidden rounded-xl p-6 sm:p-8 transition-all duration-500 hover:-translate-y-0.5 hover:border-ember/30">
            <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-brand/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
                ⭐ 顾客评分
              </div>

              <div className="space-y-3">
                {scores.map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className="w-8 text-sm text-text-muted">{item.label}</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-border">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-brand to-ember transition-all duration-700"
                        style={{ width: `${(item.score / 5) * 100}%` }}
                      />
                    </div>
                    <span className="w-8 text-right text-sm font-medium text-text-secondary">
                      {item.score}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-3">
                <span className="font-serif text-3xl font-bold text-gold">4.6</span>
                <div>
                  <p className="text-sm text-text">综合评分</p>
                  <p className="text-xs text-text-muted">驻马店烤肉自助好评榜 · 第 1 名</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Feature Tags */}
        {tags.length > 0 && (
          <div className="glass-card group relative overflow-hidden rounded-xl p-6 sm:p-8 transition-all duration-500 hover:-translate-y-0.5 hover:border-ember/30">
            <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-brand/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
                🏷️ 店铺特色
              </div>
              <FeatureTags tags={tags} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
