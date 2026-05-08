import type { Meta, StoryObj } from "@storybook/react"
import { Badge } from "./badge"

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: {
    children: "Badge",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline", "ghost", "link"],
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {}

export const Secondary: Story = { args: { variant: "secondary" } }

export const Destructive: Story = { args: { variant: "destructive" } }

export const Outline: Story = { args: { variant: "outline" } }

export const Ghost: Story = { args: { variant: "ghost" } }

export const Link: Story = { args: { variant: "link" } }

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
      <Badge variant="link">Link</Badge>
    </div>
  ),
}
