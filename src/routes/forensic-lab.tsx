import { createFileRoute } from "@tanstack/react-router";
import { ForensicLabShell } from "@/components/forensic-lab/ForensicLabShell";

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
  component: ForensicLabShell,
});
