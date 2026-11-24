"use client"

import { createContext, useContext, useEffect, useRef, useState } from "react"
import { Button } from "../button/button"
import { ConfirmDialog } from "../confirm-dialog/confirm-dialog"
import { FieldError } from "../field/field"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../sheet/sheet"
import { Spinner } from "../spinner/spinner"
import { useReturnFocus } from "../return-focus/return-focus"
import type { SheetFormStatus } from "./use-sheet-form"
import { cn } from "@/lib/utils"

const FOCUSABLE =
  'input, textarea, select, button, [tabindex]:not([tabindex="-1"])'

/** What the form in a `FormSheet` reports, so a close the user asks for can wait for the save or ask first. */
type Guard = { dirty: boolean; pending: boolean }
const GuardContext = createContext<{ current: Guard } | null>(null)

/**
 * The sheet a record is added or edited in: from the right, a 56px header with its title over a line, and the form
 * under it, which is a `SheetForm`. Every form opens in one, so they all look and close alike.
 *
 * Closing it, by Cancel, the ×, Escape or a click outside, waits while a save runs, as what it will have saved isn't
 * known yet, and asks first with Discard Changes? once something was typed. A save that went through closes it
 * by calling `onOpenChange(false)` itself, which asks nothing. The form inside reports what was typed through its
 * `form`, so the check works wherever `useSheetForm` sits, in the sheet's component or a form component inside it.
 */
export function FormSheet({
  open,
  onOpenChange,
  title,
  description,
  className,
  onCloseAutoFocus,
  children,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** "Add Contact", "Edit Prospect". */
  title: React.ReactNode
  description?: React.ReactNode
  /** Widens it for a long form: `data-[side=right]:sm:max-w-2xl`. 576px by default. */
  className?: string
  /**
   * Where focus goes as the sheet closes, Radix's hook: call `event.preventDefault()` and focus something else, as a
   * picker's Add sheet gives focus back to the picker it opened from.
   */
  onCloseAutoFocus?: (event: Event) => void
  children: React.ReactNode
}) {
  const guard = useRef<Guard>({ dirty: false, pending: false })
  const [asking, setAsking] = useState(false)
  function change(next: boolean) {
    if (next) onOpenChange(true)
    else if (guard.current.pending) return
    else if (guard.current.dirty) setAsking(true)
    else onOpenChange(false)
  }
  return (
    <GuardContext value={guard}>
      <Sheet open={open} onOpenChange={change}>
        <SheetContent
          side="right"
          // Without a description nothing describes it, rather than Radix warning that nothing does.
          {...(description === undefined && { "aria-describedby": undefined })}
          className={cn("data-[side=right]:sm:max-w-xl", className)}
          onCloseAutoFocus={onCloseAutoFocus}
        >
          <SheetHeader className="border-b">
            <SheetTitle>{title}</SheetTitle>
            {description !== undefined && (
              <SheetDescription>{description}</SheetDescription>
            )}
          </SheetHeader>
          {children}
        </SheetContent>
      </Sheet>
      <ConfirmDialog
        open={asking}
        onOpenChange={setAsking}
        title="Discard Changes?"
        action="Discard Changes"
        cancel="Continue Editing"
        onConfirm={() => onOpenChange(false)}
      >
        What you entered in this form is lost.
      </ConfirmDialog>
    </GuardContext>
  )
}

/**
 * The body and footer of a sheet that adds or edits a record: the fields scroll between the sheet's header and a
 * footer that stays put, holding Cancel and the save. While the save runs the fieldset disables every field, so
 * nothing changes under it, and the save keeps its label beside a spinner.
 *
 * `form` is the form's `useSheetForm`. A failed check or refusal moves focus to the first field in error, and a
 * refusal no field shows sits above the buttons. The browser's own validation is off, so every message comes from the
 * form. The sheet stays open with what was typed; no toast.
 *
 * `readOnly` shows a record to someone who may not change it, such as one who may only delete it: the fields stay
 * disabled and the footer holds Close and `start` alone.
 *
 * Closing gives focus back to what opened the sheet. A form opened from somewhere that returns focus itself, such as a
 * picker's Add sheet, sits inside `OpenerReturnsFocus` and leaves it to that.
 */
export function SheetForm({
  form,
  onSubmit,
  pending,
  submit,
  ready = true,
  readOnly = false,
  start,
  beside,
  children,
}: {
  form: SheetFormStatus & { dirty?: boolean }
  onSubmit: () => void
  pending: boolean
  /** The save button's label, a verb and its object: "Save Changes", "Add Contact". */
  submit: string
  /**
   * @deprecated Leave the save button enabled and check on save, so pressing it shows what is missing (Errors and
   * Validation). False still disables the button, for apps that set it.
   */
  ready?: boolean
  readOnly?: boolean
  /** Set apart at the footer's start, such as the record's `SheetDelete`, as a record's sheet keeps it off its row. */
  start?: React.ReactNode
  /** Between Cancel and the save, a step taken before saving, such as an email's Preview. */
  beside?: React.ReactNode
  children: React.ReactNode
}) {
  useReturnFocus()
  const element = useRef<HTMLFormElement>(null)
  const handled = useRef(form.failures)

  // Tells the FormSheet around it, if any, whether closing should wait or ask.
  const guard = useContext(GuardContext)
  const dirty = !readOnly && Boolean(form.dirty)
  useEffect(() => {
    if (!guard) return
    guard.current = { dirty, pending }
    return () => {
      guard.current = { dirty: false, pending: false }
    }
  }, [guard, dirty, pending])

  // After the fields re-render with their messages, and once the fieldset is enabled again after a refused save.
  useEffect(() => {
    if (pending || form.failures === handled.current) return
    handled.current = form.failures
    const invalid = element.current?.querySelector<HTMLElement>(
      '[aria-invalid="true"], [data-invalid="true"]'
    )
    if (!invalid) {
      form.unplaced()
      return
    }
    const field = invalid.matches(FOCUSABLE)
      ? invalid
      : invalid.querySelector<HTMLElement>(FOCUSABLE)
    field?.focus({ preventScroll: true })
    invalid.scrollIntoView({ block: "center" })
  }, [form, pending])

  return (
    <form
      ref={element}
      noValidate
      className="flex min-h-0 flex-1 flex-col"
      onSubmit={(event) => {
        event.preventDefault()
        if (!readOnly) onSubmit()
      }}
      onBlur={form.revalidate}
    >
      {/* The fields scroll in a box of their own: a fieldset does not scroll in a sheet sized to what it holds. */}
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
        {/* As tall as the box at least, by flex: a fieldset's inner box ignores a min-height, so a field could not take
            what is left, as an email's message does. Shrinks to nothing never, so a long form still scrolls. */}
        <fieldset
          disabled={pending || readOnly}
          className="flex min-w-0 flex-none grow flex-col p-4"
        >
          {children}
        </fieldset>
      </div>
      {/* With a message, the line above the footer moves to above it, so the message reads with the buttons. */}
      {form.refusal && (
        <FieldError className="border-t px-4 pt-3">{form.refusal}</FieldError>
      )}
      {/* On a phone the footer wraps, the start, a Delete with its reason, on a line above the buttons. */}
      <SheetFooter
        className={cn(
          "flex-row flex-wrap justify-end sm:flex-nowrap",
          !form.refusal && "border-t"
        )}
      >
        {start && <div className="mr-auto max-sm:basis-full">{start}</div>}
        <SheetClose asChild>
          {/* Read-only, focus starts on Close rather than the first button in the footer, a red Delete. */}
          <Button
            type="button"
            variant={readOnly ? "outline" : "ghost"}
            autoFocus={readOnly}
          >
            {readOnly ? "Close" : "Cancel"}
          </Button>
        </SheetClose>
        {beside}
        {!readOnly && (
          <Button
            type="submit"
            disabled={pending || !ready}
            aria-busy={pending || undefined}
          >
            {pending && <Spinner data-icon="inline-start" />}
            {submit}
          </Button>
        )}
      </SheetFooter>
    </form>
  )
}
