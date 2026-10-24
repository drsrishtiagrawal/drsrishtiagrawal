import { roadmap, TOTAL_BUDGET } from '@/data/engine';
import { SectionHeading, Panel } from './ui';
import { FlaskConical, FileCheck2, Handshake, CheckCircle2, IndianRupee } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = { FlaskConical, FileCheck2, Handshake };
const statusStyles: Record<string, { ring: string; badge: string; label: string }> = {
  active: { ring: 'ring-forest-500/50', badge: 'bg-forest-500/15 text-forest-300', label: 'Active' },
  planned: { ring: 'ring-white/10', badge: 'bg-cyanx-500/15 text-cyanx-400', label: 'Planned' },
  done: { ring: 'ring-forest-500/50', badge: 'bg-forest-500/15 text-forest-300', label: 'Done' },
};

export function PilotRoadmap() {
  const usedBudget = roadmap.reduce((s, r) => s + r.budget, 0);

  return (
    <section id="roadmap" className="scroll-mt-20">
      <SectionHeading
        number="05"
        eyebrow="Commercial Pilot Implementation"
        title="6-month roadmap & ₹25 Lakh budget"
        desc="From NIFTEM-K lab validation to B2B off-take with Indian food brands — a phased path to commercial pilot with clear deliverables and budget allocation."
      />

      {/* budget summary bar */}
      <Panel className="mb-5">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IndianRupee className="h-4 w-4 text-forest-400" />
            <span className="text-sm font-semibold text-white">Total budget allocation</span>
          </div>
          <span className="font-display text-xl font-bold text-forest-300">₹{TOTAL_BUDGET} Lakhs</span>
        </div>
        <div className="flex h-3 overflow-hidden rounded-full bg-ink-700">
          {roadmap.map((r, i) => {
            const colors = ['from-forest-600 to-forest-400', 'from-cyanx-600 to-cyanx-400', 'from-amber-600 to-amber-400'];
            return (
              <div
                key={i}
                className={`h-full bg-gradient-to-r ${colors[i]}`}
                style={{ width: `${(r.budget / TOTAL_BUDGET) * 100}%` }}
                title={`${r.month}: ₹${r.budget}L`}
              />
            );
          })}
        </div>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">
          {roadmap.map((r, i) => (
            <span key={i} className="flex items-center gap-1.5 text-slate-400">
              <span className={`h-2 w-2 rounded-sm bg-gradient-to-r ${['from-forest-600 to-forest-400', 'from-cyanx-600 to-cyanx-400', 'from-amber-600 to-amber-400'][i]}`} />
              {r.month} · ₹{r.budget}L
            </span>
          ))}
        </div>
      </Panel>

      {/* timeline */}
      <div className="grid gap-4 md:grid-cols-3">
        {roadmap.map((m, i) => {
          const Icon = iconMap[m.icon] ?? FlaskConical;
          const st = statusStyles[m.status];
          return (
            <div
              key={i}
              className={`glass relative overflow-hidden rounded-2xl p-5 ring-1 ${st.ring} transition hover:shadow-card`}
            >
              <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-forest-600/10 blur-2xl" />
              <div className="relative">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest-600/15 text-forest-300 ring-1 ring-forest-600/30">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${st.badge}`}>
                    {st.label}
                  </span>
                </div>

                <div className="mb-1 font-mono text-xs font-semibold text-cyanx-400">{m.month}</div>
                <h4 className="font-display text-base font-bold leading-tight text-white">{m.title}</h4>
                <p className="mt-1 text-xs text-slate-400">{m.subtitle}</p>

                <div className="mt-4 space-y-2">
                  {m.deliverables.map((d, di) => (
                    <div key={di} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-forest-400" />
                      <span className="text-xs leading-relaxed text-slate-400">{d}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                  <span className="text-xs text-slate-500">Phase budget</span>
                  <span className="font-display text-sm font-bold text-forest-300">₹{m.budget} Lakhs</span>
                </div>
              </div>

              {/* connector line */}
              {i < roadmap.length - 1 && (
                <div className="absolute -right-2 top-1/2 z-10 hidden h-0.5 w-4 bg-gradient-to-r from-forest-600 to-transparent md:block" />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
