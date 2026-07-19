import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "./privacy";

export const Route = createFileRoute("/security")({
  head: () => ({
    meta: [
      { title: "Security — Tarik Islam" },
      { name: "description", content: "Responsible disclosure and security posture for this site." },
      { property: "og:title", content: "Security — Tarik Islam" },
      { property: "og:url", content: "/security" },
    ],
    links: [{ rel: "canonical", href: "/security" }],
  }),
  component: () => (
    <PolicyPage
      title="Security"
      intro="If you find a security issue on this site or in a public repository, please disclose it responsibly."
      sections={[
        {
          heading: "Responsible disclosure",
          body: "Report suspected vulnerabilities privately via WhatsApp or email before any public post. You will get an acknowledgement and a timeline.",
        },
        {
          heading: "Scope",
          body: "This site, its public repositories, and any explicitly listed Dezo.in services. Please do not test against private infrastructure or third-party integrations.",
        },
        {
          heading: "Good faith",
          body: "Research conducted in good faith, without data exfiltration, service disruption, or privacy violation, will not be pursued.",
        },
      ]}
    />
  ),
});
