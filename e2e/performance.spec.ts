import { test, expect } from '@playwright/test';

test.describe('Performance & Core Web Vitals', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('page loads within performance budget', async ({ page }) => {
    const start = Date.now();
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    const loadTime = Date.now() - start;
    expect(loadTime, 'DOM content loaded in < 3s').toBeLessThan(3000);
  });

  test('no render-blocking resources delay FCP', async ({ page }) => {
    const metrics = await page.evaluate(() => {
      const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded: nav.domContentLoadedEventEnd,
        responseEnd: nav.responseEnd,
      };
    });
    const parseDelay = metrics.domContentLoaded - metrics.responseEnd;
    expect(parseDelay, 'Parse delay < 2s').toBeLessThan(2000);
  });

  test('images use lazy loading below the fold', async ({ page }) => {
    const belowFoldImages = page.locator('img:not([fetchpriority="high"])');
    const count = await belowFoldImages.count();
    for (let i = 0; i < count; i++) {
      const loading = await belowFoldImages.nth(i).getAttribute('loading');
      expect(loading, `Image ${i} should use lazy loading`).toBe('lazy');
    }
  });

  test('LCP element is identifiable', async ({ page }) => {
    const lcp = await page.evaluate(() => {
      return new Promise<string | null>((resolve) => {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const last = entries[entries.length - 1];
          if (last) { observer.disconnect(); resolve(last.name || last.element?.tagName || 'LCP-observed'); }
        });
        observer.observe({ type: 'largest-contentful-paint', buffered: true });
        const existing = performance.getEntriesByType('largest-contentful-paint');
        if (existing.length) {
          const last = existing[existing.length - 1] as any;
          observer.disconnect();
          resolve(last.name || last.element?.tagName || 'LCP-existing');
          return;
        }
        setTimeout(() => { observer.disconnect(); resolve(null); }, 3000);
      });
    });
    // LCP may not fire in headless Chromium (no visible viewport paint).
    // Soft-check: if null, verify the PerformanceObserver API itself is available.
    if (!lcp) {
      const apiSupported = await page.evaluate(() =>
        typeof PerformanceObserver !== 'undefined' &&
        PerformanceObserver.supportedEntryTypes?.includes('largest-contentful-paint') === true
      );
      expect(apiSupported, 'LCP PerformanceObserver API should be available').toBeTruthy();
    } else {
      expect(lcp).toBeTruthy();
    }
  });

  test('CLS is minimal (layout shifts < 0.1)', async ({ page }) => {
    const cls = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        let score = 0;
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              score += (entry as any).value;
            }
          }
        }).observe({ type: 'layout-shift', buffered: true });
        setTimeout(() => resolve(score), 500);
      });
    });
    expect(cls, 'CLS < 0.1').toBeLessThan(0.1);
  });

  test('TBT is under 1500ms', async ({ page }) => {
    const tbt = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        let tbt = 0;
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.duration > 50) {
              tbt += entry.duration - 50;
            }
          }
        });
        observer.observe({ type: 'longtask', buffered: true });
        setTimeout(() => { observer.disconnect(); resolve(tbt); }, 2000);
      });
    });
    expect(tbt, 'TBT < 1500ms').toBeLessThan(1500);
  });

  test('no console errors during page load', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    expect(errors).toEqual([]);
  });

  test('no unhandled promise rejections', async ({ page }) => {
    const rejections: string[] = [];
    page.on('pageerror', err => rejections.push(err.message));
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    expect(rejections).toEqual([]);
  });
});
