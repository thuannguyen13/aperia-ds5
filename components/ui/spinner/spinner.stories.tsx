import type { Meta, StoryObj } from "@storybook/react-vite"
import { Spinner } from "./spinner"
import { Button } from "../button/button"

const meta: Meta<typeof Spinner> = {
  title: "UI/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "[View in Figma](https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18665-25956)",
      },
    },
  },
  argTypes: {
    className: { control: "text" },
  },
}

export default meta
type Story = StoryObj<typeof Spinner>

export const Default: Story = {}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner className="size-3" />
      <Spinner />
      <Spinner className="size-5" />
      <Spinner className="size-6" />
      <Spinner className="size-8" />
    </div>
  ),
}

export const InButton: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Button disabled size="sm">
        <Spinner data-icon="inline-start" />
        Saving
      </Button>
      <Button variant="outline" disabled size="sm">
        <Spinner data-icon="inline-start" />
        Loading
      </Button>
    </div>
  ),
}
