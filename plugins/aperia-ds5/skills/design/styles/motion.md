# Motion

Motion defines the timing and easing that panels, menus, and loading states use to appear and disappear.

## When to use

Use motion whenever a panel, menu, or loading state appears or disappears. A panel that eases in shows where it came
from. A panel that fades out shows that it is gone.

## What is available

Motion has three movements. Each timing and curve is set once in the library. The live samples on this page print each
one as the browser reads it, and let you open a dialog and a sheet.

| What moves | Opening | Closing |
|---|---|---|
| Dialog, alert dialog, sheet, and the overlay | The panel opening time, easing out (fast, then settling) | The shorter closing time, speeding up as it goes |
| The sidebar folding to a rail, its buttons, and the page beside it | The rail time, on the same easing | The same |
| A dialog's size | Grows from slightly under full size | Shrinks to slightly under full size |

## How it looks and behaves

Panels open fast and settle, and they close a little faster, speeding up as they go. When a person's device asks for
less motion, panels only fade. They do not grow or slide.

Layouts do not shift when data arrives, so people keep their place.

A list that changes while a person types, such as a search or a picker, follows three rules:

- The list grows at once, and it shrinks only after its height has held for a moment.
- The last results stay on screen, faded, while new ones load.
- The "nothing found" message shows only after typing pauses.

Typing never stalls while results update.

## Rules

### Ease panels in and out

- **Do:** Open a panel fast and let it settle, then close it a little faster. Grow a dialog as it fades in, so people
  see where it came from.
- **Don't:** Pop a panel in, snap it shut, or slide it at an even speed with no easing. Use the panel's own motion, so
  changes are easy to follow.

## When you can do it differently

Motion has no exceptions. Every app uses these timings and curves.

## Works with

- See [Elevation](elevation.md) for the panels and the overlay that move.

## In code

- The panels already move this way: `styles/base.css` sets `--panel-in`, `--panel-out`, `--rail-duration` and
  `--rail-ease` on `Dialog`, `AlertDialog`, `Sheet` and their overlays, with the closing curve beside them (Panel
  motion), and turns off scale and slide under `prefers-reduced-motion`. The dialog's scale is its `zoom-in-97` /
  `zoom-out-97` classes.
- Lists that change while you type have no token yet: shrink after the height holds for about 300ms, and show "nothing
  found" after typing pauses for about 400ms. Render new results in a React transition and memoize rows, so a frame
  never blocks. Aim for 60fps at normal speed.
