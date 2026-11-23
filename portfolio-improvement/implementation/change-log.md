# Implementation change log

## Content and crawlability

- Semantic static summary added inside the React root for non-JS clients and crawlers.
- Raw-HTML SEO regression test added.
- Mobile portrait view leads with the availability pill, then the portrait card and copy.
- Mobile portrait keeps the first screen to the pitch and CTAs; the proof strip and identity plate stay on tablet/desktop, and very short/narrow screens drop the secondary contact strip.
- Short laptops stack the contact channels on the left so the centered dock never covers them.
- Mobile title scale is smoothed between 421px and 640px instead of jumping at the breakpoint.
- The project carousel test now triggers the control directly, removing the intermittent Firefox click miss.
- Hero, title, description, JSON-LD and OG image repositioned around Java / Spring Boot.
- PFE spelled out as final-year engineering internship.
- Metadata and sitemap dates refreshed.

## CV synchronization

- Final Full-Stack EN/FR CVs integrated.
- Final QA Automation EN/FR CVs integrated.
- Header CV menu exposes all four downloads alongside the language and theme controls.
- Hero header controls no longer overlap the availability pill; the eyebrow ends before the right-hand cluster.
- Hero spacing rhythm increased between eyebrow, title, lede, plate, CTAs, proof strip and contact strip.
- Back-to-top appears only on an actual upward scroll, not on duplicate same-position scroll events.
- Footer exposes language-matched Full-Stack and QA CV links.
- Static fallback exposes all four CV links.

## Project integrity

- OdemLab explicitly separates product context from personal backend/web work.
- Unverified volume metrics and payment/AI personal claims removed.
- FitTrack, MediCare, Smart Campus and IoT descriptions aligned with the final CVs.
- Project dialogs now show role, architecture and, where verified, quality/testing evidence.
- Shareable case-study hashes and the full screenshot gallery remain.

## Machine-readable files

- `portfolio.json` updated with final roles, stacks and CV links.
- `llms.txt` rewritten from verified content.
- `sitemap.xml` date refreshed.
- OG image regenerated from the updated source HTML.
