import { useState } from 'react';
import { StatusBar, Navbar } from '@/components/StatusBar';
import { Hero } from '@/components/Hero';
import { ByProductSelector } from '@/components/ByProductSelector';
import { BioprocessCombinator } from '@/components/BioprocessCombinator';
import { EconomicCalculator } from '@/components/EconomicCalculator';
import { ComplianceDossier } from '@/components/ComplianceDossier';
import { PilotRoadmap } from '@/components/PilotRoadmap';
import { ReferencesFooter } from '@/components/ReferencesFooter';

export default function App() {
  const [selectedId, setSelectedId] = useState('groundnut-cake');
  const [activeNav, setActiveNav] = useState('top');

  const scrollTo = (id: string) => {
    setActiveNav(id);
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-ink-900">
      <StatusBar />
      <Navbar active={activeNav} onNav={scrollTo} />
      <Hero onExplore={() => scrollTo('selector')} />

      <main className="mx-auto max-w-7xl space-y-20 px-4 py-16 sm:px-6 lg:px-8">
        <ByProductSelector selectedId={selectedId} onSelect={setSelectedId} />
        <BioprocessCombinator selectedId={selectedId} />
        <EconomicCalculator />
        <ComplianceDossier />
        <PilotRoadmap />
        <ReferencesFooter />
      </main>
    </div>
  );
}
