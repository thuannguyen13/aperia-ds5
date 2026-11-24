# List Page

A list page shows one kind of record in a table under a page header and a toolbar.

## When to use

Use this layout for any page whose job is a list of records, such as prospects, merchants, opportunities, or requests.

## How it looks and behaves

A list page has three parts. A page header comes first. A toolbar sits 20px under the header. A table sits 20px under
the toolbar.

The page header holds the title, a one-line subtitle, and the page's main action at the right, such as "Prospects" with
"Add Prospect". The header holds no other controls, so every control that changes the list sits in the toolbar.

The toolbar is one row. It contains five parts, from left to right:

| Part | Content |
|---|---|
| Scope | Anything that picks what the list covers, such as a saved view or a report date. |
| Search | A search box that names what it searches, such as "Search prospects". |
| Filters | Add Filter, and a chip for each filter that is on. Each chip reads as a sentence, such as "Stage is Demo, Proposal". |
| Count | How many rows are left, such as "3 of 6". |
| Sort | The Sort control, at the right end. |

The table sits in its own box with the card fill. Selecting anywhere on a row opens the record. Names are plain text,
not links, and rows have no View button.

The table's place shows a different state when there are no rows to show:

| State | What shows |
|---|---|
| Nothing matches | "No Results" with a search icon, "No matching results.", and Clear Filters. |
| Nothing yet | An empty state, such as "No Prospects", with no toolbar, since there is nothing to search. |
| Loading | Placeholder shapes in the page's own layout (title, toolbar, columns, and rows), so nothing moves when the list loads. A spinner never shows. |

On a phone, the toolbar holds the search and a Filters button that counts the filters that are on. Filters are set in a
sheet from the bottom. Filters that are on show as chips, and a tap on a chip clears it.

## Before and after

- **Before:** The app builds its own toolbar. A "Report Date:" label comes first, then "View:", an Edit View link, a
  Filter button, and the search at the far right. Names are links with a details button beside each, and the column
  headings sort.
- **After:** One toolbar from the library holds the report date and view first, then search, filter chips, the count,
  and Sort. Names are plain text. The whole row opens the record.

## Rules

Each part's rules live on its pattern page, listed under Which patterns it uses.

## When you can do it differently

- A list may show fixed dropdowns on the toolbar instead of Add Filter and chips. It does so when it has four filters
  or fewer, and every one picks from a list, is yes or no, or is a date. A fifth filter, or any filter on text, a
  number, or an amount, means chips. See [Filters](../patterns/filters.md) for why the limit is four.
- A board or a wide table fills the whole width of the page instead of the centered column.

## Which patterns it uses

- See [Page Layout](../patterns/page-layout.md) for the header and the 20px between sections.
- See [List Page](../patterns/list-page.md) for the toolbar and the empty and loading states.
- See [Filters](../patterns/filters.md) and [Sort](../patterns/sort.md) for the filter chips and the Sort control.
- See [Tables](../patterns/tables.md) for rows that open their record.

## In code

The app builds the page from aperia-ds5 parts, inside `AppContent`:

- `PageHeader` with `title`, `subtitle` and `actions`.
- `ListToolbar` with `start`, `search`, `filters` (`FilterField`s and `FilterRule`s, applied with `filterRows`; `form:
  "dropdowns"` for four filters or fewer, each a pick-list, yes or no, or a date), `shown`, `total`, `noun` and `sort`
  (`SortControl`'s props, sorted with `sortRows`).
- The table in `<div className="surface overflow-clip">`, each `TableRow` spread with `opensOnClick(label, open)`.
- `NoResults` with `onClear` when filters match nothing; `EmptyState` (`className="surface"`) when the list is empty;
  `ListSkeleton` while it loads. `<FullWidth />` for a board or wide table.
