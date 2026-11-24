import { FullWidth } from "../app-shell/app-content"
import { Skeleton } from "../skeleton/skeleton"

/**
 * A list page while it loads, in the page's own shape so nothing moves when it lands: the title and its buttons, any
 * stat tiles, the toolbar's search, filters, count and Sort, then the table's header and rows at their real heights.
 * A board shows its scope switch and a column per stage instead of the table. Put it where the page would be, inside
 * `AppContent`, which puts 20px between its parts as it does the page's sections.
 *
 * Every size is the page's, so pass what the page has: its title's width, how many filters, its columns' shares. A
 * page that fills the pane (`<FullWidth />`) passes `fullWidth`, or the column would widen when the page lands.
 */
export function ListSkeleton({
  title,
  actions = 1,
  filters = 0,
  sort = false,
  columns = [2, 1, 1, 1],
  rows = 10,
  rowHeight = 53,
  tiles = 0,
  board = false,
  fullWidth = false,
}: {
  /** The title's width in px, about as long as the page's name. */
  title: number
  /** How many buttons the page header has, such as Add Prospect. */
  actions?: number
  /** How many filters the toolbar has. */
  filters?: number
  /** Whether the toolbar has a Sort at its right end. */
  sort?: boolean
  /** Each column's share of the table's width, as the page lays it out: its columns' widths in px will do. */
  columns?: number[]
  /** How many rows to show. */
  rows?: number
  /** A row's height in px: 53 for a row with a second line, 37 for one line. */
  rowHeight?: number
  /** How many stat tiles sit above the toolbar, all on one row from 768px. */
  tiles?: number
  /** A board of stage columns instead of a table, with the board's Board and Table switch first on the toolbar. */
  board?: boolean
  fullWidth?: boolean
}) {
  return (
    <>
      {fullWidth && <FullWidth />}
      {/* Out of the flow, so it adds no gap: what a screen reader hears while the page loads. */}
      <p role="status" className="sr-only">
        Loading
      </p>
      {/* As PageHeader lays it out: on a phone its buttons drop to a row of their own, sharing the width. */}
      <div className="flex min-h-9 flex-wrap items-center justify-between gap-x-2 gap-y-4">
        <Skeleton className="h-8" style={{ width: title }} />
        {actions > 0 && (
          <div className="flex gap-2 max-sm:basis-full max-sm:*:flex-1">
            {Array.from({ length: actions }, (_, at) => (
              <Skeleton key={at} className="h-8 w-36 max-sm:h-10" />
            ))}
          </div>
        )}
      </div>
      {tiles > 0 && (
        <div
          className="grid grid-cols-2 gap-4 @min-[48rem]:grid-cols-[repeat(var(--tiles),minmax(0,1fr))]"
          style={{ "--tiles": tiles } as React.CSSProperties}
        >
          {Array.from({ length: tiles }, (_, at) => (
            <Skeleton key={at} className="h-27 rounded-xl" />
          ))}
        </div>
      )}
      <div className="flex flex-wrap items-center gap-3">
        {board && <Skeleton className="h-8 w-27 max-sm:hidden" />}
        {/* Controls are 40px on a phone, where the filters are one Filters button. */}
        <Skeleton className="h-8 flex-1 max-sm:h-10 sm:w-64 sm:flex-none" />
        {filters > 0 && <Skeleton className="h-10 w-24 sm:hidden" />}
        {Array.from({ length: filters }, (_, at) => (
          <Skeleton key={at} className="h-8 w-40 max-sm:hidden" />
        ))}
        {/* The count, then Sort at the right end: on a phone, a row of their own under the search, as the toolbar has. */}
        <div className="flex flex-1 items-center gap-3 max-sm:basis-full">
          <Skeleton className="h-4 w-12" />
          {sort && (
            <div className="ml-auto flex gap-1.5">
              <Skeleton className="h-8 w-44 max-sm:h-10" />
              <Skeleton className="size-8 max-sm:size-10" />
            </div>
          )}
        </div>
      </div>
      {board ? (
        <div className="flex min-h-0 flex-1 gap-4 overflow-hidden">
          {Array.from({ length: 5 }, (_, at) => (
            <div
              key={at}
              className="flex w-64 shrink-0 flex-col gap-2 rounded-xl bg-muted/50 p-2"
            >
              <Skeleton className="h-6 w-32" />
              {Array.from({ length: 3 }, (_, card) => (
                <Skeleton key={card} className="h-28 rounded-lg" />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-clip surface">
          {/* px-4, as a table on a page starts its first column on the card's 16px inset. */}
          <div className="flex h-10 items-center gap-4 border-b px-4">
            {columns.map((share, at) => (
              <div key={at} className="min-w-0" style={{ flex: share }}>
                <Skeleton className="h-3.5 w-20 max-w-full" />
              </div>
            ))}
          </div>
          {Array.from({ length: rows }, (_, row) => (
            <div
              key={row}
              className="flex items-center gap-4 border-b px-4 last:border-b-0"
              style={{ height: rowHeight }}
            >
              {columns.map((share, at) => (
                <div key={at} className="min-w-0" style={{ flex: share }}>
                  {/* Widths that vary by row and column, but the same on every load, so the server and browser agree. */}
                  <Skeleton
                    className="h-4"
                    style={{ width: `${60 + ((row * 7 + at * 13) % 35)}%` }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  )
}
