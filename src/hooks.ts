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
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#161310' : '#F7F4ED');
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

export function useProgress() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      // Single layout pass per frame (was: read on every scroll event).
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setWidth(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    document.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      document.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return width;
}

export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState('');
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) setActive(e.target.id);
      }),
      { rootMargin: '-40% 0px -55% 0px' },
    );
    const observed = new Set<string>();
    const pickUp = () => {
      // Sections may mount late (React.lazy code-split) — pick up newcomers.
      ids.forEach((id) => {
        if (observed.has(id)) return;
        const el = document.getElementById(id);
        if (el) {
          io.observe(el);
          observed.add(id);
        }
      });
    };
    pickUp();
    const mo = new MutationObserver(pickUp);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [ids]);
  return active;
}

export function useBackToTop(threshold = 700) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        // Show only when past the threshold AND not scrolling down,
        // so the button never sits on content the visitor is reading.
        setShow(y > threshold && y <= last);
        last = y;
      });
    };
    onScroll();
    document.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      document.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [threshold]);
  return show;
}
