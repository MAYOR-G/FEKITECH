import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { getRelatedServices } from "../serviceData.js";
import ServiceFaq from "./ServiceFaq.jsx";
import ServiceVisual from "./ServiceVisual.jsx";

const SectionHeading = ({ eyebrow, title, text }) => (
  <div className="service-section-heading">
    <span>{eyebrow}</span>
    <h2>{title}</h2>
    {text && <p>{text}</p>}
  </div>
);

export default function ServicePage({ service }) {
  const related = getRelatedServices(service);
  const variation = (servicePagesIndex(service) % 3) + 1;

  return (
    <main id="main-content" className={`service-detail service-detail--${variation}`}>
      <section className="service-hero" aria-labelledby="service-title">
        <div className="service-shell">
          <nav className="service-breadcrumb" aria-label="Breadcrumb">
            <ol>
              <li><a href="/">Home</a></li>
              <li><a href="/services">Services</a></li>
              <li aria-current="page">{service.title}</li>
            </ol>
          </nav>
          <div className="service-hero__grid">
            <div className="service-hero__copy">
              <span className="service-badge">{service.category}</span>
              <p className="service-hero__eyebrow">{service.eyebrow}</p>
              <h1 id="service-title">{service.heroTitle}</h1>
              <p className="service-hero__summary">{service.heroSummary}</p>
              <p className="service-hero__value">{service.valueProposition}</p>
              <div className="service-actions">
                <a className="service-button service-button--primary" href="/contact">Book a Free Business Audit <ArrowRight size={17} /></a>
                <a className="service-button service-button--text" href="#how-it-works">See how it works <ChevronRight size={17} /></a>
              </div>
            </div>
            <ServiceVisual service={service} />
          </div>
        </div>
      </section>

      <section className="service-overview service-section">
        <div className="service-shell service-overview__grid">
          <div>
            <span className="service-section-index">01 / Overview</span>
            <h2>{service.overview.title}</h2>
          </div>
          <div className="service-overview__copy">
            {service.overview.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <p className="service-overview__highlight">{service.overview.highlight}</p>
          </div>
        </div>
      </section>

      <section className="service-section service-problems">
        <div className="service-shell">
          <SectionHeading eyebrow="The situations we address" title="Problems this service is designed to solve" text="These are operational patterns we investigate with your team. The exact causes and priorities are established from evidence, not assumed in advance." />
          <div className="service-problem-list">
            {service.problems.map((problem, index) => (
              <article key={problem.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{problem.title}</h3><p>{problem.text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="service-section service-deliverables">
        <div className="service-shell service-deliverables__layout">
          <div className="service-deliverables__intro">
            <SectionHeading eyebrow="What Fekitech delivers" title="A working system, not a generic recommendation" text="The final scope is tailored after discovery. Typical outputs for this service include the following connected components." />
            <ServiceVisual service={service} compact />
          </div>
          <div className="service-deliverable-grid">
            {service.deliverables.map((item, index) => (
              <article key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="service-section service-process" id="how-it-works">
        <div className="service-shell">
          <SectionHeading eyebrow="How the service works" title="A clear route from discovery to useful implementation" text="The sequence changes with the service and scope, but every phase produces a decision, an output, or evidence needed for the next." />
          <ol className="service-process__timeline">
            {service.process.map((item) => (
              <li key={item.step}>
                <span>{item.step}</span>
                <div><h3>{item.title}</h3><p>{item.text}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="service-section service-capabilities">
        <div className="service-shell">
          <div className="service-capabilities__heading">
            <SectionHeading eyebrow="Key capabilities" title={`The practical building blocks behind ${service.title.toLowerCase()}`} />
            <p>Capabilities are selected and combined around your current state, operating risk, priorities, team capacity, and the change the organisation can sustain.</p>
          </div>
          <ul className="service-capability-grid">
            {service.capabilities.map((capability, index) => (
              <li key={capability}><span>{String(index + 1).padStart(2, "0")}</span>{capability}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="service-section service-use-cases">
        <div className="service-shell">
          <SectionHeading eyebrow="Suitable use cases" title="Where this work can be especially useful" text="These examples describe situations rather than invented client stories. We confirm suitability through a short initial conversation." />
          <div className="service-use-case-grid">
            {service.useCases.map((item, index) => (
              <article key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="service-section service-outcomes">
        <div className="service-shell service-outcomes__grid">
          <SectionHeading eyebrow="Business outcomes" title="What a stronger operating position can look like" text="The expected direction is agreed during scoping. We do not use fabricated percentages, guarantees, or unverified return claims." />
          <ul>
            {service.outcomes.map((outcome) => <li key={outcome}><Check size={19} /><span>{outcome}</span></li>)}
          </ul>
        </div>
      </section>

      <section className="service-section service-why">
        <div className="service-shell service-why__grid">
          <div>
            <span className="service-section-index">Why Fekitech</span>
            <h2>Structured thinking, practical implementation, and long-term usefulness</h2>
            <p>We connect strategy to the operating detail needed for a change to work: ownership, workflow, information, controls, adoption, measurement, and continued improvement.</p>
          </div>
          <ol>
            {service.why.map((reason, index) => (
              <li key={reason}><span>{String(index + 1).padStart(2, "0")}</span><p>{reason}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="service-section service-faq-section">
        <div className="service-shell service-faq-layout">
          <div className="service-faq-intro">
            <span className="service-section-index">Frequently asked questions</span>
            <h2>Useful answers before we discuss your scope</h2>
            <p>Still deciding whether this service fits? Book a free call and we will help you identify the right next step without forcing a predetermined solution.</p>
            <a href="/contact">Ask Fekitech about this service <ArrowRight size={17} /></a>
          </div>
          <ServiceFaq items={service.faqs} serviceTitle={service.title} />
        </div>
      </section>

      <aside className="service-section service-related" aria-labelledby="related-services-title">
        <div className="service-shell">
          <div className="service-related__heading">
            <div><span className="service-section-index">Related services</span><h2 id="related-services-title">Continue building the system</h2></div>
            <a href="/services">View all services <ArrowRight size={17} /></a>
          </div>
          <div className="service-related__grid">
            {related.map((item) => (
              <a href={`/services/${item.slug}`} key={item.slug}>
                <span>{item.category}</span><h3>{item.title}</h3><p>{item.heroSummary}</p><strong>Explore service <ArrowRight size={16} /></strong>
              </a>
            ))}
          </div>
        </div>
      </aside>

      <section className="service-final-cta" aria-labelledby="service-final-cta-title">
        <div className="service-shell service-final-cta__inner">
          <span>Start with clarity</span>
          <h2 id="service-final-cta-title">Let’s identify the system your next stage of progress requires</h2>
          <p>Tell us what is slowing the business down, what you need to improve, and what has already been tried. We will use the first conversation to clarify the most useful next step.</p>
          <a className="service-button service-button--primary" href="/contact">Book a Free Business Audit <ArrowRight size={18} /></a>
        </div>
      </section>
    </main>
  );
}

function servicePagesIndex(service) {
  const order = ["structure", "transformation", "intelligence", "process", "retention", "profitability", "ai", "workflow", "training", "software", "startup", "career"];
  return order.indexOf(service.visual);
}
