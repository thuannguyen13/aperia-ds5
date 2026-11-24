"use client"

import { useEffect } from "react"

// What a picker needs to work inside a sheet: a picker renders its list at the end of the page, outside the sheet, and
// the sheet claims scroll and Escape for itself.

/**
 * A modal sheet cancels every wheel and touch scroll that reaches the page from outside it, which the list is. Stopped
 * natively on the list: React listens on the page too, so its handlers come too late. Pass as the list's `ref`.
 */
export function keepScroll(node: HTMLElement | null) {
  if (!node) return
  const stop = (event: Event) => event.stopPropagation()
  node.addEventListener("wheel", stop)
  node.addEventListener("touchmove", stop)
  return () => {
    node.removeEventListener("wheel", stop)
    node.removeEventListener("touchmove", stop)
  }
}

/**
 * Escape closes an open list, not the sheet around it. The sheet listens for Escape on the document before any field
 * hears it and closed itself, dropping the form; the window hears the key first, so the list takes it there.
 */
export function useEscapeClosesList(open: boolean, close: () => void) {
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      event.stopPropagation()
      close()
    }
    window.addEventListener("keydown", onKey, { capture: true })
    return () => window.removeEventListener("keydown", onKey, { capture: true })
  }, [open, close])
}
