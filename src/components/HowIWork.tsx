import Section from './Section';
import { useLang } from '../i18n-data';

export default function HowIWork() {
  const { t } = useLang();
  return (
    <Section id="how-i-work" num="02" kicker={t.howIWork.kicker} title={t.howIWork.title} sub={t.howIWork.sub} variant="left">
      <div className="process-flow mt-6 sm:mt-8">
        {t.howIWork.steps.map((step, i) => (
          <div className="process-step" key={step.label}>
            <div className="process-num">{String(i + 1).padStart(2, '0')}</div>
            <div className="process-content">
              <h3 className="process-label font-serif-d">{step.label}</h3>
              <p className="process-desc">{step.desc}</p>
            </div>
            {i < t.howIWork.steps.length - 1 && <div className="process-line" aria-hidden="true" />}
          </div>
        ))}
      </div>
    </Section>
  );
}
