import Section from './Section';
import { useLang } from '../i18n-data';

const STEPS = [
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/><circle cx="11" cy="8" r="1.5" fill="currentColor" stroke="none"/><path d="M8 14c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2"/></svg>,
    accent: 'amber',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 3v18"/><circle cx="15" cy="15" r="1.5" fill="currentColor" stroke="none"/></svg>,
    accent: 'gold',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 6L4 12l4 6"/><path d="M16 6l4 6-4 6"/><path d="M14 4l-4 16"/></svg>,
    accent: 'sage',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3h6"/><path d="M10 3v6.5L5 18a2 2 0 002 2h10a2 2 0 002-2l-5-8.5V3"/><path d="M7 16h10"/></svg>,
    accent: 'rust',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2c-2 4-3 8-3 12h6c0-4-1-8-3-12z"/><path d="M9 14l-2 6h2"/><path d="M15 14l2 6h-2"/><circle cx="12" cy="10" r="1" fill="currentColor" stroke="none"/></svg>,
    accent: 'amber',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M17 7h4v4"/></svg>,
    accent: 'sage',
  },
];

export default function HowIWork() {
  const { t } = useLang();
  return (
    <Section id="how-i-work" num="02" kicker={t.howIWork.kicker} title={t.howIWork.title} sub={t.howIWork.sub} variant="left">
      <div className="process-grid mt-6 sm:mt-8">
        {t.howIWork.steps.map((step, i) => (
          <div className={`process-card process-card--${STEPS[i].accent}`} key={step.label}>
            <div className="process-card-head">
              <div className="process-card-icon">{STEPS[i].icon}</div>
              <span className="process-card-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            </div>
            <h3 className="process-card-label">{step.label}</h3>
            <p className="process-card-desc">{step.desc}</p>
            {i < t.howIWork.steps.length - 1 && <div className="process-card-arrow" aria-hidden="true">→</div>}
          </div>
        ))}
      </div>
    </Section>
  );
}
