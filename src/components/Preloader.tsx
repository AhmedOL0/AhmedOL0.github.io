import { useEffect, useState } from 'react';

const lines = [
  { prefix: '$ ', text: 'whoami', delay: 0 },
  { prefix: '', text: 'Ahmed Ouarrali, Full-Stack Engineer', delay: 600 },
  { prefix: '', text: '', delay: 900 },
  { prefix: '$ ', text: 'echo $PROJECTS_SHIPPED', delay: 1000 },
  { prefix: '', text: '6 products · 22 technologies · 3 platforms', delay: 1400 },
  { prefix: '', text: '', delay: 1700 },
  { prefix: '$ ', text: 'echo $STACK', delay: 1800 },
  { prefix: '', text: 'Spring Boot · Next.js · React Native · Docker', delay: 2200 },
];

export default function Preloader({ onDone }: { onDone: () => void }) {
  const motionOK = typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [visibleLines, setVisibleLines] = useState<number>(() => (motionOK ? 0 : lines.length));
  const [done, setDone] = useState(() => !motionOK);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    // Touch devices: first paint matters more than the full animation - play it at 2x speed
    const k = window.matchMedia('(pointer:coarse)').matches ? 0.45 : 1;
    if (done) {
      // Reduced-motion start (or finished animation): one brief beat, then hand off.
      timers.push(setTimeout(onDone, 300));
      return () => timers.forEach(clearTimeout);
    }
    lines.forEach((line, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), line.delay * k));
    });
    timers.push(setTimeout(() => setDone(true), 2800 * k));
    const cursorInterval = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => {
      timers.forEach(clearTimeout);
      clearInterval(cursorInterval);
    };
  }, [onDone, done]);

  return (
    <div className={`loader${done ? ' done' : ''}`} aria-hidden="true">
      <div className="loader-terminal">
        <div className="terminal-bar">
          <span className="terminal-dot" style={{ background: '#ff5f57' }} />
          <span className="terminal-dot" style={{ background: '#febc2e' }} />
          <span className="terminal-dot" style={{ background: '#28c840' }} />
        </div>
        <div className="terminal-body">
          {lines.slice(0, visibleLines).map((line, i) => (
            <div key={i} className="terminal-line">
              {line.prefix && <span className="terminal-prompt">{line.prefix}</span>}
              <span className={line.prefix ? 'terminal-cmd' : 'terminal-output'}>{line.text}</span>
            </div>
          ))}
          <div className="terminal-line">
            <span className="terminal-prompt">$ </span>
            <span className="terminal-cursor">{cursorVisible ? '█' : '\u00A0'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
