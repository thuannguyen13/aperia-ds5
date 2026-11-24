"use client"

import { useLayoutEffect, useRef, type ComponentProps } from "react"

import { Field, FieldError, FieldLabel } from "../field/field"
import { describedBy, useFieldNote } from "../field-note/field-note"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../input-group/input-group"
import { HIDDEN_MONEY } from "@/lib/format"
import { cn } from "@/lib/utils"

/** The hidden shape without its $, since the field's own $ stands before it. */
const HIDDEN_DIGITS = HIDDEN_MONEY.replace(/^\$/, "")

/** "1234567.5" as "1,234,567.5": the whole part grouped by thousands, anything after the point as typed. */
const group = (raw: string) => {
  const [whole, ...rest] = raw.split(".")
  return [whole.replace(/\B(?=(\d{3})+(?!\d))/g, ","), ...rest].join(".")
}

/** What was typed or pasted, without the $, commas and spaces: digits and a point. */
const clean = (text: string) => text.replace(/[^\d.]/g, "")

/**
 * A dollar amount: a $ before the number and thousands separators in it. The value it holds, and passes to
 * `onChange`, stays plain digits ("1234567"), so what is validated and saved is unchanged. With `amountHidden` the
 * viewer may not see or set it: the field is disabled, empty, shows the hidden shape and is named as hidden. Every
 * field for an amount that can be hidden goes through here, so that is wired once.
 */
export function MoneyInput({
  value,
  onChange,
  amountHidden,
  hiddenLabel = "amount hidden",
  className,
  ...props
}: Omit<
  ComponentProps<typeof InputGroupInput>,
  "value" | "onChange" | "type"
> & {
  value: string
  onChange: (value: string) => void
  amountHidden?: boolean
  /** Added to the field's name while the amount is hidden, so a screen reader says so. */
  hiddenLabel?: string
}) {
  const input = useRef<HTMLInputElement>(null)
  // Where the caret was, as a count of digits before it, since adding a comma moves every character after it.
  const caret = useRef<number | null>(null)

  useLayoutEffect(() => {
    const field = input.current
    if (
      field === null ||
      caret.current === null ||
      document.activeElement !== field
    )
      return
    let seen = 0
    let at = 0
    while (at < field.value.length && seen < caret.current)
      if (/[\d.]/.test(field.value[at++])) seen++
    field.setSelectionRange(at, at)
    caret.current = null
  })

  return (
    <InputGroup>
      <InputGroupAddon>$</InputGroupAddon>
      <InputGroupInput
        {...props}
        {...(amountHidden && {
          disabled: true,
          placeholder: HIDDEN_DIGITS,
          "aria-label": [props["aria-label"], hiddenLabel]
            .filter(Boolean)
            .join(", "),
        })}
        ref={input}
        type="text"
        inputMode="decimal"
        className={cn("tabular-nums", className)}
        value={amountHidden ? "" : group(clean(value))}
        onChange={(event) => {
          const text = event.target.value
          caret.current = clean(
            text.slice(0, event.target.selectionStart ?? text.length)
          ).length
          onChange(clean(text))
        }}
      />
    </InputGroup>
  )
}

/**
 * A labeled dollar field. With a `reason` the viewer may not see or set the amount: the field is hidden as MoneyInput
 * does, with the reason under it, as a field that must wait for another is.
 */
export function MoneyField({
  id,
  label,
  description,
  error,
  reason,
  ...input
}: Omit<
  ComponentProps<typeof MoneyInput>,
  "id" | "disabled" | "amountHidden" | "aria-label"
> & {
  id: string
  label: string
  /** A line under the field while it can be set, such as what the amount covers. */
  description?: React.ReactNode
  error?: string
  /** Why the viewer may not see or set the amount. */
  reason?: string | null
}) {
  const under = useFieldNote({
    disabled: Boolean(reason),
    reason,
    description,
  })
  return (
    <Field data-invalid={Boolean(error)}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <MoneyInput
        {...input}
        id={id}
        amountHidden={Boolean(reason)}
        aria-label={label}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(
          input["aria-describedby"],
          under.describes
        )}
      />
      {under.note}
      <FieldError>{error}</FieldError>
    </Field>
  )
}
