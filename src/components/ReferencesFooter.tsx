import { references } from '@/data/engine';
import { Panel } from './ui';
import {
  BookOpen, ExternalLink, FileText, Database, ScrollText, BookMarked, Globe,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const typeIcon: Record<string, LucideIcon> = {
  'National database': Database,
  'Government database': Database,
  'Live market data': Database,
  Statistics: Database,
  'Peer-reviewed': FileText,
  Review: FileText,
  'LCA study': FileText,
  'Biochemistry database': BookMarked,
  Regulatory: ScrollText,
};

const typeTone: Record<string, string> = {
  'National database': 'bg-cyanx-500/10 text-cyanx-400 ring-cyanx-500/30',
  'Government database': 'bg-cyanx-500/10 text-cyanx-400 ring-cyanx-500/30',
  'Live market data': 'bg-forest-500/10 text-forest-300 ring-forest-500/30',
  Statistics: 'bg-cyanx-500/10 text-cyanx-400 ring-cyanx-500/30',
  'Peer-reviewed': 'bg-forest-500/10 text-forest-300 ring-forest-500/30',
  Review: 'bg-forest-500/10 text-forest-300 ring-forest-500/30',
  'LCA study': 'bg-amber-500/10 text-amber-400 ring-amber-500/30',
  'Biochemistry database': 'bg-cyanx-500/10 text-cyanx-400 ring-cyanx-500/30',
  Regulatory: 'bg-rose-500/10 text-rose-400 ring-rose-500/30',
};

export function ReferencesFooter() {
  return (
    <section id="references" className="scroll-mt-20">
      <div className="mb-6">
        <div className="mb-3 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-forest-400" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-forest-400">
            Scientific Citations & References
          </span>
        </div>
        <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Data provenance & credible sources
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-400 sm:text-base">
          Every data point in UpcycleAI Engine™ traces back to a published source — national databases, peer-reviewed
          literature, live mandi data, and regulatory frameworks.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {references.map((r, i) => {
          const Icon = typeIcon[r.type] ?? FileText;
          return (
            <a
              key={r.title}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 rounded-xl border border-white/10 bg-ink-850/60 p-4 transition-all hover:border-forest-600/40 hover:bg-ink-800"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10">
                <Icon className="h-4.5 w-4.5 text-slate-400" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-semibold leading-snug text-slate-200 group-hover:text-forest-300">
                    {r.title}
                  </h4>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0 text-slate-600 transition-colors group-hover:text-forest-400" />
                </div>
                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold ring-1 ${typeTone[r.type]}`}>
                    {r.type}
                  </span>
                  <span className="text-[11px] text-slate-500">{r.source} · {r.year}</span>
                </div>
              </div>
              <span className="font-mono text-[10px] text-slate-600">#{String(i + 1).padStart(2, '0')}</span>
            </a>
          );
        })}
      </div>

      <Footer />
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-14 border-t border-white/10 pt-8">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-forest-500 to-forest-700">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white">
              <path d="M12 3v3m0 12v3m9-9h-3M6 12H3m13.5-6.5L14 8m-4 8l-2.5 2.5M17.5 17.5L15 15M9 9L6.5 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <div className="font-display text-sm font-bold text-white">UpcycleAI Engine™ v2.0</div>
            <div className="text-xs text-slate-500">NIFTEM-K Hack the Fork 2026 · Problem Statement 2</div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Globe className="h-3.5 w-3.5" />
          Data tagged [Measured] / [Published] / [Assumed/Synthetic]
        </div>
      </div>
      <div className="mt-5 text-center text-xs text-slate-600">
        Figures are reasoned estimates and published values for demonstration — validate in-lab before commercial use.
      </div>
    </footer>
  );
}
