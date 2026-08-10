const servicePath = (slug) => `/services/${slug}`;

export const servicePages = [
  {
    title: "Business Structure Design",
    slug: "business-structure-design",
    category: "Operating model",
    eyebrow: "Structure before scale",
    heroTitle: "Build a business that does not depend on constant founder intervention",
    heroSummary: "We define roles, reporting lines, decision rights, operating procedures, and accountability rhythms so work moves with clarity as the organisation grows.",
    valueProposition: "A practical operating structure gives people enough clarity to act, leaders enough visibility to guide, and the business a repeatable way to deliver.",
    overview: {
      title: "Turn informal ways of working into a dependable operating system",
      paragraphs: [
        "Growth exposes every ambiguity in a business. Responsibilities that once lived in the founder’s head become unclear, teams create their own versions of a process, and decisions wait for the same few people. Business structure design replaces that uncertainty with a working model people can use every day.",
        "Fekitech studies how work currently enters, moves through, and leaves the organisation. We then shape roles, ownership, reporting relationships, standard operating procedures, and management routines around the real work—not around a generic organisational chart."
      ],
      highlight: "The result is not paperwork for its own sake. It is an operating structure that helps people know what they own, when to escalate, and how good performance is reviewed."
    },
    problems: [
      { title: "Overlapping responsibilities", text: "Several people touch the same task, but nobody is clearly accountable for completing it or checking the result." },
      { title: "Founder bottlenecks", text: "Routine approvals and operational questions continually return to the founder or senior leader, slowing decisions and limiting strategic focus." },
      { title: "Inconsistent delivery", text: "Teams rely on personal memory and informal handovers, so customer experience and output quality change from one person to another." },
      { title: "Unclear reporting lines", text: "People do not know who sets priorities, where progress is reported, or how issues should move through the organisation." }
    ],
    deliverables: [
      { title: "Organisational structure", text: "A role-based structure showing teams, reporting relationships, management spans, and the purpose of each operating area." },
      { title: "Role and decision framework", text: "Clear responsibilities, decision rights, approval levels, hand-off points, and escalation paths for important work." },
      { title: "SOP and workflow library", text: "Prioritised procedures for recurring activities, written in a usable format with owners, inputs, steps, controls, and expected outputs." },
      { title: "Accountability rhythm", text: "Meeting, reporting, and review routines that help leaders track commitments, resolve blockers, and reinforce ownership." }
    ],
    process: [
      { step: "01", title: "Operating discovery", text: "Interview leaders and team members, review existing documents, and observe how work and decisions currently move." },
      { step: "02", title: "Responsibility mapping", text: "Identify duplicated ownership, unowned work, approval delays, skill gaps, and critical dependencies." },
      { step: "03", title: "Structure design", text: "Design roles, reporting lines, decision authority, workflows, and the management cadence around business priorities." },
      { step: "04", title: "Documentation and rollout", text: "Create practical role profiles and SOPs, brief the team, and support leaders as the new model goes live." },
      { step: "05", title: "Review and refine", text: "Test the structure against real work, resolve points of friction, and adjust responsibilities as the organisation learns." }
    ],
    capabilities: ["Role scorecards", "Organisation charts", "Decision-right matrices", "Standard operating procedures", "Reporting-line design", "Meeting and review cadence"],
    useCases: [
      { title: "Founder-led businesses", text: "The founder has become the default answer to every question and needs a structure that distributes responsibility without losing control." },
      { title: "Growing teams", text: "New hires and managers are joining faster than roles, procedures, and reporting relationships can be clarified." },
      { title: "Operational reset", text: "A reorganisation, leadership change, merger, or service expansion requires a clear model for how the new organisation will work." }
    ],
    outcomes: ["Clear ownership for recurring work and business priorities", "Faster decisions at the appropriate level", "More consistent handovers and service delivery", "Better leadership visibility without constant intervention"],
    why: [
      "We design around the work your business actually performs, not a template hierarchy.",
      "Structure, workflow, measures, and management routines are designed together so they reinforce one another.",
      "Documents are written for daily use and supported through implementation, not delivered as a static report.",
      "The model remains practical enough to operate now and adaptable enough to support the next stage of growth."
    ],
    faqs: [
      { question: "Is business structure design the same as creating an organisation chart?", answer: "No. An organisation chart is one output. The engagement also defines responsibilities, decision rights, workflows, standard procedures, reporting expectations, and the management routines needed to make the structure work." },
      { question: "Can you improve our existing structure rather than replace it?", answer: "Yes. We first assess what already works. We retain useful roles and routines, then address unclear ownership, duplicated work, weak handovers, or decision bottlenecks without creating unnecessary disruption." },
      { question: "Do you write standard operating procedures?", answer: "Yes. We prioritise the processes that carry the most operational risk or value, then document owners, inputs, steps, controls, outputs, and review points in a format the team can maintain." },
      { question: "How involved should our team be?", answer: "Leaders provide direction, while the people doing the work help us understand practical detail and test proposed workflows. That involvement improves accuracy and makes adoption easier." },
      { question: "Can the structure support future recruitment?", answer: "Yes. Role profiles, capability gaps, reporting lines, and workload assumptions can be used to decide which roles should be recruited, developed, combined, or deferred." }
    ],
    related: ["process-optimisation-and-automation", "digital-transformation", "profitability-improvement"],
    visual: "structure",
    visualAlt: "Organisational structure diagram showing clear teams, reporting lines, and decision connections",
    metaTitle: "Business Structure Design Services | Fekitech",
    metaDescription: "Clarify roles, reporting lines, SOPs and accountability with practical business structure design. Book a free Fekitech business audit."
  },
  {
    title: "Customer Retention Systems",
    slug: "customer-retention-systems",
    category: "Customer operations",
    eyebrow: "Manage the full customer lifecycle",
    heroTitle: "Build consistent follow-up and customer care into the way your business works",
    heroSummary: "We design CRM workflows, communication routines, feedback loops, support processes, and re-engagement systems that help teams protect valuable customer relationships.",
    valueProposition: "Retention improves when the organisation knows what each customer needs next, who owns the action, and how warning signals are handled before the relationship is lost.",
    overview: {
      title: "Move from reactive customer contact to a managed lifecycle",
      paragraphs: [
        "Customers often leave through accumulated gaps rather than one dramatic failure: an onboarding step is missed, a support issue is not followed through, nobody notices reduced engagement, or renewal conversations start too late. When customer knowledge is fragmented, teams respond after the risk has already grown.",
        "Fekitech maps the lifecycle from first commitment through onboarding, service, support, renewal, loyalty, and re-engagement. We define the information, ownership, triggers, communication, and review practices needed to keep customer care visible and consistent."
      ],
      highlight: "The system supports genuine customer relationships. Automation organises timely action, while people remain responsible for judgement, empathy, and resolving meaningful issues."
    },
    problems: [
      { title: "Inconsistent follow-up", text: "Important check-ins depend on individual memory, so some customers receive attention while others quietly disengage." },
      { title: "Fragmented customer history", text: "Sales, delivery, support, billing, and feedback information sits in different places, preventing a complete view of the relationship." },
      { title: "Late churn signals", text: "Reduced usage, complaints, delayed payments, or missed milestones are noticed only when the customer decides not to continue." },
      { title: "Unclosed feedback loops", text: "Feedback is collected but not assigned, analysed, communicated, or translated into service improvements." }
    ],
    deliverables: [
      { title: "Customer lifecycle map", text: "Stages, expectations, key moments, risk signals, communication needs, owners, and success criteria across the relationship." },
      { title: "CRM workflow design", text: "Fields, stages, tasks, reminders, ownership, segmentation, and automation rules that support consistent customer management." },
      { title: "Retention playbooks", text: "Practical routines for onboarding, check-ins, issue recovery, renewal, loyalty, re-engagement, and appropriate escalation." },
      { title: "Customer health reporting", text: "A focused view of engagement, service issues, feedback, renewals, and follow-up actions for team and leadership review." }
    ],
    process: [
      { step: "01", title: "Lifecycle discovery", text: "Map customer segments, current touchpoints, service expectations, systems, responsibilities, and known reasons relationships weaken." },
      { step: "02", title: "Journey and risk assessment", text: "Identify moments that shape confidence, gaps in follow-up, warning signals, and failure points between departments." },
      { step: "03", title: "Retention system design", text: "Define lifecycle stages, CRM logic, ownership, communications, playbooks, feedback loops, and customer health measures." },
      { step: "04", title: "Configure and enable", text: "Set up workflows, templates, alerts, views, and training, then test realistic customer journeys and exceptions." },
      { step: "05", title: "Review customer health", text: "Establish regular retention reviews, improve weak touchpoints, and adjust rules using customer and team evidence." }
    ],
    capabilities: ["Customer journey mapping", "CRM workflow design", "Onboarding and renewal", "Feedback and support loops", "Re-engagement campaigns", "Customer health visibility"],
    useCases: [
      { title: "Recurring relationships", text: "Subscription, membership, retainer, maintenance, or account-based businesses need structured engagement before renewal." },
      { title: "Repeat-purchase businesses", text: "The organisation has useful customer history but lacks a coordinated way to support, segment, and re-engage past buyers." },
      { title: "Multi-team customer journeys", text: "Sales, operations, finance, and support all influence the relationship, but their handovers and customer records are disconnected." }
    ],
    outcomes: ["More consistent onboarding, follow-up, and relationship ownership", "Earlier visibility of dissatisfaction or disengagement signals", "Better coordination between sales, delivery, support, and finance", "A repeatable basis for loyalty, renewal, and responsible re-engagement"],
    why: [
      "We design retention around the complete customer experience, not only marketing messages.",
      "CRM configuration follows agreed lifecycle stages and team responsibilities, so the system supports the real operation.",
      "Customer communications are timely and relevant, with human intervention where context or care matters.",
      "Leadership receives practical customer-health visibility without relying on invented scores or unsupported predictions."
    ],
    faqs: [
      { question: "Do we need a CRM before starting?", answer: "No. We can first define the lifecycle, responsibilities, information, and required workflows, then configure an existing CRM or help select an appropriate platform if one is needed." },
      { question: "Can you improve customer onboarding as part of retention?", answer: "Yes. Onboarding establishes expectations and early confidence, so it is often a priority. We can design steps, owners, information collection, milestone communication, support routes, and completion visibility." },
      { question: "How do you identify customers at risk?", answer: "We use signals the business can observe responsibly, such as unresolved issues, missed milestones, reduced engagement, late payments, negative feedback, or approaching renewal without recent contact. The exact signals depend on the service model." },
      { question: "Will customer messages feel automated?", answer: "The workflow can automate timing and administration while preserving appropriate personal contact. We define where a template is helpful and where a team member should review context and respond directly." },
      { question: "Can this work across sales and customer support?", answer: "Yes. Retention depends on shared ownership. We design handovers, records, alerts, responsibilities, and review routines that connect every team involved in the customer relationship." }
    ],
    related: ["digital-transformation", "workflow-automations", "business-intelligence-architecture"],
    visual: "retention",
    visualAlt: "Customer lifecycle visual linking onboarding, support, feedback, renewal, and re-engagement stages",
    metaTitle: "Customer Retention Systems | Fekitech",
    metaDescription: "Improve CRM follow-up, feedback, support, renewal and re-engagement with practical customer retention systems from Fekitech. Book a free call."
  },
  {
    title: "Profitability Improvement",
    slug: "profitability-improvement",
    category: "Commercial performance",
    eyebrow: "Make profit drivers visible",
    heroTitle: "Find where value is leaking and build a practical plan to improve profit",
    heroSummary: "We connect financial and operational evidence to examine pricing, margins, cost behaviour, resource use, revenue leakage, KPI visibility, and the processes behind commercial performance.",
    valueProposition: "Profitability becomes manageable when leaders can see which activities create value, which consume it, and which operational changes deserve priority.",
    overview: {
      title: "Understand the operational causes behind the financial result",
      paragraphs: [
        "A business can be busy, growing, and still struggle to convert revenue into sustainable profit. Pricing may not reflect delivery effort, discounts may be uncontrolled, costly rework may be hidden, capacity may be allocated poorly, or revenue may be lost between quote, delivery, invoice, and collection.",
        "Fekitech combines commercial analysis with process evidence. We clarify revenue and cost drivers, examine how work is sold and delivered, identify leakage and waste, and build an improvement plan with owners, measures, KPI dashboards where useful, and realistic sequencing."
      ],
      highlight: "We do not promise a fabricated percentage or a quick financial cure. We create clearer margin visibility and support disciplined changes that the business can test and sustain."
    },
    problems: [
      { title: "Weak margin visibility", text: "Leaders see total revenue and cost but cannot reliably compare profitability by service, customer type, channel, project, or operating activity." },
      { title: "Revenue leakage", text: "Unbilled work, weak scope control, avoidable discounts, delayed invoicing, missed renewals, or poor collection practices reduce realised value." },
      { title: "Operational waste", text: "Rework, waiting, underused capacity, duplicated software, inefficient purchasing, and poor scheduling absorb resources without improving customer value." },
      { title: "Unclear pricing logic", text: "Prices evolved through habit or competitor comparison and no longer reflect cost-to-serve, positioning, complexity, risk, or required margin." }
    ],
    deliverables: [
      { title: "Profit-driver assessment", text: "A structured view of revenue, direct and indirect cost, capacity, pricing, service mix, process waste, and leakage points." },
      { title: "Margin and performance model", text: "Decision-ready views that connect financial measures to relevant services, customers, channels, projects, or operational drivers." },
      { title: "Improvement portfolio", text: "Prioritised actions covering pricing, scope, process, capacity, cost, leakage, and performance management with owners and dependencies." },
      { title: "Performance review system", text: "A practical set of indicators and review routines for tracking decisions, implementation progress, trade-offs, and emerging risks." }
    ],
    process: [
      { step: "01", title: "Commercial discovery", text: "Understand the business model, offers, customers, pricing, delivery operation, financial data, constraints, and current priorities." },
      { step: "02", title: "Driver analysis", text: "Examine margin, cost-to-serve, leakage, capacity, waste, mix, and operational causes using available evidence." },
      { step: "03", title: "Improvement design", text: "Develop options, assess customer and operational implications, and prioritise initiatives by value, risk, effort, and dependency." },
      { step: "04", title: "Implementation support", text: "Introduce agreed pricing, process, control, allocation, or reporting changes with clear ownership and communication." },
      { step: "05", title: "Measure and adjust", text: "Review commercial and operational signals, validate assumptions, and refine actions without overstating early results." }
    ],
    capabilities: ["Revenue-leakage review", "Margin visibility", "Pricing structure", "Cost and waste analysis", "Resource allocation", "Profit improvement planning"],
    useCases: [
      { title: "Growing revenue, flat profit", text: "Sales have increased but delivery complexity, discounting, staffing, or overhead has expanded faster than retained value." },
      { title: "Service and project businesses", text: "The organisation needs clearer cost-to-serve, utilisation, scope, write-off, and project-margin visibility." },
      { title: "Commercial reset", text: "A new market, offer, cost environment, or business stage requires pricing and resource decisions based on current evidence." }
    ],
    outcomes: ["Clearer understanding of the operational drivers of margin", "Better prioritisation of waste and leakage reduction activity", "More deliberate pricing, scope, and resource decisions", "A repeatable management rhythm for commercial performance"],
    why: [
      "We connect financial outputs to the processes, choices, and behaviours that leaders can actually change.",
      "Recommendations consider customer value, delivery capacity, cash, operational risk, and implementation effort together.",
      "Improvement initiatives include owners and measures so progress can be reviewed rather than assumed.",
      "Claims remain grounded in the available evidence; we do not manufacture forecasts, guarantees, or benchmark results."
    ],
    faqs: [
      { question: "Is this an accounting or tax service?", answer: "No. We focus on operational and commercial profitability: pricing, cost-to-serve, process waste, capacity, revenue leakage, resource allocation, and performance visibility. Specialist accounting or tax advice remains with appropriately qualified advisers." },
      { question: "What information do you need?", answer: "We agree a proportionate evidence list, which may include management accounts, sales and pricing data, service mix, project or time records, process information, software costs, workload, capacity, and interviews with relevant owners." },
      { question: "Can you help us review pricing?", answer: "Yes. We examine value proposition, segments, cost-to-serve, complexity, discounting, packaging, delivery constraints, and operational implications, then help design a clearer structure and implementation approach." },
      { question: "Do you guarantee a profit increase?", answer: "No. Outcomes depend on starting conditions, data quality, market behaviour, decisions, and execution. We provide evidence-led analysis, a practical plan, implementation support, and measures for evaluating progress." },
      { question: "Can the work focus on one service line?", answer: "Yes. A service, product, customer segment, channel, or process can be assessed as a defined first scope when the supporting data and shared-cost assumptions are understood." }
    ],
    related: ["business-intelligence-architecture", "process-optimisation-and-automation", "business-structure-design"],
    visual: "profitability",
    visualAlt: "Profitability planning visual connecting revenue, pricing, delivery cost, margin, and resource decisions",
    metaTitle: "Profitability Improvement Services UK | Fekitech",
    metaDescription: "Improve profit with revenue leakage review, margin visibility, KPI reporting and practical operational changes. Request a Fekitech audit.",
    lastModified: "2026-08-10"
  },
  {
    title: "Company Customised AI Agents",
    slug: "company-customised-ai-agents",
    category: "Applied artificial intelligence",
    eyebrow: "AI designed around your operation",
    heroTitle: "Deploy useful AI agents with clear knowledge, controls, and human oversight",
    heroSummary: "We design company-specific assistants and agents for knowledge retrieval, support, research, reporting, and workflow tasks—integrated with the systems and approvals your operation requires.",
    valueProposition: "A reliable company AI agent needs a defined job, governed information, permission boundaries, evaluation, monitoring, and a clear route to a person when judgement is required.",
    overview: {
      title: "Move beyond generic chat to a controlled operational capability",
      paragraphs: [
        "General AI tools can be useful, but they do not automatically understand company policy, live business context, required approvals, or the consequences of an incorrect action. A customised agent must be designed as part of an operating process, not added as an isolated chatbot.",
        "Fekitech identifies suitable use cases, prepares the knowledge and integrations, defines instructions and permission boundaries, builds evaluation scenarios, and designs human review. We also plan logging, monitoring, change control, security, and support before the agent handles important work."
      ],
      highlight: "We keep responsibility visible. The agent supports approved tasks, while named people remain accountable for sensitive decisions, exceptions, and changes to its operating scope."
    },
    problems: [
      { title: "Knowledge is hard to find", text: "Staff spend time searching policies, procedures, product details, project records, and previous answers across scattered repositories." },
      { title: "Repetitive service queries", text: "Support teams repeatedly answer well-defined questions but still need a safe route for unusual, sensitive, or high-impact cases." },
      { title: "Uncontrolled AI use", text: "Employees use general tools without consistent information, privacy rules, prompt guidance, quality checks, or an approved operating boundary." },
      { title: "Manual information synthesis", text: "Research, status summaries, report drafts, and document review consume time even when source material and required format are known." }
    ],
    deliverables: [
      { title: "Agent use-case design", text: "Defined users, jobs, inputs, tools, boundaries, risks, approvals, outputs, fallback routes, and measures of usefulness." },
      { title: "Knowledge and integration layer", text: "Prepared company content, retrieval logic, connected systems, permissions, source references, and update responsibilities." },
      { title: "Agent experience", text: "Instructions, conversation or task flow, structured outputs, approval checkpoints, escalation, and a suitable user interface." },
      { title: "Evaluation and operations", text: "Test scenarios, acceptance criteria, monitoring, logs, feedback, incident handling, change control, and ongoing review." }
    ],
    process: [
      { step: "01", title: "Use-case and risk discovery", text: "Select a valuable, bounded job and assess users, data, systems, decisions, privacy, failure impact, and human responsibility." },
      { step: "02", title: "Knowledge preparation", text: "Identify trusted sources, improve structure and access, define permissions, and establish content ownership and update rules." },
      { step: "03", title: "Agent and control design", text: "Design instructions, tools, retrieval, outputs, approval points, escalation, logs, and security boundaries." },
      { step: "04", title: "Build and evaluate", text: "Develop the agent, test routine and adversarial scenarios, review output quality, and correct failure patterns before release." },
      { step: "05", title: "Launch and monitor", text: "Introduce the agent to a controlled user group, monitor behaviour and usage, collect feedback, and expand scope only when justified." }
    ],
    capabilities: ["Internal knowledge assistants", "Customer support agents", "Research and synthesis agents", "Reporting agents", "Workflow and tool agents", "Human approval and monitoring"],
    useCases: [
      { title: "Internal knowledge support", text: "Employees need sourced answers from approved policies, procedures, technical documents, service information, or project knowledge." },
      { title: "Customer assistance", text: "A defined set of customer questions can be answered consistently, with authentication, escalation, and human support where appropriate." },
      { title: "Operational task support", text: "Staff need help collecting information, drafting structured outputs, updating systems, or coordinating repeatable workflows under approval." }
    ],
    outcomes: ["Faster access to approved company knowledge with source visibility", "More consistent handling of suitable repetitive questions and tasks", "Clearer human control over AI-assisted decisions and actions", "A monitored foundation for expanding AI use responsibly"],
    why: [
      "We start with a bounded operational job and its risk, not with the technology demonstration.",
      "Knowledge, permissions, integrations, user experience, evaluation, and operating ownership are designed together.",
      "Human approval and escalation are explicit wherever consequences or uncertainty require judgement.",
      "The agent is monitored after launch, with evidence used to improve or constrain its scope."
    ],
    faqs: [
      { question: "What makes an AI agent customised to our company?", answer: "Its job, instructions, approved knowledge, system connections, permissions, output formats, controls, escalation routes, and evaluation cases are designed around your operation rather than a general public conversation." },
      { question: "Can the agent use our internal documents?", answer: "Yes, where access is authorised and appropriate. We identify trusted sources, permissions, confidentiality needs, update ownership, and retrieval methods so the agent can reference approved information." },
      { question: "Will an AI agent make decisions without people?", answer: "Not by default. We define which actions can be automated, which require confirmation, and which must always be handled by a responsible person. Higher-impact decisions need stronger control." },
      { question: "How do you test accuracy and safety?", answer: "We create representative and difficult scenarios, define acceptance criteria, inspect sources and outputs, test permissions and escalation, monitor real usage, and maintain a process for correcting failures." },
      { question: "Can the agent integrate with our CRM or other tools?", answer: "Potentially, subject to the systems’ APIs, permissions, security, data quality, and the risk of each action. Integrations are scoped with least-privilege access and appropriate confirmation and logging." },
      { question: "Do you provide ongoing monitoring?", answer: "Yes. Ongoing support can include usage and failure review, knowledge updates, prompt and workflow changes, evaluation regression checks, access review, and controlled capability expansion." }
    ],
    related: ["workflow-automations", "software-development-apps", "digital-transformation"],
    visual: "ai",
    visualAlt: "Custom company AI agent interface connected to approved knowledge, business tools, and human controls",
    metaTitle: "Company Customised AI Agents | Fekitech",
    metaDescription: "Design secure company AI agents for knowledge, support, research, reporting and workflows with human controls. Book a free Fekitech call."
  },
  {
    title: "Workflow Automations (Operation Acceleration)",
    slug: "workflow-automations",
    category: "Connected operations",
    eyebrow: "Connect work across systems",
    heroTitle: "Workflow automation services for UK businesses that need work to move without manual chasing",
    heroSummary: "We design business workflow software, integrations and trigger-based workflows for data movement, notifications, approvals, email, CRM activity, document handling, and cross-system execution.",
    valueProposition: "Well-designed workflow automation removes administrative delay while keeping ownership, approvals, logs, and exception handling visible.",
    overview: {
      title: "Create dependable execution between the systems you already use",
      paragraphs: [
        "A UK business may have capable tools and still operate slowly because people must bridge every gap. They copy lead details into a CRM, chase approvals in chat, rename and route documents, send routine updates, or reconcile status across several platforms.",
        "Fekitech designs workflow automation services and business workflow software around those repeated handoffs. We define triggers, data mapping, business rules, actions, approvals, notifications, logs, and recovery so the automation is documented, owned, and maintainable as tools and processes change."
      ],
      highlight: "Acceleration does not mean removing control. The workflow can move routine work instantly while pausing at the exact points where a person needs to review, decide, or communicate."
    },
    problems: [
      { title: "Manual system bridging", text: "Employees copy the same record between forms, spreadsheets, CRM, finance, project, and communication tools." },
      { title: "Approval delays", text: "Requests wait in inboxes without status, reminders, delegated authority, or a clear route when an approver is unavailable." },
      { title: "Missed notifications", text: "Teams learn about a new lead, signed document, overdue task, support risk, or payment event later than they should." },
      { title: "Document administration", text: "Files must be collected, checked, renamed, stored, routed, extracted, and recorded through repetitive manual steps." }
    ],
    deliverables: [
      { title: "Automation opportunity map", text: "A prioritised view of cross-system tasks based on frequency, value, stability, data, risk, effort, and maintainability." },
      { title: "Workflow specification", text: "Triggers, conditions, data mappings, actions, approvals, notifications, credentials, logging, errors, and recovery responsibilities." },
      { title: "Built integrations", text: "Configured and tested workflows using suitable native automation, integration platforms, APIs, or custom connectors." },
      { title: "Operating documentation", text: "Workflow diagrams, ownership, credential handling, monitoring, support steps, change notes, and a backlog for future automation." }
    ],
    process: [
      { step: "01", title: "Workflow inventory", text: "Identify repeated cross-system work, delays, error patterns, rules, volumes, and the people currently acting as the bridge." },
      { step: "02", title: "Prioritise and design", text: "Select suitable workflows and define the clean process, trigger, data, control points, exception paths, and ownership." },
      { step: "03", title: "Build integrations", text: "Configure native connections, automation platforms, APIs, webhooks, or custom logic appropriate to the environment." },
      { step: "04", title: "Test end to end", text: "Validate data, permissions, timing, duplicates, failures, unusual cases, approvals, notifications, and recovery." },
      { step: "05", title: "Release and monitor", text: "Launch in stages, document support, monitor runs and errors, and refine the workflow as real usage develops." }
    ],
    capabilities: ["Business workflow software design", "System and API integrations", "Automated data movement", "Approval and notification flows", "Email and CRM automation", "Document processing", "Trigger-based operational actions"],
    useCases: [
      { title: "Lead-to-delivery flow", text: "New enquiries need qualification, CRM creation, assignment, reminders, proposal activity, project setup, and customer communication." },
      { title: "Approval and request flow", text: "Purchasing, expenses, contracts, content, access, or operational requests need controlled routing and visible status." },
      { title: "Document-to-system flow", text: "Forms, attachments, signed documents, invoices, or reports need validation, storage, extraction, routing, and record updates." }
    ],
    outcomes: ["Faster execution between departments and software platforms", "Less duplicated data entry and fewer avoidable transfer errors", "Clearer approval status, notifications, and operational ownership", "Consistent workflows with logs and defined recovery routes"],
    why: [
      "We clean up the underlying workflow and data before connecting tools.",
      "Automation design includes permissions, duplicate prevention, error handling, monitoring, and human approval—not only the happy path.",
      "We use the simplest maintainable integration approach that meets the business need and risk level.",
      "Documentation and ownership help the workflow remain operable after platforms, staff, or rules change."
    ],
    faqs: [
      { question: "Which tools can you connect?", answer: "We can assess systems with native integrations, webhooks, APIs, database access, secure file exchange, or supported automation connectors. Feasibility depends on each platform’s capabilities, permissions, and data quality." },
      { question: "How is workflow automation different from process optimisation?", answer: "Workflow automation focuses on executing actions between tools and people. Process optimisation may also change roles, approvals, sequence, policies, and service design. A workflow should be simplified before it is automated." },
      { question: "Can approvals remain manual?", answer: "Yes. The system can prepare and route the request, provide context, remind the approver, record the decision, and trigger the next actions while keeping the actual approval with an authorised person." },
      { question: "What happens if a connected service is unavailable?", answer: "We design appropriate logging, retries, alerts, queues, fallback steps, and ownership. The exact recovery approach depends on the operational impact and capabilities of the connected systems." },
      { question: "Can you take over automations we already have?", answer: "Yes. We can inventory existing workflows, review ownership and credentials, identify duplication or failure risk, improve documentation, correct fragile logic, and plan a controlled handover." }
    ],
    related: ["process-optimisation-and-automation", "company-customised-ai-agents", "digital-transformation"],
    visual: "workflow",
    visualAlt: "Workflow automation visual showing connected apps, triggers, approvals, notifications, and data movement",
    metaTitle: "Workflow Automation Services UK | Business Workflow Software",
    metaDescription: "Workflow automation services and business workflow software for UK SMEs. Connect apps, approvals, CRM, email, documents and data handoffs.",
    lastModified: "2026-08-10"
  },
  {
    title: "Digital Transformation",
    slug: "digital-transformation",
    category: "Digital operations",
    eyebrow: "Modernise with purpose",
    heroTitle: "Replace disconnected manual systems with digital operations your team can use",
    heroSummary: "We modernise processes, centralise essential data, connect practical tools, and plan adoption so technology improves the way the business operates.",
    valueProposition: "Digital transformation works when process, technology, data, and people change together. We turn that principle into an achievable implementation plan.",
    overview: {
      title: "Move from scattered tools to a coherent digital operating environment",
      paragraphs: [
        "Many businesses have added software over time without redesigning the work around it. Information becomes trapped in inboxes and spreadsheets, teams maintain duplicate records, and managers cannot see one reliable version of operational performance.",
        "Fekitech begins with the business outcome and the current workflow. We identify which processes need simplification, which information should be centralised, which tools should be connected or replaced, and how the change can be introduced without overwhelming the team."
      ],
      highlight: "The aim is not to buy more software. It is to create a simpler digital operation with clearer ownership, better information, and a realistic path to adoption."
    },
    problems: [
      { title: "Disconnected records", text: "Customer, financial, project, and operational information sits in separate tools, making reconciliation slow and unreliable." },
      { title: "Manual administration", text: "Teams repeatedly type, copy, chase, and reformat information that could move through a controlled digital workflow." },
      { title: "Poor collaboration", text: "Work status is hidden in private inboxes or local spreadsheets, so colleagues cannot coordinate or cover one another effectively." },
      { title: "Low tool adoption", text: "Previous software launches focused on configuration but not process design, role clarity, training, or day-to-day support." }
    ],
    deliverables: [
      { title: "Transformation roadmap", text: "A phased plan connecting business priorities to process changes, technology decisions, data requirements, ownership, and adoption activity." },
      { title: "Digital process design", text: "Future-state workflows showing how tasks, information, controls, and handovers should operate across the selected tools." },
      { title: "Tool and integration plan", text: "Practical recommendations for the systems to retain, configure, connect, consolidate, migrate, or retire." },
      { title: "Adoption programme", text: "Role-based training, launch communications, support materials, feedback routes, and measures for sustained use." }
    ],
    process: [
      { step: "01", title: "Digital maturity review", text: "Assess current processes, technology, data, team behaviours, risks, and leadership priorities." },
      { step: "02", title: "Opportunity design", text: "Select high-value use cases and define the future workflow before choosing or configuring technology." },
      { step: "03", title: "Roadmap and architecture", text: "Sequence platforms, integrations, data migration, controls, ownership, and change activity into manageable phases." },
      { step: "04", title: "Implementation", text: "Configure and connect the agreed systems, migrate prioritised information, test workflows, and prepare users." },
      { step: "05", title: "Adoption and optimisation", text: "Support teams after launch, monitor usage and issues, and improve the operation based on evidence." }
    ],
    capabilities: ["Digital maturity assessment", "Process modernisation", "Cloud and SaaS planning", "Data centralisation", "Collaboration systems", "Adoption and training"],
    useCases: [
      { title: "Spreadsheet-dependent operations", text: "Important work is coordinated through shared files and email, creating version problems, manual chasing, and weak control." },
      { title: "Tool consolidation", text: "The business pays for overlapping platforms and needs a clearer, connected technology landscape." },
      { title: "Scaling service delivery", text: "A growing customer or transaction volume requires dependable digital workflows rather than more administrative effort." }
    ],
    outcomes: ["A clearer source of truth for essential operational information", "Less repeated administration and fewer avoidable hand-off errors", "Improved collaboration across locations and functions", "A scalable digital foundation supported by confident users"],
    why: [
      "We start with operating needs and measurable decisions before recommending technology.",
      "Process, data, integration, security, ownership, and adoption are treated as one transformation problem.",
      "The roadmap is prioritised so the organisation can make progress without attempting a disruptive big-bang change.",
      "Implementation support continues through testing, training, launch, and early optimisation."
    ],
    faqs: [
      { question: "Do we need to replace all our existing software?", answer: "Usually not. We assess what is useful, what is duplicated, and what creates operational risk. The plan may retain and better configure existing tools, connect them, or replace only the parts that no longer serve the business." },
      { question: "Can you help us choose digital tools?", answer: "Yes. We define requirements from the future process, compare suitable options, assess integration and ownership implications, and help you select tools that fit the organisation rather than the loudest feature list." },
      { question: "How do you manage disruption during implementation?", answer: "We phase changes, identify critical workflows, plan migration and fallback arrangements, test with representative users, and schedule training and launch support around operational constraints." },
      { question: "What if staff are resistant to new systems?", answer: "We involve users early, show how the new workflow changes their work, provide role-specific training, create accessible support, and use feedback and usage evidence to address practical barriers." },
      { question: "Can digital transformation start with one department?", answer: "Yes. A contained, high-value process can be an effective first phase, provided its data and integration dependencies are understood and the design can support later expansion." }
    ],
    related: ["workflow-automations", "business-intelligence-architecture", "training-and-career-development"],
    visual: "transformation",
    visualAlt: "Connected digital business systems linking teams, data, customers, and operational tools",
    metaTitle: "Digital Transformation Services | Fekitech",
    metaDescription: "Modernise manual processes, centralise data and improve digital adoption with a practical Fekitech transformation roadmap. Book a free call."
  },
  {
    title: "Business Intelligence Architecture",
    slug: "business-intelligence-architecture",
    category: "Data and decisions",
    eyebrow: "Make performance visible",
    heroTitle: "Business intelligence and KPI dashboard development leaders can trust",
    heroSummary: "We connect data sources, define useful KPIs, design reporting pipelines, and build focused dashboards that support operational and executive decisions.",
    valueProposition: "Good business intelligence reduces debate about whose figures are correct and increases attention on what the figures mean and what should happen next.",
    overview: {
      title: "Turn scattered data into a dependable decision-support system",
      paragraphs: [
        "Reporting often grows through individual spreadsheets and one-off requests. Definitions vary, numbers arrive late, and teams spend more time preparing reports than understanding performance. A business intelligence architecture creates a governed route from source data to useful decisions.",
        "Fekitech maps the questions leaders and operators need to answer, then works backwards through metrics, definitions, source systems, data quality, transformations, KPI dashboard development, ownership, and review cadence. The design is proportionate to the size and maturity of the organisation."
      ],
      highlight: "A dashboard is only the visible layer. The real value comes from consistent definitions, reliable data movement, clear ownership, and a management rhythm that turns insight into action."
    },
    problems: [
      { title: "Conflicting numbers", text: "Sales, finance, and operations use different definitions or extracts, so meetings are spent reconciling figures instead of making decisions." },
      { title: "Delayed reporting", text: "Monthly reports take days of manual preparation and describe what happened too late for managers to respond." },
      { title: "Vanity metrics", text: "Dashboards contain activity counts that look impressive but do not explain margin, capacity, customer health, or execution quality." },
      { title: "Hidden data quality issues", text: "Missing fields, duplicate records, inconsistent dates, and uncontrolled spreadsheets undermine confidence in every report downstream." }
    ],
    deliverables: [
      { title: "KPI and metric framework", text: "A defined set of strategic and operational measures with calculation rules, owners, sources, frequency, and intended decisions." },
      { title: "Data architecture", text: "A clear model of source systems, extraction, transformation, storage, access, refresh, quality controls, and reporting layers." },
      { title: "Dashboard suite", text: "Role-specific views for executives, managers, and operational teams, designed around exceptions, trends, targets, and required action." },
      { title: "Reporting governance", text: "Ownership, access, change control, documentation, quality review, and a cadence for using intelligence in management conversations." }
    ],
    process: [
      { step: "01", title: "Decision discovery", text: "Identify the recurring decisions, questions, pain points, and reporting audiences that the intelligence system must serve." },
      { step: "02", title: "Data assessment", text: "Map sources, definitions, access, quality, history, integration options, and gaps that could affect reliability." },
      { step: "03", title: "Metric and architecture design", text: "Define KPIs and design the route from each source through preparation and governance to the final reporting layer." },
      { step: "04", title: "Build and validate", text: "Develop pipelines and dashboards, reconcile outputs with trusted records, and test usability with real reporting scenarios." },
      { step: "05", title: "Embed and improve", text: "Document ownership, train users, establish the review cadence, and refine reports as decision needs mature." }
    ],
    capabilities: ["Data-source mapping", "KPI definition", "KPI dashboard development", "Dashboard design", "Data pipeline planning", "Reporting governance", "Executive performance views"],
    useCases: [
      { title: "Leadership reporting", text: "Executives need a concise, trusted view of financial, customer, operational, and workforce performance." },
      { title: "Operational control", text: "Managers need timely signals about backlog, capacity, service quality, conversion, or exceptions requiring intervention." },
      { title: "Reporting consolidation", text: "Several teams produce overlapping spreadsheets and need shared definitions and a more efficient reporting process." }
    ],
    outcomes: ["Consistent metrics and fewer arguments about data definitions", "Faster access to performance signals and emerging exceptions", "Less manual report preparation and spreadsheet dependency", "More focused management discussions and clearer follow-through"],
    why: [
      "We design intelligence around the decisions people must make, not around the maximum number of charts.",
      "Source quality, metric definitions, pipelines, access, and governance are addressed before presentation polish.",
      "Dashboards are designed for distinct roles so each audience sees the detail and actions relevant to them.",
      "The system includes a practical operating cadence that makes reporting useful beyond the screen."
    ],
    faqs: [
      { question: "Can you work with data from several systems?", answer: "Yes. We map each source, available integration methods, ownership, refresh requirements, and quality risks. The architecture can combine data through suitable connectors, APIs, exports, or a central reporting store." },
      { question: "Which dashboard platform do you use?", answer: "The choice depends on your existing technology, data volume, user needs, budget, security, and internal capability. We can work with suitable mainstream BI and reporting tools or design a custom reporting interface where justified." },
      { question: "How do you decide which KPIs matter?", answer: "We begin with strategy, operating model, customer journey, financial drivers, and management decisions. A useful KPI has a clear definition, owner, data source, review frequency, and response when performance changes." },
      { question: "Can you improve an existing dashboard?", answer: "Yes. We review metric logic, source reliability, information hierarchy, usability, performance, and how the dashboard is used in practice, then prioritise corrections and redesign." },
      { question: "Do you provide documentation and training?", answer: "Yes. We document sources, transformations, metric definitions, ownership, access, refresh expectations, and known limitations, and train each user group around the decisions their view supports." }
    ],
    related: ["digital-transformation", "profitability-improvement", "software-development-apps"],
    visual: "intelligence",
    visualAlt: "Business intelligence dashboard visual with connected data sources, performance charts, and KPI signals",
    metaTitle: "BI & KPI Dashboard Development UK | Fekitech",
    metaDescription: "Business intelligence architecture and KPI dashboard development for UK SMEs. Define KPIs, connect data, build dashboards and reporting governance.",
    lastModified: "2026-08-10"
  },
  {
    title: "Process Optimisation and Automation",
    slug: "process-optimisation-and-automation",
    category: "Operational excellence",
    eyebrow: "Simplify before automating",
    heroTitle: "Remove bottlenecks, redesign work, and automate the right tasks",
    heroSummary: "We map end-to-end processes, expose waste and risk, simplify handovers, and introduce controlled automation where it improves speed, quality, and consistency.",
    valueProposition: "Automation magnifies the process beneath it. We make the process clear and effective first, then automate the work that should no longer depend on repeated manual effort.",
    overview: {
      title: "Improve the complete flow of work—not just one isolated task",
      paragraphs: [
        "A slow process is rarely caused by one person. Delays accumulate through unclear inputs, unnecessary approvals, repeated data entry, waiting between teams, inconsistent decisions, and exceptions that have no defined route. Local fixes can simply move the bottleneck elsewhere.",
        "Fekitech maps the process from trigger to final outcome. We measure where time and effort are consumed, distinguish required controls from inherited habits, redesign the flow, and identify automation opportunities with clear ownership and fallback handling."
      ],
      highlight: "The improved process balances speed with control. It should be easier to perform, easier to monitor, and easier to improve when conditions change."
    },
    problems: [
      { title: "Long turnaround times", text: "Work waits in queues, inboxes, or approval chains even when the actual task takes only a few minutes." },
      { title: "Repeated data handling", text: "The same information is copied between forms, spreadsheets, emails, and systems, increasing effort and error risk." },
      { title: "Unmanaged exceptions", text: "The standard route is unclear and unusual cases have no owner, so teams improvise and customers receive inconsistent answers." },
      { title: "Limited process visibility", text: "Managers cannot see volume, age, bottlenecks, rework, or completion status without chasing individuals for updates." }
    ],
    deliverables: [
      { title: "Current-state process map", text: "An evidence-based view of triggers, tasks, roles, systems, decisions, wait states, controls, handovers, and pain points." },
      { title: "Future-state workflow", text: "A simplified process with clear ownership, decision rules, service expectations, exception paths, and measurement points." },
      { title: "Automation specification", text: "Defined triggers, actions, data requirements, approvals, notifications, logs, error handling, and human control points." },
      { title: "Improvement control plan", text: "Process measures, owners, review cadence, issue log, documentation, and a backlog for further improvement." }
    ],
    process: [
      { step: "01", title: "Observe and map", text: "Follow real cases through the process, gather evidence, and record variations rather than relying only on the written procedure." },
      { step: "02", title: "Diagnose constraints", text: "Analyse demand, delays, rework, approvals, failure points, controls, and the reasons exceptions occur." },
      { step: "03", title: "Redesign the flow", text: "Remove unnecessary steps, clarify decisions and ownership, standardise inputs, and create a workable future state." },
      { step: "04", title: "Automate and test", text: "Build prioritised automations, test normal and exceptional paths, verify data, and prepare users and support." },
      { step: "05", title: "Monitor and improve", text: "Track process health, address failures, refine rules, and use evidence to select the next improvement opportunity." }
    ],
    capabilities: ["End-to-end process mapping", "Bottleneck analysis", "Workflow redesign", "Task automation", "Error and exception controls", "Continuous improvement routines"],
    useCases: [
      { title: "Customer onboarding", text: "Sales handover, information collection, checks, account setup, communication, and delivery preparation take too long or vary by employee." },
      { title: "Finance administration", text: "Quotes, approvals, invoices, expenses, reconciliation, or payment follow-up rely on repeated manual handling." },
      { title: "Internal service workflows", text: "Requests such as purchasing, recruitment, access, reporting, or document review disappear into email chains and unclear queues." }
    ],
    outcomes: ["Shorter and more predictable process turnaround", "Reduced repeated administration and avoidable rework", "Clearer ownership, status, and exception handling", "A controlled basis for ongoing operational improvement"],
    why: [
      "We examine the whole process so an improvement in one step does not create a problem downstream.",
      "Automation decisions are based on value, frequency, stability, risk, and maintainability—not novelty.",
      "Human approvals remain where judgement or accountability requires them, with the surrounding administration simplified.",
      "Every implemented flow includes testing, monitoring, ownership, and a route for future changes."
    ],
    faqs: [
      { question: "What is the difference between process optimisation and workflow automation?", answer: "Optimisation improves how the work should flow, including roles, decisions, controls, and handovers. Automation uses technology to perform suitable steps within that improved process. We often need both, but optimisation comes first." },
      { question: "Which processes should we improve first?", answer: "We prioritise using volume, delay, customer impact, cost, error risk, staff effort, strategic importance, and implementation feasibility. The best first process is valuable enough to matter and contained enough to improve safely." },
      { question: "Will automation remove human approval?", answer: "Only where approval adds no meaningful judgement or control. We can retain human review while automating routing, reminders, information gathering, audit trails, and actions after a decision." },
      { question: "Can you work across several departments?", answer: "Yes. Cross-functional processes are often where the largest delays occur. We map the complete flow and involve representatives from each team to clarify handovers and shared measures." },
      { question: "How are automation failures handled?", answer: "The design includes validation, logging, notifications, retry or fallback behaviour, responsible owners, and documented recovery steps appropriate to the risk of the process." }
    ],
    related: ["workflow-automations", "business-structure-design", "digital-transformation"],
    visual: "process",
    visualAlt: "Process optimisation map showing streamlined steps, decision points, and automated task flow",
    metaTitle: "Process Optimisation and Automation | Fekitech",
    metaDescription: "Map bottlenecks, redesign workflows and automate repetitive tasks with Fekitech process optimisation. Request a free business audit."
  },
  {
    title: "Training (Staff, Personal & Career Development)",
    slug: "training-and-career-development",
    category: "Capability development",
    eyebrow: "Build confidence through practice",
    heroTitle: "Give people the skills to use technology, lead well, and progress with purpose",
    heroSummary: "We design practical staff digital-skills, AI adoption, workflow training, leadership and professional-development programmes for employers and teams.",
    valueProposition: "Workforce training creates value when staff can apply new skills to their actual roles, receive feedback, and keep improving after the workshop ends.",
    overview: {
      title: "Turn learning needs into practical capability",
      paragraphs: [
        "Generic training often covers too much, connects poorly to the learner’s context, and ends without a plan for application. Employees may understand the presentation but still feel uncertain when they return to the system, conversation, or decision they need to handle.",
        "Fekitech defines the employer audience, expected behaviours, current capability, real workplace scenarios, and evidence of learning before creating the programme. Delivery can combine workshops, demonstrations, guided practice, coaching, resources, and follow-up support."
      ],
      highlight: "The content is tailored to the job to be done. People learn by working through relevant situations and leave with practical next steps rather than a folder of unused slides."
    },
    problems: [
      { title: "Uneven digital confidence", text: "Teams use the same tools in different ways, avoid valuable features, or depend on a few confident colleagues for routine support." },
      { title: "Low adoption after change", text: "New systems or processes are launched without enough role-based practice, leaving people uncertain and old habits intact." },
      { title: "Leadership and communication gaps", text: "Managers need practical support with expectations, feedback, delegation, difficult conversations, and clear team communication." },
      { title: "Unclear workforce development routes", text: "Teams need to improve capability, but managers lack a practical plan for skill gaps, practice opportunities, reinforcement, and next actions." }
    ],
    deliverables: [
      { title: "Learning-needs assessment", text: "A focused view of audiences, current capability, target behaviours, practical barriers, priority topics, and suitable delivery formats." },
      { title: "Tailored programme design", text: "Objectives, modules, scenarios, exercises, resources, facilitation plan, accessibility considerations, and application activity." },
      { title: "Practical delivery", text: "Interactive workshops, demonstrations, guided exercises, discussion, coaching, and feedback grounded in real work or career situations." },
      { title: "Application and review", text: "Action plans, manager guidance, reference materials, follow-up practice, learner feedback, and appropriate evidence of capability development." }
    ],
    process: [
      { step: "01", title: "Capability discovery", text: "Clarify the audience, context, goals, current confidence, practical constraints, and the behaviours that need to change." },
      { step: "02", title: "Programme design", text: "Build learning objectives, examples, exercises, materials, delivery format, timing, and an approach to application." },
      { step: "03", title: "Facilitated learning", text: "Deliver focused content through explanation, demonstration, realistic practice, discussion, and immediate feedback." },
      { step: "04", title: "Workplace application", text: "Support learners as they apply the capability through tasks, action plans, manager conversations, or coaching." },
      { step: "05", title: "Review and reinforce", text: "Gather evidence and feedback, address remaining gaps, and recommend reinforcement or a next stage of development." }
    ],
    capabilities: ["Staff digital skills training", "AI and technology workshops", "Workflow adoption training", "Leadership and communication", "Workforce capability planning", "Tailored team programmes"],
    useCases: [
      { title: "Technology adoption", text: "Teams need role-based confidence with new digital systems, automation, AI tools, data practices, or updated workflows." },
      { title: "Manager development", text: "New and existing managers need practical tools for delegation, feedback, communication, accountability, and team performance." },
      { title: "Workforce capability building", text: "Employers need structured development around digital capability, technology adoption, communication, leadership, and team productivity." }
    ],
    outcomes: ["Greater confidence applying relevant skills in realistic situations", "More consistent use of agreed tools and working practices", "Clearer individual development priorities and next actions", "Learning resources and reinforcement that extend beyond the session"],
    why: [
      "We define the practical behaviour or capability required before selecting content.",
      "Examples and exercises are adapted to the audience’s work, level, and learning context.",
      "Programmes combine understanding with practice, feedback, and an application plan.",
      "We avoid unsupported promises about promotions, performance, or employment outcomes and focus on useful preparation."
    ],
    faqs: [
      { question: "Can training be tailored to our company systems and processes?", answer: "Yes. With suitable access and preparation, we can adapt examples, exercises, terminology, roles, and support materials to your systems, policies, workflows, and learner responsibilities." },
      { question: "Do you offer online and in-person workshops?", answer: "Programme format can be designed for live online, in-person, or blended delivery depending on location, group size, topic, practice needs, accessibility, and operational constraints." },
      { question: "Can you train people with different confidence levels?", answer: "Yes. We assess the audience, separate or scaffold activities where helpful, provide clear prerequisite guidance, and use paced practice so learners are challenged without being excluded." },
      { question: "How do you evaluate whether training worked?", answer: "The approach may include practical tasks, observed scenarios, learner reflection, action plans, manager feedback, usage evidence, or follow-up checks. We select evidence that is proportionate and connected to the learning objective." },
      { question: "Can you create an ongoing learning programme?", answer: "Yes. We can design a sequence of modules, practice, coaching, resources, peer learning, and reviews rather than a single event, with priorities adjusted as capability develops." }
    ],
    related: ["digital-transformation", "company-customised-ai-agents", "business-structure-design"],
    visual: "training",
    visualAlt: "Professional learning workshop visual with facilitator, practical exercises, and learner development path",
    lastModified: "2026-08-04",
    metaTitle: "Staff Digital Skills and Workforce Training UK | Fekitech",
    metaDescription: "Build staff digital skills, AI adoption, workflow confidence and workforce capability with practical Fekitech training for UK employers."
  },
  {
    title: "Software Development / Apps",
    slug: "software-development-apps",
    category: "Digital product delivery",
    eyebrow: "Software built around the work",
    heroTitle: "Design and build secure digital products that solve a defined business problem",
    heroSummary: "We create business websites, internal platforms, web and mobile applications, dashboards, portals, and integrations with a clear route from discovery to dependable operation.",
    valueProposition: "Useful software begins with the user, process, and operating constraint. Technology choices follow the problem—not the other way around.",
    overview: {
      title: "Take a product from operational need to supported release",
      paragraphs: [
        "Businesses turn to custom development when an important customer journey, internal process, or product opportunity cannot be served well by existing tools. Without disciplined discovery, however, teams can invest in features before validating the workflow or defining how the software will be owned.",
        "Fekitech clarifies users, outcomes, process, data, integrations, security, accessibility, and operating responsibilities. We define an achievable product scope, design and test the experience, build iteratively, and prepare monitoring, documentation, and support for release."
      ],
      highlight: "We aim for the smallest coherent product that solves the priority problem well and creates a stable foundation for evidence-led expansion."
    },
    problems: [
      { title: "Rigid off-the-shelf tools", text: "Critical workflows are forced through workarounds because available software cannot reflect the business rules, users, or integrations required." },
      { title: "Disconnected customer journeys", text: "Websites, forms, portals, payments, communication, and service systems do not create a clear or dependable route for customers." },
      { title: "Unclear product scope", text: "A promising application idea has many requested features but no agreed user problem, release boundary, success evidence, or delivery sequence." },
      { title: "Legacy or fragile software", text: "An existing application is difficult to change, poorly documented, insecure, slow, or unsupported by a clear technical and operational owner." }
    ],
    deliverables: [
      { title: "Product definition", text: "Users, jobs, journeys, requirements, risks, architecture, release scope, acceptance criteria, and an evidence-led roadmap." },
      { title: "Experience and interface design", text: "Information architecture, flows, wireframes, responsive interface, accessibility states, and tested interaction details." },
      { title: "Application engineering", text: "Maintainable frontend and backend development, data model, APIs, authentication, integrations, testing, and deployment." },
      { title: "Release and operation", text: "Monitoring, security review, documentation, support process, analytics, training, backups, handover, and prioritised improvements." }
    ],
    process: [
      { step: "01", title: "Product discovery", text: "Define users, business outcome, current process, constraints, data, integrations, risks, and how the product will be operated." },
      { step: "02", title: "Scope and prototype", text: "Prioritise the release, map journeys, prototype key interactions, and validate assumptions before full implementation." },
      { step: "03", title: "Design and build", text: "Develop in reviewable increments with responsive behaviour, accessibility, security, data, and integration needs included." },
      { step: "04", title: "Test and prepare", text: "Complete functional, integration, content, device, accessibility, performance, and operational readiness checks." },
      { step: "05", title: "Launch and evolve", text: "Release safely, monitor behaviour and errors, support users, and prioritise further work from evidence and business value." }
    ],
    capabilities: ["Business websites", "Internal platforms", "Web applications", "Mobile applications", "Dashboards and client portals", "API and system integrations"],
    useCases: [
      { title: "Customer-facing product", text: "A business needs a website, portal, booking, account, marketplace, or application experience connected to its service operation." },
      { title: "Internal operations", text: "Teams need one tailored place to manage requests, cases, projects, documents, approvals, records, or performance." },
      { title: "New digital venture", text: "A founder or organisation needs to define, validate, build, and operate an MVP without overbuilding the first release." }
    ],
    outcomes: ["A product scope connected to a clear user and business need", "Responsive and accessible experiences across relevant devices", "Maintainable software with documented integrations and ownership", "A controlled release supported by monitoring and a practical roadmap"],
    why: [
      "We connect product decisions to the surrounding business process and service operation.",
      "Discovery and prototyping reduce the risk of building expensive features before the priority need is understood.",
      "Accessibility, responsiveness, security, performance, data, and operational readiness are included in delivery—not postponed indefinitely.",
      "The architecture and release plan match current needs while leaving room for justified growth."
    ],
    faqs: [
      { question: "What types of software can Fekitech build?", answer: "Projects can include business websites, client portals, internal systems, web applications, mobile applications, dashboards, APIs, and integrations. Suitability and scope are confirmed through discovery." },
      { question: "Can you start with an MVP?", answer: "Yes. We define the smallest coherent release that solves the priority user problem, includes necessary operational and security foundations, and creates useful evidence for deciding what to build next." },
      { question: "Will the application work on mobile devices?", answer: "Responsive web products are designed and tested across relevant viewport sizes and input methods. Where a native or cross-platform mobile app is more appropriate, that decision is made from user and product needs." },
      { question: "Can you integrate with our existing software?", answer: "Potentially. We assess API availability, authentication, data quality, permissions, rate limits, operational impact, and support ownership before agreeing the integration approach." },
      { question: "What happens after launch?", answer: "Support can include monitoring, defect resolution, security and dependency maintenance, content or configuration changes, performance review, user feedback, and planned product improvements." }
    ],
    related: ["digital-transformation", "company-customised-ai-agents", "business-intelligence-architecture"],
    visual: "software",
    visualAlt: "Modern software development workspace showing responsive application screens, code, APIs, and product workflow",
    metaTitle: "Software and App Development | Fekitech",
    metaDescription: "Build business websites, portals, web and mobile apps, dashboards and integrations with Fekitech software development. Discuss your product."
  },
  {
    title: "Startup Mentorship",
    slug: "startup-mentorship",
    category: "Founder support",
    eyebrow: "Turn uncertainty into next decisions",
    heroTitle: "Build the model, product, and operating foundations your startup needs next",
    heroSummary: "We help founders clarify the business model, define an MVP, make technology choices, plan go-to-market activity, and establish practical operating discipline.",
    valueProposition: "Mentorship gives founders a structured place to challenge assumptions, make decisions, and keep execution aligned with evidence rather than momentum alone.",
    overview: {
      title: "Connect strategy, product, market, technology, and execution",
      paragraphs: [
        "Early-stage businesses face linked decisions with limited information. A product choice affects cost and time; a target segment changes positioning; a sales assumption shapes the MVP; and premature systems or hiring can consume attention before the model is understood.",
        "Fekitech provides structured mentoring around the founder’s current stage. We help articulate assumptions, prioritise learning, define practical experiments, translate findings into product and operating decisions, and maintain a clear execution rhythm."
      ],
      highlight: "We do not claim to remove startup uncertainty. We help founders make it explicit, test the most important assumptions, and act with greater clarity."
    },
    problems: [
      { title: "Unclear business model", text: "The problem, customer, value, channel, revenue logic, cost structure, and operating requirements have not yet formed a coherent model." },
      { title: "Overloaded MVP", text: "The first product contains too many ideas and no clear boundary around the user problem or evidence the release should produce." },
      { title: "Weak market positioning", text: "The offer sounds broad, resembles alternatives, or is described through features rather than the specific situation and value customers recognise." },
      { title: "Reactive execution", text: "Founders switch priorities frequently, make technology or hiring decisions in isolation, and lack a simple rhythm for commitments and learning." }
    ],
    deliverables: [
      { title: "Business model working plan", text: "A structured view of customer, problem, proposition, route to market, revenue logic, costs, capabilities, assumptions, and next evidence." },
      { title: "MVP and product roadmap", text: "Priority users and journeys, release boundary, acceptance criteria, learning goals, dependencies, and a sequenced backlog." },
      { title: "Go-to-market focus", text: "Target segment, positioning, offer, initial channels, sales or adoption process, messages to test, and feedback capture." },
      { title: "Founder operating cadence", text: "Decision log, priority plan, measures, risks, action ownership, mentoring agenda, and a regular review of evidence and execution." }
    ],
    process: [
      { step: "01", title: "Founder and venture assessment", text: "Understand the idea, stage, evidence, team, constraints, goals, market assumptions, product state, and immediate decisions." },
      { step: "02", title: "Assumption mapping", text: "Make the critical beliefs behind customer demand, value, delivery, technology, economics, and growth explicit." },
      { step: "03", title: "Model and MVP definition", text: "Clarify the proposition and design the smallest product and market activity that can create useful evidence." },
      { step: "04", title: "Execution mentoring", text: "Review decisions and progress, resolve blockers, challenge drift, and connect product, market, technology, and operations." },
      { step: "05", title: "Foundation for the next stage", text: "Document learning, update the roadmap, and prepare the systems, roles, measures, and decisions needed for responsible growth." }
    ],
    capabilities: ["Business model development", "MVP definition", "Market positioning", "Go-to-market planning", "Technology decisions", "Operational foundations"],
    useCases: [
      { title: "Idea to validation", text: "A founder needs to turn a broad idea into a defined problem, audience, proposition, assumptions, and first evidence plan." },
      { title: "Product planning", text: "A venture needs to reduce an expanding feature list to a coherent MVP and choose a proportionate technical route." },
      { title: "Early traction to structure", text: "Customer interest exists, but priorities, delivery, roles, measurement, and founder routines need more discipline before growth." }
    ],
    outcomes: ["Clearer business-model assumptions and priority questions", "A focused MVP and more deliberate product decisions", "Stronger connection between positioning, market activity, and learning", "A practical execution cadence for founder commitments and review"],
    why: [
      "We connect commercial, product, technology, and operational decisions rather than mentoring each in isolation.",
      "Advice is adapted to venture stage, available evidence, resources, and the next decision—not an idealised startup playbook.",
      "Sessions translate into specific actions, owners, assumptions, and review points.",
      "We do not invent traction, investor access, funding outcomes, or guaranteed growth."
    ],
    faqs: [
      { question: "Which startup stages do you support?", answer: "Support is most relevant from idea definition and validation through MVP planning, early market activity, and the operating foundations needed around initial traction. We confirm fit from the venture’s stage and decisions." },
      { question: "Will you build the MVP as well as mentor us?", answer: "Mentorship and software delivery can be scoped separately or connected. Product discovery should define the problem and release before development is agreed, and founders retain clear ownership of venture decisions." },
      { question: "Do you help with fundraising?", answer: "We can help clarify the model, roadmap, operating plan, evidence, risks, and narrative that founders may need when preparing for funding conversations. We do not guarantee introductions, investment, or fundraising outcomes." },
      { question: "How often are mentoring sessions?", answer: "The cadence depends on stage and execution pace. It may be a focused planning engagement or recurring sessions supported by actions, evidence, and decision review between meetings." },
      { question: "Can you support non-technical founders?", answer: "Yes. We explain technology choices in business terms, help define product requirements and technical questions, and support proportionate decisions without expecting the founder to become an engineer." }
    ],
    related: ["software-development-apps", "business-structure-design", "business-intelligence-architecture"],
    visual: "startup",
    visualAlt: "Founder and mentor product strategy visual connecting customer, MVP, market, technology, and execution milestones",
    metaTitle: "Startup Mentorship and MVP Planning | Fekitech",
    metaDescription: "Clarify your business model, MVP, positioning, technology and go-to-market plan with practical Fekitech startup mentorship. Book a call."
  },
  {
    title: "Career Development and Job Success",
    slug: "career-development",
    category: "Professional development",
    eyebrow: "Prepare with direction and evidence",
    heroTitle: "Present your value clearly and approach the job search with a practical system",
    heroSummary: "We support career direction, CV and LinkedIn positioning, job-search planning, cover letters, interview practice, portfolio development, and offer conversations.",
    valueProposition: "Career support is most useful when your target is clear, your evidence is relevant, and every application and interview communicates the same credible professional story.",
    overview: {
      title: "Build a coherent route from career direction to offer decision",
      paragraphs: [
        "Capable professionals can struggle when their experience is broad, their documents list responsibilities rather than evidence, or their applications are not aligned to the role. Repeated applications without a review system can consume time while producing little learning.",
        "Fekitech helps define target roles and constraints, organise relevant evidence, improve CV and LinkedIn positioning, create a focused search process, prepare role-specific applications, practise interviews, and evaluate offers with greater clarity."
      ],
      highlight: "We strengthen preparation and communication; we do not guarantee interviews, employment, salary, or promotion. Decisions remain with employers and the professional."
    },
    problems: [
      { title: "Unclear career direction", text: "Several paths seem possible, but goals, strengths, constraints, evidence, and capability gaps have not been translated into a decision." },
      { title: "Weak professional positioning", text: "CV and LinkedIn content describe duties but do not make relevant skills, decisions, scope, contribution, and evidence easy to understand." },
      { title: "Unfocused applications", text: "High application volume replaces role selection, tailored evidence, network activity, follow-up, and learning from outcomes." },
      { title: "Interview uncertainty", text: "Answers become long or vague, examples are difficult to recall, and the candidate has not practised role-specific questions or thoughtful questions for the employer." }
    ],
    deliverables: [
      { title: "Career direction plan", text: "Target roles, priorities, transferable strengths, gaps, constraints, development actions, and criteria for evaluating opportunities." },
      { title: "Professional positioning", text: "A clearer CV, LinkedIn profile, evidence bank, personal statement or summary, and portfolio direction where relevant." },
      { title: "Job-search system", text: "Role-selection criteria, search channels, application tracker, networking plan, tailoring routine, follow-up, and review cadence." },
      { title: "Interview and offer preparation", text: "Role research, example selection, mock questions, feedback, candidate questions, and a structured approach to evaluating and discussing an offer." }
    ],
    process: [
      { step: "01", title: "Career discovery", text: "Review goals, experience, strengths, constraints, preferences, current materials, target market, and immediate challenges." },
      { step: "02", title: "Direction and evidence", text: "Clarify target roles and organise credible examples that show relevant skills, decisions, contribution, and learning." },
      { step: "03", title: "Positioning and materials", text: "Improve CV, LinkedIn, cover-letter approach, personal statement, and portfolio structure for the selected direction." },
      { step: "04", title: "Search and interview practice", text: "Build a focused search routine, prepare role-specific applications, practise interviews, and refine answers using feedback." },
      { step: "05", title: "Offer and next-step support", text: "Evaluate role fit and terms, prepare respectful questions or negotiation, and plan a confident transition or next search cycle." }
    ],
    capabilities: ["CV improvement", "LinkedIn positioning", "Job-search strategy", "Cover-letter support", "Interview preparation", "Portfolio and offer guidance"],
    useCases: [
      { title: "Career transition", text: "A professional is moving function, industry, seniority, or location and needs to translate existing experience for a new target." },
      { title: "Low application response", text: "Applications are receiving limited response and need a review of target fit, positioning, evidence, tailoring, and search activity." },
      { title: "Interview and offer stage", text: "A candidate needs structured practice, clearer examples, role research, confidence, or support evaluating and discussing an offer." }
    ],
    outcomes: ["A clearer target and more focused career-development plan", "Professional materials that communicate relevant evidence more effectively", "A manageable job-search routine with review and follow-up", "Better preparation for interviews and informed offer conversations"],
    why: [
      "We connect direction, evidence, documents, search activity, interview communication, and offer decisions into one system.",
      "Advice is tailored to the target role and the professional’s real experience; we do not fabricate achievements or credentials.",
      "Practice and specific feedback help turn guidance into stronger communication under interview conditions.",
      "We are explicit that preparation can improve quality but cannot guarantee employer decisions or compensation."
    ],
    faqs: [
      { question: "Will you write my CV for me?", answer: "We can review, restructure, and improve your CV with you, helping identify relevant evidence and clearer wording. All claims must remain accurate and owned by you; we do not invent experience, qualifications, or results." },
      { question: "Can you help me change careers?", answer: "Yes. We examine target roles, transferable experience, evidence, gaps, learning options, portfolio needs, positioning, and a realistic search route for the transition." },
      { question: "Do you tailor cover letters for specific roles?", answer: "We can help create a strong approach and support selected role-specific letters by connecting the employer’s needs to relevant evidence. The aim is a repeatable method, not generic text sent everywhere." },
      { question: "What happens in interview coaching?", answer: "We review the role, likely evaluation areas, your evidence, answer structure, communication, and questions for the employer. Practice can include mock questions followed by specific feedback and another attempt." },
      { question: "Can you help with salary negotiation?", answer: "We can help you research, clarify priorities, evaluate the complete offer, prepare questions, frame your evidence, and practise a respectful conversation. We cannot guarantee a change in terms." },
      { question: "Do you guarantee a job offer?", answer: "No. Employers control shortlisting and hiring, and outcomes depend on many factors. We improve the clarity, relevance, organisation, and practice behind your career and job-search activity." }
    ],
    related: ["training-and-career-development", "startup-mentorship", "company-customised-ai-agents"],
    visual: "career",
    visualAlt: "Career coaching visual showing CV evidence, LinkedIn positioning, interview preparation, and offer decision path",
    lastModified: "2026-08-04",
    metaTitle: "Career Coaching and Job Application Support UK | Fekitech",
    metaDescription: "Get UK career coaching for CV improvement, LinkedIn optimisation, job applications, interview preparation and portfolio presentation."
  }
];

const serviceOrder = [
  "business-structure-design",
  "digital-transformation",
  "business-intelligence-architecture",
  "process-optimisation-and-automation",
  "customer-retention-systems",
  "profitability-improvement",
  "company-customised-ai-agents",
  "workflow-automations",
  "training-and-career-development",
  "software-development-apps",
  "startup-mentorship",
  "career-development"
];

servicePages.sort((a, b) => serviceOrder.indexOf(a.slug) - serviceOrder.indexOf(b.slug));

export const serviceRoutes = servicePages.map((service) => servicePath(service.slug));

export function getServicePage(slugOrPath = "") {
  const slug = slugOrPath.replace(/^\/services\//, "").replace(/\/$/, "");
  return servicePages.find((service) => service.slug === slug);
}

export function getRelatedServices(service) {
  return service.related.map((slug) => getServicePage(slug)).filter(Boolean);
}
