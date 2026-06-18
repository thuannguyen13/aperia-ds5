# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run storybook     # Start Storybook dev server (localhost:6006)
npm run build:storybook  # Build Storybook static output
npm run build:lib     # Build the library (outputs to dist/)
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

### UI components (shadcn/ui)
All shadcn components live under `components/ui/<name>/<name>.tsx` and are re-exported from `components/ui/index.ts`. When adding a new shadcn component, follow this structure — move the generated file into its own subfolder and add its export to the barrel.

Code Connect mappings (`.figma.tsx` files) live alongside their component in the same subfolder.

### Lib / Hooks
- `lib/utils.ts` — `cn()` utility (clsx + tailwind-merge)
- `hooks/` — custom React hooks

## Figma Code Connect
Mappings are scanned from `components/**/*.ts` and `components/**/*.tsx` per `figma.config.json`. Import paths use the `@/` alias. New `.figma.tsx` files should be placed next to their component.

**Before writing any `.figma.tsx` file, always:**
1. Fetch the shadcn component docs (e.g. `https://ui.shadcn.com/docs/components/<name>`) to confirm available props and their exact names/types.
2. Call `get_context_for_code_connect` with the Figma node ID to get all component properties, variants, and descendants.
3. Read the component source (`<name>.tsx`) to verify the props interface.
4. Cross-reference all three sources before writing the mapping.

**CLI parser constraints** — the Figma CLI parser does not support:
- Variable declarations inside `example` functions
- `&&` or ternary conditional rendering in JSX children
- Multiple return statements

Use separate `figma.connect()` calls with `variant` filters to handle structural differences (e.g. `Type=Default` vs `Type=Box`). Keep connects to 2 or fewer per component to avoid duplicate entries in the Figma sidebar.

**Publish command:**
```bash
npx figma connect publish --skip-validation
```
The `--skip-validation` flag is required because the Figma API response for this file exceeds the CLI's validation buffer.

**IMPORTANT — always ask before publishing.** Never run `figma connect publish` automatically. Always show the planned `.figma.tsx` changes first and wait for explicit approval before pushing to Figma.

**JSX comments in examples** — `{/* ... */}` comments inside `example` JSX are visible to developers in the Figma Dev Mode snippet panel. Use them to add placement hints for sub-components or non-obvious composition context.

## Design tokens
Tokens are hand-authored in `styles/base.css` as CSS custom properties. Do not run Style Dictionary or any token build script — the token pipeline was removed.
