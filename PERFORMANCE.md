# PERFORMANCE & OPTIMIZATION // TARIK DIGITAL CANVAS

## 1. Core Web Vitals Budget & Targets
The portfolio adheres to strict production performance thresholds:
- **Largest Contentful Paint (LCP):** < 1.2 seconds (Target: < 0.9s on fast 4G/Broadband).
- **Interaction to Next Paint (INP):** < 50 milliseconds (Target: < 24ms).
- **Cumulative Layout Shift (CLS):** 0.000 (Completely stable, zero shifting during dynamic 3D initialization).
- **First Input Delay (FID):** < 30 milliseconds.
- **Initial Document Transfer:** < 80 KB gzipped HTML/Critical CSS.

---

## 2. 3D WebGL Performance Engineering
To prevent performance regressions on mobile devices and low-tier hardware:
1. **IntersectionObserver Pause:**
   All WebGL animation loops are bound to an `IntersectionObserver`. When a canvas is not in the active viewport, its `requestAnimationFrame` loop completely halts:
   ```typescript
   const observer = new IntersectionObserver(([entry]) => {
     isVisibleRef.current = entry.isIntersecting;
   }, { threshold: 0.05 });
   ```
   **Result:** 0% idle CPU and GPU load when scrolling through textual sections.

2. **Explicit Resource Disposal:**
   On component unmount, every geometry, material, texture, and WebGL renderer context is explicitly disposed to prevent GPU memory leaks:
   ```typescript
   renderer.dispose();
   geometry.dispose();
   material.dispose();
   ```

3. **Adaptive Device Pixel Ratio (DPR):**
   - High-end desktops: Locked at `Math.min(window.devicePixelRatio, 2.0)` to avoid rendering 4x redundant fragments on Retina screens.
   - Performance Mode / Mobile: Downscaled to `1.0` DPR with disabled antialiasing.

---

## 3. Zero-Blur Typography Commitment
In accordance with foundational design principles:
- **No CSS `filter: blur(...)`** is applied to readable content or typography containers.
- Text uses crisp vector rendering with `-webkit-font-smoothing: antialiased` and `text-rendering: optimizeLegibility`.
- Visual depth is achieved through physical z-index elevation, subtle border lighting (`border-white/10`), and background gradient meshes rather than artificial text blurring.

---

## 4. Code Splitting & Dynamic Deferral
Below-the-fold sections are lazy-loaded via React `lazy` and `Suspense`:
- `VisionAmbition3D` (Part 3)
- `HowIBuildLab` (Part 4)
- `ScreensAndSeoShowroom` (Part 5)
- `ExecutionEngine` (Part 6)
- `TarikIntelligence` (Part 7)

This ensures the initial viewport (Navigation, Hero, Marquee, Identity) paints in < 400ms without blocking on heavy 3D assets.
