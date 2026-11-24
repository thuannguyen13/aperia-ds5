# Sizes

Sizes set the heights and widths of controls, icon buttons, headers, and the page column.

## When to use

Use these sizes for every control, icon button, header, and page column. A field, a button, and a select side by side
are the same height.

## What is available

Sizes cover controls, icon buttons, fixed heights, and the page width. The components set these sizes themselves, so
this page states each one once.

Controls come in four sizes, the same on every screen, a phone included. Default is for fields, selects, and buttons.
Small and Extra small are for compact components, and Large has no use in an Aperia app yet. The live table on this
page shows each height as the browser reads it.

An icon button is a square button with only an icon. Its sizes match the button heights, and it takes the height of
the controls beside it. See [Button](../components/button.md) for which height goes where.

A phone changes how a page is laid out, such as a sheet that fills the screen, but not the size of a control. See
[Screen Sizes](screen-sizes.md) for the widths and what changes at each.

The top bar, a card's header, and a sheet's title-only header share one fixed height, so they line up across the
screen. A page header can show a 48px picture beside its title, such as a record's avatar.

The page sits in one centered column, at most 1440px wide, with the page spacing around it.

## How it looks and behaves

A page title's line is at least a button's height, so a page without actions lines up with a page that has them.

## Rules

### Give controls side by side one height

- **Do:** Use the default size for a field, a select, and a button on one row, so their edges and text line up.
- **Don't:** Set a large button beside a default field, or give a control its own height in the app's CSS. Use the
  shared sizes, so every row of controls lines up.

## When you can do it differently

A page may fill the whole width in place of the centered column when it shows a board or a wide table.

## Works with

- See [Spacing](spacing.md) for the space around these sizes.
- See [Typography](../styles/typography.md) for the text inside them.
- See [Icons](../styles/icons.md) for icon buttons.
- See [Screen Sizes](screen-sizes.md) for what changes on a phone and a tablet.
- See [Surfaces and Layers](../styles/surfaces-and-layers.md) for the hand cursor and the other signs of what responds.

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
- `AppContent` is the page column (`max-w-360`, with `p-5`); render `<FullWidth />` in a page that needs the whole pane.
  `AppHeader`'s bar is `h-14`.
