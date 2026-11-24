// How every Aperia app writes dates, times, money and counts (UI Style Guide V4.3; ported from Sales Portal's
// lib/format.ts and lib/day.ts). Import from "aperia-ds5/format". Pure functions, no React.
//
// A day is a YYYY-MM-DD string; a moment is a Date. Aperia's teams work from Dallas, so a day starts and ends at
// midnight there by default, on the server and in every browser alike. Pass `zone` for another.

export const ZONE = "America/Chicago"

const dayFormat = new Map<string, Intl.DateTimeFormat>()

/** The day a moment falls on in `zone`, as YYYY-MM-DD. */
export function dayOf(moment: Date, zone = ZONE): string {
  let format = dayFormat.get(zone)
  if (!format) {
    // en-CA formats as YYYY-MM-DD.
    format = new Intl.DateTimeFormat("en-CA", {
      timeZone: zone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    dayFormat.set(zone, format)
  }
  return format.format(moment)
}

/** Today in `zone`, as YYYY-MM-DD. */
export const today = (zone = ZONE) => dayOf(new Date(), zone)

/** YYYY-MM-DD, `days` after `starts`. Date math in UTC so a time zone never shifts the day. */
export function addDays(starts: string, days: number): string {
  const [y, m, d] = starts.split("-").map(Number)
  return new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10)
}

/** Whole days from one YYYY-MM-DD to another, negative when `to` is earlier. */
export function daysBetween(from: string, to: string): number {
  const at = (value: string) => {
    const [y, m, d] = value.split("-").map(Number)
    return Date.UTC(y, m - 1, d)
  }
  return Math.round((at(to) - at(from)) / 86_400_000)
}

/** Whether a value is a YYYY-MM-DD day that exists on the calendar: 2026-02-31 is not. */
export function isDay(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value))
    return false
  const [y, m, d] = value.split("-").map(Number)
  const date = new Date(Date.UTC(y, m - 1, d))
  return (
    date.getUTCFullYear() === y &&
    date.getUTCMonth() === m - 1 &&
    date.getUTCDate() === d
  )
}

/**
 * The one way an app writes a date: "09/22/2026" from a YYYY-MM-DD day. A Date is a moment, so it keeps its time in
 * `zone`: "09/22/2026 02:30 PM".
 */
export const formatDate = (value: string | Date, zone = ZONE) =>
  typeof value === "string"
    ? new Date(`${value}T00:00`).toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      })
    : value
        .toLocaleString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          timeZone: zone,
        })
        .replace(", ", " ")

/** A moment with its zone, as an app writes a time someone acted: "09/22/2026 02:30 PM CDT". */
export const formatMoment = (value: Date, zone = ZONE) => {
  const name = new Intl.DateTimeFormat("en-US", {
    timeZone: zone,
    timeZoneName: "short",
  })
    .formatToParts(value)
    .find((part) => part.type === "timeZoneName")?.value
  return name ? `${formatDate(value, zone)} ${name}` : formatDate(value, zone)
}

/** A span of days in words: "09/01/2026–09/30/2026", "From 09/01/2026", "Until 09/30/2026", or "" for neither end. */
export function dayRangeLabel(from: string | null, to: string | null) {
  if (from && to) return `${formatDate(from)}–${formatDate(to)}`
  if (from) return `From ${formatDate(from)}`
  return to ? `Until ${formatDate(to)}` : ""
}

/**
 * How long ago, as "3d ago". A moment under a day old reads "Just now", "5m ago" or "3h ago"; from a day on, and for a
 * YYYY-MM-DD day, it counts days in `zone`, today reading "Today". Show it with the full date on hover (`RelativeTime`).
 */
export function ago(value: string | Date, zone = ZONE) {
  const moment =
    value instanceof Date ? value : value.includes("T") ? new Date(value) : null
  if (moment) {
    const minutes = Math.floor((Date.now() - moment.getTime()) / 60_000)
    // A clock a little behind the server's puts the moment slightly ahead: still just now.
    if (minutes > -60 && minutes < 1) return "Just now"
    if (minutes >= 1 && minutes < 60) return `${minutes}m ago`
    if (minutes >= 60 && minutes < 24 * 60)
      return `${Math.floor(minutes / 60)}h ago`
  }
  const days = daysBetween(
    typeof value === "string" ? value.slice(0, 10) : dayOf(value, zone),
    today(zone)
  )
  if (days <= 0) return "Today"
  if (days < 7) return `${days}d ago`
  if (days < 30) return `${Math.floor(days / 7)}w ago`
  if (days < 365) return `${Math.floor(days / 30)}mo ago`
  return `${Math.floor(days / 365)}y ago`
}

/**
 * An amount in full, never shortened ($1.8M): whole dollars when it has no cents, "$1,250", and two decimals when it
 * does, "$12.50", "$1,840,000.25". `cents: true` always shows two decimals; `cents: false` always rounds to whole
 * dollars. A negative amount is in parentheses, "($125.50)", as the UI Style Guide V4.3 writes it; show it in the
 * destructive color (the money value recipe on the design skill's Money and Numbers page).
 */
export const money = (
  value: number,
  { cents = "auto" }: { cents?: boolean | "auto" } = {}
) => {
  const decimals =
    cents === "auto" ? Math.round(Math.abs(value) * 100) % 100 !== 0 : cents
  const figure = `$${Math.abs(
    decimals ? value : Math.round(value)
  ).toLocaleString("en-US", {
    minimumFractionDigits: decimals ? 2 : 0,
    maximumFractionDigits: decimals ? 2 : 0,
  })}`
  return value < 0 ? `(${figure})` : figure
}

/** What an amount the viewer may not see reads as: the shape of a figure, so a column keeps its width. */
export const HIDDEN_MONEY = "$XX,XXX"

/** "42%", rounded, or null when there is nothing to divide by (show it as a missing value, a muted em dash). */
export function percent(part: number, whole: number): string | null {
  return whole === 0 ? null : `${Math.round((part / whole) * 100)}%`
}

/** Up to two initials from a name, for an avatar's fallback: "Maria Chen" → "MC". */
export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}

/** "1 prospect" or "3 prospects"; `one` and `many` may carry the verb, as in "prospect is" and "prospects are". */
export const plural = (count: number, one: string, many: string) =>
  `${count.toLocaleString("en-US")} ${count === 1 ? one : many}`

/** Names as a sentence lists them, with the serial comma (V4.3): "Acme", "Acme and Globex", "Acme, Globex, and Initech". */
export const listed = (names: readonly string[]) =>
  names.length > 2
    ? `${names.slice(0, -1).join(", ")}, and ${names.at(-1)}`
    : names.join(" and ")
