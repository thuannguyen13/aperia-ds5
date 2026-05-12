import type { Meta, StoryObj } from "@storybook/react-vite"
import { Toggle } from "./toggle"
import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react"

const meta: Meta<typeof Toggle> = {
  title: "UI/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline"],
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
    disabled: { control: "boolean" },
    pressed: { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof Toggle>

export const Default: Story = {
  args: { children: "Toggle" },
}

export const Outline: Story = {
  args: { variant: "outline", children: "Toggle" },
}

export const WithIcon: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Toggle aria-label="Bold">
        <BoldIcon />
      </Toggle>
      <Toggle aria-label="Italic">
        <ItalicIcon />
      </Toggle>
      <Toggle aria-label="Underline">
        <UnderlineIcon />
      </Toggle>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Toggle size="sm">Small</Toggle>
      <Toggle size="default">Default</Toggle>
      <Toggle size="lg">Large</Toggle>
    </div>
  ),
}

export const Pressed: Story = {
  args: { pressed: true, children: "Active" },
}

export const Disabled: Story = {
  args: { disabled: true, children: "Disabled" },
}
