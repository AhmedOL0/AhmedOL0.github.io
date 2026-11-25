# Final verification

## Commands

- `npm run lint`
- `npm run build`
- `npx playwright test --workers=4 --reporter=dot`

## Results

- Lint: clean.
- Production build: passes.
- Playwright: 596 tests across chromium, firefox, webkit and mobile-chrome.
- Axe-core: no serious/critical violations in light, dark or with the CV menu open.
- Lighthouse clean baseline: 100/100 unthrottled; 89/100 with mobile throttling (Slow 4G + 4x CPU), TBT 0 ms, CLS 0.
- Raw HTML check: contains the name, selected project content, email and CV links.
- No-JS check: the static summary renders.
- JS check: React replaces the fallback and renders a single app heading with no console errors.
- CV downloads: Full-Stack EN/FR and QA EN/FR return HTTP 200 with `application/pdf`.

## Not measured

- Independent Lighthouse scores.
- Independent axe score.
- Real-device visual scoring.
- Live demo availability.

Those require an external review environment or assets that are not in this repository.
