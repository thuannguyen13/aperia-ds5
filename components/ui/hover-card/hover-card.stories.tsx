import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "./hover-card"
import { Avatar, AvatarFallback } from "../avatar/avatar"

const meta: Meta<typeof HoverCard> = {
  title: "UI/Hover Card",
  component: HoverCard,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof HoverCard>

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <a
          href="#"
          className="text-sm font-medium underline underline-offset-4 hover:text-foreground"
        >
          @aperia
        </a>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex gap-3">
          <Avatar>
            <AvatarFallback>AP</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@aperia</h4>
            <p className="text-xs text-muted-foreground">
              Building the future of risk management — since 2019.
            </p>
            <p className="text-xs text-muted-foreground">
              San Francisco, CA
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
}

export const WithDetails: Story = {
  render: () => (
    <HoverCard openDelay={200}>
      <HoverCardTrigger asChild>
        <button className="text-sm font-medium text-primary underline underline-offset-4">
          Issue #1042
        </button>
      </HoverCardTrigger>
      <HoverCardContent side="top">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Authentication bug in login flow</h4>
          <p className="text-xs text-muted-foreground">
            Users are being redirected to a 404 page after OAuth callback.
            Affects production.
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="rounded-full bg-destructive/20 px-2 py-0.5 text-destructive">
              High
            </span>
            <span>Opened 2 days ago</span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
}
