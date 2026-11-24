import type { ComponentType, ReactNode } from "react"

import { RelativeTime } from "@/components/ui/relative-time/relative-time"
import { cn } from "@/lib/utils"

/**
 * A record's history as a timeline: each entry led by an icon on a line that threads the entries together and stops at
 * the last. The one look of Activity on every record's page; what each entry says stays with the app.
 */
export function Timeline({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return <ol className={cn("flex flex-col text-xs", className)}>{children}</ol>
}

/**
 * One entry: its icon (with `title` on hover and read aloud, and an optional `badge` over its corner), then `children`
 * beside it, usually `TimelineSaid` and `TimelineWhen`. A list whose entries open with a box (`boxed`, as notes do)
 * drops each icon the box's 8px padding to center it on the first line of text, and each line reaches the same 8px
 * further down to meet the next icon.
 */
export function TimelineEntry({
  icon: Icon,
  title,
  badge,
  last = false,
  boxed = false,
  children,
}: {
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>
  /** What kind of entry it is, such as "Stage change": the icon's tooltip, and read before the entry. */
  title: string
  /** Sits over the icon's corner, such as a check on a task done. */
  badge?: ReactNode
  /** The last entry draws no line below its icon. */
  last?: boolean
  boxed?: boolean
  children: ReactNode
}) {
  return (
    <li className="flex gap-4">
      <div className="flex flex-col items-center">
        {/* The icon is the node, centered on the line; a badge sits over its corner, out of the flow, so an entry without
            one keeps the same layout. */}
        <span
          className={cn(
            "relative flex size-5 shrink-0 items-center justify-center text-muted-foreground",
            boxed && "mt-2"
          )}
          title={title}
        >
          <Icon className="size-3.5" aria-hidden />
          {badge}
        </span>
        {/* Held off both nodes, so the line reads as joining them rather than touching them; closer to the node below,
            whose badge weighs its bottom and makes an even gap above it look wider. */}
        {!last && (
          <span
            aria-hidden
            className={cn(
              "mt-1 mb-0.5 w-px flex-1 bg-border",
              boxed && "-mb-1.5"
            )}
          />
        )}
      </div>
      <div
        className={cn(
          "flex min-w-0 flex-1 flex-col items-start",
          !last && "pb-3"
        )}
      >
        {/* A title attribute is shown on hover but not reliably read, so the kind is said here too. */}
        <span className="sr-only">{title}: </span>
        {children}
      </div>
    </li>
  )
}

/** What happened, as a sentence: 14px on a 20px line, so its first line centers on the node. */
export function TimelineSaid({ children }: { children: ReactNode }) {
  return <p className="text-sm leading-5 text-muted-foreground">{children}</p>
}

/** When, then who, then anything else (such as the record it happened on), quietly on a line of its own. */
export function TimelineWhen({
  date,
  user,
  children,
}: {
  date: Date | string
  /** Who did it; null or absent for the system. */
  user?: string | null
  children?: ReactNode
}) {
  return (
    <div className="flex max-w-full min-w-0 items-center gap-1.5 leading-5 text-muted-foreground">
      {/* Capitalized where it starts the line: "Today", not the mid-sentence "today" RelativeTime says after a label. */}
      <span className="shrink-0 first-letter:uppercase">
        <RelativeTime value={date} />
      </span>
      {user && (
        <>
          <span aria-hidden>·</span>
          <span className="shrink-0">{user}</span>
        </>
      )}
      {children}
    </div>
  )
}
