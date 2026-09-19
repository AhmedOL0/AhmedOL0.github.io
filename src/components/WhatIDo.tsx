import { useState } from 'react';
import Section from './Section';
import { useLang } from '../i18n-data';

const CARDS = [
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
    metric: '6+', metricLabel: 'shipped',
    accent: 'amber',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>,
    metric: 'WCAG', metricLabel: '2.2',
    accent: 'gold',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
    metric: '810+', metricLabel: 'tests',
    accent: 'sage',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8l6 6"/><path d="M4 14l6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="M22 22l-5-10-5 10"/><path d="M14 18h6"/></svg>,
    metric: 'FR EN', metricLabel: 'AR',
    accent: 'rust',
  },
];

export default function WhatIDo() {
  const { t } = useLang();
  return (
    <Section id="what-i-do" num="01" kicker={t.whatIDo.kicker} title={t.whatIDo.title} sub={t.whatIDo.sub} variant="left">
      <div className="cap-grid mt-6 sm:mt-8">
        {t.whatIDo.capabilities.map((cap, i) => (
          <CapabilityCard key={cap.title} cap={cap} card={CARDS[i]} num={i + 1} />
        ))}
      </div>
    </Section>
  );
}

function CapabilityCard({ cap, card, num }: { cap: { title: string; desc: string; details: string }; card: typeof CARDS[number]; num: number }) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  return (
    <div className={`cap-card cap-card--${card.accent}`}>
      <div className="cap-card-head">
        <div className="cap-icon">{card.icon}</div>
        <span className="cap-num" aria-hidden="true">{String(num).padStart(2, '0')}</span>
      </div>
      <div className="cap-metric">
        <span className="cap-metric-val">{card.metric}</span>
        <span className="cap-metric-label">{card.metricLabel}</span>
      </div>
      <h3 className="cap-title">{cap.title}</h3>
      <p className="cap-desc">{cap.desc}</p>
      <button className="cap-toggle" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span className="cap-toggle-text">{open ? t.whatIDo.showLess : t.whatIDo.showDetails}</span>
        <svg className={`cap-chevron${open ? ' open' : ''}`} width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 4.5l3 3 3-3"/></svg>
      </button>
      <div className={`cap-details-wrap${open ? ' open' : ''}`}>
        <p className="cap-details">{cap.details}</p>
      </div>
    </div>
  );
}
