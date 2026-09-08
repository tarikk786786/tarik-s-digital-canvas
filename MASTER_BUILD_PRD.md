# MASTER BUILD PRD: TARIK DIGITAL CANVAS
**Document Version:** 2.0.0-PROD  
**Author:** Tarik Islam & Antigravity Engineering  
**Role:** Senior Creative Technologist, 3D Web Engineer, Systems Architect, Security & QA Engineer  
**Live Production URL:** [https://tarik-s-digital-canvas-ebon.vercel.app](https://tarik-s-digital-canvas-ebon.vercel.app)  
**Connected Branch:** `main` (Preserve Lovable synchronization — linear commits only)

---

## 0. ROLE & OPERATING DIRECTIVE
You are a senior creative technologist, product designer, 3D web engineer, performance engineer, SEO engineer, security engineer, and QA engineer.
You are improving an existing production portfolio.
**Do NOT rebuild blindly.**
First inspect the existing repository, architecture, routes, components, dependencies, assets, design system, and deployment configuration.
Preserve anything already working.
Upgrade it systematically.

---

## 1. PRIMARY OBJECTIVE
Transform the portfolio into a premium interactive digital experience that combines:
- Personal brand
- Storytelling
- Full-stack engineering
- AI & Autonomous Agents
- Cybersecurity & Zero-Trust
- Digital Forensics & Chain-of-Custody
- 3D / WebGL & Spatial Computing
- Interactive architecture & real-time telemetry
- Project showcases & live device mockups
- SEO & LLM Discoverability
- Accessibility (WCAG 2.1 AAA)
- Performance (Sub-100ms LCP, 0 CLS, locked 60 FPS)
- Analytics & Privacy
- Security Hardening (Zero Trust, CSP, Zod validation)
- AI-powered interaction ("Ask Tarik" RAG assistant)

### Aesthetic & Atmospheric Standard
The result must feel:
- **PREMIUM** — High-contrast editorial palette (`#0C0E12`, `#14161C`, gold/amber `#E8A838`).
- **ORIGINAL** — Bespoke WebGL shaders and spatial geometry, not off-the-shelf templates.
- **TECHNICAL** — Real code, deterministic schemas, and forensic integrity hashes.
- **CINEMATIC** — Seamless spatial depth with Lenis momentum scroll.
- **FAST** — Code-split lazy chunks, instant initial paint, 0% idle CPU offscreen.
- **INTELLIGENT** — Verified RAG AI guide with zero hallucination guarantee.
- **HUMAN** — Genuine author voice, authentic lessons from failure, and direct accessibility.

It must **NOT** feel like:
- An AI-generated template
- A generic developer portfolio
- A collection of gradient cards
- An over-animated landing page
- A Three.js demo with no purpose
- A fake futuristic dashboard
- Every animation must communicate something.

---

## 2. CORE NARRATIVE EXPERIENCE
The portfolio should feel like the visitor is entering a living digital world:
```
WHO I AM (#about)
    ↓
HOW I THINK (#journey)
    ↓
WHAT I EXPLORE (#vision)
    ↓
HOW I BUILD (#how-i-build)
    ↓
WHAT I CREATE (#showroom)
    ↓
PROOF & EXECUTION (#execution)
    ↓
INTELLIGENCE RADAR (#intelligence)
    ↓
CONTACT (#contact)
```

---

## 3. TECHNOLOGY FOUNDATION
- **Framework & SSR:** TanStack Start / Nitro / React 19 / TypeScript
- **Styling:** Tailwind CSS v4 (Zero-runtime overhead, pure utility precision)
- **Typography:** `Satoshi` (Display), `General Sans` (Body), `IBM Plex Mono` (Technical)
- **Zero Blur Rule:** No CSS `filter: blur` applied to typography or text containers; 100% crisp legibility.
- **3D Engine:** Three.js r185 with custom GLSL shaders, declarative scene managers, and `IntersectionObserver` RAF controls.
- **Animation & Scrolling:** Motion (UI transitions) + Lenis (inertial momentum scroll).
- **Data Contracts:** Zod schema validation for all runtime inputs.
- **Hosting & Edge CDN:** Vercel Global Edge Network with HTTP/3 over QUIC.

---

## 4. DESIGN LANGUAGE & VISUAL CHARACTERISTICS
- **Dark Premium Digital Laboratory:**
  - Background: `#0C0E12` (Base Enclave) & `#14161C` (Elevated Surface).
  - Luminous Accents: Amber/Gold `#E8A838`, Sky Blue `#38BDF8`, Emerald `#10B981`, Rose `#F43F5E`.
  - Precise Typography: Clean tracking, uppercase micro-labels, razor-sharp numbers.
  - Volumetric Atmosphere: Subtle radial glows, grid lattices, and glowing telemetry rings.
  - Avoid: Excessive neon, rainbow gradients, generic glassmorphism, artificial text blur, and meaningless floating shapes.

---

## 5. GLOBAL 3D WORLD & PERFORMANCE CONTROLS
All Three.js WebGL scenes implement adaptive rendering:
- **Device Capability Detection:** Capped DPR at 2.0 max to protect mobile batteries.
- **Auto-Pause Offscreen:** Render loops are bound to an `IntersectionObserver`. When scrolled out of the viewport, `requestAnimationFrame` pauses immediately, guaranteeing **0% idle CPU and 0MB memory drift**.
- **Reduce Motion Support:** Respects `prefers-reduced-motion: reduce` and user UI toggle by disabling orbital rotation and heavy particle fields.

---

## 6. FLAGSHIP FEATURES IMPLEMENTED

### Feature 01: "Ask Tarik" AI Personal Knowledge Guide (`AskTarikAI.tsx`)
- **Key Trigger:** Press `A` or click the floating bottom-right beacon.
- **Architecture:** Client-side deterministic RAG engine strictly grounded in approved portfolio dossiers.
- **Zero Hallucination Policy:** Rejects fictitious claims and cites exact on-page evidence links (`#work`, `#dezo`, `#execution`, `#contact`).

### Feature 02: "VIEW THE ENGINE" Systems Runtime Inspector (`EngineInspectorModal.tsx`)
- **Key Trigger:** Press `E` or click the floating bottom-left HUD button.
- **5-Strata Deep Dive:**
  1. *Visual Interface:* React 19, Tailwind v4, Satoshi & Mono fonts.
  2. *Routing & State:* TanStack Start, lazy-loaded chunk splitting.
  3. *Spatial 3D:* Three.js r185, GLSL shaders, auto-pausing RAF loops.
  4. *Data Schemas:* Zod contracts, twin SHA-256 evidence logs.
  5. *Edge Cloud:* Vercel Global Edge, Nitro SSR, Brotli compression.
- **Live Diagnostics:** Live DOM node counter, active WebGL canvas counter, screen DPR, and code patterns.

### Feature 03: Lenis Inertial Momentum Scrolling (`lenis-scroll.ts`)
- Silky smooth scrolling with cubic inertia easing.
- Automatically disables when `prefers-reduced-motion` is active.

### Feature 04: Part 6 — Execution & Operating System (`ExecutionEngine.tsx`)
- **Mandate:** *"Ideas are easy. Execution is the difference. Everything comes down to: BUILDING."*
- **3D Hexagonal Turbine Reactor:** Octahedron core crystal, gyroscopic rings, and 120 orbital data particles with 3 speed modes (`NOMINAL`, `ACCELERATED`, `DIAGNOSTIC`).
- **6-Stage Continuous Loop:** `LEARN → BUILD → TEST → FAIL → UNDERSTAND → IMPROVE`.
- **5 Action Pillars:** `BUILD`, `EXPLORE`, `SOLVE`, `EXPERIMENT`, `EVOLVE`.
- **Failure-is-Data Matrix:** Real-world engineering post-mortems with hardened architectural gains.
- **My Operating System Terminal:** Interactive command execution (`tarik.os.research()`, etc.).
- **Monumental Signature:** Razor-sharp `TARIK — BUILD. LEARN. EVOLVE.`

### Feature 05: Part 7 — Curated Intelligence Radar (`TarikIntelligence.tsx`)
- Curated "What I'm Watching" radar spanning AI & Agents, Cyber Defense, 3D & Systems, and Sovereign Ventures.

### Feature 06: Developer Console & Easter Eggs (`developer-console.ts`)
- **DevTools ASCII Banner:** Forensic practitioner banner and checksums.
- **Konami Code:** Entering `↑ ↑ ↓ ↓ ← → ← → B A` logs the singularity unlock.
- **Global Keyboard Shortcuts:** `A` (Ask AI), `E` (Engine Inspector), `T` (Terminal), `?` (Help).

---

## 7. QUALITY ASSURANCE & VERIFICATION CHECKLIST
- [x] `bunx tsc --noEmit` passes with 0 errors and 0 warnings.
- [x] Production build passes cleanly with code-split lazy chunks.
- [x] Zero artificial text blur across all viewports.
- [x] Git history preserved linearly without force-pushes or rebases.
- [x] Deployed and aliased live to Vercel production edge network.
