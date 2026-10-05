---
name: Slate and Amber Minimal
colors:
  surface: '#f9f9f7'
  surface-dim: '#dadad8'
  surface-bright: '#f9f9f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f4f2'
  surface-container: '#eeeeec'
  surface-container-high: '#e8e8e6'
  surface-container-highest: '#e2e3e1'
  on-surface: '#1a1c1b'
  on-surface-variant: '#554336'
  inverse-surface: '#2f3130'
  inverse-on-surface: '#f1f1ef'
  outline: '#887364'
  outline-variant: '#dbc2b0'
  surface-tint: '#904d00'
  primary: '#8d4b00'
  on-primary: '#ffffff'
  primary-container: '#b15f00'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb77d'
  secondary: '#5b5e66'
  on-secondary: '#ffffff'
  secondary-container: '#dfe2ec'
  on-secondary-container: '#61646d'
  tertiary: '#4f5d71'
  on-tertiary: '#ffffff'
  tertiary-container: '#67758b'
  on-tertiary-container: '#fdfcff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdcc3'
  primary-fixed-dim: '#ffb77d'
  on-primary-fixed: '#2f1500'
  on-primary-fixed-variant: '#6e3900'
  secondary-fixed: '#dfe2ec'
  secondary-fixed-dim: '#c3c6d0'
  on-secondary-fixed: '#181c22'
  on-secondary-fixed-variant: '#43474f'
  tertiary-fixed: '#d5e3fc'
  tertiary-fixed-dim: '#b9c7df'
  on-tertiary-fixed: '#0d1c2e'
  on-tertiary-fixed-variant: '#3a485b'
  background: '#f9f9f7'
  on-background: '#1a1c1b'
  surface-variant: '#e2e3e1'
typography:
  display:
    fontFamily: Newsreader
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-mobile:
    fontFamily: Newsreader
    fontSize: 36px
    fontWeight: '400'
    lineHeight: 44px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Newsreader
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Newsreader
    fontSize: 26px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Newsreader
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.06em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-tablet: 1.5rem
  gutter-desktop: 2rem
  margin: 1rem
  margin-tablet: 2rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system embodies the calculated precision, clarity, and discipline of systems engineering combined with warm editorial refinement. It caters to technical operators, developers, systems architects, and product builders who demand high information density, zero visual noise, and absolute legibility.

The style converges modern technical minimalism with understated editorial discipline. Layouts lean into disciplined whitespace, crisp mechanical borders, high-contrast typography, and purposeful amber accents that function as precise beacons rather than decorative filler. The interface communicates rigorous reliability, intentional restraint, and high craft.

## Colors

The palette balances warm organic neutrality with cold structural slate and an assertive, glowing amber beacon.

- **Primary (`#D97706`)**: Warm Amber. Reserved strictly for primary action drivers, focus rings, operational status alerts, active indicators, and critical highlights. Must be deployed with extreme discipline to retain its signaling power.
- **Secondary (`#23272E`)**: Slate Charcoal. The structural backbone used for high-contrast primary text, solid button states, active tabs, and deep structural surfaces.
- **Tertiary (`#475569`)**: Muted Slate. Used for secondary body text, structural icons, inactive controls, and subheadings.
- **Neutral (`#FAFAF8`)**: Soft White Canvas. A warm, non-glare foundation that provides paper-like reading comfort over extended working sessions.
- **Borders & Dividers (`#E2E8F0`)**: Cool Muted Slate. Distinct, hairline demarcations that frame tabular data, component enclosures, and grid divisions.

## Typography

The typographic system creates an intentional tension between intellectual editorial craft and engineering precision.

- **Headlines & Section Framing**: Set in **Newsreader**. Conveys the authoritative weight of classic documentation, whitepapers, and monographs. Headings establish a deliberate, human cadence within dense analytical layouts.
- **Body & Operations**: Set in **Geist**. Engineered for neutral legibility, sharp terminal definition, and high horizontal tracking efficiency in dashboards, documentation bodies, and control panels.
- **Metadata, Counters, & Tags**: Set in **JetBrains Mono**. Manages IDs, timestamps, commit hashes, code blocks, parameter values, and tabular numbers. Enhances scanning efficiency and guarantees monospace tabular alignment across lists and metric grids.

## Layout & Spacing

The layout is built upon an 8pt base grid with an intentional hairline cadence.

- **Grid Architecture**: 
  - Mobile (<768px): 4-column fluid layout with `1rem` margins and `1rem` gutters.
  - Tablet (768px - 1024px): 8-column layout with `2rem` margins and `1.5rem` gutters.
  - Desktop (>1024px): 12-column layout with a constrained maximum canvas of `1440px`, centered, using `3rem` margins and `2rem` gutters.
- **Rhythm & Structure**: Component padding adheres strictly to `space-xs` through `space-xl`. Rather than floating widgets in vast ambiguous gaps, content regions are structured like technical blueprints: bounded by `1px` crisp borders (`#E2E8F0`), with inner contents cushioned by uniform interior rhythm (`space-md` to `space-lg`).

## Elevation & Depth

This design system avoids soft, floating, drop-shadow elevations. Visual hierarchy and layering are established strictly through structural borders, tonal shifts, and hard-edged contrast:

1. **Flat Hairline Tiers**: Elevation is communicated via structural `1px` solid borders in `#E2E8F0`. Higher level surfaces (e.g., active cards, elevated sidebars) use pure white `#FFFFFF` layered against the foundational `#FAFAF8` canvas.
2. **Contextual Focus**: Focused, selected, or active operational components exchange their cool slate outline for a crisp, high-visibility `#D97706` amber outline or solid slate fill (`#23272E`).
3. **Overlays & Popovers**: Modals, dropdown command palettes, and tooltips employ a crisp `1px` border (`#23272E` or `#E2E8F0`) with a subtle, non-diffused offset shadow: `0 4px 12px rgba(35, 39, 46, 0.06)`. This guarantees structural separation without clouding the interface with hazy blurs.

## Shapes

The shape hierarchy follows a compact, restrained form factor (`roundedness: 1`):

- **Default Form (0.25rem / 4px)**: Applied to input fields, buttons, badges, chips, code chips, and standard cards. This subtle corner soften avoids the aggressive severity of raw 0px brutalism while retaining an engineering-grade, modular silhouette.
- **Enclosures & Modals (0.5rem / 8px)**: Applied to dialog windows, sheet containers, and primary content canvases.
- **Pills / Radii Override**: Strictly reserved for active status dots and circular icon-only utility toggles.

## Components

### Buttons
- **Primary**: Solid Slate Charcoal (`#23272E`) fill, `#FAFAF8` text, `0.25rem` radius. Focused or active states trigger a `2px` Amber (`#D97706`) ring offset by `2px`.
- **Secondary / Action Accent**: Amber (`#D97706`) fill with `#FFFFFF` text. Used exclusively for high-intent conversion or primary commit operations.
- **Outline / Technical**: Border `1px` solid `#E2E8F0`, background transparent, text `#23272E`. On hover, background shifts to `#F1F5F9`.
- **Ghost**: No border, `#475569` text, background shifts to `#F1F5F9` on hover.

### Chips & Metadata Badges
- Compact height (`24px`), `0.25rem` radius. Monospace typography (`label-sm`).
- Neutral badges use a `#F1F5F9` background with `#475569` text and a `#E2E8F0` border.
- Warning or active status badges utilize a soft amber tint (`#FEF3C7` background, `#B45309` text, `#FDE68A` border).

### Form Controls (Inputs, Checkboxes, Radios)
- **Text Inputs**: Surface `#FFFFFF`, border `1px` solid `#E2E8F0`, text `#23272E`, placeholder `#94A3B8`. Padding: `0.5rem 0.75rem`. Focus state features an instant border transition to `#D97706` with no blur shadow.
- **Checkboxes & Radios**: Custom square/round tokens with `1.25px` solid `#CBD5E1` border. When checked, fill changes to `#23272E` with a pure white glyph or indicator.

### Lists & Key-Value Grids
- Hairline-separated rows utilizing `border-b: 1px solid #E2E8F0`. 
- Alternating or interactive table rows feature subtle `#F8FAFC` hover states. 
- Left column (keys, parameters) styled in `JetBrains Mono` (`label-md`) with `#475569` color; right column (values, metrics) styled in `Geist` or high-contrast monospace.

### Cards & Panels
- Background `#FFFFFF` mounted on the `#FAFAF8` canvas.
- Perimeter bounded by `1px` solid `#E2E8F0`.
- Card headers optionally feature a bottom hairline divider separating the title and metadata from panel contents.

### Technical & System Specifics
- **Code Blocks**: `#1E293B` dark surface inset into the `#FAFAF8` document page, framed with `#334155` border, using `JetBrains Mono` text in `#F8FAFC` with Amber `#FBBF24` highlight anchors.
- **Status Indicators**: Solid `6px` circular beacons using `#D97706` (active/warn), `#10B981` (operational), and `#64748B` (idle).