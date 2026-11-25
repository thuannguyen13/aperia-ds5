# Elevation

Elevation shows how far a surface sits above the page, with a shadow for each height and an overlay that dims the page
behind a panel. See [Surfaces and Layers](surfaces-and-layers.md) for which layer each part of a screen sits on.

## What is available

Elevation has four shadow steps and one overlay, each set once in the library for Light and Dark. The higher a surface
sits, the deeper its shadow, so a menu shows as above the card it opened from.

| Step | Class | Used for |
|---|---|---|
| Small | `shadow-sm` | What rests on the page, such as cards, fields, outline buttons, and tables |
| Medium | `shadow-md` | Menus, popovers, hover cards, and select lists |
| Large | `shadow-lg` | Dialogs, alert dialogs, and sheets |
| Extra large | `shadow-xl` | A row or card while it is dragged |

Medium, Large, and Extra large each include the Small shadow beneath them.

The overlay, `bg-overlay`, dims the page behind a dialog, an alert dialog, a sheet, or a drawer. All four use the same
overlay. A drawer has no shadow step. A menu or a popover has a shadow
but no overlay. See [Border and Radius](border-and-radius.md) for the border that goes with each shadow and
[Color](color.md) for the Overlay role.

## How it looks and behaves

Shadows deepen in Dark. In Light, a shadow is a small share of the text color. In Dark, it is black and stronger, so it
still shows on a dark fill.

The overlay is a light black tint in Light and a deeper black tint in Dark. It covers the whole window behind the panel,
and the page stays sharp beneath it. See [Motion](motion.md) for how a panel and its overlay open and close.

## Rules

### 1. Give each surface the shadow of its height

A surface takes the shadow step for the height it sits at, so people can tell which surface is above which.

- **Do:** Give a menu that opens from a card the Medium shadow, so it shows above the card.
- **Don't:** Give a card the Large shadow to make it stand out, or write a shadow value of your own.

### 2. Use one overlay without blur

Every panel that dims the page uses the one overlay and no blur, so people keep their place and every panel dims the
page the same way.

- **Do:** Put the same dim behind a dialog, a sheet, and a drawer, with the page still sharp beneath it.
- **Don't:** Blur the backdrop, or give one kind of panel its own dim.

## In code

- `shadow-sm`, `shadow-md`, `shadow-lg` and `shadow-xl` from `styles/base.css`; Dark deepens them through
  `--shadow-color`, `--shadow-depth` and `--shadow-base`.
- The `surface` and `control` utilities carry `shadow-sm`. Menus and popovers carry `shadow-md`; `Dialog`,
  `AlertDialog` and `Sheet` carry `shadow-lg`; `SortableList` gives the dragged row `shadow-xl`.
- The overlay is `bg-overlay` (`--overlay`), already on the panels' overlays. Never add `backdrop-blur`.
- The sheet's inset, corners and phone size are in `Sheet` (`components/ui/sheet/sheet.tsx`).
