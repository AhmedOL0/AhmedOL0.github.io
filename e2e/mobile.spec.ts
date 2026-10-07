import { test, expect } from '@playwright/test';

// Mobile journey probes: overflow sweep, scroll fluidity, tap obstruction.
// Generous budgets — these guard against regressions, not for benchmarking.

const WIDTHS = [320, 360, 375, 390, 412, 430];

for (const width of WIDTHS) {
  test.describe(`Mobile journey ${width}px`, () => {
    test.use({ viewport: { width, height: 844 } });

    test.beforeEach(async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(1200); // dock entrance + lazy chunks + webfonts
    });

    test('no horizontal overflow', async ({ page }) => {
      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth - document.documentElement.clientWidth;
      });
      expect(overflow, `${width}px: horizontal overflow`).toBeLessThanOrEqual(0);
    });

    test('hero h1 + CTAs fully on-screen width', async ({ page }) => {
      for (const sel of ['h1', '.hero-actions .btn']) {
        const els = page.locator(sel);
        for (let i = 0; i < await els.count(); i++) {
          const box = await els.nth(i).boundingBox();
          if (!box) continue;
          expect(box.x, `${sel}[${i}] clipped left`).toBeGreaterThanOrEqual(-1);
          expect(box.x + box.width, `${sel}[${i}] clipped right`).toBeLessThanOrEqual(width + 1);
        }
      }
    });

    test('hero CTAs are tappable (not covered by dock)', async ({ page }) => {
      const ctas = page.locator('.hero-actions .btn');
      for (let i = 0; i < await ctas.count(); i++) {
        const el = ctas.nth(i);
        const hit = await el.evaluate((node) => {
          const r = node.getBoundingClientRect();
          if (r.bottom < 0 || r.top > window.innerHeight) return 'offscreen';
          const t = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
          return t === node || (t ? node.contains(t) : false) ? 'hit' : (t as Element)?.className?.toString().slice(0, 40) ?? 'none';
        });
        expect(hit, `CTA ${i} obstructed by: ${hit}`).toBe('hit');
      }
    });
  });
}

test.describe('Mobile scroll fluidity', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('full scroll journey stays under jank budget', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await page.evaluate(() => {
      (window as any).__longtasks = [];
      const io = new PerformanceObserver((list) => {
        for (const e of list.getEntries()) (window as any).__longtasks.push(e.duration);
      });
      io.observe({ type: 'longtask', buffered: true });
      (window as any).__stopLT = () => io.disconnect();
    });

    // Step-scroll top → bottom like a thumb flicking through the page
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < height; y += 500) {
      await page.evaluate((pos) => window.scrollTo({ top: pos, behavior: 'instant' as ScrollBehavior }), y);
      await page.waitForTimeout(120);
    }
    await page.waitForTimeout(400);

    const tasks: number[] = await page.evaluate(() => {
      (window as any).__stopLT();
      return (window as any).__longtasks;
    });
    const worst = tasks.length ? Math.max(...tasks) : 0;
    const blocking = tasks.filter((d) => d > 50).reduce((a, d) => a + (d - 50), 0);
    expect(tasks.filter((d) => d > 200).length, `tasks >200ms: [${tasks.join(',')}]`).toBe(0);
    expect(worst, `worst task ${worst}ms`).toBeLessThanOrEqual(200);
    expect(blocking, `total blocking ${blocking}ms`).toBeLessThan(1000);
  });

  test('all lazy sections render after scroll (content-visibility safe)', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    for (const id of ['what-i-do', 'how-i-work', 'work', 'experience', 'education', 'behind', 'about', 'contact']) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      await expect(page.locator(`#${id}`), `#${id} renders`).toBeVisible();
    }
  });

  test('all visible tap targets meet 24px WCAG minimum', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const small = await page.evaluate(() => {
      const out: string[] = [];
      for (const el of Array.from(document.querySelectorAll('a, button'))) {
        const h = el as HTMLElement;
        const r = h.getBoundingClientRect();
        const style = getComputedStyle(h);
        if (r.width === 0 || style.visibility === 'hidden' || style.display === 'none') continue;
        if (r.bottom < 0 || r.top > window.innerHeight) continue; // below fold checked after scroll
        if (r.height < 24 || r.width < 24) {
          out.push(`${h.tagName}.${(h.className?.toString() || '').split(' ')[0]} ${Math.round(r.width)}×${Math.round(r.height)} "${h.textContent?.trim().slice(0, 20)}"`);
        }
      }
      return out;
    });
    expect(small, `undersized targets:\n${small.join('\n')}`).toEqual([]);
  });
});

test.describe('Mobile landscape 844×390', () => {
  test.use({ viewport: { width: 844, height: 390 } });

  test('no overflow, hero copy + CTAs reachable', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(800);
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth - document.documentElement.clientWidth;
    });
    expect(overflow, 'landscape overflow').toBeLessThanOrEqual(0);
    await expect(page.locator('h1')).toBeVisible();
    const ctas = page.locator('.hero-actions .btn');
    for (let i = 0; i < await ctas.count(); i++) {
      const hit = await ctas.nth(i).evaluate((node) => {
        const r = node.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return 'offscreen';
        const t = document.elementFromPoint(r.left + r.width / 2, Math.min(r.top + r.height / 2, window.innerHeight - 1));
        return t === node || (t ? node.contains(t) : false) ? 'hit' : 'covered';
      });
      expect(hit === 'hit' || hit === 'offscreen', `landscape CTA ${i}: ${hit}`).toBeTruthy();
    }
  });
});
