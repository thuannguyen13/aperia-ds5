"use client"

import { useState } from "react"
import { Trash2Icon } from "lucide-react"
import { Button } from "../button/button"
import { ConfirmDialog } from "../confirm-dialog/confirm-dialog"
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip/tooltip"
import { useTapOpen } from "../tooltip/use-tap-open"

// The reason a record in use can't be deleted, word for word as the copy rules fix it: one constant, shared with
// RecordActions.
import { IN_USE_DELETE } from "../app-shell/record-actions"
export { IN_USE_DELETE }

/**
 * A record sheet's Delete, for `SheetForm`'s `start`, and the confirm it asks first. The confirm opens over the sheet,
 * which stays as it was under it; `onDelete` runs on the confirm's action, and closing the sheet once it has gone is
 * the caller's, as only it knows the delete went through.
 *
 * `reason` blocks it, such as `IN_USE_DELETE` for a record that's in use. Blocked, it stays focusable through
 * aria-disabled rather than disabled, so a pointer and the keyboard both reach the tooltip that says why, which Radix
 * sets as its description.
 */
export function SheetDelete({
  title,
  action,
  onDelete,
  pending = false,
  reason,
  children,
}: {
  /** The confirm's title, the change as a question: "Delete Contact?". */
  title: React.ReactNode
  /** The confirm's button, a verb and its object: "Delete Contact". */
  action: string
  /** Runs on the confirm's action. Return a Promise to keep the confirm open, with a spinner, until it settles. */
  onDelete: () => void | Promise<unknown>
  /** While the sheet's save or the delete runs. */
  pending?: boolean
  /** Why it can't be deleted; blocks it while set. */
  reason?: string | null
  /** The confirm's one line on the consequence: "This permanently deletes Dana Whitfield." */
  children: React.ReactNode
}) {
  const [asking, setAsking] = useState(false)
  const tap = useTapOpen()
  const blocked = Boolean(reason)
  const button = (
    <Button
      type="button"
      variant="destructive"
      disabled={pending}
      aria-disabled={blocked || undefined}
      // Button styles only native disabled, so the look is repeated for aria-disabled.
      className="aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
      onClick={
        blocked ? (event) => event.preventDefault() : () => setAsking(true)
      }
    >
      <Trash2Icon data-icon="inline-start" />
      Delete
    </Button>
  )
  return (
    <>
      {blocked ? (
        <Tooltip {...tap.root}>
          <TooltipTrigger asChild {...tap.trigger}>
            {button}
          </TooltipTrigger>
          <TooltipContent>{reason}</TooltipContent>
        </Tooltip>
      ) : (
        button
      )}
      <ConfirmDialog
        open={asking}
        onOpenChange={setAsking}
        title={title}
        action={action}
        onConfirm={onDelete}
      >
        {children}
      </ConfirmDialog>
    </>
  )
}
