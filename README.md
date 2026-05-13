# aperia-ds5

Aperia design system — UI component library built with Next.js, Tailwind CSS v4, shadcn/ui, and Figma Code Connect.

## Tech Stack

- [Next.js 16](https://nextjs.org/) with Turbopack
- [React 19](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [tsup](https://tsup.egoist.dev/) — library build tool
- [Style Dictionary](https://styledictionary.com/) — design token pipeline
- [Figma Code Connect](https://github.com/figma/code-connect) — maps Figma components to code

## Prerequisites

- Node.js 20+
- npm 10+

## Setup

**1. Install dependencies**

```bash
npm install
```

This also runs `npm run build:lib` automatically via the `prepare` script.

**2. Build design tokens** (when Figma variables change)

Generates `app/styles/token.css` from `app/figma-variable.json`.

```bash
npm run build:tokens
```

**3. Start the dev server**

```bash
npm run dev
```

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Next.js production build |
| `npm run build:lib` | Compile library to `dist/` (ESM + type declarations) |
| `npm run build:tokens` | Regenerate `app/styles/token.css` from `app/figma-variable.json` |
| `npm run lint` | Run ESLint |
| `npm run format` | Format files with Prettier |
| `npm run typecheck` | TypeScript type check |

## Using this library in another app

### 1. Install

**Local (POC / development):**

```bash
# In the consumer app's package.json:
"aperia-ds5": "file:../aperia-ds5"
```

Then run `npm install` — this triggers the `prepare` script which builds `dist/` automatically.

**From a registry (production):**

```bash
npm install aperia-ds5
```

### 2. Set up globals.css

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "aperia-ds5/base.css";

@source "../node_modules/aperia-ds5/dist";
```

`base.css` includes everything: design tokens, Tailwind theme bridge, dark mode, Radix UI variants, and base element styles. No additional configuration needed.

### 3. Wrap the root layout with ThemeProvider

```tsx
import { ThemeProvider } from "aperia-ds5/theme-provider"

export default function RootLayout({ children }) {
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

### Available exports

| Import path | Contents |
|---|---|
| `aperia-ds5` | All UI components |
| `aperia-ds5/utils` | `cn()` utility (clsx + tailwind-merge) |
| `aperia-ds5/theme-provider` | `ThemeProvider` component |
| `aperia-ds5/base.css` | All base styles and tokens (import in globals.css) |
| `aperia-ds5/token.css` | Raw Figma design tokens only |

## Theming

`aperia-ds5` ships a default zinc/shadcn color palette. Every token is a plain CSS custom property, so any product can override them in its own `globals.css` **after** the `@import`.

### How it works

`base.css` defines tokens at two levels:

| Layer | Purpose |
|---|---|
| `:root { --primary: … }` | Actual values — override these to change colors |
| `@theme inline { --color-primary: var(--primary) }` | Bridges tokens → Tailwind utilities (`bg-primary`, `text-foreground`, …) |

Overriding a `:root` token automatically flows through to every component that uses the corresponding Tailwind utility.

### Minimal brand override

The most common customization is the primary/brand color:

```css
/* globals.css */
@import "tailwindcss";
@import "tw-animate-css";
@import "aperia-ds5/base.css";

@source "../node_modules/aperia-ds5/dist";

/* 1. Set the raw token values */
:root {
  --primary: oklch(0.5 0.22 142);          /* your brand green */
  --primary-foreground: oklch(0.98 0 0);   /* text on primary */
  --ring: oklch(0.5 0.22 142);             /* focus ring matches brand */
}

.dark {
  --primary: oklch(0.65 0.18 142);
  --primary-foreground: oklch(0.141 0 0);
}

/* 2. Tell Tailwind to inline the new values into utility classes */
@theme inline {
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-ring: var(--ring);
}
```

> **Shortcut:** if you only need light mode and don't need dark mode to differ, skip `:root` and just write `@theme inline { --color-primary: #your-hex; }` directly.

### Full token reference

All overridable tokens and their defaults (from `base.css`):

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

  /* Destructive / error */
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.985 0 0);

  /* Chrome */
  --border: oklch(0.92 0.004 286.32);
  --input: oklch(0.92 0.004 286.32);
  --ring: oklch(0.705 0.015 286.067);
  --radius: 0.625rem;                      /* base border-radius */

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
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
}
```

### Complete example — a violet-branded product

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "aperia-ds5/base.css";

@source "../node_modules/aperia-ds5/dist";

:root {
  --primary: oklch(0.5 0.25 290);
  --primary-foreground: oklch(0.98 0 0);
  --ring: oklch(0.5 0.25 290);
  --radius: 0.375rem;                      /* sharper corners */
  --sidebar: oklch(0.96 0.01 290);
  --sidebar-primary: oklch(0.5 0.25 290);
}

.dark {
  --primary: oklch(0.7 0.2 290);
  --primary-foreground: oklch(0.141 0.005 285);
  --sidebar: oklch(0.18 0.01 290);
  --sidebar-primary: oklch(0.7 0.2 290);
}

@theme inline {
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-ring: var(--ring);
  --color-sidebar: var(--sidebar);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
}
```

After saving, every component — buttons, badges, inputs, sidebar, focus rings — automatically reflects the new brand color, in both light and dark mode.

## Adding new components

1. Use the `shadcn` CLI to scaffold the component
2. Move it into `components/ui/<name>/<name>.tsx`
3. Re-export from `components/ui/index.ts`
4. Run `npm run build:lib` to rebuild `dist/`
5. Optionally add a `<name>.figma.tsx` Code Connect file alongside it

## Design Tokens

Tokens are sourced from `app/figma-variable.json` (exported from Figma) and compiled by Style Dictionary into `app/styles/token.css`.

To update tokens: export new variables from Figma → replace `app/figma-variable.json` → run `npm run build:tokens` → run `npm run build:lib`.

## Figma Code Connect

Code Connect files (`.figma.tsx`) live alongside their component in `components/ui/<name>/`. They import the component from the local source path and use the `imports` option to show the correct public package import to designers in Dev Mode.

```bash
# Publish all mappings to Figma Dev Mode
npx figma connect publish --skip-validation

# Publish a single component
npx figma connect publish -f components/ui/button/Buttons.figma.tsx --skip-validation
```
