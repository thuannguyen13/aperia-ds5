// How a picker adds the item it is missing: when it offers to, what it does with the item once saved, and how its
// list narrows around the Add row. Pure.

import { matches } from "./search"

/** A record's id, as the app keys it. An item added from a picker comes back with the same kind of id its list uses. */
export type Key = string | number

/**
 * Whether a picker offers Add: it was given a form to add with, it can be used, and it is not in a form that was
 * itself opened from a picker, which would stack forms on forms.
 */
export const offersAdd = (
  add: unknown,
  disabled: boolean | undefined,
  inAdd: boolean
) => Boolean(add) && !disabled && !inAdd

/**
 * Whether a save landed in the opening it was made in: one closed, or closed and opened again, since then adds its
 * item and picks nothing. `open` is the opening shown now, null while the sheet is closed.
 */
export const savedInOpening = (open: string | null, opening: string) =>
  open === opening

/** An item added from a picker, in the order added, and whether the picker has said it can't pick it. */
export type Added = { id: Key; unlisted: boolean }

/**
 * What a picker does next with the items added from it: picks the first its list now holds, one at a time so each
 * pick reads the value the last one left. Once the list has settled without one, it says that one can't be picked
 * here (a list the viewer sees only part of, or an item it can't pick), and still picks it if a later list holds it.
 */
export function nextAdded(
  added: readonly Added[],
  pickable: readonly Key[],
  settled: boolean
): { pick: Added } | "settle" | null {
  const listed = added.find((item) => pickable.includes(item.id))
  if (listed) return { pick: listed }
  return settled && added.some((item) => !item.unlisted) ? "settle" : null
}

/** A picker of several items with the added one at the end, as a pick from the list puts it, and only once. */
export const appended = <Id extends Key>(value: readonly Id[], id: Id) =>
  value.includes(id) ? [...value] : [...value, id]

/**
 * What a picker's list says when none of its items is left: that nothing matches what was typed, or, before anything
 * is typed, that there is nothing yet. Null while an item is left.
 */
export function nothingLeft(names: readonly string[], search: string) {
  if (!search) return names.length === 0 ? "None yet." : null
  return names.some((name) => matches(name, search)) ? null : "Nothing matches."
}
