import Section from './Section';
import { useLang } from '../i18n';

export default function Contact() {
  const { t } = useLang();
  return (
    <Section id="contact" num="05" kicker={t.contact.kicker} title={t.contact.title} sub="">
      <p className="sub">
        {t.contact.sub}<strong style={{ color: 'var(--ink)' }}>{t.contact.subEm}</strong>{t.contact.subEnd}
      </p>
      <div className="contact-box mt-8 grid grid-cols-1 gap-10 p-7 lg:grid-cols-2 lg:p-[42px]">
        <form action="mailto:ahmedouarrali12@gmail.com" method="post" encType="text/plain">
          <label className="field" htmlFor="n">
            <input id="n" name="name" type="text" placeholder=" " required />
            <span>{t.contact.name}</span>
          </label>
          <label className="field" htmlFor="e">
            <input id="e" name="email" type="email" placeholder=" " required />
            <span>{t.contact.email}</span>
          </label>
          <label className="field" htmlFor="m">
            <textarea id="m" name="message" rows={5} placeholder=" " required />
            <span>{t.contact.msg}</span>
          </label>
          <div style={{ marginTop: 22 }}>
            <button className="btn btn-gold" data-magnetic type="submit">{t.contact.send}<span className="arr">→</span></button>
          </div>
        </form>
        <div className="direct text-[.95rem]">
          <div><strong>{t.contact.direct}</strong><br /><a href="mailto:ahmedouarrali12@gmail.com">ahmedouarrali12@gmail.com</a></div>
          <div><strong>{t.contact.phone}</strong><br /><a href="tel:+212645372099">+212 645 372 099</a></div>
          <div><strong>LinkedIn</strong><br /><a href="https://www.linkedin.com/in/ahmed-ouarrali">linkedin.com/in/ahmed-ouarrali</a></div>
          <div><strong>GitHub</strong><br /><a href="https://github.com/AhmedOL0">github.com/AhmedOL0</a></div>
          <div><strong>Timezone</strong><br />Morocco (GMT+1) · working remotely worldwide</div>
        </div>
      </div>
    </Section>
  );
}
