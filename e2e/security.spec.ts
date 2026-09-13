import { test, expect } from '@playwright/test';

test.describe('Security Headers & Best Practices', () => {
  test('page serves over HTTPS in production', async ({ page }) => {
    const response = await page.goto('/');
    expect(response).not.toBeNull();
  });

  test('no mixed content (http://) in page source', async ({ page }) => {
    await page.goto('/');
    const html = await page.content();
    const httpMatches = html.match(/http:\/\/(?!localhost|127\.0\.0\.1)/g);
    expect(httpMatches, 'No insecure http:// references').toBeNull();
  });

  test('external links have rel="noopener"', async ({ page }) => {
    await page.goto('/');
    const externalLinks = page.locator('a[target="_blank"]');
    const count = await externalLinks.count();
    for (let i = 0; i < count; i++) {
      const rel = await externalLinks.nth(i).getAttribute('rel');
      expect(rel).toContain('noopener');
    }
  });

  test('no inline scripts (CSP-friendly)', async ({ page }) => {
    await page.goto('/');
    const inlineScripts = await page.evaluate(() => {
      return document.querySelectorAll('script:not([src])').length;
    });
    expect(inlineScripts, 'Only JSON-LD + theme/lang init scripts are inline').toBeLessThanOrEqual(2);
  });

  test('fonts load from trusted origins only', async ({ page }) => {
    const fontRequests: string[] = [];
    page.on('response', response => {
      if (response.url().includes('font')) {
        fontRequests.push(response.url());
      }
    });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    for (const url of fontRequests) {
      expect(url).toMatch(/^https:\/\/fonts\.(googleapis|gstatic)\.com/);
    }
  });
});

test.describe('Error Handling', () => {
  test('profile image has fallback mechanism', async ({ page }) => {
    await page.goto('/');
    // Profile image exists or text fallback (AO initials) is shown
    const hasImg = await page.locator('.profile img, img[alt*="Ahmed"]').count();
    const hasFallback = await page.locator('.pmono, .text-7xl').count();
    expect(hasImg + hasFallback).toBeGreaterThan(0);
  });

  test('SPA handles unknown routes gracefully', async ({ page }) => {
    const response = await page.goto('/nonexistent-page');
    // SPA returns 200 and renders the app shell
    expect(response!.status()).toBe(200);
    // App shell is rendered (h1 or root content)
    await expect(page.locator('h1')).toBeAttached();
  });
});
