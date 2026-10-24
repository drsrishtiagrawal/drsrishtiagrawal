import { useState, useMemo } from 'react';
import { PEA_BENCHMARK, PROCESSING_BASE_COST, byProducts } from '@/data/engine';
import { SectionHeading, Panel, MetricCard, SliderInput, Tooltip } from './ui';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip as RTooltip, ResponsiveContainer, Cell, CartesianGrid,
} from 'recharts';
import { IndianRupee, TrendingDown, PiggyBank, Factory, Leaf, Layers } from 'lucide-react';

interface Props {
  selectedId: string;
}

export function EconomicCalculator({ selectedId }: Props) {
  const bp = byProducts.find((b) => b.id === selectedId) ?? byProducts[0];
  const [rawPrice, setRawPrice] = useState(25);
  const [capacity, setCapacity] = useState(20);

  const model = useMemo(() => {
    const upcycledCost = rawPrice + PROCESSING_BASE_COST;
    const benchmarkCost = PEA_BENCHMARK.costPerKg;
    const savingPerKg = benchmarkCost - upcycledCost;
    const savingPct = Math.round((savingPerKg / benchmarkCost) * 100);
    const grossMargin = Math.round((savingPerKg / benchmarkCost) * 100);

    const yieldRate = 0.65;
    const dailyOutputKg = capacity * 1000 * yieldRate;
    const dailyRevenue = dailyOutputKg * upcycledCost;
    const dailySaving = dailyOutputKg * savingPerKg;
    const annualRevenue = dailyRevenue * 300;
    const annualSaving = dailySaving * 300;
    const annualSavingCr = annualSaving / 1e7;
    const annualRevenueCr = annualRevenue / 1e7;

    const capexCr = (1.8 * capacity) / 20;
    const paybackMonths = Math.round((capexCr * 1e7 / Math.max(1, dailySaving)) * 12 / 30 * 10) / 10;

    const carbonOffsetPerKg = bp.carbonFootprint;
    const annualCarbonSaved = (dailyOutputKg * carbonOffsetPerKg * 300) / 1000; // tons CO2e/yr

    const chartData = [
      { name: 'Upcycled', cost: Math.round(upcycledCost) },
      { name: 'Imported Pea', cost: benchmarkCost },
    ];

    return {
      upcycledCost: Math.round(upcycledCost), benchmarkCost, savingPerKg: Math.round(savingPerKg),
      savingPct, grossMargin, annualSavingCr: Math.round(annualSavingCr * 10) / 10,
      annualRevenueCr: Math.round(annualRevenueCr * 10) / 10,
      paybackMonths: Math.max(0.5, Math.min(36, paybackMonths)),
      chartData, dailyOutputKg: Math.round(dailyOutputKg),
      capexCr: Math.round(capexCr * 10) / 10, carbonOffsetPerKg, annualCarbonSaved: Math.round(annualCarbonSaved),
    };
  }, [rawPrice, capacity, bp]);

  return (
    <section id="economics" className="scroll-mt-20">
      <SectionHeading
        number="06"
        eyebrow="Mandi Arbitrage & B2B ROI Calculator"
        title="Real-time cost arbitrage vs imported pea isolate"
        desc="Adjust mandi sourcing price and plant capacity to model net cost, gross margin, annual revenue, ROI payback, and carbon offset — benchmarked against imported pea protein at ₹380/kg ($4.50/kg)."
      />

      <div className="grid gap-5 lg:grid-cols-3">
        {/* left: sliders */}
        <div className="space-y-4">
          <Panel>
            <div className="mb-4 flex items-center gap-2">
              <IndianRupee className="h-4 w-4 text-forest-400" />
              <h4 className="font-display text-sm font-semibold text-primary">Mandi sourcing inputs</h4>
            </div>
            <SliderInput label="Raw material mandi price" min={15} max={50} value={rawPrice} onChange={setRawPrice} unit="₹/kg" hint="AGMARKNET range for oilseed cakes" />
            <div className="mt-5">
              <SliderInput label="Plant processing capacity" min={1} max={100} value={capacity} onChange={setCapacity} unit="T/day" hint="Pilot 1–5T → commercial 50–100T" />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <MiniInfo icon={<Factory className="h-3.5 w-3.5" />} label="Daily isolate output" value={`${(model.dailyOutputKg / 1000).toFixed(1)} T`} />
              <MiniInfo icon={<Layers className="h-3.5 w-3.5" />} label="Est. CAPEX" value={`₹${model.capexCr} Cr`} />
            </div>
          </Panel>

          <Panel className="border-cyanx-500/20">
            <div className="flex items-center gap-2">
              <span className="rounded bg-cyanx-500/15 px-2 py-0.5 font-mono text-sm font-semibold text-cyanx-400">BENCHMARK</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm text-secondary">Imported pea protein isolate</span>
              <span className="font-display text-lg font-bold text-primary">₹{model.benchmarkCost}/kg</span>
            </div>
            <div className="mt-1 text-sm text-muted">~${PEA_BENCHMARK.usdPerKg}/kg · 6–8 wk import lead time · EU/NA origin</div>
          </Panel>
        </div>

        {/* center: chart */}
        <div className="space-y-4">
          <Panel>
            <h4 className="mb-1 font-display text-sm font-semibold text-primary">Cost per kg comparison</h4>
            <p className="mb-4 text-sm text-muted">₹/kg finished protein isolate</p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={model.chartData} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} domain={[0, 450]} />
                  <RTooltip cursor={{ fill: 'rgba(148,163,184,0.06)' }} formatter={(v) => [`₹${v}/kg`, 'Cost']} />
                  <Bar dataKey="cost" radius={[8, 8, 0, 0]} barSize={80}>
                    <Cell fill="#10b981" />
                    <Cell fill="#64748b" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 flex items-center justify-center gap-4 text-sm">
              <span className="flex items-center gap-1.5 font-semibold text-forest-300"><span className="h-2.5 w-2.5 rounded-sm bg-forest-500" /> Upcycled</span>
              <span className="flex items-center gap-1.5 font-semibold text-muted"><span className="h-2.5 w-2.5 rounded-sm bg-slate-500" /> Imported pea</span>
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
            <div className="mt-1 text-sm text-forest-200/80">₹{model.upcycledCost} vs ₹{model.benchmarkCost}/kg</div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <MetricCard label="Net cost/kg" value={`₹${model.upcycledCost}`} tone="emerald" />
            <MetricCard label="Gross margin" value={`${model.grossMargin}%`} tone="cyan" />
            <MetricCard label="Annual revenue" value={`₹${model.annualRevenueCr}`} unit="Cr" tone="emerald" sub="300 op. days" />
            <MetricCard label="Annual savings" value={`₹${model.annualSavingCr}`} unit="Cr" tone="cyan" sub="vs pea benchmark" />
            <MetricCard label="ROI payback" value={model.paybackMonths} unit="mo" tone="amber" sub={`₹${model.capexCr} Cr CAPEX`} />
            <MetricCard label="Carbon offset" value={model.carbonOffsetPerKg} unit="kg CO₂e" tone="purple" sub={`${model.annualCarbonSaved} T/yr saved`} info="HESTIA LCA" />
          </div>

          <Panel className="bg-forest-600/5">
            <div className="flex items-center gap-2 text-sm font-semibold text-forest-300">
              <PiggyBank className="h-4 w-4" /> Arbitrage insight
            </div>
            <p className="mt-2 text-sm leading-relaxed text-secondary">
              At ₹{rawPrice}/kg mandi price and {capacity} T/day, this upcycled protein delivers
              <span className="font-semibold text-forest-300"> ₹{model.savingPerKg}/kg savings</span> — a
              <span className="font-semibold text-cyanx-400"> ₹{model.annualSavingCr} Cr/yr</span> opportunity with
              <span className="font-semibold text-purple-400"> {model.annualCarbonSaved}T CO₂e/yr</span> carbon offset and zero import dependency.
            </p>
          </Panel>
        </div>
      </div>
    </section>
  );
}

function MiniInfo({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-lg bg-card-soft p-2.5">
      <div className="flex items-center gap-1.5 text-sm text-muted">{icon} {label}</div>
      <div className="mt-0.5 font-display text-sm font-bold text-primary">{value}</div>
    </div>
  );
}
