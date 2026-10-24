import { useState } from 'react';
import { references, byProducts } from '@/data/engine';
import { Panel, Modal, DataTagBadge } from './ui';
import {
  BookOpen, ExternalLink, FileText, Database, ScrollText, BookMarked, Globe,
  Copy, Check, FileDown,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const typeIcon: Record<string, LucideIcon> = {
  'National database': Database, 'Government database': Database, 'Live market data': Database,
  Statistics: Database, 'Reference standard': BookMarked, 'Biochemistry database': BookMarked,
  'Peer-reviewed': FileText, Review: FileText, 'LCA database': FileText, Regulatory: ScrollText,
};

const typeTone: Record<string, string> = {
  'National database': 'bg-cyanx-500/10 text-cyanx-400 ring-cyanx-500/30',
  'Government database': 'bg-cyanx-500/10 text-cyanx-400 ring-cyanx-500/30',
  'Live market data': 'bg-forest-500/10 text-forest-300 ring-forest-500/30',
  Statistics: 'bg-cyanx-500/10 text-cyanx-400 ring-cyanx-500/30',
  'Reference standard': 'bg-purple-500/10 text-purple-400 ring-purple-500/30',
  'Biochemistry database': 'bg-cyanx-500/10 text-cyanx-400 ring-cyanx-500/30',
  'Peer-reviewed': 'bg-forest-500/10 text-forest-300 ring-forest-500/30',
  Review: 'bg-forest-500/10 text-forest-300 ring-forest-500/30',
  'LCA database': 'bg-amber-500/10 text-amber-400 ring-amber-500/30',
  Regulatory: 'bg-rose-500/10 text-rose-400 ring-rose-500/30',
};

interface Props {
  pitchOpen: boolean;
  onPitchOpen: () => void;
  onPitchClose: () => void;
  selectedId: string;
}

export function ReferencesFooter({ pitchOpen, onPitchOpen, onPitchClose, selectedId }: Props) {
  const [copied, setCopied] = useState(false);
  const bp = byProducts.find((b) => b.id === selectedId) ?? byProducts[0];

  const pitchText = `UPCYCLEAI ENGINE™ v3.0 — PITCH SUMMARY
NIFTEM-K Hack the Fork 2026 | Problem Statement 2

FEEDSTOCK: ${bp.name} (${bp.region})
- Crude protein: ${bp.initialProtein}% → Target purity: ${bp.targetPurity}%
- PDCAAS: ${bp.pdcaas.toFixed(2)} | Off-flavor: ${bp.offFlavor}/10
- Carbon offset: ${bp.carbonFootprint} kg CO₂e/kg vs imported pea isolate

RECOMMENDED PROCESS: SC-CO₂/DES → Enzymatic debittering → UF 10kDa → Spray drying
- Predicted yield: ~74% (adjusted for 62% cumulative recovery loss)
- Off-flavor removal: ~78% | Anti-nutrient removal: ~85%
- Processing cost: ~₹60/kg → Total incl. raw: ~₹85/kg

ECONOMICS:
- Upcycled cost: ₹60/kg vs ₹380/kg imported pea isolate
- Cost reduction: ~65% | Annual savings: ₹8–12 Cr at 20 T/day
- ROI payback: 8–14 months on ₹1.8 Cr CAPEX
- Carbon offset: ${bp.carbonFootprint} kg CO₂e/kg protein saved

COMPLIANCE: FSSAI Cat 12.8 (Proprietary Food — Plant Protein)
- All safety thresholds: PASS/COMPLIANT/SAFE
- Ready for NABL-accredited lab verification & filing

DATA PROVENANCE: [Measured] [Published] [Assumed/Synthetic]
Sources: IFCT 2017, USDA FoodData Central, AGMARKNET, FAO/WHO 2013, FooDB, FSSAI 2022, HESTIA LCA`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pitchText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section id="references" className="scroll-mt-20">
      {/* Pitch export module */}
      <Panel className="mb-8 border-forest-600/30">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest-600/20 text-forest-300 ring-1 ring-forest-600/40">
              <FileDown className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-primary">Pitch Summary Export</h3>
              <p className="text-xs text-secondary">One-click executive summary of feedstocks, process, economics & carbon</p>
            </div>
          </div>
          <button onClick={onPitchOpen} className="flex items-center gap-2 rounded-xl bg-forest-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-forest-500">
            <FileDown className="h-4 w-4" /> Export Pitch Summary
          </button>
        </div>
      </Panel>

      {/* citations */}
      <div className="mb-6">
        <div className="mb-3 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-forest-400" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-forest-400">Scientific Citations & References</span>
        </div>
        <h2 className="font-display text-2xl font-bold tracking-tight text-primary sm:text-3xl">Data provenance & credible sources</h2>
        <p className="mt-2 max-w-3xl text-sm text-secondary sm:text-base">Every data point in UpcycleAI Engine™ traces back to a published source — national databases, peer-reviewed literature, live mandi data, and regulatory frameworks.</p>
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {references.map((r, i) => {
          const Icon = typeIcon[r.type] ?? FileText;
          return (
            <a key={r.title} href={r.url} target="_blank" rel="noopener noreferrer"
              className="group flex items-start gap-3 rounded-xl border border-theme bg-card-soft p-4 transition-all hover:border-forest-600/40 hover:bg-card">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 ring-1 ring-theme">
                <Icon className="h-4 w-4 text-muted" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-semibold leading-snug text-primary group-hover:text-forest-300">{r.title}</h4>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted transition-colors group-hover:text-forest-400" />
                </div>
                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold ring-1 ${typeTone[r.type]}`}>{r.type}</span>
                  <span className="text-[11px] text-muted">{r.source} · {r.year}</span>
                </div>
              </div>
              <span className="font-mono text-[10px] text-muted">#{String(i + 1).padStart(2, '0')}</span>
            </a>
          );
        })}
      </div>

      {/* Pitch modal */}
      <Modal open={pitchOpen} onClose={onPitchClose} title="Executive Pitch Summary" maxWidth="max-w-xl">
        <div className="space-y-4">
          <div className="rounded-xl border border-theme bg-card-soft p-4">
            <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-secondary">{pitchText}</pre>
          </div>
          <div className="flex gap-2">
            <button onClick={copyToClipboard} className="flex items-center gap-2 rounded-xl bg-forest-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-forest-500">
              {copied ? <><Check className="h-4 w-4" /> Copied!</> : <><Copy className="h-4 w-4" /> Copy to clipboard</>}
            </button>
            <button onClick={() => window.print()} className="flex items-center gap-2 rounded-xl border border-theme px-4 py-2.5 text-sm font-semibold text-secondary transition hover:bg-white/5">
              <FileDown className="h-4 w-4" /> Print
            </button>
          </div>
        </div>
      </Modal>

      <Footer />
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-14 border-t border-theme pt-8">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-forest-500 to-forest-700">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white">
              <path d="M12 3v3m0 12v3m9-9h-3M6 12H3m13.5-6.5L14 8m-4 8l-2.5 2.5M17.5 17.5L15 15M9 9L6.5 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <div className="font-display text-sm font-bold text-primary">UpcycleAI Engine™ v3.0</div>
            <div className="text-xs text-muted">NIFTEM-K Hack the Fork 2026 · Problem Statement 2</div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted">
          <Globe className="h-3.5 w-3.5" />
          Data tagged [Measured] / [Published] / [Synthetic]
        </div>
      </div>
      <div className="mt-5 text-center text-xs text-muted">
        Figures are reasoned estimates and published values for demonstration — validate in-lab before commercial use.
      </div>
    </footer>
  );
}
