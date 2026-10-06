import { useEffect, useRef, type ReactNode } from 'react';

const RING = 36;
const FOLLOW = 0.32;
const PULL = 0.55;
const EL_PULL = 0.22;
const GROW = 2.1;

export default function MagneticCursor({ children }: { children: ReactNode }) {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer:fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;
    document.documentElement.classList.add('has-magnetic-cursor');

    let mx = -100, my = -100, rx = -100, ry = -100, dx = -100, dy = -100;
    let raf = 0;
    let lastCache = 0;
    let size = RING;
    let grown = false;
    let targets: HTMLElement[] = [];
    const moved = new Map<HTMLElement, number>();

    const cache = () => {
      targets = Array.from(document.querySelectorAll<HTMLElement>('[data-magnetic]'));
      lastCache = performance.now();
    };
    cache();

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (performance.now() - lastCache > 1200) cache();
    };
    const onLeave = () => {
      mx = -100; my = -100;
      ring.style.opacity = '0';
      dot.style.opacity = '0';
    };
    const onEnter = () => {
      ring.style.opacity = '1';
      dot.style.opacity = '1';
    };

    const frame = () => {
      // Nearest magnetic target within pull radius
      let magnet: HTMLElement | null = null;
      let best = 130;
      for (const el of targets) {
        if (!el.isConnected) continue;
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const d = Math.hypot(mx - cx, my - cy);
        const radius = Math.max(r.width, r.height) / 2 + 70;
        if (d < radius && d < best) {
          best = d;
          magnet = el;
        }
      }

      let tx = mx, ty = my;
      const wantGrow = magnet !== null;
      if (wantGrow !== grown) {
        grown = wantGrow;
        size = grown ? RING * GROW : RING;
        ring.style.width = `${size}px`;
        ring.style.height = `${size}px`;
      }
      if (magnet) {
        const r = magnet.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        tx = mx + (cx - mx) * PULL;
        ty = my + (cy - my) * PULL;
        // Gentle element pull toward the pointer
        const ex = (mx - cx) * EL_PULL;
        const ey = (my - cy) * EL_PULL;
        magnet.style.transform = `translate(${ex.toFixed(1)}px,${ey.toFixed(1)}px)`;
        moved.set(magnet, performance.now());
      }
      // Release elements the pointer left
      const now = performance.now();
      for (const [el, t] of moved) {
        if ((el !== magnet && now - t > 60) || !el.isConnected) {
          el.style.transform = '';
          moved.delete(el);
        }
      }

      rx += (tx - rx) * FOLLOW;
      ry += (ty - ry) * FOLLOW;
      dx += (mx - dx) * 0.65;
      dy += (my - dy) * 0.65;
      const off = size / 2;
      ring.style.transform = `translate(${(rx - off).toFixed(1)}px,${(ry - off).toFixed(1)}px)`;
      dot.style.transform = `translate(${(dx - 3).toFixed(1)}px,${(dy - 3).toFixed(1)}px)`;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    document.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);
    window.addEventListener('resize', cache);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
      window.removeEventListener('resize', cache);
      document.documentElement.classList.remove('has-magnetic-cursor');
      for (const el of moved.keys()) el.style.transform = '';
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="magnetic-ring" aria-hidden="true" />
      <div ref={dotRef} className="magnetic-dot" aria-hidden="true" />
      {children}
    </>
  );
}
