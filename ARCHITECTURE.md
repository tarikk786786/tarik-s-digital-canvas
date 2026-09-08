# ARCHITECTURE // TARIK DIGITAL CANVAS

## 1. System Philosophy & Executive Summary
The **Tarik Digital Canvas** is engineered as a living, evidence-first digital laboratory operating at the intersection of **Forensic Science, Cybersecurity Engineering, Autonomous AI Systems, and Full-Stack Craft**.

Rather than adopting generic template paradigms or superficial cyberpunk decorations, the system enforces a strict architectural division between:
- **Presentation & Accessibility Layer (DOM):** High-contrast semantic typography (`Satoshi`, `General Sans`, `IBM Plex Mono`), zero CSS text blur, ARIA-compliant primitives, and instant mobile responsiveness.
- **Interactive 3D Simulation Space (WebGL/Three.js):** Isolated rendering loops bound to `IntersectionObserver` lifecycles, dynamic memory disposal, and graceful fallback paths (Experience, Minimal, and Performance modes).
- **Deterministic Intelligence & Knowledge Engine (RAG):** Context-aware question answering with strict citation grounding, 4 persona lenses (`Founder`, `Developer`, `Recruiter`, `Beginner`), and zero artificial hallucination.

```
┌─────────────────────────────────────────────────────────────┐
│                 CLIENT RUNTIME (Vite / Edge)                │
├─────────────────────────────────────────────────────────────┤
│  [ DOM Layer ]        [ WebGL Space ]       [ Audio Engine ]│
│  - Semantic HTML      - Three.js r185       - Web Audio API │
│  - Tailwind CSS v4    - Tarik Core 3D       - 0KB External  │
│  - Radix Primitives   - Shaders & Particles - 5 Syntheses   │
├─────────────────────────────────────────────────────────────┤
│  [ Product Engine ]   [ State & Lifecycle ] [ Command HUD ] │
│  - Ask Tarik AI       - Director Mode       - System HUD    │
│  - Project Brief Form - IntersectionObs.    - Cmd+K Palette │
│  - Live Status Specs  - Lenis Smooth Scroll - Shell (~)     │
└─────────────────────────────────────────────────────────────┘
                               ▲
                               │ SSR / Edge Hydration
┌─────────────────────────────────────────────────────────────┐
│                 INFRASTRUCTURE & COMPUTE                    │
├─────────────────────────────────────────────────────────────┤
│  - TanStack Start (Nitro Universal SSR Engine)              │
│  - React 19.2 + TypeScript 5.8 Strict Typing                │
│  - Vercel Edge Network Deployment with Immutable Caching    │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Rendering Lifecycle & Digital Gravity
Every visual element operates within a unified physical coordinate framework:
- **Atmospheric Particles:** Obey digital gravity, gently orbiting the central Tarik Core.
- **Adaptive Performance Pipeline:**
  - `Experience Mode`: Full 60–120 FPS WebGL 2.0 with antialiasing, dynamic mouse parallax, and neural synaptic mesh.
  - `Minimal Mode`: Complete bypass of WebGL rendering loops, replaced with high-definition vector graphics for distraction-free reading.
  - `Performance Mode`: Reduced particle count, locked 1.0 device pixel ratio (DPR), and disabled heavy post-processing for low-power and mobile battery preservation.
- **IntersectionObserver Lifecycle:** All RAF (RequestAnimationFrame) loops automatically pause when their bounding element exits the active viewport, guaranteeing **0% idle CPU utilization**.

---

## 3. Physical Depth & Material Hierarchy
The interface enforces a deterministic 6-tier z-index and elevation hierarchy:
- **Level 0 (`depth-0`, z: 0):** Infinite atmospheric plane, subtle grain texture, ambient gradient mesh.
- **Level 1 (`depth-1`, z: 10):** Content typography, standard dossier cards, editorial paragraphs.
- **Level 2 (`depth-2`, z: 20):** Interactive `Tarik Glass` surfaces, hoverable buttons, capability matrix.
- **Level 3 (`depth-3`, z: 30):** Focused case study modals, active telemetry chips.
- **Level 4 (`depth-4`, z: 40–50):** System overlays, persistent `SystemHUD`, `CommandPalette`, `CyberTerminal`.
- **Level 5 (`depth-5`, z: 5):** 3D WebGL space rendered behind interactive text to preserve readability.

---

## 4. State & Data Flow
- **Director Mode State:** Stored in `localStorage` under `tarik_director_mode`, synchronized across tabs via `StorageEvent`, and dynamically dispatched via custom browser events (`tarik:director-mode-change`).
- **Web Audio State:** Stored in `localStorage` under `tarik_sound_enabled`, completely muted by default, honoring browser autoplay policies and user consent.
- **Lead Intake Pipeline:** Multi-step conversational form generating verifiable cryptographic Brief IDs (`TB-2026-xxxx`), instant Markdown export, and direct pre-formatted WhatsApp dispatch.
