# Spacing

Spacing is the scale of gaps that separate content inside components and between page sections.

## When to use

Use a step from the spacing scale for every gap inside a component, between cards, and between page sections. Pick
the step by how closely the parts belong together. An icon and its label sit close. Two cards sit further apart. Two
page sections sit further apart still. Every app uses the same steps.

## What is available

The spacing scale has five steps, each a multiple of one spacing unit set once in the library. Steps 1 and 2 space
parts inside a component, such as an icon and its label. Step 3 is a small container's inset. Step 4 is a card's inset
and the gap between cards. Step 5 separates the page's sections. The live table on this page shows each step's size as
the browser reads it.

Each space comes from one source, listed below.

| Between | Space |
|---|---|
| Parts inside a component | Steps 1 to 4, from the component or the row |
| The page's sections | Step 5, from the page column |
| Cards or tiles side by side, or in a grid | Step 4, from the grid |
| Fields in a form | The form's own field spacing |
| A card's header and its content | The header's fixed height and the content's own padding |

Each container keeps its content a fixed distance in from its edge, its inset. Insets come in three steps, each on
the 4px grid, and a smaller container takes a smaller step.

| Container | Inset |
|---|---|
| The page column | Step 5 (20px) |
| A card, a sheet, and a dialog | Step 4 (16px) |
| A small card, a popover, and a hover card | Step 3 (12px) |

A menu is the one exception. Its items carry the inset themselves, so the menu adds only a thin border of space around
them.

## How it looks and behaves

Cards sit at step 4, closer than sections at step 5, because each card has its own padding.

When a section is not shown, its space is removed with it. No empty gap is left.

Controls side by side, such as the fields of a filter row and the × after them, are spaced by their boxes. A gap runs
from one control's edge to the next one's. A ghost button or an icon button counts its whole button as its box,
including the padding around its icon. So the gap before an icon button equals the gap between two fields. At the end
of a row, that same padding reaches past the row's edge, so the icon itself lines up with the edge. See
[Page Layout](page-layout.md) for that edge.

## Rules

### Leave space between sections

- **Do:** Leave step 5 between a page title, its search box, and the card below, so people see where each section
  begins.
- **Don't:** Let two sections touch (a title against a search box, a toolbar against a table's card). Leave step 5
  between them, so each section reads as its own group.

### Space controls by their boxes

- **Do:** Keep one gap between the controls of a row, measured box to box. A field and the icon button after it then
  sit as far apart as two fields.
- **Don't:** Pull an icon button toward the field before it to line its icon up with the edge. Let its padding reach
  past the edge instead, so the gaps stay equal and the icon still lines up.

### Stay on the grid

- **Do:** Pick a step from the scale, so spacing repeats from screen to screen.
- **Don't:** Use a size between the steps, or add a margin to push one section away. Use the nearest step, so gaps do
  not drift from screen to screen.

## When you can do it differently

Spacing has no exceptions. Every app uses these steps.

## Works with

- See [Sizes](sizes.md) for control heights and the page width.
- See [Border and Radius](../styles/border-and-radius.md) for the edges that sit around the space.

## In code

- Steps are Tailwind's `gap-1` to `gap-5`, multiples of `--spacing`.
- The page's sections: `AppContent` puts `gap-5` between them and `p-5` around the column. Do not space sections with
  margins.
- Cards or tiles in a grid: `gap-4`.
- Fields: `FieldGroup` and `FieldSet` spacing; do not add margins.
- A card: the titled card's header ([Card](../components/card.md)) and `CardContent`'s own padding.
