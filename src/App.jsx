import React, { useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  Compass,
  Database,
  Facebook,
  Gauge,
  Instagram,
  Menu,
  Network,
  ScanLine,
  Sparkles,
  Users,
  Workflow,
  X
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logoMark from "../Pasted image.png";
import {
  faqs,
  pricing,
  processSteps,
  resultCards,
  symptoms,
  testimonials,
  transformationCards
} from "./data";

const businessImage =
  "https://images.pexels.com/photos/3931504/pexels-photo-3931504.jpeg?auto=compress&cs=tinysrgb&w=1400";
const analyticsImage =
  "https://images.pexels.com/photos/7693686/pexels-photo-7693686.jpeg?auto=compress&cs=tinysrgb&w=1400";
const systemsImage =
  "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1400";
const transformationImage =
  "https://images.pexels.com/photos/3184436/pexels-photo-3184436.jpeg?auto=compress&cs=tinysrgb&w=1400";
const architectureImages = {
  Data: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1200",
  Processes: "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=1200",
  People: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "Performance Metrics": "https://images.pexels.com/photos/7567434/pexels-photo-7567434.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "Leadership Decisions": "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200"
};

gsap.registerPlugin(ScrollTrigger, useGSAP);

const navItems = [
  ["About", "#about"],
  ["Systems", "#systems"],
  ["Results", "#results"],
  ["Process", "#process"],
  ["Pricing", "#pricing"],
  ["Contact", "#contact"]
];

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="/" aria-label="FekiTech home">
          <img src={logoMark} alt="" />
          <span>
            FekiTech
            <small>Turn business chaos into profitability.</small>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map(([label, href]) => (
            <a key={label} href={`/${href}`}>
              {label}
            </a>
          ))}
        </nav>
        <a className="header-cta" href="/audit">
          Free Audit
        </a>
        <button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
        <div className={`mobile-panel ${open ? "open" : ""}`}>
          {navItems.map(([label, href]) => (
            <a key={label} href={`/${href}`} onClick={() => setOpen(false)}>
              {label}
              <ChevronRight size={16} />
            </a>
          ))}
          <a className="mobile-cta" href="/audit" onClick={() => setOpen(false)}>
            Book a Free Audit
          </a>
        </div>
      </div>
    </header>
  );
}

function Button({ children, href, variant = "primary" }) {
  return (
    <a className={`button ${variant}`} href={href}>
      {children}
      <ArrowRight size={17} />
    </a>
  );
}

function SectionIntro({ label, title, text, center = true }) {
  return (
    <div className={`section-intro ${center ? "center" : ""}`}>
      <span className="eyebrow">{label}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function HeroImage() {
  return (
    <div className="hero-image-wrap">
      <img
        src={businessImage}
        alt="Business team collaborating around a laptop in a modern office"
      />
      <div className="hero-image-overlay" />
      <div className="hero-metric-card top">
        <span>System clarity</span>
        <strong>86%</strong>
        <small>Leadership visibility improved</small>
      </div>
      <div className="hero-metric-card bottom">
        <span>Workflow load</span>
        <strong>-70%</strong>
        <small>Manual work reduced</small>
      </div>
      <div className="image-status">
        <span />
        Business systems audit active
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-orb blue" />
      <div className="hero-orb purple" />
      <div className="system-ring ring-a" />
      <div className="system-ring ring-b" />
      <div className="hero-inner">
        <div className="trust-badge">★★★★★ Trusted by growing businesses</div>
        <h1>The Business Operating System for Structured Growth</h1>
        <p>
          FekiTech transforms chaotic organisations into structured, profitable, and scalable systems through business
          intelligence architecture, operational design, and digital transformation.
        </p>
        <div className="hero-actions">
          <Button href="/audit">Get a Free Business Audit</Button>
          <Button href="#process" variant="secondary">
            See How It Works
          </Button>
        </div>
        <HeroImage />
        <div className="proof-strip">
          {["Business Intelligence", "Operating Design", "Digital Transformation"].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function VisibilityStory() {
  const visibilitySteps = [
    ["01", "See the truth", "Reveal where revenue, customers, work, and teams are getting stuck."],
    ["02", "Choose the next move", "Turn scattered reports into clear priorities for leadership."],
    ["03", "Control the system", "Use one operating rhythm to track progress and protect profitability."]
  ];

  return (
    <section className="section visibility-section">
      <div className="visibility-copy">
        <SectionIntro
          label="Visibility"
          title="One Clear View of What Is Really Happening"
          text="No complex dashboard wall. Just the right signals, the right priorities, and the confidence to act."
          center={false}
        />
        <div className="visibility-steps">
          {visibilitySteps.map(([count, title, text]) => (
            <article key={title}>
              <span>{count}</span>
              <div>
                <strong>{title}</strong>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="visibility-image">
        <img src={analyticsImage} alt="Business leaders reviewing analytics and operational priorities" />
        <div className="visibility-caption">
          <strong>From scattered activity to clear operating visibility.</strong>
          <span>Revenue, operations, customers, and team performance translated into leadership decisions.</span>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section split" id="about">
      <div className="section-intro left">
        <span className="eyebrow">About FekiTech</span>
        <h2>
          From Chaos to Structured <span className="gradient-performance">Performance</span>
        </h2>
        <p>
          FekiTech helps growing organisations redesign how the business actually runs: workflows, data, dashboards,
          ownership, automation, and leadership visibility.
        </p>
        <p>
          The result is a business that feels less reactive, easier to control, more profitable, and ready for scale.
        </p>
      </div>
      <div className="chaos-map">
        <div className="chaos-core">
          <span>FekiTech OS</span>
          <strong>structured growth core</strong>
        </div>
        {["Clarity", "Structure", "Accountability", "Visibility", "Control", "Profitability"].map((item, index) => (
          <b className={`map-node n${index + 1}`} key={item}>
            {item}
          </b>
        ))}
      </div>
    </section>
  );
}

function Systems() {
  const story = [
    ["Symptoms", "Revenue slips, customers churn, reviews weaken, and teams feel stretched."],
    ["Root Cause", "The real issue is usually fragmented systems, invisible work, and unclear ownership."],
    ["Redesign", "FekiTech rebuilds the operating rhythm so work, data, people, and decisions move together."]
  ];

  return (
    <section className="section systems-story" id="systems">
      <div className="systems-heading">
        <SectionIntro
          label="System Redesign"
          title="We Fix the System Behind the Problem"
          text="A cleaner story for leaders: what you see, what is really causing it, and what needs to be redesigned."
          center={false}
        />
        </div>
        <div className="systems-layout">
          <div className="systems-image">
          <img src={systemsImage} alt="Team planning a business system redesign together" />
        </div>
        <div className="story-stack">
          {story.map(([title, text], index) => (
            <article className="story-card" key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{title}</strong>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className="systems-options">
          {symptoms.slice(0, 7).map(([symptom, cause], index) => (
            <span key={symptom}>
              <em>{String(index + 1).padStart(2, "0")}</em>
              <b>{symptom}</b>
              <small>Root cause: {cause}</small>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Architecture() {
  const layers = [
    ["Data", "Clean inputs from sales, operations, customers, finance, and delivery.", Database],
    ["Processes", "Clear workflows that show where work starts, stalls, moves, and closes.", Workflow],
    ["People", "Ownership, handoffs, and accountability made visible across teams.", Users],
    ["Performance Metrics", "The few numbers that actually explain growth, retention, and waste.", Gauge],
    ["Leadership Decisions", "Leadership routines that turn signals into timely action.", Compass]
  ];

  return (
    <section className="section architecture">
      <SectionIntro
        label="Business Intelligence Architecture"
        title="Make the Business Visible, Measurable, and Controllable"
        text="Every decision improves when data, workflows, people, metrics, and leadership rhythms operate as one system."
      />
      <div className="architecture-stack">
        {layers.map(([item, text, Icon], index) => (
          <article className={`architecture-panel ${index % 2 ? "reverse" : ""}`} key={item}>
            <div className="architecture-media">
              <img src={architectureImages[item]} alt={`${item} business intelligence layer`} />
            </div>
            <div className="architecture-content">
              <div className="architecture-kicker">
                <Icon size={18} />
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3>{item}</h3>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Transformation() {
  return (
    <section className="section transformation-section">
      <div className="transformation-layout">
        <div className="transformation-copy">
          <SectionIntro
            label="Digital Transformation"
            title="Modernise the Way Work Moves"
            text="FekiTech makes operations cleaner, faster, and easier to manage without burying teams in unnecessary tools."
            center={false}
          />
          <div className="transformation-grid">
            {transformationCards.map((item, index) => (
              <article className="transformation-card" key={item}>
                <ScanLine size={20} />
                <strong>{item}</strong>
                <span>0{index + 1}</span>
              </article>
            ))}
          </div>
        </div>
        <div className="transformation-image">
          <img src={transformationImage} alt="Team collaborating on digital transformation strategy" />
          <div>
            <strong>Transformation that teams can actually use</strong>
            <span>Modern workflows, sharper accountability, and cleaner execution without overwhelming the business.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Results() {
  const numbers = [
    ["42", "%", "Average revenue increase in 90 days"],
    ["3.2", "x", "Faster operational turnaround"],
    ["94", "%", "Client retention rate"]
  ];

  return (
    <section className="section results" id="results">
      <SectionIntro
        label="Proven Results"
        title="Profitability Improves When the Operating System Improves"
        text="Better systems create better decisions, faster teams, stronger retention, and cleaner profitability."
      />
      <div className="numbers-row">
        {numbers.map(([value, suffix, label]) => (
          <article className="number-card" key={label}>
            <strong>
              <span className="count-up" data-value={value}>
                0
              </span>
              {suffix}
            </strong>
            <span>{label}</span>
          </article>
        ))}
      </div>
      <div className="result-grid">
        {resultCards.map((item) => (
          <span key={item}>
            <Check size={16} />
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="section" id="process">
      <SectionIntro
        label="Process"
        title="A Structured Path from Diagnosis to Scalable Growth"
        text="A clear transformation path from audit to implementation, without vague strategy decks or messy execution."
      />
      <div className="process-grid">
        {processSteps.map((item) => (
          <article className="process-card" key={item.step}>
            <span>{item.step}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const rowOne = testimonials.slice(0, 4);
  const rowTwo = testimonials.slice(4);

  return (
    <section className="section testimonials">
      <SectionIntro
        label="Reviews"
        title="Leaders Feel the Difference When the System Gets Clean"
        text="Clear systems change how teams work, communicate, decide, and grow."
      />
      {[rowOne, rowTwo].map((row, rowIndex) => (
        <div className={`marquee-row ${rowIndex === 1 ? "reverse" : ""}`} key={rowIndex}>
          <div className="marquee-track">
            {[...row, ...row].map((item, index) => (
              <article className="testimonial-card" key={`${item.name}-${index}`}>
                <p>"{item.quote}"</p>
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

function Pricing() {
  return (
    <section className="section pricing" id="pricing">
      <SectionIntro
        label="Plans"
        title="Choose the Level of Operating Clarity You Need"
        text="Start with diagnosis, build a stronger operating system, or partner with FekiTech for full transformation."
      />
      <div className="pricing-grid">
        {pricing.map((plan) => (
          <article className={`pricing-card ${plan.featured ? "featured" : ""}`} key={plan.name}>
            {plan.featured && <span className="popular">Most Popular</span>}
            <h3>{plan.name}</h3>
            <p>{plan.description}</p>
            <div className="price">
              <strong>{plan.price}</strong>
              <span>{plan.cadence}</span>
            </div>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>
                  <Check size={16} />
                  {feature}
                </li>
              ))}
            </ul>
            <a href="/audit">{plan.cta}</a>
          </article>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section className="section faq">
      <SectionIntro label="FAQ" title="Frequently Asked Questions" />
      <div className="faq-list">
        {faqs.map(([question, answer]) => (
          <details key={question}>
            <summary>
              {question}
              <ChevronDown size={18} />
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="final-cta" id="contact">
      <div className="cta-inner">
        <span className="eyebrow">Free Audit</span>
        <h2>Ready to See What Your Business System Is Hiding?</h2>
        <p>Get a full breakdown of your business systems, performance gaps, and growth opportunities.</p>
        <Button href="/audit">Book a Free Audit</Button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <a className="footer-logo" href="#top" aria-label="FekiTech home">
          <img src={logoMark} alt="" />
          <span>
            FekiTech
            <small>Turn business chaos into profitability.</small>
          </span>
        </a>
        <p>FekiTech helps businesses replace complexity with clarity, inefficiency with structure, and uncertainty with confidence.</p>
      </div>
      <div className="footer-column">
        <h3>Company</h3>
        <a href="/#about">About</a>
        <a href="/#systems">Systems</a>
        <a href="/#results">Results</a>
        <a href="/#pricing">Pricing</a>
      </div>
      <div className="footer-column">
        <h3>Services</h3>
        <a href="/#systems">Business Intelligence</a>
        <a href="/#systems">Digital Transformation</a>
        <a href="/#systems">Workflow Automation</a>
        <a href="/#systems">Revenue Systems</a>
      </div>
      <div className="footer-column">
        <h3>Contact</h3>
        <a href="https://www.facebook.com/profile.php?id=61590753470491">Facebook</a>
        <a href="https://www.instagram.com/fekitech/">Instagram</a>
        <a href="https://www.tiktok.com/@fekitech">TikTok</a>
      </div>
      <small>© 2026 FekiTech. All rights reserved.</small>
    </footer>
  );
}

function AuditPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setSubmitted(true);
    form.reset();
  }

  const auditFaqs = [
    ["Is the audit really free?", "Yes. The audit gives you a clear first look at the systems, gaps, and opportunities inside your business."],
    ["What happens after I submit the form?", "The FekiTech team reviews your request and follows up with the next step."],
    ["Who is this audit for?", "It is for growing businesses that want better structure, visibility, efficiency, and profitability."],
    ["Do I need to have existing dashboards or systems?", "No. FekiTech can review your current process even if it is manual, scattered, or still developing."],
    ["Can FekiTech help with implementation?", "Yes. After the audit, FekiTech can create a system design blueprint and support implementation and optimisation."]
  ];

  return (
    <>
      <Header />
      <main className="audit-page">
        <section className="audit-hero">
          <span className="eyebrow">Free Business Systems Audit</span>
          <h1>Book Your Free Business Systems Audit</h1>
          <p>
            Tell us what is happening inside your business. We will review your systems, identify performance gaps, and
            show you where structure can improve growth and profitability.
          </p>
        </section>
        <section className="audit-layout">
          <form className="audit-form" onSubmit={handleSubmit}>
            <label>Full Name<input required name="fullName" /></label>
            <label>Business Name<input required name="businessName" /></label>
            <label>Work Email<input required type="email" name="email" /></label>
            <label>Phone Number<input required type="tel" name="phone" /></label>
            <label>
              Company Size
              <select required name="size" defaultValue="">
                <option value="" disabled>Select company size</option>
                {["1-10", "11-50", "51-200", "201-500", "500+"].map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            <label>
              Main Challenge
              <select required name="challenge" defaultValue="">
                <option value="" disabled>Select main challenge</option>
                {["Falling revenue", "Customer churn", "Inefficient operations", "Poor visibility", "Staff burnout", "Slow growth", "Disconnected teams", "Other"].map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            <label className="full">Message<textarea required name="message" placeholder="Tell us what is currently slowing your business down." /></label>
            <button type="submit">Submit Audit Request</button>
            {submitted && <p className="success-message">Your audit request has been received. The FekiTech team will follow up with the next step.</p>}
          </form>
          <aside className="audit-side-card">
            <img src={logoMark} alt="" />
            <h2>Turn business chaos into profitability.</h2>
            <p>Use this audit to uncover gaps in visibility, workflow, accountability, and growth systems.</p>
            <div className="socials">
              <a href="https://www.facebook.com/profile.php?id=61590753470491" aria-label="Facebook"><Facebook size={18} /></a>
              <a href="https://www.instagram.com/fekitech/" aria-label="Instagram"><Instagram size={18} /></a>
              <a href="https://www.tiktok.com/@fekitech" aria-label="TikTok"><Sparkles size={18} /></a>
            </div>
          </aside>
        </section>
        <section className="section faq audit-faq">
          <SectionIntro label="Audit FAQ" title="Frequently Asked Questions" />
          <div className="faq-list">
            {auditFaqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}<ChevronDown size={18} /></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  const appRef = useRef(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion) {
        gsap.set(".reveal-item, .architecture-panel, .transformation-card, .story-card, .number-card", {
          opacity: 1,
          y: 0,
          scale: 1
        });
        return;
      }

      gsap.utils.toArray(".section-intro, .visibility-image, .systems-image, .transformation-image").forEach((item) => {
        gsap.from(item, {
          autoAlpha: 0,
          y: 34,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 82%",
            once: true
          }
        });
      });

      ScrollTrigger.batch(".architecture-panel, .transformation-card, .story-card, .process-card, .pricing-card", {
        start: "top 84%",
        once: true,
        onEnter: (batch) => {
          gsap.from(batch, {
            autoAlpha: 0,
            y: 28,
            scale: 0.98,
            duration: 0.65,
            stagger: 0.08,
            ease: "power3.out"
          });
        }
      });

      const nodeOffsets = [
        { x: 170, y: 190 },
        { x: -170, y: 120 },
        { x: -130, y: -140 },
        { x: 150, y: -80 },
        { x: 0, y: -170 },
        { x: -40, y: -185 }
      ];

      gsap.from(".map-node", {
        autoAlpha: 0,
        scale: 0.72,
        x: (index) => nodeOffsets[index]?.x || 0,
        y: (index) => nodeOffsets[index]?.y || 0,
        duration: 0.78,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".chaos-map",
          start: "top 74%",
          once: true
        }
      });

      gsap.utils.toArray(".count-up").forEach((counter) => {
        const endValue = Number(counter.dataset.value);
        const value = { current: 0 };

        gsap.to(value, {
          current: endValue,
          duration: 2.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: counter,
            start: "top 84%",
            once: true
          },
          onUpdate: () => {
            const hasDecimal = String(endValue).includes(".");
            counter.textContent = hasDecimal ? value.current.toFixed(1) : Math.round(value.current);
          }
        });
      });
    },
    { scope: appRef }
  );

  return (
    <div ref={appRef}>
      {window.location.pathname === "/audit" ? (
        <AuditPage />
      ) : (
        <>
          <Header />
          <main>
            <Hero />
            <VisibilityStory />
            <About />
            <Systems />
            <Architecture />
            <Transformation />
            <Results />
            <Process />
            <Testimonials />
            <Pricing />
            <FAQ />
            <CTA />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
