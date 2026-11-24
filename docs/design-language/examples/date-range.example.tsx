import { useState } from "react"
import {
  DayRangeFields,
  Input,
  PageHeader,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "aperia-ds5"
import { StatTile } from "../recipes"
import { dayRangeLabel, isDay, money } from "@/lib/format"
import { BeforeAfter, Screen } from "./before-after"

const RANGES = {
  quarter: "This quarter",
  last: "Last quarter",
  year: "Year to date",
  twelve: "Last 12 months",
  all: "All time",
  custom: "Custom",
} as const
type Range = keyof typeof RANGES

// The span each named range counts, as of 11/23/2026.
const SPANS: Record<
  Exclude<Range, "custom">,
  [string | null, string | null]
> = {
  quarter: ["2026-10-01", "2026-12-31"],
  last: ["2026-07-01", "2026-09-30"],
  year: ["2026-01-01", "2026-11-23"],
  twelve: ["2025-11-24", "2026-11-23"],
  all: [null, null],
}
const FIGURES: Record<Exclude<Range, "custom">, [number, number, number]> = {
  quarter: [38, 9, 2_400_000],
  last: [41, 12, 3_100_000],
  year: [126, 37, 9_800_000],
  twelve: [139, 40, 10_600_000],
  all: [412, 118, 31_200_000],
}

/** The dashboard: the range in the toolbar row, the span in words once in the subtitle. */
function Dashboard() {
  const [range, setRange] = useState<Range>("quarter")
  const [from, setFrom] = useState("2026-10-01")
  const [to, setTo] = useState("2026-11-15")
  // Custom counts once both days are whole dates; until then the last whole span stays.
  const [applied, setApplied] = useState<[string, string]>([
    "2026-10-01",
    "2026-11-15",
  ])
  const span = range === "custom" ? applied : SPANS[range]
  const subtitle =
    range === "all" ? "All time" : dayRangeLabel(span[0], span[1])
  const figures = range === "custom" ? FIGURES.quarter : FIGURES[range]
  return (
    <Screen caption="Pick Custom and change a day: the subtitle and figures follow once both are whole dates.">
      <PageHeader title="Dashboard" subtitle={subtitle} />
      <div className="flex flex-wrap items-center gap-2">
        <Select
          value={range}
          onValueChange={(value) => setRange(value as Range)}
        >
          <SelectTrigger aria-label="Date range" className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent position="popper">
            {Object.entries(RANGES).map(([key, label]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {range === "custom" && (
          <DayRangeFields
            label="Custom range"
            from={from}
            to={to}
            onChange={(nextFrom, nextTo) => {
              setFrom(nextFrom)
              setTo(nextTo)
              if (isDay(nextFrom) && isDay(nextTo))
                setApplied([nextFrom, nextTo])
            }}
          />
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 @xl:grid-cols-3">
        <StatTile label="New Opportunities" value={figures[0]} />
        <StatTile label="Closed Won" value={figures[1]} />
        <StatTile label="Won Value" value={money(figures[2])} />
      </div>
    </Screen>
  )
}

/** A hand-built "Date Range:" label over two fields, with no span under the title, against the named spans. */
export function DateRangeBeforeAfter() {
  return (
    <BeforeAfter
      beforeNote="a “Date Range:” label and two date fields; the span shows nowhere else"
      afterNote="a dropdown of named spans; the subtitle states the span"
      before={
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-medium">Date Range:</span>
          <Input aria-label="From" defaultValue="10/01/2026" className="w-32" />
          <Input aria-label="To" defaultValue="12/31/2026" className="w-32" />
        </div>
      }
      after={
        <div className="flex flex-col gap-3">
          <PageHeader title="Dashboard" subtitle="10/01/2026–12/31/2026" />
          <Select defaultValue="quarter">
            <SelectTrigger aria-label="Date range" className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper">
              {Object.entries(RANGES).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      }
    />
  )
}

export const dateRangeExamples = {
  "How it looks and behaves": <Dashboard />,
  "Before and after": <DateRangeBeforeAfter />,
}
