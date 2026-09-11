import { useState, type FormEvent } from 'react';
import Section from './Section';
import { useLang } from '../i18n';

function Spinner() {
  return (
    <svg className="send-spinner" viewBox="0 0 20 20" style={{ width: 16, height: 16, marginRight: 8, animation: 'spin .8s linear infinite' }}>
      <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="32 18" strokeLinecap="round" />
    </svg>
  );
}

export default function Contact() {
  const { t } = useLang();
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append('access_key', import.meta.env.VITE_WEB3FORMS_KEY);
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
    <Section id="contact" num="06" kicker={t.contact.kicker} title={t.contact.title} sub="" variant="right">
      <p className="sub">
        {t.contact.sub}<strong style={{ color: 'var(--ink)' }}>{t.contact.subEm}</strong>{t.contact.subEnd}
      </p>
      <div className="contact-box mt-8 grid grid-cols-1 gap-10 p-7 lg:grid-cols-2 lg:p-[42px]">
        <form onSubmit={handleSubmit}>
          <input type="text" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
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
              {status === 'sending' && <Spinner />}
              {status === 'sending' ? t.contact.sending : t.contact.send}
              {status !== 'sending' && <span className="arr">→</span>}
            </button>
          </div>
          {status === 'ok' && (
            <div className="form-success-box">
              <svg viewBox="0 0 52 52" style={{ width: 48, height: 48 }}>
                <circle cx="26" cy="26" r="24" fill="none" stroke="#16a34a" strokeWidth="2.5"
                  style={{ strokeDasharray: 151, strokeDashoffset: 151, animation: 'check-circle .5s ease .1s forwards' }} />
                <path d="M15 27l7 7 15-15" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  style={{ strokeDasharray: 40, strokeDashoffset: 40, animation: 'check-mark .3s ease .45s forwards' }} />
              </svg>
              <p className="form-success-text">{t.contact.success}</p>
              <p className="form-success-sub">Typically respond within 24 hours</p>
            </div>
          )}
          {status === 'error' && (
            <p className="form-error">
              {t.contact.error}
            </p>
          )}
        </form>
        <div className="direct text-[.95rem]">
          <div><strong>{t.contact.direct}</strong><br /><a href="mailto:ahmedouarrali12@gmail.com">ahmedouarrali12@gmail.com</a></div>
          <div><strong>{t.contact.phone}</strong><br /><a href="tel:+212645372099">+212 645 372 099</a></div>
          <div><strong>{t.contact.linkedin}</strong><br /><a href="https://www.linkedin.com/in/ahmed-ouarrali" target="_blank" rel="noopener noreferrer">linkedin.com/in/ahmed-ouarrali</a></div>
          <div><strong>{t.contact.github}</strong><br /><a href="https://github.com/AhmedOL0" target="_blank" rel="noopener noreferrer">github.com/AhmedOL0</a></div>
          <div><strong>{t.contact.tz}</strong><br />{t.contact.timezone}</div>
        </div>
      </div>
    </Section>
  );
}
