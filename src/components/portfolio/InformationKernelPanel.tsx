import { useMemo, useState } from "react";
import { ArrowRight, Shield, Layers, Lock } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { soundEngine } from "@/lib/sound-engine";

const PIPELINE = [
  "Ask anything",
  "Classify",
  "Plan",
  "Collect (hidden)",
  "Correlate",
  "Evidence + provenance",
] as const;

const CAPABILITY_FACES = [
  { title: "Identity signals", desc: "Usernames, emails, phones — public references only." },
  { title: "Companies & India", desc: "Corporate / regulatory portals when lawfully reachable; otherwise AUTH_DEPENDENT." },
  { title: "Domains & infra", desc: "DNS, registration directories, certificate transparency, archives." },
  { title: "Documents & media", desc: "Uploaded or public files — never private mailbox theft." },
];

export function InformationKernelPanel() {
  const [active, setActive] = useState(0);
  const face = useMemo(() => CAPABILITY_FACES[active], [active]);

  return (
    <div id="information-kernel" className="space-y-10">
      <div className="max-w-3xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#62E6FF] mb-3">
          Information Engine · Hidden adapters
        </p>
        <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          How FIND DETAILS thinks
        </h3>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Visitors never pick Sherlock, Amass, or portal brand names. One input — Ask anything —
          routes through the Information Kernel. Adapters stay on the worker side; the UI shows
          evidence, confidence, and provenance.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0A0D12] p-6 md:p-8">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-5">
          Investigation pipeline
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {PIPELINE.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <span className="rounded-full border border-[#62E6FF]/30 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-[#62E6FF]">
                {step}
              </span>
              {i < PIPELINE.length - 1 && <ArrowRight className="size-3.5 text-muted-foreground" />}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 space-y-2">
          {CAPABILITY_FACES.map((item, i) => (
            <button
              key={item.title}
              type="button"
              onClick={() => {
                soundEngine.playClick();
                setActive(i);
              }}
              className={`w-full text-left rounded-xl border px-4 py-3 transition-colors ${
                active === i
                  ? "border-[#62E6FF]/40 bg-[#62E6FF]/10"
                  : "border-white/10 hover:border-white/20"
              }`}
            >
              <p className="font-medium text-sm">{item.title}</p>
            </button>
          ))}
        </div>
        <div className="lg:col-span-8 rounded-2xl border border-white/10 bg-[#0A0D12] p-6 md:p-8">
          <div className="flex items-center gap-2 mb-4">
            <Layers className="size-4 text-[#62E6FF]" />
            <h4 className="font-display text-2xl font-bold">{face.title}</h4>
          </div>
          <p className="text-muted-foreground leading-relaxed">{face.desc}</p>
          <div className="mt-6 flex gap-2 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-sm text-amber-100/90">
            <Shield className="size-4 shrink-0 mt-0.5" />
            <span>
              Security boundary: public / permitted sources only. No IMSI, interception, private
              CCTV, or subscriber triangulation.
            </span>
          </div>
          <Link
            to="/find-someone"
            search={{ mode: "live", id: undefined, q: undefined }}
            onClick={() => soundEngine.playClick()}
            className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#62E6FF] hover:underline"
          >
            Open FIND DETAILS
            <Lock className="size-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
