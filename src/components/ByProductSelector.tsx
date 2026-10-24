import { useState } from 'react';
import { byProducts, type ByProduct } from '@/data/engine';
import { DataTagBadge, SectionHeading, Panel, MetricCard } from './ui';
import { Beaker, MapPin, AlertTriangle, Gauge, FlaskConical } from 'lucide-react';

interface Props {
  selectedId: string;
  onSelect: (id: string) => void;
}

export function ByProductSelector({ selectedId, onSelect }: Props) {
  const selected = byProducts.find((b) => b.id === selectedId) ?? byProducts[0];

  return (
    <section id="selector" className="scroll-mt-20">
      <SectionHeading
        number="01"
        eyebrow="By-Product Selector"
        title="Choose an Indian by-product to valorize"
        desc="Each feedstock carries distinct anti-nutritional barriers. Select one to reveal its scientific profile — limiting compounds, protein potential, and off-flavor intensity."
      />

      {/* cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {byProducts.map((b) => {
          const active = b.id === selected.id;
          return (
            <button
              key={b.id}
              onClick={() => onSelect(b.id)}
              className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 ${
                active
                  ? 'border-forest-500 bg-forest-600/10 shadow-glow-emerald'
                  : 'border-white/10 bg-ink-850/60 hover:border-forest-600/50 hover:bg-ink-800'
              }`}
            >
              <div className="mb-2 text-3xl">{b.emoji}</div>
              <div className="font-display text-sm font-bold leading-tight text-white">{b.shortName}</div>
              <div className="mt-1 text-[11px] font-medium text-slate-500">{b.region}</div>
              <div className="mt-2 flex items-center justify-between">
                <span className="rounded-md bg-white/5 px-1.5 py-0.5 text-[10px] font-semibold text-slate-300">
                  {b.initialProtein}% protein
                </span>
                <span className={`text-[10px] font-bold ${active ? 'text-forest-300' : 'text-slate-500'}`}>
                  → {b.targetPurity}%
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* detail */}
      <div key={selected.id} className="mt-6 animate-fade-up">
        <div className="grid gap-5 lg:grid-cols-3">
          {/* left: profile + antinutrients */}
          <div className="space-y-5 lg:col-span-2">
            <Panel>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest-600/15 text-3xl ring-1 ring-forest-600/30">
                    {selected.emoji}
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">{selected.name}</h3>
                    <p className="flex items-center gap-1 text-xs text-slate-400">
                      <MapPin className="h-3 w-3" /> {selected.region} · {selected.annualSupply}
                    </p>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{selected.blurb}</p>
            </Panel>

            <Panel>
              <div className="mb-4 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
                <h4 className="font-display text-sm font-semibold text-white">Anti-nutritional compound profile</h4>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {selected.antiNutrients.map((a) => (
                  <div key={a.name} className="rounded-xl border border-white/10 bg-ink-900/50 p-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-sm font-semibold text-slate-200">{a.name}</span>
                      <DataTagBadge tag={a.tag} />
                    </div>
                    <div className="mt-1 font-mono text-lg font-bold text-amber-400">
                      {a.concentration}
                      <span className="ml-1 text-xs font-medium text-slate-500">{a.unit}</span>
                    </div>
                    <div className="mt-1 text-xs text-slate-500">{a.note}</div>
                    {/* concentration bar */}
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink-700">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400"
                        style={{ width: `${Math.min(100, (a.concentration / 80) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>

          {/* right: metrics */}
          <div className="space-y-4">
            <Panel>
              <div className="mb-4 flex items-center gap-2">
                <Gauge className="h-4 w-4 text-forest-400" />
                <h4 className="font-display text-sm font-semibold text-white">Protein profile</h4>
              </div>
              {/* initial vs target bar */}
              <div className="mb-5">
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Crude protein</span>
                  <span className="font-mono font-bold text-slate-200">{selected.initialProtein}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-ink-700">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-forest-600 to-forest-400"
                    style={{ width: `${selected.initialProtein}%` }}
                  />
                </div>
                <div className="mb-1.5 mt-3 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Target isolate purity</span>
                  <span className="font-mono font-bold text-cyanx-400">{selected.targetPurity}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-ink-700">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyanx-600 to-cyanx-400"
                    style={{ width: `${selected.targetPurity}%` }}
                  />
                </div>
                <div className="mt-2">
                  <DataTagBadge tag={selected.crudeProteinTag} />
                </div>
              </div>
            </Panel>

            <Panel>
              <div className="mb-3 flex items-center gap-2">
                <FlaskConical className="h-4 w-4 text-cyanx-400" />
                <h4 className="font-display text-sm font-semibold text-white">Off-flavor intensity</h4>
              </div>
              <div className="flex items-end gap-2">
                <span className="font-display text-4xl font-bold text-amber-400">{selected.offFlavor}</span>
                <span className="mb-1 text-sm text-slate-500">/ 10</span>
              </div>
              <div className="mt-3 flex gap-1">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 flex-1 rounded-sm ${
                      i < Math.round(selected.offFlavor)
                        ? 'bg-gradient-to-t from-amber-600 to-amber-400'
                        : 'bg-ink-700'
                    }`}
                  />
                ))}
              </div>
              <div className="mt-2">
                <DataTagBadge tag={selected.offFlavorTag} />
              </div>
            </Panel>

            <div className="grid grid-cols-2 gap-3">
              <MetricCard label="Supply" value={selected.annualSupply.split(' ')[0]} tone="cyan" />
              <MetricCard label="Protein" value={`${selected.initialProtein}%`} tone="emerald" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
