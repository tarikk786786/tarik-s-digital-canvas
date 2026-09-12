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
  import("@/components/portfolio/Projects").then((m) => ({ default: m.Projects })),
);
const Contact = lazy(() =>
  import("@/components/portfolio/Contact").then((m) => ({ default: m.Contact })),
);
const FindDetails = lazy(() =>
  import("@/components/portfolio/FindDetails").then((m) => ({ default: m.FindDetails })),
);

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

      <main
        id="top"
        className="relative min-h-dvh bg-background text-foreground overflow-hidden pb-12"
      >
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

          <Suspense fallback={<SectionFallback />}>
            <Reveal>
              <FindDetails />
            </Reveal>
          </Suspense>

          <Reveal>
            <Capabilities />
          </Reveal>

          <Suspense fallback={<SectionFallback />}>
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
