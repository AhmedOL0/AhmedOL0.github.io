import { useEffect, useState } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Work from './components/Work';
import About from './components/About';
import Experience, { Education } from './components/Experience';
import Contact from './components/Contact';
import { useActiveSection, useBackToTop, useProgress, useSpotlight, useTheme } from './hooks';

function Footer() {
  return (
    <footer className="relative z-[1] mt-11 border-t px-7 pb-10 pt-8 text-[.82rem]"
      style={{ borderColor: 'var(--line-soft)', color: 'var(--faint)' }}>
      <div className="mx-auto flex max-w-[1120px] flex-wrap justify-between gap-4">
        <span>
          <a href="#top" className="mr-[18px] no-underline" style={{ color: 'var(--muted)' }}>Top</a>
          <a href="https://github.com/AhmedOL0" className="mr-[18px] no-underline" style={{ color: 'var(--muted)' }}>GitHub</a>
          <a href="https://www.linkedin.com/in/ahmed-ouarrali" className="no-underline" style={{ color: 'var(--muted)' }}>LinkedIn</a>
        </span>
      </div>
    </footer>
  );
}

export default function App() {
  const { theme, toggle } = useTheme();
  const progress = useProgress();
  const showTop = useBackToTop();
  const active = useActiveSection(['work', 'about', 'experience', 'education', 'contact']);
  const [ready, setReady] = useState(false);
  useSpotlight();
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 30);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <div className="grid-bg" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div id="spot" />
      <div id="progress" style={{ width: `${progress}%` }} />
      <div className="grain" />
      <Nav theme={theme} onToggle={toggle} active={active} />
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
