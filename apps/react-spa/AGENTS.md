# React SPA — Admin Portal

This is a React single-page application built with Vite. It uses **plain CSS** with custom properties for the entire design system.

## Stack

- React 19 + Vite 8
- Vanilla CSS (no preprocessors, no CSS-in-JS, no Tailwind)
- lucide-react for icons
- No routing library — client-side page switching via `useState` in `App.jsx`

## Architecture

```
src/
├── App.jsx              # Main app: Sidebar + TopBar + page switching
├── main.jsx             # React entry point
├── styles.css           # ALL styling — design tokens + component styles
├── components/
│   ├── Sidebar.jsx      # Fixed left navigation
│   ├── TopBar.jsx       # Sticky header with page title + status
│   ├── KpiCard.jsx      # Dashboard metric cards with sparklines
│   ├── TrafficChart.jsx # Weekly activity bar chart
│   ├── SiteHealth.jsx   # Health metrics 2x3 grid
│   ├── TopProducts.jsx  # Ranked products table
│   ├── RegionBreakdown.jsx  # Revenue bar chart by region
│   ├── RecentAlerts.jsx # Alert feed with status dots
│   ├── ProductsPage.jsx # Full product management (search, filters, table, modal)
│   ├── TeamPage.jsx     # Placeholder
│   ├── NotificationsPage.jsx  # Placeholder
│   └── SettingsPage.jsx # Placeholder
└── data/
    ├── mockData.js      # Dashboard metrics, charts, alerts
    └── productsCatalog.js  # Product inventory, categories, departments
```

## Design System

The design system is defined entirely in `src/styles.css` via CSS custom properties in the `:root` block. **Read this file to understand the visual language.**

Key principles to observe in the code:
- Look at the `:root` variables for the full token palette
- Look at `.card` for the canonical card treatment
- Look at `.pp-*` classes for the Products page component patterns
- Look at hover states — they follow a specific philosophy
- Look at border-radius values — they are deliberate
- Look at box-shadow usage — or rather, the absence of it

When adding or modifying components, derive your styling choices from these existing patterns. Do not introduce new visual conventions.

## Running

```bash
pnpm dev    # http://localhost:5173
pnpm build  # Production build to dist/
```

## Key Patterns

- **Cards**: All cards use the `.card` base class. They have a hover accent bar via `::after`.
- **Buttons**: Products page buttons use `.pp-btn` with modifiers (`-primary`, `-outline`, `-ghost`, `-text`, `-danger`).
- **Forms**: Inputs use `.pp-form-input`, textareas use `.pp-form-textarea`. Focus state is defined in the CSS.
- **Dropdowns**: Custom dropdown component in `ProductsPage.jsx` with `.pp-dropdown-*` classes.
- **Modals**: Uses `createPortal` to render to `document.body`. Styled with `.pp-modal-*` classes.
- **Animations**: `slideUp` for entrance, `fadeIn` for overlays, `pulse-glow` for status indicators. Staggered via `.stagger-N` classes.
