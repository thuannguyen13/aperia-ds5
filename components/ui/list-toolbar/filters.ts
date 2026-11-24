// A list's filters, one model for both of ListToolbar's forms: the rows a user builds in advanced filters (column,
// operator, value) and the fixed controls of simple filters. Pure, no React and no "use client", so a page on the server can
// read and apply filters too. Field types and operators follow Titan's lib/filters.ts.

import type { ReactNode } from "react"
import { dayOf, dayRangeLabel, formatDate, money } from "@/lib/format"

/** What a field holds, which sets its operators and the control its value is picked with. */
export type FilterType =
  | "text"
  | "number"
  | "money"
  | "enum"
  | "day"
  | "boolean"

/** One choice of an enum field: `text` names it on a chip, `media` leads it, `label` replaces the text in a list. */
export type FilterChoice = {
  value: string
  text: string
  media?: ReactNode
  label?: ReactNode
  /** How many rows it leaves, shown at the end of its row in a list. */
  count?: number
}

/** What a row gives a field to match: an enum may give several values, such as a prospect's products. */
export type FilterValue =
  | string
  | number
  | boolean
  | Date
  | readonly string[]
  | null
  | undefined

/** A field a list can be filtered by. */
export type FilterField<Row = never> = {
  id: string
  /** Title Case, as a column heading: "Current Product". */
  label: string
  type: FilterType
  /** An enum's choices. */
  options?: FilterChoice[]
  /** The dropdown's choice that narrows nothing, such as "All products"; the label when left out. */
  all?: string
  /** A row's value, for `filterRows`. A list filtered on the server leaves it out. */
  read?: (row: Row) => FilterValue
}

export type FilterOperator =
  | "contains"
  | "not_contains"
  | "equals"
  | "starts"
  | "ends"
  | "eq"
  | "neq"
  | "gt"
  | "gte"
  | "lt"
  | "lte"
  | "is"
  | "is_not"
  | "before"
  | "after"
  | "between"

/**
 * A filter that is on: a field, how it compares, and its values, all strings so a filter fits in a page's address.
 * Text and numbers have one value, an enum the choices picked (any of them matches), a boolean "true" or "false", a day
 * one YYYY-MM-DD, and between a From and a To, either one empty to leave that end open.
 */
export type FilterRule = {
  field: string
  operator: FilterOperator
  values: string[]
  /**
   * Which row of advanced filters it is, so one column can hold several filters (MC Score ≥ 700 and ≤ 900). The
   * popover gives each rule one; rules read from a page's address may leave it out.
   */
  id?: string
}

/** Each type's operators, as a chip reads them ("MC Band is High, Critical"); the first is where a new filter starts. */
export const OPERATORS: Record<
  FilterType,
  readonly { value: FilterOperator; label: string }[]
> = {
  text: [
    { value: "contains", label: "contains" },
    { value: "not_contains", label: "does not contain" },
    { value: "equals", label: "is" },
    { value: "starts", label: "starts with" },
    { value: "ends", label: "ends with" },
  ],
  number: [
    { value: "eq", label: "=" },
    { value: "neq", label: "≠" },
    { value: "gt", label: ">" },
    { value: "gte", label: "≥" },
    { value: "lt", label: "<" },
    { value: "lte", label: "≤" },
  ],
  money: [
    { value: "eq", label: "=" },
    { value: "neq", label: "≠" },
    { value: "gt", label: ">" },
    { value: "gte", label: "≥" },
    { value: "lt", label: "<" },
    { value: "lte", label: "≤" },
  ],
  enum: [
    { value: "is", label: "is" },
    { value: "is_not", label: "is not" },
  ],
  day: [
    { value: "is", label: "is" },
    { value: "before", label: "is before" },
    { value: "after", label: "is after" },
    { value: "between", label: "is between" },
  ],
  boolean: [{ value: "is", label: "is" }],
}

/** A new filter on `field`: its type's first operator and no value yet, so it narrows nothing until one is picked. */
export const newRule = (
  field: Pick<FilterField, "id" | "type">
): FilterRule => ({
  field: field.id,
  operator: OPERATORS[field.type][0].value,
  values: [],
})

let lastId = 0
/** A new id for a filter row. */
export const ruleId = () => `rule-${++lastId}`

/**
 * `rules`, each with an id: its own, or one from its place in the list, the same on every render. The first change
 * sends them all back with their ids, so every row keeps its place from then on.
 */
export const withIds = (rules: readonly FilterRule[]): FilterRule[] =>
  rules.map((rule, index) =>
    rule.id ? rule : { ...rule, id: `rule-at-${index}` }
  )

/** Whether a filter narrows the list: it has a value to compare with. */
export function isComplete(rule: FilterRule): boolean {
  if (rule.operator === "between") return rule.values.some(Boolean)
  return rule.values.some((value) => value.trim() !== "")
}

/** A rule's values as a chip says them: "High, Critical", "$250,000", "11/01/2026–11/30/2026". Empty when none. */
export function describeValues(
  field: Pick<FilterField, "type" | "options">,
  rule: FilterRule
): string {
  const values = rule.values.filter((value) => value.trim() !== "")
  if (values.length === 0) return ""
  switch (field.type) {
    case "enum": {
      const texts = values.map(
        (value) =>
          field.options?.find((option) => option.value === value)?.text ?? value
      )
      // Two names fit on a chip; more read as a count.
      return texts.length > 2
        ? `${texts.slice(0, 2).join(", ")} +${texts.length - 2}`
        : texts.join(", ")
    }
    case "boolean":
      return values[0] === "true" ? "Yes" : "No"
    case "money":
      return money(Number(values[0]))
    case "number":
      return Number(values[0]).toLocaleString("en-US")
    case "day":
      return rule.operator === "between"
        ? dayRangeLabel(rule.values[0] || null, rule.values[1] || null)
        : formatDate(values[0])
    default:
      return values[0]
  }
}

const asDay = (raw: FilterValue) =>
  raw instanceof Date
    ? dayOf(raw)
    : typeof raw === "string" && raw
      ? raw.slice(0, 10)
      : null

/** Whether one row's value passes a complete rule. */
function matches(
  type: FilterType,
  rule: FilterRule,
  raw: FilterValue
): boolean {
  const [first = "", second = ""] = rule.values
  switch (type) {
    case "enum": {
      const has = (
        Array.isArray(raw) ? raw : raw == null ? [] : [String(raw)]
      ).some((value) => rule.values.includes(value))
      return rule.operator === "is_not" ? !has : has
    }
    case "boolean":
      return String(Boolean(raw)) === first
    case "number":
    case "money": {
      const want = Number(first)
      if (Number.isNaN(want)) return true
      // An empty value equals nothing, so only "≠" keeps it.
      if (raw == null || raw === "") return rule.operator === "neq"
      const have = Number(raw)
      switch (rule.operator) {
        case "eq":
          return have === want
        case "neq":
          return have !== want
        case "gt":
          return have > want
        case "gte":
          return have >= want
        case "lt":
          return have < want
        case "lte":
          return have <= want
      }
      return true
    }
    case "day": {
      const day = asDay(raw)
      if (!day) return false
      switch (rule.operator) {
        case "is":
          return day === first
        case "before":
          return day < first
        case "after":
          return day > first
        case "between":
          // Both ends count, and an empty end is open.
          return (!first || day >= first) && (!second || day <= second)
      }
      return true
    }
    default: {
      // Case doesn't split text: "acme" finds "Acme Payments".
      const text = (raw == null ? "" : String(raw)).toLowerCase()
      const want = first.trim().toLowerCase()
      switch (rule.operator) {
        case "contains":
          return text.includes(want)
        case "not_contains":
          return !text.includes(want)
        case "equals":
          return text === want
        case "starts":
          return text.startsWith(want)
        case "ends":
          return text.endsWith(want)
      }
      return true
    }
  }
}

/** The rows every complete filter passes (filters combine with AND), in their order. */
export function filterRows<Row>(
  rows: Row[],
  fields: readonly FilterField<Row>[],
  rules: readonly FilterRule[]
): Row[] {
  const active = rules.filter(isComplete).flatMap((rule) => {
    const field = fields.find((each) => each.id === rule.field)
    return field?.read ? [{ rule, field, read: field.read }] : []
  })
  if (active.length === 0) return rows
  return rows.filter((row) =>
    active.every(({ rule, field, read }) =>
      matches(field.type, rule, read(row))
    )
  )
}

/** The rule on `field`, if one is: a list reads a fixed filter's value with it. */
export const ruleOn = (rules: readonly FilterRule[], field: string) =>
  rules.find((rule) => rule.field === field)

/** `rules` with the rule on `field` replaced by `rule`, or removed when `rule` is null. One rule per field. */
export function withRule(
  rules: readonly FilterRule[],
  field: string,
  rule: FilterRule | null
): FilterRule[] {
  const at = rules.findIndex((each) => each.field === field)
  if (!rule) return rules.filter((each) => each.field !== field)
  if (at === -1) return [...rules, rule]
  return rules.map((each, index) => (index === at ? rule : each))
}
