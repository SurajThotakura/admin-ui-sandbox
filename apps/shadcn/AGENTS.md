# Next.js + shadcn/ui — Admin Portal

This is a Next.js App Router application styled with **shadcn/ui-style component primitives** and Tailwind CSS v4. It replicates the same admin portal UI using abstracted UI components instead of raw HTML + utilities.

## Stack

- Next.js 15 (App Router)
- Tailwind CSS v4 with `@tailwindcss/postcss`
- shadcn/ui pattern: Radix UI primitives + `class-variance-authority` + `tailwind-merge` + `clsx`
- lucide-react for icons
- No routing — client-side page switching via `useState` in the root layout (SPA behavior)

## Architecture

```
app/
├── layout.jsx           # Root layout: Sidebar + TopBar + page switching
├── globals.css          # Tailwind imports + @theme tokens + base styles
└── page.jsx             # Empty

components/
├── ui/                  # shadcn-style primitives (themed to this project)
│   ├── button.jsx       # Button with variants (default, outline, ghost, danger, text)
│   ├── card.jsx         # Card, CardHeader, CardTitle, CardDescription, CardContent, CardAction
│   ├── table.jsx        # Table, TableHeader, TableBody, TableRow, TableHead, TableCell
│   ├── dialog.jsx       # Dialog, DialogHeader, DialogTitle, DialogBody, DialogFooter
│   ├── badge.jsx        # Badge with status variants
│   ├── checkbox.jsx     # Custom checkbox (not Radix — styled div)
│   ├── switch.jsx       # Toggle switch
│   ├── dropdown-menu.jsx  # DropdownSelect + ActionMenu
│   ├── input.jsx        # Themed text input
│   └── textarea.jsx     # Themed textarea
├── Sidebar.jsx          # Fixed left navigation
├── TopBar.jsx           # Sticky header (uses Badge, Button)
├── DashboardContent.jsx # Dashboard grid layout
├── KpiCard.jsx          # Uses Card primitive
├── TrafficChart.jsx     # Uses Card, CardHeader, CardContent
├── SiteHealth.jsx       # Uses Card
├── TopProducts.jsx      # Uses Card, Table primitives
├── RegionBreakdown.jsx  # Uses Card
├── RecentAlerts.jsx     # Uses Card
└── ProductsPage.jsx     # Uses Button, Input, Textarea, Badge, Checkbox, Switch, Dialog, DropdownSelect, ActionMenu, Table

lib/
└── utils.js             # cn() helper (clsx + tailwind-merge)

data/
├── mockData.js
└── productsCatalog.js
```

## Design System

The design tokens are defined in `app/globals.css` inside the `@theme` block. **Read this file to understand the token palette.**

The critical thing about this app: **every `components/ui/` primitive has been themed to match a non-default design system.** The default shadcn/ui aesthetic (rounded, shadowed, cool-gray) has been completely overridden. When you look at these components:

- `button.jsx` — uses `cva` for variant definitions, inline `style` for color theming
- `card.jsx` — flat border (`0 0 0 1px`) instead of shadow, hover accent bar
- `badge.jsx` — no border-radius, status-color mappings
- All primitives — 0px radius everywhere, no shadows, warm color palette

When adding or modifying UI primitives:
- **Read existing `components/ui/` files** to understand the theming approach
- New primitives must follow the same flat/sharp treatment
- Use `cn()` from `lib/utils.js` for class merging
- Use `cva` from `class-variance-authority` for variant definitions
- Use `var(--color-*)` for all colors

## Running

```bash
pnpm dev    # http://localhost:3001
pnpm build  # Production build
```

## Key Patterns

- **UI Primitives**: All in `components/ui/`. They accept `className` and `style` props for composition. They use `cn()` for merging.
- **Card composition**: `<Card>` → `<CardHeader>` + `<CardContent>`. Header contains `<CardTitle>`, `<CardDescription>`, `<CardAction>`.
- **Table composition**: `<Table>` → `<TableHeader>` + `<TableBody>`. Rows are `<TableRow>`, cells are `<TableHead>` / `<TableCell>`.
- **Dialog**: `<Dialog open onOpenChange>` → `<DialogHeader onClose>` + `<DialogBody>` + `<DialogFooter>`.
- **Dropdowns**: `<DropdownSelect>` for filter/form selects, `<ActionMenu>` for context menus with `{ icon, label, danger, separator }` items.
- **ProductsPage**: The integration test — uses every UI primitive in a single component.
