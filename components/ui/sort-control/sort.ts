// A list's Sort, ported from Sales Portal's lib/sort.ts and Titan's lib/use-sort.ts. Pure, no React: a page on the
// server can sort with it too. `SortControl` is the one control that picks it, alone or in `ListToolbar`'s `sort`.

export type SortDirection = "asc" | "desc"

/** A value a row sorts by: a number, a text, a day as YYYY-MM-DD, a moment, or nothing. */
export type SortValue = number | string | Date | null | undefined

/**
 * A field the list can sort by, as the Sort control lists it. `starts` is the direction picking it begins with, such as
 * highest first for an amount or newest first for a date; A to Z when left out.
 */
export type SortOption = {
  value: string
  label: string
  starts?: SortDirection
}

/** A field with how to read it: `read` gives a row's value, and an empty one (null, undefined or "") sorts lowest. */
export type SortField<Row> = SortOption & {
  read: (row: Row) => SortValue
}

/** The field sorted by, empty for the list's own order, and which way. */
export type SortState = { by: string; direction: SortDirection }

/** The list's own order: what a list starts with and what "Default order" picks. */
export const UNSORTED: SortState = { by: "", direction: "desc" }

const isEmpty = (value: SortValue): value is null | undefined | "" =>
  value === null || value === undefined || value === ""

const compare = (a: SortValue, b: SortValue) => {
  const emptyA = isEmpty(a)
  const emptyB = isEmpty(b)
  // An empty value is lower than any value, whichever way the list sorts, so it leads ascending and trails descending.
  if (emptyA || emptyB) return emptyA === emptyB ? 0 : emptyA ? -1 : 1
  const left = a instanceof Date ? a.getTime() : a
  const right = b instanceof Date ? b.getTime() : b
  if (left === right) return 0
  return typeof left === "number" && typeof right === "number"
    ? left - right
    : // Case and accents don't split a name, and "Queue 10" follows "Queue 9".
      String(left).localeCompare(String(right), undefined, {
        sensitivity: "base",
        numeric: true,
      })
}

/** The rows by `state`, rows that tie keeping their order; the rows themselves when it sorts by nothing. */
export function sortRows<Row>(
  rows: Row[],
  fields: readonly SortField<Row>[],
  state: SortState
): Row[] {
  const field = fields.find((each) => each.value === state.by)
  if (!field) return rows
  const sign = state.direction === "asc" ? 1 : -1
  return rows
    .map((row, at) => ({ row, at, key: field.read(row) }))
    .sort((a, b) => sign * compare(a.key, b.key) || a.at - b.at)
    .map(({ row }) => row)
}
