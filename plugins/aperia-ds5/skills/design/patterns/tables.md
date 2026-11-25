# Tables

Tables let people scan and compare records by their columns, on a list page or inside a card. See
[Table](../components/table.md) for the table's parts and specs.

## Anatomy

A table on a list page has five parts. The group row and the row's button show only sometimes.

1. **Surface**. It is the panel that holds the table on a page, with the card fill, a thin border, and a small shadow. In
   a card, the card is the surface.
2. **Column headings**. They are one row of titles, one for each column, above the rows. A divider sits under them.
3. **Group row** (optional). It is a band with a muted fill that heads a group of rows. It holds the group's name and, at
   its end, a total or buttons.
4. **Row**. It is one record, with one value for each column. Selecting it opens the record.
5. **Row button** (optional). It is a button inside a row, shown only when the row's click is already taken. An
   example is the chevron beside a status badge, which opens the status change.

## When to use

Use a table for records that people scan and compare by their columns. Find the records in this table:

| Situation | Choice | Why |
|---|---|---|
| The records are the page's subject, such as a list page of prospects | A table on the page, on its own surface, under the list toolbar | The toolbar's search, filters, and Sort sit above it, and a whole page never sits in a card. See [List Toolbar](list-toolbar.md). |
| Records that belong to the page's record and that people compare by columns, such as an opportunity's line items | A table in a card, running to the card's edges | The card's title names the records, and its header holds Sort and Add, so the list needs no toolbar. |
| A few items with no columns to compare, such as a record's tasks or notes | A simple list of rows in a card | A table is for comparing records by columns, and these items have none to compare. |
| One record's own values, such as its details | Labeled values in a card, never a table | A table compares many records, and here there is one. See [Details](details.md). |

## What is available

A table sits on the page or in a card, and it comes in three more forms:

| Form | Use when | How it looks |
|---|---|---|
| Grouped rows | Rows fall into groups | A band with a muted fill heads each group. The group's name sits on the first column's line, with a picture before it when the group has one. A total or buttons sit at the band's end. |
| Wide table | The table is wider than its box | The table scrolls sideways inside its box. Keyboard users can reach it and scroll it. |
| Full-width table | A wide list table | The table fills the whole width beside the sidebar. |

## How it looks and behaves

Each row stays on one line. Numbers, including amounts, are right-aligned in their column. See
[Table](../components/table.md) for how a cell shows a missing value or a count of several names, and for how a row
looks on hover and when selected. See [Empty States](../foundations/empty-states.md) for missing values.

On a phone, a table keeps every column and scrolls sideways inside its box, so the page never scrolls sideways.
See [Screen Sizes](../foundations/screen-sizes.md) for every part on a phone.

### Opening a record

A row opens its record. The record opens on its own page or in a sheet, depending on how much it holds. Find the record
in this table:

| Record | Opens in | Why |
|---|---|---|
| A record with its own related content, such as a prospect with contacts, activity, and line items | Its own page. The row opens the page. | The record's cards need a whole page. |
| A small record, such as an option, a note, a line item, or a task | A sheet. The row opens the sheet. | The record is a few fields, so people read and edit it in one panel without leaving the page. See [Forms in Sheets](forms-in-sheets.md). |

A small record is also read in its sheet. A person who may not change it gets the sheet read-only. See
[Disabled With a Reason](../foundations/disabled-with-a-reason.md) for the read-only sheet.

Edit and Delete sit where the record opens. A record with its own page has them in the page header. A small record has
them in its sheet, with Delete at the start of the footer.

### Buttons on a row

A row shows a button only when its click is already taken by something else. Such a button appears on hover and keyboard
focus, and it stays visible on a touch screen. These rows are the cases:

| Row | What takes the row's click | The row's button |
|---|---|---|
| A task in a Tasks card | Its checkbox ticks the task, and on a To Do page the row opens the task's record | Edit, which opens the task's sheet |
| A note in a Notes card | Nothing, because the whole note is shown and its text is there to read and copy | Delete, for the note's author |
| A line item in the Edit Line Items sheet | Its fields | Remove |
| A status in a list's row | The row opens its record | A chevron beside the status badge, which opens the status change |

## Rules

### 1. Put the column headings right under the card header

In a card, the column headings sit directly under the card's title, and the first divider is the one under the headings,
so the table belongs to its card.

- **Do:** Start the Tasks table's headings right under the title, with the first divider under the headings.
- **Don't:** Put a border, divider, or header line between the card's title and the headings, which makes the card look
  split.

### 2. Run a table to the card's edges

A table in a card fills the card's width and reaches its bottom edge. Its first column starts on the title's line, so
the card and table read as one.

- **Do:** Run the Tasks table edge to edge, with its first column starting on the title's line.
- **Don't:** Box a bordered table inside the card, which puts a border inside a border.

### 3. Add a row button only when the row's click is taken

A row's click opens its record, so a row holds no button to open, view, or edit it. A button on a row means that
something else took the row's click.

- **Do:** Let a click on a task's row open its record, with no Open or Edit button on the row.
- **Don't:** Put an Open, View, Edit, or Delete button on a row whose click is free.

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
<TableRow className="bg-muted hover:bg-muted">
  <TableCell colSpan={columnCount} className="pl-4 pr-4 text-xs font-medium text-muted-foreground">
    <div className="flex items-center justify-between gap-3">
      <span className="flex items-center gap-1.5">{logo}Acme Bank</span>
      <span className="flex items-center gap-1 tabular-nums">$48,500</span>
    </div>
  </TableCell>
</TableRow>
```

- The band is the Muted fill in full, `bg-muted`, and keeps it under the pointer, so it never reads as a hovered row
  (`bg-muted/50`).
- `colSpan` is the table's column count, so the band crosses the whole table.
- The name starts on the first column's `pl-4` line. A total or buttons at the end stop on the last column's `pr-4`
  line. With nothing before or after the name, drop the inner `div` and `pr-4`.
- Put each group in its own `TableBody` when the groups can be reordered.
