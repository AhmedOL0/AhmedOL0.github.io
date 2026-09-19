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
          <div><strong>{t.contact.direct}</strong><br /><a href="mailto:ahmedouarrali12@gmail.com">ahmedouarrali12@gmail.com</a></div>
          <div><strong>{t.contact.phone}</strong><br /><a href="tel:+212645372099">+212 645 372 099</a></div>
          <div><strong>{t.contact.linkedin}</strong><br /><a href="https://www.linkedin.com/in/ahmed-ouarrali" target="_blank" rel="noopener noreferrer">linkedin.com/in/ahmed-ouarrali</a></div>
          <div><strong>{t.contact.github}</strong><br /><a href="https://github.com/AhmedOL0" target="_blank" rel="noopener noreferrer">github.com/AhmedOL0</a></div>
        </div>
      </div>
    </Section>
  );
}
