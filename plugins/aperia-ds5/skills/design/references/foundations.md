# Foundations

The values live in `aperia-ds5/base.css` and the components. This file says what they're for.

## Colour roles

- **Page:** a light cool grey, `--background`, oklch hue 286.
- **Cards:** white (`--card`).
- **Sheets and dialogs:** `--background`, the page fill, with an edge and a large shadow.
- **Neutrals:** cool greys on one hue.
- **Contrast:** muted text `#66666e` and destructive `#c10007` in light mode, chosen to clear 4.5:1 on the page, a muted
  fill and a highlighted menu row (the design system's own pass only on white). Dark mode uses `#a8a8b2` and `#ff8a8c`.
- **Fields and outline buttons:** fill with `--control`, which is white in light mode and a step above the card in dark
  mode. Outline buttons hover to `--muted`.
- **Primary** is `#0058cc` in both modes with white text, shared by every app: primary buttons, focus, links and
  selected state.
- **Status colours** belong to the app ([brand-slots.md](brand-slots.md)): pairs of a pale fill with deep text, each with
  its own dark-mode pair. They mean state only. The library ships none.
- **Brand** (the sidebar), the chart palette and status colours are the only colours an app chooses.

## Font

- **Inter**, in every Aperia app. The library sets no font of its own: its text uses `--font-sans`, which the app sets.
  Sales Portal loads Inter with `next/font/google` (`variable: "--font-sans"`) on `<html>`. Without it, text falls back to
  whatever the page inherits.

## Surfaces and edges

- Every edge is 0.5px: a `ring` outside the box, never a 1px border. It's `--border` (12% foreground) on surfaces and
  panels and `--input` (16%) on controls. Shadows deepen in dark mode.
- The `surface` utility is `rounded-xl bg-card shadow-sm ring-[0.5px] ring-border`. Every Card has it.
- The `control` utility is `bg-control shadow-sm ring-[0.5px] ring-input`: inputs, textareas, selects, input groups,
  chip fields, checkboxes, radios, outline buttons and toggles, the selected tab and the switch thumb (always white).
- Focus is a 1px inner `ring` line plus a 3px halo at 50%; invalid is the same in destructive. Neither moves the text.
- Avatars draw a 10% inner line over the picture. Pictures otherwise have no frame.
- **Ghost buttons** hover with a tint of the foreground (5% in light, 10% in dark), so the hover shows on any fill. Never
  use a fixed grey.

## Floating panels

- **Overlay:** `--overlay` is 10% black in light mode and 50% in dark mode. It's the same for dialogs, alerts, sheets and
  drawers, and none of them blur.
- **Dialogs and alerts:** `--background` fill, 0.5px edge and a large shadow.
- **Sheets:**
  - open on the right, inset 1rem from the window, `rounded-xl`, full screen below 640px;
  - a title-only header is 56px, matching the top bar.
- **Command rows** (search, ⌘K) highlight like menu items: the accent fill and `--radius-md` corners.

## Motion

| What | In | Out | Curve |
|---|---|---|---|
| Dialog, alert, sheet, overlay | 220ms | 150ms | in `cubic-bezier(0.32, 0.72, 0, 1)`, out `cubic-bezier(0.4, 0, 1, 1)` |
| Sidebar rail, its buttons and the pane beside it | 250ms | 250ms | `cubic-bezier(0.32, 0.72, 0, 1)` |
| A dialog's scale | from 97% | to 97% | as above |

- Reduced motion removes scale and slide, leaving only fades.
- **Lists that change while you type:** grow at once, and shrink only after the height has held for about 300ms. Keep the
  last results faded while new ones load. Show "nothing found" only after typing pauses (about 400ms).
- Render new results in a React transition, and memoize rows, so a frame never blocks. Aim for 60fps at normal speed.

## Type

- Headings and card titles are **semibold**.
- Title Case for titles, headings, tabs, table headers, labels and buttons. Sentence case for sentences, descriptions and
  values.
- A missing value reads `—` (an em dash, no spaces around it) in muted text, which is different from 0 (UI Style Guide
  V4.3). An empty optional field reads "No [field]" in muted text, such as No priority.
- Numbers in tables and tiles use `tabular-nums`.

## Alignment and rhythm

- Elements that sit in one column start on the same x across containers: a panel's field icon, its result pictures and
  its footer hint all start on one line.
- Box edges (row highlights, borders) share their own line.
- Work each x out from the design system's real classes (padding plus border plus gap). Write the shared lines in a
  one-line comment, then measure them in the browser.
- `TitledCard` puts every card's first line on a 2rem row, so cards side by side line up.
- **Each part owns its space.** In a composition (a card, a panel, a section), the space between parts comes from the
  parts themselves: a header's own padding or height, the content's own padding. Avoid `gap` (or `space-y`) on the
  parent for it. When a part hides, a collapsed card's content or an error that clears, its space goes with it and the
  rest stays where it was, with no padding added back for the hidden state. A gap is fine between items that always
  show together, such as buttons in a row or a title and its count.

## Sizes and pointer

- Fields and buttons are 32px on desktop and 40px below 640px. Icon buttons are 40px square on a phone.
- Everything clickable shows the pointer, menu items and rows that open included. Disabled controls don't.
- Number fields have no spin arrows.
- **Disabled fields:**
  - light mode: recessed (4% foreground fill, muted text);
  - dark mode: faded to 50% on the usual fill;
  - all kinds alike, with `not-allowed` over the whole field.
- **Read-only values** keep the control's shape on no fill, so they line up with the fields beside them without looking
  disabled.
