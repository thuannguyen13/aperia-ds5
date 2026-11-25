# Table

A table lets people scan records and compare them across columns. See [Tables](../patterns/tables.md) for when to use a
table, how it sits on a page, and its toolbar.

## Anatomy

A table has six parts. The footer and the caption show only sometimes.

1. **Table**. It is the grid that lines records up in rows under shared columns. It fills the width of its box and
   scrolls sideways when it is wider.
2. **Column headings**. They are the titles of the columns, in one row above the rows. A divider sits under them.
3. **Row**. It is one record, shown as a line of values. A divider sits under it.
4. **Cell**. It is one value of a record in one column, such as a name, a number, or a badge.
5. **Footer** (optional). It is a row at the bottom of the table that holds totals, with a divider above it.
6. **Caption** (optional). It is a line of muted text under the table that names what the table holds.

## How it looks and behaves

Headings are left-aligned, in medium weight and Title Case. Each row is separated from the next by a divider, and the
last row has none. The heading row takes no hover. A list's toolbar sits above the table. See
[List Toolbar](../patterns/list-toolbar.md) and [Filters](../patterns/filters.md) for it, and [Paging](../patterns/paging.md)
for the count and page numbers below the rows.

Values in a table follow these conventions:

- A missing value is an em dash (—) in the muted text color. An em dash is different from 0. See
  [Empty States](../foundations/empty-states.md).
- Numbers, including amounts, are right-aligned in their column and use tabular figures, so digits line up. See
  [Money and Numbers](../foundations/money-and-numbers.md).
- A cell with several names shows a count. Selecting the count lists the names.
- A band in the muted fill heads a group of rows. See [Tables](../patterns/tables.md) for grouped rows.
- A record with a number shows the bare number in the table, such as "659". Its page shows the full name, such as
  "Opportunity #659".

A row takes the muted fill at 50% when the pointer is over it. A row that opens its record is reached with **Tab**,
has the record's name as its label, and opens with **Enter** or **Space**. A control inside a row, such as a checkbox
or a menu, keeps its own keys and clicks, and using it does not open the row. See
[Selecting Rows](../patterns/selecting-rows.md) for a checkbox column.

A row opens its record on the record's page, or in a sheet for a small record such as an option or a note. See
[Tables](../patterns/tables.md) for which records open where, for where their Edit and Delete sit, and for the few rows
that show a button.

Column headings are real table headings, so a screen reader reads each cell with its column.

A search or filter with no match shows the empty state "No Results". See [Filters](../patterns/filters.md) for filters
on a phone and for their chips.

### Specs

| Part | Value |
|---|---|
| Heading row | `h-10` tall, medium weight |
| Cell padding | `p-2` |
| Text | `text-sm` |
| Row lines | The divider |
| Footer | Muted at 50%, medium weight, with a divider above it |
| Caption | `text-sm`, muted text, `mt-4` below the table |
| Hover | Muted at 50% |
| Selected | Muted |

### States

A row that opens its record has four states. A table has no disabled row. A record that cannot be opened has no
pointer and no focus.

| State | Look |
|---|---|
| Default | Body text on the page or card fill, with a divider under the row. |
| Hover | The row takes the muted color at 50%. |
| Focus, from the keyboard | The row takes the muted color at 50%, with a focus-color line just inside its edge. |
| Selected | The row takes the muted color. |

## Rules

### 1. Make the whole row open its record

A click anywhere on a row opens its record. **Enter** and **Space** on a focused row do the same. People do not have to
aim, and the table holds no extra buttons.

- **Do:** Open the Task record on a click anywhere on its row, with the task's name in plain text.
- **Don't:** Put an Open or View button on each row, or a link on the name only.

### 2. Keep table rows plain

Rows are separated by dividers, and only the row under the pointer takes a tint. People can follow a row across, and no
stripe looks like it means something.

- **Do:** Separate rows with dividers and tint a row in the muted fill on hover.
- **Don't:** Alternate row colors.

### 3. Show contact details as plain text

Phone numbers, emails, and websites in a table are plain text in the body color, like every other value, so the row
still opens its record. They link only on a record's page. See [Copy](../foundations/copy.md) for how they link there.

- **Do:** Show "(214) 555-0142" and "dana@northwind.com" as plain text in a Contacts table.
- **Don't:** Make a column of contact details underlined in the Link color.

## In code

- `DataTable` from `aperia-ds5/data-table` for a list with search, filters and paging; the parts (`useDataTable`,
  `DataTableContent` and the rest) for a different layout.
- `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell` from `aperia-ds5` for a simple table.
- A row opens its record with `<TableRow {...opensOnClick(name, open)}>`.
- In a titled card ([Card](card.md)), put the table straight inside (no wrapper, no padding) and pad the first and last
  cells (`pl-4`, `pr-4`) so the columns line up with the card title.
