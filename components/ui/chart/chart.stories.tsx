import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "./chart"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts"

const meta: Meta<typeof ChartContainer> = {
  title: "UI/Chart",
  component: ChartContainer,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof ChartContainer>

const barData = [
  { month: "Jan", revenue: 4200, expenses: 2800 },
  { month: "Feb", revenue: 5800, expenses: 3200 },
  { month: "Mar", revenue: 4900, expenses: 2600 },
  { month: "Apr", revenue: 6300, expenses: 3500 },
  { month: "May", revenue: 7100, expenses: 4000 },
  { month: "Jun", revenue: 6800, expenses: 3800 },
]

const barConfig: ChartConfig = {
  revenue: { label: "Revenue", color: "hsl(var(--chart-1))" },
  expenses: { label: "Expenses", color: "hsl(var(--chart-2))" },
}

export const BarChartExample: Story = {
  render: () => (
    <ChartContainer config={barConfig} className="h-64 w-full">
      <BarChart data={barData}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
        <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
      </BarChart>
    </ChartContainer>
  ),
}

const lineData = [
  { month: "Jan", users: 1200, sessions: 3400 },
  { month: "Feb", users: 1900, sessions: 4200 },
  { month: "Mar", users: 1600, sessions: 3800 },
  { month: "Apr", users: 2400, sessions: 5600 },
  { month: "May", users: 2100, sessions: 5000 },
  { month: "Jun", users: 2800, sessions: 6400 },
]

const lineConfig: ChartConfig = {
  users: { label: "Users", color: "hsl(var(--chart-1))" },
  sessions: { label: "Sessions", color: "hsl(var(--chart-3))" },
}

export const LineChartExample: Story = {
  render: () => (
    <ChartContainer config={lineConfig} className="h-64 w-full">
      <LineChart data={lineData}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Line
          dataKey="users"
          stroke="var(--color-users)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="sessions"
          stroke="var(--color-sessions)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  ),
}

const singleBarConfig: ChartConfig = {
  count: { label: "Issues", color: "hsl(var(--chart-1))" },
}

const singleBarData = [
  { week: "W1", count: 12 },
  { week: "W2", count: 19 },
  { week: "W3", count: 8 },
  { week: "W4", count: 24 },
  { week: "W5", count: 17 },
]

export const SingleSeriesBar: Story = {
  render: () => (
    <ChartContainer config={singleBarConfig} className="h-48 w-full">
      <BarChart data={singleBarData}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="week" tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Bar dataKey="count" fill="var(--color-count)" radius={4} />
      </BarChart>
    </ChartContainer>
  ),
}
