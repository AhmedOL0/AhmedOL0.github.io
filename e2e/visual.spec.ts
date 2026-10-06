import { test, expect, type Page } from '@playwright/test';

/**
 * Captures run a fixed offset after mount so every screenshot starts from the
 * same hero state (animations disabled below).
 */
async function gotoSettled(page: Page) {
  await page.goto('/');
  await page.waitForTimeout(700);
  // Custom cursor follows the real mouse — hide it so captures stay deterministic.
  await page.addStyleTag({ content: '.magnetic-ring,.magnetic-dot{display:none !important}' });
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
