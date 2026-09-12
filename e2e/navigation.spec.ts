import { test, expect } from '@playwright/test';

test.describe('Navigation & Interaction', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('smooth scroll to sections via dock', async ({ page }) => {
    const dockLinks = page.locator('.dock a[href^="#"]');
    const count = await dockLinks.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const href = await dockLinks.nth(i).getAttribute('href');
      if (href === '#top') continue;
      await page.evaluate((h) => {
        const link = document.querySelector(`.dock a[href="${h}"]`);
        if (link) (link as HTMLElement).click();
      }, href);
      await page.waitForTimeout(600);
      const section = page.locator(href!);
      await expect(section).toBeAttached();
    }
  });

  test('theme toggle switches dark/light mode', async ({ page }) => {
    const html = page.locator('html');
    const initialTheme = await html.getAttribute('data-theme');

    const toggleBtn = page.locator('button[aria-label*="light"], button[aria-label*="dark"]').first();
    await toggleBtn.click();
    await page.waitForTimeout(400);

    const newTheme = await html.getAttribute('data-theme');
    expect(newTheme).not.toBe(initialTheme);
  });

  test('language switcher changes content', async ({ page }) => {
    const initialTitle = await page.locator('h1').innerText();

    const frBtn = page.locator('.langsw button', { hasText: 'FR' });
    await frBtn.click();
    await page.waitForTimeout(300);

    const frTitle = await page.locator('h1').innerText();
    expect(frTitle).not.toBe(initialTitle);
  });

  test('work filter buttons toggle project cards', async ({ page }) => {
    const allBtn = page.locator('.filters button', { hasText: /all|tous/i });
    const webBtn = page.locator('.filters button', { hasText: /web/i });

    await allBtn.click({ force: true });
    const allCount = await page.locator('.card').count();

    await webBtn.click({ force: true });
    await page.waitForTimeout(200);
    const webCount = await page.locator('.card').count();

    expect(webCount).toBeLessThanOrEqual(allCount);
    expect(webCount).toBeGreaterThan(0);
  });

  test('contact form fields are interactive', async ({ page }) => {
    await page.locator('a[href="#contact"]').first().click();
    await page.waitForTimeout(600);

    const nameInput = page.locator('#contact-name');
    await nameInput.fill('Test User');
    await expect(nameInput).toHaveValue('Test User');

    const emailInput = page.locator('#contact-email');
    await emailInput.fill('test@example.com');
    await expect(emailInput).toHaveValue('test@example.com');

    const msgInput = page.locator('#contact-message');
    await msgInput.fill('Hello from Playwright');
    await expect(msgInput).toHaveValue('Hello from Playwright');
  });

  test('back-to-top button gets show class on scroll', async ({ page }) => {
    const toTopBtn = page.locator('#toTop');
    // Button exists in DOM
    await expect(toTopBtn).toBeAttached();

    // Before scroll: no .show class
    const initialClass = await toTopBtn.getAttribute('class');
    expect(initialClass, 'no show class at top').not.toContain('show');

    // After scroll: .show class added
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(400);
    const scrolledClass = await toTopBtn.getAttribute('class');
    expect(scrolledClass, 'show class after scroll').toContain('show');
  });

  test('CV download link works', async ({ page }) => {
    // Two matches (top pill + footer button): assert on the first.
    const cvLink = page.locator('a[href*="CV"][download]').first();
    await expect(cvLink).toBeAttached();
    const href = await cvLink.getAttribute('href');
    expect(href).toContain('CV');
    expect(href).toContain('.pdf');
  });
});
