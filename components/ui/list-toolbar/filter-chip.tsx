"use client"

import { useState } from "react"
import {
  CalendarIcon,
  CircleDotIcon,
  DollarSignIcon,
  FilterIcon,
  HashIcon,
  ToggleLeftIcon,
  TypeIcon,
  XIcon,
  type LucideIcon,
} from "lucide-react"
import { Button } from "../button/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../command/command"
import { DayRangeFields } from "../day-range-fields/day-range-fields"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../dropdown-menu/dropdown-menu"
import { IconButton } from "../icon-button/icon-button"
import { Input } from "../input/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "../input-group/input-group"
import { Popover, PopoverContent, PopoverTrigger } from "../popover/popover"
import { cn } from "@/lib/utils"
import {
  OPERATORS,
  describeValues,
  type FilterField,
  type FilterOperator,
  type FilterRule,
} from "./filters"

/** Each type's mark, leading its column in Add Filter and its chip, so a user sees what kind of value it takes. */
export const FILTER_ICONS: Record<FilterField["type"], LucideIcon> = {
  text: TypeIcon,
  number: HashIcon,
  money: DollarSignIcon,
  enum: CircleDotIcon,
  day: CalendarIcon,
  boolean: ToggleLeftIcon,
}

/** The rule with another operator, its values reshaped when it moves to or from a span of days. */
export function withOperator(
  rule: FilterRule,
  operator: FilterOperator
): FilterRule {
  if (operator === rule.operator) return rule
  const values =
    operator === "between"
      ? [rule.values[0] ?? "", ""]
      : rule.operator === "between"
        ? [rule.values[0] || rule.values[1] || ""].filter(Boolean)
        : rule.values
  return { ...rule, operator, values }
}

/**
 * Where a filter's value is picked, by its type: a list of choices (several for an enum, searchable), a text
 * or number field, an amount, a day, or a From and To. Every change applies at once; `onDone` closes what holds it,
 * after a single pick or Enter.
 */
export function FilterValueEditor({
  field,
  rule,
  onChange,
  onDone,
  autoFocus = false,
  sheet = false,
}: {
  field: FilterField
  rule: FilterRule
  onChange: (rule: FilterRule) => void
  onDone?: () => void
  /** Focus the field as it appears: in a chip's panel, not on a phone's sheet, where it would raise the keyboard. */
  autoFocus?: boolean
  /** On a phone's sheet rather than in a panel: the whole width, and a list on the sheet's own fill. */
  sheet?: boolean
}) {
  const set = (values: string[]) => onChange({ ...rule, values })
  const enter = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") onDone?.()
  }

  if (field.type === "enum" || field.type === "boolean") {
    const many = field.type === "enum"
    const options =
      field.type === "boolean"
        ? [
            { value: "true", text: "Yes" },
            { value: "false", text: "No" },
          ]
        : (field.options ?? [])
    return (
      <Command
        // Yes and No have no search to focus, so the list itself takes focus and the arrow keys. The first choice is
        // lit only while the list has focus, so it never reads as picked.
        tabIndex={many ? undefined : 0}
        className={cn(
          "outline-none [&:not(:focus-within)_[cmdk-item][data-selected=true]]:bg-transparent",
          // On the sheet the list sits on the sheet's fill and on its name's line: the search loses its inset, and each
          // choice's padding (the group's 4px and the row's 8px) goes back as a margin, so its highlight reaches past
          // the text.
          sheet &&
            "overflow-visible bg-transparent p-0 [&_[cmdk-group]]:-mx-3 [&_[data-slot=command-input-wrapper]]:p-0"
        )}
      >
        {many && <CommandInput placeholder={`Search ${field.label}`} />}
        <CommandList>
          <CommandEmpty>No Results</CommandEmpty>
          <CommandGroup>
            {options.map((option) => {
              const picked = rule.values.includes(option.value)
              return (
                <CommandItem
                  key={option.value}
                  value={option.text}
                  data-checked={picked}
                  onSelect={() => {
                    if (!many) {
                      set([option.value])
                      onDone?.()
                    } else
                      set(
                        picked
                          ? rule.values.filter((each) => each !== option.value)
                          : [...rule.values, option.value]
                      )
                  }}
                >
                  {"media" in option && option.media}
                  {("label" in option && option.label) || option.text}
                  {/* The check shows it; a screen reader hears it. */}
                  {picked && <span className="sr-only">, picked</span>}
                </CommandItem>
              )
            })}
          </CommandGroup>
        </CommandList>
      </Command>
    )
  }

  if (field.type === "day") {
    return rule.operator === "between" ? (
      <DayRangeFields
        label={field.label}
        className="[&_label]:w-8"
        from={rule.values[0] ?? ""}
        to={rule.values[1] ?? ""}
        onChange={(from, to) => set([from, to])}
      />
    ) : (
      <Input
        type="date"
        aria-label={field.label}
        className={sheet ? "w-full" : "w-40"}
        autoFocus={autoFocus}
        value={rule.values[0] ?? ""}
        onChange={(event) => set([event.target.value])}
        onKeyDown={enter}
      />
    )
  }

  if (field.type === "money") {
    return (
      <InputGroup className={sheet ? "w-full" : "w-44"}>
        <InputGroupAddon>
          <InputGroupText>$</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput
          type="number"
          inputMode="decimal"
          aria-label={field.label}
          autoFocus={autoFocus}
          value={rule.values[0] ?? ""}
          onChange={(event) => set([event.target.value])}
          onKeyDown={enter}
        />
      </InputGroup>
    )
  }

  return (
    <Input
      type={field.type === "number" ? "number" : "text"}
      inputMode={field.type === "number" ? "decimal" : undefined}
      aria-label={field.label}
      className={sheet ? "w-full" : "w-56"}
      autoFocus={autoFocus}
      value={rule.values[0] ?? ""}
      onChange={(event) => set([event.target.value])}
      onKeyDown={enter}
    />
  )
}

// A part of a chip that can be pressed: the hover fill and the focus ring are its own, so each part reads as a control.
const PART =
  "flex items-center gap-1.5 px-2.5 outline-none transition-colors hover:bg-muted focus-visible:relative focus-visible:z-10 focus-visible:ring-3 focus-visible:ring-ring/50 data-[state=open]:bg-muted"

/**
 * One filter that is on, as a chip in the toolbar that reads as a sentence: the column, its operator, its values
 * ("MC Band is High, Critical"), then × to remove it. The operator and the values open where they're changed.
 * `defaultOpen` opens the values on the chip's first render, as a filter just added from Add Filter does.
 */
export function FilterChip({
  field,
  rule,
  onChange,
  onRemove,
  defaultOpen = false,
}: {
  field: FilterField
  rule: FilterRule
  onChange: (rule: FilterRule) => void
  onRemove: () => void
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  const Icon = FILTER_ICONS[field.type]
  const operators = OPERATORS[field.type]
  const operator =
    operators.find((each) => each.value === rule.operator) ?? operators[0]
  const values = describeValues(field, rule)
  const list = field.type === "enum" || field.type === "boolean"

  return (
    <div
      role="group"
      aria-label={`${field.label} filter`}
      className="flex h-8 items-stretch divide-x-[0.5px] divide-input rounded-lg control text-sm"
    >
      <span className="flex items-center gap-1.5 px-2.5">
        <Icon aria-hidden className="size-4 text-muted-foreground" />
        {field.label}
      </span>
      {operators.length > 1 ? (
        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(PART, "text-muted-foreground")}
            aria-label={`${field.label} operator: ${operator.label}`}
          >
            {operator.label}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuRadioGroup
              value={operator.value}
              onValueChange={(value) =>
                onChange(withOperator(rule, value as FilterOperator))
              }
            >
              {operators.map((each) => (
                <DropdownMenuRadioItem key={each.value} value={each.value}>
                  {each.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <span className="flex items-center px-2.5 text-muted-foreground">
          {operator.label}
        </span>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          className={cn(PART, "max-w-60")}
          aria-label={`${field.label}: ${values || "no value"}`}
        >
          {/* No value yet reads as a missing value, an em dash: the filter narrows nothing until one is picked. */}
          <span className={cn("truncate", !values && "text-muted-foreground")}>
            {values || "—"}
          </span>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className={cn("w-auto", list ? "w-60 p-0" : "p-2")}
        >
          <FilterValueEditor
            field={field}
            rule={rule}
            onChange={onChange}
            onDone={() => setOpen(false)}
            autoFocus
          />
        </PopoverContent>
      </Popover>
      <IconButton
        label="Remove Filter"
        aria-label={`Remove ${field.label} filter`}
        className="h-auto w-8 rounded-l-none rounded-r-lg"
        onClick={onRemove}
      >
        <XIcon />
      </IconButton>
    </div>
  )
}

/**
 * Add Filter: a searchable list of the columns not yet filtered, each with its type's mark. Picking one adds its chip
 * with the values open, so the next step is right there.
 */
export function AddFilter({
  fields,
  onAdd,
}: {
  fields: readonly FilterField[]
  onAdd: (field: FilterField) => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <FilterIcon data-icon="inline-start" />
          Add Filter
        </Button>
      </PopoverTrigger>
      {/* Focus goes to the new chip's values, not back here, or the chip's panel would close as it opens. */}
      <PopoverContent
        align="start"
        className="w-60 p-0"
        onCloseAutoFocus={(event) => event.preventDefault()}
      >
        <Command>
          <CommandInput placeholder="Search columns" />
          <CommandList>
            <CommandEmpty>No Results</CommandEmpty>
            <CommandGroup>
              {fields.map((field) => {
                const Icon = FILTER_ICONS[field.type]
                return (
                  <CommandItem
                    key={field.id}
                    value={field.label}
                    onSelect={() => {
                      setOpen(false)
                      onAdd(field)
                    }}
                  >
                    <Icon className="text-muted-foreground" />
                    {field.label}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
