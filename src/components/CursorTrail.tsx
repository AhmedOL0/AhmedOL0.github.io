import { useEffect, useRef } from 'react';

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const points = useRef<{ x: number; y: number; life: number }[]>([]);
  const raf = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      points.current.push({ x: e.clientX, y: e.clientY, life: 1 });
      if (points.current.length > 20) points.current.shift();
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pts = points.current;
      for (let i = 0; i < pts.length; i++) {
        pts[i].life -= 0.04;
        if (pts[i].life <= 0) { pts.splice(i, 1); i--; continue; }
        const alpha = pts[i].life * 0.35;
        const r = pts[i].life * 3;
        ctx.beginPath();
        ctx.arc(pts[i].x, pts[i].y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,118,${alpha})`;
        ctx.fill();
      }
      raf.current = requestAnimationFrame(draw);
    };
    raf.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: 50, pointerEvents: 'none' }}
    />
  );
}
