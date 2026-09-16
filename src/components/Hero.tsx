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
          <div className="hero-code-block">
            <div className="hero-code-bar">
              <span className="hero-code-dot" style={{ background: '#ff5f57' }} />
              <span className="hero-code-dot" style={{ background: '#febc2e' }} />
              <span className="hero-code-dot" style={{ background: '#28c840' }} />
              <span className="hero-code-file">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                ProductController.java
              </span>
              <span className="hero-code-title">odemlab</span>
            </div>
            <pre className="hero-code"><code>{[
              { n: 1, tokens: [{ cls: 'cmt', text: '// Spring Boot 3.5 + Java 21' }] },
              { n: 2, tokens: [{ cls: 'ann', text: '@RestController' }] },
              { n: 3, tokens: [{ cls: 'ann', text: '@RequestMapping("/api/v1")' }] },
              { n: 4, tokens: [{ cls: 'kw', text: 'public class ' }, { cls: 'type', text: 'ProductController' }, { text: ' {' }] },
              { n: 5, tokens: [] },
              { n: 6, tokens: [{ text: '  ' }, { cls: 'ann', text: '@GetMapping("/products")' }] },
              { n: 7, tokens: [{ cls: 'kw', text: '  public ' }, { cls: 'type', text: 'Page<ProductDTO>' }, { text: ' ' }, { cls: 'fn', text: 'list' }, { text: '(' }] },
              { n: 8, tokens: [{ text: '    ' }, { cls: 'ann', text: '@RequestParam' }, { text: ' ' }, { cls: 'type', text: 'String' }, { text: ' city' }] },
              { n: 9, tokens: [{ text: '  ) {' }] },
              { n: 10, tokens: [{ text: '    ' }, { cls: 'kw', text: 'return ' }, { text: 'service' }] },
              { n: 11, tokens: [{ text: '      .enrichWithPricing(city);' }] },
              { n: 12, tokens: [{ text: '  }' }] },
              { n: 13, tokens: [{ text: '}' }] },
            ].map(line => (
              <div key={line.n} className="hero-code-line">
                <span className="hero-code-ln">{line.n}</span>
                {line.tokens.map((tok, i) => (
                  tok.cls ? <span key={i} className={tok.cls}>{tok.text}</span> : <span key={i}>{tok.text}</span>
                ))}
              </div>
            ))}</code></pre>
          </div>
          <div className="hero-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8c0-5-5-5-5-5s-5 0-5 5c0 4 5 11 5 11s5-7 5-11"/></svg>
            Spring Boot
            <span className="hero-badge-dot" />
          </div>
          <div className="hero-float-row">
            <div className="hero-float-card">
              <div className="hero-float-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              </div>
              <div className="hero-float-text">
                <span className="hero-float-label">810 tests</span>
                <span className="hero-float-sub"><span className="hero-float-dot" /> all passing</span>
              </div>
            </div>
            <div className="hero-float-card">
              <div className="hero-float-icon hero-float-icon--shield">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div className="hero-float-text">
                <span className="hero-float-label">3 languages</span>
                <span className="hero-float-sub"><span className="hero-float-dot" /> FR / EN / AR</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
