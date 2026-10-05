import { useLang } from '../i18n-data';

function Fingerprint() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <path d="M24 6c-7 0-12.5 4.2-14.5 10" />
      <path d="M24 6c7 0 12.5 4.2 14.5 10" />
      <path d="M14 14.5C12 17 11 20 11 23.5c0 2.5.4 4.8 1.2 7" />
      <path d="M34 14.5c2 2.5 3 5.5 3 9 0 2.5-.4 4.8-1.2 7" />
      <path d="M17 19c-1.2 1.8-2 4-2 6.5 0 4.5 1.4 8.4 4 11.5" />
      <path d="M31 19c1.2 1.8 2 4 2 6.5 0 4.5-1.4 8.4-4 11.5" />
      <path d="M21 22.5c-.8 1.2-1.2 2.6-1.2 4 0 3.4 1.2 6.4 3.4 8.8" />
      <path d="M27 22.5c.8 1.2 1.2 2.6 1.2 4 0 3.4-1.2 6.4-3.4 8.8" />
      <circle cx="24" cy="27" r="1.4" fill="currentColor" stroke="none" />
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
