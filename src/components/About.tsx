import { useEffect, useState } from 'react';
import Section from './Section';
import { STAT_VALUES, useLang } from '../i18n';
import { useCountUp, useInView } from '../hooks';

function Stat({ value, label, sub }: { value: number; label: string; sub: string }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);
  const [flash, setFlash] = useState(false);
  const v = useCountUp(value, inView, 1500, () => setFlash(true));
  useEffect(() => {
    if (!flash) return;
    const t = setTimeout(() => setFlash(false), 1800);
    return () => clearTimeout(t);
  }, [flash]);
  return (
    <div ref={ref} className={`stat${flash ? ' flash' : ''}`}>
      <b className="font-serif-d">{v}</b>
      <span>{label}<br />{sub}</span>
    </div>
  );
}

export default function About() {
  const { t } = useLang();
  return (
    <Section id="about" num="02" kicker={t.about.kicker} title={t.about.title} sub={t.about.sub}>
      <div className="stats mt-9 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {t.about.stats.map((s, i) => (
          <Stat key={s.label} value={STAT_VALUES[i]} label={s.label} sub={s.sub} />
        ))}
      </div>
      <div className="about-grid mt-[34px] grid grid-cols-1 gap-11 lg:grid-cols-2">
        <div>
          <h4>{t.about.bestTitle}</h4>
          <ul>{t.about.best.map((li) => <li key={li}>{li}</li>)}</ul>
        </div>
        <div>
          <h4>{t.about.methodTitle}</h4>
          <ul>{t.about.method.map((li) => <li key={li}>{li}</li>)}</ul>
        </div>
      </div>
      <div className="langs mt-[26px] flex flex-wrap gap-2.5">
        {t.about.langs.map((l) => (
          <span key={l.l}><b>{l.l}</b> — {l.lvl}</span>
        ))}
      </div>
    </Section>
  );
}
