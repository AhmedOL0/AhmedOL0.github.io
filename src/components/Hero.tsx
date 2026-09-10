import { useState } from 'react';
import { useLang } from '../i18n';
import { useReveal } from '../hooks';

const core = ['Java 21 / Spring Boot', 'TypeScript / Next.js', 'React Native / Flutter', 'PostgreSQL', 'Docker', 'Python'];

function ProfileCard() {
  const { t } = useLang();
  const [imgOk, setImgOk] = useState(true);
  return (
    <aside className="pcard ml-auto w-full max-w-[330px]">
      <div className="pphoto">
        {imgOk ? (
          <img
            src="assets/photo.jpg"
            alt="Portrait of Ahmed Ouarrali, Full-Stack Software Engineer"
            fetchPriority="high"
            onError={() => setImgOk(false)}
          />
        ) : (
          <div className="pmono"><span>AO</span></div>
        )}
      </div>
      <h3 className="font-serif-d">Ahmed Ouarrali</h3>
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
  return (
    <header id="top" ref={ref} className="relative pt-[110px] pb-[60px]">
      <div className="mx-auto grid max-w-[1120px] grid-cols-1 items-center gap-12 px-7 lg:grid-cols-[1.45fr_.95fr]">
        <div>
          <span className="rise mb-7 inline-flex items-center gap-2 rounded-full border px-4 py-[7px] text-[.79rem] tracking-[.03em]"
            style={{ color: 'var(--muted)', borderColor: 'var(--line)', background: 'rgba(127,120,100,.08)', animationDelay: '.05s' }}>
            <span className="dot" /> {t.hero.badge}
          </span>
          <h1 className="rise h-display text-[clamp(2.8rem,6.4vw,4.8rem)] max-w-[16ch]" style={{ animationDelay: '.15s' }}>
            {t.hero.titleA}<em className="grad-text">{t.hero.titleEm}</em>{t.hero.titleB}
          </h1>
          <p className="rise lede mt-6 max-w-[60ch] text-[1.06rem]" style={{ color: 'var(--muted)', animationDelay: '.28s' }}>
            {t.hero.lede1}<strong style={{ color: 'var(--ink)' }}>OdemLab</strong>{t.hero.lede2}
          </p>
          <div className="rise cta mt-8 flex flex-wrap gap-3.5" style={{ animationDelay: '.4s' }}>
            <a className="btn btn-gold" href="#work">{t.hero.ctaWork}</a>
            <a className="btn btn-ghost" href="#contact">{t.hero.ctaContact}</a>
          </div>
          <div className="rise core mt-11 flex flex-wrap gap-2.5" style={{ animationDelay: '.52s' }}>
            {core.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
        </div>
        <div className="rise" style={{ animationDelay: '.3s' }}><ProfileCard /></div>
      </div>
    </header>
  );
}
