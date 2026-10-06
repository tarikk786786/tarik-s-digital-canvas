import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  PhoneCall,
  AlertTriangle,
  Search,
  ShieldAlert,
  Info,
  Pill,
  Sparkles,
  ExternalLink,
  Flame,
  CheckCircle2,
  AlertCircle,
  Activity,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import {
  TOXIC_SUBSTANCES,
  INCOMPATIBLE_HOUSEHOLD_MIXES,
  INDIA_POISON_CENTRES,
  ANTIDOTE_DATABASE,
  TOXIDROME_PATTERNS,
  searchToxicSubstances,
  type ToxicSubstance,
  type SubstanceCategory,
  type IncompatibleMixingHazard,
  type AntidoteRecord,
  type ToxidromePattern,
} from "@/lib/toxicology/toxicology-engine";
import { soundEngine } from "@/lib/sound-engine";

const CATEGORIES: { id: "All" | SubstanceCategory; label: string }[] = [
  { id: "All", label: "All Compounds" },
  { id: "Household Chemical", label: "Household & Cleaners" },
  { id: "Agricultural Chemical", label: "Agricultural & Pesticides" },
  { id: "Medicine / Pharmaceutical", label: "Pharmaceuticals" },
  { id: "Toxic Gas", label: "Gases & Inhalants" },
  { id: "Heavy Metal", label: "Heavy Metals" },
  { id: "Venom / Envenomation", label: "Venoms & Envenomation" },
];

const GENERAL_FIRST_AID = [
  {
    exposureRoute: "Inhaled Poison / Gas",
    action: "Immediately get victim into open fresh air. Loosen tight collar. Avoid breathing fumes yourself.",
    caution: "Do NOT enter confined fume-filled room without breathing apparatus.",
  },
  {
    exposureRoute: "Skin / Chemical Splash",
    action: "Remove contaminated clothing immediately. Flush exposed skin with abundant flowing tap water for 15-20 minutes.",
    caution: "Do NOT apply neutralizing household chemicals, creams, or oils to chemical burns.",
  },
  {
    exposureRoute: "Eye Contact",
    action: "Gently flush eye with room-temperature water or saline for 15-20 minutes holding eyelids open. Remove contact lenses.",
    caution: "Do NOT force eyes shut or rub vigorously.",
  },
  {
    exposureRoute: "Ingested Poison",
    action: "Rinse mouth. Keep patient calm in recovery position if conscious. Call AIIMS NPIC (1800-116-117) or emergency 112.",
    caution: "NEVER induce vomiting unless explicitly directed by a poison control toxicologist. Do not give raw milk or oil.",
  },
  {
    exposureRoute: "Snake / Scorpion Envenomation",
    action: "Immobilize the bitten limb at heart level. Reassure victim. Transport immediately to an ASV-equipped hospital.",
    caution: "Do NOT cut the wound, suck venom, apply tourniquets, or apply ice/potassium permanganate.",
  },
];

export function ToxicologySafetyModule() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"All" | SubstanceCategory>("All");
  const [selectedSubstance, setSelectedSubstance] = useState<ToxicSubstance | null>(
    TOXIC_SUBSTANCES[0] ?? null
  );
  const [activeTab, setActiveTab] = useState<"database" | "incompatibilities" | "antidotes" | "toxidromes" | "firstaid">("database");

  const filteredSubstances = searchToxicSubstances(searchQuery, selectedCategory);

  return (
    <div className="min-h-screen bg-[#050608] text-foreground selection:bg-[#62E6FF]/20 selection:text-[#62E6FF]">
      {/* Top emergency hotline bar */}
      <div className="border-b border-red-500/30 bg-gradient-to-r from-red-950/40 via-red-900/20 to-red-950/40 px-4 py-3">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-red-300">
            <ShieldAlert className="size-4 shrink-0 text-red-400 animate-pulse" />
            <span className="font-semibold tracking-wide">
              MEDICAL EMERGENCY / SUSPECTED POISONING?
            </span>
            <span className="hidden sm:inline text-white/70">
              Immediate professional toxicology assistance:
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="tel:1800116117"
              className="inline-flex items-center gap-1.5 rounded-full border border-red-500/50 bg-red-600/30 px-3 py-1 font-mono text-xs font-bold text-red-200 transition-all hover:bg-red-600/50"
            >
              <PhoneCall className="size-3 text-red-300" />
              AIIMS NPIC (India 24/7): 1800-116-117
            </a>
            <a
              href="tel:112"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-2.5 py-1 font-mono text-xs text-white/90 hover:bg-white/10"
            >
              National Emergency: 112
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="border-b border-white/10 bg-[#07090E]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#62E6FF] uppercase">
              <span className="inline-block size-2 rounded-full bg-[#62E6FF] animate-ping" />
              Division 04 · Scientific & Chemical Safety
            </div>
            <h1 className="mt-2 text-2xl sm:text-3xl font-display font-extrabold tracking-tight">
              Toxicology & Chemical Safety Reference
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              Harm-reduction clinical safety registry, toxidrome differentiation, incompatible household matrix & antidote directory.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/lab"
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-mono text-muted-foreground hover:text-white"
            >
              Back to Lab Hub
            </Link>
          </div>
        </div>
      </header>

      {/* Ethical Protocol Notice */}
      <div className="mx-auto max-w-7xl px-6 pt-6">
        <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4 text-xs text-amber-200/90 leading-relaxed flex items-start gap-3">
          <AlertCircle className="size-5 shrink-0 text-amber-400 mt-0.5" />
          <div>
            <span className="font-semibold text-amber-300">
              Scientific Non-Proliferation & Safety Standard:
            </span>{" "}
            This module strictly provides clinical first-aid triage, chemical hazard mitigation, antidote reference, and toxidrome recognition. It does{" "}
            <strong>NOT</strong> provide synthesis pathways, extraction methods, dose-response fatal curves, or weaponization guides. Compliant with biological and chemical safety standards.
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mx-auto max-w-7xl px-6 pt-6">
        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
          {[
            { id: "database", label: "Substance Reference (PubChem)", icon: Pill },
            { id: "incompatibilities", label: "Household 'DO NOT MIX' Matrix", icon: Flame },
            { id: "antidotes", label: "Antidote & Reversal Directory", icon: ShieldAlert },
            { id: "toxidromes", label: "Toxidromes Recognition", icon: Activity },
            { id: "firstaid", label: "Universal First Aid & Helpline", icon: PhoneCall },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundEngine.playClick();
                  setActiveTab(tab.id as typeof activeTab);
                }}
                className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-mono tracking-wider uppercase transition-all ${
                  active
                    ? "border border-[#62E6FF]/50 bg-[#62E6FF]/10 text-[#62E6FF] shadow-sm shadow-[#62E6FF]/10"
                    : "border border-white/5 bg-white/[0.02] text-muted-foreground hover:border-white/20 hover:text-white"
                }`}
              >
                <Icon className="size-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Database & Substance Inspector */}
      {activeTab === "database" && (
        <main className="mx-auto max-w-7xl px-6 py-8">
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Left Column: Filter & Substance List */}
            <div className="space-y-4 lg:col-span-5">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search substance, CAS, pesticide, generic name..."
                  className="w-full rounded-xl border border-white/10 bg-[#0A0D12] py-2.5 pl-10 pr-4 text-xs font-mono text-white placeholder-muted-foreground/60 focus:border-[#62E6FF] focus:outline-none"
                />
              </div>

              {/* Categories Pills */}
              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      soundEngine.playClick();
                      setSelectedCategory(cat.id);
                    }}
                    className={`rounded-md px-2.5 py-1 text-[11px] font-mono transition-all ${
                      selectedCategory === cat.id
                        ? "bg-[#62E6FF]/20 text-[#62E6FF] border border-[#62E6FF]/40"
                        : "bg-white/5 text-muted-foreground hover:text-white border border-transparent"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Substance List */}
              <div className="max-h-[600px] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                {filteredSubstances.length === 0 ? (
                  <div className="rounded-xl border border-white/10 bg-[#0A0D12] p-8 text-center text-xs text-muted-foreground">
                    No compounds found matching your filter criteria.
                  </div>
                ) : (
                  filteredSubstances.map((substance) => {
                    const isSelected = selectedSubstance?.id === substance.id;
                    return (
                      <button
                        key={substance.id}
                        onClick={() => {
                          soundEngine.playClick();
                          setSelectedSubstance(substance);
                        }}
                        className={`w-full text-left rounded-xl p-3.5 border transition-all ${
                          isSelected
                            ? "border-[#62E6FF]/60 bg-[#62E6FF]/10 shadow-sm shadow-[#62E6FF]/10"
                            : "border-white/5 bg-[#0A0D12] hover:border-white/20 hover:bg-[#0E1219]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-sm text-white group-hover:text-[#62E6FF]">
                            {substance.preferredName}
                          </span>
                          <span className="rounded bg-red-500/20 text-red-300 border border-red-500/30 px-1.5 py-0.5 text-[9px] font-mono uppercase font-bold">
                            {substance.hazardClass[0]?.split(" ")[0]}
                          </span>
                        </div>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground font-mono">
                          <span>{substance.category}</span>
                          {substance.casNumber && <span>· CAS: {substance.casNumber}</span>}
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground/80 line-clamp-2">
                          {substance.toxicityOverview}
                        </p>
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* Right Column: Substance Dossier */}
            <div className="lg:col-span-7">
              {selectedSubstance ? (
                <div className="rounded-2xl border border-white/10 bg-[#0A0D12] p-6 space-y-6">
                  {/* Dossier Header */}
                  <div className="border-b border-white/10 pb-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <span className="font-mono text-xs uppercase tracking-wider text-[#62E6FF]">
                          Substance Record: {selectedSubstance.id}
                        </span>
                        <h2 className="mt-1 text-2xl font-bold font-display text-white">
                          {selectedSubstance.preferredName}
                        </h2>
                      </div>
                      <div className="flex items-center gap-2">
                        {selectedSubstance.pubchemCid && (
                          <a
                            href={`https://pubchem.ncbi.nlm.nih.gov/compound/${selectedSubstance.pubchemCid}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-muted-foreground hover:text-[#62E6FF] hover:border-[#62E6FF]/30"
                          >
                            PubChem CID: {selectedSubstance.pubchemCid}
                            <ExternalLink className="size-3" />
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2 text-xs font-mono">
                      <span className="rounded bg-white/5 px-2 py-0.5 text-muted-foreground">
                        CAS: {selectedSubstance.casNumber ?? "N/A"}
                      </span>
                      <span className="rounded bg-white/5 px-2 py-0.5 text-muted-foreground">
                        Category: {selectedSubstance.category}
                      </span>
                      {selectedSubstance.formula && (
                        <span className="rounded bg-white/5 px-2 py-0.5 text-muted-foreground">
                          Formula: {selectedSubstance.formula}
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-xs text-muted-foreground">
                      Synonyms: {selectedSubstance.synonyms.join(", ")}
                    </p>
                  </div>

                  {/* Clinical Toxicity & Mechanism */}
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                    <h4 className="font-mono text-xs font-semibold uppercase text-muted-foreground tracking-wider flex items-center gap-1.5">
                      <Activity className="size-3.5 text-[#62E6FF]" />
                      Toxicity Overview
                    </h4>
                    <p className="mt-2 text-xs text-white/90 leading-relaxed">
                      {selectedSubstance.toxicityOverview}
                    </p>
                  </div>

                  {/* Symptoms & Danger Signs */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                      <h4 className="font-mono text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                        Clinical Symptoms
                      </h4>
                      <ul className="mt-2 list-disc list-inside text-xs text-zinc-300 space-y-1">
                        {selectedSubstance.symptoms.map((s, idx) => (
                          <li key={idx}>{s}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl border border-red-500/20 bg-red-950/20 p-4">
                      <h4 className="font-mono text-xs font-semibold uppercase text-red-300 tracking-wider">
                        Severe Danger Signs
                      </h4>
                      <ul className="mt-2 list-disc list-inside text-xs text-red-200/90 space-y-1">
                        {selectedSubstance.dangerSigns.map((d, idx) => (
                          <li key={idx}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* First Aid & Antidote Box */}
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 space-y-3">
                    <div className="flex items-center gap-2 text-emerald-300 font-mono text-xs font-bold uppercase">
                      <CheckCircle2 className="size-4 text-emerald-400" />
                      Immediate First-Aid Principles
                    </div>
                    <ul className="list-disc list-inside text-xs text-emerald-200/90 space-y-1 font-sans">
                      {selectedSubstance.firstAidPrinciples.map((fa, idx) => (
                        <li key={idx}>{fa}</li>
                      ))}
                    </ul>

                    {selectedSubstance.antidote && (
                      <div className="pt-2 border-t border-emerald-500/20 text-xs">
                        <span className="font-mono text-emerald-400 font-semibold uppercase">
                          Specific Antidote / Reversal:{" "}
                        </span>
                        <span className="text-white font-medium">
                          {selectedSubstance.antidote}
                        </span>
                        {selectedSubstance.antidoteHospitalOnly && (
                          <span className="ml-2 rounded bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-mono text-amber-300">
                            Hospital Administration Only
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Clinical Management Overview */}
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 text-xs text-zinc-400">
                    <span className="font-mono uppercase text-[10px] text-muted-foreground block mb-1">
                      Clinical Hospital Management:
                    </span>
                    {selectedSubstance.medicalManagementOverview}
                  </div>

                  {/* Relevant Poison Centre Helpline */}
                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3 text-xs">
                    <span className="text-muted-foreground font-mono">
                      India 24/7 AIIMS National Poison Information Centre
                    </span>
                    <a
                      href="tel:1800116117"
                      className="font-mono font-bold text-[#62E6FF] hover:underline"
                    >
                      1800-116-117
                    </a>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-white/10 bg-[#0A0D12] p-12 text-center text-muted-foreground">
                  Select a substance from the left panel to inspect toxicology dossier.
                </div>
              )}
            </div>
          </div>
        </main>
      )}

      {/* Tab 2: Household Incompatible Matrix ("DO NOT MIX") */}
      {activeTab === "incompatibilities" && (
        <main className="mx-auto max-w-7xl px-6 py-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold font-display text-white">
              Incompatible Chemical Combinations Matrix
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              Common domestic and laboratory cleaning chemical mistakes that generate acute toxic fumes (Chlorine, Chloramine, Chloroform).
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {INCOMPATIBLE_HOUSEHOLD_MIXES.map((combo) => (
              <div
                key={combo.id}
                className="rounded-2xl border border-red-500/30 bg-red-950/15 p-5 space-y-4 hover:border-red-500/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-red-400">
                    Hazardous Mixture
                  </span>
                  <span className="rounded bg-red-500/20 px-2 py-0.5 font-mono text-[10px] font-bold text-red-300">
                    {combo.riskSeverity}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <span className="text-red-400">{combo.substanceA}</span>
                    <span className="text-muted-foreground font-mono">+</span>
                    <span className="text-red-400">{combo.substanceB}</span>
                  </div>
                  <div className="text-xs text-red-300 font-mono font-semibold">
                    Generates: {combo.hazardousProduct}
                  </div>
                </div>

                <p className="text-xs text-white/80 leading-relaxed">
                  {combo.chemicalReactionOverview}
                </p>

                <div className="rounded-xl border border-white/10 bg-black/40 p-3 text-xs space-y-1.5">
                  <span className="font-mono font-bold text-emerald-400 uppercase text-[10px] block">
                    Emergency Evacuation & Protocol
                  </span>
                  <ul className="list-disc list-inside text-zinc-300 text-xs space-y-0.5">
                    {combo.immediateAction.map((act, aIdx) => (
                      <li key={aIdx}>{act}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* Tab 3: Antidote & Reversal Directory */}
      {activeTab === "antidotes" && (
        <main className="mx-auto max-w-7xl px-6 py-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold font-display text-white">
              Clinical Antidote & Reversal Agents Reference
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              Specific competitive antagonists, chelating agents, and physiological antidotes used by clinical toxicology units.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ANTIDOTE_DATABASE.map((ant) => (
              <div
                key={ant.id}
                className="rounded-2xl border border-white/10 bg-[#0A0D12] p-5 space-y-3 hover:border-[#62E6FF]/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-[#62E6FF]">{ant.antidote}</h3>
                  <span className="rounded bg-white/5 px-2 py-0.5 font-mono text-[10px] text-zinc-400">
                    {ant.hospitalOnly ? "Hospital Only" : "Field / First Responder"}
                  </span>
                </div>

                <div className="text-xs">
                  <span className="font-mono text-zinc-400 uppercase text-[10px] block">
                    Indication:
                  </span>
                  <span className="font-semibold text-white">{ant.indication}</span>
                </div>

                <div className="text-xs text-zinc-300">
                  <span className="font-mono text-zinc-400 uppercase text-[10px] block">
                    Target Poison:
                  </span>
                  {ant.targetPoison}
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {ant.clinicalUseOverview}
                </p>

                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5 text-[11px] text-zinc-400 font-mono">
                  Monitoring: {ant.monitoringRequirements.join(", ")}
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* Tab 4: Toxidromes Recognition */}
      {activeTab === "toxidromes" && (
        <main className="mx-auto max-w-7xl px-6 py-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold font-display text-white">
              Toxidrome Clinical Recognition Matrix
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              Constellations of signs and physical findings characteristic of specific poison classes.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {TOXIDROME_PATTERNS.map((tox) => (
              <div
                key={tox.id}
                className="rounded-2xl border border-white/10 bg-[#0A0D12] p-6 space-y-4 hover:border-white/20 transition-all"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg text-white font-display">
                    {tox.name}
                  </h3>
                  <span className="rounded bg-purple-500/20 px-2 py-0.5 font-mono text-[10px] text-purple-300 border border-purple-500/30">
                    {tox.urgency}
                  </span>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed">
                  {tox.description}
                </p>

                <div className="space-y-1">
                  <span className="font-mono text-[10px] uppercase text-muted-foreground tracking-wider">
                    Common Causes:
                  </span>
                  <p className="text-xs font-semibold text-[#62E6FF]">
                    {tox.commonCauses.join(", ")}
                  </p>
                </div>

                <div>
                  <span className="font-mono text-[10px] uppercase text-muted-foreground tracking-wider block mb-1">
                    Classic Signs:
                  </span>
                  <ul className="list-disc list-inside text-xs text-zinc-300 space-y-0.5">
                    {tox.classicSigns.slice(0, 5).map((sign, sIdx) => (
                      <li key={sIdx}>{sign}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs text-zinc-300">
                  <span className="font-mono text-[10px] uppercase text-[#62E6FF] block mb-1">
                    Specific Antidote / Reversal:
                  </span>
                  {tox.antidoteOrReversal}
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* Tab 5: First Aid & Helpline */}
      {activeTab === "firstaid" && (
        <main className="mx-auto max-w-7xl px-6 py-8 space-y-8">
          <div>
            <h2 className="text-xl font-bold font-display text-white">
              Universal Poisoning First-Aid & Poison Centres
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              Standard resuscitation triage protocol and official India / International poison control directories.
            </p>
          </div>

          {/* First Aid Steps */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GENERAL_FIRST_AID.map((guide, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-[#0A0D12] p-5 space-y-3"
              >
                <div className="flex items-center gap-2">
                  <span className="flex size-6 items-center justify-center rounded-full bg-[#62E6FF]/20 font-mono text-xs font-bold text-[#62E6FF]">
                    {idx + 1}
                  </span>
                  <h3 className="font-bold text-sm text-white font-display">
                    {guide.exposureRoute}
                  </h3>
                </div>

                <div className="space-y-2 text-xs">
                  <p className="text-zinc-300 leading-relaxed">{guide.action}</p>

                  <div className="rounded-lg border border-red-500/20 bg-red-950/20 p-2 text-red-300 font-mono text-[11px]">
                    <span className="font-bold uppercase text-[10px] block text-red-400">
                      WARNING / DO NOT:
                    </span>
                    {guide.caution}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Poison Control Centres Directory */}
          <div className="rounded-2xl border border-white/10 bg-[#0A0D12] p-6 space-y-4">
            <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
              <PhoneCall className="size-4 text-[#62E6FF]" />
              Official Poison Control Centres (India & Global)
            </h3>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {INDIA_POISON_CENTRES.map((res) => (
                <div
                  key={res.id}
                  className="rounded-xl border border-white/5 bg-white/[0.02] p-4 space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-sm text-white">{res.name}</h4>
                    <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] font-mono text-muted-foreground">
                      {res.city}, {res.state}
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground">{res.institution}</p>

                  <div className="pt-1">
                    <a
                      href={`tel:${res.helpline.replace(/-/g, "")}`}
                      className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#62E6FF] hover:underline"
                    >
                      <PhoneCall className="size-3" />
                      {res.helpline}
                    </a>
                  </div>

                  {res.website && (
                    <a
                      href={res.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-[11px] font-mono text-muted-foreground hover:text-white truncate"
                    >
                      {res.website}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
