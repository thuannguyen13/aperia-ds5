"use client"

import { useId, useState } from "react"
import { ChevronDownIcon } from "lucide-react"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card/card"
import { cn } from "@/lib/utils"

/**
 * A card headed by its title, with an optional figure beside it and an action at the right, all on one 2rem
 * row so every card's first line lines up, and an optional description under it.
 *
 * Each part owns its space; the card adds no gap or vertical padding. The header is 56px (12px above and below its 2rem
 * row, the height of the top bar and a sheet header), a table follows it straight to the card's edges, and padded
 * content brings its own padding (`<CardContent className="pb-4">`). So hiding a part, such as a collapsed card's
 * content, takes exactly that part's space with it, and nothing has to add space back.
 *
 * `collapsible` makes the title a disclosure: the title and a chevron after it are one button that shows and hides the
 * content, never "Show" or "Hide" text buttons. The chevron follows the title so the title keeps every card's x. `defaultOpen` (true by default) sets where it starts.
 */
export function TitledCard({
  id,
  title,
  figure,
  description,
  action,
  collapsible = false,
  defaultOpen = true,
  className,
  children,
}: {
  /** An anchor, so a link elsewhere can open the page at this card. */
  id?: string
  title: React.ReactNode
  figure?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  collapsible?: boolean
  defaultOpen?: boolean
  className?: string
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)
  const contentId = useId()
  return (
    <Card id={id} className={cn("gap-0 py-0", className)}>
      {/* A wrapping row rather than the design system's grid: where the title and the action do not fit side by side,
          on a phone, the action drops under the title instead of squeezing it or running past the card's edge. */}
      <CardHeader className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-3">
        {/* The figure sits beside the title. */}
        <div className="flex min-h-8 flex-wrap content-center items-baseline gap-x-3">
          <CardTitle role="heading" aria-level={2}>
            {collapsible ? (
              <button
                type="button"
                aria-expanded={open}
                aria-controls={contentId}
                onClick={() => setOpen((was) => !was)}
                className="flex items-center gap-1 rounded-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {title}
                <ChevronDownIcon
                  aria-hidden
                  className={cn(
                    "size-4 text-muted-foreground transition-transform",
                    !open && "-rotate-90"
                  )}
                />
              </button>
            ) : (
              title
            )}
          </CardTitle>
          {figure !== undefined && (
            <p className="text-sm text-muted-foreground tabular-nums">
              {figure}
            </p>
          )}
        </div>
        {description !== undefined && (
          <CardDescription className="order-last basis-full">
            {description}
          </CardDescription>
        )}
        {/* Centered on the row: a 32px button fills it, and a shorter legend would otherwise sit above the title's line.
            ml-auto keeps it on the right when it drops under the title. */}
        {action !== undefined && (
          <CardAction className="ml-auto flex items-center gap-2 self-center">
            {action}
          </CardAction>
        )}
      </CardHeader>
      {collapsible ? (
        // display: contents only while open, as it would override the hidden attribute.
        <div
          id={contentId}
          hidden={!open}
          className={open ? "contents" : undefined}
        >
          {children}
        </div>
      ) : (
        children
      )}
    </Card>
  )
}
