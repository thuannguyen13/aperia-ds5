import type { Meta, StoryObj } from "@storybook/react-vite"
import { BubbleGroup, Bubble, BubbleContent, BubbleReactions } from "./bubble"

const meta: Meta<typeof Bubble> = {
  title: "UI/Bubble",
  component: Bubble,
  tags: ["autodocs"],
  args: {
    variant: "default",
    align: "start",
    children: <BubbleContent>Your card ending in 4821 was charged $42.10 at Blue Bottle Coffee.</BubbleContent>,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "muted", "tinted", "outline", "ghost", "destructive"],
    },
    align: {
      control: "select",
      options: ["start", "end"],
    },
  },
}

export default meta
type Story = StoryObj<typeof Bubble>

export const Default: Story = {}

export const Secondary: Story = { args: { variant: "secondary" } }

export const Muted: Story = { args: { variant: "muted" } }

export const Tinted: Story = { args: { variant: "tinted" } }

export const Outline: Story = { args: { variant: "outline" } }

export const Ghost: Story = { args: { variant: "ghost" } }

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: <BubbleContent>We could not verify this transaction. Please try again.</BubbleContent>,
  },
}

export const AlignEnd: Story = {
  args: {
    align: "end",
    children: <BubbleContent>Why was I charged twice this month?</BubbleContent>,
  },
}

export const WithReactions: Story = {
  render: ({ variant, align }) => (
    <div className="flex flex-col py-4">
      <Bubble variant={variant} align={align}>
        <BubbleContent>Your dispute was filed. We will update you within 3 business days.</BubbleContent>
        <BubbleReactions>👍</BubbleReactions>
      </Bubble>
    </div>
  ),
}

export const AsButton: Story = {
  args: { variant: "outline" },
  render: ({ variant, align }) => (
    <Bubble variant={variant} align={align}>
      <BubbleContent asChild>
        <button>Show my last 5 transactions</button>
      </BubbleContent>
    </Bubble>
  ),
}

export const Group: Story = {
  render: ({ variant, align }) => (
    <BubbleGroup className="w-96">
      <Bubble variant={variant} align={align}>
        <BubbleContent>I found 2 charges from Netflix on May 3.</BubbleContent>
      </Bubble>
      <Bubble variant={variant} align={align}>
        <BubbleContent>Both are $15.49. Would you like to dispute one of them?</BubbleContent>
      </Bubble>
    </BubbleGroup>
  ),
}
