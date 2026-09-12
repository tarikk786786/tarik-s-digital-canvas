import { useEffect, useState } from "react";
import photoLab from "@/assets/tarik-photo-lab.jpg";
import profileImage from "@/assets/tarik-portrait-cutout.png";
import { TarikCore3D } from "./TarikCore3D";
import { MagneticButton } from "./MagneticButton";
import { ArrowUpRight, Maximize2 } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/contact-links";
import { PROFILE } from "@/lib/profile";
import { soundEngine } from "@/lib/sound-engine";

const ROLES = [
  "Forensic Scientist",
  "Cybersecurity Engineer",
  "AI Systems Builder",
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
      className="relative min-h-[100svh] w-full flex flex-col justify-center pt-24 md:pt-28 pb-16 overflow-hidden bg-[#050608]"
    >
      <div className="absolute inset-0 pointer-events-none -z-0 ambient-mesh-hero">
        <div className="absolute inset-0 grid-bg opacity-20" />
      </div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-6 flex flex-col justify-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#62E6FF] mb-5">
            Bhubaneswar · Dezo.in
          </p>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.75rem] font-extrabold tracking-tighter leading-[0.9] text-foreground">
            Tarik Islam
          </h1>

          <div className="mt-5 flex items-center gap-3 min-h-7">
            <span className="h-px w-8 bg-[#62E6FF]" />
            <p className="font-mono text-sm uppercase tracking-[0.22em] text-[#62E6FF]">
              {reduceMotion ? PROFILE.identity : ROLES[roleIndex]}
            </p>
          </div>

          <p className="mt-8 max-w-xl font-display text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-foreground/90 leading-snug">
            {PROFILE.headline}
          </p>

          <p className="mt-6 max-w-lg font-sans text-base sm:text-lg text-muted-foreground leading-relaxed">
            Forensic scientist. Cybersecurity engineer. AI builder. I investigate
            what systems hide — then engineer software that can stand up to
            scrutiny.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton
              variant="primary"
              onClick={() => {
                document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
              }}
              dataCursor="explore"
            >
              <span>See my work</span>
              <ArrowUpRight className="size-4" />
            </MagneticButton>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundEngine.playClick()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/15 bg-white/[0.04] font-mono text-xs uppercase tracking-[0.2em] text-foreground hover:border-[#62E6FF]/50 transition-colors"
            >
              Talk to me
            </a>
          </div>
        </div>

        <div className="lg:col-span-6 relative">
          <div className="relative mx-auto max-w-md lg:max-w-none aspect-[4/5] lg:aspect-[5/6] overflow-hidden rounded-[2rem] border border-white/10 bg-[#0A0D12]">
            <div className="absolute inset-0 opacity-40 pointer-events-none">
              <TarikCore3D className="size-full" />
            </div>

            <img
              src={photoLab}
              alt=""
              className="absolute inset-0 size-full object-cover opacity-25 saturate-75"
            />

            <img
              src={profileImage}
              alt="Tarik Islam, forensic scientist and founder of Dezo.in"
              className="relative z-10 size-full object-contain object-bottom drop-shadow-[0_20px_60px_rgba(0,0,0,0.65)]"
            />

            <button
              type="button"
              onClick={openLabLightbox}
              className="absolute bottom-5 right-5 z-20 inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#050608]/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-[#62E6FF] hover:border-[#62E6FF]/40 transition-colors"
            >
              <Maximize2 className="size-3" />
              Peek the lab
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
