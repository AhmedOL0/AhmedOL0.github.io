import { useEffect, useState } from 'react';

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t1 = setTimeout(() => setDone(true), reduced ? 200 : 1650);
    const t2 = setTimeout(onDone, reduced ? 500 : 2300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onDone]);

  return (
    <div className={`loader${done ? ' done' : ''}`} aria-hidden="true">
      <div className="loader-inner">
        <div className="loader-name">Ahmed</div>
        <svg className="loader-line" viewBox="0 0 300 24" preserveAspectRatio="none">
          <path d="M6 16 C 80 8, 180 22, 294 10" />
        </svg>
        <div className="loader-sub">Portfolio</div>
      </div>
    </div>
  );
}
