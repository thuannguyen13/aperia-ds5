"use client"

import { useState } from "react"
import { ChevronDownIcon, FilterIcon, PlusIcon, XIcon } from "lucide-react"
import { Button } from "../button/button"
import { IconButton } from "../icon-button/icon-button"
import { ReasonTooltip } from "../reason-tooltip/reason-tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "../popover/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select/select"
import { cn } from "@/lib/utils"
import { FILTER_ICONS, FilterValueEditor, withOperator } from "./filter-value"
import {
  OPERATORS,
  describeValues,
  isComplete,
  newRule,
  ruleId,
  withIds,
  type FilterField,
  type FilterOperator,
  type FilterRule,
} from "./filters"

// The columns every row shares, so Column, Operator and Value line up under their headings, then the ×. The last
// column is the × icon's own 16px: its button reaches 6px past it on each side (`-mx-1.5`), so the × itself ends on
// the popover's right content line, as the fields start on its left one.
const ROW =
  "grid grid-cols-[minmax(0,1fr)_10rem_minmax(0,1fr)_1rem] items-center gap-2"

/**
 * The filter builder: one Filter button that counts the filters on, and a popover where each filter is a row of
 * Column, Operator and Value, with Add Filter and Remove All under them. Add Filter adds an empty row at any time, so
 * people can lay out several rows and then fill them in. One column can hold several filters, such as MC Score ≥ 700
 * and MC Score ≤ 900, and every filter must pass. A row's column can change in place, which starts that filter over.
 * The toolbar stays one short row however many filters are on, and every change applies at once.
 */
export function FilterBuilder({
  fields,
  rules,
  onRulesChange,
}: {
  fields: readonly FilterField[]
  /** The filters on, in the order they were added. */
  rules: readonly FilterRule[]
  /** Every change sends the whole list, each rule with its `id`. */
  onRulesChange: (rules: FilterRule[]) => void
}) {
  const [open, setOpen] = useState(false)
  // Rows added from Add Filter with no column picked yet, by id. They live only while the popover is open.
  const [drafts, setDrafts] = useState<string[]>([])
  const fieldOf = (id: string) => fields.find((field) => field.id === id)
  const rows = withIds(rules)
  const shown = rows.filter((rule) => fieldOf(rule.field))
  const on = shown.filter(isComplete).length
  const set = (next: FilterRule[]) => onRulesChange(next)
  const addDraft = () => setDrafts((list) => [...list, ruleId()])

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        // An empty builder opens on one empty row, so the first step is right there.
        setDrafts(next && shown.length === 0 ? [ruleId()] : [])
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          aria-label={on > 0 ? `Filter, ${on} on` : undefined}
        >
          <FilterIcon data-icon="inline-start" />
          Filter
          {on > 0 && (
            <span className="ml-0.5 flex size-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground tabular-nums">
              {on}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[min(45rem,calc(100vw-2rem))] gap-0 p-0"
      >
        <div className="flex flex-col gap-2 p-3">
          <p className="text-sm font-medium">Filters</p>
          {shown.length + drafts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No filters applied.</p>
          ) : (
            <div
              className={cn(ROW, "text-xs text-muted-foreground")}
              aria-hidden
            >
              <span>Column</span>
              <span>Operator</span>
              <span>Value</span>
            </div>
          )}
          {shown.map((rule) => {
            const field = fieldOf(rule.field)!
            return (
              <BuilderRow
                key={rule.id}
                field={field}
                rule={rule}
                columns={fields}
                onChange={(next) =>
                  set(rows.map((each) => (each.id === rule.id ? next : each)))
                }
                onRemove={() => set(rows.filter((each) => each.id !== rule.id))}
              />
            )
          })}
          {drafts.map((id) => (
            <div key={id} className={ROW}>
              <ColumnSelect
                columns={fields}
                onPick={(field) => {
                  setDrafts((list) => list.filter((each) => each !== id))
                  set([...rows, { ...newRule(field), id }])
                }}
              />
              <div className="h-8 rounded-lg bg-foreground/4" aria-hidden />
              <div className="h-8 rounded-lg bg-foreground/4" aria-hidden />
              <IconButton
                label="Remove Filter"
                // Wider than its column by its padding, so the × sits on the popover's right content line.
                className="-mx-1.5"
                onClick={() =>
                  setDrafts((list) => list.filter((each) => each !== id))
                }
              >
                <XIcon />
              </IconButton>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 border-t px-3 py-2">
          <Button
            variant="ghost"
            size="sm"
            // The label starts on the rows' left edge: the button's 6px padding goes back as a margin.
            className="-ml-1.5"
            onClick={addDraft}
          >
            <PlusIcon data-icon="inline-start" />
            Add Filter
          </Button>
          {/* Pinned to the right: the reason's wrapper would otherwise break the row's spacing. */}
          <div className="ml-auto">
            <ReasonTooltip
              reason={shown.length === 0 ? "No filters to remove." : undefined}
            >
              {/* Ghost, as Add Filter: removing filters deletes nothing and is undone by setting them again, so it is not
                  Destructive. Its 10px right padding goes back as a margin, so its text ends on the popover's right content
                  line, under the rows' ×. */}
              <Button
                variant="ghost"
                size="sm"
                className="-mr-2.5"
                disabled={shown.length === 0}
                onClick={() => {
                  set([])
                  setDrafts([ruleId()])
                }}
              >
                <XIcon data-icon="inline-start" />
                Remove All
              </Button>
            </ReasonTooltip>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

/** The column a row filters on: any of the list's fields, since one column can hold several filters. */
function ColumnSelect({
  columns,
  value,
  onPick,
}: {
  columns: readonly FilterField[]
  value?: string
  onPick: (field: FilterField) => void
}) {
  return (
    <Select
      value={value}
      onValueChange={(id) => {
        const field = columns.find((each) => each.id === id)
        if (field) onPick(field)
      }}
    >
      <SelectTrigger className="w-full" aria-label="Column">
        <SelectValue placeholder="Pick a column" />
      </SelectTrigger>
      <SelectContent position="popper">
        {columns.map((field) => {
          const Icon = FILTER_ICONS[field.type]
          return (
            <SelectItem key={field.id} value={field.id}>
              <Icon className="text-muted-foreground" />
              {field.label}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}

/** One filter as a row: its column, its operator and its value, then × to remove it. */
function BuilderRow({
  field,
  rule,
  columns,
  onChange,
  onRemove,
}: {
  field: FilterField
  rule: FilterRule
  columns: readonly FilterField[]
  onChange: (rule: FilterRule) => void
  onRemove: () => void
}) {
  const operators = OPERATORS[field.type]
  return (
    <div role="group" aria-label={`${field.label} filter`} className={ROW}>
      <ColumnSelect
        columns={columns}
        value={field.id}
        // Another column starts this filter over, in its place, with that column's first operator and no value.
        onPick={(next) =>
          next.id !== field.id && onChange({ ...newRule(next), id: rule.id })
        }
      />
      <Select
        value={rule.operator}
        onValueChange={(value) =>
          onChange(withOperator(rule, value as FilterOperator))
        }
        disabled={operators.length < 2}
      >
        <SelectTrigger
          className="w-full"
          aria-label={`${field.label} operator`}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent position="popper">
          {operators.map((each) => (
            <SelectItem key={each.value} value={each.value}>
              {each.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <BuilderValue field={field} rule={rule} onChange={onChange} />
      <IconButton
        label="Remove Filter"
        aria-label={`Remove ${field.label} filter`}
        // Wider than its column by its padding, so the × sits on the popover's right content line.
        className="-mx-1.5"
        onClick={onRemove}
      >
        <XIcon />
      </IconButton>
    </div>
  )
}

/**
 * A row's value: a field to type in for text, numbers, amounts and days, and for a list of choices a control that reads
 * as the choices picked and opens them, so several can be picked.
 */
function BuilderValue({
  field,
  rule,
  onChange,
}: {
  field: FilterField
  rule: FilterRule
  onChange: (rule: FilterRule) => void
}) {
  const [open, setOpen] = useState(false)
  if (field.type !== "enum" && field.type !== "boolean")
    return (
      <div className="min-w-0 [&>*]:w-full">
        <FilterValueEditor
          field={field}
          rule={rule}
          onChange={onChange}
          sheet
        />
      </div>
    )
  const values = describeValues(field, rule)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className="flex h-8 w-full items-center justify-between gap-1.5 rounded-lg control py-2 pr-2 pl-2.5 text-left text-sm outline-none focus-visible:ring-3 focus-visible:inset-ring-1 focus-visible:ring-ring/50 focus-visible:inset-ring-ring"
        aria-label={`${field.label}: ${values || "no value"}`}
      >
        <span className={cn("truncate", !values && "text-muted-foreground")}>
          {values || "Pick a value"}
        </span>
        <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground" />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-60 p-0">
        <FilterValueEditor
          field={field}
          rule={rule}
          onChange={onChange}
          onDone={() => setOpen(false)}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  )
}
