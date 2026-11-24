# List Page

A list page shows all records of one kind in a table or board, under a page header and one toolbar.

## When to use

Use a list page for a kind of record that people scan, find, and open, such as prospects, merchants, or opportunities.
A short list that belongs to one record, such as its tasks or contacts, sits in a card on the record's page instead.
See [Record Page](record-page.md) for those cards.

## What is available

A list page has four parts, listed from top to bottom:

| Part | Content |
|---|---|
| Page header | Title, one-line subtitle, and primary action, such as Add Prospect |
| Toolbar | Scope controls, search, filters, count, and Sort |
| List | A table on the page, or a board of cards by stage. See [Tables](tables.md). |
| Footer | For a long list, the count with Previous and Next |

The toolbar holds five controls, listed from left to right:

| Control | Content |
|---|---|
| Scope | What sets the list's scope, such as a Board / Table switch, a report date, or a saved view |
| Search | Search box |
| Filters | Filters that narrow the list. See [Filters](filters.md). |
| Count | How many rows are left, such as "12 of 40" |
| Sort | Sort control, at the right end. See [Sort](sort.md). |

## How it looks and behaves

A list page places its toolbar between the header and the list, and each row opens its record.

The toolbar is a section of its own between the page header and the table, 20px from each.

A row opens its record. A click anywhere on the row opens the record, and the pointer changes over it. Keyboard users
reach the row with Tab and open it with Enter or Space. A control inside a row, such as a checkbox or a menu, keeps its
own click.

Contact values are plain. Phone numbers, emails, and websites in a table are text in the body color, like any other
value, because the row opens the record. See [Record Page](record-page.md) for contact values as links.

Edit and Delete sit on the record's page, not on the row. See [Page Header](page-header.md) for record actions.

While the list loads, the page shows its own shape. See [Loading](loading.md) for the loading state. When there are no
records, or nothing matches, the page shows an empty state. See [Empty and Missing](empty-and-missing.md) for the
empty states.

On a phone, the toolbar stacks in four rows:

1. The scope controls come first.
2. The search and a Filters button come next.
3. The filters that are on show as chips.
4. The count comes last, with Sort at its end.

## Rules

### Use one toolbar in one order

- **Do:** Lay out scope, search, filters, the count, and then Sort at the right end, on every list, so people know
  where everything is.
- **Don't:** Give the app its own toolbar order, or set a search box against the page title. Use the shared toolbar, so
  every list works the same.

## When you can do it differently

A list that people work by moving records between states, such as opportunities by stage, can be a board. A Board /
Table switch then comes first in the toolbar, and the board fills the full width.

A list may show its filters as dropdowns on the toolbar instead of chips when it has four filters or fewer and every
filter picks from a list of choices, is yes or no, or is a date. See [Filters](filters.md) for the dropdown form.

## Works with

- See [Filters](filters.md) and [Sort](sort.md) for the toolbar's controls.
- See [Tables](tables.md) for the table under the toolbar.
- See [Table](../components/table.md) for rows that open their record and for contact details as plain text.
- See [Loading](loading.md) and [Empty and Missing](empty-and-missing.md) for the page before the rows arrive and when
  there are none.

## In code

- `ListToolbar` from `aperia-ds5`, as a direct child of `AppContent`: `start` (scope controls), `search`
  (`{ placeholder, value, onChange }`), `filters`, `shown` and `total` (the count), `noun` (`["prospect",
  "prospects"]`, for the phone's sheet), `sort` (`SortControl`'s props) and `children` (after the filters). Never build
  a toolbar row by hand. Controls in `start` and `children` render twice (the wide row and the phone's rows), so keep
  their state with the list, not in themselves.
- `DataTable` from `aperia-ds5/data-table` for a list with search, filters and paging, or a `Table` from `aperia-ds5`.
- A row opens its record with `<TableRow {...opensOnClick(name, open)}>`; a row or card with no controls inside uses
  `openable(name, open)`. No `<a>` on one cell.
- On a record's page a contact value is a `tel:` / `mailto:` / website link (`target="_blank"` for the website), body
  color, `hover:underline`.
- A board or a wide table renders `<FullWidth />`. Filter and sort with `filterRows` and `sortRows` from
  `aperia-ds5/list`, the same fields on the server.
