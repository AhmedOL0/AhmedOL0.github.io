import Section from './Section';
import { useLang } from '../i18n-data';

const STEP_ICONS = [
  <svg key="understand" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>,
  <svg key="design" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>,
  <svg key="build" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  <svg key="test" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M9 15l2 2 4-4"/></svg>,
  <svg key="deploy" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  <svg key="improve" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/><polyline points="22 2 22 8 16 8"/></svg>,
];

export default function HowIWork() {
  const { t } = useLang();
  return (
    <Section id="how-i-work" num="02" kicker={t.howIWork.kicker} title={t.howIWork.title} sub={t.howIWork.sub} variant="left">
      <div className="process-flow mt-6 sm:mt-8">
        {t.howIWork.steps.map((step, i) => (
          <div className="process-step" key={step.label}>
            <div className="process-num">{STEP_ICONS[i]}</div>
            <div className="process-content">
              <h3 className="process-label">{step.label}</h3>
              <p className="process-desc">{step.desc}</p>
            </div>
            {i < t.howIWork.steps.length - 1 && <div className="process-line" aria-hidden="true" />}
          </div>
        ))}
      </div>
    </Section>
  );
}
