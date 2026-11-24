"use client"

import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip/tooltip"
import { ago, formatDate, formatMoment, ZONE } from "@/lib/format"

/**
 * How long ago, as "3d ago", with the exact date on hover, and the time and zone for a moment: "3d ago" alone cannot be
 * checked. `value` is a YYYY-MM-DD day, an ISO moment string or a Date. `label` leads it inside the hover target, so
 * "Created 4mo ago" shows the date wherever it is pointed at; after a label it reads lowercase, "Created today", as the
 * middle of a sentence.
 */
export function RelativeTime({
  value,
  label,
  zone = ZONE,
  className,
}: {
  value: string | Date
  label?: string
  /** The zone a day starts in and a time is written in; Dallas by default, as every Aperia team works from it. */
  zone?: string
  className?: string
}) {
  // A string with a time in it is a moment, as a Date is; a bare YYYY-MM-DD is a day, which has no time to show.
  const moment =
    value instanceof Date ? value : value.includes("T") ? new Date(value) : null
  const said = ago(value, zone)
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {/* A minute label can differ between the server's render and the browser's first one. */}
        <time
          suppressHydrationWarning
          dateTime={moment ? moment.toISOString() : (value as string)}
          className={className}
        >
          {label ? `${label} ${said.toLowerCase()}` : said}
        </time>
      </TooltipTrigger>
      <TooltipContent>
        {moment ? formatMoment(moment, zone) : formatDate(value as string)}
      </TooltipContent>
    </Tooltip>
  )
}
