# Spacing

Spacing sets how far apart parts sit, using one scale of steps for every gap inside a component, between cards, and
between page sections. See [Sizes](sizes.md) for control heights and the page width, and [Page Layout](page-layout.md)
for the space between a page's sections.

## What is available

The spacing scale has five steps, each a multiple of one spacing unit set once in the library. A smaller step joins
parts that belong together, and a larger step separates groups. An icon and its label sit close, two cards sit further
apart, and two page sections sit further apart still. Every app uses the same steps.

Steps 1 and 2 space parts inside a component, such as an icon and its label. Step 3 is a small container's inset. Step
4 is a card's inset and the gap between cards. Step 5 separates the page's sections.

One half step sits between steps 1 and 2. Step 1.5, `gap-1.5`, spaces the parts of a compact row. Examples are an icon
and its label, a menu item's parts, and a status dot and its word.

Each gap gets its step from one source.

| Between | Space |
|---|---|
| Parts inside a component | Steps 1 to 4, from the component or the row |
| The page's sections | Step 5, from the page column |
| Cards or tiles side by side, or in a grid | Step 4, from the grid |
| Fields in a form | The form's own field spacing |
| A card's header and its content | The header's fixed height and the content's own padding |

Each container keeps its content a fixed distance in from its edge, its inset. Insets come in three steps, each a
multiple of `--spacing`, and a smaller container takes a smaller step.

| Container | Inset |
|---|---|
| The page column | Step 5, `p-5` |
| A card, a sheet, and a dialog | Step 4, `p-4` |
| A small card, a popover, and a hover card | Step 3, `p-3` |

A menu takes no inset from this table. Its items carry the inset themselves, so the menu adds only a thin border of
space around them.

## How it looks and behaves

Cards sit at step 4, closer than sections at step 5, because each card has its own padding.

When a section is not shown, its space is removed with it. No empty gap is left.

Controls side by side, such as the fields of a filter row and the × after them, are spaced by their boxes. A gap runs
from one control's edge to the next one's. A ghost button or an icon button counts its whole button as its box,
including the padding around its icon. So the gap before an icon button equals the gap between two fields. At the end
of a row, that same padding reaches past the row's edge, so the icon itself lines up with the edge. See
[Page Layout](page-layout.md) for that edge.

## Rules

### 1. Space controls by their boxes

Controls in a row are spaced from box to box, so an icon button after a field sits as far from it as the next field
would.

- **Do:** Keep one gap between the controls of a row, such as step 2 between two fields and the × after them.
- **Don't:** Pull an icon button toward the field before it with a negative margin to line its icon up with the edge.
  Let the button's padding reach past the row's edge instead, so the gaps stay equal and the icon still lines up.

### 2. Stay on the grid

Every gap uses a step from the scale, so spacing repeats from screen to screen. The half step, `gap-1.5`, belongs only
inside a compact row.

- **Do:** Use the nearest step when a design shows a gap between two steps.
- **Don't:** Write a gap of any other size, such as `gap-[10px]`, or add a margin to push one section away. The page
  column's `gap-5` already separates sections.

## In code

- Steps are Tailwind's `gap-1` to `gap-5`, multiples of `--spacing`. The half step is `gap-1.5`, which the library uses for
  compact rows (a button's icon and text, menu items, tabs, tooltips, chart legends).
- The page's sections: `AppContent` puts `gap-5` between them and `p-5` around the column. Do not space sections with
  margins.
- Cards or tiles in a grid: `gap-4`.
- Fields: `FieldGroup` and `FieldSet` spacing; do not add margins.
- A card: the titled card's header ([Card](../components/card.md)) and `CardContent`'s own padding.
