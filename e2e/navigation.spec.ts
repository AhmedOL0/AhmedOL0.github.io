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
    // Render the work section first: it sits inside a content-visibility:auto
    // block, and WebKit cannot compute click points for skipped subtrees.
    await page.evaluate(() => document.querySelector('#work')?.scrollIntoView());
    await page.waitForTimeout(400);

    const allBtn = page.locator('.filters button', { hasText: /all|tous/i });
    const webBtn = page.locator('.filters button', { hasText: /web/i });

    const allBadge = Number(await allBtn.locator('.filter-count').innerText());
    await allBtn.evaluate((el) => (el as HTMLElement).click());
    await expect.poll(() => page.locator('.card').count()).toBe(allBadge);
    const allCount = allBadge;

    const webBadge = Number(await webBtn.locator('.filter-count').innerText());
    await webBtn.evaluate((el) => (el as HTMLElement).click());
    await expect.poll(() => page.locator('.card').count()).toBe(webBadge);
    const webCount = await page.locator('.card').count();

    expect(webCount).toBeLessThanOrEqual(allCount);
    expect(webCount).toBeGreaterThan(0);
    expect(webCount).toBe(webBadge);
    await expect(page.locator('.filter-status')).toHaveAttribute('role', 'status');
    await expect(page.locator('.filter-status')).toContainText(String(webBadge));
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
    await expect(toTopBtn).toBeAttached();

    // Before scroll: no .show class
    const initialClass = await toTopBtn.getAttribute('class');
    expect(initialClass, 'no show class at top').not.toContain('show');

    // Scroll well past the 700px threshold
    await page.evaluate(() => window.scrollTo(0, 2000));
    await page.waitForTimeout(500);
    const scrolledClass = await toTopBtn.getAttribute('class');
    expect(scrolledClass, 'hidden while scrolling down').not.toContain('show');

    // Scroll up: use waitForFunction instead of fixed timeout for Firefox compat
    await page.evaluate(() => window.scrollTo(0, 1500));
    await page.waitForFunction(
      () => document.getElementById('toTop')?.classList.contains('show'),
      { timeout: 2000 },
    );
    expect(await toTopBtn.getAttribute('class'), 'show class after scrolling up').toContain('show');
  });

  test('full-stack and QA CV downloads are both available', async ({ page }) => {
    const cvLinks = page.locator('a[href*="CV_Ahmed_Ouarrali"][download]');
    await expect(cvLinks.first()).toBeAttached();
    const hrefs = await cvLinks.evaluateAll((links) => links.map((link) => link.getAttribute('href') ?? ''));
    for (const file of [
      'CV_Ahmed_Ouarrali_EN.pdf',
      'CV_Ahmed_Ouarrali_FR.pdf',
      'CV_Ahmed_Ouarrali_QA_EN.pdf',
      'CV_Ahmed_Ouarrali_QA_FR.pdf',
    ]) {
      expect(hrefs.some((href) => href.includes(file)), `${file} link present`).toBe(true);
    }
  });

  test('pre-paint init respects saved theme and language', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('ao-theme', 'light');
      localStorage.setItem('ao-lang', 'fr');
    });
    await page.goto('/');
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'light');
    await expect(html).toHaveAttribute('lang', 'fr');
    await expect(html).toHaveAttribute('dir', 'ltr');
    // React agrees with the pre-paint values: no theme/language snap.
    await expect(page.locator('.langsw button.active')).toHaveText('FR');
  });
});
