"use client"

import { useRef, useState } from "react"

/**
 * A tooltip that a tap opens too, for what a hover explains (why something is disabled, an exact time). Radix opens a
 * tooltip on hover and focus only, and closes it on a click, so on a touch screen the explanation never shows. Spread
 * `root` on `Tooltip` and `trigger` on `TooltipTrigger`: a tap shows the tooltip, a tap anywhere else closes it (Radix's
 * own outside press), and hover and focus work as before.
 */
export function useTapOpen() {
  const [open, setOpen] = useState(false)
  // Whether the press in progress is a finger, so the click and leave that follow a tap don't close the tooltip.
  const touch = useRef(false)
  return {
    root: { open, onOpenChange: setOpen },
    trigger: {
      onPointerDown: (event: React.PointerEvent) => {
        touch.current = event.pointerType === "touch"
        if (!touch.current) return
        // Skips Radix's own press handling, which closes an open tooltip.
        event.preventDefault()
        setOpen(true)
      },
      onPointerLeave: (event: React.PointerEvent) => {
        // A finger lifting also "leaves" the trigger; only a mouse leaving closes it.
        if (event.pointerType === "touch") event.preventDefault()
      },
      onClick: (event: React.MouseEvent) => {
        // Radix closes the tooltip on click; after a tap it stays until the next tap elsewhere.
        if (touch.current) event.preventDefault()
      },
    },
  }
}
