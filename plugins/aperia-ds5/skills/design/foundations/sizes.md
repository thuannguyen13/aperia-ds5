# Sizes

Sizes give every control, header, panel, and the page column a fixed height or width, so rows line up and every screen
keeps the same proportions. See [Spacing](spacing.md) for the space around these sizes.

## What is available

### Control heights

A control is a button, a field, or a select. Controls come in four heights, `h-6`, `h-7`, `h-8`, and `h-9`. They are
called Extra small, Small, Default, and Large, and every screen uses the same four, a phone included.

- **Default** (`h-8`) is for every field, select, and button on a page, sheet, or dialog.
- **Small** (`h-7`) and **Extra small** (`h-6`) are for compact components. A compact component, such as a card's
  header, sets them itself.
- **Large** (`h-9`) has no use in an Aperia app yet.

An icon button is a square button with only an icon. Its sizes are `size-6`, `size-7`, `size-8`, and `size-9`, the four
control heights, and it takes the height of the controls beside it. See [Button](../components/button.md) for which
size goes where. See [Typography](../styles/typography.md) for the text inside a control and [Icons](../styles/icons.md)
for an icon's size.

### Fixed heights

The top bar and the sidebar's header are `h-14` high. A card's header is the same height, so the headers line up
across the screen. A sheet's header has the same minimum height, `min-h-14`, and grows taller with a description.

A page header can show a `size-12` picture beside its title, such as a record's avatar.

### Panel widths

A panel is a popover, such as the one Sort opens. Panels come in two named widths, and the sidebar has two of its own.

| Width | Used for |
|---|---|
| `w-popover-sm` | A list's Sort panel and a filter's value picker. Sort's Ascending and Descending buttons fit their labels at this width. |
| `w-popover-lg` | A wide panel, such as Notifications. |
| `--sidebar-width` | The sidebar when it is open. |
| `--sidebar-width-icon` | The sidebar when it is collapsed to its icons. |

### Page column

The page sits in one centered column, at most `max-w-360` wide, with the page spacing around it. See [Screen
Sizes](screen-sizes.md) for the column's own widths, `@min-page-md` and `@min-page-lg`, where a page's sections change.

A page that shows a board or a wide table may fill the whole width in place of the centered column.

## How it looks and behaves

A field, a select, and a button of the default size are the same height, so they line up side by side.

A page title's line is at least a button's height, so a page without actions lines up with a page that has them.

A phone changes how a page is laid out, such as a sheet that fills the screen, but not the height of a control. See
[Screen Sizes](screen-sizes.md) for what changes at each width.

## Rules

### 1. Give controls side by side one height

Controls on one row share one height, so their edges and text line up across the row.

- **Do:** Put a field and a button of the default size on one search row.
- **Don't:** Set a Large button beside a default field, or give a control its own height in the app's CSS.

## In code

- These sizes live in the components, not in `base.css`. Controls: `components/ui/button/button.tsx`,
  `input/input.tsx`, `select/select.tsx`. Icon buttons: `components/ui/icon-button/icon-button.tsx`. The fixed height:
  `app-shell/app-header.tsx`, `titled-card/titled-card.tsx`, `sheet/sheet.tsx`; the page's picture is in
  `app-shell/app-header.tsx`. The page column: `components/ui/app-shell/app-content.tsx`.
- `Button` sizes: `xs` (`h-6`), `sm` (`h-7`), `default` (`h-8`), `lg` (`h-9`); icon sizes `icon-xs`, `icon-sm`, `icon`
  and `icon-lg`. `Input` and `SelectTrigger` are `h-8`. No control changes height on a phone; never add a `max-sm:`
  height.
- An icon button (the recipe on [Button](../components/button.md)) takes the `icon` size beside a field and `icon-sm` on a
  row or in a card header.
- `AppContent` is the page column (`max-w-360`, with `p-5`); render `<FullWidth />` in a page that needs the whole width.
  `AppHeader`'s bar is `h-14`.
