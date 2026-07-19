import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getConsent, subscribe } from "@/lib/consent";
import { markVisited, readVisitorContext, type VisitorContext } from "@/lib/visitor-context";
import { buildGreeting, type Greeting } from "@/lib/greeting";
import { getApproxGeo } from "@/lib/geo.functions";

export function ArrivalGreeting() {
  const [ctx, setCtx] = useState<VisitorContext | null>(null);
  const [personalize, setPersonalize] = useState(false);

  // Sync personalization consent
  useEffect(() => {
    const apply = () => setPersonalize(getConsent().personalization);
    apply();
    return subscribe(apply);
  }, []);

  useEffect(() => {
    setCtx(readVisitorContext());
    const t = window.setTimeout(() => markVisited(), 4000);
    return () => window.clearTimeout(t);
  }, []);

  const { data: geo } = useQuery({
    queryKey: ["approx-geo"],
    queryFn: () => getApproxGeo(),
    enabled: personalize,
    staleTime: 1000 * 60 * 30,
    retry: 0,
  });

  if (!ctx) return null;

  const greeting: Greeting = buildGreeting({
    ...ctx,
    country: geo?.country ?? null,
    countryName: personalize ? geo?.countryName ?? null : null,
  });

  return (
    <div
      className="animate-fade-in mt-6 border-l border-accent/40 pl-4"
      aria-live="polite"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent/80">
        {greeting.salutation}
        {greeting.origin ? (
          <span className="ml-2 text-muted-foreground">· {greeting.origin} (approx.)</span>
        ) : null}
      </p>
      <p className="mt-2 text-base leading-snug text-foreground">
        {greeting.headline}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">{greeting.subline}</p>
    </div>
  );
}
