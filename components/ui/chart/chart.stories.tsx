import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  ComposedChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  CHART_MARGIN,
  ChartContainer,
  ChartGrid,
  ChartLegend,
  ChartLegendContent,
  ChartTip,
  chartAxisProps,
  type ChartConfig,
} from "."
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card/card"

const meta: Meta<typeof ChartContainer> = {
  title: "UI/Chart",
  component: ChartContainer,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof ChartContainer>

const monthly = [
  { month: "Jan", revenue: 4200, expenses: 2800, margin: 33 },
  { month: "Feb", revenue: 5800, expenses: 3200, margin: 45 },
  { month: "Mar", revenue: 4900, expenses: 2600, margin: 47 },
  { month: "Apr", revenue: 6300, expenses: 3500, margin: 44 },
  { month: "May", revenue: 7100, expenses: 4000, margin: 44 },
  { month: "Jun", revenue: 6800, expenses: 3800, margin: 44 },
]

const monthlyConfig: ChartConfig = {
  revenue: { label: "Revenue", color: "var(--chart-1)" },
  expenses: { label: "Expenses", color: "var(--chart-2)" },
  margin: { label: "Margin %", color: "var(--chart-3)" },
}

const channels = [
  { channel: "email", tickets: 420, fill: "var(--color-email)" },
  { channel: "chat", tickets: 310, fill: "var(--color-chat)" },
  { channel: "phone", tickets: 180, fill: "var(--color-phone)" },
  { channel: "portal", tickets: 120, fill: "var(--color-portal)" },
  { channel: "sms", tickets: 90, fill: "var(--color-sms)" },
  { channel: "other", tickets: 60, fill: "var(--color-other)" },
]

const channelConfig: ChartConfig = {
  tickets: { label: "Tickets" },
  email: { label: "Email", color: "var(--chart-1)" },
  chat: { label: "Chat", color: "var(--chart-2)" },
  phone: { label: "Phone", color: "var(--chart-3)" },
  portal: { label: "Portal", color: "var(--chart-4)" },
  sms: { label: "SMS", color: "var(--chart-5)" },
  other: { label: "Other", color: "var(--chart-6)" },
}

const skills = [
  { skill: "Speed", current: 80, target: 90 },
  { skill: "Accuracy", current: 92, target: 95 },
  { skill: "Coverage", current: 65, target: 85 },
  { skill: "Tone", current: 88, target: 90 },
  { skill: "Resolution", current: 72, target: 80 },
]

const skillConfig: ChartConfig = {
  current: { label: "Current", color: "var(--chart-1)" },
  target: { label: "Target", color: "var(--chart-2)" },
}

const accounts = [
  { balance: 1200, utilization: 22 },
  { balance: 3400, utilization: 48 },
  { balance: 800, utilization: 15 },
  { balance: 5600, utilization: 71 },
  { balance: 2900, utilization: 39 },
  { balance: 4100, utilization: 58 },
  { balance: 6700, utilization: 83 },
  { balance: 1900, utilization: 30 },
]

const accountConfig: ChartConfig = {
  utilization: { label: "Utilization %", color: "var(--chart-1)" },
}

const axis = chartAxisProps()

function BarDemo() {
  return (
    <ChartContainer config={monthlyConfig} className="h-64 w-full">
      <BarChart data={monthly} margin={CHART_MARGIN}>
        <ChartGrid />
        <XAxis dataKey="month" {...axis} />
        <YAxis {...axis} />
        <ChartTip />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
        <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}

function StackedBarDemo() {
  return (
    <ChartContainer config={monthlyConfig} className="h-64 w-full">
      <BarChart data={monthly} margin={CHART_MARGIN}>
        <ChartGrid />
        <XAxis dataKey="month" {...axis} />
        <YAxis {...axis} />
        <ChartTip />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="expenses" stackId="a" fill="var(--color-expenses)" />
        <Bar
          dataKey="revenue"
          stackId="a"
          fill="var(--color-revenue)"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ChartContainer>
  )
}

function HorizontalBarDemo() {
  return (
    <ChartContainer config={channelConfig} className="h-64 w-full">
      <BarChart data={channels} layout="vertical" margin={CHART_MARGIN}>
        <ChartGrid vertical />
        <XAxis type="number" {...axis} />
        <YAxis
          type="category"
          dataKey="channel"
          {...axis}
          tickFormatter={(v: string) => channelConfig[v]?.label as string}
        />
        <ChartTip hideLabel />
        <Bar dataKey="tickets" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}

function LineDemo() {
  return (
    <ChartContainer config={monthlyConfig} className="h-64 w-full">
      <LineChart data={monthly} margin={CHART_MARGIN}>
        <ChartGrid />
        <XAxis dataKey="month" {...axis} />
        <YAxis {...axis} />
        <ChartTip />
        <ChartLegend content={<ChartLegendContent />} />
        <Line
          dataKey="revenue"
          stroke="var(--color-revenue)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="expenses"
          stroke="var(--color-expenses)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  )
}

function AreaDemo() {
  return (
    <ChartContainer config={monthlyConfig} className="h-64 w-full">
      <AreaChart data={monthly} margin={CHART_MARGIN}>
        <ChartGrid />
        <XAxis dataKey="month" {...axis} />
        <YAxis {...axis} />
        <ChartTip indicator="line" />
        <ChartLegend content={<ChartLegendContent />} />
        <Area
          dataKey="expenses"
          stackId="a"
          type="natural"
          fill="var(--color-expenses)"
          fillOpacity={0.4}
          stroke="var(--color-expenses)"
        />
        <Area
          dataKey="revenue"
          stackId="a"
          type="natural"
          fill="var(--color-revenue)"
          fillOpacity={0.4}
          stroke="var(--color-revenue)"
        />
      </AreaChart>
    </ChartContainer>
  )
}

function ComposedDemo() {
  return (
    <ChartContainer config={monthlyConfig} className="h-64 w-full">
      <ComposedChart data={monthly} margin={CHART_MARGIN}>
        <ChartGrid />
        <XAxis dataKey="month" {...axis} />
        <YAxis yAxisId="amount" {...axis} />
        <YAxis yAxisId="pct" orientation="right" unit="%" {...axis} />
        <ChartTip />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar
          yAxisId="amount"
          dataKey="revenue"
          fill="var(--color-revenue)"
          radius={4}
        />
        <Line
          yAxisId="pct"
          dataKey="margin"
          stroke="var(--color-margin)"
          strokeWidth={2}
          dot={false}
        />
      </ComposedChart>
    </ChartContainer>
  )
}

function PieDemo({ donut = false }: { donut?: boolean }) {
  return (
    <ChartContainer
      config={channelConfig}
      className="mx-auto aspect-square h-64"
    >
      <PieChart>
        <ChartTip hideLabel />
        <Pie
          data={channels}
          dataKey="tickets"
          nameKey="channel"
          innerRadius={donut ? 60 : 0}
          strokeWidth={2}
        >
          {channels.map((c) => (
            <Cell key={c.channel} fill={c.fill} />
          ))}
        </Pie>
        <ChartLegend content={<ChartLegendContent nameKey="channel" />} />
      </PieChart>
    </ChartContainer>
  )
}

function RadarDemo() {
  return (
    <ChartContainer config={skillConfig} className="h-64 w-full">
      <RadarChart data={skills}>
        <ChartTip />
        <PolarGrid />
        <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11 }} />
        <PolarRadiusAxis tick={false} axisLine={false} />
        <Radar
          dataKey="target"
          stroke="var(--color-target)"
          fill="var(--color-target)"
          fillOpacity={0.2}
        />
        <Radar
          dataKey="current"
          stroke="var(--color-current)"
          fill="var(--color-current)"
          fillOpacity={0.5}
        />
        <ChartLegend content={<ChartLegendContent />} />
      </RadarChart>
    </ChartContainer>
  )
}

function RadialBarDemo() {
  return (
    <ChartContainer
      config={channelConfig}
      className="mx-auto aspect-square h-64"
    >
      <RadialBarChart data={channels} innerRadius={30} outerRadius={110}>
        <ChartTip hideLabel nameKey="channel" />
        <RadialBar dataKey="tickets" background cornerRadius={4} />
      </RadialBarChart>
    </ChartContainer>
  )
}

function ScatterDemo() {
  return (
    <ChartContainer config={accountConfig} className="h-64 w-full">
      <ScatterChart margin={CHART_MARGIN}>
        <ChartGrid />
        <XAxis type="number" dataKey="balance" name="Balance" {...axis} />
        <YAxis
          type="number"
          dataKey="utilization"
          name="Utilization"
          unit="%"
          {...axis}
        />
        <ChartTip hideLabel />
        <Scatter data={accounts} fill="var(--color-utilization)" />
      </ScatterChart>
    </ChartContainer>
  )
}

const CHARTS = [
  { name: "Bar", recharts: "BarChart", Demo: BarDemo },
  { name: "Stacked bar", recharts: "BarChart + stackId", Demo: StackedBarDemo },
  {
    name: "Horizontal bar",
    recharts: 'BarChart layout="vertical"',
    Demo: HorizontalBarDemo,
  },
  { name: "Line", recharts: "LineChart", Demo: LineDemo },
  { name: "Stacked area", recharts: "AreaChart + stackId", Demo: AreaDemo },
  { name: "Bar + line", recharts: "ComposedChart", Demo: ComposedDemo },
  { name: "Pie", recharts: "PieChart", Demo: () => <PieDemo /> },
  {
    name: "Donut",
    recharts: "PieChart + innerRadius",
    Demo: () => <PieDemo donut />,
  },
  { name: "Radar", recharts: "RadarChart", Demo: RadarDemo },
  { name: "Radial bar", recharts: "RadialBarChart", Demo: RadialBarDemo },
  { name: "Scatter", recharts: "ScatterChart", Demo: ScatterDemo },
]

export const Gallery: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div className="grid gap-4 p-6 md:grid-cols-2 xl:grid-cols-3">
      {CHARTS.map(({ name, recharts, Demo }) => (
        <Card key={name}>
          <CardHeader>
            <CardTitle>{name}</CardTitle>
            <CardDescription>
              <code>{recharts}</code>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Demo />
          </CardContent>
        </Card>
      ))}
    </div>
  ),
}

export const BarChartExample: Story = { render: BarDemo }
export const StackedBarChart: Story = { render: StackedBarDemo }
export const HorizontalBarChart: Story = { render: HorizontalBarDemo }
export const LineChartExample: Story = { render: LineDemo }
export const StackedAreaChart: Story = { render: AreaDemo }
export const ComposedBarLineChart: Story = { render: ComposedDemo }
export const PieChartExample: Story = { render: () => <PieDemo /> }
export const DonutChart: Story = { render: () => <PieDemo donut /> }
export const RadarChartExample: Story = { render: RadarDemo }
export const RadialBarChartExample: Story = { render: RadialBarDemo }
export const ScatterChartExample: Story = { render: ScatterDemo }
