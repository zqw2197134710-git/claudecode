export default function Footer() {
  return (
    <footer className="relative mt-auto">
      {/* Warm top glow line */}
      <div className="h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
      <div className="bg-gradient-to-b from-surface to-bg px-6 py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-ember shadow-[0_0_6px_rgba(240,160,64,0.5)]" />
            <span className="font-serif text-base font-bold text-gold">
              姜胖胖韩式自助烤肉
            </span>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-ember shadow-[0_0_6px_rgba(240,160,64,0.5)]" />
          </div>
          <p className="text-xs text-text-muted">
            驻马店烤肉自助好评榜 · 第 1 名 · ★ 4.6 · ¥60/人
          </p>
          <p className="text-xs text-text-muted/60">
            &copy; {new Date().getFullYear()} 姜胖胖韩式自助烤肉
          </p>
        </div>
      </div>
    </footer>
  );
}
