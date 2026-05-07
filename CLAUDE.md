# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev           # Start dev server with Turbopack (localhost:3000)
npm run build         # Production build
npm run build:tokens  # Regenerate app/styles/token.css from app/figma-variable.json
npm run lint          # ESLint
npm run format        # Prettier (ts, tsx)
npm run typecheck     # TypeScript type check (no emit)
```

**Figma Code Connect**
```bash
npx figma connect publish   # Publish component mappings to Figma Dev Mode
npx figma connect           # Preview mappings locally
```

## Architecture

### Route groups
- `app/(dashboard)/` — main app shell with sidebar + topnav. Each subdirectory is a page (issues, rrm, qar, my-work, workflows, policies, governance, monitoring-testing, admin).
- `app/(ask-nanci)/` — separate shell for an AI assistant feature.
- `app/login/` and `app/showcase/` — standalone pages outside both shells.

### Layout wiring
`app/(dashboard)/layout.tsx` wraps pages in `SidebarProvider` + `PageHeaderProvider`, then renders `<Sidebar>`, `<TopNav>`, and a scrollable `<main>`. Pages use `PageHeaderSetter` (from `components/layout/`) to push their title/actions into the top nav via context.

### Design token pipeline
Figma variables are exported to `app/figma-variable.json`. Running `npm run build:tokens` runs Style Dictionary (`style-dictionary.config.js`) and outputs `app/styles/token.css` as CSS custom properties on `:root`. `app/globals.css` imports this file and bridges the tokens into Tailwind v4's `@theme inline` block.

### UI components (shadcn/ui)
All shadcn components live under `components/ui/<name>/<name>.tsx` and are re-exported from `components/ui/index.ts`. When adding a new shadcn component, follow this structure — move the generated file into its own subfolder and add its export to the barrel.

Code Connect mappings (`.figma.tsx` files) live alongside their component in the same subfolder.

### Context
- `contexts/SidebarContext.tsx` — controls sidebar open/collapsed state
- `contexts/PageHeaderContext.tsx` — lets pages set the top nav title and actions declaratively

### Lib / Hooks
- `lib/utils.ts` — `cn()` utility (clsx + tailwind-merge)
- `hooks/` — custom React hooks

## Figma Code Connect
Mappings are scanned from `components/**/*.ts` and `components/**/*.tsx` per `figma.config.json`. Import paths use the `@/` alias. New `.figma.tsx` files should be placed next to their component.

## Design tokens
To update tokens: export new variables from Figma → replace `app/figma-variable.json` → run `npm run build:tokens`. Do not hand-edit `app/styles/token.css`.
