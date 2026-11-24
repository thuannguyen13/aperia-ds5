# Tables

Tables show records in rows and columns on a page or inside a card. See [Table](../components/table.md) for the table's
parts and specs.

## When to use

Use a table on a list page for the list's records, under its toolbar. See [List Page](list-page.md) for the toolbar.

Use a table in a card for records that belong to the page's record, such as its tasks or line items.

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

A missing value is a muted em dash (—). See [Empty and Missing](empty-and-missing.md) for missing values.

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

- See [List Page](list-page.md) for the toolbar above a list's table and for rows that open their record.
- See [Page Layout](page-layout.md) for lining the first column up with the title.
- See [Card](../components/card.md) for the titled card a table sits in.
- See [Table](../components/table.md) for plain rows without stripes.

## In code

- In a `TitledCard`, put the `Table` straight inside (no wrapper, no padding, no `border-t` or `Separator`) and pad
  the first and last cells `pl-4` and `pr-4`. On the page, give the table the `surface` utility.
- Grouped rows: `TableGroupRow` (`colSpan`, the table's column count; `leading`, such as a logo; `trailing`, such as
  the group's total or buttons), each group in its own `TableBody` when they reorder.
- A wide table: `ScrollTable` around the `Table`, which scrolls it sideways and takes keyboard focus and a name. A
  wide list table on the page also renders `<FullWidth />`.
- Figures are `tabular-nums` and right-aligned. A missing value is `EmptyValue`.
