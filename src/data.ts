export type Project = {
  title: string;
  year: string;
  kind: string;
  heading: string;
  lead: string;
  description: string;
  tags: string[];
  cats: string[];
  thumb: string;
  linkLabel?: string;
  linkHref?: string;
  note?: string;
};

export const projects: Project[] = [
  {
    title: 'OdemLab — AI skincare e-commerce',
    year: 'Flagship',
    kind: 'Team of 4 · Private repo',
    heading: 'OdemLab',
    lead: 'd',
    description:
      'Full platform: versioned REST API, customer storefront, admin back-office, mobile app. Server-side pricing, idempotent orders, Stripe + CMI + cash-on-delivery, Gemini skin analysis behind circuit breakers, trilingual FR/EN/AR with RTL, zero-traffic Cloud Run deploys with auto-rollback.',
    tags: ['Spring Boot', 'Next.js', 'React Native', 'PostgreSQL', 'Redis', 'Stripe', 'Gemini', 'Docker'],
    cats: ['web', 'mobile', 'backend'],
    thumb: 'thumb-odem',
    note: 'Private repository — live demo and code walkthrough on request.',
  },
  {
    title: 'Medical appointment platform',
    year: '2025',
    kind: 'Internship · Full-stack',
    heading: 'Medical',
    lead: 'e',
    description:
      'Doctor–patient booking: practitioner search, slot booking with no-overlap rules, role-based dashboards (patient, practitioner, admin) with activity charts.',
    tags: ['PHP', 'Laravel', 'MySQL', 'JavaScript', 'Bootstrap'],
    cats: ['web', 'backend'],
    thumb: 'thumb-med',
    note: 'Client project — details on request.',
  },
  {
    title: 'FitTrack — training platform',
    year: '2025',
    kind: 'Solo · Full-stack',
    heading: 'FitTrack',
    lead: 'i',
    description:
      'Cloud workout tracking with model-assisted session generation, token auth and a fully containerized stack.',
    tags: ['Spring Boot', 'React', 'Next.js', 'Docker', 'MySQL'],
    cats: ['web', 'backend'],
    thumb: 'thumb-fit',
  },
  {
    title: 'Smart Campus Companion',
    year: '2026',
    kind: 'Team · Mobile + AR',
    heading: 'Campus',
    lead: 'a',
    description:
      'AR campus navigation for ENSIASD: indoor guidance, interactive map, realtime room availability, push notifications, role-based access.',
    tags: ['Flutter', 'Dart', 'Firebase', 'ARCore', 'Node.js'],
    cats: ['mobile'],
    thumb: 'thumb-campus',
  },
  {
    title: 'SmartSummarizer',
    year: '2025',
    kind: 'Solo · Machine learning',
    heading: 'Summarizer',
    lead: 'u',
    description:
      'Transformer-based document summarization with automatic quiz and mind-map generation.',
    tags: ['Python', 'PyTorch', 'Hugging Face', 'spaCy', 'Flask'],
    cats: ['ai'],
    thumb: 'thumb-sum',
  },
  {
    title: 'Fish-box counting line',
    year: '2024 · DUT thesis',
    kind: 'Embedded · Final-year project',
    heading: 'IoT',
    lead: 'T',
    description:
      'Production-line counting with IR sensors on ESP8266, realtime stock logging and a web dashboard — a system where measurement reliability is the product.',
    tags: ['Embedded C', 'ESP8266', 'PHP', 'MySQL'],
    cats: ['iot'],
    thumb: 'thumb-iot',
  },
];

export const filters = [
  { key: 'all', label: 'All' },
  { key: 'web', label: 'Web' },
  { key: 'mobile', label: 'Mobile' },
  { key: 'backend', label: 'Backend' },
  { key: 'ai', label: 'AI' },
  { key: 'iot', label: 'IoT' },
];

export const stats = [
  { value: 6, label: 'Domains shipped', sub: 'web · mobile · API · AI · IoT' },
  { value: 3, label: 'Languages live', sub: 'FR · EN · AR + RTL' },
  { value: 275, label: 'Versioned API routes', sub: 'under /api/v1' },
  { value: 124, label: 'Flyway migrations', sub: 'replayable from zero' },
];

export const jobs = [
  {
    when: 'JUN 2026 — SEP 2026 · AGADIR, ON-SITE',
    title: 'End-of-year project (PFA) — Full-Stack Developer',
    org: 'Zorium, Technoparc Agadir',
    where: 'OdemLab platform · team of four',
    points: [
      'Owned backend business modules: orders, products, payments, auth, GDPR',
      'Hardened the money paths: server-side pricing, idempotent checkout, audited order lifecycle',
      'Shipped to Cloud Run: zero-traffic deploy, health check, promotion, auto-rollback on failure',
    ],
  },
  {
    when: 'JUL 2025 — SEP 2025 · REMOTE',
    title: 'Full-Stack Developer Intern',
    org: 'Medical booking platform',
    where: 'Laravel · MySQL · Bootstrap',
    points: ['Patient–practitioner booking with slot no-overlap rules and role-based dashboards'],
  },
  {
    when: 'JUN 2023 — AUG 2023',
    title: 'QA Automation Intern',
    org: 'Web regression suites',
    where: 'Python · Selenium WebDriver · Page Objects',
    points: ['Replaced a manual campaign with automated non-regression suites, one change point per UI change'],
  },
];

export const education = [
  {
    years: '2024 — Present',
    title: 'Engineering Cycle, Software Engineering',
    school: 'ENSIASD · Ibn Zohr University — Taroudant',
    desc: 'Artificial intelligence, data science, software architecture.',
  },
  {
    years: '2022 — 2024 · With honors',
    title: 'DUT, Embedded Computer Engineering',
    school: 'EST Oujda — École Supérieure de Technologie',
    desc: 'Embedded systems, IoT, firmware — ESP32/ESP8266, Arduino, Raspberry Pi.',
  },
];

export function thumbTitle(p: Project): { pre: string; em: string; post: string } {
  const i = p.heading.indexOf(p.lead);
  if (i === -1) return { pre: p.heading, em: '', post: '' };
  return { pre: p.heading.slice(0, i), em: p.lead, post: p.heading.slice(i + 1) };
}
