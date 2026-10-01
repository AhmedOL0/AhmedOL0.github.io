import { useId, useState } from 'react';
import Section from './Section';
import { useLang } from '../i18n-data';

const CARDS = [
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="18" rx="3"/><path d="M7 9l3 3-3 3"/><path d="M13 15h4"/><path d="M17 11v8"/></svg>,
    accent: 'amber',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="5" cy="19" r="2"/><circle cx="19" cy="5" r="2"/><path d="M16.5 7.5l-9 9"/><path d="M7 17l3.5-3.5"/><path d="M13.5 10.5L17 7"/></svg>,
    accent: 'gold',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M4.93 4.93l2.12 2.12m9.9 9.9l2.12 2.12M2 12h3m14 0h3M4.93 19.07l2.12-2.12m9.9-9.9l2.12-2.12"/></svg>,
    accent: 'sage',
  },
];

export default function WhatIDo() {
  const { t } = useLang();
  return (
    <Section id="what-i-do" num="01" kicker={t.whatIDo.kicker} title={t.whatIDo.title} sub={t.whatIDo.sub} variant="left">
      <div className="cap-grid mt-6 sm:mt-8">
        {t.whatIDo.capabilities.map((cap, i) => (
          <CapabilityCard key={cap.title} cap={cap} card={CARDS[i % CARDS.length]} num={i + 1} />
        ))}
      </div>
    </Section>
  );
}

function CapabilityCard({ cap, card, num }: { cap: { title: string; desc: string; details: string }; card: typeof CARDS[number]; num: number }) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const detailsId = useId();
  return (
    <div className={`cap-card cap-card--${card.accent}`}>
      <div className="cap-card-head">
        <div className="cap-icon">{card.icon}</div>
        <span className="cap-num" aria-hidden="true">{String(num).padStart(2, '0')}</span>
      </div>
      <h3 className="cap-title">{cap.title}</h3>
      <p className="cap-desc">{cap.desc}</p>
      <button className="cap-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls={detailsId}>
        <span className="cap-toggle-text">{open ? t.whatIDo.showLess : t.whatIDo.showDetails}</span>
        <svg className={`cap-chevron${open ? ' open' : ''}`} width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 4.5l3 3 3-3"/></svg>
      </button>
      <div id={detailsId} className={`cap-details-wrap${open ? ' open' : ''}`} role="region" aria-label={cap.title}>
        <p className="cap-details">{cap.details}</p>
      </div>
    </div>
  );
}
