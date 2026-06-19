import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  BriefcaseBusiness,
  Check,
  ExternalLink,
  Heart,
  Mail,
  Menu,
  Mic2,
  MonitorCheck,
  ShieldCheck,
  X,
} from "lucide-react";
import { identity, journey, media, practicePillars, topics } from "./content.js";

const navItems = [
  ["Journey", "journey"],
  ["Ideas", "ideas"],
  ["Media", "media"],
  ["Speaking", "speaking"],
  ["Practice", "practice"],
];

const filters = ["All", "Refugee & democracy", "Dentistry & business", "Talks & podcasts"];
const pillarIcons = [BriefcaseBusiness, ShieldCheck, BrainCircuit, MonitorCheck];

function Button({ children, variant = "primary", onClick, href, target, className = "" }) {
  const props = { className: `button button--${variant} ${className}`.trim(), onClick, target, rel: target ? "noreferrer" : undefined };
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
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="contact-title">
        <button className="icon-button modal__close" onClick={onClose} aria-label="Close dialog"><X /></button>
        {sent ? (
          <div className="success-state"><span><Check /></span><h2 id="contact-title">Thank you.</h2><p>This preview records the interaction but does not send email yet. For now, contact Dr. Shakally directly at info@drshakally.com.</p><Button onClick={onClose}>Close</Button></div>
        ) : (
          <form onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
            <p className="eyebrow">Speaking, media & advisory</p>
            <h2 id="contact-title">Start a conversation.</h2>
            <p>Tell us about your audience, organization, or the problem you are trying to solve.</p>
            <label>Name<input name="name" required autoFocus /></label>
            <label>Email<input name="email" type="email" required /></label>
            <label>Inquiry<select name="interest"><option>Speaking engagement</option><option>Media interview</option><option>Practice advisory</option><option>AI and workflow strategy</option><option>Industry partnership</option></select></label>
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
  const [mediaFilter, setMediaFilter] = useState("All");
  const filteredMedia = useMemo(() => mediaFilter === "All" ? media : media.filter((item) => item.type === mediaFilter), [mediaFilter]);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="site-shell">
      <header className="header">
        <button className="wordmark" onClick={() => go("top")}>DrShakally.com</button>
        <nav className={menuOpen ? "nav nav--open" : "nav"} aria-label="Primary navigation">
          {navItems.map(([label, id]) => <button key={id} onClick={() => go(id)}>{label}</button>)}
          <Button onClick={() => setDialogOpen(true)}>Contact</Button>
        </nav>
        <button className="icon-button menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <img className="hero__image" src="/assets/jasmine-fatherhood.jpg" alt="Dr. Shakally holding his newborn daughter Jasmine" />
          <div className="hero__veil" />
          <div className="hero__content">
            <p className="eyebrow eyebrow--light">{identity.roles.join(" / ")}</p>
            <h1 id="hero-title">{identity.name}</h1>
            <p className="hero__statement">{identity.statement}</p>
            <p className="hero__summary">{identity.summary}</p>
            <div className="button-row"><Button onClick={() => go("journey")}>Follow the journey <ArrowRight /></Button><Button variant="light" onClick={() => go("media")}>Watch & listen</Button></div>
          </div>
          <p className="hero__caption">With Jasmine, born June 6, 2026</p>
        </section>

        <section className="manifesto section-band">
          <p className="eyebrow">One life, connected</p>
          <div><h2>The refugee story is not a preface. Dentistry is not the ending.</h2><p>Each chapter informs the next: surviving political violence, navigating temporary status, becoming a dentist, building a business, and now becoming a father. The work is about what people can build when they are given safety, agency, and a standard worth reaching for.</p></div>
        </section>

        <section className="journey section-band" id="journey">
          <div className="section-heading"><div><p className="eyebrow">The journey</p><h2>Damascus to fatherhood.</h2></div><p>A public record of displacement, education, advocacy, clinical practice, entrepreneurship, and family.</p></div>
          <div className="timeline">{journey.map((chapter, index) => <article key={chapter.year + chapter.title} className={index === journey.length - 1 ? "timeline__item timeline__item--latest" : "timeline__item"}><div className="timeline__date"><span>{chapter.year}</span><small>{chapter.place}</small></div><div><h3>{chapter.title}</h3><p>{chapter.copy}</p>{chapter.url && <a href={chapter.url} target="_blank" rel="noreferrer">Read the source <ExternalLink /></a>}</div></article>)}</div>
        </section>

        <section className="fatherhood" aria-labelledby="fatherhood-title">
          <img src="/assets/jasmine-fatherhood.jpg" alt="Dr. Shakally cradling Jasmine in his hands" />
          <div><p className="eyebrow eyebrow--light">The newest chapter</p><h2 id="fatherhood-title">Jasmine arrived on 06.06.26.</h2><blockquote>“Fatherhood changed the scale of every question: what we build, what we protect, and what we leave behind.”</blockquote><p>Her story comes after Southern Smiles, but it changes the meaning of everything still to come.</p></div>
        </section>

        <section className="media section-band" id="media">
          <div className="section-heading"><div><p className="eyebrow">In the public record</p><h2>Watch, listen, and read.</h2></div><p>Conversations spanning refugee experience, democracy, dentistry, leadership, and practice ownership.</p></div>
          <div className="filter-bar" role="tablist" aria-label="Filter media">{filters.map((filter) => <button key={filter} className={mediaFilter === filter ? "active" : ""} onClick={() => setMediaFilter(filter)} role="tab" aria-selected={mediaFilter === filter}>{filter}</button>)}</div>
          <div className="media-list">{filteredMedia.map((item) => <a href={item.url} target="_blank" rel="noreferrer" key={item.title}><div><span>{item.year}</span><span>{item.format}</span></div><h3>{item.title}</h3><p>{item.publisher}</p><ExternalLink /></a>)}</div>
        </section>

        <section className="speaking section-band" id="speaking">
          <div className="section-heading"><div><p className="eyebrow">Speaking</p><h2>Ideas built from lived experience.</h2></div><Button variant="text" onClick={() => setDialogOpen(true)}>Invite Dr. Shakally <ArrowRight /></Button></div>
          <div className="topics">{topics.map((topic) => <article key={topic.number}><span>{topic.number}</span><Mic2 /><h3>{topic.title}</h3><p>{topic.copy}</p></article>)}</div>
        </section>

        <section className="practice" id="ideas">
          <div className="practice__intro"><p className="eyebrow eyebrow--light">The current chapter</p><h2>The practice is the proof.</h2><p>Southern Smiles is the living laboratory for a different dental business model: higher standards of care, custom operating systems, useful AI, and one connected digital workflow.</p><Button variant="outline-light" href="https://www.ssmilesdental.com" target="_blank">Visit Southern Smiles <ArrowRight /></Button></div>
          <div className="practice__pillars">{practicePillars.map((pillar, index) => { const Icon = pillarIcons[index]; return <article key={pillar.title}><Icon /><span>{String(index + 1).padStart(2, "0")}</span><h3>{pillar.title}</h3><p>{pillar.copy}</p></article>; })}</div>
        </section>

        <section className="proof section-band" id="practice">
          <div><p className="eyebrow">Southern Smiles · South Phoenix</p><h2>Built from zero patients.</h2><p>A modern independent practice designed around trust, plainspoken care, digital capability, and a team empowered to improve the system.</p><Button variant="text" href="https://www.ssmilesdental.com/about-us/staff/dentists/dr-monzer-shakally" target="_blank">Read the practice biography <ArrowRight /></Button></div>
          <img src="/assets/practice-exterior.jpg" alt="Southern Smiles practice exterior" />
        </section>

        <section className="press section-band">
          <div><p className="eyebrow">Press & partnerships</p><h2>For interviews, keynotes, and industry conversations.</h2></div>
          <div className="press__actions"><a href="mailto:info@drshakally.com?subject=Media%20or%20speaking%20request"><Mail /> Media & speaking requests <ArrowRight /></a><a href="https://thedentalmarketer.site/podcast/500" target="_blank" rel="noreferrer"><BookOpen /> Hear the long-form story <ArrowRight /></a><button onClick={() => setDialogOpen(true)}><Heart /> Start a conversation <ArrowRight /></button></div>
        </section>
      </main>

      <footer><div><span className="wordmark">DrShakally.com</span><p>Refugee. Father. Dentist.<br />Business owner. Entrepreneur.</p></div><div>{navItems.map(([label, id]) => <button key={id} onClick={() => go(id)}>{label}</button>)}</div><a href="mailto:info@drshakally.com"><Mail /> info@drshakally.com</a></footer>
      <ContactDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </div>
  );
}
