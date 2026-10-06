import { useLang } from '../i18n-data';

function Fingerprint() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <path d="M6 26C6 15 14 7 24 7c10 0 18 8 18 19" />
      <path d="M6 26c0 5 1 10 3 14" />
      <path d="M42 26c0 6-1.5 11-4 15" />
      <path d="M11.5 25c0-8.5 5.5-14.5 12.5-14.5S36.5 16.5 36.5 25" />
      <path d="M11.5 25c0 5 1 9 2.5 12" />
      <path d="M36.5 25c0 4-.7 7.5-2 10" />
      <path d="M17 24c0-6 3.5-10 7.5-10s7 4.5 6.5 10" />
      <path d="M33 33c1.2 1.8 2 4 2.4 6.2" />
      <path d="M13 34c.7 2.3 1.8 4.4 3.3 6.2" />
      <path d="M22.5 24.5c-.5-2 .3-3.7 2-3.9 1.7-.2 3 1.2 2.8 3-.2 2.2-1.3 4.2-2.8 5.6" />
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
