import { getContent } from "@/lib/content";
import MapSection from "@/components/MapSection";
import ContactForm from "@/components/ContactForm";

interface ContactFrontmatter {
  title?: string;
  address?: string;
  phone?: string;
  hours_weekday?: string;
  hours_weekend?: string;
}

export default function ContactPage() {
  const data = getContent("contact.md");
  const fm = (data?.frontmatter || {}) as ContactFrontmatter;

  const address = fm.address || "地址加载中...";
  const phone = fm.phone || "";
  const phoneDisplay = phone ? phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1 $2 $3") : "";
  const hoursWeekday = fm.hours_weekday || "";
  const hoursWeekend = fm.hours_weekend || "";

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative flex min-h-[30vh] items-center justify-center overflow-hidden">
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
            { l: "25%", d: 0, s: 2 },
            { l: "55%", d: 1.8, s: 2 },
            { l: "75%", d: 0.5, s: 3 },
          ].map((p, i) => (
            <span
              key={i}
              className="absolute bottom-0 rounded-full"
              style={{
                left: p.l,
                width: p.s,
                height: p.s,
                background: i % 2 === 0 ? "#f0a040" : "#e0782a",
                animation: `ember-rise ${4 + i * 0.6}s ease-in-out ${p.d}s infinite`,
                "--drift": `${i % 2 === 0 ? 8 : -6}px`,
              } as React.CSSProperties}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/5 px-4 py-1.5 text-xs font-medium text-ember backdrop-blur-sm">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_6px_rgba(248,192,80,0.6)]" />
            联系我们
          </div>
          <h1 className="mt-6 font-serif text-4xl font-bold leading-tight text-text sm:text-5xl">
            联系
            <span className="ml-1 bg-gradient-to-r from-gold via-ember to-brand bg-clip-text text-transparent">
              我们
            </span>
          </h1>
          <p className="mt-3 text-sm text-text-muted">期待您的光临</p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg to-transparent" />
      </section>

      {/* Info + Form */}
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 lg:grid-cols-2 stagger-reveal">
          {/* Info Card */}
          <div className="glass-card group relative overflow-hidden rounded-xl p-6 sm:p-8 transition-all duration-500 hover:-translate-y-0.5 hover:border-ember/30">
            <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-brand/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
                📍 店铺信息
              </div>

              {/* Address */}
              <div>
                <h3 className="text-sm font-medium text-text-secondary">地址</h3>
                <p className="mt-1 text-sm text-text">{address}</p>
              </div>

              {/* Phone */}
              {phone && (
                <div>
                  <h3 className="text-sm font-medium text-text-secondary">电话</h3>
                  <a
                    href={`tel:${phone}`}
                    className="mt-1 inline-block text-lg font-semibold text-gold transition-colors hover:text-ember"
                  >
                    {phoneDisplay}
                  </a>
                </div>
              )}

              {/* Hours */}
              {(hoursWeekday || hoursWeekend) && (
                <div>
                  <h3 className="text-sm font-medium text-text-secondary">营业时间</h3>
                  <div className="mt-1 space-y-0.5 text-sm text-text">
                    {hoursWeekday && <p>周一至周五 {hoursWeekday}</p>}
                    {hoursWeekend && <p>周六至周日 {hoursWeekend}</p>}
                  </div>
                </div>
              )}

              {/* Transportation */}
              <div>
                <h3 className="text-sm font-medium text-text-secondary">交通指引</h3>
                <ul className="mt-1 space-y-0.5 text-sm text-text-secondary">
                  <li>公交至乐山大道 / 置地大道口站</li>
                  <li>自驾：玖隆茂购物中心停车场，免费停车</li>
                  <li>地标：乐山大道与置地大道交叉口</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="glass-card group relative overflow-hidden rounded-xl p-6 sm:p-8 transition-all duration-500 hover:-translate-y-0.5 hover:border-ember/30">
            <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-brand/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
                📝 给我们留言
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <MapSection />
    </main>
  );
}
