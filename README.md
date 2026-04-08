# Admin Sandbox

Test how well AI agents can implement and customize UI component libraries to look consistent with an existing app.

3 identical admin portals, 3 different styling stacks with a non-default design system.

The design system is sharp corners, flat surfaces, bright palette to throw off the agents that only reproduce library defaults aren't actually reading your code. This will also help test the limitations in your UI components customization abilities.


## Quick Start

```bash
pnpm install

pnpm dev:react    # :5173  — Vite + React + CSS
pnpm dev:nextjs   # :3000  — Next.js + Tailwind v4
pnpm dev:shadcn   # :3001  — Next.js + shadcn/ui

pnpm build        # all 3
```

## What This Is

| App | Stack | Tests |
|---|---|---|
| `apps/react-spa` | Vite + React + vanilla CSS | Reading + extending a CSS custom property system |
| `apps/nextjs` | Next.js + Tailwind CSS v4 | Mapping design tokens to `@theme` + utility classes |
| `apps/shadcn` | Next.js + shadcn/ui | Overriding a component library's defaults to match a custom theme |

Same pixels, different code. The design language is sharp, flat, and warm — 0px radius, no shadows, warm palette. The opposite of what libraries ship by default.

## Design System

The source code is the spec.

- `react-spa` → read `src/styles.css` (`:root` block)
- `nextjs` → read `app/globals.css` (`@theme` block)
- `shadcn` → read `app/globals.css` + `components/ui/*.jsx`

Agents must derive every design rule from code. This is test the agent's ability to infer context from a real application.

## Reference Pages

**Dashboard** = visual reference. Exercises every pattern: cards, charts, tables, status colors, typography hierarchy, animations.

**Products** = interaction reference. Exercises every stateful pattern: search, filters, dropdowns, toggles, checkboxes, bulk selection, modals, action menus.

## Running Benchmarks

### Anti-Leakage Setup

1. Scope the agent to **one app directory only** (e.g. `apps/nextjs/`)
2. Exclude `README.md` from agent context
3. Exclude other app variants — no cross-reading `styles.css` from another app
4. Each app has an `AGENTS.md` with stack/architecture info (no design tokens)

> Claude Code: thin `CLAUDE.md` files redirect to `AGENTS.md` for auto-loading.

### Procedure

1. `pnpm dev:*` — verify baseline
2. Run your AI agent and ask it to implement your UI components. Use `SKILL.md` files created for your specific UI components for best results. 
3. Evaluate: visual correctness, code quality, design system adherence
4. `pnpm build:*` — confirm no regressions

## Feature Parity

All 3 apps implement:
- Dashboard: KPI cards, activity chart, health grid, top products, region breakdown, alerts
- Products: search, filter dropdowns, toggles, bulk select, add modal, row actions, visibility toggles
- Placeholders: Team, Notifications, Settings

## Structure

```
admin-sandbox/
├── package.json / pnpm-workspace.yaml
├── README.md              ← you are here (operators only)
├── AGENTS.md              ← agent-safe context
├── CLAUDE.md              ← pointer → AGENTS.md
├── apps/
│   ├── react-spa/         Vite + React + CSS
│   │   ├── AGENTS.md
│   │   └── src/styles.css ← design token source of truth
│   ├── nextjs/            Next.js + Tailwind v4
│   │   ├── AGENTS.md
│   │   └── app/globals.css
│   └── shadcn/            Next.js + shadcn/ui
│       ├── AGENTS.md
│       ├── components/ui/ ← themed primitives
│       └── app/globals.css
```
