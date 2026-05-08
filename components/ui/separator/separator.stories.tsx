import type { Meta, StoryObj } from "@storybook/react-vite"
import { Separator } from "./separator"

const meta: Meta<typeof Separator> = {
  title: "UI/Separator",
  component: Separator,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
}

export default meta
type Story = StoryObj<typeof Separator>

export const Horizontal: Story = {
  render: () => (
    <div className="w-64">
      <p className="text-sm">Above the separator</p>
      <Separator className="my-3" />
      <p className="text-sm">Below the separator</p>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="flex h-8 items-center gap-3">
      <span className="text-sm">Docs</span>
      <Separator orientation="vertical" />
      <span className="text-sm">Components</span>
      <Separator orientation="vertical" />
      <span className="text-sm">Blog</span>
    </div>
  ),
}

export const InNav: Story = {
  render: () => (
    <div className="w-64 flex flex-col gap-1">
      <p className="font-medium text-sm px-2">Section A</p>
      <p className="text-sm text-muted-foreground px-2">Item 1</p>
      <p className="text-sm text-muted-foreground px-2">Item 2</p>
      <Separator className="my-1" />
      <p className="font-medium text-sm px-2">Section B</p>
      <p className="text-sm text-muted-foreground px-2">Item 3</p>
    </div>
  ),
}
