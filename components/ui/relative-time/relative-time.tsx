"use client"

import { useSyncExternalStore } from "react"
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip/tooltip"
import { useTapOpen } from "../tooltip/use-tap-open"
import { ago, formatDate, formatMoment, ZONE } from "@/lib/format"
import { cn } from "@/lib/utils"

// The clock, read only in the browser and once a minute. A server render or a prerender (Next.js 16 refuses a clock
// read there) gets null, so "3d ago" is worked out in the browser and stays current while the page is open.
const MINUTE = 60_000
function subscribe(tick: () => void) {
  const timer = setInterval(tick, MINUTE)
  return () => clearInterval(timer)
}
const minuteNow = () => Math.floor(Date.now() / MINUTE) * MINUTE
const noClock = () => null

/**
 * How long ago, as "3d ago", with the exact date on hover or on a tap on a touch screen, and the time and zone for a moment: "3d ago" alone cannot be
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
  const now = useSyncExternalStore(subscribe, minuteNow, noClock)
  const tap = useTapOpen()
  const dateTime = moment ? moment.toISOString() : (value as string)
  if (now === null) {
    // Before the browser has the clock: a stand-in of about the same width, unseen, so nothing moves when it lands.
    return (
      <time dateTime={dateTime} className={cn("invisible", className)}>
        {label ? `${label} 3d ago` : "3d ago"}
      </time>
    )
  }
  const said = ago(value, zone, now)
  return (
    <Tooltip {...tap.root}>
      <TooltipTrigger asChild {...tap.trigger}>
        <time dateTime={dateTime} className={className}>
          {label ? `${label} ${said.toLowerCase()}` : said}
        </time>
      </TooltipTrigger>
      <TooltipContent>
        {moment ? formatMoment(moment, zone) : formatDate(value as string)}
      </TooltipContent>
    </Tooltip>
  )
}
