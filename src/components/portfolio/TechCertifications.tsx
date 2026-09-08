import { useMemo, useState, type ReactNode } from "react";
import {
  Search,
  ShieldCheck,
  Clock3,
  Sparkles,
  ExternalLink,
  Award,
  LayoutGrid,
  ListFilter,
  GitBranch,
  Shield,
  Code2,
  Cloud,
  Brain,
  X,
  CheckCircle2,
  Layers,
  ArrowRight,
  Info,
  Filter,
} from "lucide-react";
import {
  TECH_CERT_CATEGORIES,
  CERT_STATUS_LABEL,
  type CertStatus,
  type TechCert,
} from "@/content/tech-certifications";

// View modes
type ViewMode = "grid" | "table" | "roadmap";

// Curriculum Master Tracks
interface MasterTrack {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  categoryIds: string[];
}

const MASTER_TRACKS: MasterTrack[] = [
  {
    id: "all",
    name: "All Credentials",
    icon: Layers,
    color: "#62E6FF",
    categoryIds: [],
  },
  {
    id: "cyber",
    name: "Cyber & Forensics",
    icon: Shield,
    color: "#62E6FF",
    categoryIds: ["cyber", "pentest", "bugbounty", "forensics"],
  },
  {
    id: "software",
    name: "Software & Systems",
    icon: Code2,
    color: "#9B8CFF",
    categoryIds: ["programming", "web"],
  },
  {
    id: "cloud",
    name: "Cloud & Infrastructure",
    icon: Cloud,
    color: "#6EE7B7",
    categoryIds: ["networking", "linux", "devops", "databases"],
  },
  {
    id: "ai",
    name: "AI & Intelligence",
    icon: Brain,
    color: "#F6C85F",
    categoryIds: ["ai"],
  },
];

// Helper to determine certification tier/level
function getCertLevel(name: string): "Foundational" | "Associate" | "Professional" | "Specialist" {
  const lower = name.toLowerCase();
  if (lower.includes("entry") || lower.includes("foundations") || lower.includes("fundamentals") || lower.includes("practitioner")) {
    return "Foundational";
  }
  if (lower.includes("associate") || lower.includes("certified associate") || lower.includes("developer")) {
    return "Associate";
  }
  if (lower.includes("professional") || lower.includes("architect") || lower.includes("administrator") || lower.includes("expert") || lower.includes("master")) {
    return "Professional";
  }
  return "Specialist";
}

const LEVEL_BADGES: Record<string, { label: string; color: string }> = {
  Foundational: { label: "Foundational", color: "text-sky-400 bg-sky-500/10 border-sky-500/20" },
  Associate: { label: "Associate", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
  Professional: { label: "Professional", color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
  Specialist: { label: "Specialist", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
};

export function TechCertifications({ embedded = false }: { embedded?: boolean } = {}) {
  const [query, setQuery] = useState("");
  const [activeTrack, setActiveTrack] = useState<string>("all");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedCert, setSelectedCert] = useState<{ cert: TechCert; catTitle: string } | null>(null);

  // Flatten all certs with metadata
  const flatCerts = useMemo(() => {
    return TECH_CERT_CATEGORIES.flatMap((cat) =>
      cat.items.map((item) => ({
        ...item,
        _catId: cat.id,
        _catTitle: cat.title,
        _level: getCertLevel(item.name),
      }))
    );
  }, []);

  // Filter logic
  const filteredCerts = useMemo(() => {
    const q = query.trim().toLowerCase();
    const track = MASTER_TRACKS.find((t) => t.id === activeTrack);

    return flatCerts.filter((c) => {
      // Track filter
      if (track && track.id !== "all" && !track.categoryIds.includes(c._catId)) {
        return false;
      }
      // Sub-category filter
      if (activeCategory !== "all" && c._catId !== activeCategory) {
        return false;
      }
      // Query filter
      if (q) {
        const matchesName = c.name.toLowerCase().includes(q);
        const matchesIssuer = c.issuer.toLowerCase().includes(q);
        const matchesSkills = c.skills?.some((s) => s.toLowerCase().includes(q));
        const matchesCat = c._catTitle.toLowerCase().includes(q);
        if (!matchesName && !matchesIssuer && !matchesSkills && !matchesCat) {
          return false;
        }
      }
      return true;
    });
  }, [flatCerts, activeTrack, activeCategory, query]);

  // Group filtered certs by category
  const groupedByCategory = useMemo(() => {
    const groups: { [key: string]: { id: string; title: string; blurb: string; items: typeof flatCerts } } = {};
    for (const c of filteredCerts) {
      if (!groups[c._catId]) {
        const cat = TECH_CERT_CATEGORIES.find((cat) => cat.id === c._catId);
        groups[c._catId] = {
          id: c._catId,
          title: c._catTitle,
          blurb: cat?.blurb || "",
          items: [],
        };
      }
      groups[c._catId].items.push(c);
    }
    return Object.values(groups);
  }, [filteredCerts]);

  // Group filtered certs by level (for Roadmap view)
  const groupedByLevel = useMemo(() => {
    const tiers: { [key: string]: typeof flatCerts } = {
      Foundational: [],
      Associate: [],
      Professional: [],
      Specialist: [],
    };
    for (const c of filteredCerts) {
      tiers[c._level].push(c);
    }
    return tiers;
  }, [filteredCerts]);

  // Track counts
  const trackCounts = useMemo(() => {
    const counts: { [key: string]: number } = { all: flatCerts.length };
    for (const track of MASTER_TRACKS) {
      if (track.id !== "all") {
        counts[track.id] = flatCerts.filter((c) => track.categoryIds.includes(c._catId)).length;
      }
    }
    return counts;
  }, [flatCerts]);

  const content = (
    <div className={embedded ? "w-full space-y-8" : "mx-auto max-w-7xl px-6 space-y-10"}>
      {/* Top Header & Transparent Declaration */}
      {!embedded ? (
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#62E6FF]/30 bg-[#62E6FF]/10 font-mono text-[11px] text-[#62E6FF] uppercase tracking-[0.25em]">
            <Award className="size-3.5" />
            <span>CREDENTIAL REGISTRY // CONTINUOUS MASTERY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.05]">
            Programming, Software Development <br className="hidden sm:block" />
            <span className="italic font-light text-gradient-flow">&amp; Cybersecurity Certifications</span>
          </h2>
          <p className="max-w-3xl text-sm sm:text-base text-muted-foreground leading-relaxed">
            A transparent map of technical credentials — earned, in progress, and on the roadmap. Each card declares its status openly. Nothing is claimed without a verifiable credential ID.
          </p>
        </div>
      ) : (
        <div className="p-6 md:p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-[#0A0D12] via-[#11151C] to-[#050608] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 size-80 bg-radial from-[#62E6FF]/10 to-transparent blur-3xl pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#62E6FF]">
                <ShieldCheck className="size-4 text-[#62E6FF]" />
                <span>EVIDENCE &amp; TRANSPARENCY PROTOCOL</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Programming, Software Development &amp; Cybersecurity Certifications
              </h3>
              <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed">
                A transparent map of technical credentials — earned, in progress, and on the roadmap. Each card declares its status openly. Nothing is claimed without a verifiable credential ID.
              </p>
            </div>

            {/* KPI Chips */}
            <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs self-start lg:self-end">
              <div className="px-3.5 py-2 rounded-xl border border-white/10 bg-[#050608]/80 text-foreground">
                <span className="text-[#62E6FF] font-bold text-sm block leading-none mb-1">124</span>
                <span className="text-[10px] uppercase text-muted-foreground tracking-wider">Tracked</span>
              </div>
              <div className="px-3.5 py-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
                <span className="font-bold text-sm block leading-none mb-1">0</span>
                <span className="text-[10px] uppercase tracking-wider">Earned</span>
              </div>
              <div className="px-3.5 py-2 rounded-xl border border-[#9B8CFF]/30 bg-[#9B8CFF]/10 text-[#9B8CFF]">
                <span className="font-bold text-sm block leading-none mb-1">124</span>
                <span className="text-[10px] uppercase tracking-wider">Roadmap</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Control Console: Tracks + Search + View Modes */}
      <div className="space-y-4">
        {/* Master Tracks Filter */}
        <div className="flex flex-wrap items-center gap-2 pb-2">
          {MASTER_TRACKS.map((track) => {
            const Icon = track.icon;
            const isSelected = activeTrack === track.id;
            return (
              <button
                key={track.id}
                type="button"
                onClick={() => {
                  setActiveTrack(track.id);
                  setActiveCategory("all");
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  isSelected
                    ? "border-[#62E6FF] bg-[#62E6FF]/15 text-[#62E6FF] font-bold shadow-[0_0_20px_rgba(98,230,255,0.25)]"
                    : "border-white/10 bg-[#0A0D12] text-muted-foreground hover:border-white/20 hover:text-foreground"
                }`}
              >
                <Icon className="size-3.5" />
                <span>{track.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/5 border border-white/5 opacity-80">
                  {trackCounts[track.id]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Bar & View Mode Switcher */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-2 rounded-2xl border border-white/10 bg-[#0A0D12]">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by certification name, issuer (Google, Oracle, Microsoft), or skill..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-transparent font-sans text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/60 outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          {/* View Mode Buttons */}
          <div className="flex items-center gap-1 border-t sm:border-t-0 sm:border-l border-white/10 pt-2 sm:pt-0 sm:pl-3 self-end sm:self-center font-mono text-[11px]">
            <span className="text-muted-foreground text-[10px] uppercase tracking-widest hidden md:inline mr-2">
              VIEW:
            </span>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-white/15 text-foreground font-bold shadow-inner"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
            >
              <LayoutGrid className="size-3.5" />
              <span>CARDS</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === "table"
                  ? "bg-white/15 text-foreground font-bold shadow-inner"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
            >
              <ListFilter className="size-3.5" />
              <span>TABLE</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("roadmap")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === "roadmap"
                  ? "bg-white/15 text-foreground font-bold shadow-inner"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
            >
              <GitBranch className="size-3.5" />
              <span>PATHWAYS</span>
            </button>
          </div>
        </div>

        {/* Results counter indicator */}
        <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground uppercase tracking-widest px-1">
          <span>
            SHOWING <strong className="text-foreground">{filteredCerts.length}</strong> OF{" "}
            {flatCerts.length} MAPPED CREDENTIALS
          </span>
          {query && (
            <span>
              FILTER: <span className="text-[#62E6FF]">"{query}"</span>
            </span>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIEW 1: BENTO MATRIX / CARDS VIEW                                        */}
      {/* ========================================================================= */}
      {viewMode === "grid" && (
        <div className="space-y-12">
          {groupedByCategory.map((cat) => (
            <div key={cat.id} className="space-y-5">
              {/* Category Subheader */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/10 pb-3">
                <div>
                  <h4 className="font-display text-lg sm:text-xl font-bold text-foreground">
                    {cat.title}
                  </h4>
                  <p className="font-sans text-xs text-muted-foreground">{cat.blurb}</p>
                </div>
                <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider px-2 py-0.5 rounded bg-white/5">
                  {cat.items.length} Tracked
                </span>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {cat.items.map((cert) => {
                  const levelBadge = LEVEL_BADGES[cert._level];
                  return (
                    <article
                      key={`${cat.id}-${cert.name}`}
                      onClick={() => setSelectedCert({ cert, catTitle: cat.title })}
                      className="group p-5 rounded-xl border border-white/10 bg-[#0A0D12] hover:border-[#62E6FF]/40 hover:bg-[#11151C] transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden"
                    >
                      <div className="space-y-3">
                        {/* Top Meta Row */}
                        <div className="flex items-center justify-between gap-2">
                          <span className={`px-2 py-0.5 rounded font-mono text-[9px] uppercase tracking-wider border ${levelBadge.color}`}>
                            {levelBadge.label}
                          </span>
                          <span className="px-2 py-0.5 rounded font-mono text-[9px] uppercase tracking-wider text-muted-foreground bg-white/5 border border-white/5">
                            Roadmap
                          </span>
                        </div>

                        {/* Title & Issuer */}
                        <div>
                          <h5 className="font-display font-bold text-sm sm:text-[15px] text-foreground group-hover:text-[#62E6FF] transition-colors leading-snug">
                            {cert.name}
                          </h5>
                          <p className="font-mono text-[10px] text-accent uppercase tracking-wider mt-1">
                            {cert.issuer}
                          </p>
                        </div>

                        {/* Skills */}
                        {cert.skills && cert.skills.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-1">
                            {cert.skills.slice(0, 3).map((sk) => (
                              <span
                                key={sk}
                                className="px-2 py-0.5 rounded font-mono text-[9px] text-muted-foreground bg-white/[0.03] border border-white/5"
                              >
                                {sk}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Footer */}
                      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Clock3 className="size-3 text-muted-foreground" />
                          <span>Planned Track</span>
                        </span>
                        <span className="group-hover:text-[#62E6FF] transition-colors flex items-center gap-0.5">
                          Inspect <ArrowRight className="size-2.5 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          ))}

          {groupedByCategory.length === 0 && (
            <div className="p-12 text-center rounded-2xl border border-white/10 bg-[#0A0D12] text-muted-foreground font-sans text-sm">
              No certifications found matching "{query}".
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: HIGH-DENSITY FORENSIC REGISTRY TABLE                             */}
      {/* ========================================================================= */}
      {viewMode === "table" && (
        <div className="rounded-2xl border border-white/10 bg-[#0A0D12] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="border-b border-white/10 bg-white/[0.02] text-muted-foreground uppercase tracking-widest text-[10px]">
                <tr>
                  <th className="py-3.5 px-4 font-bold">Status</th>
                  <th className="py-3.5 px-4 font-bold">Credential Title</th>
                  <th className="py-3.5 px-4 font-bold">Issuing Authority</th>
                  <th className="py-3.5 px-4 font-bold">Curriculum Domain</th>
                  <th className="py-3.5 px-4 font-bold">Competencies</th>
                  <th className="py-3.5 px-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-foreground/90">
                {filteredCerts.map((cert) => {
                  const levelBadge = LEVEL_BADGES[cert._level];
                  return (
                    <tr
                      key={`${cert._catId}-${cert.name}`}
                      onClick={() => setSelectedCert({ cert, catTitle: cert._catTitle })}
                      className="hover:bg-white/[0.03] transition-colors cursor-pointer group"
                    >
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] uppercase font-bold border border-white/10 bg-white/5 text-muted-foreground">
                          <Clock3 className="size-3 text-muted-foreground" />
                          Planned
                        </span>
                      </td>
                      <td className="py-3 px-4 font-bold text-foreground group-hover:text-[#62E6FF] transition-colors">
                        <div className="flex items-center gap-2">
                          <span>{cert.name}</span>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded border ${levelBadge.color}`}>
                            {levelBadge.label}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-accent whitespace-nowrap">
                        {cert.issuer}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground whitespace-nowrap text-[11px]">
                        {cert._catTitle}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {cert.skills?.slice(0, 3).map((s) => (
                            <span
                              key={s}
                              className="px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-[9px] text-muted-foreground"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <span className="text-[#62E6FF] text-[10px] group-hover:underline">
                          View Details ↗
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 3: MILESTONE PATHWAY LADDER                                         */}
      {/* ========================================================================= */}
      {viewMode === "roadmap" && (
        <div className="space-y-8">
          {(["Foundational", "Associate", "Professional", "Specialist"] as const).map((tierKey, tierIdx) => {
            const items = groupedByLevel[tierKey];
            if (items.length === 0) return null;
            const badge = LEVEL_BADGES[tierKey];
            return (
              <div key={tierKey} className="p-6 md:p-8 rounded-2xl border border-white/10 bg-[#0A0D12] space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="size-7 rounded-full bg-accent/10 border border-accent/30 font-mono text-xs font-bold text-accent flex items-center justify-center">
                      0{tierIdx + 1}
                    </span>
                    <div>
                      <h4 className="font-display text-lg font-bold text-foreground">
                        {tierKey} Competency Tier
                      </h4>
                      <p className="font-sans text-xs text-muted-foreground">
                        Structured mastery progression milestone across core platforms and tools.
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full font-mono text-xs font-bold border ${badge.color}`}>
                    {items.length} Target Credentials
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {items.map((c) => (
                    <div
                      key={`${c._catId}-${c.name}`}
                      onClick={() => setSelectedCert({ cert: c, catTitle: c._catTitle })}
                      className="p-3.5 rounded-xl border border-white/5 bg-[#11151C] hover:border-[#62E6FF]/30 transition-all cursor-pointer flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground mb-1">
                          <span className="text-accent">{c.issuer}</span>
                          <span>{c._catTitle.split("&")[0].trim()}</span>
                        </div>
                        <h5 className="font-display font-bold text-xs text-foreground group-hover:text-[#62E6FF] transition-colors leading-snug">
                          {c.name}
                        </h5>
                      </div>
                      <div className="mt-3 flex items-center justify-between font-mono text-[9px] text-muted-foreground border-t border-white/5 pt-2">
                        <span className="text-emerald-400">Roadmap Milestone</span>
                        <span className="text-[#62E6FF] group-hover:underline">Inspect</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Mandatory Audit Footer Note */}
      <div className="p-5 rounded-xl border border-white/10 bg-[#0A0D12] text-xs font-mono text-muted-foreground flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Info className="size-4 text-[#62E6FF] shrink-0" />
          <span>
            Every credential in this index represents an active learning syllabus or target qualification. Nothing is claimed without verifiable credential IDs.
          </span>
        </div>
        <span className="text-[10px] uppercase tracking-wider text-[#62E6FF] shrink-0">
          STATUS: 100% AUDIT-GRADE
        </span>
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE CREDENTIAL SPECIFICATION MODAL                                */}
      {/* ========================================================================= */}
      {selectedCert && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="w-full max-w-xl p-6 md:p-8 rounded-3xl border border-white/10 bg-[#0A0D12] shadow-[0_25px_80px_rgba(0,0,0,0.9)] space-y-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedCert(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="size-4" />
            </button>

            {/* Header */}
            <div className="space-y-2 pr-8">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full border border-[#62E6FF]/30 bg-[#62E6FF]/10 font-mono text-[10px] text-[#62E6FF] uppercase font-bold">
                  {selectedCert.catTitle}
                </span>
                <span className="px-2.5 py-0.5 rounded-full border border-white/10 bg-white/5 font-mono text-[10px] text-muted-foreground uppercase">
                  {selectedCert.cert.issuer}
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground">
                {selectedCert.cert.name}
              </h3>
            </div>

            {/* Spec Details Grid */}
            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-3.5 rounded-xl border border-white/5 bg-[#11151C]">
                <div className="text-muted-foreground text-[10px] uppercase mb-1">COMPETENCY TIER</div>
                <div className="text-foreground font-bold">{getCertLevel(selectedCert.cert.name)}</div>
              </div>
              <div className="p-3.5 rounded-xl border border-white/5 bg-[#11151C]">
                <div className="text-muted-foreground text-[10px] uppercase mb-1">VERIFICATION STATE</div>
                <div className="text-accent font-bold">Roadmap Active</div>
              </div>
            </div>

            {/* Skills & Vectors */}
            {selectedCert.cert.skills && selectedCert.cert.skills.length > 0 && (
              <div className="space-y-2">
                <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  CORE TECHNICAL VECTORS TESTED:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCert.cert.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded-lg border border-white/10 bg-white/5 font-mono text-xs text-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Disclosure Notice */}
            <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] text-xs font-sans text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground font-medium">Verification Policy:</strong> This credential forms part of Tarik Islam's continuous engineering learning roadmap. Official credential hashes, certification IDs, and issuing portal links are attached upon formal certification.
              </p>
            </div>

            {/* Action */}
            <button
              type="button"
              onClick={() => setSelectedCert(null)}
              className="w-full py-3 rounded-xl bg-accent text-[#050608] font-mono text-xs font-bold uppercase tracking-wider hover:bg-accent-glow transition-all cursor-pointer"
            >
              CLOSE SPECIFICATION
            </button>
          </div>
        </div>
      )}
    </div>
  );

  if (embedded) {
    return content;
  }

  return (
    <section id="tech-certifications" className="relative py-28 md:py-36 bg-[#050608] border-b border-white/5">
      {content}
    </section>
  );
}
