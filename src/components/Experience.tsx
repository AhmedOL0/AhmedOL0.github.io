import Section from './Section';
import { useLang, type JobT } from '../i18n';

export function Timeline({ items }: { items: JobT[] }) {
  return (
    <div className="timeline mt-9">
      {items.map((j) => (
        <div className="job" key={j.title}>
          <div className="when font-mono-d">{j.when}</div>
          <h4>{j.title} <span>· {j.org}</span></h4>
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
    <Section id="experience" num="03" kicker={t.exp.kicker} title={t.exp.title}>
      <Timeline items={t.exp.jobs} />
    </Section>
  );
}

export function Education() {
  const { t } = useLang();
  return (
    <Section id="education" num="04" kicker={t.edu.kicker} title={t.edu.title} sub={t.edu.sub}>
      <div className="edu-grid mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {t.edu.entries.map((e) => (
          <article className="edu-card" key={e.title}>
            <div className="edu-years font-mono-d">{e.years}</div>
            <h4 className="font-serif-d">{e.title}</h4>
            <p className="edu-school">{e.school}</p>
            <p className="edu-desc">{e.desc}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
