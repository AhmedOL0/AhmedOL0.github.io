import { test, expect } from '@playwright/test';

// Content integrity: case-study composition renders for every project,
// in both languages, with human copy (no lorem/placeholder residue).
test.describe('Case-study content', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  for (const lang of ['EN', 'FR'] as const) {
    test(`every project card has a highlight (${lang})`, async ({ page }) => {
      if (lang === 'FR') {
        await page.locator('.langsw button', { hasText: 'FR' }).click();
        await page.waitForTimeout(500);
      }
      const cards = page.locator('#work .card');
      const count = await cards.count();
      expect(count).toBeGreaterThan(0);
      for (let i = 0; i < count; i++) {
        const card = cards.nth(i);
        // content-visibility:auto skips rendering off-screen subtrees (where
        // innerText reads empty). Scroll in-page like a real visitor (the
        // protocol-level scrollIntoViewIfNeeded does not trigger rendering in
        // WebKit) and read textContent, which is render-independent.
        await card.evaluate((el) => (el as HTMLElement).scrollIntoView({ block: 'center' }));
        await expect
          .poll(async () => ((await card.locator('.eh-label').textContent()) ?? '').trim().length, { message: `card ${i} highlight label renders` })
          .toBeGreaterThan(0);
        const text = (await card.locator('.eh-text').textContent()) ?? '';
        expect(text.trim().length, `card ${i} highlight text`).toBeGreaterThan(40);
        expect(text, `card ${i} no placeholder`).not.toMatch(/lorem|todo|tbd|xxx/i);
      }
    });
  }

  test('engineering notes are opt-in and keep their copy', async ({ page }) => {
    const card = page.locator('#work .card').first();
    await card.evaluate((el) => (el as HTMLElement).scrollIntoView({ block: 'center' }));
    const notes = card.locator('details.case-notes');
    const summary = notes.locator('summary');
    await expect(notes).not.toHaveAttribute('open', '');
    await expect(notes.locator('.eh-text')).toBeHidden();

    await summary.scrollIntoViewIfNeeded();
    await expect(summary).toBeInViewport();
    await summary.click();
    await expect(notes).toHaveAttribute('open', '');
    await expect(notes.locator('.eh-text')).toBeVisible();
  });

  test('print media reveals lazy sections and closed notes', async ({ page }) => {
    await page.emulateMedia({ media: 'print' });
    await expect
      .poll(() => page.locator('#work').evaluate((el) => getComputedStyle(el).contentVisibility))
      .toBe('visible');
    await expect(page.locator('#work details.case-notes').first()).toHaveAttribute('open', '');
    const summaryDisplay = await page
      .locator('#work details.case-notes summary')
      .first()
      .evaluate((el) => getComputedStyle(el).display);
    expect(summaryDisplay).toBe('none');
  });

  test('hero contact strip exposes direct channels', async ({ page }) => {
    const strip = page.locator('.hero-contact');
    await expect(strip).toBeVisible();
    await expect(strip.locator('a[href^="mailto:"]')).toContainText('@');
    await expect(strip.locator('a[href^="tel:"]')).toBeVisible();
  });

  test('direct contact rows offer copy confirmation', async ({ page }) => {
    await page.locator('#contact .direct').scrollIntoViewIfNeeded();
    const btn = page.locator('.copy-btn').first();
    await expect(btn).toContainText('Copy');
    await btn.click();
    await expect(btn).toContainText('Copied');
  });

  test('no fabricated-role language anywhere', async ({ page }) => {
    const body = (await page.content()).toLowerCase();
    for (const phrase of ['lead architect', 'principal engineer', 'dental prosthetics', '10x engineer']) {
      expect(body, `must not contain "${phrase}"`).not.toContain(phrase);
    }
  });

  test('no em dashes or hype words in rendered copy', async ({ page }) => {
    // Render everything first: content-visibility skips off-screen subtrees.
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < height; y += 600) {
      await page.evaluate((pos) => window.scrollTo(0, pos), y);
      await page.waitForTimeout(80);
    }
    const text = await page.evaluate(() => document.body.innerText);
    expect(text, 'no em dashes in UI copy').not.toContain('—');
    for (const word of ['delve', 'tapestry', 'seamless', 'cutting-edge', 'cutting edge', 'game-changer', 'nestled', 'vibrant', 'elevate', 'supercharge']) {
      expect(text.toLowerCase(), `no hype word "${word}"`).not.toContain(word);
    }
  });

  test('French mode leaks no untranslated copy', async ({ page }) => {
    await page.locator('.langsw button', { hasText: 'FR' }).click();
    await page.waitForTimeout(500);
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < height; y += 600) {
      await page.evaluate((pos) => window.scrollTo(0, pos), y);
      await page.waitForTimeout(80);
    }
    const text = await page.evaluate(() => document.body.innerText);
    for (const phrase of ['shipped', 'Morocco', 'Send message', 'Your name']) {
      expect(text, `FR page must not contain EN copy "${phrase}"`).not.toContain(phrase);
    }
  });
});
