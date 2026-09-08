/**
 * The Tarik Design System — Synthesized Web Audio Engine
 * Lightweight, zero-external-asset audio synthesizer for interactive feedback.
 * Respects browser autoplay, accessibility, and user sound preferences.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private enabled: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      // Check stored preference (defaults to false / OFF)
      const stored = localStorage.getItem("tarik_sound_enabled");
      this.enabled = stored === "true";
    }
  }

  private initContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public setEnabled(val: boolean): void {
    this.enabled = val;
    if (typeof window !== "undefined") {
      localStorage.setItem("tarik_sound_enabled", String(val));
      window.dispatchEvent(new CustomEvent("tarik:sound-state-change", { detail: { enabled: val } }));
    }
  }

  public toggle(): boolean {
    const next = !this.enabled;
    this.setEnabled(next);
    if (next) {
      this.playAiChime();
    }
    return next;
  }

  /**
   * Crisp micro-click: 12ms 800Hz sine burst with exponential decay
   */
  public playClick(): void {
    if (!this.enabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      osc.type = "sine";
      osc.frequency.setValueAtTime(820, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.015);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.015);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.02);
    } catch {
      // AudioContext failure gracefully ignored
    }
  }

  /**
   * Ultra-soft hover tap: 8ms 1200Hz subtle tick
   */
  public playHover(): void {
    if (!this.enabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      osc.type = "sine";
      osc.frequency.setValueAtTime(1200, now);

      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.01);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.012);
    } catch {
      // AudioContext failure gracefully ignored
    }
  }

  /**
   * Spatial Navigation Whoosh / Sweep
   */
  public playNavigation(): void {
    if (!this.enabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      osc.type = "triangle";
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(360, now + 0.08);

      filter.type = "bandpass";
      filter.frequency.setValueAtTime(450, now);
      filter.Q.setValueAtTime(3, now);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch {
      // AudioContext failure gracefully ignored
    }
  }

  /**
   * Data Stream / Telemetry Pulse
   */
  public playDataPulse(): void {
    if (!this.enabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      [440, 880].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + i * 0.02);

        gain.gain.setValueAtTime(0.03, now + i * 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + (i + 1) * 0.025);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.02);
        osc.stop(now + (i + 1) * 0.03);
      });
    } catch {
      // AudioContext failure gracefully ignored
    }
  }

  /**
   * Ethereal AI Chime (Soft two-tone harmonic)
   */
  public playAiChime(): void {
    if (!this.enabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const notes = [523.25, 659.25]; // C5 to E5
      const now = ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = now + idx * 0.07;

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.05, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0005, startTime + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.3);
      });
    } catch {
      // AudioContext failure gracefully ignored
    }
  }

  /**
   * Final Deep Cinematic Singularity Chord
   */
  public playFinalChord(): void {
    if (!this.enabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const chord = [130.81, 196.00, 261.63, 329.63]; // C3, G3, C4, E4
      const now = ctx.currentTime;

      chord.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.85);
      });
    } catch {
      // AudioContext failure gracefully ignored
    }
  }
}

export const soundEngine = new SoundEngine();
