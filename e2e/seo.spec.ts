import { test, expect } from '@playwright/test';

test.describe('SEO & Meta', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('page has a title', async ({ page }) => {
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
    expect(title).toContain('Ahmed');
  });

  test('meta description is present and within length', async ({ page }) => {
    const desc = await page.locator('meta[name="description"]').getAttribute('content');
    expect(desc).toBeTruthy();
    expect(desc!.length).toBeGreaterThan(50);
    expect(desc!.length).toBeLessThanOrEqual(200);
  });

  test('canonical URL is set', async ({ page }) => {
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toBeAttached();
    const href = await canonical.getAttribute('href');
    expect(href).toContain('ahmedol0.github.io');
  });

  test('Open Graph tags are present', async ({ page }) => {
    await expect(page.locator('meta[property="og:type"]')).toBeAttached();
    await expect(page.locator('meta[property="og:title"]')).toBeAttached();
    await expect(page.locator('meta[property="og:description"]')).toBeAttached();
  });

  test('Twitter card tags are present', async ({ page }) => {
    await expect(page.locator('meta[name="twitter:card"]')).toBeAttached();
    await expect(page.locator('meta[name="twitter:title"]')).toBeAttached();
    await expect(page.locator('meta[name="twitter:description"]')).toBeAttached();
  });

  test('structured data (JSON-LD) is valid', async ({ page }) => {
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toBeAttached();
    const content = await jsonLd.innerText();
    const data = JSON.parse(content);
    expect(data['@type']).toBe('ProfilePage');
    expect(data.mainEntity['@type']).toBe('Person');
    expect(data.mainEntity.name).toContain('Ahmed');
    expect(data.mainEntity.jobTitle).toBeTruthy();
    expect(data.mainEntity.knowsAbout.length).toBeGreaterThan(0);
  });

  test('robots meta allows indexing', async ({ page }) => {
    const robots = await page.locator('meta[name="robots"]').getAttribute('content');
    expect(robots).toContain('index');
    expect(robots).toContain('follow');
  });

  test('favicon is present', async ({ page }) => {
    const favicon = page.locator('link[rel="icon"]');
    await expect(favicon).toBeAttached();
  });

  test('web manifest is linked', async ({ page }) => {
    const manifest = page.locator('link[rel="manifest"]');
    await expect(manifest).toBeAttached();
  });

  test('viewport meta is set for mobile', async ({ page }) => {
    const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
    expect(viewport).toContain('width=device-width');
    expect(viewport).toContain('initial-scale=1');
  });

  test('theme-color meta is present', async ({ page }) => {
    const themeColor = page.locator('meta[name="theme-color"]');
    const count = await themeColor.count();
    expect(count).toBeGreaterThan(0);
  });
});
