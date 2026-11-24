"use client"

import { Fragment, useRef, useState, type ReactNode } from "react"
import { AddOption } from "../add-option/add-option"
import { Badge } from "../badge/badge"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxValue,
  useComboboxAnchor,
} from "../combobox/combobox"
import { describedBy, useFieldNote } from "../field-note/field-note"
import { keepScroll, useEscapeClosesList } from "../in-sheet/in-sheet"
import { InputGroupAddon } from "../input-group/input-group"
import { ReasonTooltip } from "../reason-tooltip/reason-tooltip"
import { cn } from "@/lib/utils"
import { PickerPicture, type EntityPicture } from "./entity-picture"
import { appended, nothingLeft, type Key } from "./picker-add"
import { matches } from "./search"
import { usePickerAdd, type PickerAdd } from "./use-picker-add"

/**
 * A record to pick: its picture and name, then a line of detail and a badge in gray, and whether it can be picked.
 * `chip` names it once out of its group, as a task names its template.
 */
export type EntityItem<Id extends Key = number> = {
  id: Id
  name: string
  picture?: EntityPicture
  /** In place of a picture, such as a priority's flag in its color, before the name in the field. */
  icon?: ReactNode
  /** How it is drawn in place of its picture and name, such as a priority's badge: in the list, and in the field until typed in. */
  label?: ReactNode
  detail?: ReactNode
  /** A word in a gray badge, or a badge of the app's own, such as a status in its color. */
  badge?: ReactNode
  disabled?: boolean
  /** Why a disabled item can't be picked, on hover over its row. */
  reason?: string
  chip?: string
  /** In a field of several, why this pick can't be taken off: its chip has no remove, and its chip and row say why on hover. */
  kept?: string
}

/** A list under a label; one group with an empty label is a plain list. */
export type EntityGroup<Id extends Key = number> = {
  value: string
  items: EntityItem<Id>[]
}

const groupsOf = <Id extends Key>(
  items: EntityItem<Id>[] | undefined,
  groups: EntityGroup<Id>[] | undefined
) =>
  (groups ?? [{ value: "", items: items ?? [] }]).filter(
    (group) => group.items.length > 0
  )

// The Add row is an item of the list, so the keyboard reaches it, in a group of its own after the others.
type AddRow = { adds: true; id: "add"; name: string }
type Row<Id extends Key> = (EntityItem<Id> & { adds?: undefined }) | AddRow
type RowGroup<Id extends Key> = { value: string; items: Row<Id>[]; adds?: true }
const addGroup = (label: string): RowGroup<never> => ({
  value: "",
  items: [{ id: "add", name: label, adds: true }],
  adds: true,
})

// The list narrows as search does everywhere (case, accents and punctuation aside), keeping the Add row whatever is
// typed.
// How both pickers read their rows: by name, and one row is another by id.
const rowsOf = <Id extends Key>() => ({
  filter: (row: Row<Id>, query: string) =>
    Boolean(row.adds) || matches(row.name, query.trim()),
  itemToStringLabel: (row: Row<Id>) => row.name,
  // The Add row is only ever itself, whatever an item's id is.
  isItemEqualToValue: (a: Row<Id>, b: Row<Id>) =>
    a.adds || b.adds ? a === b : a.id === b.id,
})

/**
 * Add for a combobox, and what its list says when nothing is left in it: the list with its Add row, and what a pick
 * of it does instead of becoming the value. `search` is what was typed, tracked with the change's reason, so a pick
 * that fills the field with a name is not taken for typing.
 */
function useComboboxAdd<Id extends Key>({
  add,
  disabled,
  shown,
  pick,
  returnTo,
  close,
}: {
  add: PickerAdd | undefined
  disabled: boolean | undefined
  shown: EntityGroup<Id>[]
  pick: (id: Id) => void
  returnTo: () => HTMLElement | null
  close: () => void
}) {
  const [search, setSearch] = useState("")
  const all = shown.flatMap((group) => group.items)
  const adder = usePickerAdd({
    add,
    disabled,
    pickable: all.flatMap((item) => (item.disabled ? [] : [item.id])),
    // An id the list holds, so of the list's kind.
    pick: (id) => pick(id as Id),
    returnTo,
  })
  const offered = adder.add
  const left = nothingLeft(
    all.map((item) => item.name),
    search.trim()
  )
  const rows: RowGroup<Id>[] = offered
    ? [...shown, addGroup(offered.label)]
    : shown
  return {
    rows,
    /** What the list says when nothing in it is left: nothing typed matched, or there is nothing yet. */
    empty: search.trim() ? "Nothing matches." : "None yet.",
    /** The same, said above the Add row, which keeps the list from ever being empty. */
    emptyAboveAdd: (offered && left) || undefined,
    onInputValueChange: (value: string, details: { reason: string }) =>
      setSearch(details.reason === "input-change" ? value : ""),
    /** True when `next` was the Add row: its form opens and the pick goes no further. Any other pick clears the note. */
    chose: (
      next: Row<Id> | Row<Id>[] | null,
      details: { cancel: () => void }
    ) => {
      const row = Array.isArray(next) ? next.at(-1) : next
      if (!row?.adds) {
        adder.dismiss()
        return false
      }
      details.cancel()
      close()
      adder.start(search)
      return true
    },
    note: adder.note,
    noteId: adder.noteId,
    sheet: adder.sheet,
  }
}

/** What a list row draws for an item: its own label, or its picture or icon and name, then its detail and badge. */
function ItemFace<Id extends Key>({ item }: { item: EntityItem<Id> }) {
  return (
    <ReasonTooltip
      reason={item.kept ?? (item.disabled ? item.reason : undefined)}
    >
      {item.label ?? (
        <>
          {item.picture && (
            <PickerPicture picture={item.picture} name={item.name} size="row" />
          )}
          {item.icon}
          <span className="truncate">{item.name}</span>
        </>
      )}
      {item.detail && (
        <span className="truncate text-muted-foreground">{item.detail}</span>
      )}
      {typeof item.badge === "string" ? (
        <Badge variant="secondary">{item.badge}</Badge>
      ) : (
        item.badge
      )}
    </ReasonTooltip>
  )
}

/** The list both pickers open: type to narrow it, about 14 rows before it scrolls, never past the room on screen. */
function EntityList<Id extends Key>({
  anchor,
  empty,
  emptyAboveAdd,
}: {
  anchor?: ReturnType<typeof useComboboxAnchor>
  empty: string
  emptyAboveAdd?: string
}) {
  return (
    // The list renders at the end of the page, outside any open sheet, and a modal sheet turns pointer events off out there.
    <ComboboxContent
      anchor={anchor}
      className="pointer-events-auto"
      ref={keepScroll}
    >
      <ComboboxEmpty>{empty}</ComboboxEmpty>
      {/* Outside the list, as a list holds only its items. */}
      {emptyAboveAdd && (
        <div
          role="status"
          className="flex w-full justify-center py-2 text-center text-sm text-muted-foreground"
        >
          {emptyAboveAdd}
        </div>
      )}
      <ComboboxList className="max-h-[min(28rem,calc(var(--available-height)-2.25rem))]">
        {(group: RowGroup<Id>, index: number) => (
          <ComboboxGroup
            key={group.adds ? "add" : group.value || "items"}
            items={group.items}
          >
            {index > 0 && <ComboboxSeparator />}
            {group.value && <ComboboxLabel>{group.value}</ComboboxLabel>}
            <ComboboxCollection>
              {(item: Row<Id>) => (
                // The rows of Select, the other dropdown: ComboboxItem is drawn 4px shorter than SelectItem.
                <ComboboxItem
                  key={item.adds ? "add" : item.id}
                  value={item}
                  disabled={item.adds ? false : item.disabled}
                  className="gap-1.5 py-1.5 pl-2"
                >
                  {item.adds ? (
                    <AddOption label={item.name} />
                  ) : (
                    <ItemFace item={item} />
                  )}
                </ComboboxItem>
              )}
            </ComboboxCollection>
          </ComboboxGroup>
        )}
      </ComboboxList>
    </ComboboxContent>
  )
}

/** What both pickers take besides their value. */
type Fields<Id extends Key> = {
  id: string
  /** A plain list; or `groups` to split it under labels, in order. Empty groups are left out. */
  items?: EntityItem<Id>[]
  groups?: EntityGroup<Id>[]
  /** What the field says while nothing is picked, such as "Pick a prospect" or "Add products". */
  placeholder: string
  invalid?: boolean
  /** While the list waits on another pick, such as a prospect's contacts on the prospect. */
  disabled?: boolean
  /** Why it is disabled, under it while it is, such as "Pick a prospect first.", in place of `description`. */
  reason?: string | null
  /** A line under the field. */
  description?: ReactNode
  /** The item's Add row, for whoever may add one; the new item is picked once listed. */
  add?: PickerAdd
  /**
   * For an optional field, one pick: the clear button while something is picked, which leaves the value "". The
   * empty field then reads its placeholder, "No" and the field's name ("No priority"), as every optional field does.
   */
  clearable?: boolean
}

// One record: a field to type in that narrows the list, with the picked record's picture at its start.
function PickOne<Id extends Key>({
  id,
  items,
  groups,
  value,
  placeholder,
  invalid,
  disabled,
  reason,
  description,
  add,
  clearable,
  onChange,
}: Fields<Id> & { value: string; onChange: (value: string) => void }) {
  const anchor = useComboboxAnchor()
  const [open, setOpen] = useState(false)
  // Until something is typed, a pick with its own drawing (a badge) shows that in place of its name, focused or not.
  const [typing, setTyping] = useState(false)
  useEscapeClosesList(open, () => setOpen(false))
  // Set from focus to the click's mouseup, which would otherwise drop the selection focus made for a caret.
  const selecting = useRef(false)
  const input = useRef<HTMLInputElement>(null)
  const shown = groupsOf(items, groups)
  const picked =
    shown
      .flatMap((group) => group.items)
      .find((item) => String(item.id) === value) ?? null
  const adder = useComboboxAdd({
    add,
    disabled,
    shown,
    pick: (next) => onChange(String(next)),
    returnTo: () => input.current,
    close: () => setOpen(false),
  })
  const under = useFieldNote({ disabled, reason, description })
  const drawn = picked?.label && !typing

  // The sheet sits beside the combobox, not in it: the list's own handlers have no say over the form it holds.
  return (
    <>
      <Combobox
        disabled={disabled}
        open={open}
        onOpenChange={setOpen}
        items={adder.rows}
        value={picked as Row<Id> | null}
        onInputValueChange={adder.onInputValueChange}
        onValueChange={(next: Row<Id> | null, details) => {
          if (adder.chose(next, details)) return
          setTyping(false)
          if (next) onChange(String(next.id))
          // The clear button empties the field.
          else if (clearable) onChange("")
        }}
        {...rowsOf<Id>()}
        autoHighlight
      >
        {/* The list lines up with the whole field, picture included, not with the text after it: the input group
            inside ComboboxInput takes no ref, so the field's own wrapper is the anchor, as the chips are. */}
        <div ref={anchor} data-slot="entity-picker-anchor" className="w-full">
          <ComboboxInput
            ref={input}
            id={id}
            className={cn(
              "w-full",
              drawn && "text-transparent selection:bg-transparent"
            )}
            showClear={Boolean(clearable && picked)}
            placeholder={placeholder}
            aria-invalid={invalid}
            aria-describedby={describedBy(adder.noteId, under.describes)}
            disabled={disabled}
            // A picked name is selected on focus, so typing replaces it rather than adding to it, as an address bar does.
            onChange={() => setTyping(true)}
            onFocus={(event) => {
              if (!picked) return
              event.currentTarget.select()
              selecting.current = true
            }}
            onMouseUp={(event) => {
              if (selecting.current) event.preventDefault()
              selecting.current = false
            }}
            onBlur={() => {
              selecting.current = false
              setTyping(false)
            }}
            onKeyDown={() => (selecting.current = false)}
          >
            {drawn ? (
              // Over the name, which stays in the field for the keyboard and screen readers, drawn transparent.
              <InputGroupAddon
                align="inline-start"
                className="pointer-events-none absolute"
              >
                {picked.label}
              </InputGroupAddon>
            ) : (
              (picked?.picture || picked?.icon) && (
                <InputGroupAddon align="inline-start">
                  {picked.picture ? (
                    <PickerPicture
                      picture={picked.picture}
                      name={picked.name}
                      size="chip"
                    />
                  ) : (
                    picked.icon
                  )}
                </InputGroupAddon>
              )
            )}
          </ComboboxInput>
        </div>
        <EntityList<Id>
          anchor={anchor}
          empty={adder.empty}
          emptyAboveAdd={adder.emptyAboveAdd}
        />
      </Combobox>
      {adder.note}
      {under.note}
      {adder.sheet}
    </>
  )
}

// Several records: the picks as chips in one field, each with its picture, and typing narrows the list.
function MultiPick<Id extends Key>({
  id,
  items,
  groups,
  value,
  placeholder,
  invalid,
  disabled,
  reason,
  description,
  add,
  onChange,
}: Fields<Id> & { value: Id[]; onChange: (value: Id[]) => void }) {
  const anchor = useComboboxAnchor()
  const [open, setOpen] = useState(false)
  useEscapeClosesList(open, () => setOpen(false))
  const input = useRef<HTMLInputElement>(null)
  const shown = groupsOf(items, groups)
  const all = shown.flatMap((group) => group.items)
  // In the order they were picked, which is the order the chips read in.
  const picked = value.flatMap((pickedId) =>
    all.filter((item) => item.id === pickedId)
  )
  const adder = useComboboxAdd({
    add,
    disabled,
    shown,
    pick: (next) => onChange(appended(value, next)),
    returnTo: () => input.current,
    close: () => setOpen(false),
  })
  const under = useFieldNote({ disabled, reason, description })

  return (
    <>
      <Combobox
        multiple
        disabled={disabled}
        open={open}
        onOpenChange={setOpen}
        items={adder.rows}
        value={picked as Row<Id>[]}
        onInputValueChange={adder.onInputValueChange}
        onValueChange={(next: Row<Id>[], details) => {
          if (adder.chose(next, details)) return
          // A pick that is kept stays, whichever way the field tried to take it off.
          const ids = next.flatMap((item) => (item.adds ? [] : [item.id]))
          onChange([
            ...ids,
            ...picked
              .filter((item) => item.kept && !ids.includes(item.id))
              .map((item) => item.id),
          ])
        }}
        {...rowsOf<Id>()}
        autoHighlight
      >
        <ComboboxChips ref={anchor} className="w-full">
          <ComboboxValue>
            {(chips: EntityItem<Id>[]) => (
              <Fragment>
                {chips.map((item) => (
                  <ComboboxChip
                    key={item.id}
                    className={item.picture ? "pl-0.5" : undefined}
                    showRemove={!item.kept}
                  >
                    <ReasonTooltip reason={item.kept}>
                      {item.picture && (
                        <PickerPicture
                          picture={item.picture}
                          name={item.name}
                          size="chip"
                        />
                      )}
                      {item.chip ?? item.name}
                    </ReasonTooltip>
                  </ComboboxChip>
                ))}
                {/* No width of its own until focused: at the end of a full row it would wrap to a line of its own. */}
                <ComboboxChipsInput
                  ref={input}
                  id={id}
                  // ComboboxChipsInput leaves its placeholder the browser's own gray; every other field's is the muted one.
                  className={cn(
                    "placeholder:text-muted-foreground",
                    chips.length > 0 && "min-w-0 focus:min-w-24"
                  )}
                  placeholder={chips.length === 0 ? placeholder : undefined}
                  aria-invalid={invalid}
                  aria-describedby={describedBy(adder.noteId, under.describes)}
                  disabled={disabled}
                />
              </Fragment>
            )}
          </ComboboxValue>
        </ComboboxChips>
        <EntityList<Id>
          anchor={anchor}
          empty={adder.empty}
          emptyAboveAdd={adder.emptyAboveAdd}
        />
      </Combobox>
      {adder.note}
      {under.note}
      {adder.sheet}
    </>
  )
}

/**
 * Every field that picks a record (a person, a company, a product): type to narrow the list, each row the record's
 * picture, name and any detail. One record by default, its id as a string as forms hold it; with `multiple`, several,
 * as chips, their ids as the items carry them. Short fixed lists such as a stage are a PickField. With `add`, the list
 * ends in the item's Add row, which opens its form in a sheet over the one the picker sits in, and picks what it saved.
 * Put it in a `Field` with its `FieldLabel htmlFor={id}` and `FieldError`.
 */
export function EntityPicker<Id extends Key = number>(
  props:
    | (Fields<Id> & {
        multiple?: false
        value: string
        onChange: (value: string) => void
      })
    | (Fields<Id> & {
        multiple: true
        value: Id[]
        onChange: (value: Id[]) => void
      })
) {
  return props.multiple ? <MultiPick {...props} /> : <PickOne {...props} />
}
