import { useState } from 'react';
import { complianceSections } from '@/data/engine';
import { SectionHeading, Panel, DataTagBadge } from './ui';
import {
  Rocket, ShieldCheck, Tag, CheckCircle2, AlertCircle, Clock,
  FileDown, FileText, ChevronDown,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = { Rocket, ShieldCheck, Tag };
const statusMap: Record<string, { icon: LucideIcon; color: string; label: string }> = {
  pass: { icon: CheckCircle2, color: 'text-forest-400 bg-forest-500/10', label: 'Compliant' },
  conditional: { icon: AlertCircle, color: 'text-amber-400 bg-amber-500/10', label: 'Conditional' },
  pending: { icon: Clock, color: 'text-cyanx-400 bg-cyanx-500/10', label: 'Pending' },
};

export function ComplianceDossier() {
  const [openId, setOpenId] = useState<string>('pathway');

  return (
    <section id="compliance" className="scroll-mt-20">
      <SectionHeading
        number="04"
        eyebrow="FSSAI Regulatory & Licensing"
        title="Compliance dossier engine"
        desc="Indian regulatory requirements addressed head-on — fast-track approval pathway, safety thresholds, allergen labeling, and a downloadable dossier summary."
      />

      {/* category banner */}
      <Panel className="mb-5 border-forest-600/30">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-forest-600/20 text-forest-300 ring-1 ring-forest-600/40">
            <Rocket className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-display text-base font-bold text-white">FSSAI Category 12.8</h3>
              <span className="rounded-md bg-forest-500/15 px-2 py-0.5 text-[10px] font-bold text-forest-300">
                FAST-TRACK
              </span>
            </div>
            <p className="text-sm text-slate-400">Proprietary Food — Plant Protein Formulations</p>
          </div>
          <button className="flex items-center gap-2 rounded-xl bg-forest-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-forest-500">
            <FileDown className="h-4 w-4" />
            Download dossier
          </button>
        </div>
      </Panel>

      {/* sections accordion */}
      <div className="space-y-3">
        {complianceSections.map((sec) => {
          const Icon = iconMap[sec.icon] ?? FileText;
          const open = openId === sec.id;
          return (
            <div key={sec.id} className="glass overflow-hidden rounded-2xl">
              <button
                onClick={() => setOpenId(open ? '' : sec.id)}
                className="flex w-full items-center justify-between p-4 text-left transition hover:bg-white/5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-forest-600/15 text-forest-300 ring-1 ring-forest-600/30">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-bold text-white">{sec.title}</h4>
                    <span className="text-xs text-slate-500">{sec.items.length} requirements</span>
                  </div>
                </div>
                <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
              </button>
              {open && (
                <div className="animate-fade-up border-t border-white/10 p-4">
                  <div className="space-y-2">
                    {sec.items.map((item) => {
                      const st = statusMap[item.status];
                      const StIcon = st.icon;
                      return (
                        <div
                          key={item.label}
                          className="flex items-start gap-3 rounded-xl border border-white/10 bg-ink-900/40 p-3"
                        >
                          <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${st.color}`}>
                            <StIcon className="h-4 w-4" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <span className="text-sm font-semibold text-slate-200">{item.label}</span>
                              <DataTagBadge tag={item.tag} />
                            </div>
                            <div className="mt-0.5 font-mono text-xs text-cyanx-400">{item.threshold}</div>
                            <div className="mt-1">
                              <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${st.color}`}>
                                {st.label}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
