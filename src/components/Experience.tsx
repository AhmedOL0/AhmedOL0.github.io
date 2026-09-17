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
          <div className="when font-mono-d">{j.when}</div>
          <h3>{j.title} <span>· {j.org}</span></h3>
          <div className="where">{j.where}</div>
          <ul>
            {j.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
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

export function Education() {
  const { t } = useLang();
  return (
    <Section id="education" num="05" kicker={t.edu.kicker} title={t.edu.title} sub={t.edu.sub} variant="scale">
      <div className="edu-grid mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {t.edu.entries.map((e) => (
          <article className="edu-card" key={e.title}>
            <div className="edu-years font-mono-d">{e.years}</div>
            <h3 className="font-serif-d">{e.title}</h3>
            <p className="edu-school">{e.school}</p>
            <p className="edu-desc">{e.desc}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
