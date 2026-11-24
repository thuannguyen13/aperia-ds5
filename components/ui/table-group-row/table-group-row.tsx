import type { ReactNode } from "react"

import { cn } from "@/lib/utils"
import { TableCell, TableRow } from "../table/table"

/**
 * The row that heads a group of rows in one table: a quiet band across the table holding the group's name, on the
 * table's first-column line (`pl-4`, as the first cells in a `TitledCard`). `leading` sits before the name, such as a
 * logo; `trailing` at its end, such as the group's total or buttons. `colSpan` is the table's column count.
 */
export function TableGroupRow({
  colSpan,
  leading,
  trailing,
  className,
  children,
}: {
  colSpan: number
  leading?: ReactNode
  trailing?: ReactNode
  className?: string
  children: ReactNode
}) {
  return (
    <TableRow
      data-slot="table-group-row"
      className="bg-foreground/4 hover:bg-foreground/4"
    >
      <TableCell
        colSpan={colSpan}
        className={cn(
          "pl-4 text-xs font-medium text-muted-foreground",
          // A trailing part ends on the last column's pr-4 line.
          trailing !== undefined && "pr-4",
          className
        )}
      >
        {trailing === undefined && leading === undefined ? (
          children
        ) : (
          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-1.5">
              {leading}
              {children}
            </span>
            <span className="flex items-center gap-1">{trailing}</span>
          </div>
        )}
      </TableCell>
    </TableRow>
  )
}
