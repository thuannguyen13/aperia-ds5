# List Toolbar

A list toolbar holds the controls that change one list, such as its search, filters, and Sort, in one row above it.

## When to use

Use a list toolbar above every list that people search, filter, or sort, such as a table of prospects or a board of
opportunities. A short list inside a card has no toolbar. Its Sort sits in the card's header. See [Sort](sort.md) for
Sort in a card.

## What is available

A list toolbar holds five controls, listed from left to right:

| Control | Content |
|---|---|
| Scope | What sets the list's scope, such as a Board / Table switch, a report date, or a saved view |
| Search | A search box that names what it searches, such as "Search prospects" |
| Filters | Advanced filters (the Filter button and its popover) or simple filters (fixed controls). See [Filters](filters.md). |
| Count | How many rows are left, such as "12 of 40" |
| Sort | The Sort control, at the right end. See [Sort](sort.md). |

A list shows only the controls it needs. The ones it shows keep this order.

## How it looks and behaves

The toolbar is a section of its own between the page header and the list, 20px from each. It is one row on a desktop.

The count changes as people search and filter, so they see how much of the list is left. When nothing matches, the
list shows "No Results" with Clear Filters. See [Empty and Missing](../foundations/empty-and-missing.md) for that
state.

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
Table switch then comes first in the toolbar, and the board fills the full width of the page.

## Works with

- See [Filters](filters.md), [Sort](sort.md), and [Search](search.md) for the toolbar's controls.
- See [Tables](tables.md) for the table under the toolbar.
- See [Page Header](page-header.md) for the header above it.
- See [Loading](../foundations/loading.md) for the list's shape while it loads.

## In code

- `ListToolbar` from `aperia-ds5`, as a direct child of `AppContent`: `start` (scope controls), `search`
  (`{ placeholder, value, onChange }`), `filters`, `shown` and `total` (the count), `noun` (`["prospect",
  "prospects"]`, for the phone's sheet), `sort` (`SortControl`'s props) and `children` (after the filters). Never build
  a toolbar row by hand.
- Controls in `start` and `children` render twice (the wide row and the phone's rows), so keep their state with the
  list, not in themselves.
- Filter and sort with `filterRows` and `sortRows` from `aperia-ds5/list`, the same fields on the server.
- A board or a wide table renders `<FullWidth />`.
