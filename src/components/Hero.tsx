import { useLang } from '../i18n-data';

function Fingerprint() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <path d="M9 23c0-8.6 6.7-15.5 15-15.5S39 14.4 39 23c0 5.5-1.9 10.3-5 13.5" />
      <path d="M14 24c0-6 4.9-10.8 10-10.8s10 4.8 10 10.8c0 4-1.4 7.6-3.8 10" />
      <path d="M18.5 24.5c0-3.6 2.5-6.3 5.5-6.3s5.5 2.7 5.5 6.3c0 2.8-1 5.3-2.6 7" />
      <path d="M22 26.5c0-1.4.9-2.4 2-2.4s2 1 2 2.4c0 1.6-.6 3-1.5 4" />
      <path d="M11.5 31c.6 3.2 2 6 4.2 8.2" />
      <path d="M36.5 31c-.6 3.2-2 6-4.2 8.2" />
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
            <a className="btn btn-gold" href="#work">
              {t.hero.ctaWork}<span className="arr">&rarr;</span>
            </a>
            <a className="btn btn-ghost" href="#contact">
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
