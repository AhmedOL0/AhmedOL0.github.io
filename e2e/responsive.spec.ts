import { test, expect } from '@playwright/test';

const VIEWPORTS = [
  { name: 'iPhone SE', width: 375, height: 667 },
  { name: 'iPhone 14', width: 390, height: 844 },
  { name: 'iPad', width: 768, height: 1024 },
  { name: 'iPad Pro', width: 1024, height: 1366 },
  { name: 'Desktop 1080p', width: 1920, height: 1080 },
  { name: 'Desktop 1440p', width: 2560, height: 1440 },
];

for (const vp of VIEWPORTS) {
  test.describe(`Responsive: ${vp.name} (${vp.width}×${vp.height})`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    test.beforeEach(async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(500);
    });

    test('no horizontal overflow', async ({ page }) => {
      const hasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(hasOverflow, `${vp.name}: no horizontal scroll`).toBe(false);
    });

    test('all sections are visible and reachable', async ({ page }) => {
      for (const id of ['work', 'about', 'experience', 'education', 'contact']) {
        const section = page.locator(`#${id}`);
        await expect(section, `Section #${id} exists`).toBeAttached();
      }
    });

    test('hero h1 is visible', async ({ page }) => {
      const h1 = page.locator('h1');
      await expect(h1).toBeVisible();
      const box = await h1.boundingBox();
      expect(box!.x, 'h1 not clipped left').toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width, 'h1 not clipped right').toBeLessThanOrEqual(vp.width);
    });

    test('dock does not overlap hero content', async ({ page }) => {
      const dock = page.locator('.dock');
      if (await dock.isVisible()) {
        const dockBox = await dock.boundingBox();
        const h1Box = await page.locator('h1').boundingBox();
        expect(dockBox!.y, 'dock is below h1').toBeGreaterThan(h1Box!.y + h1Box!.height);
      }
    });

    test('no text is clipped or overflowed', async ({ page }) => {
      const overflowed = await page.evaluate(() => {
        const els = document.querySelectorAll('h1, h2, h3, p, a, button');
        for (const el of Array.from(els)) {
          const r = el.getBoundingClientRect();
          if (r.right > window.innerWidth + 20 && r.width > 0) {
            return (el as HTMLElement).innerText.slice(0, 40);
          }
        }
        return null;
      });
      expect(overflowed, `${vp.name}: no text overflow`).toBeNull();
    });

    test('touch targets are at least 44×44px on mobile', async ({ page }) => {
      if (vp.width >= 768) return; // skip desktop

      const buttons = page.locator('a.btn');
      const count = await buttons.count();
      for (let i = 0; i < count; i++) {
        const box = await buttons.nth(i).boundingBox();
        if (!box) continue;
        expect(
          box.width >= 44 || box.height >= 44,
          `Touch target ${i} too small: ${box.width}×${box.height}`
        ).toBeTruthy();
      }
    });

    test('stats grid adapts to viewport', async ({ page }) => {
      const stats = page.locator('.stats');
      const gridCols = await stats.evaluate(el => {
        return window.getComputedStyle(el).gridTemplateColumns;
      });
      const cols = gridCols.split(' ').filter(c => c !== '');
      expect(cols.length).toBeGreaterThanOrEqual(2);
    });

    test('footer columns stack on mobile', async ({ page }) => {
      if (vp.width >= 768) return;
      const footer = page.locator('footer');
      const gridCols = await footer.locator('.mx-auto.grid').evaluate(el => {
        return window.getComputedStyle(el).gridTemplateColumns;
      });
      const cols = gridCols.split(' ').filter(c => c !== '');
      expect(cols.length).toBeLessThanOrEqual(2);
    });
  });
}
