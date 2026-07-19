import { createFileRoute } from "@tanstack/react-router";
import { Navigation } from "@/components/portfolio/Navigation";
import { Hero } from "@/components/portfolio/Hero";
import { LogoMarquee } from "@/components/portfolio/LogoMarquee";
import { Capabilities } from "@/components/portfolio/Capabilities";
import { ForensicDomains } from "@/components/portfolio/ForensicDomains";
import { TechCertifications } from "@/components/portfolio/TechCertifications";

import { Dezo } from "@/components/portfolio/Dezo";
import { Projects } from "@/components/portfolio/Projects";
import { Timeline } from "@/components/portfolio/Timeline";
import { Lab } from "@/components/portfolio/Lab";
import { Testimonials } from "@/components/portfolio/Testimonials";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { CinematicIntro } from "@/components/portfolio/CinematicIntro";
import { CustomCursor } from "@/components/portfolio/CustomCursor";
import { LivingBackground } from "@/components/portfolio/LivingBackground";
import { CommandPalette } from "@/components/portfolio/CommandPalette";
import { Reveal } from "@/components/portfolio/Reveal";
import { ConsentBanner } from "@/components/privacy/ConsentBanner";
import { PathSelector } from "@/components/portfolio/PathSelector";
import { SmoothScroll } from "@/components/portfolio/SmoothScroll";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <CinematicIntro />
      <SmoothScroll />
      <CustomCursor />
      <CommandPalette />
      <main id="top" className="relative min-h-dvh bg-background text-foreground overflow-hidden">
        <LivingBackground />
        <div className="relative z-10">
          <Navigation />
          <Hero />
          <PathSelector />
          <LogoMarquee />
          <Reveal><Capabilities /></Reveal>
          <Reveal><ForensicDomains /></Reveal>
          <Reveal><TechCertifications /></Reveal>

          <Reveal><Dezo /></Reveal>
          <Reveal><Projects /></Reveal>
          <Reveal><Timeline /></Reveal>
          <Reveal><Lab /></Reveal>
          <Reveal><Testimonials /></Reveal>
          <Reveal><Contact /></Reveal>
          <Footer />
        </div>
      </main>
      <ConsentBanner />
    </>
  );
}
