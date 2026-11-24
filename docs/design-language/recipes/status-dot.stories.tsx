import type { Meta, StoryObj } from "@storybook/react-vite"
import { AppStatusColors } from "../examples/app-status"
import { StatusDot } from "./status-dot"

const meta: Meta<typeof StatusDot> = {
  title: "Design Language/Recipes/StatusDot",
  component: StatusDot,
  tags: ["!dev"],
  parameters: {
    docs: {
      description: {
        component:
          "A condition inside a line of text or a dense cell: a small dot in the state's deep color, then the word in body text. `dot` is the app's class for the pair's deep color. The colors here stand in for an app's brand file.",
      },
    },
  },
  args: { dot: "bg-status-red-foreground", children: "2 failed" },
  argTypes: { dot: { control: "text" }, children: { control: "text" } },
  decorators: [
    (Story) => (
      <>
        <AppStatusColors />
        <Story />
      </>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof StatusDot>

export const Default: Story = {}
