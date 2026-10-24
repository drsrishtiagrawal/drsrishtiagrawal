import { useState, useEffect } from 'react';
import { StatusBar, Navbar, type Persona, type Theme } from '@/components/StatusBar';
import { Hero } from '@/components/Hero';
import { ByProductSelector } from '@/components/ByProductSelector';
import { BioprocessCombinator } from '@/components/BioprocessCombinator';
import { SensoryPredictor } from '@/components/SensoryPredictor';
import { TechnoFunctionalEngine } from '@/components/TechnoFunctionalEngine';
import { EconomicCalculator } from '@/components/EconomicCalculator';
import { ComplianceDossier } from '@/components/ComplianceDossier';
import { PilotRoadmap } from '@/components/PilotRoadmap';
import { ReferencesFooter } from '@/components/ReferencesFooter';

// modules visible per persona
const personaModules: Record<Persona, Set<string>> = {
  full: new Set(['selector', 'bioprocess', 'sensory', 'techno', 'economics', 'compliance', 'roadmap']),
  business: new Set(['selector', 'economics', 'roadmap']),
  rd: new Set(['selector', 'bioprocess', 'sensory', 'techno', 'compliance']),
};

export default function App() {
  const [selectedId, setSelectedId] = useState('groundnut-cake');
  const [activeNav, setActiveNav] = useState('top');
  const [persona, setPersona] = useState<Persona>('full');
  const [theme, setTheme] = useState<Theme>('dark');
  const [fssaiOpen, setFssaiOpen] = useState(false);
  const [pitchOpen, setPitchOpen] = useState(false);

  // sync theme class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  const scrollTo = (id: string) => {
    setActiveNav(id);
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const visible = personaModules[persona];
  const isFull = persona === 'full';

  return (
    <div className="min-h-screen bg-base">
      <StatusBar
        theme={theme}
        onToggleTheme={toggleTheme}
        onExportPitch={() => setPitchOpen(true)}
        onOpenFSSAI={() => setFssaiOpen(true)}
      />
      <Navbar
        active={activeNav}
        onNav={scrollTo}
        persona={persona}
        onPersonaChange={setPersona}
        theme={theme}
        onToggleTheme={toggleTheme}
        onExportPitch={() => setPitchOpen(true)}
        onOpenFSSAI={() => setFssaiOpen(true)}
      />
      <Hero onExplore={() => scrollTo('selector')} />

      <main className="mx-auto max-w-7xl space-y-20 px-4 py-16 sm:px-6 lg:px-8">
        {visible.has('selector') && (
          <ByProductSelector selectedId={selectedId} onSelect={setSelectedId} />
        )}
        {visible.has('bioprocess') && (
          <BioprocessCombinator selectedId={selectedId} />
        )}
        {visible.has('sensory') && (
          <SensoryPredictor selectedId={selectedId} />
        )}
        {visible.has('techno') && (
          <TechnoFunctionalEngine selectedId={selectedId} />
        )}
        {visible.has('economics') && (
          <EconomicCalculator selectedId={selectedId} />
        )}
        {visible.has('compliance') && (
          <ComplianceDossier
            selectedId={selectedId}
            open={fssaiOpen}
            onOpen={() => setFssaiOpen(true)}
            onClose={() => setFssaiOpen(false)}
          />
        )}
        {visible.has('roadmap') && (
          <PilotRoadmap />
        )}
        {/* references always visible */}
        {isFull && (
          <ReferencesFooter
            pitchOpen={pitchOpen}
            onPitchOpen={() => setPitchOpen(true)}
            onPitchClose={() => setPitchOpen(false)}
            selectedId={selectedId}
          />
        )}
      </main>
    </div>
  );
}
