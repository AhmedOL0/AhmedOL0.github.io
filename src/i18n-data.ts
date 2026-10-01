import { createContext, useContext } from 'react';

export type Lang = 'en' | 'fr';
export const LANGS: { code: Lang; label: string; aria: string }[] = [
  { code: 'en', label: 'EN', aria: 'English' },
  { code: 'fr', label: 'FR', aria: 'Français' },
];

export type ProjectT = {
  title: string; year: string; kind: string; heading: string; lead: string;
  description: string; decision?: string; result?: string; note?: string; linkLabel?: string; linkHref?: string;
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
  nav: { home: string; whatIDo: string; work: string; experience: string; behind: string; contact: string; resume: string; skipToContent: string; langChanged: string };
  hero: { badge: string; titleA: string; titleEm: string; titleB: string; lede: string; ctaWork: string; ctaContact: string; avail: string };
  whatIDo: { kicker: string; title: string; sub: string; showDetails: string; showLess: string; capabilities: Capability[] };
  howIWork: { kicker: string; title: string; sub: string; steps: ProcessStep[] };
  filters: { all: string; web: string; mobile: string; backend: string; ai: string; iot: string };
  work: { kicker: string; title: string; sub: string; showLess: string; showFewer: string; filterCount: string; projects: ProjectT[] };
  exp: { kicker: string; title: string; jobs: JobT[] };
  edu: { kicker: string; title: string; sub: string; entries: EduT[] };
  behind: { kicker: string; title: string; sub: string; categories: TechCategory[] };
  aboutMe: { kicker: string; title: string; sub: string; role: string; body: string; interests: string[]; langsTitle: string; langs: { l: string; lvl: string }[] };
  contact: {
    kicker: string; title: string; sub: string; subEm: string; subEnd: string;
    name: string; namePh: string; email: string; emailPh: string; msg: string; msgPh: string;
    send: string; sending: string; success: string; error: string;
    mailto: string;
    respondTime: string; retry: string;
    direct: string; phone: string; linkedin: string; github: string;
  };
  footer: { top: string; elsewhere: string; explore: string; built: string; pageTitle: string };
  dock: { home: string; whatIDo: string; work: string; contact: string; lang: string; nav: string; footerNav: string; toggle: string; resume: string; linkedin: string; github: string; email: string; backToTop: string };
};

const tags = {
  odemlab: ['Spring Boot', 'Next.js', 'React Native', 'PostgreSQL', 'Redis', 'Docker', 'Cloud Run', 'Stripe'],
  med: ['PHP', 'Laravel', 'MySQL', 'Bootstrap', 'Chart.js'],
  fit: ['Spring Boot', 'Next.js', 'TypeScript', 'Tailwind CSS', 'MySQL', 'Docker'],
  campus: ['Flutter', 'Dart', 'Firebase', 'ARCore', 'ARKit', 'QR Scanner'],
  sum: ['Python', 'Flask', 'PyTorch', 'CamemBERT', 'spaCy', 'Groq'],
  iot: ['ESP8266', 'VL53L0X', 'Arduino', 'PHP', 'MySQL', 'SolidWorks'],
};

const en: Dict = {
  dir: 'ltr',
  nav: { home: 'Home', whatIDo: 'What I Do', work: 'Work', experience: 'Experience', behind: 'Tech Stack', contact: 'Contact', resume: 'Résumé', skipToContent: 'Skip to content', langChanged: 'Language changed to English' },
  hero: {
    badge: 'Open to PFE internship', titleA: 'I build ', titleEm: 'working software', titleB: ', end to end.',
    lede: 'I\'m Ahmed Ouarrali, a software engineering student. I take products from a rough idea to something people can actually use — the interface, the backend behind it, and the deployment that keeps it running.',
    ctaWork: 'See my work', ctaContact: 'Get in touch',
    avail: 'Available for PFE \u00b7 Morocco or remote',
  },
  whatIDo: {
    kicker: 'What I do', title: 'I take an idea to a running product.',
    sub: 'Not just the visible part. The whole thing, and the work to keep it working.',
    showDetails: 'Details', showLess: 'Less',
    capabilities: [
      { title: 'Full-stack builds', desc: 'I build the interface people click and the backend behind it: APIs, databases, authentication, payments. One person who can connect all the pieces.', details: 'My main stack is Spring Boot on the backend and Next.js or React Native on the frontend. On OdemLab I owned the backend business modules — orders, products, payments, auth — on one API serving web and mobile.' },
      { title: 'Systems that hold up', desc: 'I care about what happens when real users show up: prices computed on the server, checkouts that can safely retry, data that stays consistent.', details: 'On OdemLab that meant server-side pricing, idempotent checkout, and audited order states. I also set up health checks and zero-downtime deploys so releases don\'t break the shop.' },
      { title: 'Interfaces people understand', desc: 'I build web and mobile screens in French, English, and Arabic — including proper right-to-left layouts, not mirrored CSS hacks.', details: 'OdemLab ships in three languages with real RTL support. I also keep accessibility basics in place: keyboard navigation, focus states, readable contrast.' },
    ],
  },
  howIWork: {
    kicker: 'How I work', title: 'How I actually build things.',
    sub: 'Less a methodology, more the habits I picked up shipping real projects.',
    steps: [
      { label: 'Understand', desc: 'I start with the problem and the people: who uses this, what does success look like, what can wait until later.' },
      { label: 'Design', desc: 'I sketch the data flow and the trade-offs before coding — what lives on the server, what the client is allowed to decide.' },
      { label: 'Build and test', desc: 'I build in small iterations and verify as I go, from unit tests up to full browser flows.' },
      { label: 'Ship and improve', desc: 'I deploy with health checks and a way back, then fix what real usage reveals.' },
    ],
  },
  filters: { all: 'All', web: 'Web', mobile: 'Mobile', backend: 'Backend', ai: 'AI', iot: 'IoT' },
  work: {
    kicker: 'Selected work', title: 'Things I built, and what each one taught me.',
    sub: 'Six projects across web, mobile, backend, AI and IoT. The first is live — the rest live on my machine, and I can walk you through any of them.',
    showLess: 'show less', showFewer: 'Show fewer tags', filterCount: 'Showing {count} of {total} projects',
    projects: [
      { title: 'OdemLab: skincare store with AI skin analysis', year: '2026', kind: 'PFA · Team of 4 · Backend + mobile', heading: 'OdemLab', lead: 'd',
        description: 'An online skincare store: customers browse products, scan their skin for a routine, and pay by card, CMI, or cash on delivery — in French, English, or Arabic.',
        decision: 'I kept one Spring Boot API serving both the Next.js storefront and the React Native app, so pricing and payment logic exist in exactly one place. Prices are computed on the server; the client never sends them.',
        result: '1100+ backend tests, 120+ versioned database migrations, live on Cloud Run with zero-downtime deploys.',
        linkLabel: 'Open the live store', linkHref: 'https://odemlab-frontend-fne55ek37q-no.a.run.app/fr' },
      { title: 'Medical appointment platform', year: '2025', kind: 'Internship · Full-stack', heading: 'Medical', lead: 'e',
        description: 'A small clinic platform: patients book appointments online instead of calling, doctors manage their schedules and generate PDF reports.',
        decision: 'I built it as a classic server-rendered app with Laravel rather than a separate frontend and API — for a two-person clinic, one deployable was the right size.',
        result: 'Booking went from a phone call to a two-minute online form, with Chart.js dashboards for the practice.',
        note: 'Internship project — code walkthrough on request.' },
      { title: 'FitTrack: training platform', year: '2025', kind: 'Team of 2 · Full-stack', heading: 'FitTrack', lead: 'i',
        description: 'A fitness web app where users build training programs, log sessions, and follow BMI and calorie stats. Includes an admin panel to moderate the exercise library.',
        decision: 'I separated the user-facing app from the admin moderation flow early, so reviewing exercises with video demos never risked breaking the member experience.',
        result: 'Full moderation pipeline across a 38-exercise library with video demos.',
        note: 'Academic project — runs locally, walkthrough on request.' },
      { title: 'Smart Campus Companion', year: '2026', kind: 'Team of 4 · Flutter', heading: 'Campus', lead: 'a',
        description: 'A campus app: students scan QR codes on classroom doors to see room info instantly; professors reserve rooms and post announcements. AR room previews were explored but cut from the first version.',
        decision: 'We built the QR-to-room flow first and treated AR as a stretch goal — getting the core campus experience reliable mattered more than a demo feature.',
        result: 'Room info in one scan, with real-time sync for students and professors.',
        note: 'Academic project — runs locally, walkthrough on request.' },
      { title: 'SmartSummarizer', year: '2025', kind: 'Team of 4 · NLP', heading: 'Summarizer', lead: 'u',
        description: 'A study tool that turns lecture PDFs into summaries, audio versions, quizzes, and mind maps, using CamemBERT and Groq.',
        decision: 'I split the pipeline into small stages — extract, summarize, quiz — so a failure in one stage didn\'t lose the whole document, and each stage could be evaluated on its own.',
        result: 'Around 10 seconds per document on our test set, rated 8.4/10 by the 30 students who tried it.',
        note: 'Academic project — runs locally, walkthrough on request.' },
      { title: 'Cane counting system', year: '2024 · DUT thesis', kind: 'Embedded · Final-year project', heading: 'IoT', lead: 'T',
        description: 'A laser-sensor counter for canes on a production line, with a live OLED display and a Wi-Fi dashboard — plus a 3D-printed enclosure I designed myself.',
        decision: 'I did the counting on the ESP8266 itself and used Wi-Fi only for reporting, so a network drop never loses a count.',
        result: 'About 98% accuracy on our bench tests, in a production-ready printed enclosure.',
        note: 'Thesis project — hardware photos and walkthrough on request.' },
    ],
  },
  exp: {
    kicker: 'Track record', title: 'Where I\'ve worked.',
    jobs: [
      { when: 'JUN 2026 – SEP 2026 · AGADIR, ON-SITE', title: 'End-of-year project (PFA): Full-Stack Developer', org: 'Zorium, Technoparc Agadir', where: 'OdemLab platform · team of four',
        points: ['Owned backend business modules: orders, products, payments, auth, GDPR', 'Hardened the money paths: server-side pricing, idempotent checkout, audited order lifecycle', 'Shipped to Cloud Run: zero-downtime deploys, health checks, automatic rollback on failure'] },
      { when: 'JUL 2025 – SEP 2025 · REMOTE', title: 'Full-Stack Developer Intern', org: 'MOUSSA SOFT · Agadir', where: 'Laravel · MySQL · Bootstrap',
        points: ['Built a clinic booking platform: patient-doctor appointments, scheduling, PDF reports, Chart.js dashboards'] },
      { when: 'JUN 2024 – JUN 2024 · AGADIR, ON-SITE', title: 'End-of-study internship (DUT): Embedded Developer', org: 'MOUSSA SOFT · Agadir', where: 'ESP8266 · VL53L0X · PHP · MySQL',
        points: ['Built a cane counting system with ESP8266 + laser sensor, OLED display, Wi-Fi to PHP/MySQL dashboard', 'Designed 3D-printed enclosures in SolidWorks, fabricated with Creality CR-10 Max'] },
      { when: 'JUN 2023 – AUG 2023', title: 'QA Automation Intern', org: 'Web regression suites', where: 'Python · Selenium WebDriver · Page Objects',
        points: ['Replaced a manual test campaign with automated non-regression suites, one change point per UI change'] },
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
    kicker: 'Tech stack', title: 'What I reach for.',
    sub: 'Grouped by what I actually used in production — and what I\'ve only touched along the way.',
    categories: [
      { name: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Flutter', 'React Native'] },
      { name: 'Backend', items: ['Java', 'Spring Boot', 'Python', 'Flask', 'Laravel', 'PHP'] },
      { name: 'Data', items: ['PostgreSQL', 'Redis', 'MySQL', 'Firebase Firestore'] },
      { name: 'Cloud & DevOps', items: ['Docker', 'GitHub Actions', 'Google Cloud Run', 'Flyway'] },
      { name: 'Testing', items: ['Playwright', 'JUnit 5', 'Selenium'] },
      { name: 'AI', items: ['Gemini', 'CamemBERT', 'Groq'] },
      { name: 'Also familiar', items: ['Node.js', 'C++', 'Qt', 'Terraform', 'Prometheus', 'Grafana', 'PyTorch', 'spaCy'] },
    ],
  },
  aboutMe: {
    kicker: 'About me', title: 'The person behind the code.',
    sub: 'A bit about how I think and what drives me.',
    role: 'Full-stack developer, backend-leaning',
    body: 'I like being the person who closes the gap between an idea and something that runs. Most of my projects started as a rough requirement — a shop that needs to take payments, a clinic that answers the phone too much, a campus nobody can navigate — and ended as software people could actually use. Right now I\'m looking for a PFE internship where I can keep doing that on a real team.',
    interests: ['Open source', 'System design', 'Chess', 'Martial arts'],
    langsTitle: 'Languages',
    langs: [{ l: 'Arabic', lvl: 'native' }, { l: 'French', lvl: 'professional' }, { l: 'English', lvl: 'professional' }],
  },
  contact: {
    kicker: 'Contact', title: 'Want to talk about an internship?',
    sub: 'I\'m looking for a ', subEm: 'PFE internship', subEnd: ' — backend or full-stack, in Morocco or remote. The fastest way to reach me is the form or email below.',
    name: 'Your name', namePh: 'Your full name', email: 'Email address', emailPh: 'you@company.com',
    msg: 'Project details', msgPh: 'What role do you have in mind, and when?', send: 'Send message', sending: '...',
    success: '\u2713 Message sent. I\'ll get back to you soon.', error: '\u2717 Something went wrong. Try emailing me directly.',
    mailto: '\u2713 Your email app is opening with the message ready to send.',
    respondTime: 'I usually reply within a day',
    retry: 'Try again',
    direct: 'Direct email', phone: 'Phone', linkedin: 'LinkedIn', github: 'GitHub',
  },
  footer: { top: 'Top', elsewhere: 'Elsewhere', explore: 'Explore', built: 'Built with React, Tailwind CSS \u00b7 Deployed on GitHub Pages', pageTitle: 'Ahmed Ouarrali, Full-Stack Software Engineer | PFE Internship' },
  dock: { home: 'Home', whatIDo: 'What I Do', work: 'Work', contact: 'Contact', lang: 'Language', nav: 'Quick navigation', footerNav: 'Footer navigation', toggle: 'Toggle light / dark mode', resume: 'Résumé', linkedin: 'LinkedIn', github: 'GitHub', email: 'Email', backToTop: 'Back to top' },
};

const fr: Dict = {
  dir: 'ltr',
  nav: { home: 'Accueil', whatIDo: 'Ce que je fais', work: 'Projets', experience: 'Parcours', behind: 'Technologies', contact: 'Contact', resume: 'CV', skipToContent: 'Aller au contenu', langChanged: 'Langue changée en français' },
  hero: {
    badge: 'Disponible pour un PFE', titleA: 'Je construis des ', titleEm: 'logiciels qui marchent', titleB: ', de bout en bout.',
    lede: 'Je suis Ahmed Ouarrali, étudiant ingénieur logiciel. Je pars d\'une idée encore floue pour arriver à quelque chose que les gens utilisent vraiment — l\'interface, le backend derrière, et le déploiement qui le fait tourner.',
    ctaWork: 'Voir mon travail', ctaContact: 'Me contacter',
    avail: 'Disponible pour PFE \u00b7 Maroc ou distanciel',
  },
  whatIDo: {
    kicker: 'Ce que je fais', title: 'D\'une idée à un produit qui tourne.',
    sub: 'Pas seulement la partie visible. Le tout, et le travail pour le garder en marche.',
    showDetails: 'D\u00e9tails', showLess: 'Moins',
    capabilities: [
      { title: 'Constructions full-stack', desc: 'Je construis l\'interface que les gens utilisent et le backend derrière : APIs, bases de données, authentification, paiements. Une personne capable de relier tous les morceaux.', details: 'Ma stack principale : Spring Boot côté backend, Next.js ou React Native côté frontend. Sur OdemLab, j\'ai pris en charge les modules métier backend — commandes, produits, paiements, auth — sur une seule API pour le web et le mobile.' },
      { title: 'Des systèmes qui tiennent', desc: 'Je me soucie de ce qui se passe quand de vrais utilisateurs arrivent : prix calculés côté serveur, paiements qui supportent les réessais, données qui restent cohérentes.', details: 'Sur OdemLab : tarification serveur, checkout idempotent, états de commande audités. J\'ai aussi mis en place health checks et déploiements sans interruption pour ne jamais casser la boutique.' },
      { title: 'Des interfaces comprises', desc: 'Je construis des écrans web et mobile en français, anglais et arabe — avec un vrai support droite-à-gauche, pas des bidouilles CSS.', details: 'OdemLab existe en trois langues avec un vrai support RTL. Je garde aussi les bases d\'accessibilité : navigation clavier, états de focus, contrastes lisibles.' },
    ],
  },
  howIWork: {
    kicker: 'Comment je travaille', title: 'Comment je construis, concrètement.',
    sub: 'Moins une méthodologie que les habitudes prises sur des projets réels.',
    steps: [
      { label: 'Comprendre', desc: 'Je pars du problème et des gens : qui utilise ça, à quoi ressemble le succès, qu\'est-ce qui peut attendre.' },
      { label: 'Concevoir', desc: 'Je dessine le flux de données et les arbitrages avant de coder — ce qui vit sur le serveur, ce que le client a le droit de décider.' },
      { label: 'Construire et tester', desc: 'Je construis par petites itérations et je vérifie au fur et à mesure, des tests unitaires aux parcours navigateur complets.' },
      { label: 'Livrer et améliorer', desc: 'Je déploie avec des contrôles de santé et un moyen de revenir en arrière, puis je corrige ce que l\'usage réel révèle.' },
    ],
  },
  filters: { all: 'Tous', web: 'Web', mobile: 'Mobile', backend: 'Backend', ai: 'IA', iot: 'IoT' },
  work: {
    kicker: 'Projets', title: 'Ce que j\'ai construit, et ce que chacun m\'a appris.',
    sub: 'Six projets web, mobile, backend, IA et IoT. Le premier est en ligne — les autres vivent sur ma machine, et je peux vous faire visiter n\'importe lequel.',
    showLess: 'voir moins', showFewer: 'Afficher moins', filterCount: '{count} projets sur {total} affichés',
    projects: [
      { title: 'OdemLab : boutique cosmétique avec IA', year: '2026', kind: 'PFA · Équipe de 4 · Backend + mobile', heading: 'OdemLab', lead: 'd',
        description: 'Une boutique cosmétique en ligne : les clients parcourent les produits, scannent leur peau pour une routine, et paient par carte, CMI ou contre-remboursement — en français, anglais ou arabe.',
        decision: 'J\'ai gardé une seule API Spring Boot pour la boutique Next.js et l\'app React Native, pour que la logique de prix et de paiement n\'existe qu\'à un seul endroit. Les prix sont calculés côté serveur ; le client ne les envoie jamais.',
        result: 'Plus de 1100 tests backend, plus de 120 migrations versionnées, en ligne sur Cloud Run avec déploiements sans interruption.',
        linkLabel: 'Ouvrir la boutique', linkHref: 'https://odemlab-frontend-fne55ek37q-no.a.run.app/fr' },
      { title: 'Plateforme de rendez-vous médicaux', year: '2025', kind: 'Stage · Full-stack', heading: 'Médical', lead: 'e',
        description: 'Une plateforme pour un petit cabinet : les patients prennent rendez-vous en ligne au lieu d\'appeler, les médecins gèrent leurs plannings et génèrent des rapports PDF.',
        decision: 'J\'ai construit une application classique rendue côté serveur avec Laravel plutôt qu\'un frontend séparé et une API — pour un cabinet de deux personnes, un seul déploiement était la bonne taille.',
        result: 'La réservation est passée d\'un appel téléphonique à un formulaire en ligne de deux minutes, avec tableaux de bord Chart.js.',
        note: 'Projet de stage — revue de code sur demande.' },
      { title: 'FitTrack : suivi sportif', year: '2025', kind: 'Équipe de 2 · Full-stack', heading: 'FitTrack', lead: 'i',
        description: 'Une application fitness : les utilisateurs créent des programmes, suivent leurs séances et visualisent IMC et calories. Avec un panneau admin pour modérer la bibliothèque d\'exercices.',
        decision: 'J\'ai séparé tôt l\'application des modérateurs du parcours admin, pour que la relecture des exercices avec vidéos ne risque jamais de casser l\'expérience des membres.',
        result: 'Pipeline complet de modération pour 38 exercices avec vidéos de démonstration.',
        note: 'Projet académique — tourne en local, démo sur demande.' },
      { title: 'Smart Campus Companion', year: '2026', kind: 'Équipe de 4 · Flutter', heading: 'Campus', lead: 'a',
        description: 'Une application de campus : les étudiants scannent les QR codes des salles pour voir les infos instantanément ; les professeurs réservent des salles et publient des annonces. La RA a été explorée puis écartée de la première version.',
        decision: 'Nous avons construit le parcours QR-vers-salle en premier et traité la RA comme un bonus — fiabiliser l\'expérience campus comptait plus qu\'une fonction de démo.',
        result: 'Infos de salle en un scan, avec synchronisation temps réel pour étudiants et professeurs.',
        note: 'Projet académique — tourne en local, démo sur demande.' },
      { title: 'SmartSummarizer', year: '2025', kind: 'Équipe de 4 · NLP', heading: 'Résumeur', lead: 'u',
        description: 'Un outil d\'étude qui transforme les PDF de cours en résumés, versions audio, quiz et cartes mentales, avec CamemBERT et Groq.',
        decision: 'J\'ai découpé le pipeline en petites étapes — extraction, résumé, quiz — pour qu\'un échec dans une étape ne perde pas tout le document, et que chaque étape s\'évalue séparément.',
        result: 'Environ 10 secondes par document sur notre jeu de test, noté 8,4/10 par les 30 étudiants qui l\'ont essayé.',
        note: 'Projet académique — tourne en local, démo sur demande.' },
      { title: 'Système de comptage de cannes', year: '2024 · PFE DUT', kind: 'Embarqué · Projet de fin', heading: 'IoT', lead: 'T',
        description: 'Un compteur à capteur laser pour les cannes sur une ligne de production, avec affichage OLED en direct et tableau de bord Wi-Fi — plus un boîtier imprimé en 3D que j\'ai conçu moi-même.',
        decision: 'J\'ai fait le comptage directement sur l\'ESP8266 et réservé le Wi-Fi au reporting, pour qu\'une coupure réseau ne perde jamais un comptage.',
        result: 'Environ 98 % de précision sur nos tests d\'établi, dans un boîtier imprimé prêt pour la production.',
        note: 'Projet de fin d\'études — photos du matériel et démo sur demande.' },
    ],
  },
  exp: {
    kicker: 'Parcours', title: 'Où j\'ai travaillé.',
    jobs: [
      { when: 'JUIN 2026 – SEPT. 2026 · AGADIR, SUR SITE', title: 'Projet de fin d\'année (PFA) : Développeur Full-Stack', org: 'Zorium, Technoparc Agadir', where: 'Plateforme OdemLab · équipe de quatre',
        points: ['Modules métier backend : commandes, produits, paiements, auth, RGPD', 'Chemins monétaires fiabilisés : tarification serveur, checkout idempotent, cycle audité', 'Livraison Cloud Run : déploiements sans interruption, health checks, rollback automatique'] },
      { when: 'JUIL. 2025 – SEPT. 2025 · DISTANCIEL', title: 'Stagiaire Développeur Full-Stack', org: 'MOUSSA SOFT · Agadir', where: 'Laravel · MySQL · Bootstrap',
        points: ['Plateforme de réservation médicale : rendez-vous patients-médecins, planning, rapports PDF, tableaux Chart.js'] },
      { when: 'JUIN 2024 – JUIN 2024 · AGADIR, SUR SITE', title: 'Stage de fin d\'études (DUT) : Développeur Embarqué', org: 'MOUSSA SOFT · Agadir', where: 'ESP8266 · VL53L0X · PHP · MySQL',
        points: ['Système de comptage de cannes avec ESP8266 + capteur laser, écran OLED, Wi-Fi vers tableau PHP/MySQL', 'Boîtiers 3D imprimés conçus dans SolidWorks, fabriqués avec Creality CR-10 Max'] },
      { when: 'JUIN 2023 – AOÛT 2023', title: 'Stagiaire QA Automatisation', org: 'Suites de non-régression web', where: 'Python · Selenium WebDriver · Page Objects',
        points: ['Campagne manuelle remplacée par des suites automatisées, un point de changement par écran'] },
    ],
  },
  edu: {
    kicker: 'Formation', title: 'Des écoles, pas des postes.', sub: 'Les deux formations derrière ce travail.',
    entries: [
      { years: '2024 – Présent', title: 'Cycle ingénieur, Génie logiciel', school: 'ENSIASD · Université Ibn Zohr, Taroudant', desc: 'Intelligence artificielle, science des données, architecture logicielle.' },
      { years: '2022 – 2024 · Mention bien', title: 'DUT, Génie informatique embarqué', school: 'EST Oujda, École Supérieure de Technologie', desc: 'Systèmes embarqués, IoT, firmware : ESP32/ESP8266, Arduino, Raspberry Pi.' },
    ],
  },
  behind: {
    kicker: 'Technologies', title: 'Ce que j\'utilise.',
    sub: 'Regroupées par ce que j\'ai vraiment utilisé en production — et ce que j\'ai seulement touché en passant.',
    categories: [
      { name: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Flutter', 'React Native'] },
      { name: 'Backend', items: ['Java', 'Spring Boot', 'Python', 'Flask', 'Laravel', 'PHP'] },
      { name: 'Données', items: ['PostgreSQL', 'Redis', 'MySQL', 'Firebase Firestore'] },
      { name: 'Cloud & DevOps', items: ['Docker', 'GitHub Actions', 'Google Cloud Run', 'Flyway'] },
      { name: 'Testing', items: ['Playwright', 'JUnit 5', 'Selenium'] },
      { name: 'IA', items: ['Gemini', 'CamemBERT', 'Groq'] },
      { name: 'Aussi familiers', items: ['Node.js', 'C++', 'Qt', 'Terraform', 'Prometheus', 'Grafana', 'PyTorch', 'spaCy'] },
    ],
  },
  aboutMe: {
    kicker: 'Profil', title: 'La personne derrière le code.',
    sub: 'Un peu sur ma façon de penser et ce qui me motive.',
    role: 'Développeur full-stack, plutôt backend',
    body: 'J\'aime être la personne qui transforme une idée en quelque chose qui tourne. La plupart de mes projets ont commencé comme un besoin flou — une boutique qui doit encaisser des paiements, un cabinet qui décroche trop le téléphone, un campus où personne ne se repère — et ont fini en logiciels que les gens utilisent vraiment. Aujourd\'hui je cherche un stage PFE pour continuer à faire ça dans une vraie équipe.',
    interests: ['Open source', 'Conception de systèmes', 'Échecs', 'Arts martiaux'],
    langsTitle: 'Langues',
    langs: [{ l: 'Arabe', lvl: 'maternelle' }, { l: 'Français', lvl: 'professionnel' }, { l: 'Anglais', lvl: 'professionnel' }],
  },
  contact: {
    kicker: 'Contact', title: 'On parle d\'un stage ?',
    sub: 'Je cherche un ', subEm: 'stage PFE', subEnd: ' — backend ou full-stack, au Maroc ou à distance. Le plus rapide : le formulaire ou l\'e-mail ci-dessous.',
    name: 'Votre nom', namePh: 'Votre nom complet', email: 'Adresse e-mail', emailPh: 'vous@entreprise.com',
    msg: 'Détails du projet', msgPh: 'Quel poste avez-vous en tête, et pour quand ?', send: 'Envoyer', sending: '...',
    success: '\u2713 Message envoyé. Je vous réponds vite.', error: '\u2717 Une erreur s\'est produite. Écrivez-moi directement.',
    mailto: '\u2713 Votre application e-mail s\'ouvre avec le message prêt à envoyer.',
    respondTime: 'Je réponds généralement sous un jour',
    retry: 'Réessayer',
    direct: 'E-mail direct', phone: 'Téléphone', linkedin: 'LinkedIn', github: 'GitHub',
  },
  footer: { top: 'Haut', elsewhere: 'Ailleurs', explore: 'Explorer', built: 'Construit avec React, Tailwind CSS · Déployé sur GitHub Pages', pageTitle: 'Ahmed Ouarrali, Développeur Full-Stack | Stage PFE' },
  dock: { home: 'Accueil', whatIDo: 'Ce que je fais', work: 'Projets', contact: 'Contact', lang: 'Langue', nav: 'Navigation rapide', footerNav: 'Navigation du pied de page', toggle: 'Basculer mode clair / sombre', resume: 'CV', linkedin: 'LinkedIn', github: 'GitHub', email: 'E-mail', backToTop: 'Retour en haut' },
};

export const DICTS: Record<Lang, Dict> = { en, fr };

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
