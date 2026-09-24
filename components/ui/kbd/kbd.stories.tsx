import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "../button/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip/tooltip"
import { Kbd, KbdGroup } from "./kbd"

const meta: Meta<typeof Kbd> = {
  title: "UI/Kbd",
  component: Kbd,
  tags: ["autodocs"],
  args: {
    children: "Ctrl",
  },
  parameters: {
    docs: {
      description: {
        component:
          "[View in Figma](https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18665-781)",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Kbd>

export const Default: Story = {}

export const Group: Story = {
  render: () => (
    <KbdGroup>
      <Kbd>Ctrl</Kbd>
      <Kbd>Shift</Kbd>
      <Kbd>P</Kbd>
    </KbdGroup>
  ),
}

export const InText: Story = {
  render: () => (
    <p className="text-sm text-muted-foreground">
      Press{" "}
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>{" "}
      to search accounts.
    </p>
  ),
}

export const InTooltip: Story = {
  render: () => (
    <div className="flex items-center justify-center p-16">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Save</Button>
        </TooltipTrigger>
        <TooltipContent>
          Save changes{" "}
          <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <Kbd>S</Kbd>
          </KbdGroup>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
}
