import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Navigation } from "@/components/portfolio/Navigation";
import { Hero } from "@/components/portfolio/Hero";
import { LogoMarquee } from "@/components/portfolio/LogoMarquee";
import { Capabilities } from "@/components/portfolio/Capabilities";
import { CinematicIntro } from "@/components/portfolio/CinematicIntro";
import { CustomCursor } from "@/components/portfolio/CustomCursor";
import { LivingBackground } from "@/components/portfolio/LivingBackground";
import { CommandPalette } from "@/components/portfolio/CommandPalette";
import { Reveal } from "@/components/portfolio/Reveal";
import { ConsentBanner } from "@/components/privacy/ConsentBanner";
import { PathSelector } from "@/components/portfolio/PathSelector";
import { SmoothScroll } from "@/components/portfolio/SmoothScroll";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { ReturningVisitorCard } from "@/components/portfolio/ReturningVisitorCard";
import { Spotlight } from "@/components/portfolio/Spotlight";
import { Footer } from "@/components/portfolio/Footer";

// Defer heavier below-the-fold sections so they don't block the hero paint.
const ForensicDomains = lazy(() =>
  import("@/components/portfolio/ForensicDomains").then((m) => ({ default: m.ForensicDomains })),
);
const TechCertifications = lazy(() =>
  import("@/components/portfolio/TechCertifications").then((m) => ({ default: m.TechCertifications })),
);
const Dezo = lazy(() =>
  import("@/components/portfolio/Dezo").then((m) => ({ default: m.Dezo })),
);
const Projects = lazy(() =>
  import("@/components/portfolio/Projects").then((m) => ({ default: m.Projects })),
);
const Timeline = lazy(() =>
  import("@/components/portfolio/Timeline").then((m) => ({ default: m.Timeline })),
);
const Lab = lazy(() =>
  import("@/components/portfolio/Lab").then((m) => ({ default: m.Lab })),
);
const Testimonials = lazy(() =>
  import("@/components/portfolio/Testimonials").then((m) => ({ default: m.Testimonials })),
);
const Contact = lazy(() =>
  import("@/components/portfolio/Contact").then((m) => ({ default: m.Contact })),
);

const SectionFallback = () => <div aria-hidden className="h-[40vh] w-full" />;

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <CinematicIntro />
      <SmoothScroll />
      <ScrollProgress />
      <CustomCursor />
      <CommandPalette />
      <main id="top" className="relative min-h-dvh bg-background text-foreground overflow-hidden">
        <LivingBackground />
        <Spotlight />

        <div className="relative z-10">
          <Navigation />
          <Hero />
          <PathSelector />
          <LogoMarquee />
          <Reveal><Capabilities /></Reveal>
          <Suspense fallback={<SectionFallback />}>
            <Reveal><ForensicDomains /></Reveal>
            <Reveal><TechCertifications /></Reveal>
            <Reveal><Dezo /></Reveal>
            <Reveal><Projects /></Reveal>
            <Reveal><Timeline /></Reveal>
            <Reveal><Lab /></Reveal>
            <Reveal><Testimonials /></Reveal>
            <Reveal><Contact /></Reveal>
          </Suspense>
          <Footer />
        </div>
      </main>
      <ConsentBanner />
      <ReturningVisitorCard />
    </>
  );
}
