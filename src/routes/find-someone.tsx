import { createFileRoute } from "@tanstack/react-router";
import { FindSomeoneApp } from "@/components/find-someone/FindSomeoneApp";

export const Route = createFileRoute("/find-someone")({
  validateSearch: (search: Record<string, unknown>) => ({
    id: typeof search.id === "string" ? search.id : undefined,
    mode: search.mode === "live" ? ("live" as const) : ("demo" as const),
    q: typeof search.q === "string" ? search.q : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Intelligence Console — Search the Public Information Layer | Tarik Islam" },
      {
        name: "description",
        content:
          "Search people, organizations, websites, companies and public evidence across the open web. Controlled, evidence-grounded intelligence discovery across statutory registries, corporate filings, documents, and public profiles.",
      },
      {
        property: "og:title",
        content: "Intelligence Console — Search the Public Information Layer",
      },
      {
        property: "og:description",
        content:
          "Find the public information trail. Input anything you know — the console automatically determines relevant public sources and verifies evidence with zero speculation.",
      },
      { property: "og:url", content: "/find-someone" },
    ],
    links: [{ rel: "canonical", href: "/find-someone" }],
  }),
  component: FindSomeonePage,
});

function FindSomeonePage() {
  return <FindSomeoneApp />;
}
