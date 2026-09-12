import { useEffect, useRef } from 'react';

const TRAIL = 3;
const MAGNETIC_RANGE = 80;
const MAGNETIC_STRENGTH = 0.12;

export default function CursorGlow() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (
      window.matchMedia('(pointer:coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) return;

    let mx = -200, my = -200;
    let rx = mx, ry = my;
    let raf = 0;
    let visible = false;
    let hovering: HTMLElement | null = null;
    const trail: { x: number; y: number }[] = Array.from({ length: TRAIL }, () => ({ x: -200, y: -200 }));

    const show = () => {
      visible = true;
      if (dotRef.current) dotRef.current.style.opacity = '1';
      if (ringRef.current) ringRef.current.style.opacity = '1';
      trailRefs.current.forEach(el => { if (el) el.style.opacity = '0.5'; });
    };
    const hide = () => {
      visible = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
      trailRefs.current.forEach(el => { if (el) el.style.opacity = '0'; });
    };

    const onMove = (e: MouseEvent) => {
      let targetX = e.clientX;
      let targetY = e.clientY;

      const t = e.target as HTMLElement | null;
      const hot = t?.closest?.('a,button,input,textarea,.card,.stat,.core-chip') as HTMLElement | null;

      if (hot !== hovering) {
        if (hovering) {
          if (ringRef.current) ringRef.current.classList.remove('cursor-hot');
          hovering.classList.remove('cursor-magnetic-target');
        }
        if (hot) {
          if (ringRef.current) ringRef.current.classList.add('cursor-hot');
          hot.classList.add('cursor-magnetic-target');
        }
        hovering = hot;
      }

      if (hot) {
        const rect = hot.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = targetX - cx;
        const dy = targetY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAGNETIC_RANGE) {
          const pull = (1 - dist / MAGNETIC_RANGE) * MAGNETIC_STRENGTH;
          targetX -= dx * pull;
          targetY -= dy * pull;
        }
      }

      mx = targetX;
      my = targetY;
      if (!visible) show();
      if (dotRef.current) dotRef.current.style.transform = `translate(${mx}px,${my}px)`;
    };

    const loop = () => {
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx}px,${ry}px) scale(${hovering ? 2.4 : 1})`;

      for (let i = trail.length - 1; i > 0; i--) {
        trail[i].x += (trail[i - 1].x - trail[i].x) * (0.25 - i * 0.04);
        trail[i].y += (trail[i - 1].y - trail[i].y) * (0.25 - i * 0.04);
      }
      trail[0].x += (mx - trail[0].x) * 0.35;
      trail[0].y += (my - trail[0].y) * 0.35;

      for (let i = 0; i < TRAIL; i++) {
        const el = trailRefs.current[i];
        if (el) {
          const s = 1 - (i / TRAIL) * 0.5;
          el.style.transform = `translate(${trail[i].x}px,${trail[i].y}px) scale(${s})`;
          el.style.opacity = visible ? String(0.4 - i * 0.1) : '0';
        }
      }

      raf = requestAnimationFrame(loop);
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', hide);
    raf = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', hide);
      cancelAnimationFrame(raf);
      if (hovering) {
        hovering.classList.remove('cursor-magnetic-target');
      }
    };
  }, []);

  const base: React.CSSProperties = {
    position: 'fixed', top: 0, left: 0, zIndex: 10, pointerEvents: 'none', opacity: 0,
  };

  return (
    <>
      {Array.from({ length: TRAIL }).map((_, i) => (
        <div
          key={i}
          ref={el => { trailRefs.current[i] = el; }}
          style={{
            ...base,
            width: 5 - i,
            height: 5 - i,
            margin: `${-(5 - i) / 2}px 0 0 ${-(5 - i) / 2}px`,
            borderRadius: '50%',
            background: 'var(--gold)',
            opacity: 0,
            transition: 'opacity .3s',
          }}
        />
      ))}
      <div
        ref={dotRef}
        style={{
          ...base, width: 8, height: 8, margin: '-4px 0 0 -4px', borderRadius: '50%',
          background: 'var(--gold-hi)',
          boxShadow: '0 0 12px 4px rgba(201,168,118,.6), 0 0 30px 8px rgba(201,168,118,.2)',
          transition: 'opacity .3s',
        }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          ...base, width: 32, height: 32, margin: '-16px 0 0 -16px', borderRadius: '50%',
          border: '1px solid rgba(201,168,118,.3)',
          boxShadow: '0 0 14px rgba(201,168,118,.12)',
          transition: 'opacity .3s, border-color .3s, box-shadow .3s',
        }}
      />
    </>
  );
}
