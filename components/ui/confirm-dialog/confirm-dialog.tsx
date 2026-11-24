"use client"

import { useRef, useState } from "react"
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
import { Spinner } from "../spinner/spinner"

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
 * When `onConfirm` returns a Promise, the dialog waits for it: the action keeps its label beside a spinner, Cancel is
 * disabled, and the dialog stays open and ignores Escape until the Promise settles. It closes once the Promise
 * resolves. If it rejects, the dialog stays open with one line in red above its buttons (`error`, "Delete Contact
 * failed. Try again." by default), and the action can be pressed again. An `onConfirm` that returns nothing closes the
 * dialog at once, as before. `pending` shows the same working state for an action the app tracks itself.
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
  pending: pendingProp = false,
  error: errorText,
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
  /** The action is running, tracked by the app: the same working state a Promise from `onConfirm` shows. */
  pending?: boolean
  /** The line shown when the Promise from `onConfirm` rejects; the action's name plus "failed. Try again." by default. */
  error?: string
  /** Runs on the action. Return a Promise to keep the dialog open, with a spinner, until it settles. */
  onConfirm: () => void | Promise<unknown>
  /** The one line on the consequence: "This permanently deletes Dana Whitfield." */
  children: React.ReactNode
}) {
  const opener = useRef<HTMLElement | null>(null)
  const [running, setRunning] = useState(false)
  const [failed, setFailed] = useState(false)
  const pending = pendingProp || running
  return (
    <AlertDialog
      open={open}
      onOpenChange={(next) => {
        // While the action runs, Escape and Cancel don't close it: the result has to land somewhere.
        if (pending && !next) return
        onOpenChange(next)
      }}
    >
      <AlertDialogContent
        onOpenAutoFocus={() => {
          opener.current = openedFrom()
          // Each opening starts clean: the last failure belonged to the last try.
          setFailed(false)
        }}
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
        {failed && (
          <p role="alert" className="text-sm text-destructive">
            {errorText ?? `${action} failed. Try again.`}
          </p>
        )}
        <AlertDialogFooter>
          <AlertDialogCancel type="button" disabled={pending}>
            {cancel}
          </AlertDialogCancel>
          <AlertDialogAction
            type="button"
            variant={variant}
            disabled={disabled || pending}
            onClick={(event) => {
              const result = onConfirm()
              if (!isPromise(result)) return
              // Radix closes the dialog on the action's click; a Promise keeps it open until it settles.
              event.preventDefault()
              setFailed(false)
              setRunning(true)
              result.then(
                () => {
                  setRunning(false)
                  onOpenChange(false)
                },
                () => {
                  setRunning(false)
                  setFailed(true)
                }
              )
            }}
          >
            {pending && <Spinner data-icon="inline-start" />}
            {action}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

const isPromise = (value: unknown): value is Promise<unknown> =>
  typeof (value as Promise<unknown> | undefined)?.then === "function"
