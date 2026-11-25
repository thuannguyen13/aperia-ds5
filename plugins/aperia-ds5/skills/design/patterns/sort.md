# Sort

Sort lets people put a list in the order they need, by choosing a column and a direction.

## Anatomy

Sort has four parts, a button in the list's toolbar and the three parts of the panel that the button opens. Ascending
and Descending show only once a column is chosen.

1. **Sort button**. It reads "Sort" while the list is in its own order. Once a column is chosen, it names the column,
   such as "Sort: Last Alert", with an arrow for the direction.
2. **Sort By**. It is the panel's title, above the list of orders.
3. **List of orders**. "Default order", the list's own order, comes first, then one choice for each column the list
   can sort by. One is chosen at a time.
4. **Ascending and Descending**. They are two buttons under the list of orders. They set which way the column orders
   the list.

## When to use

Give Sort to any list that people may want in another order than the one it opens in.

## How it looks and behaves

Sort sits at the right end of the list's toolbar. See [List Toolbar](list-toolbar.md) for the toolbar's other
controls. A list inside a card has no toolbar, so its Sort sits at the right end of the card's header. When the card
also has Add, Sort comes first and Add comes last, so Add keeps its place at the far end of every card.

Every choice applies at once, and the panel stays open until people close it or select outside it.

Items with no value count as lowest. They come first when ascending and last when descending.

Names sort as people read them. Capitals and accents do not split them, and "Queue 10" follows "Queue 9". Rows that tie
keep their order.

On a phone, Sort is an icon button at the end of the search's line. It shows a dot while the list is sorted, and it
opens the same panel. See [Screen Sizes](../foundations/screen-sizes.md) for every part on a phone.

## Rules

### 1. Use one Sort per list

A list has one Sort control, at the right end of its toolbar. Every list uses the shared control, so people find Sort
in one place and every list sorts the same way.

- **Don't:** Make column headings sort when clicked, or build the app its own sort dropdown.

### 2. Name the sort on its button

The Sort button shows the list's order by name, so people see how the list is sorted without opening the panel.

- **Do:** Name the column on the button, such as "Sort: Last Alert".
- **Don't:** Show a count badge on Sort. A list sorts by one column at most, so a number says less than the column's
  name.

### 3. Start each column in the direction people want

Picking a column starts in the direction people most often want. Amounts and dates start highest and newest first, and
names start A to Z, so people rarely flip the direction.

- **Do:** Start Monthly Volume at the largest amount and Created at the newest date.
- **Don't:** Start an amount at the smallest.

## In code

- `SortControl` from `aperia-ds5`: `fields` (`{ value, label, starts? }`, where `starts: "desc"` makes amounts and dates
  start highest first; A to Z when left out), `value` (`{ by, direction }`, `by` empty for the default order) and
  `onChange`. `iconOnly` draws it as an icon button with a dot while sorted, which `ListToolbar` uses on a phone. On a
  list page pass the same props to `ListToolbar`'s `sort`; in a card, put it in the titled card's
  action ([Card](../components/card.md)) with `size="sm"`, before the card's Add button when it has one (`<SortControl
  size="sm" … />` then `<Button variant="outline" size="sm">…</Button>` in `CardAction`).
- Sort with `sortRows(rows, fields, value)` from `aperia-ds5/list`, the same fields on the server. A `SortField` adds
  `read`, a row's value; null, undefined or "" sorts lowest. `UNSORTED` is the default order.
- Do not make `TableHead`s sortable.
