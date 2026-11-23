import type { KeyboardEvent, MouseEvent } from "react"

const FOCUS =
  "focus-visible:bg-muted/50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"

// A click on one of these is the control's own, not the row's.
const CONTROLS =
  "a, button, input, select, textarea, [role=button], [role=combobox], [role=menuitem], [role=option], [role=dialog]"

/**
 * Props for a table row that holds controls of its own, such as links to other records: a click anywhere else on it
 * opens its record, and it is one Tab stop, opened by Enter or Space and named for screen readers. It takes no role,
 * as a button cannot hold other controls; a row with none uses `openable`. A click on another control, one that ends a
 * text selection, or one in a menu or dialog the row opened (React bubbles it through the portal) stays its own.
 * Spread it on `TableRow`; a caller with its own look merges its className with this one through `cn()`.
 */
export function opensOnClick(label: string, onOpen: () => void) {
  return {
    // Gives the row the pointer (base.css), which the browser gives only a link or a button.
    "data-opens": "",
    tabIndex: 0,
    "aria-label": label,
    className: FOCUS,
    onClick: (event: MouseEvent) => {
      if (!event.currentTarget.contains(event.target as Node)) return
      if ((event.target as Element).closest(CONTROLS)) return
      if (window.getSelection()?.toString()) return
      onOpen()
    },
    onKeyDown: (event: KeyboardEvent) => {
      // A key on a control inside the row is that control's.
      if (event.target !== event.currentTarget) return
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault()
        onOpen()
      }
    },
  } as const
}

/**
 * Props that make a row (or a card) with no controls inside open its record like a link: a button for screen readers,
 * focusable, and opened by click, Enter or Space. A props helper rather than a wrapper, since the row is `TableRow`.
 */
export function openable(label: string, onOpen: () => void) {
  return {
    role: "button",
    tabIndex: 0,
    "aria-label": label,
    className: FOCUS,
    onClick: onOpen,
    onKeyDown: (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault()
        onOpen()
      }
    },
  } as const
}
