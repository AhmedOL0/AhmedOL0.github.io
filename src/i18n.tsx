import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Lang = 'en' | 'fr' | 'ar';
export const LANGS: { code: Lang; label: string; aria: string }[] = [
  { code: 'en', label: 'EN', aria: 'English' },
  { code: 'fr', label: 'FR', aria: 'Français' },
  { code: 'ar', label: 'عر', aria: 'العربية' },
];

export type ProjectT = {
  title: string; year: string; kind: string; heading: string; lead: string;
  description: string; result?: string; note?: string; linkLabel?: string; linkHref?: string;
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
  hero: { badge: string; titleA: string; titleEm: string; titleB: string; lede1: string; lede2: string; ctaWork: string; ctaContact: string; cardRole: string; cardTech: string; statsLabels: [string, string, string]; viewAll: string };
  core: string[];
  filters: { all: string; web: string; mobile: string; backend: string; ai: string; iot: string };
  work: { kicker: string; title: string; sub: string; showLess: string; projects: ProjectT[] };
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
    pillars: Pillar[];
  };
  contact: {
    kicker: string; title: string; sub: string; subEm: string; subEnd: string;
    name: string; namePh: string; email: string; emailPh: string; msg: string; msgPh: string;
    send: string; sending: string; success: string; error: string; timezone: string;
    respondTime: string;
    direct: string; phone: string; tz: string; linkedin: string; github: string;
  };
  footer: { built: string; top: string; elsewhere: string };
  dock: { home: string; work: string; contact: string; lang: string; nav: string; toggle: string; resume: string };
};

const tags = {
  odemlab: ['Spring Boot 3.5', 'Java 21', 'Next.js 16', 'React Native', 'Expo SDK 54', 'PostgreSQL 18', 'Redis 7', 'Tailwind CSS', 'Framer Motion', 'Docker', 'Terraform', 'GitHub Actions', 'GHCR', 'Google Cloud Run', 'Stripe', 'Gemini AI', 'Flyway', 'Caffeine', 'Resilience4j', 'ShedLock', 'Grafana', 'Prometheus', 'Playwright'],
  med: ['PHP', 'Laravel', 'MySQL', 'JavaScript', 'Bootstrap', 'Chart.js', 'BCrypt'],
  fit: ['Spring Boot', 'Java 17', 'Next.js', 'TypeScript', 'Tailwind CSS', 'MySQL', 'Docker', 'JWT', 'BCrypt'],
  campus: ['Flutter', 'Dart', 'Riverpod', 'Go Router', 'Firebase Auth', 'Cloud Firestore', 'ARCore', 'ARKit', 'QR Scanner'],
  sum: ['Python', 'Flask', 'PyTorch', 'Hugging Face', 'CamemBERT', 'spaCy', 'Groq', 'SQLAlchemy', 'MySQL', 'Bootstrap'],
  iot: ['ESP8266', 'VL53L0X', 'Arduino IDE', 'PHP', 'MySQL', 'SolidWorks', '3D Printing'],
};

const en: Dict = {
  dir: 'ltr',
  nav: { work: 'Work', about: 'About', experience: 'Experience', education: 'Education', tools: 'Engineering', contact: 'Contact', resume: 'Résumé' },
  hero: {
    badge: 'Open to PFE internship \u2014 backend or full-stack, Morocco or remote',
    titleA: 'Building ', titleEm: 'complete products', titleB: ', not just features.',
    lede1: 'Ahmed Ouarrali, 5th-year Software Engineering student at ENSIASD. Built ',
    lede2: ' end-to-end: Spring Boot API, Next.js storefront, React Native app, PostgreSQL + Redis, deployed with Docker to Google Cloud.',
    ctaWork: 'Browse production work', ctaContact: 'Get in touch',
    cardRole: 'Full-Stack Software Engineer', cardTech: 'Core technologies',
    statsLabels: ['Projects shipped', 'Platforms', 'Internships completed'] as [string, string, string],
    viewAll: '',
  },
  core: ['Java 21 / Spring Boot', 'TypeScript / Next.js', 'React Native / Flutter', 'PostgreSQL', 'Docker', 'Playwright / Selenium'],
  filters: { all: 'All', web: 'Web', mobile: 'Mobile', backend: 'Backend', ai: 'AI', iot: 'IoT' },
  work: {
    kicker: 'Selected work', title: 'Systems that run in production, not demos that run once.',
    sub: 'Six builds across web, mobile, backend, AI and IoT — each one deployed, used, or graded.',
    showLess: 'show less',
    projects: [
      { title: 'OdemLab — AI skincare e-commerce', year: 'Flagship', kind: 'Team of 4 · Private repo', heading: 'OdemLab', lead: 'd',
        description: 'A full e-commerce platform with a Spring Boot API, Next.js storefront and back-office, and a React Native mobile app. Customers pay through Stripe, Moroccan CMI, or cash-on-delivery, all routed through one order lifecycle. AI skin analysis via Gemini degrades gracefully behind circuit breakers. Trilingual FR/EN/AR with real Arabic RTL layout. Infrastructure managed with Terraform, deploys to Cloud Run with zero-traffic promotion and auto-rollback on health-check failure.',
        result: '810 automated tests, 93 schema migrations, 3 payment integrations (Stripe, CMI, COD). Deployed to Cloud Run with zero-downtime promotion and auto-rollback.',
        note: 'Private repository — live demo and code walkthrough on request.' },
      { title: 'Medical appointment platform', year: '2025', kind: 'Internship · Full-stack', heading: 'Medical', lead: 'e',
        description: 'A Laravel-based clinic management platform for MOUSSA SOFT. Patients search doctors by specialty, book appointments online, and track consultation history. Doctors manage schedules, patients, services with pricing, and generate PDF medical reports. An admin dashboard oversees the full system. Built with MySQL, Bootstrap, and Chart.js.',
        result: 'Reduced scheduling from 15min phone calls to 2-minute online booking. Serving 3 doctor roles with automated PDF report generation.' },
      { title: 'FitTrack — training platform', year: '2025', kind: 'Team of 2 · Full-stack', heading: 'FitTrack', lead: 'i',
        description: 'A fitness web app with Spring Boot backend, Next.js frontend, and MySQL persistence. Users create custom training programs, track sessions in real time, and view BMI and calorie stats. An admin panel validates user-submitted programs and manages a 38-exercise library with video demos. Everything runs in three Docker containers on any machine.',
        result: 'Containerized in 3 Docker images. Full admin moderation pipeline across 38 exercises with video demos.' },
      { title: 'Smart Campus Companion', year: '2026', kind: 'Team of 4 · Flutter', heading: 'Campus', lead: 'a',
        description: 'A Flutter campus management app for ENSIASD. Students scan QR codes on classroom doors for instant room info and AR visualization. Professors reserve rooms and post announcements. An admin dashboard handles schedules, approvals, incident reports, and QR code generation. Built with Riverpod and Firebase Firestore.',
        result: 'QR-to-room info in one scan. Real-time Firestore sync across 7 collections for 3 campus roles.' },
      { title: 'SmartSummarizer', year: '2025', kind: 'Team of 4 · NLP', heading: 'Summarizer', lead: 'u',
        description: 'A Flask-based platform that transforms lecture PDFs and DOCX files into study tools using CamemBERT and Groq. Generates three summary levels, audio synthesis, auto-quizzes with adjustable difficulty, a Q&A chatbot, and mind maps. Students export results as PDF, JSON, or MP3.',
        result: '9.9s average processing. 8.4/10 quality score from 30 students.' },
      { title: 'Cane counting system', year: '2024 · DUT thesis', kind: 'Embedded · Final-year project', heading: 'IoT', lead: 'T',
        description: 'An ESP8266-based counting system using a VL53L0X laser distance sensor to detect and count canes on a production line. Data displays on an OLED screen in real time and transmits via Wi-Fi to a PHP/MySQL web dashboard. Custom 3D-printed enclosures designed in SolidWorks and fabricated with a Creality CR-10 Max.',
        result: 'Real-time cane counting at 98%+ accuracy. 3D-printed production-ready enclosure with OLED display.' },
    ],
  },
  about: {
    kicker: 'Background', title: 'Backend-leaning, product-minded — from sensor to storefront.',
    sub: 'From ESP8266 firmware to Cloud Run deploys: I care about the places where a bug costs real money, and I prefer executable guarantees over conventions.',
    stats: [
      { label: 'Domains shipped', sub: 'web · mobile · API · QA · IoT' },
      { label: 'Languages live', sub: 'FR · EN · AR + RTL' },
      { label: 'E2E test suites', sub: 'Playwright · 7 specs on this site' },
      { label: 'Flyway migrations', sub: 'OdemLab · replayable from zero' },
    ],
    bestTitle: 'What I do best',
    best: [
      'API Design, versioned endpoints with OpenAPI contracts so frontend and mobile teams consume generated clients, no manual guessing',
      'Transactional Integrity, idempotent orders, optimistic locking on products, and SELECT FOR UPDATE on stock. Money paths that never double-charge or oversell',
      'E2E Testing, Playwright suites across Chromium/Firefox/WebKit with axe-core accessibility gates. Catches regressions before users do',
      'Trilingual Interfaces, FR/EN/AR with real Arabic RTL layout mirroring. Not just translated labels, but mirrored navigation, forms, and content',
    ],
    methodTitle: 'How I work',
    method: [
      'CI-Gated Merges, code that does not pass tests does not ship. Green CI is the only merge gate',
      'Replayable Migrations, schema changes as Flyway scripts. Any database rebuilds from zero, no manual steps',
      'Security in Depth, short-lived JWTs, AES-256-GCM encrypted PII, per-IP rate limits, CORS/CSP headers',
      'Honest Scoping, I name the edge cases I have not handled and the limits I know about. No false confidence',
    ],
    langs: [{ l: 'Arabic', lvl: 'native' }, { l: 'French', lvl: 'professional' }, { l: 'English', lvl: 'professional' }],
  },
  exp: {
    kicker: 'Track record', title: 'Experience & education.',
    jobs: [
      { when: 'JUN 2026 — SEP 2026 · AGADIR, ON-SITE', title: 'End-of-year project (PFA) — Full-Stack Developer', org: 'Zorium, Technoparc Agadir', where: 'OdemLab platform · team of four',
        points: ['Owned backend business modules: orders, products, payments, auth, GDPR', 'Hardened the money paths: server-side pricing, idempotent checkout, audited order lifecycle', 'Shipped to Cloud Run: zero-traffic deploy, health check, promotion, auto-rollback on failure'] },
      { when: 'JUL 2025 — SEP 2025 · REMOTE', title: 'Full-Stack Developer Intern', org: 'MOUSSA SOFT · Agadir', where: 'Laravel · MySQL · Bootstrap',
        points: ['Built MediCare: patient-doctor booking, appointment scheduling, PDF report generation, Chart.js dashboards'] },
      { when: 'JUN 2023 — AUG 2023', title: 'QA Automation Intern', org: 'Web regression suites', where: 'Python · Selenium WebDriver · Page Objects',
        points: ['Replaced a manual campaign with automated non-regression suites, one change point per UI change'] },
      { when: 'JUN 2024 — JUN 2024 · AGADIR, ON-SITE', title: 'End-of-study internship (DUT) — Embedded Developer', org: 'MOUSSA SOFT · Agadir', where: 'ESP8266 · VL53L0X · PHP · MySQL',
        points: ['Built a cane counting system with ESP8266 + laser sensor, OLED display, Wi-Fi to PHP/MySQL dashboard', 'Designed 3D-printed enclosures in SolidWorks, fabricated with Creality CR-10 Max'] },
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
    pillars: [
      { icon: 'M4 6h16M4 12h16m-7 6h7', title: 'DevOps & Infrastructure', subtitle: 'Ship fast, ship safe, watch it run.', items: [
        { name: 'Docker', desc: 'Multi-stage builds package backend and frontend into minimal production images — no dev deps, no source code, reduced attack surface. Docker Compose reproduces the full stack locally.' },
        { name: 'GitHub Actions', desc: 'On every push: tests, Docker build, GHCR push, Cloud Run deploy. If tests fail, deploy never starts. Auto rollback on health-check failure.' },
        { name: 'Google Cloud Run', desc: 'Traffic-less deploys — no request hits the new version until it passes health checks. Automatic rollback if latency spikes or error rate climbs.' },
        { name: 'Grafana + Prometheus', desc: 'Real-time dashboards: response times, error rates, API throughput. p95 alerts — we know before users do.' },
        { name: 'Flyway', desc: '93 versioned SQL migrations, re-runnable from zero. Any fresh database gets the right schema in seconds.' },
        { name: 'ShedLock', desc: 'Distributed locks on cron jobs — cart recovery, reminders, GDPR cleanup. Never duplicated across Cloud Run instances.' },
        { name: 'Rate Limiting', desc: 'IP-based filters on /auth (10 req/min) and sensitive endpoints (coupons, analytics, newsletter). Fail-open: if Redis drops, the request passes — availability over protection.' },
        { name: 'JWT + PII Encryption', desc: 'HttpOnly cookies + Bearer token. PII (phones, addresses, order names) encrypted AES-256-GCM at column level — secrets never live in plaintext in the database.' },
        { name: 'Server Pricing', desc: 'The client never sends prices. Discounts are computed server-side via PromotionRepository — impossible to cheat checkout from the browser.' },
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
    respondTime: 'Typically respond within 24 hours',
    direct: 'Direct email', phone: 'Phone', tz: 'Timezone', linkedin: 'LinkedIn', github: 'GitHub',
  },
  footer: { built: '', top: 'Top', elsewhere: 'Elsewhere' },
  dock: { home: 'Home', work: 'Work', contact: 'Contact', lang: 'Language', nav: 'Quick navigation', toggle: 'Toggle light / dark mode', resume: 'Résumé' },
};

const fr: Dict = {
  dir: 'ltr',
  nav: { work: 'Projets', about: 'Profil', experience: 'Parcours', education: 'Formation', tools: 'Ingénierie', contact: 'Contact', resume: 'CV' },
  hero: {
    badge: 'Ouvert \u00e0 un stage PFE \u2014 backend ou full-stack, Maroc ou distanciel',
    titleA: 'Des ', titleEm: 'produits complets', titleB: ', pas juste des fonctionnalit\u00e9s.',
    lede1: 'Ahmed Ouarrali, \u00e9l\u00e8ve-ing\u00e9nieur en 5\u1d49 ann\u00e9e \u00e0 l\u2019ENSIASD. J\u2019ai construit ',
    lede2: ' de bout en bout : API Spring Boot, boutique Next.js, app React Native, PostgreSQL + Redis, d\u00e9ploy\u00e9 avec Docker sur Google Cloud.',
    ctaWork: 'Voir mes projets', ctaContact: 'Me contacter',
    cardRole: 'Ing\u00e9nieur Logiciel Full-Stack', cardTech: 'Technologies cl\u00e9s',
    statsLabels: ['Projets livr\u00e9s', 'Plateformes', 'Stages compl\u00e9t\u00e9s'] as [string, string, string],
    viewAll: '',
  },
  core: ['Java 21 / Spring Boot', 'TypeScript / Next.js', 'React Native / Flutter', 'PostgreSQL', 'Docker', 'Playwright / Selenium'],
  filters: { all: 'Tous', web: 'Web', mobile: 'Mobile', backend: 'Backend', ai: 'IA', iot: 'IoT' },
  work: {
    kicker: 'Projets', title: 'Des systèmes qui tournent en production, pas des démos qui tournent une fois.',
    sub: 'Six réalisations web, mobile, backend, IA et IoT — chacune déployée, utilisée ou évaluée.',
    showLess: 'voir moins',
    projects: [
      { title: 'OdemLab — e-commerce cosmétique IA', year: 'Vitrine', kind: 'Équipe de 4 · Dépôt privé', heading: 'OdemLab', lead: 'd',
        description: 'Plateforme e-commerce complète avec API Spring Boot, boutique Next.js et back-office, et application React Native. Les clients paient par Stripe, CMI marocaine ou contre-remboursement, tout passe par un seul cycle de commande. L\'analyse IA de la peau par Gemini dégrade gracieusement derrière des coupe-circuits. Trilingue FR/EN/AR avec vrai disposition RTL arabe. Infrastructure gérée avec Terraform, déploiement Cloud Run sans trafic et retour arrière automatique.',
        result: '810 tests automatisés, 93 migrations schema, 3 intégrations paiement (Stripe, CMI, COD). Déployé sur Cloud Run avec promotion sans interruption et rollback automatique.',
        note: 'Dépôt privé — démo en direct et revue de code sur demande.' },
      { title: 'Plateforme de rendez-vous médicaux', year: '2025', kind: 'Stage · Full-stack', heading: 'Médical', lead: 'e',
        description: 'Plateforme de gestion de cabinet médicale Laravel pour MOUSSA SOFT. Les patients recherchent des médecins par spécialité, prennent rendez-vous en ligne et suivent l\'historique des consultations. Les médecins gèrent leurs plannings, patients, services avec tarifs et génèrent des rapports médicaux en PDF. Un tableau de bord admin supervise le tout. Construit avec MySQL, Bootstrap et Chart.js.',
        result: 'Réduction de 15min d\'appel téléphonique à 2 minutes de réservation en ligne. 3 rôles médecins avec génération automatique de rapports PDF.' },
      { title: 'FitTrack — suivi sportif', year: '2025', kind: 'Équipe de 2 · Full-stack', heading: 'FitTrack', lead: 'i',
        description: 'Application web fitness avec backend Spring Boot, frontend Next.js et persistence MySQL. Les utilisateurs créent des programmes d\'entraînement personnalisés, suivent leurs séances en temps réel et visualisent IMC et dépense calorique. Un panneau admin valide les programmes soumis et gère une bibliothèque de 38 exercices avec démos vidéo. Le tout conteneurisé dans 3 conteneurs Docker.',
        result: 'Conteneurisé en 3 images Docker. Pipeline complet de modération admin pour 38 exercices avec démos vidéo.' },
      { title: 'Smart Campus Companion', year: '2026', kind: 'Équipe de 4 · Flutter', heading: 'Campus', lead: 'a',
        description: 'Application Flutter de gestion de campus pour ENSIASD. Les étudiants scannent les QR codes sur les portes des salles pour obtenir les informations instantanément avec visualisation AR. Les professeurs réservent des salles et publient des annonces. Un tableau de bord admin gère les emplois du temps, validations, signalements et génération de QR codes. Construit avec Riverpod et Firebase Firestore.',
        result: 'Info salle en un scan QR. Synchronisation Firestore temps réel pour 7 collections et 3 rôles campus.' },
      { title: 'SmartSummarizer', year: '2025', kind: 'Équipe de 4 · NLP', heading: 'Résumeur', lead: 'u',
        description: 'Plateforme Flask qui transforme les PDF et DOCX de cours en outils d\'étude grâce à CamemBERT et Groq. Génère trois niveaux de résumés, synthèse audio, quiz auto-générés avec difficulté ajustable, chatbot Q/A et cartes mentales. Les étudiants exportent en PDF, JSON ou MP3.',
        result: '9.9s de traitement moyen. Score qualité 8.4/10 sur 30 étudiants.' },
      { title: 'Système de comptage de cannes', year: '2024 · PFE DUT', kind: 'Embarqué · Projet de fin d\'études', heading: 'IoT', lead: 'T',
        description: 'Système de comptage basé sur ESP8266 utilisant un capteur laser VL53L0X pour détecter et compter les cannes sur une ligne de production. Les données s\'affichent en temps réel sur un écran OLED et se transmettent via Wi-Fi vers un tableau de bord web PHP/MySQL. Boîtiers 3D imprimés conçus dans SolidWorks et fabriqués avec une Creality CR-10 Max.',
        result: 'Comptage temps réel des cannes à 98%+ de précision. Boîtier 3D imprimé avec écran OLED.' },
    ],
  },
  about: {
    kicker: 'Profil', title: 'Backend d\'abord, produit toujours — du capteur à la vitrine.',
    sub: 'Du firmware ESP8266 aux déploiements Cloud Run : je m\'intéresse aux endroits où un bug coûte de l\'argent, et je préfère les garanties exécutables aux conventions.',
    stats: [
      { label: 'Domaines livrés', sub: 'web · mobile · API · QA · IoT' },
      { label: 'Langues en ligne', sub: 'FR · EN · AR + RTL' },
      { label: 'Suites de tests E2E', sub: 'Playwright · 7 specs, ce site' },
      { label: 'Migrations Flyway', sub: 'OdemLab · rejouables depuis zéro' },
    ],
    bestTitle: 'Mes points forts',
    best: [
      'Conception d\'API, endpoints versionnés avec contrats OpenAPI. L\'équipe frontend consomme des clients générés, plus de devinettes',
      'Intégrité Transactionnelle, commandes idempotentes, verrouillage optimiste sur les produits, SELECT FOR UPDATE sur le stock. Les chemins argent ne double-facturent jamais',
      'Tests E2E, suites Playwright sur Chromium/Firefox/WebKit avec portes d\'accessibilité axe-core. Attrapent les régressions avant les utilisateurs',
      'Interfaces Trilingues, FR/EN/AR avec vrai disposition RTL arabe. Pas des libellés traduits, mais une navigation, formulaires et contenus miroirs',
    ],
    methodTitle: 'Ma méthode',
    method: [
      'CI Comme Barrière, le code qui ne passe pas les tests ne part pas en production. CI verte = seule barrière de fusion',
      'Migrations Rejouables, changements de schéma comme scripts Flyway. Toute base se reconstruit depuis zéro',
      'Sécurité en Profondeur, JWT courts, PII chiffrées en AES-256-GCM, quotas par IP, en-têtes CORS/CSP',
      'Cadrage Honnête, je nomme les cas limites non traités et les limites connues. Pas de fausse confiance',
    ],
    langs: [{ l: 'Arabe', lvl: 'maternelle' }, { l: 'Français', lvl: 'professionnel' }, { l: 'Anglais', lvl: 'professionnel' }],
  },
  exp: {
    kicker: 'Parcours', title: 'Expérience et formation.',
    jobs: [
      { when: 'JUIN 2026 — SEPT. 2026 · AGADIR, SUR SITE', title: 'Projet de fin d’année (PFA) — Développeur Full-Stack', org: 'Zorium, Technoparc Agadir', where: 'Plateforme OdemLab · équipe de quatre',
        points: ['Modules métier backend : commandes, produits, paiements, auth, RGPD', 'Chemins monétaires fiabilisés : tarification serveur, checkout idempotent, cycle audité', 'Livraison Cloud Run : déploiement sans trafic, health check, promotion, rollback auto'] },
      { when: 'JUIL. 2025 — SEPT. 2025 · DISTANCIEL', title: 'Stagiaire Développeur Full-Stack', org: 'MOUSSA SOFT · Agadir', where: 'Laravel · MySQL · Bootstrap',
        points: ['MediCare : réservation patients-médecins, planning, génération de rapports PDF, tableaux Chart.js'] },
      { when: 'JUIN 2023 — AOÛT 2023', title: 'Stagiaire QA Automatisation', org: 'Suites de non-régression web', where: 'Python · Selenium WebDriver · Page Objects',
        points: ['Campagne manuelle remplacée par des suites automatisées, un point de changement par écran'] },
      { when: 'JUIN 2024 — JUIN 2024 · AGADIR, SUR SITE', title: 'Stage de fin d\'études (DUT) — Développeur Embarqué', org: 'MOUSSA SOFT · Agadir', where: 'ESP8266 · VL53L0X · PHP · MySQL',
        points: ['Système de comptage de cannes avec ESP8266 + capteur laser, écran OLED, Wi-Fi vers tableau PHP/MySQL', 'Boîtiers 3D imprimés conçus dans SolidWorks, fabriqués avec Creality CR-10 Max'] },
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
    pillars: [
      { icon: 'M4 6h16M4 12h16m-7 6h7', title: 'DevOps & Infrastructure', subtitle: 'Livrer vite, livrer sûr, surveiller l\u2019exécution.', items: [
        { name: 'Docker', desc: 'Builds multi-étapes empaquetent le backend et frontend en images minimales — pas de dépendances dev, pas de code source, surface d\u2019attaque réduite. Docker Compose reproduit la pile complète en local.' },
        { name: 'GitHub Actions', desc: 'À chaque push : tests, build Docker, push GHCR, déploiement Cloud Run. Si les tests échouent, le deploy ne démarre jamais. Retour arrière auto sur health-check.' },
        { name: 'Google Cloud Run', desc: 'Déploiements sans trafic — aucune requête ne touche la nouvelle version tant qu\u2019elle ne passe pas les health checks. Rollback automatique si la latence monte.' },
        { name: 'Grafana + Prometheus', desc: 'Dashboards temps réel : temps de réponse, taux d\u2019erreur, débit API. Alertes p95 — on sait avant les utilisateurs.' },
        { name: 'Flyway', desc: '93 migrations SQL versionnées, rejouables depuis zéro. Toute base fraîche obtient le bon schéma en secondes.' },
        { name: 'ShedLock', desc: 'Verrous distribués sur les tâches cron — récupération panier, rappels, nettoyage RGPD. Jamais dupliquées sur plusieurs instances Cloud Run.' },
        { name: 'Rate Limiting', desc: 'Filtres par IP sur /auth (10 req/min) et endpoints sensibles (coupons, analytics, newsletter). Fail-open : si Redis tombe, la requête passe — disponibilité > protection.' },
        { name: 'JWT + PII Encryption', desc: 'HttpOnly cookies + Bearer token. PII (phones, adresses, noms de commande) chiffré AES-256-GCM au niveau colonne — les secrets ne vivent jamais en clair en base.' },
        { name: 'Server Pricing', desc: 'Le client n\u2019envoie jamais de prix. Les remises sont calculées côté serveur via PromotionRepository — impossible de tricher le checkout côté navigateur.' },
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
    respondTime: 'Je r\u00e9ponds g\u00e9n\u00e9ralement sous 24 heures',
    direct: 'E-mail direct', phone: 'T\u00e9l\u00e9phone', tz: 'Fuseau horaire', linkedin: 'LinkedIn', github: 'GitHub',
  },
  footer: { built: '', top: 'Haut', elsewhere: 'Ailleurs' },
  dock: { home: 'Accueil', work: 'Projets', contact: 'Contact', lang: 'Langue', nav: 'Navigation rapide', toggle: 'Basculer mode clair / sombre', resume: 'CV' },
};

const ar: Dict = {
  dir: 'rtl',
  nav: { work: 'أعمالي', about: 'نبذة', experience: 'المسار', education: 'التكوين', tools: 'الهندسة', contact: 'اتصل بي', resume: 'السيرة الذاتية' },
  hero: {
    badge: 'متاح لتدريب PFE \u2014 باك-إند أو full-stack، المغرب أو عن بعد',
    titleA: 'أبني ', titleEm: 'منتجات كاملة', titleB: '، لا مجرد ميزات.',
    lede1: 'أحمد ورالي، طالب مهندس في السنة الخامسة بـ ENSIASD. بنيت ',
    lede2: ' من البداية للنهاية: API Spring Boot، متجر Next.js، تطبيق React Native، PostgreSQL + Redis، منشور عبر Docker على Google Cloud.',
    ctaWork: 'استعرض أعمالي', ctaContact: 'تواصل معي',
    cardRole: 'مهندس برمجيات Full-Stack', cardTech: 'التقنيات الأساسية',
    statsLabels: ['مشاريع منشورة', 'منصات', 'تدريبات مكتملة'] as [string, string, string],
    viewAll: '',
  },
  core: ['Java 21 / Spring Boot', 'TypeScript / Next.js', 'React Native / Flutter', 'PostgreSQL', 'Docker', 'Playwright / Selenium'],
  filters: { all: 'الكل', web: 'ويب', mobile: 'موبايل', backend: 'باك-إند', ai: 'ذكاء اصطناعي', iot: 'إنترنت الأشياء' },
  work: {
    kicker: 'أعمال مختارة', title: 'أنظمة تعمل في الإنتاج، لا عروض تعمل مرة واحدة.',
    sub: 'ستة مشاريع عبر الويب والموبايل والباك-إند والذكاء الاصطناعي إنترنت الأشياء — كلها منشورة أو مستعملة أو مُقيّمة.',
    showLess: 'عرض أقل',
    projects: [
      { title: 'OdemLab — تجارة التجميل بالذكاء الاصطناعي', year: 'الأبرز', kind: 'فريق من 4 · مستودع خاص', heading: 'OdemLab', lead: 'd',
        description: 'منصة تجارة إلكترونية كاملة مع API Spring Boot، متجر Next.js ومكتب خلفي، وتطبيق React Native. العملاء يدفعون عبر Stripe أو CMI المغربية أو الدفع عند الاستلام، الكل يمر بدورة طلب واحدة. تحليل البشرة بالذكاء الاصطناعي من Gemini يتدهور بأمان خلف القواطع. ثلاث لغات FR/EN/AR مع تخطيط RTL عربي حقيقي. البنية التحتية مُدارة بـ Terraform، نشر على Cloud Run بدون توقف مع رجوع تلقائي.',
        result: '810 اختبار مؤتمت، 93 هجرة schema، 3 تكاملات دفع (Stripe، CMI، COD). منشور على Cloud Run مع ترقية بدون توقف ورجوع تلقائي.',
        note: 'مستودع خاص — عرض حي ومراجعة الكود عند الطلب.' },
      { title: 'منصة المواعيد الطبية', year: '2025', kind: 'تدريب · Full-stack', heading: 'طبي', lead: 'ب',
        description: 'منصة إدارة عيادة مبنية بـ Laravel لـ MOUSSA SOFT. المرضى يبحثون عن الأطباء حسب التخصص، يحجزون مواعيد عبر الإنترنت ويتتبعون تاريخ الاستشارات. الأطباء يديرون جداولهم ومرضاهم وخدماتهم بأسعار ويولّدون تقارير طبية بصيغة PDF. لوحة إدارة تراقب النظام بالكامل. مبنية بـ MySQL و Bootstrap و Chart.js.',
        result: 'تقليل الحجز من 15 دقيقة مكالمة هاتفية إلى 2 دقيقة حجز إلكتروني. 3 أدوار أطباء مع إنشاء تقارير PDF تلقائي.' },
      { title: 'FitTrack — منصة رياضية', year: '2025', kind: 'فريق من 2 · Full-stack', heading: 'FitTrack', lead: 'i',
        description: 'تطبيق ويب رياضي بـ backend Spring Boot و frontend Next.js وقاعدة بيانات MySQL. المستخدمون ينشئون برامج تمارين مخصصة، يتتبعون حصصهم لحظياً، ويعرضون إحصائيات مؤشر كتلة الجسم وسعر الحرق اليومي. لوحة الإدارة تتحقق من البرامج المقدمة من المستخدمين وتدير مكتبة من 38 تمريناً مع عروض فيديو. كل شيء يعمل في 3 حاويات Docker.',
        result: 'مُعلَّب في 3 حاويات Docker. خط أنابيب إشراف كامل عبر 38 تمريناً مع عروض فيديو.' },
      { title: 'رفيق الحرم الذكي', year: '2026', kind: 'فريق من 4 · Flutter', heading: 'Campus', lead: 'a',
        description: 'تطبيق Flutter لإدارة حرم ENSIASD. الطلاب يمسحون رموز QR على أبواب القاعات للحصول على معلومات فورية مع تصور واقع معزز. الأساتذة يحجزون قاعات وينشرون إعلانات. لوحة إدارة تدير جداول المواعيد والموافقات وتقارير الحوادث وإنشاء رموز QR. مبني بـ Riverpod و Firebase Firestore.',
        result: 'معلومات القاعة بمسحة QR واحدة. مزامنة Firestore لحظية عبر 7 مجموعات و3 أدوار حرم.' },
      { title: 'SmartSummarizer', year: '2025', kind: 'فريق من 4 · معالجة لغة', heading: 'ملخص', lead: 'خ',
        description: 'منصة Flask تحول ملفات PDF و DOCX إلى أدوات مراجعة باستخدام CamemBERT و Groq. تولّد ثلاثة مستويات من الملخصات، وتحوّل نصي إلى صوت، واختبارات تلقائية بمستوى صعوبة قابل للتعديل، وروبوت محادثة للأسئلة والأجوبة، وخرائط ذهنية. الطلاب يصدرون النتائج كـ PDF أو JSON أو MP3.',
        result: '9.9 ثانية معالجة متوسطة. درجة جودة 8.4/10 من 30 طالب.' },
      { title: 'نظام عد القصب', year: '2024 · مشروع التخرج', kind: 'مدمج · مشروع النهاية', heading: 'IoT', lead: 'T',
        description: 'نظام عد مبني على ESP8266 يستخدم حساس ليزر VL53L0X لاكتشاف وعدّ القصب على خط الإنتاج. البيانات تُعرض لحظياً على شاشة OLED وتُرسل عبر Wi-Fi إلى لوحة ويب PHP/MySQL. أغلفة مطبوعة ثلاثية الأبعاد مصممة في SolidWorks ومحضرة بطباعة Creality CR-10 Max.',
        result: 'عد لحظي للقصب بدقة 98%+. غلاف مطبوع ثلاثي الأبعاد مع شاشة OLED.' },
    ],
  },
  about: {
    kicker: 'نبذة', title: 'ميل للباك-إند، عقلية منتج — من الحساس إلى المتجر.',
    sub: 'من firmware الـ ESP8266 إلى نشر Cloud Run: أهتم بالأماكن التي يكلّف فيها الخطأ مالاً حقيقياً، وأفضّل الضمانات المنفَّذة على الأعراف.',
    stats: [
      { label: 'مجالات منشورة', sub: 'ويب · موبايل · API · QA · IoT' },
      { label: 'لغات حيّة', sub: 'FR · EN · AR + RTL' },
      { label: 'حزم اختبار E2E', sub: 'Playwright · 7 specs على هذا الموقع' },
      { label: 'ترحيلات Flyway', sub: 'OdemLab · قابلة لإعادة التشغيل من الصفر' },
    ],
    bestTitle: 'أفضل ما أفعله',
    best: [
      'تصميم REST API, نقاط نهاية مُصدَرة مع عقود OpenAPI. فريق الويب يستهلك عملاء مولّدين، لا تخمين',
      'سلامة المعاملات, طلبات غير قابلة للتكرار، أقفال متفائلة على المنتجات، SELECT FOR UPDATE على المخزون. مسارات المال لا تُدفع مرتين أبداً',
      'اختبار E2E, حزم Playwright على Chromium/Firefox/WebKit مع بوابات وصول axe-core. تلتقط الانحدارات قبل المستخدمين',
      'واجهات ثلاثية اللغات, FR/EN/AR مع تخطيط RTL عربي حقيقي. لا مجرد تسميات مترجمة، بل تنقل ونماذج ومحتوى معكوسة',
    ],
    methodTitle: 'كيف أعمل',
    method: [
      'CI كبوابة دمج, الكود الذي لا يجتاز الاختبارات لا يُنشر. CI خضراء = البوابة الوحيدة',
      'ترحيلات قابلة لإعادة التشغيل, تغييرات المخطط كسكربتات Flyway. أي قاعدة تُبنى من الصفر',
      'أمن متعدد الطبقات, JWT قصيرة، PII مشفرة بـ AES-256-GCM، حدود حسب IP، رؤوس CORS/CSP',
      'نطاق صادق, أسمي حالات الحدود غير المعالجة والحدود المعروفة. لا ثقة زائفة',
    ],
    langs: [{ l: 'العربية', lvl: 'الأم' }, { l: 'الفرنسية', lvl: 'مهنية' }, { l: 'الإنجليزية', lvl: 'مهنية' }],
  },
  exp: {
    kicker: 'المسار', title: 'الخبرة والتكوين.',
    jobs: [
      { when: 'يونيو 2026 — سبتمبر 2026 · أكادير، حضوري', title: 'مشروع نهاية السنة (PFA) — مطور Full-Stack', org: 'Zorium، تكنوبارك أكادير', where: 'منصة OdemLab · فريق من أربعة',
        points: ['وحدات الباك-إند: الطلبات، المنتجات، المدفوعات، المصادقة، GDPR', 'تحصين مسارات المال: تسعير من الخادم، دفع غير قابل للتكرار، دورة طلبات مدققة', 'النشر على Cloud Run: نشر بدون توقف، فحص صحة، ترقية الميزات، رجوع تلقائي عند الفشل'] },
      { when: 'يوليوز 2025 — سبتمبر 2025 · عن بعد', title: 'متدرب مطور Full-Stack', org: 'MOUSSA SOFT، أكادير', where: 'Laravel · MySQL · Bootstrap',
        points: ['MediCare: حجز المرضى-الأطباء، جدولة المواعيد، تقارير PDF، لوحات Chart.js'] },
      { when: 'يونيو 2023 — أغسطس 2023', title: 'متدرب أتمتة QA', org: 'حزم الانحدار الويب', where: 'Python · Selenium WebDriver · Page Objects',
        points: ['استبدال حملة يدوية بحزم انحدار آلية، نقطة تغيير واحدة لكل شاشة'] },
      { when: 'يونيو 2024 — يونيو 2024 · أكادير، حضوري', title: 'مشروع نهاية الدراسات (DUT) — مطور مدمج', org: 'MOUSSA SOFT، أكادير', where: 'ESP8266 · VL53L0X · PHP · MySQL',
        points: ['نظام عد قصب بـ ESP8266 + حساس ليزر، شاشة OLED، Wi-Fi إلى لوحة PHP/MySQL', 'أغلفة 3D مطبوعة مصممة في SolidWorks، محضرة بـ Creality CR-10 Max'] },
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
        { name: 'Mockito', desc: 'يحل محل Stripe وGemini AI وSMTP في الاختبارات للتحقق من القواعد التجارية دون الدفع لاستدعاءات API حقيقية. يحاكي أيضاً الأعطال (مهلة، 500) للتأكيد على التدهور الرشيق.' },
        { name: 'Vitest', desc: 'يشغل اختبارات OdemLab frontend بالمللي ثانية — يتحقق من أن متجر Next.js يعرض الأسعار الصحيحة، السلة تتحدث، والترجمة تبدّل اللغات. أسرع 10 مرات من Jest لـ TypeScript.' },
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
    pillars: [
      { icon: 'M4 6h16M4 12h16m-7 6h7', title: 'DevOps والبنية التحتية', subtitle: 'نشر سريع، نشر آمن، مراقبة التشغيل.', items: [
        { name: 'Docker', desc: 'بناء متعدد المراحل يُعلّب backend وfrontend في صور إنتاج مصغرة — لا مكتبات تطوير، لا كود مصدر، سطحة هجوم مصغرة. Docker Compose يُعيد بناء الكامل محلياً.' },
        { name: 'GitHub Actions', desc: 'عند كل push: اختبارات، بناء Docker، دفع GHCR، نشر Cloud Run. عند فشل الاختبارات، لا يبدأ النشر أبداً. رجوع تلقائي عند فشل فحص الصحة.' },
        { name: 'Google Cloud Run', desc: 'نشر بدون ترافيك — لا طلبات تصل للنسخة الجديدة حتى تجتاز فحص الصحة. رجوع تلقائي إذا ارتفعت زمن الاستجابة أو معدل الخطأ.' },
        { name: 'Grafana + Prometheus', desc: 'لوحات تحكم بالوقت الحقيقي: أوقات استجابة، معدل أخطاء، throughput. تنبيهات p95 — نعرف قبل المستخدمين.' },
        { name: 'Flyway', desc: '93 ترحيل SQL مُصدَر، قابل لإعادة التشغيل من الصفر. أي قاعدة جديدة تحصل على المخطط الصحيح في ثوانٍ.' },
        { name: 'ShedLock', desc: 'أقفال موزعة على المهام الدورية — استرداد السلة، تذكيرات، تنظيف GDPR. لا تضاعف عبر نسخ Cloud Run المتعددة.' },
        { name: 'Rate Limiting', desc: 'فلاتر IP على /auth (10 طلبات/دقيقة) والنقاط الحساسة (كوبونات، analytics، newsletter). Fail-open: إذا سقطت Redis، تمر الطلبات — التوفر أهم من الحماية.' },
        { name: 'JWT + PII Encryption', desc: 'Cookies HttpOnly + Bearer token. بيانات PII (هواتف، عناوين، أسماء طلبات) مشفّرة AES-256-GCM على مستوى العمود — الأسرار لا تعيش نصاً أبداً في القاعدة.' },
        { name: 'Server Pricing', desc: 'العميل لا يُرسل أسعاراً أبداً. الخصومات تُحسب من طرف الخادم عبر PromotionRepository — مستحيل التلاعب بالدفع من المتصفح.' },
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
    respondTime: 'أرد عادةً خلال 24 ساعة',
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
export const STAT_VALUES = [5, 3, 7, 93];
