"use client"

import { useState, type ReactNode } from "react"
import { ClockIcon } from "lucide-react"

import { Button } from "../button/button"
import { CardContent } from "../card/card"
import { EmptyState } from "../empty-state/empty-state"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../sheet/sheet"
import { TitledCard } from "../titled-card/titled-card"

/** How many entries the card shows, about a screen's worth, so the page keeps one scroll. */
const LATEST = 10

/**
 * A record's history in a card, newest first: the latest ten on the page and, past that, View All in the header opening
 * every entry in a sheet that scrolls on its own, so the page never nests a scroll. `list` draws the entries it is
 * given (usually a `Timeline`), so the card and the sheet draw them the same way. A record's notes are the same card,
 * titled Notes with their own empty state and `add`, which sits in the header beside View All while there are entries,
 * as every card's Add does; while there are none, the empty state holds it.
 */
export function RecordActivity<T>({
  items,
  list,
  title = "Activity",
  empty = <EmptyState icon={ClockIcon} title="No Activity" />,
  add,
  latest = LATEST,
  id,
  className,
}: {
  /** Every entry, newest first. */
  items: readonly T[]
  list: (items: readonly T[]) => ReactNode
  title?: string
  /** Shown while there are no entries; give it the Add button when there is one. */
  empty?: ReactNode
  /** The card's Add, in its header while there are entries. */
  add?: ReactNode
  /** How many the card shows before View All. */
  latest?: number
  id?: string
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const viewAll = items.length > latest && (
    <Button variant="outline" onClick={() => setOpen(true)}>
      {`View All ${title}`}
    </Button>
  )
  const shownAdd = items.length > 0 && add
  return (
    <TitledCard
      id={id}
      title={title}
      action={
        viewAll || shownAdd ? (
          <span className="flex flex-wrap gap-2">
            {viewAll}
            {shownAdd}
          </span>
        ) : undefined
      }
      className={className}
    >
      <CardContent className="pb-4">
        {items.length === 0 ? empty : list(items.slice(0, latest))}
      </CardContent>
      {viewAll && (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent
            aria-describedby={undefined}
            side="right"
            className="data-[side=right]:sm:max-w-xl"
          >
            <SheetHeader className="border-b">
              <SheetTitle>{title}</SheetTitle>
            </SheetHeader>
            <div className="min-h-0 flex-1 overflow-y-auto p-4">
              {list(items)}
            </div>
          </SheetContent>
        </Sheet>
      )}
    </TitledCard>
  )
}
