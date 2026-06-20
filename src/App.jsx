import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
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

const routes = [
  { label: "Journey", path: "/journey" },
  { label: "Dentistry", path: "/dentistry" },
  { label: "Ideas", path: "/ideas" },
  { label: "Speaking", path: "/speaking" },
  { label: "Life", path: "/life" },
];

const routeTitles = {
  "/": "Dr. Monzer Shakally",
  "/journey": "Journey | Dr. Monzer Shakally",
  "/dentistry": "Dentistry & Practice | Dr. Monzer Shakally",
  "/ideas": "Ideas & AI | Dr. Monzer Shakally",
  "/speaking": "Speaking & Media | Dr. Monzer Shakally",
  "/life": "Life & Fatherhood | Dr. Monzer Shakally",
};

const filters = ["All", "Refugee & democracy", "Dentistry & business", "Talks & podcasts"];
const pillarIcons = [BriefcaseBusiness, ShieldCheck, BrainCircuit, MonitorCheck];

function cleanPath(pathname) {
  const path = pathname.replace(/\/+$/, "") || "/";
  return routeTitles[path] ? path : "/";
}

function Button({ children, variant = "primary", onClick, href, target, className = "" }) {
  const props = {
    className: `button button--${variant} ${className}`.trim(),
    onClick,
    target,
    rel: target ? "noreferrer" : undefined,
  };
  return href ? <a {...props} href={href}>{children}</a> : <button type="button" {...props}>{children}</button>;
}

function SiteLink({ to, children, className = "", onNavigate }) {
  return (
    <a
      className={className}
      href={to}
      onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        onNavigate(to);
      }}
    >
      {children}
    </a>
  );
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
          <div className="success-state">
            <span><Check /></span>
            <h2 id="contact-title">Thank you.</h2>
            <p>This preview records the interaction but does not send email yet. Contact Dr. Shakally directly at info@drshakally.com.</p>
            <Button onClick={onClose}>Close</Button>
          </div>
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

function PageHero({ eyebrow, title, copy, image, imagePosition = "center", children, caption }) {
  return (
    <section className="page-hero">
      <img src={image} alt="" style={{ objectPosition: imagePosition }} />
      <div className="page-hero__veil" />
      <div className="page-hero__content">
        <p className="eyebrow eyebrow--light">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{copy}</p>
        {children}
      </div>
      {caption && <span className="page-hero__caption">{caption}</span>}
    </section>
  );
}

function PathwayCard({ number, title, copy, image, to, onNavigate }) {
  return (
    <SiteLink className="pathway-card" to={to} onNavigate={onNavigate}>
      <img src={image} alt="" />
      <div><span>{number}</span><ArrowRight /></div>
      <h3>{title}</h3>
      <p>{copy}</p>
    </SiteLink>
  );
}

function MediaArchive() {
  const [mediaFilter, setMediaFilter] = useState("All");
  const filteredMedia = useMemo(
    () => mediaFilter === "All" ? media : media.filter((item) => item.type === mediaFilter),
    [mediaFilter],
  );

  return (
    <>
      <div className="filter-bar" role="tablist" aria-label="Filter media">
        {filters.map((filter) => (
          <button key={filter} className={mediaFilter === filter ? "active" : ""} onClick={() => setMediaFilter(filter)} role="tab" aria-selected={mediaFilter === filter}>{filter}</button>
        ))}
      </div>
      <div className="media-list">
        {filteredMedia.map((item) => (
          <a href={item.url} target="_blank" rel="noreferrer" key={item.title}>
            <div><span>{item.year}</span><span>{item.format}</span></div>
            <h3>{item.title}</h3>
            <p>{item.publisher}</p>
            <ExternalLink />
          </a>
        ))}
      </div>
    </>
  );
}

function HomePage({ navigate, openContact }) {
  return (
    <main>
      <PageHero
        eyebrow={identity.roles.join(" / ")}
        title={identity.name}
        copy="A life rebuilt. A profession reimagined."
        image="/assets/real/portrait-white-coat.jpg"
        imagePosition="center 24%"
        caption="Founder, Southern Smiles · Phoenix, Arizona"
      >
        <div className="button-row">
          <Button onClick={() => navigate("/journey")}>Follow the journey <ArrowRight /></Button>
          <Button variant="light" onClick={() => navigate("/speaking")}>Watch & listen</Button>
        </div>
      </PageHero>

      <section className="manifesto section-band">
        <p className="eyebrow">One life, connected</p>
        <div>
          <h2>Dentistry is the proof base. The larger work is redesigning what is possible.</h2>
          <p>Dr. Monzer Shakally brings together lived experience as a refugee, the discipline of clinical care, the reality of business ownership, and a systems-level view of how AI and digital workflows can raise the standard.</p>
        </div>
      </section>

      <section className="section-band pathways">
        <div className="section-heading">
          <div><p className="eyebrow">Choose a pathway</p><h2>A story with more than one entry point.</h2></div>
          <p>Explore the chapters, operating ideas, and public conversations in the depth they deserve.</p>
        </div>
        <div className="pathway-grid">
          <PathwayCard number="01" title="The Journey" copy="Damascus, exile, Iowa, advocacy, dentistry, ownership, and fatherhood." image="/assets/jasmine-fatherhood.jpg" to="/journey" onNavigate={navigate} />
          <PathwayCard number="02" title="Dentistry & Practice" copy="The clinical work and independent practice where the model is tested every day." image="/assets/real/digital-scan.jpg" to="/dentistry" onNavigate={navigate} />
          <PathwayCard number="03" title="Ideas & AI" copy="A higher standard of care, custom operating systems, applied AI, and one digital thread." image="/assets/real/patient-consultation.jpg" to="/ideas" onNavigate={navigate} />
          <PathwayCard number="04" title="Speaking & Media" copy="Keynotes, interviews, lectures, podcasts, and the public record." image="/assets/real/headshot-09.jpg" to="/speaking" onNavigate={navigate} />
          <PathwayCard number="05" title="Life" copy="Family, fatherhood, identity, and the responsibility behind the work." image="/assets/real/practice-team.jpg" to="/life" onNavigate={navigate} />
        </div>
      </section>

      <section className="feature-split feature-split--dark">
        <img src="/assets/real/clinical-scan.jpg" alt="Dr. Shakally using an intraoral scanner during patient care" />
        <div>
          <p className="eyebrow eyebrow--light">The practice is the proof</p>
          <h2>Build the system. Test it in reality.</h2>
          <p>Southern Smiles is where clinical standards, team design, technology, economics, and patient experience have to work together, not merely sound good in a presentation.</p>
          <Button variant="outline-light" onClick={() => navigate("/dentistry")}>Enter the practice <ArrowRight /></Button>
        </div>
      </section>

      <section className="press section-band">
        <div><p className="eyebrow">Speaking & partnerships</p><h2>For interviews, keynotes, and serious industry conversations.</h2></div>
        <div className="press__actions">
          <a href="mailto:info@drshakally.com?subject=Media%20or%20speaking%20request"><Mail /> Media & speaking requests <ArrowRight /></a>
          <button onClick={() => navigate("/speaking")}><BookOpen /> Explore the public record <ArrowRight /></button>
          <button onClick={openContact}><Heart /> Start a conversation <ArrowRight /></button>
        </div>
      </section>
    </main>
  );
}

function JourneyPage({ navigate }) {
  return (
    <main>
      <PageHero eyebrow="The journey" title="A life rebuilt in chapters." copy="The refugee story is not a preface. Dentistry is not the ending. Each chapter changes the meaning of the next." image="/assets/jasmine-fatherhood.jpg" imagePosition="center 46%" caption="With Jasmine · June 2026" />
      <section className="section-band page-intro">
        <p className="eyebrow">Damascus to Phoenix</p>
        <h2>Displacement became a public voice. Education became a profession. Ownership became a platform.</h2>
        <p>What follows is not a polished origin myth. It is a record of uncertainty, advocacy, work, and the people and institutions that made another future possible.</p>
      </section>
      <section className="journey-layout section-band">
        <div className="timeline">
          {journey.map((chapter, index) => (
            <article key={chapter.year + chapter.title} className={index === journey.length - 1 ? "timeline__item timeline__item--latest" : "timeline__item"}>
              <div className="timeline__date"><span>{chapter.year}</span><small>{chapter.place}</small></div>
              <div><h3>{chapter.title}</h3><p>{chapter.copy}</p>{chapter.url && <a href={chapter.url} target="_blank" rel="noreferrer">Read the source <ExternalLink /></a>}</div>
            </article>
          ))}
        </div>
        <aside className="journey-aside">
          <img src="/assets/real/community-selfie.jpg" alt="Dr. Shakally with members of his community" />
          <blockquote>“The work is about what people can build when they are given safety, agency, and a standard worth reaching for.”</blockquote>
        </aside>
      </section>
      <NextPath eyebrow="Continue the story" title="See what the journey built." copy="Southern Smiles became the place where belief turned into an operating model." to="/dentistry" onNavigate={navigate} />
    </main>
  );
}

function DentistryPage({ navigate }) {
  return (
    <main>
      <PageHero eyebrow="Dentistry & practice" title="The practice is the proof." copy="A modern independent dental practice built around trust, rigorous care, digital capability, and a team empowered to improve the system." image="/assets/real/clinical-scan.jpg" imagePosition="center 38%" caption="Southern Smiles · South Phoenix" />
      <section className="section-band page-intro page-intro--two">
        <div><p className="eyebrow">Southern Smiles</p><h2>Built from zero patients in 2024.</h2></div>
        <div><p>Southern Smiles began with one dentist, one assistant, and a conviction that an independent practice could deliver both deeply personal care and a more disciplined operating model.</p><a href="https://www.ssmilesdental.com" target="_blank" rel="noreferrer">Visit the patient website <ExternalLink /></a></div>
      </section>
      <section className="photo-story">
        <img src="/assets/real/clinical-care.jpg" alt="Dr. Shakally and a dental assistant providing clinical care" />
        <div><p className="eyebrow">Standard of care</p><h2>Technology matters when it makes judgment clearer.</h2><p>Digital imaging, intraoral scanning, in-house design, and connected records are not decorations. They make diagnosis more visible, treatment more understandable, and delivery more predictable.</p></div>
      </section>
      <section className="section-band">
        <div className="section-heading"><div><p className="eyebrow">Practice OS</p><h2>Four systems, one standard.</h2></div><p>The business is designed as a connected clinical and organizational system rather than a collection of software subscriptions.</p></div>
        <div className="pillar-grid">
          {practicePillars.map((pillar, index) => { const Icon = pillarIcons[index]; return <article key={pillar.title}><Icon /><span>{String(index + 1).padStart(2, "0")}</span><h3>{pillar.title}</h3><p>{pillar.copy}</p></article>; })}
        </div>
      </section>
      <section className="image-band">
        <img src="/assets/real/treatment-planning.jpg" alt="Dr. Shakally explaining a treatment model" />
        <img src="/assets/real/practice-team.jpg" alt="Dr. Shakally with a Southern Smiles team member" />
      </section>
      <NextPath eyebrow="Go deeper" title="The ideas behind the operating model." copy="Explore the business model, applied AI, and distinct digital workflow." to="/ideas" onNavigate={navigate} />
    </main>
  );
}

function IdeasPage({ navigate }) {
  return (
    <main>
      <PageHero eyebrow="Ideas & applied AI" title="Better care demands a better system." copy="Redesigning the dental business model around clinical excellence, team capacity, clear economics, and technology that earns its place." image="/assets/real/patient-consultation.jpg" imagePosition="center 42%" caption="Treatment planning at Southern Smiles" />
      <section className="section-band thesis">
        <p className="eyebrow">The central thesis</p>
        <h2>The future of dentistry is not more software. It is a coherent operating model.</h2>
        <p>AI, digital dentistry, and business systems matter only when they help clinicians see better, teams coordinate better, patients understand more, and practices make decisions with less noise.</p>
      </section>
      <section className="idea-sequence section-band">
        <article><span>01</span><div><h2>Redesign the business model</h2><p>Align access, quality, capacity, and financial clarity so clinical standards do not depend on heroics or burnout.</p></div></article>
        <article><span>02</span><div><h2>Deploy AI where work actually happens</h2><p>Use intelligence inside documentation, communication, planning support, training, and operational visibility, with human judgment remaining accountable.</p></div></article>
        <article><span>03</span><div><h2>Create one digital thread</h2><p>Connect capture, diagnosis, patient understanding, design, execution, delivery, and recall so information gets better as it moves.</p></div></article>
        <article><span>04</span><div><h2>Raise the standard without losing the person</h2><p>Repeatable systems should create more room for attention, trust, and individualized care, not less.</p></div></article>
      </section>
      <section className="feature-split">
        <img src="/assets/real/digital-scan.jpg" alt="Dr. Shakally working with a digital intraoral scanner" />
        <div><p className="eyebrow">One digital thread</p><h2>From capture to delivery.</h2><p>A distinct workflow connects the patient's story, visual records, diagnostics, treatment design, communication, execution, and long-term follow-up.</p><Button variant="text" onClick={() => navigate("/speaking")}>Bring these ideas to an audience <ArrowRight /></Button></div>
      </section>
      <NextPath eyebrow="Hear the ideas" title="Speaking, interviews, and long-form conversations." copy="See the subjects, appearances, and ways to invite Dr. Shakally." to="/speaking" onNavigate={navigate} />
    </main>
  );
}

function SpeakingPage({ openContact, navigate }) {
  return (
    <main>
      <PageHero eyebrow="Speaking & media" title="Ideas built from lived experience." copy="Keynotes and conversations about refuge, ownership, dental leadership, AI, and what it takes to rebuild a system from first principles." image="/assets/real/headshot-12.jpg" imagePosition="center 24%" caption="Dr. Monzer Shakally · Speaker and operator">
        <Button onClick={openContact}>Invite Dr. Shakally <ArrowRight /></Button>
      </PageHero>
      <section className="section-band">
        <div className="section-heading"><div><p className="eyebrow">Signature subjects</p><h2>Five conversations worth having.</h2></div><p>Each talk can be shaped for dental audiences, business leaders, universities, civic organizations, or media.</p></div>
        <div className="topics">{topics.map((topic) => <article key={topic.number}><span>{topic.number}</span><Mic2 /><h3>{topic.title}</h3><p>{topic.copy}</p></article>)}</div>
      </section>
      <section className="media section-band">
        <div className="section-heading"><div><p className="eyebrow">The public record</p><h2>Watch, listen, and read.</h2></div><p>Coverage and conversations spanning refugee experience, democracy, dentistry, leadership, and practice ownership.</p></div>
        <MediaArchive />
      </section>
      <section className="speaker-cta">
        <img src="/assets/real/headshot-10.jpg" alt="Professional portrait of Dr. Monzer Shakally" />
        <div><p className="eyebrow eyebrow--light">Speaking, media & advisory</p><h2>Start with the audience and the question.</h2><p>Tell us who is in the room, what they are wrestling with, and what should be different when the conversation ends.</p><Button onClick={openContact}>Start a conversation <ArrowRight /></Button></div>
      </section>
      <NextPath eyebrow="Behind the work" title="Meet the person, not only the platform." copy="Continue to family, fatherhood, and the values underneath the public work." to="/life" onNavigate={navigate} />
    </main>
  );
}

function LifePage({ navigate }) {
  return (
    <main>
      <PageHero eyebrow="Life & fatherhood" title="What we build is also what we leave behind." copy="Family, identity, responsibility, and the quieter reasons behind the public work." image="/assets/jasmine-fatherhood.jpg" imagePosition="center 48%" caption="Jasmine · Born June 6, 2026" />
      <section className="section-band page-intro">
        <p className="eyebrow">The newest chapter</p>
        <h2>Southern Smiles came first. Then fatherhood changed the scale of every question.</h2>
        <p>Jasmine arrived on June 6, 2026. Her story comes after the practice, but it changes the meaning of everything still to come: what is worth building, what deserves protection, and what kind of example lasts.</p>
      </section>
      <section className="identity-grid section-band">
        {identity.roles.map((role, index) => <article key={role}><span>{String(index + 1).padStart(2, "0")}</span><h2>{role}</h2></article>)}
      </section>
      <section className="photo-story photo-story--reverse">
        <img src="/assets/real/practice-team.jpg" alt="Dr. Shakally with a Southern Smiles team member" />
        <div><p className="eyebrow">A business made of people</p><h2>Ownership is responsibility in public.</h2><p>The practice is not only an enterprise. It is a promise to patients, a workplace for a team, and a daily test of whether values can survive contact with pressure.</p></div>
      </section>
      <section className="personal-quote section-band"><blockquote>“Fatherhood changed the scale of every question: what we build, what we protect, and what we leave behind.”</blockquote></section>
      <NextPath eyebrow="Return to the beginning" title="See the whole journey in sequence." copy="From Damascus and exile to Iowa, dentistry, Southern Smiles, and Jasmine." to="/journey" onNavigate={navigate} />
    </main>
  );
}

function NextPath({ eyebrow, title, copy, to, onNavigate }) {
  return (
    <section className="next-path">
      <div><p className="eyebrow eyebrow--light">{eyebrow}</p><h2>{title}</h2><p>{copy}</p></div>
      <Button variant="outline-light" onClick={() => onNavigate(to)}>Continue <ArrowRight /></Button>
    </section>
  );
}

function SiteFooter({ navigate }) {
  return (
    <footer>
      <div><button className="wordmark" onClick={() => navigate("/")}>DrShakally.com</button><p>Refugee. Father. Dentist.<br />Business owner. Entrepreneur.</p></div>
      <div>{routes.map((route) => <SiteLink key={route.path} to={route.path} onNavigate={navigate}>{route.label}</SiteLink>)}</div>
      <a href="mailto:info@drshakally.com"><Mail /> info@drshakally.com</a>
    </footer>
  );
}

export function App() {
  const [path, setPath] = useState(() => cleanPath(window.location.pathname));
  const [menuOpen, setMenuOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const onPopState = () => setPath(cleanPath(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    document.title = routeTitles[path];
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [path]);

  const navigate = (nextPath) => {
    const next = cleanPath(nextPath);
    if (next !== path) window.history.pushState({}, "", next);
    setPath(next);
    setMenuOpen(false);
  };

  const pageProps = { navigate, openContact: () => setDialogOpen(true) };
  const pages = {
    "/": <HomePage {...pageProps} />,
    "/journey": <JourneyPage {...pageProps} />,
    "/dentistry": <DentistryPage {...pageProps} />,
    "/ideas": <IdeasPage {...pageProps} />,
    "/speaking": <SpeakingPage {...pageProps} />,
    "/life": <LifePage {...pageProps} />,
  };

  return (
    <div className="site-shell">
      <header className="header">
        <button className="wordmark" onClick={() => navigate("/")}>DrShakally.com</button>
        <nav className={menuOpen ? "nav nav--open" : "nav"} aria-label="Primary navigation">
          {routes.map((route) => <SiteLink key={route.path} className={path === route.path ? "active" : ""} to={route.path} onNavigate={navigate}>{route.label}</SiteLink>)}
          <Button onClick={() => setDialogOpen(true)}>Contact</Button>
        </nav>
        <button className="icon-button menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
      </header>
      {path !== "/" && <div className="route-crumb"><button onClick={() => navigate("/")}><ArrowLeft /> Home</button><span>{routes.find((route) => route.path === path)?.label}</span></div>}
      {pages[path]}
      <SiteFooter navigate={navigate} />
      <ContactDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </div>
  );
}
