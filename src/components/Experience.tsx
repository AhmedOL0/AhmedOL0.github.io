import { useEffect, useRef } from 'react';
import Section from './Section';
import { useLang } from '../i18n-data';
import type { JobT } from '../i18n-data';

export function Timeline({ items }: { items: JobT[] }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const wrap = wrapRef.current, fill = fillRef.current;
      if (!wrap || !fill) return;
      const r = wrap.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.62 - r.top) / Math.max(r.height, 1)));
      fill.style.transform = `scaleY(${p.toFixed(3)})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    document.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div className="timeline mt-9" ref={wrapRef}>
      <div className="timeline-fill" ref={fillRef} aria-hidden="true" />
      {items.map((j) => (
        <div className="job" key={j.title}>
          <div className="job-marker" aria-hidden="true">
            <span className="job-marker-dot" />
          </div>
          <div className="job-card">
            <div className="when font-mono-d">{j.when}</div>
            <h3>{j.title} <span>· {j.org}</span></h3>
            <div className="where">{j.where}</div>
            <ul>
              {j.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Experience() {
  const { t } = useLang();
  return (
    <Section id="experience" num="04" kicker={t.exp.kicker} title={t.exp.title} variant="right">
      <Timeline items={t.exp.jobs} />
    </Section>
  );
}

const EDU_ICONS = [
  /* graduation cap */
  <svg key="eng" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10l-10-5L2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/><path d="M22 10v6"/></svg>,
  /* microchip */
  <svg key="dut" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="5" width="14" height="14" rx="2"/><rect x="9" y="9" width="6" height="6" rx="1"/><path d="M9 1v4m6-4v4m-8 14v4m6-4v4m-9-8H1m22 0h-4m-1.5-6.5L15 7m-6 10l-2.5 2.5m11-10.5L15 17m-6-10l-2.5-2.5"/></svg>,
];

export function Education() {
  const { t } = useLang();
  const accents = ['amber', 'sage'] as const;
  return (
    <Section id="education" num="05" kicker={t.edu.kicker} title={t.edu.title} sub={t.edu.sub} variant="scale">
      <div className="edu-grid mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {t.edu.entries.map((e, i) => (
          <article className={`edu-card edu-card--${accents[i]}`} key={e.title}>
            <div className="edu-card-head">
              <div className="edu-icon">{EDU_ICONS[i]}</div>
              <div className="edu-years font-mono-d">{e.years}</div>
            </div>
            <h3 className="font-serif-d">{e.title}</h3>
            <p className="edu-school">{e.school}</p>
            <p className="edu-desc">{e.desc}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
