// Server-safe paging helpers: a server page cuts its rows with these before rendering. Import from "aperia-ds5/list".

/** Rows on one page of a list of records. */
export const PAGE_SIZE = 25

/** How many pages `total` rows fill, at least one. */
export const pageCount = (total: number, size: number = PAGE_SIZE) =>
  Math.max(1, Math.ceil(total / size))

/** The rows on page `page` (counted from 1), after the search, filters and sort. A page past the end gives the last. */
export function pageRows<Row>(
  rows: readonly Row[],
  page: number,
  size: number = PAGE_SIZE
): Row[] {
  const last = pageCount(rows.length, size)
  const at = Math.min(Math.max(1, Math.floor(page) || 1), last)
  return rows.slice((at - 1) * size, at * size)
}
