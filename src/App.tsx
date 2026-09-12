import { Suspense, lazy, useEffect, useState, Component, type ReactNode } from 'react';
import Dock, { TopPills } from './components/Dock';
import Preloader from './components/Preloader';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Work from './components/Work';
import About from './components/About';
import Experience, { Education } from './components/Experience';
import Tools from './components/Tools';
import Contact from './components/Contact';
import { LangProvider, useLang } from './i18n';
import { useActiveSection, useBackToTop, useMagnetic, useProgress, useSpotlight, useTheme } from './hooks';

const Stars = lazy(() => import('./components/Stars'));
const CursorGlow = lazy(() => import('./components/CursorGlow'));
const CursorTrail = lazy(() => import('./components/CursorTrail'));

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() { return this.state.hasError ? null : this.props.children; }
}

function Footer() {
  const { t } = useLang();
  const cols: { head: string; links: { label: string; href: string }[] }[] = [
    { head: t.nav.work, links: [{ label: 'OdemLab', href: '#work-odemlab' }, { label: 'FitTrack', href: '#work-fittrack' }, { label: 'Smart Campus', href: '#work-campus' }] },
    { head: t.nav.about, links: [{ label: t.nav.experience, href: '#experience' }, { label: t.nav.education, href: '#education' }, { label: t.nav.contact, href: '#contact' }] },
    { head: t.footer.elsewhere, links: [{ label: 'GitHub', href: 'https://github.com/AhmedOL0' }, { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ahmed-ouarrali' }, { label: 'Email', href: 'mailto:ahmedouarrali12@gmail.com' }] },
  ];
  return (
    <footer className="relative z-[1] mt-11 border-t px-5 sm:px-7 pb-20 sm:pb-32 pt-10 sm:pt-12 text-[.85rem]"
      style={{ borderColor: 'var(--line-soft)', color: 'var(--faint)', overflow: 'hidden' }}>
      <div className="foot-mark mx-auto max-w-[1120px]" aria-hidden="true">AO</div>
      <nav className="mx-auto grid max-w-[1120px] grid-cols-2 gap-6 sm:gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]" aria-label="Footer">
        <div>
          <p className="font-serif-d text-xl sm:text-2xl font-bold" style={{ color: 'var(--ink)' }}>
            A<em className="not-italic" style={{ color: 'var(--gold)' }}>.</em>Ouarrali
          </p>
          <p className="mt-3 max-w-[30ch]" style={{ color: 'var(--muted)' }}>{t.hero.badge}</p>
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
      <div className="mx-auto mt-10 flex max-w-[1120px] flex-wrap items-center justify-between gap-4 border-t pt-6"
        style={{ borderColor: 'var(--line-soft)' }}>
        <a href="assets/CV_Ahmed_Ouarrali.pdf" download className="btn btn-sm btn-ghost">
          {t.dock.resume} ↓
        </a>
        <a href="#top" className="no-underline" style={{ color: 'var(--muted)' }}>{t.footer.top} ↑</a>
      </div>
    </footer>
  );
}

function Site() {
  const { theme, toggle } = useTheme();
  const progress = useProgress();
  const showTop = useBackToTop();
  const active = useActiveSection(['work', 'about', 'experience', 'education', 'tools', 'contact']);
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
  useEffect(() => {
    if (loading) return;
    const t = setTimeout(() => setReady(true), 30);
    return () => clearTimeout(t);
  }, [loading]);

  return (
    <>
      {loading && (
        <Preloader
          onDone={() => {
            try {
              sessionStorage.setItem('ao-seen', '1');
            } catch { /* ignore */ }
            setLoading(false);
          }}
        />
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
      <Marquee />
      <main id="main" className="relative z-[1]">
        <Work />
        <About />
        <Experience />
        <Education />
        <Tools />
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
