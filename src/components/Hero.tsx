import { useLang } from '../i18n-data';

function Fingerprint() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <path d="M7 30C7 18 14 9 24 9c10 0 17 9 17 21" />
      <path d="M7 30c0 5 1 9.5 2.8 13" />
      <path d="M41 30c0 5.5-1.2 10-3.2 13.5" />
      <path d="M12 29c0-9 5.5-15.5 12-15.5S36 20 36 29" />
      <path d="M12 29c0 4.5.8 8.5 2.2 11.8" />
      <path d="M36 29c0 4-.8 7.5-2.2 10.2" />
      <path d="M17 28c0-6 3.5-10.5 7.5-10.5S31.5 22 31 28" />
      <path d="M33.5 34c1 1.8 1.7 3.8 2 6" />
      <path d="M12.5 35.5c.6 2.2 1.6 4.2 3 5.8" />
      <path d="M22.8 26.5c-.6-1.8.2-3.4 1.9-3.6 1.6-.2 2.9 1.1 2.7 2.9-.2 2-1.2 3.8-2.6 5" />
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
