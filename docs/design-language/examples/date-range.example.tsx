import { useState } from "react"
import { CalendarIcon } from "lucide-react"
import {
  Button,
  Calendar,
  DayRangeFields,
  Input,
  ListToolbar,
  PageHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "aperia-ds5"
import { StatTile } from "../recipes"
import { dayRangeLabel, isDay, money } from "@/lib/format"
import { BeforeAfter, Screen } from "./before-after"

const mmddyyyy = (date: Date) =>
  date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  })

/** Titan's report date: one outlined button in the toolbar's start, opening a calendar that closes on a pick. */
function ReportDate({
  date,
  onChange,
}: {
  date: Date
  onChange: (date: Date) => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="font-normal">
          <CalendarIcon data-icon="inline-start" />
          <span className="text-muted-foreground max-sm:sr-only">
            Report Date
          </span>
          <span className="tabular-nums">{mmddyyyy(date)}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          defaultMonth={date}
          required
          onSelect={(day) => {
            if (day) onChange(day)
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}

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

/** Merchant View with its report date first in the toolbar. */
function MerchantList() {
  const [date, setDate] = useState(new Date(2026, 10, 22))
  const [query, setQuery] = useState("")
  return (
    <Screen caption="Open Report Date and pick a day: the calendar closes on the pick.">
      <ListToolbar
        start={<ReportDate date={date} onChange={setDate} />}
        search={{
          placeholder: "Search MID or merchant name",
          value: query,
          onChange: setQuery,
        }}
        shown={11}
        total={11}
        noun={["merchant", "merchants"]}
      />
    </Screen>
  )
}

export function DateRangeExample() {
  return (
    <>
      <MerchantList />
      <Dashboard />
    </>
  )
}

/** Titan's stacked label and field, against the report date button. */
export function DateRangeBeforeAfter() {
  return (
    <BeforeAfter
      beforeNote="a “Report Date:” label and its own date field"
      afterNote="one control in the toolbar: icon, muted label, the date"
      before={
        <div className="flex flex-wrap items-center gap-2">
          <label htmlFor="before-report-date" className="font-medium">
            Report Date:
          </label>
          <div className="relative w-44">
            <Input
              id="before-report-date"
              defaultValue="11/22/2026"
              className="pr-9"
            />
            <CalendarIcon
              className="absolute top-1/2 right-2.5 size-4 -translate-y-1/2"
              aria-hidden
            />
          </div>
        </div>
      }
      after={
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" className="font-normal">
            <CalendarIcon data-icon="inline-start" />
            <span className="text-muted-foreground max-sm:sr-only">
              Report Date
            </span>
            <span className="tabular-nums">11/22/2026</span>
          </Button>
        </div>
      }
    />
  )
}

export const dateRangeExamples = {
  "How it looks and behaves": <DateRangeExample />,
  "Before and after": <DateRangeBeforeAfter />,
}
