import { useState, type ReactNode } from 'react';
import Section from './Section';
import { useLang } from '../i18n-data';
import { PROJECT_CATS, PROJECT_TAGS, PROJECT_THUMBS, thumbTitle } from '../i18n-data';

const filterKeys = ['all', 'web', 'mobile', 'backend', 'ai', 'iot'] as const;

const cardIds = ['odemlab', 'medical', 'fittrack', 'campus', 'summarizer', 'iot'];

// Abstract dossier motifs — one per project, drawn in the thumb's line language.
// Decorative only (aria-hidden at render site); no screenshots needed.
const MOTIFS: Record<string, ReactNode> = {
  odemlab: (<g><polygon points="60,10 96,30 96,58 60,78 24,58 24,30" /><circle cx="60" cy="44" r="10" /><path d="M60 34v20M50 44h20" /></g>),
  medical: (<g><path d="M6,44 h22 l7,-16 l9,30 l7,-14 h19" /><path d="M96,26 h14 M103,19 v14" /></g>),
  fittrack: (<g><circle cx="34" cy="40" r="16" /><path d="M6,62 L34,28 L52,48 L78,20 L96,36 L114,24" /></g>),
  campus: (<g><rect x="10" y="14" width="24" height="24" /><rect x="16" y="20" width="12" height="12" /><rect x="86" y="14" width="24" height="24" /><rect x="92" y="20" width="12" height="12" /><rect x="10" y="52" width="24" height="24" /><path d="M48,52 h30 M48,64 h22 M86,52 h24 M86,64 h24" /></g>),
  summarizer: (<g><circle cx="26" cy="44" r="7" /><circle cx="72" cy="20" r="5" /><circle cx="78" cy="44" r="5" /><circle cx="72" cy="68" r="5" /><path d="M33,44 h26 M59,32 L67,23 M59,56 L67,65 M77,20 h18 M83,44 h16 M77,68 h18" /></g>),
  iot: (<g><circle cx="34" cy="44" r="3.5" /><path d="M22,32 a17,17 0 0 1 0,24 M46,32 a17,17 0 0 0 0,24 M14,24 a29,29 0 0 1 0,40 M54,24 a29,29 0 0 0 0,40 M84,30 h22 M95,19 v22" /></g>),
};

function ThumbMotif({ id }: { id: string }) {
  return (
    <svg className="thumb-motif" viewBox="0 0 120 88" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {MOTIFS[id]}
    </svg>
  );
}

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
          <button key={k} className={f === k ? 'active' : ''} aria-pressed={f === k} onClick={() => setF(k)}>
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
            <Card key={cardIds[i]} p={p} th={th} i={i} cardId={cardIds[i]} />
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
        <ThumbMotif id={cardId} />
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
