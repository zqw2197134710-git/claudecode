import ReserveHero from "@/components/ReserveHero";
import ReservePageClient from "@/components/ReservePageClient";

export default function ReservePage() {
  return (
    <div className="flex-1">
      <ReserveHero />

      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <ReservePageClient />

          {/* Info sidebar */}
          <aside className="space-y-4">
            <div className="rounded-xl border border-border/60 bg-surface/80 p-5 backdrop-blur-sm">
              <h3 className="text-sm font-semibold text-text">营业时间</h3>
              <div className="mt-3 space-y-2 text-sm text-text-secondary">
                <div className="flex justify-between">
                  <span>周一至周五</span>
                  <span className="text-text">10:30 – 22:30</span>
                </div>
                <div className="flex justify-between">
                  <span>周六至周日</span>
                  <span className="text-text">10:30 – 23:00</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border/60 bg-surface/80 p-5 backdrop-blur-sm">
              <h3 className="text-sm font-semibold text-text">联系方式</h3>
              <div className="mt-3 space-y-2 text-sm text-text-secondary">
                <p>📞 188 8465 2634</p>
                <p>河南省驻马店市驿城区<br/>乐山大道玖隆茂购物中心 7 楼</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
