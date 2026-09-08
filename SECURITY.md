# SECURITY & HARDENING // TARIK DIGITAL CANVAS

## 1. Zero-Trust Security Posture
In alignment with Tarik Islam's cybersecurity engineering discipline, this portfolio operates under a **Zero-Trust Architecture (ZTA)** model:
- **Never Trust, Always Verify:** Every external link, query param, client state, and form input is sanitized and validated.
- **Least Privilege:** Public client bundles contain zero private environment variables (`NEXT_PUBLIC_` / `VITE_` contain strictly public endpoints).
- **Immutable Evidence:** Public case studies and hashes are fingerprinted using client-side SHA-256 routines to demonstrate data tampering immunity.

---

## 2. Input Validation & Contract Enforcement
All interactive forms and brief configurations enforce schema validation via **Zod**:
```typescript
import { z } from "zod";

export const ProjectBriefSchema = z.object({
  domain: z.enum(["ai", "cyber", "web", "advisory"]),
  stage: z.enum(["concept", "scaling", "audit", "custom"]),
  timeline: z.enum(["q3_2026", "urgent", "exploratory"]),
  clientName: z.string().min(2).max(80).trim(),
  clientContact: z.string().min(3).max(120).trim(),
  projectNotes: z.string().max(2000).trim().optional(),
  briefId: z.string().regex(/^TB-2026-[A-Z0-9]{4}$/),
});
```

---

## 3. Cryptographic Integrity & Forensic Protocols
- **Client-Side Hash Verification:** The integrated `CyberTerminal` provides a built-in cryptographic hashing utility (`hash <text>`) using bitwise 32-bit FNV-1a and SHA-256 routines.
- **Chain of Custody:** Digital evidence case files and certification links reference immutable source authority IDs and verifiable institutional credentials.

---

## 4. HTTP Security Headers & Content Security Policy (CSP)
Production deployments enforce strict headers via Edge configuration:
- `Content-Security-Policy`: Restricts script execution to self, trusted Google Font CDNs, and verified analytics origins. Disallows `unsafe-eval`.
- `X-Frame-Options: DENY`: Prevents clickjacking across external iframes.
- `X-Content-Type-Options: nosniff`: Mitigates MIME-type confusion attacks.
- `Referrer-Policy: strict-origin-when-cross-origin`: Shields internal path parameters from external referrers.
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`: Disables unneeded browser hardware sensors.
