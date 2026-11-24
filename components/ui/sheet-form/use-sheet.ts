"use client"

import { useId, useState } from "react"

/**
 * What a sheet or dialog shows and whether it is open. Closing keeps the record, so the sheet holds still as it
 * slides out. Each opening gets its own `key`, which gives it a fresh form, and its own `onOpenChange`, so a save that
 * lands after the user closed it and opened another cannot close or change the new one.
 */
export function useSheet<T>(initial: T) {
  // Unique per hook as well as per opening: sibling sheets on one page are keyed side by side.
  const id = useId()
  const [state, setState] = useState({
    open: false,
    record: initial,
    opened: 0,
  })
  const { opened } = state
  return {
    open: state.open,
    record: state.record,
    key: `${id}${opened}`,
    show: (record: T) =>
      setState((current) => ({
        open: true,
        record,
        opened: current.opened + 1,
      })),
    onOpenChange: (open: boolean) =>
      setState((current) =>
        current.opened === opened ? { ...current, open } : current
      ),
  }
}
