import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "./privacy";

export const Route = createFileRoute("/security")({
  head: () => ({
    meta: [
      { title: "Security — Tarik Islam" },
      {
        name: "description",
        content: "Responsible disclosure and security posture for this site.",
      },
      { property: "og:title", content: "Security — Tarik Islam" },
      { property: "og:url", content: "/security" },
    ],
    links: [{ rel: "canonical", href: "/security" }],
  }),
  component: () => (
    <PolicyPage
      title="Security & Technical Architecture"
      intro="If you find a security issue on this site or in a public repository, please disclose it responsibly. This page also documents Tarik's technical architecture, client-side isolation, and data protection posture."
      sections={[
        {
          heading: "Responsible disclosure",
          body: "Report suspected vulnerabilities privately via WhatsApp or email before any public post. You will get an acknowledgement and a timeline.",
        },
        {
          heading: "Technical Architecture & Private Transparency",
          body: "The platform is built on TanStack Start with React 19 and compiled to Cloudflare edge modules via Nitro. All public intelligence and forensic verification tools execute entirely client-side or through read-only recursive edge APIs. The platform maintains zero database persistence of user searches, zero third-party behavioral trackers, and absolute isolation of credentials. Internal secrets, private APIs, and credentials are never shipped in client bundles.",
        },
        {
          heading: "Evidentiary Standards & ISO/IEC 27037",
          body: "Evidence handling in the Forensic Intelligence Lab complies with ISO/IEC 27037 and RFC 3227. Working copies are cryptographically sealed with client-side SHA-256 digests via W3C Web Crypto Subtle API. No data leaves the browser session during local file or image triage.",
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
