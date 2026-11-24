# aperia-ds5

Aperia design system — UI component library built on React 19, Tailwind CSS v4, and shadcn/ui.

> **Coding agents:** in an app that uses aperia-ds5, run `npx aperia-ds5 init` once in its root, then read
> `node_modules/aperia-ds5/plugins/aperia-ds5/skills/design/SKILL.md` before building, changing or reviewing any UI.

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

Then set up the agent skill (see [Agent skill](#agent-skill)):

```bash
npx aperia-ds5 init
```

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
import { DataTable, type ColumnDef, type DataTableFeatures } from "aperia-ds5/data-table"

const columns: ColumnDef<DataTableFeatures, Merchant>[] = [
  { accessorKey: "merchant", header: "Merchant" },
  { accessorKey: "email", header: "Email" },
]

<DataTable
  columns={columns}
  data={merchants}
  noun={["merchant", "merchants"]}
  search={{ placeholder: "Search merchants" }}
  sort={[{ value: "merchant", label: "Merchant" }]}
/>
```

The table draws the list toolbar (search, filters, Sort, and a Columns menu), the table, and the count and pages
under it. Headings do not sort when clicked; Sort does. For a different layout or server-side paging, build from the same parts: see the DataTable "Build your own" page in Storybook.

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

An app sets only its own **status and chart colors**, in one file imported after the library:

```css
@import "tailwindcss";
@import "aperia-ds5/base.css";
@source "../node_modules/aperia-ds5/dist";
@import "./brand.css";
```

What an app may set (its status and chart colors; the sidebar color only with a reason agreed here) and why is on the
design skill's [Color](plugins/aperia-ds5/skills/design/styles/color.md) page, "What an app can change". The
model file is [brand.example.css](plugins/aperia-ds5/skills/design/assets/brand.example.css). Don't override shared
tokens or restyle components with `[data-slot=…]` CSS; raise it here instead.

For your own markup, `surface` (card fill, edge, shadow, `rounded-xl`) and `control` (control fill, edge, shadow) give
the same box as the components.

## App shell

Every Aperia app uses the same sidebar, top bar and page header. Wire them once in the app's layout (Next.js shown; any
router works through `link`):

```tsx
import Link from "next/link"
import { AppSidebar, AppSidebarSearch, AppHeader, AppContent, SidebarInset, SidebarProvider, TooltipProvider } from "aperia-ds5"

<TooltipProvider>
  <SidebarProvider className="h-svh min-h-0">
    <AppSidebar
      brand={{ name: "Aperia Sales Portal", logo: <Logo /> }}
      groups={[{ items: NAV }]}            // { href, label, icon }
      currentPath={pathname}
      link={Link}
      search={<AppSidebarSearch onOpen={openSearch} />}
      notifications={<YourNotifications />} // AppSidebarNotifications inside your popover
      user={{ name: user.name, role: user.roleName }}
      onSignOut={signOut}
    />
    <SidebarInset className="min-h-0 overflow-hidden">
      <AppHeader crumbs={crumbsBeforeTitle} link={Link}>
        <AppContent>{children}</AppContent>
      </AppHeader>
    </SidebarInset>
  </SidebarProvider>
</TooltipProvider>
```

`AppContent` is the page's scroll and column: 20px around it, centered up to 1440px, 20px between the page's sections.
A board or wide table renders `<FullWidth />` to fill the pane.
`TooltipProvider` goes around the shell once: the sidebar's tooltips need it.

Each page then starts with `PageHeader` (title, subtitle, `actions`, `menu={<RecordActions … />}`, `properties`); its
title fills the breadcrumb's last crumb. A table row opens its record with `<TableRow {...opensOnClick(label, open)}>`.
The stories under UI/App Shell show a list page, a record page, Dark and phone width.

## Agent skill

`aperia-ds5:design` is the design language for coding agents: what's shared, what an app owns, the app shell,
patterns, copy and the screenshot review before a UI change is done. It's the `design` skill of the `aperia-ds5` Claude
Code plugin in this repo's marketplace (`.claude-plugin/marketplace.json`, plugin in `plugins/aperia-ds5`), so it
updates without a library release.

**In an app**, run this once in its root and commit what it writes:

```bash
npx aperia-ds5 init          # --dry-run to see the changes first
```

It only adds what is missing, so running it again changes nothing:

- `.claude/settings.json`: the `aperia` marketplace (this repo's `main`, auto-updated) and `aperia-ds5@aperia` enabled.
- `CLAUDE.md`: use the `aperia-ds5:design` skill on every UI change, or read the npm copy if the plugin isn't loaded.
- `AGENTS.md`: the same for Codex, Cursor and other agents, pointing at the npm copy.
- It removes the rc.1 link `.claude/skills/aperia-app-design`, which would load the skill twice, and says if no
  stylesheet imports `aperia-ds5/base.css` yet.

Each teammate then installs the plugin once (needs GitHub access to this repo, through `gh auth login` and
`gh auth setup-git` or an SSH key), or accepts Claude Code's prompt when they trust the folder:

```bash
claude plugin install aperia-ds5@aperia --scope project
```

Agents also find the setup on their own: the package description, the top of this README and the top of the type
definitions tell them to run `init` and read the skill.

**Updating the skill:** edit `plugins/aperia-ds5/skills/design/` and merge to `main`. The plugin has no
`version`, so each commit is a new version. Apps with `autoUpdate` pick it up within a session and load it at the next
launch (or `/reload-plugins`). No npm release is needed. The skill checks the app's installed aperia-ds5 version and
says so when the app is behind.

**Other agents** (Codex, Cursor) read the copy in the npm package through the `AGENTS.md` line `init` writes. It
updates with the app's aperia-ds5, not with `main`.
