import { useLang } from '../i18n-data';

function Seal() {
  return (
    <span className="plate-seal" aria-hidden="true">
      A<em>O</em>
    </span>
  );
}

export default function Hero() {
  const { t } = useLang();
  // Values stated by the site owner (see Experience section for roles).
  const stats: [string, string][] = [
    ['06+', t.hero.statsLabels[0]],
    ['04', t.hero.statsLabels[1]],
  ];

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
              <Seal />
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
          <dl className="hero-stats">
            {stats.map(([v, l]) => (
              <div className="hero-stat" key={l}>
                <dt>{l}</dt><dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="hero-visual">
          <div className="hero-orbit">
            <span className="orbit-tick tick-tl" aria-hidden="true" />
            <span className="orbit-tick tick-tr" aria-hidden="true" />
            <span className="orbit-tick tick-bl" aria-hidden="true" />
            <span className="orbit-tick tick-br" aria-hidden="true" />
            <div className="hero-photo-lg">
              <picture>
                <source type="image/webp" srcSet="/assets/photo-240.webp 240w, /assets/photo-480.webp 480w" sizes="(max-width: 640px) 40vw, 240px" />
                <img src="/assets/photo-480.jpg" srcSet="/assets/photo-240.jpg 240w, /assets/photo-480.jpg 480w" sizes="(max-width: 640px) 40vw, 240px" alt="Ahmed Ouarrali" width="240" height="240" loading="eager" fetchPriority="high" decoding="async" />
              </picture>
            </div>
            <span className="orbit-chip chip-a" aria-hidden="true">{t.hero.photoChipA}</span>
            <span className="orbit-chip chip-b" aria-hidden="true">{t.hero.photoChipB}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
