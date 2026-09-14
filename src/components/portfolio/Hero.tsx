import { useEffect, useState } from "react";
import photoLab from "@/assets/tarik-photo-lab.jpg";
import profileImage from "@/assets/tarik-portrait-cutout.png";
import { TarikCore3D } from "./TarikCore3D";
import { LivingBackground } from "./LivingBackground";
import { MagneticButton } from "./MagneticButton";
import { ArrowUpRight, Maximize2 } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/contact-links";
import { PROFILE } from "@/lib/profile";
import { soundEngine } from "@/lib/sound-engine";
import { TechnicalLabel } from "@/components/system";

const ROLES = [
  "Forensic Science Specialist",
  "Investigation & Toxicology",
  "MCA · M.Tech Cyber & AI / Digital Forensics",
  "Founder, Dezo.in",
];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(media.matches);
    const onChange = () => setReduceMotion(media.matches);
    media.addEventListener("change", onChange);

    if (media.matches) return () => media.removeEventListener("change", onChange);

    const roleInterval = setInterval(() => {
      setRoleIndex((current) => (current + 1) % ROLES.length);
    }, 3200);

    return () => {
      clearInterval(roleInterval);
      media.removeEventListener("change", onChange);
    };
  }, []);

  const openLabLightbox = () => {
    soundEngine.playClick();
    window.dispatchEvent(new CustomEvent("tarik:open-lab-lightbox", { detail: { monitor: 1 } }));
  };

  return (
    <header
      id="top"
      className="relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden bg-[#050608] pt-24 pb-16 md:pt-28"
    >
      <LivingBackground />
      <div className="pointer-events-none absolute inset-0 -z-0 opacity-40">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628]/70 via-transparent to-[#1a0a08]/35" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1600px] grid-cols-1 items-center gap-12 px-6 md:px-12 lg:grid-cols-12 lg:gap-16 lg:px-16">
        <div className="flex flex-col justify-center lg:col-span-6">
          <TechnicalLabel className="mb-3 text-[#62E6FF]">
            Tarik Digital Canvas · Protocol 001
          </TechnicalLabel>
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
            Verified practitioner · Bhubaneswar · Dezo.in
          </p>

          <h1 className="font-display text-5xl font-extrabold leading-[0.9] tracking-tighter text-foreground sm:text-6xl md:text-7xl lg:text-[5.75rem]">
            Tarik Islam
          </h1>

          <div className="mt-5 flex min-h-7 items-center gap-3">
            <span className="h-px w-8 bg-[#62E6FF]" />
            <p className="font-mono text-sm uppercase tracking-[0.22em] text-[#62E6FF]">
              {reduceMotion ? PROFILE.identity : ROLES[roleIndex]}
            </p>
          </div>

          <p className="mt-8 max-w-xl font-display text-2xl font-light italic leading-snug tracking-tight text-foreground/90 sm:text-3xl md:text-4xl">
            Building intelligent systems that see the invisible.
          </p>

          <p className="mt-6 max-w-lg font-sans text-base leading-relaxed text-muted-foreground sm:text-lg">
            Forensic science specialist in{" "}
            <span className="text-foreground">investigation &amp; toxicology</span>
            — then MCA, then M.Tech in cyber security &amp; AI / digital forensics. Laboratory rigor
            applied to evidence, systems, and intelligence.
          </p>

          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[#62E6FF]/80">
            Evidence over assumptions · Zero trust by default
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton
              variant="primary"
              onClick={() => {
                soundEngine.playClick();
                window.location.href = "/lab";
              }}
              dataCursor="explore"
            >
              <span>Enter the laboratory</span>
              <ArrowUpRight className="size-4" />
            </MagneticButton>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundEngine.playClick()}
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:border-[#62E6FF]/50"
            >
              WhatsApp +91 91144 11026
            </a>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {[
              { href: "/find-someone?mode=live", label: "FIND DETAILS" },
              { href: "/world-os", label: "WORLD" },
              { href: "/forensic-lab", label: "FORENSIC" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => soundEngine.playClick()}
                className="rounded-full border border-white/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:border-[#62E6FF]/40 hover:text-[#62E6FF]"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="relative lg:col-span-6">
          <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-[#0A0D12] shadow-[0_0_80px_rgba(98,230,255,0.08)] lg:aspect-[5/6] lg:max-w-none">
            <div className="pointer-events-none absolute inset-0 opacity-35">
              <TarikCore3D className="size-full" />
            </div>

            <img
              src={photoLab}
              alt=""
              className="absolute inset-0 size-full object-cover opacity-30 saturate-75"
            />

            <img
              src={profileImage}
              alt="Tarik Islam, forensic science specialist in investigation and toxicology"
              className="relative z-10 size-full object-contain object-bottom drop-shadow-[0_20px_60px_rgba(0,0,0,0.65)]"
            />

            <button
              type="button"
              onClick={openLabLightbox}
              className="absolute right-5 bottom-5 z-20 inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#050608]/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:border-[#62E6FF]/40 hover:text-[#62E6FF]"
            >
              <Maximize2 className="size-3" />
              Peek the lab
            </button>
          </div>
          <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Investigation · Toxicology · Digital forensics
          </p>
        </div>
      </div>
    </header>
  );
}
