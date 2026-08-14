import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import "./wow-portfolio.css";

const work = [
  {
    number: "01",
    type: "AI SYSTEMS",
    title: "Nexus Labs",
    description: "Research-led intelligence systems that turn noisy operational data into confident decisions.",
    tags: ["LLM", "RAG", "AGENTS"],
    accent: "cyan",
  },
  {
    number: "02",
    type: "PRODUCT ENGINEERING",
    title: "Dezo.in",
    description: "A founder-built digital studio shaping ambitious ideas into sharp, durable products.",
    tags: ["0 → 1", "WEB", "STRATEGY"],
    accent: "lime",
  },
  {
    number: "03",
    type: "DEFENSIVE SECURITY",
    title: "Sentinel",
    description: "Evidence-first security workflows designed for systems where trust cannot be assumed.",
    tags: ["THREAT INTEL", "AUTOMATION", "ZERO TRUST"],
    accent: "violet",
  },
];

const capabilities = [
  ["01", "Forensic intelligence", "Digital evidence, incident narratives, and methodology for the moments that demand precision."],
  ["02", "Security by design", "Threat modelling and defence-in-depth for teams who need to move fast without breaking trust."],
  ["03", "AI that earns its place", "Retrieval, orchestration, and agentic systems that have a measurable job to do."],
  ["04", "Full-stack product craft", "High-performance platforms with a considered interface, sound architecture, and a long runway."],
];

function SignalOrb() {
  return (
    <div className="signal-orb" aria-hidden="true">
      <div className="orb-glow" />
      <div className="orbital orbital-one" />
      <div className="orbital orbital-two" />
      <div className="orbital orbital-three" />
      <div className="orb-satellite satellite-one" />
      <div className="orb-satellite satellite-two" />
      <div className="orb-core">
        <span>TI</span>
        <i />
      </div>
      <div className="orb-label label-one">RESEARCH</div>
      <div className="orb-label label-two">BUILD</div>
      <div className="orb-label label-three">DEFEND</div>
    </div>
  );
}

export function WowPortfolio() {
  return (
    <main id="top" className="wow-portfolio">
      <div className="wow-noise" aria-hidden="true" />
      <div className="wow-grid" aria-hidden="true" />
      <header className="wow-nav">
        <a className="wow-mark" href="#top" aria-label="Tarik Islam home">
          <span className="wow-mark-symbol">TI</span>
          <span className="wow-mark-name">Tarik<br />Islam</span>
        </a>
        <nav className="wow-links" aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#capabilities">Capabilities</a>
          <a href="#about">About</a>
        </nav>
        <a className="wow-availability" href="#contact">
          <span className="availability-dot" />
          Available for select work
        </a>
      </header>

      <section className="wow-hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span>01</span> Independent researcher &amp; builder</p>
          <h1 id="hero-title">Make it<br /><em>matter.</em></h1>
          <p className="hero-intro">
            I design intelligent products at the edge of <strong>AI, security, and forensic thinking</strong> — for people building things worth protecting.
          </p>
          <div className="hero-actions">
            <a className="button-primary" href="#contact">Start a conversation <ArrowUpRight size={17} /></a>
            <a className="text-link" href="#work">Explore selected work <ArrowDownRight size={18} /></a>
          </div>
        </div>
        <div className="hero-art">
          <p className="art-kicker">SIGNAL / 2026</p>
          <SignalOrb />
          <p className="art-caption"><span>FOCUSED PRACTICE</span><br />Built for clarity under pressure.</p>
        </div>
        <div className="hero-footnote">
          <span>Based in India</span>
          <span className="hero-rule" />
          <span>Working globally</span>
          <span className="hero-rule" />
          <span>UTC +05:30</span>
        </div>
      </section>

      <section className="impact-strip" aria-label="Experience highlights">
        <div><strong>Forensics</strong><span>Evidence / method / integrity</span></div>
        <div><strong>Security</strong><span>Threats / systems / resilience</span></div>
        <div><strong>AI</strong><span>Research / inference / agents</span></div>
        <div><strong>Products</strong><span>Concept / craft / launch</span></div>
      </section>

      <section className="work-section" id="work" aria-labelledby="work-title">
        <div className="section-header">
          <p className="eyebrow"><span>02</span> Selected missions</p>
          <div>
            <h2 id="work-title">Some things<br />I’ve been <em>making.</em></h2>
            <p>Every engagement is a small act of systems thinking: see the whole, find the leverage, then build the useful thing.</p>
          </div>
        </div>
        <div className="work-list">
          {work.map((item) => (
            <article className={`work-card ${item.accent}`} key={item.number}>
              <div className="work-card-top"><span>{item.number}</span><span>{item.type}</span></div>
              <div className="work-index-art" aria-hidden="true"><span>{item.number}</span><i /><i /><i /></div>
              <div className="work-card-bottom">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="work-tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </div>
              <a href="#contact" className="work-arrow" aria-label={`Discuss ${item.title}`}><ArrowUpRight size={20} /></a>
            </article>
          ))}
        </div>
      </section>

      <section className="manifesto" id="about" aria-label="Approach">
        <p className="eyebrow"><span>03</span> The operating principle</p>
        <div className="manifesto-quote">
          <Sparkles className="spark" size={24} />
          <p>Great technology should feel <em>inevitable</em> to the people who rely on it — and invisible to the problems it removes.</p>
        </div>
        <div className="manifesto-meta">
          <span>Tarik Islam</span><span>Researcher / Engineer / Founder</span><span>Field notes, 2026</span>
        </div>
      </section>

      <section className="capabilities-section" id="capabilities" aria-labelledby="capabilities-title">
        <div className="capability-intro">
          <p className="eyebrow"><span>04</span> Areas of focus</p>
          <h2 id="capabilities-title">A small studio<br />inside one mind.</h2>
          <p>I bring the investigative mindset of forensics, the rigor of security, and the optimism of product design to a focused body of work.</p>
          <a className="text-link" href="/resume">View experience <ArrowUpRight size={18} /></a>
        </div>
        <div className="capability-list">
          {capabilities.map(([number, title, description]) => (
            <article className="capability" key={number}>
              <span className="capability-number">{number}</span>
              <div><h3>{title}</h3><p>{description}</p></div>
              <ArrowUpRight className="capability-arrow" size={20} />
            </article>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact" aria-labelledby="contact-title">
        <div className="contact-orbit" aria-hidden="true"><span>OPEN TO GOOD QUESTIONS • OPEN TO GOOD QUESTIONS • </span></div>
        <p className="eyebrow"><span>05</span> Make contact</p>
        <h2 id="contact-title">Have a problem<br />worth <em>solving?</em></h2>
        <p>Tell me what is at stake. I’ll bring the questions, systems, and momentum to move it forward.</p>
        <a className="button-primary button-light" href="mailto:hello@tarikislam.com">Write an email <Mail size={17} /></a>
      </section>

      <footer className="wow-footer">
        <a className="wow-mark" href="#top"><span className="wow-mark-symbol">TI</span><span className="wow-mark-name">Tarik<br />Islam</span></a>
        <p>© 2026 — Built with quiet obsession.</p>
        <div className="footer-links">
          <a href="https://github.com" aria-label="GitHub"><Github size={18} /></a>
          <a href="https://linkedin.com" aria-label="LinkedIn"><Linkedin size={18} /></a>
          <a href="mailto:hello@tarikislam.com" aria-label="Email"><Mail size={18} /></a>
        </div>
      </footer>
    </main>
  );
}
