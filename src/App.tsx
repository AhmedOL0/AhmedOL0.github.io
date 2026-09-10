import { useEffect, useState } from 'react';
import Dock, { TopPills } from './components/Dock';
import Preloader from './components/Preloader';
import Stars from './components/Stars';
import CursorGlow from './components/CursorGlow';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Work from './components/Work';
import About from './components/About';
import Experience, { Education } from './components/Experience';
import Contact from './components/Contact';
import { LangProvider, useLang } from './i18n';
import { useActiveSection, useBackToTop, useMagnetic, useProgress, useSpotlight, useTheme } from './hooks';

function Footer() {
  const { t } = useLang();
  const cols: { head: string; links: { label: string; href: string }[] }[] = [
    { head: t.nav.work, links: [{ label: 'OdemLab', href: '#work' }, { label: 'FitTrack', href: '#work' }, { label: 'Smart Campus', href: '#work' }] },
    { head: t.nav.about, links: [{ label: t.nav.experience, href: '#experience' }, { label: t.nav.education, href: '#education' }, { label: t.nav.contact, href: '#contact' }] },
    { head: 'Elsewhere', links: [{ label: 'GitHub', href: 'https://github.com/AhmedOL0' }, { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ahmed-ouarrali' }, { label: 'Email', href: 'mailto:ahmedouarrali12@gmail.com' }] },
  ];
  return (
    <footer className="relative z-[1] mt-11 border-t px-7 pb-32 pt-12 text-[.85rem]"
      style={{ borderColor: 'var(--line-soft)', color: 'var(--faint)' }}>
      <div className="mx-auto grid max-w-[1120px] grid-cols-2 gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="font-serif-d text-2xl font-bold" style={{ color: 'var(--ink)' }}>
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
      </div>
      <div className="mx-auto mt-10 flex max-w-[1120px] flex-wrap justify-end gap-4 border-t pt-6"
        style={{ borderColor: 'var(--line-soft)' }}>
        <a href="#top" className="no-underline" style={{ color: 'var(--muted)' }}>{t.footer.top} ↑</a>
      </div>
    </footer>
  );
}

function Site() {
  const { theme, toggle } = useTheme();
  const progress = useProgress();
  const showTop = useBackToTop();
  const active = useActiveSection(['work', 'about', 'experience', 'education', 'contact']);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(true);
  useSpotlight();
  useMagnetic();
  useEffect(() => {
    if (loading) return;
    const t = setTimeout(() => setReady(true), 30);
    return () => clearTimeout(t);
  }, [loading]);

  return (
    <>
      {loading && <Preloader onDone={() => setLoading(false)} />}
      <CursorGlow />
      <a href="#work" className="skip-link">Skip to content</a>
      <div className="grid-bg" />
      <Stars />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div id="spot" />
      <div id="progress" style={{ width: `${progress}%` }} />
      <div className="grain" />
      <TopPills theme={theme} onToggle={toggle} />
      <Dock active={active} theme={theme} onToggle={toggle} />
      <div className="relative z-[1] mx-auto max-w-[1120px] px-7" style={{ opacity: ready ? 1 : 0 }}>
        <Hero />
      </div>
      <Marquee />
      <main className="relative z-[1] mx-auto max-w-[1120px] px-7">
        <Work />
        <About />
        <Experience />
        <Education />
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
