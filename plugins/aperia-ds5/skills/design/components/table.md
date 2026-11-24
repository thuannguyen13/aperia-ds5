# Table

A table lists records in rows with shared columns so people can scan and compare them. See
[Tables](../patterns/tables.md) for how tables sit on a page.

## When to use

Use a table to list records the user scans, compares, sorts, or filters.

See [Tables](../patterns/tables.md) for choosing a table on the page, a table in a card, or a simple list, and for
the cases that use no table.

## What is available

A table has four parts, listed from top to bottom:

| Part | Content |
|---|---|
| Toolbar | Search, filters, and Sort, above the table |
| Column headings | Headings in Title Case, with one hairline under them |
| Rows | Records separated by hairlines |
| Footer | The count, with the page numbers once the rows run past one page. See [Paging](../patterns/paging.md). |

### Specs

| Part | Value |
|---|---|
| Heading row | 40px tall, medium weight |
| Cell padding | 8px |
| Text | 14px |
| Row lines | The hairline |
| Hover | Muted at 50% |
| Selected | Muted |

## How it looks and behaves

A table shows its values in a fixed way, opens a record from its row, and filters from its toolbar.

Values in a table follow five conventions:

- A missing value is an em dash (—) in the muted text color. An em dash is different from 0.
- Numbers line up in their column, with tabular figures.
- A cell with several names shows a count. Selecting the count lists the names.
- A band in the muted color heads a group of rows.
- A record with a number shows the bare number in the table, such as "659". Its page shows the full name, such as
  "Opportunity #659".

A row takes the muted color at 50% when the pointer is over it. Selecting anywhere on a row opens its record. A
keyboard user reaches a row with **Tab**. The row has the record's name as its label and opens with **Enter** or
**Space**.

Column headings are real table headings, so a screen reader reads each cell with its column.

Filters sit in the toolbar. On a phone, they go behind one Filter button that counts the filters that are on. The
button opens the filters in a sheet. Active filters show as chips, and tapping a chip clears its filter. A search or
filter with no match shows the empty state "No Results".

### States

A row that opens its record has four states. A table has no disabled row. A record that cannot be opened has no
pointer and no focus.

| State | Look |
|---|---|
| Default | Body text on the page or card fill, with a hairline under the row. |
| Hover | The row takes the muted color at 50%. |
| Focus, from the keyboard | The row takes the muted color at 50%, with a focus-color line just inside its edge. |
| Selected | The row takes the muted color. |

## Rules

### Open the record from the whole row

- **Do:** Open the record on a click anywhere on the row or on Enter, with the name in plain text, so people do not have
  to aim.
- **Don't:** Put an Open or View button on each row, or a link on the name only. Make the whole row open the record, so
  the table holds no extra buttons.

### Edit and delete on the record's page

- **Do:** Put Edit and Delete in the record page's header, so people act on a record after seeing it.
- **Don't:** Put Edit and Delete buttons on every row. Keep them on the record's page, so no slip changes the wrong
  record.

### Keep table rows plain

- **Do:** Separate rows with hairlines and tint a row in the muted color on hover, so people can follow a row across.
- **Don't:** Alternate row colors. Use hairlines between rows, so no stripe looks like it means something.

### Show contact details as plain text

- **Do:** Show phone numbers, emails, and websites as plain text in the body color, like every other value, so the row
  still opens the record.
- **Don't:** Make contact details Primary and underlined down a column. Keep them plain in a table and link them only
  on a record's page, so a column of contact details reads like every other value.

## When you can do it differently

- A control inside a row, such as a checkbox or a menu, keeps its own keys and clicks. Using it does not open the row.

## Works with

| Component | How it works with a table |
|---|---|
| Card | A table in a card runs to the card's edges, with no top border. |
| Empty State | An empty state shows in place of the rows when there are none. |
| Badge | A state in a cell is a badge in its state color. |
| Avatar | A person or company in a cell shows its picture beside the name. |
| Button | A row has no button to open or edit it. |
| Page | A list table fills the page column. |

See [Tables](../patterns/tables.md) for the column headings right under a card header, with no line above them, and for
a table too wide for the page column. See [Sort](../patterns/sort.md) for sorting from the toolbar. See
[Copy](../foundations/copy.md) for how contact details link on a record's page. See [Color](../styles/color.md) for
pairing every color with a word or an icon. See [Border and Radius](../styles/border-and-radius.md) for the hairline
the Specs name.

## In code

- `DataTable` from `aperia-ds5/data-table` for a list with search, filters and paging; the parts (`useDataTable`,
  `DataTableContent` and the rest) for a different layout.
- `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell` from `aperia-ds5` for a simple table.
- A row opens its record with `<TableRow {...opensOnClick(name, open)}>`.
- In a titled card ([Card](card.md)), put the table straight inside (no wrapper, no padding) and pad the first and last
  cells (`pl-4`, `pr-4`) so the columns line up with the card title.
