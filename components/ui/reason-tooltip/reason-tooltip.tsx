import type { ReactNode } from "react"

import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip/tooltip"

/**
 * Why something can't be picked, removed or changed, on hover over it. Without a reason it renders its content as it
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
  if (!reason) return children
  return (
    <Tooltip>
      <TooltipTrigger asChild>
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
