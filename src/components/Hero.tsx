import { useLang } from '../i18n-data';

export default function Hero() {
  const { t } = useLang();
  return (
    <section id="top" className="hero-block hero-block--top hero-dot-grid">
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
          <div className="hero-code-block">
            <div className="hero-code-bar">
              <span className="hero-code-dot" style={{ background: '#ff5f57' }} />
              <span className="hero-code-dot" style={{ background: '#febc2e' }} />
              <span className="hero-code-dot" style={{ background: '#28c840' }} />
              <span className="hero-code-title">odemlab</span>
            </div>
            <pre className="hero-code"><code><span className="cmt">{'// Spring Boot 3.5 + Java 21'}</span>{'\n'}<span className="ann">{'@RestController'}</span>{'\n'}<span className="ann">{'@RequestMapping("/api/v1")'}</span>{'\n'}<span className="kw">public class</span> <span className="type">ProductController</span> {'{'}{'\n'}{'\n'}  <span className="ann">{'@GetMapping("/products")'}</span>{'\n'}  <span className="kw">public</span> <span className="type">Page&lt;ProductDTO&gt;</span> <span className="fn">list</span>({'\n'}    <span className="ann">{'@RequestParam'}</span> <span className="type">String</span> city{'\n'}  ) {'{'}{'\n'}    <span className="kw">return</span> service{'\n'}      .enrichWithPricing(city);{'\n'}  {'}'}{'}'}{'}'}</code></pre>
          </div>
          <div className="hero-float-card">
            <div className="hero-float-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            </div>
            <div className="hero-float-text">
              <span className="hero-float-label">810 tests</span>
              <span className="hero-float-sub">all passing</span>
            </div>
          </div>
          <div className="hero-float-card hero-float-card-2">
            <div className="hero-float-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div className="hero-float-text">
              <span className="hero-float-label">3 languages</span>
              <span className="hero-float-sub">FR / EN / AR</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
