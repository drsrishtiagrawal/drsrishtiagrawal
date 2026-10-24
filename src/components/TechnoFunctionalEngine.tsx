import { useState, useMemo } from 'react';
import { byProducts } from '@/data/engine';
import { SectionHeading, Panel, SliderInput, MetricCard, Tooltip } from './ui';
import { Cpu, Beaker, Dna, FlaskConical, Info } from 'lucide-react';

interface Props {
  selectedId: string;
}

export function TechnoFunctionalEngine({ selectedId }: Props) {
  const bp = byProducts.find((b) => b.id === selectedId) ?? byProducts[0];
  const [ph, setPh] = useState(9.0);
  const [salt, setSalt] = useState(100); // mM

  const results = useMemo(() => {
    // EAI peaks near pH 8-9 (high solubility), drops at isoelectric ~4.5
    const eaiBase = 120;
    const phFactor = ph < 4 ? 0.3 : ph > 10 ? 0.7 : 1 - Math.abs(ph - 8.5) / 12;
    const eai = Math.round(eaiBase * Math.max(0.2, phFactor) * 10) / 10;

    // Foaming capacity — better at higher pH, reduced by high salt
    const foamBase = 85;
    const saltFactor = 1 - salt / 800;
    const foam = Math.round(foamBase * Math.max(0.3, phFactor) * Math.max(0.4, saltFactor));

    // IVPD — enzymatic treatment improves digestibility; pH affects protein unfolding
    const ivpdBase = 72 + bp.pdcaas * 15;
    const ivpdPhFactor = 1 - Math.abs(ph - 8) / 20;
    const ivpd = Math.min(95, Math.round(ivpdBase * Math.max(0.7, ivpdPhFactor) * 10) / 10);

    // EAA Match Index — fraction of reference met, averaged across amino acids
    const eaaScores = bp.aminoAcids.map((aa) => Math.min(1.2, aa.upcycled / aa.reference));
    const eaaMatch = Math.round((eaaScores.reduce((s, v) => s + Math.min(1, v), 0) / eaaScores.length) * 100);

    return { eai, foam, ivpd, eaaMatch };
  }, [ph, salt, bp]);

  return (
    <section id="techno" className="scroll-mt-20">
      <SectionHeading
        number="05"
        eyebrow="AI Techno-Functional & EAA Matching Engine"
        title="Optimize functional properties & amino acid profile"
        desc="Adjust extraction pH and ionic strength to model emulsion activity, foaming capacity, digestibility, and essential amino acid alignment with the FAO/WHO 2013 reference standard."
      />

      <div className="grid gap-5 lg:grid-cols-3">
        {/* left: controls */}
        <div className="space-y-4">
          <Panel>
            <div className="mb-4 flex items-center gap-2">
              <Cpu className="h-4 w-4 text-cyanx-400" />
              <h4 className="font-display text-sm font-semibold text-primary">Extraction parameters</h4>
            </div>
            <SliderInput
              label="Extraction pH"
              min={2}
              max={10}
              step={0.5}
              value={ph}
              onChange={setPh}
              unit=""
              hint="Optimal solubilization: pH 8–9"
            />
            <div className="mt-5">
              <SliderInput
                label="Ionic Strength (NaCl)"
                min={0}
                max={500}
                step={25}
                value={salt}
                onChange={setSalt}
                unit="mM"
                hint="Low salt = better foaming"
              />
            </div>
            <div className="mt-5 rounded-xl border border-theme bg-card-soft p-3">
              <div className="text-sm font-medium text-muted">Active feedstock</div>
              <div className="font-display text-sm font-bold text-primary">{bp.emoji} {bp.shortName}</div>
              <div className="mt-1 text-sm text-muted">PDCAAS baseline: {bp.pdcaas.toFixed(2)}</div>
            </div>
          </Panel>
        </div>

        {/* center: functional metrics */}
        <div className="space-y-4">
          <Panel>
            <div className="mb-4 flex items-center gap-2">
              <Beaker className="h-4 w-4 text-forest-400" />
              <h4 className="font-display text-sm font-semibold text-primary">Techno-functional properties</h4>
            </div>
            <div className="space-y-3">
              <FuncBar label="Emulsion Activity Index" value={results.eai} unit="m²/g" max={150} tone="emerald" info="EAI" />
              <FuncBar label="Foaming Capacity" value={results.foam} unit="%" max={100} tone="cyan" info="Foaming" />
              <FuncBar label="In-Vitro Protein Digestibility" value={results.ivpd} unit="%" max={100} tone="amber" info="IVPD" />
            </div>
          </Panel>

          {/* EAA match index */}
          <Panel className="border-cyanx-500/20">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Dna className="h-4 w-4 text-cyanx-400" />
                <h4 className="font-display text-sm font-semibold text-primary">EAA Match Index</h4>
              </div>
              <span className="font-display text-2xl font-bold text-cyanx-400">{results.eaaMatch}%</span>
            </div>
            <div className="mb-2 text-sm text-muted">vs FAO/WHO 2013 reference standard</div>
            <div className="space-y-3">
              {bp.aminoAcids.map((aa) => {
                const ratio = Math.min(1.2, aa.upcycled / aa.reference);
                const pct = Math.min(100, (ratio * 100));
                const meets = aa.upcycled >= aa.reference;
                return (
                  <div key={aa.name}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="font-semibold text-primary">{aa.name} <span className="font-mono text-muted">({aa.abbreviation})</span></span>
                      <span className={`font-mono font-bold ${meets ? 'text-forest-300' : 'text-amber-400'}`}>
                        {aa.upcycled}/{aa.reference} mg/g
                      </span>
                    </div>
                    <div className="relative h-2.5 overflow-hidden rounded-full bg-card-soft">
                      <div
                        className={`h-full rounded-full ${meets ? 'bg-gradient-to-r from-forest-600 to-forest-400' : 'bg-gradient-to-r from-amber-600 to-amber-400'}`}
                        style={{ width: `${pct}%` }}
                      />
                      {/* reference marker at 100% */}
                      <div className="absolute top-0 h-full w-0.5 bg-cyanx-400" style={{ left: '100%', transform: 'translateX(-100%)' }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 flex items-start gap-1.5 rounded-lg bg-card-soft p-2.5 text-sm text-muted">
              <Info className="mt-0.5 h-3 w-3 shrink-0" />
              <span>Cyan line = FAO/WHO 2013 reference. Green = meets/exceeds reference; amber = limiting amino acid. Methionine is typically limiting for legume proteins; lysine for cereals.</span>
            </div>
          </Panel>
        </div>

        {/* right: summary */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            <MetricCard label="EAI" value={results.eai} unit="m²/g" tone="emerald" sub="Emulsion stability" info="EAI" />
            <MetricCard label="Foaming" value={results.foam} unit="%" tone="cyan" sub="Whip expansion" info="Foaming" />
            <MetricCard label="IVPD" value={results.ivpd} unit="%" tone="amber" sub="Digestibility" info="IVPD" />
            <MetricCard label="EAA Match" value={`${results.eaaMatch}%`} tone="purple" sub="vs FAO/WHO 2013" />
          </div>
          <Panel className="bg-forest-600/5">
            <div className="flex items-center gap-2 text-sm font-semibold text-forest-300">
              <FlaskConical className="h-4 w-4" /> Functional insight
            </div>
            <p className="mt-2 text-sm leading-relaxed text-secondary">
              At pH {ph} and {salt}mM NaCl, this isolate achieves EAI of {results.eai} m²/g — {results.eai > 100 ? 'comparable to commercial pea isolate' : 'suitable for beverages and bakery'}. IVPD of {results.ivpd}% indicates {results.ivpd > 80 ? 'excellent' : 'good'} bioavailability after enzymatic treatment.
            </p>
          </Panel>
        </div>
      </div>
    </section>
  );
}

function FuncBar({ label, value, unit, max, tone, info }: { label: string; value: number; unit: string; max: number; tone: 'emerald' | 'cyan' | 'amber'; info?: string }) {
  const gradients = { emerald: 'from-forest-600 to-forest-400', cyan: 'from-cyanx-600 to-cyanx-400', amber: 'from-amber-600 to-amber-400' };
  const textTones = { emerald: 'text-forest-300', cyan: 'text-cyanx-400', amber: 'text-amber-400' };
  return (
    <div className="rounded-xl bg-card-soft p-3">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1 text-sm text-secondary">
          {label}
          {info && <Tooltip term={info} />}
        </span>
        <span className={`font-display text-lg font-bold ${textTones[tone]}`}>
          {value}<span className="ml-0.5 text-sm text-muted">{unit}</span>
        </span>
      </div>
      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-card-soft">
        <div className={`h-full rounded-full bg-gradient-to-r ${gradients[tone]} transition-all duration-300`} style={{ width: `${Math.min(100, (value / max) * 100)}%` }} />
      </div>
    </div>
  );
}
