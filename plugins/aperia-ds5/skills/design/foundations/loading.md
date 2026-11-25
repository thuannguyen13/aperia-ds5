# Loading

A loading state shows the shape of a page or a card in placeholder blocks while its data arrives, so nothing moves when the data lands.

## What is available

The app builds every loading state from the library's skeleton blocks. A loading state comes in four layouts, one for each kind of page or card that waits for data:

| Layout | Blocks |
|---|---|
| Table page | Title and its buttons, any stat tiles, the toolbar's search, filters, and Sort, then the table's headings and rows, then the count in the footer |
| Board page | The same header and toolbar, with the Board / Table switch first, then one column per stage instead of the table |
| Record page | The page header's title and actions, the row of tiles, then each card in its own place, with its title and a block for each row or field |
| Card | The card's title, then a block for each row or field it will show |

The list skeleton is a recipe for the table and board layouts, under In code. An app builds the record page and card
layouts from skeleton blocks in the same way.

## How it looks and behaves

Every block has the size of the real part it stands in for. The title is about as long as the page's name. The
toolbar shows as many filters as it has. The columns have their real widths. The rows have their real height, which is
taller for rows with a second line.

Stat tiles sit in one row once the page column is `@min-page-md` wide, as the real tiles do.

The blocks are spaced like the page's sections, `gap-5` apart. See [Page Layout](page-layout.md) for the spacing and
width. A page that fills the full width loads at the full width too, so the column does not widen when the page lands.

A list that changes while a person types keeps its last results on screen at reduced opacity while new ones load, so
the list holds still. See [Global Search](../patterns/global-search.md) for its results and [Motion](../styles/motion.md)
for the timing.

## Rules

### 1. Load in the page's own shape

A loading state places a block at the real size of each part, where that part will be. The page then does not jump
when it loads, and people see what is coming.

- **Do:** Show a table page's title, filters, and rows as muted blocks at their real widths and heights.
- **Don't:** Put a spinner in the middle of an empty page.

## In code

- Build the list skeleton in the app from `Skeleton` from `aperia-ds5`. Put it inside `AppContent` where the page
  would be, so it gets the same `gap-5` between parts as the page's sections.

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
