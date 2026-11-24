"use client"

import { useRef, useState } from "react"

/**
 * What the form checks with: any schema with zod's `safeParse`, read by shape so the library doesn't depend on zod.
 * A zod object schema fits as it is.
 */
export type FormSchema<T = unknown> = {
  safeParse: (input: unknown) =>
    | { success: true; data: T }
    | {
        success: false
        error: { issues: { path: PropertyKey[]; message: string }[] }
      }
  /** An object schema's fields, read to send an emptied field as null where it takes null. */
  shape?: unknown
}

/** A save the server refused: the message, and the field it names if any ("name", "lines.0.productId"). */
export type FormRefusal = { error: string; field?: string }

/** What `SheetForm` reads from a form: the message for the form as a whole, and when to focus. */
export type SheetFormStatus = {
  /** A refusal no field shows, for the line above the buttons. */
  refusal: string | undefined
  /** Counts failed checks and refusals, so the sheet moves focus to the first field in error after each. */
  failures: number
  /** Called when no field on screen shows the error: the line above the buttons says it instead. */
  unplaced: () => void
  /** Checks again, as a field loses focus, the fields that have shown an error. */
  revalidate: () => void
}

const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b)
const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value)
/** The value under an error's key, such as "name" or "lines.0.productId". */
const at = (value: unknown, path: string) =>
  path
    .split(".")
    .reduce<unknown>(
      (inner, part) =>
        typeof inner === "object" && inner !== null
          ? (inner as Record<string, unknown>)[part]
          : undefined,
      value
    )

/**
 * The first message per field from a failed parse, keyed by the field's path. A key in `grouped` collapses everything
 * under it to that key, so a form with a list of rows shows one message for the list rather than one per cell.
 */
export function fieldErrors(
  issues: { path: PropertyKey[]; message: string }[],
  grouped: string[] = []
): Record<string, string> {
  const found: Record<string, string> = {}
  for (const issue of issues) {
    const head = String(issue.path[0])
    const key = grouped.includes(head) ? head : issue.path.join(".")
    if (!(key in found)) found[key] = issue.message
  }
  return found
}

/**
 * The input the last check parsed, as the draft now gives it: each value the check took straight from the draft is
 * read again, and one emptied since goes as null where the field takes null, as the forms send an empty date or pick.
 */
function rebuilt(
  schema: FormSchema,
  input: unknown,
  from: unknown,
  draft: unknown
) {
  if (Object.is(input, from)) return draft
  if (!isRecord(input) || !isRecord(from) || !isRecord(draft)) return input
  const shape = isRecord(schema.shape)
    ? (schema.shape as Record<string, Partial<FormSchema>>)
    : {}
  return Object.fromEntries(
    Object.entries(input).map(([key, value]) => {
      if (Object.is(value, from)) return [key, draft]
      if (!Object.is(value, from[key])) return [key, value]
      const now = draft[key]
      return [
        key,
        now === "" && shape[key]?.safeParse?.(null).success ? null : now,
      ]
    })
  )
}

/**
 * Messages the schema cannot give. A function reads the draft as it is when asked, so a message the draft has since
 * fixed is not shown again and one it has broken again comes back on blur.
 */
// A field with no message may be left out or undefined, so `draft.email ? { email: "…" } : {}` type-checks.
type Messages = Partial<Record<string, string>>
type Also<D> = Messages | ((draft: D) => Messages)
const extra = <D>(
  also: Also<D> | undefined,
  draft: D
): Record<string, string> =>
  Object.fromEntries(
    Object.entries(
      typeof also === "function" ? also(draft) : (also ?? {})
    ).filter((entry): entry is [string, string] => typeof entry[1] === "string")
  )

/**
 * One sheet over several forms, each a record saved in turn: the first refusal no field shows, every form's failures,
 * and each form checked again on blur.
 */
export const combineForms = (...forms: SheetFormStatus[]): SheetFormStatus => ({
  refusal: forms.find((form) => form.refusal)?.refusal,
  failures: forms.reduce((sum, form) => sum + form.failures, 0),
  unplaced: () => forms.forEach((form) => form.unplaced()),
  revalidate: () => forms.forEach((form) => form.revalidate()),
})

/**
 * A sheet form's draft and the messages under its fields, for `SheetForm`.
 *
 * `check(schema, input)` parses what the form will send: it returns the parsed input with the messages cleared, or
 * null with each field's first message shown. `grouped` collapses a list of rows to one message; `also` adds messages
 * the schema cannot give, and any of them fails the check too. A field's message goes as its value changes, and comes
 * back as it loses focus if the value is still wrong.
 *
 * `refused(failure)` takes the server's refusal: under the field it names, or above the buttons, and the sheet stays
 * open with what was typed. `dirty` says whether the draft differs from where it started, for `FormSheet`'s check
 * before closing. `reset` starts over on another record, as a sheet reused for the next one does.
 */
export function useSheetForm<D>(initial: D | (() => D)) {
  const [draft, setDraft] = useState(initial)
  const [start, setStart] = useState(draft)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [refusal, setRefusal] = useState<string>()
  const [failures, setFailures] = useState(0)
  // The last check, so a field that showed an error can be checked again on blur, and which fields have shown one.
  const last = useRef<{
    schema: FormSchema
    input: unknown
    from: D
    grouped?: string[]
    also?: Also<D>
  }>(null)
  const shown = useRef(new Set<string>())

  // A change takes away the messages about what changed, and the form's own message, in the same render.
  const [seen, setSeen] = useState(draft)
  if (seen !== draft) {
    setSeen(draft)
    if (refusal) setRefusal(undefined)
    const stale = Object.keys(errors).filter(
      (path) => !same(at(seen, path), at(draft, path))
    )
    if (stale.length > 0)
      setErrors(
        Object.fromEntries(
          Object.entries(errors).filter(([path]) => !stale.includes(path))
        )
      )
  }

  function set<K extends keyof D>(field: K, value: D[K]) {
    setDraft((current) => ({ ...current, [field]: value }))
  }

  function reset(next: D) {
    setDraft(next)
    setStart(next)
    setErrors({})
    setRefusal(undefined)
    last.current = null
    shown.current.clear()
  }

  function check<T>(
    schema: FormSchema<T>,
    input: unknown,
    { grouped, also = {} }: { grouped?: string[]; also?: Also<D> } = {}
  ): T | null {
    const parsed = schema.safeParse(input)
    const found = {
      ...(parsed.success ? {} : fieldErrors(parsed.error.issues, grouped)),
      ...extra(also, draft),
    }
    setErrors(found)
    setRefusal(undefined)
    last.current = { schema, input, from: draft, grouped, also }
    for (const path of Object.keys(found)) shown.current.add(path)
    if (Object.keys(found).length > 0) setFailures((count) => count + 1)
    return parsed.success && Object.keys(found).length === 0
      ? parsed.data
      : null
  }

  function revalidate() {
    const checked = last.current
    if (!checked || shown.current.size === 0) return
    const parsed = checked.schema.safeParse(
      rebuilt(checked.schema, checked.input, checked.from, draft)
    )
    const found = {
      ...(parsed.success
        ? {}
        : fieldErrors(parsed.error.issues, checked.grouped)),
      // Only a function reads the draft as it is now; a fixed record is what it was when checked.
      ...(typeof checked.also === "function" ? extra(checked.also, draft) : {}),
    }
    const back = [...shown.current].filter(
      (path) => found[path] && !errors[path]
    )
    if (back.length > 0)
      setErrors((current) => ({
        ...current,
        ...Object.fromEntries(back.map((path) => [path, found[path]])),
      }))
  }

  function refused(failure: FormRefusal) {
    if (failure.field) {
      setErrors({ [failure.field]: failure.error })
      shown.current.add(failure.field)
    } else setRefusal(failure.error)
    setFailures((count) => count + 1)
  }

  function unplaced() {
    const message = Object.values(errors)[0]
    if (message) setRefusal(message)
  }

  return {
    draft,
    setDraft,
    set,
    reset,
    dirty: !same(draft, start),
    errors,
    check,
    refusal,
    failures,
    unplaced,
    revalidate,
    refused,
  }
}
