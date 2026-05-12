import type { Meta, StoryObj } from "@storybook/react-vite"
import { ToggleGroup, ToggleGroupItem } from "./toggle-group"
import { AlignLeftIcon, AlignCenterIcon, AlignRightIcon, AlignJustifyIcon, BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react"

const meta: Meta<typeof ToggleGroup> = {
  title: "UI/Toggle Group",
  component: ToggleGroup,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["single", "multiple"],
    },
    variant: {
      control: "select",
      options: ["default", "outline"],
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
  },
}

export default meta
type Story = StoryObj<typeof ToggleGroup>

export const Default: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="center">
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeftIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenterIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRightIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="justify" aria-label="Align justify">
        <AlignJustifyIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const Multiple: Story = {
  render: () => (
    <ToggleGroup type="multiple">
      <ToggleGroupItem value="bold" aria-label="Bold">
        <BoldIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic">
        <ItalicIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Underline">
        <UnderlineIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const Outline: Story = {
  render: () => (
    <ToggleGroup type="single" variant="outline" defaultValue="week">
      <ToggleGroupItem value="day">Day</ToggleGroupItem>
      <ToggleGroupItem value="week">Week</ToggleGroupItem>
      <ToggleGroupItem value="month">Month</ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const WithSpacing: Story = {
  render: () => (
    <ToggleGroup type="single" spacing={1} defaultValue="b">
      <ToggleGroupItem value="a">Option A</ToggleGroupItem>
      <ToggleGroupItem value="b">Option B</ToggleGroupItem>
      <ToggleGroupItem value="c">Option C</ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <ToggleGroup type="single" size="sm" defaultValue="a">
        <ToggleGroupItem value="a">Small A</ToggleGroupItem>
        <ToggleGroupItem value="b">Small B</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single" size="default" defaultValue="a">
        <ToggleGroupItem value="a">Default A</ToggleGroupItem>
        <ToggleGroupItem value="b">Default B</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single" size="lg" defaultValue="a">
        <ToggleGroupItem value="a">Large A</ToggleGroupItem>
        <ToggleGroupItem value="b">Large B</ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
}
