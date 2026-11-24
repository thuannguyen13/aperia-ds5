"use client"

import { useState } from "react"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  FilterIcon,
  PlusIcon,
  SearchIcon,
  XIcon,
} from "lucide-react"
import { Button } from "../button/button"
import { DayRangeFields } from "../day-range-fields/day-range-fields"
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
import { ReasonTooltip } from "../reason-tooltip/reason-tooltip"
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
import { ToggleGroup, ToggleGroupItem } from "../toggle-group/toggle-group"
import { plural } from "@/lib/format"
import { cn } from "@/lib/utils"
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

/**
 * A list's one toolbar: its search and filters on the left; its layout switch, Sort, and the list's own actions (such as
 * Import or Add Prospect) on the right. Every list page has this one, above its table or board, as a section of the
 * page. It holds only what changes or adds to the list: what picks a list's scope, such as a report date, is the app's
 * own, outside it. The list's count is under the list, with its pages (`ListPager`).
 *
 * Filters come in two forms on one model (`FilterField`, `FilterRule`), so either form, the phone's sheet and Clear All
 * work the same. Advanced filters, the default, are one Filter button that opens a popover where each filter on is a
 * row of Column, Operator and Value, added from Add Filter. Simple filters (`form: "simple"`), for a list with four
 * filters or fewer, are fixed controls on the toolbar. Apply them with `filterRows`, or send them to the server.
 *
 * On a phone the actions and the layout switch take the first row, when the list has any. The next row is the search,
 * then Filter (counting those on) and Sort as icon buttons; under it the filters that are on show as chips on one line
 * that scrolls sideways. The filters are set in a sheet from the bottom that opens on one line per filter, and a tap
 * opens that filter alone.
 *
 * The wide row and the phone's rows are both in the markup, one hidden by CSS, so the server renders the right one with
 * no flash: a control passed in renders twice, so it keeps its state with the list (controlled), not in itself.
 */
export function ListToolbar({
  search,
  filters,
  shown,
  total,
  noun,
  sort,
  layout,
  actions,
}: {
  search?: {
    placeholder: string
    value: string
    onChange: (value: string) => void
  }
  filters?: ListFilters
  /** Rows the search and filters leave, and rows in all, for the phone's sheet ("12 prospects of 40"). */
  shown?: number
  total?: number
  /** What a row is, one and many, for the sheet's count: ["prospect", "prospects"]. */
  noun?: readonly [string, string]
  /** The list's Sort: what it sorts by, from the list's own order, and which way (`SortControl`). */
  sort?: React.ComponentProps<typeof SortControl>
  /** How the list shows, such as a Board and Table switch, before Sort. */
  layout?: React.ReactNode
  /** The list's own actions, such as Import or Add Prospect, at the right end with the primary last. */
  actions?: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  // The sheet shows its list of filters, or one step: "add" (pick a column), a rule's id (advanced filters), or a
  // field's id (simple filters).
  const [step, setStep] = useState<string | null>(null)
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
  const stepRule =
    form === "advanced" ? shownRows.find((rule) => rule.id === step) : undefined
  const stepField =
    form === "simple" ? fields.find((field) => field.id === step) : undefined

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
        {(layout || sorting || actions) && (
          <div className="ml-auto flex items-center gap-3">
            {layout}
            {sorting}
            {actions && (
              <div className="flex items-center gap-2">{actions}</div>
            )}
          </div>
        )}
      </div>

      {/* A phone: the actions and the layout switch, when the list has any; then the search with Filter and Sort as icon
          buttons; then the filters that are on as chips that scroll sideways. The sheet sets the filters. */}
      <div className="flex shrink-0 flex-col gap-2 sm:hidden">
        {(layout || actions) && (
          <div className="flex flex-wrap items-center gap-2">
            {layout}
            {actions && (
              <div className="ml-auto flex items-center gap-2">{actions}</div>
            )}
          </div>
        )}
        <div className="flex items-center gap-2">
          {searchField}
          {fields.length > 0 && (
            <IconButton
              label={on.length > 0 ? `Filter, ${on.length} on` : "Filter"}
              variant="outline"
              size="icon"
              className="relative shrink-0"
              onClick={() => {
                setStep(null)
                setOpen(true)
              }}
            >
              <FilterIcon />
              {on.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground tabular-nums">
                  {on.length}
                </span>
              )}
            </IconButton>
          )}
          {sort && <SortControl {...sort} iconOnly />}
        </div>
        {on.length > 0 && (
          <div className="flex min-w-0 items-center gap-2">
            {on.length > 0 && (
              // One line that scrolls sideways, however many are on, so the list never moves down.
              <div className="flex min-w-0 flex-1 gap-1.5 overflow-x-auto [scrollbar-width:none]">
                {(form === "simple" ? on : onRows).map((rule) => {
                  const field = fieldOf(rule)!
                  return (
                    <Button
                      key={rule.id ?? rule.field}
                      variant="secondary"
                      size="sm"
                      className="shrink-0 rounded-full"
                      aria-label={`Clear ${field.label}: ${describeValues(field, rule)}`}
                      onClick={() =>
                        form === "simple"
                          ? change(rule.field, null)
                          : changeRow(rule.id, null)
                      }
                    >
                      {chipText(field, rule)}
                      <XIcon data-icon="inline-end" />
                    </Button>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="bottom"
          className="max-h-[85dvh] gap-0 rounded-t-2xl"
        >
          {/* Every change applies at once, so the header holds all the sheet needs: the count, Clear All, and close. */}
          <SheetHeader className="flex-row items-start gap-2 border-b pr-12">
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <SheetTitle>Filters</SheetTitle>
              {counted && (
                <SheetDescription>
                  {noun ? plural(shown, ...noun) : shown} of {total}
                </SheetDescription>
              )}
            </div>
            {/* ReasonTooltip grows to fill a row; this box keeps Clear All at its own width. */}
            <div className="shrink-0">
              <ReasonTooltip
                reason={
                  shownRules.length === 0 ? "No filters to clear." : undefined
                }
              >
                <Button
                  variant="ghost"
                  size="sm"
                  // Centered on the close button beside it.
                  className="-mt-0.5"
                  disabled={shownRules.length === 0}
                  onClick={() => {
                    clearAll()
                    setStep(null)
                  }}
                >
                  Clear All
                </Button>
              </ReasonTooltip>
            </div>
          </SheetHeader>
          <div className="flex min-h-0 flex-col overflow-y-auto p-4">
            {step === "add" ? (
              <FilterStep title="Add Filter" onBack={() => setStep(null)} list>
                <RowList>
                  {fields.map((field) => {
                    const Icon = FILTER_ICONS[field.type]
                    return (
                      <StepRow
                        key={field.id}
                        onClick={() => {
                          const rule = { ...newRule(field), id: ruleId() }
                          filters?.onChange([...rows, rule])
                          setStep(rule.id)
                        }}
                      >
                        <Icon className="size-4 text-muted-foreground" />
                        <span className="flex-1">{field.label}</span>
                      </StepRow>
                    )
                  })}
                </RowList>
              </FilterStep>
            ) : stepRule && fieldOf(stepRule) ? (
              <FilterStep
                title={fieldOf(stepRule)!.label}
                onBack={() => setStep(null)}
              >
                <RuleEditor
                  field={fieldOf(stepRule)!}
                  rule={stepRule}
                  onChange={(next) => changeRow(stepRule.id, next)}
                />
              </FilterStep>
            ) : stepField ? (
              <FilterStep title={stepField.label} onBack={() => setStep(null)}>
                <SheetDropdown
                  field={stepField}
                  rule={ruleOn(rules, stepField.id)}
                  onChange={(rule) => change(stepField.id, rule)}
                  bare
                />
              </FilterStep>
            ) : form === "simple" ? (
              <RowList>
                {fields.map((field) =>
                  // A yes or no filter is set in place, one tap; the others open their own step.
                  field.type === "boolean" ? (
                    <div key={field.id} className="px-3 py-2">
                      <SheetDropdown
                        field={field}
                        rule={ruleOn(rules, field.id)}
                        onChange={(rule) => change(field.id, rule)}
                      />
                    </div>
                  ) : (
                    <StepRow key={field.id} onClick={() => setStep(field.id)}>
                      <Summary
                        label={field.label}
                        value={
                          ruleOn(rules, field.id)
                            ? describeValues(field, ruleOn(rules, field.id)!)
                            : (field.all ?? "Any")
                        }
                      />
                      <ChevronRightIcon className="size-4 text-muted-foreground" />
                    </StepRow>
                  )
                )}
              </RowList>
            ) : (
              <>
                {shownRows.length === 0 && (
                  <p className="py-3 text-sm text-muted-foreground">
                    No filters applied.
                  </p>
                )}
                {shownRows.length > 0 && (
                  <RowList>
                    {shownRows.map((rule) => {
                      const field = fieldOf(rule)!
                      const values = describeValues(field, rule)
                      const operator = OPERATORS[field.type].find(
                        (each) => each.value === rule.operator
                      )
                      return (
                        // The row opens the filter; its own × removes it, as on a desktop filter row.
                        <div
                          key={rule.id}
                          // The row's hover and focus cover its × too, so the line reads as one row.
                          className="flex items-center pr-2 hover:bg-muted/50 has-[>button:first-child:focus-visible]:bg-muted/50 has-[>button:first-child:focus-visible]:outline-2 has-[>button:first-child:focus-visible]:-outline-offset-2 has-[>button:first-child:focus-visible]:outline-ring"
                        >
                          <StepRow
                            className="min-w-0 flex-1 hover:bg-transparent focus-visible:bg-transparent focus-visible:outline-none"
                            onClick={() => setStep(rule.id!)}
                          >
                            <Summary
                              label={field.label}
                              value={
                                values
                                  ? `${operator?.label ?? ""} ${values}`
                                  : ""
                              }
                            />
                          </StepRow>
                          <IconButton
                            label="Remove Filter"
                            aria-label={`Remove ${field.label} filter`}
                            onClick={() => changeRow(rule.id, null)}
                          >
                            <XIcon />
                          </IconButton>
                        </div>
                      )
                    })}
                  </RowList>
                )}
                <Button
                  variant="ghost"
                  className="mt-2 -ml-2.5 self-start"
                  onClick={() => setStep("add")}
                >
                  <PlusIcon data-icon="inline-start" />
                  Add Filter
                </Button>
              </>
            )}
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
  bare = false,
}: {
  field: FilterField
  rule: FilterRule | undefined
  onChange: (rule: FilterRule | null) => void
  /** In its own step, which names it: no name over the choices. */
  bare?: boolean
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
        {!bare && (
          <p id={id} className="text-sm font-medium">
            {field.label}
          </p>
        )}
        <DayRangeFields
          label={field.label}
          labelledBy={bare ? undefined : id}
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
      {!bare && <p className="text-sm font-medium">{field.label}</p>}
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
            className="flex min-h-9 items-center gap-3 font-normal"
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

/** One step of the phone's sheet: a way back to the list, the step's name, and what it sets. */
function FilterStep({
  title,
  onBack,
  list = false,
  children,
}: {
  title: string
  onBack: () => void
  /** A list of lines to pick from, which sit together, rather than the controls of one filter. */
  list?: boolean
  children: React.ReactNode
}) {
  return (
    <section aria-label={title} className="flex flex-col">
      <div className="-ml-2.5 flex items-center gap-1 py-1">
        <IconButton label="Back to Filters" size="icon" onClick={onBack}>
          <ChevronLeftIcon />
        </IconButton>
        <h3 className="text-sm font-medium">{title}</h3>
      </div>
      <div className={cn("flex flex-col pt-2", !list && "gap-3")}>
        {children}
      </div>
    </section>
  )
}

/** The lines of the phone's sheet, in one card with a line between each. */
function RowList({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col divide-y divide-border overflow-hidden surface">
      {children}
    </div>
  )
}

/** A line of the phone's sheet that opens a step: the whole line is the target, at a thumb's height. */
function StepRow({
  onClick,
  className,
  children,
}: {
  onClick: () => void
  className?: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      // Focus as a table row shows it, inside the line, since the card clips anything outside.
      className={cn(
        "flex min-h-11 items-center gap-3 px-3 py-1.5 text-left text-sm outline-none hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
        className
      )}
    >
      {children}
    </button>
  )
}

/** A filter on one line: its column, then what it is set to, or "Pick a value" while it has none. */
function Summary({ label, value }: { label: string; value: string }) {
  return (
    <span className="flex min-w-0 flex-1 flex-col">
      <span className="font-medium">{label}</span>
      <span className="truncate text-muted-foreground">
        {value || "Pick a value"}
      </span>
    </span>
  )
}

/** One filter's step on a phone: its ways to compare as a row of toggles, when it has more than one, then its value. */
function RuleEditor({
  field,
  rule,
  onChange,
}: {
  field: FilterField
  rule: FilterRule
  onChange: (rule: FilterRule) => void
}) {
  const operators = OPERATORS[field.type]
  return (
    <>
      {operators.length > 1 && (
        <ToggleGroup
          type="single"
          variant="outline"
          size="sm"
          spacing={1}
          className="flex-wrap"
          aria-label={`${field.label} operator`}
          value={rule.operator}
          // A toggle group lets its last toggle go; a filter always compares one way, so that tap is ignored.
          onValueChange={(value) =>
            value && onChange(withOperator(rule, value as FilterOperator))
          }
        >
          {operators.map((each) => (
            <ToggleGroupItem key={each.value} value={each.value}>
              {each.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      )}
      <FilterValueEditor field={field} rule={rule} onChange={onChange} sheet />
    </>
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
