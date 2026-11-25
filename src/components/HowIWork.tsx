import { useEffect, useRef, useState } from 'react';
import Section from './Section';
import { useLang } from '../i18n-data';

const STEPS = [
  { /* understand: chat bubbles + user */
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/><circle cx="9" cy="10" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="10" r="1" fill="currentColor" stroke="none"/><circle cx="15" cy="10" r="1" fill="currentColor" stroke="none"/></svg>,
  },
  { /* design: wireframe layout */
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/><path d="M14 13h4"/><path d="M14 17h4"/></svg>,
  },
  { /* build: code brackets */
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 6L4 12l4 6"/><path d="M16 6l4 6-4 6"/></svg>,
  },
  { /* test: checkmark in circle */
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>,
  },
  { /* deploy: cloud upload */
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/><path d="M12 13v5"/><path d="M9 16l3-3 3 3"/></svg>,
  },
  { /* improve: trending up */
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M17 7h4v4"/></svg>,
  },
];

export default function HowIWork() {
  const { t } = useLang();
  const flowRef = useRef<HTMLOListElement | null>(null);
  const [active, setActive] = useState(-1);
  const total = t.howIWork.steps.length;
  const current = active < 0 ? 0 : active;
  const radius = 104;
  const center = 130;
  const circumference = 2 * Math.PI * radius;
  const progress = (current + 1) / total;
  const nodes = t.howIWork.steps.map((_, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / total;
    return { x: center + radius * Math.cos(angle), y: center + radius * Math.sin(angle) };
  });

  useEffect(() => {
    const flow = flowRef.current;
    if (!flow) return;
    const cards = Array.from(flow.querySelectorAll<HTMLElement>('.process-step'));
    let raf = 0;
    let last = -1;
    const update = () => {
      raf = 0;
      const flowRect = flow.getBoundingClientRect();
      if (flowRect.bottom < -100 || flowRect.top > window.innerHeight + 100) return;
      const focusLine = window.innerHeight * 0.42;
      let best = 0;
      let bestDistance = Infinity;
      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - focusLine);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = i;
        }
      });
      if (best !== last) {
        last = best;
        setActive(best);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <Section id="how-i-work" num="02" kicker={t.howIWork.kicker} title={t.howIWork.title} sub={t.howIWork.sub} variant="left">
      <div className="process-layout">
        <div className="process-loop-wrap" aria-hidden="true">
          <div className="process-loop">
            <svg viewBox="0 0 260 260" focusable="false">
              <circle className="process-ring" cx="130" cy="130" r={radius} />
              <circle
                className="process-ring-progress"
                cx="130"
                cy="130"
                r={radius}
                strokeDasharray={`${progress * circumference} ${circumference}`}
                transform="rotate(-90 130 130)"
              />
              {nodes.map((node, i) => (
                <g key={t.howIWork.steps[i].label} className={i === current ? 'process-node is-active' : 'process-node'}>
                  <circle cx={node.x} cy={node.y} r="15" />
                  <text x={node.x} y={node.y + 4} textAnchor="middle">{String(i + 1).padStart(2, '0')}</text>
                </g>
              ))}
              <circle className="process-core" cx="130" cy="130" r="62" />
            </svg>
            <div className="process-loop-center">
              <span className="process-loop-num">{String(current + 1).padStart(2, '0')}</span>
              <span className="process-loop-total">/ {String(total).padStart(2, '0')}</span>
              <span className="process-loop-label">{t.howIWork.steps[current].label}</span>
            </div>
          </div>
        </div>
        <div className="process-side">
          <div className="process-sticky" aria-hidden="true">
            <div className="process-sticky-line">
              <span className="process-sticky-index">{String(current + 1).padStart(2, '0')}</span>
              <span className="process-sticky-total">/ {String(total).padStart(2, '0')}</span>
              <span className="process-sticky-label">{t.howIWork.steps[current].label}</span>
            </div>
            <div className="process-sticky-rail">
              {t.howIWork.steps.map((step, i) => (
                <span key={step.label} className={i <= current ? 'on' : ''} />
              ))}
            </div>
          </div>
          <ol className="process-flow mt-6 sm:mt-8 list-none m-0 p-0" ref={flowRef}>
            {t.howIWork.steps.map((step, i) => (
              <li className={`process-step${i === current ? ' active' : ''}`} key={step.label}>
                <div className="process-marker" aria-hidden="true">
                  <div className="process-num">{String(i + 1).padStart(2, '0')}</div>
                  {i < total - 1 && <div className="process-line" />}
                </div>
                <div className="process-card">
                  <span className="step-tag" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                  </span>
                  <div className="process-icon">{STEPS[i].icon}</div>
                  <h3 className="process-label">{step.label}</h3>
                  <p className="process-desc">{step.desc}</p>
                  <p className="process-artifact"><span>{t.howIWork.artifactLabel}</span>{step.artifact}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
