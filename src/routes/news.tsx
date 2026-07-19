import { createFileRoute } from "@tanstack/react-router";
import { Navigation } from "@/components/portfolio/Navigation";
import { Footer } from "@/components/portfolio/Footer";
import { LivingBackground } from "@/components/portfolio/LivingBackground";
import { NewsFeed } from "@/components/portfolio/NewsFeed";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "Intelligence Feed — Crime, Forensics & Technology · Tarik Islam" },
      {
        name: "description",
        content:
          "Curated headlines across crime investigation, digital forensics, cybersecurity, and modern web development — aggregated from two independent providers, refreshed every 20 minutes.",
      },
      { property: "og:title", content: "Intelligence Feed · Tarik Islam" },
      {
        property: "og:description",
        content:
          "Crime, forensics, cybersecurity, and web-development headlines curated for practitioners.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NewsPage,
});

function NewsPage() {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-background text-foreground">
      <LivingBackground />
      <div className="relative z-10">
        <Navigation />
        <NewsFeed />
        <Footer />
      </div>
    </main>
  );
}
