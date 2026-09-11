import { useState } from 'react';
import { useLang } from '../i18n';
import { useReveal, useScrollY, useCountUp, useInView } from '../hooks';

const calm = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const core = [
  { name: 'Java 21 · Spring Boot 3.5', tip: 'Backend APIs, security, caching, scheduling', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6H7v-2h2V7c0-1.66 1.34-3 3-3h2v2h-2c-.55 0-1 .45-1 1v3h3l-1 6z' },
  { name: 'TypeScript · Next.js 16', tip: 'SSR/ISR storefront, App Router, Tailwind', icon: 'M3 3h18v18H3V3zm2.5 5v8h2.2v-3.1H12V13h2.3V8h-2.3V6.1H9.5V8H7.2zm8.5 0v2.2h3.3v2.6h-3.3V15H18V8h-2.3z' },
  { name: 'React Native · Expo', tip: 'Cross-platform mobile (iOS + Android)', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7v-2z' },
  { name: 'PostgreSQL 18 · Redis 7', tip: 'Relational DB + distributed cache & rate limits', icon: 'M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4zm0 2c3.87 0 6 1.5 6 2s-2.13 2-6 2-6-1.5-6-2 2.13-2 6-2zM6 9c0 .5 2.13 2 6 2s6-1.5 6-2v2c0 .5-2.13 2-6 2s-6-1.5-6-2V9zm0 4c0 .5 2.13 2 6 2s6-1.5 6-2v2c0 .5-2.13 2-6 2s-6-1.5-6-2v-2z' },
  { name: 'Docker · GitHub Actions', tip: 'CI/CD pipeline, GHCR images, Cloud Run deploys', icon: 'M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4zm10 16H4V8h16v12z' },
  { name: 'Google Cloud Run', tip: 'Serverless containers, zero-traffic deploys', icon: 'M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z' },
];

const stats = [
  { value: 6, suffix: '+', label: 'Projects shipped' },
  { value: 22, suffix: '', label: 'Technologies' },
  { value: 3, suffix: '', label: 'Platforms' },
  { value: 1, suffix: '', label: 'PFE internship' },
];

function StatItem({ target, suffix, label, inView }: { target: number; suffix: string; label: string; inView: boolean }) {
  const val = useCountUp(target, inView, 1400);
  const show = calm || inView;
  return (
    <div className="hero-stat">
      <span className="hero-stat-val font-serif-d" style={{ opacity: show ? 1 : 0, transition: 'opacity .3s' }}>{val}{suffix}</span>
      <span className="hero-stat-label">{label}</span>
    </div>
  );
}

function ProfileCard() {
  const { t } = useLang();
  const [imgOk, setImgOk] = useState(true);
  const [loaded, setLoaded] = useState(false);
  return (
    <aside className="pcard ml-auto w-full max-w-[380px]">
      <div className="pphoto">
        {imgOk ? (
          <img
            src="assets/photo.jpg"
            alt="Portrait of Ahmed Ouarrali, Full-Stack Software Engineer"
            width={537}
            height={537}
            fetchPriority="high"
            onLoad={() => setLoaded(true)}
            onError={() => setImgOk(false)}
            style={{ opacity: loaded ? 1 : 0, transition: 'opacity .9s ease, filter .4s' }}
          />
        ) : (
          <div className="pmono"><span>AO</span></div>
        )}
      </div>
      <h2 className="font-serif-d">Ahmed Ouarrali</h2>
      <p className="prole">{t.hero.cardRole}</p>
      <p className="ploc">Morocco · GMT+1</p>
      <div className="pdiv" />
      <p className="ptech-title">{t.hero.cardTech}</p>
      <div className="pchips">
        {['Spring Boot', 'TypeScript', 'Next.js', 'React Native', 'Python', 'PostgreSQL'].map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>
    </aside>
  );
}

export default function Hero() {
  const { t } = useLang();
  const ref = useReveal<HTMLElement>();
  const statsRef = useInView<HTMLDivElement>(0.3);
  const y = useScrollY();
  const calm =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fade = calm ? {} : { opacity: Math.max(0, 1 - y / 750), transform: `translateY(${y * 0.14}px)` };
  return (
    <header id="top" ref={ref} className="relative pt-[110px] pb-[60px]">
      <div className="hero-orb" aria-hidden="true" />
      <div className="hero-orb hero-orb-2" aria-hidden="true" />
      <div className="hero-dot-grid" aria-hidden="true" />
      <div className="mx-auto grid max-w-[1120px] grid-cols-1 items-center gap-12 px-7 lg:grid-cols-[1.45fr_.95fr]" style={fade}>
        <div>
          <span className="rise mb-7 inline-flex items-center gap-2 rounded-full border px-4 py-[7px] text-[.79rem] tracking-[.03em]"
            style={{ color: 'var(--muted)', borderColor: 'var(--line)', background: 'rgba(127,120,100,.08)', animationDelay: '.05s' }}>
            <span className="beacon" /> {t.hero.badge}
          </span>
          <h1 className="rise h-display text-[clamp(2.8rem,6.4vw,4.8rem)] max-w-[16ch]" style={{ animationDelay: '.15s' }}>
            {t.hero.titleA}<em className="grad-text">{t.hero.titleEm}</em>{t.hero.titleB}
          </h1>
          <p className="rise lede mt-6 max-w-[60ch] text-[1.06rem]" style={{ color: 'var(--muted)', animationDelay: '.28s' }}>
            {t.hero.lede1}<strong style={{ color: 'var(--ink)' }}>OdemLab</strong>{t.hero.lede2}
          </p>
          <div className="rise cta mt-8 flex flex-wrap gap-3.5" style={{ animationDelay: '.4s' }}>
            <a className="btn btn-gold" data-magnetic href="#work">{t.hero.ctaWork}<span className="arr">→</span></a>
            <a className="btn btn-ghost" data-magnetic href="#contact">{t.hero.ctaContact}<span className="arr">→</span></a>
          </div>
          <div className="rise hero-stats mt-10 grid grid-cols-4 gap-4" ref={statsRef.ref} style={{ animationDelay: '.48s' }}>
            {stats.map((s) => (
              <StatItem key={s.label} target={s.value} suffix={s.suffix} label={s.label} inView={statsRef.inView} />
            ))}
          </div>
          <div className="rise core mt-8 flex flex-wrap gap-2" style={{ animationDelay: '.56s' }}>
            {core.map((c) => (
              <span key={c.name} className="core-chip" title={c.tip}>
                <svg className="core-chip-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={c.icon} /></svg>
                {c.name}
              </span>
            ))}
          </div>
          <a href="#tools" className="rise hero-view-all" style={{ animationDelay: '.62s' }}>
            View all 22 technologies <span className="arr">→</span>
          </a>
          <a href="#work" className="rise scroll-cue" style={{ animationDelay: '.7s' }} aria-hidden="true" tabIndex={-1}><i /></a>
        </div>
        <div className="rise" style={{ animationDelay: '.3s' }}><ProfileCard /></div>
      </div>
    </header>
  );
}
