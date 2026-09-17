import { useEffect, useState, type ReactNode } from 'react';

import { DICTS, LangCtxObject, type Lang } from './i18n-data';

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const s = localStorage.getItem('ao-lang');
      if (s === 'fr' || s === 'en') return s;
      const nav = (navigator.language || 'en').toLowerCase();
      if (nav.startsWith('fr')) return 'fr';
    } catch { /* ignore */ }
    return 'en';
  });
  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', DICTS[lang].dir);
    try {
      localStorage.setItem('ao-lang', lang);
    } catch { /* ignore */ }
  }, [lang]);
  return <LangCtxObject.Provider value={{ lang, setLang: setLangState, t: DICTS[lang] }}>{children}</LangCtxObject.Provider>;
}
