# Table

A table lists records in rows with the same columns, so they can be scanned and compared: prospects, tasks,
transactions. Each row is one record, and clicking it opens that record.

## When to use

- To list records the user scans, compares, sorts or filters.
- Not for one record's details. Those are labelled values on the record's page.
- Not for a few items with no columns to compare. Use a simple list.

## Parts

- **Toolbar**, above the table: search, filters and Sort.
- **Column headings:** Title Case, one hairline under them.
- **Rows:** separated by hairlines, and tinted grey when the pointer is over them.
- **Footer**, for a long list: the count, with Previous and Next.

## Rules

### A row opens its record

- **Do:** a click anywhere on the row, or Enter, opens the record. The name is plain text like the rest of the row.
- **Don't:** an Open or View button on each row, or a link on the name only.

### Edit and delete on the record's page

- **Do:** Edit and Delete in the record page's header.
- **Don't:** Edit and Delete buttons on every row.

### No line above the column headings

- **Do:** in a card, the column headings sit straight under the card header. The first line is the one under the
  headings.
- **Don't:** a border, a divider or a header line between the card's title and the table.

### No zebra stripes

- **Do:** hairlines between rows and a grey tint on hover.
- **Don't:** alternating row colours.

### Sort from the toolbar

- **Do:** one Sort control at the right end of the toolbar: a field and a direction. An empty value sorts lowest.
- **Don't:** a different way of sorting on each table.

### Colour isn't the only signal

- **Do:** a coloured value also has a word, an icon or a badge: "3 overdue", a red dot beside a word.
- **Don't:** a red number alone, or coloured cells with no legend.

### Contact details are plain text

- **Do:** phone numbers, emails and websites read as plain text in the body colour, like every other value. In a table
  the row opens the record, so they stay plain. On a record's page each is a link where tapping it does something (call,
  write, open the website), still in the body colour, underlined only under the pointer.
- **Don't:** blue, underlined phone numbers, emails or websites down a column.

## Content

- A missing value is an em dash (—) in grey, which is different from 0.
- Numbers line up in their column (tabular figures).
- Several names in one cell show a count, and clicking it lists them.
- A group of rows is headed by a quiet grey band.
- A record with a number shows the bare number in the table ("659"), and "Opportunity #659" on its page.

## Filters

- Filters sit in the toolbar.
- On a phone they go behind one Filters button that counts the filters on, open in a sheet, and show as chips that
  clear when tapped.
- A search or filter with no match shows the empty state "No Results".

## Works with

- **Card:** a table in a card runs to the card's edges, with no top border.
- **Empty State:** shown in place of the rows when there are none.
- **Badge:** a state in a cell is a badge in its state colour.
- **Avatar:** a person or company in a cell shows its picture beside the name.
- **Button:** none on rows to open or edit.
- **Page:** a list table runs the page's full width.

## Accessibility

- Column headings are real table headings, so screen readers read each cell with its column.
- A row that opens its record can be reached with **Tab**, has the record's name as its label, and opens with **Enter**
  or **Space**.
- A control inside a row (a checkbox, a menu) keeps its own keys and clicks; it doesn't open the row.

## Specs

| Part | Value |
|---|---|
| Heading row | 40px tall, medium weight |
| Cell padding | 8px |
| Text | 14px |
| Row lines | 0.5px hairlines |
| Hover | Muted at 50% |
| Selected | Muted |

## In code

- `DataTable` from `aperia-ds5/data-table` for a list with search, filters and paging; the parts (`useDataTable`,
  `DataTableContent` and the rest) for a different layout.
- `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell` from `aperia-ds5` for a simple table.
- A row opens its record with `<TableRow {...opensOnClick(name, open)}>`.
- In a `TitledCard`, put the table straight inside (no wrapper, no padding) and pad the first and last cells (`pl-4`,
  `pr-4`) so the columns line up with the card title.
