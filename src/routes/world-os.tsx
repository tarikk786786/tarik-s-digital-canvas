import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const WorldOSShell = lazy(() =>
  import("@/components/world-os/WorldOSShell").then((m) => ({ default: m.WorldOSShell })),
);

export const Route = createFileRoute("/world-os")({
  head: () => ({
    meta: [
      { title: "WORLD OS — Tarik Digital Canvas" },
      {
        name: "description",
        content:
          "WORLD OS — personal public data grid with honest ONLINE / DEGRADED / OFFLINE / AUTH_DEPENDENT source health. No fake counters.",
      },
    ],
  }),
  component: WorldOSPage,
});

function WorldOSPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen grid place-items-center bg-[#050608] text-muted-foreground font-mono text-xs">
          Loading World OS…
        </div>
      }
    >
      <WorldOSShell />
    </Suspense>
  );
}
