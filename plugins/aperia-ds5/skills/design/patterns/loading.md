# Loading

Loading states hold a page's shape in placeholder blocks while its data arrives.

## When to use

Use a loading state whenever a page or a card is waiting for its data. The library ships the loading state for list
pages. A record page and a card build theirs from the library's skeleton blocks, in the same way.

## What is available

A loading state comes in two layouts:

| Layout | Blocks |
|---|---|
| Table page | Title and its buttons, any stat tiles, the toolbar's search, filters, count, and Sort, then the table's headings and rows |
| Board page | The same header and toolbar, with the Board / Table switch first, then one column per stage instead of the table |
| Record page | The page header's title and actions, the row of tiles, then each card in its own place, with its title and a block for each row or field |
| Card | The card's title, then a block for each row or field it will show |

The table and board layouts come ready-made. An app builds the record page and card layouts from skeleton blocks,
following the same rules.

## How it looks and behaves

Every block has the size of the real part it stands in for. The title is about as long as the page's name. The
toolbar shows as many filters as it has. The columns have their real widths. The rows have their real height, which is
taller for rows with a second line.

Stat tiles sit in one row from 768px wide, as the real tiles do.

The blocks are spaced like the page's sections, 20px apart. A page that fills the full width loads at the full width
too, so the column does not widen when the page lands.

## Rules

### Load in the page's own shape

- **Do:** Show blocks in the muted color where the title, toolbar, and rows will be, at their real sizes, so the page
  does not jump when it loads.
- **Don't:** Put a spinner in the middle of an empty page. Load in the page's own shape, so people see what is coming.

## When you can do it differently

A list that changes while the user types keeps its last results, shown at reduced opacity, while new ones load. See
[Search](search.md) for search results.

## Works with

- See [List Page](list-page.md) for the page a loading state stands in for.
- See [Page Layout](page-layout.md) for the spacing and width it keeps.

## In code

- `ListSkeleton` from `aperia-ds5`, inside `AppContent` where the page would be. Pass the page's own sizes: `title`
  (its width in px), `actions` (header buttons), `filters` (how many), `sort`, `columns` (each column's share, its px
  widths will do), `rows`, `rowHeight` (53 for a row with a second line, 37 for one line), `tiles`, `board` and
  `fullWidth` (for a page that renders `<FullWidth />`).
- A record page or a card: compose `Skeleton` blocks from `aperia-ds5` in the page's own layout (the page header's
  sizes, the tiles' row, each `TitledCard` with its title and rows), inside `AppContent`. Keep each block at the real
  part's size, as `ListSkeleton` does.
- Never a `Spinner` for a page.
