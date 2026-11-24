"use client"

import { useId } from "react"
import { Input } from "../input/input"
import { Label } from "../label/label"
import { cn } from "@/lib/utils"

/**
 * A span of days as two fields, From and To, each YYYY-MM-DD or empty to leave that end open: a list's day filter
 * (`ListToolbar`'s `dates` filter) and a dashboard's custom range. It holds nothing itself; `onChange` gets both days,
 * as typed, whichever one changed. The two are one group named `label`, or by the heading `labelledBy` points at.
 */
export function DayRangeFields({
  from,
  to,
  onChange,
  label,
  labelledBy,
  disabled,
  className,
}: {
  from: string
  to: string
  onChange: (from: string, to: string) => void
  label: string
  labelledBy?: string
  disabled?: boolean
  className?: string
}) {
  const id = useId()
  const field = (
    end: "From" | "To",
    value: string,
    change: (day: string) => void
  ) => (
    <span className="flex items-center gap-2">
      <Label
        htmlFor={`${id}-${end}`}
        className="text-xs font-normal text-muted-foreground"
      >
        {end}
      </Label>
      <Input
        id={`${id}-${end}`}
        type="date"
        className="w-34"
        value={value}
        disabled={disabled}
        onChange={(event) => change(event.target.value)}
      />
    </span>
  )
  return (
    <span
      role="group"
      aria-label={labelledBy ? undefined : label}
      aria-labelledby={labelledBy}
      className={cn("flex flex-wrap items-center gap-2", className)}
    >
      {field("From", from, (day) => onChange(day, to))}
      {field("To", to, (day) => onChange(from, day))}
    </span>
  )
}
