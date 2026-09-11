import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Lang = 'en' | 'fr' | 'ar';
export const LANGS: { code: Lang; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'ar', label: 'عر' },
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
    direct: string; phone: string; tz: string;
  };
  footer: { built: string; top: string };
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
    ctaWork: 'Explore selected work', ctaContact: 'Get in touch',
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
        description: 'Full platform: versioned REST API, customer storefront, admin back-office, mobile app. Server-side pricing, idempotent orders, Stripe + CMI + cash-on-delivery, Gemini skin analysis behind circuit breakers, trilingual FR/EN/AR with RTL, zero-traffic Cloud Run deploys with auto-rollback.',
        note: 'Private repository — live demo and code walkthrough on request.' },
      { title: 'Medical appointment platform', year: '2025', kind: 'Internship · Full-stack', heading: 'Medical', lead: 'e',
        description: 'Doctor–patient booking: practitioner search, slot booking with no-overlap rules, role-based dashboards (patient, practitioner, admin) with activity charts.',
        note: 'Client project — details on request.' },
      { title: 'FitTrack — training platform', year: '2025', kind: 'Solo · Full-stack', heading: 'FitTrack', lead: 'i',
        description: 'Cloud workout tracking with model-assisted session generation, token auth and a fully containerized stack.' },
      { title: 'Smart Campus Companion', year: '2026', kind: 'Team · Mobile + AR', heading: 'Campus', lead: 'a',
        description: 'AR campus navigation for ENSIASD: indoor guidance, interactive map, realtime room availability, push notifications, role-based access.' },
      { title: 'SmartSummarizer', year: '2025', kind: 'Solo · Machine learning', heading: 'Summarizer', lead: 'u',
        description: 'Transformer-based document summarization with automatic quiz and mind-map generation.' },
      { title: 'Fish-box counting line', year: '2024 · DUT thesis', kind: 'Embedded · Final-year project', heading: 'IoT', lead: 'T',
        description: 'Production-line counting with IR sensors on ESP8266, realtime stock logging and a web dashboard — a system where measurement reliability is the product.' },
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
      'REST API design: versioning, contracts, OpenAPI-first with generated clients',
      'Transactional integrity: state machines, idempotence, optimistic/pessimistic locking',
      'E2E testing: Playwright multi-browser suites, Selenium Page Objects, CI-gated regression',
      'Trilingual interfaces with real RTL, not translated labels',
    ],
    methodTitle: 'How I work',
    method: [
      'Kanban flow with review + green CI as the merge gate',
      'Schema changes only as replayable, re-runnable migrations',
      'Security in depth: short-lived JWTs, encrypted PII, per-route rate limits',
      'Honest scoping: conditions claimed only when verified, limits named',
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
    kicker: 'Education', title: 'Schools, not jobs.', sub: 'The two formations behind the work above.',
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
        { name: 'JUnit 5', desc: 'Java unit & integration tests with Spring Boot' },
        { name: 'Mockito', desc: 'Mocking framework for service isolation' },
        { name: 'Vitest', desc: 'Blazing-fast TypeScript test runner (frontend)' },
        { name: 'Jest', desc: 'React Native & Node.js unit tests (mobile)' },
      ]},
      { level: 'Integration Testing', subtitle: 'Real databases, real containers, real contracts', tools: [
        { name: 'Testcontainers', desc: 'Spin up PostgreSQL/Redis in Docker for CI' },
        { name: '@SpringBootTest', desc: 'Full application context with sliced tests' },
        { name: 'Supertest', desc: 'HTTP assertion layer for Express/Next.js APIs' },
        { name: 'React Testing Library', desc: 'Component behavior tests, not implementation' },
      ]},
      { level: 'E2E Testing', subtitle: 'Real browser, real user flows, zero mocks', tools: [
        { name: 'Playwright', desc: 'Multi-browser (Chromium, Firefox, WebKit) with visual regression' },
        { name: 'Selenium WebDriver', desc: 'Page Object Model for cross-browser regression suites' },
        { name: 'axe-core', desc: 'WCAG 2.2 accessibility audit on every route' },
      ]},
    ],
    extra: {
      title: 'Methodologies & Practices',
      items: [
        'Page Object Model — reusable abstractions, not brittle selectors',
        'CI-gated regression — Playwright runs on every PR, blocks merge on failure',
        'Visual regression — screenshot baselines catch unintended UI drift',
        'Accessibility-first — axe-core structural rules as hard CI gates',
        'Contract testing — OpenAPI schemas validated against live backend',
        'Load testing — k6 scripts for API throughput baselines',
      ],
    },
    pillars: [
      { icon: 'M4 6h16M4 12h16m-7 6h7', title: 'DevOps & Infrastructure', subtitle: 'Ship fast, ship safe, watch it run.', items: [
        { name: 'Docker', desc: 'Multi-stage builds, compose stacks for local + CI' },
        { name: 'GitHub Actions', desc: 'CI/CD: test → build → push GHCR → deploy Cloud Run' },
        { name: 'Google Cloud Run', desc: 'Zero-traffic deploys, auto-rollback, health checks' },
        { name: 'Grafana + Prometheus', desc: 'Metrics dashboards, alerting on latency and errors' },
        { name: 'Flyway', desc: 'Versioned schema migrations, replayable from zero' },
        { name: 'ShedLock', desc: 'Distributed cron locks for background jobs' },
      ]},
      { icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', title: 'Security & Compliance', subtitle: 'Defense in depth, not security by obscurity.', items: [
        { name: 'JWT + Refresh Rotation', desc: 'Short-lived access tokens, single-use refresh tokens' },
        { name: 'AES-256-GCM Encryption', desc: 'PII columns encrypted at rest (phone, address, name)' },
        { name: 'Rate Limiting', desc: 'Per-IP and per-route sliding window limits' },
        { name: 'GDPR Compliance', desc: 'Data retention jobs, right to erasure with audit logs' },
        { name: 'CORS + CSP', desc: 'Origin allowlists, nonce-based script policies' },
        { name: 'Turnstile CAPTCHA', desc: 'Bot protection on guest checkout and auth endpoints' },
      ]},
      { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Business & Product', subtitle: 'Code that makes money, not just code that works.', items: [
        { name: 'Idempotent Orders', desc: 'Idempotency keys prevent double-charge on retry' },
        { name: 'Server-Side Pricing', desc: 'Client never sends prices — backend computes all' },
        { name: 'Stripe + CMI + COD', desc: 'Three payment paths, one order lifecycle' },
        { name: 'Inventory Integrity', desc: 'SELECT FOR UPDATE on stock, atomic decrement' },
        { name: 'Guest Checkout', desc: 'One-time access token, no account required' },
        { name: 'Trilingual + RTL', desc: 'FR/EN/AR with real layout mirroring, not labels' },
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
    direct: 'Direct email', phone: 'Phone', tz: 'Timezone',
  },
  footer: { built: '', top: 'Top' },
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
    kicker: 'Projets', title: 'Des systèmes qui tournent en production, pas des démos.',
    sub: 'Six réalisations web, mobile, backend, IA et IoT — chacune déployée, utilisée ou évaluée.',
    projects: [
      { title: 'OdemLab — e-commerce cosmétique IA', year: 'Vitrine', kind: 'Équipe de 4 · Dépôt privé', heading: 'OdemLab', lead: 'd',
        description: 'Plateforme complète : API REST versionnée, boutique client, back-office, app mobile. Tarification serveur, commandes idempotentes, Stripe + CMI + contre-remboursement, analyse cutanée Gemini derrière des coupe-circuits, trilingue FR/EN/AR avec RTL, déploiements Cloud Run sans trafic avec retour arrière auto.',
        note: 'Dépôt privé — démo en direct et revue de code sur demande.' },
      { title: 'Plateforme de rendez-vous médicaux', year: '2025', kind: 'Stage · Full-stack', heading: 'Médical', lead: 'e',
        description: 'Prise de rendez-vous médecins-patients : recherche de praticien, créneaux sans chevauchement, tableaux de bord par rôle avec indicateurs d’activité.',
        note: 'Projet client — détails sur demande.' },
      { title: 'FitTrack — suivi sportif', year: '2025', kind: 'Solo · Full-stack', heading: 'FitTrack', lead: 'i',
        description: 'Suivi d’entraînement infonuagique avec séances assistées par modèle, authentification par jeton et pile entièrement conteneurisée.' },
      { title: 'Smart Campus Companion', year: '2026', kind: 'Équipe · Mobile + RA', heading: 'Campus', lead: 'a',
        description: 'Navigation de campus en réalité augmentée pour l’ENSIASD : guidage intérieur, carte interactive, salles en temps réel, notifications push, accès par rôle.' },
      { title: 'SmartSummarizer', year: '2025', kind: 'Solo · Apprentissage auto', heading: 'Résumeur', lead: 'u',
        description: 'Résumé de documents par Transformers, avec génération automatique de quiz et de cartes mentales.' },
      { title: 'Comptage de boîtes de poisson', year: '2024 · PFE DUT', kind: 'Embarqué · Projet de fin d’études', heading: 'IoT', lead: 'T',
        description: 'Comptage sur chaîne de production par capteurs infrarouges sur ESP8266, stocks temps réel et tableau de bord web — un système où la fiabilité de la mesure est le produit.' },
    ],
  },
  about: {
    kicker: 'Profil', title: 'Backend d’abord, produit toujours — du capteur à la vitrine.',
    sub: 'Du firmware ESP8266 aux déploiements Cloud Run : je m’intéresse aux endroits où un bug coûte de l’argent, et je préfère les garanties exécutables aux conventions.',
    stats: [
      { label: 'Domaines livrés', sub: 'web · mobile · API · QA · IoT' },
      { label: 'Langues en ligne', sub: 'FR · EN · AR + RTL' },
      { label: 'Suites de tests E2E', sub: 'Playwright · Selenium' },
      { label: 'Migrations Flyway', sub: 'rejouables depuis zéro' },
    ],
    bestTitle: 'Mes points forts',
    best: [
      'Conception d\'API REST : versionnement, contrats, OpenAPI d\'abord avec clients générés',
      'Intégrité transactionnelle : machines à états, idempotence, verrouillages optimiste/pessimiste',
      'Tests E2E : suites Playwright multi-navigateurs, Page Objects Selenium, non-régression CI',
      'Interfaces trilingues avec vraie RTL, pas des libellés traduits',
    ],
    methodTitle: 'Ma méthode',
    method: [
      'Flux Kanban avec revue + CI verte comme barrière de fusion',
      'Schémas modifiés uniquement par migrations rejouables',
      'Sécurité en profondeur : JWT courts, PII chiffrées, quotas par route',
      'Cadrage honnête : conditions annoncées quand vérifiées, limites nommées',
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
    kicker: 'Pratiques d\'Ingénierie', title: 'Comment je livrer — du test à la production.',
    sub: 'La qualité ne se limite pas aux tests. C\'est la boucle complète : écrire, sécuriser, déployer, et surveiller.',
    pyramid: { title: 'Pyramide de Test', subtitle: 'Vitesse et confiance à chaque couche' },
    levels: [
      { level: 'Tests Unitaires', subtitle: 'Rapides, isolés, exécutés à chaque commit', tools: [
        { name: 'JUnit 5', desc: 'Tests unitaires & d\'intégration Java avec Spring Boot' },
        { name: 'Mockito', desc: 'Framework de mock pour l\'isolation des services' },
        { name: 'Vitest', desc: 'Runner de tests TypeScript ultra-rapide (frontend)' },
        { name: 'Jest', desc: 'Tests unitaires React Native & Node.js (mobile)' },
      ]},
      { level: 'Tests d\'Intégration', subtitle: 'Vraies bases de données, vrais conteneurs, vrais contrats', tools: [
        { name: 'Testcontainers', desc: 'Monter PostgreSQL/Redis en Docker pour le CI' },
        { name: '@SpringBootTest', desc: 'Contexte application complet avec tests découpés' },
        { name: 'Supertest', desc: 'Couche d\'assertion HTTP pour APIs Express/Next.js' },
        { name: 'React Testing Library', desc: 'Tests de comportement composant, pas d\'implémentation' },
      ]},
      { level: 'Tests E2E', subtitle: 'Vrai navigateur, vrais parcours utilisateurs, zéro mocks', tools: [
        { name: 'Playwright', desc: 'Multi-navigateur (Chromium, Firefox, WebKit) avec régression visuelle' },
        { name: 'Selenium WebDriver', desc: 'Modèle Page Object pour suites de non-régression cross-browser' },
        { name: 'axe-core', desc: 'Audit accessibilité WCAG 2.2 sur chaque route' },
      ]},
    ],
    extra: {
      title: 'Méthodes & Pratiques',
      items: [
        'Modèle Page Object — abstractions réutilisables, pas de sélecteurs fragiles',
        'Régression gating CI — Playwright sur chaque PR, bloque le merge en cas d\'échec',
        'Régression visuelle — captures d\'écran baseline détectent les dérives UI',
        'Accessibilité d\'abord — règles structurales axe-core comme portes CI strictes',
        'Tests de contrat — schémas OpenAPI validés contre le backend en direct',
        'Tests de charge — scripts k6 pour les bases de débit API',
      ],
    },
    pillars: [
      { icon: 'M4 6h16M4 12h16m-7 6h7', title: 'DevOps & Infrastructure', subtitle: 'Livrer vite, livrer sûr, surveiller l\'exécution.', items: [
        { name: 'Docker', desc: 'Builds multi-étapes, compose pour local + CI' },
        { name: 'GitHub Actions', desc: 'CI/CD : test → build → push GHCR → deploy Cloud Run' },
        { name: 'Google Cloud Run', desc: 'Déploiements zéro-traffic, auto-rollback, health checks' },
        { name: 'Grafana + Prometheus', desc: 'Tableaux de bord métriques, alertes latence et erreurs' },
        { name: 'Flyway', desc: 'Migrations de schéma versionnées, rejouables depuis zéro' },
        { name: 'ShedLock', desc: 'Verrous distribués pour les tâches cron' },
      ]},
      { icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', title: 'Sécurité & Conformité', subtitle: 'Défense en profondeur, pas l\'obscurité.', items: [
        { name: 'JWT + Rotation', desc: 'Tokens d\'accès courts, refresh tokens à usage unique' },
        { name: 'Chiffrement AES-256-GCM', desc: 'Colonnes PII chiffrées au repos (téléphone, adresse, nom)' },
        { name: 'Rate Limiting', desc: 'Limites glissantes par IP et par route' },
        { name: 'Conformité RGPD', desc: 'Jobs de rétention, droit à l\'effacement avec logs d\'audit' },
        { name: 'CORS + CSP', desc: 'Listes d\'origines, politiques de scripts par nonce' },
        { name: 'CAPTCHA Turnstile', desc: 'Protection bots sur checkout invité et endpoints d\'auth' },
      ]},
      { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Business & Produit', subtitle: 'Du code qui génère du revenu, pas juste du code qui fonctionne.', items: [
        { name: 'Commandes Idempotentes', desc: 'Clés d\'idempotence anti-double-paiement' },
        { name: 'Prix côté Serveur', desc: 'Le client n\'envoie jamais les prix — le backend calcule' },
        { name: 'Stripe + CMI + COD', desc: 'Trois modes de paiement, un cycle de commande' },
        { name: 'Intégrité Stock', desc: 'SELECT FOR UPDATE, décrément atomique' },
        { name: 'Checkout Invité', desc: 'Token à usage unique, pas de compte requis' },
        { name: 'Trilingue + RTL', desc: 'FR/EN/AR avec miroir de mise en page réel' },
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
    direct: 'E-mail direct', phone: 'T\u00e9l\u00e9phone', tz: 'Fuseau horaire',
  },
  footer: { built: '', top: 'Haut' },
};

const ar: Dict = {
  dir: 'rtl',
  nav: { work: 'أعمالي', about: 'نبذة', experience: 'المسار', education: 'التكوين', tools: 'الهندسة', contact: 'اتصل بي', resume: 'السيرة' },
  hero: {
    badge: 'متاح لتدريب PFE — لنناقش التوقيت',
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
    sub: 'ستة مشاريع عبر الويب والموبايل والباك-إند والذكاء الاصطناعي وإنترنت الأشياء — كلها منشورة أو مستعملة أو مُقيّمة.',
    projects: [
      { title: 'OdemLab — تجارة التجميل بالذكاء الاصطناعي', year: 'الأبرز', kind: 'فريق من 4 · مستودع خاص', heading: 'OdemLab', lead: 'd',
        description: 'منصة كاملة: REST API مُصدَرة، متجر للعملاء، مكتب خلفي، تطبيق موبايل. تسعير من الخادم، طلبات غير قابلة للتكرار، Stripe + CMI + الدفع عند الاستلام، تحليل البشرة بـ Gemini خلف circuit breakers، ثلاث لغات FR/EN/AR مع RTL، نشر Cloud Run بدون توقف مع رجوع تلقائي.',
        note: 'مستودع خاص — عرض حي ومراجعة الكود عند الطلب.' },
      { title: 'منصة المواعيد الطبية', year: '2025', kind: 'تدريب · Full-stack', heading: 'طبي', lead: 'ب',
        description: 'حجز مواعيد أطباء-مرضى: بحث عن الممارسين، حجوزات دون تعارض، لوحات حسب الدور مع مؤشرات النشاط.',
        note: 'مشروع زبون — التفاصيل عند الطلب.' },
      { title: 'FitTrack — منصة رياضية', year: '2025', kind: 'فردي · Full-stack', heading: 'FitTrack', lead: 'i',
        description: 'تتبع التمارين سحابياً مع حصص مولّدة بالنموذج، مصادقة بالرموز وحزمة مُحتواة بالكامل.' },
      { title: 'رفيق الحرم الذكي', year: '2026', kind: 'فريق · موبايل + AR', heading: 'Campus', lead: 'a',
        description: 'ملاحة الحرم بالواقع المعزز لـ ENSIASD: إرشاد داخلي، خريطة تفاعلية، توفر القاعات لحظياً، إشعارات، وصول حسب الدور.' },
      { title: 'SmartSummarizer', year: '2025', kind: 'فردي · تعلم آلي', heading: 'ملخص', lead: 'خ',
        description: 'تلخيص المستندات بنماذج Transformer مع توليد اختبارات وخرائط ذهنية تلقائياً.' },
      { title: 'عدّ علب السمك', year: '2024 · مشروع التخرج', kind: 'مدمج · مشروع النهاية', heading: 'IoT', lead: 'T',
        description: 'عدّ على خط الإنتاج بحساسات IR على ESP8266، تسجيل المخزون لحظياً ولوحة ويب — نظام تكون فيه موثوقية القياس هي المنتج نفسه.' },
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
      'تصميم REST API: إصدارات، عقود، OpenAPI أولاً مع عملاء مولّدين',
      'سلامة المعاملات: آلات الحالة، عدم التكرار، أقفال متفائلة/متشائمة',
      'اختبار E2E: حزم Playwright متعددة المتصفحات، Page Objects Selenium، انحدار CI',
      'واجهات ثلاثية اللغات مع RTL حقيقي، لا مجرد تسميات مترجمة',
    ],
    methodTitle: 'كيف أعمل',
    method: [
      'تدفق Kanban مع مراجعة + CI خضراء كبوابة دمج',
      'تغييرات المخطط فقط عبر ترحيلات قابلة لإعادة التشغيل',
      'أمن متعدد الطبقات: JWT قصيرة، PII مشفرة، حدود حسب المسار',
      'نطاق صادق: شروط مُعلنة عند التحقق فقط، وحدود مُسماة',
    ],
    langs: [{ l: 'العربية', lvl: 'الأم' }, { l: 'الفرنسية', lvl: 'مهنية' }, { l: 'الإنجليزية', lvl: 'مهنية' }],
  },
  exp: {
    kicker: 'المسار', title: 'الخبرة والتكوين.',
    jobs: [
      { when: 'يونيو 2026 — شتنبر 2026 · أكادير، حضوري', title: 'مشروع نهاية السنة (PFA) — مطور Full-Stack', org: 'Zorium، تكنوبارك أكادير', where: 'منصة OdemLab · فريق من أربعة',
        points: ['وحدات الباك-إند: الطلبات، المنتجات، المدفوعات، المصادقة، GDPR', 'تحصين مسارات المال: تسعير من الخادم، دفع غير قابل للتكرار، دورة طلبات مدققة', 'النشر على Cloud Run: نشر بدون توقف، فحص صحة، ترقية، رجوع تلقائي عند الفشل'] },
      { when: 'يوليوز 2025 — شتنبر 2025 · عن بعد', title: 'متدرب مطور Full-Stack', org: 'منصة المواعيد الطبية', where: 'Laravel · MySQL · Bootstrap',
        points: ['حجز مرضى-ممارسين مع قواعد عدم التعارض ولوحات حسب الدور'] },
      { when: 'يونيو 2023 — غشت 2023', title: 'متدرب أتمتة QA', org: 'حزم الانحدار الويب', where: 'Python · Selenium WebDriver · Page Objects',
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
      { level: 'اختبار الوحدات', subtitle: 'سريعة، معزولة، تُفذ مع كل commit', tools: [
        { name: 'JUnit 5', desc: 'اختبارات وحدة وتكامل Java مع Spring Boot' },
        { name: 'Mockito', desc: 'إطار mock لعزل الخدمات' },
        { name: 'Vitest', desc: 'مُشغّل اختبارات TypeScript سريع (الواجهة الأمامية)' },
        { name: 'Jest', desc: 'اختبارات وحدة React Native و Node.js (الموبايل)' },
      ]},
      { level: 'اختبارات التكامل', subtitle: 'قواعد بيانات حقيقية، حاويات حقيقية، عقود حقيقية', tools: [
        { name: 'Testcontainers', desc: 'تشغيل PostgreSQL/Redis في Docker للCI' },
        { name: '@SpringBootTest', desc: 'سياق تطبيق كامل مع اختبارات مجزأة' },
        { name: 'Supertest', desc: 'طبقة تأكيد HTTP لـ APIs Express/Next.js' },
        { name: 'React Testing Library', desc: 'اختبارات سلوك المكون، ليس التنفيذ' },
      ]},
      { level: 'اختبارات E2E', subtitle: 'متصفح حقيقي، مسارات مستخدم حقيقية، صفر mocks', tools: [
        { name: 'Playwright', desc: 'متعدد المتصفحات (Chromium, Firefox, WebKit) مع تناقص بصري' },
        { name: 'Selenium WebDriver', desc: 'نموذج Page Object لحقول غير التناقص عبر المتصفحات' },
        { name: 'axe-core', desc: 'تدقيق إمكانية الوصول WCAG 2.2 على كل مسار' },
      ]},
    ],
    extra: {
      title: 'المناهج والممارسات',
      items: [
        'نموذج Page Object — تجرييدات قابلة لإعادة الاستخدام، ليس مُختارات هشّة',
        'استيفاء CI — Playwright على كل PR، يمنع الدمج عند الفشل',
        'تناقص بصري — لقطات شاشة baseline تكشف انحراف واجهة المستخدم',
        'إمكانية الوصول أولاً — قواعد هيكلية axe-core كبوابات CI صارمة',
        'اختبارات العقود — تحقق مخططات OpenAPI من الباك-إند المباشر',
        'اختبارات الحمل — سكريبتات k6 لخطوط أساسية throughput API',
      ],
    },
    pillars: [
      { icon: 'M4 6h16M4 12h16m-7 6h7', title: 'DevOps والبنية التحتية', subtitle: 'نشر سريع، نشر آمن، مراقبة التشغيل.', items: [
        { name: 'Docker', desc: 'بناء متعدد المراحل، compose للمحلي + CI' },
        { name: 'GitHub Actions', desc: 'CI/CD : test → build → push GHCR → deploy Cloud Run' },
        { name: 'Google Cloud Run', desc: 'نشر بدون صفر توقف، رجوع تلقائي، فحص صحة' },
        { name: 'Grafana + Prometheus', desc: 'لوحات مقاييس، تنبيهات زمن الاستجابة والأخطاء' },
        { name: 'Flyway', desc: 'ترحيلات مخطط مُصدَرة، قابلة لإعادة التشغيل من الصفر' },
        { name: 'ShedLock', desc: 'أقفال موزعة للمهام الدورية' },
      ]},
      { icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', title: 'الأمان والامتثال', subtitle: 'دفاع متعدد الطبقات، ليس بالإخفاء.', items: [
        { name: 'JWT + تدوير Refresh', desc: 'رموز وصول قصيرة، refresh tokens للاستخدام الواحد' },
        { name: 'تشفير AES-256-GCM', desc: 'أعمدة PII مشفّرة عند الإقفال (هاتف، عنوان، اسم)' },
        { name: 'Rate Limiting', desc: 'حدود منزلقة حسب IP وحسب المسار' },
        { name: 'امتثال GDPR', desc: 'مهام الاحتفاظ، الحق في المحو مع سجلات التدقيق' },
        { name: 'CORS + CSP', desc: 'قوائم أصل، سياسات نصوص بالـ nonce' },
        { name: 'CAPTCHA Turnstile', desc: 'حماية البوتات على الدفع كضيف ونقاط المصادقة' },
      ]},
      { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', title: 'الأعمال والمنتج', subtitle: 'كود يُحدث إيرادات، ليس مجرد كود يعمل.', items: [
        { name: 'طلبات غير قابلة للتكرار', desc: 'مفاتيح عدم التكرار تمنع الدفع المزدوج' },
        { name: 'تسعير من الخادم', desc: 'العميل لا يُرسل الأسعار — الباك-إند يحسب كل شيء' },
        { name: 'Stripe + CMI + COD', desc: 'ثلاثة مسارات دفع، دورة طلب واحدة' },
        { name: 'سلامة المخزون', desc: 'SELECT FOR UPDATE، خصم ذري' },
        { name: 'دفع كضيف', desc: 'رمز للاستخدام الواحد، لا حاجة لحساب' },
        { name: 'ثلاث لغات + RTL', desc: 'FR/EN/AR مع انعكاس تخطيط حقيقي' },
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
    direct: 'بريد مباشر', phone: 'الهاتف', tz: 'المنطقة الزمنية',
  },
  footer: { built: '', top: 'الأعلى' },
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
