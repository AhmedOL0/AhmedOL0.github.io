import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const htmlPath = resolve(__dirname, 'og-image.html');
const outPath = resolve(__dirname, '..', 'public', 'og-image.png');

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.goto(`file:///${htmlPath.replace(/\\/g, '/')}`);
await page.screenshot({ path: outPath, type: 'png' });
await browser.close();
console.log(`✓ OG image saved to ${outPath}`);
