import { byProducts } from '@/data/engine';
import { DataTagBadge, SectionHeading, Panel, MetricCard, Tooltip } from './ui';
import { MapPin, AlertTriangle, Gauge, FlaskConical } from 'lucide-react';

interface Props {
  selectedId: string;
  onSelect: (id: string) => void;
}

export function ByProductSelector({ selectedId, onSelect }: Props) {
  const selected = byProducts.find((b) => b.id === selectedId) ?? byProducts[0];

  return (
    <section id="selector" className="scroll-mt-20">
      <SectionHeading
        number="02"
        eyebrow="By-Product & Nutritional Fingerprint"
        title="Select an Indian by-product feedstock"
        desc="Each feedstock carries distinct anti-nutritional barriers and volatile off-flavor profiles. Select one to reveal its complete scientific fingerprint — from polyphenols to PDCAAS to amino acid adequacy."
      />

      {/* tabs */}
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
                  : 'border-theme bg-card-soft hover:border-forest-600/50 hover:bg-card'
              }`}
            >
              <div className="mb-2 text-3xl">{b.emoji}</div>
              <div className="font-display text-sm font-bold leading-tight text-primary">{b.shortName}</div>
              <div className="mt-1 text-[11px] font-medium text-muted">{b.region}</div>
              <div className="mt-2 flex items-center justify-between">
                <span className="rounded-md bg-white/5 px-1.5 py-0.5 text-[10px] font-semibold text-secondary">
                  {b.initialProtein}% protein
                </span>
                <span className={`text-[10px] font-bold ${active ? 'text-forest-300' : 'text-muted'}`}>→ {b.targetPurity}%</span>
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
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest-600/15 text-3xl ring-1 ring-forest-600/30">
                  {selected.emoji}
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-bold text-primary">{selected.name}</h3>
                  <p className="flex items-center gap-1 text-xs text-muted">
                    <MapPin className="h-3 w-3" /> {selected.region} · {selected.annualSupply}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-secondary">{selected.blurb}</p>
            </Panel>

            <Panel>
              <div className="mb-4 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
                <h4 className="font-display text-sm font-semibold text-primary">Anti-nutritional compound profile</h4>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {selected.antiNutrients.map((a) => (
                  <div key={a.name} className="rounded-xl border border-theme bg-card-soft p-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="flex items-center gap-1 text-sm font-semibold text-primary">
                        {a.name}
                        <Tooltip term={a.name.includes('Phytic') ? 'Phytate' : a.name.includes('Glucosin') ? 'Glucosinolates' : a.name}>
                          {a.note}
                        </Tooltip>
                      </span>
                      <DataTagBadge tag={a.tag} />
                    </div>
                    <div className="mt-1 font-mono text-lg font-bold text-amber-400">
                      {a.concentration}
                      <span className="ml-1 text-xs font-medium text-muted">{a.unit}</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-card-soft">
                      <div className="h-full rounded-full bg-gradient-to-r from-amber-600 to-amber-400" style={{ width: `${Math.min(100, (a.concentration / 130) * 100)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Panel>

            {/* volatile off-flavor compounds */}
            <Panel>
              <div className="mb-4 flex items-center gap-2">
                <FlaskConical className="h-4 w-4 text-cyanx-400" />
                <h4 className="font-display text-sm font-semibold text-primary">Target off-flavor volatile compounds</h4>
              </div>
              <div className="space-y-3">
                {selected.volatiles.map((v) => (
                  <div key={v.name} className="flex items-start gap-3 rounded-xl border border-theme bg-card-soft p-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-semibold text-primary">{v.name}</span>
                        <Tooltip term={v.name}>{v.desc}</Tooltip>
                      </div>
                      <div className="mt-0.5 text-xs text-muted">{v.category}</div>
                    </div>
                    <div className="w-24">
                      <div className="mb-1 text-right font-mono text-xs font-bold text-cyanx-400">{v.initialLevel}%</div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-card-soft">
                        <div className="h-full rounded-full bg-gradient-to-r from-cyanx-600 to-cyanx-400" style={{ width: `${v.initialLevel}%` }} />
                      </div>
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
                <h4 className="font-display text-sm font-semibold text-primary">Protein profile</h4>
              </div>
              <div className="mb-5">
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="text-secondary">Crude protein</span>
                  <span className="font-mono font-bold text-primary">{selected.initialProtein}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-card-soft">
                  <div className="h-full rounded-full bg-gradient-to-r from-forest-600 to-forest-400" style={{ width: `${selected.initialProtein}%` }} />
                </div>
                <div className="mb-1.5 mt-3 flex items-center justify-between text-xs">
                  <span className="text-secondary">Target isolate purity</span>
                  <span className="font-mono font-bold text-cyanx-400">{selected.targetPurity}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-card-soft">
                  <div className="h-full rounded-full bg-gradient-to-r from-cyanx-600 to-cyanx-400" style={{ width: `${selected.targetPurity}%` }} />
                </div>
              </div>
            </Panel>

            <Panel>
              <div className="mb-3 flex items-center gap-2">
                <FlaskConical className="h-4 w-4 text-cyanx-400" />
                <h4 className="font-display text-sm font-semibold text-primary">Off-flavor intensity</h4>
              </div>
              <div className="flex items-end gap-2">
                <span className="font-display text-4xl font-bold text-amber-400">{selected.offFlavor}</span>
                <span className="mb-1 text-sm text-muted">/ 10</span>
              </div>
              <div className="mt-3 flex gap-1">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className={`h-2 flex-1 rounded-sm ${i < Math.round(selected.offFlavor) ? 'bg-gradient-to-t from-amber-600 to-amber-400' : 'bg-card-soft'}`} />
                ))}
              </div>
            </Panel>

            <div className="grid grid-cols-1 gap-3">
              <MetricCard label="PDCAAS" value={selected.pdcaas.toFixed(2)} tone="emerald" sub="Protein quality score" info="PDCAAS" />
              <MetricCard label="Carbon offset" value={selected.carbonFootprint} unit="kg CO₂e/kg" tone="cyan" sub="vs imported pea isolate" info="HESTIA LCA" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
