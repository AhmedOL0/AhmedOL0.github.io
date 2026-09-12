import { useState } from 'react';
import { useLang } from '../i18n';
import { useReveal, useScrollY, useCountUp, useInView } from '../hooks';
import TechIcon from './TechIcon';
import Typewriter from './Typewriter';

const calm = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const typewriterWords = ['Full-Stack Engineer', 'Spring Boot · Next.js', 'React Native · Expo', 'PostgreSQL · Redis', 'Docker · Cloud Run'];

const core = [
  { name: 'Java 21 · Spring Boot 3.5', tip: 'Backend APIs, security, caching, scheduling', icon: 'springboot' },
  { name: 'TypeScript · Next.js 16', tip: 'SSR/ISR storefront, App Router, Tailwind', icon: 'nextjs' },
  { name: 'React Native · Expo', tip: 'Cross-platform mobile (iOS + Android)', icon: 'expo' },
  { name: 'PostgreSQL 18 · Redis 7', tip: 'Relational DB + distributed cache & rate limits', icon: 'postgresql' },
  { name: 'Docker · GitHub Actions', tip: 'CI/CD pipeline, GHCR images, Cloud Run deploys', icon: 'docker' },
  { name: 'Google Cloud Run', tip: 'Serverless containers, zero-traffic deploys', icon: 'googlecloud' },
];

const statValues: { value: number; suffix: string }[] = [
  { value: 6, suffix: '+' },
  { value: 3, suffix: '' },
  { value: 4, suffix: '' },
  { value: 93, suffix: '' },
];

function StatItem({ target, suffix, label, sub, inView }: { target: number; suffix: string; label: string; sub: string; inView: boolean }) {
  const [pop, setPop] = useState(false);
  const val = useCountUp(target, inView, 1400, () => { setPop(true); setTimeout(() => setPop(false), 400); });
  const show = calm || inView;
  return (
    <div className="hero-stat">
      <span className={`hero-stat-val font-serif-d${pop ? ' pop' : ''}`} style={{ opacity: show ? 1 : 0, transition: 'opacity .3s' }}>{val}{suffix}</span>
      <span className="hero-stat-label">{label}</span>
      {sub && <span className="hero-stat-sub">{sub}</span>}
    </div>
  );
}

function ProfileCard() {
  const { t } = useLang();
  const [imgOk, setImgOk] = useState(true);
  const [loaded, setLoaded] = useState(false);
  return (
    <aside className="pcard mx-auto sm:ml-auto w-full max-w-[380px]">
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
  const fade = calm ? {} : { opacity: Math.max(0, 1 - y / 750), transform: `translateY(${y * 0.14}px)` };
  return (
    <header id="top" ref={ref} className="relative pt-[56px] pb-[20px] sm:pt-[110px] sm:pb-[50px]">
      <div className="hero-orb" aria-hidden="true" />
      <div className="hero-orb hero-orb-2" aria-hidden="true" />
      <div className="hero-dot-grid" aria-hidden="true" />
      <div className="mx-auto grid max-w-[1120px] grid-cols-1 items-center gap-6 sm:gap-10 px-5 sm:px-7 lg:grid-cols-[1.45fr_.95fr]" style={fade}>
        <div>
          <span className="rise mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-[6px] sm:px-4 sm:py-[7px] text-[.72rem] sm:text-[.79rem] tracking-[.03em]"
            style={{ color: 'var(--muted)', borderColor: 'var(--line)', background: 'rgba(127,120,100,.08)', animationDelay: '.05s' }}>
            <span className="beacon" /> {t.hero.badge}
          </span>
          <h1 className="rise h-display text-[clamp(1.8rem,5.5vw,4.5rem)] max-w-[16ch] sm:max-w-[18ch]" style={{ animationDelay: '.15s' }}>
            {t.hero.titleA}<em className="grad-text">{t.hero.titleEm}</em>{t.hero.titleB}
          </h1>
          <p className="rise lede mt-4 sm:mt-5 max-w-[56ch] text-[.88rem] sm:text-[1.02rem]" style={{ color: 'var(--muted)', animationDelay: '.28s' }}>
            {t.hero.lede1}<strong style={{ color: 'var(--ink)' }}>OdemLab</strong>{t.hero.lede2}
          </p>
          <div className="rise mt-3 sm:mt-4" style={{ animationDelay: '.35s' }}>
            <Typewriter words={typewriterWords} />
          </div>
          <div className="rise cta mt-5 sm:mt-7 flex flex-row flex-wrap gap-2.5 sm:gap-3" style={{ animationDelay: '.4s' }}>
            <a className="btn btn-gold tip" data-tip={t.hero.ctaWork} data-magnetic href="#work">{t.hero.ctaWork}<span className="arr">→</span></a>
            <a className="btn btn-ghost tip" data-tip={t.hero.ctaContact} data-magnetic href="#contact">{t.hero.ctaContact}<span className="arr">→</span></a>
          </div>
          <div className="rise hero-stats mt-6 sm:mt-8 grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-4" ref={statsRef.ref} style={{ animationDelay: '.48s' }}>
            {statValues.map((s, i) => (
              <StatItem key={i} target={s.value} suffix={s.suffix} label={t.hero.statsLabels[i]} sub={t.hero.statsSub[i]} inView={statsRef.inView} />
            ))}
          </div>
          <div className="rise core mt-5 sm:mt-6 flex flex-wrap gap-1.5 sm:gap-2" style={{ animationDelay: '.56s' }}>
            {core.map((c) => (
              <span key={c.name} className="core-chip tip" data-tip={c.tip}>
                <TechIcon name={c.icon} className="core-chip-icon" />
                {c.name}
              </span>
            ))}
          </div>
        </div>
        <div className="rise" style={{ animationDelay: '.3s' }}><ProfileCard /></div>
      </div>
    </header>
  );
}
