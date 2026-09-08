import { useState, useMemo } from "react";
import {
  FlaskConical,
  Fingerprint,
  Dna,
  Scale,
  Sparkles,
  Activity,
  Maximize2,
  Info,
  CheckCircle2,
  AlertTriangle,
  FileCode2,
  Cpu,
  Shield,
  Layers,
  Search,
} from "lucide-react";
import { soundEngine } from "@/lib/sound-engine";

// ==========================================
// 1. TOXICOLOGY GC-MS DATASETS (EMPIRICAL)
// ==========================================
interface ToxicCompound {
  id: string;
  name: string;
  formula: string;
  casNumber: string;
  category: string;
  retentionTime: string; // minutes on DB-5MS column
  basePeak: number; // m/z
  molecularIon: number; // m/z
  lethalThreshold: string;
  mechanism: string;
  peaks: { mz: number; abundance: number; annotation?: string }[];
  clinicalVerdict: string;
}

const TOXIC_COMPOUNDS: ToxicCompound[] = [
  {
    id: "cyanide",
    name: "Hydrogen Cyanide (HCN)",
    formula: "HCN",
    casNumber: "74-90-8",
    category: "Cellular Asphyxiant / Volatile Poison",
    retentionTime: "1.82 min",
    basePeak: 27,
    molecularIon: 27,
    lethalThreshold: "Blood [CN-] > 2.5 mg/L (Fatal)",
    mechanism:
      "Potent inhibition of ferric iron (Fe3+) in cytochrome c oxidase (Complex IV) of the mitochondrial electron transport chain, causing acute histotoxic hypoxia.",
    peaks: [
      { mz: 12, abundance: 18, annotation: "C+" },
      { mz: 13, abundance: 12, annotation: "CH+" },
      { mz: 14, abundance: 22, annotation: "N+" },
      { mz: 26, abundance: 45, annotation: "CN+" },
      { mz: 27, abundance: 100, annotation: "HCN+ (M+)" },
      { mz: 28, abundance: 8, annotation: "13C Isotope" },
    ],
    clinicalVerdict:
      "CRITICAL TOXICITY CONFIRMED: Immediate administration of Hydroxocobalamin / Sodium Thiosulfate indicated. Court-admissible mass-to-charge match confirmed under SWGTOX protocols.",
  },
  {
    id: "strychnine",
    name: "Strychnine",
    formula: "C21H22N2O2",
    casNumber: "57-24-9",
    category: "Convulsant Indole Alkaloid",
    retentionTime: "18.45 min",
    basePeak: 334,
    molecularIon: 334,
    lethalThreshold: "Oral LD50: 1.5 - 2.0 mg/kg (Human)",
    mechanism:
      "Competitive antagonism of inhibitory post-synaptic glycine receptors in spinal cord anterior horn and brainstem, precipitating uncontrollable tetanic muscular convulsions (risus sardonicus).",
    peaks: [
      { mz: 130, abundance: 42, annotation: "Indole fragment" },
      { mz: 180, abundance: 35, annotation: "Cleaved heterocyclic ring" },
      { mz: 248, abundance: 28, annotation: "Fragment loss" },
      { mz: 277, abundance: 52, annotation: "Quinoline core" },
      { mz: 334, abundance: 100, annotation: "M+ Molecular Ion" },
      { mz: 335, abundance: 24, annotation: "M+1 Carbon-13" },
    ],
    clinicalVerdict:
      "ACUTE ALKALOID POISONING: Characteristic tetanic post-mortem posture (opisthotonos). High-confidence EI-MS spectral match against NIST/EPA/NIH mass spectral library.",
  },
  {
    id: "methamphetamine",
    name: "Methamphetamine (S-Enantiomer)",
    formula: "C10H15N",
    casNumber: "537-46-2",
    category: "Schedule II Central Nervous Stimulant",
    retentionTime: "6.24 min",
    basePeak: 58,
    molecularIon: 149,
    lethalThreshold: "Blood Concentration > 1.0 - 5.0 mg/L",
    mechanism:
      "Inversion of dopamine active transporter (DAT) and VMAT-2 transport directionality, releasing massive supraphysiological dopamine, norepinephrine, and serotonin efflux into synaptic clefts.",
    peaks: [
      { mz: 42, abundance: 20, annotation: "Alkene cleavage" },
      { mz: 58, abundance: 100, annotation: "CH2=NH-CH3+ (Base Peak)" },
      { mz: 65, abundance: 18, annotation: "Cyclopentadienyl" },
      { mz: 91, abundance: 68, annotation: "Tropylium ion (C7H7+)" },
      { mz: 134, abundance: 14, annotation: "M - CH3" },
      { mz: 148, abundance: 18, annotation: "M - H" },
      { mz: 149, abundance: 12, annotation: "M+ Molecular Ion" },
    ],
    clinicalVerdict:
      "PSYCHOACTIVE SUBSTANCE IDENTIFIED: Base peak 58 m/z with 91 m/z tropylium corroboration confirms methamphetamine hydrochloride ingestion. Chain of custody sealed.",
  },
  {
    id: "organophosphate",
    name: "Parathion (Organophosphate)",
    formula: "C10H14NO5PS",
    casNumber: "56-38-2",
    category: "Cholinesterase Inhibitor / Agricultural Toxin",
    retentionTime: "14.12 min",
    basePeak: 109,
    molecularIon: 291,
    lethalThreshold: "Dermal/Oral LD50: 2 - 30 mg/kg",
    mechanism:
      "Irreversible organophosphorylation of serine hydroxyl group at the catalytic triad of acetylcholinesterase (AChE), leading to lethal muscarinic and nicotinic cholinergic crisis.",
    peaks: [
      { mz: 81, abundance: 32, annotation: "Phosphoryl fragment" },
      { mz: 97, abundance: 45, annotation: "Thiophosphate core" },
      { mz: 109, abundance: 100, annotation: "Base Peak (C2H5O)2P+" },
      { mz: 137, abundance: 58, annotation: "Phenolic cleavage" },
      { mz: 153, abundance: 40, annotation: "Oxidized analog" },
      { mz: 291, abundance: 35, annotation: "M+ Molecular Ion" },
    ],
    clinicalVerdict:
      "CHOLINERGIC CRISIS POISONING: Rapid pseudo-cholinesterase depression. Evidence validated via solid-phase extraction (SPE) and GC-MS thermal fragmentation.",
  },
  {
    id: "napqi",
    name: "NAPQI (Acetaminophen Toxic Metabolite)",
    formula: "C8H7NO2",
    casNumber: "50700-49-7",
    category: "Hepatotoxic Electrophilic Quinone",
    retentionTime: "8.75 min",
    basePeak: 107,
    molecularIon: 149,
    lethalThreshold: "Acute dose > 150 mg/kg without N-acetylcysteine",
    mechanism:
      "Depletion of endogenous hepatic glutathione (GSH) reserves followed by covalent bonding of electrophilic NAPQI to vital cysteine residues on hepatocyte mitochondrial proteins, causing centrilobular necrosis.",
    peaks: [
      { mz: 53, abundance: 22, annotation: "Ring fragment" },
      { mz: 79, abundance: 48, annotation: "Pyridyl-like cleavage" },
      { mz: 107, abundance: 100, annotation: "C7H7O+ (Base Peak)" },
      { mz: 121, abundance: 35, annotation: "M - CO" },
      { mz: 149, abundance: 65, annotation: "M+ Molecular Ion" },
    ],
    clinicalVerdict:
      "FULMINANT HEPATOTOXIC RESIDUE DETECTED: Demonstrates overdose-induced glutathione exhaustion. Mass spectral confirmation validates metabolic biotransformation pathways.",
  },
];

// ==========================================
// 2. DACTYLOSCOPY MINUTIAE MAPPING DATA
// ==========================================
interface MinutiaPoint {
  id: string;
  type: "Bifurcation" | "Ridge Ending" | "Island / Dot" | "Core Point";
  x: number; // percentage in SVG
  y: number;
  angle: number; // degrees orientation
  color: string;
  description: string;
}

const MINUTIAE_POINTS: MinutiaPoint[] = [
  { id: "MP-01", type: "Core Point", x: 50, y: 44, angle: 0, color: "#F6C85F", description: "Central focal point of loop pattern curvature" },
  { id: "MP-02", type: "Bifurcation", x: 38, y: 32, angle: 45, color: "#62E6FF", description: "Single ridge dividing into two distinct branch paths" },
  { id: "MP-03", type: "Ridge Ending", x: 62, y: 36, angle: 125, color: "#6EE7B7", description: "Abrupt termination of an epidermal friction ridge" },
  { id: "MP-04", type: "Bifurcation", x: 44, y: 58, angle: 210, color: "#62E6FF", description: "Y-shaped divergence in basilar ridge flow" },
  { id: "MP-05", type: "Island / Dot", x: 58, y: 54, angle: 0, color: "#9B8CFF", description: "Isolated friction ridge unit shorter than its width" },
  { id: "MP-06", type: "Ridge Ending", x: 32, y: 48, angle: 90, color: "#6EE7B7", description: "Lateral margin termination of recurrent friction ridge" },
  { id: "MP-07", type: "Bifurcation", x: 66, y: 64, angle: 315, color: "#62E6FF", description: "Inferior marginal ridge branching toward delta zone" },
  { id: "MP-08", type: "Ridge Ending", x: 48, y: 72, angle: 180, color: "#6EE7B7", description: "Basal ridge termination above flexion crease" },
];

// ==========================================
// 3. PHYSICAL FORENSICS TO TECH BRIDGE
// ==========================================
const BRIDGE_MAPPINGS = [
  {
    forensicDomain: "Locard's Exchange Principle",
    physicalReality: "Every contact leaves a microscopic trace — biological cells, latent friction ridges, transfer fibers.",
    digitalCounterpart: "Deterministic Event Sourcing & eBPF Telemetry",
    techApplication: "Every kernel syscall, network packet, and memory allocation leaves an audit-grade cryptographic log.",
    accent: "#62E6FF",
    icon: Search,
  },
  {
    forensicDomain: "Toxicology (GC-MS Mass Spectra)",
    physicalReality: "Retention times (Rt) and m/z fragmentation peaks isolate toxic molecules in complex biological matrices.",
    digitalCounterpart: "High-Dimensional Vector Embeddings & RAG",
    techApplication: "Latent cosine distance clustering isolates anomalous prompt injections, security escapes, and malware vectors.",
    accent: "#62E6FF",
    icon: FlaskConical,
  },
  {
    forensicDomain: "Dactyloscopy (Ridge Minutiae)",
    physicalReality: "Galton points [x, y, θ] provide mathematical individualization invariant across human lifetimes.",
    digitalCounterpart: "Ed25519 Cryptography & Zero-Knowledge Proofs",
    techApplication: "Mathematical determinism proving identity and data integrity without exposing raw private secrets.",
    accent: "#6EE7B7",
    icon: Fingerprint,
  },
  {
    forensicDomain: "Bloodstain Pattern Analysis (BPA)",
    physicalReality: "Trigonometric droplet geometry (sin θ = W/L) calculates trajectory vectors to pinpoint a 3D origin in space.",
    digitalCounterpart: "NetFlow & DDoS Command-and-Control Triangulation",
    techApplication: "Analyzing packet TTL attenuation and BGP routing hops to trace distributed cyber attacks to root infrastructure.",
    accent: "#9B8CFF",
    icon: Dna,
  },
  {
    forensicDomain: "Questioned Documents (ESDA Indentations)",
    physicalReality: "Electrostatic imaging reveals hidden impressions pressed across multiple underlying paper sheets.",
    digitalCounterpart: "File System Carving ($MFT / USN / WAL)",
    techApplication: "Extracting orphaned file records from unallocated disk clusters and reconstructing deleted SQLite transaction journals.",
    accent: "#F6C85F",
    icon: Layers,
  },
  {
    forensicDomain: "Forensic Ballistics (Rifling Striations)",
    physicalReality: "Microscopic machining imperfections on gun barrels transfer unique striations to fired projectiles.",
    digitalCounterpart: "Binary Disassembly & Opcode Pattern Attribution",
    techApplication: "Control Flow Graph (CFG) matching and compiler artifact analysis uniquely attribute malware binaries to specific APT groups.",
    accent: "#FF7070",
    icon: Cpu,
  },
];

export function ForensicLabSimulator() {
  const [activeTab, setActiveTab] = useState<"toxicology" | "dactyloscopy" | "bpa" | "bridge">("toxicology");
  const [selectedCompoundId, setSelectedCompoundId] = useState<string>("cyanide");
  const [selectedMinutia, setSelectedMinutia] = useState<MinutiaPoint | null>(MINUTIAE_POINTS[0]);

  // BPA Calculator State
  const [spatterWidth, setSpatterWidth] = useState<number>(6.0); // mm
  const [spatterLength, setSpatterLength] = useState<number>(12.0); // mm

  const currentCompound =
    TOXIC_COMPOUNDS.find((c) => c.id === selectedCompoundId) || TOXIC_COMPOUNDS[0];

  // BPA calculation: theta = arcsin(W / L)
  const bpaAngle = useMemo(() => {
    if (spatterLength <= 0 || spatterWidth > spatterLength) return 90;
    const ratio = Math.min(1, spatterWidth / spatterLength);
    return Math.round((Math.asin(ratio) * 180) / Math.PI * 10) / 10;
  }, [spatterWidth, spatterLength]);

  const bpaVelocityClass = useMemo(() => {
    if (spatterWidth < 2) return { label: "High-Velocity Spatter", desc: "Mist-like spatter (< 2mm), typical of high-speed gunshot or explosive impact (> 100 ft/sec)." };
    if (spatterWidth <= 6) return { label: "Medium-Velocity Spatter", desc: "Medium droplets (2–6mm), typical of blunt-force trauma or sharp-instrument force (5–25 ft/sec)." };
    return { label: "Low-Velocity Gravitational Drop", desc: "Large droplets (> 6mm), passive dripping under natural gravity (< 5 ft/sec)." };
  }, [spatterWidth]);

  return (
    <div className="rounded-3xl border border-white/15 bg-[#0A0D12] p-6 sm:p-10 shadow-2xl overflow-hidden space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#62E6FF] font-semibold mb-1">
            <Activity className="size-3.5" />
            <span>INTERACTIVE LABORATORY SUITE // LIVE SIMULATION</span>
          </div>
          <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-foreground">
            Forensic Investigation &amp; Empirical Analysis Lab
          </h3>
          <p className="font-sans text-xs sm:text-sm text-muted-foreground mt-1 max-w-2xl">
            Explore live scientific instruments: analyze GC-MS mass spectrometry peaks, map biometric friction ridge minutiae, compute trigonometric bloodstain impact angles, and inspect the physical-to-digital technology bridge.
          </p>
        </div>

        {/* Lab Mode Selector Chips */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          {[
            { id: "toxicology", label: "GC-MS Toxicology", icon: FlaskConical },
            { id: "dactyloscopy", label: "Dactyloscopy Minutiae", icon: Fingerprint },
            { id: "bpa", label: "BPA Trigonometry", icon: Dna },
            { id: "bridge", label: "Physical &rarr; Digital Bridge", icon: Sparkles },
          ].map((mode) => {
            const Icon = mode.icon;
            const isActive = activeTab === mode.id;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setActiveTab(mode.id as any);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg border uppercase tracking-wider text-[11px] font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "border-[#62E6FF] bg-[#62E6FF]/15 text-[#62E6FF] shadow-[0_0_15px_rgba(98,230,255,0.2)]"
                    : "border-white/10 bg-white/[0.02] text-muted-foreground hover:text-foreground hover:border-white/20"
                }`}
              >
                <Icon className="size-3.5" />
                <span dangerouslySetInnerHTML={{ __html: mode.label }} />
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================== */}
      {/* 1. TOXICOLOGY GC-MS SIMULATOR */}
      {/* ========================================== */}
      {activeTab === "toxicology" && (
        <div className="space-y-6">
          {/* Compound Selector Strip */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground shrink-0 mr-2">
              TARGET TOXIN:
            </span>
            {TOXIC_COMPOUNDS.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setSelectedCompoundId(c.id);
                }}
                className={`px-3 py-1.5 rounded-md border font-mono text-xs whitespace-nowrap transition-all cursor-pointer ${
                  selectedCompoundId === c.id
                    ? "border-[#62E6FF] bg-[#62E6FF]/20 text-[#62E6FF] font-bold"
                    : "border-white/10 bg-white/[0.02] text-muted-foreground hover:text-foreground"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Mass Spectrogram Visualizer (7 cols) */}
            <div className="lg:col-span-7 p-6 rounded-2xl border border-white/10 bg-[#050608] space-y-4">
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span className="text-[#62E6FF] font-bold flex items-center gap-1.5">
                  <Activity className="size-3.5 text-[#62E6FF]" />
                  ELECTRON IONIZATION MASS SPECTRUM (EI-MS, 70 eV)
                </span>
                <span className="text-muted-foreground">
                  RETENTION TIME: <strong className="text-foreground">{currentCompound.retentionTime}</strong>
                </span>
              </div>

              {/* Calibrated SVG Spectrogram Canvas */}
              <div className="relative h-64 w-full rounded-xl bg-[#0A0D12] border border-white/5 p-4 flex flex-col justify-between overflow-hidden">
                {/* Horizontal Grid lines */}
                <div className="absolute inset-0 grid grid-rows-4 opacity-10 pointer-events-none">
                  <div className="border-b border-white" />
                  <div className="border-b border-white" />
                  <div className="border-b border-white" />
                  <div className="border-b border-white" />
                </div>

                {/* Peaks Rendering */}
                <div className="relative size-full flex items-end justify-between px-6 pt-6 pb-4">
                  {currentCompound.peaks.map((p, idx) => (
                    <div
                      key={idx}
                      className="group/peak relative flex flex-col items-center h-full justify-end"
                      style={{ width: `${100 / currentCompound.peaks.length}%` }}
                    >
                      {/* Peak tooltip */}
                      <div className="opacity-0 group-hover/peak:opacity-100 transition-opacity absolute -top-8 px-2 py-0.5 rounded bg-[#050608] border border-[#62E6FF]/40 font-mono text-[10px] text-[#62E6FF] whitespace-nowrap z-20 pointer-events-none shadow-lg">
                        m/z {p.mz} · {p.abundance}% {p.annotation ? `(${p.annotation})` : ""}
                      </div>

                      {/* Top Label */}
                      <span className="font-mono text-[10px] text-muted-foreground/80 mb-1 group-hover/peak:text-[#62E6FF] transition-colors">
                        {p.mz}
                      </span>

                      {/* Vertical Spike */}
                      <div
                        className={`w-2.5 sm:w-3.5 rounded-t-sm transition-all duration-500 group-hover/peak:brightness-125 ${
                          p.abundance === 100
                            ? "bg-gradient-to-t from-[#62E6FF]/30 to-[#62E6FF] shadow-[0_0_12px_rgba(98,230,255,0.6)]"
                            : "bg-gradient-to-t from-[#9B8CFF]/20 to-[#9B8CFF]/80"
                        }`}
                        style={{ height: `${p.abundance}%` }}
                      />
                    </div>
                  ))}
                </div>

                {/* Axis Labels */}
                <div className="flex items-center justify-between border-t border-white/10 pt-2 font-mono text-[10px] text-muted-foreground">
                  <span>0 m/z</span>
                  <span className="text-foreground/70">MASS-TO-CHARGE RATIO (m/z) &rarr;</span>
                  <span>{Math.max(...currentCompound.peaks.map((p) => p.mz)) + 20} m/z</span>
                </div>
              </div>

              {/* Chemical Specs Quick Bar */}
              <div className="grid grid-cols-3 gap-2 font-mono text-[11px] text-muted-foreground pt-1">
                <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] block text-muted-foreground/70">BASE PEAK (100%):</span>
                  <span className="text-[#62E6FF] font-bold text-xs">{currentCompound.basePeak} m/z</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] block text-muted-foreground/70">MOLECULAR ION (M+):</span>
                  <span className="text-[#9B8CFF] font-bold text-xs">{currentCompound.molecularIon} m/z</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] block text-muted-foreground/70">CAS REGISTRY:</span>
                  <span className="text-foreground font-semibold text-xs">{currentCompound.casNumber}</span>
                </div>
              </div>
            </div>

            {/* Right: Toxicological & Pharmacological Analysis (5 cols) */}
            <div className="lg:col-span-5 p-6 rounded-2xl border border-white/10 bg-[#0A0D12] space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#F6C85F] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-[#F6C85F]/10 border border-[#F6C85F]/20">
                    {currentCompound.category}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">{currentCompound.formula}</span>
                </div>

                <h4 className="font-display font-bold text-xl text-foreground">
                  {currentCompound.name}
                </h4>

                <div className="space-y-1.5 font-sans text-xs">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#FF7070] font-bold block">
                    LETHAL TOXIC THRESHOLD:
                  </span>
                  <p className="p-2.5 rounded-lg bg-[#FF7070]/10 border border-[#FF7070]/20 text-[#FF7070] font-mono text-xs">
                    {currentCompound.lethalThreshold}
                  </p>
                </div>

                <div className="space-y-1 font-sans text-xs text-muted-foreground">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#62E6FF] font-bold block">
                    BIOCHEMICAL MECHANISM:
                  </span>
                  <p className="leading-relaxed text-foreground/80">
                    {currentCompound.mechanism}
                  </p>
                </div>
              </div>

              {/* Expert Toxicological Verdict Box */}
              <div className="pt-3 border-t border-white/10 space-y-1.5">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#6EE7B7] flex items-center gap-1 font-bold">
                  <CheckCircle2 className="size-3 text-[#6EE7B7]" />
                  COURT-ADMISSIBLE VERDICT
                </span>
                <p className="font-sans text-xs text-muted-foreground bg-white/[0.02] p-3 rounded-lg border border-white/5 leading-relaxed">
                  {currentCompound.clinicalVerdict}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 2. DACTYLOSCOPY BIOMETRIC MINUTIAE MAPPER */}
      {/* ========================================== */}
      {activeTab === "dactyloscopy" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Fingerprint Canvas with Interactive Minutiae Markers (6 cols) */}
          <div className="lg:col-span-6 p-6 rounded-2xl border border-white/10 bg-[#050608] space-y-4">
            <div className="flex items-center justify-between font-mono text-xs text-[#6EE7B7]">
              <span className="font-bold flex items-center gap-1.5">
                <Fingerprint className="size-4" />
                FRICTION RIDGE MINUTIAE EXTRACTION
              </span>
              <span className="text-[10px] text-muted-foreground">ACE-V PROTOCOL</span>
            </div>

            {/* Stylized Fingerprint Vector with Clickable Minutiae Dots */}
            <div className="relative h-80 w-full rounded-xl bg-[#0A0D12] border border-white/5 flex items-center justify-center overflow-hidden">
              {/* Subtle Concentric Fingerprint Loop Waves */}
              <svg className="absolute inset-0 size-full stroke-white/10 fill-none" viewBox="0 0 400 400">
                <path d="M 200,60 C 130,60 100,120 100,200 C 100,280 140,340 200,340 C 260,340 300,280 300,200 C 300,120 270,60 200,60" strokeWidth="2" strokeDasharray="6 3" />
                <path d="M 200,90 C 150,90 125,140 125,200 C 125,260 155,310 200,310 C 245,310 275,260 275,200 C 275,140 250,90 200,90" strokeWidth="2" />
                <path d="M 200,120 C 165,120 145,155 145,200 C 145,245 170,280 200,280 C 230,280 255,245 255,200 C 255,155 235,120 200,120" strokeWidth="2" strokeDasharray="4 2" />
                <path d="M 200,150 C 180,150 165,170 165,200 C 165,230 180,250 200,250 C 220,250 235,230 235,200 C 235,170 220,150 200,150" strokeWidth="2" />
                <path d="M 200,175 C 190,175 180,185 180,200 C 180,215 190,225 200,225 C 210,225 220,215 220,200 C 220,185 210,175 200,175" strokeWidth="2" />
              </svg>

              {/* Overlay Minutiae Coordinates */}
              {MINUTIAE_POINTS.map((m) => {
                const isSelected = selectedMinutia?.id === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      soundEngine.playClick();
                      setSelectedMinutia(m);
                    }}
                    style={{ left: `${m.x}%`, top: `${m.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 size-7 rounded-full flex items-center justify-center transition-all cursor-pointer z-10 ${
                      isSelected
                        ? "ring-4 ring-[#62E6FF] scale-125 bg-[#050608]"
                        : "bg-[#050608]/80 hover:scale-110 border border-white/20"
                    }`}
                    title={`${m.id}: ${m.type}`}
                  >
                    <span
                      className="size-2.5 rounded-full"
                      style={{ backgroundColor: m.color }}
                    />
                  </button>
                );
              })}

              <div className="absolute bottom-3 left-3 px-2 py-1 rounded bg-[#050608]/90 border border-white/10 font-mono text-[9px] text-[#6EE7B7]">
                GALTON POINTS MATCH: 8 / 8 IDENTIFIED
              </div>
            </div>

            <p className="font-sans text-xs text-muted-foreground">
              Click any marked point above to inspect its spatial coordinate vector, ridge orientation angle, and morphological classification under ISO/IEC 19794-2.
            </p>
          </div>

          {/* Right: Minutiae Telemetry & Individualization Analysis (6 cols) */}
          <div className="lg:col-span-6 p-6 rounded-2xl border border-white/10 bg-[#0A0D12] space-y-5">
            {selectedMinutia ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span
                      className="size-3 rounded-full"
                      style={{ backgroundColor: selectedMinutia.color }}
                    />
                    <span className="font-mono text-sm font-bold text-foreground">
                      FEATURE: {selectedMinutia.id}
                    </span>
                  </div>
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#62E6FF] font-semibold">
                    {selectedMinutia.type}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-muted-foreground text-[10px] block">X-COORDINATE</span>
                    <span className="text-foreground font-bold text-sm">{selectedMinutia.x * 4} px</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-muted-foreground text-[10px] block">Y-COORDINATE</span>
                    <span className="text-foreground font-bold text-sm">{selectedMinutia.y * 4} px</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-muted-foreground text-[10px] block">RIDGE ANGLE (θ)</span>
                    <span className="text-[#6EE7B7] font-bold text-sm">{selectedMinutia.angle}&deg;</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] space-y-1">
                  <span className="font-mono text-[10px] text-[#F6C85F] uppercase tracking-wider font-bold">
                    MORPHOLOGICAL CHARACTERISTICS:
                  </span>
                  <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                    {selectedMinutia.description}
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-[#6EE7B7]/20 bg-[#6EE7B7]/5 space-y-1.5 font-sans text-xs">
                  <span className="font-mono text-[10px] text-[#6EE7B7] font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-[#6EE7B7]" />
                    INDIVIDUALIZATION RELIABILITY
                  </span>
                  <p className="text-foreground/90 leading-relaxed">
                    Under Sir Francis Galton’s biometric probability formulation, the odds of two individuals possessing 8 identical minutiae with matching coordinate orientation is less than <strong>1 in 64 Billion</strong>.
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-muted-foreground font-mono text-xs">
                Select a minutiae point on the fingerprint to view telemetry.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 3. BPA TRIGONOMETRIC IMPACT ANGLE LAB */}
      {/* ========================================== */}
      {activeTab === "bpa" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Interactive Controls & Geometric Preview (7 cols) */}
          <div className="lg:col-span-7 p-6 rounded-2xl border border-white/10 bg-[#050608] space-y-6">
            <div className="flex items-center justify-between font-mono text-xs text-[#9B8CFF]">
              <span className="font-bold flex items-center gap-1.5">
                <Dna className="size-4" />
                BLOODSTAIN PATTERN ANALYSIS (BPA) // IMPACT ANGLE CALCULATION
              </span>
              <span className="text-[10px] text-muted-foreground">sin &theta; = W / L</span>
            </div>

            {/* Geometry Canvas */}
            <div className="h-48 w-full rounded-xl bg-[#0A0D12] border border-white/5 flex items-center justify-around p-6">
              {/* Ellipse Projection */}
              <div className="flex flex-col items-center gap-2">
                <div
                  className="rounded-full bg-gradient-to-r from-[#FF7070] to-[#FF7070]/60 border border-[#FF7070] transition-all duration-300 shadow-[0_0_15px_rgba(255,112,112,0.4)]"
                  style={{
                    width: `${spatterLength * 3.5}px`,
                    height: `${spatterWidth * 3.5}px`,
                    transform: `rotate(-${bpaAngle / 2}deg)`,
                  }}
                />
                <span className="font-mono text-[10px] text-muted-foreground">
                  SIMULATED ELLIPSE (W: {spatterWidth}mm, L: {spatterLength}mm)
                </span>
              </div>

              {/* Angle Readout Gauge */}
              <div className="text-center p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider block">
                  CALCULATED IMPACT ANGLE (&theta;)
                </span>
                <span className="font-display font-extrabold text-4xl sm:text-5xl text-[#62E6FF] block mt-1">
                  {bpaAngle}&deg;
                </span>
                <span className="font-mono text-[9px] text-[#6EE7B7] block mt-1">
                  sin({bpaAngle}&deg;) &approx; {(spatterWidth / spatterLength).toFixed(3)}
                </span>
              </div>
            </div>

            {/* Interactive Sliders */}
            <div className="space-y-4 font-mono text-xs">
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">STAIN WIDTH (W):</span>
                  <span className="text-[#62E6FF] font-bold">{spatterWidth} mm</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max={spatterLength}
                  step="0.5"
                  value={spatterWidth}
                  onChange={(e) => setSpatterWidth(parseFloat(e.target.value))}
                  className="w-full accent-[#62E6FF] cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">STAIN LENGTH (L):</span>
                  <span className="text-[#9B8CFF] font-bold">{spatterLength} mm</span>
                </div>
                <input
                  type="range"
                  min="5.0"
                  max="30.0"
                  step="0.5"
                  value={spatterLength}
                  onChange={(e) => {
                    const l = parseFloat(e.target.value);
                    setSpatterLength(l);
                    if (spatterWidth > l) setSpatterWidth(l);
                  }}
                  className="w-full accent-[#9B8CFF] cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Right: Forensic Physics & 3D Reconstruction Analysis (5 cols) */}
          <div className="lg:col-span-5 p-6 rounded-2xl border border-white/10 bg-[#0A0D12] space-y-4">
            <h4 className="font-display font-bold text-lg text-foreground">
              Mathematical Physics of Spatter Dynamics
            </h4>

            <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] space-y-1 font-sans text-xs">
              <span className="font-mono text-[10px] text-[#62E6FF] font-bold uppercase tracking-widest">
                VELOCITY CATEGORY:
              </span>
              <p className="font-semibold text-foreground text-sm">{bpaVelocityClass.label}</p>
              <p className="text-muted-foreground leading-relaxed mt-1">{bpaVelocityClass.desc}</p>
            </div>

            <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] space-y-2 font-sans text-xs text-muted-foreground">
              <span className="font-mono text-[10px] text-[#F6C85F] font-bold uppercase tracking-widest block">
                3D POINT OF ORIGIN RECONSTRUCTION:
              </span>
              <p className="leading-relaxed">
                By triangulating the impact angle (&theta;) of 5 or more distinct stains across a room using trigonometric tangents ($Z = D \times \tan\theta$), forensic investigators can establish the exact 3D spatial coordinate ($X, Y, Z$) of the victim's wound in cubic space at the instant of impact.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 4. PHYSICAL FORENSICS TO TECH BRIDGE */}
      {/* ========================================== */}
      {activeTab === "bridge" && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-[#62E6FF]/30 bg-gradient-to-r from-[#62E6FF]/10 to-transparent">
            <h4 className="font-display font-bold text-xl text-foreground">
              The Conceptual &amp; Mathematical Bridge: From Physical Crime Labs to Digital Systems
            </h4>
            <p className="font-sans text-xs sm:text-sm text-muted-foreground mt-1 max-w-3xl leading-relaxed">
              Forensic science is not a separate realm from software engineering and cybersecurity — it is its direct philosophical parent. Here is how physical laboratory principles translate directly into the architecture of modern AI, zero-trust infrastructure, and systems engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {BRIDGE_MAPPINGS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="size-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                        <Icon className="size-4.5" style={{ color: item.accent }} />
                      </div>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                        PARADIGM 0{idx + 1}
                      </span>
                    </div>

                    <h5 className="font-display font-bold text-base text-foreground">
                      {item.forensicDomain}
                    </h5>

                    <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                      <strong className="text-foreground/80 block mb-0.5">Physical Reality:</strong>
                      {item.physicalReality}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 space-y-1">
                    <span
                      className="font-mono text-[10px] font-bold uppercase tracking-wider block"
                      style={{ color: item.accent }}
                    >
                      &rarr; {item.digitalCounterpart}
                    </span>
                    <p className="font-sans text-xs text-foreground/90 leading-relaxed">
                      {item.techApplication}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
