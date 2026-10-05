---
name: Deep Forest Engineering Dossier
colors:
  surface: '#151409'
  surface-dim: '#151409'
  surface-bright: '#3b392d'
  surface-container-lowest: '#100e05'
  surface-container-low: '#1d1c11'
  surface-container: '#212015'
  surface-container-high: '#2c2a1f'
  surface-container-highest: '#373529'
  on-surface: '#e7e3d1'
  on-surface-variant: '#d2c5b3'
  inverse-surface: '#e7e3d1'
  inverse-on-surface: '#323125'
  outline: '#9b8f7f'
  outline-variant: '#4e4638'
  surface-tint: '#edc06d'
  primary: '#edc06d'
  on-primary: '#422d00'
  primary-container: '#c49a4c'
  on-primary-container: '#4a3300'
  inverse-primary: '#7b580e'
  secondary: '#accebd'
  on-secondary: '#17362a'
  secondary-container: '#2e4d40'
  on-secondary-container: '#9bbdac'
  tertiary: '#adcebd'
  on-tertiary: '#19362a'
  tertiary-container: '#88a898'
  on-tertiary-container: '#203d31'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdea8'
  primary-fixed-dim: '#edc06d'
  on-primary-fixed: '#271900'
  on-primary-fixed-variant: '#5e4200'
  secondary-fixed: '#c7ead9'
  secondary-fixed-dim: '#accebd'
  on-secondary-fixed: '#002116'
  on-secondary-fixed-variant: '#2e4d40'
  tertiary-fixed: '#c9ead8'
  tertiary-fixed-dim: '#adcebd'
  on-tertiary-fixed: '#022015'
  on-tertiary-fixed-variant: '#304d3f'
  background: '#151409'
  on-background: '#e7e3d1'
  surface-variant: '#373529'
typography:
  display-lg:
    fontFamily: Newsreader
    fontSize: 3.5rem
    fontWeight: '400'
    lineHeight: 4.25rem
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Newsreader
    fontSize: 2.25rem
    fontWeight: '400'
    lineHeight: 2.75rem
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Newsreader
    fontSize: 2.25rem
    fontWeight: '400'
    lineHeight: 2.75rem
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Newsreader
    fontSize: 1.75rem
    fontWeight: '400'
    lineHeight: 2.25rem
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Newsreader
    fontSize: 1.75rem
    fontWeight: '400'
    lineHeight: 2.25rem
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Newsreader
    fontSize: 1.25rem
    fontWeight: '500'
    lineHeight: 1.75rem
  body-lg:
    fontFamily: Work Sans
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: 1.75rem
  body-md:
    fontFamily: Work Sans
    fontSize: 0.9375rem
    fontWeight: '400'
    lineHeight: 1.5rem
  body-sm:
    fontFamily: Work Sans
    fontSize: 0.8125rem
    fontWeight: '400'
    lineHeight: 1.25rem
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 0.8125rem
    fontWeight: '500'
    lineHeight: 1.25rem
    letterSpacing: 0.04em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 0.6875rem
    fontWeight: '400'
    lineHeight: 1rem
    letterSpacing: 0.06em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system embodies the gravitas, discipline, and quiet craftsmanship of an engineering dossier. Built for high-caliber technical portfolios, archival reports, and executive engineering briefs, the interface evokes the tactile prestige of bound institutional records combined with the calibrated precision of a field laboratory log. 

The aesthetic is low-glare, dark, and editorial. Rather than using tech clichés like neon glows or generic slate cards, the UI relies on deep botanical undertones, antique brass indices, and warm bone-parchment typography. It trades frenetic movement for deliberate stillness, presenting complex architectures, patents, and system designs as permanent works of intellectual craftsmanship.

Key stylistic pillars:
- **Quiet Authority:** Restrained contrast, high-density metadata, and deliberate whitespace cultivate deep credibility.
- **Archival Tactility:** Subtle structural borders mimic technical plates and archival folios without visual clutter.
- **Editorial Legibility:** Literary serifs establish thoughtful, considered pacing for narrative sections, grounded by strict monospaced data anchors.

## Colors

The palette operates in strict tonal layers derived from deep conifer greens, oxidized bronze, and archival ink on parchment. 

- **Primary Canvas (`#12261E`):** Deep Forest. The structural bedrock. Absorbs ambient light and reduces eye strain across extended reviews.
- **Surfaces & Folios (`#183328`, `#1E3D31`):** Stepped container layers used for dossiers, technical exhibits, and data groupings.
- **Rule Lines & Structural Outlines (`#2B483B`):** Architectural boundary lines that replace elevation shadows, maintaining high definition across dark planes.
- **Primary Ink (`#EFEAD8`):** Warm Parchment. Used for headlines and critical body text; ensures readability without the stark, clinical vibration of pure white.
- **Muted Ink (`#C8C3B3`):** Weathered Parchment. Reserved for secondary copy, supporting captions, and structural labels.
- **Accent & Specifiers (`#C49A4C`):** Calibrated Brass. Deployed sparingly for active states, key metrics, status pips, indices, and curated metadata calls.

## Typography

The typographic hierarchy relies on a tripartite structure that communicates narrative elegance alongside engineering discipline:

1. **Editorial Headlines (Newsreader):** Used for project codenames, major portfolio titles, and thematic headings. Conveys historical permanence and rigorous editorial discipline. Set with optical sizing and generous leading.
2. **Structural Body (Work Sans):** Neutral, human, and balanced. Manages long-form project case studies, execution post-mortems, and technical narratives without competing with the display serif.
3. **Telemetry & Metadata (JetBrains Mono):** Reserved for technical data tables, timestamps, file sizes, git hashes, system parameters, and index labels. Upper-case usage should be paired with tracking (`0.06em`) for archival clarity.

## Layout & Spacing

The layout is constructed around an architectural grid with precise dimensional rhythms.

- **Grid Architecture:** Desktop views follow a structured 12-column layout with 24px (`1.5rem`) gutters and generous canvas margins (`3rem`) to mimic the broad borders of vintage blueprints or oversized technical folios. Mobile targets collapse to a 4-column framework with 16px (`1rem`) gutters and 20px (`1.25rem`) margins.
- **Rhythm & Cadence:** Internal component gaps follow an absolute 4px/8px rhythm. Structural section headers utilize `space-xl` separation, reinforcing modular isolation between dossiers and exhibits.
- **Reflow Rules:** Technical sidebars and meta-inspector columns lock to a fixed 320px column on wide viewports, docking below project narratives on screens narrower than 1024px.

## Elevation & Depth

This system intentionally avoids diffused, drop-shadow elevations in favor of **structural boundaries and tonal stratification**.

- **Z-Index Layering:** Visual hierarchy is established strictly through surface color shifting:
  - Deep Ground: `#12261E` (Canvas)
  - Recessed Modules / Code Blocks: `#0C1B15`
  - Elevated Cards / Dossiers: `#183328`
  - Floating Inspectors / Popovers: `#1E3D31`
- **Low-Contrast Framing:** All containment edges rely on 1px solid borders rendered in `#2B483B`. Hover states and active selections upgrade this border to brass (`#C49A4C`) at 70% opacity.
- **Archival Hairlines:** Dividers inside modules use 1px hairlines colored `#1E3D31` or `#2B483B` to dissect data blocks with surgical precision. Shadows are used only for ambient tooltips, using a hard-edge 0px offset: `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4)`.

## Shapes

The shape system is disciplined, industrial, and sharp-cornered with minimal softening (`roundedness: 1`). 

- Default elements (buttons, inputs, status pills, containers) carry a strict `0.25rem` (4px) corner radius, signaling mechanical precision and physical print stock.
- Nested sub-elements (chips, code tokens, tags) maintain an absolute `2px` radius.
- Large modal panels and card containers use `0.5rem` (8px). Under no circumstances should circular pill-radius shapes or floating orbs appear; all geometries remain deliberate, planar, and rectangular.

## Components

### Buttons
- **Primary:** Background in `#C49A4C` with text in `#12261E` (`JetBrains Mono`, weight 500, uppercase). Sharp 4px corners, 1px solid border in `#C49A4C`. Hover state darkens the fill to `#AD843C` with zero shift in geometry.
- **Secondary / Ghost:** Transparent background with 1px border in `#2B483B` and text in `#EFEAD8`. Hover states introduce a solid `#1E3D31` surface and `#C49A4C` border.
- **Archival Action:** Monospaced label preceded by a technical index marker (e.g., `[REF // 01]`).

### Dossier Cards & Panels
- Constructed on `#183328` with a 1px border of `#2B483B`. 
- Padding set to `space-lg` (`1.5rem`).
- Every card features a top metadata folio bar: category, filing date, and clearance level set in `label-sm` (`#C8C3B3`), separated from the body content by a 1px `#2B483B` horizontal rule.

### Chips & Badges
- Set strictly in `JetBrains Mono` (`label-sm`).
- Bordered container with 2px radius, `#1E3D31` background, `#2B483B` border, and `#C8C3B3` text.
- Accent/Active variant uses `#183328` background with `#C49A4C` border and brass text.

### Form Inputs
- Surface set to `#0E2019` with a 1px outline of `#2B483B`.
- Input text rendered in `#EFEAD8` (`Work Sans`). Placeholder text in `#C8C3B3` at 40% opacity.
- Focus state: Border transitions to `#C49A4C` with a subtle outline glow (`box-shadow: 0 0 0 1px #C49A4C`).

### Checkboxes & Radios
- Crisp 4px boxes (or 50% circular rings for radios) bounded by a 1px border in `#2B483B`.
- Active state renders a solid `#C49A4C` core with a dark `#12261E` indicator mark.

### Data Tables & Log Outputs
- Alternating surface stripes between `#12261E` and `#142B22`.
- Border-collapse with `#2B483B` hairlines. Header labels set in uppercase `JetBrains Mono` (`label-sm`) with `#C49A4C` tinting.
- Data values right-aligned with tabular figures enabled (`font-variant-numeric: tabular-nums`).

### Specification Callouts (Custom Component)
- Inset technical sidebars anchored with a left-edge 2px solid rail in `#C49A4C`.
- Background set to `#183328` with subtle monospace coordinates on the upper right corner indicating revision states (e.g., `REV: 4.12`).