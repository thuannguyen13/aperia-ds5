# aperia-ds5

Aperia design system — UI component library built on React 19, Tailwind CSS v4, and shadcn/ui.

## Tech Stack

| | |
|---|---|
| [React 19](https://react.dev/) | UI runtime |
| [Tailwind CSS v4](https://tailwindcss.com/) | Styling |
| [shadcn/ui](https://ui.shadcn.com/) | Component primitives |
| [Storybook 10](https://storybook.js.org/) | Component development and documentation |
| [tsup](https://tsup.egoist.dev/) | Library build |
| [Figma Code Connect](https://github.com/figma/code-connect) | Figma ↔ code mappings |

---

## Contributing (working inside this repo)

**Requirements:** Node.js 20+, npm 10+

```bash
npm install      # installs deps and builds dist/ via prepare
npm run dev      # start Storybook at http://localhost:6006
```

### Scripts

| Script | Description |
|---|---|
| `npm run dev` | Storybook dev server |
| `npm run build:lib` | Compile library → `dist/` (ESM + types) |
| `npm run build:storybook` | Build Storybook for static deployment |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |
| `npm run typecheck` | TypeScript check (no emit) |
| `npm run cc:publish` | Publish all Code Connect templates to Figma |
| `npm run generate:icons` | Regenerate the icon Code Connect templates from Figma (needs `FIGMA_ACCESS_TOKEN` in `.env.local`) |
| `npm run publish:icons` | Publish the icon Code Connect templates to Figma |

### Adding a new component

1. Scaffold with the `shadcn` CLI
2. Move into `components/ui/<name>/<name>.tsx`
3. Re-export from `components/ui/index.ts`
4. Run `npm run build:lib`
5. Optionally add a `<name>.figma.ts` Code Connect template beside it

### Design tokens

All tokens are CSS custom properties defined directly in `styles/base.css` (`:root` for light, `.dark` for dark mode). Edit that file and run `npm run build:lib` — no token pipeline or code generation needed.

### Figma Code Connect

Each Figma component maps to one template, `<kebab-name>.figma.ts`, beside its code component in `components/ui/<name>/`. A template reads the selected instance's properties and returns a `figma.code` snippet; its `imports` show the `aperia-ds5` import in Dev Mode.

- `npm run cc:publish -- --dry-run`: list what would publish, upload nothing
- `npm run cc:publish`: publish all component templates
- `npm run publish:icons`: publish the icon templates
- `npm run generate:icons`: regenerate the icon templates from Figma

---

## Using aperia-ds5 in a project

### 1. Install

```bash
npm install aperia-ds5
```

For local development against an unpublished build:

```json
// package.json
"aperia-ds5": "file:../aperia-ds5"
```

Running `npm install` will trigger `prepare` and build `dist/` automatically.

### 2. Set up globals.css

```css
@import "tailwindcss";
@import "aperia-ds5/base.css";

/* Tell Tailwind to scan DS5 components for utility classes.
   Path is relative to this file:
     globals.css in app/  →  ../node_modules/aperia-ds5/dist
     globals.css at root  →  ./node_modules/aperia-ds5/dist  */
@source "../node_modules/aperia-ds5/dist";
```

`base.css` bundles everything in one import: design tokens, animations, Tailwind theme bridge, dark mode, Radix UI state variants, and base element styles.

### 3. Add ThemeProvider

```tsx
import { ThemeProvider } from "aperia-ds5/theme-provider"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
```

### 4. Import components

```tsx
import { Button, Badge, Card, Input } from "aperia-ds5"
import { cn } from "aperia-ds5/utils"
```

### Data table

Install the peer dependency once: `npm install @tanstack/react-table`. Then define columns and pass your rows:

```tsx
import { DataTable, DataTableColumnHeader, type ColumnDef, type DataTableFeatures } from "aperia-ds5/data-table"

const columns: ColumnDef<DataTableFeatures, Merchant>[] = [
  { accessorKey: "merchant", header: ({ column }) => <DataTableColumnHeader column={column} title="Merchant" /> },
  { accessorKey: "email", header: "Email" },
]

<DataTable columns={columns} data={merchants} filterColumn="merchant" filterPlaceholder="Filter merchants..." />
```

Sorting, filtering, pagination, row selection and column visibility are built in. For a different layout or server-side paging, build from the same parts: see the DataTable "Build your own" page in Storybook.

### Package exports

| Import | Contents |
|---|---|
| `aperia-ds5` | All UI components |
| `aperia-ds5/chart` | Chart components and all of recharts (needs `recharts` installed) |
| `aperia-ds5/data-table` | `DataTable` and all of TanStack Table (needs `@tanstack/react-table` installed) |
| `aperia-ds5/utils` | `cn()` (clsx + tailwind-merge) |
| `aperia-ds5/theme-provider` | `ThemeProvider` |
| `aperia-ds5/base.css` | Styles, tokens, and Tailwind config |

---

## Theming

`base.css` carries the shared Aperia look (Sales Portal's styling since 0.3.0): the tokens, the 0.5px edges, shadows,
overlay and motion, and the blue primary `#0058cc` in both modes. The components already use it, so an app adds nothing
for the shared look.

An app sets only its **brand slots**, in one file imported after the library:

```css
@import "tailwindcss";
@import "aperia-ds5/base.css";
@source "../node_modules/aperia-ds5/dist";
@import "./brand.css";
```

| Slot | Variables |
|---|---|
| Brand colour (the light sidebar) | `--brand`, optionally the `--sidebar-*` steps |
| Chart palette | `--chart-1` to `--chart-6` |
| Status colours | the app's own, e.g. `--color-status-*`, applied to `Badge` and `Alert` through `className` |

The model file is [skills/aperia-app-design/assets/brand.example.css](skills/aperia-app-design/assets/brand.example.css),
and the rules are in [brand-slots.md](skills/aperia-app-design/references/brand-slots.md). Don't override shared tokens or
restyle components with `[data-slot=…]` CSS; raise it here instead.

For your own markup, `surface` (card fill, edge, shadow, `rounded-xl`) and `control` (control fill, edge, shadow) give
the same box as the components.

## Agent skill

`skills/aperia-app-design` is the design language for coding agents: what's shared, what an app owns, patterns, copy and
the checks before a UI change is done. It ships in the package, so it always matches the installed version. Link it once
per app and commit the link:

```bash
mkdir -p .claude/skills
ln -s ../../node_modules/aperia-ds5/skills/aperia-app-design .claude/skills/aperia-app-design
```

Claude Code picks it up from there. For other agents (Codex, Cursor), add this line to the app's `AGENTS.md`:

```md
Before building or reviewing UI, read node_modules/aperia-ds5/skills/aperia-app-design/SKILL.md and follow it.
```
