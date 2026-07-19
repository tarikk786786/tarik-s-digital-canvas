# Privacy-Safe Wow Visitor Experience — Phased Plan

This PRD spans ~22 systems (analytics, realtime presence, admin dashboard, live chat, AI guide, session replay, consent center, notifications). Shipping it in one pass would take hours and touch every layer. I'll break it into focused phases you can approve one at a time.

## Guiding principles (applied to every phase)
- Never claim to know an anonymous visitor's identity — all context is labeled "approximate".
- One profile photo, only in Hero (already enforced).
- No dark patterns; reject-tracking must equal accept-tracking in effort.
- No raw IPs stored or shown. Aggregate-only public presence.
- Consent gates analytics, personalization, replay, and chat independently.
- Server-render greeting; lazy-load everything non-critical. No CWV regression.

---

## Phase 1 — Foundation: Consent + Context (ship first)
Non-invasive scaffolding the rest depends on. No third-party accounts required.

- `src/lib/consent.ts` — typed consent store (essential/analytics/personalization/replay/communication), localStorage-backed, event bus.
- `src/components/privacy/ConsentBanner.tsx` — minimal, symmetric Accept/Reject, "Customize" opens center.
- `src/routes/privacy-controls.tsx` — full privacy center: toggles per category, clear local data, retention info, deletion request CTA.
- Update existing `src/routes/privacy.tsx` to link to controls.
- `src/lib/visitor-context.ts` — client-side approximate context: timezone, language, device category (UAParser-lite inline), referrer family (github/linkedin/search/direct), first-vs-returning (localStorage flag), saved theme.
- `src/routes/api/public/geo.ts` — server route returning `{ country, region, timezoneHint }` from Cloudflare request headers (`cf-ipcountry`, `cf-region`) — no MaxMind dep, no IP stored. Cached per session in `sessionStorage`.

## Phase 2 — Greeting Engine + Path Selector
- `src/lib/greeting.ts` — pure function: (context) → `{ salutation, welcomeLine, subLine }`. Time-of-day + referrer + returning logic per spec §6. All strings marked approximate.
- `src/components/portfolio/ArrivalGreeting.tsx` — replaces/augments hero intro line. Fades in after content paints (no blocking).
- `src/components/portfolio/PathSelector.tsx` — 9 intent chips per §7. Selection persisted locally; emits `visitor_path_selected` event.
- Cinematic arrival (§5): upgrade existing `CinematicIntro` to fingerprint→path→pulse→network→hero, ≤3s, skip button, reduced-motion variant, session-only.

## Phase 3 — Privacy-First Analytics
- Ship Umami-compatible event emitter `src/lib/analytics.ts` with all §13 events. Gated by analytics consent. No form values, no PII.
- No self-hosted infra required initially — emitter writes to a `/api/public/track` endpoint that logs aggregate counts to Supabase (bucketed by day/country/event). If you later point `VITE_UMAMI_URL` at a hosted Umami, emitter switches transport.
- Bot filter + rate limit on the ingest route.

## Phase 4 — Aggregate Realtime Presence
- Supabase Realtime channel `presence:site` with anonymous ephemeral tokens.
- Public component shows only `"N people exploring now"` + `"Visitors from K countries today"`.
- Server-side 5-minute expiry via `presence_pings` table + scheduled cleanup.

## Phase 5 — Voluntary Profile + Notifications
- `src/components/portfolio/IntroduceYourself.tsx` — optional form (§10 fields), Zod-validated, honeypot + rate-limited.
- `visitor_inquiries` table with RLS.
- ntfy webhook notification on submission (secret via `add_secret`), or email fallback via Lovable AI Gateway not applicable — use Resend if you want email; ntfy is simplest.

## Phase 6 — Owner Dashboard (`/admin/visitors`)
- Auth-gated route under `_authenticated/admin/` with `has_role('admin')` check.
- Shows anonymous session labels ("Visitor A7F2"), approximate country, device, referrer, current path, intent, conversion status. No raw IPs.
- Audit log table.

## Phase 7 — Live Chat (Chatwoot)
- Lazy-loaded Chatwoot widget behind communication consent. Configure via env vars. Offline → WhatsApp handoff (already wired).

## Phase 8 — AI Portfolio Guide
- Lovable AI Gateway (`google/gemini-2.5-flash`) grounded strictly on `src/content/*` (skills, certifications, profile, dezo, projects). System prompt forbids identity inference and requires page citations.
- `/api/chat` server route + floating drawer UI.

## Phase 9 — Consent-Gated Session Replay (OpenReplay)
- Only after explicit replay consent. Full input masking, block admin/auth/payment routes, 14-day retention. Off by default.

## Phase 10 — Hardening + Tests
- CSP headers, secure cookies, CSRF on mutating routes, dependency scan.
- Playwright suite covering §21 scenarios (first/returning/referrer/consent variants, no-IP-in-UI, single profile image, geo-failure fallback).

---

## What I'd ship in the next turn if you approve
**Phase 1 + Phase 2** together — consent system, privacy controls page, visitor context, server geo (Cloudflare headers, no MaxMind), greeting engine, path selector, upgraded 3s cinematic arrival. This delivers the visible "wow" and the privacy backbone without needing any third-party accounts or new secrets.

Phases 3–9 each need one small decision from you (analytics host, ntfy vs email, Chatwoot instance, OpenReplay project). I'll ask when we get there.

## Technical notes
- Stack stays TanStack Start + Lovable Cloud (Supabase). No Next.js swap.
- Geo uses Cloudflare Workers request headers already present at the edge — zero cost, no IP storage, no MaxMind bundle.
- All new tables ship with GRANTs + RLS in the same migration.
- Reduced-motion, data-saver, and no-JS fallbacks respected throughout.

Approve to proceed with **Phase 1 + Phase 2**, or tell me to reorder / drop phases.
