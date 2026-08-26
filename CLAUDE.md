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

## What this library is for

Aperia's internal React component library (shadcn/ui + Tailwind v4 + Radix), published as an npm
package from `dist/` and consumed by other Aperia products — notably `../aperia-ask-nanci`. It is
the single source of truth for UI across those apps: consumers import from `"aperia-ds5"` directly
and must never wrap or re-export a component locally.

## Figma library reference

File: **Aperia Shadcn Library**, key `XERddNbyfcDl7jAmRDbgqt`
(`https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=`).

Top-level page IDs — pass these to `get_metadata` to drill into component node IDs:

```
580:9181     Documentation      18684:15122  Field           61:169       Slider
23:988       Avatar             65:520       Input           18665:1996   Spinner
23:995       Badge              18677:11182  Input Group     60:438       Switch
34:6         Button             18672:6033   Item            184:890      Table
18672:217548 Button Group       18665:239    Kbd             177:367      Textarea
46:67        Checkbox           64:316       Radio Group     122:10       Tooltip
89:189       Dropdown Menu      118:1264     Select          22:1400      Typography
18672:1039   Empty              118:2682     Separator       40:153       Utility Components
21003:22055  Icons              1:433        Lucide Icons
```

No dedicated page exists for accordion, alert, alert-dialog, breadcrumb, calendar, card, carousel,
chart, collapsible, command, context-menu, dialog, drawer, hover-card, input-otp, label, menubar,
navigation-menu, pagination, popover, progress, resizable, scroll-area, sheet, sidebar, skeleton,
sonner, table, tabs, toggle, toggle-group — they're under Utility Components or not yet designed.

**Already mapped** (need only a shadcn refresh, not a new mapping): alert `26-160` · avatar
`17100-29935` (+ `AvatarBadge` `21122-16180`, `AvatarGroup` `17100-83077`) · badge `26-169`,
`17100-10130` · button `37-931` · checkbox `46-112` · empty `18672-2962` (+ `EmptyMedia`
`18672-1781`) · input `65-533` · input-group `18672-226415`, `18677-9902`, `18677-10743` ·
radio-group `65-326`, `65-341` · tabs `21133-27311` (+ `TabsTrigger` `183-532`) · select, switch,
textarea (verify).

## Refreshing a component from shadcn

`npx shadcn@latest add <name> --overwrite` writes to `components/ui/<name>.tsx` — the **wrong**
location. Diff it against `components/ui/<name>/<name>.tsx`, update the correct file if it differs,
then delete the stray. Code Connect examples import via `import { X } from "aperia-ds5"`.
