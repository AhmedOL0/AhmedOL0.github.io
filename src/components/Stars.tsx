import { useEffect, useRef } from 'react';

type Star = { x: number; y: number; r: number; phase: number; speed: number; depth: number };

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
      const n = Math.min(190, Math.floor((w * h) / 9000));
      stars = Array.from({ length: n }, () => ({
        x: Math.random(), y: Math.random(),
        r: 0.3 + Math.random() * 1.2,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 1.4,
        depth: 0.3 + Math.random() * 0.7,
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
      for (const s of stars) {
        const tw = reduced ? 0.7 : 0.3 + 0.7 * Math.abs(Math.sin(t * 0.001 * s.speed + s.phase));
        const ox = (px.x - 0.5) * 36 * s.depth;
        const oy = (px.y - 0.5) * 36 * s.depth;
        ctx.beginPath();
        ctx.arc(s.x * w + ox, s.y * h + oy, s.r, 0, Math.PI * 2);
        ctx.fillStyle = dark
          ? `rgba(235,228,214,${(tw * 0.75).toFixed(3)})`
          : `rgba(90,70,40,${(tw * 0.4).toFixed(3)})`;
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
