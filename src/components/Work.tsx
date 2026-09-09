import { useState } from 'react';
import Section from './Section';
import { filters, projects, thumbTitle, type Project } from '../data';

function Card({ p }: { p: Project }) {
  const t = thumbTitle(p);
  return (
    <article className="card" data-cats={p.cats.join(' ')}>
      <div className={`thumb ${p.thumb}`}>
        <span className="tag-corner">{p.year}</span>
        <b>{t.pre}<i>{t.em}</i>{t.post}</b>
      </div>
      <div className="body flex flex-col gap-[13px] p-[26px_28px_28px] flex-1">
        <span className="flag">{p.kind}</span>
        <h3 className="font-serif-d">{p.title}</h3>
        <p className="text-[.93rem]" style={{ color: 'var(--muted)' }}>{p.description}</p>
        <div className="tags mt-[2px] flex flex-wrap gap-2">
          {p.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="mt-auto flex items-center gap-3 pt-[10px]">
          {p.linkHref ? (
            <a className="btn btn-ghost btn-sm" href={p.linkHref}>{p.linkLabel}</a>
          ) : (
            <span className="note text-[.8rem] italic" style={{ color: 'var(--faint)' }}>{p.note}</span>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  const [f, setF] = useState('all');
  const visible = projects.filter((p) => f === 'all' || p.cats.includes(f));
  return (
    <Section
      id="work" num="01" kicker="Selected work"
      title="Systems that run in production, not demos that run once."
      sub="Six builds across web, mobile, backend, AI and IoT — each one deployed, used, or graded."
    >
      <div className="filters mt-8 mb-[26px] flex flex-wrap gap-2.5">
        {filters.map((b) => (
          <button key={b.key} className={f === b.key ? 'active' : ''} onClick={() => setF(b.key)}>
            {b.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-[22px] lg:grid-cols-2">
        {visible.map((p) => (
          <Card key={p.title} p={p} />
        ))}
      </div>
    </Section>
  );
}
