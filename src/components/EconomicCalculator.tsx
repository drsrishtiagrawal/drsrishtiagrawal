import { useState, useMemo } from 'react';
import { PEA_BENCHMARK, PROCESSING_BASE_COST } from '@/data/engine';
import { SectionHeading, Panel, MetricCard } from './ui';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid,
} from 'recharts';
import { IndianRupee, TrendingDown, CalendarClock, PiggyBank, Factory, Layers } from 'lucide-react';

export function EconomicCalculator() {
  const [rawPrice, setRawPrice] = useState(25); // ₹/kg raw material
  const [capacity, setCapacity] = useState(20); // tons/day

  const model = useMemo(() => {
    const processingCost = PROCESSING_BASE_COST; // ₹/kg
    const upcycledCost = rawPrice + processingCost; // ₹/kg finished
    const benchmarkCost = PEA_BENCHMARK.costPerKg;
    const savingPerKg = benchmarkCost - upcycledCost;
    const savingPct = Math.round((savingPerKg / benchmarkCost) * 100);

    // yield assumption: 65% of raw becomes isolate
    const yieldRate = 0.65;
    const dailyOutputKg = capacity * 1000 * yieldRate;
    const dailySaving = dailyOutputKg * savingPerKg;
    const annualSaving = dailySaving * 300; // 300 operating days
    const annualSavingCr = annualSaving / 1e7; // crores

    // CAPEX estimate: ~₹1.8 Cr for 20 T/day baseline; scales with capacity
    const capexCr = (1.8 * capacity) / 20;
    const paybackMonths = Math.round((capexCr * 1e7 / Math.max(1, dailySaving)) * 12 / 30 * 10) / 10;

    const chartData = [
      { name: 'Upcycled\nProtein', cost: Math.round(upcycledCost) },
      { name: 'Imported\nPea Isolate', cost: benchmarkCost },
    ];

    return {
      upcycledCost: Math.round(upcycledCost),
      benchmarkCost,
      savingPerKg: Math.round(savingPerKg),
      savingPct,
      annualSavingCr: Math.round(annualSavingCr * 10) / 10,
      paybackMonths: Math.max(0.5, Math.min(36, paybackMonths)),
      chartData,
      dailyOutputKg: Math.round(dailyOutputKg),
      capexCr: Math.round(capexCr * 10) / 10,
    };
  }, [rawPrice, capacity]);

  return (
    <section id="economics" className="scroll-mt-20">
      <SectionHeading
        number="03"
        eyebrow="Mandi Economic & Arbitrage Calculator"
        title="Real-time cost arbitrage vs imported pea isolate"
        desc="Adjust raw material sourcing price and daily processing capacity to model net savings, annual revenue impact, and ROI payback — benchmarked against imported pea protein at ₹380/kg."
      />

      <div className="grid gap-5 lg:grid-cols-3">
        {/* left: sliders */}
        <div className="space-y-4">
          <Panel>
            <div className="mb-4 flex items-center gap-2">
              <IndianRupee className="h-4 w-4 text-forest-400" />
              <h4 className="font-display text-sm font-semibold text-white">Mandi sourcing inputs</h4>
            </div>

            <SliderInput
              label="Raw material sourcing price"
              min={15}
              max={45}
              value={rawPrice}
              onChange={setRawPrice}
              unit="₹/kg"
              hint="AGMARKNET mandi range for oilseed cakes"
            />

            <div className="mt-5">
              <SliderInput
                label="Daily processing capacity"
                min={1}
                max={50}
                value={capacity}
                onChange={setCapacity}
                unit="Tons/day"
                hint="Pilot (1–5 T) to commercial (20–50 T)"
              />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <MiniInfo icon={<Factory className="h-3.5 w-3.5" />} label="Daily isolate output" value={`${(model.dailyOutputKg / 1000).toFixed(1)} T`} />
              <MiniInfo icon={<Layers className="h-3.5 w-3.5" />} label="Est. CAPEX" value={`₹${model.capexCr} Cr`} />
            </div>
          </Panel>

          <Panel className="border-cyanx-500/20">
            <div className="flex items-center gap-2 text-xs text-cyanx-400">
              <span className="rounded bg-cyanx-500/15 px-2 py-0.5 font-mono font-semibold">BENCHMARK</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm text-slate-400">Imported pea protein isolate</span>
              <span className="font-display text-lg font-bold text-slate-200">
                ₹{model.benchmarkCost}/kg
              </span>
            </div>
            <div className="mt-1 text-xs text-slate-500">
              ~${PEA_BENCHMARK.usdPerKg}/kg · 6–8 week import lead time · EU/NA origin
            </div>
          </Panel>
        </div>

        {/* center: chart */}
        <div className="space-y-4">
          <Panel>
            <h4 className="mb-1 font-display text-sm font-semibold text-white">Cost per kg comparison</h4>
            <p className="mb-4 text-xs text-slate-500">₹/kg finished protein isolate</p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={model.chartData} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} domain={[0, 450]} />
                  <Tooltip
                    cursor={{ fill: 'rgba(148,163,184,0.06)' }}
                    contentStyle={{
                      background: '#131c31',
                      border: '1px solid rgba(148,163,184,0.15)',
                      borderRadius: '10px',
                      fontSize: '12px',
                    }}
                    labelStyle={{ color: '#e2e8f0' }}
                    formatter={(v) => [`₹${v}/kg`, 'Cost']}
                  />
                  <Bar dataKey="cost" radius={[8, 8, 0, 0]} barSize={80}>
                    <Cell fill="#10b981" />
                    <Cell fill="#64748b" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 flex items-center justify-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 font-semibold text-forest-300">
                <span className="h-2.5 w-2.5 rounded-sm bg-forest-500" /> Upcycled
              </span>
              <span className="flex items-center gap-1.5 font-semibold text-slate-400">
                <span className="h-2.5 w-2.5 rounded-sm bg-slate-500" /> Imported pea
              </span>
            </div>
          </Panel>
        </div>

        {/* right: outcomes */}
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-forest-700 to-forest-900 p-5 shadow-glow-emerald">
            <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-white/10" />
            <TrendingDown className="mb-2 h-6 w-6 text-forest-200" />
            <div className="font-display text-3xl font-bold text-white">{model.savingPct}%</div>
            <div className="text-sm font-medium text-forest-100">cost reduction per kg</div>
            <div className="mt-1 text-xs text-forest-200/80">
              ₹{model.upcycledCost} vs ₹{model.benchmarkCost}/kg
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <MetricCard
              label="Net saving per kg"
              value={`₹${model.savingPerKg}`}
              tone="emerald"
              sub={`${model.savingPct}% below benchmark`}
            />
            <MetricCard
              label="Est. annual savings"
              value={`₹${model.annualSavingCr}`}
              unit="Cr"
              tone="cyan"
              sub={`at ${capacity} T/day · 300 op. days`}
            />
            <MetricCard
              label="ROI payback period"
              value={model.paybackMonths}
              unit="mo"
              tone="amber"
              sub={`on ₹${model.capexCr} Cr CAPEX`}
            />
          </div>

          <Panel className="bg-forest-600/5">
            <div className="flex items-center gap-2 text-xs font-semibold text-forest-300">
              <PiggyBank className="h-4 w-4" /> Arbitrage insight
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate-400">
              At ₹{rawPrice}/kg mandi price and {capacity} T/day throughput, this upcycled protein delivers
              <span className="font-semibold text-forest-300"> ₹{model.savingPerKg}/kg savings</span> while matching
              70–80% functional protein content — a <span className="font-semibold text-cyanx-400">₹{model.annualSavingCr} Cr/yr</span> opportunity
              with no import dependency.
            </p>
          </Panel>
        </div>
      </div>
    </section>
  );
}

function SliderInput({
  label,
  min,
  max,
  value,
  onChange,
  unit,
  hint,
}: {
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (v: number) => void;
  unit: string;
  hint: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-xs font-medium text-slate-400">{label}</span>
        <span className="font-mono text-sm font-bold text-forest-300">
          {value} <span className="text-xs text-slate-500">{unit}</span>
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        style={{ ['--pct' as string]: `${pct}%` }}
      />
      <div className="mt-1 flex justify-between font-mono text-[10px] text-slate-600">
        <span>{min}</span>
        <span className="text-slate-500">{hint}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

function MiniInfo({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-lg bg-ink-900/50 p-2.5">
      <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
        {icon} {label}
      </div>
      <div className="mt-0.5 font-display text-sm font-bold text-slate-200">{value}</div>
    </div>
  );
}
