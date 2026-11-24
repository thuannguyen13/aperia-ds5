"use client"

import * as React from "react"

import { FieldDescription } from "../field/field"

/**
 * The line under a field: why it's disabled while it is, such as "Pick a prospect first.", in place of its
 * description. The field keeps its placeholder, which says what goes in it, so the reason is never said there.
 * `describes` is the id to add to the field's aria-describedby, or undefined while nothing shows.
 */
export function useFieldNote({
  disabled,
  reason,
  description,
}: {
  disabled?: boolean
  reason?: string | null
  description?: React.ReactNode
}) {
  const id = React.useId()
  const shown = disabled && reason ? reason : description
  return {
    describes: shown ? id : undefined,
    note: shown ? <FieldDescription id={id}>{shown}</FieldDescription> : null,
  }
}

/** Joins the ids that describe a field, or undefined when there are none. */
export const describedBy = (...ids: (string | undefined)[]) =>
  ids.filter(Boolean).join(" ") || undefined
