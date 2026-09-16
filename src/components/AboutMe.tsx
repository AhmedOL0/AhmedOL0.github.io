import Section from './Section';
import { useLang } from '../i18n-data';

export default function AboutMe() {
  const { t } = useLang();
  return (
    <Section id="about" num="07" kicker={t.aboutMe.kicker} title={t.aboutMe.title} sub={t.aboutMe.sub} variant="left">
      <p className="about-body mt-5 sm:mt-6 max-w-[60ch] text-[.92rem] sm:text-[1rem] leading-relaxed" style={{ color: 'var(--muted)' }}>
        {t.aboutMe.body}
      </p>
      <div className="langs mt-5 flex flex-wrap gap-2">
        {t.aboutMe.langs.map((l) => (
          <span key={l.l} className="lang-chip"><b>{l.l}</b>: {l.lvl}</span>
        ))}
      </div>
    </Section>
  );
}
