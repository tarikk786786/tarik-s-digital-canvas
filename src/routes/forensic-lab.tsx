import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const ForensicLabShell = lazy(() =>
  import("@/components/forensic-lab/ForensicLabShell").then((m) => ({
    default: m.ForensicLabShell,
  })),
);

export const Route = createFileRoute("/forensic-lab")({
  head: () => ({
    meta: [
      { title: "Forensic Intelligence Lab — Tarik Islam" },
      {
        name: "description",
        content:
          "Educational forensic lab with synthetic training cases, toxicology workflow, and evidence discipline. Not real evidence.",
      },
    ],
  }),
  component: ForensicLabPage,
});

function ForensicLabPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen grid place-items-center bg-[#050608] text-muted-foreground font-mono text-xs">
          Loading Forensic Lab…
        </div>
      }
    >
      <ForensicLabShell />
    </Suspense>
  );
}
