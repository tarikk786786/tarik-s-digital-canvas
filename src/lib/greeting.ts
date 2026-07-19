// Greeting engine. Pure function. All strings are neutral and label
// inferred context as approximate. Never claims identity.

import type { VisitorContext } from "./visitor-context";

export interface Greeting {
  salutation: string;
  headline: string;
  subline: string;
  origin?: string; // e.g. "from India" — approximate, optional
}

export interface GreetingInput extends VisitorContext {
  country?: string | null; // ISO code from server (Cloudflare header)
  countryName?: string | null;
}

const salutations: Record<VisitorContext["timeOfDay"], string> = {
  morning: "Good morning",
  afternoon: "Good afternoon",
  evening: "Good evening",
  night: "Working late",
};

export function buildGreeting(ctx: GreetingInput): Greeting {
  const salutation = salutations[ctx.timeOfDay];
  const origin = ctx.countryName ? `Welcome from ${ctx.countryName}` : undefined;

  // Referrer-first framing
  if (ctx.referrer === "github") {
    return {
      salutation,
      headline: "Welcome from GitHub.",
      subline: "Explore Tarik's open-source work and technical case studies.",
      origin,
    };
  }
  if (ctx.referrer === "linkedin") {
    return {
      salutation,
      headline: "Welcome.",
      subline: "Start with Tarik's experience, qualifications, and featured projects.",
      origin,
    };
  }
  if (ctx.referrer === "search") {
    return {
      salutation,
      headline: "Looking for secure AI, forensic technology, or full-stack development?",
      subline: "Choose an area to explore.",
      origin,
    };
  }

  if (ctx.returning) {
    return {
      salutation: "Welcome back",
      headline: "Continue where you left off.",
      subline: "Pick up any recent thread — or jump into something new.",
      origin,
    };
  }

  return {
    salutation,
    headline: "Welcome to Tarik Islam's digital laboratory.",
    subline: "Explore evidence, intelligence, security, and products.",
    origin,
  };
}
