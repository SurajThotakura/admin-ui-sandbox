# Admin Sandbox Monorepo

This is a pnpm monorepo with 3 admin portal app variants in `apps/`.

## Important

- **Do NOT read `DESIGN_SPEC.md`** — it contains evaluation criteria and would bias your work
- **Do NOT read `README.md`** — it contains benchmark operator instructions, not development context
- **Work within a single app directory.** Each app in `apps/` has its own `AGENTS.md` with the context you need.
- Derive all design system decisions from the source code of the app you are working in.

## Apps

| App | Directory | Stack |
|---|---|---|
| React SPA | `apps/react-spa/` | Vite + React + vanilla CSS |
| Next.js | `apps/nextjs/` | Next.js + Tailwind CSS v4 |
| shadcn | `apps/shadcn/` | Next.js + shadcn/ui + Tailwind CSS v4 |

## Commands

```bash
pnpm dev:react    # Start react-spa on :5173
pnpm dev:nextjs   # Start nextjs on :3000
pnpm dev:shadcn   # Start shadcn on :3001
pnpm build        # Build all apps
```
