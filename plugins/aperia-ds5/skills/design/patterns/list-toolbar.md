# List Toolbar

A list toolbar holds the controls that change or add to one list, such as its search, filters, Sort, and Add, in one
row above it.

## When to use

Use a list toolbar above every list that people search, filter, sort, or add to, such as a table of prospects or a
board of opportunities. A short list inside a card has no toolbar. Its Sort and Add sit in the card's header. See
[Sort](sort.md) for Sort in a card.

## What is available

A list toolbar comes in one layout. Its controls are listed under Anatomy. Its filters come in two forms. Advanced
filters are one Filter button that opens the filters in a popover. Simple filters are fixed controls on the row, for a
list with four filters or fewer. See [Filters](filters.md) for choosing between them.

The toolbar holds nothing else. The list's count sits in the footer under the list. See [Paging](paging.md) for the
footer.

## Anatomy

A list toolbar needs at least one control. Every control is optional, and the controls a list shows keep this order.
The search and the filters sit at the left end. Sort and the list's actions sit at the right end.

1. **Search** (optional). It is a search box that names what it searches, such as "Search prospects".
2. **Filters** (optional). They follow the search, as the Filter button or as fixed controls. See
   [Filters](filters.md).
3. **Sort** (optional). It is the Sort control. See [Sort](sort.md).
4. **Actions** (optional). They are the list's own actions, such as Import and Add Prospect, with the primary action
   last.

## How it looks and behaves

The toolbar is a section of its own between the page header and the list, 20px from each. It is one row on a desktop.

When nothing matches, the list shows "No Results" with Clear Filters. See
[Empty States](../foundations/empty-states.md) for that state. While the list is empty, the toolbar is gone,
and the empty state holds Add instead.

On a phone, the toolbar is at most three short rows:

1. The slot's controls and the list's actions come first, when the list has any.
2. The search comes next, with Filter and Sort as icon buttons at its end. Sort opens the same panel as on a desktop.
3. The filters that are on come last, as chips on one line that scrolls sideways.

See [Filters](filters.md) for the sheet that the Filter button opens.

## Rules

### Use one toolbar in one order

- **Do:** Lay out the search and the filters on the left, then Sort and the list's actions on the right, on every list,
  so people know where everything is.
- **Don't:** Give the app its own toolbar order, or set a search box against the page title. Use the shared toolbar, so
  every list works the same.

### Keep the list's actions with the list

- **Do:** Put the actions that add to the list or work on it, such as Add Prospect, Import, or Export, at the
  toolbar's right end, so they sit beside the list they change.
- **Don't:** Put the list's actions in the page header, or put a control that does not change the list, such as a
  date or a picker of saved views, in the toolbar. Keep the toolbar to the list's own controls, so it reads the same
  in every app.

## When you can do it differently

An app can add a control that only it needs to the toolbar's slot, which sits before Sort. A board's Board / Table
switch is one such control. A list that people work by moving records between states, such as opportunities by stage,
can be a board, and its switch goes in the slot. The board fills the full width of the page.

## Works with

- See [Filters](filters.md), [Sort](sort.md), and [Search](search.md) for the toolbar's controls.
- See [Paging](paging.md) for the count and the pages under the list.
- See [Tables](tables.md) for the table under the toolbar.
- See [Page Header](page-header.md) for the header above it.
- See [Loading](../foundations/loading.md) for the list's shape while it loads.

## In code

- `ListToolbar` from `aperia-ds5`, as a direct child of `AppContent`: `search` (`{ placeholder, value, onChange }`),
  `filters`, `sort` (`SortControl`'s props), `actions` (the list's buttons,
  primary last). `shown`, `total`, and `noun` (`["prospect", "prospects"]`) give the phone's Filter sheet its count.
  Never build a toolbar row by hand.
- The slot is `children`: a control only the app needs, placed before Sort on a desktop and in the first row on a phone.
- Controls in `children` and `actions` render twice (the wide row and the phone's rows), so keep their state with the
  list, not in themselves.
- Filter and sort with `filterRows` and `sortRows` from `aperia-ds5/list`, the same fields on the server.
- Put `ListPager` under the list for its count and pages.
- A board or a wide table renders `<FullWidth />`.
