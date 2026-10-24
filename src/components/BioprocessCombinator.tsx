import { useState, useMemo } from 'react';
import {
  processStages, byProducts, PROCESSING_BASE_COST, CUMULATIVE_YIELD_LOSS,
} from '@/data/engine';
import { SectionHeading, Panel, MetricCard, Tooltip } from './ui';
import {
  Wind, Droplets, TestTube2, Flame, Filter, GitCommitVertical, Cloud, Snowflake,
  Sparkles, TrendingUp, IndianRupee, Zap, Info,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Wind, Droplets, TestTube2, Flame, Filter, GitCommitVertical, Cloud, Snowflake,
};

interface Props {
  selectedId: string;
}

export function BioprocessCombinator({ selectedId }: Props) {
  const bp = byProducts.find((b) => b.id === selectedId) ?? byProducts[0];
  const [choices, setChoices] = useState<Record<string, string>>(() =>
    Object.fromEntries(processStages.map((s) => [s.id, s.options[0].id]))
  );

  const results = useMemo(() => {
    let yieldPct = bp.initialProtein;
    let flavorRemoval = 0;
    let antiNutrientRemoval = 0;
    let processCost = PROCESSING_BASE_COST;
    const chosen: { stageTitle: string; optionLabel: string; note: string }[] = [];

    for (const stage of processStages) {
      const opt = stage.options.find((o) => o.id === choices[stage.id]);
      if (!opt) continue;
      yieldPct += opt.yieldDelta;
      flavorRemoval += opt.flavorRemoval;
      antiNutrientRemoval += opt.antiNutrientRemoval;
      processCost += opt.costDelta;
      chosen.push({ stageTitle: stage.title, optionLabel: opt.label, note: opt.note });
    }

    // apply cumulative yield loss adjustment
    const adjustedYield = yieldPct * CUMULATIVE_YIELD_LOSS;
    const predictedYield = Math.min(bp.targetPurity, Math.max(0, adjustedYield));
    const flavorRemovalPct = Math.min(95, Math.round(flavorRemoval * 100));
    const antiNutrientRemovalPct = Math.min(95, Math.round(antiNutrientRemoval * 100));
    const remainingFlavor = Math.max(0, bp.offFlavor * (1 - flavorRemoval));

    return {
      predictedYield: Math.round(predictedYield * 10) / 10,
      flavorRemovalPct,
      antiNutrientRemovalPct,
      remainingFlavor: Math.round(remainingFlavor * 10) / 10,
      processCost: Math.round(processCost),
      chosen,
    };
  }, [choices, bp]);

  const selectOption = (stageId: string, optId: string) =>
    setChoices((c) => ({ ...c, [stageId]: optId }));

  return (
    <section id="bioprocess" className="scroll-mt-20">
      <SectionHeading
        number="03"
        eyebrow="Multi-Stage Bioprocess Combinator"
        title="Design your treatment workflow"
        desc="Toggle methods across four processing stages. The engine recalculates predicted protein yield, off-flavor removal, anti-nutrient reduction, and processing cost in real time — 16+ combinations per feedstock."
      />

      <div className="grid gap-5 lg:grid-cols-3">
        {/* left: process toggles */}
        <div className="space-y-4 lg:col-span-2">
          {processStages.map((stage) => (
            <Panel key={stage.id}>
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-forest-600/20 font-mono text-sm font-bold text-forest-300 ring-1 ring-forest-600/40">
                  {stage.number}
                </span>
                <h4 className="font-display text-sm font-semibold text-primary">{stage.title}</h4>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {stage.options.map((opt) => {
                  const active = choices[stage.id] === opt.id;
                  const Icon = iconMap[opt.icon] ?? Sparkles;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => selectOption(stage.id, opt.id)}
                      className={`group relative overflow-hidden rounded-xl border p-3.5 text-left transition-all ${
                        active
                          ? 'border-forest-500 bg-forest-600/10 shadow-glow-emerald'
                          : 'border-theme bg-card-soft hover:border-forest-600/40 hover:bg-card'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition ${active ? 'bg-forest-600/30 text-forest-300' : 'bg-white/5 text-muted'}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className={`text-sm font-bold ${active ? 'text-primary' : 'text-secondary'}`}>
                              {opt.label}
                              {opt.id === 'des' && <Tooltip term="DES" />}
                            </span>
                            <span className={`h-4 w-4 shrink-0 rounded-full border-2 transition ${active ? 'border-forest-400 bg-forest-400' : 'border-slate-600'}`}>
                              {active && (
                                <svg viewBox="0 0 16 16" className="h-full w-full text-forest-950" fill="none">
                                  <path d="M4 8l3 3 5-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </span>
                          </div>
                          <div className="mt-0.5 font-mono text-sm text-cyanx-400">{opt.sub}</div>
                          <div className="mt-1 text-sm text-muted">{opt.note}</div>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            <MiniStat label="yield" value={`${opt.yieldDelta > 0 ? '+' : ''}${opt.yieldDelta}pp`} tone="emerald" />
                            <MiniStat label="flavor" value={`-${Math.round(opt.flavorRemoval * 100)}%`} tone="amber" />
                            <MiniStat label="antiN" value={`-${Math.round(opt.antiNutrientRemoval * 100)}%`} tone="purple" />
                            <MiniStat label="cost" value={`+₹${opt.costDelta}`} tone="cyan" />
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </Panel>
          ))}
        </div>

        {/* right: live results */}
        <div className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          <Panel className="border-forest-600/30">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-forest-400" />
                <h4 className="font-display text-sm font-semibold text-primary">Live synthesis output</h4>
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-forest-500/15 px-2 py-0.5 text-sm font-bold text-forest-300">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-forest-400" /> REAL-TIME
              </span>
            </div>

            <div className="mb-3 rounded-xl bg-card-soft p-3">
              <div className="text-sm text-muted">Feedstock</div>
              <div className="font-display text-sm font-bold text-primary">{bp.emoji} {bp.name}</div>
            </div>

            <div className="mb-3 grid grid-cols-1 gap-3">
              <ResultBar icon={<TrendingUp className="h-4 w-4" />} label="Net protein recovery" value={`${results.predictedYield}%`} pct={(results.predictedYield / bp.targetPurity) * 100} tone="emerald" />
              <ResultBar icon={<Sparkles className="h-4 w-4" />} label="Off-flavor removal" value={`${results.flavorRemovalPct}%`} pct={results.flavorRemovalPct} tone="amber" />
              <ResultBar icon={<Filter className="h-4 w-4" />} label="Anti-nutrient removal" value={`${results.antiNutrientRemovalPct}%`} pct={results.antiNutrientRemovalPct} tone="purple" />
            </div>

            <div className="mb-2 grid grid-cols-2 gap-3">
              <MetricCard label="Process cost" value={`₹${results.processCost}`} unit="/kg" tone="cyan" />
              <MetricCard label="Residual flavor" value={results.remainingFlavor} unit="/10" tone="amber" />
            </div>

            {/* cumulative yield note */}
            <div className="mb-3 rounded-xl border border-theme bg-card-soft p-2.5">
              <div className="flex items-start gap-1.5 text-sm text-muted">
                <Info className="mt-0.5 h-3 w-3 shrink-0" />
                <span>
                  Adjusted for {Math.round(CUMULATIVE_YIELD_LOSS * 100)}% cumulative recovery yield loss
                  <Tooltip term="Cumulative Yield Loss">Mass-balance mass-transfer efficiency accounts for protein lost in permeate, centrifuge waste, and drying losses across all 4 process stages. The 62% factor represents the fraction of crude protein retained through the full pipeline.</Tooltip>
                </span>
              </div>
            </div>

            {/* chosen path */}
            <div className="rounded-xl border border-theme bg-card-soft p-3">
              <div className="mb-2 font-mono text-sm uppercase tracking-wider text-muted">selected pathway</div>
              <div className="space-y-1.5">
                {results.chosen.map((c, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded bg-forest-600/30 font-mono text-sm font-bold text-forest-300">{i + 1}</span>
                    <span className="text-secondary">{c.optionLabel}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-forest-600/10 py-2 text-sm font-semibold text-forest-300">
              <IndianRupee className="h-3.5 w-3.5" />
              Total est. ₹{results.processCost + 25}/kg incl. raw material · 65% below pea benchmark
            </div>
          </Panel>
        </div>
      </div>
    </section>
  );
}

function MiniStat({ label, value, tone }: { label: string; value: string; tone: 'emerald' | 'amber' | 'cyan' | 'purple' }) {
  const tones = {
    emerald: 'bg-forest-500/10 text-forest-300',
    amber: 'bg-amber-500/10 text-amber-400',
    cyan: 'bg-cyanx-500/10 text-cyanx-400',
    purple: 'bg-purple-500/10 text-purple-400',
  };
  return <span className={`rounded-md px-1.5 py-0.5 font-mono text-sm font-semibold ${tones[tone]}`}>{label} {value}</span>;
}

function ResultBar({ icon, label, value, pct, tone }: { icon: React.ReactNode; label: string; value: string; pct: number; tone: 'emerald' | 'amber' | 'purple' }) {
  const gradients = {
    emerald: 'from-forest-600 to-forest-400',
    amber: 'from-amber-600 to-amber-400',
    purple: 'from-purple-600 to-purple-400',
  };
  const textTones = { emerald: 'text-forest-300', amber: 'text-amber-400', purple: 'text-purple-400' };
  return (
    <div className="rounded-xl bg-card-soft p-3">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-sm text-secondary">{icon} {label}</span>
        <span className={`font-display text-lg font-bold ${textTones[tone]}`}>{value}</span>
      </div>
      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-card-soft">
        <div className={`h-full rounded-full bg-gradient-to-r ${gradients[tone]} transition-all duration-700`} style={{ width: `${Math.min(100, pct)}%` }} />
      </div>
    </div>
  );
}
