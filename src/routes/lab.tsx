import { createFileRoute } from "@tanstack/react-router";
import { LabHub } from "@/components/lab/LabHub";

export const Route = createFileRoute("/lab")({
  head: () => ({
    meta: [
      { title: "Laboratory — Tarik Digital Canvas" },
      {
        name: "description",
        content:
          "Enter Tarik Islam’s personal digital intelligence laboratory: World OS, FIND DETAILS, and Forensic Intelligence Lab.",
      },
    ],
  }),
  component: LabHub,
});
