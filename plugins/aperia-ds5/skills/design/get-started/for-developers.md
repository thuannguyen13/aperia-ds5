# For Developers

Developers install aperia-ds5 in an app, import its styles once, and build every screen from its components.

## Install

Install the package, then set up the agent skill in the app's root:

```bash
npm install aperia-ds5
npx aperia-ds5 init
```

`init` adds the design skill to the app's Claude Code settings and points `CLAUDE.md` and `AGENTS.md` at it, so a
coding agent reads these pages before it changes a screen. Running it again changes nothing.

## Set up the styles

The app's global stylesheet imports Tailwind, then aperia-ds5's styles, then tells Tailwind to read the library's
classes. The `@source` path is relative to the stylesheet.

```css
@import "tailwindcss";
@import "aperia-ds5/base.css";
@source "../node_modules/aperia-ds5/dist";
```

The app wraps its root in `ThemeProvider`, which switches Light and Dark mode:

```tsx
import { ThemeProvider } from "aperia-ds5/theme-provider"

<ThemeProvider>{children}</ThemeProvider>
```

The app adds only its own status and chart colors after these lines. See [Color](../styles/color.md) for what an app
can change.

## Import components

Components come from the package's root. Charts, the data table, and the helpers come from their own paths:

| Import | Contents |
|---|---|
| `aperia-ds5` | Every component |
| `aperia-ds5/chart` | Chart parts and all of recharts, which the app installs |
| `aperia-ds5/data-table` | `DataTable` and all of TanStack Table, which the app installs |
| `aperia-ds5/format` | Dates, times, and amounts as the pages write them |
| `aperia-ds5/list` | Sorting and filtering for a list, also on the server |
| `aperia-ds5/utils` | `cn()`, which joins class names |
| `aperia-ds5/theme-provider` | `ThemeProvider` |

An app imports a component as it is. It never wraps a component in its own copy or changes its look in the app's CSS,
so every app gets the library's fixes.

## Where to start

Read the pages in this order:

1. [App Shell](../patterns/app-shell.md), for the sidebar, the top bar, and the page column.
2. [Page Layout](../foundations/page-layout.md), for the parts of a page.
3. The pattern that matches the screen, such as [List Toolbar](../patterns/list-toolbar.md) or
   [Forms in Sheets](../patterns/forms-in-sheets.md).

Each component's page in Components shows its live examples and its props on the Code tab.
