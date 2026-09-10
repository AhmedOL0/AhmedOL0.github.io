import { useEffect, useRef } from 'react';

// Trailing glow cursor: a gold dot + lagging ring that expands over
// anything interactive. Additive only — the native cursor stays.
export default function CursorGlow() {
  const dot = useRef<HTMLDivElement | null>(null);
  const ring = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (
      window.matchMedia('(pointer:coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }
    let x = -100, y = -100, rx = x, ry = y, raf = 0, visible = false;
    const show = () => {
      visible = true;
      if (dot.current) dot.current.style.opacity = '1';
      if (ring.current) ring.current.style.opacity = '1';
    };
    const hide = () => {
      visible = false;
      if (dot.current) dot.current.style.opacity = '0';
      if (ring.current) ring.current.style.opacity = '0';
    };
    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!visible) show();
      const t = e.target as HTMLElement | null;
      const hot = t && typeof t.closest === 'function' && t.closest('a,button,input,textarea,.card');
      if (ring.current) {
        const s = hot ? 2.1 : 1;
        ring.current.style.setProperty('--rs', String(s));
      }
      if (dot.current) dot.current.style.transform = `translate(${x}px,${y}px)`;
    };
    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      if (ring.current) ring.current.style.transform = `translate(${rx}px,${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', hide);
    raf = requestAnimationFrame(loop);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', hide);
      cancelAnimationFrame(raf);
    };
  }, []);

  const base: React.CSSProperties = {
    position: 'fixed', top: 0, left: 0, zIndex: 65, pointerEvents: 'none', opacity: 0,
  };
  return (
    <>
      <div ref={dot} style={{ ...base, width: 6, height: 6, margin: '-3px 0 0 -3px', borderRadius: '50%', background: 'var(--gold)' }} />
      <div
        ref={ring}
        style={{
          ...base, width: 30, height: 30, margin: '-15px 0 0 -15px', borderRadius: '50%',
          border: '1px solid var(--gold)', transform: 'translate(-100px,-100px) scale(var(--rs,1))',
          transition: 'opacity .3s, border-color .3s',
        }}
      />
    </>
  );
}
