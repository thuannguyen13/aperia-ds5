"use client"

import { cn } from "@/lib/utils"
import { plural } from "@/lib/format"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../pagination/pagination"
import { ReasonTooltip } from "../reason-tooltip/reason-tooltip"
import { PAGE_SIZE, pageCount } from "./paging"

const n = (value: number) => value.toLocaleString("en-US")

/**
 * The pages to show as numbers, at most seven slots: the first, the last, the page shown with one either side, and an
 * ellipsis ("gap") for each run left out. Seven pages or fewer show every number.
 */
export function pageSlots(at: number, pages: number): (number | "gap")[] {
  if (pages <= 7) return Array.from({ length: pages }, (_, i) => i + 1)
  if (at <= 4) return [1, 2, 3, 4, 5, "gap", pages]
  if (at >= pages - 3)
    return [1, "gap", pages - 4, pages - 3, pages - 2, pages - 1, pages]
  return [1, "gap", at - 1, at, at + 1, "gap", pages]
}

/**
 * The footer under a list: how many rows it holds, and its pages when they run past one. A list on one page reads
 * "6 merchants"; a longer one reads "26–50 of 312 merchants", with Previous, the page numbers, and Next, so people can
 * jump to any page. With no rows it renders nothing, since the list shows No Results instead.
 *
 * `total` counts the rows the search and filters leave, not the list before them. Keep `page` in the URL (`href` gives
 * each page its address, so it opens in a new tab too), and go back to page 1 when the search, a filter or the sort
 * changes. Cut the rows with `pageRows` from `aperia-ds5/list`, on the server or the client.
 */
export function ListPager({
  page,
  total,
  noun,
  pageSize = PAGE_SIZE,
  onPageChange,
  href,
  className,
}: {
  /** The page shown, counted from 1. */
  page: number
  /** Rows the search and filters leave. */
  total: number
  /** What a row is, one and many: ["merchant", "merchants"]. */
  noun: readonly [string, string]
  pageSize?: number
  onPageChange: (page: number) => void
  /** Each page's address, such as `(page) => \`?page=${page}\``. Left out, the links only call `onPageChange`. */
  href?: (page: number) => string
  className?: string
}) {
  if (total <= 0) return null
  const pages = pageCount(total, pageSize)
  const at = Math.min(Math.max(1, page), pages)
  const first = (at - 1) * pageSize + 1
  const last = Math.min(at * pageSize, total)
  // A link that moves to `to`: a plain click stays in the app, and a modified click opens its address.
  const go = (to: number) => ({
    href: href?.(to) ?? "#",
    onClick: (event: React.MouseEvent) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey) return
      event.preventDefault()
      onPageChange(to)
    },
  })
  // The first page has no Previous and the last no Next: each stays in place, disabled, and says why.
  const stuck = "pointer-events-none opacity-50"
  return (
    <div
      data-slot="list-pager"
      className={cn("flex shrink-0 flex-wrap items-center gap-2", className)}
    >
      <p
        className="flex-1 text-sm whitespace-nowrap text-muted-foreground tabular-nums"
        aria-live="polite"
      >
        {pages === 1
          ? plural(total, ...noun)
          : `${n(first)}–${n(last)} of ${plural(total, ...noun)}`}
      </p>
      {pages > 1 && (
        <Pagination aria-label="Pages" className="mx-0 w-auto justify-end">
          <PaginationContent>
            <PaginationItem>
              <ReasonTooltip
                reason={at === 1 ? "This is the first page." : null}
              >
                <PaginationPrevious
                  {...go(at - 1)}
                  aria-disabled={at === 1 || undefined}
                  className={cn(at === 1 && stuck)}
                />
              </ReasonTooltip>
            </PaginationItem>
            {pageSlots(at, pages).map((slot, index) => (
              <PaginationItem key={slot === "gap" ? `gap-${index}` : slot}>
                {slot === "gap" ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    {...go(slot)}
                    isActive={slot === at}
                    aria-label={`Page ${slot}`}
                    className="tabular-nums"
                  >
                    {slot}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}
            <PaginationItem>
              <ReasonTooltip
                reason={at === pages ? "This is the last page." : null}
              >
                <PaginationNext
                  {...go(at + 1)}
                  aria-disabled={at === pages || undefined}
                  className={cn(at === pages && stuck)}
                />
              </ReasonTooltip>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
