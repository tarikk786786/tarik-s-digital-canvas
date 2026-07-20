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
    <div className="grain-overlay flex min-h-dvh items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
          Protocol 404 — Signal lost
        </p>
        <h1 className="mt-6 text-6xl font-medium tracking-tighter text-foreground">
          Off the record.
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The page you're looking for doesn't exist in the archive.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-3 border border-accent bg-accent/5 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.25em] text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          Return to base
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
    <div className="flex min-h-dvh items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-destructive">
          Runtime exception
        </p>
        <h1 className="mt-4 text-2xl font-medium tracking-tight text-foreground">
          Something interrupted the transmission.
        </h1>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="border border-accent bg-accent px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-accent-foreground transition-colors hover:bg-accent/90"
          >
            Retry
          </button>
          <a
            href="/"
            className="border border-border px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-secondary"
          >
            Home
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
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        title:
          "Tarik Islam — Forensic Scientist, AI Developer & Cybersecurity Engineer",
      },
      {
        name: "description",
        content:
          "Portfolio of Tarik Islam — building intelligent software, AI systems, cybersecurity platforms, and digital products that solve real-world problems.",
      },
      { name: "author", content: "Tarik Islam" },
      { name: "theme-color", content: "#0a0d10" },
      {
        property: "og:title",
        content:
          "Tarik Islam — Forensic Scientist, AI Developer & Cybersecurity Engineer",
      },
      {
        property: "og:description",
        content:
          "Building intelligent software, AI systems, cybersecurity platforms, and scalable businesses.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Tarik Islam" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Tarik Islam — Forensic Scientist, AI Developer",
      },
      {
        name: "twitter:description",
        content:
          "Building intelligent software, AI systems, and cybersecurity platforms that solve real-world problems.",
      },
    ],
    links: [
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
        href: "https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,300..800;1,300..800&family=JetBrains+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap",
      },
    ],

    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Tarik Islam",
          jobTitle: [
            "Forensic Scientist",
            "Cybersecurity Engineer",
            "AI Developer",
            "Full Stack Developer",
            "Founder",
          ],
          description:
            "Building intelligent software, AI systems, cybersecurity platforms, and scalable businesses that solve real-world problems.",
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
