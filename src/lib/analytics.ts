// Consent-gated analytics dispatcher. Zero deps. No PII.
// - No-ops until the "analytics" consent category is enabled.
// - Fires a CustomEvent("ti:analytics") on window so any provider
//   (Umami / PostHog / custom sink) can subscribe when wired later.
// - Buffers the last 50 events in sessionStorage for the admin dashboard
//   (once Cloud is enabled in Phase 2).

import { getConsent } from "./consent";

export type AnalyticsEvent =
  | "arrival_animation_completed"
  | "arrival_animation_skipped"
  | "intent_selected"
  | "project_opened"
  | "case_study_completed"
  | "resume_viewed"
  | "resume_downloaded"
  | "skills_filtered"
  | "certification_opened"
  | "dezo_viewed"
  | "contact_started"
  | "contact_submitted"
  | "chat_opened"
  | "meeting_booked"
  | "whatsapp_clicked"
  | "github_clicked"
  | "instagram_clicked"
  | "returning_visit";

export type SafeProps = Record<string, string | number | boolean | null | undefined>;

const BUFFER_KEY = "ti.analytics.buffer.v1";
const MAX_BUFFER = 50;

function isBrowser() {
  return typeof window !== "undefined";
}

// Strip anything that looks like free-text (>60 chars) to keep event
// properties safe. Contact-form text must never enter analytics.
function sanitize(props?: SafeProps): SafeProps {
  if (!props) return {};
  const out: SafeProps = {};
  for (const [k, v] of Object.entries(props)) {
    if (typeof v === "string" && v.length > 60) continue;
    out[k] = v;
  }
  return out;
}

export function track(event: AnalyticsEvent, props?: SafeProps) {
  if (!isBrowser()) return;
  const consent = getConsent();
  if (!consent.analytics) return;

  const payload = {
    event,
    props: sanitize(props),
    ts: Date.now(),
    path: window.location.pathname,
  };

  try {
    const raw = window.sessionStorage.getItem(BUFFER_KEY);
    const buf = raw ? (JSON.parse(raw) as unknown[]) : [];
    buf.push(payload);
    while (buf.length > MAX_BUFFER) buf.shift();
    window.sessionStorage.setItem(BUFFER_KEY, JSON.stringify(buf));
  } catch {
    // sessionStorage full or blocked — ignore
  }

  window.dispatchEvent(new CustomEvent("ti:analytics", { detail: payload }));
}

export function readBuffer(): unknown[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.sessionStorage.getItem(BUFFER_KEY);
    return raw ? (JSON.parse(raw) as unknown[]) : [];
  } catch {
    return [];
  }
}
