"use client"

import { useRef } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../alert-dialog/alert-dialog"
import { lastOpener, returnFocus } from "../return-focus/return-focus"

const DIALOG = '[role="dialog"], [role="alertdialog"]'

/**
 * What the confirm returns focus to. Usually what was last pressed, such as a row's icon or a sheet's Delete. A confirm
 * a key opened inside a sheet, such as Escape asking before discarding changes, was pressed from nowhere: the last
 * press is the page's button behind the sheet, so it returns to the field the user was typing in.
 */
function openedFrom() {
  const pressed = lastOpener()
  if (pressed?.closest(DIALOG)) return pressed
  const active = document.activeElement
  if (active instanceof HTMLElement && active.closest(DIALOG)) return active
  return pressed
}

/**
 * Asks before a change: a short title naming it ("Delete Contact?"), one line on the consequence the user must know,
 * then Cancel and the action, named ("Delete Contact"), never OK or Yes. The action is red by default, as most
 * confirms guard something that cannot be taken back; a step that adds rather than removes, such as Apply Template,
 * passes `variant="default"` for the primary color.
 *
 * Closing gives focus back to what opened it, even when that was a row's icon or a menu item outside any trigger. Its
 * buttons are `type="button"`, so a dialog opened inside a form never submits it.
 */
export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  action,
  cancel = "Cancel",
  variant = "destructive",
  disabled = false,
  onConfirm,
  children,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** The change as a question: "Delete Contact?", "Change to Demo?". */
  title: React.ReactNode
  /** The action's button, a verb and its object: "Delete Contact", "Apply Template". */
  action: string
  /** The button that backs out, such as Continue Editing before discarding changes. */
  cancel?: string
  /** Red for a change that removes or cannot be taken back; `default` (primary) for one that adds. */
  variant?: "destructive" | "default"
  /** The action cannot be taken yet, such as with nothing picked or nothing to do. */
  disabled?: boolean
  onConfirm: () => void
  /** The one line on the consequence: "This permanently deletes Dana Whitfield." */
  children: React.ReactNode
}) {
  const opener = useRef<HTMLElement | null>(null)
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        onOpenAutoFocus={() => (opener.current = openedFrom())}
        onCloseAutoFocus={(event) => {
          if (returnFocus(opener.current)) event.preventDefault()
        }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription className="w-full">
            {children}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel type="button">{cancel}</AlertDialogCancel>
          <AlertDialogAction
            type="button"
            variant={variant}
            disabled={disabled}
            onClick={onConfirm}
          >
            {action}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
