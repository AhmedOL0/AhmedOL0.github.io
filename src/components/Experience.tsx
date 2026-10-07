import { useEffect, useRef } from 'react';
import Section from './Section';
import { useLang } from '../i18n-data';
import type { JobT } from '../i18n-data';

export function Timeline({ items }: { items: JobT[] }) {
  const wrapRef = useRef<HTMLOListElement | null>(null);
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
    <ol className="timeline mt-9" ref={wrapRef}>
      <div className="timeline-fill" ref={fillRef} aria-hidden="true" />
      {items.map((j) => (
        <li className="job" key={j.title}>
          <div className="job-marker" aria-hidden="true">
            <span className="job-marker-dot" />
          </div>
          <div className="job-card">
            <div className="when font-mono-d">{j.when}</div>
            <h3>{j.title} <span>· {j.org}</span></h3>
            {j.where && <div className="where">{j.where}</div>}
            {j.tags.length > 0 && (
              <div className="tags job-tags">
                {j.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            )}
            <ul>
              {j.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
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
  /* landmark — filled pediment for weight, three pillars that breathe */
  <svg key="eng" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l9 5H3z" fill="currentColor" stroke="none"/><path d="M7.5 21V11 M12 21V11 M16.5 21V11"/><path d="M3 21h18"/></svg>,
  /* packaged chip — body, filled core, short stubs; unmistakably a microchip */
  <svg key="dut" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="6" width="12" height="12" rx="2"/><rect x="10" y="10" width="4" height="4" rx="1" fill="currentColor" stroke="none"/><path d="M12 6V2.5 M12 18v3.5 M6 12H2.5 M18 12h3.5"/></svg>,
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
