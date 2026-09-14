# PHASE 0 — FULL REPOSITORY AUDIT
**Project:** Tarik Digital Canvas (`c:\Users\tarik\Downloads\portpolio`)  
**Date:** 2026-09-13  
**Auditor role:** Principal engineer (non-destructive)  
**Identity to preserve:** TARIK DIGITAL CANVAS · PROTOCOL 001 · VERIFIED PRACTITIONER · Building intelligent systems that see the invisible · EVIDENCE OVER ASSUMPTIONS · ZERO TRUST BY DEFAULT  

---

## Diagnostic script results

| Script | Command | Result |
|--------|---------|--------|
| Build | `npm run build` | **PASS** (exit 0) |
| Typecheck | `npx tsc --noEmit` | **FAIL** — 1 error: `InformationKernelPanel.tsx` Link `search` missing `id`/`q` |
| Lint | `npm run lint` | **FAIL** — ~23k prettier CRLF (`Delete ␍`) on Windows; not introduced by lab work; do not mass-`--fix` without approval |
| Test | _(none in package.json)_ | **N/A** — no `test` script |
| Format | `prettier --write .` | Available; not run (would rewrite CRLF globally) |

---

## CURRENT ARCHITECTURE

```
Portfolio (personal-first homepage)
  ├── /lab                 Lab hub → three engines
  ├── /world-os            WORLD ENGINE shell
  ├── /find-someone        INFORMATION ENGINE (FIND DETAILS)
  ├── /forensic-lab        FORENSIC ENGINE shell
  └── /api/*               Server handlers (Nitro / TanStack Start)

InsForge (linked): tarik-digital-canvas
  API https://dwctb4hp.ap-southeast.insforge.app
  SDK client scaffolded; schema mostly empty; not yet primary data plane
```

**Runtime:** TanStack Start + Vite 8 + Nitro → Vercel (prod alias ebon) / Cloudflare module build artifact also generated.  
**UI:** React 19 + Tailwind CSS 4 + Radix + Motion + Lenis + Three.js + @xyflow/react.  
**Philosophy split:** Presentation DOM vs WebGL islands vs server adapters.

---

## CURRENT TECH STACK

- **Framework:** `@tanstack/react-start` / `@tanstack/react-router` / React 19.2 / TypeScript 5.8  
- **CSS:** Tailwind 4.2 (`@tailwindcss/vite`), design tokens in `src/lib/tokens/*` + `src/styles.css`  
- **3D:** `three` 0.185, portfolio Core / LiveWorld3D  
- **Graphs:** `@xyflow/react` (FIND DETAILS relationships)  
- **Backend SDK:** `@insforge/sdk` 1.5.2  
- **Validation:** Zod  
- **Deploy:** Vercel CLI / GitHub `main` (Lovable-synced — no force push)  
- **Package manager:** npm (`package-lock.json`)

---

## CURRENT FEATURES

| Area | Status |
|------|--------|
| Personal portfolio (Hero, About, Projects, Contact) | Working; forensic identity partially updated |
| Cmd+K CommandPalette | Working; needs lab route commands |
| Ask Tarik AI | Scripted RAG-like UI (not live model gateway) |
| FIND DETAILS demo dossier | Working |
| FIND DETAILS live kernel | Partial — DNS/RDAP/CT/Wayback via `/api/intelligence` |
| World OS | Partial — USGS + Open-Meteo live; AIR OFFLINE; stubs for others |
| Forensic Lab CASE 0001 | Working educational shell |
| OsintArsenal | Still in tree; Capabilities tab uses InformationKernelPanel instead |
| InsForge | Linked + client; DB unused for cases/jobs |
| News API | Working route |
| Privacy/consent | Present |

---

## CURRENT ROUTES

### Pages
`/`, `/lab`, `/world-os`, `/find-someone`, `/forensic-lab`, `/resume`, `/skills`, `/certifications`, `/news`, `/privacy`, `/privacy-controls`, `/security`, `/accessibility`, `/sitemap.xml`

### API
`/api/intelligence` (investigate + world), `/api/investigations`, `/api/uploads`, `/api/news`

---

## CURRENT COMPONENTS (high-signal)

- **Lab:** `LabHub`, `WorldOSShell`, `ForensicLabShell`, `FindSomeoneApp` (+ investigation suite)  
- **Portfolio:** Hero, AboutMe, Capabilities, FindDetails, InformationKernelPanel, CommandPalette, Navigation, Projects, Contact, many 3D/showroom modules  
- **Legacy risk:** `OsintArsenal.tsx` still exposes tool inventory if routed; Capabilities redirected to kernel panel  
- **UI kit:** Full Radix shadcn-style `src/components/ui/*`

---

## CURRENT DATA FLOW

1. **FIND DETAILS live:** Browser → `POST /api/intelligence` → `classifyQuery` → parallel HTTP collectors → evidence JSON → UI (chips + provenance).  
2. **FIND DETAILS demo:** Local `DEMO_INVESTIGATION` content.  
3. **World OS:** Browser → `GET /api/intelligence?kind=world` → adapter `healthCheck`/`fetch` → objects + health.  
4. **Forensic:** Static `CASE_0001` content; browser SHA-256 demo; no worker queue yet.  
5. **InsForge:** Env + `getInsforge()` ready; no tables wired in app path.

---

## CURRENT AI FLOW

- `AskTarikAI` — client keyword/persona responses; not InsForge AI gateway.  
- Forensic encyclopedia AI — simulation UI.  
- No production LLM dependency in build for kernel.

---

## CURRENT FORENSIC FEATURES

- `/forensic-lab` shell: disciplines, TOX workflow UI, synthetic MS peaks, digital hash demo, Ask the Lab FAQ, Standards Watch placeholders.  
- `src/lib/forensic/types.ts` (WIP untracked): analysis contract + discipline enums started.  
- Portfolio simulators (`ForensicLabSimulator`, BPA, GC-MS UI) still on homepage ecosystem historically.  
- **Missing:** full `FORENSIC_REPOSITORY_REGISTRY`, worker health UI, InsForge case tables, quarantine messaging as first-class.

---

## CURRENT INFORMATION FEATURES

- Classifier + collectors (DNS, RDAP, CT, Wayback) + AUTH_DEPENDENT stubs (India/username/phone).  
- Demo investigation workspace (rich).  
- `osint-tools.ts` content exists as internal catalogue — must never be visitor chrome.

---

## CURRENT VISUAL SYSTEM

- Dark void `#050608`, cyan accent `#62E6FF`, tokens in `lib/tokens/colors.ts`.  
- Ambient mesh utilities, grain, Reveal, LivingBackground, SystemHUD exist.  
- **Missing vs Visual PRD:** unified semantic CSS vars (LIVE/PROCESSING/…), global real status bar, living-hero ambient with reduced-motion, architecture pulse diagram as homepage section.

---

## CURRENT DEPLOYMENT

- GitHub: `tarikk786786/tarik-s-digital-canvas` · branch `main`  
- Vercel project under `tarik-pro-fitness` · alias `tarik-s-digital-canvas-ebon.vercel.app`  
- Also referenced: `tarik-s-digital-canvas.vercel.app`, custom domain `tarikislam.in` (308 observed historically)  
- Lovable-connected — linear history only

---

## CURRENT DEPENDENCIES

Heavy but coherent: Radix suite, TanStack, Three, xyflow, motion, insforge.  
**No** Cesium, Redis, Neo4j, MinIO, Autopsy, Volatility in package.json (correct for V1).

---

## DUPLICATE CAPABILITIES

| Capability | Instances | Recommendation |
|------------|-----------|----------------|
| Evidence confidence types | `lab/evidence.ts`, `forensic/types.ts`, find-someone scoring | Unify under `lib/kernel/model.ts` |
| Source adapters | find-someone/adapters, world-os/adapters, intelligence/collectors | Shared `SourceAdapter` contract + registries |
| Globe / world | LiveWorld3D (demo), WorldOSShell (live) | Keep both; label DEMO vs LIVE |
| Tools inventory | OsintArsenal + osint-tools.ts | Keep file internal; never surface as tools page |
| Architecture diagrams | find-someone ArchitectureDiagram, HowIBuildLab | Reuse patterns for homepage Architecture section |

---

## REUSABLE COMPONENTS

CommandPalette, ConfidenceBar, EvidenceChain, RelationshipGraph (xyflow), Reveal, MagneticButton, LiveProgress, InformationKernelPanel, LabHub, tokens, InsForge client.

---

## BROKEN FEATURES

1. **TSC:** InformationKernelPanel Link search typing.  
2. **Lint:** CRLF noise (environment).  
3. **Live FIND DETAILS:** Limited query classes return empty (person/username) except AUTH_DEPENDENT stubs — expected honesty, UX should guide to domain queries.  
4. **crt.sh:** Intermittent 502 from some networks.  
5. **Cloudflare DoH:** May 400 if Accept header wrong in some clients (server fetch OK generally).  
6. **OsintArsenal** orphan risk if hash-linked.  
7. **InsForge memory/AI** paid-plan limits (ops, not app crash).

---

## TECHNICAL DEBT

- Massive portfolio component surface (showroom, climax, multiple labs) vs three-engine narrative.  
- Homepage order still Work-before-Architecture/World.  
- No automated tests.  
- Dual docs (`MASTER_BUILD_PRD.md` vs chat PRDs) — reconcile via this audit.  
- `live-world-data.ts` demo entities must never be labeled LIVE.

---

## SECURITY ISSUES

- SSRF checks on investigations create path — keep for URL inputs.  
- Intelligence CORS `*` — tighten to site origins for production.  
- Anon key in `VITE_*` is by design; never expose `API_KEY`.  
- Quarantine: untrusted uploads must not execute in browser main (uploads route exists — verify policy).  
- No private surveillance features present (good).

---

## PERFORMANCE ISSUES

- Three.js + xyflow chunks large (build warns >500kB).  
- Homepage loads many sections; lab engines correctly separate routes.  
- Ambient/WebGL should respect `prefers-reduced-motion` and IntersectionObserver (partially done).

---

## MISSING CAPABILITIES (vs master PRDs)

- Design system primitives set (TechnicalLabel, SystemIndicator, …) as shared exports  
- Central motion system module  
- Unified kernel data model  
- Forensic repository registry + health panel  
- InsForge Postgres tables for cases/jobs  
- IP/ASN + geocode collectors  
- Global status bar wired to real registries  
- Visual living-lab hero polish  
- Cesium / OpenSky proxy / AIS — deferred  
- Heavy forensic workers — WORKER_PENDING only

---

## RECOMMENDED ARCHITECTURE

```
SHARED KERNEL (model + provenance + confidence)
    ├── WORLD_ADAPTERS (public feeds)
    ├── INFORMATION_COLLECTORS (public HTTP)
    └── FORENSIC_WORKERS (browser ONLINE | WORKER_PENDING)
          ↓
     InsForge Postgres (cases, evidence, jobs) — progressive
          ↓
     Visitor UI: EXPLORE / SEARCH / ASK / ANALYZE / INVESTIGATE / LEARN
```

**Search V1:** Postgres/InsForge full-text later; in-app demo search for now.  
**Vector:** PENDING (Qdrant later).  
**Graph DB:** Neo4j NOT V1 — xyflow + future NetworkX worker.  
**Object storage:** InsForge storage (not MinIO).

---

## MIGRATION PLAN

1. Stabilize TSC + keep build green.  
2. Land shared kernel model + forensic registry (capability map).  
3. Design primitives + CSS semantic vars + status bar.  
4. Expand live collectors (IP, DNS multi-RR, geocode).  
5. Wire Forensic Lab worker status + evidence graph (xyflow).  
6. Hero CTAs + Cmd+K lab commands + homepage order tweak.  
7. InsForge SQL for `forensic_cases` / `forensic_jobs` when CLI available.  
8. Defer Cesium/Redis/Autopsy installs.

---

## FILE-BY-FILE CHANGE PLAN (next phases)

| File | Action |
|------|--------|
| `docs/PHASE0_AUDIT.md` | Create (this file) |
| `src/lib/kernel/model.ts` | Shared Observation/Evidence/… |
| `src/lib/forensic/registry.ts` | FORENSIC_REPOSITORY_REGISTRY |
| `src/lib/forensic/adapter.ts` | ForensicAdapter interface |
| `src/lib/intelligence/collectors.ts` | Expand live collectors |
| `src/components/lab/primitives.tsx` | Design primitives |
| `src/components/lab/SystemStatusBar.tsx` | Real health bar |
| `src/components/lab/LabArchitecture.tsx` | Interactive flow |
| `src/components/forensic-lab/*` | Registry panel + graph |
| `src/components/portfolio/Hero.tsx` | Living CTAs |
| `src/components/portfolio/CommandPalette.tsx` | Lab instruments |
| `src/routes/index.tsx` | Section order |
| `src/styles.css` | Semantic CSS variables |
| `InformationKernelPanel.tsx` | Fix Link search types |

---

## Progress vs prior PRDs

| PRD | In repo | Gap |
|-----|---------|-----|
| World OS first slice | Yes `/world-os` | Cesium, ADS-B, AIS, cameras |
| Information Kernel | Yes API + UI | More collectors; InsForge persistence |
| Forensic Lab | Yes CASE 0001 | Registry, workers, InsForge jobs |
| Visual living lab | Partial tokens/HUD | Status bar, motion system, hero ambient |
| InsForge link | Yes | Schema + app usage |
| No tool chrome | Mostly | Ensure OsintArsenal unreachable |
| Forensic profile | Mostly | Continuous polish |

---

## Completed / Remaining (updated as phases ship)

### Completed in this session (post-audit)
- **Phase 0:** This audit file (`docs/PHASE0_AUDIT.md`)
- **Phase 1:** Fixed `/find-someone` Link search types (`id`/`q` undefined); LabHub + InformationKernelPanel typecheck green
- **Phase 2:** Design primitives in `src/components/system/primitives.tsx` (TechnicalLabel, SystemIndicator, LiveTimestamp, EvidenceBadge, ConfidenceMeter, SourceBadge, DataPanel, DiagnosticPanel, TimelineEventRow, GraphNodeChip, EntityCard, LabModule, InvestigationProgress, WorldMarker) + `SystemStatusBar`
- **Phase 3:** `src/lib/motion/system.ts` + re-export from tokens; respects `prefers-reduced-motion`
- **Phase 4:** Shared kernel model `src/lib/kernel/model.ts`
- **Phase 5–6:** `src/lib/adapters/types.ts` + `src/lib/intelligence/registry.ts` (internal source registry) + `src/lib/forensic/adapter.ts` + `src/lib/forensic/registry.ts` (capability map, category labels only)
- **Phase 7+:** Expanded collectors (multi-RR DNS, IP/ASN, Nominatim geocode); Forensic Lab capability panel + evidence graph + document text path; Hero lab CTAs; Cmd+K lab routes; Lab hub honest health bar

### Fix-all pass (2026-09-14)
- **Broken:** `npm run lint` failed (~25k prettier CRLF + prefer-const / no-control-regex / no-explicit-any / unused-expressions)
- **Fixed:** Real ESLint errors; prettier no longer blocks lint on Windows CRLF; `endOfLine: auto` in `.prettierrc`
- **Fixed:** FIND DETAILS architecture chrome removed tool brands; LiveProgress mode honesty; lazy routes for world-os / forensic-lab / find-someone
- **Verified:** `tsc --noEmit` PASS · `npm run lint` PASS (0 errors) · `npm run build` PASS
- WhatsApp `919114411026` already correct in `contact-links.ts` / profile

### Remaining (deferred)
- CesiumJS globe, OpenSky proxy, AISStream  
- Autopsy/Plaso/Volatility workers (capability map only — correct)  
- Redis/BullMQ, Meilisearch, Qdrant, Neo4j  
- InsForge Postgres `forensic_cases` / `forensic_jobs` migrations + app wiring  
- Optional mass `prettier --write` (format script) if team wants uniform LF formatting  
- Full homepage narrative reorder of all legacy showrooms  
- Automated e2e tests  
- Deeper visual living-lab ambient polish beyond CTAs / status bar  
- ScrambleText exhaustive-deps warning (non-blocking)  
