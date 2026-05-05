export interface ProjectDetail {
  id: string;
  title: string;
  tagline: string;
  description: string;
  year: string;
  client: string;
  duration: string;
  role: string;
  category: string;
  image: string;
  liveUrl?: string;
  gallery: string[];
  challenge: string;
  solution: string;
  results: { label: string; value: string }[];
  techStack: { name: string; category: string }[];
  process: { step: number; title: string; description: string }[];
}

export const projects: ProjectDetail[] = [
  {
    id: "autohub",
    title: "AutoHub",
    tagline: "Operations OS for the modern auto repair shop.",
    description:
      "AutoHub is a three-sided platform that unifies the admin back office, the front-of-house client portal, and the technician workspace into a single source of truth — replacing a tangle of paper job cards, spreadsheets, and pager-style SMS alerts that most repair shops still run on.",
    year: "2026",
    client: "AutoHub (apex motors pilot)",
    duration: "7 months",
    role: "Product engineering, multi-tenant architecture, full-stack delivery",
    category: "Automotive SaaS / Operations",
    image: "/autohub/Screenshot 2026-05-04 180852.png",
    liveUrl: "https://autohub-4lx1.vercel.app/",
    gallery: [
      "/autohub/Screenshot 2026-05-04 180852.png",
      "/autohub/Screenshot 2026-05-04 180921.png",
      "/autohub/garage.jpg",
    ],
    challenge:
      "Independent repair shops were juggling three disconnected workflows — owners chasing invoices in spreadsheets, technicians scribbling diagnostics on paper, and customers calling the front desk for status updates. The result: missed appointments, double-booked bays, lost warranty records, and revenue leaking out of every step.",
    solution:
      "We shipped a single platform with a panel for each persona. The vehicle registry tracks every car's full service history with VIN, mileage, and diagnostic snapshots. Smart scheduling auto-allocates bays and technicians, digital invoicing closes the loop with one-click payments, live OBD-II diagnostics stream straight into the work order, and a branded client portal keeps customers in sync without a single phone call.",
    results: [
      { label: "Front-desk calls handled", value: "−62%" },
      { label: "Avg. invoice settlement", value: "9 days → 2 days" },
      { label: "Bay utilization", value: "+38%" },
      { label: "Warranty claim recovery", value: "100%" },
    ],
    techStack: [
      { name: "Next.js", category: "Frontend" },
      { name: "TypeScript", category: "Frontend" },
      { name: "Tailwind CSS", category: "Frontend" },
      { name: "Node.js", category: "Backend" },
      { name: "PostgreSQL", category: "Database" },
      { name: "Prisma", category: "ORM" },
      { name: "Stripe", category: "Payments" },
      { name: "Vercel", category: "Infrastructure" },
    ],
    process: [
      {
        step: 1,
        title: "Shadowing the Shop",
        description:
          "Spent two weeks on the floor at the pilot shop mapping every paper handoff between service advisors, technicians, and the front desk.",
      },
      {
        step: 2,
        title: "Three-Panel Architecture",
        description:
          "Designed admin, client, and employee surfaces against a shared domain model so every action stays consistent across roles.",
      },
      {
        step: 3,
        title: "Diagnostics Integration",
        description:
          "Wired OBD-II readings and parts catalogs into the work-order flow so technicians never re-key the same data twice.",
      },
      {
        step: 4,
        title: "Pilot & Iterate",
        description:
          "Rolled out at one location with daily standups against real tickets, then tightened the scheduling and invoicing flows before expanding.",
      },
    ],
  },
  {
    id: "cross-fed-crm",
    title: "Cross-Fed CRM",
    tagline: "A dual-context CRM for pre-construction real estate teams.",
    description:
      "Cross-Fed CRM is a workspace-aware platform built for real estate sales teams who run a general book of business and project-specific sales programs in parallel. The same contact, deal, and document flows seamlessly between a General workspace and any number of Project workspaces — with AI-assisted drafting, deal scoring, and pipeline summaries layered throughout.",
    year: "2026",
    client: "Hudson 8",
    duration: "5 months",
    role: "Product design, full-stack engineering, AI integration",
    category: "Real Estate CRM / AI",
    image: "/cross fed crm/Screenshot 2026-05-04 181228.png",
    liveUrl: "https://crm-01-lyart.vercel.app/",
    gallery: [
      "/cross fed crm/Screenshot 2026-05-04 181146.png",
      "/cross fed crm/Screenshot 2026-05-04 181228.png",
      "/cross fed crm/tower.jpg",
    ],
    challenge:
      "Pre-construction sales teams live in two worlds: the long-tail general pipeline of leads and brokers, and the short, intense sales windows for specific tower launches. Existing CRMs forced teams to either silo each project as its own tenant — losing the shared contact graph — or dump everything into one pipeline and lose project context. Neither worked.",
    solution:
      "We built a context-switching CRM where every workspace shares contacts, templates, and an inbox, but pipelines, offers, units, and revenue goals live inside their project. AI features draft offer cover emails, summarize inbox threads, surface deals at risk, and answer plain-English questions over the contract template library — turning hours of admin into minutes.",
    results: [
      { label: "Pipeline visibility", value: "$39M tracked" },
      { label: "Offer turnaround", value: "−71%" },
      { label: "Email triage time", value: "−4 hrs/week" },
      { label: "Project workspaces", value: "Unlimited" },
    ],
    techStack: [
      { name: "Next.js", category: "Frontend" },
      { name: "TypeScript", category: "Frontend" },
      { name: "Tailwind CSS", category: "Frontend" },
      { name: "Postgres", category: "Database" },
      { name: "Drizzle", category: "ORM" },
      { name: "OpenAI", category: "AI" },
      { name: "Resend", category: "Email" },
      { name: "Vercel", category: "Infrastructure" },
    ],
    process: [
      {
        step: 1,
        title: "Workflow Mapping",
        description:
          "Interviewed sales advisors and brokers to chart how the same lead crosses between general prospecting and project-specific offer rounds.",
      },
      {
        step: 2,
        title: "Workspace Model",
        description:
          "Designed a data layer where contacts and templates are global, but offers, units, and pipelines bind to a project context.",
      },
      {
        step: 3,
        title: "AI Layering",
        description:
          "Added Gemini- and GPT-backed flows for offer drafting, inbox summarization, and pipeline Q&A on top of the structured CRM data.",
      },
      {
        step: 4,
        title: "Launch & Onboarding",
        description:
          "Migrated the Hudson 8 pipeline live, then trained the team in two sessions. The platform replaced four separate tools.",
      },
    ],
  },
  {
    id: "unified-crm",
    title: "Unified CRM",
    tagline: "A configurable CRM that ships per business, on a subscription.",
    description:
      "Unified CRM (NexusCRM) is a single multi-tenant codebase that lets every customer tailor their pipeline stages, deal fields, dashboards, and automations to their own business — without forking the product. New tenants are provisioned in minutes, billing is subscription-based, and a no-code config layer means most customizations never touch engineering.",
    year: "2026",
    client: "Mindivo (productized SaaS)",
    duration: "6 months",
    role: "SaaS architecture, billing, configuration engine",
    category: "SaaS / CRM Platform",
    image: "/unified crm/Screenshot 2026-05-04 181440.png",
    liveUrl: "https://crm-02.vercel.app/",
    gallery: [
      "/unified crm/Screenshot 2026-05-04 181410.png",
      "/unified crm/Screenshot 2026-05-04 181440.png",
      "/unified crm/analytics.jpg",
    ],
    challenge:
      "Small and mid-sized businesses kept asking for a CRM that fit how they actually sell — but bespoke builds were out of reach and off-the-shelf tools forced them to bend their process to the software. We needed a single product that could honestly ship as 'your CRM' for a dental clinic, a SaaS startup, and a logistics broker on day one.",
    solution:
      "We built a configuration layer on top of a strict multi-tenant data model. Each tenant defines their own pipeline stages, custom fields, dashboard tiles, and automation rules — all stored as data, not code. A drag-and-drop pipeline, deal-velocity dashboard, and activity feed render dynamically from that config. Stripe handles tiered subscription billing end-to-end.",
    results: [
      { label: "Tenant onboarding", value: "< 10 min" },
      { label: "Custom fields supported", value: "Unlimited" },
      { label: "Dashboard load", value: "< 800ms" },
      { label: "Pipeline value tracked", value: "$611k+" },
    ],
    techStack: [
      { name: "Next.js", category: "Frontend" },
      { name: "TypeScript", category: "Frontend" },
      { name: "Tailwind CSS", category: "Frontend" },
      { name: "Node.js", category: "Backend" },
      { name: "PostgreSQL", category: "Database" },
      { name: "Stripe", category: "Billing" },
      { name: "Clerk", category: "Auth" },
      { name: "Vercel", category: "Infrastructure" },
    ],
    process: [
      {
        step: 1,
        title: "Customer Archetypes",
        description:
          "Interviewed five very different small businesses to find the shared CRM primitives — and the parts they each needed to bend.",
      },
      {
        step: 2,
        title: "Config Engine",
        description:
          "Designed a JSON-driven configuration layer that powers stages, fields, dashboards, and automations from a single tenant record.",
      },
      {
        step: 3,
        title: "Subscription Billing",
        description:
          "Wired Stripe with metered seats and feature flags so plan upgrades instantly unlock the right surface area in each tenant.",
      },
      {
        step: 4,
        title: "Self-Serve Onboarding",
        description:
          "Built a guided setup that gets a new business from sign-up to a populated pipeline in under ten minutes.",
      },
    ],
  },
  {
    id: "second-opinion",
    title: "Second Opinion",
    tagline: "AI-powered plain-English explanations for medical lab reports.",
    description:
      "Second Opinion lets patients upload a lab report — bloodwork, imaging summaries, biomarker panels — and instantly get a Gemini-generated breakdown in plain English, with values flagged as 'Follow up soon', 'Discuss with your doctor', or 'Monitor'. The platform is privacy-first by design: API keys live in the user's browser, reports are never persisted on our servers.",
    year: "2026",
    client: "Mindivo (consumer health)",
    duration: "3 months",
    role: "Product engineering, AI prompt design, privacy architecture",
    category: "HealthTech / Consumer AI",
    image: "/second opinion/Screenshot 2026-05-04 181709.png",
    liveUrl: "https://second-opinion-tau.vercel.app/",
    gallery: [
      "/second opinion/Screenshot 2026-05-04 181709.png",
      "/second opinion/Screenshot 2026-05-04 181759.png",
      "/second opinion/lab.jpg",
    ],
    challenge:
      "Most patients walk out of a lab with a PDF full of acronyms — CBC, ESR, PCV, MCV — and no way to know what's serious until their next appointment, which can be weeks away. Existing health portals either oversimplify ('all normal') or dump raw reference ranges. Patients needed something in between: honest, specific, and not medical advice.",
    solution:
      "We built a Gemini-backed pipeline that parses the uploaded report, normalizes lab values against reference ranges, and produces a structured response: a plain-English summary, a 'things worth noting' list, and an action triage (follow up / discuss / monitor). Users bring their own free Gemini API key, so reports never leave their browser context — and we don't carry the medical-data liability.",
    results: [
      { label: "Avg. analysis time", value: "< 8s" },
      { label: "Reports stored on server", value: "Zero" },
      { label: "Lab formats supported", value: "PDF, image, text" },
      { label: "Free-tier coverage", value: "100% of personal use" },
    ],
    techStack: [
      { name: "Next.js", category: "Frontend" },
      { name: "TypeScript", category: "Frontend" },
      { name: "Tailwind CSS", category: "Frontend" },
      { name: "Gemini API", category: "AI" },
      { name: "PDF parsing", category: "Processing" },
      { name: "LocalStorage", category: "Privacy" },
      { name: "Edge runtime", category: "Backend" },
      { name: "Vercel", category: "Infrastructure" },
    ],
    process: [
      {
        step: 1,
        title: "Clinical Sanity-Check",
        description:
          "Worked through reference-range datasets and reviewed sample reports with a clinician advisor to define what the AI should and should not say.",
      },
      {
        step: 2,
        title: "Prompt & Schema Design",
        description:
          "Engineered a structured Gemini prompt that returns JSON with summary, notes, and triage buckets — so the UI never has to parse free-form text.",
      },
      {
        step: 3,
        title: "BYOK Privacy Model",
        description:
          "Built the bring-your-own-key flow so the user's Gemini key, lab files, and analyses live only in their browser's local storage.",
      },
      {
        step: 4,
        title: "Disclaimer & Polish",
        description:
          "Added the 'Not medical advice' framing throughout, refined the action triage UI, and shipped the free-tier launch.",
      },
    ],
  },
];

export function getProject(id: string): ProjectDetail | undefined {
  return projects.find((p) => p.id === id);
}
