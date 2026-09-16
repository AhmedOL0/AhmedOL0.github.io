import { useLang } from '../i18n-data';

export default function Hero() {
  const { t } = useLang();
  return (
    <section id="top" className="hero-block hero-block--top hero-dot-grid">
      <div className="hero-eyebrow"><span className="hero-eyebrow-dot" aria-hidden="true" />{t.hero.badge}</div>
      <h1 className="hero-title font-serif-d text-[clamp(2.1rem,5.5vw,3.45rem)] leading-[1.08] tracking-[-.02em] m-0">
        <span className="hero-title-a">{t.hero.titleA}</span>
        <em className="hero-title-em">{t.hero.titleEm}</em>
        <span className="hero-title-b">{t.hero.titleB}</span>
      </h1>
      <p className="hero-lede">{t.hero.lede}</p>
      <div className="hero-actions">
        <a className="btn btn-gold" href="#work">{t.hero.ctaWork}</a>
        <a className="btn ghost" href="#contact">{t.hero.ctaContact}</a>
      </div>
    </section>
  );
}
