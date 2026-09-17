import { useLang } from '../i18n-data';

export default function Hero() {
  const { t } = useLang();
  return (
    <section id="top" className="hero-block hero-block--top">
      <div className="hero-dot-grid" aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-content">
          <div className="hero-eyebrow"><span className="hero-eyebrow-dot" aria-hidden="true" />{t.hero.avail}</div>
          <h1 className="hero-title font-serif-d">
            <span className="hero-title-a">{t.hero.titleA}</span>
            <em className="hero-title-em">{t.hero.titleEm}</em>
            <span className="hero-title-b">{t.hero.titleB}</span>
          </h1>
          <p className="hero-lede">{t.hero.lede}</p>
          <div className="hero-actions">
            <a className="btn btn-gold" href="#work">{t.hero.ctaWork}<span className="arr">&rarr;</span></a>
            <a className="btn btn-ghost" href="#contact">{t.hero.ctaContact}</a>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-orbit" />
          <div className="hero-photo-lg">
            <img src="/assets/photo.jpg" alt="Ahmed Ouarrali portrait" width="260" height="260" loading="eager" fetchPriority="high" />
          </div>
          <div className="hero-float hero-float--tl">
            <span className="hero-float-ic">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            </span>
            <span className="hero-float-tx">{t.hero.floatDev}</span>
          </div>
          <div className="hero-float hero-float--tr">
            <span className="hero-float-ic">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/></svg>
            </span>
            <span className="hero-float-tx">{t.hero.floatProblem}</span>
          </div>
          <div className="hero-float hero-float--bl">
            <span className="hero-float-ic">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </span>
            <span className="hero-float-tx">{t.hero.floatTeam}</span>
          </div>
          <div className="hero-float hero-float--br">
            <span className="hero-float-ic">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
            </span>
            <span className="hero-float-tx">{t.hero.floatImpact}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
