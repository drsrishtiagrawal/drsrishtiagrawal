import { ArrowRight, TrendingDown, Leaf, Beaker, Cpu, Sparkles } from 'lucide-react';

interface Props {
  onExplore: () => void;
}

export function Hero({ onExplore }: Props) {
  return (
    <section id="top" className="relative overflow-hidden border-b border-theme">
      <div className="absolute inset-0 bg-grid-dark opacity-60" />
      <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-forest-600/20 blur-3xl" />
      <div className="absolute -bottom-32 left-10 h-80 w-80 rounded-full bg-cyanx-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-forest-600/40 bg-forest-600/10 px-3 py-1.5 text-sm font-semibold text-forest-300">
              <Leaf className="h-3.5 w-3.5" />
              Problem Statement 2 · Upcycling India's By-products for Alternative Proteins
            </div>
            <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-primary sm:text-5xl lg:text-6xl">
              Deep-Tech Bioprocess &{' '}
              <span className="bg-gradient-to-r from-forest-400 via-cyanx-400 to-forest-400 bg-clip-text text-transparent">
                Generative Upcycling
              </span>{' '}
              Intelligence
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-secondary sm:text-lg">
              An AI-assisted engine for food scientists, business executives, and regulators: map anti-nutritional
              barriers, design green bioprocess pathways, model mandi economics, predict sensory outcomes, and
              generate FSSAI-compliant dossiers — all in one multi-persona dashboard.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                onClick={onExplore}
                className="group flex items-center gap-2 rounded-xl bg-forest-600 px-5 py-3 text-sm font-semibold text-white shadow-glow-emerald transition hover:bg-forest-500"
              >
                Launch the engine
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <button
                onClick={() => document.getElementById('economics')?.scrollIntoView({ behavior: 'smooth' })}
                className="rounded-xl border border-theme bg-card-soft px-5 py-3 text-sm font-semibold text-primary transition hover:bg-white/5"
              >
                View economics
              </button>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-theme pt-6">
              <HeroStat icon={<TrendingDown className="h-4 w-4" />} value="~65%" label="cost reduction" />
              <HeroStat icon={<Beaker className="h-4 w-4" />} value="8" label="deep-tech modules" />
              <HeroStat icon={<Cpu className="h-4 w-4" />} value="16+" label="process combinations" />
            </div>
          </div>

          {/* engine preview panel */}
          <div className="relative hidden lg:block">
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-forest-600/30 to-cyanx-500/20 blur-2xl" />
              <div className="glass rounded-[2rem] p-6 shadow-card">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-sm uppercase tracking-wider text-muted">engine.live_output</span>
                  <span className="flex items-center gap-1.5 rounded-full bg-forest-500/15 px-2 py-0.5 text-sm font-bold text-forest-300">
                    <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-forest-400" /> RUNNING
                  </span>
                </div>
                <div className="space-y-3 font-mono text-sm">
                  <CodeLine label="› feedstock" value="groundnut_cake" tone="cyan" />
                  <CodeLine label="› antinutrient_scan" value="polyphenols: 18.5 mg/g" />
                  <CodeLine label="› volatile_profile" value="hexanal, 2-pentylfuran" />
                  <CodeLine label="› process_path" value="DES→enzymatic→UF10→spray" tone="emerald" />
                  <CodeLine label="› predicted_yield" value="74.2% (adj. 62% loss)" tone="emerald" />
                  <CodeLine label="› flavor_removal" value="78% · score 2.1/10" tone="emerald" />
                  <CodeLine label="› EAA_match" value="0.86 vs FAO/WHO" tone="cyan" />
                  <CodeLine label="› cost_per_kg" value="₹132 · −65% vs pea" tone="emerald" />
                  <CodeLine label="› carbon_offset" value="2.3 kg CO₂e/kg saved" tone="cyan" />
                </div>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-card-soft">
                  <div className="h-full w-[74%] rounded-full bg-gradient-to-r from-forest-500 to-cyanx-400" style={{ backgroundSize: '200% 100%' }} />
                </div>
                <div className="mt-2 flex justify-between font-mono text-sm text-muted">
                  <span>protein purity</span>
                  <span className="text-forest-300">74% / 80% target</span>
                </div>
                <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-forest-600/10 px-2 py-1.5 text-sm font-semibold text-forest-300">
                  <Sparkles className="h-3 w-3" /> GFI India · NIFTEM Smart Protein Lab
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroStat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-forest-400">
        {icon}
        <span className="font-display text-xl font-bold text-primary sm:text-2xl">{value}</span>
      </div>
      <div className="text-sm font-medium text-muted">{label}</div>
    </div>
  );
}

function CodeLine({ label, value, tone = 'slate' }: { label: string; value: string; tone?: 'slate' | 'emerald' | 'cyan' }) {
  const tones = { slate: 'text-secondary', emerald: 'text-forest-300', cyan: 'text-cyanx-400' };
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted">{label}</span>
      <span className={`font-semibold ${tones[tone]}`}>{value}</span>
    </div>
  );
}
