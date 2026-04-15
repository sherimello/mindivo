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
  gallery: string[];
  challenge: string;
  solution: string;
  results: { label: string; value: string }[];
  techStack: { name: string; category: string }[];
  process: { step: number; title: string; description: string }[];
}

export const projects: ProjectDetail[] = [
  {
    id: "retailpro",
    title: "RetailPro",
    tagline: "End-to-end retail management SaaS with real-time analytics.",
    description:
      "A comprehensive SaaS platform that unifies inventory, sales, and customer data into one seamless operational hub — giving retail businesses a real-time pulse on every store.",
    year: "2024",
    client: "RetailPro Inc.",
    duration: "9 months",
    role: "Full-stack development, system architecture",
    category: "SaaS / Retail Tech",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2670&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2676&auto=format&fit=crop",
    ],
    challenge:
      "The client operated 40+ stores with disconnected point-of-sale systems, spreadsheet-based inventory, and no unified customer view. Stockouts cost them ~18% in lost monthly revenue while overstock tied up capital.",
    solution:
      "We designed and built a multi-tenant SaaS platform with a real-time event-driven architecture. Stores sync inventory deltas every 30 seconds via WebSockets. A custom analytics engine aggregates sales, returns, and foot-traffic data into actionable dashboards.",
    results: [
      { label: "Revenue recovered", value: "+23%" },
      { label: "Stockout incidents", value: "−67%" },
      { label: "Stores onboarded", value: "40+" },
      { label: "Avg. dashboard load", value: "< 1.2s" },
    ],
    techStack: [
      { name: "Next.js", category: "Frontend" },
      { name: "TypeScript", category: "Frontend" },
      { name: "Tailwind CSS", category: "Frontend" },
      { name: "Node.js", category: "Backend" },
      { name: "PostgreSQL", category: "Database" },
      { name: "Redis", category: "Caching" },
      { name: "WebSockets", category: "Real-time" },
      { name: "AWS", category: "Infrastructure" },
    ],
    process: [
      {
        step: 1,
        title: "Discovery & Audit",
        description:
          "Interviewed store managers, mapped legacy data flows, and audited 5 years of sales records to understand failure points.",
      },
      {
        step: 2,
        title: "Architecture Design",
        description:
          "Designed a multi-tenant event-driven system with isolated store contexts and a shared analytics layer.",
      },
      {
        step: 3,
        title: "Iterative Build",
        description:
          "Shipped in 3-week sprints with pilot stores, gathering feedback before expanding to the full rollout.",
      },
      {
        step: 4,
        title: "Rollout & Optimization",
        description:
          "Migrated all 40+ stores in rolling batches with zero downtime. Tuned query performance post-launch.",
      },
    ],
  },
  {
    id: "medtrack",
    title: "MedTrack",
    tagline: "HIPAA-compliant patient monitoring and care coordination app.",
    description:
      "A secure care coordination platform that connects nurses, physicians, and patients through real-time monitoring dashboards, automated alert escalations, and audit-ready compliance logging.",
    year: "2024",
    client: "MedTrack Health Systems",
    duration: "12 months",
    role: "Product engineering, security architecture, compliance",
    category: "HealthTech / Enterprise",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2670&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=2671&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?q=80&w=2574&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=2669&auto=format&fit=crop",
    ],
    challenge:
      "Clinical staff at three hospital networks were managing patient vitals through paper logs and pager systems, leading to delayed escalations and compliance gaps. A failed vendor solution had left the team wary of technology changes.",
    solution:
      "We built a mobile-first app with end-to-end encryption, role-based access control, and automated escalation workflows. Every data access is immutably logged to satisfy HIPAA audit requirements. The UX was co-designed with ICU nurses over 6 weeks of shadowing sessions.",
    results: [
      { label: "Alert response time", value: "−54%" },
      { label: "Compliance incidents", value: "Zero" },
      { label: "Clinicians onboarded", value: "800+" },
      { label: "Uptime SLA", value: "99.97%" },
    ],
    techStack: [
      { name: "React Native", category: "Mobile" },
      { name: "TypeScript", category: "Frontend" },
      { name: "GraphQL", category: "API" },
      { name: "Node.js", category: "Backend" },
      { name: "PostgreSQL", category: "Database" },
      { name: "AES-256", category: "Security" },
      { name: "RBAC", category: "Auth" },
      { name: "Azure", category: "Infrastructure" },
    ],
    process: [
      {
        step: 1,
        title: "Clinical Research",
        description:
          "Six weeks embedded with ICU nurses and physicians to map real workflows, pain points, and non-negotiable safety requirements.",
      },
      {
        step: 2,
        title: "Compliance Framework",
        description:
          "Built the security and audit logging architecture first — HIPAA requirements shaped every subsequent design decision.",
      },
      {
        step: 3,
        title: "Co-design Sprints",
        description:
          "Weekly prototype reviews with clinical staff ensured UI patterns matched how care teams actually think and move.",
      },
      {
        step: 4,
        title: "Phased Rollout",
        description:
          "Launched in one ICU ward before expanding network-wide, with 24/7 on-call engineering during go-live windows.",
      },
    ],
  },
  {
    id: "logiflow",
    title: "LogiFlow",
    tagline: "Supply-chain digitization and logistics automation platform.",
    description:
      "An end-to-end logistics operations platform that replaces manual freight coordination with intelligent automation — from order intake to last-mile tracking and carrier settlement.",
    year: "2023",
    client: "LogiFlow Operations Ltd.",
    duration: "10 months",
    role: "Platform engineering, integrations, data pipeline",
    category: "LogisticsTech / Automation",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2670&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1565793979892-18b59f18b69f?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601598851547-4302969d0614?q=80&w=2669&auto=format&fit=crop",
    ],
    challenge:
      "Operations ran on a patchwork of spreadsheets, WhatsApp threads, and 3 incompatible legacy tools. Carrier disputes took 2–3 weeks to resolve. The team had no live visibility into shipment status across 12 carrier partners.",
    solution:
      "We built a unified operations platform with direct API integrations to 12 carriers, an automated document generation engine, and a real-time shipment map. A rules engine auto-assigns carriers based on cost, SLA, and load type, cutting manual dispatch work by 80%.",
    results: [
      { label: "Manual dispatch work", value: "−80%" },
      { label: "Carrier dispute time", value: "2 wks → 2 hrs" },
      { label: "On-time delivery rate", value: "+31%" },
      { label: "Carrier integrations", value: "12" },
    ],
    techStack: [
      { name: "Next.js", category: "Frontend" },
      { name: "Python", category: "Backend" },
      { name: "FastAPI", category: "Backend" },
      { name: "Kafka", category: "Streaming" },
      { name: "PostgreSQL", category: "Database" },
      { name: "Mapbox", category: "Mapping" },
      { name: "Docker", category: "Infrastructure" },
      { name: "GCP", category: "Infrastructure" },
    ],
    process: [
      {
        step: 1,
        title: "Operations Audit",
        description:
          "Mapped every manual touchpoint across the dispatch, tracking, and settlement workflows to quantify automation opportunity.",
      },
      {
        step: 2,
        title: "Carrier API Research",
        description:
          "Evaluated and scoped integrations for all 12 carriers — each with unique authentication, rate, and tracking schemas.",
      },
      {
        step: 3,
        title: "Core Platform Build",
        description:
          "Built the rules engine and carrier integration layer first; the UI was layered on proven backend logic.",
      },
      {
        step: 4,
        title: "Migration & Training",
        description:
          "Ran parallel operations for 4 weeks during transition, with on-site training for dispatch and ops teams.",
      },
    ],
  },
  {
    id: "edulearn",
    title: "EduLearn",
    tagline: "Adaptive learning platform with personalized content paths.",
    description:
      "An AI-powered education platform that continuously adapts lesson sequencing, difficulty, and format to each learner's performance profile — dramatically improving completion rates and knowledge retention.",
    year: "2023",
    client: "EduLearn Global",
    duration: "8 months",
    role: "Full-stack development, ML pipeline, content system",
    category: "EdTech / AI",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2670&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=2674&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2670&auto=format&fit=crop",
    ],
    challenge:
      "A one-size-fits-all curriculum left 60% of learners either under-challenged or overwhelmed. Course completion hovered at 22% and learner satisfaction scores were declining despite new content investments.",
    solution:
      "We built an adaptive engine using spaced repetition and item response theory to model each learner's mastery level in real time. Content paths are re-sequenced after every session. A React-based authoring tool lets educators create adaptive content without engineering help.",
    results: [
      { label: "Course completion rate", value: "22% → 71%" },
      { label: "Knowledge retention", value: "+44%" },
      { label: "Active learners", value: "50,000+" },
      { label: "Educator NPS", value: "72" },
    ],
    techStack: [
      { name: "React", category: "Frontend" },
      { name: "TypeScript", category: "Frontend" },
      { name: "Python", category: "ML / Backend" },
      { name: "scikit-learn", category: "ML" },
      { name: "PostgreSQL", category: "Database" },
      { name: "Redis", category: "Caching" },
      { name: "S3", category: "Storage" },
      { name: "AWS", category: "Infrastructure" },
    ],
    process: [
      {
        step: 1,
        title: "Learner Research",
        description:
          "Analysed 2 years of engagement data and interviewed 30 learners to understand exactly where and why drop-off occurred.",
      },
      {
        step: 2,
        title: "Adaptive Engine Design",
        description:
          "Designed the IRT-based mastery model and spaced repetition scheduler before writing a single line of product UI.",
      },
      {
        step: 3,
        title: "Content Authoring Tool",
        description:
          "Built the educator-facing authoring system in parallel so content could be tagged and structured for the adaptive engine.",
      },
      {
        step: 4,
        title: "Beta & Iteration",
        description:
          "Ran a closed beta with 2,000 learners for 6 weeks, tuning model weights before the full 50k-learner launch.",
      },
    ],
  },
];

export function getProject(id: string): ProjectDetail | undefined {
  return projects.find((p) => p.id === id);
}
