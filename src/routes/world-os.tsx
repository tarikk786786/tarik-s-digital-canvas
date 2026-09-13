import { createFileRoute } from "@tanstack/react-router";
import { WorldOSShell } from "@/components/world-os/WorldOSShell";

export const Route = createFileRoute("/world-os")({
  head: () => ({
    meta: [
      { title: "WORLD OS — Tarik Islam" },
      {
        name: "description",
        content:
          "TARIK ISLAM // WORLD OS — public data grid with honest ONLINE / DEGRADED / OFFLINE source health.",
      },
    ],
  }),
  component: WorldOSShell,
});
