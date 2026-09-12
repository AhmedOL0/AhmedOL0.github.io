import { useState, useEffect, useCallback } from 'react';

const calm = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Typewriter({ words, speed = 80, pause = 2200 }: { words: string[]; speed?: number; pause?: number }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const current = words[index];
    if (!isDeleting) {
      setText(current.slice(0, text.length + 1));
      if (text.length + 1 === current.length) {
        setTimeout(() => setIsDeleting(true), pause);
        return;
      }
    } else {
      setText(current.slice(0, text.length - 1));
      if (text.length - 1 === 0) {
        setIsDeleting(false);
        setIndex((i) => (i + 1) % words.length);
        return;
      }
    }
  }, [text, isDeleting, index, words, pause]);

  useEffect(() => {
    if (calm) { setText(words[0]); return; }
    const id = setTimeout(tick, isDeleting ? speed / 2 : speed);
    return () => clearTimeout(id);
  }, [tick, isDeleting, speed, words]);

  return (
    <>
      <span className="typewriter" aria-hidden="true">
        {text}
        <span className="typewriter-cursor" aria-hidden="true" />
      </span>
      <span className="sr-only">{words.join(', ')}</span>
    </>
  );
}
