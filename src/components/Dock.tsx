import { useEffect, useRef, useState, type ReactNode } from 'react';
import { LANGS, useLang } from '../i18n';

function Tip({ children, text }: { children: ReactNode; text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const onEnter = () => {
    setShow(true);
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({ x: r.left + r.width / 2, y: r.bottom + 8 });
  };
  return (
    <div ref={ref} onMouseEnter={onEnter} onMouseLeave={() => setShow(false)}
      style={{ display: 'inline-flex' }}>
      {children}
      {show && <span role="tooltip" style={{
        position: 'fixed', left: pos.x, top: pos.y, transform: 'translateX(-50%)',
        background: 'var(--ink)', color: 'var(--bg)', fontFamily: 'var(--sans)',
        fontSize: '.72rem', padding: '6px 12px', borderRadius: 8, whiteSpace: 'nowrap',
        pointerEvents: 'none', zIndex: 9999, border: '1px solid var(--line)',
        boxShadow: '0 4px 16px rgba(0,0,0,.2)',
      }}>{text}</span>}
    </div>
  );
}

function Icon({ d, filled }: { d: string; filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor"
      strokeWidth={filled ? 0 : 1.8} strokeLinecap="round" strokeLinejoin="round"
      style={{ width: 19, height: 19 }}>
      <path d={d} />
    </svg>
  );
}

const P = {
  home: 'M3 10.5 12 3l9 7.5M5 9.5V21h5v-6h4v6h5V9.5',
  work: 'M4 8h16v12H4zM9 8V5h6v3M4 13h16',
  user: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  briefcase: 'M4 7h16v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7zM9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2',
  code: 'M16 18l6-6-6-6M8 6l-6 6 6 6',
  mail: 'M4 6h16v12H4zM4 7l8 6 8-6',
  sun: 'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 1v3M12 20v3M1 12h3M20 12h3M4.2 4.2l1.8 1.8M17.3 17.3l1.8 1.8M19.8 4.9l-1.8 1.8M6.3 17.3l-1.8 1.8',
  moon: 'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z',
  linkedin: 'M6.5 8.8v12M6.5 5.5v.1M11 20.8v-6.5c0-2 1.6-3.5 3.7-3.5s3.8 1.5 3.8 3.5v6.5M11 8.8v2.7',
  github: 'M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.2-.4-1.3.1-2.6 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.4.1 2.6.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2z',
};

export function TopPills({ theme, onToggle }: { theme: string; onToggle: () => void }) {
  const { lang, setLang, t } = useLang();
  const langAnnounce = lang === 'ar' ? 'تم التغيير إلى العربية' : lang === 'fr' ? 'Langue changée en français' : 'Language changed to English';
  return (
    <>
      <div aria-live="polite" className="sr-only">{langAnnounce}</div>
      <a href="assets/CV_Ahmed_Ouarrali.pdf" download data-magnetic
        className="btn btn-sm top-left top-pill fixed left-5 top-5 z-50 md:left-8 tip"
        data-tip={t.dock.resume}>
        {t.dock.resume}
      </a>
      <div className="top-right fixed right-5 top-5 z-50 flex max-w-[calc(100vw-2.5rem)] flex-wrap items-center justify-end gap-2 md:right-8">
        <div className="langsw" role="group" aria-label={t.dock.lang}>
          {LANGS.map((l) => (
            <button key={l.code} className={lang === l.code ? 'active' : ''} onClick={() => setLang(l.code)} aria-label={l.aria} title={l.aria}>
              {l.label}
            </button>
          ))}
        </div>
        <Tip text={t.dock.toggle}>
          <button onClick={onToggle} aria-label={t.dock.toggle}
            className="iconbtn iconbtn-glass" style={{ border: '1px solid var(--line)', color: 'var(--muted)' }}>
            <Icon d={theme === 'dark' ? P.sun : P.moon} />
          </button>
        </Tip>
      </div>
    </>
  );
}

export default function Dock({ active, theme, onToggle }: { active: string; theme: string; onToggle: () => void }) {
  const { t } = useLang();
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    let last = window.scrollY, raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        setHidden((prev) => {
          if (y > 500 && y > last + 4) return true;
          if (y < last - 4) return false;
          return prev;
        });
        last = y;
      });
    };
    document.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      document.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  const items = [
    { id: 'top', href: '#top', label: t.dock.home, icon: <Icon d={P.home} /> },
    { id: 'work', href: '#work', label: t.dock.work, icon: <Icon d={P.work} /> },
    { id: 'about', href: '#about', label: t.nav.about, icon: <Icon d={P.user} /> },
    { id: 'experience', href: '#experience', label: t.nav.experience, icon: <Icon d={P.briefcase} /> },
    { id: 'tools', href: '#tools', label: t.nav.tools, icon: <Icon d={P.code} /> },
    { id: 'contact', href: '#contact', label: t.dock.contact, icon: <Icon d={P.mail} /> },
  ];
  const isActive = (id: string) =>
    id === 'top' ? active === '' : active === id;
  return (
    <div className={`dock${hidden ? ' dock-hidden' : ''}`} role="navigation" aria-label={t.dock.nav}>
      {items.map((it) => (
        <a key={it.id} href={it.href} aria-label={it.label}
          data-tip={it.label}
          aria-current={isActive(it.id) ? 'true' : undefined}
          className={`tip${isActive(it.id) ? ' active' : ''}`}>
          {it.icon}
        </a>
      ))}
      <span className="dock-sep" />
      <button onClick={onToggle} aria-label={t.dock.toggle} data-tip={t.dock.toggle} className="tip">
        <Icon d={theme === 'dark' ? P.sun : P.moon} />
      </button>
      <span className="dock-sep" />
      <a className="dock-social tip" href="https://www.linkedin.com/in/ahmed-ouarrali" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" data-tip="LinkedIn">
        <Icon d={P.linkedin} />
      </a>
      <a className="dock-social tip" href="https://github.com/AhmedOL0" target="_blank" rel="noopener noreferrer" aria-label="GitHub" data-tip="GitHub">
        <Icon d={P.github} filled />
      </a>
    </div>
  );
}
