import type { Meta, StoryObj } from "@storybook/react-vite"
import { Textarea } from "./textarea"

const meta: Meta<typeof Textarea> = {
  title: "UI/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  args: {
    placeholder: "Type your message here...",
  },
  argTypes: {
    disabled: { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {}

export const WithValue: Story = {
  args: { defaultValue: "This is some pre-filled text content in the textarea." },
}

export const Disabled: Story = {
  args: { disabled: true, placeholder: "Disabled textarea" },
}

export const Invalid: Story = {
  args: { "aria-invalid": true, defaultValue: "Invalid input" } as never,
}

export const Rows: Story = {
  args: { rows: 6, placeholder: "A taller textarea with 6 rows..." },
}
