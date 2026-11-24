"use client"

import { createContext, useContext, useEffect } from "react"

// What a sheet or confirm dialog gives focus back to when it closes. They open from buttons outside any Radix trigger
// (a row's icon, a menu item), so Radix had nothing to return to and focus fell to the start of the page: a keyboard
// user who edited row 20 tabbed through the sidebar and 80 row stops to get back.

// A menu's or list's items go when it closes; the button that opened it is the one to return to.
const POPUP = '[role="menu"], [role="listbox"]'
const DIALOG = '[role="dialog"], [role="alertdialog"]'
const FOCUSABLE =
  'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'

let opener: HTMLElement | null = null
let listening = false

// Listens from the moment the library loads, not from the first dialog: a sheet's form mounts only as the sheet opens,
// after the press that opened it, so a listener added then would miss it.
if (typeof document !== "undefined" && !listening) {
  listening = true
  // A press counts as well as focus: Safari does not focus a button it clicks.
  document.addEventListener(
    "pointerdown",
    (event) => {
      if (!(event.target instanceof Element) || event.target.closest(POPUP))
        return
      opener = event.target.closest<HTMLElement>(FOCUSABLE)
    },
    true
  )
  // Focus moving into a dialog is the dialog opening, not something that opens one. Focus moving within one dialog is
  // the user at work in it, and what a confirm opened from there returns to: Save Changes, not the row behind the sheet.
  document.addEventListener(
    "focusin",
    (event) => {
      if (!(event.target instanceof HTMLElement)) return
      if (event.target.closest(POPUP)) return
      const dialog = event.target.closest(DIALOG)
      const from =
        event.relatedTarget instanceof Element
          ? event.relatedTarget.closest(DIALOG)
          : null
      if (dialog && dialog !== from) return
      opener = event.target
    },
    true
  )
}

/** What the user last pressed or focused outside a menu, read as a dialog opens: the element it returns focus to. */
export const lastOpener = () => opener

/** Focuses `element` as a dialog closes, if it is still on the page; true when it did. */
export function returnFocus(element: HTMLElement | null) {
  if (!element?.isConnected) return false
  element.focus({ preventScroll: true })
  return true
}

/**
 * True around a form whose opener gives focus back itself, such as a picker's Add sheet, which returns focus to the
 * picker rather than to the page behind both forms. Render `<OpenerReturnsFocus value>` around the form it opens.
 */
export const OpenerReturnsFocus = createContext(false)

/**
 * For a component mounted inside a dialog: when it unmounts, the dialog has closed, and focus goes back to its opener.
 * `skip` leaves it to a dialog that returns focus itself; inside `OpenerReturnsFocus` it is skipped too.
 */
export function useReturnFocus(skip = false) {
  const skipped = useContext(OpenerReturnsFocus) || skip
  useEffect(() => {
    if (skipped) return
    const element = lastOpener()
    return () => {
      returnFocus(element)
    }
  }, [skipped])
}
