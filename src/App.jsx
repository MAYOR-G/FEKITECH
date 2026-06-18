import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronRight,
  ClipboardCheck,
  Database,
  Facebook,
  Gauge,
  Handshake,
  Instagram,
  Megaphone,
  Menu,
  Network,
  ScanLine,
  Search,
  Settings2,
  Sparkles,
  TrendingUp,
  Users,
  Workflow,
  X
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resultCards, testimonials } from "./data";
import { applySeo } from "./lib/seo.js";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const logoMark = "/fekitech-logo.png";
const analyticsImage = "/outcome-higher-profitability.webp";
const systemsImage = "/outcome-reduce-stress.webp";
const aboutTransformationImage = "/fekitech-about-transformation.webp";
const retentionImage = "/outcome-customer-growth.webp";
const structureImage = "https://images.pexels.com/photos/6340632/pexels-photo-6340632.jpeg?auto=compress&cs=tinysrgb&w=1400";
const scaleImage = "/outcome-business-success.webp";
const billingImage = "/outcome-get-paid-faster.webp";
const timeImage = "/outcome-save-time.webp";
const problemImages = {
  customers: "/problem-loss-customers.webp",
  profitability: "/problem-unpredictable-profitability.webp",
  conversion: "/problem-weak-online-conversion.webp",
  operations: "/problem-manual-operations.webp",
  visibility: "/problem-limited-visibility.webp",
  standout: "/problem-stand-out.webp"
};
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

function setMeta(pathname) {
  applySeo(pathname);
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="/" aria-label="Fekitech home">
          <img src={logoMark} alt="" width="654" height="658" />
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
      {label && <span className="eyebrow">{label}</span>}
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

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return undefined;
    }

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
      <div className="hero-background" aria-hidden="true">
        {videoError ? (
          <img src="/outcome-business-success.webp" alt="" width="1376" height="768" loading="eager" fetchPriority="high" decoding="async" />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/outcome-business-success.webp"
            tabIndex="-1"
            onError={() => setVideoError(true)}
          >
            <source src="https://pub-9f4f9c9b1b3e477aba4991ccfd92f1ae.r2.dev/202606151442.mp4" type="video/mp4" />
          </video>
        )}
      </div>
      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-inner">
        <span className="hero-label">Built For Local Businesses</span>
        <h1><span>Run Your Business,</span><span>Not Paperwork.</span></h1>
        <p>
          Fekitech transforms organisations by improving performance across operations, people, systems, and profitability.
        </p>
        <div className="hero-actions">
          <Button>Book a Strategy Call</Button>
          <Button href="/pricing#pricing" variant="secondary">Explore Our Approach</Button>
        </div>
      </div>
    </section>
  );
}

function Challenges() {
  const items = [
    ["Loss of customers", "Weak customer retention, inconsistent follow-up, and poor customer experience reduce long-term growth.", Users, problemImages.customers, "Business team discussing customer retention and growth in a meeting"],
    ["Unpredictable profitability", "Revenue may come in, but without visibility into costs, margins, and performance, profit remains unclear.", Gauge, problemImages.profitability, "Business leaders reviewing profitability charts and financial performance"],
    ["Weak online conversion", "A weak digital presence and unclear customer journey make it harder to convert attention into revenue.", ScanLine, problemImages.conversion, "Local business owner reviewing digital conversion data with a consultant"],
    ["Manual operations", "Unstructured workflows, repeated manual tasks, and unclear responsibilities slow the business down.", Workflow, problemImages.operations, "Business professional managing manual workflows on a laptop"],
    ["Limited visibility", "Leaders cannot improve what they cannot see. Without data, decisions become reactive instead of strategic.", Database, problemImages.visibility, "Business team reviewing operational visibility and reporting dashboards"],
    ["Owners Struggle to Stand Out", "It is no longer just about competing with rivals; it is about competing against a relentless flood of information. Here is why business owners find it increasingly difficult to be seen.", Megaphone, problemImages.standout, "Business team planning how to stand out in a competitive market"]
  ];

  return (
    <section className="section challenges-section" id="challenges">
      <div className="challenges-copy">
        <SectionIntro
          title="Business Problems"
          center={false}
        />
      </div>
      <div className="challenge-grid">
        {items.map(([title, text, Icon, image, alt], index) => (
          <article className={index === 0 ? "challenge-card featured" : "challenge-card"} key={title}>
            <figure className="problem-image">
              <img src={image} alt={alt} width="1200" height="675" loading="lazy" decoding="async" />
              <div className="challenge-card-icon"><Icon size={20} /></div>
            </figure>
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
    ["Organisational Structure", "Define clarity, roles, and organizational design.", Users],
    ["Digital Transformation", "Modernize systems and processes.", Workflow],
    ["Business Intelligence", "Enable data-driven decision making.", Database],
    ["Profitability", "Improve margins and financial control.", ScanLine],
    ["Automation", "Repeatable systems that improve efficiency by reducing delays and operational bottlenecks.", Sparkles],
    ["Performance Improvement", "Align teams’ performance and accountability.", Gauge, "Human Capital"]
  ];

  return (
    <section className="section solution-section" id="fos">
      <div className="solution-copy">
        <h2>Our <span className="heading-accent accent-purple">Solution</span></h2>
        <p className="solution-summary">
          The Fekitech Operating System (FOS) is a unified business operating framework that connects people,
          processes, data, and technology into one structured system for predictable performance, scalability, and
          profitability.
        </p>
        <div className="solution-deliverables">
          <h3>What it delivers:</h3>
          <div>
            <strong>Consistent execution across teams</strong>
            <p>Ensures aligned priorities, accountability, and operational discipline.</p>
          </div>
          <div>
            <strong>Real-time performance visibility</strong>
            <p>Enables data-driven decisions through clear operational insights.</p>
          </div>
          <div>
            <strong>Reduced operational inefficiency</strong>
            <p>Eliminates duplication, friction, and manual guesswork.</p>
          </div>
          <div>
            <strong>Scalable business architecture</strong>
            <p>Builds a foundation for sustainable growth without operational breakdown.</p>
          </div>
        </div>
      </div>
      <div className="fos-architecture">
        <div className="fos-engine">
          <span>FOS</span>
          <strong>Operations</strong>
          <small>Streamline workflow and remove inefficiencies.</small>
        </div>
        <div className="fos-orbit orbit-one" />
        <div className="fos-orbit orbit-two" />
        {pillars.map(([title, text, Icon, emphasis], index) => (
          <article className={`fos-node node-${index + 1}`} key={title}>
            <Icon size={18} />
            <h3>{title}</h3>
            <p>
              {emphasis && <strong className="fos-node-emphasis">→ {emphasis}</strong>}
              {text}
            </p>
          </article>
        ))}
      </div>
      <div className="fos-result-strip" aria-label="FOS result">
        <div>
          {Array.from({ length: 4 }).map((_, index) => (
            <span key={index}>STRUCTURED • DATA-DRIVEN • PROFITABLE • SCALABLE</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function TransformProcess() {
  const steps = [
    ["Assess your business operations", "We review your current structure, workflows, customer journey, digital systems, and performance gaps.", ClipboardCheck],
    ["Identify gaps in structure and systems", "We uncover what is slowing growth, reducing profit, weakening retention, or creating operational confusion.", Search],
    ["Design the FOS framework for your business", "We map the structure, tools, workflows, data points, and implementation plan your business needs.", Network],
    ["Implement digital and intelligence systems", "We help set up the systems, automations, reporting, and processes required to improve execution.", Settings2],
    ["Optimise for performance and scale", "We track what is working, improve what is weak, and prepare the business for scalable growth.", TrendingUp],
    ["Follow-up and Mentorship", "We provide continued guidance, follow-up, and strategic support to help the business stay aligned, improve execution, and sustain profitability.", Handshake]
  ];

  return (
    <section className="section transform-section" id="process">
      <SectionIntro
        title="How We Transform Your Business"
      />
      <div className="transform-roadmap">
        {steps.map(([title, text, Icon]) => (
          <article key={title}>
            <span className="transform-step-icon" aria-hidden="true"><Icon size={26} /></span>
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
    ["Higher Profitability", "Gain better visibility into your costs and profit so you can make smarter decisions and grow your bottom line.", analyticsImage, "Business profitability dashboard and financial charts in a modern workspace"],
    ["Customer Growth", "Build stronger customer relationships with faster responses, better service, and a more professional experience.", retentionImage, "Professional team building customer relationships in a business meeting"],
    ["Business Success", "Drive long-term growth with the tools and insights you need to run a more successful business.", scaleImage, "Business team celebrating growth and successful operations around laptops"],
    ["Get Paid Faster", "Send professional quotes and invoices in seconds, reduce late payments, and improve cash flow with a faster, more streamlined billing process.", billingImage, "Professional invoice and business finance documents on a modern desk"],
    ["Save Time", "Replace hours of manual paperwork every week. Save time, get paid faster, and see your profit in real time.", timeImage, "Organised modern workspace with paperwork and productivity tools"],
    ["Reduce Stress", "Manage everything in one system instead of juggling spreadsheets and multiple tools, so you can stay organised and in control with less effort.", systemsImage, "Business leader using digital systems and dashboards to stay organised"]
  ];

  return (
    <section className="section outcomes-section" id="growth">
      <SectionIntro
        title={<>How We Help You Run Your Business <span className="heading-accent accent-blue">Efficiently.</span></>}
      />
      <div className="outcome-lanes">
        {outcomes.map(([title, text, image, alt], index) => (
          <article className="outcome-lane-card" key={title}>
            <div className="outcome-lane-media">
              <img src={image} alt={alt} width="1376" height="768" loading="lazy" decoding="async" />
            </div>
            <div className="outcome-lane-content">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{text}</p>
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
        label="Review"
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
        <figure className="cta-visual">
          <img src={retentionImage} alt="Business team reviewing a modern software demonstration" width="1376" height="768" loading="lazy" decoding="async" />
          <Button>Book Free Demo</Button>
        </figure>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <main className="home-page">
      <Hero />
      <Challenges />
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
  return (
    <main className="page-main about-page">
      <section className="section about-simple">
        <figure className="about-single-image about-simple-visual">
          <img src={aboutTransformationImage} alt="Business leaders collaborating on transformation strategy in a modern office" width="1719" height="915" loading="lazy" decoding="async" />
        </figure>
        <div className="about-simple-copy">
          <h1>About Us</h1>
          <div className="about-text-stack">
            <p>Fekitech is a business transformation company dedicated to helping organisations build profitable, structured, and scalable businesses.</p>
            <p>We help companies move from operational chaos to clarity by strengthening seven critical areas: Business Structure, Human Capital, Operations, Digital Transformation, Business Intelligence, Profitability, and Customer Retention.</p>
            <p>We work to eliminate inefficiencies, reduce guesswork, and replace complexity with clear operational frameworks that improve decision-making, performance, and accountability.</p>
            <p>By combining strategy, systems, and data, we enable businesses to operate smarter, scale faster, and achieve long-term profitability with confidence and control.</p>
            <p>Through the Fekitech Operating System (FOS), we integrate people, processes, data, and technology to improve performance, increase profitability, and support sustainable growth.</p>
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

function ServicesPage() {
  const services = [
    ["Business Structure Design", "We define roles, responsibilities, workflows, ownership, and decision rhythms so the business can operate with clarity."],
    ["Digital Transformation", "We implement practical digital systems that reduce manual work, improve execution speed, and support better management."],
    ["Business Intelligence Architecture", "We design reporting systems, dashboards, and performance signals around the numbers leaders actually need."],
    ["Process Optimisation and Automation", "We map, simplify, and automate repeated workflows so teams spend less time on friction and more time on value."],
    ["Customer Retention Systems", "We improve follow-up, communication, customer experience, and feedback loops so customers stay longer."],
    ["Profitability Improvement", "We identify operational gaps, revenue leakage, cost waste, and margin pressure across the business."],
    ["Company Customised AI Agents", "We build AI agents tailored to your business that automate tasks, handle enquiries, and improve decision-making across your operations."],
    ["Workflow Automations (Operation Acceleration)", "We design and implement automation systems that remove manual work, speed up processes, and improve overall business efficiency."],
    ["Training (Staff, Personal & Career Development)", "We provide training programs to improve staff performance, develop individual skills, and support long-term career growth."],
    ["Software Development / Apps", "We create custom software and mobile/web applications designed to solve specific business problems and improve productivity."],
    ["Startup Mentorship", "We guide startups with strategy, product development, and business growth support to help them launch and scale successfully."],
    ["Career Development and Job Success", "We help you go from CV to job offer with a complete career system. We improve your CV, write strong personal statements, and create tailored cover letters to get more interviews. We build a focused job search strategy, provide interview coaching to improve your performance, and support you in negotiating better job offers."]
  ];

  return (
    <main className="page-main">
      <section className="section services-page-heading">
        <h1>Services</h1>
      </section>
      <section className="section service-list-section services-card-section">
        <h2 className="sr-only">Primary Services</h2>
        <div className="service-rows primary-service-rows">
          {services.slice(0, 6).map(([title, text], index) => (
            <article className="service-card" key={title}>
              <ServiceCardVisual index={index} />
              <span className="service-card-number">{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <h2 className="services-group-heading">Other Services</h2>
        <div className="service-rows other-service-rows">
          {services.slice(6).map(([title, text], index) => (
            <article className="service-card" key={title}>
              <ServiceCardVisual index={index + 6} />
              <span className="service-card-number">{String(index + 7).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
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
          <h2>Small Business Operating System Packages</h2>
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
          <h2>Business Transformation Packages</h2>
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
  const featuredArticle = {
    category: "Business Systems",
    title: "Why Most Businesses Are Not Profitable And How to Fix It with Structured Systems",
    excerpt: "Most businesses struggle with profitability because they lack clear systems, visibility, follow-up, and operational control. Learn how structured systems can improve performance.",
    readTime: "5 min read",
    href: "/blog/why-most-businesses-are-not-profitable"
  };

  return (
    <main className="page-main">
      <section className="section blog-editorial-section">
        <article className="blog-text-card blog-text-card-featured">
          <span className="blog-category">{featuredArticle.category}</span>
          <h1>{featuredArticle.title}</h1>
          <p>{featuredArticle.excerpt}</p>
          <div className="blog-card-footer">
            <span>{featuredArticle.readTime}</span>
            <a className="blog-read-link" href={featuredArticle.href}>
              Read article <ArrowRight size={17} />
            </a>
          </div>
        </article>
      </section>
    </main>
  );
}

function BlogArticlePage() {
  const sections = [
    ["The Real Reason Businesses Are Not Profitable", "Most businesses fail to make consistent profit because of:", ["No clear organisational structure", "Poor workflow and operations management", "Lack of financial and performance visibility", "Weak customer retention systems", "Decisions made without data"], "Without systems, a business becomes dependent on constant effort instead of predictable performance."],
    ["Why Customers Keep Leaving", "Customer retention is one of the biggest challenges in modern business. Businesses lose customers because:", ["There is no structured customer experience system", "Communication is inconsistent", "Service delivery is not standardised", "There is no data tracking customer behaviour"], "When customers cannot rely on consistency, they leave."],
    ["Why Structure Is More Important Than Effort", "Many business owners believe working harder will fix their problems. But in reality:", ["Structure creates profit", "Effort without systems creates burnout"], "A structured business knows: who does what, how work is done, how performance is measured, and how customers are managed. Without this, growth creates chaos instead of profit."],
    ["The Role of Digital Transformation", "Modern businesses must operate digitally. Digital transformation allows businesses to:", ["Automate processes", "Improve communication", "Track performance in real time", "Improve customer engagement", "Reduce operational inefficiencies"], "Businesses that ignore digital systems fall behind quickly."],
    ["What Is a Business Operating System?", "A Business Operating System is a structured framework that connects all parts of a business into one system. It includes:", ["Organisational structure", "Operations and workflows", "Digital systems", "Business intelligence and reporting"], "Instead of managing chaos, leaders manage a system."],
    ["Introducing the Fekitech Operating System (FOS)", "The Fekitech Operating System (FOS) is designed to solve these exact problems. FOS helps businesses:", ["Build clear structure and accountability", "Improve operational efficiency", "Implement digital transformation systems", "Gain real-time business intelligence", "Increase profitability and scalability"], "It turns unstructured businesses into structured, data-driven organisations."]
  ];

  return (
    <main className="page-main">
      <article className="article-page article-text-only">
        <header className="article-header">
          <span className="eyebrow">Blog</span>
          <h1>Why Most Businesses Are Not Profitable (And How to Fix It with Structured Systems)</h1>
          <p className="article-lead">
            Most businesses struggle with low profitability and poor customer retention due to weak systems and structure.
            Learn how to fix it using digital transformation and business operating systems.
          </p>
          <div className="article-meta">
            <span>Fekitech Insight</span>
            <span>5 min read</span>
          </div>
        </header>
        <h2>Introduction</h2>
        <p>Many business owners work hard every day, yet their businesses are still not profitable. Revenue may come in, but at the end of the month, there is little to no real profit.</p>
        <p>The problem is not effort — the problem is lack of structure, systems, and visibility.</p>
        <p>In today’s business environment, companies that do not operate with clear systems and digital intelligence struggle to survive, let alone grow.</p>
        {sections.map(([title, intro, bullets, closing], index) => (
          <section key={title}>
            <h2>{index + 1}. {title}</h2>
            <p>{intro}</p>
            <ul>{bullets.map((item) => <li key={item}>{item}</li>)}</ul>
            <p>{closing}</p>
          </section>
        ))}
        <section>
          <h2>7. Final Thought</h2>
          <p>If your business is not profitable or is losing customers, the issue is rarely effort.</p>
          <p>The real issue is lack of systems, structure, and visibility.</p>
          <p>Once these are fixed, growth becomes predictable, scalable, and sustainable.</p>
        </section>
        <div className="article-cta">
          <h2>Book a Free Business Audit with Fekitech</h2>
          <p>If you want to understand what is broken in your business and how to fix it:</p>
          <p>We help businesses build structure, improve profitability, and implement intelligent systems for growth. Explore our <a href="/services">business operations services</a>.</p>
          <Button>Book a Free Business Audit</Button>
        </div>
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
        <h1>Start Free Trial</h1>
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
          <img src={logoMark} alt="" width="654" height="658" />
          <h2>Contact Details</h2>
          <p>Phone: <a href="tel:+447352364942">+447352364942</a></p>
          <p>71-75, Shelton Street, Covent Garden, London, United Kingdom, WC2H 9JQ</p>
          <p>Email: <a href="mailto:info@contact.fekitech.co.uk">info@contact.fekitech.co.uk</a></p>
          <div className="socials">
            <a href="https://www.facebook.com/profile.php?id=61590753470491" aria-label="Facebook"><Facebook size={18} /></a>
            <a href="https://www.instagram.com/fekitech/" aria-label="Instagram"><Instagram size={18} /></a>
            <a href="https://www.tiktok.com/@fekitech" aria-label="TikTok"><TikTokIcon size={18} /></a>
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
          <img src={logoMark} alt="" width="654" height="658" />
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
        <h3>Contact</h3>
        <a href="tel:+447352364942">+447352364942</a>
        <a href="mailto:info@contact.fekitech.co.uk">info@contact.fekitech.co.uk</a>
        <span>71-75, Shelton Street, Covent Garden, London, United Kingdom, WC2H 9JQ</span>
      </div>
      <div className="footer-column">
        <h3>CTA</h3>
        <a href="/contact">Book an Audit</a>
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
      const countCounters = gsap.utils.toArray(".count-up");

      if (reduceMotion) {
        gsap.set(".section-intro, .challenge-card, .fos-node, .transform-roadmap article, .outcome-lane-card, .number-card, .simple-card-grid article, .method-steps article, .blog-list-card, .blog-card, .pricing-card, .about-simple-visual, .about-simple-copy, .mission-panel, .service-rows article, .blog-featured-copy, .blog-featured-image, .article-page section, .article-hero-image, .article-inline-image, .audit-form, .audit-side-card, .footer-column, .footer-brand", {
          opacity: 1,
          y: 0,
          scale: 1
        });
        countCounters.forEach((counter) => {
          const endValue = Number(counter.dataset.value);
          const hasDecimal = String(endValue).includes(".");
          counter.textContent = hasDecimal ? endValue.toFixed(1) : Math.round(endValue);
        });
        return;
      }

      const singleItems = gsap.utils.toArray(".section-intro, .outcomes-image, .page-image, .mission-panel, .about-simple-visual, .about-simple-copy, .blog-featured-copy, .blog-featured-image, .article-hero-image, .article-inline-image, .audit-form, .audit-side-card, .footer-brand");
      const batchItems = gsap.utils.toArray(".challenge-card, .fos-node, .transform-roadmap article, .outcome-lane-card, .number-card, .simple-card-grid article, .method-steps article, .blog-list-card, .blog-card, .pricing-card, .service-rows article, .article-page section, .footer-column");

      gsap.set([...singleItems, ...batchItems], { autoAlpha: 0, y: 30 });

      singleItems.forEach((item) => {
        gsap.to(item, {
          autoAlpha: 1,
          y: 0,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 85%", once: true }
        });
      });

      ScrollTrigger.batch(batchItems, {
        start: "top 85%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1.0, stagger: 0.1, ease: "power3.out" });
        }
      });

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
    <div ref={appRef}>
      <Header />
      <AppPage pathname={pathname} />
      <Footer />
    </div>
  );
}
