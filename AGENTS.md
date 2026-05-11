# Admin Sandbox

Three independent admin portal app variants in `apps/`. Each app is self-contained with its own `package.json` and `node_modules` — there is no shared workspace.

## Important

- **Do NOT read `README.md`** — it contains benchmark operator instructions, not development context
- **Work within a single app directory.** Each app in `apps/` has its own `AGENTS.md` with the context you need.
- Derive all design system decisions from the source code of the app you are working in.
- **Install packages from within the app directory** — just `cd apps/<app> && pnpm add <pkg>`.

## Apps

| App | Directory | Stack |
|---|---|---|
| React SPA | `apps/react-spa/` | Vite + React + vanilla CSS |
| Next.js | `apps/nextjs/` | Next.js + Tailwind CSS v4 |
| shadcn | `apps/shadcn/` | Next.js + shadcn/ui + Tailwind CSS v4 |

## Commands

Run from within each app directory:

```bash
cd apps/react-spa && pnpm dev    # Start on :5173
cd apps/nextjs && pnpm dev       # Start on :3000
cd apps/shadcn && pnpm dev       # Start on :3001
```
