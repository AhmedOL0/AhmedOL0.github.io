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
    <footer className="relative z-[1] footer-block border-t text-[.85rem]"
      style={{ borderColor: 'var(--line-soft)', color: 'var(--faint)', overflow: 'hidden' }}>
      <div className="foot-mark mx-auto max-w-[1120px]" aria-hidden="true">AO</div>
      <nav className="mx-auto grid max-w-[1120px] grid-cols-2 gap-6 sm:gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]" aria-label="Footer">
        <div>
          <p className="font-serif-d text-xl sm:text-2xl font-bold" style={{ color: 'var(--ink)' }}>
            A<em className="not-italic" style={{ color: 'var(--gold)' }}>.</em>Ouarrali
          </p>
          <p className="mt-3 max-w-[30ch]" style={{ color: 'var(--muted)' }}>{t.hero.badge}</p>
          <div className="footer-socials mt-5 flex gap-3">
            <a href="https://github.com/AhmedOL0" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="footer-social-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/ahmed-ouarrali" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer-social-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="mailto:ahmedouarrali12@gmail.com" aria-label="Email" className="footer-social-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </a>
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.head}>
            <p className="font-mono-d mb-4 text-[.72rem] uppercase tracking-[.2em]" style={{ color: 'var(--gold)' }}>{c.head}</p>
            <ul className="flex list-none flex-col gap-2.5">
              {c.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="no-underline transition-colors" style={{ color: 'var(--muted)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--gold)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted)'; }}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      <div className="mx-auto max-w-[1120px] mt-8 text-center">
        <p className="text-[.72rem] font-mono-d tracking-[.06em]" style={{ color: 'var(--faint)' }}>
          Built with React, Tailwind CSS &middot; Deployed on GitHub Pages
        </p>
      </div>
      <div className="mx-auto mt-6 flex max-w-[1120px] flex-wrap items-center justify-between gap-4 border-t pt-6"
        style={{ borderColor: 'var(--line-soft)' }}>
        <a href="assets/CV_Ahmed_Ouarrali.pdf" download className="btn btn-sm btn-ghost">
          {t.dock.resume} ↓
        </a>
        <a href="#top" className="no-underline" style={{ color: 'var(--muted)' }}>{t.footer.top} ↑</a>
      </div>
    </footer>
  );
}

const STICKY_SECTIONS = ['what-i-do', 'how-i-work', 'work', 'experience', 'behind', 'about', 'contact'];

function Site() {
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
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="grid-bg" />
      <ErrorBoundary>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
      </ErrorBoundary>
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="orb orb-4" />
      <div id="spot" />
      <div id="progress" style={{ width: `${progress}%` }} />
      <div className="grain" />
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
        aria-label="Back to top"
        title="Back to top"
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
