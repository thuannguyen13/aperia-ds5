"use client"

import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { Slider } from "./slider"

const meta: Meta<typeof Slider> = {
  title: "UI/Slider",
  component: Slider,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
  },
}

export default meta
type Story = StoryObj<typeof Slider>

export const Default: Story = {
  render: () => <Slider defaultValue={[50]} className="w-64" />,
}

export const Range: Story = {
  render: () => (
    <Slider defaultValue={[25, 75]} className="w-64" />
  ),
}

export const WithSteps: Story = {
  render: () => (
    <div className="space-y-6 w-64">
      <div className="space-y-2">
        <label className="text-sm font-medium">Step 10</label>
        <Slider defaultValue={[40]} step={10} />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Step 25</label>
        <Slider defaultValue={[50]} step={25} />
      </div>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => <Slider defaultValue={[60]} disabled className="w-64" />,
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState([33])
    return (
      <div className="w-64 space-y-3">
        <Slider value={value} onValueChange={setValue} />
        <p className="text-sm text-muted-foreground">
          Value: <span className="font-medium text-foreground">{value[0]}</span>
        </p>
      </div>
    )
  },
}
