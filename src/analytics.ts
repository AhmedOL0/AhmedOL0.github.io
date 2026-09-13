import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';

declare global {
  interface Window {
    goatcounter?: {
      count: (vars: {
        path: string;
        event: boolean;
        title?: string;
        referrer?: string;
        screen?: string;
        meta?: Record<string, string | number>;
      }) => void;
    };
  }
}

function sendToGoatCounter(event: string, meta: Record<string, string | number>) {
  if (!window.goatcounter) return;
  window.goatcounter.count({
    path: `/perf/${event}`,
    event: true,
    meta,
  });
}

function sendVitals() {
  onCLS((e) => sendToGoatCounter('cls', { value: Math.round(e.value * 1000) }));
  onFCP((e) => sendToGoatCounter('fcp', { value: Math.round(e.value) }));
  onLCP((e) => sendToGoatCounter('lcp', { value: Math.round(e.value) }));
  onINP((e) => sendToGoatCounter('inp', { value: Math.round(e.value) }));
  onTTFB((e) => sendToGoatCounter('ttfb', { value: Math.round(e.value) }));
}

function sendErrors() {
  window.addEventListener('error', (e) => {
    if (!window.goatcounter) return;
    window.goatcounter.count({
      path: '/error/js',
      event: true,
      meta: {
        msg: String(e.message).slice(0, 120),
        source: String(e.filename).slice(0, 80),
        line: e.lineno ?? 0,
        col: e.colno ?? 0,
      },
    });
  });

  window.addEventListener('unhandledrejection', (e) => {
    if (!window.goatcounter) return;
    window.goatcounter.count({
      path: '/error/promise',
      event: true,
      meta: {
        msg: String(e.reason?.message ?? e.reason ?? 'unknown').slice(0, 120),
      },
    });
  });
}

export function initAnalytics() {
  sendVitals();
  sendErrors();
}
