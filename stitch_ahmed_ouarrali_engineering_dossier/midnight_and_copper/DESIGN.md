---
name: Midnight and Copper
colors:
  surface: '#131317'
  surface-dim: '#131317'
  surface-bright: '#39393d'
  surface-container-lowest: '#0e0e12'
  surface-container-low: '#1b1b1f'
  surface-container: '#1f1f23'
  surface-container-high: '#2a292e'
  surface-container-highest: '#353439'
  on-surface: '#e4e1e7'
  on-surface-variant: '#d9c2b7'
  inverse-surface: '#e4e1e7'
  inverse-on-surface: '#303034'
  outline: '#a18d82'
  outline-variant: '#53433b'
  surface-tint: '#ffb68d'
  primary: '#ffb68d'
  on-primary: '#532200'
  primary-container: '#cc7d4e'
  on-primary-container: '#481d00'
  inverse-primary: '#8f4d21'
  secondary: '#c7c5d1'
  on-secondary: '#303039'
  secondary-container: '#464650'
  on-secondary-container: '#b6b4bf'
  tertiary: '#ffb68d'
  on-tertiary: '#532200'
  tertiary-container: '#cc7d4e'
  on-tertiary-container: '#491d00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdbc9'
  primary-fixed-dim: '#ffb68d'
  on-primary-fixed: '#321200'
  on-primary-fixed-variant: '#72360b'
  secondary-fixed: '#e3e1ed'
  secondary-fixed-dim: '#c7c5d1'
  on-secondary-fixed: '#1b1b23'
  on-secondary-fixed-variant: '#464650'
  tertiary-fixed: '#ffdbc9'
  tertiary-fixed-dim: '#ffb68d'
  on-tertiary-fixed: '#331200'
  on-tertiary-fixed-variant: '#72360c'
  background: '#131317'
  on-background: '#e4e1e7'
  surface-variant: '#353439'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 3.5rem
    fontWeight: '600'
    lineHeight: 4rem
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Geist
    fontSize: 2.25rem
    fontWeight: '600'
    lineHeight: 2.75rem
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 2rem
    fontWeight: '600'
    lineHeight: 2.5rem
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: 2rem
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Geist
    fontSize: 1.25rem
    fontWeight: '500'
    lineHeight: 1.75rem
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Geist
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.6rem
  body-md:
    fontFamily: Geist
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.45rem
  body-sm:
    fontFamily: Geist
    fontSize: 0.75rem
    fontWeight: '400'
    lineHeight: 1.25rem
  label-code-md:
    fontFamily: JetBrains Mono
    fontSize: 0.8125rem
    fontWeight: '400'
    lineHeight: 1.25rem
    letterSpacing: -0.01em
  label-code-sm:
    fontFamily: JetBrains Mono
    fontSize: 0.6875rem
    fontWeight: '500'
    lineHeight: 1rem
    letterSpacing: 0.02em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1.25rem
  space-xl: 2rem
---

## Brand & Style
The design system embodies precision, density, and functional austerity. Designed primarily for software engineers, systems architects, and infrastructure operators, it prioritizes immediate signal over decorative noise. The interface avoids dramatic glows, blurred colored orbs, and frivolous micro-interactions in favor of structural clarity, high information density, and instant legibility.

Visual language leans into technical minimalism and modern dark-mode utilitarianism—reminiscent of high-performance IDEs and engineering runbooks. Surfaces rely on hairline dividers, deliberate contrast shifts between canvas and raised containers, and the singular focal warmth of burned copper against deep graphite. The aesthetic is quiet, mature, and rigorous.

## Colors
The palette is rooted in deep, light-absorbing neutrals with a controlled, single-source chromatic anchor.

- **Canvas & Surfaces**: The base canvas is `#101014` (Near-black Graphite). Raised layers, code blocks, and contextual panels shift to `#16161C` (Deep Surface) and `#1E1E26` (Floating Surface).
- **Accents**: `#B46A3C` (Burned Copper) serves as the primary visual hook—reserved strictly for interactive callouts, active indicators, and explicit focus states. Its lighter sibling `#D98858` (Terracotta Flare) is used exclusively for hover interactions and text links requiring contrast compliance.
- **Borders & Dividers**: Low-contrast borders use `#272730` for structural gridlines and `#363644` for interactive element outlines.
- **Typography Colors**: Base copy is rendered in `#E4E4E7` (Crisp Warm Gray) to reduce eye fatigue compared to pure white. Muted metadata and disabled states map to `#71717A` (Mid Zinc) and `#52525B` (Dark Zinc).

## Typography
Typography is split cleanly between a precise modern sans-serif for operational interface reading and a calibrated monospace for all computational context, identifiers, tags, and system states.

- **Geist** provides balanced proportions, tight optical spacing, and clean geometry, rendering technical copy effortlessly across dense viewports.
- **JetBrains Mono** handles inline code, commit hashes, data chips, table values, timestamps, and metric readouts.
- **Letter Spacing**: Large headlines enforce negative tracking for a compact typographic block; all monospace labels enforce neutral-to-positive tracking to preserve letter differentiation at 11px and 13px sizes.

## Layout & Spacing
The layout strategy follows a rigid, fluid-first grid governed by a 4px/8px incremental scale.

- **Grid Architecture**: Interfaces are laid out on an adaptable 12-column system on desktop viewports (collapsing to 8 columns on tablet and 4 columns on mobile). Primary content wells adhere to a max-width of 1280px with edge-anchored technical sidebars (240px–280px fixed width).
- **Rhythm**: Element-level distances favor compactness over expansive whitespace. Tight micro-spacing (`space-xs` and `space-sm`) binds inputs, icons, and paired labels into single atomic units. Larger block spacing (`space-lg`, `space-xl`) isolates discrete structural groups without requiring heavy dividing blocks.

## Elevation & Depth
Depth is produced through tonal stepping and subtle boundary strokes rather than diffuse blur shadows or colored illumination.

- **Tonal Stepping**: The interface utilizes three primary plane levels: Base Canvas (`#101014`), Raised Surface (`#16161C`), and Overlay Surface (`#1E1E26`). Each step up in hierarchy corresponds to a direct step up in surface luminance.
- **Hairline Borders**: Structural boundaries rely on 1px solid dividers in `#272730`. Floating elements (dropdown menus, popovers, contextual tooltips) feature a dual definition: a 1px border at `#363644` paired with an ultra-tight, dark drop shadow (`0 4px 12px rgba(0, 0, 0, 0.45)`) solely for separating identical dark tones during overlap.
- **No Glow / No Light Leaks**: Glowing drop shadows, neon bloom, and multi-colored ambient blurs are strictly prohibited.

## Shapes
The shape language favors a tight, soft-cornered geometry (Level 1 - Soft) to maintain an architectural, technical demeanor.

- **Small Components**: Inputs, buttons, tags, chips, and table rows use a subtle 4px (`0.25rem`) radius.
- **Containers**: Cards, code blocks, modals, and panel sheets use an 8px (`0.5rem`) radius.
- **Pill Exceptions**: Circular radiuses are reserved purely for status indicator dots (e.g., active telemetry pings) and numeric notification badges, never for contextual containers or buttons.

## Components

- **Buttons**:
  - *Primary*: Solid `#B46A3C` background with `#101014` bold text. On hover, transitions cleanly to `#D98858`. No drop shadow.
  - *Secondary / Ghost*: `#16161C` background, 1px border in `#272730`, `#E4E4E7` text. On hover, border shifts to `#363644` with subtle surface brightening to `#1E1E26`.
- **Inputs & Fields**:
  - Inputs feature a `#101014` dark inset background with a 1px `#272730` structural border and 4px corner radius.
  - Focus state swaps the border to `#B46A3C` with an outline-offset ring of 1px in transparent/dim copper (`rgba(180, 106, 60, 0.2)`).
- **Chips & Status Badges**:
  - Compact padding (`0.125rem 0.375rem`), styled using `JetBrains Mono` at `label-code-sm`.
  - Neutral chips use `#1E1E26` background with `#71717A` border and text. Active or copper-tier indicators utilize `rgba(180, 106, 60, 0.12)` background with `#D98858` text and a subtle `#B46A3C` border.
- **Checkboxes & Radios**:
  - Geometric, 14px boxes with a 2px radius and 1px `#363644` border.
  - Selected state fills with `#B46A3C` and renders an ink-black (`#101014`) micro checkmark icon.
- **Cards & Data Panels**:
  - Composed of `#16161C` background, 1px `#272730` border, and 8px border radius.
  - Header, body, and footer subdivisions within cards are separated solely by 1px horizontal borders in `#272730`.
- **Developer-Specific Patterns**:
  - *Code Blocks*: Set on `#101014` with a 1px `#272730` perimeter, featuring a header ribbon with file name in `JetBrains Mono` and an unobtrusive copy button that shifts to copper on confirmation.
  - *Key-Value Data Grids*: Borderless zebra-free lists with muted keys (`#71717A`) left-aligned and bright values (`#E4E4E7`) right-aligned, separated by a dotted guide or faint hairline dividers.