import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "./privacy";

export const Route = createFileRoute("/accessibility")({
  head: () => ({
    meta: [
      { title: "Accessibility — Tarik Islam" },
      { name: "description", content: "Accessibility commitments and current status of this site." },
      { property: "og:title", content: "Accessibility — Tarik Islam" },
      { property: "og:url", content: "/accessibility" },
    ],
    links: [{ rel: "canonical", href: "/accessibility" }],
  }),
  component: () => (
    <PolicyPage
      title="Accessibility"
      intro="This site targets WCAG 2.2 AA. Motion, contrast, and keyboard support are ongoing work — issues are treated as bugs, not polish."
      sections={[
        {
          heading: "Reduced motion",
          body: "When your system enables reduced motion, continuous particles, parallax, and cursor physics stop; content and functionality are unchanged.",
        },
        {
          heading: "Keyboard and screen readers",
          body: "All interactive elements should be reachable and operable by keyboard, with visible focus and semantic labels. Report anything that is not.",
        },
        {
          heading: "Report an issue",
          body: "If any part of this site is difficult to use, please contact Tarik directly — accessibility fixes are prioritized.",
        },
      ]}
    />
  ),
});
