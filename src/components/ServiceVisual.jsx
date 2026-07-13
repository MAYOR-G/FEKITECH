import { Check, CircleDollarSign, Code2, Database, FileText, GraduationCap, Network, Sparkles, UserRoundCheck, UsersRound, Workflow } from "lucide-react";

const visualContent = {
  structure: { Icon: Network, label: "Operating structure", nodes: ["Leadership", "Operations", "Commercial", "Delivery"] },
  transformation: { Icon: Sparkles, label: "Digital operations", nodes: ["Customers", "Core systems", "Team workspace", "Reporting"] },
  intelligence: { Icon: Database, label: "Decision intelligence", nodes: ["Source data", "Quality rules", "KPI model", "Leadership view"] },
  process: { Icon: Workflow, label: "Optimised process", nodes: ["Request", "Review", "Automate", "Complete"] },
  retention: { Icon: UserRoundCheck, label: "Customer lifecycle", nodes: ["Onboard", "Support", "Listen", "Renew"] },
  profitability: { Icon: CircleDollarSign, label: "Profit drivers", nodes: ["Revenue", "Cost to serve", "Capacity", "Margin view"] },
  ai: { Icon: Sparkles, label: "Controlled AI agent", nodes: ["Approved knowledge", "Agent task", "Human review", "Monitored output"] },
  workflow: { Icon: Workflow, label: "Connected workflow", nodes: ["Trigger", "Business rules", "Approval", "System action"] },
  training: { Icon: GraduationCap, label: "Learning journey", nodes: ["Assess", "Practise", "Apply", "Reinforce"] },
  software: { Icon: Code2, label: "Product delivery", nodes: ["User need", "Prototype", "Build and test", "Supported release"] },
  startup: { Icon: UsersRound, label: "Founder roadmap", nodes: ["Customer", "Business model", "MVP", "Go to market"] },
  career: { Icon: FileText, label: "Career system", nodes: ["Direction", "Evidence", "Interview", "Offer decision"] }
};

export default function ServiceVisual({ service, compact = false }) {
  const { Icon, label, nodes } = visualContent[service.visual] || visualContent.structure;

  return (
    <figure
      className={`service-visual service-visual--${service.visual} ${compact ? "service-visual--compact" : ""}`}
      role="img"
      aria-label={service.visualAlt}
    >
      <div className="service-visual__topbar" aria-hidden="true">
        <span /><span /><span />
        <strong>{label}</strong>
      </div>
      <div className="service-visual__canvas" aria-hidden="true">
        <div className="service-visual__orbit service-visual__orbit--one" />
        <div className="service-visual__orbit service-visual__orbit--two" />
        <div className="service-visual__core">
          <Icon size={compact ? 28 : 38} strokeWidth={1.65} />
          <span>{label}</span>
        </div>
        <div className="service-visual__nodes">
          {nodes.map((node, index) => (
            <div className={`service-visual__node service-visual__node--${index + 1}`} key={node}>
              <Check size={14} strokeWidth={2.4} />
              <span>{node}</span>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="sr-only">{service.visualAlt}</figcaption>
    </figure>
  );
}
