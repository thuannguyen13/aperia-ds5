import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { DayRangeFields } from "./day-range-fields"
import { dayRangeLabel } from "@/lib/format"

const meta: Meta<typeof DayRangeFields> = {
  title: "Patterns/DayRangeFields",
  component: DayRangeFields,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A span of days as two fields, From and To, each YYYY-MM-DD or empty to leave that end open. It's the `dates` filter of `ListToolbar` and a dashboard's custom range. It holds nothing itself: `onChange` gets both days whichever one changed. The pair is one group, named by `label` or by the heading `labelledBy` points at. On a chip, `dayRangeLabel` from `aperia-ds5/format` writes it in words.",
      },
    },
  },
  args: { label: "Requested", disabled: false },
  argTypes: {
    from: { control: false },
    to: { control: false },
    onChange: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof DayRangeFields>

function Controlled({
  label,
  disabled,
  initialFrom = "",
  initialTo = "",
}: {
  label: string
  disabled?: boolean
  initialFrom?: string
  initialTo?: string
}) {
  const [range, setRange] = useState({ from: initialFrom, to: initialTo })
  return (
    <div className="flex flex-col gap-3">
      <DayRangeFields
        label={label}
        disabled={disabled}
        from={range.from}
        to={range.to}
        onChange={(from, to) => setRange({ from, to })}
      />
      <p className="text-sm text-muted-foreground">
        {dayRangeLabel(range.from || null, range.to || null) || "Any day"}
      </p>
    </div>
  )
}

export const Default: Story = {
  render: (args) => (
    <Controlled {...args} initialFrom="2026-11-01" initialTo="2026-11-30" />
  ),
}

/** One end open: from a day on. */
export const OpenEnded: Story = {
  render: (args) => <Controlled {...args} initialFrom="2026-11-01" />,
}

export const Empty: Story = {
  render: (args) => <Controlled {...args} />,
}

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <Controlled {...args} initialFrom="2026-11-01" initialTo="2026-11-30" />
  ),
}
