import { useEffect, useRef, useState, type ReactNode, type TouchEvent } from 'react';
import Section from './Section';
import ProjectDialog from './ProjectDialog';
import { useLang } from '../i18n-data';
import { PROJECT_CATS, PROJECT_GALLERIES, PROJECT_TAGS, PROJECT_THUMBS, thumbTitle, type ProjectGalleryImageT } from '../i18n-data';

const filterKeys = ['all', 'web', 'mobile', 'backend', 'ai', 'iot'] as const;

const cardIds = ['odemlab', 'procure', 'medical', 'fittrack', 'campus', 'summarizer', 'iot'];
const caseSlugs = ['odemlab', 'procureflow', 'medical', 'fittrack', 'smart-campus', 'smart-summarizer', 'iot'];

// Readable line icons: one per project, drawn in the thumb's dossier language.
// Decorative only (aria-hidden at render site).
const MOTIFS: Record<string, ReactNode> = {
  odemlab: (<g><path d="M42 36h36l-3 44H45z" /><path d="M52 36v-6a8 8 0 0 1 16 0v6" /><path d="M94 20l1.8 4.6 4.6 1.8-4.6 1.8-1.8 4.6-1.8-4.6-4.6-1.8 4.6-1.8z" /></g>),
  procure: (<g><rect x="34" y="14" width="42" height="62" rx="4" /><path d="M48 10h14v8H48z" /><path d="M44 36h22 M44 46h22 M44 56h12" /><circle cx="88" cy="62" r="11" /><path d="M83 62l4 4 7-8" /></g>),
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
  const [f, setF] = useState<(typeof filterKeys)[number]>('all');
  const [openProject, setOpenProject] = useState<number | null>(null);
  const fromPageRef = useRef(false);
  const labels: Record<(typeof filterKeys)[number], string> = {
    all: t.filters.all, web: t.filters.web, mobile: t.filters.mobile,
    backend: t.filters.backend, ai: t.filters.ai, iot: t.filters.iot,
  };
  const counts = filterKeys.reduce<Record<(typeof filterKeys)[number], number>>((acc, key) => {
    acc[key] = key === 'all'
      ? t.work.projects.length
      : t.work.projects.filter((_, i) => PROJECT_CATS[i].includes(key)).length;
    return acc;
  }, {} as Record<(typeof filterKeys)[number], number>);
  const filteredCount = counts[f];
  const countLabel = (filteredCount === 1 ? t.work.filterCountOne : t.work.filterCount)
    .replace('{count}', String(filteredCount))
    .replace('{total}', String(t.work.projects.length));
  const galleryOrder = t.work.projects.map((_, i) => i).filter((i) => PROJECT_GALLERIES[i].length > 0);
  const openPosition = openProject === null ? -1 : galleryOrder.indexOf(openProject);

  const openCaseStudy = (index: number) => {
    const slug = caseSlugs[index];
    fromPageRef.current = true;
    if (window.location.hash !== `#case-${slug}`) {
      window.history.pushState({ caseStudy: slug, fromPage: true }, '', `#case-${slug}`);
    }
    setOpenProject(index);
  };

  const moveProject = (delta: number) => {
    if (openPosition < 0) return;
    const next = galleryOrder[(openPosition + delta + galleryOrder.length) % galleryOrder.length];
    window.history.replaceState({ caseStudy: caseSlugs[next], fromPage: fromPageRef.current }, '', `#case-${caseSlugs[next]}`);
    setOpenProject(next);
  };

  const closeProject = () => {
    if (fromPageRef.current) {
      fromPageRef.current = false;
      setOpenProject(null);
      window.history.back();
      return;
    }
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    setOpenProject(null);
  };

  useEffect(() => {
    const syncFromHash = () => {
      const match = window.location.hash.match(/^#case-([a-z0-9-]+)$/i);
      const index = match ? caseSlugs.indexOf(match[1]) : -1;
      if (index >= 0 && PROJECT_GALLERIES[index].length > 0) {
        setOpenProject(index);
      } else {
        setOpenProject(null);
        fromPageRef.current = false;
      }
    };
    syncFromHash();
    window.addEventListener('popstate', syncFromHash);
    window.addEventListener('hashchange', syncFromHash);
    return () => {
      window.removeEventListener('popstate', syncFromHash);
      window.removeEventListener('hashchange', syncFromHash);
    };
  }, []);

  useEffect(() => {
    const opened = new Set<HTMLDetailsElement>();
    const openNotes = () => {
      document.querySelectorAll<HTMLDetailsElement>('#work details.case-notes').forEach((el) => {
        if (!el.open) {
          el.open = true;
          opened.add(el);
        }
      });
    };
    const restoreNotes = () => {
      opened.forEach((el) => { el.open = false; });
      opened.clear();
    };
    const printMedia = window.matchMedia('print');
    const onPrintChange = () => {
      if (printMedia.matches) openNotes();
      else restoreNotes();
    };
    window.addEventListener('beforeprint', openNotes);
    window.addEventListener('afterprint', restoreNotes);
    printMedia.addEventListener('change', onPrintChange);
    return () => {
      window.removeEventListener('beforeprint', openNotes);
      window.removeEventListener('afterprint', restoreNotes);
      printMedia.removeEventListener('change', onPrintChange);
    };
  }, []);

  return (
    <Section id="work" num="03" kicker={t.work.kicker} title={t.work.title} sub={t.work.sub} variant="default">
      <div className="filter-row mt-5 sm:mt-8 mb-3 sm:mb-[26px]">
        <div className="filters flex flex-wrap gap-1.5 sm:gap-2.5" role="group" aria-label={t.work.filterGroup}>
          {filterKeys.map((k) => (
            <button
              key={k}
              className={f === k ? 'active' : ''}
              aria-pressed={f === k}
              aria-controls="work-grid"
              onClick={() => setF(k)}
            >
              <span>{labels[k]}</span><span className="filter-count">{counts[k]}</span>
            </button>
          ))}
        </div>
        <p className="filter-status" role="status" aria-atomic="true">{countLabel}</p>
      </div>
      <div id="work-grid" className="grid grid-cols-1 gap-4 sm:gap-[22px] lg:grid-cols-2">
        {t.work.projects.map((p, i) => {
          if (f !== 'all' && !PROJECT_CATS[i].includes(f)) return null;
          const th = thumbTitle(p);
          return (
            <Card
              key={cardIds[i]}
              p={p}
              th={th}
              i={i}
              cardId={cardIds[i]}
              gallery={PROJECT_GALLERIES[i]}
              onExplore={() => openCaseStudy(i)}
              featured={i === 0}
            />
          );
        })}
      </div>
      <p className="note work-footnote">{t.work.walkthroughNote}</p>
      {openProject !== null && (
        <ProjectDialog
          project={t.work.projects[openProject]}
          gallery={PROJECT_GALLERIES[openProject]}
          tags={PROJECT_TAGS[openProject]}
          position={openPosition}
          total={galleryOrder.length}
          onPrev={() => moveProject(-1)}
          onNext={() => moveProject(1)}
          onClose={closeProject}
        />
      )}
    </Section>
  );
}

function Card({ p, th, i, cardId, gallery, onExplore, featured = false }: { p: { year: string; kind: string; title: string; description: string; highlight: string; result?: string; linkHref?: string; linkLabel?: string; cardRole?: string }; th: { pre: string; em: string; post: string }; i: number; cardId: string; gallery: ProjectGalleryImageT[]; onExplore: () => void; featured?: boolean }) {
  const { t, lang } = useLang();
  const [tagsExpanded, setTagsExpanded] = useState(false);
  const [shotIndex, setShotIndex] = useState(0);
  const touchRef = useRef<{ x: number; y: number } | null>(null);
  const changeShot = (delta: number) => {
    if (gallery.length < 2) return;
    setShotIndex((prev) => (prev + delta + gallery.length) % gallery.length);
  };
  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest('button')) return;
    const touch = event.touches[0];
    touchRef.current = { x: touch.clientX, y: touch.clientY };
  };
  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchRef.current;
    touchRef.current = null;
    if (!start || gallery.length < 2) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      changeShot(dx < 0 ? 1 : -1);
    }
  };

  return (
    <article
      id={`work-${cardId}`}
      className={`card rise${featured ? ' card--featured' : ''}`} style={{ animationDelay: `${Math.min(i, 5) * 90}ms` }}
      onAnimationEnd={(e) => { e.currentTarget.classList.remove('rise'); }}
    >
      <div className={`thumb ${PROJECT_THUMBS[i]}${gallery.length > 0 ? ' thumb--image thumb--carousel' : ''}`} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {gallery.length > 0 ? (
          <>
            <img className="thumb-bg" src={gallery[shotIndex].src} alt="" aria-hidden="true" loading="lazy" decoding="async" />
            <div className="thumb-stage">
              <img
                key={gallery[shotIndex].src}
                className="thumb-img"
                src={gallery[shotIndex].src}
                width={gallery[shotIndex].width}
                height={gallery[shotIndex].height}
                alt={gallery[shotIndex].alt[lang]}
                loading="lazy"
                decoding="async"
              />
            </div>
            {gallery.length > 1 && (
              <>
                <button type="button" className="thumb-nav thumb-nav--prev" onClick={() => changeShot(-1)} aria-label={t.work.previousScreen}>
                  <span aria-hidden="true">&larr;</span>
                </button>
                <button type="button" className="thumb-nav thumb-nav--next" onClick={() => changeShot(1)} aria-label={t.work.nextScreen}>
                  <span aria-hidden="true">&rarr;</span>
                </button>
                <div className="thumb-dots" role="group" aria-label={t.work.screensLabel}>
                  {gallery.map((shot, index) => (
                    <button
                      key={shot.src}
                      type="button"
                      className={`thumb-dot${index === shotIndex ? ' active' : ''}`}
                      aria-label={`${index + 1} / ${gallery.length}: ${shot.label[lang]}`}
                      aria-current={index === shotIndex ? 'true' : undefined}
                      onClick={() => setShotIndex(index)}
                    >
                      <span aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </>
            )}
            <span className="thumb-count" aria-live="polite">
              <span className="thumb-count-label">{gallery[shotIndex].label[lang]}</span>
              <span className="thumb-count-index">{String(shotIndex + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}</span>
            </span>
          </>
        ) : (
          <>
            <ThumbMotif id={cardId} />
            <b>{th.pre}<i>{th.em}</i>{th.post}</b>
          </>
        )}
        <span className="tag-corner">{p.year}</span>
      </div>
      <div className="body flex flex-col gap-1.5 p-3.5 sm:p-[20px_22px_22px] flex-1">
        {featured && <span className="card-featured-label">{t.work.featured}</span>}
        <span className="flag">{p.kind}</span>
        <h3 className="font-serif-d">{p.title}</h3>
        {p.cardRole && (
          <p className="card-role"><span>{t.work.roleLabel}</span>{p.cardRole}</p>
        )}
        <p className="text-[.9rem] leading-[1.65]" style={{ color: 'var(--muted)' }}>{p.description}</p>
        {p.result && (
          <p className="result text-[.82rem] font-medium" style={{ color: 'var(--gold)' }}>
            <span className="result-label">{t.work.outcomeLabel}</span>{p.result}
          </p>
        )}
        <details className="case-notes">
          <summary>{t.work.notesSummary}</summary>
          <div className="engineering-highlight">
            <p className="eh-label">{t.work.approachLabel}</p>
            <p className="eh-text">{p.highlight}</p>
          </div>
        </details>
        <div className="tags flex flex-wrap gap-1.5 mt-1">
          {PROJECT_TAGS[i].slice(0, tagsExpanded ? undefined : 6).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
          {PROJECT_TAGS[i].length > 6 && (
            <button
              className="tag-more"
              type="button"
              aria-expanded={tagsExpanded}
              aria-label={tagsExpanded ? t.work.showFewer : t.work.showMoreTags.replace('{count}', String(PROJECT_TAGS[i].length - 6))}
              onClick={() => setTagsExpanded((v) => !v)}
            >
              {tagsExpanded ? t.work.showLess : `+${PROJECT_TAGS[i].length - 6}`}
            </button>
          )}
        </div>
        {(gallery.length > 0 || p.linkHref) && (
          <div className="card-actions">
            {gallery.length > 0 && (
              <button type="button" className="explore-project" aria-haspopup="dialog" onClick={onExplore}>
                {t.work.explore}<span aria-hidden="true">+</span>
              </button>
            )}
            {p.linkHref && (
              <a className="btn btn-ghost btn-sm" href={p.linkHref} target="_blank" rel="noopener noreferrer">
                {p.linkLabel}<span className="arr">&rarr;</span>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
