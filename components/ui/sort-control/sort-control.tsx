"use client"

import { ArrowDownWideNarrowIcon, ArrowUpNarrowWideIcon } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select/select"
import { IconButton } from "../icon-button/icon-button"
import { cn } from "@/lib/utils"
import type { SortOption, SortState } from "./sort"

// The list's value for its own order, which no field's value is: Radix needs a real value for every option.
const UNSORTED_VALUE = "default"

/**
 * The one Sort a list has: a field, then which way. It sits at the right end of the list's toolbar (`ListToolbar`'s
 * `sort`), or alone in a card's header for a list inside a card. Column headings don't sort.
 *
 * Picking a field starts in that field's own direction (`starts`); the arrow beside it flips it. The arrow is there
 * even in the list's own order, disabled with a reason, so nothing shifts when a field is picked.
 */
export function SortControl({
  fields,
  value,
  onChange,
  size = "default",
  className,
}: {
  /** What the list can sort by. A `SortField` works here as it is, its `read` unused. */
  fields: readonly SortOption[]
  value: SortState
  onChange: (value: SortState) => void
  /** `sm` in a card's header, to match the card's small Add button. */
  size?: "default" | "sm"
  className?: string
}) {
  const ascending = value.direction === "asc"
  return (
    <div className={cn("flex shrink-0 items-center gap-1.5", className)}>
      <Select
        value={value.by || UNSORTED_VALUE}
        onValueChange={(by) => {
          const field = fields.find((each) => each.value === by)
          onChange(
            field
              ? { by, direction: field.starts ?? "asc" }
              : { by: "", direction: value.direction }
          )
        }}
      >
        <SelectTrigger className="w-44" size={size} aria-label="Sort by">
          <SelectValue />
        </SelectTrigger>
        <SelectContent position="popper" align="end">
          <SelectGroup>
            <SelectItem value={UNSORTED_VALUE}>Default order</SelectItem>
            {fields.map((field) => (
              <SelectItem key={field.value} value={field.value}>
                Sort by {field.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <IconButton
        label={ascending ? "Ascending" : "Descending"}
        variant="outline"
        size={size === "sm" ? "icon-sm" : "icon"}
        disabled={!value.by}
        reason="Choose a field to sort by"
        onClick={() =>
          onChange({ ...value, direction: ascending ? "desc" : "asc" })
        }
      >
        {ascending ? <ArrowUpNarrowWideIcon /> : <ArrowDownWideNarrowIcon />}
      </IconButton>
    </div>
  )
}
