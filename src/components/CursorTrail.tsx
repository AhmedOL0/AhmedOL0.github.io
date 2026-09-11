import { useEffect, useRef } from 'react';

interface Point {
  x: number; y: number;
  vx: number; vy: number;
  life: number; maxLife: number;
  size: number; hue: number;
}

const MAX = 40;
const LINE_DIST = 120;

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const points = useRef<Point[]>([]);
  const raf = useRef(0);
  const mouse = useRef({ x: 0, y: 0, px: 0, py: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (window.matchMedia('(pointer:coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: MouseEvent) => {
      const m = mouse.current;
      m.px = m.x; m.py = m.y;
      m.x = e.clientX; m.y = e.clientY;

      const dx = m.x - m.px;
      const dy = m.y - m.py;
      const speed = Math.sqrt(dx * dx + dy * dy);
      const count = Math.min(3, Math.floor(speed / 8) + 1);

      for (let i = 0; i < count; i++) {
        const t = i / count;
        const spread = (Math.random() - 0.5) * 6;
        const angle = Math.atan2(dy, dx) + spread;
        const v = 0.3 + Math.random() * 0.8;
        points.current.push({
          x: m.x + dx * t * 0.3,
          y: m.y + dy * t * 0.3,
          vx: Math.cos(angle) * v,
          vy: Math.sin(angle) * v,
          life: 1,
          maxLife: 1,
          size: 1.5 + Math.random() * 2.5 + Math.min(speed * 0.04, 3),
          hue: 36 + Math.random() * 14,
        });
      }
      while (points.current.length > MAX) points.current.shift();
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const draw = () => {
      const dpr = window.devicePixelRatio || 1;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      const pts = points.current;

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.life -= 0.018;
        if (p.life <= 0) { pts.splice(i, 1); i--; continue; }
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.vy += 0.012;
      }

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i], b = pts[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINE_DIST) {
            const alpha = (1 - dist / LINE_DIST) * Math.min(a.life, b.life) * 0.18;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(201,168,118,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      for (const p of pts) {
        const alpha = p.life * 0.55;
        const r = p.size * p.life;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},55%,60%,${alpha})`;
        ctx.fill();

        if (r > 2) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, r * 2.5, 0, Math.PI * 2);
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 2.5);
          grad.addColorStop(0, `hsla(${p.hue},55%,60%,${alpha * 0.4})`);
          grad.addColorStop(1, `hsla(${p.hue},55%,60%,0)`);
          ctx.fillStyle = grad;
          ctx.fill();
        }
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
