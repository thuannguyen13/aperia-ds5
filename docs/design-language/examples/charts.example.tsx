import type { ReactNode } from "react"
import { TrendingUpIcon } from "lucide-react"
import { EmptyState } from "aperia-ds5"
import {
  Bar,
  BarChart,
  CHART_MARGIN,
  CartesianGrid,
  Cell,
  ChartContainer,
  ChartGrid,
  ChartLegend,
  ChartLegendContent,
  ChartTip,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
  chartAxisProps,
  type ChartConfig,
} from "@/components/ui/chart"
import { money } from "@/lib/format"
import { DoDont, Example } from "../blocks"
import { TitledCard } from "../recipes"
import { chartsAnatomy } from "./charts-anatomy"

// Charts in cards, drawn from the chart parts: the four forms, and the Do / Don't pairs for the Charts page's rules.

const MONTHS = [
  { month: "Jun", created: 15, won: 5, lost: 4, open: 6, rate: 33 },
  { month: "Jul", created: 13, won: 4, lost: 5, open: 4, rate: 31 },
  { month: "Aug", created: 16, won: 4, lost: 6, open: 6, rate: 25 },
  { month: "Sep", created: 12, won: 4, lost: 3, open: 5, rate: 33 },
  { month: "Oct", created: 21, won: 5, lost: 7, open: 9, rate: 24 },
  { month: "Nov", created: 17, won: 4, lost: 4, open: 9, rate: 24 },
]

const REPS = [
  { rep: "Dana Whitfield", volume: 1_840_000 },
  { rep: "Marcus Lee", volume: 1_310_000 },
  { rep: "Priya Raman", volume: 960_000 },
  { rep: "Tomas Ortega", volume: 720_000 },
]

const CREATED_WON: ChartConfig = {
  created: { label: "Created", color: "var(--chart-1)" },
  won: { label: "Won", color: "var(--chart-2)" },
}
const OUTCOMES: ChartConfig = {
  won: { label: "Won", color: "var(--chart-1)" },
  lost: { label: "Lost", color: "var(--chart-2)" },
  open: { label: "Open", color: "var(--chart-3)" },
}
const RATE: ChartConfig = {
  rate: { label: "Win Rate", color: "var(--chart-1)" },
}
const VOLUME: ChartConfig = {
  volume: { label: "Won Value", color: "var(--chart-1)" },
}
// Colors picked by eye, outside the app's chart palette: the Don't.
const OFF_PALETTE: ChartConfig = {
  created: { label: "Created", color: "#a855f7" },
  won: { label: "Won", color: "#2dd4bf" },
}

const axis = chartAxisProps()
const narrow = chartAxisProps(true)
const total = MONTHS.reduce((sum, month) => sum + month.created, 0)

function ChartCard({
  title,
  figure,
  children,
}: {
  title: string
  figure?: ReactNode
  children: ReactNode
}) {
  return (
    <TitledCard title={title} figure={figure}>
      <div className="px-4 pb-4">{children}</div>
    </TitledCard>
  )
}

/** Created and won per month, side by side, with or without a legend and in or out of the palette. */
function CreatedAndWon({
  legend = true,
  config = CREATED_WON,
  className = "h-56 w-full",
}: {
  legend?: boolean
  config?: ChartConfig
  className?: string
}) {
  return (
    <ChartContainer config={config} className={className}>
      <BarChart data={MONTHS} margin={CHART_MARGIN}>
        <ChartGrid />
        <XAxis dataKey="month" {...axis} />
        <YAxis allowDecimals={false} {...axis} />
        <ChartTip />
        {legend && <ChartLegend content={<ChartLegendContent />} />}
        <Bar dataKey="created" fill="var(--color-created)" radius={4} />
        <Bar dataKey="won" fill="var(--color-won)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}

function Outcomes() {
  return (
    <ChartContainer config={OUTCOMES} className="h-56 w-full">
      <BarChart data={MONTHS} margin={CHART_MARGIN}>
        <ChartGrid />
        <XAxis dataKey="month" {...narrow} />
        <YAxis allowDecimals={false} {...narrow} />
        <ChartTip />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="won" stackId="outcome" fill="var(--color-won)" />
        <Bar dataKey="lost" stackId="outcome" fill="var(--color-lost)" />
        <Bar
          dataKey="open"
          stackId="outcome"
          fill="var(--color-open)"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ChartContainer>
  )
}

function WinRate() {
  return (
    <ChartContainer config={RATE} className="h-56 w-full">
      <LineChart data={MONTHS} margin={CHART_MARGIN}>
        <ChartGrid />
        <XAxis dataKey="month" {...narrow} />
        <YAxis
          {...narrow}
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
  )
}

function ByRep() {
  return (
    <ChartContainer config={VOLUME} className="h-56 w-full">
      <BarChart data={REPS} layout="vertical" margin={CHART_MARGIN}>
        <ChartGrid vertical />
        <XAxis
          type="number"
          {...narrow}
          tickFormatter={(value: number) => money(value)}
        />
        <YAxis type="category" dataKey="rep" width="auto" {...narrow} />
        <ChartTip />
        <Bar dataKey="volume" fill="var(--color-volume)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}

/** The same month's outcomes as a pie: the Don't for a share. */
function OutcomesPie() {
  const last = MONTHS[MONTHS.length - 1]
  const slices = (["won", "lost", "open"] as const).map((key) => ({
    key,
    value: last[key],
    fill: `var(--color-${key})`,
  }))
  return (
    <ChartContainer config={OUTCOMES} className="mx-auto aspect-square h-56">
      <PieChart>
        <ChartTip hideLabel nameKey="key" />
        <Pie data={slices} dataKey="value" nameKey="key" strokeWidth={2}>
          {slices.map((slice) => (
            <Cell key={slice.key} fill={slice.fill} />
          ))}
        </Pie>
        <ChartLegend content={<ChartLegendContent nameKey="key" />} />
      </PieChart>
    </ChartContainer>
  )
}

/** Axis lines, tick marks, a solid grid, and slanted labels: the Don't for the shared axes. */
function OwnChrome() {
  return (
    <ChartContainer config={CREATED_WON} className="h-56 w-full">
      <BarChart data={MONTHS} margin={{ ...CHART_MARGIN, bottom: 16 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          angle={-45}
          textAnchor="end"
          tick={{ fontSize: 11 }}
        />
        <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
        <ChartTip />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="created" fill="var(--color-created)" radius={4} />
        <Bar dataKey="won" fill="var(--color-won)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}

function Half({ children }: { children: ReactNode }) {
  return <div className="w-full">{children}</div>
}

export const chartsExamples = {
  Anatomy: chartsAnatomy,
  "What is available": (
    <Example
      caption="A bar chart, a line chart, a stacked bar chart, and a bar chart laid across for long group names."
      className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2"
    >
      <ChartCard title="Opportunities by Month">
        <CreatedAndWon />
      </ChartCard>
      <ChartCard title="Win Rate by Month">
        <WinRate />
      </ChartCard>
      <ChartCard title="Outcomes by Month">
        <Outcomes />
      </ChartCard>
      <ChartCard title="Won Value by Rep">
        <ByRep />
      </ChartCard>
    </Example>
  ),
  "How it looks and behaves": (
    <Example caption="A chart with nothing to count in its span keeps its card and shows the empty state in place of the plot.">
      <div className="w-full max-w-xl">
        <ChartCard title="Opportunities by Month">
          <EmptyState icon={TrendingUpIcon} title="No Opportunities" />
        </ChartCard>
      </div>
    </Example>
  ),
  "Draw shares and groups as bars": (
    <DoDont
      good={
        <Half>
          <ChartCard title="Outcomes by Month">
            <Outcomes />
          </ChartCard>
        </Half>
      }
      bad={
        <Half>
          <ChartCard title="Outcomes in November">
            <OutcomesPie />
          </ChartCard>
        </Half>
      }
      goodNote="won, lost, and open as stacked bars"
      badNote="the same share as slices of a pie"
    />
  ),
  "Color the series from the chart palette, in order": (
    <DoDont
      good={
        <Half>
          <ChartCard title="Opportunities by Month">
            <CreatedAndWon />
          </ChartCard>
        </Half>
      }
      bad={
        <Half>
          <ChartCard title="Opportunities by Month">
            <CreatedAndWon config={OFF_PALETTE} />
          </ChartCard>
        </Half>
      }
      goodNote="Chart 1, then Chart 2"
      badNote="two colors picked by eye"
    />
  ),
  "Name every series": (
    <DoDont
      good={
        <Half>
          <ChartCard title="Opportunities by Month">
            <CreatedAndWon />
          </ChartCard>
        </Half>
      }
      bad={
        <Half>
          <ChartCard title="Opportunities by Month">
            <CreatedAndWon legend={false} />
          </ChartCard>
        </Half>
      }
      badNote="two colors and nothing that names them"
    />
  ),
  "Use the shared axes and grid": (
    <DoDont
      good={
        <Half>
          <ChartCard title="Opportunities by Month">
            <CreatedAndWon />
          </ChartCard>
        </Half>
      }
      bad={
        <Half>
          <ChartCard title="Opportunities by Month">
            <OwnChrome />
          </ChartCard>
        </Half>
      }
      badNote="axis lines, tick marks, a solid grid, and slanted labels"
    />
  ),
  "Give the key figures as text": (
    <DoDont
      good={
        <Half>
          <ChartCard title="Opportunities by Month" figure={`${total} created`}>
            <CreatedAndWon />
          </ChartCard>
        </Half>
      }
      bad={
        <Half>
          <ChartCard title="Opportunities by Month">
            <CreatedAndWon />
          </ChartCard>
        </Half>
      }
      goodNote="the total beside the title"
      badNote="the total only by adding up the tooltips"
    />
  ),
}
