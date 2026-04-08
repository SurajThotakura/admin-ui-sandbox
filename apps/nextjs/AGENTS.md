# Next.js + Tailwind — Admin Portal

This is a Next.js App Router application styled with **Tailwind CSS v4**. It replicates the same admin portal UI using Tailwind utility classes instead of vanilla CSS.

## Stack

- Next.js 15 (App Router)
- Tailwind CSS v4 with `@tailwindcss/postcss`
- lucide-react for icons
- No routing — client-side page switching via `useState` in the root layout (SPA behavior)

## Architecture

```
app/
├── layout.jsx           # Root layout: Sidebar + TopBar + page switching
├── globals.css          # Tailwind imports + @theme tokens + base styles
├── page.jsx             # Empty (layout renders everything)
├── products/page.jsx    # Route placeholder
├── team/page.jsx
├── notifications/page.jsx
└── settings/page.jsx

components/
├── Sidebar.jsx          # Fixed left navigation
├── TopBar.jsx           # Sticky header
├── DashboardContent.jsx # Dashboard grid layout
├── KpiCard.jsx          # Metric cards with sparklines
├── TrafficChart.jsx     # Weekly activity chart
├── SiteHealth.jsx       # Health metrics grid
├── TopProducts.jsx      # Ranked products table
├── RegionBreakdown.jsx  # Revenue by region
├── RecentAlerts.jsx     # Alert feed
└── ProductsPage.jsx     # Full product management page

data/
├── mockData.js
└── productsCatalog.js
```

## Design System

The design tokens are defined in `app/globals.css` inside the `@theme` block. **Read this file to understand the token palette.**

All component styling uses:
1. **Tailwind utility classes** for layout, spacing, typography sizing
2. **Inline `style` props** referencing `var(--color-*)` and `var(--font-*)` for design-system-specific values
3. **Custom `@keyframes`** defined in `globals.css` for animations

This hybrid approach exists because the design system uses a warm, non-standard palette that doesn't map to default Tailwind colors. Components use `style={{ color: "var(--color-gray-400)" }}` rather than `text-gray-400` to ensure exact color matching.

When adding or modifying components:
- Read existing components to see how Tailwind utilities and CSS variables are combined
- Use `var(--color-*)` for all colors, never bare Tailwind color classes
- Use `var(--font-display)` and `var(--font-body)` for typography
- Follow the same animation patterns (`animate-slide-up`, `animate-fade-in`)

## Running

```bash
pnpm dev    # http://localhost:3000
pnpm build  # Production build
```

## Key Patterns

- **Cards**: White background + `boxShadow: "0 0 0 1px var(--color-sand-200)"` + hover accent bar via a child div with `group-hover:opacity-100`
- **Buttons**: Inline styles for color theming, Tailwind for sizing/layout
- **Forms**: `Input`-style elements with focus states using `focus:border-primary focus:outline-2 focus:outline-primary`
- **Dropdowns**: Custom components with `animate-dropdown-in`, fixed backdrop for click-away
- **Modals**: `createPortal` to body, `animate-fade-in` backdrop, `animate-slide-up` content
- **Tables**: Full `<table>` markup with Tailwind spacing, border colors via inline styles
