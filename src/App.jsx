import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  Facebook,
  Handshake,
  Instagram,
  Menu,
  Network,
  Search,
  Settings2,
  TrendingUp,
  X
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resultCards, testimonials } from "./data";
import { blogPosts, getBlogPost, getRelatedBlogPosts } from "./blogPosts.js";
import FekitechChatbot from "./components/FekitechChatbot.jsx";
import ServicePage from "./components/ServicePage.jsx";
import { getServicePage, servicePages } from "./serviceData.js";
import { applySeo } from "./lib/seo.js";
import { siteConfig } from "./lib/site.js";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const logoMark = "/fekitech-logo-transparent-cropped.png";
const heroVideo = "https://pub-9f4f9c9b1b3e477aba4991ccfd92f1ae.r2.dev/fekitech%20new%20vid.mp4";
const analyticsImage = "/outcome-higher-profitability.webp";
const systemsImage = "/outcome-reduce-stress.webp";
const aboutTransformationImage = "/fekitech-about-transformation.webp";
const transformationStrategyImage = "/fekitech-transformation-systems-ai.png";
const retentionImage = "/outcome-customer-growth.webp";
const scaleImage = "/outcome-business-success.webp";
const billingImage = "/outcome-get-paid-faster.webp";
const timeImage = "/outcome-save-time.webp";
const testimonialAvatars = {
  Ronald: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=240",
  "Cody Fisher": "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=240",
  Shawn: "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=240",
  Gladys: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=240",
  "Luna Mars": "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=240",
  "Leslie Alexander": "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=240",
  Joelle: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=240",
  Courtney: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=240"
};

const turnstileScriptSrc = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
let turnstileScriptPromise;

function loadTurnstileScript() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Turnstile is only available in the browser."));
  }

  if (window.turnstile) {
    return Promise.resolve(window.turnstile);
  }

  if (!turnstileScriptPromise) {
    turnstileScriptPromise = new Promise((resolve, reject) => {
      const existingScript = document.querySelector(`script[src="${turnstileScriptSrc}"]`);
      if (existingScript) {
        existingScript.addEventListener("load", () => resolve(window.turnstile), { once: true });
        existingScript.addEventListener("error", reject, { once: true });
        return;
      }

      const script = document.createElement("script");
      script.src = turnstileScriptSrc;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve(window.turnstile);
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  return turnstileScriptPromise;
}

function TikTokIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 352.28 398.67" aria-hidden="true" focusable="false">
      <path fill="#25f4ee" d="M137.17 156.98v-15.56c-5.34-.73-10.76-1.18-16.29-1.18C54.23 140.24 0 194.47 0 261.13c0 40.9 20.43 77.09 51.61 98.97-20.12-21.6-32.46-50.53-32.46-82.31 0-65.7 52.69-119.28 118.03-120.81Z" />
      <path fill="#25f4ee" d="M140.02 333c29.74 0 54-23.66 55.1-53.13l.11-263.2h48.08c-1-5.41-1.55-10.97-1.55-16.67h-65.67l-.11 263.2c-1.1 29.47-25.36 53.13-55.1 53.13-9.24 0-17.95-2.31-25.61-6.34C105.3 323.9 121.6 333 140.02 333ZM333.13 106V91.37c-18.34 0-35.43-5.45-49.76-14.8 12.76 14.65 30.09 25.22 49.76 29.43Z" />
      <path fill="#fe2c55" d="M283.38 76.57c-13.98-16.05-22.47-37-22.47-59.91h-17.59c4.63 25.02 19.48 46.49 40.06 59.91ZM120.88 205.92c-30.44 0-55.21 24.77-55.21 55.21 0 21.2 12.03 39.62 29.6 48.86-6.55-9.08-10.45-20.18-10.45-32.2 0-30.44 24.77-55.21 55.21-55.21 5.68 0 11.13.94 16.29 2.55v-67.05c-5.34-.73-10.76-1.18-16.29-1.18-.96 0-1.9.05-2.85.07v51.49c-5.16-1.61-10.61-2.55-16.29-2.55Z" />
      <path fill="#fe2c55" d="M333.13 106v51.04c-34.05 0-65.61-10.89-91.37-29.38v133.47c0 66.66-54.23 120.88-120.88 120.88-25.76 0-49.64-8.12-69.28-21.91 22.08 23.71 53.54 38.57 88.42 38.57 66.66 0 120.88-54.23 120.88-120.88V144.33c25.76 18.49 57.32 29.38 91.37 29.38v-65.68c-6.57 0-12.97-.71-19.14-2.03Z" />
      <path fill="currentColor" d="M241.76 261.13V127.66c25.76 18.49 57.32 29.38 91.37 29.38V106c-19.67-4.21-37-14.77-49.76-29.43-20.58-13.42-35.43-34.88-40.06-59.91h-48.08l-.11 263.2c-1.1 29.47-25.36 53.13-55.1 53.13-18.42 0-34.72-9.1-44.75-23.01-17.57-9.25-29.6-27.67-29.6-48.86 0-30.44 24.77-55.21 55.21-55.21 5.68 0 11.13.94 16.29 2.55v-51.49C71.83 158.5 19.14 212.08 19.14 277.78c0 31.78 12.34 60.71 32.46 82.31C71.23 373.87 95.12 382 120.88 382c66.65 0 120.88-54.23 120.88-120.88Z" />
    </svg>
  );
}

const navItems = [
  ["Home", "/"],
  ["About", "/about"],
  ["Services", "/services"],
  ["Pricing", "/pricing"],
  ["Blog", "/blog"],
  ["Contact", "/contact"]
];

const socialLinks = [
  {
    label: "Facebook",
    href: siteConfig.sameAs.find((url) => url.includes("facebook.com")),
    Icon: Facebook,
    ariaLabel: "Fekitech on Facebook"
  },
  {
    label: "Instagram",
    href: siteConfig.sameAs.find((url) => url.includes("instagram.com")),
    Icon: Instagram,
    ariaLabel: "Fekitech on Instagram"
  },
  {
    label: "TikTok",
    href: siteConfig.sameAs.find((url) => url.includes("tiktok.com")),
    Icon: TikTokIcon,
    ariaLabel: "Fekitech on TikTok"
  }
].filter((link) => Boolean(link.href));

function setMeta(pathname) {
  applySeo(pathname);
}

function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);
  const servicesTriggerRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    const updateScrolled = () => {
      ticking = false;
      setScrolled(window.scrollY > 24);
    };
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateScrolled);
    };

    updateScrolled();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const closeMenus = (event) => {
      if (!headerRef.current?.contains(event.target)) {
        setOpen(false);
        setServicesOpen(false);
      }
    };
    const closeOnEscape = (event) => {
      if (event.key !== "Escape") return;
      const hadServicesOpen = servicesOpen;
      setOpen(false);
      setServicesOpen(false);
      if (hadServicesOpen) servicesTriggerRef.current?.focus();
    };

    document.addEventListener("pointerdown", closeMenus);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeMenus);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [servicesOpen]);

  const closeNavigation = () => {
    setOpen(false);
    setServicesOpen(false);
  };

  return (
    <header ref={headerRef} className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="header-inner">
        <a className="brand" href="/" aria-label="Fekitech home">
          <img src={logoMark} alt="Fekitech logo" width="616" height="646" fetchPriority="high" decoding="async" />
          <span>
            Fekitech
            <small>Business systems for profitable growth</small>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map(([label, href]) => {
            if (label === "Services") {
              return (
                <div className={`nav-item-dropdown ${servicesOpen ? "is-open" : ""}`} key={label}>
                  <button
                    ref={servicesTriggerRef}
                    type="button"
                    className="nav-dropdown-trigger"
                    aria-expanded={servicesOpen}
                    aria-controls="desktop-services-menu"
                    onClick={() => setServicesOpen((current) => !current)}
                  >
                    {label} <ChevronDown size={14} className="dropdown-icon" aria-hidden="true" />
                  </button>
                  <div id="desktop-services-menu" className="nav-dropdown-content" aria-hidden={!servicesOpen}>
                    <div className="nav-dropdown-list">
                      {servicePages.map((service) => (
                        <a key={service.slug} href={`/services/${service.slug}`} className="nav-dropdown-link" onClick={closeNavigation}>
                          <span>{service.title}</span><ChevronRight size={15} aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <a key={label} href={href}>
                {label}
              </a>
            );
          })}
        </nav>
        <a className="header-cta" href="/contact">
          Book a Free Call
        </a>
        <button
          className="menu-button"
          type="button"
          onClick={() => { setOpen(!open); setServicesOpen(false); }}
          aria-label="Toggle navigation"
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
        <div id="mobile-navigation" className={`mobile-panel ${open ? "open" : ""}`} aria-hidden={!open}>
          {navItems.map(([label, href]) => label === "Services" ? (
            <div className={`mobile-services ${servicesOpen ? "is-open" : ""}`} key={label}>
              <button
                type="button"
                className="mobile-services-trigger"
                aria-expanded={servicesOpen}
                aria-controls="mobile-services-list"
                onClick={() => setServicesOpen((current) => !current)}
              >
                <span>{label}</span><ChevronDown size={17} aria-hidden="true" />
              </button>
              <div id="mobile-services-list" className="mobile-services-list">
                <div>
                  <a href={href} onClick={closeNavigation}><span>View all services</span><ChevronRight size={15} aria-hidden="true" /></a>
                  {servicePages.map((service) => (
                    <a href={`/services/${service.slug}`} key={service.slug} onClick={closeNavigation}>
                      <span>{service.title}</span><ChevronRight size={15} aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <a key={label} href={href} onClick={closeNavigation}>
              {label}<ChevronRight size={16} aria-hidden="true" />
            </a>
          ))}
          <a className="mobile-cta" href="/contact" onClick={closeNavigation}>
            Book a Free Call
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
      {label && <span className="eyebrow">{label}</span>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}


function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-background" aria-hidden="true">
        <video autoPlay muted loop playsInline preload="metadata" poster={scaleImage}>
          <source src={heroVideo} type="video/mp4" />
        </video>
      </div>
      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-inner">
        <span className="hero-label">Built For Local Businesses</span>
        <h1>
          <span className="hero-title-line">Run Your <span className="logo-blend-text">Business</span>,</span>
          <span className="hero-title-line">Not Paperwork.</span>
        </h1>
        <p>
          At FekiTech, we combine custom software, intelligent automation, and expert technology consultancy to help you
          run a more profitable business with less stress
        </p>
        <div className="hero-actions">
          <Button>Book a Free Call</Button>
          <Button href="/services" variant="secondary">Explore Our Approach</Button>
        </div>
      </div>
    </section>
  );
}

function TransformProcess() {
  const steps = [
    ["Business Audit", "We assess your operations, people, processes, and technology to gain a clear understanding of how your organisation works today.", ClipboardCheck],
    ["Diagnose the Gaps", "We identify inefficiencies, bottlenecks, accountability gaps, and missed opportunities limiting your performance, profitability, and growth.", Search],
    ["Design Your Transformation Roadmap", "We build a tailored operating roadmap that enables your organisation to run more efficiently, profitably, and with greater clarity and control.", Network],
    ["Implement Smart Business Systems", "We deploy integrated systems, tools, and operational processes that improve efficiency, visibility, and decision-making.", Settings2],
    ["Drive Performance & Scale", "We optimise performance through measurable improvements, continuous refinement, and scalable operating models.", TrendingUp],
    ["Partner for Long-Term Success", "We provide ongoing advisory and strategic support to help leadership teams sustain growth, improve execution, and continue to grow.", Handshake]
  ];

  return (
    <section className="section transform-section" id="process">
      <div className="transform-header">
          <h2>How We Transform Your <span className="transform-title-accent">Business</span></h2>
      </div>
      <div className="transform-layout">
        <div className="transform-copy">
          <div className="transform-grid">
            {steps.map(([title, text, Icon]) => (
              <article key={title}>
                <span className="transform-step-icon" aria-hidden="true"><Icon size={22} /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
        <figure className="transform-visual">
          <img src={transformationStrategyImage} alt="Business team planning strategy, operations, and transformation systems around a meeting table" width="1536" height="1536" loading="lazy" decoding="async" />
        </figure>
      </div>
    </section>
  );
}

function Outcomes() {
  const outcomes = [
    ["Higher Profit Margins", "We help you recover lost revenue, improve cost control, and strengthen the systems that protect and increase profitability.", analyticsImage, "Business profitability dashboard and financial charts in a modern workspace"],
    ["Predictable Customer Growth", "We improve your customer journey with better follow-up, response systems, and retention processes that drive consistent growth.", retentionImage, "Professional team building customer relationships in a business meeting"],
    ["Faster Execution", "We streamline operations with clear systems, ownership, and workflows so your team delivers results without delays or chasing.", scaleImage, "Business team celebrating growth and successful operations around laptops"],
    ["Time Efficiency Gains", "We remove repetitive manual work through smarter systems and automation, freeing up time for higher-value activities.", timeImage, "Organised modern workspace with paperwork and productivity tools"],
    ["Reduced Operational Stress", "We replace disconnected tools and guesswork with structured, visible systems that give you clarity and control.", systemsImage, "Business leader using digital systems and dashboards to stay organised"],
    ["Scalable Business Performance", "We build the operational foundation needed for better decisions, consistent performance, and long-term scalable growth.", billingImage, "Professional invoice and business finance documents on a modern desk"]
  ];

  return (
    <section className="section outcomes-section" id="growth">
      <SectionIntro
        title={<>Business Results After Our <span className="logo-blend-text">Solution</span></>}
      />
      <div className="outcomes-premium-grid">
        {outcomes.map(([title, text, image, alt]) => (
          <article className="result-card" key={title}>
            <div className="result-card-media">
              <img src={image} alt={alt} width="1376" height="768" loading="lazy" decoding="async" />
            </div>
            <div className="result-card-content">
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function WhyChooseFekitech() {
  const reasons = [
    ["Clarity Where Others Create Complexity", "We simplify what is slowing your business down by fixing the structural, operational, and performance issues at the core."],
    ["Execution, Not Just Advice", "We turn strategy into practical systems and measurable improvements that strengthen performance, accountability, and profitability."],
    ["Built for Scalable Growth", "We create the structure, control, and operational discipline businesses need to grow sustainably without losing efficiency or profitability."]
  ];

  return (
    <section className="section why-section" id="why">
      <div className="why-layout">
        <div className="why-editorial">
          <h2>Why Choose Fekitech</h2>
          <Button href="/contact">Book a Free Call</Button>
        </div>
        <div className="why-reasons">
          {reasons.map(([title, text]) => (
            <article key={title}>
              <Check size={18} />
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
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
    <section className="section results" id="metrics">
      <SectionIntro
        label="Metrics"
        title={<>Built to Improve Business <span className="heading-accent accent-purple">Performance</span></>}
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
        title={<>What Founders Say About <span className="heading-accent accent-blue">Us</span></>}
      />
      {[rowOne, rowTwo].map((row, rowIndex) => (
        <div className={`marquee-row ${rowIndex === 1 ? "reverse" : ""}`} key={rowIndex}>
          <div className="marquee-track">
            {[...row, ...row].map((item, index) => (
              <article className="testimonial-card" key={`${item.name}-${index}`}>
                <p>"{item.quote}"</p>
                <div className="testimonial-person">
                  <img src={testimonialAvatars[item.name] || testimonialAvatars.Ronald} alt={`${item.name} avatar`} width="240" height="240" loading="lazy" decoding="async" />
                  <div><strong>{item.name}</strong><span>{item.role}</span></div>
                </div>
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
      <div className="cta-light-trails" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, index) => <span key={index} />)}
      </div>
      <div className="cta-inner">
        <div className="cta-copy-panel">
          <span className="section-kicker">Start with clarity</span>
          <h2>Ready to make your business easier to run?</h2>
          <p>
            Book a free call and we will help you identify the systems, workflows, and performance gaps worth fixing first.
          </p>
          <Button>Book a Free Call</Button>
        </div>
        <figure className="cta-signal-panel" aria-hidden="true">
          <span className="cta-visual-accent accent-one" />
          <span className="cta-visual-accent accent-two" />
          <img
            src="/fekitech-cta-systems-clarity.png"
            alt=""
            width="1536"
            height="1536"
            loading="lazy"
            decoding="async"
          />
        </figure>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <main className="home-page">
      <Hero />
      <TransformProcess />
      <Outcomes />
      <WhyChooseFekitech />
      <BusinessImpact />
      <Testimonials />
      <CTA />
    </main>
  );
}

function AboutPage() {
  return (
    <main className="page-main about-page">
      <section className="section about-simple">
        <figure className="about-single-image about-simple-visual">
          <img src={aboutTransformationImage} alt="Business leaders collaborating on transformation strategy in a modern office" width="1719" height="915" loading="lazy" decoding="async" />
        </figure>
        <div className="about-simple-copy">
          <h1>About Us</h1>
          <div className="about-text-stack">
            <p>FekiTech is a technology company specialising in software development, IT consultancy, and business systems design for small and growing businesses.</p>
            <p>We help organisations move away from manual processes, disconnected tools, and inefficient workflows by building integrated digital systems that improve how they operate day to day.</p>
            <p>Our focus is simple:<br />to design, build, and implement the technology that helps businesses run more efficiently, more profitably, and with greater control.</p>
          </div>
        </div>
      </section>
      <section className="section mission-panel premium-mission about-mission-only">
        <div>
          <h2>Our Mission</h2>
          <p>Our mission is simple: to help businesses become structured, data-driven, and high-performing organisations built on clarity, systems, and sustainable growth.</p>
        </div>
        <Button>Book a Free Business Audit</Button>
      </section>
    </main>
  );
}

function ServiceCardVisual({ index }) {
  const visualNumber = String(index + 1).padStart(2, "0");

  return (
    <div className={`service-card-visual service-visual-${visualNumber}`} aria-hidden="true">
      {index === 0 && (
        <svg className="service-visual-svg" viewBox="0 0 320 150" role="presentation">
          <path className="service-line" d="M84 73h58M178 73h58M160 47v52" />
          <rect className="service-panel" x="42" y="49" width="62" height="48" rx="12" />
          <rect className="service-panel service-panel-strong" x="129" y="30" width="62" height="48" rx="12" />
          <rect className="service-panel" x="216" y="49" width="62" height="48" rx="12" />
          <circle className="service-node" cx="160" cy="114" r="13" />
        </svg>
      )}
      {index === 1 && (
        <svg className="service-visual-svg" viewBox="0 0 320 150" role="presentation">
          <rect className="service-panel" x="54" y="34" width="118" height="82" rx="16" />
          <rect className="service-fill" x="72" y="54" width="78" height="10" rx="5" />
          <rect className="service-fill service-fill-purple" x="72" y="76" width="48" height="10" rx="5" />
          <path className="service-line" d="M188 75h58M229 50l25 25-25 25" />
          <rect className="service-panel service-panel-strong" x="230" y="38" width="42" height="74" rx="14" />
        </svg>
      )}
      {index === 2 && (
        <svg className="service-visual-svg" viewBox="0 0 320 150" role="presentation">
          <rect className="service-panel" x="52" y="30" width="216" height="92" rx="18" />
          <path className="service-line" d="M76 96l38-30 34 18 46-44 50 30" />
          <rect className="service-fill" x="76" y="82" width="18" height="22" rx="5" />
          <rect className="service-fill service-fill-purple" x="112" y="70" width="18" height="34" rx="5" />
          <rect className="service-fill" x="148" y="58" width="18" height="46" rx="5" />
          <circle className="service-node" cx="215" cy="50" r="11" />
        </svg>
      )}
      {index === 3 && (
        <svg className="service-visual-svg" viewBox="0 0 320 150" role="presentation">
          <path className="service-line" d="M76 76h54c18 0 18-28 36-28h42M244 48l22 22-22 22M244 20l22 22-22 22" />
          <path className="service-line service-line-soft" d="M76 76h54c18 0 18 28 36 28h42M244 86l22 22-22 22" />
          <circle className="service-node" cx="68" cy="76" r="16" />
          <rect className="service-panel" x="132" y="56" width="58" height="40" rx="12" />
          <circle className="service-node service-node-purple" cx="224" cy="48" r="13" />
          <circle className="service-node" cx="224" cy="104" r="13" />
        </svg>
      )}
      {index === 4 && (
        <svg className="service-visual-svg" viewBox="0 0 320 150" role="presentation">
          <circle className="service-node" cx="82" cy="76" r="20" />
          <circle className="service-node service-node-purple" cx="160" cy="48" r="18" />
          <circle className="service-node" cx="238" cy="76" r="20" />
          <path className="service-line" d="M101 69c25-27 70-27 95 0M219 83c-25 27-70 27-95 0" />
          <path className="service-line service-line-soft" d="M116 106h88" />
          <rect className="service-panel" x="124" y="94" width="72" height="26" rx="13" />
        </svg>
      )}
      {index === 5 && (
        <svg className="service-visual-svg" viewBox="0 0 320 150" role="presentation">
          <rect className="service-fill" x="70" y="84" width="24" height="30" rx="6" />
          <rect className="service-fill service-fill-purple" x="112" y="68" width="24" height="46" rx="6" />
          <rect className="service-fill" x="154" y="52" width="24" height="62" rx="6" />
          <rect className="service-fill service-fill-purple" x="196" y="36" width="24" height="78" rx="6" />
          <path className="service-line" d="M72 68c52-14 98-30 154-62" />
          <path className="service-line" d="M220 10l8 28-28-8" />
        </svg>
      )}
      {index === 6 && (
        <svg className="service-visual-svg" viewBox="0 0 320 150" role="presentation">
          <circle className="service-panel service-orb" cx="160" cy="75" r="34" />
          <circle className="service-node" cx="96" cy="42" r="13" />
          <circle className="service-node service-node-purple" cx="226" cy="46" r="13" />
          <circle className="service-node" cx="96" cy="108" r="13" />
          <circle className="service-node service-node-purple" cx="226" cy="108" r="13" />
          <path className="service-line" d="M109 49l24 13M192 61l22-10M109 101l24-13M192 89l22 13M142 75h36" />
        </svg>
      )}
      {index === 7 && (
        <svg className="service-visual-svg" viewBox="0 0 320 150" role="presentation">
          <path className="service-line" d="M54 75h62M150 75h62M246 75h34" />
          <path className="service-line service-line-soft" d="M92 48h76M126 102h106" />
          <rect className="service-panel" x="116" y="48" width="34" height="54" rx="11" />
          <rect className="service-panel service-panel-strong" x="212" y="48" width="34" height="54" rx="11" />
          <path className="service-line" d="M256 51l24 24-24 24" />
        </svg>
      )}
      {index === 8 && (
        <svg className="service-visual-svg" viewBox="0 0 320 150" role="presentation">
          <path className="service-line" d="M78 114V44M78 44h154" />
          <path className="service-line service-line-soft" d="M112 114V72M146 114V60M180 114V88M214 114V36" />
          <circle className="service-node" cx="78" cy="44" r="12" />
          <circle className="service-node service-node-purple" cx="146" cy="60" r="12" />
          <circle className="service-node" cx="214" cy="36" r="12" />
          <path className="service-line" d="M232 36l26 0M248 20l16 16-16 16" />
        </svg>
      )}
      {index === 9 && (
        <svg className="service-visual-svg" viewBox="0 0 320 150" role="presentation">
          <rect className="service-panel" x="64" y="34" width="84" height="76" rx="14" />
          <rect className="service-panel service-panel-strong" x="172" y="28" width="84" height="88" rx="16" />
          <rect className="service-fill" x="82" y="54" width="42" height="8" rx="4" />
          <rect className="service-fill service-fill-purple" x="82" y="76" width="30" height="8" rx="4" />
          <path className="service-line" d="M190 56h48M190 78h30M190 100h42" />
          <circle className="service-node" cx="246" cy="36" r="9" />
        </svg>
      )}
      {index === 10 && (
        <svg className="service-visual-svg" viewBox="0 0 320 150" role="presentation">
          <path className="service-line" d="M74 108C114 42 178 28 244 42" />
          <path className="service-line service-line-soft" d="M72 108h182" />
          <circle className="service-node" cx="74" cy="108" r="12" />
          <circle className="service-node service-node-purple" cx="130" cy="66" r="12" />
          <circle className="service-node" cx="190" cy="42" r="12" />
          <path className="service-line" d="M242 42l20 10-20 10" />
        </svg>
      )}
      {index === 11 && (
        <svg className="service-visual-svg" viewBox="0 0 320 150" role="presentation">
          <rect className="service-panel" x="64" y="34" width="70" height="86" rx="14" />
          <path className="service-line" d="M154 106h88M194 48v58M168 78h50" />
          <rect className="service-fill" x="82" y="56" width="34" height="8" rx="4" />
          <rect className="service-fill service-fill-purple" x="82" y="78" width="24" height="8" rx="4" />
          <circle className="service-node" cx="194" cy="48" r="12" />
          <circle className="service-node service-node-purple" cx="242" cy="106" r="12" />
          <path className="service-line" d="M242 74l20 20-20 20" />
        </svg>
      )}
    </div>
  );
}

function ServiceArticlePage({ slug }) {
  const service = getServicePage(slug);

  if (!service) {
    return (
      <main className="page-main light-theme-page">
        <section className="section page-hero">
          <h1 style={{ color: "#111827" }}>Service Not Found</h1>
          <p style={{ color: "#4b5563" }}>The service you are looking for does not exist or has been moved.</p>
          <div className="hero-actions">
            <Button href="/services">View All Services</Button>
          </div>
        </section>
      </main>
    );
  }

  return <ServicePage service={service} />;
}

function ServicesPage() {
  return (
    <main className="page-main">
      <section className="section services-page-heading">
        <h1>Services</h1>
      </section>
      <section className="section service-list-section services-card-section">
        <h2 className="sr-only">Primary Services</h2>
        <div className="service-rows primary-service-rows">
          {servicePages.slice(0, 6).map((service, index) => (
            <a href={`/services/${service.slug}`} className="service-card" key={service.title} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ServiceCardVisual index={index} />
              <span className="service-card-number">{String(index + 1).padStart(2, "0")}</span>
              <h3 style={{ textDecoration: 'underline', textDecorationColor: 'transparent', transition: 'text-decoration-color 0.2s ease' }}>{service.title}</h3>
              <p>{service.shortDescription}</p>
            </a>
          ))}
        </div>
        <h2 className="services-group-heading">Other Services</h2>
        <div className="service-rows other-service-rows">
          {servicePages.slice(6).map((service, index) => (
            <a href={`/services/${service.slug}`} className="service-card" key={service.title} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ServiceCardVisual index={index + 6} />
              <span className="service-card-number">{String(index + 7).padStart(2, "0")}</span>
              <h3 style={{ textDecoration: 'underline', textDecorationColor: 'transparent', transition: 'text-decoration-color 0.2s ease' }}>{service.title}</h3>
              <p>{service.shortDescription}</p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}

function PricingPage() {
  const smallBusinessPlans = [
    ["Starter Plan", "£19/month", "For small businesses starting out", ["Instant quote generator", "Basic invoice creation", "1 business profile", "Email delivery of quotes/invoices", "Standard templates"]],
    ["Pro Plan", "£49/month", "For growing service businesses", ["Everything in Starter", "AI-powered 3-tier quotes (Basic / Standard / Premium)", "Auto invoice generation after quote acceptance", "Expense tracking (basic)", "Custom branding (logo + colours)", "Stripe payment integration", "Website widget embed"], true],
    ["Business Plan", "£99/month", "For agencies & high-volume businesses", ["Everything in Pro", "Unlimited quotes & invoices", "Advanced AI pricing rules (profit control + margins)", "Full expense tracking system", "Real-time profit dashboard", "Multi-user access (team accounts)", "Priority support", "Advanced widget customization"]],
    ["Agency / White Label", "£199/month", "For agencies reselling FekiTech", ["Everything in Business", "White-label branding (remove FekiTech branding)", "Manage multiple client accounts", "API access", "Custom integrations", "Dedicated onboarding support"]]
  ];
  const transformationPackages = [
    ["Starter Package", "From £500 – £1,500", "Business audit + structure review"],
    ["Growth Package", "From £2,000 – £5,000", "Systems + digital transformation setup"],
    ["FOS Implementation (Main Offer)", "From £5,000 – £25,000+", "Full business operating system build", true],
    ["Enterprise (Custom)", "Custom pricing", "Full transformation + ongoing support"]
  ];

  return (
    <main className="page-main">
      <section className="section pricing-page-section pricing-only-page" id="pricing">
        <div className="pricing-section-heading">
          <h1>Pricing</h1>
        </div>
        <div className="pricing-subsection-heading">
          <h2>Small Business Operating System Package</h2>
        </div>
        <div className="pricing-grid page-pricing small-business-pricing">
          {smallBusinessPlans.map(([name, price, summary, features, featured]) => (
            <article className={`pricing-card ${featured ? "featured" : ""}`} key={name}>
              {featured && <span className="popular">BEST SELLER</span>}
              <span className="pricing-kicker">{summary}</span>
              <h3>{name}</h3>
              <div className="price"><strong>{price}</strong></div>
              <ul>
                {features.map((feature) => <li key={feature}><Check size={15} />{feature}</li>)}
              </ul>
              <a href="/contact">Get Started</a>
            </article>
          ))}
        </div>
        <p className="pricing-note bespoke-pricing-note">OTHER SERVICES PRICING ARE ALL BESPOKE AND TAILOR-MADE</p>
      </section>
      <section className="section transformation-packages-section">
        <div className="transformation-packages-heading">
          <h2>Business Transformation Package</h2>
        </div>
        <div className="transformation-package-grid">
          {transformationPackages.map(([name, price, summary, featured]) => (
            <article className={`transformation-package-card ${featured ? "featured" : ""}`} key={name}>
              {featured && <span className="package-badge">Main Offer</span>}
              <h3>{name}</h3>
              <strong>{price}</strong>
              <p>{summary}</p>
              <a href="/contact">Book an Audit</a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function BlogPage() {
  const visibleArticles = blogPosts.slice(0, 6);
  const [featuredArticle, ...otherArticles] = visibleArticles;

  return (
    <main className="page-main">
      <section className="section blog-editorial-section" aria-label="Fekitech business insights">
        <BlogTextCard article={featuredArticle} featured />
        <div className="blog-list-grid" aria-label="More Fekitech articles">
          {otherArticles.map((article) => <BlogTextCard article={article} key={article.slug} />)}
        </div>
        {blogPosts.length > 6 && (
          <div className="blog-index-more"><Button href="/blog/all">View All Articles</Button></div>
        )}
      </section>
    </main>
  );
}

function BlogTextCard({ article, featured = false }) {
  const Heading = featured ? "h1" : "h2";

  return (
    <article className={`blog-text-card${featured ? " blog-text-card-featured" : " blog-list-card"}`}>
      <span className="blog-category">{article.category}</span>
      <Heading>{article.title}</Heading>
      <p>{article.excerpt}</p>
      <div className="blog-card-footer">
        <span><time dateTime={article.datePublished}>{formatArticleDate(article.datePublished)}</time> · {article.readTime}</span>
        <a className="blog-read-link" href={article.slug}>Read Article <ArrowRight size={17} aria-hidden="true" /></a>
      </div>
    </article>
  );
}

function formatArticleDate(value) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${value}T12:00:00Z`));
}

function articleSectionId(section) {
  return section.id || section.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function AllBlogsPage() {
  const [visibleCount, setVisibleCount] = useState(9);
  const visibleArticles = blogPosts.slice(0, visibleCount);

  return (
    <main className="page-main blog-index-page">
      <header className="blog-index-hero blog-index-hero--compact">
        <div className="blog-shell">
          <nav className="blog-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/blog">Blog</a><span aria-hidden="true">/</span><span>All articles</span></nav>
          <span className="blog-kicker">Fekitech library</span>
          <h1>All business insights</h1>
          <p>Browse every published guide on business systems, digital operations, technology and sustainable growth.</p>
        </div>
      </header>
      <section className="blog-shell blog-index-section">
        <div className="blog-list-grid">
          {visibleArticles.map((article) => <BlogTextCard article={article} key={article.slug} />)}
        </div>
        {visibleCount < blogPosts.length && (
          <div className="blog-index-more"><button className="button primary" type="button" onClick={() => setVisibleCount((count) => count + 9)}>Load More Articles <ArrowRight size={17} /></button></div>
        )}
      </section>
    </main>
  );
}

function BlogArticlePage({ slug = "/blog/why-most-businesses-are-not-profitable" }) {
  const article = getBlogPost(slug) || getBlogPost("/blog/why-most-businesses-are-not-profitable");
  const [openFaq, setOpenFaq] = useState(0);
  const relatedArticles = getRelatedBlogPosts(article, 2);
  const articleIndex = blogPosts.findIndex((post) => post.slug === article.slug);
  const newerArticle = articleIndex > 0 ? blogPosts[articleIndex - 1] : null;
  const olderArticle = articleIndex < blogPosts.length - 1 ? blogPosts[articleIndex + 1] : null;

  return (
    <main className="page-main blog-article-page">
      <article className="blog-article">
        <header className="blog-article__header blog-shell">
          <nav className="blog-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/blog">Blog</a><span aria-hidden="true">/</span><span>{article.category}</span></nav>
          <span className="blog-kicker">{article.category}</span>
          <h1>{article.h1}</h1>
          <p className="blog-article__lead">{article.lead}</p>
          <div className="blog-article__meta">
            <span>By Fekitech</span>
            <time dateTime={article.datePublished}>Published {formatArticleDate(article.datePublished)}</time>
            {article.lastModified !== article.datePublished && <time dateTime={article.lastModified}>Updated {formatArticleDate(article.lastModified)}</time>}
            <span>{article.readTime}</span>
          </div>
        </header>
        <figure className="blog-article__feature blog-shell">
          <img src={article.featuredImage} alt={article.imageAlt} width={article.imageWidth} height={article.imageHeight} loading="eager" fetchPriority="high" />
        </figure>
        <div className="blog-article__layout blog-shell">
          <aside className="blog-article__aside">
            <nav className="blog-article__toc" aria-label="Table of contents">
              <span>In this guide</span>
              <ol>{article.sections.map((section) => <li key={section.heading}><a href={`#${articleSectionId(section)}`}>{section.heading}</a></li>)}</ol>
              <a className="blog-article__service-link" href={article.relatedService?.href || "/services"}>{article.relatedService?.title || "Fekitech services"} <ArrowRight size={15} /></a>
            </nav>
          </aside>
          <div className="blog-article__body">
            <section className="blog-article__intro" aria-labelledby="quick-answer-heading">
              <span>Quick answer</span>
              <h2 id="quick-answer-heading">The practical starting point</h2>
              {article.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </section>
            {article.sections.map((section) => (
              <section id={articleSectionId(section)} key={section.heading}>
                <h2>{section.heading}</h2>
                {section.body?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.callout && <blockquote>{section.callout}</blockquote>}
                {section.bullets?.length > 0 && <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}
                {section.table && (
                  <div className="blog-article__table-wrap">
                    <table>
                      <thead><tr>{section.table.headers.map((header) => <th key={header}>{header}</th>)}</tr></thead>
                      <tbody>{section.table.rows.map((row) => <tr key={row.join("-")}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody>
                    </table>
                  </div>
                )}
                {section.links?.length > 0 && <div className="blog-article__links">{section.links.map((link) => <p key={link.href}>{link.context} <a href={link.href}>{link.label}</a>.</p>)}</div>}
                {section.sources?.length > 0 && <div className="blog-article__sources"><strong>Useful guidance</strong>{section.sources.map((source) => <a href={source.href} key={source.href} target="_blank" rel="noopener noreferrer">{source.label} <ArrowRight size={14} /></a>)}</div>}
              </section>
            ))}
            <section id="frequently-asked-questions" className="blog-article__faq">
              <span>Common questions</span>
              <h2>Frequently asked questions</h2>
              <div>
                {article.faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return <article className={isOpen ? "is-open" : ""} key={faq.question}>
                    <h3><button type="button" aria-expanded={isOpen} aria-controls={`blog-faq-${index}`} onClick={() => setOpenFaq(isOpen ? -1 : index)}>{faq.question}<ChevronDown size={19} aria-hidden="true" /></button></h3>
                    <div id={`blog-faq-${index}`} hidden={!isOpen}><p>{faq.answer}</p></div>
                  </article>;
                })}
              </div>
            </section>
            <section className="blog-article__cta">
              <span>Related Fekitech service</span>
              <h2>{article.ctaHeading || "Turn the insight into a practical business system"}</h2>
              <p>{article.cta}</p>
              <div><Button href="/contact">Book a Free Business Audit</Button><a href={article.relatedService?.href || "/services"}>Explore {article.relatedService?.title || "our services"} <ArrowRight size={16} /></a></div>
            </section>
          </div>
        </div>
        <section className="blog-related blog-shell" aria-labelledby="related-reading-title">
          <div className="blog-related__heading"><div><span>Continue reading</span><h2 id="related-reading-title">Related business guides</h2></div><a href="/blog">View all insights <ArrowRight size={16} /></a></div>
          <div className="blog-list-grid blog-related__grid">{relatedArticles.map((post) => <BlogTextCard article={post} key={post.slug} />)}</div>
        </section>
        <nav className="blog-article__pagination blog-shell" aria-label="Article navigation">
          {newerArticle ? <a href={newerArticle.slug}><span>Newer article</span><strong>{newerArticle.title}</strong></a> : <span />}
          {olderArticle ? <a href={olderArticle.slug}><span>Older article</span><strong>{olderArticle.title}</strong></a> : <span />}
        </nav>
      </article>
    </main>
  );
}

function ContactPage() {
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [turnstileSiteKey, setTurnstileSiteKey] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileLoading, setTurnstileLoading] = useState(true);
  const turnstileContainerRef = useRef(null);
  const turnstileWidgetId = useRef(null);

  useEffect(() => {
    let active = true;

    fetch("/api/turnstile-config")
      .then((response) => response.json())
      .then((config) => {
        if (active) {
          setTurnstileSiteKey(config.siteKey || "");
        }
      })
      .catch(() => {
        if (active) {
          setTurnstileSiteKey("");
        }
      })
      .finally(() => {
        if (active) {
          setTurnstileLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!turnstileSiteKey || !turnstileContainerRef.current || turnstileWidgetId.current !== null) {
      return undefined;
    }

    let cancelled = false;

    loadTurnstileScript()
      .then((turnstile) => {
        if (cancelled || !turnstileContainerRef.current || !turnstile) {
          return;
        }

        turnstileWidgetId.current = turnstile.render(turnstileContainerRef.current, {
          sitekey: turnstileSiteKey,
          theme: "dark",
          callback: (token) => {
            setTurnstileToken(token);
            setFormStatus((status) => (status.type === "error" && status.message.includes("security check") ? { type: "", message: "" } : status));
          },
          "expired-callback": () => setTurnstileToken(""),
          "error-callback": () => {
            setTurnstileToken("");
            setFormStatus({ type: "error", message: "Security check could not load. Please refresh and try again." });
          }
        });
      })
      .catch(() => {
        if (!cancelled) {
          setFormStatus({ type: "error", message: "Security check could not load. Please refresh and try again." });
        }
      });

    return () => {
      cancelled = true;
      if (turnstileWidgetId.current !== null && window.turnstile?.remove) {
        window.turnstile.remove(turnstileWidgetId.current);
        turnstileWidgetId.current = null;
      }
    };
  }, [turnstileSiteKey]);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (!turnstileToken) {
      setFormStatus({ type: "error", message: "Please complete the security check before submitting." });
      return;
    }

    const formData = new FormData(form);
    const payload = {
      name: formData.get("fullName"),
      email: formData.get("email"),
      subject: formData.get("challenge"),
      message: formData.get("message"),
      company: formData.get("company"),
      website: formData.get("website"),
      businessSize: formData.get("size"),
      challenge: formData.get("challenge"),
      turnstileToken
    };

    setSubmitting(true);
    setFormStatus({ type: "", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to submit your message right now.");
      }

      setFormStatus({ type: "success", message: result.message || "Your message has been received. The FekiTech team will follow up shortly." });
      form.reset();
      setTurnstileToken("");
      if (turnstileWidgetId.current !== null && window.turnstile?.reset) {
        window.turnstile.reset(turnstileWidgetId.current);
      }
    } catch (error) {
      setFormStatus({ type: "error", message: error.message || "Unable to submit your message right now." });
      setTurnstileToken("");
      if (turnstileWidgetId.current !== null && window.turnstile?.reset) {
        window.turnstile.reset(turnstileWidgetId.current);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="audit-page">
      <section className="audit-hero">
        <h1>Start Business Transformation Support</h1>
      </section>
      <section className="audit-layout">
        <form className="audit-form" onSubmit={handleSubmit}>
          <label htmlFor="fullName">Full name<input id="fullName" required name="fullName" /></label>
          <label htmlFor="email">Email address<input id="email" required type="email" name="email" /></label>
          <label htmlFor="company">Company name<input id="company" required name="company" /></label>
          <label htmlFor="website">Website or social link<input id="website" required name="website" /></label>
          <label htmlFor="size">
            Business size
            <select id="size" required name="size" defaultValue="">
              <option value="" disabled>Select business size</option>
              {["1-10", "11-50", "51-200", "201-500", "500+"].map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label htmlFor="challenge">
            Main challenge
            <select id="challenge" required name="challenge" defaultValue="">
              <option value="" disabled>Select main challenge</option>
              {["Low profitability", "Customer retention", "Manual operations", "Poor visibility", "Weak online conversion", "Disconnected teams", "Other"].map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label className="full" htmlFor="message">Message<textarea id="message" required name="message" placeholder="Tell us what is currently slowing your business down." /></label>
          <div className="turnstile-field full">
            <span>Security check</span>
            <div className="turnstile-widget" ref={turnstileContainerRef}>
              {turnstileLoading && <small>Loading verification...</small>}
              {!turnstileLoading && !turnstileSiteKey && <small>Security check is unavailable. Please refresh or email info@contact.fekitech.co.uk.</small>}
            </div>
          </div>
          <button type="submit" disabled={submitting}>{submitting ? "Submitting..." : "Submit Audit Request"}</button>
          {formStatus.message && <p className={formStatus.type === "error" ? "error-message" : "success-message"}>{formStatus.message}</p>}
        </form>
        <aside className="audit-side-card">
          <img src={logoMark} alt="" width="616" height="646" loading="lazy" decoding="async" />
          <h2>Contact Details</h2>
          <p>Phone: <a href="tel:+447352364942">+447352364942</a></p>
          <p>71-75, Shelton Street, Covent Garden, London, United Kingdom, WC2H 9JQ</p>
          <p>Email: <a href="mailto:info@contact.fekitech.co.uk">info@contact.fekitech.co.uk</a></p>
          <div className="socials">
            {socialLinks.map(({ label, href, Icon, ariaLabel }) => (
              <a href={href} key={label} aria-label={ariaLabel} target="_blank" rel="noopener noreferrer">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}

function formatAdminDate(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}

function AdminPage() {
  const [authStatus, setAuthStatus] = useState("checking");
  const [conversations, setConversations] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [messages, setMessages] = useState([]);
  const [notice, setNotice] = useState("");
  const [loadingThread, setLoadingThread] = useState(false);
  const [replying, setReplying] = useState(false);

  async function loadConversations() {
    const response = await fetch("/api/admin/messages", { credentials: "include" });
    if (response.status === 401) {
      setAuthStatus("logged-out");
      return;
    }
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "Unable to load messages.");
    }
    setConversations(result.conversations || []);
    setAuthStatus("logged-in");
    if (!selectedEmail && result.conversations?.[0]?.email) {
      await loadThread(result.conversations[0].email);
    }
  }

  async function loadThread(email) {
    setSelectedEmail(email);
    setLoadingThread(true);
    setNotice("");
    try {
      const response = await fetch(`/api/admin/messages?email=${encodeURIComponent(email)}`, { credentials: "include" });
      if (response.status === 401) {
        setAuthStatus("logged-out");
        return;
      }
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Unable to load this conversation.");
      }
      setMessages(result.messages || []);
    } catch (error) {
      setNotice(error.message);
    } finally {
      setLoadingThread(false);
    }
  }

  useEffect(() => {
    loadConversations().catch((error) => {
      setNotice(error.message);
      setAuthStatus("logged-out");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleLogin(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setNotice("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password")
        })
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Unable to log in.");
      }
      await loadConversations();
    } catch (error) {
      setNotice(error.message);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
    setAuthStatus("logged-out");
    setConversations([]);
    setMessages([]);
    setSelectedEmail("");
  }

  async function handleReply(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const message = String(formData.get("reply") || "").trim();
    if (!selectedEmail || !message) return;

    setReplying(true);
    setNotice("");
    try {
      const response = await fetch("/api/admin/reply", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: selectedEmail, message })
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Unable to send reply.");
      }
      setMessages(result.messages || []);
      form.reset();
      await loadConversations();
    } catch (error) {
      setNotice(error.message);
    } finally {
      setReplying(false);
    }
  }

  if (authStatus === "checking") {
    return (
      <main className="admin-page">
        <section className="admin-panel"><p>Loading admin...</p></section>
      </main>
    );
  }

  if (authStatus === "logged-out") {
    return (
      <main className="admin-page admin-login-page">
        <section className="admin-panel admin-login-panel">
          <h1>Admin Login</h1>
          <form className="admin-login-form" onSubmit={handleLogin}>
            <label>Email<input required type="email" name="email" autoComplete="username" /></label>
            <label>Password<input required type="password" name="password" autoComplete="current-password" /></label>
            <button type="submit">Log In</button>
            {notice && <p className="error-message">{notice}</p>}
          </form>
        </section>
      </main>
    );
  }

  const selectedConversation = conversations.find((conversation) => conversation.email === selectedEmail);

  return (
    <main className="admin-page">
      <section className="admin-panel admin-dashboard">
        <div className="admin-toolbar">
          <div>
            <span className="eyebrow">Admin</span>
            <h1>Messages</h1>
          </div>
          <button type="button" onClick={handleLogout}>Log Out</button>
        </div>
        {notice && <p className="error-message">{notice}</p>}
        <div className="admin-dashboard-grid">
          <aside className="conversation-list" aria-label="Conversations">
            {conversations.length === 0 ? (
              <p>No messages yet.</p>
            ) : conversations.map((conversation) => (
              <button
                className={conversation.email === selectedEmail ? "active" : ""}
                type="button"
                key={conversation.email}
                onClick={() => loadThread(conversation.email)}
              >
                <strong>{conversation.name || conversation.email}</strong>
                <span>{conversation.email}</span>
                <small>{conversation.messageCount} message{conversation.messageCount === 1 ? "" : "s"} · {formatAdminDate(conversation.lastMessageAt)}</small>
                <p>{conversation.preview}</p>
              </button>
            ))}
          </aside>
          <section className="message-thread">
            {selectedConversation ? (
              <>
                <header>
                  <h2>{selectedConversation.name || selectedConversation.email}</h2>
                  <a href={`mailto:${selectedConversation.email}`}>{selectedConversation.email}</a>
                </header>
                <div className="message-history">
                  {loadingThread ? <p>Loading conversation...</p> : messages.map((message) => (
                    <article className={`thread-message ${message.direction === "admin" ? "admin-reply" : ""}`} key={message.id}>
                      <div>
                        <strong>{message.direction === "admin" ? "FekiTech" : message.name}</strong>
                        <span>{formatAdminDate(message.createdAt)}</span>
                      </div>
                      <h3>{message.subject}</h3>
                      <p>{message.message}</p>
                    </article>
                  ))}
                </div>
                <form className="admin-reply-form" onSubmit={handleReply}>
                  <label htmlFor="adminReply">Reply from info@contact.fekitech.co.uk</label>
                  <textarea id="adminReply" name="reply" required placeholder="Write your reply..." />
                  <button type="submit" disabled={replying}>{replying ? "Sending..." : "Send Reply"}</button>
                </form>
              </>
            ) : (
              <p>Select a conversation to view the message history.</p>
            )}
          </section>
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
          <img src={logoMark} alt="Fekitech logo" width="616" height="646" loading="lazy" decoding="async" />
          <span>Fekitech<small>Business systems for profitable growth</small></span>
        </a>
        <p>We help local businesses replace scattered admin with structured operations, practical systems, and clearer performance visibility.</p>
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
        <h3>Contact</h3>
        <a href="tel:+447352364942">+447352364942</a>
        <a href="mailto:info@contact.fekitech.co.uk">info@contact.fekitech.co.uk</a>
        <span>71-75, Shelton Street, Covent Garden, London, United Kingdom, WC2H 9JQ</span>
      </div>
      <div className="footer-column">
        <h3>Start</h3>
        <a href="/contact">Book a Free Call</a>
        {socialLinks.map(({ label, href, ariaLabel }) => (
          <a href={href} key={label} aria-label={ariaLabel} target="_blank" rel="noopener noreferrer">
            {label}
          </a>
        ))}
      </div>
      <small>© 2026 Fekitech. All rights reserved.</small>
    </footer>
  );
}

function AppPage({ pathname }) {
  if (pathname.startsWith("/services/") && pathname.length > 10) {
    const slug = pathname.replace("/services/", "");
    return <ServiceArticlePage slug={slug} />;
  }

  if (pathname.startsWith("/blog/") && getBlogPost(pathname)) {
    return <BlogArticlePage slug={pathname} />;
  }

  switch (pathname) {
    case "/about":
      return <AboutPage />;
    case "/services":
      return <ServicesPage />;
    case "/pricing":
      return <PricingPage />;
    case "/blog":
      return <BlogPage />;
    case "/blog/all":
      return <AllBlogsPage />;
    case "/contact":
    case "/audit":
      return <ContactPage />;
    case "/admin":
      return <AdminPage />;
    default:
      return <HomePage />;
  }
}

function normalisePathname(pathname) {
  return pathname.split(/[?#]/)[0].replace(/\/$/, "") || "/";
}

function getCurrentPathname() {
  if (typeof window === "undefined") {
    return "/";
  }
  const hashPath = window.location.hash.startsWith("#/") ? window.location.hash.slice(1) : "";
  return normalisePathname(hashPath || window.location.pathname);
}

export default function App({ initialPathname } = {}) {
  const appRef = useRef(null);
  const [pathname, setPathname] = useState(() => normalisePathname(initialPathname || getCurrentPathname()));

  useEffect(() => {
    const syncPathname = () => setPathname(getCurrentPathname());

    window.addEventListener("hashchange", syncPathname);
    window.addEventListener("popstate", syncPathname);

    return () => {
      window.removeEventListener("hashchange", syncPathname);
      window.removeEventListener("popstate", syncPathname);
    };
  }, []);

  useEffect(() => {
    setMeta(pathname);
  }, [pathname]);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const smallViewport = window.matchMedia("(max-width: 760px)").matches;
      const countCounters = gsap.utils.toArray(".count-up");
      const revealSelector = ".hero-label, .hero h1, .hero p, .hero-actions, .section-intro, .transform-header, .challenge-card, .fos-node, .transform-grid article, .result-card, .why-reasons article, .number-card, .simple-card-grid article, .method-steps article, .blog-list-card, .blog-card, .pricing-card, .about-simple-visual, .about-simple-copy, .mission-panel, .service-rows article, .blog-featured-copy, .blog-featured-image, .article-page section, .article-hero-image, .article-inline-image, .audit-form, .audit-side-card, .footer-column, .footer-brand";
      const revealTargets = gsap.utils.toArray(revealSelector);

      if (reduceMotion || smallViewport) {
        if (revealTargets.length) {
          gsap.set(revealTargets, {
            opacity: 1,
            y: 0,
            scale: 1
          });
        }
        countCounters.forEach((counter) => {
          const endValue = Number(counter.dataset.value);
          const hasDecimal = String(endValue).includes(".");
          counter.textContent = hasDecimal ? endValue.toFixed(1) : Math.round(endValue);
        });
        return;
      }

      const heroItems = gsap.utils.toArray(".hero-label, .hero h1, .hero p, .hero-actions");
      const singleItems = gsap.utils.toArray(".section-intro, .transform-header, .transform-visual, .why-editorial, .outcomes-image, .page-image, .mission-panel, .about-simple-visual, .about-simple-copy, .blog-featured-copy, .blog-featured-image, .article-hero-image, .article-inline-image, .audit-form, .audit-side-card, .footer-brand");
      const batchItems = gsap.utils.toArray(".challenge-card, .fos-node, .transform-grid article, .result-card, .why-reasons article, .number-card, .simple-card-grid article, .method-steps article, .blog-list-card, .blog-card, .pricing-card, .service-rows article, .article-page section, .footer-column");

      const animatedItems = [...heroItems, ...singleItems, ...batchItems];

      if (animatedItems.length) {
        gsap.set(animatedItems, { y: 20 });
      }

      if (heroItems.length) {
        gsap.to(heroItems, {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.08
        });
      }

      singleItems.forEach((item) => {
        gsap.to(item, {
          autoAlpha: 1,
          y: 0,
          duration: 0.82,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 85%", once: true }
        });
      });

      if (batchItems.length) {
        ScrollTrigger.batch(batchItems, {
          start: "top 85%",
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.78, stagger: 0.055, ease: "power3.out" });
          }
        });
      }

      countCounters.forEach((counter) => {
        const endValue = Number(counter.dataset.value);
        const hasDecimal = String(endValue).includes(".");
        const value = { current: 0 };

        counter.textContent = hasDecimal ? "0.0" : "0";

        gsap.fromTo(value, { current: 0 }, {
          current: endValue,
          duration: 2.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: counter.closest(".results") || counter,
            start: "top 78%",
            once: true
          },
          onUpdate: () => {
            counter.textContent = hasDecimal ? value.current.toFixed(1) : Math.round(value.current);
          },
          onComplete: () => {
            counter.textContent = hasDecimal ? endValue.toFixed(1) : Math.round(endValue);
          }
        });
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    },
    { scope: appRef, dependencies: [pathname], revertOnUpdate: true }
  );

  return (
    <div ref={appRef} className={pathname === "/" ? "app-shell home-shell" : "app-shell page-shell"}>
      <Header />
      <AppPage pathname={pathname} />
      <Footer />
      <FekitechChatbot />
    </div>
  );
}
