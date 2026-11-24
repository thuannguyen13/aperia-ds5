# Spacing

Spacing is the scale of gaps that separate content inside components and between page sections.

## When to use

Use a step from the spacing scale for every gap inside a component, between cards, and between page sections. Pick
the step by how closely the parts belong together. An icon and its label sit close. Two cards sit further apart. Two
page sections sit further apart still. Every app uses the same steps.

## What is available

The spacing scale has five steps. Each step is a multiple of one spacing unit, set once in the library. The live scale
on this page shows each step's size as the browser reads it.

| Step | Used for |
|---|---|
| 1 and 2 | Inside a component, such as between an icon and its label, between chips, or between buttons in a row |
| 3 | Inside a component, and a small card's padding |
| 4 | Inside a component, a card's padding, and the gap between cards or tiles side by side or in a grid |
| 5 | The gap between the page's sections, such as the page header, tiles, toolbar, and cards, and the space around the page column |

Each space comes from one source, listed below.

| Between | Space |
|---|---|
| Parts inside a component | Steps 1 to 4, from the component or the row |
| The page's sections | Step 5, from the page column |
| Cards or tiles side by side, or in a grid | Step 4, from the grid |
| Fields in a form | The form's own field spacing |
| A card's header and its content | The header's fixed height and the content's own padding |

## How it looks and behaves

Cards sit at step 4, closer than sections at step 5, because each card has its own padding.

When a section is not shown, its space is removed with it. No empty gap is left.

## Rules

### Leave space between sections

- **Do:** Leave step 5 between a page title, its search box, and the card below, so people see where each section
  begins.
- **Don't:** Let two sections touch (a title against a search box, a toolbar against a table's card). Leave step 5
  between them, so each section reads as its own group.

### Stay on the grid

- **Do:** Pick a step from the scale, so spacing repeats from screen to screen.
- **Don't:** Use a size between the steps, or add a margin to push one section away. Use the nearest step, so gaps do
  not drift from screen to screen.

## When you can do it differently

Spacing has no exceptions. Every app uses these steps.

## Works with

- See [Sizes](sizes.md) for control heights and the page width.
- See [Shape and Edges](shape-and-edges.md) for the edges that sit around the space.

## In code

- Steps are Tailwind's `gap-1` to `gap-5`, multiples of `--spacing`.
- The page's sections: `AppContent` puts `gap-5` between them and `p-5` around the column. Do not space sections with
  margins.
- Cards or tiles in a grid: `gap-4`.
- Fields: `FieldGroup` and `FieldSet` spacing; do not add margins.
- A card: `TitledCard`'s header and `CardContent`'s own padding.
