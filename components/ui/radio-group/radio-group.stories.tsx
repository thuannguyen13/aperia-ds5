import type { Meta, StoryObj } from "@storybook/react-vite"
import { RadioGroup, RadioGroupItem } from "./radio-group"
import { Label } from "../label/label"

const meta: Meta<typeof RadioGroup> = {
  title: "UI/Radio Group",
  component: RadioGroup,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option-1">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-1" id="opt-1" />
        <Label htmlFor="opt-1">Option 1</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-2" id="opt-2" />
        <Label htmlFor="opt-2">Option 2</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-3" id="opt-3" />
        <Label htmlFor="opt-3">Option 3</Label>
      </div>
    </RadioGroup>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="month" className="flex w-auto flex-row gap-4">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="day" id="day" />
        <Label htmlFor="day">Day</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="week" id="week" />
        <Label htmlFor="week">Week</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="month" id="month" />
        <Label htmlFor="month">Month</Label>
      </div>
    </RadioGroup>
  ),
}

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="standard">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="standard" id="plan-standard" />
        <Label htmlFor="plan-standard">Standard</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="pro" id="plan-pro" />
        <Label htmlFor="plan-pro">Pro</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="enterprise" id="plan-enterprise" disabled />
        <Label htmlFor="plan-enterprise" className="opacity-50">
          Enterprise (contact sales)
        </Label>
      </div>
    </RadioGroup>
  ),
}
