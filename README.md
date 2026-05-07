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
