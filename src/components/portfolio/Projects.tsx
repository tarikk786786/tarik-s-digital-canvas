import { ArrowUpRight } from "lucide-react";
import { SectionHead } from "./Capabilities";

interface Project {
  id: string;
  title: string;
  kicker: string;
  tagline: string;
  description: string;
  status: string;
  href: string;
  external?: boolean;
}

const FEATURED: Project[] = [
  {
    id: "dezo",
    title: "Dezo.in",
    kicker: "Studio",
    tagline: "AI product studio",
    description:
      "The founding vehicle. Secure-by-design products at the seam of agents, forensics, and high-assurance web systems.",
    status: "Live",
    href: "https://dezo.in",
    external: true,
  },
  {
    id: "canvas",
    title: "Digital Canvas",
    kicker: "This site",
    tagline: "The portfolio you are inside",
    description:
      "TanStack Start, React 19, and custom WebGL — a living dossier for how I think, build, and investigate.",
    status: "Open source",
    href: "https://github.com/tarikk786786/tarik-s-digital-canvas",
    external: true,
  },
  {
    id: "find-details",
    title: "FIND DETAILS",
    kicker: "Laboratory",
    tagline: "Public-intelligence console",
    description:
      "One input. Automatic routing. Evidence-shaped results. A scripted demo lab on this site — not a live classified feed.",
    status: "Demo lab",
    href: "/find-someone",
  },
];

const MORE = [
  { title: "Aegis-DF", note: "Digital forensics triage" },
  { title: "ThreatLens", note: "In build · cyber defense" },
  { title: "BioTrace", note: "Research · neural forensics" },
];

export function Projects() {
  return (
    <section
      id="work"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16 border-t border-white/5 bg-[#050608] overflow-hidden"
    >
      <div className="relative max-w-[1600px] mx-auto">
        <SectionHead num="02" label="Work">
          Selected systems
        </SectionHead>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          A few things I have actually shipped or am building in public. The rest lives in the lab.
        </p>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {FEATURED.map((project) => (
            <a
              key={project.id}
              href={project.href}
              target={project.external ? "_blank" : undefined}
              rel={project.external ? "noopener noreferrer" : undefined}
              className="group flex flex-col justify-between min-h-[22rem] rounded-2xl border border-white/10 bg-[#0A0D12] p-8 md:p-9 hover:border-[#62E6FF]/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#62E6FF]">
                    {project.kicker}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {project.status}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-3xl md:text-4xl font-bold tracking-tight group-hover:text-[#62E6FF] transition-colors">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-foreground/80">{project.tagline}</p>
                <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>
              <span className="mt-10 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-foreground/70 group-hover:text-[#62E6FF]">
                Open
                <ArrowUpRight className="size-3.5" />
              </span>
            </a>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-8">
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            Also in motion
          </span>
          {MORE.map((item) => (
            <span key={item.title} className="text-sm text-foreground/80">
              <strong className="font-medium text-foreground">{item.title}</strong>
              <span className="text-muted-foreground"> — {item.note}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
