import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { mkdir } from 'fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const htmlPath = resolve(__dirname, 'readme-banner.html');
const outDir = resolve(__dirname, '..', 'docs');
const outPath = resolve(outDir, 'readme-banner.png');

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch({ args: ['--allow-file-access-from-files'] });
const page = await browser.newPage({ viewport: { width: 1600, height: 420 }, deviceScaleFactor: 1.5 });
await page.goto(`file:///${htmlPath.replace(/\\/g, '/')}`);
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(250);
await page.screenshot({ path: outPath, type: 'png' });
await browser.close();
console.log(`✓ README banner saved to ${outPath}`);
