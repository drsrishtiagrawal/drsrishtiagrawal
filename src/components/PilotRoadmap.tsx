import { roadmap, TOTAL_BUDGET } from '@/data/engine';
import { SectionHeading, Panel } from './ui';
import { FlaskConical, FileCheck2, Handshake, CheckCircle2, IndianRupee } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = { FlaskConical, FileCheck2, Handshake };

export function PilotRoadmap() {
  return (
    <section id="roadmap" className="scroll-mt-20">
      <SectionHeading
        number="06"
        eyebrow="Commercial Pilot Implementation"
        title="6-month roadmap & ₹25 Lakh budget"
        desc="From NIFTEM-K lab validation to B2B off-take with Indian food brands — a phased path to commercial pilot with clear deliverables and budget allocation."
      />

      <Panel className="mb-5">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IndianRupee className="h-4 w-4 text-forest-400" />
            <span className="text-sm font-semibold text-primary">Total budget allocation</span>
          </div>
          <span className="font-display text-xl font-bold text-forest-300">₹{TOTAL_BUDGET} Lakhs</span>
        </div>
        <div className="flex h-3 overflow-hidden rounded-full bg-card-soft">
          {roadmap.map((r, i) => {
            const colors = ['from-forest-600 to-forest-400', 'from-cyanx-600 to-cyanx-400', 'from-amber-600 to-amber-400'];
            return <div key={i} className={`h-full bg-gradient-to-r ${colors[i]}`} style={{ width: `${(r.budget / TOTAL_BUDGET) * 100}%` }} title={`${r.month}: ₹${r.budget}L`} />;
          })}
        </div>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {roadmap.map((r, i) => (
            <span key={i} className="flex items-center gap-1.5 text-secondary">
              <span className={`h-2 w-2 rounded-sm bg-gradient-to-r ${['from-forest-600 to-forest-400', 'from-cyanx-600 to-cyanx-400', 'from-amber-600 to-amber-400'][i]}`} />
              {r.month} · ₹{r.budget}L
            </span>
          ))}
        </div>
      </Panel>

      <div className="grid gap-4 md:grid-cols-3">
        {roadmap.map((m, i) => {
          const Icon = iconMap[m.icon] ?? FlaskConical;
          return (
            <div key={i} className="glass relative overflow-hidden rounded-2xl p-5 ring-1 ring-forest-600/20 transition hover:shadow-card">
              <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-forest-600/10 blur-2xl" />
              <div className="relative">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest-600/15 text-forest-300 ring-1 ring-forest-600/30">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-sm font-bold ${i === 0 ? 'bg-forest-500/15 text-forest-300' : 'bg-cyanx-500/15 text-cyanx-400'}`}>
                    {i === 0 ? 'Active' : 'Planned'}
                  </span>
                </div>
                <div className="mb-1 font-mono text-sm font-semibold text-cyanx-400">{m.month}</div>
                <h4 className="font-display text-base font-bold leading-tight text-primary">{m.title}</h4>
                <p className="mt-1 text-sm text-secondary">{m.subtitle}</p>
                <div className="mt-4 space-y-2">
                  {m.deliverables.map((d, di) => (
                    <div key={di} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-forest-400" />
                      <span className="text-sm leading-relaxed text-secondary">{d}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-theme pt-3">
                  <span className="text-sm text-muted">Phase budget</span>
                  <span className="font-display text-sm font-bold text-forest-300">₹{m.budget} Lakhs</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
