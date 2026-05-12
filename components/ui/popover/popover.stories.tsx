import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from "./popover"
import { Button } from "../button/button"

const meta: Meta<typeof Popover> = {
  title: "UI/Popover",
  component: Popover,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Popover>

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>Set the panel dimensions.</PopoverDescription>
        </PopoverHeader>
        <div className="grid gap-2">
          <div className="grid grid-cols-3 items-center gap-2">
            <label className="text-sm">Width</label>
            <input
              defaultValue="100%"
              className="col-span-2 rounded-md border px-2 py-1 text-sm"
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-2">
            <label className="text-sm">Height</label>
            <input
              defaultValue="auto"
              className="col-span-2 rounded-md border px-2 py-1 text-sm"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
}

export const WithActions: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Filters</Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <PopoverHeader>
          <PopoverTitle>Filter issues</PopoverTitle>
        </PopoverHeader>
        <div className="flex flex-col gap-2">
          {["Status", "Priority", "Assignee", "Label"].map((filter) => (
            <label key={filter} className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="size-4 rounded border" />
              {filter}
            </label>
          ))}
        </div>
        <Button size="sm" className="mt-2 w-full">
          Apply filters
        </Button>
      </PopoverContent>
    </Popover>
  ),
}

export const Sides: Story = {
  render: () => (
    <div className="flex items-center justify-center gap-4 p-16">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Popover key={side}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              {side}
            </Button>
          </PopoverTrigger>
          <PopoverContent side={side} className="w-48">
            <p className="text-sm">Popover on the {side}.</p>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  ),
}
