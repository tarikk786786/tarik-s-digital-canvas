# SEARCH ENGINE OPTIMIZATION & DISCOVERABILITY // TARIK DIGITAL CANVAS

## 1. Technical SEO Architecture
The portfolio implements a comprehensive discoverability framework built directly into the SSR layer:
- **Server-Side Rendering (SSR):** Full HTML markup is generated on the server with complete textual content, ensuring search engine crawlers (Googlebot, Bingbot) index every case file, skill description, and timeline entry without waiting for client JavaScript execution.
- **Canonical URLs:** Strict canonical tags pointing to `https://tarik-s-digital-canvas.vercel.app` prevent duplicate indexing penalties across deployment previews.
- **Microcopy & Semantic Headings:** Clear `<h1>` through `<h3>` hierarchy with zero skipping, explicit `<main id="top">`, `<header>`, `<nav>`, `<section>`, and `<aside>` landmark roles.

---

## 2. JSON-LD Structured Data Schema
The root document (`src/routes/__root.tsx`) injects a validated `@graph` JSON-LD schema representing three primary entities:
1. **`Person` Schema:**
   - Name: `Tarik Islam`
   - Job Titles: `Multidisciplinary Technologist`, `Forensic Scientist`, `Cybersecurity Engineer`, `AI Systems Builder`
   - Verified External Profiles: GitHub (`@tarikk786786`), Instagram (`@tarik_islam_786`), Studio (`https://dezo.in`)
   - Core Competencies: Digital Forensics, Zero Trust Architecture, Autonomous AI Agents, Memory Forensics, React 19, TypeScript, Rust, Python
2. **`WebSite` Schema:**
   - URL: `https://tarik-s-digital-canvas.vercel.app`
   - Publisher: Linked to Tarik Islam Person Entity
3. **`ProfilePage` Schema:**
   - Main entity pointing directly to the verified Person entity.

---

## 3. Social Graph & Rich Snippets
- **OpenGraph Tags:** Full high-resolution 512x512 profile image preview, UTF-8 charset, descriptive summary, and localized English metadata.
- **Twitter / X Cards:** `summary_large_image` format with author attribution `@tarik_islam_786` and high-contrast preview cards.
- **Web App Manifest:** `site.webmanifest` defining standalone PWA capabilities, theme color `#050608`, and responsive icon sizes (16x16, 32x32, 180x180, 512x512).
