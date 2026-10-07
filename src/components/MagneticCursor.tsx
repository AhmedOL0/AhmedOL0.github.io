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
    // Cached geometry: avoids getBoundingClientRect() on every rAF (forced reflow).
    // Refreshed on scroll/resize + every 1200ms, which is plenty for a cursor effect.
    let rects = new Map<HTMLElement, { cx: number; cy: number; radius: number }>();
    const moved = new Map<HTMLElement, number>();

    const cache = () => {
      targets = Array.from(document.querySelectorAll<HTMLElement>('[data-magnetic]'));
      const next = new Map<HTMLElement, { cx: number; cy: number; radius: number }>();
      for (const el of targets) {
        const r = el.getBoundingClientRect();
        next.set(el, {
          cx: r.left + r.width / 2,
          cy: r.top + r.height / 2,
          radius: Math.max(r.width, r.height) / 2 + 70,
        });
      }
      rects = next;
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
      // Nearest magnetic target within pull radius (uses cached rects — no layout read here)
      let magnet: HTMLElement | null = null;
      let magnetCx = 0, magnetCy = 0;
      let best = 130;
      for (const el of targets) {
        if (!el.isConnected) continue;
        const c = rects.get(el);
        if (!c) continue;
        const d = Math.hypot(mx - c.cx, my - c.cy);
        if (d < c.radius && d < best) {
          best = d;
          magnet = el;
          magnetCx = c.cx;
          magnetCy = c.cy;
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
        tx = mx + (magnetCx - mx) * PULL;
        ty = my + (magnetCy - my) * PULL;
        // Gentle element pull toward the pointer
        const ex = (mx - magnetCx) * EL_PULL;
        const ey = (my - magnetCy) * EL_PULL;
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
    // Pause the rAF loop in background tabs (battery + CPU on laptops).
    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!raf) {
        cache();
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener('visibilitychange', onVis);
    // Viewport-relative rects go stale on scroll — refresh at most once per frame.
    let scrollRaf = 0;
    const onScroll = () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => { scrollRaf = 0; cache(); });
    };
    document.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(scrollRaf);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVis);
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
