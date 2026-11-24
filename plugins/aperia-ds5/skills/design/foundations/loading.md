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
[Global Search](../patterns/global-search.md) for its results.

## Works with

- See [List Page](../examples/list-page.md) for the page a loading state stands in for.
- See [Page Layout](page-layout.md) for the spacing and width it keeps.

## In code

- Build the list skeleton in the app from `Skeleton` from `aperia-ds5`. Put it inside `AppContent` where the page
  would be, so it gets the same 20px between parts as the page's sections.

```tsx
<p role="status" className="sr-only">Loading</p>
{/* The page header: the title at its own width. */}
<div className="flex min-h-9 items-center"><Skeleton className="h-8 w-40" /></div>
{/* The toolbar: search, one block per filter, then Add at the right end. */}
<div className="flex items-center gap-3">
  <Skeleton className="h-8 flex-1 sm:w-64 sm:flex-none" />
  <Skeleton className="h-8 w-40 max-sm:hidden" />
  <Skeleton className="ml-auto h-8 w-32 max-sm:hidden" />
</div>
{/* The table: a 40px header row, then rows at the real height (53px with a second line, 37px with one). */}
<div className="surface overflow-clip">
  <div className="flex h-10 items-center gap-4 border-b px-4">{/* one Skeleton h-3.5 per column */}</div>
  <div className="flex h-[53px] items-center gap-4 border-b px-4 last:border-b-0">{/* one Skeleton h-4 per column */}</div>
</div>
{/* The count under the list. */}
<div className="flex h-8 items-center"><Skeleton className="h-4 w-28" /></div>
```

- Use the page's own sizes: the title's width, how many filters and toolbar buttons, each column's share of the width
  (`style={{ flex: share }}`), the row count, and the row height. Nothing moves when the page lands.
- Vary the widths of the cell blocks by row and column with a fixed formula, not at random, so the server and the
  browser draw the same thing.
- On a phone the filters and Sort are two icon buttons (`size-8 sm:hidden`) at the search's end.
- Stat tiles above the toolbar are `h-27 rounded-xl` blocks in the tiles' grid. A board shows its columns of card
  blocks in place of the table.
- A page that renders `<FullWidth />` renders it in its skeleton too, or the column widens when the page lands.
- A record page or a card: compose `Skeleton` blocks from `aperia-ds5` in the page's own layout (the page header's
  sizes, the tiles' row, each card with its title and rows), inside `AppContent`. Keep each block at the real part's
  size, as the list skeleton does.
- Never a `Spinner` for a page.
