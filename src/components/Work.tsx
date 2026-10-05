import { useState } from 'react';
import Section from './Section';
import { useLang } from '../i18n-data';
import { PROJECT_CATS, PROJECT_TAGS, PROJECT_THUMBS, thumbTitle } from '../i18n-data';

const filterKeys = ['all', 'web', 'mobile', 'backend', 'ai', 'iot'] as const;

const cardIds = ['odemlab', 'medical', 'fittrack', 'campus', 'summarizer', 'iot'];

export default function Work() {
  const { t } = useLang();
  const [f, setF] = useState<string>('all');
  const labels: Record<string, string> = {
    all: t.filters.all, web: t.filters.web, mobile: t.filters.mobile,
    backend: t.filters.backend, ai: t.filters.ai, iot: t.filters.iot,
  };

  const filteredCount = t.work.projects.filter((_, i) => f === 'all' || PROJECT_CATS[i].includes(f)).length;

  return (
    <Section id="work" num="03" kicker={t.work.kicker} title={t.work.title} sub={t.work.sub} variant="default">
      <div className="filters mt-5 sm:mt-8 mb-3 sm:mb-[26px] flex flex-wrap gap-1.5 sm:gap-2.5">
        {filterKeys.map((k) => (
          <button key={k} className={`tip${f === k ? ' active' : ''}`} data-tip={labels[k]} aria-pressed={f === k} onClick={() => setF(k)}>
            {labels[k]}
          </button>
        ))}
      </div>
      <div aria-live="polite" className="sr-only">
        {t.work.filterCount.replace('{count}', String(filteredCount)).replace('{total}', String(t.work.projects.length))}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:gap-[22px] lg:grid-cols-2">
        {t.work.projects.map((p, i) => {
          if (f !== 'all' && !PROJECT_CATS[i].includes(f)) return null;
          const th = thumbTitle(p);
          return (
            <Card key={f + p.title} p={p} th={th} i={i} cardId={cardIds[i]} />
          );
        })}
      </div>
    </Section>
  );
}

function Card({ p, th, i, cardId }: { p: { year: string; kind: string; title: string; description: string; result?: string; note?: string; linkHref?: string; linkLabel?: string }; th: { pre: string; em: string; post: string }; i: number; cardId: string }) {
  const { t } = useLang();
  const [tagsExpanded, setTagsExpanded] = useState(false);

  return (
    <article
      id={`work-${cardId}`}
      className="card rise" style={{ animationDelay: `${Math.min(i, 5) * 90}ms` }}
      onAnimationEnd={(e) => { e.currentTarget.classList.remove('rise'); }}
    >
      <div className={`thumb ${PROJECT_THUMBS[i]}`}>
        <span className="tag-corner">{p.year}</span>
        <b>{th.pre}<i>{th.em}</i>{th.post}</b>
      </div>
      <div className="body flex flex-col gap-1.5 p-3.5 sm:p-[20px_22px_22px] flex-1">
        <span className="flag">{p.kind}</span>
        <h3 className="font-serif-d">{p.title}</h3>
        <p className="text-[.86rem] leading-[1.6]" style={{ color: 'var(--muted)' }}>{p.description}</p>
        {p.result && <p className="result text-[.82rem] font-medium" style={{ color: 'var(--gold)' }}>{p.result}</p>}
        <div className="tags flex flex-wrap gap-1.5 mt-1">
          {PROJECT_TAGS[i].slice(0, tagsExpanded ? undefined : 6).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
          {!tagsExpanded && PROJECT_TAGS[i].length > 6 && (
            <button className="tag-more" type="button" aria-expanded={false} aria-label={`+${PROJECT_TAGS[i].length - 6}`} onClick={() => setTagsExpanded(true)}>
              +{PROJECT_TAGS[i].length - 6}
            </button>
          )}
          {tagsExpanded && PROJECT_TAGS[i].length > 6 && (
            <button className="tag-more" type="button" aria-expanded={true} aria-label={t.work.showFewer} onClick={() => setTagsExpanded(false)}>
              {t.work.showLess}
            </button>
          )}
        </div>
        <div className="flex items-center gap-3 pt-1">
          {p.linkHref ? (
            <a className="btn btn-ghost btn-sm" href={p.linkHref}>{p.linkLabel}<span className="arr">→</span></a>
          ) : (
            <span className="note text-[.78rem] italic" style={{ color: 'var(--faint)' }}>{p.note}</span>
          )}
        </div>
      </div>
    </article>
  );
}
