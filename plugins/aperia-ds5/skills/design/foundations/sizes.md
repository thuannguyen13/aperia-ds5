# Sizes

Sizes set the heights and widths of controls, icon buttons, headers, and the page column on desktop and phone screens.

## When to use

Use these sizes for every control, icon button, header, and page column. A field, a button, and a select side by side
are the same height. Phones get larger targets, so a thumb lands where it means to.

## What is available

Sizes cover controls, icon buttons, fixed heights, and the page width. The components set these sizes themselves, so
this page states each one once.

A phone is any screen narrower than 640px. Every "phone" on these pages means this width.

Controls come in four sizes.

| Size | Desktop | Phone |
|---|---|---|
| Default, for fields, selects, and buttons | 32px | 40px |
| Large button | 36px | 36px |
| Small button | 28px | 28px |
| Extra small button | 24px | 24px |

An icon button shows an icon with no text and is square. It is 28px on a desktop by default. Its other sizes, 24px,
32px, and 36px, match the button heights, so an icon button can sit beside a button of the same height. On a phone, an
icon button is 40px.

The top bar, a card's header, and a sheet's title-only header share one fixed height, so they line up across the
screen. A page header can show a 48px picture beside its title, such as a record's avatar.

The page sits in one centered column, at most 1440px wide, with the page spacing around it.

## How it looks and behaves

Everything clickable shows the hand cursor, including menu items and rows that open a record. Disabled controls do
not show it.

A page title's line is at least a button's height, so a page without actions lines up with a page that has them.

## Rules

### Use larger targets on a phone

- **Do:** Show fields, buttons, and icon buttons at their phone size on a phone, so a thumb lands where it means to.
- **Don't:** Use the desktop's smaller fields and icon buttons on a phone. Switch to the phone size, so people do not
  tap the wrong thing.

### Show the hand cursor on everything clickable

- **Do:** Show the hand over a button, a tab, a menu item, or a row that opens, so people know they can click it.
- **Don't:** Leave the arrow on a clickable row, or show the hand over a disabled button. Show the hand only on what
  responds, so the pointer never misleads.

## When you can do it differently

A page may fill the whole width in place of the centered column when it shows a board or a wide table.

## Works with

- See [Spacing](spacing.md) for the space around these sizes.
- See [Typography](../styles/typography.md) for the text inside them.
- See [Icons](../styles/icons.md) for icon buttons.

## In code

- These sizes live in the components, not in `base.css`. Controls: `components/ui/button/button.tsx`,
  `input/input.tsx`, `select/select.tsx`. Icon buttons: `components/ui/icon-button/icon-button.tsx`. The fixed height:
  `app-shell/app-header.tsx`, `titled-card/titled-card.tsx`, `sheet/sheet.tsx`; the page's picture is in
  `app-shell/app-header.tsx`. The page column: `components/ui/app-shell/app-content.tsx`.
- A phone is narrower than Tailwind's `sm` breakpoint (640px).
- `Button` sizes: `xs` (`h-6`), `sm` (`h-7`), `default` (`h-8`, `max-sm:h-10`), `lg` (`h-9`); icon sizes `icon-xs`,
  `icon-sm`, `icon` and `icon-lg`. `Input` and `SelectTrigger` are `h-8 max-sm:h-10`.
- An icon button (the recipe on [Button](../components/button.md)) is `size="icon-sm"` and `max-sm:size-10` on a
  phone.
- `AppContent` is the page column (`max-w-360`, with `p-5`); render `<FullWidth />` in a page that needs the whole pane.
  `AppHeader`'s bar is `h-14`.
- `base.css` gives every clickable element the pointer, including a row marked with `opensOnClick` (`data-opens`); it
  skips `:disabled`, `aria-disabled` and `data-disabled`.
