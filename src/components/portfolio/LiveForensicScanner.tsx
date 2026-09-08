import { useState, useEffect } from "react";
import { Shield, CheckCircle, Terminal, Activity, RefreshCw, Lock, Cpu } from "lucide-react";

export function LiveForensicScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [hash, setHash] = useState("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
  const [metrics, setMetrics] = useState({
    threats: 0,
    integrity: 100,
    latency: "—",
    memory: "—",
    tokens: "—",
  });

  const STEPS = [
    "> INITIATING INTEGRITY VERIFICATION DEMO...",
    "> SCANNING FORENSIC ARTIFACTS & SYSTEM HASHES...",
    "> VERIFYING SHA-256 EVIDENCE CHAIN-OF-CUSTODY...",
    "> EVALUATING SYSTEM CONFIGURATION & DEPENDENCIES...",
    "> DEMONSTRATION COMPLETE: ALL CHECKS PASSED",
  ];

  const runAudit = () => {
    if (isScanning) return;
    setIsScanning(true);
    setScanStep(0);

    const randomHash = Array.from({ length: 64 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("");

    let step = 0;
    const interval = setInterval(() => {
      step++;
      setScanStep(step);
      if (step >= STEPS.length - 1) {
        clearInterval(interval);
        setIsScanning(false);
        setHash(randomHash);
        setMetrics({
          threats: 0,
          integrity: 100,
          latency: "Demo",
          memory: "Demo",
          tokens: "Demo",
        });
      }
    }, 450);
  };

  return (
    <section className="relative w-full py-12 px-6 md:px-10 lg:px-16 border-y border-white/5 bg-[#0A0D12] overflow-hidden">
      {/* Background cyber grid & glow */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 size-96 rounded-full bg-accent/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch gap-8">
        
        {/* Left: Audit Command Controller */}
        <div className="flex-1 flex flex-col justify-between p-6 md:p-8 rounded-xl border border-white/10 bg-[#11151C]/90 backdrop-blur-xl shadow-2xl">
          <div>
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-accent">
                <Shield className="size-4 text-accent animate-pulse" />
                <span>FORENSIC AUDIT DEMO</span>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 font-mono text-[10px] text-emerald-400">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
                INTERACTIVE DEMO
              </span>
            </div>

            <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-3">
              Interactive Forensic Audit Experience
            </h3>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6">
              Explore how digital forensics protocols, cryptographic chain-of-custody verification, and system integrity checks work in practice. This is an interactive demonstration.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-white/5">
            {/* Live Terminal Log */}
            <div className="p-3.5 rounded-lg bg-black/60 border border-white/5 font-mono text-xs text-accent space-y-1 overflow-hidden min-h-[96px] flex flex-col justify-center">
              <div className="flex items-center gap-2 text-muted-foreground text-[10px] uppercase pb-1 border-b border-white/5">
                <Terminal className="size-3" />
                <span>EXECUTION LOG</span>
              </div>
              <p className="text-foreground/90 font-semibold">{STEPS[scanStep]}</p>
              <p className="text-[10px] text-muted-foreground truncate">
                SHA-256: <span className="text-accent">{hash}</span>
              </p>
            </div>

            <button
              onClick={runAudit}
              disabled={isScanning}
              type="button"
              className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-md bg-accent text-[#0C0E12] font-mono text-xs uppercase tracking-widest font-bold transition-all hover:bg-accent-glow hover:shadow-[0_0_24px_rgba(232,168,56,0.35)] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`size-4 ${isScanning ? "animate-spin" : ""}`} />
              {isScanning ? "EXECUTING VERIFICATION PROTOCOL..." : "RUN FULL FORENSIC AUDIT"}
            </button>
          </div>
        </div>

        {/* Right: Live Telemetry Metrics Grid */}
        <div className="flex-1 grid grid-cols-2 gap-4">
          <div className="p-5 rounded-xl border border-white/10 bg-[#11151C]/60 backdrop-blur-md flex flex-col justify-between">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="font-mono text-[10px] uppercase tracking-wider">Integrity Score</span>
              <CheckCircle className="size-4 text-emerald-400" />
            </div>
            <div className="my-3">
              <div className="text-3xl md:text-4xl font-display font-bold text-foreground">
                {metrics.integrity}%
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-emerald-400 h-full rounded-full transition-all duration-500" style={{ width: `${metrics.integrity}%` }} />
              </div>
            </div>
            <span className="font-mono text-[10px] text-muted-foreground">Chain of custody uncompromised</span>
          </div>

          <div className="p-5 rounded-xl border border-white/10 bg-[#11151C]/60 backdrop-blur-md flex flex-col justify-between">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="font-mono text-[10px] uppercase tracking-wider">Zero-Trust Anomalies</span>
              <Shield className="size-4 text-accent" />
            </div>
            <div className="my-3">
              <div className="text-3xl md:text-4xl font-display font-bold text-accent">
                {metrics.threats}
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-accent h-full rounded-full transition-all duration-500" style={{ width: "100%" }} />
              </div>
            </div>
            <span className="font-mono text-[10px] text-muted-foreground">All threat vectors mitigated</span>
          </div>

          <div className="p-5 rounded-xl border border-white/10 bg-[#11151C]/60 backdrop-blur-md flex flex-col justify-between">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="font-mono text-[10px] uppercase tracking-wider">Inference Latency</span>
              <Activity className="size-4 text-blue-400" />
            </div>
            <div className="my-3">
              <div className="text-3xl md:text-4xl font-display font-bold text-foreground">
                {metrics.latency}
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-blue-400 h-full rounded-full transition-all duration-500" style={{ width: "85%" }} />
              </div>
            </div>
            <span className="font-mono text-[10px] text-muted-foreground">Edge model response time</span>
          </div>

          <div className="p-5 rounded-xl border border-white/10 bg-[#11151C]/60 backdrop-blur-md flex flex-col justify-between">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="font-mono text-[10px] uppercase tracking-wider">Memory Allocation</span>
              <Cpu className="size-4 text-amber-400" />
            </div>
            <div className="my-3">
              <div className="text-3xl md:text-4xl font-display font-bold text-foreground">
                {metrics.memory}
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full transition-all duration-500" style={{ width: "42%" }} />
              </div>
            </div>
            <span className="font-mono text-[10px] text-muted-foreground">Optimal runtime heap footprint</span>
          </div>
        </div>

      </div>
    </section>
  );
}
