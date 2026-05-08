import type { Meta, StoryObj } from "@storybook/react"
import { Input } from "./input"

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    placeholder: "Type something...",
  },
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search", "url"],
    },
    disabled: { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {}

export const Email: Story = {
  args: { type: "email", placeholder: "you@example.com" },
}

export const Password: Story = {
  args: { type: "password", placeholder: "Enter password" },
}

export const Disabled: Story = {
  args: { disabled: true, value: "Disabled value" },
}

export const Invalid: Story = {
  args: { "aria-invalid": true, value: "Bad input" } as never,
}

export const WithValue: Story = {
  args: { defaultValue: "Pre-filled value" },
}

export const File: Story = {
  args: { type: "file" },
}
