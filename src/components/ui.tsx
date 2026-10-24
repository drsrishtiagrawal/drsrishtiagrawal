import { useState, useRef, useEffect, type ReactNode } from 'react';
import { Info, X } from 'lucide-react';
import type { DataTag } from '@/data/engine';
import { glossary } from '@/data/engine';

// ── Data Tag Badge ──

const tagStyles: Record<DataTag, { bg: string; text: string; ring: string; dot: string }> = {
  Measured: { bg: 'bg-forest-500/10', text: 'text-forest-300', ring: 'ring-forest-500/30', dot: 'bg-forest-400' },
  Published: { bg: 'bg-cyanx-500/10', text: 'text-cyanx-400', ring: 'ring-cyanx-500/30', dot: 'bg-cyanx-400' },
  'Assumed/Synthetic': { bg: 'bg-purple-500/10', text: 'text-purple-400', ring: 'ring-purple-500/30', dot: 'bg-purple-400' },
};

export function DataTagBadge({ tag, size = 'xs' }: { tag: DataTag; size?: 'xs' | 'sm' }) {
  const s = tagStyles[tag];
  const pad = size === 'xs' ? 'px-1.5 py-0.5 text-[9px]' : 'px-2 py-0.5 text-[10px]';
  const label = tag === 'Assumed/Synthetic' ? 'Synthetic' : tag === 'Published' ? 'Published' : 'Measured';
  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-semibold uppercase tracking-wider ring-1 ${s.bg} ${s.text} ${s.ring} ${pad}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      [{label}]
    </span>
  );
}

// ── Tooltip ──

export function Tooltip({ term, children }: { term: string; children?: ReactNode }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const definition = glossary[term] ?? children;

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  if (!definition) return <>{children}</>;

  return (
    <span ref={ref} className="relative inline-flex">
      <button
        onClick={() => setOpen((o) => !o)}
        onMouseEnter={() => setOpen(true)}
        className="inline-flex items-center gap-0.5 text-forest-400 transition hover:text-forest-300"
        type="button"
      >
        {children ?? <Info className="h-3.5 w-3.5" />}
      </button>
      {open && (
        <span className="absolute bottom-full left-1/2 z-50 mb-2 w-64 -translate-x-1/2 animate-fade-up rounded-xl border border-theme-strong bg-elevated p-3 text-xs leading-relaxed text-secondary shadow-xl">
          <span className="mb-1 block font-display text-xs font-bold text-primary">{term}</span>
          {definition}
        </span>
      )}
    </span>
  );
}

// ── Modal ──

export function Modal({
  open,
  onClose,
  title,
  children,
  maxWidth = 'max-w-lg',
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  maxWidth?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-up" onClick={onClose} />
      <div className={`relative w-full ${maxWidth} max-h-[90vh] overflow-y-auto animate-fade-up rounded-2xl border border-theme-strong bg-elevated shadow-2xl`}>
        <div className="sticky top-0 flex items-center justify-between border-b border-theme bg-elevated/95 px-5 py-3 backdrop-blur">
          <h3 className="font-display text-base font-bold text-primary">{title}</h3>
          <button onClick={onClose} className="rounded-lg p-1.5 text-muted transition hover:bg-white/5 hover:text-primary">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

// ── Panel ──

export function Panel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`glass rounded-2xl p-5 shadow-card ${className}`}>{children}</div>;
}

// ── MetricCard ──

export function MetricCard({
  label, value, unit, sub, tone = 'emerald', info,
}: {
  label: string;
  value: string | number;
  unit?: string;
  sub?: string;
  tone?: 'emerald' | 'cyan' | 'amber' | 'purple' | 'slate';
  info?: string;
}) {
  const tones: Record<string, string> = {
    emerald: 'text-forest-400',
    cyan: 'text-cyanx-400',
    amber: 'text-amber-400',
    purple: 'text-purple-400',
    slate: 'text-slate-200',
  };
  return (
    <div className="glass rounded-xl p-4">
      <div className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-wider text-muted">
        {label}
        {info && <Tooltip term={info} />}
      </div>
      <div className={`mt-1 font-display text-2xl font-bold ${tones[tone]}`}>
        {value}
        {unit && <span className="ml-0.5 text-sm font-semibold text-muted">{unit}</span>}
      </div>
      {sub && <div className="mt-0.5 text-xs text-muted">{sub}</div>}
    </div>
  );
}

// ── SectionHeading ──

export function SectionHeading({
  eyebrow, title, desc, number,
}: {
  eyebrow: string; title: string; desc?: string; number?: string;
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
      <h2 className="font-display text-2xl font-bold tracking-tight text-primary sm:text-3xl">{title}</h2>
      {desc && <p className="mt-2 max-w-3xl text-sm text-secondary sm:text-base">{desc}</p>}
    </div>
  );
}

// ── SliderInput ──

export function SliderInput({
  label, min, max, value, onChange, unit, hint, step = 1, info,
}: {
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (v: number) => void;
  unit: string;
  hint: string;
  step?: number;
  info?: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="flex items-center gap-1 text-xs font-medium text-secondary">
          {label}
          {info && <Tooltip term={info} />}
        </span>
        <span className="font-mono text-sm font-bold text-forest-300">
          {value} <span className="text-xs text-muted">{unit}</span>
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        style={{ ['--pct' as string]: `${pct}%` }}
      />
      <div className="mt-1 flex justify-between font-mono text-[10px] text-muted">
        <span>{min}</span>
        <span>{hint}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
