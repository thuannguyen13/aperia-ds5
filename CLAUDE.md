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
npm run check:docs    # Check the skill pages' structure and writing (scripts/check-docs.mjs)
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

### Data table

`DataTable` is imported from the `aperia-ds5/data-table` subpath, which re-exports all of `@tanstack/react-table` beside `DataTable` and the parts it is built from: `useDataTable`, `DataTableToolbar`, `DataTableContent`, `DataTableViewOptions`, `DataTablePagination`, `dataTableFeatures` and `dataTableDefaultColumn` (`DataTableFilter` and `DataTableColumnHeader` remain, deprecated). TanStack exports a `Table` type, so it stays out of the root barrel for the same reason recharts does.

Use `DataTable` by default. Build from the parts only for a different layout, actions on selected rows, or state the app owns (server paging): the "Build your own" docs page beside the DataTable stories shows both. `DataTable` must stay built only from those exported parts, so a hand-built table looks the same. `DataTable` is the list pattern packaged (decided 2026-11-24): `DataTableToolbar` is `ListToolbar` driven by the table's state (search, filters, `SortControl`, actions, and the Columns menu in its slot), headings never sort on click, and the footer is `ListPager`. The layout follows the Figma Data Table node (`18719:212930`): toolbar and footer `py-4`, no border around the table.

shadcn ships Data Table as a guide, not a registry component, so `components/ui/data-table/data-table.tsx` is DS-owned code built from that guide (TanStack Table v9, `useTable` with `tableFeatures`). There is nothing to refresh with `shadcn add`. `@tanstack/react-table` is a **peer** dependency like `recharts`: consumer column definitions are typed against the app's copy, so both must resolve one.

### Aperia patterns

aperia-ds5 ships building components and only the patterns every Aperia app has: `ListToolbar` (filters and list
search), `SortControl`, `ListPager` (a list's count and pages), `EmptyState`, `SortableList` and `FileDrop` (drag and drop), `ReasonTooltip` (why something
cannot be used), `RelativeTime` and `aperia-ds5/format` (dates, times, money), and the app shell. It also ships a few
pieces with behavior that is easy to get wrong: `SheetForm`, `SheetDelete`, `ConfirmDialog`, `EntityPicker`,
`PickField`, `AddOption`, `MoneyInput`, `DayRangeFields`, `FilePicker` and `ImagePicker`. Each lives under
`components/ui/<name>/`, exported from the root barrel (decided 2026-11-23). A pattern component has no card in the Components index (decided 2026-11-24): its stories are titled "Pattern Components/<Name>", tagged `!dev`, and shown on its pattern page's Code tab through `PatternCode` (ListToolbar on Filters, ReasonTooltip and FieldNote on Disabled With a Reason, and so on; the mapping is in each pattern page's `.mdx`).

Everything else an app can put together from plain components is a recipe, not a component: the skill page that owns it
shows the parts and classes, and the app builds it (titled card, stat tile, people stack, timeline, detail rows, empty
and money values, scroll table, group row, flag switch, icon button, form section, length count, list skeleton, the
⌘K search dialog). Be very careful adding a new pattern component: add one only when every app needs it, or when its
behavior is hard to get right. The docs' live examples render the recipes from `docs/design-language/recipes/`, which
is not part of the package. `IconButton` stays private (ListToolbar and SortControl use it).

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
// url=https://www.figma.com/design/uXivJU4N3R0LWu0mbimHWt/Aperia-Shadcn-Library--Enhanced-?node-id=26-160
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

The library targets React 19: `react` and `react-dom` are peer dependencies (`^19.0.0`) and dev dependencies, never `dependencies`, because a second React copy in the consumer breaks every hook with "Invalid hook call". Components use the React 19 style from current shadcn (`ref` as a prop, no `forwardRef`).

## Design language and agent skill (0.3.0)

`base.css` and the component classes carry the shared Aperia look that used to live in Sales Portal's `globals.css` (`data-slot` overrides). Every token is shadcn's, with Aperia's value: there's no extra brand token (the sidebar navy is `--sidebar` itself, decided 2026-11-23 for simplicity). Apps set only their chart palette and their own status colors. The primary `#0058cc` is shared in both modes (decided 2026-11-19, final).

- Put a look in the component's classes, not in `data-slot` CSS, so an app's `className` can still override it through `cn()`. `base.css` keeps only tokens, the `surface` and `control` utilities, base element rules and panel motion (unlayered, keyed on `data-slot`).
- Edges are `ring-[0.5px]` with no border; focus and invalid are `inset-ring-1` plus a 3 px `ring` halo, so nothing shifts. Exceptions keep a border: Toggle `outline` (the joined toggle group relies on it), Badge, Input OTP slots, Switch track.
- Left in Sales Portal for now (not in Figma yet, or app-specific): the segmented toggle-group track, read-only fields (`data-readonly`), stacked sheets, the sidebar fine-tuning (separator width, rail timing, menu text clip), destructive button colors in Dark, the chart focus outline, `.plain`, and its status and access-level colors.
- `plugins/aperia-ds5/skills/design` (`aperia-ds5:design`: plugin `aperia-ds5`, skill `design`) is the design language for coding agents. It's a Claude Code plugin in this repo's marketplace (`.claude-plugin/marketplace.json`, marketplace `aperia`), which apps enable in `.claude/settings.json` (README, Agent skill); a copy also ships in the npm package (`files`) for Codex and Cursor. The plugin has no `version`, so every commit to `main` reaches apps: keep `main`'s skill true to the latest ds5 release, and update its version line in `SKILL.md` when a release changes what it names. Change it in the same change as the code it describes; it must never contradict `base.css` or a component. Run `claude plugin validate .` and `claude plugin validate plugins/aperia-ds5` after changing it. The skill is also the design-language documentation, and the one source of truth for it: values live only in `styles/base.css` (pages name tokens; Storybook shows the values live), rules live on exactly one skill page, and this file and the README link to the pages rather than restate them. Its pages, written for non-technical readers (designers, POs, PMs) first and agents second:
  The pages sit in six sections (decided 2026-11-24), the same in the skill's folders and the Storybook sidebar:
  - Get Started: `overview.md` (who it's for, what's available, how to read a page, how to propose a change) and `get-started/` (For Designers, For Developers). Storybook adds What's New (CHANGELOG.md) and Code Connect Status.
  - `foundations/`: the rules across every screen. Accessibility; Layout (Scaffold, Page Layout, Screen Sizes, which owns the phone, tablet and desktop widths, Spacing, Sizes); Content Design (Copy and Message Templates, the one source for UI copy, built on Aperia's UI Style Guide V4.3, which the personal `ui-copy` skill points to; Money and Numbers); States (Loading, Saving and Feedback, Errors and Validation, which owns where each error shows, when a form is checked, and the words of every error, Empty States, Disabled With a Reason, which also owns when an action is left out instead of disabled).
  - `styles/`: the visual values (Surfaces and Layers first: which fill each part sits on, how parts group, which part leads; then Color, including what an app can change; Typography, Border and Radius, Elevation, Motion, Icons).
  - `components/`: guidance for one building block in depth (Button, Card, Dialog, Table). Every building block has one home in Storybook under Components/<Group> (Actions, Communication, Containment, Navigation, Selection, Text Inputs, Files and Media, Lists and Tables, Charts, Chat, Layout): its guidance in tabs when it has a page here, and its stories and props in the Code tab.
  - `patterns/`: UI patterns, how components combine into the parts of a screen (a list's toolbar, a record's details or history), grouped as Navigation, Content, Lists and Editing, one page each. A whole page (a list page, a record page) is an Example, not a pattern (decided 2026-11-24).
  - `examples/`: one page, Titan and Sales Portal, the two apps before and after aperia-ds5 (decided 2026-11-24: the other Examples pages were removed). The screens it embeds are built in `docs/design-language/examples/` (`screens.stories.tsx`, `titan-screens.stories.tsx`).
  - Every page opens with a lead: one sentence that defines the subject ("An app shell frames every page with a sidebar, a top bar, and a page column."), plus at most one "See [Page] for …" sentence. No colon inside a sentence (a colon only introduces a list), no chain of comma clauses, no opening "The" for something not yet introduced, no narrative or outcome story, no values, no contractions, serial comma.
  - The goal of the docs (stated 2026-11-24): one source of truth that helps people design and code an Aperia app that keeps the same spirit, principles, and consistency in experience and look. Quality and fast lookup come before quantity. Every statement is a fact, written in simple grammar. No section is filled for its own sake: a page has a section only when it has something to say there.
  - A page's sections, in this order (decided 2026-11-24; `scripts/check-docs.mjs` holds the list): the lead, Anatomy (first, so a reader sees the thing and its parts before the choices and the specs), When to use (only when the page helps choose between options), What is available (only for a subject that comes in types or options), How it looks and behaves (a component page ends it with a States subsection drawn live with `forceState`, `StateTable` or `StateCards` from `docs/design-language/states.tsx`, never hand-copied colors), Rules, In code. There is no "When you can do it differently" and no "Works with": an exception sits with the behavior or the rule it changes, and a link sits in the sentence that needs it. Examples pages put their live example under How it looks and behaves, add Before and after ahead of Rules, and end with Which patterns it uses. A rule lives on one owner page; other pages link to it.
  - Anatomy is on the Overview tab of every component and pattern page, as on Sort: one sentence that says how many parts there are and which show only sometimes, then a numbered list of the parts, each optional one marked "(optional)". When the parts belong to one example of the subject, a second sentence names it ("The parts are those of an Add Task button with an icon."), never "the drawing". Each item says what the part is (a title, a button, a list of choices), never only its name. The `.mdx` attaches an `Anatomy` drawing from `docs/design-language/anatomy.tsx` to the heading, and `SkillDoc` shows the list as its legend. The drawing is the real component in its place on a screen. A subject with a panel or a menu is drawn open, as a framed story (`story`) in `docs/design-language/examples/anatomy.stories.tsx`, because a panel renders outside an inline drawing. A Foundations or Styles page has an Anatomy only when its subject has parts.
  - A rule is `### N. Name`, then a statement (the rule and its reason), then an optional **Do:** and an optional **Don't:**. Each Do and Don't is one short instruction with a concrete case that the statement does not already give. With a live pair they caption its two pictures. A rule is cited by page and number ("Sort 2"), so numbers go up the page and are never reused: a new rule takes the next number, and a removed rule's number stays retired. A rule must prevent a real mistake. Improve a weak rule. Remove a filler rule, one that only repeats the page's description or exists to fill the section; a page with no real rule has no Rules section. Mistakes are each page's Don'ts; there's no separate drift list.
  - No live example sits unexplained (decided 2026-11-24): a story's `Canvas` in an `.mdx` goes inside `Captioned` (`docs/design-language/blocks.tsx`) with one line that says what it shows. The page's `.md` never points at an example ("the first example", "in the drawing"), because the text is also read outside Storybook.
  - Every page is in this form (converted 2026-11-24). `check-docs` fails on a rule without a number or a statement, and on a retired section.
  - Pages are written to a 12-rule standard: full sentences, prose before lists, tables for items with shared attributes, overview before detail, facts not adjectives, no colon inside a sentence, no comma chains, introduce a thing before "the", no contractions, serial comma, US spelling, and general guidance only (each statement must hold for many apps, with app names only as marked examples). Behavior is described so a reader can see and check it (added 2026-11-24, from a writing review):
    - Start with the rule, then the reason or the consequence ("…, so the wheel never gets trapped").
    - One rule per sentence. A second case gets its own sentence or a list item; a guidance sentence stays under 30 words.
    - Name what a word points at. Never "the rest", "the system", or an "it" that could mean two things: say "every entry", "the app", "the card's content".
    - Define a broad word the first time a page uses it ("a card has three parts: its header, its content, and its footer"), then use it.
    - Describe what people can observe: what lines up, what sits inside what, what moves with what, what happens on a phone or when content grows or empties.
    - A technical term only when it adds precision; otherwise the plain word for the actual page, card, row, or field.
    - Use the widely known word, never a coined one: "divider" for a line between rows or sections, "border" for the line around a card, control, or panel (never "hairline").
  - `SKILL.md` is the agents' entry: the page list, the order of work, the invariants and the review checklists.
  Storybook (`docs/design-language/`) renders each page through a `?raw` import (`SkillDoc` in `skill-doc.tsx`), so it never holds a copy of the text. `SkillDoc` shows the lead above three tabs (Overview: Anatomy, When to use and What is available; Guidelines: How it looks and behaves and Rules; Code: In code, plus a component's stories) and draws its own "On this page" for the tab in view. A page gets tabs by its folder (Foundations, Styles, Components, Patterns, Examples), not by its headings, so a page with no Overview section still shows Guidelines and Code. `docs/design-language/site.ts` is the site map: every section, group and page in sidebar order, each component's group, lead and guide page. Links between pages, the section index pages (`section-index.tsx`) and the component homes (`component-page.tsx`, set as `docs.page`; a guided component's `.mdx` attaches with `<Meta of>` and its stories drop `autodocs`) all read it. A new page needs its entry in `site.ts`, an `.mdx` in its section's folder (`get-started/`, `foundations/`, `styles/`, `patterns/`, `example-pages/`) whose Meta title is `<Section>/<Group>/<the page's # title>`, and the sidebar order from `node scripts/sidebar-order.mjs` pasted into `.storybook/preview.tsx`; `node scripts/sidebar-order.mjs --check` fails when the three disagree. Component homes show generated Used in links (`docs/design-language/uses.ts`), derived from each page's In code backticked names and each Examples page's live-example imports; never write them by hand. Skill pages show no such list (decided 2026-11-24): the Code tab and In code name a page's components. Run `npm run check:docs` after changing a page: errors break the standard; warnings (rules without a live example, long sentences, repeated rules) are for review. A new component's stories title is `Components/<Group>/<Name>`, with its entry in `site.ts`. Live examples and Do/Don't pairs live in `docs/design-language/examples/`, keyed by the page's headings (a pair too wide for half the page, such as a table or a page header, takes `stack` and shows the Do above the Don't).

## Figma library reference

### Two libraries: Enhanced is live, the original is frozen (2026-11-19)

The design audit lands in a duplicate of the library, not in place, because Ask Nanci production uses the original Figma library and Figma has no version pinning: a publish there reaches its new files and offers updates to its existing ones.

- **Live: Aperia Shadcn Library (Enhanced)**, key `uXivJU4N3R0LWu0mbimHWt`
  (`https://www.figma.com/design/uXivJU4N3R0LWu0mbimHWt/Aperia-Shadcn-Library--Enhanced-?node-id=`). All Figma work and every Code Connect template from here on targets this file. The code release that matches it is 0.3.0.
- **Frozen: Aperia Shadcn Library (original)**, key `XERddNbyfcDl7jAmRDbgqt`. It matches 0.2.x, which Ask Nanci production runs from a copy in its own repo. Do not edit, publish or unpublish it, and do not publish Code Connect to it. If Ask Nanci production needs a fix there, make the same fix in Enhanced and note it.
- **Code Connect points at Enhanced** (repointed 2026-11-19 for 0.3.0): every `// url=` header, story link and script names `uXivJU4N3R0LWu0mbimHWt`. Accordion, Combobox List, ContextMenu and Select Menu point at the single components that replaced their sets. The mappings already published to the original stay there, and they match 0.2.x. Publishing still needs approval (above).
- **Keep Enhanced swappable.** Ask Nanci will later move to Enhanced with Figma's Swap library, which matches by name. Add tokens and variant values freely, but do not rename or delete existing ones; record any rename the audit forces (old → new) in the 0.3.0 release notes. A product that needs its own look (for example Ask Nanci keeping a blue primary) gets a variable mode, not a second library. Once no file uses the original, unpublish and archive it, and give Enhanced the plain name.

### The audit in Enhanced: Sales Portal is the source (2026-11-19)

Enhanced now carries the design audit (Figma file `chnRsxcMfjWOmSpd7LdueI`), with Sales Portal's shipped styling as the source of truth: `../aperia-sale-portal/app/globals.css` plus its `data-slot` overrides. Titan is left out; it is based on Sales Portal. 0.3.0 moves that styling into this library, so Sales Portal can delete its overrides.

**One styling model, expressible in both code and Figma.** Each property is built the same way on both sides, so Figma, Dev Mode and Code Connect describe what the code renders:

| Property | Code | Figma |
|---|---|---|
| Color | CSS variable | Variable of the same name |
| Derived color | `color-mix(in oklab, var(--x) N%, transparent)` | Alias of `x` at N% opacity |
| Edge | `ring-[0.5px]`, no border | Stroke bound to `border-width/default` (0.5), Outside, not in layout |
| Elevation | Shadow tokens | Effect styles with the same values |
| State | Variant changing tokens | Variant changing bindings |

- Never store a computed value in Figma. A color code derives from another token is an alias (plus opacity) in Figma; a literal in code (hex or oklch) is that literal. Each changed or new variable's description holds its code source.
- Mix with `transparent`, not into a surface. A see-through mix composites the same in the browser and Figma on every surface; `color-mix(..., var(--card))` cannot be expressed in Figma. Sales Portal's `--border` and `--input` still mix into `var(--card)`; 0.3.0 changes them.
- No transparent `border` under a ring. Sales Portal keeps a 1 px transparent border on controls, which shifts their text 1 px and has no Figma equivalent; 0.3.0 drops it, and focus and error use the ring alone.
- Before calling a token reuse or merge safe, trace every place it renders in Sales Portal (library classes, `globals.css` overrides, app components) and list the visible effects with file:line.

**Tokens.** Values follow Sales Portal (surfaces, muted text, destructive, sidebar), except `primary`: #0058cc in both modes, white text on it in Dark (decided 2026-11-19; in code since 0.3.0). The sidebar is the navy #002f67: code sets `--sidebar` and `--sidebar-primary-foreground` to it directly (no `--brand` since 2026-11-23). Figma still routes them through a hidden `colors/brand` variable; set the two sidebar variables to the value and retire `colors/brand` there too (pending approval). New tokens, kept to what no existing token covers:

| Token | Light / Dark | Why it exists |
|---|---|---|
| `control` | `var(--card)` / `oklch(0.31 0.006 286)` | Fill of controls and chosen items. Dark needs a step between `card` and `popover` so fields show on cards and inside popovers |
| `overlay` | black 10% / black 50% | Dim behind dialog, sheet and drawer, no blur. A 10% dim disappears in Dark |
| `--default-border-width` | 0.5px | Every border and divider |
| shadow colors | `foreground` 2% and 5% / black 20% and 30% | Shadows that deepen in Dark; hidden from publishing in Figma |

Merged or dropped instead of added: `border-strong` folded into `input` (`foreground` at 16%, the edge of every control); `sheet` dropped (dialog and sheet use `background`); the access-level colors stay in Sales Portal; so do the status colors (`--color-status-*`) and the amber warning alert (decided 2026-11-19: apps color the ds5 `Badge` and `Alert` through `className`, so colors are per project, not shared; Figma's Badge and Alert keep only their original variants).

**Recipes.** Ship as utilities here, used by the components:
- `surface`: `card` fill, `border` edge, `shadow-sm`, `rounded-xl`. Card, and tables and empty states on a page.
- `control`: `control` fill, `input` edge, `shadow-sm`. Every control has the fill (white in Light): input, textarea, select trigger, input group, combobox chips, checkbox, radio, outline button, outline toggle, Input OTP slot, the chosen tab. Sales Portal's rule leaves out the outline toggle and the OTP slot (transparent there); 0.3.0 adds them. A pressed toggle keeps `bg-muted`.
- Choice cards (Checkbox, Radio and Switch with Type=Box; code: `FieldLabel` wrapping a `Field`): `control` fill under the card in every state, `border` edge; checked adds `primary` 5% (Dark 10%) on top and a `primary` 30% (Dark 20%) edge. Figma stacks two fills; code needs one opaque mix, `color-mix(in oklab, var(--primary) 5%, var(--control))`, since CSS can't stack two background colors. ds5's FieldLabel is transparent unchecked; 0.3.0 gives it the control recipe (`bg-control ring-[0.5px] ring-input shadow-sm`). Figma stacks the selected edge too (`input`, then `primary` 30% on top); code: `ring-[color-mix(in_oklab,var(--primary)_30%,var(--input))]`, which composites the same.
- Panels (dialog, alert dialog, sheet): `background` fill, `border` edge, `shadow-lg`, `overlay` dim.
- Shadows have four steps (resting `sm`, menu `md`, panel `lg`, dragging `xl`); `md`, `lg` and `xl` each include `sm`.

**Figma has no props the code lacks** (decided 2026-11-19). Every variant property maps to a ds5 prop or a real state; looks the code gets from context (Dark mode, a project's own colors) stay out of the components. Removed: menu `Color=Inverted` and `Appearance=Translucent` (Combobox List, ContextMenu, DropdownMenu Menu, Select Menu are now single components; Inverted is Dark mode on the frame) and item `State=Hover (Translucent)`, plus their only tokens `custom/popover\70` and `custom/foreground\10`. The original (production) library gets the same removal by hand; everything else stays name-compatible so Swap library keeps working.
Also removed as not in code: Badge `Variant=Verified` (a shadcn demo: secondary + icon + `bg-blue-500`; use any variant with Show Left Icon and color per project) and `custom/blue-500 dark:blue-600`; Accordion `Variant=Border` (Accordion is now a single component); ButtonGroup `Variant` (only `Orientation` left; the Buttons inside carry the variant, as in code); Toggle Group `Type=Fill` (`w-full` by className). Kept because they map to code: Toggle Group `Type` (`spacing` 0 vs >0; note ds5 defaults `spacing` to 2, Figma's default is joined), Alert Dialog `Destructive` (`AlertDialogAction variant`), Kbd `Background=Primary` (the in-tooltip look ds5 applies by context).

**Outline variants have a fill** (decided 2026-11-19): every `outline` variant sits on `control` (white in Light) so it doesn't fade into the page: Button, Toggle, Badge and Badge Number. Done in code (0.3.0): Badge `outline` gets `bg-control` (Sales Portal's control rule only matches `button`/`a`, and the badge is a `span`); Toggle `outline` gets the control recipe.

**Component changes.** Card title semibold. Disabled fields: Light keeps full opacity with `foreground` 4% fill and muted text at 70%; Dark is `control` at 50% opacity. Icons stay at Lucide's default stroke in code (strokeWidth 2 on the 24 grid, about 1.33 px at 16 px). In Figma every Lucide icon vector is bound to `stroke-width/stroke-[1-25]` (1.25, decided 2026-11-19); Figma does not scale a stroke when an instance is resized, so the bound value is what renders at every size.

**Done in Figma (2026-11-19):** 0.5 px edges of surfaces, controls and panels sit Outside (dividers such as footer top lines stay Inside); focus and invalid states of controls use `focus/control` and `focus/control-destructive` (shadow-sm plus the halo; `focus/default` stays for non-controls such as primary buttons and tabs); Button and Toggle at default, lg, icon and icon-lg sizes are `rounded-lg` (10 px), xs and sm sizes `rounded-md`, as in code; the switch thumb is white in both modes with the control edge and shadow-sm (done in code (0.3.0): thumb `bg-white`, not `--card`/`bg-background`, which turned it dark in Dark).

**Item muted fill (2026-11-19):** ds5's Item `muted` and Card footer are `bg-muted/50`, but the Figma Item Muted used full `muted` (too dark). Added `custom/muted\50` (muted @50, both modes) and bound Item Muted to it.

**Avatar shape (2026-11-22):** the Avatar set has `Shape` (Circle / Square), code's `shape` prop. Square corners bind `border-radius/rounded-lg` at xl, lg and default, `rounded-md` at sm and `rounded-sm` at xs, as in code. Existing variants became `Shape=Circle`, so placed avatars don't change.

**Not done yet in Figma:** the floating Sheet component layout (16 px inset, rounded, 56 px header; only the Theme Combinations preview shows it), the toggle group track, and table header without hover.

**Known gaps carried from the original library:** `destructive-foreground` (Figma `#fef2f2`, code `#fafafa`), `secondary` in Dark (`#262626` vs `#27272a`), no `chart-6` mode variable, and the Input OTP slot fill pointing at `background` where code is transparent.

Page IDs below were read from the original. Expect the same IDs in Enhanced.

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
