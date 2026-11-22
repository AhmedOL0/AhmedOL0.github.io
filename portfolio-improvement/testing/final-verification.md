# Final verification

## Commands

- `npm run lint`
- `npm run build`
- `npx playwright test --workers=4 --reporter=dot`

## Results

- Lint: clean.
- Production build: passes.
- Playwright: 564 tests across chromium, firefox, webkit and mobile-chrome.
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
