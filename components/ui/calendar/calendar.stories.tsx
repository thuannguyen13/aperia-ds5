"use client"

import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { Calendar } from "./calendar"
import type { DateRange } from "react-day-picker"

const meta: Meta<typeof Calendar> = {
  title: "UI/Calendar",
  component: Calendar,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Calendar>

export const Default: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-lg border"
      />
    )
  },
}

export const RangeSelection: Story = {
  render: () => {
    const [range, setRange] = React.useState<DateRange | undefined>()
    return (
      <Calendar
        mode="range"
        selected={range}
        onSelect={setRange}
        numberOfMonths={2}
        className="rounded-lg border"
      />
    )
  },
}

export const WithDropdownCaption: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        captionLayout="dropdown"
        className="rounded-lg border"
      />
    )
  },
}

export const NoOutsideDays: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>()
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        showOutsideDays={false}
        className="rounded-lg border"
      />
    )
  },
}
