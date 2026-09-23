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
npm run cc:publish -- --dry-run   # List what would publish, no upload
npm run cc:publish                # Publish templates to Figma Dev Mode (ask first)
npm run publish:icons             # Publish the icon templates (ask first)
```

## Architecture

### UI components (shadcn/ui)
All shadcn components live under `components/ui/<name>/<name>.tsx` and are re-exported from `components/ui/index.ts`. When adding a new shadcn component, follow this structure — move the generated file into its own subfolder and add its export to the barrel.

Code Connect templates (`<kebab-name>.figma.ts` files) live alongside their component in the same subfolder.

### Charts

Charts are imported from the `aperia-ds5/chart` subpath, not the root barrel:

```ts
import { BarChart, Bar, XAxis, ChartContainer, ChartGrid, ChartTip, chartAxisProps, CHART_MARGIN } from "aperia-ds5/chart"
```

The subpath re-exports all of recharts alongside the DS5 chart components and the house chrome, so a chart needs one import line. The recharts primitives cannot go in the root barrel: recharts exports `Label` and `Tooltip`, which collide with the DS5 components of those names, and a star export loses to an explicit one, so `import { Label } from "aperia-ds5"` would silently resolve to the form label.

The root barrel still exports `ChartContainer`, `ChartTooltip`, `ChartTooltipContent`, `ChartLegend`, `ChartLegendContent`, `ChartStyle` and `ChartConfig` so 0.1.6 consumers keep working. Both paths resolve to the same module, so mixing them is safe, but new code uses the subpath.

`recharts` is a **peer** dependency. It passes chart state through React context, so the app and DS5 must resolve one copy: two copies break tooltips and axes with no error. Keep it out of `dependencies`.

The chrome (`CHART_AXIS`, `CHART_MARGIN`, `ChartGrid`, `ChartTip`, `chartAxisProps`) lives in `components/ui/chart/chart-defaults.tsx`, beside `chart.tsx` rather than inside it, because `chart.tsx` is refreshed with `--overwrite` and diffed.

### Lib / Hooks
- `lib/utils.ts` — `cn()` utility (clsx + tailwind-merge)
- `hooks/` — custom React hooks

## Figma Code Connect
Templates are Code Connect v2 parserless files: `components/ui/<dir>/<kebab-name>.figma.ts`, one per Figma component, named after the code component it connects (`select-item.figma.ts`). When two templates connect the same code component to different Figma nodes, name them after the Figma component (`badge.figma.ts`, `badge-number.figma.ts`). `figma.config.json` includes `components/**/*.figma.ts` and excludes `components/ui/icon/**`, which publishes on its own through `npm run publish:icons`. Do not write `.figma.tsx` files or `figma.connect()`: that is the v1 parser format this repo migrated away from.

**Before writing any `.figma.ts` template, always:**
1. Fetch the shadcn component docs (e.g. `https://ui.shadcn.com/docs/components/<name>`) to confirm available props and their exact names/types.
2. Call `get_context_for_code_connect` with the Figma node ID to get all component properties, variants, and descendants. Property names are case sensitive and some carry a `#id` suffix (`Items#21418:3`); copy them exactly.
3. Read the component source (`<name>.tsx`) to verify the props interface.
4. Cross-reference all three sources before writing the template.

**File shape.** The header comments are read by tooling: `// url=` is the Figma node the template attaches to (`scripts/check-coverage.mjs` reads it too), `// component=` is the code component name Dev Mode shows.

```ts
// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=26-160
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/alert/alert.tsx
// component=Alert

import figma from "figma"

const variant = figma.selectedInstance.getEnum("Variant", { Default: "default", Destructive: "destructive" })
const title = figma.selectedInstance.getString("Title Text")

export default {
  id: "Alert",
  imports: ['import { Alert, AlertTitle } from "aperia-ds5"'],
  example: figma.code`<Alert${figma.helpers.react.renderProp("variant", variant)}>
    <AlertTitle>${figma.helpers.react.renderChildren(title)}</AlertTitle>
  </Alert>`,
  metadata: { nestable: true },
}
```

**Template API** (full reference in the `figma:figma-code-connect` skill):
- `figma.selectedInstance.getString`, `getBoolean`, `getEnum(name, map)` read TEXT, BOOLEAN and VARIANT properties. `getEnum` must map every value: an unmapped one renders `undefined`.
- `getInstanceSwap(name)?.executeTemplate().example` renders an INSTANCE_SWAP through the swapped component's own template. `findInstance(layer)` reaches a nested instance by layer name and returns an error handle when missing, so check `.type !== "ERROR"` first; `findText(layer)` does the same for text layers.
- `figma.properties.children(["Layer"])` renders named child instances through their templates; `figma.properties.slot(name)` renders a SLOT property.
- `figma.helpers.react.renderProp(name, value)` and `renderChildren(value)` print a prop or children and drop `undefined`.
- Interpolate template results inside `figma.code`. Joining them with `+` or `.join()` prints `[object Object]`.

**One template per Figma node.** When variants need different snippet structure (`Type=Default` vs `Type=Box`), branch inside that node's template on `figma.selectedInstance.getPropertyValue("Type")`, assign each branch to one `template` object, end with an `else` so every variant renders, and `export default template` once. Extend the existing branches instead of adding a second template for a node: two mappings on one node are what produced duplicate Dev Mode sidebar entries under v1.

**Publish command:** `npm run cc:publish`. It passes `--skip-validation` because the Figma API response for this file exceeds the CLI's validation buffer. `npm run cc:publish -- --dry-run` lists every template that would publish and uploads nothing; run it after any template change.

**IMPORTANT: always ask before publishing.** Never run a real publish (`cc:publish`, `publish:icons`, or `npx figma connect publish` without `--dry-run`) on your own. Show the planned `.figma.ts` changes and the dry run output first, then wait for explicit approval.

**Comments in snippets.** Everything inside `figma.code` appears verbatim in the Dev Mode snippet panel, so a `{/* ... */}` JSX comment there reaches developers. Use it for placement hints for sub-components or non-obvious composition context. Ordinary `//` comments outside `figma.code` are not shown.

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

Page IDs, to pass to `get_metadata` for component node IDs. `get_metadata` without a node ID lists only some of the 72 pages; `use_figma` returning `figma.root.children` gives the live list.

```
580:9181     Documentation    43:396       Assets
21275:5      Style Guide      477:11332    Blocks (Official)
18159:2277   Academy          18489:152194 Plugin
21003:22055  Icons            580:9180     Components
1:433        Lucide Icons     40:153       Utility Components

1:434        Accordion        244:2898     Date Picker      64:316       Radio Group
21:322       Alert            112:477      Dialog           296:243      Resizable
22:307       Alert Dialog     21192:433238 Direction        296:207      Scroll Area
21:535       Aspect Ratio     112:454      Drawer           118:1264     Select
23:988       Avatar           89:189       Dropdown Menu    118:2682     Separator
23:995       Badge            18672:1039   Empty            216:3314     Sheet
23:1004      Breadcrumb       18684:15122  Field            5143:200     Sidebar
34:6         Button           216:2886     Hover Card       64:243       Skeleton
18672:217548 Button Group     65:520       Input            61:169       Slider
37:1900      Calendar         18677:11182  Input Group      118:2756     Sonner
46:65        Card             76:89        Input OTP        18665:1996   Spinner
46:66        Carousel         18672:6033   Item             60:438       Switch
449:6176     Chart            18665:239    Kbd              184:890      Table
46:67        Checkbox         65:517       Label            183:417      Tabs
60:434       Collapsible      210:2486     Menubar          177:367      Textarea
60:435       Combobox         209:1883     Navigation Menu  132:1671     Toggle
60:436       Command          65:516       Pagination       123:75       Toggle Group
60:437       Context Menu     193:1388     Popover          122:10       Tooltip
244:2897     Data Table       65:441       Progress         22:1400      Typography
```

Mapped nodes are the `// url=` headers: `grep -h '^// url=' components/ui/*/*.figma.ts`. A node listed there needs only a shadcn refresh, not a new template.

## Refreshing a component from shadcn

`npx shadcn@latest add <name> --overwrite` writes to `components/ui/<name>.tsx` — the **wrong**
location. Diff it against `components/ui/<name>/<name>.tsx`, update the correct file if it differs,
then delete the stray. Code Connect examples import via `import { X } from "aperia-ds5"`.
