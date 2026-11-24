import { useState, type ReactNode } from "react"
import { TrendingUpIcon } from "lucide-react"
import {
  DayRangeFields,
  EmptyState,
  PageHeader,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "aperia-ds5"
import {
  Bar,
  BarChart,
  CHART_MARGIN,
  ChartContainer,
  ChartGrid,
  ChartLegend,
  ChartLegendContent,
  ChartTip,
  Line,
  LineChart,
  XAxis,
  YAxis,
  chartAxisProps,
  type ChartConfig,
} from "@/components/ui/chart"
import { dayRangeLabel, isDay, money, percent } from "@/lib/format"
import { StatTile, TitledCard } from "../recipes"
import { BeforeAfter, Screen } from "./before-after"

// Sales Portal's dashboard as an example: one date range sets the span, the subtitle states it, and every tile and
// chart adds up the same months. The app started counting in December 2025; today is 11/23/2026.

type Month = {
  key: string
  month: string
  created: number
  won: number
  value: number
}

const MONTHS: Month[] = [
  { key: "2025-12", month: "Dec", created: 9, won: 2, value: 410_000 },
  { key: "2026-01", month: "Jan", created: 11, won: 3, value: 620_000 },
  { key: "2026-02", month: "Feb", created: 8, won: 2, value: 380_000 },
  { key: "2026-03", month: "Mar", created: 14, won: 4, value: 910_000 },
  { key: "2026-04", month: "Apr", created: 12, won: 3, value: 700_000 },
  { key: "2026-05", month: "May", created: 10, won: 4, value: 840_000 },
  { key: "2026-06", month: "Jun", created: 15, won: 5, value: 1_150_000 },
  { key: "2026-07", month: "Jul", created: 13, won: 4, value: 960_000 },
  { key: "2026-08", month: "Aug", created: 16, won: 4, value: 1_020_000 },
  { key: "2026-09", month: "Sep", created: 12, won: 4, value: 1_120_000 },
  { key: "2026-10", month: "Oct", created: 21, won: 5, value: 1_340_000 },
  { key: "2026-11", month: "Nov", created: 17, won: 4, value: 1_060_000 },
]

const RANGES = {
  quarter: "This quarter",
  last: "Last quarter",
  year: "Year to date",
  twelve: "Last 12 months",
  all: "All time",
  custom: "Custom",
} as const
type Range = keyof typeof RANGES

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

/** The months a span touches; an open end takes every month on that side. */
const monthsIn = ([from, to]: [string | null, string | null]) =>
  MONTHS.filter(
    (month) =>
      (!from || month.key >= from.slice(0, 7)) &&
      (!to || month.key <= to.slice(0, 7))
  )

const sum = (months: Month[], read: (month: Month) => number) =>
  months.reduce((total, month) => total + read(month), 0)

const opportunities: ChartConfig = {
  created: { label: "Created", color: "var(--chart-1)" },
  won: { label: "Won", color: "var(--chart-2)" },
}
const winRate: ChartConfig = {
  rate: { label: "Win Rate", color: "var(--chart-1)" },
}

const axis = chartAxisProps()

/** A chart's card: the chart while its span has months, and its empty state when it has none. */
function ChartCard({
  title,
  months,
  children,
}: {
  title: string
  months: Month[]
  children: ReactNode
}) {
  return (
    <TitledCard title={title}>
      <div className="px-4 pb-4">
        {months.length > 0 ? (
          children
        ) : (
          <EmptyState icon={TrendingUpIcon} title="No Opportunities" />
        )}
      </div>
    </TitledCard>
  )
}

/** The dashboard alone: its header, the range on its own row, the tiles, and the charts. */
export function DashboardPage() {
  const [range, setRange] = useState<Range>("quarter")
  const [from, setFrom] = useState("2026-10-01")
  const [to, setTo] = useState("2026-11-15")
  // Custom counts once both days are whole dates; until then the last whole span stays.
  const [applied, setApplied] = useState<[string, string]>([
    "2026-10-01",
    "2026-11-15",
  ])
  const span = range === "custom" ? applied : SPANS[range]
  const months = monthsIn(span)
  const created = sum(months, (month) => month.created)
  const won = sum(months, (month) => month.won)
  const rates = months.map((month) => ({
    month: month.month,
    rate: Math.round((month.won / month.created) * 100),
  }))
  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle={range === "all" ? "All time" : dayRangeLabel(...span)}
      />
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
      <div className="grid grid-cols-2 gap-4 @min-page-md:grid-cols-4">
        <StatTile label="New Opportunities" value={created} />
        <StatTile label="Closed Won" value={won} />
        <StatTile label="Win Rate" value={percent(won, created) ?? "—"} />
        <StatTile
          label="Won Value"
          value={money(sum(months, (month) => month.value))}
        />
      </div>
      <div className="grid grid-cols-[minmax(0,1fr)] gap-4 @min-page-lg:grid-cols-2">
        <ChartCard title="Opportunities by Month" months={months}>
          <ChartContainer config={opportunities} className="h-64 w-full">
            <BarChart data={months} margin={CHART_MARGIN}>
              <ChartGrid />
              <XAxis dataKey="month" {...axis} />
              <YAxis allowDecimals={false} {...axis} />
              <ChartTip />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="created" fill="var(--color-created)" radius={4} />
              <Bar dataKey="won" fill="var(--color-won)" radius={4} />
            </BarChart>
          </ChartContainer>
        </ChartCard>
        <ChartCard title="Win Rate by Month" months={months}>
          <ChartContainer config={winRate} className="h-64 w-full">
            <LineChart data={rates} margin={CHART_MARGIN}>
              <ChartGrid />
              <XAxis dataKey="month" {...axis} />
              <YAxis
                {...axis}
                domain={[0, 100]}
                tickFormatter={(value: number) => `${value}%`}
              />
              <ChartTip />
              <Line
                dataKey="rate"
                type="monotone"
                stroke="var(--color-rate)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </ChartCard>
      </div>
    </>
  )
}

/** The dashboard in the page's frame. */
export function DashboardExample() {
  return (
    <Screen caption="Pick another span: the subtitle, every tile, and both charts follow. Make the window narrower: the charts stack, then the tiles go two to a row.">
      <DashboardPage />
    </Screen>
  )
}

/** A span picker on each card, against one range for the page that the subtitle states. */
export function DashboardBeforeAfter() {
  const spans = (initial: Range) => (
    <Select defaultValue={initial}>
      <SelectTrigger size="sm" aria-label="Date range" className="w-36">
        <SelectValue />
      </SelectTrigger>
      <SelectContent position="popper">
        {Object.entries(RANGES)
          .filter(([key]) => key !== "custom")
          .map(([key, label]) => (
            <SelectItem key={key} value={key}>
              {label}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  )
  return (
    <BeforeAfter
      beforeNote="each card picks its own span, so the two numbers count different months and nothing says which"
      afterNote="one range under the header sets the span for every figure, and the subtitle states it"
      before={
        <>
          <PageHeader title="Dashboard" />
          <TitledCard title="New Opportunities" action={spans("quarter")}>
            <div className="px-4 pb-4">
              <StatTile plain label="Created" value={38} />
            </div>
          </TitledCard>
          <TitledCard title="Closed Won" action={spans("twelve")}>
            <div className="px-4 pb-4">
              <StatTile plain label="Won" value={44} />
            </div>
          </TitledCard>
        </>
      }
      after={
        <>
          <PageHeader title="Dashboard" subtitle="10/01/2026–12/31/2026" />
          {spans("quarter")}
          <div className="grid grid-cols-2 gap-4">
            <StatTile label="New Opportunities" value={38} />
            <StatTile label="Closed Won" value={9} />
          </div>
        </>
      }
    />
  )
}

export const dashboardExamples = {
  "How it looks and behaves": <DashboardExample />,
  "Before and after": <DashboardBeforeAfter />,
}
