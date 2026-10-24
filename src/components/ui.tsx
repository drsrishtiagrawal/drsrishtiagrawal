import type { DataTag } from '@/data/engine';

const tagStyles: Record<DataTag, { bg: string; text: string; ring: string; dot: string }> = {
  Measured: { bg: 'bg-forest-500/10', text: 'text-forest-300', ring: 'ring-forest-500/30', dot: 'bg-forest-400' },
  Published: { bg: 'bg-cyanx-500/10', text: 'text-cyanx-400', ring: 'ring-cyanx-500/30', dot: 'bg-cyanx-400' },
  'Assumed/Synthetic': { bg: 'bg-amber-500/10', text: 'text-amber-400', ring: 'ring-amber-500/30', dot: 'bg-amber-400' },
};

export function DataTagBadge({ tag, size = 'xs' }: { tag: DataTag; size?: 'xs' | 'sm' }) {
  const s = tagStyles[tag];
  const pad = size === 'xs' ? 'px-1.5 py-0.5 text-[9px]' : 'px-2 py-0.5 text-[10px]';
  const label = tag === 'Assumed/Synthetic' ? 'Assumed' : tag;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-semibold uppercase tracking-wider ring-1 ${s.bg} ${s.text} ${s.ring} ${pad}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      [{label}]
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  desc,
  number,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
  number?: string;
}) {
  return (
    <div className="mb-8">
      <div className="mb-3 flex items-center gap-2">
        {number && (
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-forest-600/20 font-mono text-xs font-bold text-forest-300 ring-1 ring-forest-600/40">
            {number}
          </span>
        )}
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-forest-400">{eyebrow}</span>
      </div>
      <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">{title}</h2>
      {desc && <p className="mt-2 max-w-3xl text-sm text-slate-400 sm:text-base">{desc}</p>}
    </div>
  );
}

export function Panel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`glass rounded-2xl p-5 shadow-card ${className}`}>{children}</div>;
}

export function MetricCard({
  label,
  value,
  unit,
  sub,
  tone = 'emerald',
}: {
  label: string;
  value: string | number;
  unit?: string;
  sub?: string;
  tone?: 'emerald' | 'cyan' | 'amber' | 'slate';
}) {
  const tones: Record<string, string> = {
    emerald: 'text-forest-300',
    cyan: 'text-cyanx-400',
    amber: 'text-amber-400',
    slate: 'text-slate-200',
  };
  return (
    <div className="glass rounded-xl p-4">
      <div className="text-[11px] font-medium uppercase tracking-wider text-slate-400">{label}</div>
      <div className={`mt-1 font-display text-2xl font-bold ${tones[tone]}`}>
        {value}
        {unit && <span className="ml-0.5 text-sm font-semibold text-slate-500">{unit}</span>}
      </div>
      {sub && <div className="mt-0.5 text-xs text-slate-500">{sub}</div>}
    </div>
  );
}
