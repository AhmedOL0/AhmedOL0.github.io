import { createContext, useContext } from 'react';

export type Lang = 'en' | 'fr';
export const LANGS: { code: Lang; label: string; aria: string }[] = [
  { code: 'en', label: 'EN', aria: 'English' },
  { code: 'fr', label: 'FR', aria: 'Français' },
];

export type ProjectT = {
  title: string; year: string; kind: string; heading: string; lead: string;
  description: string; highlight: string; result?: string; linkLabel?: string; linkHref?: string;
  cardRole?: string; role?: string; architecture?: string; quality?: string;
};

export type ProjectGalleryImageT = {
  src: string;
  width: number;
  height: number;
  alt: Record<Lang, string>;
  label: Record<Lang, string>;
};

export function thumbTitle(p: ProjectT): { pre: string; em: string; post: string } {
  const i = p.heading.indexOf(p.lead);
  if (i === -1 || !p.lead) return { pre: p.heading, em: '', post: '' };
  return { pre: p.heading.slice(0, i), em: p.lead, post: p.heading.slice(i + p.lead.length) };
}

export type JobT = { when: string; title: string; org: string; where?: string; points: string[]; tags: string[] };
export type EduT = { years: string; title: string; school: string; desc: string };

export type Capability = { title: string; desc: string; details: string };
export type ProcessStep = { label: string; desc: string; artifact: string };
export type TechCategory = { name: string; items: string[]; usedIn: { label: string; href: string }[] };

export type Dict = {
  dir: 'ltr' | 'rtl';
  nav: { home: string; whatIDo: string; work: string; experience: string; behind: string; contact: string; resume: string; skipToContent: string; langChanged: string };
  hero: { badge: string; titleA: string; titleEm: string; titleB: string; lede: string; ledeShort: string; ctaWork: string; ctaContact: string; statsLabels: [string, string]; avail: string; photoChipA: string; photoChipB: string };
  plate: { roleLabel: string; role: string; focusLabel: string; focus: string; locLabel: string; loc: string; statusLabel: string; status: string };
  whatIDo: { kicker: string; title: string; sub: string; showDetails: string; showLess: string; metricLabels: [string, string, string, string]; proofCases: string; proofQA: string; proofStack: string; capabilities: Capability[] };
  howIWork: { kicker: string; title: string; sub: string; artifactLabel: string; steps: ProcessStep[] };
  filters: { all: string; web: string; mobile: string; backend: string; ai: string; iot: string };
  work: { kicker: string; title: string; sub: string; featured: string; showLess: string; showFewer: string; showMoreTags: string; filterCount: string; filterCountOne: string; filterGroup: string; walkthroughNote: string; notesSummary: string; approachLabel: string; outcomeLabel: string; roleLabel: string; architectureLabel: string; qualityLabel: string; explore: string; close: string; discuss: string; screensLabel: string; previousProject: string; nextProject: string; previousScreen: string; nextScreen: string; enlarge: string; projects: ProjectT[] };
  exp: { kicker: string; title: string; latest: string; jobs: JobT[] };
  edu: { kicker: string; title: string; sub: string; entries: EduT[] };
  behind: { kicker: string; title: string; sub: string; dailyLabel: string; daily: string; exploredLabel: string; explored: string; layerLabel: string; stackLabel: string; usedInLabel: string; categories: TechCategory[] };
  aboutMe: { kicker: string; title: string; sub: string; role: string; body: string; currentlyLabel: string; currentlyBuilding: string; currentlyOpen: string; interests: string[]; langsTitle: string; langs: { l: string; lvl: string }[]; principlesTitle: string; principles: string[] };
  contact: {
    kicker: string; title: string; sub: string; subEm: string; subEnd: string;
    name: string; namePh: string; email: string; emailPh: string; msg: string; msgPh: string;
    send: string; sending: string; success: string; error: string;
    mailto: string;
    respondTime: string; retry: string;
    direct: string; phone: string; linkedin: string; github: string; loc: string;
    briefRolesLabel: string; briefRoles: string; briefLocationLabel: string; briefLocation: string; briefReplyLabel: string;
    copy: string; copied: string; copyEmail: string; copyPhone: string;
  };
  footer: { top: string; elsewhere: string; explore: string; built: string; pageTitle: string };
  dock: { home: string; whatIDo: string; work: string; contact: string; lang: string; nav: string; footerNav: string; toggle: string; toggleLight: string; toggleDark: string; resume: string; cvFullStack: string; cvQA: string; linkedin: string; github: string; email: string; backToTop: string };
  error: { label: string; title: string; sub: string; refresh: string; home: string; still: string };
};

const tags = {
  odemlab: ['Java 21', 'Spring Boot', 'Next.js', 'React', 'TypeScript', 'PostgreSQL', 'Redis', 'Flyway', 'OpenAPI', 'Docker', 'Google Cloud Run', 'GitHub Actions'],
  procure: ['Java 21', 'Spring Boot', 'Angular', 'TypeScript', 'PostgreSQL', 'MongoDB', 'Flyway', 'Playwright', 'Docker', 'Groq'],
  med: ['PHP', 'Laravel', 'MySQL', 'JavaScript', 'Bootstrap'],
  fit: ['Spring Boot', 'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'MySQL', 'Docker'],
  campus: ['Flutter', 'Dart', 'Firebase', 'Firestore', 'Riverpod', 'ARCore/ARKit', 'QR Scanner'],
  sum: ['Python', 'Flask', 'PyTorch', 'CamemBERT', 'spaCy', 'Groq'],
  iot: ['ESP8266', 'VL53L0X', 'PHP', 'MySQL'],
};

const en: Dict = {
  dir: 'ltr',
  nav: { home: 'Home', whatIDo: 'What I Do', work: 'Work', experience: 'Experience', behind: 'Tech Stack', contact: 'Contact', resume: 'Résumé', skipToContent: 'Skip to content', langChanged: 'Language changed to English' },
  hero: {
    badge: 'Open to a final-year engineering internship (PFE)', titleA: 'Building ', titleEm: 'complete products', titleB: ', not just features.',
    lede: 'I\'m Ahmed Ouarrali, a full-stack engineer focused on Java 21 and Spring Boot. I build and test end-to-end products, from backend contracts to a running application people use.',
    ledeShort: 'Java / Spring Boot full-stack engineer. I build and test products from backend contracts to production.',
    ctaWork: 'View my work', ctaContact: 'Get in touch',
    statsLabels: ['Projects shipped', 'Internships completed'],
    avail: 'Final-year engineering internship (PFE) \u00b7 Morocco or remote',
    photoChipA: 'FULL-STACK ENGINEER', photoChipB: 'QA & TEST AUTOMATION',
  },
  plate: {
    roleLabel: 'ROLE', role: 'PFE CANDIDATE',
    focusLabel: 'FOCUS', focus: 'BACKEND SYSTEMS & FULL-STACK',
    locLabel: 'LOCATION', loc: 'MOROCCO \u00b7 UTC+1',
    statusLabel: 'STATUS', status: 'OPEN FOR PFE \u00b7 2027',
  },
  whatIDo: {
    kicker: 'What I do', title: 'I turn complex ideas into simple, working products.',
    sub: 'From concept to deployment. I handle the full journey so you don\'t have to.',
    showDetails: 'Details', showLess: 'Less',
    metricLabels: ['projects shipped', 'keyboard · focus · motion', 'Playwright checks', 'typed copy'],
    proofCases: 'Case studies', proofQA: 'QA CV', proofStack: 'Stack',
    capabilities: [
      { title: 'Build complete products', desc: 'I take an idea from concept to a running application. Frontend, backend, database, and deployment. Everything connected, everything working.', details: 'Full-stack development with Java 21, Spring Boot, Next.js and React. REST APIs, contract-generated frontend types, authentication, PostgreSQL and deployment.' },
      { title: 'Design intuitive interfaces', desc: 'I create web and mobile experiences that feel simple, even when the technology behind them is complex.', details: 'Responsive design, accessibility (WCAG 2.2), keyboard and focus states, reduced motion, and progressive disclosure.' },
      { title: 'Build reliable systems', desc: 'I design the invisible parts. Data integrity, security, performance, and things that don\'t break when users depend on them.', details: 'Transactional integrity, tenant isolation, idempotency, automated testing (unit → integration → E2E), and CI gates that block regressions.' },
      { title: 'Ship bilingual products', desc: 'I build in French and English, with copy that stays consistent across both interfaces.', details: 'Typed EN/FR copy source, synchronized lang and title, and a test that catches untranslated French.' },
    ],
  },
  howIWork: {
    kicker: 'How I work', title: 'From idea to production, step by step.',
    sub: 'I don\'t just write code. I follow a process that turns ideas into reliable products.',
    artifactLabel: 'Artifact',
    steps: [
      { label: 'Understand', desc: 'I start by understanding the problem, users, and success criteria.', artifact: 'Brief · success criteria' },
      { label: 'Design', desc: 'I plan the architecture and data flow before writing code.', artifact: 'Architecture · OpenAPI' },
      { label: 'Build', desc: 'I write clean, tested code in focused iterations.', artifact: 'PR · typed contract' },
      { label: 'Test', desc: 'Every feature is verified from unit tests to browser flows.', artifact: 'JUnit · Playwright' },
      { label: 'Deploy', desc: 'I ship to production with zero-downtime and health checks.', artifact: 'Cloud Run revision' },
      { label: 'Improve', desc: 'I monitor, measure, and iterate based on real usage.', artifact: 'Retro · metrics' },
    ],
  },
  filters: { all: 'All', web: 'Web', mobile: 'Mobile', backend: 'Backend', ai: 'AI', iot: 'IoT' },
  work: {
    kicker: 'Selected work', title: 'Systems that run in production, not demos that run once.',
    sub: 'Seven builds across web, mobile, backend, AI and IoT. Each one deployed, used, or graded.',
    featured: 'Featured case study',
    showLess: 'show less', showFewer: 'Show fewer tags', showMoreTags: 'Show {count} more tags', filterCount: 'Showing {count} of {total} projects', filterCountOne: 'Showing 1 of {total} projects', filterGroup: 'Filter projects by discipline',
    walkthroughNote: 'Live demos, private repositories and hardware: code walkthroughs and guided demos available on request.',
    notesSummary: 'Engineering notes', approachLabel: 'Approach', outcomeLabel: 'Outcome',
    roleLabel: 'My role', architectureLabel: 'Architecture', qualityLabel: 'Quality and tests',
    explore: 'Explore project', close: 'Close', discuss: 'Discuss this project', screensLabel: 'Project screens',
    previousProject: 'Previous project', nextProject: 'Next project', previousScreen: 'Previous screen', nextScreen: 'Next screen', enlarge: 'Enlarge screen',
    projects: [
      { title: 'OdemLab: skincare commerce platform', year: 'Flagship', kind: 'Team of 4 · Private repo', heading: 'OdemLab', lead: 'd',
        cardRole: 'Backend modules · web · order flow',
        description: 'Team-of-four skincare commerce platform with AI diagnosis and a React Native storefront. I built the backend business modules, web storefront/back-office and order flow.',
        highlight: 'Orders are priced server-side, guarded by a state machine and idempotency: clients cannot change an amount and duplicate orders are blocked. Frontend types are generated from OpenAPI, and CI fails on contract drift.',
        result: 'Flyway migrations replay from an empty database, with a duplicate-version test. Admin notifications stay in sync across browser tabs.',
        role: 'Backend and web. I built the business modules and order flow, plus the web storefront/back-office. The AI diagnosis and React Native app were teammates\u2019 work.',
        architecture: 'Spring Boot modular monolith, Next.js/React web, PostgreSQL/Redis, OpenAPI-generated frontend types, Flyway, Google Cloud Run.',
        quality: 'Server-side pricing, order state machine and idempotency; CI fails on OpenAPI drift; Flyway replay and duplicate-version protection.' },
      { title: 'ProcureFlow: B2B procurement platform', year: '2026', kind: 'Full-stack \u00b7 Spring Boot & Angular', heading: 'ProcureFlow', lead: 'F',
        cardRole: 'Requests · approvals · budgets · AI copilot',
        description: 'A multi-tenant B2B procurement platform: requests, approvals, suppliers, orders, invoices and budgets. Requests move through a stepped approval workflow with bounded delegation, and budget is reserved atomically on approval.',
        highlight: 'Multi-tenant isolation: cross-tenant access answers 404, never 403. Amounts are recomputed server-side with idempotency keys, and frontend types are generated from the API contract.',
        result: 'JWT refresh-token rotation, bilingual FR/EN interface, and an AI copilot that cites workspace data and drafts requests from natural-language descriptions.',
        role: 'Full-stack. Multi-tenant procurement workflows, approvals, budgets, data isolation and the AI copilot.',
        architecture: 'Spring Boot modular monolith, Angular SPA, PostgreSQL/MongoDB, Flyway, short-lived JWT with rotation, Docker.',
        quality: 'Tenant isolation, atomic budget reservation on approval, automated module-boundary checks and Playwright coverage.',
        linkLabel: 'View the repository', linkHref: 'https://github.com/AhmedOL0/ProcureFlow' },
      { title: 'MediCare: clinic management platform', year: '2025', kind: 'Internship · Full-stack', heading: 'MediCare', lead: 'Care',
        cardRole: 'Booking · schedules · patient records',
        description: 'A clinic management platform with specialty search, online booking, schedules and patient records. Three role spaces: patient, doctor and admin.',
        highlight: 'Separate spaces for patients, doctors and admins, with slot checks that prevent double bookings at write time.',
        result: 'Specialty search, online booking and patient records in one workflow.'},
      { title: 'FitTrack: training platform', year: '2025', kind: 'Team of 2 · Full-stack', heading: 'FitTrack', lead: 'i',
        cardRole: 'Programmes · health profile · admin',
        description: 'A personal fitness web app for training programmes, sessions and performance logs, with a health profile (BMI, daily energy), exercise library and admin area.',
        highlight: 'Programme and session flows, health metrics and a full admin area for the exercise library.',
        result: 'Admin area plus a personal health profile with BMI and daily energy.',
        role: 'Full-stack. Programmes, sessions, performance logs, health profile, exercise library and admin area.',
        architecture: 'Spring Boot, Next.js/React, MySQL, Docker.'},
      { title: 'Smart Campus Companion', year: '2026', kind: 'Team of 4 · Flutter', heading: 'Campus', lead: 'a',
        cardRole: 'QR rooms · AR view · bookings',
        description: 'A Flutter campus app: scan QR codes on room doors to open a room sheet with capacity and equipment, plus an AR view. Timetable, bookings, moderated announcements and incident reports across three roles.',
        highlight: 'QR-to-room sheet with an AR view; timetable, bookings, moderated announcements and incident reports across three roles.',
        result: 'Three role spaces; QR room sheets and an AR view.',
        role: 'Mobile. QR room sheets, AR view, timetable, bookings, moderated announcements and incident reports across three roles.',
        architecture: 'Flutter, Firebase/Firestore, Riverpod, ARCore/ARKit.'},
      { title: 'SmartSummarizer', year: '2025', kind: 'Team of 4 · NLP', heading: 'Summarizer', lead: 'u',
        cardRole: 'Summaries · quizzes · mind maps',
        description: 'A team project that turns course PDFs into study tools: summaries, audio, quizzes and mind maps using CamemBERT and Groq.',
        highlight: 'PDFs become summaries and quizzes through CamemBERT extraction and Groq generation.',
        result: 'Team-built NLP study tool with summaries, quiz and mind-map outputs.'},
      { title: 'Cane counting system', year: '2024 · DUT thesis', kind: 'Embedded · Final-year project', heading: 'IoT', lead: 'T',
        cardRole: 'Laser sensing · firmware · dashboard',
        description: 'An ESP8266 counting system using a laser sensor to count canes on a production line, with an OLED display and Wi-Fi dashboard.',
        highlight: 'Laser sensing with on-device counting and a Wi-Fi dashboard.',
        result: 'Production-line prototype with OLED display and a PHP/MySQL dashboard.'},
    ],
  },
  exp: {
    kicker: 'Track record', title: 'The roles I\'ve held.', latest: 'Latest role',
    jobs: [
      { when: 'JUN 2026 – SEP 2026 · AGADIR, ON-SITE', title: 'End-of-year internship (PFA): Full-Stack Developer', org: 'Zorium, Technoparc Agadir', where: 'OdemLab platform · team of four',
        tags: ['Java 21', 'Spring Boot', 'PostgreSQL', 'Redis', 'Next.js', 'React', 'TypeScript', 'Docker', 'Google Cloud Run', 'GitHub Actions'],
        points: ['Backend business modules, especially orders: server-side pricing, state machine and idempotency.', 'Storefront and back-office: catalogue, product page and admin screens; frontend types generated from OpenAPI with CI failing on drift.', 'Notifications with batched delivery and per-recipient read state; Flyway migrations replayable from an empty database with duplicate-version protection.'] },
      { when: 'JUL 2025 – SEP 2025 · REMOTE', title: 'Full-Stack Developer Intern', org: 'MOUSSA SOFT · Agadir',
        tags: ['PHP', 'Laravel', 'MySQL', 'JavaScript', 'Bootstrap'],
        points: ['Built MediCare: specialty search, online booking, schedules and patient records; three roles with slot checks that prevent double bookings.'] },
      { when: 'MAR 2024 – JUN 2024 · AGADIR, ON-SITE', title: 'End-of-study internship (DUT): Embedded Developer', org: 'MOUSSA SOFT · Agadir',
        tags: ['ESP8266', 'VL53L0X', 'PHP', 'MySQL'],
        points: ['Built a cane counting system with ESP8266 + laser sensor, OLED display and a PHP/MySQL Wi-Fi dashboard.'] },
      { when: 'JUN 2023 – AUG 2023', title: 'QA Automation Intern', org: 'Univers Architecture Maroc',
        tags: ['Python', 'Selenium', 'ChromeDriver', 'Page Objects'],
        points: ['Replaced manual tests with Selenium suites replayed on every release, one change point per UI change.'] },
    ],
  },
  edu: {
    kicker: 'Education', title: 'Schools, not jobs.', sub: 'The two programs behind the work above.',
    entries: [
      { years: '2024 – Present', title: 'Engineering Cycle, Software Engineering', school: 'ENSIASD · Ibn Zohr University, Taroudant', desc: 'Artificial intelligence, data science, software architecture.' },
      { years: '2022 – 2024 · With honors', title: 'DUT, Embedded Computer Engineering', school: 'EST Oujda, École Supérieure de Technologie', desc: 'Embedded systems, IoT, firmware: ESP32/ESP8266, Arduino, Raspberry Pi. Thesis: laser-based cane counting system.' },
    ],
  },
  behind: {
    kicker: 'Tech stack', title: 'Behind the work.',
    sub: 'The technologies I use, organized by what they do.',
    dailyLabel: 'Heaviest use', daily: 'Java 21 \u00b7 Spring Boot \u00b7 Angular \u00b7 React \u00b7 Next.js \u00b7 TypeScript \u00b7 PostgreSQL \u00b7 Docker \u00b7 Playwright',
    exploredLabel: 'Also explored', explored: 'Flutter \u00b7 Laravel \u00b7 Firebase \u00b7 CamemBERT \u00b7 Vitest \u00b7 PyTorch',
    layerLabel: 'Layer', stackLabel: 'Stack', usedInLabel: 'Used in',
    categories: [
      { name: 'Frontend', items: ['React', 'Next.js', 'Angular', 'TypeScript', 'Tailwind CSS', 'Flutter'], usedIn: [
        { label: 'OdemLab', href: '#work-odemlab' }, { label: 'ProcureFlow', href: '#work-procure' }, { label: 'FitTrack', href: '#work-fittrack' }, { label: 'Smart Campus', href: '#work-campus' },
      ] },
      { name: 'Backend', items: ['Java', 'Spring Boot', 'Spring Security', 'JPA/Hibernate', 'REST APIs', 'OpenAPI', 'Laravel', 'Flask', 'Python'], usedIn: [
        { label: 'OdemLab', href: '#work-odemlab' }, { label: 'ProcureFlow', href: '#work-procure' }, { label: 'MediCare', href: '#work-medical' }, { label: 'FitTrack', href: '#work-fittrack' },
      ] },
      { name: 'Data', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Flyway', 'Firebase Firestore'], usedIn: [
        { label: 'OdemLab', href: '#work-odemlab' }, { label: 'ProcureFlow', href: '#work-procure' }, { label: 'MediCare', href: '#work-medical' }, { label: 'FitTrack', href: '#work-fittrack' }, { label: 'Smart Campus', href: '#work-campus' },
      ] },
      { name: 'Cloud & DevOps', items: ['Docker', 'Git', 'GitHub Actions', 'Google Cloud Run'], usedIn: [
        { label: 'OdemLab', href: '#work-odemlab' }, { label: 'ProcureFlow', href: '#work-procure' }, { label: 'Portfolio', href: '#top' },
      ] },
      { name: 'Testing', items: ['Playwright', 'JUnit 5', 'Mockito', 'Testcontainers', 'Vitest', 'ArchUnit', 'axe-core', 'Selenium'], usedIn: [
        { label: 'OdemLab', href: '#work-odemlab' }, { label: 'ProcureFlow', href: '#work-procure' }, { label: 'Portfolio', href: '#top' },
      ] },
      { name: 'AI/ML', items: ['CamemBERT', 'spaCy', 'Groq', 'PyTorch'], usedIn: [
        { label: 'ProcureFlow', href: '#work-procure' }, { label: 'SmartSummarizer', href: '#work-summarizer' },
      ] },
    ],
  },
  aboutMe: {
    kicker: 'About me', title: 'The person behind the code.',
    sub: 'A bit about how I think and what drives me.',
    role: 'Engineering student \u00b7 Full-stack developer',
    body: 'I enjoy building things that work end-to-end. Not just the parts that show on screen, but the systems behind them. I\'m driven by the gap between a good idea and a working product, and I like being the person who bridges it. Currently focused on full-stack development and looking for a PFE internship where I can ship production code.',
    currentlyLabel: 'Currently', currentlyBuilding: 'Building', currentlyOpen: 'Open for a PFE internship · February-June 2027.',
    interests: ['Open source', 'System design', 'Chess', 'Martial arts'],
    langsTitle: 'Languages',
    langs: [{ l: 'Arabic', lvl: 'native' }, { l: 'French', lvl: 'professional' }, { l: 'English', lvl: 'professional' }],
    principlesTitle: 'How I think',
    principles: [
      'Say what was built and why, never how many.',
      'A feature is not done until it is verified automatically.',
      'Paranoia on money and data paths; simplicity everywhere else.',
    ],
  },
  contact: {
    kicker: 'Contact', title: 'Let\'s build something solid.',
    sub: 'Looking for a ', subEm: 'PFE internship', subEnd: ', backend or full-stack, Morocco or remote. I answer fast.',
    name: 'Your name', namePh: 'Your full name', email: 'Email address', emailPh: 'you@company.com',
    msg: 'Project details', msgPh: 'What are you building, and when?', send: 'Send message', sending: 'Sending…',
    success: '\u2713 Message sent. I\'ll get back to you soon.', error: '\u2717 Something went wrong. Try emailing me directly.',
    mailto: '\u2713 Your email app is opening with the message ready to send.',
    respondTime: 'Typically respond within 24 hours',
    retry: 'Try again',
    direct: 'Direct email', loc: 'Morocco', phone: 'Phone', linkedin: 'LinkedIn', github: 'GitHub',
    briefRolesLabel: 'Roles', briefRoles: 'Backend · Full-stack · QA automation', briefLocationLabel: 'Location', briefLocation: 'Morocco · UTC+1 · remote-friendly', briefReplyLabel: 'Reply',
    copy: 'Copy', copied: 'Copied', copyEmail: 'Copy email address', copyPhone: 'Copy phone number',
  },
  footer: { top: 'Top', elsewhere: 'Elsewhere', explore: 'Explore', built: `\u00a9 ${new Date().getFullYear()} Ahmed Ouarrali \u00b7 React 19 \u00b7 Vite \u00b7 Tailwind CSS \u00b7 596 Playwright checks \u00b7 0 cookies \u00b7 GitHub Pages`, pageTitle: 'Ahmed Ouarrali, Java / Spring Boot Full-Stack Engineer | PFE Internship' },
  dock: { home: 'Home', whatIDo: 'What I Do', work: 'Work', contact: 'Contact', lang: 'Language', nav: 'Quick navigation', footerNav: 'Footer navigation', toggle: 'Toggle light / dark mode', toggleLight: 'Switch to light mode', toggleDark: 'Switch to dark mode', resume: 'Résumé', cvFullStack: 'Full-Stack CV', cvQA: 'QA Automation CV', linkedin: 'LinkedIn', github: 'GitHub', email: 'Email', backToTop: 'Back to top' },
  error: {
    label: 'Error', title: 'Something went wrong.',
    sub: 'The page hit an unexpected error. Refreshing usually fixes it.',
    refresh: 'Refresh the page', home: 'Back to homepage',
    still: 'Still broken? Email me:',
  },
};

const fr: Dict = {
  dir: 'ltr',
  nav: { home: 'Accueil', whatIDo: 'Ce que je fais', work: 'Projets', experience: 'Parcours', behind: 'Technologies', contact: 'Contact', resume: 'CV', skipToContent: 'Aller au contenu', langChanged: 'Langue changée en français' },
  hero: {
    badge: 'Recherche stage de fin d\u2019\u00e9tudes (PFE)', titleA: 'Des ', titleEm: 'produits complets', titleB: ', pas juste des fonctionnalit\u00e9s.',
    lede: 'Je suis Ahmed Ouarrali, ing\u00e9nieur full-stack sp\u00e9cialis\u00e9 Java 21 et Spring Boot. Je construis et teste des produits de bout en bout, du contrat backend \u00e0 l\u2019application en production.',
    ledeShort: 'Ing\u00e9nieur full-stack Java / Spring Boot. Je construis et teste des produits du backend \u00e0 la production.',
    ctaWork: 'Voir mes projets', ctaContact: 'Me contacter',
    statsLabels: ['Projets livr\u00e9s', 'Stages compl\u00e9t\u00e9s'],
    avail: 'Stage de fin d\u2019\u00e9tudes (PFE) \u00b7 Maroc ou distanciel',
    photoChipA: 'ING\u00c9NIEUR FULL-STACK', photoChipB: 'QA & AUTOMATISATION DES TESTS',
  },
  plate: {
    roleLabel: 'R\u00d4LE', role: 'CANDIDAT PFE',
    focusLabel: 'FOCUS', focus: 'SYST\u00c8MES BACKEND & FULL-STACK',
    locLabel: 'BASE', loc: 'MAROC \u00b7 UTC+1',
    statusLabel: 'STATUT', status: 'OUVERT PFE \u00b7 2027',
  },
  whatIDo: {
    kicker: 'Ce que je fais', title: 'Je transforme des id\u00e9es complexes en produits simples et fonctionnels.',
    sub: 'Du concept au d\u00e9ploiement. Je g\u00e8re tout le parcours.',
    showDetails: 'D\u00e9tails', showLess: 'Moins',
    metricLabels: ['projets livr\u00e9s', 'clavier · focus · mouvement', 'checks Playwright', 'copie typ\u00e9e'],
    proofCases: '\u00c9tudes de cas', proofQA: 'CV QA', proofStack: 'Stack',
    capabilities: [
      { title: 'Construire des produits complets', desc: 'Je prends une id\u00e9e et la transforme en application fonctionnelle. Frontend, backend, base de donn\u00e9es et d\u00e9ploiement. Tout connect\u00e9, tout qui marche.', details: 'D\u00e9veloppement full-stack avec Java 21, Spring Boot, Next.js et React. APIs REST, types frontend g\u00e9n\u00e9r\u00e9s depuis le contrat, authentification, PostgreSQL et d\u00e9ploiement.' },
      { title: 'Concevoir des interfaces intuitives', desc: 'Je cr\u00e9e des exp\u00e9riences web et mobile qui semblent simples, m\u00eame quand la technologie derri\u00e8re est complexe.', details: 'Design responsive, accessibilit\u00e9 (WCAG 2.2), clavier et focus, r\u00e9duction des animations et divulgation progressive.' },
      { title: 'Construire des syst\u00e8mes fiables', desc: 'Je con\u00e7ois les parties invisibles. Int\u00e9grit\u00e9 des donn\u00e9es, s\u00e9curit\u00e9, performance et tout ce qui ne casse pas quand les utilisateurs en d\u00e9pendent.', details: 'Int\u00e9grit\u00e9 transactionnelle, isolation multi-tenant, idempotence, tests automatis\u00e9s (unit\u00e9 \u2192 int\u00e9gration \u2192 E2E) et gates CI qui bloquent les r\u00e9gressions.' },
      { title: 'Livrer des produits bilingues', desc: 'Je construis en fran\u00e7ais et en anglais, avec une copie coh\u00e9rente dans les deux interfaces.', details: 'Source de copie EN/FR typ\u00e9e, synchronisation de lang et du titre, et un test qui d\u00e9tecte le fran\u00e7ais non traduit.' },
    ],
  },
  howIWork: {
    kicker: 'Comment je travaille', title: 'De l\u2019id\u00e9e \u00e0 la production, \u00e9tape par \u00e9tape.',
    sub: 'Je n\u2019\u00e9cris pas juste du code. Je suis un processus qui transforme les id\u00e9es en produits fiables.',
    artifactLabel: 'Livrable',
    steps: [
      { label: 'Comprendre', desc: 'Je commence par comprendre le probl\u00e8me, les utilisateurs et le succ\u00e8s.', artifact: 'Brief \u00b7 crit\u00e8res de succ\u00e8s' },
      { label: 'Concevoir', desc: 'Je planifie l\u2019architecture et le flux de donn\u00e9es avant de coder.', artifact: 'Architecture \u00b7 OpenAPI' },
      { label: 'Construire', desc: 'J\u2019\u00e9cris du code propre et test\u00e9 en it\u00e9rations focales.', artifact: 'PR \u00b7 contrat typ\u00e9' },
      { label: 'Tester', desc: 'Chaque fonctionnalit\u00e9 est v\u00e9rifi\u00e9e, des tests unitaires aux parcours r\u00e9els.', artifact: 'JUnit \u00b7 Playwright' },
      { label: 'D\u00e9ployer', desc: 'Je livre en production sans interruption et avec contr\u00f4les de sant\u00e9.', artifact: 'R\u00e9vision Cloud Run' },
      { label: 'Am\u00e9liorer', desc: 'Je mesure, surveille et it\u00e8re selon l\u2019utilisation r\u00e9elle.', artifact: 'R\u00e9tro \u00b7 m\u00e9triques' },
    ],
  },
  filters: { all: 'Tous', web: 'Web', mobile: 'Mobile', backend: 'Backend', ai: 'IA', iot: 'IoT' },
  work: {
    kicker: 'Projets', title: 'Des syst\u00e8mes qui tournent en production, pas des d\u00e9mos qui tournent une fois.',
    sub: 'Sept r\u00e9alisations web, mobile, backend, IA et IoT. Chacune d\u00e9ploy\u00e9e, utilis\u00e9e ou \u00e9valu\u00e9e.',
    featured: '\u00c9tude de cas \u00e0 la une',
    showLess: 'voir moins', showFewer: 'Afficher moins', showMoreTags: 'Afficher {count} autres tags', filterCount: '{count} projets sur {total} affichés', filterCountOne: '1 projet sur {total} affichés', filterGroup: 'Filtrer les projets par discipline',
    walkthroughNote: 'D\u00e9mos en direct, d\u00e9p\u00f4ts priv\u00e9s et mat\u00e9riel : revues de code et d\u00e9monstrations guid\u00e9es sur demande.',
    notesSummary: 'Notes techniques', approachLabel: 'Approche', outcomeLabel: 'R\u00e9sultat',
    roleLabel: 'Mon r\u00f4le', architectureLabel: 'Architecture', qualityLabel: 'Qualit\u00e9 et tests',
    explore: 'Explorer le projet', close: 'Fermer', discuss: 'Discuter de ce projet', screensLabel: '\u00c9crans du projet',
    previousProject: 'Projet pr\u00e9c\u00e9dent', nextProject: 'Projet suivant', previousScreen: '\u00c9cran pr\u00e9c\u00e9dent', nextScreen: '\u00c9cran suivant', enlarge: 'Agrandir l\u2019\u00e9cran',
    projects: [
      { title: 'OdemLab : plateforme e-commerce soins', year: 'Vitrine', kind: '\u00c9quipe de 4 \u00b7 D\u00e9p\u00f4t priv\u00e9', heading: 'OdemLab', lead: 'd',
        cardRole: 'Modules m\u00e9tier \u00b7 web \u00b7 commandes',
        description: 'Plateforme de soins de la peau d\u00e9velopp\u00e9e en \u00e9quipe de quatre, avec diagnostic IA et boutique React Native. J\u2019ai construit les modules m\u00e9tier backend, la vitrine web/back-office et le tunnel de commande.',
        highlight: 'Les commandes sont tarif\u00e9es c\u00f4t\u00e9 serveur, prot\u00e9g\u00e9es par une machine \u00e0 \u00e9tats et l\u2019idempotence : un client ne peut pas modifier un montant et une commande ne peut pas \u00eatre cr\u00e9\u00e9e deux fois. Les types frontend sont g\u00e9n\u00e9r\u00e9s depuis l\u2019OpenAPI, et la CI \u00e9choue en cas de d\u00e9rive.',
        result: 'Les migrations Flyway se rejouent depuis une base vide, avec un test de version dupliqu\u00e9e. Les notifications admin restent synchronis\u00e9es entre les onglets.',
        role: 'Backend et web. J\u2019ai construit les modules m\u00e9tier et le tunnel de commande, ainsi que la vitrine web/back-office. Le diagnostic IA et l\u2019application React Native sont le travail de mes co\u00e9quipiers.',
        architecture: 'Monolithe modulaire Spring Boot, web Next.js/React, PostgreSQL/Redis, types frontend g\u00e9n\u00e9r\u00e9s depuis OpenAPI, Flyway, Google Cloud Run.',
        quality: 'Tarification serveur, machine \u00e0 \u00e9tats et idempotence des commandes ; CI en \u00e9chec sur d\u00e9rive OpenAPI ; migrations Flyway rejouables avec protection anti-version dupliqu\u00e9e.' },
      { title: 'ProcureFlow: approvisionnement B2B', year: '2026', kind: 'Full-stack \u00b7 Spring Boot & Angular', heading: 'ProcureFlow', lead: 'F',
        cardRole: 'Demandes \u00b7 approbations \u00b7 budgets \u00b7 copilote IA',
        description: 'Plateforme d\u2019achats B2B multitenant : demandes, approbations, fournisseurs, commandes, factures et budgets. Les demandes suivent un circuit d\u2019approbation \u00e0 paliers avec d\u00e9l\u00e9gation born\u00e9e, et le budget est r\u00e9serv\u00e9 atomiquement \u00e0 l\u2019approbation.',
        highlight: 'Isolement multi-tenant : les acc\u00e8s inter-tenant r\u00e9pondent 404, jamais 403. Les montants sont recalcul\u00e9s c\u00f4t\u00e9 serveur avec des cl\u00e9s d\u2019idempotence, et les types du frontend sont g\u00e9n\u00e9r\u00e9s depuis le contrat d\u2019API.',
        result: 'Rotation des jetons JWT, interface bilingue FR/EN et copilote IA qui cite les donn\u00e9es de l\u2019espace de travail et r\u00e9dige des brouillons de demandes depuis une description en langage naturel.',
        role: 'Full-stack. Workflows d\u2019approvisionnement multi-tenant, approbations, budgets, isolation des donn\u00e9es et copilote IA.',
        architecture: 'Monolithe modulaire Spring Boot, SPA Angular, PostgreSQL/MongoDB, Flyway, JWT courts avec rotation, Docker.',
        quality: 'Isolation multi-tenant, r\u00e9servation budg\u00e9taire atomique \u00e0 l\u2019approbation, fronti\u00e8res de modules v\u00e9rifi\u00e9es automatiquement et couverture Playwright.',
        linkLabel: 'Voir le d\u00e9p\u00f4t', linkHref: 'https://github.com/AhmedOL0/ProcureFlow' },
      { title: 'MediCare : plateforme de gestion de cabinet', year: '2025', kind: 'Stage \u00b7 Full-stack', heading: 'MediCare', lead: 'Care',
        cardRole: 'R\u00e9servation \u00b7 plannings \u00b7 dossiers patients',
        description: 'Plateforme de gestion de cabinet m\u00e9dical avec recherche par sp\u00e9cialit\u00e9, r\u00e9servation en ligne, plannings et dossiers patients. Trois espaces : patient, m\u00e9decin et administrateur.',
        highlight: 'Espaces s\u00e9par\u00e9s pour patients, m\u00e9decins et administrateurs, avec contr\u00f4le des cr\u00e9neaux qui emp\u00eache les doubles r\u00e9servations \u00e0 l\u2019\u00e9criture.',
        result: 'Recherche par sp\u00e9cialit\u00e9, r\u00e9servation en ligne et dossiers patients dans un seul parcours.'},
      { title: 'FitTrack: suivi sportif', year: '2025', kind: '\u00c9quipe de 2 \u00b7 Full-stack', heading: 'FitTrack', lead: 'i',
        cardRole: 'Programmes \u00b7 profil sant\u00e9 \u00b7 admin',
        description: 'Application web de fitness personnel pour les programmes, s\u00e9ances et performances, avec profil sant\u00e9 (IMC, d\u00e9pense \u00e9nerg\u00e9tique), biblioth\u00e8que d\u2019exercices et espace admin.',
        highlight: 'Parcours programmes/s\u00e9ances, indicateurs sant\u00e9 et espace admin pour la biblioth\u00e8que d\u2019exercices.',
        result: 'Espace admin et profil sant\u00e9 avec IMC et d\u00e9pense \u00e9nerg\u00e9tique.',
        role: 'Full-stack. Programmes, s\u00e9ances, performances, profil sant\u00e9, biblioth\u00e8que d\u2019exercices et espace admin.',
        architecture: 'Spring Boot, Next.js/React, MySQL, Docker.'},
      { title: 'Smart Campus Companion', year: '2026', kind: '\u00c9quipe de 4 \u00b7 Flutter', heading: 'Campus', lead: 'a',
        cardRole: 'Salles QR \u00b7 vue RA \u00b7 r\u00e9servations',
        description: 'Application Flutter de campus : scan des QR codes sur les portes pour ouvrir une fiche salle (capacit\u00e9, \u00e9quipements) avec vue RA. Emploi du temps, r\u00e9servations, annonces mod\u00e9r\u00e9es et signalements sur trois r\u00f4les.',
        highlight: 'Fiche salle par QR code avec vue RA ; emploi du temps, r\u00e9servations, annonces mod\u00e9r\u00e9es et signalements sur trois r\u00f4les.',
        result: 'Trois espaces ; fiches salle par QR code et vue RA.',
        role: 'Mobile. Fiches salle par QR code, vue RA, emploi du temps, r\u00e9servations, annonces mod\u00e9r\u00e9es et signalements sur trois r\u00f4les.',
        architecture: 'Flutter, Firebase/Firestore, Riverpod, ARCore/ARKit.'},
      { title: 'SmartSummarizer', year: '2025', kind: '\u00c9quipe de 4 \u00b7 NLP', heading: 'R\u00e9sumeur', lead: 'u',
        cardRole: 'R\u00e9sum\u00e9s \u00b7 quiz \u00b7 cartes mentales',
        description: 'Projet d\u2019\u00e9quipe qui transforme les PDF de cours en outils d\u2019\u00e9tude : r\u00e9sum\u00e9s, audio, quiz et cartes mentales avec CamemBERT et Groq.',
        highlight: 'Les PDF deviennent des r\u00e9sum\u00e9s et des quiz via l\u2019extraction CamemBERT et la g\u00e9n\u00e9ration Groq.',
        result: 'Outil d\u2019\u00e9tude NLP construit en \u00e9quipe, avec r\u00e9sum\u00e9s, quiz et cartes mentales.'},
      { title: 'Syst\u00e8me de comptage de cannes', year: '2024 \u00b7 PFE DUT', kind: 'Embarqu\u00e9 \u00b7 Projet de fin d\u2019\u00e9tudes', heading: 'IoT', lead: 'T',
        cardRole: 'Capteur laser \u00b7 firmware \u00b7 dashboard',
        description: 'Syst\u00e8me de comptage bas\u00e9 sur ESP8266 utilisant un capteur laser pour compter les cannes sur une ligne de production, avec affichage OLED et tableau de bord Wi-Fi.',
        highlight: 'D\u00e9tection laser embarqu\u00e9e avec comptage local et tableau de bord Wi-Fi.',
        result: 'Prototype de ligne de production avec affichage OLED et tableau de bord PHP/MySQL.'},
    ],
  },
  exp: {
    kicker: 'Parcours', title: 'Les postes que j\u2019ai occup\u00e9s.', latest: 'Poste le plus r\u00e9cent',
    jobs: [
      { when: 'JUIN 2026 \u2013 SEPT. 2026 \u00b7 AGADIR, SUR SITE', title: 'Stage de fin d\u2019ann\u00e9e (PFA): D\u00e9veloppeur Full-Stack', org: 'Zorium, Technoparc Agadir', where: 'Plateforme OdemLab \u00b7 \u00e9quipe de quatre',
        tags: ['Java 21', 'Spring Boot', 'PostgreSQL', 'Redis', 'Next.js', 'React', 'TypeScript', 'Docker', 'Google Cloud Run', 'GitHub Actions'],
        points: ['Modules m\u00e9tier backend, en particulier les commandes : tarification serveur, machine \u00e0 \u00e9tats et idempotence.', 'Vitrine et back-office : catalogue, fiche produit et \u00e9crans admin ; types frontend g\u00e9n\u00e9r\u00e9s depuis l\u2019OpenAPI, avec \u00e9chec CI en cas de d\u00e9rive.', 'Notifications group\u00e9es avec \u00e9tat de lecture par destinataire ; migrations Flyway rejouables depuis une base vide avec protection contre les versions dupliqu\u00e9es.'] },
      { when: 'JUIL. 2025 \u2013 SEPT. 2025 \u00b7 DISTANCIEL', title: 'Stagiaire D\u00e9veloppeur Full-Stack', org: 'MOUSSA SOFT \u00b7 Agadir',
        tags: ['PHP', 'Laravel', 'MySQL', 'JavaScript', 'Bootstrap'],
        points: ['MediCare : recherche par sp\u00e9cialit\u00e9, r\u00e9servation en ligne, plannings et dossiers patients ; trois r\u00f4les avec contr\u00f4le des cr\u00e9neaux.'] },
      { when: 'MARS 2024 \u2013 JUIN 2024 \u00b7 AGADIR, SUR SITE', title: 'Stage de fin d\u2019\u00e9tudes (DUT): D\u00e9veloppeur Embarqu\u00e9', org: 'MOUSSA SOFT \u00b7 Agadir',
        tags: ['ESP8266', 'VL53L0X', 'PHP', 'MySQL'],
        points: ['Syst\u00e8me de comptage de cannes avec ESP8266 + capteur laser, \u00e9cran OLED et tableau de bord PHP/MySQL en Wi-Fi.'] },
      { when: 'JUIN 2023 \u2013 AO\u00fbT 2023', title: 'Stagiaire QA Automatisation', org: 'Univers Architecture Maroc',
        tags: ['Python', 'Selenium', 'ChromeDriver', 'Page Objects'],
        points: ['Tests manuels remplac\u00e9s par des suites Selenium rejou\u00e9es \u00e0 chaque livraison, un point de changement par \u00e9cran.'] },
    ],
  },
  edu: {
    kicker: 'Formation', title: 'Des \u00e9coles, pas des postes.', sub: 'Les deux formations derri\u00e8re ce travail.',
    entries: [
      { years: '2024 \u2013 Pr\u00e9sent', title: 'Cycle ing\u00e9nieur, G\u00e9nie logiciel', school: 'ENSIASD \u00b7 Universit\u00e9 Ibn Zohr, Taroudant', desc: 'Intelligence artificielle, science des donn\u00e9es, architecture logicielle.' },
      { years: '2022 \u2013 2024 \u00b7 Mention bien', title: 'DUT, G\u00e9nie informatique embarqu\u00e9', school: 'EST Oujda, \u00c9cole Sup\u00e9rieure de Technologie', desc: 'Syst\u00e8mes embarqu\u00e9s, IoT, firmware: ESP32/ESP8266, Arduino, Raspberry Pi. Projet de fin d\u2019\u00e9tudes : syst\u00e8me de comptage de cannes par laser.' },
    ],
  },
  behind: {
    kicker: 'Technologies', title: 'Derri\u00e8re les projets.',
    sub: 'Les technologies que j\u2019utilise, organis\u00e9es par fonction.',
    dailyLabel: 'Usage intensif', daily: 'Java 21 \u00b7 Spring Boot \u00b7 Angular \u00b7 React \u00b7 Next.js \u00b7 TypeScript \u00b7 PostgreSQL \u00b7 Docker \u00b7 Playwright',
    exploredLabel: 'Aussi explor\u00e9', explored: 'Flutter \u00b7 Laravel \u00b7 Firebase \u00b7 CamemBERT \u00b7 Vitest \u00b7 PyTorch',
    layerLabel: 'Couche', stackLabel: 'Stack', usedInLabel: 'Utilis\u00e9 dans',
    categories: [
      { name: 'Frontend', items: ['React', 'Next.js', 'Angular', 'TypeScript', 'Tailwind CSS', 'Flutter'], usedIn: [
        { label: 'OdemLab', href: '#work-odemlab' }, { label: 'ProcureFlow', href: '#work-procure' }, { label: 'FitTrack', href: '#work-fittrack' }, { label: 'Smart Campus', href: '#work-campus' },
      ] },
      { name: 'Backend', items: ['Java', 'Spring Boot', 'Spring Security', 'JPA/Hibernate', 'API REST', 'OpenAPI', 'Laravel', 'Flask', 'Python'], usedIn: [
        { label: 'OdemLab', href: '#work-odemlab' }, { label: 'ProcureFlow', href: '#work-procure' }, { label: 'MediCare', href: '#work-medical' }, { label: 'FitTrack', href: '#work-fittrack' },
      ] },
      { name: 'Donn\u00e9es', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Flyway', 'Firebase Firestore'], usedIn: [
        { label: 'OdemLab', href: '#work-odemlab' }, { label: 'ProcureFlow', href: '#work-procure' }, { label: 'MediCare', href: '#work-medical' }, { label: 'FitTrack', href: '#work-fittrack' }, { label: 'Smart Campus', href: '#work-campus' },
      ] },
      { name: 'Cloud & DevOps', items: ['Docker', 'Git', 'GitHub Actions', 'Google Cloud Run'], usedIn: [
        { label: 'OdemLab', href: '#work-odemlab' }, { label: 'ProcureFlow', href: '#work-procure' }, { label: 'Portfolio', href: '#top' },
      ] },
      { name: 'Testing', items: ['Playwright', 'JUnit 5', 'Mockito', 'Testcontainers', 'Vitest', 'ArchUnit', 'axe-core', 'Selenium'], usedIn: [
        { label: 'OdemLab', href: '#work-odemlab' }, { label: 'ProcureFlow', href: '#work-procure' }, { label: 'Portfolio', href: '#top' },
      ] },
      { name: 'IA/ML', items: ['CamemBERT', 'spaCy', 'Groq', 'PyTorch'], usedIn: [
        { label: 'ProcureFlow', href: '#work-procure' }, { label: 'SmartSummarizer', href: '#work-summarizer' },
      ] },
    ],
  },
  aboutMe: {
    kicker: 'Profil', title: 'La personne derri\u00e8re le code.',
    sub: 'Un peu sur ma fa\u00e7on de penser et ce qui me motive.',
    role: '\u00c9l\u00e8ve-ing\u00e9nieur \u00b7 D\u00e9veloppeur full-stack',
    body: 'J\u2019aime construire des choses qui marchent de bout en bout. Pas seulement les \u00e9l\u00e9ments visibles \u00e0 l\u2019\u00e9cran, mais aussi les syst\u00e8mes derri\u00e8re. Je suis motiv\u00e9 par l\u2019\u00e9cart entre une bonne id\u00e9e et un produit fonctionnel, et j\u2019aime \u00eatre la personne qui le comble. Actuellement concentr\u00e9 sur le d\u00e9veloppement full-stack et \u00e0 la recherche d\u2019un stage PFE o\u00f9 je peux livrer du code en production.',
    currentlyLabel: 'En ce moment', currentlyBuilding: 'Je construis', currentlyOpen: 'Ouvert \u00e0 un stage PFE \u00b7 f\u00e9vrier-juin 2027.',
    interests: ['Open source', 'Conception de syst\u00e8mes', '\u00c9checs', 'Arts martiaux'],
    langsTitle: 'Langues',
    langs: [{ l: 'Arabe', lvl: 'maternelle' }, { l: 'Fran\u00e7ais', lvl: 'professionnel' }, { l: 'Anglais', lvl: 'professionnel' }],
    principlesTitle: 'Ma fa\u00e7on de penser',
    principles: [
      'Dire ce qui a \u00e9t\u00e9 construit et pourquoi, jamais combien.',
      'Une fonctionnalit\u00e9 n\u2019est termin\u00e9e que lorsqu\u2019elle est v\u00e9rifi\u00e9e automatiquement.',
      'Parano\u00efa sur les chemins d\u2019argent et de donn\u00e9es ; simplicit\u00e9 partout ailleurs.',
    ],
  },
  contact: {
    kicker: 'Contact', title: 'Construisons quelque chose de solide.',
    sub: 'Je cherche un ', subEm: 'stage PFE', subEnd: ', backend ou full-stack, Maroc ou distanciel. Je r\u00e9ponds vite.',
    name: 'Votre nom', namePh: 'Votre nom complet', email: 'Adresse e-mail', emailPh: 'vous@entreprise.com',
    msg: 'D\u00e9tails du projet', msgPh: 'Que construisez-vous, et pour quand ?', send: 'Envoyer', sending: 'Envoi…',
    success: '\u2713 Message envoy\u00e9. Je vous r\u00e9ponds vite.', error: '\u2717 Une erreur s\u2019est produite. \u00c9crivez-moi directement.',
    mailto: '\u2713 Votre application e-mail s\u2019ouvre avec le message pr\u00eat \u00e0 envoyer.',
    respondTime: 'Je r\u00e9ponds g\u00e9n\u00e9ralement sous 24 heures',
    retry: 'R\u00e9essayer',
    direct: 'E-mail direct', loc: 'Maroc', phone: 'T\u00e9l\u00e9phone', linkedin: 'LinkedIn', github: 'GitHub',
    briefRolesLabel: 'R\u00f4les', briefRoles: 'Backend \u00b7 Full-stack \u00b7 QA automatisation', briefLocationLabel: 'Localisation', briefLocation: 'Maroc \u00b7 UTC+1 \u00b7 distantiel', briefReplyLabel: 'R\u00e9ponse',
    copy: 'Copier', copied: 'Copi\u00e9', copyEmail: 'Copier l\u2019adresse e-mail', copyPhone: 'Copier le num\u00e9ro de t\u00e9l\u00e9phone',
  },
  footer: { top: 'Haut', elsewhere: 'Ailleurs', explore: 'Explorer', built: `\u00a9 ${new Date().getFullYear()} Ahmed Ouarrali \u00b7 React 19 \u00b7 Vite \u00b7 Tailwind CSS \u00b7 596 checks Playwright \u00b7 0 cookies \u00b7 GitHub Pages`, pageTitle: 'Ahmed Ouarrali, Ing\u00e9nieur Full-Stack Java / Spring Boot | Stage PFE' },
  dock: { home: 'Accueil', whatIDo: 'Ce que je fais', work: 'Projets', contact: 'Contact', lang: 'Langue', nav: 'Navigation rapide', footerNav: 'Navigation du pied de page', toggle: 'Basculer mode clair / sombre', toggleLight: 'Passer en mode clair', toggleDark: 'Passer en mode sombre', resume: 'CV', cvFullStack: 'CV Full-Stack', cvQA: 'CV QA Automatisation', linkedin: 'LinkedIn', github: 'GitHub', email: 'E-mail', backToTop: 'Retour en haut' },
  error: {
    label: 'Erreur', title: 'Un probl\u00e8me est survenu.',
    sub: 'La page a rencontr\u00e9 une erreur inattendue. L\u2019actualiser suffit g\u00e9n\u00e9ralement.',
    refresh: 'Actualiser la page', home: 'Retour \u00e0 l\u2019accueil',
    still: 'Toujours bloqu\u00e9 ? \u00c9crivez-moi :',
  },
};

export const DICTS: Record<Lang, Dict> = { en, fr };

export const PROJECT_TAGS: string[][] = [
  tags.odemlab, tags.procure, tags.med, tags.fit, tags.campus, tags.sum, tags.iot,
];
export const PROJECT_CATS: string[][] = [
  ['web', 'backend'], ['web', 'backend'], ['web', 'backend'], ['web', 'backend'], ['mobile'], ['ai'], ['iot'],
];
export const PROJECT_THUMBS = ['thumb-odem', 'thumb-procure', 'thumb-med', 'thumb-fit', 'thumb-campus', 'thumb-sum', 'thumb-iot'];

export const PROJECT_GALLERIES: ProjectGalleryImageT[][] = [
  [
    {
      src: '/assets/work/gallery/odemlab-site.webp', width: 800, height: 397,
      alt: { en: 'OdemLab website storefront', fr: 'Vitrine web OdemLab' },
      label: { en: 'Website', fr: 'Site web' },
    },
    {
      src: '/assets/work/gallery/odemlab-shop.webp', width: 465, height: 990,
      alt: { en: 'OdemLab mobile shop with product recommendations', fr: 'Boutique mobile OdemLab avec recommandations produits' },
      label: { en: 'Shop', fr: 'Boutique' },
    },
    {
      src: '/assets/work/gallery/odemlab-scan.webp', width: 465, height: 990,
      alt: { en: 'OdemLab AI skin scan screen', fr: '\u00c9cran de scan de peau IA OdemLab' },
      label: { en: 'Skin scan', fr: 'Scan de peau' },
    },
    {
      src: '/assets/work/gallery/odemlab-routine.webp', width: 465, height: 1003,
      alt: { en: 'OdemLab routine tracking screen', fr: '\u00c9cran de suivi de routine OdemLab' },
      label: { en: 'Routine', fr: 'Routine' },
    },
    {
      src: '/assets/work/gallery/odemlab-loyalty.webp', width: 465, height: 990,
      alt: { en: 'OdemLab loyalty points screen', fr: '\u00c9cran de fid\u00e9lit\u00e9 OdemLab' },
      label: { en: 'Loyalty', fr: 'Fid\u00e9lit\u00e9' },
    },
    {
      src: '/assets/work/gallery/odemlab-catalogue.webp', width: 800, height: 394,
      alt: { en: 'OdemLab product catalogue', fr: 'Catalogue produits OdemLab' },
      label: { en: 'Catalogue', fr: 'Catalogue' },
    },
  ],
  [
    {
      src: '/assets/work/gallery/procureflow-dashboard.webp', width: 800, height: 450,
      alt: { en: 'ProcureFlow procurement dashboard', fr: 'Tableau de bord ProcureFlow' },
      label: { en: 'Dashboard', fr: 'Tableau de bord' },
    },
    {
      src: '/assets/work/gallery/procureflow-approvals.webp', width: 800, height: 450,
      alt: { en: 'ProcureFlow approval inbox', fr: 'Bo\u00eete d\u2019approbation ProcureFlow' },
      label: { en: 'Approvals', fr: 'Approbations' },
    },
    {
      src: '/assets/work/gallery/procureflow-suppliers.webp', width: 800, height: 450,
      alt: { en: 'ProcureFlow supplier directory', fr: 'R\u00e9pertoire fournisseurs ProcureFlow' },
      label: { en: 'Suppliers', fr: 'Fournisseurs' },
    },
    {
      src: '/assets/work/gallery/procureflow-budgets.webp', width: 800, height: 450,
      alt: { en: 'ProcureFlow budget tracking', fr: 'Suivi budg\u00e9taire ProcureFlow' },
      label: { en: 'Budgets', fr: 'Budgets' },
    },
    {
      src: '/assets/work/gallery/procureflow-analytics.webp', width: 800, height: 450,
      alt: { en: 'ProcureFlow spend analytics', fr: 'Analytique des d\u00e9penses ProcureFlow' },
      label: { en: 'Analytics', fr: 'Analytique' },
    },
    {
      src: '/assets/work/gallery/procureflow-copilot.webp', width: 800, height: 450,
      alt: { en: 'ProcureFlow AI copilot', fr: 'Copilote IA ProcureFlow' },
      label: { en: 'Copilot', fr: 'Copilote' },
    },
  ],
  [],
  [
    {
      src: '/assets/work/gallery/fittrack-landing.webp', width: 800, height: 580,
      alt: { en: 'FitTrack landing page', fr: 'Page d\u2019accueil FitTrack' },
      label: { en: 'Landing page', fr: 'Page d\u2019accueil' },
    },
    {
      src: '/assets/work/gallery/fittrack-programs.webp', width: 800, height: 604,
      alt: { en: 'FitTrack program catalogue', fr: 'Catalogue de programmes FitTrack' },
      label: { en: 'Programs', fr: 'Programmes' },
    },
    {
      src: '/assets/work/gallery/fittrack-exercises.webp', width: 800, height: 529,
      alt: { en: 'FitTrack exercise picker', fr: 'S\u00e9lection d\u2019exercices FitTrack' },
      label: { en: 'Exercise picker', fr: 'S\u00e9lection d\u2019exercices' },
    },
    {
      src: '/assets/work/gallery/fittrack-sessions.webp', width: 800, height: 757,
      alt: { en: 'FitTrack training sessions dashboard', fr: 'Tableau de bord des s\u00e9ances FitTrack' },
      label: { en: 'Sessions', fr: 'S\u00e9ances' },
    },
    {
      src: '/assets/work/gallery/fittrack-library.webp', width: 800, height: 575,
      alt: { en: 'FitTrack exercise library', fr: 'Biblioth\u00e8que d\u2019exercices FitTrack' },
      label: { en: 'Exercise library', fr: 'Biblioth\u00e8que d\u2019exercices' },
    },
    {
      src: '/assets/work/gallery/fittrack-mobile.webp', width: 500, height: 545,
      alt: { en: 'FitTrack mobile sessions screen', fr: '\u00c9cran mobile des s\u00e9ances FitTrack' },
      label: { en: 'Mobile sessions', fr: 'S\u00e9ances mobile' },
    },
  ],
  [
    {
      src: '/assets/work/gallery/campus-home.webp', width: 500, height: 1073,
      alt: { en: 'Smart Campus home screen', fr: '\u00c9cran d\u2019accueil Smart Campus' },
      label: { en: 'Home', fr: 'Accueil' },
    },
    {
      src: '/assets/work/gallery/campus-schedule.webp', width: 500, height: 1073,
      alt: { en: 'Smart Campus schedule screen', fr: '\u00c9cran d\u2019emploi du temps Smart Campus' },
      label: { en: 'Schedule', fr: 'Emploi du temps' },
    },
    {
      src: '/assets/work/gallery/campus-announcements.webp', width: 500, height: 1073,
      alt: { en: 'Smart Campus announcements screen', fr: '\u00c9cran d\u2019annonces Smart Campus' },
      label: { en: 'Announcements', fr: 'Annonces' },
    },
    {
      src: '/assets/work/gallery/campus-reservations.webp', width: 500, height: 1073,
      alt: { en: 'Smart Campus room reservations screen', fr: '\u00c9cran de r\u00e9servations de salles Smart Campus' },
      label: { en: 'Reservations', fr: 'R\u00e9servations' },
    },
  ],
  [],
  [],
];

type LangCtx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };

export const LangCtxObject = createContext<LangCtx>({ lang: 'en', setLang: () => {}, t: en });

export function useLang() {
  return useContext(LangCtxObject);
}
