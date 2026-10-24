import { useState } from 'react';
import { safetyChecks, byProducts } from '@/data/engine';
import { SectionHeading, Panel, DataTagBadge, Modal, Tooltip } from './ui';
import {
  Rocket, ShieldCheck, CheckCircle2, AlertCircle, FileDown, Info,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Props {
  selectedId: string;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const statusConfig: Record<string, { icon: LucideIcon; color: string; bg: string }> = {
  PASS: { icon: CheckCircle2, color: 'text-forest-400', bg: 'bg-forest-500/10' },
  COMPLIANT: { icon: CheckCircle2, color: 'text-forest-400', bg: 'bg-forest-500/10' },
  SAFE: { icon: ShieldCheck, color: 'text-cyanx-400', bg: 'bg-cyanx-500/10' },
  CONDITIONAL: { icon: AlertCircle, color: 'text-amber-400', bg: 'bg-amber-500/10' },
};

export function ComplianceDossier({ selectedId, open, onOpen, onClose }: Props) {
  const bp = byProducts.find((b) => b.id === selectedId) ?? byProducts[0];

  return (
    <section id="compliance" className="scroll-mt-20">
      <SectionHeading
        number="07"
        eyebrow="FSSAI Regulatory Dossier & Safety Engine"
        title="Compliance threshold matrix & report generator"
        desc="Fast-track approval via FSSAI Category 12.8, interactive safety threshold verification, and a one-click regulatory compliance report ready for download and print."
      />

      {/* fast-track banner */}
      <Panel className="mb-5 border-forest-600/30">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-forest-600/20 text-forest-300 ring-1 ring-forest-600/40">
            <Rocket className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-display text-base font-bold text-primary">FSSAI Category 12.8</h3>
              <span className="rounded-md bg-forest-500/15 px-2 py-0.5 text-sm font-bold text-forest-300">FAST-TRACK</span>
            </div>
            <p className="text-sm text-secondary">Proprietary Food — Plant Protein Formulations & Isolate Ingredients</p>
          </div>
          <button onClick={onOpen} className="flex items-center gap-2 rounded-xl bg-forest-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-forest-500">
            <FileDown className="h-4 w-4" /> Generate FSSAI Report
          </button>
        </div>
      </Panel>

      {/* safety threshold matrix */}
      <Panel>
        <div className="mb-4 flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-forest-400" />
          <h4 className="font-display text-sm font-semibold text-primary">Safety threshold matrix</h4>
          <Tooltip term="Glucosinolates" />
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {safetyChecks.map((check) => {
            const st = statusConfig[check.status];
            const StIcon = st.icon;
            return (
              <div key={check.parameter} className="flex items-start gap-3 rounded-xl border border-theme bg-card-soft p-3">
                <span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${st.bg}`}>
                  <StIcon className={`h-4 w-4 ${st.color}`} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-sm font-semibold text-primary">{check.parameter}</span>
                    <DataTagBadge tag={check.tag} />
                  </div>
                  <div className="mt-0.5 font-mono text-sm text-cyanx-400">{check.threshold}</div>
                  <div className="mt-1 flex items-center gap-2">
                    <span className={`rounded px-1.5 py-0.5 font-mono text-sm font-bold ${st.bg} ${st.color}`}>[STATUS: {check.status}]</span>
                  </div>
                  <div className="mt-1 text-sm text-muted">{check.detail}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Panel>

      {/* FSSAI report modal */}
      <Modal open={open} onClose={onClose} title="FSSAI Regulatory Compliance Report" maxWidth="max-w-2xl">
        <div className="space-y-4">
          <div className="rounded-xl border border-theme bg-card-soft p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-display text-lg font-bold text-primary">FSSAI Category 12.8</div>
                <div className="text-sm text-muted">Proprietary Food — Plant Protein Formulations</div>
              </div>
              <span className="rounded-lg bg-forest-500/15 px-3 py-1 text-sm font-bold text-forest-300">READY FOR FILING</span>
            </div>
          </div>

          <div className="rounded-xl border border-theme bg-card-soft p-4">
            <div className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted">Product Details</div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <ReportRow label="Feedstock" value={`${bp.emoji} ${bp.name}`} />
              <ReportRow label="Protein content" value={`${bp.targetPurity}%`} />
              <ReportRow label="Category" value="12.8 — Proprietary Food" />
              <ReportRow label="Regulation" value="FSSR 2011 (amended 2022)" />
            </div>
          </div>

          <div className="rounded-xl border border-theme bg-card-soft p-4">
            <div className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted">Safety Compliance Summary</div>
            <div className="space-y-1.5">
              {safetyChecks.map((c) => {
                const st = statusConfig[c.status];
                return (
                  <div key={c.parameter} className="flex items-center justify-between text-sm">
                    <span className="text-secondary">{c.parameter}</span>
                    <span className="flex items-center gap-2">
                      <span className="font-mono text-muted">{c.threshold}</span>
                      <span className={`font-mono font-bold ${st.color}`}>[{c.status}]</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button onClick={() => window.print()} className="flex items-center gap-2 rounded-xl bg-forest-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-forest-500">
              <FileDown className="h-4 w-4" /> Download / Print
            </button>
            <button onClick={onClose} className="rounded-xl border border-theme px-4 py-2.5 text-sm font-semibold text-secondary transition hover:bg-white/5">
              Close
            </button>
          </div>
          <div className="flex items-start gap-1.5 rounded-lg bg-card-soft p-3 text-sm text-muted">
            <Info className="mt-0.5 h-3 w-3 shrink-0" />
            <span>This is a demo compliance dossier for the NIFTEM-K Hack the Fork 2026 hackathon. All safety thresholds reference FSSR 2011 (amended 2022). Actual filing requires NABL-accredited laboratory verification.</span>
          </div>
        </div>
      </Modal>
    </section>
  );
}

function ReportRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-sm uppercase tracking-wider text-muted">{label}</div>
      <div className="font-semibold text-primary">{value}</div>
    </div>
  );
}
