import { test, expect } from '@playwright/test';

test.describe('Visual Regression', () => {
  test('hero section screenshot matches baseline', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2500);

    await expect(page).toHaveScreenshot('hero-desktop.png', {
      maxDiffPixelRatio: 0.35,
      animations: 'disabled',
      timeout: 15000,
    });
  });

  test('dark and light themes look correct', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2500);

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
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2500);

    await expect(page).toHaveScreenshot('mobile-viewport.png', {
      maxDiffPixelRatio: 0.15,
      animations: 'disabled',
      timeout: 15000,
    });
  });
});
