import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Navigation } from "@/components/portfolio/Navigation";
import { Hero } from "@/components/portfolio/Hero";
import { LogoMarquee } from "@/components/portfolio/LogoMarquee";
import { AboutMe } from "@/components/portfolio/AboutMe";
import { PersonalTimeline } from "@/components/portfolio/PersonalTimeline";
import { LiveForensicScanner } from "@/components/portfolio/LiveForensicScanner";
import { Capabilities } from "@/components/portfolio/Capabilities";
import { Reveal } from "@/components/portfolio/Reveal";
import { ConsentBanner } from "@/components/privacy/ConsentBanner";
import { Footer } from "@/components/portfolio/Footer";
import { CyberTerminal } from "@/components/portfolio/CyberTerminal";

// Defer heavier below-the-fold sections for instant initial paint
const VisionAmbition3D = lazy(() =>
  import("@/components/portfolio/VisionAmbition3D").then((m) => ({ default: m.VisionAmbition3D }))
);
const HowIBuildLab = lazy(() =>
  import("@/components/portfolio/HowIBuildLab").then((m) => ({ default: m.HowIBuildLab }))
);
const ScreensAndSeoShowroom = lazy(() =>
  import("@/components/portfolio/ScreensAndSeoShowroom").then((m) => ({ default: m.ScreensAndSeoShowroom }))
);
const Projects = lazy(() =>
  import("@/components/portfolio/Projects").then((m) => ({ default: m.Projects }))
);
const ForensicDomains = lazy(() =>
  import("@/components/portfolio/ForensicDomains").then((m) => ({ default: m.ForensicDomains }))
);
const Dezo = lazy(() =>
  import("@/components/portfolio/Dezo").then((m) => ({ default: m.Dezo }))
);
const TechCertifications = lazy(() =>
  import("@/components/portfolio/TechCertifications").then((m) => ({ default: m.TechCertifications }))
);
const ExecutionEngine = lazy(() =>
  import("@/components/portfolio/ExecutionEngine").then((m) => ({ default: m.ExecutionEngine }))
);
const TarikIntelligence = lazy(() =>
  import("@/components/portfolio/TarikIntelligence").then((m) => ({ default: m.TarikIntelligence }))
);
const Contact = lazy(() =>
  import("@/components/portfolio/Contact").then((m) => ({ default: m.Contact }))
);

import { AskTarikAI } from "@/components/portfolio/AskTarikAI";
import { EngineInspectorModal } from "@/components/portfolio/EngineInspectorModal";
import { WorldCollapseClimax } from "@/components/portfolio/WorldCollapseClimax";
import { SystemHUD } from "@/components/portfolio/SystemHUD";
import { CommandPalette } from "@/components/portfolio/CommandPalette";
import { LiveSystemStatus } from "@/components/portfolio/LiveSystemStatus";
import { ProjectBriefForm } from "@/components/portfolio/ProjectBriefForm";
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
          
          {/* Main Hero with 3D Core, IST Clock & Portrait HUD */}
          <Hero />
          
          {/* Tarik Islam Personal Identity & Tenets Marquee */}
          <LogoMarquee />

          {/* Chapter 01: IDENTITY — Dedicated About Tarik Islam */}
          <Reveal>
            <AboutMe />
          </Reveal>

          {/* Chapter 02: EXPLORATION — Chronological Evolution & Personal Journey */}
          <Reveal>
            <PersonalTimeline />
          </Reveal>
          
          {/* Part 3: Vision & Ambition — 3D Intelligence Core */}
          <Suspense fallback={<SectionFallback />}>
            <Reveal>
              <VisionAmbition3D />
            </Reveal>
          </Suspense>

          {/* Chapter 03: SYSTEMS — How I Build: Tools, Architecture & Living Digital Laboratory */}
          <Suspense fallback={<SectionFallback />}>
            <Reveal>
              <HowIBuildLab />
            </Reveal>
          </Suspense>

          {/* Chapter 05: LAB — Screens, Products & SEO: Digital Showroom */}
          <Suspense fallback={<SectionFallback />}>
            <Reveal>
              <ScreensAndSeoShowroom />
            </Reveal>
          </Suspense>

          {/* Live Interactive Telemetry & Forensic Audit Engine */}
          <LiveForensicScanner />

          {/* Core Capabilities Matrix */}
          <Reveal>
            <Capabilities />
          </Reveal>

          {/* Chapter 04: WORK — Featured Case Files / Projects Showcase */}
          <Suspense fallback={<SectionFallback />}>
            <Reveal>
              <Projects />
            </Reveal>

            {/* Forensic Science Domains Atlas */}
            <Reveal>
              <ForensicDomains />
            </Reveal>

            {/* Dezo.in Studio Section */}
            <Reveal>
              <Dezo />
            </Reveal>

            {/* Technical & Cybersecurity Certifications */}
            <Reveal>
              <TechCertifications />
            </Reveal>

            {/* Part 6: Execution — Build. Learn. Evolve. Operating System */}
            <Reveal>
              <ExecutionEngine />
            </Reveal>

            {/* Curated Intelligence Radar — What I'm Watching */}
            <Reveal>
              <TarikIntelligence />
            </Reveal>

            {/* Part 9: World Collapse Architectural Convergence */}
            <Reveal>
              <WorldCollapseClimax />
            </Reveal>

            {/* Chapter 06: CONNECT — Direct Contact Deck */}
            <Reveal>
              <Contact />
            </Reveal>
          </Suspense>

          <Footer />
        </div>
      </main>

      {/* Persistent System HUD */}
      <SystemHUD />

      {/* Global Command Palette */}
      <CommandPalette />

      {/* Live System Status & Telemetry Modal */}
      <LiveSystemStatus />

      {/* Conversational Project Brief Intake Builder */}
      <ProjectBriefForm />

      {/* Interactive Cyber-Forensic Terminal HUD */}
      <CyberTerminal />

      {/* Interactive Ask Tarik AI Knowledge Guide */}
      <AskTarikAI />

      {/* Live Systems Engine Inspector Modal */}
      <EngineInspectorModal />

      {/* Privacy & Compliance Consent */}
      <ConsentBanner />

      {/* Laboratory Command Matrix Lightbox Modal */}
      <LabLightboxModal />
    </>
  );
}
