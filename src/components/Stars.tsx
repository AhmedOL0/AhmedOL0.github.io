import { useEffect, useRef } from 'react';

type Star = { x: number; y: number; r: number; phase: number; speed: number; depth: number; gold: boolean };

export default function Stars() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0, h = 0, raf = 0;
    let stars: Star[] = [];
    const mouse = { x: 0.5, y: 0.4 };
    const px = { x: 0.5, y: 0.4 };

    const seed = () => {
      const n = Math.min(950, Math.floor((w * h) / 1700));
      stars = Array.from({ length: n }, () => ({
        x: Math.random(), y: Math.random(),
        r: 0.3 + Math.random() * 1.4,
        phase: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 1.6,
        depth: 0.3 + Math.random() * 0.7,
        gold: Math.random() < 0.14,
      }));
    };
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX / w;
      mouse.y = e.clientY / h;
    };
    const draw = (t: number) => {
      const dark = document.documentElement.getAttribute('data-theme') !== 'light';
      ctx.clearRect(0, 0, w, h);
      px.x += (mouse.x - px.x) * 0.04;
      px.y += (mouse.y - px.y) * 0.04;
      // Slow constant drift (like a rotating star sphere) + mouse parallax
      const driftX = reduced ? 0 : Math.sin(t * 0.000045) * 26;
      const driftY = reduced ? 0 : Math.cos(t * 0.00006) * 18;
      for (const s of stars) {
        const tw = reduced ? 0.7 : 0.25 + 0.75 * Math.abs(Math.sin(t * 0.001 * s.speed + s.phase));
        const ox = (px.x - 0.5) * 70 * s.depth + driftX * s.depth;
        const oy = (px.y - 0.5) * 70 * s.depth + driftY * s.depth;
        ctx.beginPath();
        ctx.arc(s.x * w + ox, s.y * h + oy, s.r, 0, Math.PI * 2);
        if (s.gold) {
          ctx.fillStyle = dark
            ? `rgba(236,211,168,${(tw * 0.9).toFixed(3)})`
            : `rgba(138,106,62,${(tw * 0.6).toFixed(3)})`;
        } else {
          ctx.fillStyle = dark
            ? `rgba(235,228,214,${(tw * 0.85).toFixed(3)})`
            : `rgba(45,38,26,${(tw * 0.55).toFixed(3)})`;
        }
        ctx.fill();
      }
      if (!reduced) raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    if (!window.matchMedia('(pointer:coarse)').matches) {
      document.addEventListener('mousemove', onMove);
    }
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  );
}
