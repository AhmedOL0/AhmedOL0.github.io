import { useEffect, useRef } from 'react';

const TRAIL = 8;
const calm = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const points = useRef<{ x: number; y: number; life: number }[]>([]);

  useEffect(() => {
    if (calm) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const onResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };

    const onMove = (e: MouseEvent) => {
      points.current.push({ x: e.clientX, y: e.clientY, life: 1 });
      if (points.current.length > TRAIL) points.current.shift();
    };

    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const pts = points.current;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.life -= 0.06;
        if (p.life <= 0) { pts.splice(i, 1); i--; continue; }
        const alpha = p.life * 0.4;
        const size = p.life * 4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,118,${alpha})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (calm) return null;
  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, zIndex: 58, pointerEvents: 'none' }}
      aria-hidden="true"
    />
  );
}
