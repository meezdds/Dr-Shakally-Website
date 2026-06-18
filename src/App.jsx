import { useEffect, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  Camera,
  Check,
  ChevronRight,
  CircleUserRound,
  ClipboardCheck,
  Gauge,
  Lightbulb,
  Mail,
  Menu,
  MessageSquareText,
  MonitorCheck,
  Presentation,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UsersRound,
  X,
} from "lucide-react";
import { siteContent } from "./content.js";

const pillars = [
  { icon: BriefcaseBusiness, title: "Business model", copy: "Align clinical excellence with financial performance." },
  { icon: ShieldCheck, title: "Standard of care", copy: "Embed evidence, judgment, and experience in repeatable systems." },
  { icon: BrainCircuit, title: "Applied AI", copy: "Deploy useful intelligence that augments people and unlocks capacity." },
  { icon: MonitorCheck, title: "Digital workflow", copy: "Connect diagnosis, planning, communication, and delivery." },
];

const model = [
  { icon: ScanLine, title: "Diagnose the practice", copy: "Clarify strengths, gaps, and potential." },
  { icon: Lightbulb, title: "Design the system", copy: "Set strategy, structure, and workflows." },
  { icon: Presentation, title: "Deploy the plan", copy: "Put technology, training, and leadership to work." },
  { icon: Gauge, title: "Measure what matters", copy: "Track the behaviors that create outcomes." },
  { icon: BarChart3, title: "Compound over time", copy: "Turn better results into better possibilities." },
];

const navItems = [
  ["About", "about"], ["Ideas", "ideas"], ["Speaking", "speaking"],
  ["Solutions", "solutions"], ["Practice", "practice"],
];

function Button({ children, variant = "primary", onClick, href, className = "" }) {
  const props = { className: `button button--${variant} ${className}`.trim(), onClick };
  return href ? <a {...props} href={href}>{children}</a> : <button type="button" {...props}>{children}</button>;
}

function ContactDialog({ open, onClose }) {
  const [sent, setSent] = useState(false);
  useEffect(() => {
    if (!open) setSent(false);
    const close = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="contact-title">
        <button className="icon-button modal__close" onClick={onClose} aria-label="Close dialog"><X /></button>
        {sent ? (
          <div className="success-state"><span><Check /></span><h2 id="contact-title">Thank you.</h2><p>Your request is ready for review. This prototype does not send external email yet.</p><Button onClick={onClose}>Close</Button></div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <p className="eyebrow">Speaking & advisory</p>
            <h2 id="contact-title">Start a conversation.</h2>
            <p>Tell us what you are building, changing, or bringing to your audience.</p>
            <label>Name<input name="name" required autoFocus /></label>
            <label>Email<input name="email" type="email" required /></label>
            <label>What are you interested in?<select name="interest"><option>Speaking engagement</option><option>Practice advisory</option><option>AI and workflow strategy</option><option>Industry partnership</option></select></label>
            <label>Message<textarea name="message" rows="4" required /></label>
            <Button className="modal__submit">Send request <ArrowRight /></Button>
          </form>
        )}
      </section>
    </div>
  );
}

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activePillar, setActivePillar] = useState(0);
  const { identity, keynoteTopics, aiUseCases, workflow } = siteContent;

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="site-shell">
      <header className="header">
        <button className="wordmark" onClick={() => go("about")}>DrShakally.com</button>
        <nav className={menuOpen ? "nav nav--open" : "nav"} aria-label="Primary navigation">
          {navItems.map(([label, id]) => <button key={id} onClick={() => go(id)}>{label}</button>)}
          <Button onClick={() => setDialogOpen(true)} className="nav__contact">Contact</Button>
        </nav>
        <button className="icon-button menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <main>
        <section className="hero" id="about">
          <div className="hero__copy">
            <p className="eyebrow">{identity.eyebrow}</p>
            <h1>{identity.name}</h1>
            <h2>{identity.headline}</h2>
            <p className="hero__subhead">{identity.subhead}</p>
            <p className="hero__proof">{identity.proof}</p>
            <p className="hero__summary">{identity.summary}</p>
            <div className="button-row"><Button onClick={() => setDialogOpen(true)}>Work with Dr. Shakally <ArrowRight /></Button><Button variant="text" onClick={() => go("speaking")}>View keynote topics <ArrowRight /></Button></div>
          </div>
          <figure className="hero__portrait"><img src="/assets/hero-portrait-placeholder.jpg" alt="Editorial portrait placeholder for Dr. Shakally" /><figcaption>Portrait placeholder</figcaption></figure>
          <aside className="hero__system" aria-label="Modern practice system">
            <p className="eyebrow">The modern practice system</p>
            <div className="system-core">Better<br />systems</div>
            <ul><li><CircleUserRound /> Patient experience</li><li><Stethoscope /> Clinical excellence</li><li><UsersRound /> Team</li><li><BarChart3 /> Economics</li><li><Bot /> AI</li></ul>
            <p>Strategy, culture, and execution that raise the standard every day.</p>
          </aside>
        </section>

        <section className="section speaking" id="speaking">
          <div className="section-heading"><p className="eyebrow">Speaking & keynote topics</p><Button variant="text" onClick={() => setDialogOpen(true)}>Invite Dr. Shakally <ArrowRight /></Button></div>
          <div className="topic-grid">{keynoteTopics.map((topic) => <article key={topic.number}><span>{topic.number}</span><h3>{topic.title}</h3><p>{topic.description}</p></article>)}</div>
        </section>

        <section className="model-section" id="ideas">
          <div className="model-intro"><p className="eyebrow">The Shakally practice model</p><h2>A connected model.<br />Measurable results.</h2><p>An operating system for modern dentistry that aligns patient value, clinical excellence, team performance, and economic health.</p></div>
          <div className="model-steps">{model.map((step, index) => <article key={step.title}><step.icon /><span>{String(index + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.copy}</p>{index < model.length - 1 && <ChevronRight className="model-arrow" />}</article>)}</div>
        </section>

        <section className="section pillars" aria-labelledby="pillars-title">
          <div className="section-heading"><div><p className="eyebrow">Four connected disciplines</p><h2 id="pillars-title">A practical framework for exceptional practices.</h2></div></div>
          <div className="pillar-tabs" role="tablist">{pillars.map((pillar, index) => <button key={pillar.title} className={index === activePillar ? "active" : ""} onClick={() => setActivePillar(index)} role="tab" aria-selected={index === activePillar}><pillar.icon /><span>{String(index + 1).padStart(2, "0")}</span>{pillar.title}</button>)}</div>
          <div className="pillar-detail"><div><p className="eyebrow">Selected discipline</p><h3>{pillars[activePillar].title}</h3><p>{pillars[activePillar].copy}</p></div><div className="detail-list"><p><Check /> Designed around the desired outcome</p><p><Check /> Deployed through practical systems</p><p><Check /> Measured, reviewed, and improved</p></div></div>
        </section>

        <section className="split-system" id="solutions">
          <article className="ai-panel"><p className="eyebrow">Applied AI: deployed, not hypothetical</p><h2>Useful intelligence inside the practice.</h2><div>{aiUseCases.map((item, i) => { const Icon = [ClipboardCheck, BrainCircuit, MessageSquareText, BarChart3][i]; return <section key={item.title}><Icon /><div><h3>{item.title}</h3><p>{item.copy}</p></div></section>; })}</div></article>
          <article className="workflow-panel"><p className="eyebrow">End-to-end digital dentistry workflow</p><h2>One digital thread.</h2><div className="workflow">{workflow.map((step, i) => { const Icon = [Camera, MonitorCheck, MessageSquareText, Stethoscope, Sparkles][i]; return <section key={step.label}><Icon /><h3>{step.label}</h3><p>{step.copy}</p></section>; })}</div></article>
        </section>

        <section className="advisory">
          <div className="advisory__copy"><p className="eyebrow">Business advisory & custom solutions</p><h2>Practical solutions for modern dental organizations.</h2><ul><li><Check /> Practice assessment and strategy</li><li><Check /> Operating systems and team performance</li><li><Check /> Technology and AI implementation</li><li><Check /> Growth, partnerships, and transitions</li></ul><Button onClick={() => setDialogOpen(true)}>Start a conversation <ArrowRight /></Button></div>
          <img src="/assets/strategy-room.jpg" alt="Modern dental practice strategy room" />
        </section>

        <section className="evidence" id="practice">
          <div className="evidence__ideas"><p className="eyebrow">Selected thinking</p><h2>Ideas from the field.</h2><article><span>Applied AI</span><h3>Automation is not the strategy. Better decisions are.</h3></article><article><span>Practice design</span><h3>The business model is part of the standard of care.</h3></article><article><span>Digital dentistry</span><h3>One connected workflow changes more than efficiency.</h3></article></div>
          <div className="evidence__practice"><div><p className="eyebrow">The practice is the proof</p><h2>Southern Smiles</h2><p>A modern practice where the systems are tested, refined, and measured in the real world.</p><a href="https://ssmilesdental.com" target="_blank" rel="noreferrer">Visit Southern Smiles <ArrowRight /></a></div><img src="/assets/practice-exterior.jpg" alt="Modern dental practice exterior" /></div>
        </section>
      </main>

      <footer><div><span className="wordmark">DrShakally.com</span><p>Building better practices.<br />Raising the standard of care.</p></div><div><button onClick={() => go("about")}>About</button><button onClick={() => go("speaking")}>Speaking</button><button onClick={() => go("ideas")}>Framework</button><button onClick={() => setDialogOpen(true)}>Contact</button></div><a href="mailto:info@drshakally.com"><Mail /> info@drshakally.com</a></footer>
      <ContactDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </div>
  );
}
