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

Sorting, filtering, pagination, row selection and column visibility are built in.

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

`aperia-ds5` ships a zinc/shadcn default palette. Every color, radius, and chart color is a plain CSS custom property — override any of them in your `globals.css` after the import.

### How it works

`base.css` defines tokens at two layers:

| Layer | What it does |
|---|---|
| `:root { --primary: … }` | Actual token values — override these |
| `@theme inline { --color-primary: var(--primary) }` | Bridges tokens into Tailwind utilities (`bg-primary`, `text-foreground`, …) |

Overriding a `:root` token flows through automatically to every component that uses the matching utility.

### Quick start — brand color only

```css
@import "tailwindcss";
@import "aperia-ds5/base.css";
@source "../node_modules/aperia-ds5/dist";

@theme inline {
  --color-primary: #218800;
  --color-primary-foreground: oklch(0.985 0 0);
}
```

> Skip `:root` when you only need light mode and don't need dark mode to differ.

### With dark mode support

```css
@import "tailwindcss";
@import "aperia-ds5/base.css";
@source "../node_modules/aperia-ds5/dist";

:root {
  --primary: oklch(0.5 0.22 142);
  --primary-foreground: oklch(0.98 0 0);
  --ring: oklch(0.5 0.22 142);
}

.dark {
  --primary: oklch(0.65 0.18 142);
  --primary-foreground: oklch(0.141 0 0);
}

@theme inline {
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-ring: var(--ring);
}
```

### Token reference

All overridable tokens and their defaults:

```css
:root {
  /* Surfaces */
  --background: oklch(1 0 0);
  --foreground: oklch(0.141 0.005 285.823);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.141 0.005 285.823);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.141 0.005 285.823);

  /* Brand */
  --primary: oklch(0.21 0.006 285.885);
  --primary-foreground: oklch(0.985 0 0);

  /* Secondary / muted / accent */
  --secondary: oklch(0.967 0.001 286.375);
  --secondary-foreground: oklch(0.21 0.006 285.885);
  --muted: oklch(0.967 0.001 286.375);
  --muted-foreground: oklch(0.552 0.016 285.938);
  --accent: oklch(0.967 0.001 286.375);
  --accent-foreground: oklch(0.21 0.006 285.885);

  /* Destructive */
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.985 0 0);

  /* Chrome */
  --border: oklch(0.92 0.004 286.32);
  --input: oklch(0.92 0.004 286.32);
  --ring: oklch(0.705 0.015 286.067);
  --radius: 0.625rem;

  /* Sidebar */
  --sidebar: oklch(0.985 0.002 247.839);
  --sidebar-foreground: oklch(0.141 0.005 285.823);
  --sidebar-primary: oklch(0.21 0.006 285.885);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.967 0.001 286.375);
  --sidebar-accent-foreground: oklch(0.21 0.006 285.885);
  --sidebar-border: oklch(0.92 0.004 286.32);
  --sidebar-ring: oklch(0.705 0.015 286.067);

  /* Charts */
  --chart-1: oklch(0.528 0.152 264.943); /* #3F65C2 */
  --chart-2: oklch(0.722 0.155 49.32); /* #F18442 */
  --chart-3: oklch(0.436 0.158 27.445); /* #951B19 */
  --chart-4: oklch(0.819 0.119 137.085); /* #9FD689 */
  --chart-5: oklch(0.896 0.063 313.549); /* #ECD1FB */
  --chart-6: oklch(0.317 0.135 282.036);
}
```
