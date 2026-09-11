import { useState, useMemo, useCallback, useRef } from 'react';
import Section from './Section';
import { PROJECT_CATS, PROJECT_TAGS, PROJECT_THUMBS, thumbTitle, useLang } from '../i18n';

const filterKeys = ['all', 'web', 'mobile', 'backend', 'ai', 'iot'] as const;

export default function Work() {
  const { t } = useLang();
  const [f, setF] = useState<string>('all');
  const labels: Record<string, string> = {
    all: t.filters.all, web: t.filters.web, mobile: t.filters.mobile,
    backend: t.filters.backend, ai: t.filters.ai, iot: t.filters.iot,
  };
  const isCoarse = useMemo(() => window.matchMedia('(pointer:coarse)').matches, []);
  const prefersReduced = useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const skipTilt = isCoarse || prefersReduced;

  return (
    <Section id="work" num="01" kicker={t.work.kicker} title={t.work.title} sub={t.work.sub} variant="default">
      <div className="filters mt-8 mb-[26px] flex flex-wrap gap-2.5">
        {filterKeys.map((k) => (
          <button key={k} className={f === k ? 'active' : ''} aria-pressed={f === k} onClick={() => setF(k)}>
            {labels[k]}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-[22px] lg:grid-cols-2">
        {t.work.projects.map((p, i) => {
          if (f !== 'all' && !PROJECT_CATS[i].includes(f)) return null;
          const th = thumbTitle(p);
          return (
            <Card key={f + p.title} p={p} th={th} i={i} skipTilt={skipTilt} />
          );
        })}
      </div>
    </Section>
  );
}

function Card({ p, th, i, skipTilt }: { p: { year: string; kind: string; title: string; description: string; note?: string; linkHref?: string; linkLabel?: string }; th: { pre: string; em: string; post: string }; i: number; skipTilt: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((e: React.MouseEvent) => {
    if (skipTilt) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - r.left) / r.width - 0.5;
    const dy = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(950px) rotateX(${(-dy * 5).toFixed(2)}deg) rotateY(${(dx * 6).toFixed(2)}deg) translateY(-5px)`;
  }, [skipTilt]);

  const handleLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = '';
  }, []);

  return (
    <article
      ref={ref}
      className="card rise" style={{ animationDelay: `${Math.min(i, 5) * 90}ms` }}
      onAnimationEnd={(e) => { e.currentTarget.classList.remove('rise'); }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div className={`thumb ${PROJECT_THUMBS[i]}`}>
        <span className="tag-corner">{p.year}</span>
        <b>{th.pre}<i>{th.em}</i>{th.post}</b>
      </div>
      <div className="body flex flex-col gap-2.5 p-[26px_28px_28px] flex-1">
        <span className="flag">{p.kind}</span>
        <h3 className="font-serif-d">{p.title}</h3>
        <p className="text-[.93rem] leading-relaxed" style={{ color: 'var(--muted)' }}>{p.description}</p>
        <div className="tags flex flex-wrap gap-2">
          {PROJECT_TAGS[i].map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="mt-auto flex items-center gap-3 pt-1">
          {p.linkHref ? (
            <a className="btn btn-ghost btn-sm" href={p.linkHref}>{p.linkLabel}<span className="arr">→</span></a>
          ) : (
            <span className="note text-[.8rem] italic" style={{ color: 'var(--faint)' }}>{p.note}</span>
          )}
        </div>
      </div>
    </article>
  );
}
