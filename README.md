# visual-to-code-prototype

A Next.js prototype that demonstrates a Figma-to-code workflow using design tokens, Figma Code Connect, and shadcn/ui components.

## Tech Stack

- [Next.js 16](https://nextjs.org/) with Turbopack
- [React 19](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
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

**2. Build design tokens**

This generates `app/styles/token.css` from the Figma variable definitions in `app/figma-variable.json`.

```bash
npm run build:tokens
```

**3. Start the dev server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Production build |
| `npm run build:tokens` | Regenerate CSS tokens from `app/figma-variable.json` |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run format` | Format files with Prettier |
| `npm run typecheck` | Run TypeScript type checking |

## Figma Code Connect

Code Connect mappings live in `components/**/*.figma.ts`. They link Figma components to their React counterparts so Figma's Dev Mode shows real code snippets.

**Publish mappings to Figma**

```bash
npx figma connect publish
```

**Preview mappings locally**

```bash
npx figma connect
```

The parser and include paths are configured in [figma.config.json](figma.config.json).

## Design Tokens

Tokens are sourced from `app/figma-variable.json` (exported from Figma variables) and compiled by Style Dictionary into `app/styles/token.css` as CSS custom properties on `:root`.

To update tokens: export new variables from Figma, replace `app/figma-variable.json`, then run `npm run build:tokens`.
