import { useEffect, useRef, useState } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('ao-theme');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch { /* ignore */ }
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('ao-theme', theme);
    } catch { /* ignore */ }
  }, [theme]);
  return { theme, toggle: () => setTheme((t) => (t === 'light' ? 'dark' : 'light')) };
}

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add('reveal');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      }),
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

export function useStaggerReveal<T extends HTMLElement>(selector = ':scope > *') {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const children = Array.from(el.querySelectorAll(selector)) as HTMLElement[];
    children.forEach((child, i) => {
      child.classList.add('stagger-item');
      child.style.transitionDelay = `${i * 80}ms`;
    });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('stagger-in');
          io.unobserve(e.target);
        }
      }),
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [selector]);
  return ref;
}

export function useCountUp(target: number, start: boolean, duration = 1500, onDone?: () => void) {
  const [value, setValue] = useState(0);
  const doneRef = useRef(false);
  const calmRef = useRef(false);
  if (!calmRef.current && typeof window !== 'undefined') {
    calmRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  // Stable ref: a fresh inline callback must NOT restart the loop every render.
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;
  useEffect(() => {
    if (!start || doneRef.current) return;
    if (calmRef.current) {
      setValue(target);
      doneRef.current = true;
      onDoneRef.current?.();
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min((t - t0) / duration, 1);
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setValue(Math.round(target * eased));
      if (p < 1) {
        raf = requestAnimationFrame(step);
      } else {
        doneRef.current = true;
        onDoneRef.current?.();
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return value;
}

export function useInView<T extends HTMLElement>(threshold = 0.6) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      }),
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export function useSpotlight() {
  useEffect(() => {
    if (!window.matchMedia('(pointer:fine)').matches) return;
    const spot = document.getElementById('spot');
    if (!spot) return;
    let sx = -600, sy = -600, tx = sx, ty = sy, raf = 0;
    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      spot.style.opacity = '1';
    };
    const onLeave = () => { spot.style.opacity = '0'; };
    const orbs = Array.from(document.querySelectorAll<HTMLElement>('.orb'));
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const depths = calm ? [0, 0, 0, 0] : [0.05, -0.07, 0.035, -0.05];
    const scrollK = [0.06, 0.12, 0.04, 0.1];
    const follow = () => {
      sx += (tx - sx) * 0.08;
      sy += (ty - sy) * 0.08;
      spot.style.transform = `translate(${sx - 380}px,${sy - 380}px)`;
      const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
      const sy2 = calm ? 0 : window.scrollY;
      orbs.forEach((el, i) => {
        const d = depths[i % depths.length];
        const k = scrollK[i % scrollK.length];
        // `translate` property: independent from the CSS keyframe `transform`
        el.style.translate = `${(sx - cx) * d}px ${(sy - cy) * d + sy2 * k}px`;
      });
      raf = requestAnimationFrame(follow);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(follow);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);
}

export function useProgress() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setWidth(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    document.addEventListener('scroll', onScroll, { passive: true });
    return () => document.removeEventListener('scroll', onScroll);
  }, []);
  return width;
}

export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState('');
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) setActive(e.target.id);
      }),
      { rootMargin: '-40% 0px -55% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids.join('|')]);
  return active;
}

export function useMagnetic() {
  useEffect(() => {
    if (
      window.matchMedia('(pointer:coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-magnetic]'));
    const cleanups = els.map((el) => {
      const strength = 0.32;
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${dx * strength}px,${dy * strength}px)`;
      };
      const onLeave = () => {
        el.style.transform = '';
      };
      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
      return () => {
        el.removeEventListener('mousemove', onMove);
        el.removeEventListener('mouseleave', onLeave);
      };
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);
}

export function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    let last = -1;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const v = window.scrollY;
        if (v !== last) {
          last = v;
          setY(v);
        }
      });
    };
    onScroll();
    document.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      document.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return y;
}

export function useBackToTop(threshold = 700) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(document.documentElement.scrollTop > threshold);
    onScroll();
    document.addEventListener('scroll', onScroll, { passive: true });
    return () => document.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return show;
}
