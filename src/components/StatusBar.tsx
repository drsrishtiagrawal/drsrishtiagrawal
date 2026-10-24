import { Activity, Database, FileText, Sparkles, Cpu } from 'lucide-react';
import type { DataTag } from '@/data/engine';
import { DataTagBadge } from './ui';

const tags: DataTag[] = ['Measured', 'Published', 'Assumed/Synthetic'];

export function StatusBar() {
  return (
    <div className="border-b border-white/5 bg-ink-850">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-forest-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-forest-400 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-forest-400" />
            </span>
            ENGINE ONLINE
          </span>
          <span className="hidden items-center gap-1 text-[11px] text-slate-500 sm:flex">
            <Cpu className="h-3 w-3" /> Bioprocess synthesis v2.0
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 hidden text-[10px] font-medium uppercase tracking-wider text-slate-500 sm:inline">
            Data provenance:
          </span>
          {tags.map((t) => (
            <DataTagBadge key={t} tag={t} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface NavProps {
  active: string;
  onNav: (id: string) => void;
}

const navLinks = [
  { id: 'selector', label: 'By-Products', icon: Activity },
  { id: 'bioprocess', label: 'Bioprocess', icon: Sparkles },
  { id: 'economics', label: 'Economics', icon: Database },
  { id: 'compliance', label: 'FSSAI', icon: FileText },
  { id: 'roadmap', label: 'Roadmap', icon: Cpu },
];

export function Navbar({ active, onNav }: NavProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink-900/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button onClick={() => onNav('top')} className="flex items-center gap-2.5">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-forest-500 to-forest-700 shadow-glow-emerald">
            <RecycleIcon />
          </div>
          <div className="text-left">
            <div className="font-display text-sm font-bold leading-tight text-white">
              UpcycleAI Engine™ <span className="text-forest-400">v2.0</span>
            </div>
            <div className="-mt-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-cyanx-400">
              NIFTEM-K · Hack the Fork 2026
            </div>
          </div>
        </button>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => {
            const Icon = l.icon;
            const isActive = active === l.id;
            return (
              <button
                key={l.id}
                onClick={() => onNav(l.id)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-forest-600/20 text-forest-300 ring-1 ring-forest-600/40'
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                }`}
              >
                <Icon className="h-4 w-4" />
                {l.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden rounded-full bg-cyanx-500/10 px-2.5 py-1 text-[10px] font-semibold text-cyanx-400 ring-1 ring-cyanx-500/30 sm:inline-block">
            PS-2 · Alt Protein
          </span>
          <button
            onClick={() => onNav('bioprocess')}
            className="rounded-lg bg-forest-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-forest-500"
          >
            Synthesize
          </button>
        </div>
      </div>
    </header>
  );
}

function RecycleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white">
      <path
        d="M12 3v3m0 12v3m9-9h-3M6 12H3m13.5-6.5L14 8m-4 8l-2.5 2.5M17.5 17.5L15 15M9 9L6.5 6.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
