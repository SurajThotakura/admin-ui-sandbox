# Design System Specification

> **For benchmark operators only.** Do not include this file in agent context.
> Agents should derive these values by reading the source code of their assigned app variant.

## Color Palette

### Primary
| Token | Hex |
|---|---|
| Primary | `#0058A3` |
| Primary Deep | `#003E72` |
| Primary Light | `#E0EFF9` |

### Accent
| Token | Hex |
|---|---|
| Accent | `#FFDB00` |
| Accent Warm | `#FFC800` |
| Accent Pale | `#FFF8D6` |

### Sand (Neutral Warm)
| Token | Hex |
|---|---|
| Sand 50 | `#FDFBF7` |
| Sand 100 | `#F5F0E8` |
| Sand 200 | `#E8DFD0` |
| Sand 300 | `#D4C7B0` |
| Sand 400 | `#B8A686` |

### Gray (Neutral Cool)
| Token | Hex |
|---|---|
| Gray 50 | `#F8F7F5` |
| Gray 100 | `#EDEAE5` |
| Gray 200 | `#D8D3CB` |
| Gray 300 | `#B0A999` |
| Gray 400 | `#8A826F` |
| Gray 500 | `#6B6354` |
| Gray 600 | `#4A4438` |
| Gray 700 | `#2C2822` |
| Gray 800 | `#1A1714` |

### Status Colors
| Token | Foreground | Background |
|---|---|---|
| Good / Success | `#2D8544` | `#E8F5EC` |
| Warning | `#C27200` | `#FFF3E0` |
| Critical | `#C4314B` | `#FCE8EC` |
| Info | `#0058A3` | `#E0EFF9` |

## Typography

| Role | Font Family | Fallback |
|---|---|---|
| Display (headings, values) | Bricolage Grotesque | serif |
| Body (text, labels, inputs) | Instrument Sans | sans-serif |

Loaded from Google Fonts:
```
Bricolage Grotesque: opsz 12-96, wght 200-800
Instrument Sans: wght 400-700, italic
```

## Spacing Scale

| Token | Value |
|---|---|
| xs | 4px |
| sm | 8px |
| md | 16px |
| lg | 24px |
| xl | 32px |
| 2xl | 48px |
| 3xl | 64px |

## Radius

**All radii are `0px`.** No rounded corners anywhere. This includes:
- Cards, buttons, inputs, textareas
- Badges, toggles (track and thumb), checkboxes
- Dropdown menus, modals, tooltips
- Status dots, sparkline bars, chart bars
- Scrollbar thumbs

## Shadows

**No box-shadows.** The card shadow is a 1px border simulation:
```css
box-shadow: 0 0 0 1px #E8DFD0;  /* sand-200 */
```

## Focus States

Hard 2px outline, no glow:
```css
outline: 2px solid #0058A3;  /* primary */
outline-offset: -1px;
```

No `ring-*`, no `box-shadow` focus rings, no transition on outline.

## Hover Behavior

- **No transforms** — no `translateY`, no `scale`, no lifts
- **No shadow changes** — no shadow on hover
- Color changes only: border darkens, background tints, text color shifts
- Cards show a 3px accent bar (`#FFDB00`) on the left edge via `::after` pseudo-element

## Layout

| Element | Value |
|---|---|
| Sidebar width | 260px, fixed left |
| Sidebar background | `#003E72` (primary-deep) |
| Main content margin-left | 260px |
| Top bar | Sticky, blur backdrop, 2px bottom border |
| Dashboard padding | 48px (space-2xl) |
| KPI grid | 4 columns, 16px gap |
| Content rows | 2 columns (1fr 1fr) or (2fr 1fr), 16px gap |

## Background

Wood grain pattern using repeating linear gradients:
```css
background:
  repeating-linear-gradient(90deg, transparent, transparent 120px, rgba(212,199,176,0.07) 120px, rgba(212,199,176,0.07) 121px),
  repeating-linear-gradient(0deg, transparent, transparent 240px, rgba(212,199,176,0.05) 240px, rgba(212,199,176,0.05) 241px),
  linear-gradient(180deg, #FDFBF7 0%, #F5F0E8 100%);
```

## Animations

| Name | Usage |
|---|---|
| `slideUp` | Page/card entrance: translateY(12px) → 0, opacity 0 → 1, 0.5s ease |
| `fadeIn` | Modal backdrop: opacity 0 → 1, 0.15s ease |
| `dropdownIn` | Dropdown menus: translateY(-4px) → 0, opacity 0 → 1, 0.15s ease |
| `pulse-glow` | Status dots: opacity 1 → 0.4 → 1, 2s ease-in-out infinite |

Staggered entrance: cards use `animation-delay` of `index * 0.05s`.
