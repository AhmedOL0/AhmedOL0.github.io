---
name: The Engineering Dossier
colors:
  surface: '#fcf9f2'
  surface-dim: '#dcdad3'
  surface-bright: '#fcf9f2'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3ec'
  surface-container: '#f0eee7'
  surface-container-high: '#ebe8e1'
  surface-container-highest: '#e5e2db'
  on-surface: '#1c1c18'
  on-surface-variant: '#4a463f'
  inverse-surface: '#31312c'
  inverse-on-surface: '#f3f0e9'
  outline: '#7b766e'
  outline-variant: '#ccc6bc'
  surface-tint: '#615e58'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1d1b17'
  on-primary-container: '#87837d'
  inverse-primary: '#cbc6bf'
  secondary: '#78592b'
  on-secondary: '#ffffff'
  secondary-container: '#fed39a'
  on-secondary-container: '#79592c'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#291800'
  on-tertiary-container: '#9f7e52'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e8e1db'
  primary-fixed-dim: '#cbc6bf'
  on-primary-fixed: '#1d1b17'
  on-primary-fixed-variant: '#494641'
  secondary-fixed: '#ffddb3'
  secondary-fixed-dim: '#e9c088'
  on-secondary-fixed: '#291800'
  on-secondary-fixed-variant: '#5e4116'
  tertiary-fixed: '#ffddb3'
  tertiary-fixed-dim: '#e6c08f'
  on-tertiary-fixed: '#291800'
  on-tertiary-fixed-variant: '#5c421b'
  background: '#fcf9f2'
  on-background: '#1c1c18'
  surface-variant: '#e5e2db'
typography:
  headline-xl:
    fontFamily: Newsreader
    fontSize: 56px
    fontWeight: '400'
    lineHeight: 64px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Newsreader
    fontSize: 38px
    fontWeight: '400'
    lineHeight: 44px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Newsreader
    fontSize: 40px
    fontWeight: '400'
    lineHeight: 48px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Newsreader
    fontSize: 28px
    fontWeight: '400'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Newsreader
    fontSize: 28px
    fontWeight: '500'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Newsreader
    fontSize: 22px
    fontWeight: '500'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 30px
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.06em
spacing:
  gutter: 1.5rem
  gutter-desktop: 2.5rem
  margin: 1.25rem
  margin-tablet: 2.5rem
  margin-desktop: 4rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.75rem
  space-xl: 3rem
---

## Brand & Style

The design system is structured around an editorial, print-grade philosophy titled "The Engineering Dossier." Designed for high-caliber engineering leadership, it bridges architectural rigor with classic typography. Rather than leaning on ephemeral tech trends like synthetic glow or floating glass panels, the interface is modeled after architectural folios, curated monographs, and technical whitepapers.

The target audience comprises executives, venture partners, and engineering peers who value depth, clarity, and uncompromising execution. The emotional register is authoritative, composed, and deliberate. 

The aesthetic is fundamentally **Editorial Minimalist**:
- High-contrast visual cadence driven by type scale rather than decorative ornament.
- Structural grounding using hairlines, tabular data alignment, and precise typographic anchors.
- Tactile warmth evocative of archival paper stock and deep typographic ink, avoiding clinical blue-tinted cold grays entirely.

## Colors

The palette reproduces the tactile authenticity of physical broadsheets and archival ink:

- **Light Mode (Default Paper)**:
  - Canvas (Paper Base): `#F7F4ED`
  - Canvas Muted (Subtle Tonal Tint): `#EFECE3`
  - High Contrast Text (Primary Ink): `#191713`
  - Mid-Tone Text (Editorial Secondary): `#57534D`
  - Border & Hairline Rules: `#DDD8CD`
  - Accent (Deep Bronze): `#7C5C2E`
  - Accent Hover / Active: `#5C4421`

- **Dark Mode (Archival Espresso)**:
  - Canvas (Espresso Base): `#141210`
  - Canvas Muted (Secondary Substrate): `#1D1A17`
  - High Contrast Text (Warm Off-White): `#F5F1E8`
  - Mid-Tone Text (Warm Stone): `#A8A29A`
  - Border & Hairline Rules: `#2E2A25`
  - Accent (Burnished Bronze): `#B08B53`
  - Accent Hover / Active: `#C9A66B`

Strict governance applies: purple, neon cyan, saturated blues, and multi-stop gradient meshes are prohibited. Color is deployed solely to establish semantic hierarchy and intentional typographic emphasis.

## Typography

The typographical engine orchestrates three distinct typefaces, each assigned an unequivocal domain:

1. **Newsreader (Editorial Serif)**: Used for high-impact display headlines, dossier titling, and essay openings. Features optical sizing and proportional historical elegance. Headings must always leverage standard ligature sets and italicized variants for emphasis or publication dates.
2. **Inter (Analytical Body)**: Governs long-form engineering essays, case studies, project overviews, and administrative content. Tuned for sustained screen legibility with neutral, non-distracting letterforms.
3. **JetBrains Mono (Technical Metadata)**: Designates systemic specs, revision timestamps, technical architecture tags, indexing numbers, and code blocks. Always set in upper or small-caps with tracked letterforms.

Line lengths for reading prose must strictly cap at 68 characters per line (`max-w-prose`) to maintain rhythmic reading speed.

## Layout & Spacing

The structural layout draws from classical grid systems (e.g., Tschichold and Swiss editorial geometry) paired with contemporary responsiveness:

- **Desktop (1200px+)**: A 12-column layout governed by a strict reading spine. Left-hand columns typically hold technical coordinates, chronology, or section markers in `JetBrains Mono`, while the central 6–8 columns carry the primary narrative. Right columns are reserved for marginalia, footnotes, or project metrics.
- **Tablet (768px – 1199px)**: Reflows to an 8-column layout. Marginalia shifts beneath body passages or tucks into thin hairline callout rails.
- **Mobile (< 768px)**: Single column with edge margins of `1.25rem`. Structural separation relies on fine horizontal hairlines rather than boxed framing.

Negative space is treated as an active layout medium. Margins between major dossier chapters range up to `space-xl` (3rem to 6rem on wide displays) to preserve an unhurried, archival tone.

## Elevation & Depth

This design system deliberately rejects depth through heavy blurs, layered skeuomorphism, and drop-shadows. Visual hierarchy is established exclusively via **Low-Contrast Outlines & Tonal Grounding**:

- **No Multi-layer Dropshadows**: Floating cards with blurred falloffs are forbidden.
- **Structural Rules (Hairlines)**: Sections, cards, and tables are divided by solid 1px borders (`#DDD8CD` in light mode, `#2E2A25` in dark mode).
- **Z-Index Layering**: Modals and dropdown menus sit on solid flat planes with an unblurred 1px outer rule and a hard offset shadow: `2px 2px 0px rgba(25, 23, 19, 0.08)`.
- **Substrate Differentiation**: Deepening hierarchy occurs by shifting surface backgrounds from Canvas Paper (`#F7F4ED`) to Canvas Muted (`#EFECE3`), preserving tactile solidarity without faux lighting physics.

## Shapes

The design system embraces an uncompromising **Sharp (0)** profile:

- Corner radii across all standard UI elements—including buttons, input containers, code snippets, tags, and surface panels—are set strictly to `0px`.
- Crisp, un-filleted geometry communicates technical discipline, print provenance, and architectural structure.
- Round elements are limited strictly to functional circle indicators (e.g., system status pulses, radio triggers, or circular target avatars).

## Components

### Buttons
- **Primary**: Solid near-black ink (`#191713`) fill with warm off-white text (`#F7F4ED`). 0px radius. Border: 1px solid `#191713`. Hover state transitions background to deep bronze (`#7C5C2E`). Monospace uppercase or semi-bold sans typography.
- **Secondary / Outline**: Transparent fill, 1px hairline border in `#191713` (light) or `#F5F1E8` (dark). Text matches border color. Hover shifts background to `#EFECE3` (light) or `#1D1A17` (dark).
- **Text Link**: Inline Newsreader italic or Inter regular accompanied by a persistent 1px baseline underline with a 2px offset. Hover shifts color to Bronze.

### Technical Tags & Chips
- Rendered in `JetBrains Mono` label-sm (10px).
- Framed by a 1px hairline border (`#DDD8CD`).
- Background matches the parent canvas or canvas-muted. No pill-rounding; sharp rectangular geometry with `space-xs` vertical and `space-sm` horizontal padding.

### Lists & Case Study Indexes
- Border-top hairline rules separate each record.
- Structured across 3 to 4 column bands: [Date / Index] in Mono, [Project Title] in Newsreader, [Role / Stack] in Inter, and [Action Arrow →] on the far right.
- Hovering over a row subtly changes the row background to canvas-muted.

### Input Fields
- Flat baseline border (1px solid `#DDD8CD`) or fully framed sharp box.
- Background: transparent or canvas-muted.
- Focus state: border turns deep bronze (`#7C5C2E`) with zero ring blur.
- Helper labels and validation messages appear strictly in `JetBrains Mono`.

### Checkboxes & Radios
- Checkboxes are 14x14px sharp squares; radios are 14x14px circles.
- Unchecked: 1px hairline border.
- Checked: solid `#191713` fill containing an off-white geometric glyph.

### Cards & Dossier Modules
- Flat rectangular surfaces separated by 1px hairlines.
- Padding: `space-md` to `space-lg`.
- Headers feature small mono index indicators (e.g., `DOC. REF 01-B`) sitting above Newsreader headlines.
- No floating cards, no inset neon shadows, and no multi-color badges.

### Supplemental Dossier Artifacts
- **Footnotes / Marginalia**: Sits in side gutters using `body-sm` or `label-md` accompanied by superscript indices.
- **Data Tables**: Dense typography with border-bottom hairpins, tabular numerical alignment (`font-variant-numeric: tabular-nums`), and mono table headers.