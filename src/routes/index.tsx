import { createFileRoute } from "@tanstack/react-router";
import { Navigation } from "@/components/portfolio/Navigation";
import { Hero } from "@/components/portfolio/Hero";
import { LogoMarquee } from "@/components/portfolio/LogoMarquee";
import { Capabilities } from "@/components/portfolio/Capabilities";
import { Projects } from "@/components/portfolio/Projects";
import { Timeline } from "@/components/portfolio/Timeline";
import { Lab } from "@/components/portfolio/Lab";
import { Testimonials } from "@/components/portfolio/Testimonials";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-dvh bg-background text-foreground">
      <Navigation />
      <Hero />
      <LogoMarquee />
      <Capabilities />
      <Projects />
      <Timeline />
      <Lab />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
