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
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><circle cx="12" cy="12" r="2.2"/><g stroke="currentColor" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2" cx="12" cy="12"/><ellipse rx="11" ry="4.2" cx="12" cy="12" transform="rotate(60 12 12)"/><ellipse rx="11" ry="4.2" cx="12" cy="12" transform="rotate(120 12 12)"/></g></svg>
            </span>
            <span className="hero-float-tx">{t.hero.floatDev}</span>
          </div>
          <div className="hero-float hero-float--tr">
            <span className="hero-float-ic">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M16.2 13.4c-1.8-1-4.5-.9-6.3.1-1.8 1-3 2.8-3 4.8 0 2.1 1.3 3.9 3.1 4.9 1.8 1 4.5.9 6.3-.1 1.8-1 3-2.8 3-4.8 0-2.1-1.3-3.9-3.1-4.9zM12 1.4c.3 0 .5 0 .8.1.5.1.9.3 1.2.6.3.4.5.8.5 1.3v4.4c0 .2-.1.4-.2.5-.1.2-.3.3-.5.4l-2.5 1.4c-.4.2-.8.2-1.2 0L8 8.3c-.2-.1-.3-.3-.4-.5-.1-.2-.1-.3-.1-.5V3.4c0-.5.2-1 .5-1.3.3-.3.7-.5 1.2-.6.3-.1.5-.1.8-.1z"/></svg>
            </span>
            <span className="hero-float-tx">{t.hero.floatProblem}</span>
          </div>
          <div className="hero-float hero-float--bl">
            <span className="hero-float-ic">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18.3 10.7c-.1-.4-.3-.8-.5-1.1-.3-.4-.6-.8-1-1.1-.7-.6-1.5-1-2.4-1.1-.3 0-.6 0-.9.1-.2.1-.4.1-.5.2l-.4.4c-.3.3-.7.6-1.1.8-.4.2-.8.4-1.3.5-.5.1-1 .1-1.5 0-.5-.1-1-.3-1.4-.5-.4-.3-.8-.6-1.1-.9-.1-.1-.2-.2-.3-.3-.3-.3-.5-.7-.7-1.1-.1-.4-.2-.8-.2-1.3 0-.5.1-1 .3-1.4.2-.4.4-.8.8-1.1.3-.3.7-.5 1.1-.7.4-.2.8-.3 1.3-.4.5-.1 1-.1 1.5 0 .5.1 1 .3 1.4.5.4.3.8.6 1.1.9.1.1.2.2.3.3.3.3.5.7.7 1.1.1.4.2.8.2 1.3 0 .2 0 .3-.1.5-.2.5-.5 1-.8 1.4z"/></svg>
            </span>
            <span className="hero-float-tx">{t.hero.floatTeam}</span>
          </div>
          <div className="hero-float hero-float--br">
            <span className="hero-float-ic">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M13.5 21c-.3 0-.6-.1-.8-.3l-2-2H5c-1.1 0-2-.9-2-2V9c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v3.5c0 .8-.5 1.5-1.2 1.8-.2.1-.4.1-.6.1H16l-2.5 2.5c-.2.2-.5.4-.8.5-.1 0-.2.1-.2.1zm-7 1c-.4 0-.8-.2-1-.5L3.5 18.3c-.1-.2-.1-.4 0-.6.1-.2.3-.4.5-.4h3.8l1.4 1.4c.2.2.5.3.8.3z"/><path d="M20.8 7.6c-.3-.7-1-1.1-1.8-1.1H5c-.8 0-1.5.4-1.8 1.1L1.2 13.5c-.3.7.1 1.5.9 1.5h19.8c.8 0 1.2-.8.9-1.5L20.8 7.6z" opacity=".3"/></svg>
            </span>
            <span className="hero-float-tx">{t.hero.floatImpact}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
