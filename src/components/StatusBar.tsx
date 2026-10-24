import {
  Activity, Database, FileText, Sparkles, Cpu, Sun, Moon,
  FlaskRound, Briefcase, LayoutGrid, FileDown, FileCheck2,
} from 'lucide-react';
import type { DataTag } from '@/data/engine';
import { DataTagBadge } from './ui';

export type Persona = 'full' | 'business' | 'rd';
export type Theme = 'dark' | 'light';

interface StatusBarProps {
  theme: Theme;
  onToggleTheme: () => void;
  onExportPitch: () => void;
  onOpenFSSAI: () => void;
}

const tags: DataTag[] = ['Measured', 'Published', 'Assumed/Synthetic'];

export function StatusBar({ theme, onToggleTheme, onExportPitch, onOpenFSSAI }: StatusBarProps) {
  return (
    <div className="border-b border-theme bg-elevated/60">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-forest-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-forest-400 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-forest-400" />
            </span>
            LIVE ENGINE ACTIVE
          </span>
          <span className="hidden text-[10px] text-muted sm:inline">· Deep-Tech Bioprocess v3.0</span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 hidden text-[10px] font-medium uppercase tracking-wider text-muted sm:inline">Data:</span>
          {tags.map((t) => (
            <DataTagBadge key={t} tag={t} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface NavbarProps {
  active: string;
  onNav: (id: string) => void;
  persona: Persona;
  onPersonaChange: (p: Persona) => void;
  theme: Theme;
  onToggleTheme: () => void;
  onExportPitch: () => void;
  onOpenFSSAI: () => void;
}

const navLinks = [
  { id: 'selector', label: 'Feedstock', icon: Activity },
  { id: 'bioprocess', label: 'Bioprocess', icon: Sparkles },
  { id: 'sensory', label: 'Sensory AI', icon: FlaskRound },
  { id: 'techno', label: 'Techno-Func', icon: Cpu },
  { id: 'economics', label: 'Economics', icon: Database },
  { id: 'compliance', label: 'FSSAI', icon: FileText },
  { id: 'roadmap', label: 'Roadmap', icon: Briefcase },
];

const personas: { id: Persona; label: string; icon: typeof LayoutGrid }[] = [
  { id: 'full', label: 'Full Suite', icon: LayoutGrid },
  { id: 'business', label: 'Business', icon: Briefcase },
  { id: 'rd', label: 'R&D Lab', icon: FlaskRound },
];

export function Navbar({
  active, onNav, persona, onPersonaChange, theme, onToggleTheme, onExportPitch, onOpenFSSAI,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-theme bg-elevated/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* logo */}
        <button onClick={() => onNav('top')} className="flex shrink-0 items-center gap-2.5">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-forest-500 to-forest-700 shadow-glow-emerald">
            <RecycleIcon />
          </div>
          <div className="text-left">
            <div className="font-display text-sm font-bold leading-tight text-primary">
              UpcycleAI Engine™ <span className="text-forest-400">v3.0</span>
            </div>
            <div className="-mt-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-cyanx-400">
              NIFTEM-K · Hack the Fork 2026
            </div>
          </div>
        </button>

        {/* nav links */}
        <nav className="hidden items-center gap-0.5 xl:flex">
          {navLinks.map((l) => {
            const Icon = l.icon;
            const isActive = active === l.id;
            return (
              <button
                key={l.id}
                onClick={() => onNav(l.id)}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-medium transition ${
                  isActive
                    ? 'bg-forest-600/20 text-forest-300 ring-1 ring-forest-600/40'
                    : 'text-muted hover:bg-white/5 hover:text-primary'
                }`}
              >
                <Icon className="h-4 w-4" />
                {l.label}
              </button>
            );
          })}
        </nav>

        {/* right actions */}
        <div className="flex shrink-0 items-center gap-1.5">
          {/* persona switcher */}
          <div className="hidden items-center rounded-lg border border-theme bg-card-soft p-0.5 sm:flex">
            {personas.map((p) => {
              const Icon = p.icon;
              const isActive = persona === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => onPersonaChange(p.id)}
                  className={`flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold transition ${
                    isActive ? 'bg-forest-600 text-white' : 'text-muted hover:text-primary'
                  }`}
                >
                  <Icon className="h-3 w-3" />
                  <span className="hidden lg:inline">{p.label}</span>
                </button>
              );
            })}
          </div>

          {/* quick actions */}
          <button
            onClick={onExportPitch}
            className="hidden items-center gap-1 rounded-lg border border-theme px-2.5 py-1.5 text-xs font-semibold text-secondary transition hover:bg-white/5 md:flex"
          >
            <FileDown className="h-3.5 w-3.5" /> Export Pitch
          </button>
          <button
            onClick={onOpenFSSAI}
            className="hidden items-center gap-1 rounded-lg border border-theme px-2.5 py-1.5 text-xs font-semibold text-secondary transition hover:bg-white/5 lg:flex"
          >
            <FileCheck2 className="h-3.5 w-3.5" /> FSSAI
          </button>

          {/* theme toggle */}
          <button
            onClick={onToggleTheme}
            className="rounded-lg border border-theme p-2 text-secondary transition hover:bg-white/5 hover:text-primary"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}

function RecycleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white">
      <path d="M12 3v3m0 12v3m9-9h-3M6 12H3m13.5-6.5L14 8m-4 8l-2.5 2.5M17.5 17.5L15 15M9 9L6.5 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
