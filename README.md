# Admin Sandbox

A monorepo benchmark for evaluating how well AI coding agents can work within an established, non-default design system across three different styling paradigms.

## Philosophy

### The Design System Is the Code

This project deliberately avoids default-looking UI. The design language is **sharp, flat, and warm** — the opposite of what most component libraries ship out of the box. There are no rounded corners, no drop shadows, no floating cards, no blue-purple gradients. Every surface is boxy, every shadow is replaced by a thin border, every hover is a color shift rather than a lift.

**The source code is the single source of truth for the design system.** There is no Figma file, no design tokens JSON, no Storybook. An agent working in any app variant must derive the design rules by reading the existing implementation — the same way a new developer joining a real project would.

### Dashboard as Reference Surface

The **Dashboard page** is the design system's primary reference surface. It exercises every major visual pattern:

- **KPI Cards** — the canonical card treatment: flat border, accent bar on hover, display typography for large values, sparkline visualization, status badges with semantic color
- **Weekly Activity Chart** — bar chart built from raw divs, demonstrating the color pairing (primary + accent) and how data visualization follows the same border/radius/shadow rules as the rest of the UI
- **Site Health Grid** — shows how status colors (good/warning/critical) are applied across labels, values, and progress bars. A good test of whether an agent understands the semantic color system
- **Top Products Table** — ranked table with gold highlighting for top-3, trend indicators, and the typography hierarchy (display font for names, body font for metadata)
- **Revenue by Region** — horizontal bar chart testing the accent-for-first / primary-for-rest pattern
- **Recent Alerts** — feed component with status dots, pulse animation on critical items, and the standard card + list-item layout

If an agent can reproduce the Dashboard correctly, it understands the design system.

### Products Page as Interaction Reference

The **Products page** is the interaction benchmark. It tests whether an agent can build complex, stateful UI that still follows the design system:

- **Search field** — custom compound input with icon, clear button, focus ring behavior (hard 2px outline, no glow)
- **Filter system** — dropdowns, toggles, checkboxes, and a filter count badge, all with the same flat/sharp treatment
- **Product table** — the most complex component: checkbox selection, emoji thumbnails, "NEW" badges, stock status indicators, visibility toggles, inline action menus
- **Bulk actions bar** — appears on selection, with primary-light background and action buttons
- **Add Product modal** — portal-based modal with form fields, dropdown selects, and the flat modal treatment (no rounded corners, border instead of shadow)
- **Action menus** — dropdown menus anchored to row actions, with dividers and danger items

If an agent can make the Products page fully functional with correct styling, it can handle real-world CRUD interfaces.

### Three Paradigms, One Visual Output

Each app variant tests a different skill:

| Variant | Stack | What It Tests |
|---|---|---|
| `react-spa` | Vite + React + vanilla CSS | Can the agent read, maintain, and extend a CSS custom property system? |
| `nextjs` | Next.js + Tailwind CSS v4 | Can the agent map an existing design system to Tailwind utility classes and `@theme` tokens? |
| `shadcn` | Next.js + shadcn/ui primitives | Can the agent override a component library's opinionated defaults (rounded, shadowed) to match a flat/sharp theme? |

The visual output of all three must be identical. The code is different; the pixels are the same.

## Getting Started

```bash
# Install dependencies
pnpm install

# Run individual apps
pnpm dev:react    # http://localhost:5173
pnpm dev:nextjs   # http://localhost:3000
pnpm dev:shadcn   # http://localhost:3001

# Build all apps
pnpm build
```

## Running Benchmarks Against an AI Agent

### Preventing Design System Leakage

The design system specification is intentionally **not** documented in any markdown file, Storybook, or design tokens JSON within the app directories. The source code itself is the specification. This is by design:

- Agents must **read and understand existing code** to derive design rules
- Agents cannot shortcut by reading a spec file and copy-pasting token values
- This mirrors real-world conditions where design systems are often implicit in the codebase

When setting up a benchmark session:

1. **Scope the agent to a single app directory** — e.g., point it at `apps/nextjs/` only, not the monorepo root
2. **Do not include this README in agent context** — this file is for benchmark operators, not for agents being evaluated
3. **Do not include other app variants in context** — an agent working on `apps/shadcn/` should not be able to read `apps/react-spa/src/styles.css` and extract every token
4. **Use the AGENTS.md files** — each app has its own `AGENTS.md` that gives the agent just enough context without revealing design system internals. (Claude Code users: thin `CLAUDE.md` files are included that redirect to `AGENTS.md`, so auto-loading still works.)

### Setting Up Skills per App Variant

A "skill" is a concrete task you ask the agent to perform. Below are recommended skill progressions for each variant, ordered from simple to complex.

#### `apps/react-spa` — CSS-based skills

| Skill | Description | What It Validates |
|---|---|---|
| **Add a component** | "Add a `QuickStats` card to the Dashboard that shows 3 inline metrics" | Can the agent read `styles.css`, understand the card pattern, and write new CSS that follows the same conventions? |
| **Modify the table** | "Add a 'Last Updated' column to the Products table with relative timestamps" | Can the agent extend `ProductsPage.jsx` and add matching CSS without breaking existing layout? |
| **Build a new page** | "Implement the Team page with a member list, role badges, and an invite modal" | Can the agent compose multiple patterns (table + badge + modal) from the existing system? |
| **Fix a regression** | Intentionally break a style (e.g., add `border-radius: 8px` to cards) and ask "something looks off, fix it" | Can the agent identify what violates the design system and correct it? |
| **Theme extension** | "Add a dark mode toggle that inverts the color scheme while maintaining the same flat/sharp aesthetic" | Can the agent understand the full token system well enough to create a coherent variant? |

#### `apps/nextjs` — Tailwind-based skills

| Skill | Description | What It Validates |
|---|---|---|
| **Add a component** | "Add a `SystemStatus` banner above the Dashboard that shows uptime and last deploy time" | Can the agent compose Tailwind utilities that match the existing `@theme` tokens? |
| **Modify the table** | "Add sortable column headers to the Products table" | Can the agent add interactive Tailwind-styled elements to an existing component? |
| **Build a new page** | "Implement the Notifications page with a filterable list of alerts, read/unread states, and a mark-all-read action" | Full page composition using only Tailwind utilities and the established token palette |
| **Fix a regression** | Swap some color values to Tailwind defaults (e.g., `bg-blue-500` instead of `bg-primary`) and ask to fix it | Can the agent distinguish project tokens from Tailwind defaults? |
| **Extract a pattern** | "The card header pattern is repeated everywhere — extract it into a reusable component" | Can the agent refactor while preserving exact visual output? |

#### `apps/shadcn` — Component library skills

| Skill | Description | What It Validates |
|---|---|---|
| **Add a component** | "Add a `Tooltip` primitive to `components/ui/` and use it on the KPI change badges" | Can the agent create a new shadcn-style primitive that follows the flat/sharp theme? |
| **Modify the table** | "Add pagination to the Products table using a new `Pagination` UI component" | Can the agent compose a new primitive + integrate it into existing page logic? |
| **Build a new page** | "Implement the Settings page with form sections for Organization, Billing, and API Keys using the existing UI primitives" | Can the agent use `Card`, `Input`, `Button`, `Switch`, `Dialog` together in a new context? |
| **Fix a regression** | Add `rounded-lg` to the `Card` component and ask to fix it | Can the agent identify that the library defaults conflict with the design system? |
| **Override challenge** | "Install and theme a `DatePicker` using Radix UI primitives, matching the existing aesthetic" | The hardest skill — can the agent take an external component and fully override its styling? |

### Testing Procedure

1. **Start the app** — run the appropriate `pnpm dev:*` command
2. **Open in browser** — verify the baseline looks correct before giving the agent any tasks
3. **Assign a skill** — give the agent a single task from the tables above
4. **Evaluate output** on three axes:
   - **Visual correctness** — does it look like it belongs in the app?
   - **Code quality** — does it follow the patterns of the existing codebase?
   - **Design system adherence** — did the agent derive the rules from code, or did it use generic defaults?
5. **Build check** — run `pnpm build:*` to confirm no regressions

### Scoring Rubric

| Score | Criteria |
|---|---|
| **5 — Perfect** | Visually indistinguishable from hand-written code. Correct tokens, correct patterns, correct interactions. |
| **4 — Minor issues** | Correct design system, but small deviations (e.g., slightly wrong spacing, missing hover state). |
| **3 — Partial** | Got the general idea but used some defaults (e.g., rounded corners on a new element, wrong font). |
| **2 — Weak** | The feature works but looks like it belongs to a different app. Generic styling. |
| **1 — Failed** | Broken, unstyled, or completely off-brand. |

## Feature Parity Checklist

All three apps implement:

- Dashboard: 4 KPI cards, Weekly Activity chart, Site Health grid, Top Products table, Revenue by Region, Recent Alerts
- Products: search, category/department/status filters, featured/in-stock toggles, bulk select + actions bar, add product modal, product row action menus, visibility toggles
- Placeholder pages: Team, Notifications, Settings

## Structure

```
admin-sandbox/
├── pnpm-workspace.yaml
├── package.json
├── .npmrc
├── .gitignore
├── README.md                 # This file (for benchmark operators)
├── DESIGN_SPEC.md            # Full design system reference (exclude from agent context)
├── AGENTS.md                 # Agent-safe monorepo context
├── CLAUDE.md                 # Thin pointer → AGENTS.md (Claude Code auto-load)
├── apps/
│   ├── react-spa/            # Vite + React + CSS
│   │   ├── AGENTS.md         # Agent-safe context for this variant
│   │   ├── CLAUDE.md         # Thin pointer → AGENTS.md
│   │   ├── src/
│   │   │   ├── App.jsx
│   │   │   ├── styles.css    # THE source of truth for design tokens
│   │   │   ├── components/
│   │   │   └── data/
│   │   └── ...
│   ├── nextjs/               # Next.js + Tailwind
│   │   ├── AGENTS.md
│   │   ├── CLAUDE.md
│   │   ├── app/
│   │   ├── components/
│   │   ├── data/
│   │   └── ...
│   └── shadcn/               # Next.js + shadcn/ui
│       ├── AGENTS.md
│       ├── CLAUDE.md
│       ├── app/
│       ├── components/
│       │   ├── ui/           # Themed shadcn primitives
│       │   └── *.jsx         # App components using ui/
│       ├── data/
│       ├── lib/utils.js
│       └── ...
```
