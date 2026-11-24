"use client"

import type { ReactNode } from "react"

import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip/tooltip"
import { useTapOpen } from "../tooltip/use-tap-open"

/**
 * Why something can't be picked, removed or changed, on hover over it, as the keyboard lands on it, or on a tap on a
 * touch screen (a tap elsewhere closes it). Without a reason it renders its content as it
 * is. A disabled row turns pointer events off, so the content's own span takes them back for the tooltip. Prefer it to
 * a disabled control with no explanation.
 */
export function ReasonTooltip({
  reason,
  children,
}: {
  reason: string | null | undefined
  children: ReactNode
}) {
  const tap = useTapOpen()
  if (!reason) return children
  return (
    <Tooltip {...tap.root}>
      <TooltipTrigger asChild {...tap.trigger}>
        <span
          // Focusable, so a keyboard user hears the reason too: the disabled control inside can't take focus.
          tabIndex={0}
          className="pointer-events-auto flex min-w-0 flex-1 items-center gap-[inherit] rounded-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          {children}
        </span>
      </TooltipTrigger>
      <TooltipContent>{reason}</TooltipContent>
    </Tooltip>
  )
}
