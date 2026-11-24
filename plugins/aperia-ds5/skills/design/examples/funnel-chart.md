# Funnel Chart

A funnel chart shows how many records reach each stage and where the others dropped out.

## When to use

Use a funnel chart on a dashboard that shows how many records reach each stage of a process, and where the rest were
lost or still are.

## How it looks and behaves

A funnel chart sits in a card with its own title, such as "Pipeline Funnel". The card's header holds a legend for the
bars' three fills.

The chart has one bar per stage, read left to right. Above each bar are the stage's name, its count, and its share of
the first stage ("38%").

Each bar splits into three parts:

| Part | Records it counts | Fill |
|---|---|---|
| Moved on | Records that moved on to the next stage. | First chart color. |
| Lost | Records that left the process at this stage, such as lost deals. | A chart color that stands apart from the first, such as the third. |
| Still there | Records still at this stage. | Stripes. |

A see-through wedge in the first chart color runs from each bar's moved-on part to the next bar, so the eye follows the
records from stage to stage.

Each stage is one stop for the Tab key. A screen reader reads one sentence for each stage. The sentence says how many
records reached the stage and what became of them. Pointing at a stage, moving to it with Tab, or tapping it opens a
small card below the bar with the same numbers. That card looks like a chart's tooltip, with the popover fill and a gap
between each name and its value.

The funnel counts the same span as the rest of the page. The page's date control sets that span, and the page's subtitle
states it.

When nobody reached the first stage, the card shows an empty state instead of bars, such as "No Opportunities".

## Before and after

- **Before:** Each stage has a different color, picked outside the app's chart colors, with no legend. Nothing says how
  many were lost at a stage or are still there.
- **After:** The bars use the app's chart colors, and a legend sits in the card's header. Each bar splits into moved on,
  lost, and still there.

## Rules

### Explain every color

- **Do:** Put a legend for the three fills in the card's header, so people know which part of each bar moved on, was
  lost, or is still there.
- **Don't:** Color the stages without a legend. Name every fill in the card's header, so no one has to guess what a
  color means.

### Stay in the chart palette

- **Do:** Use the app's chart colors (the first for moved on, the third for lost, stripes for still there), so the
  funnel reads like every other chart in the app.
- **Don't:** Use colors from outside the app's chart palette, or a new color per stage. Keep to the app's chart colors,
  so no color reads as a meaning it does not have.

### Let everyone reach the numbers

- **Do:** Make each stage one stop for the Tab key with one spoken sentence, shown again in a card on hover, focus, or
  tap, so everyone gets the numbers.
- **Don't:** Show the numbers only when a mouse points at the bar. Let each stage be reached by Tab and by a tap, so
  keyboard, screen reader, and phone users see them too.

## When you can do it differently

A funnel chart has no exceptions.

## Which patterns it uses

- See [Cards and Tiles](../patterns/cards-and-tiles.md) for the titled card, its legend as the header's action, and the
  empty state inside it.
- See [Page Layout](../foundations/page-layout.md) for where the card sits on a dashboard.
- See [Date Range](date-range.md) for the span the funnel counts.

## In code

The app builds it; aperia-ds5 has no funnel component.

- The titled card from [Card](../components/card.md) with the legend as its action; the bars in `<CardContent
  className="pb-4">`.
- Fills are the app's chart variables: `var(--chart-1)` for moved on, `var(--chart-3)` for lost, and a striped
  `repeating-linear-gradient` of `--chart-1` for still there. The wedge is an SVG polygon in `--chart-1` at low opacity.
- Each stage is a focusable element (`tabIndex={0}`) with an `aria-label` sentence, wrapped in `HoverCard`
  (`side="bottom"`); open it on click too, as Radix's hover card ignores touch. Style the card's content like
  `ChartTooltipContent`, with a gap between each label and value.
- Count the page's span (Date Range). With no records at the first stage, render
  `<EmptyState title="No Opportunities" />` in the card instead.
