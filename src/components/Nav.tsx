const links = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export default function Nav({
  theme, onToggle, active,
}: {
  theme: string; onToggle: () => void; active: string;
}) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b" style={{ background: 'var(--navbg)', backdropFilter: 'blur(14px)', borderColor: 'var(--line-soft)' }}>
      <div className="mx-auto flex h-[66px] max-w-[1120px] items-center justify-between px-7">
        <a href="#top" className="font-serif-d text-2xl font-bold tracking-wide no-underline">
          A<em className="not-italic" style={{ color: 'var(--gold)' }}>.</em>Ouarrali
        </a>
        <div className="flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="hidden text-[.85rem] tracking-[.05em] no-underline transition-colors md:inline"
              style={{ color: active === l.id ? 'var(--gold)' : 'var(--muted)' }}
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={onToggle}
            aria-label="Toggle light / dark mode"
            title="Toggle light / dark mode"
            className="iconbtn"
            style={{ border: '1px solid var(--line)', color: 'var(--muted)' }}
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ width: 17, height: 17 }}>
                <circle cx="12" cy="12" r="4.5" />
                <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 17, height: 17 }}>
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
              </svg>
            )}
          </button>
          <a className="btn btn-gold btn-sm" href="assets/CV_Ahmed_Ouarrali.pdf" download>Résumé</a>
        </div>
      </div>
    </nav>
  );
}
