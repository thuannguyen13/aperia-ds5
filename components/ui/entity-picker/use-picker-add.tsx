"use client"

import {
  createContext,
  useContext,
  useEffect,
  useEffectEvent,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  useTransition,
  type ReactNode,
} from "react"
import { FieldDescription } from "../field/field"
import { OpenerReturnsFocus, returnFocus } from "../return-focus/return-focus"
import { FormSheet } from "../sheet-form/sheet-form"
import { useSheet } from "../sheet-form/use-sheet"
import {
  nextAdded,
  offersAdd,
  savedInOpening,
  type Added,
  type Key,
} from "./picker-add"

/**
 * What a picker needs to add the item it is missing: its Add row's label ("Add Prospect") and the item's one form, the
 * same form its own page adds with. The form saves through the app's own action and reports the new item's id
 * through `useAdded`; the picker then picks it. `unlisted` says why when the picker's list leaves the new item out.
 * The feature that owns the item builds it, for whoever may add that item.
 */
export type PickerAdd = { label: string; form: ReactNode; unlisted?: string }

/** What a form opened from a picker reads: where to report the item it saved, and what was typed in the picker. */
type Adding = { added: (id?: Key) => void; search: string }

const AddContext = createContext<Adding | null>(null)

/** For a form that can be opened from a picker: that picker, or null where the form opened on its own. */
export const useAdding = () => useContext(AddContext)

/**
 * For a form that adds an item: `name`, what was typed in the picker it was opened from, to start the new item's
 * name (empty on its own page), and `then`, which after a save hands the new item's id to that picker, or to
 * `onDone` on the form's own page. Give `then(onDone)` the save's result: `{ id }`.
 */
export function useAdded() {
  const adding = useAdding()
  return {
    name: adding?.search ?? "",
    then:
      <Id extends Key>(onDone?: (id: Id | undefined) => void) =>
      ({ id }: { id?: Id }) =>
        adding ? adding.added(id) : onDone?.(id),
  }
}

const UNLISTED = "Added. It cannot be picked here."
// A backstop past the save: a later commit may still bring the new item into the list.
const SETTLE_MS = 1500

/**
 * The item's form in a sheet over the form the picker sits in, which stays as it was under it. Each opening is a
 * fresh form, and closing forgets it, as every sheet does.
 */
function AddSheet({
  label,
  form,
  open,
  onOpenChange,
  opening,
  adding,
  returnTo,
}: {
  label: string
  form: ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
  opening: string
  adding: Adding
  returnTo: () => HTMLElement | null
}) {
  return (
    // A form sheet of its own, over the one the picker sits in: as wide, with its own Discard Changes? check, so what
    // is typed here never counts as typed in the form under it.
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      title={label}
      // Back to the picker, which no trigger of the sheet's own would name.
      onCloseAutoFocus={(event) => {
        event.preventDefault()
        returnFocus(returnTo())
      }}
    >
      {/* React bubbles a submit through the portal to the form the picker sits in, which would save that one too. */}
      <div className="contents" onSubmit={(event) => event.stopPropagation()}>
        {/* The sheet gives focus back to the picker, so the form's own return to its opener stands aside. */}
        <OpenerReturnsFocus value>
          <AddContext key={opening} value={adding}>
            {form}
          </AddContext>
        </OpenerReturnsFocus>
      </div>
    </FormSheet>
  )
}

/**
 * Add for one picker: `add` when it offers it, `start` to open the item's form with what was typed, the sheet, and
 * the note under the picker when a new item is not one it can pick, with `noteId` to describe the picker by. A save
 * can resolve before the app's refreshed list arrives, so each new item waits, and is handed to `pick` once
 * `pickable` holds it. A save that lands after its sheet was closed or opened again adds the item and picks nothing.
 * `dismiss` clears the note, as the viewer picks again.
 */
export function usePickerAdd({
  add,
  disabled,
  pickable,
  pick,
  returnTo,
}: {
  add: PickerAdd | undefined
  disabled?: boolean
  /** The ids the picker lists now and can pick: a disabled item is not one. */
  pickable: readonly Key[]
  pick: (id: Key) => void
  /** What takes focus when the sheet closes: the picker. */
  returnTo: () => HTMLElement | null
}) {
  const offered = offersAdd(add, disabled, useAdding() !== null)
    ? add
    : undefined
  // The record is what was typed in the picker, which the form starts from.
  const sheet = useSheet("")
  const [added, setAdded] = useState<Added[]>([])
  const [refreshing, startTransition] = useTransition()
  const noteId = useId()
  // The opening that is open now, read as a save lands.
  const current = useRef<string | null>(null)
  const step = nextAdded(added, pickable, !refreshing)
  // The item to pick, or "settle", stable across renders, so the effect runs once for each.
  const next = step && (step === "settle" ? step : step.pick)

  useLayoutEffect(() => {
    current.current = sheet.open ? sheet.key : null
  }, [sheet.open, sheet.key])

  const take = useEffectEvent((item: Added) => {
    setAdded((list) => list.filter((each) => each !== item))
    pick(item.id)
  })
  const settle = useEffectEvent(() =>
    setAdded((list) => list.map((item) => ({ ...item, unlisted: true })))
  )
  // After the commit that lists it, so the caller's handler reads the refreshed props; never while rendering. A later
  // commit may still bring a new item into the list, so the note waits a moment past the save.
  useLayoutEffect(() => {
    if (next === null) return
    // The one render this costs is the point: the next added item is picked against the value this pick leaves.
    if (next !== "settle") return take(next)
    const timer = setTimeout(settle, SETTLE_MS)
    return () => clearTimeout(timer)
  }, [next])

  const opening = sheet.key
  const adding: Adding = {
    search: sheet.record,
    added: (id) => {
      if (!savedInOpening(current.current, opening)) return
      startTransition(() => {
        sheet.onOpenChange(false)
        // A save that names no id closes the sheet and picks nothing.
        if (id !== undefined)
          setAdded((list) => [...list, { id, unlisted: false }])
      })
    },
  }
  const unlisted = added.some((item) => item.unlisted)

  return {
    add: offered,
    start: (search = "") => sheet.show(search.trim()),
    sheet: offered ? (
      <AddSheet
        label={offered.label}
        form={offered.form}
        open={sheet.open}
        onOpenChange={sheet.onOpenChange}
        opening={opening}
        adding={adding}
        returnTo={returnTo}
      />
    ) : null,
    // In place, empty, from the start: a live region announces what it is given, not the text it was born with.
    note: add ? (
      <FieldDescription
        id={noteId}
        role="status"
        className={unlisted ? undefined : "sr-only"}
      >
        {unlisted ? (add.unlisted ?? UNLISTED) : null}
      </FieldDescription>
    ) : null,
    noteId: unlisted ? noteId : undefined,
    dismiss: () => {
      if (unlisted) setAdded((list) => list.filter((item) => !item.unlisted))
    },
  }
}

/** What a refused save says, as the app's action returns it: the error, and the field it names, if any. */
export type PickerRefusal = { error: string; field?: string }

/**
 * A form opened to hand back what it checked instead of saving it, for an item that waits on a record not saved yet:
 * the draft it reopens with, or null for a new one, the refusal that draft last met, and where its save hands the
 * draft. The item is saved later, with the record it waits on.
 */
export type Drafting<T, R extends PickerRefusal = PickerRefusal> = {
  start: T | null
  refusal?: R
  done: (draft: T) => void
}

/** What a field needs to draft its item: its Add row's label and the item's one form, opened to draft. */
export type DraftAdd<T, R extends PickerRefusal = PickerRefusal> = {
  label: string
  form: (drafting: Drafting<T, R>) => ReactNode
}

// Inside the sheet as a picker's Add is, so the form's own pickers add nothing: a draft is handed back, not picked.
const DRAFTING: Adding = { search: "", added: () => {} }

/**
 * Add for a field that drafts its item: `start` opens the item's form in the Add sheet, empty or on the draft to
 * change, and the form's save closes it and hands the draft to `done`.
 */
export function useDraftAdd<T, R extends PickerRefusal = PickerRefusal>({
  add,
  refusal,
  done,
  returnTo,
}: {
  add: DraftAdd<T, R>
  /** The refusal the draft last met, which its form shows as it reopens. */
  refusal?: R
  done: (draft: T) => void
  /** What takes focus when the sheet closes: the field. */
  returnTo: () => HTMLElement | null
}) {
  const sheet = useSheet<T | null>(null)
  const { onOpenChange } = sheet
  return {
    start: (draft: T | null) => sheet.show(draft),
    sheet: (
      <AddSheet
        label={add.label}
        form={add.form({
          start: sheet.record,
          refusal: sheet.record === null ? undefined : refusal,
          done: (draft) => {
            onOpenChange(false)
            done(draft)
          },
        })}
        open={sheet.open}
        onOpenChange={onOpenChange}
        opening={sheet.key}
        adding={DRAFTING}
        returnTo={returnTo}
      />
    ),
  }
}

/** For a form opened on a refused draft (Drafting): shows that refusal as the form opens, under the field it names. */
export function useRefusedDraft<R extends PickerRefusal>(
  refusal: R | undefined,
  refused: (failure: R) => void
) {
  const show = useEffectEvent(() => {
    if (refusal) refused(refusal)
  })
  // After the form's first commit, so its sheet moves focus to the field, as after a refused save.
  useEffect(() => show(), [])
}
