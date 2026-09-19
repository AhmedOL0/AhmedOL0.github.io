import { useState, useCallback, type FormEvent } from 'react';
import Section from './Section';
import { useLang } from '../i18n-data';

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

  const resetStatus = useCallback(() => {
    const t = setTimeout(() => setStatus('idle'), 5000);
    return () => clearTimeout(t);
  }, []);

  const retry = useCallback(() => setStatus('idle'), []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const formData = new FormData(form);
    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;
    if (!accessKey) {
      setStatus('error');
      resetStatus();
      return;
    }
    formData.append('access_key', accessKey);
    formData.append('subject', 'New message from portfolio');
    formData.append('from_name', 'Portfolio Contact');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus('ok');
        form.reset();
        resetStatus();
      } else {
        setStatus('error');
        resetStatus();
      }
    } catch {
      setStatus('error');
      resetStatus();
    }
  };

  const sending = status === 'sending';

  return (
    <Section id="contact" num="08" kicker={t.contact.kicker} title={t.contact.title} sub="" variant="right">
      <p className="sub">
        {t.contact.sub}<strong style={{ color: 'var(--ink)' }}>{t.contact.subEm}</strong>{t.contact.subEnd}
      </p>
      <div className="contact-box mt-6 sm:mt-8">
        <form onSubmit={handleSubmit} aria-busy={sending}>
          <input type="text" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" aria-label="Leave this field empty" />
          <label className="field" htmlFor="contact-name">
            <input id="contact-name" name="name" type="text" placeholder=" " required disabled={sending} autoComplete="name" />
            <span>{t.contact.name}</span>
          </label>
          <label className="field" htmlFor="contact-email">
            <input id="contact-email" name="email" type="email" placeholder=" " required disabled={sending} autoComplete="email" inputMode="email" />
            <span>{t.contact.email}</span>
          </label>
          <label className="field" htmlFor="contact-message">
            <textarea id="contact-message" name="message" rows={5} placeholder=" " required disabled={sending} />
            <span>{t.contact.msg}</span>
          </label>
          <div style={{ marginTop: 22 }}>
            <button
              className="btn btn-gold"
              data-magnetic
              type="submit"
              disabled={sending}
              style={{ opacity: sending ? 0.7 : 1, transition: 'opacity .2s' }}
            >
              {sending && <Spinner />}
              {sending ? t.contact.sending : t.contact.send}
              {!sending && <span className="arr">→</span>}
            </button>
          </div>
          {status === 'ok' && (
            <div className="form-success-box" role="status" aria-live="polite">
              <svg viewBox="0 0 52 52" style={{ width: 48, height: 48 }}>
                <circle cx="26" cy="26" r="24" fill="none" stroke="var(--sage)" strokeWidth="2.5"
                  style={{ strokeDasharray: 151, strokeDashoffset: 151, animation: 'check-circle .5s ease .1s forwards' }} />
                <path d="M15 27l7 7 15-15" fill="none" stroke="var(--sage)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  style={{ strokeDasharray: 40, strokeDashoffset: 40, animation: 'check-mark .3s ease .45s forwards' }} />
              </svg>
              <p className="form-success-text">{t.contact.success}</p>
              <p className="form-success-sub">{t.contact.respondTime}</p>
            </div>
          )}
          {status === 'error' && (
            <div className="form-error-box" role="alert" aria-live="assertive">
              <svg viewBox="0 0 52 52" style={{ width: 44, height: 44 }}>
                <circle cx="26" cy="26" r="24" fill="none" stroke="#ef4444" strokeWidth="2.5"
                  style={{ strokeDasharray: 151, strokeDashoffset: 151, animation: 'check-circle .5s ease .1s forwards' }} />
                <path d="M18 18l16 16M34 18l-16 16" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round"
                  style={{ strokeDasharray: 40, strokeDashoffset: 40, animation: 'check-mark .3s ease .45s forwards' }} />
              </svg>
              <p className="form-error-text">{t.contact.error}</p>
              <p className="form-error-sub"><a href="mailto:ahmedouarrali12@gmail.com">ahmedouarrali12@gmail.com</a></p>
              <button type="button" onClick={retry}
                className="btn btn-ghost btn-sm" style={{ marginTop: 12 }}>
                {t.contact.retry ?? 'Try again'}
              </button>
            </div>
          )}
        </form>
        <div className="direct text-[.95rem]">
          <a href="mailto:ahmedouarrali12@gmail.com" className="direct-item">
            <span className="direct-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></span>
            <span className="direct-text"><strong>{t.contact.direct}</strong><span className="direct-link">ahmedouarrali12@gmail.com</span></span>
          </a>
          <a href="tel:+212645372099" className="direct-item">
            <span className="direct-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg></span>
            <span className="direct-text"><strong>{t.contact.phone}</strong><span className="direct-link">+212 645 372 099</span></span>
          </a>
          <a href="https://www.linkedin.com/in/ahmed-ouarrali" target="_blank" rel="noopener noreferrer" className="direct-item">
            <span className="direct-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></span>
            <span className="direct-text"><strong>{t.contact.linkedin}</strong><span className="direct-link">linkedin.com/in/ahmed-ouarrali</span></span>
          </a>
          <a href="https://github.com/AhmedOL0" target="_blank" rel="noopener noreferrer" className="direct-item">
            <span className="direct-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg></span>
            <span className="direct-text"><strong>{t.contact.github}</strong><span className="direct-link">github.com/AhmedOL0</span></span>
          </a>
          <div className="direct-location">
            <span className="direct-loc-dot" aria-hidden="true" />
            <span>Morocco</span>
          </div>
        </div>
      </div>
    </Section>
  );
}
