# List Toolbar

A list toolbar gives people the controls that find, narrow, order, and add to one list, in one row above it. See
[Global Search](global-search.md) for finding any record in the app.

## Anatomy

A list toolbar has four parts, a search, the filters, Sort, and the list's actions. Each shows only when the list needs
it, and a toolbar has at least one.

1. **Search** (optional). It is a search box that names what it searches, such as "Search prospects", and finds rows
   in this list only.
2. **Filters** (optional). They are either one Filter button that opens the filters in a popover, or fixed controls
   on the row. See [Filters](filters.md) for choosing between them.
3. **Sort** (optional). It is a button that opens a panel for choosing the list's order. See [Sort](sort.md).
4. **Actions** (optional). They are buttons for the list's own actions, such as Import and Add Prospect, with the
   primary action last.

## When to use

Give a list a toolbar when people search, filter, sort, or add to it, such as a table of prospects or a board of
opportunities. A short list inside a card has no toolbar. Its Sort and Add sit in the card's header. See
[Sort](sort.md) for Sort in a card.

## How it looks and behaves

The toolbar is a section of its own between the page header and the list, `gap-5` from each. It is one row on a desktop.

An app can add a control that only it needs to the toolbar's slot, which sits before Sort. A board's Board / Table
switch is one such control. A list that people work by moving records between states, such as opportunities by stage,
can be a board. Its switch goes in the slot, and the board fills the full width of the page.

The toolbar holds only its four parts and the slot. The list's count sits in the footer under the list. See
[Paging](paging.md) for the footer.

While rows are selected, a selection bar takes the place of the list's actions, and the search, the filters, and Sort
stay. See [Selecting Rows](selecting-rows.md) for that bar.

A search or a filter that matches nothing keeps the toolbar, and "No Results" takes the list's place. When the list
has no records at all, the toolbar is gone, its slot's controls included. See
[Empty States](../foundations/empty-states.md) for both states and for the actions that an empty list holds.

On a phone, the toolbar is at most three short rows:

1. The slot's controls and the list's actions come first, when the list has any.
2. The search comes next, with Filter and Sort as icon buttons at its end. Sort opens the same panel as on a desktop.
3. The filters that are on come last, as chips on one line that scrolls sideways.

See [Filters](filters.md) for the sheet that the Filter button opens. See [Screen Sizes](../foundations/screen-sizes.md)
for every part on a phone.

## Rules

### 1. Use one toolbar in one order

Every list uses the shared toolbar. The search and the filters sit at the left end. Sort and the list's actions sit at
the right end, so people know where everything is on every list.

- **Do:** Use the shared toolbar for a table and for a board.
- **Don't:** Give the app its own toolbar order, or set a search box against the page title.

### 2. Keep the list's actions with the list

The actions that add to the list or work on it sit at the toolbar's right end, beside the list they change. The toolbar
holds only the list's own controls, so it reads the same in every app.

- **Do:** Put Add Prospect, Import, and Export in the toolbar.
- **Don't:** Put the list's actions in the page header. Keep out of the toolbar any control that does not change the
  list, such as a date or a picker of saved views.

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
