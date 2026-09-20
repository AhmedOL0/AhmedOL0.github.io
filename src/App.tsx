import { Suspense, lazy, useCallback, useEffect, useState, Component, type ReactNode } from 'react';
import Dock, { TopPills } from './components/Dock';
import Preloader from './components/Preloader';
import Hero from './components/Hero';
import WhatIDo from './components/WhatIDo';
import HowIWork from './components/HowIWork';
import Work from './components/Work';
import Experience, { Education } from './components/Experience';
import BehindTheWork from './components/BehindTheWork';
import AboutMe from './components/AboutMe';
import Contact from './components/Contact';
import { LangProvider } from './i18n';
import { useLang } from './i18n-data';
import { useActiveSection, useBackToTop, useMagnetic, useProgress, useSpotlight, useTheme } from './hooks';

const Stars = lazy(() => import('./components/Stars'));
const CursorGlow = lazy(() => import('./components/CursorGlow'));
const CursorTrail = lazy(() => import('./components/CursorTrail'));

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '3rem 1.5rem', textAlign: 'center', color: 'var(--muted)' }}>
          <p style={{ fontSize: '1.2rem', color: 'var(--ink)', marginBottom: '.5rem' }}>Something went wrong.</p>
          <p style={{ fontSize: '.9rem', marginBottom: '1.5rem' }}>Try refreshing the page.</p>
          <button onClick={() => window.location.reload()}
            style={{ background: 'var(--gold)', color: '#0b0b0e', border: 'none', padding: '.5rem 1.2rem', borderRadius: 999, cursor: 'pointer', fontSize: '.85rem' }}>
            Refresh
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function Footer() {
  const { t } = useLang();
  const cols: { head: string; links: { label: string; href: string }[] }[] = [
    { head: t.nav.work, links: [{ label: 'OdemLab', href: '#work-odemlab' }, { label: 'FitTrack', href: '#work-fittrack' }, { label: 'Smart Campus', href: '#work-campus' }] },
    { head: t.nav.whatIDo, links: [{ label: t.nav.experience, href: '#experience' }, { label: t.nav.behind, href: '#behind' }, { label: t.nav.contact, href: '#contact' }] },
    { head: t.footer.elsewhere, links: [{ label: 'GitHub', href: 'https://github.com/AhmedOL0' }, { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ahmed-ouarrali' }, { label: 'Email', href: 'mailto:ahmedouarrali12@gmail.com' }] },
  ];
  return (
    <footer className="relative z-[1] footer-block border-t text-[.85rem] footer-container" style={{ overflow: 'hidden' }}>
      <div className="foot-mark mx-auto max-w-[1120px]" aria-hidden="true">AO</div>
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
          Built with React, Tailwind CSS &middot; Deployed on GitHub Pages
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

function Site() {
  const { t } = useLang();
  const { theme, toggle } = useTheme();
  const progress = useProgress();
  const showTop = useBackToTop();
  const active = useActiveSection(STICKY_SECTIONS);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(() => {
    try {
      return !sessionStorage.getItem('ao-seen');
    } catch {
      return true;
    }
  });
  useSpotlight();
  useMagnetic();
  useEffect(() => { document.title = t.footer.pageTitle; }, [t.footer.pageTitle]);
  // Stable identity: Preloader's timers must survive parent re-renders
  // (scroll/progress), otherwise its effect cleanup reschedules them forever.
  const handlePreloaderDone = useCallback(() => {
    try {
      sessionStorage.setItem('ao-seen', '1');
    } catch { /* ignore */ }
    setLoading(false);
  }, []);
  useEffect(() => {
    if (loading) return;
    const t = setTimeout(() => setReady(true), 30);
    return () => clearTimeout(t);
  }, [loading]);

  return (
    <>
      {loading && (
        <Preloader onDone={handlePreloaderDone} />
      )}
      <ErrorBoundary>
        <Suspense fallback={null}>
          <CursorGlow />
          <CursorTrail />
        </Suspense>
      </ErrorBoundary>
      <a href="#main" className="skip-link">{t.nav.skipToContent}</a>
      <div className="grid-bg" aria-hidden="true" />
      <ErrorBoundary>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
      </ErrorBoundary>
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />
      <div className="orb orb-3" aria-hidden="true" />
      <div className="orb orb-4" aria-hidden="true" />
      <div id="spot" aria-hidden="true" />
      <div id="progress" style={{ width: `${progress}%` }} aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <TopPills theme={theme} onToggle={toggle} />
      <Dock active={active} theme={theme} onToggle={toggle} />
      <div className="relative z-[1]" style={{ opacity: ready ? 1 : 0 }}>
        <Hero />
      </div>
      <main id="main" tabIndex={-1} className="relative z-[1]">
        <WhatIDo />
        <HowIWork />
        <Work />
        <Experience />
        <Education />
        <BehindTheWork />
        <AboutMe />
        <Contact />
      </main>
      <button
        id="toTop"
        aria-label={t.dock.backToTop}
        title={t.dock.backToTop}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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
      <Site />
    </LangProvider>
  );
}
