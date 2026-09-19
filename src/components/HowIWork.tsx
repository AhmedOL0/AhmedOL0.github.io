import Section from './Section';
import { useLang } from '../i18n-data';

const STEPS = [
  { /* understand — chat bubbles + user */
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/><circle cx="9" cy="10" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="10" r="1" fill="currentColor" stroke="none"/><circle cx="15" cy="10" r="1" fill="currentColor" stroke="none"/></svg>,
    accent: 'amber',
  },
  { /* design — wireframe layout */
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/><path d="M14 13h4"/><path d="M14 17h4"/></svg>,
    accent: 'gold',
  },
  { /* build — code brackets */
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 6L4 12l4 6"/><path d="M16 6l4 6-4 6"/></svg>,
    accent: 'sage',
  },
  { /* test — checkmark in circle */
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>,
    accent: 'rust',
  },
  { /* deploy — cloud upload */
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/><path d="M12 13v5"/><path d="M9 16l3-3 3 3"/></svg>,
    accent: 'amber',
  },
  { /* improve — trending up */
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M17 7h4v4"/></svg>,
    accent: 'sage',
  },
];

export default function HowIWork() {
  const { t } = useLang();
  return (
    <Section id="how-i-work" num="02" kicker={t.howIWork.kicker} title={t.howIWork.title} sub={t.howIWork.sub} variant="left">
      <div className="process-flow mt-6 sm:mt-8">
        {t.howIWork.steps.map((step, i) => (
          <div className={`process-step process-step--${STEPS[i].accent}`} key={step.label}>
            <div className="process-marker">
              <div className="process-num">{String(i + 1).padStart(2, '0')}</div>
              {i < t.howIWork.steps.length - 1 && <div className="process-line" aria-hidden="true" />}
            </div>
            <div className="process-card">
              <div className="process-icon">{STEPS[i].icon}</div>
              <h3 className="process-label">{step.label}</h3>
              <p className="process-desc">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
