import { useState, type FormEvent } from 'react';
import Section from './Section';
import { useLang } from '../i18n';

export default function Contact() {
  const { t } = useLang();
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append('access_key', 'fd030d65-d69e-4963-b5f3-111d39ca65bb');
    formData.append('subject', 'New message from portfolio');
    formData.append('from_name', 'Portfolio Contact');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setStatus(data.success ? 'ok' : 'error');
      if (data.success) form.reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <Section id="contact" num="07" kicker={t.contact.kicker} title={t.contact.title} sub="" variant="right">
      <p className="sub">
        {t.contact.sub}<strong style={{ color: 'var(--ink)' }}>{t.contact.subEm}</strong>{t.contact.subEnd}
      </p>
      <div className="contact-box mt-8 grid grid-cols-1 gap-10 p-7 lg:grid-cols-2 lg:p-[42px]">
        <form onSubmit={handleSubmit}>
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
            <button
              className="btn btn-gold"
              data-magnetic
              type="submit"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? t.contact.sending : t.contact.send}
              <span className="arr">→</span>
            </button>
          </div>
          {status === 'ok' && (
            <p style={{ marginTop: 12, color: '#16a34a', fontSize: '.88rem' }}>
              {t.contact.success}
            </p>
          )}
          {status === 'error' && (
            <p style={{ marginTop: 12, color: '#dc2626', fontSize: '.88rem' }}>
              {t.contact.error}
            </p>
          )}
        </form>
        <div className="direct text-[.95rem]">
          <div><strong>{t.contact.direct}</strong><br /><a href="mailto:ahmedouarrali12@gmail.com">ahmedouarrali12@gmail.com</a></div>
          <div><strong>{t.contact.phone}</strong><br /><a href="tel:+212645372099">+212 645 372 099</a></div>
          <div><strong>{t.contact.linkedin}</strong><br /><a href="https://www.linkedin.com/in/ahmed-ouarrali">linkedin.com/in/ahmed-ouarrali</a></div>
          <div><strong>{t.contact.github}</strong><br /><a href="https://github.com/AhmedOL0">github.com/AhmedOL0</a></div>
          <div><strong>{t.contact.tz}</strong><br />{t.contact.timezone}</div>
        </div>
      </div>
    </Section>
  );
}
