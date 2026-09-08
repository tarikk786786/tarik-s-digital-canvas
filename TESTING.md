# QUALITY ASSURANCE & TESTING SPECIFICATION // TARIK DIGITAL CANVAS

## 1. Multi-Tier Verification Strategy
Quality assurance for the Tarik Digital Canvas spans automated type integrity, deterministic schema validation, visual regression testing, and keyboard accessibility.

```
┌─────────────────────────────────────────────────────────────┐
│                    TESTING ARCHITECTURE                     │
├─────────────────────────────────────────────────────────────┤
│  1. Static Typing & Contract Verification (TypeScript 5.8)  │
│  2. Schema Runtime Validation (Zod)                        │
│  3. End-to-End User Flow & Navigation (Playwright)          │
│  4. Keyboard Accessibility & Screen Reader Compliance       │
│  5. Visual Regression & 3D Composition Validation           │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Automated Test Commands

### 2.1 TypeScript Strict Typecheck
Verifies that all component props, 3D WebGL interfaces, audio contexts, and route declarations compile with zero errors:
```bash
bunx tsc --noEmit
```

### 2.2 Production Build Verification
Executes the full Vite + TanStack Start Nitro build pipeline with static asset bundling and SSR manifest generation:
```bash
bun run build
```

---

## 3. End-to-End User Journeys (Playwright Test Plan)
The following automated test cases validate critical user pathways:
1. **Initial Page Load & Smart Loader:**
   - Verify `INITIALIZING TARIK.OS` progresses through all 5 stages.
   - Verify pressing `Esc` immediately bypasses the loader.
   - Verify subsequent reloads in the same session bypass the loader within 250ms via `sessionStorage`.
2. **Command Palette (`Cmd+K` / `Ctrl+K`):**
   - Trigger keyboard combination and verify dialog mounts into focus.
   - Type query `work` and assert smooth scrolling to `#work`.
   - Type `/ask` and assert AI Assistant window opens.
3. **Cyber Terminal (`~` or `` ` ``):**
   - Press tilde key and verify terminal HUD opens.
   - Execute `specs` and verify output lists platform, hardware cores, and resolution.
   - Execute `director minimal` and verify document receives `data-director-mode="minimal"`.
4. **Project Brief Form Intake (`B` key / CTA):**
   - Advance through Steps 1 to 4 and assert generated Brief ID format matches `TB-2026-[A-Z0-9]{4}`.
   - Test "Copy Markdown" and verify clipboard content matches schema.
5. **Reduced Motion & Accessibility Audit:**
   - Emulate `prefers-reduced-motion: reduce`.
   - Verify custom cursor is unmounted.
   - Verify Three.js animation loops are paused or simplified.
   - Verify all textual content remains fully readable and contrast ratios exceed WCAG AA standards (4.5:1).
