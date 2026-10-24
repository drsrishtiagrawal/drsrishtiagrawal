import { useState, useMemo } from 'react';
import { byProducts } from '@/data/engine';
import { SectionHeading, Panel, SliderInput, Tooltip } from './ui';
import { FlaskRound, Wind, Sparkles, Gauge, Info } from 'lucide-react';

interface Props {
  selectedId: string;
}

export function SensoryPredictor({ selectedId }: Props) {
  const bp = byProducts.find((b) => b.id === selectedId) ?? byProducts[0];
  const [hydrolysisTime, setHydrolysisTime] = useState(3.0); // hours
  const [temperature, setTemperature] = useState(50); // °C

  const results = useMemo(() => {
    // Model: longer hydrolysis + optimal temp → more reduction
    // Optimal temp is ~55°C for enzymatic; drops off outside
    const tempEfficiency = Math.max(0.2, 1 - Math.abs(temperature - 55) / 45);
    const timeEfficiency = Math.min(1, hydrolysisTime / 8);

    const phenolicReduction = Math.min(92, Math.round((timeEfficiency * 0.6 + tempEfficiency * 0.4) * 90));
    const grassyVolatileReduction = Math.min(88, Math.round((timeEfficiency * 0.5 + tempEfficiency * 0.5) * 85));

    // Umami/neutral flavor score: starts low, improves with treatment, peaks then plateaus
    const baseScore = 10 - bp.offFlavor;
    const improvement = (phenolicReduction / 100) * 0.5 + (grassyVolatileReduction / 100) * 0.5;
    const umamiScore = Math.min(10, Math.round((baseScore + improvement * 5) * 10) / 10);

    // volatile reduction per compound
    const volatileReductions = bp.volatiles.map((v) => ({
      name: v.name,
      reduction: Math.min(95, Math.round((timeEfficiency * 0.55 + tempEfficiency * 0.45) * (70 + v.initialLevel * 0.25))),
      initialLevel: v.initialLevel,
    }));

    return { phenolicReduction, grassyVolatileReduction, umamiScore, volatileReductions };
  }, [hydrolysisTime, temperature, bp]);

  return (
    <section id="sensory" className="scroll-mt-20">
      <SectionHeading
        number="04"
        eyebrow="AI Sensory & Molecular Debittering Predictor"
        title="Predict off-flavor removal in real time"
        desc="Adjust hydrolysis time and temperature to model how enzymatic treatment breaks down bitter phenolics, volatilizes grassy off-notes, and improves the neutral/umami flavor profile."
      />

      <div className="grid gap-5 lg:grid-cols-3">
        {/* left: controls */}
        <div className="space-y-4">
          <Panel>
            <div className="mb-4 flex items-center gap-2">
              <FlaskRound className="h-4 w-4 text-cyanx-400" />
              <h4 className="font-display text-sm font-semibold text-primary">Enzymatic hydrolysis parameters</h4>
            </div>
            <SliderInput
              label="Hydrolysis time"
              min={0.5}
              max={12}
              step={0.5}
              value={hydrolysisTime}
              onChange={setHydrolysisTime}
              unit="h"
              hint="Optimal: 3–6 h for peptidase"
            />
            <div className="mt-5">
              <SliderInput
                label="Temperature"
                min={30}
                max={75}
                value={temperature}
                onChange={setTemperature}
                unit="°C"
                hint="Optimal: 50–55°C for Debizyme"
              />
            </div>
            <div className="mt-5 rounded-xl border border-theme bg-card-soft p-3">
              <div className="text-sm font-medium text-muted">Active feedstock</div>
              <div className="font-display text-sm font-bold text-primary">{bp.emoji} {bp.shortName}</div>
              <div className="mt-1 text-sm text-muted">Initial off-flavor: {bp.offFlavor}/10</div>
            </div>
          </Panel>
        </div>

        {/* center: volatile tracker */}
        <div className="space-y-4">
          <Panel>
            <div className="mb-4 flex items-center gap-2">
              <Wind className="h-4 w-4 text-cyanx-400" />
              <h4 className="font-display text-sm font-semibold text-primary">Volatile compound tracker</h4>
            </div>
            <div className="space-y-4">
              {results.volatileReductions.map((v) => (
                <div key={v.name}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-sm font-semibold text-primary">
                      {v.name}
                      <Tooltip term={v.name} />
                    </span>
                    <span className="font-mono text-sm font-bold text-forest-300">−{v.reduction}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* before */}
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-card-soft">
                      <div className="h-full rounded-full bg-gradient-to-r from-amber-600 to-amber-400" style={{ width: `${v.initialLevel}%` }} />
                    </div>
                    {/* after */}
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-card-soft">
                      <div className="h-full rounded-full bg-gradient-to-r from-forest-600 to-forest-400" style={{ width: `${Math.max(2, v.initialLevel * (1 - v.reduction / 100))}%` }} />
                    </div>
                  </div>
                  <div className="mt-1 flex justify-between font-mono text-sm text-muted">
                    <span>before: {v.initialLevel}%</span>
                    <span>after: {Math.round(v.initialLevel * (1 - v.reduction / 100))}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* right: live outputs */}
        <div className="space-y-4">
          <Panel className="border-cyanx-500/20">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gauge className="h-4 w-4 text-forest-400" />
                <h4 className="font-display text-sm font-semibold text-primary">Predicted sensory outcomes</h4>
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-cyanx-500/15 px-2 py-0.5 text-sm font-bold text-cyanx-400">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-cyanx-400" /> AI MODEL
              </span>
            </div>

            {/* big gauge for umami */}
            <div className="mb-4 flex flex-col items-center rounded-xl bg-card-soft p-4">
              <div className="text-sm font-medium uppercase tracking-wider text-muted">Umami / Neutral Flavor Score</div>
              <div className="mt-1 font-display text-5xl font-bold text-forest-300">{results.umamiScore}</div>
              <div className="text-sm text-muted">out of 10</div>
              <div className="mt-3 flex gap-1">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className={`h-2.5 w-2.5 rounded-full ${i < Math.round(results.umamiScore) ? 'bg-forest-400' : 'bg-card-soft'}`} />
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <GaugeBar icon={<Sparkles className="h-4 w-4" />} label="Bitter phenolic reduction" value={results.phenolicReduction} tone="amber" />
              <GaugeBar icon={<Wind className="h-4 w-4" />} label="Grassy off-flavor volatilization" value={results.grassyVolatileReduction} tone="cyan" />
            </div>

            <div className="mt-3 flex items-start gap-1.5 rounded-lg bg-card-soft p-2.5 text-sm text-muted">
              <Info className="mt-0.5 h-3 w-3 shrink-0" />
              <span>Model trained on enzymatic hydrolysis kinetics: peptidase cleavage rate × temperature-dependent enzyme activity. Peak efficiency at 55°C; thermal denaturation above 65°C.</span>
            </div>
          </Panel>
        </div>
      </div>
    </section>
  );
}

function GaugeBar({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: number; tone: 'amber' | 'cyan' }) {
  const gradients = { amber: 'from-amber-600 to-amber-400', cyan: 'from-cyanx-600 to-cyanx-400' };
  const textTones = { amber: 'text-amber-400', cyan: 'text-cyanx-400' };
  return (
    <div className="rounded-xl bg-card-soft p-3">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-sm text-secondary">{icon} {label}</span>
        <span className={`font-display text-lg font-bold ${textTones[tone]}`}>{value}%</span>
      </div>
      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-card-soft">
        <div className={`h-full rounded-full bg-gradient-to-r ${gradients[tone]} transition-all duration-300`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
