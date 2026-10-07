import { useState, type ReactNode } from 'react';
import Section from './Section';
import { useLang } from '../i18n-data';
import { PROJECT_CATS, PROJECT_TAGS, PROJECT_THUMBS, thumbTitle } from '../i18n-data';

const filterKeys = ['all', 'web', 'mobile', 'backend', 'ai', 'iot'] as const;

const cardIds = ['odemlab', 'medical', 'fittrack', 'campus', 'summarizer', 'iot'];

// Readable line icons — one per project, drawn in the thumb's dossier language.
// Decorative only (aria-hidden at render site).
const MOTIFS: Record<string, ReactNode> = {
  odemlab: (<g><path d="M42 36h36l-3 44H45z" /><path d="M52 36v-6a8 8 0 0 1 16 0v6" /><path d="M94 20l1.8 4.6 4.6 1.8-4.6 1.8-1.8 4.6-1.8-4.6-4.6-1.8 4.6-1.8z" /></g>),
  medical: (<g><rect x="32" y="24" width="56" height="56" rx="5" /><path d="M46 17v11 M74 17v11 M32 39h56" /><path d="M50 58l9 9 19-21" /></g>),
  fittrack: (<g><path d="M10 44h100" /><rect x="20" y="32" width="9" height="24" /><rect x="33" y="37" width="7" height="14" /><rect x="80" y="37" width="7" height="14" /><rect x="91" y="32" width="9" height="24" /></g>),
  campus: (<g><rect x="10" y="12" width="26" height="26" /><rect x="18" y="20" width="10" height="10" /><rect x="84" y="12" width="26" height="26" /><rect x="92" y="20" width="10" height="10" /><rect x="10" y="52" width="26" height="26" /><rect x="18" y="60" width="10" height="10" /><rect x="86" y="52" width="12" height="12" /><rect x="86" y="68" width="12" height="12" /><rect x="102" y="52" width="8" height="8" /></g>),
  summarizer: (<g><path d="M38 6h32l18 18v58H38z" /><path d="M70 6v18h18" /><path d="M48 50h30 M48 60h20" /><circle cx="88" cy="58" r="4" /><path d="M74 54l8-2" /></g>),
  iot: (<g><rect x="42" y="26" width="36" height="36" rx="5" /><rect x="52" y="36" width="16" height="16" /><path d="M34 34h8 M34 44h8 M34 54h8 M78 34h8 M78 44h8 M78 54h8 M50 26v-8 M60 26v-8 M70 26v-8 M50 62v8 M60 62v8 M70 62v8" /></g>),
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
      <p className="note work-footnote">{t.work.walkthroughNote}</p>
    </Section>
  );
}

function Card({ p, th, i, cardId }: { p: { year: string; kind: string; title: string; description: string; result?: string; linkHref?: string; linkLabel?: string }; th: { pre: string; em: string; post: string }; i: number; cardId: string }) {
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
        {p.linkHref && (
          <div className="flex items-center gap-3 pt-1">
            <a className="btn btn-ghost btn-sm" href={p.linkHref} target="_blank" rel="noopener noreferrer">{p.linkLabel}<span className="arr">→</span></a>
          </div>
        )}
      </div>
    </article>
  );
}
