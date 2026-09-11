import { test, expect } from '@playwright/test';

test.describe('Accessibility (WCAG 2.2)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('has no auto-playing media', async ({ page }) => {
    const videos = await page.locator('video[autoplay]').count();
    const audios = await page.locator('audio[autoplay]').count();
    expect(videos).toBe(0);
    expect(audios).toBe(0);
  });

  test('all images have alt text', async ({ page }) => {
    const images = page.locator('img');
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      expect(alt, `Image ${i} missing alt`).not.toBeNull();
      expect(alt!.length, `Image ${i} has empty alt`).toBeGreaterThan(0);
    }
  });

  test('form inputs have associated labels', async ({ page }) => {
    const inputs = page.locator('input:not([type="hidden"]), textarea');
    const count = await inputs.count();
    for (let i = 0; i < count; i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledBy = await input.getAttribute('aria-labelledby');
      const hasLabel = id ? await page.locator(`label[for="${id}"]`).count() > 0 : false;
      expect(
        hasLabel || !!ariaLabel || !!ariaLabelledBy,
        `Input ${i} (id=${id}) has no associated label`
      ).toBeTruthy();
    }
  });

  test('skip-to-content link exists and is focusable', async ({ page }) => {
    const skipLink = page.locator('a[href="#work"]').first();
    await expect(skipLink).toBeAttached();
    await skipLink.focus();
    await expect(skipLink).toBeVisible();
  });

  test('navigation has accessible aria-label', async ({ page }) => {
    const nav = page.locator('[role="navigation"]');
    await expect(nav).toHaveAttribute('aria-label');
  });

  test('headings follow sequential order (h1 → h2 → h3)', async ({ page }) => {
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').allInnerTexts();
    const levels = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
        .map(h => parseInt(h.tagName[1]));
    });

    let prevLevel = 0;
    for (let i = 0; i < levels.length; i++) {
      const level = levels[i];
      if (prevLevel > 0) {
        expect(
          level,
          `Heading "${headings[i]}" (h${level}) follows h${prevLevel} — must not skip levels`
        ).toBeLessThanOrEqual(prevLevel + 1);
      }
      prevLevel = level;
    }
  });

  test('marquee is hidden from screen readers', async ({ page }) => {
    const marquee = page.locator('.marquee');
    await expect(marquee).toHaveAttribute('aria-hidden', 'true');
  });

  test('decorative elements are hidden from assistive tech', async ({ page }) => {
    const decorative = page.locator('[aria-hidden="true"]');
    const count = await decorative.count();
    expect(count).toBeGreaterThan(0);
  });

  test('focus indicators are visible on interactive elements', async ({ page }) => {
    const link = page.locator('a.btn').first();
    await link.focus();
    const outline = await link.evaluate(el => {
      const style = window.getComputedStyle(el);
      return style.outlineStyle || style.outline;
    });
    expect(outline).not.toBe('none');
  });

  test('lang attribute is set on html element', async ({ page }) => {
    const lang = await page.locator('html').getAttribute('lang');
    expect(lang).toBeTruthy();
    expect(['en', 'fr', 'ar']).toContain(lang);
  });

  test('color scheme meta tag is present', async ({ page }) => {
    const meta = page.locator('meta[name="color-scheme"]');
    await expect(meta).toBeAttached();
  });
});
