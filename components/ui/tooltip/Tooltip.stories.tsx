import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "../button/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip"

const meta: Meta<typeof TooltipContent> = {
  title: "UI/Tooltip",
  component: TooltipContent,
  tags: ["autodocs"],
  args: {
    children: "Tooltip text",
    sideOffset: 4,
  },
  argTypes: {
    side: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
    },
    sideOffset: { control: "number" },
  },
}

export default meta
type Story = StoryObj<typeof TooltipContent>

export const Default: Story = {
  render: ({ children, side, sideOffset }) => (
    <div className="flex items-center justify-center p-16">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent side={side} sideOffset={sideOffset}>
          {children}
        </TooltipContent>
      </Tooltip>
    </div>
  ),
}

export const Sides: Story = {
  render: () => (
    <div className="flex items-center justify-center gap-8 p-16">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">Top</Button>
        </TooltipTrigger>
        <TooltipContent side="top">Tooltip on top</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">Right</Button>
        </TooltipTrigger>
        <TooltipContent side="right">Tooltip on right</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">Bottom</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Tooltip on bottom</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">Left</Button>
        </TooltipTrigger>
        <TooltipContent side="left">Tooltip on left</TooltipContent>
      </Tooltip>
    </div>
  ),
}

export const WithCustomContent: Story = {
  render: ({ side, sideOffset }) => (
    <div className="flex items-center justify-center p-16">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="secondary">More info</Button>
        </TooltipTrigger>
        <TooltipContent side={side} sideOffset={sideOffset}>
          This action cannot be undone once confirmed.
        </TooltipContent>
      </Tooltip>
    </div>
  ),
}
