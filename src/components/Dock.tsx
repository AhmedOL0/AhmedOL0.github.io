import { LANGS, useLang } from '../i18n';

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
  mail: 'M4 6h16v12H4zM4 7l8 6 8-6',
  sun: 'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 1v3M12 20v3M1 12h3M20 12h3M4.2 4.2l1.8 1.8M17.3 17.3l1.8 1.8M19.8 4.9l-1.8 1.8M6.3 17.3l-1.8 1.8',
  moon: 'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z',
  linkedin: 'M6.5 8.8v12M6.5 5.5v.1M11 20.8v-6.5c0-2 1.6-3.5 3.7-3.5s3.8 1.5 3.8 3.5v6.5M11 8.8v2.7',
  github: 'M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.2-.4-1.3.1-2.6 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.4.1 2.6.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2z',
};

export function TopPills({ theme, onToggle }: { theme: string; onToggle: () => void }) {
  const { lang, setLang } = useLang();
  return (
    <>
      <a href="assets/CV_Ahmed_Ouarrali.pdf" download
        className="btn btn-gold btn-sm top-left fixed left-5 top-5 z-50 md:left-8">
        Résumé
      </a>
      <div className="top-right fixed right-5 top-5 z-50 flex max-w-[calc(100vw-2.5rem)] flex-wrap items-center justify-end gap-2 md:right-8">
        <div className="langsw" role="group" aria-label="Language">
          {LANGS.map((l) => (
            <button key={l.code} className={lang === l.code ? 'active' : ''} onClick={() => setLang(l.code)}>
              {l.label}
            </button>
          ))}
        </div>
        <button onClick={onToggle} aria-label="Toggle light / dark mode" title="Toggle light / dark mode"
          className="iconbtn" style={{ border: '1px solid var(--line)', color: 'var(--muted)', background: 'var(--navbg)' }}>
          <Icon d={theme === 'dark' ? P.sun : P.moon} />
        </button>
      </div>
    </>
  );
}

export default function Dock({ active, theme, onToggle }: { active: string; theme: string; onToggle: () => void }) {
  const items = [
    { id: 'top', href: '#top', label: 'Home', icon: <Icon d={P.home} /> },
    { id: 'work', href: '#work', label: 'Work', icon: <Icon d={P.work} /> },
    { id: 'contact', href: '#contact', label: 'Contact', icon: <Icon d={P.mail} /> },
  ];
  const isActive = (id: string) =>
    id === 'top' ? active === '' : active === id;
  return (
    <div className="dock" role="navigation" aria-label="Quick navigation">
      {items.map((it) => (
        <a key={it.id} href={it.href} aria-label={it.label} title={it.label}
          className={isActive(it.id) ? 'active' : ''}>
          {it.icon}
        </a>
      ))}
      <span className="dock-sep" />
      <button onClick={onToggle} aria-label="Toggle light / dark mode" title="Toggle light / dark mode">
        <Icon d={theme === 'dark' ? P.sun : P.moon} />
      </button>
      <span className="dock-sep" />
      <a href="https://www.linkedin.com/in/ahmed-ouarrali" aria-label="LinkedIn" title="LinkedIn">
        <Icon d={P.linkedin} />
      </a>
      <a href="https://github.com/AhmedOL0" aria-label="GitHub" title="GitHub">
        <Icon d={P.github} filled />
      </a>
    </div>
  );
}
