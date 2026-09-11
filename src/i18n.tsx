import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Lang = 'en' | 'fr' | 'ar';
export const LANGS: { code: Lang; label: string; aria: string }[] = [
  { code: 'en', label: 'EN', aria: 'English' },
  { code: 'fr', label: 'FR', aria: 'Français' },
  { code: 'ar', label: 'عر', aria: 'العربية' },
];

export type ProjectT = {
  title: string; year: string; kind: string; heading: string; lead: string;
  description: string; note?: string; linkLabel?: string; linkHref?: string;
};

export function thumbTitle(p: ProjectT): { pre: string; em: string; post: string } {
  const i = p.heading.indexOf(p.lead);
  if (i === -1) return { pre: p.heading, em: '', post: '' };
  return { pre: p.heading.slice(0, i), em: p.lead, post: p.heading.slice(i + 1) };
}

export type JobT = { when: string; title: string; org: string; where: string; points: string[] };
export type EduT = { years: string; title: string; school: string; desc: string };

export type ToolItem = { name: string; desc: string };
export type ToolLevel = { level: string; subtitle: string; tools: ToolItem[] };
export type PillarItem = { name: string; desc: string };
export type Pillar = { icon: string; title: string; subtitle: string; items: PillarItem[] };

export type Dict = {
  dir: 'ltr' | 'rtl';
  nav: { work: string; about: string; experience: string; education: string; tools: string; contact: string; resume: string };
  hero: { badge: string; titleA: string; titleEm: string; titleB: string; lede1: string; lede2: string; ctaWork: string; ctaContact: string; cardRole: string; cardTech: string; statsLabels: [string, string, string, string]; viewAll: string };
  core: string[];
  filters: { all: string; web: string; mobile: string; backend: string; ai: string; iot: string };
  work: { kicker: string; title: string; sub: string; projects: ProjectT[] };
  about: {
    kicker: string; title: string; sub: string;
    stats: { label: string; sub: string }[];
    bestTitle: string; best: string[]; methodTitle: string; method: string[];
    langs: { l: string; lvl: string }[];
  };
  exp: { kicker: string; title: string; jobs: JobT[] };
  edu: { kicker: string; title: string; sub: string; entries: EduT[] };
  tools: {
    kicker: string; title: string; sub: string;
    pyramid: { title: string; subtitle: string };
    levels: ToolLevel[];
    extra: { title: string; items: string[] };
    pillars: Pillar[];
  };
  contact: {
    kicker: string; title: string; sub: string; subEm: string; subEnd: string;
    name: string; namePh: string; email: string; emailPh: string; msg: string; msgPh: string;
    send: string; sending: string; success: string; error: string; timezone: string;
    direct: string; phone: string; tz: string; linkedin: string; github: string;
  };
  footer: { built: string; top: string; elsewhere: string };
  dock: { home: string; work: string; contact: string; lang: string; nav: string; toggle: string; resume: string };
};

const tags = {
  odemlab: ['Spring Boot 3.5', 'Java 21', 'Next.js 16', 'React Native', 'Expo SDK 54', 'PostgreSQL 18', 'Redis 7', 'Tailwind CSS', 'Framer Motion', 'Docker', 'GitHub Actions', 'GHCR', 'Google Cloud Run', 'Stripe', 'Gemini AI', 'Flyway', 'Caffeine', 'Resilience4j', 'ShedLock', 'Grafana', 'Prometheus', 'Playwright'],
  med: ['PHP', 'Laravel', 'MySQL', 'JavaScript', 'Bootstrap'],
  fit: ['Spring Boot', 'React', 'Next.js', 'Docker', 'MySQL'],
  campus: ['Flutter', 'Dart', 'Firebase', 'ARCore', 'Node.js'],
  sum: ['Python', 'PyTorch', 'Hugging Face', 'spaCy', 'Flask'],
  iot: ['Embedded C', 'ESP8266', 'PHP', 'MySQL'],
};

const en: Dict = {
  dir: 'ltr',
  nav: { work: 'Work', about: 'About', experience: 'Experience', education: 'Education', tools: 'Engineering', contact: 'Contact', resume: 'Résumé' },
  hero: {
    badge: 'Open to a PFE internship — let\u2019s discuss timing',
    titleA: 'Building ', titleEm: 'complete products', titleB: ' \u2014 API, web, mobile.',
    lede1: 'Hi, I\u2019m Ahmed Ouarrali, a 5th-year Software Engineering student at ENSIASD Taroudant. I recently completed my end-of-year internship (PFA) at Zorium, building ',
    lede2: ', an AI-augmented skincare e-commerce platform: Spring Boot API, Next.js storefront and back-office, React Native app, PostgreSQL + Redis, shipped with Docker to Google Cloud.',
    ctaWork: 'Browse production work', ctaContact: 'Get in touch',
    cardRole: 'Full-Stack Software Engineer', cardTech: 'Core technologies',
    statsLabels: ['Projects shipped', 'Technologies', 'Platforms', 'Internships completed'] as [string, string, string, string],
    viewAll: 'View all 22 technologies',
  },
  core: ['Java 21 / Spring Boot', 'TypeScript / Next.js', 'React Native / Flutter', 'PostgreSQL', 'Docker', 'Playwright / Selenium'],
  filters: { all: 'All', web: 'Web', mobile: 'Mobile', backend: 'Backend', ai: 'AI', iot: 'IoT' },
  work: {
    kicker: 'Selected work', title: 'Systems that run in production, not demos that run once.',
    sub: 'Six builds across web, mobile, backend, AI and IoT — each one deployed, used, or graded.',
    projects: [
      { title: 'OdemLab — AI skincare e-commerce', year: 'Flagship', kind: 'Team of 4 · Private repo', heading: 'OdemLab', lead: 'd',
        description: 'A full e-commerce platform with a Spring Boot API, Next.js storefront and back-office, and a React Native mobile app. Customers pay through Stripe, Moroccan CMI, or cash-on-delivery — all routed through one order lifecycle. AI skin analysis via Gemini degrades gracefully behind circuit breakers. Trilingual FR/EN/AR with real Arabic RTL layout. Deploys to Cloud Run with zero-traffic promotion and auto-rollback on health-check failure.',
        note: 'Private repository — live demo and code walkthrough on request.' },
      { title: 'Medical appointment platform', year: '2025', kind: 'Internship · Full-stack', heading: 'Medical', lead: 'e',
        description: 'A doctor–patient booking system where patients search practitioners, pick time slots, and book without double-booking conflicts. Role-based dashboards for patients, practitioners, and admins show real-time activity — eliminating manual scheduling overhead.',
        note: 'Client project — details on request.' },
      { title: 'FitTrack — training platform', year: '2025', kind: 'Solo · Full-stack', heading: 'FitTrack', lead: 'i',
        description: 'A cloud workout tracker where an AI model generates personalized training sessions based on goals and progress. Token-based auth and a fully containerized stack mean it runs the same on any machine — no "works on my laptop" surprises.' },
      { title: 'Smart Campus Companion', year: '2026', kind: 'Team · Mobile + AR', heading: 'Campus', lead: 'a',
        description: 'An AR navigation app for ENSIASD campus — point your phone and get indoor turn-by-turn guidance. Students find empty rooms in real time, receive push notifications for events, and administrators control access by role.' },
      { title: 'SmartSummarizer', year: '2025', kind: 'Solo · Machine learning', heading: 'Summarizer', lead: 'u',
        description: 'A document summarizer using Transformer models that also generates quiz questions and mind maps. Students upload lecture notes and get structured study material in seconds — turning hours of reading into focused review.' },
      { title: 'Fish-box counting line', year: '2024 · DUT thesis', kind: 'Embedded · Final-year project', heading: 'IoT', lead: 'T',
        description: 'An IR-sensor counting system on ESP8266 microcontrollers that logs fish-box counts to a web dashboard in real time. In a factory, measurement accuracy IS the product — manual counting loses money, this system does not.' },
    ],
  },
  about: {
    kicker: 'Background', title: 'Backend-leaning, product-minded — from sensor to storefront.',
    sub: 'From ESP8266 firmware to Cloud Run deploys: I care about the places where a bug costs real money, and I prefer executable guarantees over conventions.',
    stats: [
      { label: 'Domains shipped', sub: 'web · mobile · API · QA · IoT' },
      { label: 'Languages live', sub: 'FR · EN · AR + RTL' },
      { label: 'E2E test suites', sub: 'Playwright · Selenium' },
      { label: 'Flyway migrations', sub: 'replayable from zero' },
    ],
    bestTitle: 'What I do best',
    best: [
      'REST API design: versioned endpoints with OpenAPI contracts so frontend and mobile teams consume generated clients — no manual guessing',
      'Transactional integrity: idempotent orders, optimistic locking on products, and SELECT FOR UPDATE on stock — money paths that never double-charge or oversell',
      'E2E testing: Playwright suites across Chromium/Firefox/WebKit with axe-core accessibility gates — catches regressions before users do',
      'Trilingual interfaces: FR/EN/AR with real Arabic RTL layout mirroring — not just translated labels, but mirrored navigation, forms, and content',
    ],
    methodTitle: 'How I work',
    method: [
      'Kanban with green CI as the merge gate — code that does not pass tests does not ship',
      'Schema changes as replayable Flyway migrations — any database rebuilds from zero, no manual steps',
      'Security in depth: short-lived JWTs, AES-256-GCM encrypted PII, per-IP rate limits, and CORS/CSP headers',
      'Honest scoping: I name the edge cases I have not handled and the limits I know about — no false confidence',
    ],
    langs: [{ l: 'Arabic', lvl: 'native' }, { l: 'French', lvl: 'professional' }, { l: 'English', lvl: 'professional' }],
  },
  exp: {
    kicker: 'Track record', title: 'Experience & education.',
    jobs: [
      { when: 'JUN 2026 — SEP 2026 · AGADIR, ON-SITE', title: 'End-of-year project (PFA) — Full-Stack Developer', org: 'Zorium, Technoparc Agadir', where: 'OdemLab platform · team of four',
        points: ['Owned backend business modules: orders, products, payments, auth, GDPR', 'Hardened the money paths: server-side pricing, idempotent checkout, audited order lifecycle', 'Shipped to Cloud Run: zero-traffic deploy, health check, promotion, auto-rollback on failure'] },
      { when: 'JUL 2025 — SEP 2025 · REMOTE', title: 'Full-Stack Developer Intern', org: 'Medical booking platform', where: 'Laravel · MySQL · Bootstrap',
        points: ['Patient–practitioner booking with slot no-overlap rules and role-based dashboards'] },
      { when: 'JUN 2023 — AUG 2023', title: 'QA Automation Intern', org: 'Web regression suites', where: 'Python · Selenium WebDriver · Page Objects',
        points: ['Replaced a manual campaign with automated non-regression suites, one change point per UI change'] },
    ],
  },
  edu: {
    kicker: 'Education', title: 'Schools, not jobs.', sub: 'The two programs behind the work above.',
    entries: [
      { years: '2024 — Present', title: 'Engineering Cycle, Software Engineering', school: 'ENSIASD · Ibn Zohr University — Taroudant', desc: 'Artificial intelligence, data science, software architecture.' },
      { years: '2022 — 2024 · With honors', title: 'DUT, Embedded Computer Engineering', school: 'EST Oujda — École Supérieure de Technologie', desc: 'Embedded systems, IoT, firmware — ESP32/ESP8266, Arduino, Raspberry Pi.' },
    ],
  },
  tools: {
    kicker: 'Engineering Practices', title: 'How I ship — from test to production.', sub: 'Quality is not just testing. It is the full loop: writing it, securing it, deploying it, and watching it run.',
    pyramid: { title: 'Testing Pyramid', subtitle: 'Speed and confidence at every layer' },
    levels: [
      { level: 'Unit Testing', subtitle: 'Fast, isolated, runs on every commit', tools: [
        { name: 'JUnit 5', desc: 'Verifies OdemLab business logic — order pricing, coupon validation, stock rules — before any deployment. Catches pricing bugs that would lose revenue. Runs in under 2 seconds per test.' },
        { name: 'Mockito', desc: 'Replaces Stripe, Gemini AI, and SMTP in tests so we verify business rules without paying for real API calls. Also simulates failures (timeouts, 500s) to confirm the system degrades gracefully.' },
        { name: 'Vitest', desc: 'Runs OdemLab frontend tests in milliseconds — verifying that the Next.js storefront renders prices correctly, the cart updates, and i18n switches languages. 10x faster than Jest for TypeScript.' },
        { name: 'Jest', desc: 'Tests the React Native mobile app on both iOS and Android from one codebase — confirming login, cart, and order flows work identically to the web version.' },
      ]},
      { level: 'Integration Testing', subtitle: 'Real databases, real containers, real contracts', tools: [
        { name: 'Testcontainers', desc: 'Launches real PostgreSQL 18 and Redis 7 in Docker during CI — matching production exactly. Catches SQL constraint violations and cache-invalidation bugs that mock databases would miss.' },
        { name: '@SpringBootTest', desc: 'Loads the full Spring Boot context to verify that controllers, services, and repositories wire together correctly — catching wiring errors that unit tests cannot see.' },
        { name: 'Supertest', desc: 'Validates OdemLab Next.js API routes by sending real HTTP requests and checking responses — confirming that the storefront can actually reach the backend before deploying.' },
        { name: 'React Testing Library', desc: 'Tests React components from the user perspective — clicking buttons, filling forms, waiting for results. If a user cannot complete checkout, this test fails.' },
      ]},
      { level: 'E2E Testing', subtitle: 'Real browser, real user flows, zero mocks', tools: [
        { name: 'Playwright', desc: 'Runs the OdemLab smoke suite across Chromium, Firefox, and WebKit — verifying public pages load, cart works, and checkout completes. Visual regression catches accidental style changes (wrong accent color, broken layout).' },
        { name: 'Selenium WebDriver', desc: 'Page Object Model for cross-browser regression — when OdemLab UI changes, only the Page Object updates, not every test. Keeps the suite maintainable as the project grows.' },
        { name: 'axe-core', desc: 'Audits every public route against WCAG 2.2 — catching missing alt text, unlabeled form fields, and broken ARIA landmarks before they reach users. Structured violations fail CI.' },
      ]},
    ],
    extra: {
      title: 'Methodologies & Practices',
      items: [
        'Page Object Model — OdemLab checkout, product listing, and auth flows are each a single class. When the button text changes from "Pay" to "Place Order", one line updates, not twenty tests.',
        'CI-gated regression — Playwright runs on every OdemLab PR. If the smoke suite fails, the merge is blocked. No exceptions.',
        'Visual regression — screenshot baselines detect when a CSS change accidentally breaks the product grid, shifts the hero, or changes the brand accent color.',
        'Accessibility-first — axe-core structural rules (missing labels, broken landmarks, no skip-link) are hard CI gates on every OdemLab public route.',
        'Contract testing — OpenAPI schemas are validated against the live Spring Boot backend, so the frontend team never consumes an endpoint that does not exist.',
        'Load testing — k6 scripts measure how many concurrent users OdemLab API handles before response time degrades, informing Cloud Run scaling settings.',
      ],
    },
    pillars: [
      { icon: 'M4 6h16M4 12h16m-7 6h7', title: 'DevOps & Infrastructure', subtitle: 'Ship fast, ship safe, watch it run.', items: [
        { name: 'Docker', desc: 'Multi-stage builds package OdemLab backend and frontend into minimal production images — no dev dependencies, no source code, smaller attack surface. Docker Compose replicates the full stack locally for testing.' },
        { name: 'GitHub Actions', desc: 'On every push: run backend + frontend tests, build Docker images, push to GHCR, deploy to Cloud Run. If tests fail, deployment never starts. Automated rollback triggers on health-check failure.' },
        { name: 'Google Cloud Run', desc: 'OdemLab runs on Cloud Run with zero-traffic deploys (no requests hit the new version until it passes health checks) and automatic rollback if latency or error rates spike.' },
        { name: 'Grafana + Prometheus', desc: 'Real-time dashboards show OdemLab API response times, error rates, and throughput. Alerts fire when p95 latency exceeds thresholds — we know before users complain.' },
        { name: 'Flyway', desc: 'OdemLab database schema is managed as 93 versioned SQL migrations — replayable from zero. Any fresh database gets the correct schema in seconds, no manual SQL patches.' },
        { name: 'ShedLock', desc: 'Distributed locks ensure OdemLab cron jobs (cart recovery, scan reminders, GDPR cleanup) run exactly once across multiple Cloud Run instances — never duplicated, never skipped.' },
      ]},
      { icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', title: 'Security & Compliance', subtitle: 'Defense in depth, not security by obscurity.', items: [
        { name: 'JWT + Refresh Rotation', desc: 'OdemLab access tokens expire in minutes. Refresh tokens rotate on every use — if a token leaks, the original is immediately invalidated. Session hijacking window: seconds, not hours.' },
        { name: 'AES-256-GCM Encryption', desc: 'Customer phone numbers, addresses, and names are encrypted at the database level. Even a full database dump exposes only unreadable ciphertext for personal data.' },
        { name: 'Rate Limiting', desc: 'OdemLab login gets 10 attempts per IP per minute. Coupon validation gets 5 per minute to prevent brute-force code guessing. Legitimate users never notice; bots get blocked.' },
        { name: 'GDPR Compliance', desc: 'Automated nightly jobs purge expired data. Right-to-erasure requests delete all customer records with an audit trail. Compliance is not an afterthought — it runs on a schedule.' },
        { name: 'CORS + CSP', desc: 'Only OdemLab domains can call the API. Scripts load only from trusted sources via nonce-based policies. Prevents data exfiltration and unauthorized script injection.' },
        { name: 'Turnstile CAPTCHA', desc: 'Guest checkout and login endpoints are protected by Cloudflare Turnstile — invisible to real users, blocking automated bots from creating fake orders or credential-stuffing.' },
      ]},
      { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Business & Product', subtitle: 'Code that makes money, not just code that works.', items: [
        { name: 'Idempotent Orders', desc: 'Every OdemLab checkout carries a unique idempotency key. If the network retries, the customer is charged once — not twice. Revenue protected, trust preserved.' },
        { name: 'Server-Side Pricing', desc: 'The OdemLab frontend never sends prices to the backend. All calculations happen server-side — discounts, shipping, totals. Client-side price manipulation is impossible.' },
        { name: 'Stripe + CMI + COD', desc: 'Three payment paths feed into one order lifecycle. Stripe for international cards, CMI for Moroccan payment methods, cash-on-delivery for local trust. Maximum conversion, minimum complexity.' },
        { name: 'Inventory Integrity', desc: 'SELECT FOR UPDATE locks product rows during checkout — two customers cannot buy the last item simultaneously. Atomic stock decrement prevents overselling.' },
        { name: 'Guest Checkout', desc: 'Customers buy without creating an account. A one-time access token lets them track their order. Friction removed, conversion increased, no abandoned registrations.' },
        { name: 'Trilingual + RTL', desc: 'OdemLab supports French, English, and Arabic with real layout mirroring — navigation, forms, and content flip for Arabic readers. Not translated labels, a fully mirrored experience.' },
      ]},
    ],
  },
  contact: {
    kicker: 'Contact', title: 'Let\u2019s build something solid.',
    sub: 'Looking for a ', subEm: 'PFE internship', subEnd: ' \u2014 backend or full-stack, Morocco or remote, ideally where code ships to production. I answer fast.',
    name: 'Your name', namePh: 'Your full name', email: 'Email address', emailPh: 'you@company.com',
    msg: 'Project details', msgPh: 'What are you building, and when?', send: 'Send message', sending: '...',
    success: '\u2713 Message sent \u2014 I\u2019ll get back to you soon.', error: '\u2717 Something went wrong. Try emailing me directly.',
    timezone: 'Morocco (GMT+1) \u00b7 working remotely worldwide',
    direct: 'Direct email', phone: 'Phone', tz: 'Timezone', linkedin: 'LinkedIn', github: 'GitHub',
  },
  footer: { built: '', top: 'Top', elsewhere: 'Elsewhere' },
  dock: { home: 'Home', work: 'Work', contact: 'Contact', lang: 'Language', nav: 'Quick navigation', toggle: 'Toggle light / dark mode', resume: 'Résumé' },
};

const fr: Dict = {
  dir: 'ltr',
  nav: { work: 'Projets', about: 'Profil', experience: 'Parcours', education: 'Formation', tools: 'Ingénierie', contact: 'Contact', resume: 'CV' },
  hero: {
    badge: 'Ouvert \u00e0 un stage PFE \u2014 discutons du calendrier',
    titleA: 'Des ', titleEm: 'produits complets', titleB: ' \u2014 API, web, mobile.',
    lede1: 'Salut, je suis Ahmed Ouarrali, \u00e9l\u00e8ve-ing\u00e9nieur en 5\u1d57\u02e3 ann\u00e9e \u00e0 l\u2019ENSIASD Taroudant. Je viens de terminer mon stage de fin d\u2019ann\u00e9e (PFA) chez Zorium, o\u00f9 j\u2019ai construit ',
    lede2: ', plateforme e-commerce cosm\u00e9tique augment\u00e9e par l\u2019IA : API Spring Boot, boutique Next.js et back-office, app React Native, PostgreSQL + Redis, livr\u00e9e avec Docker sur Google Cloud.',
    ctaWork: 'Voir mes projets', ctaContact: 'Me contacter',
    cardRole: 'Ing\u00e9nieur Logiciel Full-Stack', cardTech: 'Technologies cl\u00e9s',
    statsLabels: ['Projets livr\u00e9s', 'Technologies', 'Plateformes', 'Stages compl\u00e9t\u00e9s'] as [string, string, string, string],
    viewAll: 'Voir les 22 technologies',
  },
  core: ['Java 21 / Spring Boot', 'TypeScript / Next.js', 'React Native / Flutter', 'PostgreSQL', 'Docker', 'Playwright / Selenium'],
  filters: { all: 'Tous', web: 'Web', mobile: 'Mobile', backend: 'Backend', ai: 'IA', iot: 'IoT' },
  work: {
    kicker: 'Projets', title: 'Des systèmes qui tournent en production, pas des démos qui tournent une fois.',
    sub: 'Six réalisations web, mobile, backend, IA et IoT — chacune déployée, utilisée ou évaluée.',
    projects: [
      { title: 'OdemLab — e-commerce cosmétique IA', year: 'Vitrine', kind: 'Équipe de 4 · Dépôt privé', heading: 'OdemLab', lead: 'd',
        description: 'Plateforme e-commerce complète avec API Spring Boot, boutique Next.js et back-office, et application React Native. Les clients paient par Stripe, CMI marocaine ou contre-remboursement — tout passe par un seul cycle de commande. L\'analyse IA de la peau par Gemini dégrade gracieusement derrière des coupe-circuits. Trilingue FR/EN/AR avec vrai disposition RTL arabe. Déploiement Cloud Run sans trafic et retour arrière automatique.',
        note: 'Dépôt privé — démo en direct et revue de code sur demande.' },
      { title: 'Plateforme de rendez-vous médicaux', year: '2025', kind: 'Stage · Full-stack', heading: 'Médical', lead: 'e',
        description: 'Système de réservation médecins-patients où les patients cherchent des praticiens, choisissent des créneaux et réservent sans double réservation. Les tableaux de bord par rôle pour patients, praticiens et admins montrent l\'activité en temps réel — éliminant la planification manuelle.',
        note: 'Projet client — détails sur demande.' },
      { title: 'FitTrack — suivi sportif', year: '2025', kind: 'Solo · Full-stack', heading: 'FitTrack', lead: 'i',
        description: 'Tracker d\'entraînement cloud où un modèle IA génère des séances personnalisées selon les objectifs. L\'authentification par jeton et l\'empilage conteneurisé garantissent le même fonctionnement sur toute machine — pas de surprise « ça marche sur mon ordi ».' },
      { title: 'Smart Campus Companion', year: '2026', kind: 'Équipe · Mobile + RA', heading: 'Campus', lead: 'a',
        description: 'Application de navigation AR pour le campus ENSIASD — pointez votre téléphone pour un guidage intérieur pas à pas. Les étudiants trouvent des salles libres en temps réel, reçoivent des notifications push, et les administrateurs contrôlent l\'accès par rôle.' },
      { title: 'SmartSummarizer', year: '2025', kind: 'Solo · Apprentissage auto', heading: 'Résumeur', lead: 'u',
        description: 'Résumeur de documents utilisant des modèles Transformers qui génère aussi des quiz et cartes mentales. Les étudiants téléchargent leurs notes et obtiennent du matériel de révision structuré en quelques secondes.' },
      { title: 'Comptage de boîtes de poisson', year: '2024 · PFE DUT', kind: 'Embarqué · Projet de fin d\'études', heading: 'IoT', lead: 'T',
        description: 'Système de comptage par capteurs IR sur ESP8266 qui enregistre les boîtes de poisson en temps réel sur un tableau de bord web. En usine, la précision de mesure EST le produit — le comptage manuel perd de l\'argent, ce système non.' },
    ],
  },
  about: {
    kicker: 'Profil', title: 'Backend d\'abord, produit toujours — du capteur à la vitrine.',
    sub: 'Du firmware ESP8266 aux déploiements Cloud Run : je m\'intéresse aux endroits où un bug coûte de l\'argent, et je préfère les garanties exécutables aux conventions.',
    stats: [
      { label: 'Domaines livrés', sub: 'web · mobile · API · QA · IoT' },
      { label: 'Langues en ligne', sub: 'FR · EN · AR + RTL' },
      { label: 'Suites de tests E2E', sub: 'Playwright · Selenium' },
      { label: 'Migrations Flyway', sub: 'rejouables depuis zéro' },
    ],
    bestTitle: 'Mes points forts',
    best: [
      'Conception d\'API REST : endpoints versionnés avec contrats OpenAPI — l\'équipe frontend consomme des clients générés, plus de devinettes',
      'Intégrité transactionnelle : commandes idempotentes, verrouillage optimiste sur les produits, SELECT FOR UPDATE sur le stock — les chemins argent ne double- fakturer jamais',
      'Tests E2E : suites Playwright sur Chromium/Firefox/WebKit avec portes d\'accessibilité axe-core — attrapent les régressions avant les utilisateurs',
      'Interfaces trilingues : FR/EN/AR avec vrai disposition RTL arabe — pas des libellés traduits, mais une navigation, formulaires et contenus miroirs',
    ],
    methodTitle: 'Ma méthode',
    method: [
      'Kanban avec CI verte comme barrière de fusion — le code qui ne passe pas les tests ne part pas en production',
      'Changements de schéma comme migrations Flyway rejouables — toute base se reconstruit depuis zéro, pas d\'étapes manuelles',
      'Sécurité en profondeur : JWT courts, PII chiffrées en AES-256-GCM, quotas par IP, en-têtes CORS/CSP',
      'Cadrage honnête : je nomme les cas limites que je n\'ai pas traités et les limites que je connais — pas de fausse confiance',
    ],
    langs: [{ l: 'Arabe', lvl: 'maternelle' }, { l: 'Français', lvl: 'professionnel' }, { l: 'Anglais', lvl: 'professionnel' }],
  },
  exp: {
    kicker: 'Parcours', title: 'Expérience et formation.',
    jobs: [
      { when: 'JUIN 2026 — SEPT. 2026 · AGADIR, SUR SITE', title: 'Projet de fin d’année (PFA) — Développeur Full-Stack', org: 'Zorium, Technoparc Agadir', where: 'Plateforme OdemLab · équipe de quatre',
        points: ['Modules métier backend : commandes, produits, paiements, auth, RGPD', 'Chemins monétaires fiabilisés : tarification serveur, checkout idempotent, cycle audité', 'Livraison Cloud Run : déploiement sans trafic, health check, promotion, rollback auto'] },
      { when: 'JUIL. 2025 — SEPT. 2025 · DISTANCIEL', title: 'Stagiaire Développeur Full-Stack', org: 'Plateforme de rendez-vous médicaux', where: 'Laravel · MySQL · Bootstrap',
        points: ['Réservation patients-praticiens avec règles anti-chevauchement et tableaux par rôle'] },
      { when: 'JUIN 2023 — AOÛT 2023', title: 'Stagiaire QA Automatisation', org: 'Suites de non-régression web', where: 'Python · Selenium WebDriver · Page Objects',
        points: ['Campagne manuelle remplacée par des suites automatisées, un point de changement par écran'] },
    ],
  },
  edu: {
    kicker: 'Formation', title: 'Des écoles, pas des postes.', sub: 'Les deux formations derrière ce travail.',
    entries: [
      { years: '2024 — Présent', title: 'Cycle ingénieur, Génie logiciel', school: 'ENSIASD · Université Ibn Zohr — Taroudant', desc: 'Intelligence artificielle, science des données, architecture logicielle.' },
      { years: '2022 — 2024 · Mention bien', title: 'DUT, Génie informatique embarqué', school: 'EST Oujda — École Supérieure de Technologie', desc: 'Systèmes embarqués, IoT, firmware — ESP32/ESP8266, Arduino, Raspberry Pi.' },
    ],
  },
  tools: {
    kicker: 'Pratiques d\'Ingénierie', title: 'Comment je livre — du test à la production.',
    sub: 'La qualité ne se limite pas aux tests. C\'est la boucle complète : écrire, sécuriser, déployer, et surveiller.',
    pyramid: { title: 'Pyramide de Test', subtitle: 'Vitesse et confiance à chaque couche' },
    levels: [
      { level: 'Tests Unitaires', subtitle: 'Rapides, isolés, exécutés à chaque commit', tools: [
        { name: 'JUnit 5', desc: 'Vérifie la logique métier d\'OdemLab — calcul des prix, validation des coupons, règles de stock — avant tout déploiement. Attrape les bugs de tarification qui feraient perdre de l\'argent. Moins de 2 secondes par test.' },
        { name: 'Mockito', desc: 'Remplace Stripe, Gemini AI et SMTP dans les tests pour vérifier les règles métier sans payer de vrais appels API. Simule aussi les pannes (timeouts, 500) pour confirmer la dégradation gracieuse.' },
        { name: 'Vitest', desc: 'Exécute les tests frontend d\'OdemLab en millisecondes — vérifie que la boutique Next.js affiche les bons prix, le panier se met à jour et l\'i18n change de langue. 10x plus rapide que Jest pour TypeScript.' },
        { name: 'Jest', desc: 'Teste l\'application React Native sur iOS et Android depuis un seul code — confirme que connexion, panier et commande fonctionnent identiquement à la version web.' },
      ]},
      { level: 'Tests d\'Intégration', subtitle: 'Vraies bases de données, vrais conteneurs, vrais contrats', tools: [
        { name: 'Testcontainers', desc: 'Lance PostgreSQL 18 et Redis 7 en Docker pendant le CI — identique à la production. Attrape les erreurs de contraintes SQL et les bugs de cache que des bases simulées ratent.' },
        { name: '@SpringBootTest', desc: 'Charge le contexte Spring Boot complet pour vérifier que contrôleurs, services et repositories s\'assemblent correctement — attrape les erreurs d\'assemblage invisibles en tests unitaires.' },
        { name: 'Supertest', desc: 'Valide les routes API Next.js d\'OdemLab en envoyant de vraies requêtes HTTP — confirme que la boutique peut réellement atteindre le backend avant le déploiement.' },
        { name: 'React Testing Library', desc: 'Teste les composants React du point de vue utilisateur — clics, formulaires, attente de résultats. Si un client ne peut pas finaliser son achat, ce test échoue.' },
      ]},
      { level: 'Tests E2E', subtitle: 'Vrai navigateur, vrais parcours utilisateurs, zéro mocks', tools: [
        { name: 'Playwright', desc: 'Exécute la suite smoke d\'OdemLab sur Chromium, Firefox et WebKit — vérifie que les pages publiques chargent, le panier fonctionne et le checkout se termine. La régression visuelle attrape les changements CSS accidentels.' },
        { name: 'Selenium WebDriver', desc: 'Modèle Page Object pour la non-régression cross-browser — quand l\'UI d\'OdemLab change, seul le Page Object se met à jour, pas chaque test. La suite reste maintenable.' },
        { name: 'axe-core', desc: 'Audite chaque route publique contre WCAG 2.2 — attrape les textes alternatifs manquants, les formulaires non étiquetés et les repères ARIA cassés avant qu\'ils n\'atteignent les utilisateurs.' },
      ]},
    ],
    extra: {
      title: 'Méthodes & Pratiques',
      items: [
        'Modèle Page Object — le checkout, le catalogue et l\'auth d\'OdemLab sont chacun une classe. Quand le texte du bouton passe de « Payer » à « Valider la commande », une seule ligne se met à jour, pas vingt tests.',
        'Régression gating CI — Playwright s\'exécute sur chaque PR d\'OdemLab. Si la smoke échoue, le merge est bloqué. Pas d\'exception.',
        'Régression visuelle — les captures baseline détectent quand un changement CSS casse accidentellement la grille produits, décale le héros ou change la couleur d\'accent de la marque.',
        'Accessibilité d\'abord — les règles structurales axe-core (labels manquants, repères cassés, pas de skip-link) sont des portes CI strictes sur chaque route publique d\'OdemLab.',
        'Tests de contrat — les schémas OpenAPI sont validés contre le backend Spring Boot en direct, donc l\'équipe frontend ne consomme jamais un endpoint qui n\'existe pas.',
        'Tests de charge — les scripts k6 mesurent combien d\'utilisateurs simultanés l\'API OdemLab gère avant la dégradation, informant les paramètres de dimensionnement Cloud Run.',
      ],
    },
    pillars: [
      { icon: 'M4 6h16M4 12h16m-7 6h7', title: 'DevOps & Infrastructure', subtitle: 'Livrer vite, livrer sûr, surveiller l\'exécution.', items: [
        { name: 'Docker', desc: 'Les builds multi-étapes empaquetent le backend et frontend OdemLab en images de production minimales — pas de dépendances dev, pas de code source, surface d\'attaque réduite. Docker Compose reproduit la pile complète en local pour les tests.' },
        { name: 'GitHub Actions', desc: 'À chaque push : tests backend + frontend, construction des images Docker, push vers GHCR, déploiement Cloud Run. Si les tests échouent, le déploiement ne démarre jamais. Retour arrière automatique si la vérification de santé échoue.' },
        { name: 'Google Cloud Run', desc: 'OdemLab tourne sur Cloud Run avec des déploiements sans trafic (aucune requête ne touche la nouvelle version tant qu\'elle ne passe pas les health checks) et retour arrière automatique si la latence ou le taux d\'erreur augmente.' },
        { name: 'Grafana + Prometheus', desc: 'Tableaux de bord en temps réel affichant les temps de réponse, taux d\'erreur et débit de l\'API OdemLab. Alertes quand la latence p95 dépasse les seuils — on sait avant les utilisateurs.' },
        { name: 'Flyway', desc: 'Le schéma de la base OdemLab est géré par 93 migrations SQL versionnées — rejouables depuis zéro. Toute base fraîche obtient le bon schéma en quelques secondes, pas de patches SQL manuels.' },
        { name: 'ShedLock', desc: 'Les verrous distribués garantissent que les tâches cron d\'OdemLab (récupération de panier, rappels, nettoyage RGPD) s\'exécutent une seule fois sur plusieurs instances Cloud Run — jamais dupliquées, jamais oubliées.' },
      ]},
      { icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', title: 'Sécurité & Conformité', subtitle: 'Défense en profondeur, pas l\'obscurité.', items: [
        { name: 'JWT + Rotation', desc: 'Les jetons d\'accès d\'OdemLab expirent en minutes. Les refresh tokens tournent à chaque utilisation — si un token fuite, l\'original est immédiatement invalidé. Fenêtre de détournement : secondes, pas heures.' },
        { name: 'Chiffrement AES-256-GCM', desc: 'Les numéros de téléphone, adresses et noms des clients sont chiffrés au niveau de la base. Même un dump complet de la base n\'expose que du texte illisible pour les données personnelles.' },
        { name: 'Rate Limiting', desc: 'La connexion OdemLab autorise 10 tentatives par IP par minute. La validation de coupon : 5 par minute pour empêcher le force brute. Les utilisateurs légitimes ne remarquent rien ; les bots sont bloqués.' },
        { name: 'Conformité RGPD', desc: 'Des jobs nocturnes automatiques purgeent les données expirées. Les demandes de droit à l\'effacement suppriment tous les enregistrements clients avec piste d\'audit. La conformité n\'est pas un ajout — c\'est planifié.' },
        { name: 'CORS + CSP', desc: 'Seuls les domaines OdemLab peuvent appeler l\'API. Les scripts ne se chargent que depuis des sources fiables via des politiques par nonce. Empêche l\'exfiltration de données et l\'injection de scripts non autorisés.' },
        { name: 'CAPTCHA Turnstile', desc: 'Le checkout invité et les endpoints d\'auth sont protégés par Cloudflare Turnstile — invisible pour les vrais utilisateurs, bloque les bots automatiques qui créent de faux ordres ou testent des mots de passe.' },
      ]},
      { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Business & Produit', subtitle: 'Du code qui génère du revenu, pas juste du code qui fonctionne.', items: [
        { name: 'Commandes Idempotentes', desc: 'Chaque checkout OdemLab porte une clé d\'idempotence unique. Si le réseau réessaie, le client est débité une seule fois — pas deux. Revenu protégé, confiance préservée.' },
        { name: 'Prix côté Serveur', desc: 'Le frontend OdemLab n\'envoie jamais les prix au backend. Tous les calculs se font côté serveur — réductions, livraison, totaux. La manipulation client-side des prix est impossible.' },
        { name: 'Stripe + CMI + COD', desc: 'Trois chemins de paiement alimentent un seul cycle de commande. Stripe pour les cartes internationales, CMI pour les moyens de paiement marocains, contre-remboursement pour la confiance locale. Conversion maximale, complexité minimale.' },
        { name: 'Intégrité Stock', desc: 'SELECT FOR UPDATE verrouille les lignes produits pendant le checkout — deux clients ne peuvent pas acheter le dernier article simultanément. Décrément atomique empêche le surstockage.' },
        { name: 'Checkout Invité', desc: 'Les clients achètent sans créer de compte. Un jeton à usage unique leur permet de suivre leur commande. Frottement réduit, conversion augmentée, pas d\'abandon d\'inscription.' },
        { name: 'Trilingue + RTL', desc: 'OdemLab supporte le français, l\'anglais et l\'arabe avec un vrai miroir de mise en page — navigation, formulaires et contenus se retournent pour les lecteurs arabes. Pas des libellés traduits, une expérience entièrement miroir.' },
      ]},
    ],
  },
  contact: {
    kicker: 'Contact', title: 'Construisons quelque chose de solide.',
    sub: 'Je cherche un ', subEm: 'stage PFE', subEnd: ' \u2014 backend ou full-stack, Maroc ou distanciel, id\u00e9alement l\u00e0 o\u00f9 le code part en production. Je r\u00e9ponds vite.',
    name: 'Votre nom', namePh: 'Votre nom complet', email: 'Adresse e-mail', emailPh: 'vous@entreprise.com',
    msg: 'D\u00e9tails du projet', msgPh: 'Que construisez-vous, et pour quand ?', send: 'Envoyer', sending: '...',
    success: '\u2713 Message envoy\u00e9 \u2014 Je vous r\u00e9ponds vite.', error: '\u2717 Une erreur s\u2019est produite. \u00c9crivez-moi directement.',
    timezone: 'Maroc (GMT+1) \u00b7 travaille \u00e0 distance partout dans le monde',
    direct: 'E-mail direct', phone: 'T\u00e9l\u00e9phone', tz: 'Fuseau horaire', linkedin: 'LinkedIn', github: 'GitHub',
  },
  footer: { built: '', top: 'Haut', elsewhere: 'Ailleurs' },
  dock: { home: 'Accueil', work: 'Projets', contact: 'Contact', lang: 'Langue', nav: 'Navigation rapide', toggle: 'Basculer mode clair / sombre', resume: 'CV' },
};

const ar: Dict = {
  dir: 'rtl',
  nav: { work: 'أعمالي', about: 'نبذة', experience: 'المسار', education: 'التكوين', tools: 'الهندسة', contact: 'اتصل بي', resume: 'السيرة الذاتية' },
  hero: {
    badge: 'متاح لتدريب PFE — لنحدد الموعد',
    titleA: 'أبني ', titleEm: 'منتجات كاملة', titleB: ' — API، ويب، موبايل.',
    lede1: 'مرحباً، أنا أحمد ورالي، طالب مهندس في السنة الخامسة بـ ENSIASD تارودانت. أنهيت للتو تدريب نهاية السنة (PFA) في Zorium حيث بنيت ',
    lede2: '، منصة تجارة إلكترونية للتجميل مدعومة بالذكاء الاصطناعي: API Spring Boot، متجر Next.js ومكتب خلفي، تطبيق React Native، PostgreSQL + Redis، منشورة عبر Docker على Google Cloud.',
    ctaWork: 'استعرض أعمالي', ctaContact: 'تواصل معي',
    cardRole: 'مهندس برمجيات Full-Stack', cardTech: 'التقنيات الأساسية',
    statsLabels: ['مشاريع منشورة', 'تقنيات', 'منصات', 'تدريبات مكتملة'] as [string, string, string, string],
    viewAll: 'عرض كل الـ 22 تقنية',
  },
  core: ['Java 21 / Spring Boot', 'TypeScript / Next.js', 'React Native / Flutter', 'PostgreSQL', 'Docker', 'Playwright / Selenium'],
  filters: { all: 'الكل', web: 'ويب', mobile: 'موبايل', backend: 'باك-إند', ai: 'ذكاء اصطناعي', iot: 'إنترنت الأشياء' },
  work: {
    kicker: 'أعمال مختارة', title: 'أنظمة تعمل في الإنتاج، لا عروض تعمل مرة واحدة.',
    sub: 'ستة مشاريع عبر الويب والموبايل والباك-إند والذكاء الاصطناعي إنترنت الأشياء — كلها منشورة أو مستعملة أو مُقيّمة.',
    projects: [
      { title: 'OdemLab — تجارة التجميل بالذكاء الاصطناعي', year: 'الأبرز', kind: 'فريق من 4 · مستودع خاص', heading: 'OdemLab', lead: 'd',
        description: 'منصة تجارة إلكترونية كاملة مع API Spring Boot، متجر Next.js ومكتب خلفي، وتطبيق React Native. العملاء يدفعون عبر Stripe أو CMI المغربية أو الدفع عند الاستلام — الكل يمر بدورة طلب واحدة. تحليل البشرة بالذكاء الاصطناعي من Gemini يتدهور بGrace خلف Circuit Breakers. ثلاث لغات FR/EN/AR مع تخطيط RTL عربي حقيقي. نشر على Cloud Run بدون توقف مع رجوع تلقائي.',
        note: 'مستودع خاص — عرض حي ومراجعة الكود عند الطلب.' },
      { title: 'منصة المواعيد الطبية', year: '2025', kind: 'تدريب · Full-stack', heading: 'طبي', lead: 'ب',
        description: 'نظام حجز أطباء-مرضى حيث يبحث المرضى عن الممارسين، يختارون المواعيد ويحجزون دون تعارض. لوحات الأدوار للمرضى والممارسين والإداريين تُظهر النشاط لحظياً — تُلغي الجدولة اليدوية.',
        note: 'مشروع زبون — التفاصيل عند الطلب.' },
      { title: 'FitTrack — منصة رياضية', year: '2025', kind: 'فردي · Full-stack', heading: 'FitTrack', lead: 'i',
        description: 'متتبع تمارين سحابي حيث يولد نموذج ذكاء اصطناعي حصصاً مخصصة حسب الأهداف. مصادقة بالرموز والحجم المُحتوى يضمنان نفس العمل على أي جهاز — لا مفاجآت « يعمل على جهازي فقط ».' },
      { title: 'رفيق الحرم الذكي', year: '2026', kind: 'فريق · موبايل + AR', heading: 'Campus', lead: 'a',
        description: 'تطبيق ملاحة بالواقع المعزز لحرم ENSIASD — وجّه هاتفك للحصول على إرشاد داخلي خطوة بخطوة. الطلاب يجدون قاعات فارغة لحظياً، يتلقون إشعارات، والإداريون يتحكمون في الوصول حسب الدور.' },
      { title: 'SmartSummarizer', year: '2025', kind: 'فردي · تعلم آلي', heading: 'ملخص', lead: 'خ',
        description: 'مُلخِّص مستندات يستخدم نماذج Transformer ويوّلد أيضاً اختبارات وخرائط ذهنية. الطلاب يرفعون ملاحظاتهم ويحصلون على مواد مراجعة منظمة في ثوانٍ.' },
      { title: 'عدّ علب السمك', year: '2024 · مشروع التخرج', kind: 'مدمج · مشروع النهاية', heading: 'IoT', lead: 'T',
        description: 'نظام عد بحساسات IR على ESP8266 يسجّل علب السمك لحظياً على لوحة ويب. في المصنع، دقة القياس هي المنتج — العد اليدوي يخسر المال، هذا النظام لا يخسر.' },
    ],
  },
  about: {
    kicker: 'نبذة', title: 'ميل للباك-إند، عقلية منتج — من الحساس إلى المتجر.',
    sub: 'من firmware الـ ESP8266 إلى نشر Cloud Run: أهتم بالأماكن التي يكلّف فيها الخطأ مالاً حقيقياً، وأفضّل الضمانات المنفَّذة على الأعراف.',
    stats: [
      { label: 'مجالات منشورة', sub: 'ويب · موبايل · API · QA · IoT' },
      { label: 'لغات حيّة', sub: 'FR · EN · AR + RTL' },
      { label: 'حزم اختبار E2E', sub: 'Playwright · Selenium' },
      { label: 'ترحيلات Flyway', sub: 'قابلة لإعادة التشغيل من الصفر' },
    ],
    bestTitle: 'أفضل ما أفعله',
    best: [
      'تصميم REST API: نقاط نهاية مُصدَرة مع عقود OpenAPI — فريق الويب يستهلك عملاء مولّدين، لا تخمين',
      'سلامة المعاملات: طلبات غير قابلة للتكرار، أقفال متفائلة على المنتجات، SELECT FOR UPDATE على المخزون — مسارات المال لا تُدفع مرتين أبداً',
      'اختبار E2E: حزم Playwright على Chromium/Firefox/WebKit مع بوابات وصول axe-core — تلتقط الانحدارات قبل المستخدمين',
      'واجهات ثلاثية اللغات: FR/EN/AR مع تخطيط RTL عربي حقيقي — لا مجرد تسميات مترجمة، بل تنقل ونماذج ومحتوى معكوسة',
    ],
    methodTitle: 'كيف أعمل',
    method: [
      'Kanban مع CI خضراء كبوابة دمج — الكود الذي لا يجتاز الاختبارات لا يُنشر',
      'تغييرات المخطط كترحيلات Flyway قابلة لإعادة التشغيل — أي قاعدة تُبنى من الصفر، لا خطوات يدوية',
      'أمن متعدد الطبقات: JWT قصيرة، PII مشفرة بـ AES-256-GCM، حدود حسب IP، رؤوس CORS/CSP',
      'نطاق صادق: أسمي حالات الحدود التي لم أتعامل معها والحدود التي أعرفها — لا ثقة زائفة',
    ],
    langs: [{ l: 'العربية', lvl: 'الأم' }, { l: 'الفرنسية', lvl: 'مهنية' }, { l: 'الإنجليزية', lvl: 'مهنية' }],
  },
  exp: {
    kicker: 'المسار', title: 'الخبرة والتكوين.',
    jobs: [
      { when: 'يونيو 2026 — سبتمبر 2026 · أكادير، حضوري', title: 'مشروع نهاية السنة (PFA) — مطور Full-Stack', org: 'Zorium، تكنوبارك أكادير', where: 'منصة OdemLab · فريق من أربعة',
        points: ['وحدات الباك-إند: الطلبات، المنتجات، المدفوعات، المصادقة، GDPR', 'تحصين مسارات المال: تسعير من الخادم، دفع غير قابل للتكرار، دورة طلبات مدققة', 'النشر على Cloud Run: نشر بدون توقف، فحص صحة، ترقية الميزات، رجوع تلقائي عند الفشل'] },
      { when: 'يوليوز 2025 — سبتمبر 2025 · عن بعد', title: 'متدرب مطور Full-Stack', org: 'منصة المواعيد الطبية', where: 'Laravel · MySQL · Bootstrap',
        points: ['حجز مرضى-مدارسين مع قواعد عدم التعارض ولوحات حسب الدور'] },
      { when: 'يونيو 2023 — أغسطس 2023', title: 'متدرب أتمتة QA', org: 'حزم الانحدار الويب', where: 'Python · Selenium WebDriver · Page Objects',
        points: ['استبدال حملة يدوية بحزم انحدار آلية، نقطة تغيير واحدة لكل شاشة'] },
    ],
  },
  edu: {
    kicker: 'التكوين', title: 'مدارس، لا وظائف.', sub: 'التكوينان وراء هذا العمل.',
    entries: [
      { years: '2024 — الآن', title: 'سلك المهندسين، هندسة البرمجيات', school: 'ENSIASD · جامعة ابن زهر — تارودانت', desc: 'ذكاء اصطناعي، علم البيانات، معمارية البرمجيات.' },
      { years: '2022 — 2024 · بميزة', title: 'DUT، المعلوميات المدمجة', school: 'EST وجدة — المدرسة العليا للتكنولوجيا', desc: 'أنظمة مدمجة، إنترنت الأشياء، firmware — ESP32/ESP8266، Arduino، Raspberry Pi.' },
    ],
  },
  tools: {
    kicker: 'ممارسات الهندسة', title: 'كيف أنشر — من الاختبار إلى الإنتاج.',
    sub: 'الجودة ليست مجرد اختبار. إنها الحلقة الكاملة: الكتابة، الأمان، النشر، والمراقبة.',
    pyramid: { title: 'هرم الاختبار', subtitle: 'السرعة والثقة في كل طبقة' },
    levels: [
      { level: 'اختبار الوحدات', subtitle: 'سريعة، معزولة، تُنفَّذ مع كل commit', tools: [
        { name: 'JUnit 5', desc: 'يتحقق من منطق OdemLab التجاري — أسعار الطلبات، التحقق من الكوبونات، قواعد المخزون — قبل أي نشر. يلتقط أخطاء التسعير التي تخسر المال. أقل من ثانيتين لكل اختبار.' },
        { name: 'Mockito', desc: 'يحل محل Stripe وGemini AI وSMTP في الاختبارات للتحقق من القواعد التجارية دون دفع أ.functions API حقيقية. يحاكي أيضاً الأعطال (مهلة، 500) للتأكيد على التدهور الرشيق.' },
        { name: 'Vitest', desc: 'يشغل اختبارات OdemLab前端 بالمللي ثانية — يتحقق من أن متجر Next.js يعرض الأسعار الصحيحة، السلة تتحدث، والترجمة تبدّل اللغات. أسرع 10 مرات من Jest لـ TypeScript.' },
        { name: 'Jest', desc: 'يختبر تطبيق React Native على iOS وAndroid من كود واحد — يؤكد أن تسجيل الدخول، السلة، والأوامر تعمل بشكل مطابق لنسخة الويب.' },
      ]},
      { level: 'اختبارات التكامل', subtitle: 'قواعد بيانات حقيقية، حاويات حقيقية، عقود حقيقية', tools: [
        { name: 'Testcontainers', desc: 'يشغل PostgreSQL 18 وRedis 7 في Docker أثناء CI — مطابق للإنتاج. يلتقط أخطاء قيود SQL وأخطاء التخزين المؤقت التي تفوتها القواعد المحاكية.' },
        { name: '@SpringBootTest', desc: 'يحمل سياق Spring Boot الكامل للتحقق من توصيل المكونات — يلتقط أخطاء التوصيل غير المرئية في اختبارات الوحدة.' },
        { name: 'Supertest', desc: 'يتحقق من مسارات API Next.js في OdemLab بإرسال طلبات HTTP حقيقية — يؤكد أن المتجر يمكنه الوصول فعلياً إلى الخادم قبل النشر.' },
        { name: 'React Testing Library', desc: 'يختبر مكونات React من منظور المستخدم — نقرات، نماذج، انتظار النتائج. إذا لم يتمكن العميل من إتمام الشراء، يفشل هذا الاختبار.' },
      ]},
      { level: 'اختبارات E2E', subtitle: 'متصفح حقيقي، مسارات مستخدم حقيقية، صفر mocks', tools: [
        { name: 'Playwright', desc: 'يشغل مجموعة اختبارات OdemLab على Chromium وFirefox وWebKit — يتحقق من تحميل الصفحات العامة، عمل السلة، وإتمام الشراء. التناقص البصري يلتقط تغييرات CSS العرضية.' },
        { name: 'Selenium WebDriver', desc: 'نموذج Page Object لعدم التناقص عبر المتصفحات — عند تغيير واجهة OdemLab، يتحدث فقط Page Object، ليس كل اختبار. يحافظ على المجموعة قابلة للصيانة.' },
        { name: 'axe-core', desc: 'يتدقيق كل مسار عام ضد WCAG 2.2 — يلتقط النصوص البديلة المفقودة، النماذج غير المُسمّاة، ومعالم ARIA المكسورة قبل وصولها للمستخدمين.' },
      ]},
    ],
    extra: {
      title: 'المناهج والممارسات',
      items: [
        'نموذج Page Object — الدفع، الكتالوج، والمصادقة في OdemLab كل واحد فئة واحدة. عند تغيير نص الزر من « الدفع » إلى « تأكيد الطلب »، سطر واحد يتحدث، ليس عشرين اختباراً.',
        'استيفاء CI — Playwright يشغّل على كل PR في OdemLab. إذا فشلت المجموعة الأساسية، يُمنع الدمج. لا استثناء.',
        'تناقص بصري — لقطات baseline تكشف عندما يكسر تغيير CSS بالخطأ شبكة المنتجات أو يزيح البطل أو يغيّر لون العلامة التجارية.',
        'إمكانية الوصول أولاً — القواعد الهيكلية axe-core (نصوص بديلة مفقودة، معالم مكسورة، لا skip-link) هي بوابات CI صارمة على كل مسار عام في OdemLab.',
        'اختبارات العقود — مخططات OpenAPI مُتحقق منها ضد الخادم المباشر، لذلك فريق الواجهة لا يستهلك نقطة نهاية غير موجودة أبداً.',
        'اختبارات الحمل — سكريبتات k6 تقيس عدد المستخدمين المتزامنين которые يتعامل معهم OdemLab قبل تدهور الاستجابة، مما ي informing إعدادات تحجيم Cloud Run.',
      ],
    },
    pillars: [
      { icon: 'M4 6h16M4 12h16m-7 6h7', title: 'DevOps والبنية التحتية', subtitle: 'نشر سريع، نشر آمن، مراقبة التشغيل.', items: [
        { name: 'Docker', desc: 'بناء متعدد المراحل يُعلّب backend وfrontend OdemLab في صور إنتاج مصغرة — لا مكتبات تطوير، لا كود مصدر، سطحة هجوم مصغرة. Docker Compose يُعيد بناء الكامل محلياً للاختبار.' },
        { name: 'GitHub Actions', desc: 'عند كل push: اختبارات backend + frontend، بناء صور Docker، دفع إلى GHCR، نشر على Cloud Run. عند فشل الاختبارات، لا يبدأ النشر أبداً. رجوع تلقائي عند فشل فحص الصحة.' },
        { name: 'Google Cloud Run', desc: 'OdemLab يعمل على Cloud Run مع نشر بدون ترافيك (لا طلبات تصل للنسخة الجديدة حتى تجتاز فحص الصحة) ورجوع تلقائي إذا ارتفعت زمن الاستجابة أو معدل الخطأ.' },
        { name: 'Grafana + Prometheus', desc: 'لوحات_dashboard في الوقت الحقيقي تُظهر أوقات استجابة OdemLab ومعدل الأخطاء وال throughput. تنبيهات عند تجاوز p95 لعتبات — نعرف قبل المستخدمين.' },
        { name: 'Flyway', desc: 'مخطط قاعدة OdemLab مُدير بـ 93 ترحيل SQL مُصدَر — قابل لإعادة التشغيل من الصفر. أي قاعدة جديدة تحصل على المخطط الصحيح في ثوانٍ، لا رقع SQL يدوية.' },
        { name: 'ShedLock', desc: 'أقفال موزعة تضمن أن مهام OdemLab الدورية (استرداد السلة، تذكيرات، تنظيف GDPR) تعمل مرة واحدة فقط عبر نسخ Cloud Run المتعددة — لا تضاعف، لا نسيان.' },
      ]},
      { icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', title: 'الأمان والامتثال', subtitle: 'دفاع متعدد الطبقات، ليس بالإخفاء.', items: [
        { name: 'JWT + تدوير Refresh', desc: 'رموز الوصول في OdemLab تنتهي خلال دقائق. Refresh tokens تدور مع كل استخدام — إذا تسرب رمز، يتم إبطال الأصلي فوراً. نافذة الاختطاف: ثوانٍ، ليس ساعات.' },
        { name: 'تشفير AES-256-GCM', desc: 'أرقام الهواتف والعناوين والأسماء مشفرة على مستوى قاعدة البيانات. حتى نسخة كاملة للقاعدة لا تكشف سوى نص مشفر للبيانات الشخصية.' },
        { name: 'Rate Limiting', desc: 'تسجيل الدخول في OdemLab يسمح بـ 10 محاولات لكل IP في الدقيقة. التحقق من الكوبون: 5 في الدقيقة لمنع القوة الغاشمة. المستخدمون الشرعيون لا يلاحظون؛ البوتات تُمنع.' },
        { name: 'امتثال GDPR', desc: 'مهام ليلية تلقائية تحذف البيانات المنتهية. طلبات الحق في المحو تحذف كل سجلات العميل مع سجل تدقيق. الامتثال ليس إضافياً — مُجدول.' },
        { name: 'CORS + CSP', desc: 'مجالات OdemLab فقط يمكنها استدعاء API. النصوص تُحمّل فقط من مصادر موثوقة عبر سياسات nonce. يمنع تسريب البيانات وحقن النصوص غير المصرح بها.' },
        { name: 'CAPTCHA Turnstile', desc: 'الدفع كضيف والمصادقة محميان بـ Cloudflare Turnstile — غير مرئيين للمستخدمين الحقيقيين، يمنعون البوتات من إنشاء طلبات وهمية أو تجربة كلمات مرور.' },
      ]},
      { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', title: 'الأعمال والمنتج', subtitle: 'كود يحقق إيرادات، ليس مجرد كود يعمل.', items: [
        { name: 'طلبات غير قابلة للتكرار', desc: 'كل عملية دفع في OdemLab تحمل مفتاح فريد. إذا أعاد الشبكة المحاولة، يُدفع العميل مرة واحدة — ليس مرتين. الإيراد محمي، الثقة محفوظة.' },
        { name: 'تسعير من الخادم', desc: 'Frontend OdemLab لا يُرسل الأسعار للخادم أبداً. كل الحسابات تتم خادمياً — الخصومات، الشحن، المجموع. التلاعب بالأسعار من الواجهة مستحيل.' },
        { name: 'Stripe + CMI + COD', desc: 'ثلاثة مسارات دفع تغذّي دورة طلب واحدة. Stripe للبطاقات الدولية، CMI لوسائل الدفع المغربية، الدفع عند الاستلام للثقة المحلية. تحويل أقصى، تعقيد أدنى.' },
        { name: 'سلامة المخزون', desc: 'SELECT FOR UPDATE يُقفل صفوف المنتجات أثناء الشراء — عميلان لا يمكنهما شراء آخر قطعة في نفس الوقت. خصم ذري يمنع البيع الزائد.' },
        { name: 'دفع كضيف', desc: 'العملاء يشترون دون إنشاء حساب. رمز للاستخدام الواحد يتيح تتبع الطلب. احتكاك أقل، تحويل أعلى، لا تسجيلات مهجورة.' },
        { name: 'ثلاث لغات + RTL', desc: 'OdemLab يدعم الفرنسية والإنجليزية والعربية مع انعكاس تخطيط حقيقي — التنقل والنماذج والمحتوى تتقلب للقراء العرب. لا مجرد تسميات مترجمة، تجربة كاملة مُعكوسة.' },
      ]},
    ],
  },
  contact: {
    kicker: 'اتصل بي', title: 'لنبنِ شيئاً متيناً.',
    sub: 'أبحث عن ', subEm: 'تدريب PFE', subEnd: ' — باك-إند أو full-stack، المغرب أو عن بعد، حيث يُنشر الكود للإنتاج. أرد بسرعة.',
    name: 'اسمك', namePh: 'اسمك الكامل', email: 'البريد الإلكتروني', emailPh: 'you@company.com',
    msg: 'تفاصيل المشروع', msgPh: 'ماذا تبني، ومتى؟', send: 'أرسل', sending: '...',
    success: '✓ تم إرسال الرسالة — سأرد عليك قريباً.', error: '✗ حدث خطأ. أرسل لي بريداً إلكترونياً مباشرة.',
    timezone: 'المغرب (GMT+1) · يعمل عن بُعد في جميع أنحاء العالم',
    direct: 'بريد مباشر', phone: 'الهاتف', tz: 'المنطقة الزمنية', linkedin: 'LinkedIn', github: 'GitHub',
  },
  footer: { built: '', top: 'الأعلى', elsewhere: 'منصات أخرى' },
  dock: { home: 'الرئيسية', work: 'أعمالي', contact: 'اتصل بي', lang: 'اللغة', nav: 'تنقل سريع', toggle: 'تبديل الوضع الفاتح / الداكن', resume: 'السيرة الذاتية' },
};

export const DICTS: Record<Lang, Dict> = { en, fr, ar };

type LangCtx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };
const Ctx = createContext<LangCtx>({ lang: 'en', setLang: () => {}, t: en });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const s = localStorage.getItem('ao-lang');
      if (s === 'fr' || s === 'ar' || s === 'en') return s;
      const nav = (navigator.language || 'en').toLowerCase();
      if (nav.startsWith('ar')) return 'ar';
      if (nav.startsWith('fr')) return 'fr';
    } catch { /* ignore */ }
    return 'en';
  });
  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', DICTS[lang].dir);
    try {
      localStorage.setItem('ao-lang', lang);
    } catch { /* ignore */ }
  }, [lang]);
  return <Ctx.Provider value={{ lang, setLang: setLangState, t: DICTS[lang] }}>{children}</Ctx.Provider>;
}

export function useLang() {
  return useContext(Ctx);
}

export const PROJECT_TAGS: string[][] = [
  tags.odemlab, tags.med, tags.fit, tags.campus, tags.sum, tags.iot,
];
export const PROJECT_CATS: string[][] = [
  ['web', 'mobile', 'backend'], ['web', 'backend'], ['web', 'backend'], ['mobile'], ['ai'], ['iot'],
];
export const PROJECT_THUMBS = ['thumb-odem', 'thumb-med', 'thumb-fit', 'thumb-campus', 'thumb-sum', 'thumb-iot'];
export const STAT_VALUES = [6, 3, 275, 124];
