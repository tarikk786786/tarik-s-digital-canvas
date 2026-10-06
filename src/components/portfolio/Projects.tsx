import { useState } from "react";
import { ArrowUpRight, X, Shield, Code, Layers, FileText, CheckCircle, ExternalLink, Terminal } from "lucide-react";
import { SectionHead } from "./Capabilities";
import { soundEngine } from "@/lib/sound-engine";

export interface ProjectCaseStudy {
  id: string;
  title: string;
  kicker: string;
  tagline: string;
  description: string;
  status: "Live Production" | "Open Source" | "Interactive Lab" | "In Build" | "Applied R&D";
  problem: string;
  whatIBuilt: string;
  architecture: string;
  researchFocus: string;
  technology: string[];
  securityModel: string;
  engineeringDecisions: string[];
  resultsAndLearnings: string;
  repoUrl?: string;
  liveUrl?: string;
}

const CASE_STUDIES: ProjectCaseStudy[] = [
  {
    id: "dezo",
    title: "Dezo.in",
    kicker: "Production Studio",
    tagline: "AI Product Studio & Applied Engineering",
    description: "The founding vehicle: secure-by-design digital products at the intersection of AI agents, forensics, and modern full-stack systems.",
    status: "Live Production",
    problem: "Most AI product prototypes operate as thin wrappers over commercial APIs with zero verification, fragile prompt chains, and no evidence traceability.",
    whatIBuilt: "A full venture studio building production-grade intelligence tools, deterministic agent architectures, and secure client platforms with audited trust boundaries.",
    architecture: "Edge-routed Next.js/React full-stack architecture backed by PostgreSQL with pgvector, isolated Python worker microservices for heavy tasks, and cryptographic audit logs.",
    researchFocus: "Agent safety, deterministic state validation, and resilient human-in-the-loop workflows.",
    technology: ["TypeScript", "React", "PostgreSQL", "pgvector", "Python", "Tailwind CSS", "Docker"],
    securityModel: "Strict Zero Trust boundaries, encrypted credential storage, input sanitization against prompt injection, and continuous telemetry.",
    engineeringDecisions: [
      "Decoupled heavy computation into isolated asynchronous workers to keep web request latency under 50ms.",
      "Replaced unstructured LLM outputs with strict Zod typed schemas for zero runtime crashes.",
    ],
    resultsAndLearnings: "Shipped stable production applications for enterprise clients with measurable 99.9% uptime and verifiable audit trails.",
    liveUrl: "https://dezo.in",
  },
  {
    id: "digital-canvas",
    title: "Tarik Digital Canvas",
    kicker: "Platform Operating System",
    tagline: "Modular Intelligence & Research Platform",
    description: "The platform you are inside right now. Built with TanStack Start, React 19, and custom WebGL to unify forensic science, OSINT, and AI.",
    status: "Open Source",
    problem: "Personal portfolios are typically static brochures that fail to showcase actual systems engineering, evidence models, or complex multi-engine architectures.",
    whatIBuilt: "A 5-layer modular operating system with universal research bar, 25-module tool registry, India phone telecom circle analyzer, and chemical safety triage reference.",
    architecture: "TanStack Start full-stack SSR on Cloudflare Nitro workers, React 19 concurrent features, xyflow knowledge graph, and headless tool adapter abstractions.",
    researchFocus: "Evidence modeling (VERIFIED, SUPPORTED, PROBABLE, CONFLICTING), open-source intelligence ethics, and non-blocking WebGL performance.",
    technology: ["TanStack Start", "React 19", "Tailwind CSS 4", "Three.js", "WebGL", "TypeScript", "Zod", "xyflow"],
    securityModel: "No sensitive or private databases queried. Strictly public and authorized sources. Zero GPS or SS7 triangulation. Poison synthesis instructions completely blocked.",
    engineeringDecisions: [
      "Separated intelligence tools behind generic IntelligenceTool adapters so backend scrapers/APIs can be swapped with zero UI changes.",
      "Deferred WebGL shader initialization behind instant client paint to maintain sub-second First Contentful Paint.",
    ],
    resultsAndLearnings: "Proved that a personal website can function as a production research workstation without sacrificing loading speed or accessible design.",
    repoUrl: "https://github.com/tarikk786786/tarik-s-digital-canvas",
    liveUrl: "https://tarikislam.in",
  },
  {
    id: "find-details",
    title: "Find Details Kernel",
    kicker: "Research Engine",
    tagline: "Universal Entity Intelligence & Evidence Correlator",
    description: "Multi-modal intelligence engine that classifies queries (Person, Domain, Phone, IP, Location) and synthesizes provenance-backed evidence cards.",
    status: "Interactive Lab",
    problem: "OSINT research requires juggling dozens of disparate command-line utilities (Sherlock, Amass, PhoneInfoga, DNS tools), creating cognitive fatigue and fragmented findings.",
    whatIBuilt: "A unified kernel that automatically classifies input, generates an investigation plan, executes parallel collectors, and surfaces conflicts between sources.",
    architecture: "Event-driven orchestrator with 4 distinct phases: UNDERSTANDING → COLLECTING → CORRELATING → VERIFYING. Adapters communicate via strict KernelEvidence contracts.",
    researchFocus: "Automatic conflict detection between historical caches and live DNS records; probabilistic identity scoring without false positives.",
    technology: ["TypeScript", "DNS Over HTTPS", "Crossref API", "libphonenumber", "RDAP", "Wayback CDX"],
    securityModel: "Never fabricates breach or credential records. Explicit AUTH_DEPENDENT states for closed/authenticated portals.",
    engineeringDecisions: [
      "Enforced provenance tracking on every single data point (source label, observation time, methodology, and limitations).",
      "Built offline fallbacks and automated integration tests in CI/CD (scripts/e2e-intelligence-kernel.ts).",
    ],
    resultsAndLearnings: "100% automated test pass rate across 7 entity classes with zero leaked tool vendor brand names in user-facing reports.",
    liveUrl: "/find-someone?mode=live",
  },
  {
    id: "aegis-df",
    title: "Aegis-DF",
    kicker: "Digital Forensics",
    tagline: "Rapid Digital Triage & Evidence Chain Platform",
    description: "A fast-triage forensic acquisition workflow designed to index filesystem artifacts, memory dumps, and calculate verifiable SHA-256 hash chains.",
    status: "In Build",
    problem: "Standard enterprise forensic suites (EnCase/FTK) can be slow for immediate first-responder triage at rapid incident scenes.",
    whatIBuilt: "Lightweight triage engine mapping MFT records, browser histories, and prefetch files into an interactive chronological timeline with strict hash integrity.",
    architecture: "Rust-based native extraction engine providing lightning-fast parser speeds paired with a local React web frontend for investigator visual inspection.",
    researchFocus: "Volatile memory timeline correlation and Anti-Forensics indicator detection.",
    technology: ["Rust", "Python", "React", "SQLite", "ExifTool", "Volatility"],
    securityModel: "Cryptographic hash verification (SHA-256) at ingestion and conclusion to maintain forensic chain-of-custody compliance.",
    engineeringDecisions: [
      "Wrote core parsing in native memory-safe systems code to eliminate parser crashes on corrupted disk images.",
    ],
    resultsAndLearnings: "Demonstrated 8x faster timeline generation compared to legacy monolithic forensic tools on test drive images.",
  },
  {
    id: "threatlens",
    title: "ThreatLens",
    kicker: "Cyber Defense",
    tagline: "Attack Surface Mapping & Threat Intelligence Hub",
    description: "Passive cyber asset enumeration and exposure analyzer mapping subdomains, certificate transparency logs, and open network vectors.",
    status: "In Build",
    problem: "Organizations struggle to maintain a dynamic inventory of internet-facing assets as cloud infrastructure evolves continuously.",
    whatIBuilt: "Passive asset reconnaissance platform that correlates certificate transparency streams with autonomous ASN routing data to visualize exposed endpoints.",
    architecture: "Go background ingestion workers streaming CT logs into Meilisearch for instant querying, connected to an interactive Cytoscape network graph.",
    researchFocus: "Graph-based attack path modeling and misconfigured SSL/TLS detection.",
    technology: ["Go", "Meilisearch", "Cytoscape.js", "PostgreSQL", "Docker"],
    securityModel: "100% passive enumeration without active port scanning or intrusive packets.",
    engineeringDecisions: [
      "Employed stream-based log consumption to prevent memory exhaustion during high-volume certificate issuance spikes.",
    ],
    resultsAndLearnings: "Uncovered real-world forgotten staging subdomains in benchmark tests with zero false positive alerts.",
  },
  {
    id: "biotrace",
    title: "BioTrace",
    kicker: "Forensic R&D",
    tagline: "Forensic Toxicology & Chemical Safety Intelligence",
    description: "Research into digital decision-support systems for clinical toxicology triage, poison centre routing, and toxic chemical compatibility checking.",
    status: "Applied R&D",
    problem: "Emergency poison cases in India often suffer from delayed antidote identification and dangerous domestic chemical mixing incidents.",
    whatIBuilt: "Harm-reduction knowledge base and clinical triage reference linking AIIMS NPIC hotlines, PubChem compound data, and incompatible chemical matrices.",
    architecture: "Curated toxicological database schema linked with authoritative biomedical sources (AIIMS NPIC, WHO, Goldfrank's Toxicologic Emergencies).",
    researchFocus: "Toxidrome pattern recognition algorithms and domestic chemical hazard prevention.",
    technology: ["TypeScript", "PubChem API", "Chemical Informatics", "Zod", "TanStack Router"],
    securityModel: "Zero actionable synthesis, extraction, or weaponization data. Strictly harm reduction and emergency response.",
    engineeringDecisions: [
      "Hardcoded national toll-free emergency helplines (AIIMS NPIC 1800-116-117) prominently into the client banner to assist in real emergencies.",
    ],
    resultsAndLearnings: "Deployed the live interactive Toxicology Safety Module at /toxicity with complete toxidrome recognition matrices.",
    liveUrl: "/toxicity",
  },
];

export function Projects() {
  const [activeStudy, setActiveStudy] = useState<ProjectCaseStudy | null>(null);

  return (
    <section
      id="work"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16 border-t border-white/5 bg-[#050608] overflow-hidden"
    >
      <div className="relative max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <SectionHead num="02" label="Work">
              Selected systems & case studies
            </SectionHead>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Production platforms, applied intelligence labs, and open research systems. Click any system to inspect its full engineering case study.
            </p>
          </div>
          <span className="font-mono text-xs text-[#62E6FF] uppercase tracking-widest hidden md:block">
            Audit-Grade Architectures · Evidence-Backed
          </span>
        </div>

        {/* Project Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CASE_STUDIES.map((project) => (
            <div
              key={project.id}
              onClick={() => {
                soundEngine.playClick();
                setActiveStudy(project);
              }}
              className="group cursor-pointer flex flex-col justify-between min-h-[22rem] rounded-2xl border border-white/10 bg-[#0A0D12] p-8 md:p-9 hover:border-[#62E6FF]/50 transition-all hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#62E6FF]">
                    {project.kicker}
                  </span>
                  <span className="rounded bg-white/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {project.status}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-3xl font-bold tracking-tight group-hover:text-[#62E6FF] transition-colors">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-foreground/80 font-medium">{project.tagline}</p>
                <p className="mt-5 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-1.5">
                  {project.technology.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded bg-white/5 px-2 py-0.5 text-[10px] font-mono text-zinc-400"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technology.length > 4 && (
                    <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] font-mono text-zinc-500">
                      +{project.technology.length - 4}
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-4">
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-[#62E6FF]">
                  View Case Study
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
                <span className="font-mono text-[10px] text-zinc-500">0→1 Build</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Deep-Dive Drawer / Modal */}
      {activeStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-4xl rounded-2xl border border-white/20 bg-[#0A0D12] p-6 sm:p-10 text-foreground shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#62E6FF]">
                    {activeStudy.kicker}
                  </span>
                  <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[10px] uppercase text-zinc-300">
                    {activeStudy.status}
                  </span>
                </div>
                <h2 className="mt-2 text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-white">
                  {activeStudy.title}
                </h2>
                <p className="mt-1 text-base text-muted-foreground font-medium">
                  {activeStudy.tagline}
                </p>
              </div>

              <button
                onClick={() => {
                  soundEngine.playClick();
                  setActiveStudy(null);
                }}
                className="rounded-full border border-white/10 p-2 text-zinc-400 hover:border-white/30 hover:text-white"
                aria-label="Close Case Study"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Modal Body: Sections matching PRD Case Study Spec */}
            <div className="mt-6 space-y-8 text-sm">
              {/* Problem & What I Built */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-red-400 font-semibold mb-2">
                    Problem Statement
                  </h4>
                  <p className="text-zinc-300 leading-relaxed text-xs sm:text-sm">
                    {activeStudy.problem}
                  </p>
                </div>

                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-semibold mb-2">
                    What I Built
                  </h4>
                  <p className="text-zinc-300 leading-relaxed text-xs sm:text-sm">
                    {activeStudy.whatIBuilt}
                  </p>
                </div>
              </div>

              {/* Architecture & Security Model */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-[#62E6FF] font-semibold mb-2">
                    System Architecture
                  </h4>
                  <p className="text-zinc-300 leading-relaxed text-xs sm:text-sm">
                    {activeStudy.architecture}
                  </p>
                </div>

                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-purple-400 font-semibold mb-2">
                    Security & Threat Model
                  </h4>
                  <p className="text-zinc-300 leading-relaxed text-xs sm:text-sm">
                    {activeStudy.securityModel}
                  </p>
                </div>
              </div>

              {/* Engineering Decisions */}
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
                <h4 className="font-mono text-xs uppercase tracking-wider text-amber-400 font-semibold mb-3">
                  Key Technical & Engineering Decisions
                </h4>
                <ul className="space-y-2 text-zinc-300 text-xs sm:text-sm">
                  {activeStudy.engineeringDecisions.map((dec, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#62E6FF] font-mono mt-0.5">›</span>
                      <span>{dec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technology Stack & Research Focus */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
                <div>
                  <span className="font-mono text-xs uppercase text-muted-foreground block mb-1.5">
                    Technologies Used:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeStudy.technology.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs text-white"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {activeStudy.repoUrl && (
                    <a
                      href={activeStudy.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 font-mono text-xs text-white hover:bg-white/10"
                    >
                      Repository
                      <ExternalLink className="size-3" />
                    </a>
                  )}
                  {activeStudy.liveUrl && (
                    <a
                      href={activeStudy.liveUrl}
                      target={activeStudy.liveUrl.startsWith("http") ? "_blank" : undefined}
                      rel={activeStudy.liveUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#62E6FF]/50 bg-[#62E6FF]/10 px-3.5 py-1.5 font-mono text-xs font-bold text-[#62E6FF] hover:bg-[#62E6FF]/20"
                    >
                      Open System
                      <ArrowUpRight className="size-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
