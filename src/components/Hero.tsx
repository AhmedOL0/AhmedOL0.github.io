import { useEffect, useRef } from 'react';
import { useLang } from '../i18n-data';
import HeroTyping from './HeroTyping';

export default function Hero() {
  const { t } = useLang();
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      window.matchMedia('(pointer:coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) return;
    const el = visualRef.current;
    if (!el) return;
    const ring = el.querySelector<HTMLElement>('.hero-orbit');
    if (!ring) return;
    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 12;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 12;
    };
    const follow = () => {
      cx += (tx - cx) * 0.05;
      cy += (ty - cy) * 0.05;
      ring.style.translate = `${cx}px ${cy}px`;
      raf = requestAnimationFrame(follow);
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', () => { tx = 0; ty = 0; });
    raf = requestAnimationFrame(follow);
    return () => {
      el.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

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
          <HeroTyping />
          <div className="hero-actions">
            <a className="btn btn-gold" href="#work" data-magnetic>
              {t.hero.ctaWork}<span className="arr">&rarr;</span>
            </a>
            <a className="btn btn-ghost" href="#contact" data-magnetic>
              {t.hero.ctaContact}
            </a>
          </div>
        </div>
        <div className="hero-visual" ref={visualRef} aria-hidden="true">
          <div className="hero-orbit" />
          <div className="hero-photo-lg">
            <img src="/assets/photo.jpg" alt="Ahmed Ouarrali portrait" width="260" height="260" loading="eager" fetchPriority="high" />
          </div>
          <div className="hero-float hero-float--tr">
            <span className="hero-float-ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
            </span>
            <span className="hero-float-tx">{t.hero.floatDev}</span>
            <span className="hero-float-dot" aria-hidden="true" />
          </div>
          <div className="hero-float hero-float--bl">
            <span className="hero-float-ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="m9 15 2 2 4-4"/></svg>
            </span>
            <span className="hero-float-tx">{t.hero.floatImpact}</span>
            <span className="hero-float-dot" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
