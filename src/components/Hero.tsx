import { useLang } from '../i18n-data';

function Fingerprint() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <path d="M24 6C15 6 8 14.5 8 24c0 9.5 7 18 16 18 9 0 16-8.5 16-18C40 14.5 33 6 24 6Z" />
      <path d="M24 12c-6.5 0-11.5 6-11.5 13 0 6.5 4 12 9.5 13.5" />
      <path d="M24 16c-5 0-8.5 4-8.5 9 0 5.5 3.5 9.8 8 11" />
      <path d="M24 20c-3 0-5.2 2.5-5.2 5.5 0 3.3 2.2 6 5.2 6.8" />
      <path d="M25.5 26c-1.2-.8-1.5-2.3-.7-3.2.8-.9 2.3-.7 2.9.5.6 1.3 0 2.9-1.2 3.9" />
      <path d="M32 32c1 1.5 1.6 3.2 1.9 5" />
    </svg>
  );
}

export default function Hero() {
  const { t } = useLang();

  return (
    <section id="top" className="hero-block hero-block--top">
      <div className="hero-inner">
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-dot" aria-hidden="true" />
            {t.hero.avail}
          </div>
          <h1 className="hero-title font-serif-d">
            {t.hero.titleA}
            <em className="hero-title-em">{t.hero.titleEm}</em>
            {t.hero.titleB}
          </h1>
          <p className="hero-lede">{t.hero.lede}</p>
          <div className="plate">
            <div className="plate-mark" aria-hidden="true">
              <Fingerprint />
            </div>
            <dl className="plate-rows">
              <div className="plate-row">
                <dt>{t.plate.roleLabel}</dt><dd>{t.plate.role}</dd>
              </div>
              <div className="plate-row">
                <dt>{t.plate.focusLabel}</dt><dd>{t.plate.focus}</dd>
              </div>
              <div className="plate-row">
                <dt>{t.plate.locLabel}</dt><dd>{t.plate.loc}</dd>
              </div>
              <div className="plate-row">
                <dt>{t.plate.statusLabel}</dt><dd className="plate-ok">{t.plate.status}</dd>
              </div>
            </dl>
            <div className="plate-links">
              <a href="https://github.com/AhmedOL0" target="_blank" rel="noopener noreferrer">
                github.com/AhmedOL0 <span aria-hidden="true">↗</span>
              </a>
              <a href="https://www.linkedin.com/in/ahmed-ouarrali" target="_blank" rel="noopener noreferrer">
                linkedin.com/in/ahmed-ouarrali <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <div className="hero-actions">
            <a className="btn btn-gold" href="#work" data-magnetic>
              {t.hero.ctaWork}<span className="arr">&rarr;</span>
            </a>
            <a className="btn btn-ghost" href="#contact" data-magnetic>
              {t.hero.ctaContact}
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-photo-lg">
            <img src="/assets/photo.jpg" alt="Ahmed Ouarrali" width="240" height="240" loading="eager" fetchPriority="high" />
          </div>
        </div>
      </div>
    </section>
  );
}
