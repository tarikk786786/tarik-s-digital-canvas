# AI SYSTEMS & KNOWLEDGE ARCHITECTURE // TARIK DIGITAL CANVAS

## 1. Executive Overview
The **Ask Tarik AI** knowledge guide (`src/components/portfolio/AskTarikAI.tsx`) serves as an interactive intelligence interface grounded strictly in Tarik Islam's verified technical dossiers, case studies, and engineering philosophy.

Rather than delegating unstructured queries to an ungrounded third-party LLM that risks fabricating credentials or hallucinating projects, the system enforces **Deterministic Retrieval-Augmented Grounding (RAG)**.

---

## 2. Hard Anti-Hallucination Guardrails
The AI engine enforces non-negotiable safety and factual accuracy protocols:
1. **ONLY VERIFIED FACTS:** Every answer is sourced directly from audited portfolio case files (`Dezo.in`, `ForensicKit`, `ThreatLens`, `Digital Canvas v4`).
2. **NEVER INVENT:**
   - ❌ Never invent imaginary clients, funding rounds, or revenue claims.
   - ❌ Never invent false awards or honorary degrees.
   - ❌ Never invent fabricated testimonials or unverified metrics.
3. **GRACEFUL BOUNDARY HANDLING:** When a user inquires about unverified or private data, the system explicitly responds:
   > *"That information isn't currently included in Tarik's public portfolio. You can connect with him directly on WhatsApp to discuss your specific question."*

---

## 3. Four-Persona Adaptation Engine
The interface enables visitors to inspect Tarik's work through four distinct professional lenses:

```
┌──────────────┬────────────────────────────────────────────────────────┐
│ PERSONA      │ CORE EMPHASIS & TONE                                   │
├──────────────┼────────────────────────────────────────────────────────┤
│ Developer    │ Deep code architecture, TypeScript strictness, custom  │
│              │ WebGL shaders, Python/Rust performance, STRIDE threats │
├──────────────┼────────────────────────────────────────────────────────┤
│ Founder      │ 0→1 execution velocity, studio model, business defens- │
│              │ ibility, high unit economics, solving real market pain │
├──────────────┼────────────────────────────────────────────────────────┤
│ Recruiter    │ Core technical competencies, certifications, track     │
│              │ record, cross-functional leadership, verified results  │
├──────────────┼────────────────────────────────────────────────────────┤
│ Beginner     │ Clear, intuitive real-world analogies in plain English │
│              │ without cryptic jargon or abbreviations                │
└──────────────┴────────────────────────────────────────────────────────┘
```

---

## 4. Viewport Context Awareness
The AI guide actively monitors which section of the portfolio the visitor is exploring (`#about`, `#journey`, `#how-i-build`, `#work`, `#showroom`, `#contact`). Responses reference the active section and provide immediate deep-link citations (`[Overview #about]`, `[Selected Work #work]`) enabling seamless cross-navigation.
