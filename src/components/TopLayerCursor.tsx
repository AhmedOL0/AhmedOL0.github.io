import { useEffect, useRef } from 'react';

const RING = 36;
const FOLLOW = 0.32;
const GROW = 2.1;

let lastX = -100;
let lastY = -100;

if (typeof window !== 'undefined'
  && window.matchMedia('(pointer:fine)').matches
  && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.addEventListener('mousemove', (event) => {
    lastX = event.clientX;
    lastY = event.clientY;
  }, { passive: true });
}

export default function TopLayerCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer:fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    let mx = lastX, my = lastY, rx = lastX, ry = lastY, dx = lastX, dy = lastY;
    let size = RING;
    let grown = false;
    let raf = 0;

    if (mx > -50) {
      ring.style.opacity = '1';
      dot.style.opacity = '1';
    }

    const frame = () => {
      rx += (mx - rx) * FOLLOW;
      ry += (my - ry) * FOLLOW;
      dx += (mx - dx) * 0.65;
      dy += (my - dy) * 0.65;
      const off = size / 2;
      ring.style.transform = `translate(${(rx - off).toFixed(1)}px,${(ry - off).toFixed(1)}px)`;
      dot.style.transform = `translate(${(dx - 3).toFixed(1)}px,${(dy - 3).toFixed(1)}px)`;
      raf = requestAnimationFrame(frame);
    };

    const onMove = (event: MouseEvent) => {
      mx = event.clientX;
      my = event.clientY;
      const target = event.target as Element | null;
      const interactive = !!target?.closest?.('a,button,summary,[role="button"]');
      if (interactive !== grown) {
        grown = interactive;
        size = grown ? RING * GROW : RING;
        ring.style.width = `${size}px`;
        ring.style.height = `${size}px`;
      }
      ring.style.opacity = '1';
      dot.style.opacity = '1';
    };

    const onLeave = () => {
      ring.style.opacity = '0';
      dot.style.opacity = '0';
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="dialog-cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="dialog-cursor-dot" aria-hidden="true" />
    </>
  );
}
