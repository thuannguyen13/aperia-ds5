import type { Meta, StoryObj } from "@storybook/react-vite"
import { Plus } from "lucide-react"
import { Button } from "./button"

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Button",
    variant: "default",
    size: "default",
    disabled: false,
  },
  // Icon sizes are square, so a text label overflows them; show an icon and keep the text as its accessible name
  render: ({ children, ...args }) =>
    args.size?.startsWith("icon") ? (
      <Button {...args} aria-label={typeof children === "string" ? children : undefined}>
        <Plus />
      </Button>
    ) : (
      <Button {...args}>{children}</Button>
    ),
  parameters: {
    docs: {
      description: {
        component: "[View in Figma](https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=37-931)",
      },
    },
  },
  argTypes: {
    asChild: { control: false },
    variant: {
      control: "select",
      options: ["default", "secondary", "outline", "ghost", "destructive", "link"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "default", "lg", "icon", "icon-xs", "icon-sm", "icon-lg"],
    },
    disabled: { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {}

export const Secondary: Story = { args: { variant: "secondary" } }

export const Outline: Story = { args: { variant: "outline" } }

export const Ghost: Story = { args: { variant: "ghost" } }

export const Destructive: Story = { args: { variant: "destructive" } }

export const Link: Story = { args: { variant: "link" } }

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Button size="xs">xs</Button>
      <Button size="sm">sm</Button>
      <Button size="default">default</Button>
      <Button size="lg">lg</Button>
      <Button size="icon-xs" aria-label="Add">
        <Plus />
      </Button>
      <Button size="icon-sm" aria-label="Add">
        <Plus />
      </Button>
      <Button size="icon" aria-label="Add">
        <Plus />
      </Button>
      <Button size="icon-lg" aria-label="Add">
        <Plus />
      </Button>
    </div>
  ),
}

export const Disabled: Story = { args: { disabled: true } }
