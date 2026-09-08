import { useState } from "react";
import { SectionHead } from "./Capabilities";
import { TiltCard3D } from "./TiltCard3D";
import { ArrowUpRight, ExternalLink, Shield, Cpu, Terminal, Sparkles, FolderGit2, CheckCircle2 } from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: "ai" | "cyber" | "forensics" | "venture";
  categoryLabel: string;
  tagline: string;
  description: string;
  architecture: string[];
  tags: string[];
  status: "LIVE" | "IN BUILD" | "AUDITED" | "OPEN SOURCE";
  statusColor: string;
  href?: string;
  github?: string;
  featured?: boolean;
  metrics?: { label: string; value: string };
}

const PROJECTS: Project[] = [
  {
    id: "dezo",
    title: "Dezo.in — AI Product Studio",
    category: "venture",
    categoryLabel: "STUDIO VENTURE · APPLIED AI",
    tagline: "Founding vehicle for secure-by-design, AI-native software platforms.",
    description:
      "A specialized product studio engineering intelligent software at the confluence of forensic auditability, zero-trust security, and high-velocity product craft. Builds production agentic workflows, deterministic LLM evaluation pipelines, and high-assurance web platforms.",
    architecture: [
      "Deterministic LLM RAG pipelines with verifiable citations",
      "Cryptographic audit trails for every autonomous agent decision",
      "Sub-second edge inference orchestration with fallback routing",
      "Enterprise SOC-compliant telemetry and monitoring",
    ],
    tags: ["Autonomous Agents", "RAG Systems", "TypeScript", "React 19", "Python", "Vector DB"],
    status: "LIVE",
    statusColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    href: "https://dezo.in",
    featured: true,
    metrics: { label: "Studio Stage", value: "Founding & Active" },
  },
  {
    id: "forensickit",
    title: "Aegis-DF (ForensicKit)",
    category: "forensics",
    categoryLabel: "DIGITAL FORENSICS · EVIDENCE TRIAGE",
    tagline: "Cryptographic memory & disk artifact triage with automated chain-of-custody.",
    description:
      "A forensic investigation engine designed to ingest raw memory dumps and disk images, automatically verify SHA-256 and Blake3 integrity trees, extract deleted partition artifacts, and generate court-admissible chain-of-custody dossiers conforming to ISO/IEC 27037 standards.",
    architecture: [
      "High-throughput raw memory parsing & Volatility 3 bindings",
      "Merkle-tree based SHA-256 evidence chain verification",
      "Automated timeline reconstruction across NTFS, ext4 & APFS",
      "Cryptographically signed PDF & JSON forensic autopsy reports",
    ],
    tags: ["Rust", "Python", "Memory Forensics", "Cryptography", "NIST Standards"],
    status: "AUDITED",
    statusColor: "text-accent border-accent/30 bg-accent/10",
    metrics: { label: "Integrity Standard", value: "ISO/IEC 27037" },
  },
  {
    id: "threatlens",
    title: "ThreatLens SIEM & Autonomous Hunter",
    category: "cyber",
    categoryLabel: "CYBER DEFENSE · THREAT HUNTING",
    tagline: "AI-assisted security operations platform with MITRE ATT&CK correlation.",
    description:
      "Autonomous cybersecurity telemetry platform that maps real-time network packets and host anomalies against the MITRE ATT&CK framework. Employs local transformer models for zero-day behavioral detection without transmitting sensitive telemetry outside the security perimeter.",
    architecture: [
      "Network packet inspection and anomaly detection",
      "MITRE ATT&CK framework correlation engine",
      "Automated incident response with Zero-Trust policies",
      "Local ML models for threat intelligence analysis",
    ],
    tags: ["Cybersecurity", "Zero Trust", "eBPF", "Graph Neural Net", "MITRE ATT&CK"],
    status: "IN BUILD",
    statusColor: "text-[#62E6FF] border-[#62E6FF]/30 bg-[#62E6FF]/10",
    metrics: { label: "Stage", value: "In Development" },
  },
  {
    id: "biotrace",
    title: "BioTrace Neural Forensics",
    category: "forensics",
    categoryLabel: "FORENSIC BIOLOGY · PATTERN RECOGNITION",
    tagline: "Computer vision and neural pattern matching for forensic reconstructions.",
    description:
      "Scientific research pipeline utilizing convolutional neural networks for biological fluid classification, latent ridge minutiae comparison, and bloodstain pattern trajectory reconstruction in 3D coordinate space for crime scene investigations.",
    architecture: [
      "Sub-pixel minutiae extraction for partial and smudged latent prints",
      "3D ballistic and impact angle calculation from blood droplet geometry",
      "Strict reproducibility harness with blinded calibration benchmarks",
    ],
    tags: ["Computer Vision", "PyTorch", "Forensic Biology", "3D Geometry"],
    status: "IN BUILD",
    statusColor: "text-[#9B8CFF] border-[#9B8CFF]/30 bg-[#9B8CFF]/10",
    metrics: { label: "Stage", value: "Research & Development" },
  },
  {
    id: "canvas",
    title: "Tarik's Digital Canvas v4",
    category: "ai",
    categoryLabel: "OPEN SOURCE · WEB ENGINEERING",
    tagline: "The high-performance portfolio you are exploring right now.",
    description:
      "Engineered with TanStack Start, React 19, custom 3D WebGL shaders, and Tailwind CSS v4. Optimized for performance with code-split bundles and server-side rendering.",
    architecture: [
      "Full-stack SSR with Nitro & Cloudflare Workers edge deployment",
      "Custom 3D perspective projection engine in pure TypeScript",
      "Zero-latency reactive state with Radix UI primitives and Tailwind v4",
      "Complete Schema.org JSON-LD semantic structure for Google indexing",
    ],
    tags: ["TanStack Start", "React 19", "3D WebGL", "Tailwind CSS v4", "TypeScript"],
    status: "OPEN SOURCE",
    statusColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    href: "https://github.com/tarikk786786/tarik-s-digital-canvas",
    github: "https://github.com/tarikk786786/tarik-s-digital-canvas",
    metrics: { label: "Stack", value: "TanStack Start + Three.js" },
  },
];

export function Projects() {
  const [filter, setFilter] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="work" className="relative py-28 md:py-36 px-6 md:px-12 lg:px-16 border-b border-white/5 bg-[#050608] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 size-[32rem] rounded-full blur-3xl opacity-20 bg-radial from-[#62E6FF]/15 to-transparent pointer-events-none" />
      <div className="absolute bottom-10 left-0 size-[28rem] rounded-full blur-3xl opacity-15 bg-radial from-[#9B8CFF]/15 to-transparent pointer-events-none" />

      <div className="relative max-w-[1600px] mx-auto">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <SectionHead num="02" label="WORK // SELECTED SYSTEMS">
              Featured Systems, <br className="hidden sm:block" />
              <span className="italic font-light text-gradient-flow">Venture & Applied R&D</span>
            </SectionHead>
          </div>

          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-lg border border-white/10 bg-[#0A0D12] backdrop-blur-md font-mono text-[11px] uppercase tracking-wider">
            {[
              { id: "all", label: "ALL FILES" },
              { id: "venture", label: "VENTURE" },
              { id: "forensics", label: "FORENSICS" },
              { id: "cyber", label: "CYBERSECURITY" },
              { id: "ai", label: "AI & SYSTEMS" },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={`px-3.5 py-1.5 rounded-md transition-all cursor-pointer ${
                  filter === f.id
                    ? "bg-accent text-[#050608] font-bold shadow-[0_0_16px_rgba(98,230,255,0.35)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {filtered.map((proj) => {
            const isSpanFull = proj.featured && filter === "all";

            return (
              <div
                key={proj.id}
                className={isSpanFull ? "lg:col-span-12" : "lg:col-span-6"}
              >
                <TiltCard3D
                  className="h-full"
                  glowColor={proj.category === "venture" ? "rgba(98, 230, 255, 0.2)" : "rgba(155, 140, 255, 0.2)"}
                  tiltIntensity={10}
                >
                  <article className="h-full flex flex-col justify-between p-8 md:p-10 rounded-2xl border border-white/10 bg-[#0A0D12] backdrop-blur-xl shadow-xl transition-all duration-300 hover:border-[#62E6FF]/40 group">
                    
                    <div>
                      {/* Card Top Metadata */}
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent font-bold">
                          {proj.categoryLabel}
                        </span>

                        <div className="flex items-center gap-3">
                          <span className={`px-2.5 py-1 rounded-full border font-mono text-[9px] uppercase tracking-wider font-semibold ${proj.statusColor}`}>
                            {proj.status}
                          </span>
                          {proj.metrics && (
                            <span className="hidden sm:inline-block font-mono text-[10px] text-muted-foreground">
                              {proj.metrics.label}: <strong className="text-foreground">{proj.metrics.value}</strong>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Title & Tagline */}
                      <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors mb-3">
                        {proj.title}
                      </h3>

                      <p className="font-mono text-xs text-accent/90 mb-4 tracking-wide">
                        {proj.tagline}
                      </p>

                      <p className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
                        {proj.description}
                      </p>

                      {/* Technical Architecture Highlights */}
                      <div className="p-4 rounded-xl bg-black/40 border border-white/5 mb-6 space-y-2">
                        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                          <Terminal className="size-3 text-accent" />
                          <span>EVIDENCE & ARCHITECTURE TRAIL:</span>
                        </p>
                        <ul className="space-y-1.5">
                          {proj.architecture.map((arch, idx) => (
                            <li key={idx} className="flex items-start gap-2 font-mono text-xs text-foreground/80">
                              <span className="text-accent">├─</span>
                              <span>{arch}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Bottom Tags & Action Links */}
                    <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {proj.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded bg-white/5 border border-white/5 font-mono text-[10px] text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Action Links */}
                      <div className="flex items-center gap-3">
                        {proj.github && (
                          <a
                            href={proj.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-2 rounded border border-white/10 bg-white/5 hover:border-accent hover:text-accent font-mono text-xs transition-colors"
                          >
                            <FolderGit2 className="size-3.5" />
                            <span>GITHUB</span>
                          </a>
                        )}

                        {proj.href && (
                          <a
                            href={proj.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded bg-accent text-[#0C0E12] font-mono text-xs font-bold hover:bg-accent-glow transition-all shadow-[0_0_16px_rgba(232,168,56,0.3)]"
                          >
                            <span>EXPLORE LIVE</span>
                            <ArrowUpRight className="size-3.5" />
                          </a>
                        )}
                      </div>
                    </div>

                  </article>
                </TiltCard3D>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
