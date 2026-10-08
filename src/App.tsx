import { Component, lazy, Suspense, useEffect, type ReactNode } from 'react';
import Dock, { TopPills } from './components/Dock';
import Hero from './components/Hero';
import MagneticCursor from './components/MagneticCursor';
import { LangProvider } from './i18n';
import { useLang } from './i18n-data';
import { useActiveSection, useBackToTop, useProgress, useTheme } from './hooks';

// Below-the-fold sections are code-split: Hero + nav stay in the initial
// bundle (LCP), everything else loads in parallel chunks. This shortens the
// critical request chain (techIcons, Contact form, i18n-heavy sections).
const WhatIDo = lazy(() => import('./components/WhatIDo'));
const HowIWork = lazy(() => import('./components/HowIWork'));
const Work = lazy(() => import('./components/Work'));
const Experience = lazy(() => import('./components/Experience'));
const Education = lazy(() => import('./components/Experience').then((m) => ({ default: m.Education })));
const BehindTheWork = lazy(() => import('./components/BehindTheWork'));
const AboutMe = lazy(() => import('./components/AboutMe'));
const Contact = lazy(() => import('./components/Contact'));

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return <ErrorFallback />;
    return this.props.children;
  }
}

function ErrorFallback() {
  const { t } = useLang();
  return (
    <div className="error-block" role="alert">
      <p className="error-eyebrow">{t.error.label}</p>
      <h1 className="error-title font-serif-d">{t.error.title}</h1>
      <p className="error-sub">{t.error.sub}</p>
      <div className="error-actions">
        <button className="btn btn-gold" onClick={() => window.location.reload()}>
          {t.error.refresh}
        </button>
        <a className="btn btn-ghost" href="/">
          {t.error.home}
        </a>
      </div>
      <p className="error-contact">
        {t.error.still} <a href="mailto:ahmedouarrali12@gmail.com">ahmedouarrali12@gmail.com</a>
      </p>
    </div>
  );
}

function Footer() {
  const { t } = useLang();
  const cols: { head: string; links: { label: string; href: string }[] }[] = [
    { head: t.nav.work, links: [{ label: 'OdemLab', href: '#work-odemlab' }, { label: 'FitTrack', href: '#work-fittrack' }, { label: 'Smart Campus', href: '#work-campus' }] },
    { head: t.footer.explore, links: [{ label: t.nav.experience, href: '#experience' }, { label: t.nav.behind, href: '#behind' }, { label: t.nav.contact, href: '#contact' }] },
    { head: t.footer.elsewhere, links: [{ label: 'GitHub', href: 'https://github.com/AhmedOL0' }, { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ahmed-ouarrali' }, { label: 'Email', href: 'mailto:ahmedouarrali12@gmail.com' }] },
  ];
  return (
    <footer className="relative z-[1] footer-block border-t text-[.85rem] footer-container" style={{ overflow: 'hidden' }}>
      <nav className="mx-auto grid max-w-[1120px] grid-cols-2 gap-6 sm:gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]" aria-label={t.dock.footerNav}>
        <div>
          <p className="font-serif-d text-xl sm:text-2xl font-bold footer-brand">
            A<em className="not-italic footer-dot">.</em>Ouarrali
          </p>
          <p className="mt-3 max-w-[30ch] footer-tagline">{t.hero.badge}</p>
          <div className="footer-socials mt-5 flex gap-3">
            <a href="https://github.com/AhmedOL0" target="_blank" rel="noopener noreferrer" aria-label={t.dock.github} className="footer-social-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/ahmed-ouarrali" target="_blank" rel="noopener noreferrer" aria-label={t.dock.linkedin} className="footer-social-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="mailto:ahmedouarrali12@gmail.com" aria-label={t.dock.email} className="footer-social-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </a>
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.head}>
            <p className="font-mono-d mb-4 text-[.72rem] uppercase tracking-[.2em] footer-col-head">{c.head}</p>
            <ul className="flex list-none flex-col gap-2.5">
              {c.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="footer-link no-underline transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      <div className="mx-auto max-w-[1120px] mt-10 border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 footer-bottom" style={{ borderColor: 'var(--line-soft)' }}>
        <p className="text-[.72rem] font-mono-d tracking-[.06em] order-2 sm:order-1 footer-built">
          {t.footer.built}
        </p>
        <div className="flex items-center gap-4 order-1 sm:order-2">
          <a href="assets/CV_Ahmed_Ouarrali.pdf" download className="btn btn-sm btn-ghost">
            {t.dock.resume} ↓
          </a>
          <a href="#top" className="no-underline text-[.78rem] font-mono-d tracking-[.06em] back-to-top">{t.footer.top} ↑</a>
        </div>
      </div>
    </footer>
  );
}

const STICKY_SECTIONS = ['what-i-do', 'how-i-work', 'work', 'experience', 'education', 'behind', 'about', 'contact'];

// Reserve space for below-fold chunks on slow networks: avoids a flash of
// empty page + layout shift when lazy sections stream in. Pure decoration.
function BelowFoldFallback() {
  return (
    <div className="below-fold-fallback" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}

// Own component so the per-frame progress value re-renders only this 2px bar,
// not the entire page tree (was: useProgress() inside Site → full re-render
// on every scroll frame, the main mobile jank source).
function ProgressBar() {
  const progress = useProgress();
  return <div id="progress" style={{ width: `${progress}%` }} aria-hidden="true" />;
}

function Site() {
  const { t } = useLang();
  const { theme, toggle } = useTheme();
  const showTop = useBackToTop();
  const active = useActiveSection(STICKY_SECTIONS);
  useEffect(() => { document.title = t.footer.pageTitle; }, [t.footer.pageTitle]);

  return (
    <>
      <a href="#main" className="skip-link">{t.nav.skipToContent}</a>
      <div className="folio-grid" aria-hidden="true" />
      <div className="folio-frame" aria-hidden="true" />
      <ProgressBar />
      <div className="grain" aria-hidden="true" />
      <TopPills theme={theme} onToggle={toggle} />
      <Dock active={active} theme={theme} onToggle={toggle} />
      <main id="main" tabIndex={-1} className="relative z-[1]">
        <Hero />
        <Suspense fallback={<BelowFoldFallback />}>
          <WhatIDo />
          <HowIWork />
          <Work />
          <Experience />
          <Education />
          <BehindTheWork />
          <AboutMe />
          <Contact />
        </Suspense>
      </main>
      <button
        id="toTop"
        aria-label={t.dock.backToTop}
        title={t.dock.backToTop}
        onClick={() => {
          // CSS smooth scrolling already respects reduced-motion; the JS API
          // does not, so choose explicitly here.
          const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
        }}
        className={showTop ? 'show' : ''}
      >
        ↑
      </button>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <LangProvider>
      <ErrorBoundary>
        <MagneticCursor>
          <Site />
        </MagneticCursor>
      </ErrorBoundary>
    </LangProvider>
  );
}
