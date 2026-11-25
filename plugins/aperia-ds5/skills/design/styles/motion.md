# Motion

Motion sets how fast and how smoothly dialogs, sheets, and the sidebar move, and how a list that changes while people type settles. See [Loading](../foundations/loading.md) for why a page keeps its layout when data arrives and for the last results that stay on screen, faded, while new ones load.

## What is available

Motion has three movements. Each timing and curve is set once, as a token in the library, and a panel or a part reads it from there.

| What moves | Opening | Closing |
|---|---|---|
| A dialog, an alert dialog, a sheet, and the overlay behind each | The panel opening time (`--panel-in`) on the easing (`--rail-ease`), fast at first and then settling | The shorter panel closing time (`--panel-out`), speeding up as it goes |
| A dialog's size | Grows from slightly under full size as it fades in | Shrinks to slightly under full size as it fades out |
| The name row in the sidebar's header, as the sidebar folds to a rail | The rail time (`--rail-duration`) on the same easing | The same |

See [Elevation](elevation.md) for the shadow of a panel and the overlay behind it, and [Dialog](../components/dialog.md) for how a dialog behaves.

## How it looks and behaves

A panel opens fast and settles, and it closes a little faster, so a person sees where it came from and sees that it is gone. A sheet slides in from its edge. A dialog grows as it fades in.

When a person's device asks for less motion, a panel only fades. It does not grow or slide.

## Rules

### 1. Use the library's panel motion

A panel moves on the library's timings and easing, so every panel in every app opens and closes in the same way.

- **Do:** Build an app's own panel from `Dialog`, `AlertDialog`, or `Sheet`, which already move this way. A panel that cannot use them reads `--panel-in`, `--panel-out`, and `--rail-ease`.
- **Don't:** Pop a panel in, snap it shut, or slide it at an even speed with its own timing.

### 2. Let a changing list settle

A list that changes while people type, such as a search or a picker, grows at once and shrinks only after its height has held for a moment. The list shows "nothing found" only after typing pauses, so it does not jump or show an empty message in the middle of a word. Typing never stalls while results update.

- **Do:** In a company picker, show more rows the moment they arrive, and keep the list at its height until the shorter result has held.
- **Don't:** Shrink the list or show "nothing found" at every key.

## In code

- The panels already move this way: `styles/base.css` sets `--panel-in`, `--panel-out`, `--rail-duration` and
  `--rail-ease` on `Dialog`, `AlertDialog`, `Sheet` and their overlays, with the closing curve beside them (Panel
  motion), and turns off scale and slide under `prefers-reduced-motion`. The dialog's scale is its `zoom-in-97` /
  `zoom-out-97` classes. `AppSidebar` reads `--rail-duration` and `--rail-ease` on the header row that holds the
  name and the toggle.
- Lists that change while you type have no token yet: shrink after the height holds for about 300ms, and show "nothing
  found" after typing pauses for about 400ms. Render new results in a React transition and memoize rows, so a frame
  never blocks. Aim for 60fps at normal speed.
