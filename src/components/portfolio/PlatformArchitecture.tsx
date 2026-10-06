import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  UserCheck,
  Globe2,
  FileText,
  FlaskConical,
  Compass,
  ShieldAlert,
  ArrowRight,
  GitBranch,
  Layers,
  Search,
  CheckCircle2,
  Cpu,
  Database,
  Terminal,
} from "lucide-react";
import { TechnicalLabel } from "@/components/system";
import { soundEngine } from "@/lib/sound-engine";

interface LabDivision {
  id: string;
  code: string;
  name: string;
  headline: string;
  description: string;
  capabilities: string[];
  toolsReferenced: string[];
  status: "ONLINE" | "EXPANDING";
  route: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}

const LAB_DIVISIONS: LabDivision[] = [
  {
    id: "human",
    code: "01",
    name: "HUMAN INTELLIGENCE",
    headline: "Public Identity, Persona & Professional Footprints",
    description:
      "Cross-references public developer platforms, scholarly publication graphs, verified usernames, and open biographical directories. Strictly zero private-account intrusion.",
    capabilities: [
      "Person OSINT & Candidate Disambiguation",
      "Developer & Social Handle Verification",
      "India Telecom 22 LSAs & Numbering Plan",
      "Public Corporate Directorship & Filings",
    ],
    toolsReferenced: ["Scholarly Repositories", "Public Code Hosts", "Open Registries", "National Numbering Plans"],
    status: "ONLINE",
    route: "/find-someone?mode=live",
    icon: UserCheck,
    accentColor: "#62E6FF",
  },
  {
    id: "digital",
    code: "02",
    name: "DIGITAL & WEB INTELLIGENCE",
    headline: "DNS Telemetry, Certificate Transparency & Web History",
    description:
      "Performs recursive Cloudflare DoH resolution, RDAP domain registration indexing, Sectigo CT-log subdomain discovery, and Internet Archive Wayback CDX historical reconstructions.",
    capabilities: [
      "Authoritative DNS Record Resolution (DoH)",
      "RDAP Domain Registration Metadata",
      "Certificate Transparency Log Discovery",
      "Wayback Machine Historical Snapshots",
    ],
    toolsReferenced: ["Recursive DNS (DoH)", "ICANN RDAP", "CT Append-Only Logs", "Public Web Archives"],
    status: "ONLINE",
    route: "/find-someone?mode=live",
    icon: Globe2,
    accentColor: "#60A5FA",
  },
  {
    id: "document",
    code: "03",
    name: "DATA & DOCUMENT INTELLIGENCE",
    headline: "Forensic Text Extraction, Hash Custody & OCR",
    description:
      "Processes documents, PDFs, and images through cryptographic SHA-256 hashing, entropy analysis, metadata inspection, and GHS label recognition with strict evidentiary custody.",
    capabilities: [
      "NIST FIPS 180-4 SHA-256 Integrity Verification",
      "Character Entropy & Anomaly Detection",
      "Document Metadata & EXIF Analysis",
      "GHS Chemical & Hazard Label OCR Clues",
    ],
    toolsReferenced: ["Metadata Extractors", "OCR Neural Engines", "Cryptographic Hashes", "Computer Vision"],
    status: "ONLINE",
    route: "/forensic-lab",
    icon: FileText,
    accentColor: "#34D399",
  },
  {
    id: "scientific",
    code: "04",
    name: "SCIENTIFIC & SAFETY INTELLIGENCE",
    headline: "Scholarly Publication Graph & Chemical Toxicology Safety",
    description:
      "Integrates PubMed, Crossref, OpenAlex, and PubChem with AIIMS NPIC (1800-116-117) emergency triage. Focuses purely on safety, antidotes, and prevention—zero poison synthesis.",
    capabilities: [
      "Open-Access Research Papers & DOIs",
      "PubChem GHS Chemical Hazard Data",
      "AIIMS NPIC 24/7 Helpline Directory",
      "Household 'DO NOT MIX' Incompatibility Matrix",
    ],
    toolsReferenced: ["Open Citation Indices", "National Poison Information Centers", "PubChem Open API"],
    status: "ONLINE",
    route: "/toxicity",
    icon: FlaskConical,
    accentColor: "#F59E0B",
  },
  {
    id: "geographic",
    code: "05",
    name: "GEOGRAPHIC INTELLIGENCE",
    headline: "World OS Earth Layers & Public Spatial Telemetry",
    description:
      "Visualizes global and India-specific public Earth layers including space telemetry, air traffic ADS-B, OpenStreetMap boundaries, and marine transponders on a 3D orbital canvas.",
    capabilities: [
      "3D Interactive Earth Orbital Canvas",
      "OpenStreetMap Administrative Geocoding",
      "Public Air, Sea & Earth Vector Layers",
      "Honest Live/Degraded/Offline State Tracking",
    ],
    toolsReferenced: ["Open Spatial Directories", "Public Geocoding", "Earth Telemetry Feeds"],
    status: "ONLINE",
    route: "/world-os",
    icon: Compass,
    accentColor: "#A78BFA",
  },
  {
    id: "security",
    code: "06",
    name: "SECURITY & OBSERVABILITY",
    headline: "DFIR Open Methodology & Evidentiary Standards",
    description:
      "A structured digital forensics methodology organized across 8 pipeline phases, backed by real-time collector latency metrics and tamper-evident audit logs.",
    capabilities: [
      "Defensible Digital Forensics Pipeline",
      "Chain-of-Custody & Evidence Standards",
      "Passive vs. Active Mode Safeguards",
      "System Telemetry & Health Probes",
    ],
    toolsReferenced: ["Memory Parsers", "Network Analyzers", "Filesystem Triagers", "Signature Scanners"],
    status: "ONLINE",
    route: "/forensic-lab",
    icon: ShieldAlert,
    accentColor: "#F43F5E",
  },
];

export function PlatformArchitecture() {
  const [selectedDivision, setSelectedDivision] = useState(LAB_DIVISIONS[0]);

  return (
    <section id="intelligence" className="relative py-28 px-6 md:px-12 lg:px-16 bg-[#050608] border-t border-white/5">
      <div className="mx-auto max-w-[1600px]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 border-b border-white/10">
          <div>
            <TechnicalLabel className="text-[#62E6FF] mb-2">
              SYSTEM TOPOLOGY & DIVISIONS
            </TechnicalLabel>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
              Universal Intelligence Engine
            </h2>
            <p className="mt-4 max-w-2xl text-base text-muted-foreground leading-relaxed sm:text-lg">
              Labs are not individual products—they are modular capability divisions operating
              underneath one evidence engine and knowledge graph.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              ARCHITECTURAL STANDARD:
            </span>
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[11px] text-foreground">
              ISO/IEC 27037 & NIST SP 800-86
            </span>
          </div>
        </div>

        {/* 5-Layer System Architecture Diagram */}
        <div className="my-16 rounded-3xl border border-white/10 bg-[#0A0D12] p-8 md:p-12 space-y-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#62E6FF] flex items-center gap-2">
              <Layers className="size-3.5" />
              FIVE-LAYER INTELLIGENCE FLOW
            </span>
            <span className="font-mono text-[10px] text-muted-foreground hidden sm:inline">
              DECOUPLED FRONTEND &amp; INDEPENDENT RESEARCH WORKERS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
            {/* Layer 1 */}
            <div className="rounded-2xl border border-white/10 bg-black/40 p-5 space-y-2 hover:border-[#62E6FF]/40 transition-colors">
              <span className="font-mono text-[10px] text-[#62E6FF] font-bold">LAYER 01</span>
              <h4 className="font-display font-bold text-base text-foreground">PORTFOLIO UI</h4>
              <p className="text-xs text-muted-foreground">
                Universal search, Bloomberg-style HUD, and responsive graph viewers.
              </p>
            </div>

            {/* Layer 2 */}
            <div className="rounded-2xl border border-white/10 bg-black/40 p-5 space-y-2 hover:border-[#62E6FF]/40 transition-colors">
              <span className="font-mono text-[10px] text-[#62E6FF] font-bold">LAYER 02</span>
              <h4 className="font-display font-bold text-base text-foreground">APPLICATION / API</h4>
              <p className="text-xs text-muted-foreground">
                `/api/intelligence` endpoint serving DNS, RDAP, OSINT, and World layers.
              </p>
            </div>

            {/* Layer 3 */}
            <div className="rounded-2xl border border-[#62E6FF]/30 bg-[#62E6FF]/[0.05] p-5 space-y-2">
              <span className="font-mono text-[10px] text-[#62E6FF] font-bold">LAYER 03</span>
              <h4 className="font-display font-bold text-base text-foreground">ORCHESTRATION</h4>
              <p className="text-xs text-muted-foreground">
                AI classifier, investigation planner, and multi-source pivot dispatch.
              </p>
            </div>

            {/* Layer 4 */}
            <div className="rounded-2xl border border-white/10 bg-black/40 p-5 space-y-2 hover:border-[#62E6FF]/40 transition-colors">
              <span className="font-mono text-[10px] text-[#62E6FF] font-bold">LAYER 04</span>
              <h4 className="font-display font-bold text-base text-foreground">MODULE ECOSYSTEM</h4>
              <p className="text-xs text-muted-foreground">
                6 specialized divisions powered by a 28-tool open source registry.
              </p>
            </div>

            {/* Layer 5 */}
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.04] p-5 space-y-2">
              <span className="font-mono text-[10px] text-emerald-400 font-bold">LAYER 05</span>
              <h4 className="font-display font-bold text-base text-foreground">EVIDENCE &amp; GRAPH</h4>
              <p className="text-xs text-muted-foreground">
                Traceable provenance, quality tiers (T1-T5), and verified knowledge graph.
              </p>
            </div>
          </div>
        </div>

        {/* 6 Major Lab Divisions Grid */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Six Core Capability Divisions
            </h3>
            <span className="font-mono text-xs text-muted-foreground">
              ALL DIVISIONS ACTIVE · ZERO FAKE COUNTERS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LAB_DIVISIONS.map((division) => {
              const Icon = division.icon;
              return (
                <article
                  key={division.id}
                  className="rounded-2xl border border-white/10 bg-[#0A0D12] p-6 flex flex-col justify-between hover:border-[#62E6FF]/40 transition-all group"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div
                        className="size-11 rounded-xl flex items-center justify-center border border-white/10 bg-white/5"
                        style={{ color: division.accentColor }}
                      >
                        <Icon className="size-5" />
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        DIV {division.code}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-display font-bold text-xl text-foreground group-hover:text-[#62E6FF] transition-colors">
                        {division.name}
                      </h4>
                      <p className="text-xs text-[#62E6FF] font-mono mt-0.5">
                        {division.headline}
                      </p>
                      <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                        {division.description}
                      </p>
                    </div>

                    <div className="pt-2 space-y-1.5 border-t border-white/5">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground block">
                        Core Capabilities:
                      </span>
                      {division.capabilities.slice(0, 3).map((cap) => (
                        <div key={cap} className="flex items-center gap-1.5 text-xs text-foreground/80">
                          <CheckCircle2 className="size-3 text-emerald-400 shrink-0" />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                    <span className="font-mono text-[9px] text-muted-foreground">
                      Sources: {division.toolsReferenced.slice(0, 2).join(", ")}
                    </span>
                    <a
                      href={division.route}
                      onClick={() => soundEngine.playClick()}
                      className="inline-flex items-center gap-1 font-mono text-[11px] text-[#62E6FF] hover:underline"
                    >
                      <span>Explore</span>
                      <ArrowRight className="size-3" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Live Evidence & Ethics Commitment Banner */}
        <div className="mt-16 rounded-2xl border border-white/10 bg-gradient-to-r from-black via-[#0A0D12] to-black p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#62E6FF]">
              EVIDENTIARY INTEGRITY PRINCIPLE
            </span>
            <h4 className="font-display font-bold text-2xl text-foreground">
              Every finding backed by verified source provenance.
            </h4>
            <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
              We never fabricate accounts, simulate live GPS tracking, or present AI inference as
              verified fact. Confidence tiers (VERIFIED / SUPPORTED / PROBABLE / UNCERTAIN)
              govern every returned claim.
            </p>
          </div>

          <a
            href="/find-someone?mode=live"
            onClick={() => soundEngine.playClick()}
            className="inline-flex items-center gap-2 rounded-xl border border-[#62E6FF]/50 bg-[#62E6FF] px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-black shadow-[0_0_24px_rgba(98,230,255,0.35)] hover:bg-[#62E6FF]/90 transition-all shrink-0 cursor-pointer"
          >
            <span>Launch Research Engine</span>
            <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
