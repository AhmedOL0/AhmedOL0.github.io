import { test, expect, type Page } from '@playwright/test';

/**
 * The terminal preloader overlays the page for ~3.1s after mount. Screenshotting
 * on a fixed 2500ms timer raced it - the capture sometimes caught the preloader,
 * sometimes the settled hero (that was the intermittent "mobile viewport" failure,
 * and some baselines even recorded the preloader). Waiting for it to unmount makes
 * every capture a fixed offset after mount: same hero state, same typing word.
 */
async function gotoSettled(page: Page) {
  await page.goto('/');
  await expect(page.locator('.loader')).toBeHidden({ timeout: 20000 });
  await page.waitForTimeout(700);
}

test.describe('Visual Regression', () => {
  test('hero section screenshot matches baseline', async ({ page }) => {
    await gotoSettled(page);

    await expect(page).toHaveScreenshot('hero-desktop.png', {
      maxDiffPixelRatio: 0.35,
      animations: 'disabled',
      timeout: 15000,
    });
  });

  test('dark and light themes look correct', async ({ page }) => {
    await gotoSettled(page);

    await expect(page).toHaveScreenshot('theme-dark.png', {
      maxDiffPixelRatio: 0.35,
      animations: 'disabled',
      timeout: 15000,
    });

    const toggle = page.locator('button[aria-label*="light"], button[aria-label*="dark"]').first();
    await toggle.click();
    await page.waitForTimeout(1500);

    await expect(page).toHaveScreenshot('theme-light.png', {
      maxDiffPixelRatio: 0.15,
      animations: 'disabled',
      timeout: 15000,
    });
  });

  test('mobile viewport screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await gotoSettled(page);

    await expect(page).toHaveScreenshot('mobile-viewport.png', {
      maxDiffPixelRatio: 0.15,
      animations: 'disabled',
      timeout: 15000,
    });
  });
});
