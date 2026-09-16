import { useState } from 'react';
import Section from './Section';
import { useLang } from '../i18n-data';

export default function WhatIDo() {
  const { t } = useLang();
  return (
    <Section id="what-i-do" num="01" kicker={t.whatIDo.kicker} title={t.whatIDo.title} sub={t.whatIDo.sub} variant="left">
      <div className="cap-grid mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {t.whatIDo.capabilities.map((cap) => (
          <CapabilityCard key={cap.title} cap={cap} />
        ))}
      </div>
    </Section>
  );
}

function CapabilityCard({ cap }: { cap: { title: string; desc: string; details: string } }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="cap-card">
      <h3 className="cap-title font-serif-d">{cap.title}</h3>
      <p className="cap-desc">{cap.desc}</p>
      <button className="cap-toggle" onClick={() => setOpen(!open)} aria-expanded={open}>
        {open ? 'Less' : 'Technical details'}
        <span className="cap-arrow">{open ? '−' : '+'}</span>
      </button>
      {open && <p className="cap-details">{cap.details}</p>}
    </div>
  );
}
