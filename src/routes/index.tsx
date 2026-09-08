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
const Contact = lazy(() =>
  import("@/components/portfolio/Contact").then((m) => ({ default: m.Contact }))
);

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
      <main id="top" className="relative min-h-dvh bg-background text-foreground overflow-hidden">
        <div className="relative z-10">
          <Navigation />
          
          {/* Main Hero with 3D Canvas, IST Clock & Portrait HUD */}
          <Hero />
          
          {/* Tarik Islam Personal Identity & Tenets Marquee */}
          <LogoMarquee />

          {/* Dedicated About Tarik Islam: Persona, Manifesto, & Mindset */}
          <Reveal>
            <AboutMe />
          </Reveal>

          {/* Chronological Evolution & Personal Journey */}
          <Reveal>
            <PersonalTimeline />
          </Reveal>
          
          {/* Part 3: Vision & Ambition — 3D Intelligence Core & Convergence Architecture */}
          <Suspense fallback={<SectionFallback />}>
            <Reveal>
              <VisionAmbition3D />
            </Reveal>
          </Suspense>

          {/* Part 4: How I Build — Tools, Architecture & Living Digital Laboratory */}
          <Suspense fallback={<SectionFallback />}>
            <Reveal>
              <HowIBuildLab />
            </Reveal>
          </Suspense>

          {/* Part 5: Screens, Products & SEO — Digital Showroom & Discovery Architecture */}
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

          {/* Featured Case Files / Projects Showcase */}
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

            {/* Direct Contact Deck */}
            <Reveal>
              <Contact />
            </Reveal>
          </Suspense>

          <Footer />
        </div>
      </main>

      {/* Interactive Cyber-Forensic Terminal HUD */}
      <CyberTerminal />

      {/* Privacy & Compliance Consent */}
      <ConsentBanner />
    </>
  );
}
