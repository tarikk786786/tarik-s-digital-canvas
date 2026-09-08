import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { PageTransition } from "@/components/portfolio/PageTransition";

function NotFoundComponent() {
  return (
    <div className="grain-overlay flex min-h-dvh items-center justify-center bg-[#0C0E12] px-6">
      <div className="max-w-md text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          PROTOCOL 404 — SIGNAL LOST
        </p>
        <h1 className="mt-6 font-display text-5xl font-bold tracking-tighter text-foreground">
          Off the Record.
        </h1>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          The requested forensic dossier or endpoint does not exist in the public archive.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-3 px-6 py-3 rounded-md bg-accent text-[#0C0E12] font-mono text-xs uppercase tracking-[0.25em] font-bold shadow-[0_0_20px_rgba(232,168,56,0.3)] hover:bg-accent-glow transition-all"
        >
          Return to Base Enclave
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#0C0E12] px-6">
      <div className="max-w-md text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-red-400">
          RUNTIME INTERCEPTION
        </p>
        <h1 className="mt-4 font-display text-2xl font-bold tracking-tight text-foreground">
          Telemetry stream interrupted.
        </h1>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="px-6 py-2.5 rounded-md bg-accent text-[#0C0E12] font-mono text-xs uppercase tracking-widest font-bold hover:bg-accent-glow transition-all"
          >
            Re-authenticate
          </button>
          <a
            href="/"
            className="px-6 py-2.5 rounded-md border border-white/15 text-foreground font-mono text-xs uppercase tracking-widest hover:bg-white/5 transition-all"
          >
            Home Enclave
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=5" },
      {
        title: "Tarik Islam — Multidisciplinary Technologist, Forensic Scientist, Cybersecurity Engineer & AI Builder",
      },
      {
        name: "description",
        content:
          "Official portfolio of Tarik Islam — Multidisciplinary Technologist, Forensic Scientist, Cybersecurity Engineer, AI Systems Builder, and Founder of Dezo.in. Building technology that matters with an evidence-first mindset.",
      },
      {
        name: "keywords",
        content:
          "Tarik Islam, Multidisciplinary Technologist, Forensic Scientist, Cybersecurity Engineer, AI Systems Builder, Autonomous AI Agents, Digital Forensics, Dezo.in, Memory Forensics, Incident Response, Zero Trust Architecture, AppSec, Full Stack Systems, React 19, TypeScript, Python, Rust, Cryptography, India AI",
      },
      { name: "author", content: "Tarik Islam" },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
      { name: "theme-color", content: "#0C0E12" },
      { name: "color-scheme", content: "dark" },

      // Open Graph Metadata
      { property: "og:site_name", content: "Tarik Islam — Digital Canvas" },
      { property: "og:type", content: "profile" },
      { property: "og:locale", content: "en_US" },
      { property: "og:url", content: "https://tarik-s-digital-canvas.vercel.app" },
      {
        property: "og:title",
        content: "Tarik Islam — Multidisciplinary Technologist, Forensic Scientist & AI Builder",
      },
      {
        property: "og:description",
        content:
          "Evidence over assumptions. Security by design. Intelligence with purpose. Build, measure, improve. Building technology that matters.",
      },
      {
        property: "og:image",
        content: "https://tarik-s-digital-canvas.vercel.app/android-chrome-512x512.png",
      },
      { property: "og:image:width", content: "512" },
      { property: "og:image:height", content: "512" },
      { property: "og:image:alt", content: "Tarik Islam — Digital Canvas Profile" },

      // Twitter Cards
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@tarik_islam_786" },
      { name: "twitter:creator", content: "@tarik_islam_786" },
      {
        name: "twitter:title",
        content: "Tarik Islam — Forensic Scientist & AI Developer",
      },
      {
        name: "twitter:description",
        content:
          "Building intelligent software, AI agent systems, and cybersecurity platforms that solve real-world problems.",
      },
      {
        name: "twitter:image",
        content: "https://tarik-s-digital-canvas.vercel.app/android-chrome-512x512.png",
      },
    ],
    links: [
      { rel: "canonical", href: "https://tarik-s-digital-canvas.vercel.app" },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://api.fontshare.com/v2/css?f[]=satoshi@400;500;700;900&f[]=general-sans@400;500;600&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;1,400&family=Instrument+Serif:ital@0;1&display=swap",
      },
    ],

    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Person",
              "@id": "https://tarik-s-digital-canvas.vercel.app/#person",
              name: "Tarik Islam",
              url: "https://tarik-s-digital-canvas.vercel.app",
              jobTitle: [
                "Multidisciplinary Technologist",
                "Forensic Scientist",
                "Cybersecurity Engineer",
                "AI Systems Builder",
                "Full Stack Systems Architect",
                "Founder & CEO",
              ],
              worksFor: {
                "@type": "Organization",
                name: "Dezo.in",
                url: "https://dezo.in",
              },
              sameAs: [
                "https://github.com/tarikk786786",
                "https://instagram.com/tarik_islam_786",
                "https://dezo.in",
              ],
              description:
                "Multidisciplinary technologist, forensic scientist, cybersecurity engineer, AI systems builder, and founder of Dezo.in. Building technology that matters.",
              knowsAbout: [
                "Digital Forensics",
                "Cybersecurity Engineering",
                "Autonomous AI Agents",
                "Zero Trust Architecture",
                "Memory Forensics",
                "Incident Response",
                "Full Stack Development",
                "TypeScript",
                "React 19",
                "Python",
                "Rust",
              ],
              address: {
                "@type": "PostalAddress",
                addressCountry: "IN",
              },
            },
            {
              "@type": "WebSite",
              "@id": "https://tarik-s-digital-canvas.vercel.app/#website",
              url: "https://tarik-s-digital-canvas.vercel.app",
              name: "Tarik Islam — Forensic Scientist, AI Developer & Founder",
              publisher: {
                "@id": "https://tarik-s-digital-canvas.vercel.app/#person",
              },
            },
            {
              "@type": "ProfilePage",
              "@id": "https://tarik-s-digital-canvas.vercel.app/#webpage",
              url: "https://tarik-s-digital-canvas.vercel.app",
              name: "Tarik Islam — Digital Canvas Dossier",
              mainEntity: {
                "@id": "https://tarik-s-digital-canvas.vercel.app/#person",
              },
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[999] focus:rounded-md focus:border focus:border-accent focus:bg-background focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-[0.2em] focus:text-accent"
        >
          Skip to content
        </a>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <PageTransition>
        <Outlet />
      </PageTransition>
    </QueryClientProvider>
  );
}
