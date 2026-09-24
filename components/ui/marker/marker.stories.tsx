import type { Meta, StoryObj } from "@storybook/react-vite"
import { LockIcon } from "lucide-react"
import { Marker, MarkerIcon, MarkerContent } from "./marker"
import { Message, MessageContent } from "../message/message"
import { Bubble, BubbleContent } from "../bubble/bubble"

const meta: Meta<typeof Marker> = {
  title: "UI/Marker",
  component: Marker,
  tags: ["autodocs"],
  args: {
    variant: "default",
    children: <MarkerContent>Conversation started</MarkerContent>,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "separator", "border"],
    },
  },
}

export default meta
type Story = StoryObj<typeof Marker>

export const Default: Story = {}

export const Separator: Story = {
  args: { variant: "separator", children: <MarkerContent>Today</MarkerContent> },
}

export const Border: Story = {
  args: { variant: "border", children: <MarkerContent>Earlier messages</MarkerContent> },
}

export const WithIcon: Story = {
  render: ({ variant }) => (
    <Marker variant={variant}>
      <MarkerIcon>
        <LockIcon />
      </MarkerIcon>
      <MarkerContent>Messages in this chat are encrypted</MarkerContent>
    </Marker>
  ),
}

export const WithLink: Story = {
  render: ({ variant }) => (
    <Marker variant={variant}>
      <MarkerContent>
        Card locked. <a href="#">Unlock card</a>
      </MarkerContent>
    </Marker>
  ),
}

export const AsLink: Story = {
  render: ({ variant }) => (
    <Marker variant={variant} asChild>
      <a href="#">
        <MarkerContent>View 12 earlier messages</MarkerContent>
      </a>
    </Marker>
  ),
}

export const InConversation: Story = {
  args: { variant: "separator" },
  render: ({ variant }) => (
    <div className="flex w-96 flex-col gap-4">
      <Marker variant={variant}>
        <MarkerContent>Today</MarkerContent>
      </Marker>
      <Message align="end">
        <MessageContent>
          <Bubble>
            <BubbleContent>Can you lock my card?</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message>
        <MessageContent>
          <Bubble variant="muted">
            <BubbleContent>Your card ending in 4821 is now locked.</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    </div>
  ),
}
