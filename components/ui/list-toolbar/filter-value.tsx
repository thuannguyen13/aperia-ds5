"use client"

import {
  CalendarIcon,
  CircleDotIcon,
  DollarSignIcon,
  HashIcon,
  ToggleLeftIcon,
  TypeIcon,
  type LucideIcon,
} from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../command/command"
import { DayRangeFields } from "../day-range-fields/day-range-fields"
import { Input } from "../input/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "../input-group/input-group"
import { cn } from "@/lib/utils"
import type { FilterField, FilterOperator, FilterRule } from "./filters"

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
