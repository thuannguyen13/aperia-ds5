"use client"

import { useRef, type ReactNode } from "react"
import { PencilIcon, Trash2Icon } from "lucide-react"
import { Badge } from "../badge/badge"
import { Field, FieldDescription, FieldError, FieldLabel } from "../field/field"
import { useFieldNote } from "../field-note/field-note"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "../select/select"
import { AddOption } from "../add-option/add-option"
import {
  PickerPicture,
  type EntityPicture,
} from "../entity-picker/entity-picture"
import type { Key } from "../entity-picker/picker-add"
import {
  useDraftAdd,
  type DraftAdd,
  type PickerRefusal,
} from "../entity-picker/use-picker-add"

// The Add row's value; the field lists no items of its own, so nothing else can be it.
const ADD = "add"
// Typeahead falls back to an item's text when this is empty; a zero-width space matches no key typed.
const NO_TYPEAHEAD = "​"

/**
 * A labeled field that picks from a short fixed list (a stage, a reason, a queue), each item shown by its name or
 * its own `label`; records are picked with EntityPicker. An empty list says `none`, which the feature that keeps the
 * list words: where items are added, never who to ask.
 */
export function PickField({
  id,
  label,
  items,
  value,
  placeholder,
  description,
  error,
  disabled,
  reason,
  none = "None yet.",
  onChange,
}: {
  id: string
  label: string
  items: { id: Key; name: string; label?: ReactNode }[]
  /** The picked item's id as a string, "" for none. */
  value: string
  placeholder: string
  description?: ReactNode
  error?: string
  disabled?: boolean
  /** Why it is disabled, under it while it is, such as "Pick a prospect first.", in place of `description`. */
  reason?: string | null
  none?: string
  onChange: (value: string) => void
}) {
  const under = useFieldNote({ disabled, reason, description })

  return (
    <Field data-invalid={Boolean(error)}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Select value={value} disabled={disabled} onValueChange={onChange}>
        <SelectTrigger
          id={id}
          className="w-full"
          aria-invalid={Boolean(error)}
          aria-describedby={under.describes}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectGroup>
            {items.map((item) => (
              <SelectItem key={item.id} value={String(item.id)}>
                {item.label ?? item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {items.length === 0 && !disabled && (
        <FieldDescription>{none}</FieldDescription>
      )}
      {under.note}
      <FieldError>{error}</FieldError>
    </Field>
  )
}

// The drafted item's value and its other rows'.
const DRAFTED = "drafted"
const EDIT = "edit"
const REMOVE = "remove"
/** What a part of a form already saved, ahead of the rest, says: it no longer changes there. */
export const SAVED = "Added. Edit it on its own page."

/**
 * A labeled field for an item that waits on the record its form is adding, so it is drafted rather than picked: the
 * list offers only the item's Add row, which opens its form in a sheet, and the form's save hands the draft back. The
 * draft then shows as a picked item does, with rows to change it or remove it. `saved` once it is saved with that
 * record: it stays, and is changed on its own page. `refusal` is what its save met, shown under the field and at the
 * form's field as it reopens.
 */
export function DraftField<T, R extends PickerRefusal = PickerRefusal>({
  id,
  label,
  placeholder,
  draft,
  shown,
  saved = false,
  description,
  refusal,
  disabled,
  reason,
  add,
  remove,
  onChange,
}: {
  id: string
  label: string
  placeholder: string
  draft: T | null
  /** The draft as a picked record shows: its picture, name, detail and badge. */
  shown: (draft: T) => {
    name: string
    picture?: EntityPicture
    detail?: ReactNode
    badge?: ReactNode
  }
  saved?: boolean
  description?: ReactNode
  refusal?: R
  disabled?: boolean
  /** Why it is disabled, under it while it is, such as "Add an opportunity first.", in place of `description`. */
  reason?: string | null
  add: DraftAdd<T, R>
  /** The Remove row's label, which names any draft that goes with this one. */
  remove?: string
  onChange: (draft: T | null) => void
}) {
  // What the rows name: the label without an optional field's "(Optional)".
  const noun = label.replace(/\s*\(Optional\)$/, "")
  const trigger = useRef<HTMLButtonElement>(null)
  // The row chosen that opens the sheet, which opens once the list has closed and given focus back.
  const opening = useRef(false)
  const adder = useDraftAdd({
    add,
    refusal,
    done: onChange,
    returnTo: () => trigger.current,
  })
  const item = draft === null ? null : shown(draft)
  const under = useFieldNote({ disabled, reason, description })

  return (
    <Field data-invalid={Boolean(refusal)}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Select
        value={item ? DRAFTED : ""}
        disabled={disabled || saved}
        onValueChange={(next) => {
          if (next === ADD || next === EDIT) opening.current = true
          else if (next === REMOVE) onChange(null)
        }}
      >
        <SelectTrigger
          ref={trigger}
          id={id}
          className="w-full"
          aria-invalid={Boolean(refusal)}
          aria-describedby={under.describes}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent
          position="popper"
          onCloseAutoFocus={() => {
            if (!opening.current) return
            opening.current = false
            adder.start(draft)
          }}
        >
          {item ? (
            <>
              <SelectGroup>
                <SelectItem value={DRAFTED}>
                  {item.picture && (
                    <PickerPicture
                      picture={item.picture}
                      name={item.name}
                      size="row"
                    />
                  )}
                  <span className="truncate">{item.name}</span>
                  {item.detail && (
                    <span className="truncate text-muted-foreground">
                      {item.detail}
                    </span>
                  )}
                  {typeof item.badge === "string" ? (
                    <Badge variant="secondary">{item.badge}</Badge>
                  ) : (
                    item.badge
                  )}
                </SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectItem value={EDIT} textValue={NO_TYPEAHEAD}>
                <PencilIcon aria-hidden />
                Edit {noun}
              </SelectItem>
              <SelectItem value={REMOVE} textValue={NO_TYPEAHEAD}>
                <Trash2Icon aria-hidden />
                {remove ?? `Remove ${noun}`}
              </SelectItem>
            </>
          ) : (
            <SelectItem value={ADD} textValue={NO_TYPEAHEAD}>
              <AddOption label={add.label} />
            </SelectItem>
          )}
        </SelectContent>
      </Select>
      {/* In place from the start, so a screen reader hears it once it is filled. */}
      <FieldDescription role="status" className={saved ? undefined : "sr-only"}>
        {saved ? SAVED : null}
      </FieldDescription>
      {under.note}
      <FieldError>{refusal?.error}</FieldError>
      {adder.sheet}
    </Field>
  )
}
