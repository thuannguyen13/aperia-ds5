# Sort

Sort is a toolbar control that sets which field orders a list and in which direction.

## When to use

Use Sort on any list that people may want in another order than the one it starts in. A list has one Sort.

## What is available

Sort has two controls:

| Control | Content | Action |
|---|---|---|
| Field dropdown | "Default order", the list's own order, then "Sort by [Column]" for each column it can sort by | Sets which column orders the list. |
| Direction arrow | Arrow button beside the dropdown, named Ascending or Descending in its tooltip | A click flips the direction. |

## How it looks and behaves

Sort sits at the right end of the list's toolbar. A list inside a card has no toolbar, so its Sort sits at the right
end of the card's header. When the card also has Add, Sort comes first and Add comes last, so Add keeps its place at
the far end of every card.

Picking a column starts in that column's own direction. Amounts and dates start highest and newest first. Names start
A to Z.

The arrow is always there. In the default order it is disabled and says "Choose a field to sort by" on hover. Because
the arrow never appears or disappears, nothing shifts when a column is picked.

Items with no value count as lowest. They come first when ascending and last when descending.

Names sort as people read them. Capitals and accents do not split them, and "Queue 10" follows "Queue 9". Rows that tie
keep their order.

On a phone, Sort sits at the end of the line with the count.

## Rules

### Use one Sort per list

- **Do:** Put one Sort control at the right end of the toolbar, the same on every list, so people find it in one place.
- **Don't:** Make column headings sort when clicked, or build the app its own sort dropdown. Use the shared Sort, so
  every list sorts the same way.

### Keep the direction in view

- **Do:** Show the direction arrow beside the dropdown at all times, disabled with its reason until a column is picked,
  so the toolbar never shifts.
- **Don't:** Show the arrow only once a column is picked. Keep it in view, so the toolbar does not jump.

### Start amounts and dates highest first

- **Do:** Start amounts and dates highest first (such as the largest Monthly Volume or the newest Created), so people
  see what matters most first.
- **Don't:** Start an amount with the smallest. Sort it highest first, so the user does not flip it every time.

## When you can do it differently

This pattern has no exceptions.

## Works with

- See [List Toolbar](list-toolbar.md) for the toolbar that Sort ends.
- See [Filters](filters.md) for what narrows the list before it is sorted.
- See [Tables](tables.md) for the rows Sort orders.

## In code

- `SortControl` from `aperia-ds5`: `fields` (`{ value, label, starts? }`, where `starts: "desc"` makes amounts and dates
  start highest first; A to Z when left out), `value` (`{ by, direction }`, `by` empty for the default order) and
  `onChange`. On a list page pass the same props to `ListToolbar`'s `sort`; in a card, put it in the titled card's
  action ([Card](../components/card.md)) with `size="sm"`, before the card's Add button when it has one (`<SortControl
  size="sm" … />` then `<Button variant="outline" size="sm">…</Button>` in `CardAction`).
- Sort with `sortRows(rows, fields, value)` from `aperia-ds5/list`, the same fields on the server. A `SortField` adds
  `read`, a row's value; null, undefined or "" sorts lowest. `UNSORTED` is the default order.
- Don't make `TableHead`s sortable.
