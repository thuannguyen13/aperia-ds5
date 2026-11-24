# Elevation

Elevation uses shadows to show how far a surface sits above the page, and an overlay to dim the page behind dialogs and
sheets.

## When to use

Use a shadow step whenever a surface sits above the page, such as a card, a menu, or a dialog. The higher a surface
sits, the deeper its shadow, so a menu reads as above the card it opened from. Use the overlay whenever a dialog, alert
dialog, sheet, or drawer opens over the page.

## What is available

Elevation has four shadow steps and one overlay. Each is set once in the library, for Light and Dark. The live samples
on this page show each one as the browser reads it.

| Step | What sits there |
|---|---|
| Small (resting) | Cards, fields, outline buttons, and tables or empty states on the page |
| Medium (menu) | Dropdowns, menus, popovers, hover cards, and select and combobox lists |
| Large (panel) | Dialogs, alert dialogs, and sheets |
| Extra large (dragging) | A row or card while it is being dragged |

Medium, Large, and Extra large each include the Small shadow beneath them. Drawers use the overlay but no shadow
step.

The overlay dims the page behind a panel. It is a light black tint in Light and a deeper black tint in Dark. Dialogs,
alert dialogs, sheets, and drawers all use the same overlay.

## How it looks and behaves

Shadows deepen in Dark. In Light, they are a small share of the text color. In Dark, they are black and stronger, so
they still show on dark fills.

Dialogs, alert dialogs, and sheets share one look. Each has the page's own fill, the hairline edge, and the Large
shadow, over the overlay.

A sheet is a panel that opens on the right, inset from the window's edges, with rounded corners. On a phone, a sheet
fills the screen. A sheet whose header holds only its title is the same height as the app's top bar. See [App
Shell](../patterns/app-shell.md) for the top bar.

## Rules

### Use one overlay without blur

- **Do:** Use the same dim behind every panel, with the page still sharp beneath it, so people keep their place.
- **Don't:** Blur the backdrop, or give each kind of panel its own dim. Use the one overlay, so every panel dims the
  page the same way.

### Give dialogs and sheets the same look

- **Do:** Give dialogs, alert dialogs, and sheets the page fill, the hairline edge, and the large shadow, so every
  panel reads as one family.
- **Don't:** Make a dialog look different from a sheet. Take the look from the component, so no one expects them to
  behave differently.

## When you can do it differently

Elevation has no exceptions. Every app uses these shadows and the one overlay.

## Works with

- See [Motion](motion.md) for how panels open and close.
- See [Shape and Edges](shape-and-edges.md) for the edge that goes with each shadow.
- See [Color](color.md) for the Overlay role.

## In code

- `shadow-sm`, `shadow-md`, `shadow-lg` and `shadow-xl` from `styles/base.css`; Dark deepens them through
  `--shadow-color`, `--shadow-depth` and `--shadow-base`.
- The `surface` and `control` utilities carry `shadow-sm`. Menus and popovers carry `shadow-md`; `Dialog`,
  `AlertDialog` and `Sheet` carry `shadow-lg`; `SortableList` gives the dragged row `shadow-xl`.
- The overlay is `bg-overlay` (`--overlay`), already on the panels' overlays. Never add `backdrop-blur`.
- The sheet's inset, corners and phone size are in `Sheet` (`components/ui/sheet/sheet.tsx`).
