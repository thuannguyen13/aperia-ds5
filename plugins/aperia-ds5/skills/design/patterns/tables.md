# Tables

Tables show records in rows and columns on a page or inside a card. See [Table](../components/table.md) for the table's
parts and specs.

## When to use

Use a table for records that people scan and compare by their columns, on a list page or inside a card.

### A table on the page, a table in a card, or a list

Where a list of records sits depends on whose records they are and whether people compare them. Find the records in
this table:

| Situation | Choice | Why |
|---|---|---|
| The records are the page's subject, such as a list page of prospects | A table on the page, on its own surface, under the list toolbar | The toolbar's search, filters, and Sort sit above it, and a whole page never sits in a card. See [List Toolbar](list-toolbar.md). |
| Records that belong to the page's record and that people compare by columns, such as an opportunity's line items | A table in a card, running to the card's edges | The card's title names the records, and its header holds Sort and Add, so the list needs no toolbar. |
| A few items with no columns to compare, such as a record's tasks or notes | A simple list of rows in a card | A table is for comparing records by columns, and these items have none to compare. |
| One record's own values, such as its details | Labeled values in a card, never a table | A table compares many records, and here there is one. See [Details](details.md). |

## What is available

Tables come in five forms:

| Form | Use when | Content |
|---|---|---|
| Table on the page | A list page | The table sits on its own surface. |
| Table in a card | Records that belong to the page's record | The table runs to the card's edges under the card's title. |
| Grouped rows | Rows fall into groups | A band with a muted fill heads each group. The group's name sits on the first column's line, with a picture before it when the group has one. A total or buttons sit at the band's end. |
| Wide table | The table is wider than its box | The table scrolls sideways inside its box. Keyboard users can reach it and scroll it. |
| Full-width table | A wide list table | The table fills the whole width beside the sidebar. |

## How it looks and behaves

A table lines up with its card and keeps each row to one line.

In a card, the column headings sit right under the card's title. The first hairline is the one under the headings.

The first column starts on the card title's line, 16px in. The last column ends 16px from the right edge.

Hairlines separate the rows. A row takes a muted fill under the pointer.

Numbers, including amounts, line up in their column and are right-aligned.

A cell with several names shows a count. Selecting the count lists the names.

A missing value is a muted em dash (—). See [Empty States](../foundations/empty-states.md) for missing values.

## Rules

### Put the column headings right under the card header

- **Do:** Put the column headings straight under the card header, with the first hairline under the headings, so the
  table belongs to its card.
- **Don't:** Put a border, divider, or header line between the card's title and the table. Leave it out, so the card
  does not look split.

### Run a table to the card's edges

- **Do:** Let the table fill the card's width and reach its bottom edge, its first column on the title's line, so card
  and table read as one.
- **Don't:** Box a bordered table inside the card. Run it edge to edge, so there is no border inside a border.

### Show a count for several names

- **Do:** Show a count for several names ("3 reps"), listing them when clicked, so rows stay one line.
- **Don't:** Write every name out, stretching the row or cut off at the cell's edge. Show the count, so the row stays
  readable.

## When you can do it differently

This pattern has no exceptions.

## Works with

- See [List Toolbar](list-toolbar.md) for the toolbar above a list's table.
- See [Page Layout](../foundations/page-layout.md) for lining the first column up with the title.
- See [Card](../components/card.md) for the titled card a table sits in.
- See [Table](../components/table.md) for plain rows without stripes.

## In code

- In a card, put the `Table` straight inside (no wrapper, no padding, no `border-t` or `Separator`) and pad the first
  and last cells `pl-4` and `pr-4`. Build the card as the titled card recipe on [Card](../components/card.md). On the
  page, give the table the `surface` utility.
- Figures are `tabular-nums` and right-aligned. A missing value is the empty value from
  [Empty States](../foundations/empty-states.md).

### Scroll table

Build the scroll table in the app as a `div` around the `Table` from `aperia-ds5`. The `div` scrolls the table sideways
when it is wider than its box.

```tsx
<div
  role="region"
  aria-label="Commissions"
  tabIndex={0}
  className="overflow-x-auto outline-none focus-visible:ring-2 focus-visible:ring-ring *:data-[slot=table-container]:overflow-visible"
>
  <Table>…</Table>
</div>
```

- The region takes keyboard focus and a name, because the table holds nothing to Tab to and its own scroll is out of
  the keyboard's reach.
- The table's own container gives up its scroll (`overflow-visible`), so only the region scrolls.
- On the page, add the `surface` utility to the region. A wide list table on the page also renders `<FullWidth />`.

### Group row

Build the group row in the app from `TableRow` and `TableCell` from `aperia-ds5`. It heads each group of rows in one
table with a quiet band that holds the group's name.

```tsx
<TableRow className="bg-foreground/4 hover:bg-foreground/4">
  <TableCell colSpan={columnCount} className="pl-4 pr-4 text-xs font-medium text-muted-foreground">
    <div className="flex items-center justify-between gap-3">
      <span className="flex items-center gap-1.5">{logo}Acme Bank</span>
      <span className="flex items-center gap-1 tabular-nums">$48,500</span>
    </div>
  </TableCell>
</TableRow>
```

- `colSpan` is the table's column count, so the band crosses the whole table.
- The name starts on the first column's `pl-4` line. A total or buttons at the end stop on the last column's `pr-4`
  line. With nothing before or after the name, drop the inner `div` and `pr-4`.
- Put each group in its own `TableBody` when the groups can be reordered.
