"use client";

interface ReserveConfirmProps {
  name: string;
  date: string;
  time: string;
  guests: number;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00");
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function ReserveConfirm({ name, date, time, guests }: ReserveConfirmProps) {
  const orderNo = `RSV-${date.replace(/-/g, "")}-${String(Math.floor(1000 + Math.random() * 9000))}`;

  return (
    <div className="rounded-xl border border-border/60 bg-surface/80 p-8 backdrop-blur-sm">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-3xl">
          ✅
        </div>
        <h2 className="mt-4 text-xl font-semibold text-text">预约成功！</h2>
        <p className="mt-2 font-mono text-sm text-gold">{orderNo}</p>

        <div className="mx-auto mt-6 max-w-xs space-y-2 text-sm text-text-secondary">
          <p>{name} · {guests} 位</p>
          <p>{formatDate(date)} {time}</p>
        </div>

        <p className="mt-6 text-xs text-text-muted">到店后报手机号即可</p>

        <a href="/"
          className="mt-6 inline-block w-full rounded-lg border border-brand/40 py-2.5 text-sm font-medium text-brand transition-colors hover:bg-brand/10">
          返回首页
        </a>
      </div>
    </div>
  );
}
