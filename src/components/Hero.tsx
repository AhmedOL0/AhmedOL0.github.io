import { useLang } from '../i18n-data';

export default function Hero() {
  const { t } = useLang();
  return (
    <section id="top" className="hero-block hero-block--top">
      <div className="hero-dot-grid" aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-content">
          <div className="hero-eyebrow"><span className="hero-eyebrow-dot" aria-hidden="true" />{t.hero.avail}</div>
          <div className="hero-title-row">
            <h1 className="hero-title font-serif-d">
              <span className="hero-title-a">{t.hero.titleA}</span>
              <em className="hero-title-em">{t.hero.titleEm}</em>
              <span className="hero-title-b">{t.hero.titleB}</span>
            </h1>
            <div className="hero-photo" aria-hidden="true">
              <img src="/assets/photo.jpg" alt="Ahmed Ouarrali portrait" width="120" height="120" loading="eager" fetchPriority="high" />
            </div>
          </div>
          <p className="hero-lede">{t.hero.lede}</p>
          <div className="hero-actions">
            <a className="btn btn-gold" href="#work">{t.hero.ctaWork}<span className="arr">&rarr;</span></a>
            <a className="btn btn-ghost" href="#contact">{t.hero.ctaContact}</a>
          </div>
        </div>

      </div>
    </section>
  );
}
