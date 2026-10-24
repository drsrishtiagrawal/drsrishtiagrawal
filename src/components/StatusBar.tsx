import { useState, useEffect } from 'react';
import {
  Activity, Database, FileText, Sparkles, Cpu, Sun, Moon,
  FlaskRound, Briefcase, LayoutGrid, FileDown, FileCheck2, Menu, X,
} from 'lucide-react';
import type { DataTag } from '@/data/engine';
import { DataTagBadge } from './ui';

export type Persona = 'full' | 'business' | 'rd';
export type Theme = 'dark' | 'light';

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
  { id: 'full', label: 'Full', icon: LayoutGrid },
  { id: 'business', label: 'Business', icon: Briefcase },
  { id: 'rd', label: 'R&D', icon: FlaskRound },
];

export function Navbar({
  active, onNav, persona, onPersonaChange, theme, onToggleTheme, onExportPitch, onOpenFSSAI,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  // close mobile menu when scrolling to a section
  const handleNav = (id: string) => {
    onNav(id);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-theme bg-elevated/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* logo */}
        <button onClick={() => handleNav('top')} className="flex shrink-0 items-center gap-2.5">
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

        {/* desktop nav links */}
        <nav className="hidden items-center gap-0.5 xl:flex">
          {navLinks.map((l) => {
            const Icon = l.icon;
            const isActive = active === l.id;
            return (
              <button
                key={l.id}
                onClick={() => handleNav(l.id)}
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
          {/* persona switcher — visible on all screens */}
          <div className="flex items-center rounded-lg border border-theme bg-card-soft p-0.5">
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
                  title={p.id === 'full' ? 'Full Engineering Suite' : p.id === 'business' ? 'Business & Economic Focus' : 'R&D & Bioprocess Lab Focus'}
                >
                  <Icon className="h-3 w-3" />
                  <span className="hidden sm:inline">{p.label}</span>
                </button>
              );
            })}
          </div>

          {/* export pitch — icon-only on mobile, label on md+ */}
          <button
            onClick={onExportPitch}
            className="flex items-center gap-1 rounded-lg border border-theme px-2.5 py-2 text-xs font-semibold text-secondary transition hover:bg-white/5"
            title="Export Pitch Summary"
          >
            <FileDown className="h-4 w-4" />
            <span className="hidden md:inline">Export Pitch</span>
          </button>

          {/* FSSAI — icon-only on mobile, label on lg+ */}
          <button
            onClick={onOpenFSSAI}
            className="flex items-center gap-1 rounded-lg border border-theme px-2.5 py-2 text-xs font-semibold text-secondary transition hover:bg-white/5"
            title="FSSAI Dossier"
          >
            <FileCheck2 className="h-4 w-4" />
            <span className="hidden lg:inline">FSSAI</span>
          </button>

          {/* theme toggle */}
          <button
            onClick={onToggleTheme}
            className="rounded-lg border border-theme p-2 text-secondary transition hover:bg-white/5 hover:text-primary"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* mobile menu toggle */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="rounded-lg border border-theme p-2 text-secondary transition hover:bg-white/5 hover:text-primary xl:hidden"
            title="Navigation menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* mobile nav drawer */}
      {mobileOpen && (
        <div className="animate-fade-up border-t border-theme bg-elevated xl:hidden">
          <nav className="mx-auto grid max-w-7xl grid-cols-2 gap-1 px-4 py-3 sm:grid-cols-4 sm:px-6 lg:px-8">
            {navLinks.map((l) => {
              const Icon = l.icon;
              const isActive = active === l.id;
              return (
                <button
                  key={l.id}
                  onClick={() => handleNav(l.id)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-xs font-medium transition ${
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
        </div>
      )}
    </header>
  );
}

// ── Status Bar (transparency badges) ──

const tags: DataTag[] = ['Measured', 'Published', 'Assumed/Synthetic'];

export function StatusBar() {
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

function RecycleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white">
      <path d="M12 3v3m0 12v3m9-9h-3M6 12H3m13.5-6.5L14 8m-4 8l-2.5 2.5M17.5 17.5L15 15M9 9L6.5 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
