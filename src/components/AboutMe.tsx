import Section from './Section';
import { useLang } from '../i18n-data';

export default function AboutMe() {
  const { t } = useLang();
  return (
    <Section id="about" num="07" kicker={t.aboutMe.kicker} title={t.aboutMe.title} sub={t.aboutMe.sub} variant="left">
      <div className="about-layout mt-5 sm:mt-6">
        <div className="about-main">
          <div className="about-top">
            <div className="about-photo">
              <img src="/assets/photo.jpg" alt="Ahmed Ouarrali" width="80" height="80" loading="lazy" />
            </div>
            <div className="about-identity">
              <h3 className="about-name">Ahmed Ouarrali</h3>
              <p className="about-role">Full-stack developer & QA engineer</p>
            </div>
          </div>
          <p className="about-body text-[.92rem] sm:text-[1rem] leading-relaxed" style={{ color: 'var(--muted)' }}>
            {t.aboutMe.body}
          </p>
          <div className="about-interests">
            {t.aboutMe.interests.map((interest) => (
              <span key={interest} className="interest-chip">{interest}</span>
            ))}
          </div>
        </div>
        <div className="about-langs">
          <h3 className="about-langs-title">{t.aboutMe.langsTitle}</h3>
          <div className="langs flex flex-col gap-3">
            {t.aboutMe.langs.map((l) => (
              <span key={l.l} className="lang-chip">
                <span className="lang-dot" aria-hidden="true" />
                <b>{l.l}</b>
                <span className="lang-lvl">{l.lvl}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
