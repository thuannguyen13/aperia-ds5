"use client"

import { useState } from "react"
import {
  PlusIcon,
  SearchIcon,
  SlidersHorizontalIcon,
  XIcon,
} from "lucide-react"
import { Button } from "../button/button"
import { DayRangeFields } from "../day-range-fields/day-range-fields"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu/dropdown-menu"
import { EmptyState } from "../empty-state/empty-state"
import { Field, FieldLabel } from "../field/field"
import { IconButton } from "../icon-button/icon-button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../input-group/input-group"
import { Label } from "../label/label"
import { RadioGroup, RadioGroupItem } from "../radio-group/radio-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../sheet/sheet"
import { SortControl } from "../sort-control/sort-control"
import { Switch } from "../switch/switch"
import { plural } from "@/lib/format"
import { FilterBuilder } from "./filter-builder"
import { FILTER_ICONS, FilterValueEditor, withOperator } from "./filter-value"
import {
  OPERATORS,
  describeValues,
  isComplete,
  newRule,
  ruleId,
  ruleOn,
  withIds,
  withRule,
  type FilterChoice,
  type FilterField,
  type FilterOperator,
  type FilterRule,
} from "./filters"

// A dropdown's choice that narrows nothing: Radix needs a real value for every option, and no choice's value is this.
const ALL = "__all__"

/** The list's filters: what it can filter by, those on, and which form the toolbar shows them in. */
export type ListFilters = {
  fields: readonly FilterField[]
  value: FilterRule[]
  onChange: (rules: FilterRule[]) => void
  /**
   * `advanced` (the default): one Filter button that counts the filters on and opens them in a popover as rows of
   * Column, Operator and Value, where a row's column can change in place. `simple`: every field is a fixed control on
   * the row, one click to pick, for a list with four filters or fewer. An enum is a select of one choice, a boolean a
   * switch, and a day a From and To. Text, number and amount fields need advanced filters.
   */
  form?: "advanced" | "simple"
}

// "prospects" as a button says it: "Prospects".
const titled = (noun: string) =>
  noun.replace(/(^|\s)\S/g, (letter) => letter.toUpperCase())

/**
 * A list's one toolbar: the controls that pick its scope, its search and filters, how many rows they leave, and its
 * Sort at the right end. Every list page has this one, above its table or board, as a section of the page.
 *
 * Filters come in two forms on one model (`FilterField`, `FilterRule`), so either form, the count, the phone's sheet
 * and Clear All work the same. Advanced filters, the default, are one Filter button that opens a popover where each
 * filter on is a row of Column, Operator and Value, added from Add Filter. Simple filters (`form: "simple"`), for a
 * list with four filters or fewer, are fixed controls on the toolbar. Apply them with `filterRows`, or send them to the server.
 *
 * On a phone the row is the search and a Filters button that counts those on; the filters are set in a sheet from the
 * bottom, and those on show as chips that clear on a tap.
 *
 * The toolbar knows nothing of an app's own controls. `start` comes first: what picks the list's scope, such as a Board
 * and Table switch, a report date or a saved view. `children` follow the filters. Both stay on screen on a phone. The
 * wide row and the phone's rows are both in the markup, one hidden by CSS, so the server renders the right one with no
 * flash: a control passed in renders twice, so it keeps its state with the list (controlled), not in itself.
 */
export function ListToolbar({
  search,
  filters,
  shown,
  total,
  noun,
  sort,
  start,
  children,
}: {
  search?: {
    placeholder: string
    value: string
    onChange: (value: string) => void
  }
  filters?: ListFilters
  /** Rows the search and filters leave, and rows in all, shown as "12 of 40". Left out, no count shows. */
  shown?: number
  total?: number
  /** What a row is, one and many, for the sheet's count and its button: ["prospect", "prospects"]. */
  noun?: readonly [string, string]
  /** The list's Sort: what it sorts by, from the list's own order, and which way (`SortControl`). */
  sort?: React.ComponentProps<typeof SortControl>
  start?: React.ReactNode
  children?: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const fields = filters?.fields ?? []
  const rules = filters?.value ?? []
  const form = filters?.form ?? "advanced"
  const fieldOf = (rule: FilterRule) =>
    fields.find((field) => field.id === rule.field)
  // A rule on a field the list no longer offers is left alone, not shown.
  const shownRules = rules.filter((rule) => fieldOf(rule))
  const on = shownRules.filter(isComplete)
  const counted = shown !== undefined && total !== undefined

  // Simple filters hold one filter per column, so they change by column.
  const change = (field: string, rule: FilterRule | null) =>
    filters?.onChange(withRule(rules, field, rule))
  // The popover's filters, and the phone's for it, may hold several per column, so they change by id.
  const rows = withIds(rules)
  const changeRow = (id: string | undefined, rule: FilterRule | null) =>
    filters?.onChange(
      rule
        ? rows.map((each) => (each.id === id ? rule : each))
        : rows.filter((each) => each.id !== id)
    )
  const shownRows = rows.filter((rule) => fieldOf(rule))
  const onRows = shownRows.filter(isComplete)
  const clearAll = () => filters?.onChange([])

  const searchField = search && (
    // On the row it gives up width before a filter wraps to a second line.
    <InputGroup className="w-full sm:max-w-64 sm:min-w-40 sm:flex-1">
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput
        placeholder={search.placeholder}
        aria-label={search.placeholder}
        value={search.value}
        onChange={(event) => search.onChange(event.target.value)}
      />
    </InputGroup>
  )
  const count = counted && (
    <p className="text-sm whitespace-nowrap text-muted-foreground tabular-nums">
      {shown} of {total}
    </p>
  )
  const sorting = sort && <SortControl {...sort} />

  // What a filter that is on says on a phone's chip: the value alone for a dropdown, as its control shows it, and the
  // whole sentence for a chip, which names its own column.
  const chipText = (field: FilterField, rule: FilterRule) => {
    if (form === "simple")
      return field.type === "boolean"
        ? field.label
        : describeValues(field, rule)
    const operator = OPERATORS[field.type].find(
      (each) => each.value === rule.operator
    )
    return `${field.label} ${operator?.label ?? ""} ${describeValues(field, rule)}`
  }

  return (
    <>
      <div className="flex shrink-0 flex-wrap items-center gap-3 max-sm:hidden">
        {start}
        {searchField}
        {form === "simple"
          ? fields.map((field) => (
              <FilterDropdown
                key={field.id}
                field={field}
                rule={ruleOn(rules, field.id)}
                onChange={(rule) => change(field.id, rule)}
              />
            ))
          : filters && (
              <FilterBuilder
                fields={fields}
                rules={rules}
                onRulesChange={filters.onChange}
              />
            )}
        {children}
        {count}
        {sorting && <div className="ml-auto">{sorting}</div>}
      </div>

      <div className="flex shrink-0 flex-col gap-3 sm:hidden">
        {/* First, as on the wide row: what picks the list's scope is read before what narrows it. */}
        {start && (
          <div className="flex flex-wrap items-center gap-2">{start}</div>
        )}
        <div className="flex items-center gap-2">
          {searchField}
          {fields.length > 0 && (
            <Button
              variant="outline"
              className="shrink-0"
              aria-label={
                on.length > 0 ? `Filters, ${on.length} on` : undefined
              }
              onClick={() => setOpen(true)}
            >
              <SlidersHorizontalIcon data-icon="inline-start" />
              Filters
              {on.length > 0 && (
                <span className="ml-0.5 flex size-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground tabular-nums">
                  {on.length}
                </span>
              )}
            </Button>
          )}
          {children}
        </div>
        {on.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            {(form === "simple" ? on : onRows).map((rule) => {
              const field = fieldOf(rule)!
              return (
                <Button
                  key={rule.id ?? rule.field}
                  variant="secondary"
                  size="sm"
                  className="max-w-full rounded-full"
                  aria-label={`Clear ${field.label}: ${describeValues(field, rule)}`}
                  onClick={() =>
                    form === "simple"
                      ? change(rule.field, null)
                      : changeRow(rule.id, null)
                  }
                >
                  <span className="truncate">{chipText(field, rule)}</span>
                  <XIcon data-icon="inline-end" />
                </Button>
              )
            })}
            <Button
              variant="link"
              size="sm"
              className="text-muted-foreground"
              onClick={clearAll}
            >
              Clear All
            </Button>
          </div>
        )}
        {(count || sorting) && (
          <div className="flex items-center justify-between gap-3">
            {count}
            {sorting && <div className="ml-auto">{sorting}</div>}
          </div>
        )}
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="bottom"
          className="max-h-[85dvh] gap-0 rounded-t-2xl"
        >
          <SheetHeader className="flex-row items-center justify-between border-b">
            <div className="flex flex-col gap-0.5">
              <SheetTitle>Filters</SheetTitle>
              {counted && (
                <SheetDescription>
                  {noun ? plural(shown, ...noun) : shown} of {total}
                </SheetDescription>
              )}
            </div>
            {shownRules.length > 0 && (
              <Button
                variant="link"
                size="sm"
                className="mr-8 text-muted-foreground"
                onClick={clearAll}
              >
                Clear All
              </Button>
            )}
          </SheetHeader>
          <div className="flex min-h-0 flex-col gap-5 overflow-y-auto p-4">
            {form === "simple" ? (
              fields.map((field) => (
                <SheetDropdown
                  key={field.id}
                  field={field}
                  rule={ruleOn(rules, field.id)}
                  onChange={(rule) => change(field.id, rule)}
                />
              ))
            ) : (
              <>
                {shownRows.map((rule) => (
                  <SheetRule
                    key={rule.id}
                    field={fieldOf(rule)!}
                    rule={rule}
                    onChange={(next) => changeRow(rule.id, next)}
                    onRemove={() => changeRow(rule.id, null)}
                  />
                ))}
                {fields.length > 0 && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="self-start">
                        <PlusIcon data-icon="inline-start" />
                        Add Filter
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="max-h-72">
                      {fields.map((field) => {
                        const Icon = FILTER_ICONS[field.type]
                        return (
                          <DropdownMenuItem
                            key={field.id}
                            onSelect={() =>
                              filters?.onChange([
                                ...rows,
                                { ...newRule(field), id: ruleId() },
                              ])
                            }
                          >
                            <Icon className="text-muted-foreground" />
                            {field.label}
                          </DropdownMenuItem>
                        )
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </>
            )}
          </div>
          <div className="border-t p-4">
            <Button className="w-full" onClick={() => setOpen(false)}>
              {counted && noun
                ? `Show ${plural(shown, titled(noun[0]), titled(noun[1]))}`
                : "Show Results"}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

const pickRule = (field: FilterField, value: string): FilterRule | null =>
  value === ALL ? null : { field: field.id, operator: "is", values: [value] }

const switchRule = (field: FilterField, checked: boolean): FilterRule | null =>
  checked ? { field: field.id, operator: "is", values: ["true"] } : null

// A span with either end open; no end, no filter.
const spanRule = (
  field: FilterField,
  from: string,
  to: string
): FilterRule | null =>
  from || to
    ? { field: field.id, operator: "between", values: [from, to] }
    : null

/** A fixed filter on the toolbar's row: a select of one choice, a switch, or a From and To. */
function FilterDropdown({
  field,
  rule,
  onChange,
}: {
  field: FilterField
  rule: FilterRule | undefined
  onChange: (rule: FilterRule | null) => void
}) {
  const id = `filter-${field.id}`
  if (field.type === "boolean")
    return (
      <Field orientation="horizontal" className="w-auto">
        <Switch
          id={id}
          checked={rule?.values[0] === "true"}
          onCheckedChange={(checked) => onChange(switchRule(field, checked))}
        />
        <FieldLabel htmlFor={id} className="font-normal whitespace-nowrap">
          {field.label}
        </FieldLabel>
      </Field>
    )
  if (field.type === "day")
    return (
      <DayRangeFields
        label={field.label}
        from={rule?.values[0] ?? ""}
        to={rule?.values[1] ?? ""}
        onChange={(from, to) => onChange(spanRule(field, from, to))}
      />
    )
  if (field.type !== "enum") return null
  return (
    <Select
      value={rule?.values[0] ?? ALL}
      onValueChange={(value) => onChange(pickRule(field, value))}
    >
      {/* The count only in the list: picked, it is the "N of M" beside the filters, and it cut off here. */}
      <SelectTrigger
        className="w-40 **:data-count:hidden"
        aria-label={`Filter by ${field.label}`}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectGroup>
          <SelectItem value={ALL}>{field.all ?? field.label}</SelectItem>
          {(field.options ?? []).map((choice) => (
            <SelectItem key={choice.value} value={choice.value}>
              {choice.media}
              {choice.label ?? choice.text}
              {choice.count !== undefined && (
                <span data-count className="text-muted-foreground tabular-nums">
                  {choice.count}
                </span>
              )}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

/** A fixed filter in the phone's sheet: its choices as radios, a switch, or a From and To under its name. */
function SheetDropdown({
  field,
  rule,
  onChange,
}: {
  field: FilterField
  rule: FilterRule | undefined
  onChange: (rule: FilterRule | null) => void
}) {
  const id = `filter-${field.id}-sheet`
  if (field.type === "boolean")
    return (
      <Field orientation="horizontal" className="justify-between">
        <FieldLabel htmlFor={id}>{field.label}</FieldLabel>
        <Switch
          id={id}
          checked={rule?.values[0] === "true"}
          onCheckedChange={(checked) => onChange(switchRule(field, checked))}
        />
      </Field>
    )
  if (field.type === "day")
    return (
      <div className="flex flex-col gap-2">
        <p id={id} className="text-sm font-medium">
          {field.label}
        </p>
        <DayRangeFields
          label={field.label}
          labelledBy={id}
          // One width for From and To, so the two fields line up one under the other.
          className="[&_label]:w-8"
          from={rule?.values[0] ?? ""}
          to={rule?.values[1] ?? ""}
          onChange={(from, to) => onChange(spanRule(field, from, to))}
        />
      </div>
    )
  if (field.type !== "enum") return null
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium">{field.label}</p>
      <RadioGroup
        value={rule?.values[0] ?? ALL}
        onValueChange={(value) => onChange(pickRule(field, value))}
        aria-label={field.label}
      >
        {[
          { value: ALL, text: field.all ?? field.label } as FilterChoice,
          ...(field.options ?? []),
        ].map((choice) => (
          <Label
            key={choice.value}
            className="flex min-h-9 items-center gap-3 font-normal pointer-coarse:min-h-11"
          >
            <RadioGroupItem value={choice.value} />
            {choice.media}
            <span className="min-w-0 flex-1">
              {choice.label ?? choice.text}
            </span>
            {choice.count !== undefined && (
              <span className="text-muted-foreground tabular-nums">
                {choice.count}
              </span>
            )}
          </Label>
        ))}
      </RadioGroup>
    </div>
  )
}

/** A chip's filter in the phone's sheet: its column, then its operator and value, set in place. */
function SheetRule({
  field,
  rule,
  onChange,
  onRemove,
}: {
  field: FilterField
  rule: FilterRule
  onChange: (rule: FilterRule) => void
  onRemove: () => void
}) {
  const operators = OPERATORS[field.type]
  return (
    <section
      aria-label={`${field.label} filter`}
      className="flex flex-col gap-2"
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-medium">{field.label}</p>
        <IconButton
          label="Remove Filter"
          aria-label={`Remove ${field.label} filter`}
          // Its 40px target overhangs the row, so the × lines up with the fields' right edge and the name sets the height.
          className="-my-2 -mr-3"
          onClick={onRemove}
        >
          <XIcon />
        </IconButton>
      </div>
      {operators.length > 1 && (
        <Select
          value={rule.operator}
          onValueChange={(value) =>
            onChange(withOperator(rule, value as FilterOperator))
          }
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
      )}
      <FilterValueEditor field={field} rule={rule} onChange={onChange} sheet />
    </section>
  )
}

/**
 * What a search finds nothing for. With `onClear`, a list's way back: "No matching results." and Clear Filters, which
 * clears them all; without it (a search with no filters), the title alone.
 */
export function NoResults({
  onClear,
  className,
}: {
  onClear?: () => void
  className?: string
}) {
  return (
    <EmptyState
      className={className}
      icon={SearchIcon}
      title="No Results"
      description={onClear && "No matching results."}
      action={
        onClear && (
          <Button variant="outline" onClick={onClear}>
            Clear Filters
          </Button>
        )
      }
    />
  )
}
