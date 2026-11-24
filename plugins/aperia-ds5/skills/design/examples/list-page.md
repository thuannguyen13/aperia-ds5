# List Page

A list page shows one kind of record in a table under a page header and a toolbar, with its count under the table.

## When to use

Use this layout for any page whose job is a list of records, such as prospects, merchants, opportunities, or requests.

## How it looks and behaves

A list page has four parts, 20px apart. A page header comes first, then a toolbar, then a table, then a footer.

The page header holds the title and a one-line subtitle, such as "Prospects". Every control that changes or adds to the
list sits in the toolbar.

The toolbar is one row. It contains four parts, from left to right:

| Part | Content |
|---|---|
| Search | A search box that names what it searches, such as "Search prospects". |
| Filters | A Filter button that counts the filters that are on. Its popover holds a row of Column, Operator, and Value for each filter, such as Stage, is, Demo, Proposal. |
| Sort | The Sort control, at the right end. |
| Actions | The list's actions after Sort, such as "Add Prospect", the primary action, last. |

The footer under the table shows the count, such as "3 prospects", and its page numbers once the list runs past one
page.

The table sits in its own box with the card fill. Selecting anywhere on a row opens the record. Names are plain text,
not links, and rows have no View button.

The table's place shows a different state when there are no rows to show:

| State | What shows |
|---|---|
| Nothing matches | "No Results" with a search icon, "No matching results.", and Clear Filters. |
| Nothing yet | An empty state, such as "No Prospects", with Import and Add Prospect in it and no toolbar, since there is nothing to search. |
| Loading | Placeholder shapes in the page's own layout (title, toolbar, columns, and rows), so nothing moves when the list loads. A spinner never shows. |

On a phone, the list's actions take the first row. The next row holds the search with Filter and Sort as icon buttons, and the Filter button counts the filters
that are on. Filters are set in a sheet from the bottom. Filters that are on show as chips, and a tap on a chip clears
it.

## Before and after

- **Before:** The app builds its own toolbar, with a Filter button and the search at the far right. Names are links with
  a details button beside each, and the column headings sort.
- **After:** One toolbar from the library holds the search, the Filter button, and Sort. Names are plain text. The
  whole row opens the record, and the count sits under the table.

## Rules

Each part's rules live on its pattern page, listed under Which patterns it uses.

## When you can do it differently

- A list may use simple filters, fixed controls on the toolbar, instead of the Filter button. See
  [Filters](../patterns/filters.md) for when a list uses simple or advanced filters.
- A board or a wide table fills the whole width of the page instead of the centered column.

## Which patterns it uses

- See [Page Layout](../foundations/page-layout.md) for the header and the 20px between sections.
- See [List Toolbar](../patterns/list-toolbar.md) for the toolbar.
- See [Loading](../foundations/loading.md) and [Empty States](../foundations/empty-states.md) for the empty
  and loading states.
- See [Filters](../patterns/filters.md) and [Sort](../patterns/sort.md) for the Filter button and the Sort control.
- See [Tables](../patterns/tables.md) for rows that open their record.
- See [Paging](../patterns/paging.md) for the count and the pages under the table.

## In code

The app builds the page from aperia-ds5 parts, inside `AppContent`:

- `PageHeader` with `title` and `subtitle`.
- `ListToolbar` with `search`, `filters` (`FilterField`s and `FilterRule`s, applied with `filterRows`; `form:
"simple"` for four filters or fewer, each a pick-list, yes or no, or a date), `shown`, `total`, `noun`, `sort`
  (`SortControl`'s props, sorted with `sortRows`), and `actions` (Add Prospect).
- `ListPager` under the table, with the page cut by `pageRows`.
- The table in `<div className="surface overflow-clip">`, each `TableRow` spread with `opensOnClick(label, open)`.
- `NoResults` with `onClear` when filters match nothing; `EmptyState` (`className="surface"`) when the list is empty;
  the list skeleton from [Loading](../foundations/loading.md) while it loads. `<FullWidth />` for a board or wide table.
