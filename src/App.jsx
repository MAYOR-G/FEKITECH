import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  Database,
  Facebook,
  Gauge,
  Instagram,
  Menu,
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
import { resultCards, testimonials } from "./data";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const businessImage = "https://images.pexels.com/photos/3931504/pexels-photo-3931504.jpeg?auto=compress&cs=tinysrgb&w=1400";
const analyticsImage = "https://images.pexels.com/photos/7693686/pexels-photo-7693686.jpeg?auto=compress&cs=tinysrgb&w=1400";
const systemsImage = "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1400";

const navItems = [
  ["Home", "/"],
  ["About", "/about"],
  ["Services", "/services"],
  ["Pricing", "/pricing"],
  ["Blog", "/blog"],
  ["Contact", "/contact"]
];

const seo = {
  "/": [
    "Fekitech | Business Transformation and Operating Systems for Scalable Growth",
    "Fekitech helps businesses build structure, improve profitability, implement digital transformation, and scale with the Fekitech Operating System."
  ],
  "/about": [
    "About Fekitech | Business Transformation Company",
    "Learn how Fekitech helps organisations become structured, data-driven, profitable, and scalable through the Fekitech Operating System."
  ],
  "/services": [
    "Fekitech Services | Business Structure, Digital Transformation and Business Intelligence",
    "Explore Fekitech services including business structure design, digital transformation, business intelligence, process optimisation, and FOS implementation."
  ],
  "/pricing": [
    "Fekitech Pricing | Structured Solutions for Scalable Business Growth",
    "View Fekitech pricing packages for business audits, digital transformation, FOS implementation, and enterprise transformation support."
  ],
  "/blog": [
    "Fekitech Blog | Business Systems, Profitability and Digital Transformation",
    "Insights on business structure, profitability, customer retention, digital transformation, and business operating systems."
  ],
  "/blog/why-most-businesses-are-not-profitable": [
    "Why Most Businesses Are Not Profitable And How to Fix It with Structured Systems",
    "Most businesses struggle with low profitability and poor customer retention due to weak systems and structure. Learn how to fix it using digital transformation and business operating systems."
  ],
  "/contact": [
    "Book a Free Business Audit | Fekitech",
    "Book a free business audit with Fekitech and discover how to improve profitability, structure, and business performance."
  ],
  "/audit": [
    "Book a Free Business Audit | Fekitech",
    "Book a free business audit with Fekitech and discover how to improve profitability, structure, and business performance."
  ]
};

function setMeta(pathname) {
  const [title, description] = seo[pathname] || seo["/"];
  document.title = title;
  let meta = document.querySelector('meta[name="description"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "description";
    document.head.appendChild(meta);
  }
  meta.content = description;
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="/" aria-label="Fekitech home">
          <img src={logoMark} alt="" />
          <span>
            Fekitech
            <small>Turn business chaos into profitability.</small>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map(([label, href]) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <a className="header-cta" href="/contact">
          Book a Free Audit
        </a>
        <button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
        <div className={`mobile-panel ${open ? "open" : ""}`}>
          {navItems.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setOpen(false)}>
              {label}
              <ChevronRight size={16} />
            </a>
          ))}
          <a className="mobile-cta" href="/contact" onClick={() => setOpen(false)}>
            Book a Free Business Audit
          </a>
        </div>
      </div>
    </header>
  );
}

function Button({ children, href = "/contact", variant = "primary" }) {
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

function PageHero({ label, title, text, children }) {
  return (
    <section className="page-hero">
      <span className="eyebrow">{label}</span>
      <h1>{title}</h1>
      <p>{text}</p>
      {children}
    </section>
  );
}

function Hero() {
  const videoRef = useRef(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    video.muted = true;
    video.defaultMuted = true;

    const playVideo = () => {
      video.play().catch(() => {
        // Autoplay can still be delayed by a browser until it has enough data.
      });
    };

    playVideo();
    video.addEventListener("loadeddata", playVideo);
    video.addEventListener("canplay", playVideo);

    return () => {
      video.removeEventListener("loadeddata", playVideo);
      video.removeEventListener("canplay", playVideo);
    };
  }, []);

  return (
    <section className="hero" id="top">
      <div className="hero-orb blue" />
      <div className="hero-orb purple" />
      <div className="system-ring ring-a" />
      <div className="system-ring ring-b" />
      <div className="hero-inner">
        <div className="trust-badge">Fekitech Operating System</div>
        <h1>Build a Profitable, Scalable Business with FOS</h1>
        <p>
          FOS helps businesses replace operational chaos with structure, automation, business intelligence, and clear
          systems for profitable growth.
        </p>
        <div className="hero-actions">
          <Button>Book a Free Business Audit</Button>
          <Button href="#fos" variant="secondary">See How FOS Works</Button>
        </div>
        <small className="hero-note">
          For founders, executives, and teams ready to improve structure, performance, and scale.
        </small>
        <div className="hero-video-stage" aria-label="Fekitech Operating System preview">
          <div className="hero-video-shell">
            {videoError ? <div className="video-fallback" aria-hidden="true">
              <div>
                <span>FOS preview unavailable</span>
                <strong>Business operating system</strong>
              </div>
              <i />
              <i />
              <i />
            </div> : (
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster={businessImage}
                onError={() => setVideoError(true)}
              >
                <source src="https://pub-9f4f9c9b1b3e477aba4991ccfd92f1ae.r2.dev/Untitled.mp4" type="video/mp4" />
              </video>
            )}
            <div className="video-status"><span />FOS preview</div>
            {["Profitability visibility", "Retention tracking", "Process clarity", "Performance dashboard"].map((item, index) => (
              <b className={`hero-float f${index + 1}`} key={item}>{item}</b>
            ))}
          </div>
        </div>
        <div className="proof-strip">
          {["Business Structure", "Digital Transformation", "Business Intelligence", "Process Automation", "Profitability Systems"].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutPreview() {
  return (
    <section className="section split about-preview">
      <div className="section-intro left">
        <span className="eyebrow">Structured Growth</span>
        <h2>From Operational Chaos to Structured, Profitable Growth</h2>
        <p>
          Fekitech helps businesses move from scattered processes and unclear decisions into a structured operating
          system built for clarity, performance, and scale.
        </p>
        <p>
          We connect people, processes, data, and technology so business leaders can see what is working, fix what is
          broken, and grow with confidence.
        </p>
        <Button href="/about" variant="secondary">Learn More About Fekitech</Button>
      </div>
      <div className="chaos-map">
        <div className="chaos-core">
          <span>FOS</span>
          <strong>people, process, data, technology</strong>
        </div>
        {["People", "Process", "Data", "Technology", "Customers", "Performance"].map((item, index) => (
          <b className={`map-node n${index + 1}`} key={item}>{item}</b>
        ))}
      </div>
    </section>
  );
}

function Challenges() {
  const items = [
    ["Loss of customers", "Weak customer retention, inconsistent follow-up, and poor customer experience reduce long-term growth.", Users],
    ["Unpredictable profitability", "Revenue may come in, but without visibility into costs, margins, and performance, profit remains unclear.", Gauge],
    ["Weak online conversion", "A weak digital presence and unclear customer journey make it harder to convert attention into revenue.", ScanLine],
    ["Manual operations", "Unstructured workflows, repeated manual tasks, and unclear responsibilities slow the business down.", Workflow],
    ["Limited visibility", "Leaders cannot improve what they cannot see. Without data, decisions become reactive instead of strategic.", Database]
  ];

  return (
    <section className="section challenges-section" id="challenges">
      <div className="challenges-copy">
        <SectionIntro
          label="Business Challenges We Solve"
          title="The Problems That Keep Good Businesses From Scaling"
          text="Most businesses do not fail because of effort. They struggle because structure, visibility, systems, and customer retention are weak."
          center={false}
        />
      </div>
      <div className="challenge-grid">
        {items.map(([title, text, Icon], index) => (
          <article className={index === 0 ? "challenge-card featured" : "challenge-card"} key={title}>
            <div><Icon size={19} /><span>{String(index + 1).padStart(2, "0")}</span></div>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Solution() {
  const pillars = [
    ["Organisational Structure", "Roles, responsibilities, workflows, and accountability across the business.", Users],
    ["Digital Transformation", "Tools and systems that reduce manual work and improve execution.", Workflow],
    ["Business Intelligence", "Reporting and visibility for stronger leadership decisions.", Database],
    ["Process Optimisation", "Cleaner workflows that remove waste and repeated friction.", ScanLine],
    ["Automation", "Repeatable systems that reduce delays and operational dependency.", Sparkles],
    ["Performance Improvement", "A rhythm for tracking, improving, and scaling what works.", Gauge]
  ];

  return (
    <section className="section solution-section" id="fos">
      <div className="solution-copy">
        <span className="eyebrow">Core Offer</span>
        <h2>Fekitech Operating System <span className="solid-accent">(FOS)</span></h2>
        <p>
          FOS is a structured implementation system that combines business structure, digital tools, automation,
          reporting, and performance improvement into one operating framework.
        </p>
        <p>
          It is not just software and it is not just consulting. It is a practical system for helping businesses operate
          with clarity, intelligence, and accountability.
        </p>
        <strong>Result: a structured, data-driven, profitable, and scalable business.</strong>
      </div>
      <div className="fos-architecture">
        <div className="fos-engine">
          <span>FOS</span>
          <strong>Operating System Engine</strong>
          <small>People, process, data, technology, and performance connected into one implementation system.</small>
        </div>
        <div className="fos-orbit orbit-one" />
        <div className="fos-orbit orbit-two" />
        {pillars.map(([title, text, Icon], index) => (
          <article className={`fos-node node-${index + 1}`} key={title}>
            <Icon size={18} />
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
        <div className="fos-dashboard-mini">
          <b>System health</b>
          <i style={{ "--w": "82%" }} />
          <i style={{ "--w": "68%" }} />
          <i style={{ "--w": "91%" }} />
        </div>
      </div>
    </section>
  );
}

function TransformProcess() {
  const steps = [
    ["Assess your business operations", "We review your current structure, workflows, customer journey, digital systems, and performance gaps."],
    ["Identify gaps in structure and systems", "We uncover what is slowing growth, reducing profit, weakening retention, or creating operational confusion."],
    ["Design the FOS framework for your business", "We map the structure, tools, workflows, data points, and implementation plan your business needs."],
    ["Implement digital and intelligence systems", "We help set up the systems, automations, reporting, and processes required to improve execution."],
    ["Optimise for performance and scale", "We track what is working, improve what is weak, and prepare the business for scalable growth."]
  ];

  return (
    <section className="section transform-section" id="process">
      <SectionIntro
        label="How We Transform Your Business"
        title="From Business Audit to Operating System"
        text="A structured transformation path that turns business problems into clear systems, measurable performance, and scalable operations."
      />
      <div className="transform-roadmap">
        {steps.map(([title, text], index) => (
          <article key={title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Outcomes() {
  const outcomes = [
    ["Higher profitability", "Understand what drives profit, where money is leaking, and what needs to improve before growth becomes expensive.", analyticsImage],
    ["Stronger customer retention", "Build systems that improve follow-up, consistency, customer experience, and loyalty across every touchpoint.", businessImage],
    ["Clear business structure", "Give your team clarity on roles, responsibilities, workflows, and accountability so execution is easier to manage.", systemsImage],
    ["Data-driven decisions", "Track performance clearly so leaders can make better decisions with confidence instead of reacting late.", "https://images.pexels.com/photos/7567434/pexels-photo-7567434.jpeg?auto=compress&cs=tinysrgb&w=1200"],
    ["Scalable operations", "Replace scattered manual work with structured systems that can support growth without creating new chaos.", "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200"]
  ];

  return (
    <section className="section outcomes-section" id="results">
      <SectionIntro
        label="What You Achieve"
        title="A Business That Is Easier to Run, Improve, and Scale"
        text="FOS helps you build a business that is easier to manage, measure, improve, and grow."
      />
      <div className="outcome-stack">
        {outcomes.map(([title, text, image], index) => (
          <article className={`outcome-card ${index % 2 ? "reverse" : ""}`} style={{ "--i": index }} key={title}>
            <div className="outcome-media">
              <img src={image} alt={`${title} visual`} />
            </div>
            <div className="outcome-content">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <div><Check size={17} /> FOS outcome layer</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function BusinessImpact() {
  const numbers = [
    ["42", "%", "Profitability clarity lift"],
    ["3.2", "x", "Faster operating decisions"],
    ["94", "%", "Retention-focused system health"]
  ];

  return (
    <section className="section results" id="results">
      <SectionIntro
        label="Metrics"
        title="Built to Improve the Numbers That Matter"
        text="FOS focuses on the areas that directly affect business performance: profitability, retention, visibility, operations, and scale."
      />
      <div className="numbers-row">
        {numbers.map(([value, suffix, label]) => (
          <article className="number-card" key={label}>
            <strong><span className="count-up" data-value={value}>0</span>{suffix}</strong>
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
      <p className="metric-note">Performance outcomes depend on the current state of the business, implementation scope, and available data.</p>
    </section>
  );
}

function Testimonials() {
  const rowOne = testimonials.slice(0, 4);
  const rowTwo = testimonials.slice(4);

  return (
    <section className="section testimonials" id="reviews">
      <SectionIntro
        label="Reviews"
        title="Leaders Feel the Difference When the System Gets Clean"
        text="When structure improves, teams move faster, leaders see clearer, and growth becomes easier to manage."
      />
      {[rowOne, rowTwo].map((row, rowIndex) => (
        <div className={`marquee-row ${rowIndex === 1 ? "reverse" : ""}`} key={rowIndex}>
          <div className="marquee-track">
            {[...row, ...row].map((item, index) => (
              <article className="testimonial-card" key={`${item.name}-${index}`}>
                <p>"{item.quote}"</p>
                <div><strong>{item.name}</strong><span>{item.role}</span></div>
              </article>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

function CTA() {
  return (
    <section className="final-cta" id="contact">
      <div className="cta-inner">
        <span className="eyebrow">Book a Free Business Audit</span>
        <h2>Discover How to Improve Profitability, Structure, and Performance</h2>
        <p>
          Book a free business audit and see what is holding your business back, what needs to be fixed, and how FOS can
          help you build a clearer operating system.
        </p>
        <Button>Book a Free Business Audit</Button>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <main>
      <Hero />
      <Challenges />
      <AboutPreview />
      <Solution />
      <TransformProcess />
      <Outcomes />
      <BusinessImpact />
      <Testimonials />
      <CTA />
    </main>
  );
}

function AboutPage() {
  const areas = [
    ["Business Structure", "Clear roles, responsibilities, decision rights, and leadership rhythm so work has ownership instead of confusion."],
    ["Human Capital", "Team clarity, accountability, capacity planning, and operating habits that help people perform without constant supervision."],
    ["Operations", "Cleaner workflows, handoffs, delivery standards, and process discipline across the parts of the business that create value."],
    ["Digital Transformation", "Practical systems and tools that reduce manual work, improve speed, and make execution easier to manage."],
    ["Business Intelligence", "Dashboards, performance signals, and reporting structures that help leaders see what is actually happening."],
    ["Profitability", "Better visibility into revenue, margins, waste, and operational leakage so the business can grow without losing control."],
    ["Customer Retention", "Customer experience, follow-up, delivery consistency, and feedback loops that protect loyalty and long-term revenue."]
  ];

  return (
    <main className="page-main">
      <PageHero
        label="About Fekitech"
        title="We help businesses become structured, measurable, and ready to scale."
        text="Fekitech redesigns the operating core of growing businesses by connecting structure, people, process, data, technology, and performance through the Fekitech Operating System."
      >
        <Button>Book a Free Business Audit</Button>
      </PageHero>
      <section className="section split about-deep-section">
        <div className="section-intro left about-copy-panel">
          <span className="eyebrow">What We Do</span>
          <h2>We strengthen the parts of the business that determine performance.</h2>
          <p>
            Many businesses have ambition, activity, and talent, but growth still feels heavy because the operating
            system underneath the business is unclear. Work depends on memory, reporting arrives late, customers are
            managed inconsistently, and leaders spend too much time reacting.
          </p>
          <p>
            FOS gives the business a clearer structure: who owns what, how work moves, what data matters, where profit is
            leaking, and which systems should support the team. The result is a business that is easier to run, improve,
            and scale.
          </p>
          <div className="page-proof-row">
            <span><Check size={16} /> Operating clarity</span>
            <span><Check size={16} /> Performance visibility</span>
            <span><Check size={16} /> Profitable scale</span>
          </div>
        </div>
        <div className="page-image about-image-card">
          <img src={systemsImage} alt="Team designing a business operating system" />
          <div>
            <strong>FOS connects the business core</strong>
            <span>People, process, data, technology, customers, and profitability working as one system.</span>
          </div>
        </div>
      </section>
      <section className="section">
        <SectionIntro label="Seven Critical Areas" title="The areas we strengthen" text="A business becomes easier to scale when these areas work together instead of competing for attention." />
        <div className="simple-card-grid seven-grid">
          {areas.map(([area, text], index) => (
            <article key={area}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{area}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section mission-panel premium-mission">
        <div>
          <span className="eyebrow">Mission</span>
          <h2>To help ambitious businesses grow with structure instead of chaos.</h2>
          <p>
            Growth without structure becomes expensive. Our mission is to make the business visible, measurable, and
            controllable so leaders can improve performance with confidence.
          </p>
        </div>
        <Button>Book a Free Business Audit</Button>
      </section>
      <CTA />
    </main>
  );
}

function ServicesPage() {
  const services = [
    ["Business Structure Design", "We define roles, responsibilities, workflows, ownership, and decision rhythms so the business can operate with clarity.", "Outcome: fewer bottlenecks, clearer accountability, and leadership control."],
    ["Digital Transformation", "We implement practical digital systems that reduce manual work, improve execution speed, and support better management.", "Outcome: cleaner operations, faster handoffs, and less dependence on scattered tools."],
    ["Business Intelligence Architecture", "We design reporting systems, dashboards, and performance signals around the numbers leaders actually need.", "Outcome: decisions become visible, measurable, and easier to prioritise."],
    ["Process Optimisation and Automation", "We map, simplify, and automate repeated workflows so teams spend less time on friction and more time on value.", "Outcome: reduced waste, better delivery consistency, and improved productivity."],
    ["Customer Retention Systems", "We improve follow-up, communication, customer experience, and feedback loops so customers stay longer.", "Outcome: stronger retention, better reviews, and more reliable lifetime value."],
    ["Profitability Improvement", "We identify operational gaps, revenue leakage, cost waste, and margin pressure across the business.", "Outcome: clearer profit drivers and more disciplined growth decisions."]
  ];

  const gains = [
    ["Diagnose", "Understand what is weakening structure, performance, profitability, and customer retention."],
    ["Design", "Create the operating framework, workflows, dashboards, and implementation plan."],
    ["Implement", "Put the systems, automation, reporting, and accountability rhythm into the business."],
    ["Improve", "Review performance, optimise what is weak, and keep the system ready for scale."]
  ];

  return (
    <main className="page-main">
      <PageHero
        label="Services"
        title="Business transformation services for structure, intelligence, and profitable scale."
        text="Choose focused support for a specific business constraint, or build the complete Fekitech Operating System around your operations."
      />
      <section className="section">
        <div className="simple-card-grid service-grid">
          {services.map(([title, text, value], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <strong>{value}</strong>
            </article>
          ))}
        </div>
      </section>
      <section className="section service-method">
        <div className="section-intro left">
          <span className="eyebrow">How We Work</span>
          <h2>We do not just advise. We turn diagnosis into operating systems.</h2>
          <p>
            Every service is designed to move from clarity to implementation. The goal is not another strategy document;
            it is a business that runs with stronger structure, cleaner systems, and measurable performance.
          </p>
        </div>
        <div className="method-steps">
          {gains.map(([title, text], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <CTA />
    </main>
  );
}

function PricingPage() {
  const plans = [
    ["Starter Package", "From £500 - £1,500", "Business audit + structure review", "For businesses that need a clear diagnosis before investing in transformation.", ["Operational audit", "Structure and workflow review", "Priority improvement roadmap"], "Book Starter Audit"],
    ["Growth Package", "From £2,000 - £5,000", "Systems + digital transformation setup", "For growing teams ready to improve operations, customer flow, and internal systems.", ["Workflow redesign", "Digital systems setup", "Customer and performance improvements"], "Start Growth Plan"],
    ["FOS Implementation", "From £5,000 - £25,000+", "Full business operating system build", "For businesses that need structure, automation, intelligence, and implementation as one system.", ["Complete FOS blueprint", "Automation and dashboard build", "Implementation and optimisation support"], "Build My FOS", true],
    ["Enterprise", "Custom Pricing", "Full transformation + ongoing support", "For larger organisations that need custom systems, multi-team rollout, and long-term support.", ["Custom transformation plan", "Leadership reporting architecture", "Ongoing optimisation partnership"], "Contact Sales"]
  ];

  return (
    <main className="page-main">
      <PageHero
        label="Pricing"
        title="Choose the level of operating clarity your business needs."
        text="Start with diagnosis, build stronger systems, or implement the full Fekitech Operating System across your business."
      />
      <section className="section pricing-page-section">
        <div className="pricing-grid page-pricing">
          {plans.map(([name, price, summary, description, features, cta, featured]) => (
            <article className={`pricing-card ${featured ? "featured" : ""}`} key={name}>
              {featured && <span className="popular">Main Offer</span>}
              <span className="pricing-kicker">{summary}</span>
              <h3>{name}</h3>
              <div className="price"><strong>{price}</strong></div>
              <p>{description}</p>
              <ul>
                {features.map((feature) => <li key={feature}><Check size={15} />{feature}</li>)}
              </ul>
              <a href="/contact">{cta}</a>
            </article>
          ))}
        </div>
        <p className="pricing-note">Every package starts with understanding the business clearly, then building the right level of structure, visibility, and implementation support.</p>
      </section>
    </main>
  );
}

function BlogPage() {
  const articles = [
    ["Profitability Systems", "Why Most Businesses Are Not Profitable And How to Fix It with Structured Systems", "Most businesses struggle with low profitability and poor customer retention because the operating system underneath the business is weak.", "/blog/why-most-businesses-are-not-profitable"],
    ["Business Structure", "How Clear Roles and Workflows Reduce Operational Chaos", "A stronger structure helps teams know what they own, where work moves next, and how leaders should measure progress.", "/blog/why-most-businesses-are-not-profitable"],
    ["Digital Transformation", "Why Digital Tools Fail Without an Operating System", "Technology only creates value when it is connected to process, ownership, reporting, and business priorities.", "/blog/why-most-businesses-are-not-profitable"]
  ];

  return (
    <main className="page-main">
      <PageHero
        label="Blog"
        title="Ideas for building a more structured, profitable business."
        text="Practical thinking for leaders who want stronger systems, better retention, cleaner operations, and more confident decisions."
      />
      <section className="section blog-featured-section">
        <div className="blog-featured-copy">
          <span className="eyebrow">Featured Article</span>
          <h2>Profitability is usually a systems problem before it is a sales problem.</h2>
          <p>
            When a business lacks structure, visibility, and customer retention systems, more revenue can still create
            more chaos. The first featured guide explains how to fix that foundation.
          </p>
        </div>
        <a className="blog-card featured-blog-card" href="/blog/why-most-businesses-are-not-profitable">
          <span>Profitability Systems</span>
          <h2>Why Most Businesses Are Not Profitable And How to Fix It with Structured Systems</h2>
          <p>Learn how weak systems, unclear ownership, poor visibility, and inconsistent customer experience quietly reduce profitability.</p>
          <strong>Read featured article <ArrowRight size={17} /></strong>
        </a>
      </section>
      <section className="section blog-list-section">
        <SectionIntro label="Latest Thinking" title="Business systems, profitability, and transformation insights." text="Short, practical articles for founders and leaders who want the business to run with more clarity." />
        <div className="blog-list-grid">
          {articles.map(([label, title, text, href], index) => (
            <a className="blog-list-card" href={href} key={title}>
              <span>{label}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <strong>Read insight <ArrowRight size={16} /></strong>
              <i>{String(index + 1).padStart(2, "0")}</i>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}

function BlogArticlePage() {
  const sections = [
    ["The Real Reason Businesses Are Not Profitable", "Profitability rarely disappears because people are lazy. It usually leaks through unclear ownership, weak workflows, poor visibility, and decisions made without reliable data.", ["No clear organisational structure", "Poor workflow and operations management", "Lack of financial and performance visibility", "Weak customer retention systems", "Decisions made without data"]],
    ["Why Customers Keep Leaving", "Retention becomes difficult when customer experience depends on individual memory instead of a repeatable system.", ["No structured customer experience system", "Inconsistent communication", "Service delivery is not standardised", "No data tracking customer behaviour"]],
    ["The Role of Digital Transformation", "Modern businesses need digital systems, but tools only work when they are connected to the operating rhythm of the company.", ["Automate processes", "Improve communication", "Track performance in real time", "Improve customer engagement", "Reduce operational inefficiencies"]],
    ["What Is a Business Operating System?", "A Business Operating System is the structure that connects how the business is organised, how work moves, how performance is tracked, and how decisions are made.", ["Organisational structure", "Operations and workflows", "Digital systems", "Business intelligence and reporting"]],
    ["Introducing the Fekitech Operating System", "FOS turns unstructured businesses into clearer, more accountable, and more data-driven organisations.", ["Build clear structure and accountability", "Improve operational efficiency", "Implement digital transformation systems", "Gain real-time business intelligence", "Increase profitability and scalability"]]
  ];

  return (
    <main className="page-main">
      <article className="article-page">
        <header className="article-header">
          <span className="eyebrow">Business Systems</span>
          <h1>Why Most Businesses Are Not Profitable And How to Fix It with Structured Systems</h1>
          <p className="article-lead">
            Many business owners work hard every day, yet their businesses are still not profitable. The problem is not
            effort. The problem is lack of structure, systems, and visibility.
          </p>
          <div className="article-meta">
            <span>Fekitech Insight</span>
            <span>8 min read</span>
            <span>Profitability Systems</span>
          </div>
        </header>
        <p>In today’s business environment, companies that do not operate with clear systems and digital intelligence struggle to survive, let alone grow.</p>
        {sections.map(([title, intro, bullets], index) => (
          <section key={title}>
            <h2>{index + 1}. {title}</h2>
            <p>{intro}</p>
            <ul>{bullets.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
        ))}
        <blockquote>Structure creates profit. Effort without systems creates burnout.</blockquote>
        <section>
          <h2>7. Final Thought</h2>
          <p>If your business is not profitable or is losing customers, the issue is rarely effort. Once systems, structure, and visibility are fixed, growth becomes predictable, scalable, and sustainable.</p>
        </section>
        <div className="article-cta">
          <h2>Book a Free Business Audit</h2>
          <p>Understand what is broken in your business and how to fix it with structure, profitability, and intelligent systems for growth.</p>
          <Button>Book a Free Business Audit</Button>
        </div>
      </article>
    </main>
  );
}

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const faqs = [
    ["What does Fekitech do?", "Fekitech helps businesses build structure, improve operations, implement digital systems, and use business intelligence to increase profitability and scalability."],
    ["What is FOS?", "FOS stands for Fekitech Operating System. It connects people, processes, data, and technology to improve business performance."],
    ["Who is Fekitech for?", "Fekitech is for business owners, founders, executives, and organisations that want stronger systems, improved profitability, and scalable operations."],
    ["Do I need a large business to work with Fekitech?", "No. Fekitech works with growing businesses, established companies, and larger organisations depending on the level of support needed."],
    ["What happens during the free business audit?", "Fekitech reviews your current structure, operations, digital systems, and performance gaps, then identifies where improvements can be made."],
    ["How do I get started?", "You can get started by booking a free business audit through this page."]
  ];

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

  return (
    <main className="audit-page">
      <section className="audit-hero">
        <span className="eyebrow">Book a Free Business Audit</span>
        <h1>Book a Free Business Audit</h1>
        <p>Discover how to improve profitability, structure, and performance in your business.</p>
      </section>
      <section className="audit-layout">
        <form className="audit-form" onSubmit={handleSubmit}>
          <label>Full name<input required name="fullName" /></label>
          <label>Email address<input required type="email" name="email" /></label>
          <label>Company name<input required name="company" /></label>
          <label>Website or social link<input required name="website" /></label>
          <label>
            Business size
            <select required name="size" defaultValue="">
              <option value="" disabled>Select business size</option>
              {["1-10", "11-50", "51-200", "201-500", "500+"].map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label>
            Main challenge
            <select required name="challenge" defaultValue="">
              <option value="" disabled>Select main challenge</option>
              {["Low profitability", "Customer retention", "Manual operations", "Poor visibility", "Weak online conversion", "Disconnected teams", "Other"].map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label className="full">Message<textarea required name="message" placeholder="Tell us what is currently slowing your business down." /></label>
          <button type="submit">Submit Audit Request</button>
          {submitted && <p className="success-message">Your audit request has been received. The Fekitech team will follow up with the next step.</p>}
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
        <SectionIntro label="FAQ" title="Frequently Asked Questions" />
        <div className="faq-list">
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}<ChevronDown size={18} /></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <a className="footer-logo" href="/" aria-label="Fekitech home">
          <img src={logoMark} alt="" />
          <span>Fekitech<small>Turn business chaos into profitability.</small></span>
        </a>
        <p>Fekitech helps businesses become structured, data-driven, profitable, and scalable through FOS.</p>
      </div>
      <div className="footer-column">
        <h3>Quick Links</h3>
        {navItems.map(([label, href]) => <a href={href} key={label}>{label}</a>)}
      </div>
      <div className="footer-column">
        <h3>Services</h3>
        <a href="/services">Business Structure Design</a>
        <a href="/services">Digital Transformation</a>
        <a href="/services">Business Intelligence</a>
        <a href="/services">Process Optimisation</a>
        <a href="/services">FOS Implementation</a>
      </div>
      <div className="footer-column">
        <h3>CTA</h3>
        <a href="/contact">Book a Free Business Audit</a>
        <a href="https://www.facebook.com/profile.php?id=61590753470491">Facebook</a>
        <a href="https://www.instagram.com/fekitech/">Instagram</a>
        <a href="https://www.tiktok.com/@fekitech">TikTok</a>
      </div>
      <small>© 2025 Fekitech. All rights reserved.</small>
    </footer>
  );
}

function AppPage({ pathname }) {
  switch (pathname) {
    case "/about":
      return <AboutPage />;
    case "/services":
      return <ServicesPage />;
    case "/pricing":
      return <PricingPage />;
    case "/blog":
      return <BlogPage />;
    case "/blog/why-most-businesses-are-not-profitable":
      return <BlogArticlePage />;
    case "/contact":
    case "/audit":
      return <ContactPage />;
    default:
      return <HomePage />;
  }
}

export default function App() {
  const appRef = useRef(null);
  const pathname = useMemo(() => window.location.pathname.replace(/\/$/, "") || "/", []);

  useEffect(() => {
    setMeta(pathname);
  }, [pathname]);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) {
        gsap.set(".section-intro, .challenge-card, .fos-node, .transform-roadmap article, .outcome-card, .number-card, .simple-card-grid article, .method-steps article, .blog-list-card, .blog-card, .pricing-card", {
          opacity: 1,
          y: 0,
          scale: 1
        });
        return;
      }

      gsap.utils.toArray(".section-intro, .outcomes-image, .page-image, .mission-panel").forEach((item) => {
        gsap.from(item, {
          autoAlpha: 0,
          y: 34,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 82%", once: true }
        });
      });

      ScrollTrigger.batch(".challenge-card, .fos-node, .transform-roadmap article, .outcome-card, .number-card, .simple-card-grid article, .method-steps article, .blog-list-card, .blog-card, .pricing-card", {
        start: "top 84%",
        once: true,
        onEnter: (batch) => {
          gsap.from(batch, { autoAlpha: 0, y: 28, scale: 0.98, duration: 0.65, stagger: 0.08, ease: "power3.out" });
        }
      });

      gsap.utils.toArray(".count-up").forEach((counter) => {
        const endValue = Number(counter.dataset.value);
        const value = { current: 0 };
        gsap.to(value, {
          current: endValue,
          duration: 2.4,
          ease: "power2.out",
          scrollTrigger: { trigger: counter, start: "top 84%", once: true },
          onUpdate: () => {
            const hasDecimal = String(endValue).includes(".");
            counter.textContent = hasDecimal ? value.current.toFixed(1) : Math.round(value.current);
          }
        });
      });
    },
    { scope: appRef, dependencies: [pathname], revertOnUpdate: true }
  );

  return (
    <div ref={appRef}>
      <Header />
      <AppPage pathname={pathname} />
      <Footer />
    </div>
  );
}
