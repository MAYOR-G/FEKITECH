import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function ServiceFaq({ items, serviceTitle }) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="service-faq-list">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${baseId}-question-${index}`;
        const panelId = `${baseId}-answer-${index}`;
        return (
          <article className={`service-faq ${isOpen ? "is-open" : ""}`} key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
              >
                <span>{item.question}</span>
                <ChevronDown size={20} aria-hidden="true" />
              </button>
            </h3>
            <div
              id={panelId}
              className="service-faq__answer"
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
            >
              <p>{item.answer}</p>
            </div>
          </article>
        );
      })}
      <p className="sr-only">Frequently asked questions about {serviceTitle}</p>
    </div>
  );
}
