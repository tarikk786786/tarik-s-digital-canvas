import { Compass, Shield, Brain, Repeat, ArrowUpRight, MapPin } from "lucide-react";
import photoLab from "@/assets/tarik-photo-lab.jpg";
import photoWorking from "@/assets/tarik-photo-working.jpg";
import { PROFILE } from "@/lib/profile";
import { FORENSIC_SPECIALTIES, WHY_I_CHOSE_TECH } from "@/content/forensic-specialties";
import { soundEngine } from "@/lib/sound-engine";

const PILLARS = [
  {
    icon: Compass,
    title: "Evidence over assumptions",
    desc: "Question the surface. Verify what is true. Build what can withstand scrutiny.",
  },
  {
    icon: Shield,
    title: "Security by design",
    desc: "Trust boundaries first. Security is the architecture, not a badge at the end.",
  },
  {
    icon: Brain,
    title: "Intelligence with purpose",
    desc: "Agents and models that retrieve, reason, and assist — never invent credentials.",
  },
  {
    icon: Repeat,
    title: "Build, measure, improve",
    desc: "Research, ship, break, learn. Relentless iteration on systems that endure.",
  },
];

export function AboutMe() {
  return (
    <section
      id="about"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16 border-t border-white/5 bg-[#050608] overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none ambient-mesh-split opacity-50" />

      <div className="relative max-w-[1600px] mx-auto">
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#62E6FF] mb-4">
          01 / About
        </p>
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.02] max-w-4xl">
          Curiosity first.
          <span className="block italic font-light text-foreground/80">Then the laboratory.</span>
        </h2>
        <p className="mt-8 max-w-2xl font-sans text-lg md:text-xl text-muted-foreground leading-relaxed">
          {WHY_I_CHOSE_TECH.subheadline}
        </p>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-4">
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <img
                src={photoWorking}
                alt="Tarik Islam working at the laboratory bench"
                className="w-full aspect-[4/5] object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <img
                src={photoLab}
                alt="Multi-monitor forensic and engineering workstation"
                className="w-full aspect-[16/10] object-cover"
              />
            </div>
            <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              <MapPin className="size-3 text-[#62E6FF]" />
              {PROFILE.location}
            </p>
          </div>

          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-5 font-sans text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                I’m <strong className="text-foreground">Tarik Islam</strong> — a forensic scientist
                who learned to read the invisible in blood, ridges, and chemical traces, then
                carried that discipline into software, security, and AI.
              </p>
              <p>
                {PROFILE.professionalSummary}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PILLARS.map((pillar) => (
                <article
                  key={pillar.title}
                  className="rounded-2xl border border-white/10 bg-[#0A0D12] p-6"
                >
                  <pillar.icon className="size-5 text-[#62E6FF] mb-4" />
                  <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{pillar.desc}</p>
                </article>
              ))}
            </div>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground mb-6">
                Education
              </p>
              <ol className="relative space-y-0 border-l border-white/10 ml-2">
                {PROFILE.education.map((item, index) => (
                  <li key={item.degree} className="relative pl-8 pb-8 last:pb-0">
                    <span className="absolute left-[-5px] top-1.5 size-2.5 rounded-full bg-[#62E6FF]" />
                    <p className="font-mono text-[10px] uppercase tracking-widest text-[#62E6FF]">
                      0{index + 1}
                    </p>
                    <h3 className="mt-1 font-display text-2xl font-bold tracking-tight">
                      {item.degree}{" "}
                      <span className="font-light text-foreground/70">· {item.field}</span>
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xl">
                      {item.highlights}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground mb-4">
                Forensic ground
              </p>
              <div className="flex flex-wrap gap-2">
                {FORENSIC_SPECIALTIES.map((specialty) => (
                  <span
                    key={specialty.id}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground"
                  >
                    {specialty.title.replace("Forensic ", "")}
                  </span>
                ))}
              </div>
              <a
                href="#expertise"
                onClick={() => soundEngine.playClick()}
                className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#62E6FF] hover:underline"
              >
                Open the expertise matrix
                <ArrowUpRight className="size-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
