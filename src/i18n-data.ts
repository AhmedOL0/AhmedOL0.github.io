import { createContext, useContext } from 'react';

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

export type Capability = { title: string; desc: string; details: string };
export type ProcessStep = { label: string; desc: string };
export type TechCategory = { name: string; items: string[] };

export type Dict = {
  dir: 'ltr' | 'rtl';
  nav: { home: string; whatIDo: string; work: string; experience: string; behind: string; contact: string; resume: string };
  hero: { badge: string; titleA: string; titleEm: string; titleB: string; lede: string; ctaWork: string; ctaContact: string; statsLabels: [string, string, string]; personalityA: string; personalityB: string; avail: string };
  whatIDo: { kicker: string; title: string; sub: string; capabilities: Capability[] };
  howIWork: { kicker: string; title: string; sub: string; steps: ProcessStep[] };
  filters: { all: string; web: string; mobile: string; backend: string; ai: string; iot: string };
  work: { kicker: string; title: string; sub: string; showLess: string; projects: ProjectT[] };
  exp: { kicker: string; title: string; jobs: JobT[] };
  edu: { kicker: string; title: string; sub: string; entries: EduT[] };
  behind: { kicker: string; title: string; sub: string; categories: TechCategory[] };
  aboutMe: { kicker: string; title: string; sub: string; body: string; langs: { l: string; lvl: string }[] };
  contact: {
    kicker: string; title: string; sub: string; subEm: string; subEnd: string;
    name: string; namePh: string; email: string; emailPh: string; msg: string; msgPh: string;
    send: string; sending: string; success: string; error: string;
    respondTime: string;
    direct: string; phone: string; linkedin: string; github: string;
  };
  footer: { built: string; top: string; elsewhere: string };
  dock: { home: string; whatIDo: string; work: string; contact: string; lang: string; nav: string; toggle: string; resume: string };
};

const tags = {
  odemlab: ['Spring Boot', 'Java 21', 'Next.js', 'React Native', 'Expo', 'PostgreSQL', 'Redis', 'Tailwind CSS', 'Docker', 'GitHub Actions', 'Google Cloud Run', 'Stripe', 'Gemini AI', 'Flyway', 'Playwright'],
  med: ['PHP', 'Laravel', 'MySQL', 'Bootstrap', 'Chart.js'],
  fit: ['Spring Boot', 'Next.js', 'TypeScript', 'Tailwind CSS', 'MySQL', 'Docker'],
  campus: ['Flutter', 'Dart', 'Firebase', 'ARCore', 'ARKit', 'QR Scanner'],
  sum: ['Python', 'Flask', 'PyTorch', 'CamemBERT', 'spaCy', 'Groq'],
  iot: ['ESP8266', 'VL53L0X', 'Arduino', 'PHP', 'MySQL', 'SolidWorks'],
};

const en: Dict = {
  dir: 'ltr',
  nav: { home: 'Home', whatIDo: 'What I Do', work: 'Work', experience: 'Experience', behind: 'Tech Stack', contact: 'Contact', resume: 'Résumé' },
  hero: {
    badge: 'Open to PFE internship', titleA: 'Building ', titleEm: 'complete products', titleB: ', not just features.',
    lede: 'I\'m a software engineer who builds end-to-end digital products, from the first line of code to a running application people actually use.',
    ctaWork: 'Browse production work', ctaContact: 'Get in touch',
    statsLabels: ['Projects shipped', 'Platforms', 'Internships completed'],
    personalityA: 'A student', personalityB: 'Who ships production code between lectures.',
    avail: 'Available for PFE \u00b7 Morocco or remote',
  },
  whatIDo: {
    kicker: 'What I do', title: 'I turn complex ideas into simple, working products.',
    sub: 'From concept to deployment — I handle the full journey so you don\'t have to.',
    capabilities: [
      { title: 'Build complete products', desc: 'I take an idea from concept to a running application — frontend, backend, database, and deployment. Everything connected, everything working.', details: 'Full-stack development with Spring Boot, Next.js, React Native. REST APIs, real-time sync, payment integrations, authentication, and database design.' },
      { title: 'Design intuitive interfaces', desc: 'I create web and mobile experiences that feel simple, even when the technology behind them is complex.', details: 'Responsive design, trilingual support (FR/EN/AR with real RTL), accessibility (WCAG 2.2), animations, and progressive disclosure.' },
      { title: 'Build reliable systems', desc: 'I design the invisible parts — data integrity, security, performance, and things that don\'t break when users depend on them.', details: 'Transactional integrity, optimistic locking, encrypted PII, rate limiting, circuit breakers, automated testing (unit → integration → E2E), and zero-downtime deployments.' },
      { title: 'Work across languages', desc: 'I build in French, English, and Arabic — including proper right-to-left support for Arabic speakers.', details: 'Full i18n with locale routing, RTL layout mirroring, and culturally adapted content across three languages.' },
    ],
  },
  howIWork: {
    kicker: 'How I work', title: 'From idea to production, step by step.',
    sub: 'I don\'t just write code. I follow a process that turns ideas into reliable products.',
    steps: [
      { label: 'Understand', desc: 'I start by understanding the problem, the users, and what success looks like.' },
      { label: 'Design', desc: 'I plan the architecture and data flow before writing a single line of code.' },
      { label: 'Build', desc: 'I write clean, tested code in focused iterations.' },
      { label: 'Test', desc: 'Every feature is verified — from unit tests to real browser flows.' },
      { label: 'Deploy', desc: 'I ship to production with zero-downtime deployments and health checks.' },
      { label: 'Improve', desc: 'I monitor, measure, and iterate based on real usage.' },
    ],
  },
  filters: { all: 'All', web: 'Web', mobile: 'Mobile', backend: 'Backend', ai: 'AI', iot: 'IoT' },
  work: {
    kicker: 'Selected work', title: 'Systems that run in production, not demos that run once.',
    sub: 'Six builds across web, mobile, backend, AI and IoT. Each one deployed, used, or graded.',
    showLess: 'show less',
    projects: [
      { title: 'OdemLab: AI skincare e-commerce', year: 'Flagship', kind: 'Team of 4 · Private repo', heading: 'OdemLab', lead: 'd',
        description: 'A complete online skincare store with AI skin analysis, three payment methods (Stripe, CMI, cash-on-delivery), and trilingual FR/EN/AR support. Customers browse, scan their skin, and pay — all in one flow.',
        result: '810 automated tests, 93 schema migrations, 3 payment integrations. Deployed to Cloud Run with zero-downtime promotion.',
        note: 'Private repository: live demo and code walkthrough on request.' },
      { title: 'Medical appointment platform', year: '2025', kind: 'Internship · Full-stack', heading: 'Medical', lead: 'e',
        description: 'A clinic management platform where patients book appointments online and doctors manage schedules, patients, and generate PDF reports.',
        result: 'Reduced scheduling from 15min phone calls to 2-minute online booking.' },
      { title: 'FitTrack: training platform', year: '2025', kind: 'Team of 2 · Full-stack', heading: 'FitTrack', lead: 'i',
        description: 'A fitness web app where users create training programs, track sessions in real time, and view BMI and calorie stats. Admin panel with 38-exercise library.',
        result: 'Full admin moderation pipeline across 38 exercises with video demos.' },
      { title: 'Smart Campus Companion', year: '2026', kind: 'Team of 4 · Flutter', heading: 'Campus', lead: 'a',
        description: 'A Flutter campus app where students scan QR codes on classroom doors for instant room info and AR visualization. Professors reserve rooms and post announcements.',
        result: 'QR-to-room info in one scan. Real-time sync across 7 collections for 3 campus roles.' },
      { title: 'SmartSummarizer', year: '2025', kind: 'Team of 4 · NLP', heading: 'Summarizer', lead: 'u',
        description: 'An AI platform that transforms lecture PDFs into study tools — summaries, audio, quizzes, and mind maps — using CamemBERT and Groq.',
        result: '9.9s average processing. 8.4/10 quality score from 30 students.' },
      { title: 'Cane counting system', year: '2024 · DUT thesis', kind: 'Embedded · Final-year project', heading: 'IoT', lead: 'T',
        description: 'An ESP8266-based counting system using a laser sensor to count canes on a production line, with real-time OLED display and Wi-Fi dashboard.',
        result: '98%+ accuracy. 3D-printed production-ready enclosure.' },
    ],
  },
  exp: {
    kicker: 'Track record', title: 'Experience & education.',
    jobs: [
      { when: 'JUN 2026 – SEP 2026 · AGADIR, ON-SITE', title: 'End-of-year project (PFA): Full-Stack Developer', org: 'Zorium, Technoparc Agadir', where: 'OdemLab platform · team of four',
        points: ['Owned backend business modules: orders, products, payments, auth, GDPR', 'Hardened the money paths: server-side pricing, idempotent checkout, audited order lifecycle', 'Shipped to Cloud Run: zero-traffic deploy, health check, promotion, auto-rollback on failure'] },
      { when: 'JUL 2025 – SEP 2025 · REMOTE', title: 'Full-Stack Developer Intern', org: 'MOUSSA SOFT · Agadir', where: 'Laravel · MySQL · Bootstrap',
        points: ['Built MediCare: patient-doctor booking, appointment scheduling, PDF report generation, Chart.js dashboards'] },
      { when: 'JUN 2023 – AUG 2023', title: 'QA Automation Intern', org: 'Web regression suites', where: 'Python · Selenium WebDriver · Page Objects',
        points: ['Replaced a manual campaign with automated non-regression suites, one change point per UI change'] },
      { when: 'JUN 2024 – JUN 2024 · AGADIR, ON-SITE', title: 'End-of-study internship (DUT): Embedded Developer', org: 'MOUSSA SOFT · Agadir', where: 'ESP8266 · VL53L0X · PHP · MySQL',
        points: ['Built a cane counting system with ESP8266 + laser sensor, OLED display, Wi-Fi to PHP/MySQL dashboard', 'Designed 3D-printed enclosures in SolidWorks, fabricated with Creality CR-10 Max'] },
    ],
  },
  edu: {
    kicker: 'Education', title: 'Schools, not jobs.', sub: 'The two programs behind the work above.',
    entries: [
      { years: '2024 – Present', title: 'Engineering Cycle, Software Engineering', school: 'ENSIASD · Ibn Zohr University, Taroudant', desc: 'Artificial intelligence, data science, software architecture.' },
      { years: '2022 – 2024 · With honors', title: 'DUT, Embedded Computer Engineering', school: 'EST Oujda, École Supérieure de Technologie', desc: 'Embedded systems, IoT, firmware: ESP32/ESP8266, Arduino, Raspberry Pi.' },
    ],
  },
  behind: {
    kicker: 'Tech stack', title: 'Behind the work.',
    sub: 'The technologies I use, organized by what they do.',
    categories: [
      { name: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Flutter', 'React Native'] },
      { name: 'Backend', items: ['Java', 'Spring Boot', 'Node.js', 'Python', 'Flask', 'Laravel'] },
      { name: 'Data', items: ['PostgreSQL', 'Redis', 'MySQL', 'Firebase Firestore'] },
      { name: 'Cloud & DevOps', items: ['Docker', 'GitHub Actions', 'Google Cloud Run', 'Terraform', 'Flyway'] },
      { name: 'Testing', items: ['Playwright', 'JUnit 5', 'Vitest', 'Jest', 'Testcontainers', 'axe-core'] },
      { name: 'AI/ML', items: ['Gemini AI', 'CamemBERT', 'spaCy', 'Groq', 'PyTorch'] },
    ],
  },
  aboutMe: {
    kicker: 'About me', title: 'The person behind the code.',
    sub: 'A bit about how I think and what drives me.',
    body: 'I enjoy building things that work end-to-end — not just the parts that show on screen, but the systems behind them. I\'m driven by the gap between a good idea and a working product, and I like being the person who bridges it. Currently focused on full-stack development and looking for a PFE internship where I can ship production code.',
    langs: [{ l: 'Arabic', lvl: 'native' }, { l: 'French', lvl: 'professional' }, { l: 'English', lvl: 'professional' }],
  },
  contact: {
    kicker: 'Contact', title: 'Let\'s build something solid.',
    sub: 'Looking for a ', subEm: 'PFE internship', subEnd: ', backend or full-stack, Morocco or remote. I answer fast.',
    name: 'Your name', namePh: 'Your full name', email: 'Email address', emailPh: 'you@company.com',
    msg: 'Project details', msgPh: 'What are you building, and when?', send: 'Send message', sending: '...',
    success: '\u2713 Message sent. I\'ll get back to you soon.', error: '\u2717 Something went wrong. Try emailing me directly.',
    respondTime: 'Typically respond within 24 hours',
    direct: 'Direct email', phone: 'Phone', linkedin: 'LinkedIn', github: 'GitHub',
  },
  footer: { built: '', top: 'Top', elsewhere: 'Elsewhere' },
  dock: { home: 'Home', whatIDo: 'What I Do', work: 'Work', contact: 'Contact', lang: 'Language', nav: 'Quick navigation', toggle: 'Toggle light / dark mode', resume: 'Résumé' },
};

const fr: Dict = {
  dir: 'ltr',
  nav: { home: 'Accueil', whatIDo: 'Ce que je fais', work: 'Projets', experience: 'Parcours', behind: 'Technologies', contact: 'Contact', resume: 'CV' },
  hero: {
    badge: 'Disponible pour un PFE', titleA: 'Des ', titleEm: 'produits complets', titleB: ', pas juste des fonctionnalit\u00e9s.',
    lede: 'Je suis ing\u00e9nieur logiciel et je construis des produits num\u00e9riques complets, de la premi\u00e8re ligne de code \u00e0 une application qui tourne vraiment.',
    ctaWork: 'Voir mes projets', ctaContact: 'Me contacter',
    statsLabels: ['Projets livr\u00e9s', 'Plateformes', 'Stages compl\u00e9t\u00e9s'],
    personalityA: '\u00c9tudiant', personalityB: 'Qui livre du code en production entre les cours.',
    avail: 'Disponible pour PFE \u00b7 Maroc ou distanciel',
  },
  whatIDo: {
    kicker: 'Ce que je fais', title: 'Je transforme des id\u00e9es complexes en produits simples et fonctionnels.',
    sub: 'Du concept au d\u00e9ploiement \u2014 je g\u00e8re tout le parcours.',
    capabilities: [
      { title: 'Construire des produits complets', desc: 'Je prends une id\u00e9e et la transforme en application fonctionnelle \u2014 frontend, backend, base de donn\u00e9es et d\u00e9ploiement. Tout connect\u00e9, tout qui marche.', details: 'D\u00e9veloppement full-stack avec Spring Boot, Next.js, React Native. APIs REST, synchronisation en temps r\u00e9el, int\u00e9grations de paiement, authentification et conception de bases de donn\u00e9es.' },
      { title: 'Concevoir des interfaces intuitives', desc: 'Je cr\u00e9e des exp\u00e9riences web et mobile qui semblent simples, m\u00eame quand la technologie derri\u00e8re est complexe.', details: 'Design responsive, support trilingue (FR/EN/AR avec vrai RTL), accessibilit\u00e9 (WCAG 2.2), animations et divulgation progressive.' },
      { title: 'Construire des syst\u00e8mes fiables', desc: 'Je con\u00e7ois les parties invisibles \u2014 int\u00e9grit\u00e9 des donn\u00e9es, s\u00e9curit\u00e9, performance et tout ce qui ne casse pas quand les utilisateurs en d\u00e9pendent.', details: 'Int\u00e9grit\u00e9 transactionnelle, verrouillage optimiste, PII chiffr\u00e9, limitation de d\u00e9bit, coupe-circuits, tests automatis\u00e9s (unit\u00e9 \u2192 int\u00e9gration \u2192 E2E) et d\u00e9ploiements sans interruption.' },
      { title: 'Travailler en plusieurs langues', desc: 'Je construis en fran\u00e7ais, anglais et arabe \u2014 avec un vrai support RTL pour les locuteurs arabes.', details: 'i18n complet avec routage de locale, mise en miroir RTL et contenu adapt\u00e9 culturellement dans trois langues.' },
    ],
  },
  howIWork: {
    kicker: 'Comment je travaille', title: 'De l\u2019id\u00e9e \u00e0 la production, \u00e9tape par \u00e9tape.',
    sub: 'Je n\u2019\u00e9cris pas juste du code. Je suis un processus qui transforme les id\u00e9es en produits fiables.',
    steps: [
      { label: 'Comprendre', desc: 'Je commence par comprendre le probl\u00e8me, les utilisateurs et ce que succ\u00e8s signifie.' },
      { label: 'Concevoir', desc: 'Je planifie l\u2019architecture et le flux de donn\u00e9es avant d\u2019\u00e9crire une seule ligne de code.' },
      { label: 'Construire', desc: 'J\u2019\u00e9cris du code propre et test\u00e9 en it\u00e9rations focales.' },
      { label: 'Tester', desc: 'Chaque fonctionnalit\u00e9 est v\u00e9rifi\u00e9e \u2014 des tests unitaires aux parcours navigateur r\u00e9els.' },
      { label: 'D\u00e9ployer', desc: 'Je livre en production avec des d\u00e9ploiements sans interruption et des contr\u00f4les de sant\u00e9.' },
      { label: 'Am\u00e9liorer', desc: 'Je mesure, surveille et it\u00e8re en fonction de l\u2019utilisation r\u00e9elle.' },
    ],
  },
  filters: { all: 'Tous', web: 'Web', mobile: 'Mobile', backend: 'Backend', ai: 'IA', iot: 'IoT' },
  work: {
    kicker: 'Projets', title: 'Des syst\u00e8mes qui tournent en production, pas des d\u00e9mos qui tournent une fois.',
    sub: 'Six r\u00e9alisations web, mobile, backend, IA et IoT. Chacune d\u00e9ploy\u00e9e, utilis\u00e9e ou \u00e9valu\u00e9e.',
    showLess: 'voir moins',
    projects: [
      { title: 'OdemLab: e-commerce cosm\u00e9tique IA', year: 'Vitrine', kind: '\u00c9quipe de 4 \u00b7 D\u00e9p\u00f4t priv\u00e9', heading: 'OdemLab', lead: 'd',
        description: 'Boutique cosm\u00e9tique en ligne avec analyse IA de la peau, trois m\u00e9thodes de paiement (Stripe, CMI, contre-remboursement) et support trilingue FR/EN/AR.',
        result: '810 tests automatis\u00e9s, 93 migrations, 3 int\u00e9grations paiement. D\u00e9ploy\u00e9 sur Cloud Run.',
        note: 'D\u00e9p\u00f4t priv\u00e9: d\u00e9mo en direct et revue de code sur demande.' },
      { title: 'Plateforme de rendez-vous m\u00e9dicaux', year: '2025', kind: 'Stage \u00b7 Full-stack', heading: 'M\u00e9dical', lead: 'e',
        description: 'Plateforme de gestion de cabinet m\u00e9dical o\u00f9 les patients prennent rendez-vous en ligne et les m\u00e9decins g\u00e8rent leurs plannings et g\u00e9n\u00e8rent des rapports PDF.',
        result: 'R\u00e9duction de 15min d\u2019appel \u00e0 2 minutes de r\u00e9servation en ligne.' },
      { title: 'FitTrack: suivi sportif', year: '2025', kind: '\u00c9quipe de 2 \u00b7 Full-stack', heading: 'FitTrack', lead: 'i',
        description: 'Application web fitness pour cr\u00e9er des programmes d\u2019entra\u00eEnement, suivre les s\u00e9ances en temps r\u00e9el et visualiser IMC et calories.',
        result: 'Pipeline complet de mod\u00e9ration admin pour 38 exercices avec vid\u00e9os.' },
      { title: 'Smart Campus Companion', year: '2026', kind: '\u00c9quipe de 4 \u00b7 Flutter', heading: 'Campus', lead: 'a',
        description: 'Application Flutter de gestion de campus o\u00f9 les \u00e9tudiants scannent des QR codes pour obtenir les informations de salle instantan\u00e9ment avec visualisation AR.',
        result: 'Info salle en un scan QR. Synchronisation temps r\u00e9el pour 7 collections.' },
      { title: 'SmartSummarizer', year: '2025', kind: '\u00c9quipe de 4 \u00b7 NLP', heading: 'R\u00e9sumeur', lead: 'u',
        description: 'Plateforme IA qui transforme les PDF de cours en outils d\u2019\u00e9tude \u2014 r\u00e9sum\u00e9s, audio, quiz et cartes mentales.',
        result: '9.9s de traitement moyen. Score 8.4/10 sur 30 \u00e9tudiants.' },
      { title: 'Syst\u00e8me de comptage de cannes', year: '2024 \u00b7 PFE DUT', kind: 'Embarqu\u00e9 \u00b7 Projet de fin', heading: 'IoT', lead: 'T',
        description: 'Syst\u00e8me de comptage bas\u00e9 sur ESP8266 utilisant un capteur laser pour compter les cannes sur une ligne de production, avec affichage OLED et tableau de bord Wi-Fi.',
        result: '98%+ de pr\u00e9cision. Bo\u00eetier 3D imprim\u00e9.' },
    ],
  },
  exp: {
    kicker: 'Parcours', title: 'Exp\u00e9rience et formation.',
    jobs: [
      { when: 'JUIN 2026 \u2013 SEPT. 2026 \u00b7 AGADIR, SUR SITE', title: 'Projet de fin d\u2019ann\u00e9e (PFA): D\u00e9veloppeur Full-Stack', org: 'Zorium, Technoparc Agadir', where: 'Plateforme OdemLab \u00b7 \u00e9quipe de quatre',
        points: ['Modules m\u00e9tier backend : commandes, produits, paiements, auth, RGPD', 'Chemins mon\u00e9taires fiabilis\u00e9s : tarification serveur, checkout idempotent, cycle audité', 'Livraison Cloud Run : d\u00e9ploiement sans trafic, health check, promotion, rollback auto'] },
      { when: 'JUIL. 2025 \u2013 SEPT. 2025 \u00b7 DISTANCIEL', title: 'Stagiaire D\u00e9veloppeur Full-Stack', org: 'MOUSSA SOFT \u00b7 Agadir', where: 'Laravel \u00b7 MySQL \u00b7 Bootstrap',
        points: ['MediCare : r\u00e9servation patients-m\u00e9decins, planning, g\u00e9n\u00e9ration de rapports PDF, tableaux Chart.js'] },
      { when: 'JUIN 2023 \u2013 AO\u00fbT 2023', title: 'Stagiaire QA Automatisation', org: 'Suites de non-r\u00e9gression web', where: 'Python \u00b7 Selenium WebDriver \u00b7 Page Objects',
        points: ['Campagne manuelle remplac\u00e9e par des suites automatis\u00e9es, un point de changement par \u00e9cran'] },
      { when: 'JUIN 2024 \u2013 JUIN 2024 \u00b7 AGADIR, SUR SITE', title: 'Stage de fin d\u2019\u00e9tudes (DUT): D\u00e9veloppeur Embarqu\u00e9', org: 'MOUSSA SOFT \u00b7 Agadir', where: 'ESP8266 \u00b7 VL53L0X \u00b7 PHP \u00b7 MySQL',
        points: ['Syst\u00e8me de comptage de cannes avec ESP8266 + capteur laser, \u00e9cran OLED, Wi-Fi vers tableau PHP/MySQL', 'Bo\u00eatiers 3D imprim\u00e9s con\u00e7us dans SolidWorks, fabriqu\u00e9s avec Creality CR-10 Max'] },
    ],
  },
  edu: {
    kicker: 'Formation', title: 'Des \u00e9coles, pas des postes.', sub: 'Les deux formations derri\u00e8re ce travail.',
    entries: [
      { years: '2024 \u2013 Pr\u00e9sent', title: 'Cycle ing\u00e9nieur, G\u00e9nie logiciel', school: 'ENSIASD \u00b7 Universit\u00e9 Ibn Zohr, Taroudant', desc: 'Intelligence artificielle, science des donn\u00e9es, architecture logicielle.' },
      { years: '2022 \u2013 2024 \u00b7 Mention bien', title: 'DUT, G\u00e9nie informatique embarqu\u00e9', school: 'EST Oujda, \u00c9cole Sup\u00e9rieure de Technologie', desc: 'Syst\u00e8mes embarqu\u00e9s, IoT, firmware: ESP32/ESP8266, Arduino, Raspberry Pi.' },
    ],
  },
  behind: {
    kicker: 'Technologies', title: 'Derri\u00e8re les projets.',
    sub: 'Les technologies que j\u2019utilise, organis\u00e9es par fonction.',
    categories: [
      { name: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Flutter', 'React Native'] },
      { name: 'Backend', items: ['Java', 'Spring Boot', 'Node.js', 'Python', 'Flask', 'Laravel'] },
      { name: 'Donn\u00e9es', items: ['PostgreSQL', 'Redis', 'MySQL', 'Firebase Firestore'] },
      { name: 'Cloud & DevOps', items: ['Docker', 'GitHub Actions', 'Google Cloud Run', 'Terraform', 'Flyway'] },
      { name: 'Testing', items: ['Playwright', 'JUnit 5', 'Vitest', 'Jest', 'Testcontainers', 'axe-core'] },
      { name: 'IA/ML', items: ['Gemini AI', 'CamemBERT', 'spaCy', 'Groq', 'PyTorch'] },
    ],
  },
  aboutMe: {
    kicker: 'Profil', title: 'La personne derri\u00e8re le code.',
    sub: 'Un peu sur ma fa\u00e7on de penser et ce qui me motive.',
    body: 'J\u2019aime construire des choses qui marchent de bout en bout \u2014 pas seulement les \u00e9l\u00e9ments visibles \u00e0 l\u2019\u00e9cran, mais aussi les syst\u00e8mes derri\u00e8re. Je suis motiv\u00e9 par l\u2019\u00e9cart entre une bonne id\u00e9e et un produit fonctionnel, et j\u2019aime \u00eatre la personne qui le comble. Actuellement concentr\u00e9 sur le d\u00e9veloppement full-stack et \u00e0 la recherche d\u2019un stage PFE o\u00f9 je peux livrer du code en production.',
    langs: [{ l: 'Arabe', lvl: 'maternelle' }, { l: 'Fran\u00e7ais', lvl: 'professionnel' }, { l: 'Anglais', lvl: 'professionnel' }],
  },
  contact: {
    kicker: 'Contact', title: 'Construisons quelque chose de solide.',
    sub: 'Je cherche un ', subEm: 'stage PFE', subEnd: ', backend ou full-stack, Maroc ou distanciel. Je r\u00e9ponds vite.',
    name: 'Votre nom', namePh: 'Votre nom complet', email: 'Adresse e-mail', emailPh: 'vous@entreprise.com',
    msg: 'D\u00e9tails du projet', msgPh: 'Que construisez-vous, et pour quand ?', send: 'Envoyer', sending: '...',
    success: '\u2713 Message envoy\u00e9. Je vous r\u00e9ponds vite.', error: '\u2717 Une erreur s\u2019est produite. \u00c9crivez-moi directement.',
    respondTime: 'Je r\u00e9ponds g\u00e9n\u00e9ralement sous 24 heures',
    direct: 'E-mail direct', phone: 'T\u00e9l\u00e9phone', linkedin: 'LinkedIn', github: 'GitHub',
  },
  footer: { built: '', top: 'Haut', elsewhere: 'Ailleurs' },
  dock: { home: 'Accueil', whatIDo: 'Ce que je fais', work: 'Projets', contact: 'Contact', lang: 'Langue', nav: 'Navigation rapide', toggle: 'Basculer mode clair / sombre', resume: 'CV' },
};

const ar: Dict = {
  dir: 'rtl',
  nav: { home: 'الرئيسية', whatIDo: 'ما أفعله', work: 'أعمالي', experience: 'المسار', behind: 'التقنيات', contact: 'اتصل بي', resume: 'السيرة الذاتية' },
  hero: {
    badge: 'متاح لتدريب PFE', titleA: '\u0623\u0628\u0646\u064a ', titleEm: '\u0645\u0646\u062a\u062c\u0627\u062a \u0643\u0627\u0645\u0644\u0629', titleB: '، \u0644\u0627 \u0628\u063a\u0631 \u0645\u064a\u0632\u0627\u062a.',
    lede: '\u0623\u0646\u0627 \u0645\u0647\u0646\u062f\u0633 \u0628\u0631\u0645\u062c\u064a\u0627\u062a \u0623\u0628\u0646\u064a \u0645\u0646\u062a\u062c\u0627\u062a \u0631\u0642\u0645\u064a\u0629 \u0645\u062a\u0643\u0627\u0645\u0644\u0629, \u0645\u0646 \u0623\u0648\u0644 \u0633\u0637\u0631 \u0643\u0648\u062f \u0625\u0644\u0649 \u062a\u0637\u0628\u064a\u0642 \u064a\u0639\u0645\u0644 \u0641\u0639\u0644\u0627\u064b.',
    ctaWork: '\u0627\u0633\u062a\u0639\u0631\u0636 \u0623\u0639\u0645\u0627\u0644\u064a', ctaContact: '\u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u064a',
    statsLabels: ['\u0645\u0634\u0627\u0631\u064a\u0639 \u0645\u0646\u0634\u0648\u0631\u0629', '\u0645\u0646\u0635\u0627\u062a', '\u062a\u062f\u0631\u0628\u0627\u062a \u0645\u0643\u062a\u0645\u0644\u0629'],
    personalityA: '\u0637\u0627\u0644\u0628', personalityB: '\u064a\u0646\u0634\u0631 \u0643\u0648\u062f\u0627\u064b \u0625\u0646\u062a\u0627\u062c\u064a\u064b\u0627 \u0628\u064a\u0646 \u0627\u0644\u0645\u062d\u0627\u0636\u0631\u0627\u062a.',
    avail: '\u0645\u062a\u0627\u062d \u0644\u062a\u062f\u0631\u0628 PFE \u00b7 \u0627\u0644\u0645\u063a\u0631\u0628 \u0623\u0648 \u0639\u0646 \u0628\u0639\u062f',
  },
  whatIDo: {
    kicker: 'ما أفعله', title: 'أحوّل الأفكار المعقدة إلى منتجات بسيطة وتعمل.',
    sub: 'من الفكرة إلى النشر — أتولى整个الرحلة حتى لا تضطر أنت.',
    capabilities: [
      { title: 'بناء منتجات كاملة', desc: 'آخذ فكرة وأحوّلها إلى تطبيق يعمل — واجهة أمامية، خادم، قاعدة بيانات، ونشر. كل شيء متصل ويعمل.', details: 'تطوير full-stack بـ Spring Boot و Next.js و React Native. واجهات API، مزامنة لحظية، تكاملات دفع، مصادقة وتصميم قواعد بيانات.' },
      { title: 'تصميم واجهات بديهية', desc: 'أنشئ تجارب ويب وموبايل تبدو بسيطة، حتى تكون التقنية وراءها معقدة.', details: 'تصميم متجاوب، دعم ثلاث لغات (FR/EN/AR مع RTL حقيقي)، إمكانية الوصول (WCAG 2.2)، حركات وإفصاح تدريجي.' },
      { title: 'بناء أنظمة موثوقة', desc: 'أصمم الأجزاء غير المرئية — سلامة البيانات، الأمان، الأداء، والأشياء التي لا تتكسر عندما يعتمد عليها المستخدمون.', details: 'سلامة المعاملات، أقفال متفائلة، PII مشفر، تحديد المعدل، قواطع، اختبارات مؤتمتة (وحدة ← تكامل ← E2E) ونشر بدون توقف.' },
      { title: 'العمل بلغات متعددة', desc: 'أبني بالفرنسية والإنجليزية والعربية — مع دعم RTL حقيقي للمتحدثين بالعربية.', details: 'i18n كامل مع توجيه اللغة، عكس تخطيط RTL ومحتوى مكيف ثقلياً في ثلاث لغات.' },
    ],
  },
  howIWork: {
    kicker: 'كيف أعمل', title: 'من الفكرة إلى الإنتاج، خطوة بخطوة.',
    sub: 'لا أكتب كوداً فحسب. أتبع عملية تحوّل الأفكار إلى منتجات موثوقة.',
    steps: [
      { label: 'أفهم', desc: 'أبدأ بفهم المشكلة والمستخدمين وما يعنيه النجاح.' },
      { label: 'أصمم', desc: 'أخطط للمعمارية وتدفق البيانات قبل كتابة سطر كود واحد.' },
      { label: 'أبني', desc: 'أكتب كوداً نظيفاً ومفحوصاً في تكرارات مركزة.' },
      { label: 'أتحقق', desc: 'كل ميزة مفحوصة — من اختبارات الوحدة إلى مسارات المتصفح الحقيقية.' },
      { label: 'أنشر', desc: 'أنشر للإنتاج مع نشر بدون توقف وفحص صحة.' },
      { label: 'أحسّن', desc: 'أقيس وأراقب وأكرر بناءً على الاستخدام الفعلي.' },
    ],
  },
  filters: { all: 'الكل', web: 'ويب', mobile: 'موبايل', backend: 'باك-إند', ai: 'ذكاء اصطناعي', iot: 'إنترنت الأشياء' },
  work: {
    kicker: 'أعمال مختارة', title: 'أنظمة تعمل في الإنتاج، لا عروض تعمل مرة واحدة.',
    sub: 'ستة مشاريع عبر الويب والموبايل والباك-إند والذكاء الاصطناعي وإنترنت الأشياء. كلها منشورة أو مستعملة.',
    showLess: 'عرض أقل',
    projects: [
      { title: 'OdemLab: تجارة التجميل بالذكاء الاصطناعي', year: 'الأبرز', kind: 'فريق من 4 · مستودع خاص', heading: 'OdemLab', lead: 'd',
        description: 'متجر تجميل إلكتروني بتحليل ذكاء اصطناعي للبشرة، ثلاث طرق دفع (Stripe، CMI، الدفع عند الاستلام) ودعم ثلاث لغات.',
        result: '810 اختبار مؤتمت، 93 هجرة، 3 تكاملات دفع. منشور على Cloud Run.',
        note: 'مستودع خاص: عرض حي ومراجعة الكود عند الطلب.' },
      { title: 'منصة المواعيد الطبية', year: '2025', kind: 'تدريب · Full-stack', heading: 'طبي', lead: 'ب',
        description: 'منصة إدارة عيادة يحجز فيها المرضى مواعيد عبر الإنترنت ويدير الأطباء جداولهم ويولّدون تقارير PDF.',
        result: 'تقليل الحجز من 15 دقيقة مكالمة إلى 2 دقيقة حجز إلكتروني.' },
      { title: 'FitTrack: منصة رياضية', year: '2025', kind: 'فريق من 2 · Full-stack', heading: 'FitTrack', lead: 'i',
        description: 'تطبيق ويب رياضي لإنشاء برامج تمارين وتتبع الحصص لحظياً وعرض إحصائيات مؤشر كتلة الجسم والسعر اليومي.',
        result: 'خط أنابيب إشراف كامل عبر 38 تمريناً مع عروض فيديو.' },
      { title: 'رفيق الحرم الذكي', year: '2026', kind: 'فريق من 4 · Flutter', heading: 'Campus', lead: 'a',
        description: 'تطبيق Flutter لإدارة الحرم يمسح الطلاب رموز QR للحصول على معلومات القاعة فوراً مع تصور واقع معزز.',
        result: 'معلومات القاعة بمسحة QR. مزامنة لحظية عبر 7 مجموعات.' },
      { title: 'SmartSummarizer', year: '2025', kind: 'فريق من 4 · معالجة لغة', heading: 'ملخص', lead: 'خ',
        description: 'منصة ذكاء اصطناعي تحول ملفات PDF إلى أدوات مراجعة — ملخصات، صوت، اختبارات وخرائط ذهنية.',
        result: '9.9 ثانية معالجة متوسطة. درجة 8.4/10 من 30 طالب.' },
      { title: 'نظام عد القصب', year: '2024 · مشروع التخرج', kind: 'مدمج · مشروع النهاية', heading: 'IoT', lead: 'T',
        description: 'نظام عد مبني على ESP8266 بحساس ليزر لعدّ القصب على خط الإنتاج مع عرض OLED ولوحة ويب Wi-Fi.',
        result: 'دقة 98%+. غلاف مطبوع ثلاثي الأبعاد.' },
    ],
  },
  exp: {
    kicker: 'المسار', title: 'الخبرة والتكوين.',
    jobs: [
      { when: 'يونيو 2026 – سبتمبر 2026 · أكادير، حضوري', title: 'مشروع نهاية السنة (PFA): مطور Full-Stack', org: 'Zorium، تكنوبارك أكادير', where: 'منصة OdemLab · فريق من أربعة',
        points: ['وحدات الباك-إند: الطلبات، المنتجات، المدفوعات، المصادقة، GDPR', 'تحصين مسارات المال: تسعير من الخادم، دفع غير قابل للتكرار، دورة طلبات مدققة', 'النشر على Cloud Run: نشر بدون توقف، فحص صحة، ترقية الميزات، رجوع تلقائي عند الفشل'] },
      { when: 'يوليوز 2025 – سبتمبر 2025 · عن بعد', title: 'متدرب مطور Full-Stack', org: 'MOUSSA SOFT، أكادير', where: 'Laravel · MySQL · Bootstrap',
        points: ['MediCare: حجز المرضى-الأطباء، جدولة المواعيد، تقارير PDF، لوحات Chart.js'] },
      { when: 'يونيو 2023 – أغسطس 2023', title: 'متدرب أتمتة QA', org: 'حزم الانحدار الويب', where: 'Python · Selenium WebDriver · Page Objects',
        points: ['استبدال حملة يدوية بحزم انحدار آلية، نقطة تغيير واحدة لكل شاشة'] },
      { when: 'يونيو 2024 – يونيو 2024 · أكادير، حضوري', title: 'مشروع نهاية الدراسات (DUT): مطور مدمج', org: 'MOUSSA SOFT، أكادير', where: 'ESP8266 · VL53L0X · PHP · MySQL',
        points: ['نظام عد قصب بـ ESP8266 + حساس ليزر، شاشة OLED، Wi-Fi إلى لوحة PHP/MySQL', 'أغلفة 3D مطبوعة مصممة في SolidWorks، محضرة بـ Creality CR-10 Max'] },
    ],
  },
  edu: {
    kicker: 'التكوين', title: 'مدارس، لا وظائف.', sub: 'التكوينان وراء هذا العمل.',
    entries: [
      { years: '2024 – الآن', title: 'سلك المهندسين، هندسة البرمجيات', school: 'ENSIASD · جامعة ابن زهر، تارودانت', desc: 'ذكاء اصطناعي، علم البيانات، معمارية البرمجيات.' },
      { years: '2022 – 2024 · بميزة', title: 'DUT، المعلوميات المدمجة', school: 'EST وجدة، المدرسة العليا للتكنولوجيا', desc: 'أنظمة مدمجة، إنترنت الأشياء، firmware: ESP32/ESP8266، Arduino، Raspberry Pi.' },
    ],
  },
  behind: {
    kicker: 'التقنيات', title: 'وراء المشاريع.',
    sub: 'التقنيات التي أستخدمها، منظمة حسب الوظيفة.',
    categories: [
      { name: 'الواجهة الأمامية', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Flutter', 'React Native'] },
      { name: 'الخادم', items: ['Java', 'Spring Boot', 'Node.js', 'Python', 'Flask', 'Laravel'] },
      { name: 'البيانات', items: ['PostgreSQL', 'Redis', 'MySQL', 'Firebase Firestore'] },
      { name: 'السحابة والبنية التحتية', items: ['Docker', 'GitHub Actions', 'Google Cloud Run', 'Terraform', 'Flyway'] },
      { name: 'الاختبار', items: ['Playwright', 'JUnit 5', 'Vitest', 'Jest', 'Testcontainers', 'axe-core'] },
      { name: 'الذكاء الاصطناعي', items: ['Gemini AI', 'CamemBERT', 'spaCy', 'Groq', 'PyTorch'] },
    ],
  },
  aboutMe: {
    kicker: 'نبذة', title: 'الشخص وراء الكود.',
    sub: ' קצת על דרך تفكيري وما الذي يحركني.',
    body: 'أحب بناء الأشياء التي تعمل من البداية للنهاية — ليس فقط الأجزاء المرئية على الشاشة، بل الأنظمة التي وراءها. أنا متحفز بالفجوة بين فكرة جيدة ومنتج يعمل، وأحب أن أكون الشخص الذي يسدّها. أركز حالياً على تطوير full-stack وأبحث عن تدريب PFE حيث يمكنني نشر كود إنتاجي.',
    langs: [{ l: 'العربية', lvl: 'الأم' }, { l: 'الفرنسية', lvl: 'مهنية' }, { l: 'الإنجليزية', lvl: 'مهنية' }],
  },
  contact: {
    kicker: 'اتصل بي', title: 'لنبنِ شيئاً متيناً.',
    sub: 'أبحث عن ', subEm: 'تدريب PFE', subEnd: '، باك-إند أو full-stack، المغرب أو عن بعد. أرد بسرعة.',
    name: 'اسمك', namePh: 'اسمك الكامل', email: 'البريد الإلكتروني', emailPh: 'you@company.com',
    msg: 'تفاصيل المشروع', msgPh: 'ماذا تبني، ومتى؟', send: 'أرسل', sending: '...',
    success: '✓ تم إرسال الرسالة. سأرد عليك قريباً.', error: '✗ حدث خطأ. أرسل لي بريداً إلكترونياً مباشرة.',
    respondTime: 'أرد عادةً خلال 24 ساعة',
    direct: 'بريد مباشر', phone: 'الهاتف', linkedin: 'LinkedIn', github: 'GitHub',
  },
  footer: { built: '', top: 'الأعلى', elsewhere: 'منصات أخرى' },
  dock: { home: 'الرئيسية', whatIDo: 'ما أفعله', work: 'أعمالي', contact: 'اتصل بي', lang: 'اللغة', nav: 'تنقل سريع', toggle: 'تبديل الوضع الفاتح / الداكن', resume: 'السيرة الذاتية' },
};

export const DICTS: Record<Lang, Dict> = { en, fr, ar };

export const PROJECT_TAGS: string[][] = [
  tags.odemlab, tags.med, tags.fit, tags.campus, tags.sum, tags.iot,
];
export const PROJECT_CATS: string[][] = [
  ['web', 'mobile', 'backend'], ['web', 'backend'], ['web', 'backend'], ['mobile'], ['ai'], ['iot'],
];
export const PROJECT_THUMBS = ['thumb-odem', 'thumb-med', 'thumb-fit', 'thumb-campus', 'thumb-sum', 'thumb-iot'];

type LangCtx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };

export const LangCtxObject = createContext<LangCtx>({ lang: 'en', setLang: () => {}, t: en });

export function useLang() {
  return useContext(LangCtxObject);
}
