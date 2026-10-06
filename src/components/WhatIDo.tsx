import { useId, useState } from 'react';
import Section from './Section';
import { useLang } from '../i18n-data';

const CARDS = [
  {
    /* stacked layers — "full-stack", every layer of the product */
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 2 9 5-9 5-9-5 9-5z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/></svg>,
    metric: '6+', metricLabel: 'shipped',
    accent: 'amber',
  },
  {
    /* app window — "interfaces people use" */
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/><circle cx="6" cy="6.5" r=".8" fill="currentColor" stroke="none"/><path d="M7 13h4"/><path d="M7 16.5h7"/></svg>,
    metric: 'WCAG', metricLabel: '2.2',
    accent: 'gold',
  },
  {
    /* shield check — "systems that hold up" */
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 4.5 5v6c0 5 3.2 8.7 7.5 11 4.3-2.3 7.5-6 7.5-11V5L12 2z"/><path d="m9 12 2 2 4-4"/></svg>,
    metric: '810+', metricLabel: 'tests',
    accent: 'sage',
  },
  {
    /* two chat bubbles — "conversation across languages" */
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a2.5 2.5 0 0 1-2.5 2.5H12l-4.5 4v-4H6.5A2.5 2.5 0 0 1 4 11.5v-6A2.5 2.5 0 0 1 6.5 3h12A2.5 2.5 0 0 1 21 5.5v6z"/><path d="M4 11.5V17a2.5 2.5 0 0 0 2.5 2.5H9"/></svg>,
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
  const detailsId = useId();
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
