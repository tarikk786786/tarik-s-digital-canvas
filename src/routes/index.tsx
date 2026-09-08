import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Navigation } from "@/components/portfolio/Navigation";
import { Hero } from "@/components/portfolio/Hero";
import { LogoMarquee } from "@/components/portfolio/LogoMarquee";
import { AboutMe } from "@/components/portfolio/AboutMe";
import { Capabilities } from "@/components/portfolio/Capabilities";
import { Reveal } from "@/components/portfolio/Reveal";
import { ConsentBanner } from "@/components/privacy/ConsentBanner";
import { Footer } from "@/components/portfolio/Footer";

// Defer heavier below-the-fold sections for instant initial paint
const Projects = lazy(() =>
  import("@/components/portfolio/Projects").then((m) => ({ default: m.Projects }))
);
const HowIBuildLab = lazy(() =>
  import("@/components/portfolio/HowIBuildLab").then((m) => ({ default: m.HowIBuildLab }))
);
const ForensicEncyclopediaAI = lazy(() =>
  import("@/components/portfolio/ForensicEncyclopediaAI").then((m) => ({
    default: m.ForensicEncyclopediaAI,
  }))
);
const ExecutionEngine = lazy(() =>
  import("@/components/portfolio/ExecutionEngine").then((m) => ({ default: m.ExecutionEngine }))
);
const Contact = lazy(() =>
  import("@/components/portfolio/Contact").then((m) => ({ default: m.Contact }))
);

import { WorldCollapseClimax } from "@/components/portfolio/WorldCollapseClimax";
import { CommandPalette } from "@/components/portfolio/CommandPalette";
import { ProjectBriefForm } from "@/components/portfolio/ProjectBriefForm";
import { AskTarikAI } from "@/components/portfolio/AskTarikAI";
import { SmartLoader } from "@/components/portfolio/SmartLoader";
import { LabLightboxModal } from "@/components/portfolio/LabLightboxModal";

const SectionFallback = () => (
  <div aria-hidden className="h-[30vh] w-full flex items-center justify-center">
    <span className="size-6 border-2 border-accent/40 border-t-accent rounded-full animate-spin" />
  </div>
);

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      {/* Smart Loading Experience */}
      <SmartLoader />

      <main id="top" className="relative min-h-dvh bg-background text-foreground overflow-hidden pb-12">
        <div className="relative z-10">
          <Navigation />
          
          {/* Main Hero with Workstation HUD, IST Clock & 3D Core */}
          <Hero />
          
          {/* Identity & Tenets Marquee */}
          <LogoMarquee />

          {/* Section 01: ABOUT — Identity, Philosophy, Laboratory Evidence & Milestones */}
          <Reveal>
            <AboutMe />
          </Reveal>

          {/* Section 02: WORK — Selected Systems, Venture & Applied R&D (Promoted to position #2) */}
          <Suspense fallback={<SectionFallback />}>
            <Reveal>
              <Projects />
            </Reveal>
          </Suspense>

          {/* Section 03: EXPERTISE — Unified Core Matrix, OSINT Arsenal, Forensic Domains & Roadmap */}
          <Reveal>
            <Capabilities />
          </Reveal>

          {/* Section 04: AI FORENSIC CODEX — Evidence Encyclopedia, Reasoning Copilot & Hash Lab */}
          <Suspense fallback={<SectionFallback />}>
            <Reveal>
              <ForensicEncyclopediaAI />
            </Reveal>
          </Suspense>

          {/* Section 05: SYSTEMS — How I Build: Living Digital Laboratory & 3D Architecture */}
          <Suspense fallback={<SectionFallback />}>
            <Reveal>
              <HowIBuildLab />
            </Reveal>
          </Suspense>

          {/* Section 05: PHILOSOPHY & EXECUTION — The Builder's Loop & Failure Truth */}
          <Suspense fallback={<SectionFallback />}>
            <Reveal>
              <ExecutionEngine />
            </Reveal>

            {/* Architectural Convergence & Statement */}
            <Reveal>
              <WorldCollapseClimax />
            </Reveal>

            {/* Section 06: CONNECT — High-Stakes Inquiries & Direct Comms */}
            <Reveal>
              <Contact />
            </Reveal>
          </Suspense>

          <Footer />
        </div>
      </main>

      {/* Global Command Palette */}
      <CommandPalette />

      {/* Conversational Project Brief Intake Builder */}
      <ProjectBriefForm />

      {/* Interactive Ask Tarik AI Knowledge Guide */}
      <AskTarikAI />

      {/* Privacy & Compliance Consent */}
      <ConsentBanner />

      {/* Laboratory Command Matrix Lightbox Modal */}
      <LabLightboxModal />
    </>
  );
}
