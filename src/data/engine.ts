// ─────────────────────────────────────────────────────────────
// UpcycleAI Engine™ v3.0 — Deep-Tech Bioprocess Data Layer
// NIFTEM-K Hack the Fork 2026 · Problem Statement 2
// Tags: [Measured] [Published] [Assumed/Synthetic]
// ─────────────────────────────────────────────────────────────

export type DataTag = 'Measured' | 'Published' | 'Assumed/Synthetic';

export interface AntiNutrient {
  name: string;
  concentration: number; // mg/g
  unit: string;
  tag: DataTag;
  note: string;
}

export interface VolatileCompound {
  name: string;
  desc: string;
  initialLevel: number; // relative 0-100
  category: string;
}

export interface AminoAcid {
  name: string;
  abbreviation: string;
  upcycled: number; // mg/g protein
  reference: number; // FAO/WHO 2013 mg/g
}

export interface ByProduct {
  id: string;
  name: string;
  shortName: string;
  emoji: string;
  region: string;
  annualSupply: string;
  initialProtein: number;
  targetPurity: number;
  pdcaas: number;
  offFlavor: number; // 1-10
  carbonFootprint: number; // kg CO2e/kg saved vs pea
  antiNutrients: AntiNutrient[];
  volatiles: VolatileCompound[];
  aminoAcids: AminoAcid[];
  blurb: string;
}

export const byProducts: ByProduct[] = [
  {
    id: 'groundnut-cake',
    name: 'Groundnut Cake (Defatted Meal)',
    shortName: 'Groundnut Cake',
    emoji: '🥜',
    region: 'Gujarat · Saurashtra belt',
    annualSupply: '~5.2 Mt/yr',
    initialProtein: 45,
    targetPurity: 80,
    pdcaas: 0.72,
    offFlavor: 6.5,
    carbonFootprint: 2.3,
    blurb: 'India is the world\'s #2 groundnut producer. Expeller-pressed cake retains albumin/globulin but carries polyphenols, tannins and aflatoxin-prone handling constraints.',
    antiNutrients: [
      { name: 'Polyphenols (tannins)', concentration: 18.5, unit: 'mg/g', tag: 'Published', note: 'Binds protein; darkens color' },
      { name: 'Phytic acid', concentration: 17.2, unit: 'mg/g', tag: 'Measured', note: 'Chelates Fe/Zn; reduces mineral bioavailability' },
      { name: 'Aflatoxin B1 risk', concentration: 0.008, unit: 'mg/kg', tag: 'Published', note: 'Regulatory limit ≤10 ppb' },
    ],
    volatiles: [
      { name: 'Hexanal', desc: 'Grassy, green-leaf aldehyde from lipid oxidation', initialLevel: 72, category: 'Lipid oxidation' },
      { name: '2-Pentylfuran', desc: 'Beany/nutty off-note from linoleate autoxidation', initialLevel: 58, category: 'Beany' },
      { name: 'Pyrazines', desc: 'Roasted nutty notes from Maillard pathways', initialLevel: 35, category: 'Roasted' },
    ],
    aminoAcids: [
      { name: 'Lysine', abbreviation: 'Lys', upcycled: 38, reference: 45 },
      { name: 'Methionine+Cystine', abbreviation: 'Met+Cys', upcycled: 25, reference: 22 },
      { name: 'Threonine', abbreviation: 'Thr', upcycled: 34, reference: 23 },
      { name: 'Tryptophan', abbreviation: 'Trp', upcycled: 12, reference: 6 },
    ],
  },
  {
    id: 'mustard-meal',
    name: 'Mustard Meal (Rape/Brassica Seed)',
    shortName: 'Mustard Meal',
    emoji: '🌿',
    region: 'Rajasthan · Narmada belt',
    annualSupply: '~6.5 Mt/yr',
    initialProtein: 41,
    targetPurity: 82,
    pdcaas: 0.68,
    offFlavor: 7.8,
    carbonFootprint: 2.4,
    blurb: 'India leads global mustard production. The meal is protein-dense but glucosinolates and sinigrin deliver sharp pungency and goitrogenic antinutritional effects.',
    antiNutrients: [
      { name: 'Glucosinolates', concentration: 45.0, unit: 'mg/g', tag: 'Published', note: 'Goitrogenic isothiocyanates' },
      { name: 'Sinigrin', concentration: 22.3, unit: 'mg/g', tag: 'Measured', note: 'Horseradish-like pungency' },
      { name: 'Phytic acid', concentration: 28.0, unit: 'mg/g', tag: 'Published', note: 'Mineral chelation' },
      { name: 'Tannins', concentration: 8.1, unit: 'mg/g', tag: 'Measured', note: 'Astringency' },
    ],
    volatiles: [
      { name: 'Allyl Isothiocyanate', desc: 'Sharp, horseradish-like pungent volatile from sinigrin hydrolysis', initialLevel: 88, category: 'Pungent' },
      { name: 'Sinapine', desc: 'Bitter choline ester of sinapic acid; contributes lingering bitterness', initialLevel: 65, category: 'Bitter' },
      { name: 'Dimethyl trisulfide', desc: 'Sulfurous, cabbage-like off-note', initialLevel: 52, category: 'Sulfurous' },
    ],
    aminoAcids: [
      { name: 'Lysine', abbreviation: 'Lys', upcycled: 42, reference: 45 },
      { name: 'Methionine+Cystine', abbreviation: 'Met+Cys', upcycled: 30, reference: 22 },
      { name: 'Threonine', abbreviation: 'Thr', upcycled: 38, reference: 23 },
      { name: 'Tryptophan', abbreviation: 'Trp', upcycled: 14, reference: 6 },
    ],
  },
  {
    id: 'rice-bran',
    name: 'Rice Bran (Stabilized)',
    shortName: 'Rice Bran',
    emoji: '🌾',
    region: 'Punjab · Chhattisgarh · Telangana',
    annualSupply: '~9.0 Mt/yr',
    initialProtein: 14,
    targetPurity: 75,
    pdcaas: 0.64,
    offFlavor: 5.2,
    carbonFootprint: 2.6,
    blurb: 'From ~130 Mt paddy milled annually, rice bran is abundant but protein-dilute and rapidly rancidifies due to lipase. Stabilization within hours of milling unlocks its valorization.',
    antiNutrients: [
      { name: 'Rancidity (FFA)', concentration: 62.0, unit: 'mg/g', tag: 'Published', note: 'Lipase hydrolysis; stabilize <4 hr' },
      { name: 'Phytic acid', concentration: 52.0, unit: 'mg/g', tag: 'Measured', note: 'Among highest of cereals' },
      { name: 'Oryzanol', concentration: 25.0, unit: 'mg/g', tag: 'Assumed/Synthetic', note: 'Antioxidant but bitter' },
    ],
    volatiles: [
      { name: 'Hexanal', desc: 'Primary rancidity marker from rice bran lipase activity', initialLevel: 85, category: 'Rancid' },
      { name: '2-Pentylfuran', desc: 'Beany off-note from lipid autoxidation', initialLevel: 48, category: 'Beany' },
      { name: 'Nonanal', desc: 'Waxy, citrus-like aldehyde from oleate oxidation', initialLevel: 40, category: 'Waxy' },
    ],
    aminoAcids: [
      { name: 'Lysine', abbreviation: 'Lys', upcycled: 30, reference: 45 },
      { name: 'Methionine+Cystine', abbreviation: 'Met+Cys', upcycled: 28, reference: 22 },
      { name: 'Threonine', abbreviation: 'Thr', upcycled: 32, reference: 23 },
      { name: 'Tryptophan', abbreviation: 'Trp', upcycled: 10, reference: 6 },
    ],
  },
  {
    id: 'guar-meal',
    name: 'Guar Meal (High Protein Fraction)',
    shortName: 'Guar Meal',
    emoji: '🌱',
    region: 'Rajasthan · Thar belt',
    annualSupply: '~2.5 Mt/yr',
    initialProtein: 46,
    targetPurity: 78,
    pdcaas: 0.70,
    offFlavor: 4.8,
    carbonFootprint: 2.5,
    blurb: 'India produces ~80% of the world\'s guar. After gum extraction the split meal is protein-rich but carries gum residue and trypsin inhibitors limiting food-grade use.',
    antiNutrients: [
      { name: 'Guar gum residue', concentration: 120.0, unit: 'mg/g', tag: 'Measured', note: 'High viscosity; blocks filtration' },
      { name: 'Trypsin inhibitors', concentration: 14.0, unit: 'mg/g', tag: 'Published', note: 'Reduces digestibility' },
      { name: 'Saponins', concentration: 5.5, unit: 'mg/g', tag: 'Published', note: 'Bitter, foaming' },
    ],
    volatiles: [
      { name: 'Hexanal', desc: 'Mild grassy aldehyde from lipid oxidation', initialLevel: 45, category: 'Grassy' },
      { name: '1-Octen-3-ol', desc: 'Mushroom-like volatile from linoleate oxidation', initialLevel: 38, category: 'Earthy' },
      { name: '2-Pentylfuran', desc: 'Beany off-note', initialLevel: 42, category: 'Beany' },
    ],
    aminoAcids: [
      { name: 'Lysine', abbreviation: 'Lys', upcycled: 40, reference: 45 },
      { name: 'Methionine+Cystine', abbreviation: 'Met+Cys', upcycled: 20, reference: 22 },
      { name: 'Threonine', abbreviation: 'Thr', upcycled: 30, reference: 23 },
      { name: 'Tryptophan', abbreviation: 'Trp', upcycled: 11, reference: 6 },
    ],
  },
];

// ── Bioprocess stages ──

export interface ProcessOption {
  id: string;
  label: string;
  sub: string;
  icon: string;
  yieldDelta: number;
  flavorRemoval: number;
  costDelta: number;
  antiNutrientRemoval: number;
  note: string;
}

export interface ProcessStage {
  id: string;
  title: string;
  number: number;
  options: ProcessOption[];
}

export const processStages: ProcessStage[] = [
  {
    id: 'pretreatment', title: 'Pre-Treatment — Defatting', number: 1,
    options: [
      { id: 'scco2', label: 'Supercritical CO₂ Defatting', sub: '60°C · 300 bar · solvent-free', icon: 'Wind', yieldDelta: +4, flavorRemoval: 0.15, costDelta: 22, antiNutrientRemoval: 0.10, note: 'Clean label; preserves protein functionality' },
      { id: 'des', label: 'Deep Eutectic Solvent (DES) Wash', sub: 'ChCl:lactic acid 1:2 · 50°C', icon: 'Droplets', yieldDelta: +5, flavorRemoval: 0.20, costDelta: 14, antiNutrientRemoval: 0.25, note: 'Green solvent; removes polyphenols selectively' },
    ],
  },
  {
    id: 'debittering', title: 'Debittering & Extraction', number: 2,
    options: [
      { id: 'enzymatic', label: 'Enzymatic — Debizyme/Peptidase', sub: '0.5% E/S · pH 8 · 50°C · 90 min', icon: 'TestTube2', yieldDelta: +6, flavorRemoval: 0.55, costDelta: 18, antiNutrientRemoval: 0.40, note: 'Hydrolyzes bitter peptides; improves solubility' },
      { id: 'thermal', label: 'Thermal Solubilization', sub: '110°C · 90 sec · steam injection', icon: 'Flame', yieldDelta: +1, flavorRemoval: 0.25, costDelta: 6, antiNutrientRemoval: 0.15, note: 'Inactivates enzymes but may denature protein' },
    ],
  },
  {
    id: 'purification', title: 'Purification', number: 3,
    options: [
      { id: 'uf10', label: 'Ultrafiltration 10kDa', sub: 'pH 9 · 40°C → 10 kDa membrane', icon: 'Filter', yieldDelta: +9, flavorRemoval: 0.40, costDelta: 16, antiNutrientRemoval: 0.50, note: 'Removes antinutrients via permeate; high purity' },
      { id: 'isoelectric', label: 'Isoelectric Precipitation', sub: 'pH 4.5 · batch centrifuge', icon: 'GitCommitVertical', yieldDelta: +5, flavorRemoval: 0.20, costDelta: 10, antiNutrientRemoval: 0.30, note: 'Simpler; lower purity ceiling' },
    ],
  },
  {
    id: 'drying', title: 'Drying', number: 4,
    options: [
      { id: 'spray', label: 'Spray Drying', sub: 'Inlet 180°C · outlet 80°C', icon: 'Cloud', yieldDelta: +2, flavorRemoval: 0.05, costDelta: 7, antiNutrientRemoval: 0.05, note: 'Fast, scalable, slight Maillard risk' },
      { id: 'freeze', label: 'Lyophilization (Freeze Drying)', sub: '−40°C · vacuum sublimation', icon: 'Snowflake', yieldDelta: +3, flavorRemoval: 0.08, costDelta: 28, antiNutrientRemoval: 0.05, note: 'Best functionality retention; premium cost' },
    ],
  },
];

export const CUMULATIVE_YIELD_LOSS = 0.62; // 62% cumulative recovery yield loss
export const PROCESSING_BASE_COST = 35;

// ── FSSAI Compliance ──

export interface SafetyCheck {
  parameter: string;
  threshold: string;
  status: 'PASS' | 'COMPLIANT' | 'SAFE' | 'CONDITIONAL';
  tag: DataTag;
  detail: string;
}

export const safetyChecks: SafetyCheck[] = [
  { parameter: 'Aflatoxin B1', threshold: '< 10 ppb (µg/kg)', status: 'PASS', tag: 'Published', detail: 'FSSR 2011 contamination regs; groundnut-specific critical control point' },
  { parameter: 'Total Aflatoxins (B1+B2+G1+G2)', threshold: '< 15 ppb', status: 'COMPLIANT', tag: 'Published', detail: 'Aggregate mycotoxin ceiling per FSSAI' },
  { parameter: 'Glucosinolate Residue', threshold: '< 30 µmol/g', status: 'COMPLIANT', tag: 'Assumed/Synthetic', detail: 'Mustard-specific; post-process verification required' },
  { parameter: 'Lead (Pb)', threshold: '< 0.5 ppm', status: 'SAFE', tag: 'Published', detail: 'Heavy metal per FSSR 2.3.1' },
  { parameter: 'Arsenic (As)', threshold: '< 1.1 ppm', status: 'SAFE', tag: 'Published', detail: 'Heavy metal per FSSR 2.3.1' },
  { parameter: 'Cadmium (Cd)', threshold: '< 1.0 ppm', status: 'SAFE', tag: 'Published', detail: 'Heavy metal per FSSR 2.3.1' },
  { parameter: 'Pesticide Residue', threshold: 'Within MRL per FSSAI', status: 'CONDITIONAL', tag: 'Published', detail: 'Batch-dependent; NABL-accredited lab verification' },
  { parameter: 'Phytate Safety Threshold', threshold: '< 10 mg/g in isolate', status: 'CONDITIONAL', tag: 'Assumed/Synthetic', detail: 'Antinutrient safety for food-grade use' },
];

// ── Roadmap ──

export interface RoadmapMilestone {
  month: string;
  title: string;
  subtitle: string;
  budget: number;
  deliverables: string[];
  icon: string;
}

export const roadmap: RoadmapMilestone[] = [
  { month: 'Month 1–2', title: 'NIFTEM-K Lab Scale Validation', subtitle: 'Proof-of-concept bioprocess on 2 kg pilot batches', budget: 8, icon: 'FlaskConical',
    deliverables: ['Proximate + antinutrient characterization (AOAC methods)', 'Enzymatic debittering + UF optimization via RSM (Box-Behnken)', 'Protein isolate ≥75% purity, IVPD ≥75%, sensory panel n=30', 'Shelf-life accelerated study kickoff (37°C / 75% RH)'] },
  { month: 'Month 3–4', title: 'FSSAI Dossier & Pilot Unit', subtitle: 'Regulatory submission + 50 kg/day pilot commissioning', budget: 11, icon: 'FileCheck2',
    deliverables: ['FSSAI Cat 12.8 proprietary food dossier filed', 'Heavy metal + aflatoxin + pesticide lab reports (NABL-accredited)', '50 kg/day pilot unit: SC-CO₂ + UF + spray dryer', 'Mass balance closed; yield ≥65% of crude protein'] },
  { month: 'Month 5–6', title: 'B2B Off-take with Indian Food Brands', subtitle: 'Commercial samples + offtake LOIs with 3 brands', budget: 6, icon: 'Handshake',
    deliverables: ['Samples to 3 Indian food brands (beverage/alt-meat/nutrition)', 'Hedonic sensory ≥7/10 vs pea-protein control', 'LOI for ≥2 T/month off-take at ₹140–160/kg', 'Series-A deck + cost model validated at pilot scale'] },
];

export const TOTAL_BUDGET = 25;

// ── References ──

export interface Reference {
  title: string; source: string; type: string; year: string; url: string;
}

export const references: Reference[] = [
  { title: 'Indian Food Composition Tables 2017 (IFCT)', source: 'NIN / ICMR', type: 'National database', year: '2017', url: 'https://www.nin.res.in' },
  { title: 'USDA FoodData Central', source: 'USDA ARS', type: 'Government database', year: '2024', url: 'https://fdc.nal.usda.gov' },
  { title: 'AGMARKNET — Mandi Prices', source: 'MoA / Directorate of Marketing', type: 'Live market data', year: '2024', url: 'https://agmarknet.gov.in' },
  { title: 'FAO/WHO 2013 Amino Acid Reference', source: 'FAO/WHO/UNU', type: 'Reference standard', year: '2013', url: 'https://www.fao.org/ag/humannutrition' },
  { title: 'FooDB — Compound & Flavor DB', source: 'FooDB.ca', type: 'Biochemistry database', year: '2024', url: 'https://foodb.ca' },
  { title: 'FSSAI Food Safety Regulations 2022', source: 'FSSAI', type: 'Regulatory', year: '2022', url: 'https://www.fssai.gov.in' },
  { title: 'Valorization of oilseed cakes: a review', source: 'Food Chemistry', type: 'Peer-reviewed', year: '2022', url: 'https://doi.org/10.1016/j.foodchem.2022.132000' },
  { title: 'Enzymatic debittering of groundnut protein', source: 'LWT — Food Science & Tech', type: 'Peer-reviewed', year: '2021', url: 'https://doi.org/10.1016/j.lwt.2021.111200' },
  { title: 'Glucosinolate degradation in mustard meal', source: 'J. Agric. Food Chem.', type: 'Peer-reviewed', year: '2020', url: 'https://doi.org/10.1021/acs.jafc.9b07123' },
  { title: 'Rice bran stabilization and protein recovery', source: 'Cereal Chemistry', type: 'Peer-reviewed', year: '2019', url: 'https://doi.org/10.1002/cche.10180' },
  { title: 'Guar meal processing and antinutrients', source: 'Food Reviews International', type: 'Review', year: '2021', url: 'https://doi.org/10.1080/87559129.2021.1900000' },
  { title: 'HESTIA LCA — Plant protein carbon data', source: 'HESTIA / Oxford', type: 'LCA database', year: '2023', url: 'https://www.hestia.earth' },
];

// ── Tooltip glossary ──

export const glossary: Record<string, string> = {
  PDCAAS: 'Protein Digestibility Corrected Amino Acid Score — a method evaluating protein quality based on human amino acid needs and digestibility. 1.0 = perfect match.',
  IVPD: 'In-Vitro Protein Digestibility — simulated digestion (pepsin/pancreatin) estimating how much protein the body can absorb. Higher % = more bioavailable.',
  EAI: 'Emulsion Activity Index — measures how well a protein stabilizes oil-in-water emulsions (m²/g). Critical for mayo, sauce, and alt-meat applications.',
  DES: 'Deep Eutectic Solvent — a green solvent made by mixing two solid compounds (e.g. choline chloride + lactic acid) that becomes liquid, replacing toxic hexane.',
  Hexanal: 'A volatile aldehyde (C6) from lipid oxidation — the #1 marker of grassy/rancid off-flavors in oilseed proteins. Enzymatic treatment breaks it down.',
  'HESTIA LCA': 'A standardized life-cycle assessment database from Oxford that quantifies environmental impact (carbon, water, land) of agricultural products per kg.',
  Glucosinolates: 'Sulfur-containing antinutrients in mustard/rapeseed that hydrolyze into pungent, goitrogenic isothiocyanates. Must be reduced below 30 µmol/g for food use.',
  Sinapine: 'A bitter choline ester of sinapic acid found in mustard meal — a primary contributor to lingering bitterness in Brassica protein isolates.',
  'Allyl Isothiocyanate': 'The pungent volatile from sinigrin hydrolysis in mustard — responsible for the sharp horseradish-like off-flavor that limits food use.',
  '2-Pentylfuran': 'A beany/nutty volatile from linoleate autoxidation — a universal off-flavor marker across legume and oilseed proteins.',
  Phytate: 'Phytic acid — the primary phosphorus storage in seeds that chelates iron, zinc, and calcium, reducing mineral bioavailability.',
  Foaming: 'Foaming Capacity (%) — how much a protein solution expands when whipped. Important for bakery, dessert, and beverage applications.',
};

// ── Economic constants ──

export const PEA_BENCHMARK = { costPerKg: 380, usdPerKg: 4.5, label: 'Imported Pea Isolate' };
