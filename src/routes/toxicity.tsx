import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const ToxicologySafetyModule = lazy(() =>
  import("@/components/toxicology/ToxicologySafetyModule").then((m) => ({
    default: m.ToxicologySafetyModule,
  }))
);

export const Route = createFileRoute("/toxicity")({
  head: () => ({
    meta: [
      { title: "Toxicology & Chemical Safety Reference — Tarik Islam" },
      {
        name: "description",
        content:
          "Educational harm-reduction chemical safety reference, household incompatible mixture alerts, India AIIMS NPIC helpline, and clinical antidote directory.",
      },
    ],
  }),
  component: ToxicityPage,
});

function ToxicityPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen grid place-items-center bg-[#050608] text-muted-foreground font-mono text-xs">
          Loading Toxicology & Chemical Safety System…
        </div>
      }
    >
      <ToxicologySafetyModule />
    </Suspense>
  );
}
