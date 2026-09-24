import type { Meta, StoryObj } from "@storybook/react-vite"
import { FileTextIcon } from "lucide-react"
import {
  MessageGroup,
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageHeader,
} from "./message"
import { Avatar, AvatarFallback } from "../avatar/avatar"
import { Bubble, BubbleContent } from "../bubble/bubble"
import {
  Attachment,
  AttachmentMedia,
  AttachmentContent,
  AttachmentTitle,
  AttachmentDescription,
} from "../attachment/attachment"

const meta: Meta<typeof Message> = {
  title: "UI/Message",
  component: Message,
  tags: ["autodocs"],
  args: {
    align: "start",
  },
  argTypes: {
    align: {
      control: "select",
      options: ["start", "end"],
    },
  },
}

export default meta
type Story = StoryObj<typeof Message>

export const Default: Story = {
  render: ({ align }) => (
    <Message align={align} className="w-96">
      <MessageAvatar>
        <Avatar>
          <AvatarFallback>NA</AvatarFallback>
        </Avatar>
      </MessageAvatar>
      <MessageContent>
        <Bubble variant="muted">
          <BubbleContent>Your statement balance is $1,284.60, due on June 15.</BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  ),
}

export const AlignEnd: Story = {
  args: { align: "end" },
  render: ({ align }) => (
    <Message align={align} className="w-96">
      <MessageContent>
        <Bubble>
          <BubbleContent>When is my next payment due?</BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  ),
}

export const WithHeaderAndFooter: Story = {
  render: ({ align }) => (
    <Message align={align} className="w-96">
      <MessageAvatar>
        <Avatar>
          <AvatarFallback>NA</AvatarFallback>
        </Avatar>
      </MessageAvatar>
      <MessageContent>
        <MessageHeader>Nanci</MessageHeader>
        <Bubble variant="muted">
          <BubbleContent>I locked your card ending in 4821. You can unlock it at any time.</BubbleContent>
        </Bubble>
        <MessageFooter>10:42 AM</MessageFooter>
      </MessageContent>
    </Message>
  ),
}

export const Ghost: Story = {
  render: ({ align }) => (
    <Message align={align} className="w-96">
      <MessageContent>
        <MessageHeader>Nanci</MessageHeader>
        <Bubble variant="ghost">
          <BubbleContent>
            You spent $412 on dining in May, 18% more than April. Most of it was on weekends.
          </BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  ),
}

export const WithAttachment: Story = {
  args: { align: "end" },
  render: ({ align }) => (
    <Message align={align} className="w-96">
      <MessageContent>
        <Attachment>
          <AttachmentMedia>
            <FileTextIcon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>Q3-statement.pdf</AttachmentTitle>
            <AttachmentDescription>PDF, 2.4 MB</AttachmentDescription>
          </AttachmentContent>
        </Attachment>
        <Bubble>
          <BubbleContent>Can you explain the fees on this statement?</BubbleContent>
        </Bubble>
        <MessageFooter>Sent</MessageFooter>
      </MessageContent>
    </Message>
  ),
}

export const Conversation: Story = {
  render: () => (
    <MessageGroup className="w-96">
      <Message align="end">
        <MessageContent>
          <Bubble>
            <BubbleContent>Why was I charged twice at Blue Bottle Coffee?</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message>
        <MessageAvatar>
          <Avatar>
            <AvatarFallback>NA</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>Nanci</MessageHeader>
          <Bubble variant="muted">
            <BubbleContent>
              One of the two $42.10 charges is a pending authorization. It should drop off within 3 days.
            </BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent>
          <Bubble>
            <BubbleContent>Thanks, that makes sense.</BubbleContent>
          </Bubble>
          <MessageFooter>Read 10:44 AM</MessageFooter>
        </MessageContent>
      </Message>
    </MessageGroup>
  ),
}
