"use client"

import {
  ArrowDownWideNarrowIcon,
  ArrowUpDownIcon,
  ArrowUpNarrowWideIcon,
} from "lucide-react"
import { Button } from "../button/button"
import { IconButton } from "../icon-button/icon-button"
import { Label } from "../label/label"
import { Popover, PopoverContent, PopoverTrigger } from "../popover/popover"
import { RadioGroup, RadioGroupItem } from "../radio-group/radio-group"
import { ToggleGroup, ToggleGroupItem } from "../toggle-group/toggle-group"
import { cn } from "@/lib/utils"
import type { SortDirection, SortOption, SortState } from "./sort"

// The list's value for its own order, which no field's value is: Radix needs a real value for every option.
const UNSORTED_VALUE = "default"

/**
 * The one Sort a list has: one button that opens a panel with what to sort by and which way. It sits at the right end
 * of the list's toolbar (`ListToolbar`'s `sort`), or alone in a card's header for a list inside a card. Column headings
 * don't sort.
 *
 * The button reads "Sort" in the list's own order, and "Sort: <field>" with an arrow for the direction once sorted. In
 * the panel, "Default order" comes first, then each field; picking a field starts in that field's own direction
 * (`starts`), and Ascending and Descending flip it. Every pick applies at once. `iconOnly` draws the button as an icon
 * with a dot while sorted, for a phone's toolbar.
 */
export function SortControl({
  fields,
  value,
  onChange,
  size = "default",
  iconOnly = false,
  className,
}: {
  /** What the list can sort by. A `SortField` works here as it is, its `read` unused. */
  fields: readonly SortOption[]
  value: SortState
  onChange: (value: SortState) => void
  /** `sm` in a card's header, to match the card's small Add button. */
  size?: "default" | "sm"
  /** An icon button with a dot while sorted, for a phone's toolbar. */
  iconOnly?: boolean
  className?: string
}) {
  const by = fields.find((field) => field.value === value.by)
  const Arrow = !by
    ? ArrowUpDownIcon
    : value.direction === "asc"
      ? ArrowUpNarrowWideIcon
      : ArrowDownWideNarrowIcon
  const name = by
    ? `Sort by ${by.label}, ${value.direction === "asc" ? "ascending" : "descending"}`
    : "Sort"

  return (
    <Popover>
      <PopoverTrigger asChild>
        {iconOnly ? (
          <IconButton
            label={name}
            variant="outline"
            size={size === "sm" ? "icon-sm" : "icon"}
            className={cn("relative shrink-0", className)}
          >
            <Arrow />
            {by && (
              <span
                aria-hidden
                className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-primary ring-2 ring-background"
              />
            )}
          </IconButton>
        ) : (
          <Button
            variant="outline"
            size={size}
            aria-label={name}
            className={cn("shrink-0", className)}
          >
            <Arrow data-icon="inline-start" />
            {by ? `Sort: ${by.label}` : "Sort"}
          </Button>
        )}
      </PopoverTrigger>
      {/* Two groups, Sort By and the direction, each with its own inset; the line between them runs edge to edge. */}
      <PopoverContent align="end" className="w-popover-sm gap-0 p-0">
        <div className="flex flex-col gap-3 p-3">
          <p className="text-sm font-medium">Sort By</p>
          <RadioGroup
            value={value.by || UNSORTED_VALUE}
            onValueChange={(next) => {
              const field = fields.find((each) => each.value === next)
              onChange(
                field
                  ? { by: next, direction: field.starts ?? "asc" }
                  : { by: "", direction: value.direction }
              )
            }}
            aria-label="Sort by"
            className="gap-0"
          >
            {[{ value: UNSORTED_VALUE, label: "Default order" }, ...fields].map(
              (field) => (
                <Label
                  key={field.value}
                  className="flex min-h-8 items-center gap-3 font-normal"
                >
                  <RadioGroupItem value={field.value} />
                  {field.label}
                </Label>
              )
            )}
          </RadioGroup>
        </div>
        {/* Which way only means something once a field is picked; in the list's own order it stays out of the way. */}
        {by && (
          <div className="border-t p-3">
            <ToggleGroup
              type="single"
              variant="outline"
              spacing={0}
              aria-label="Direction"
              value={value.direction}
              onValueChange={(direction) =>
                direction &&
                onChange({ ...value, direction: direction as SortDirection })
              }
              className="w-full"
            >
              <ToggleGroupItem value="asc" className="flex-1">
                <ArrowUpNarrowWideIcon data-icon="inline-start" />
                Ascending
              </ToggleGroupItem>
              <ToggleGroupItem value="desc" className="flex-1">
                <ArrowDownWideNarrowIcon data-icon="inline-start" />
                Descending
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
