import type { Meta, StoryObj } from "@storybook/react-vite"
import { Trash2Icon, UsersIcon } from "lucide-react"
import { ReasonTooltip } from "./reason-tooltip"
import { Button } from "../button/button"
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../command/command"

const meta: Meta<typeof ReasonTooltip> = {
  title: "Pattern Components/ReasonTooltip",
  // Shown on its pattern page's Code tab (site.ts), not in the sidebar or the Components index.
  component: ReasonTooltip,
  tags: ["!dev"],
  parameters: {
    docs: {
      description: {
        component:
          "Says, on hover, why something can't be picked, removed or changed. Wrap the disabled thing: a disabled control or row turns pointer events off, so the tooltip's own span takes them back. With no `reason` it renders its content as it is, so a caller can pass the reason only while it applies. Prefer it to a disabled control with no explanation; an icon-only button uses `IconButton`'s `reason` instead.",
      },
    },
  },
  args: {
    reason: "This merchant has open chargebacks and cannot be removed.",
  },
  argTypes: {
    reason: { control: "text" },
    children: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof ReasonTooltip>

/** Hover the disabled button: the tooltip says why. */
export const Default: Story = {
  render: ({ reason }) => (
    <ReasonTooltip reason={reason}>
      <Button variant="destructive" disabled={!!reason}>
        <Trash2Icon />
        Remove Merchant
      </Button>
    </ReasonTooltip>
  ),
}

/** No reason: the content renders as it is, with no tooltip. */
export const WithoutReason: Story = {
  args: { reason: null },
  render: Default.render,
}

const QUEUES = [
  { name: "Underwriting Review", members: 6, reason: null },
  {
    name: "Chargeback Disputes",
    members: 4,
    reason: "Marcus Lee is already in this queue.",
  },
  { name: "New Merchant Boarding", members: 9, reason: null },
  {
    name: "Risk Escalations",
    members: 2,
    reason: "Only risk analysts can join this queue.",
  },
]

/** In a picker, the rows that can't be picked keep their place and say why on hover. */
export const InPicker: Story = {
  render: () => (
    <Command className="w-80 surface">
      <CommandInput placeholder="Search queues" />
      <CommandList>
        <CommandGroup heading="Add Marcus Lee to a Queue">
          {QUEUES.map((queue) => (
            <CommandItem
              key={queue.name}
              value={queue.name}
              disabled={!!queue.reason}
            >
              <ReasonTooltip reason={queue.reason}>
                <UsersIcon />
                <span className="flex-1 truncate">{queue.name}</span>
                <span className="text-xs text-muted-foreground tabular-nums">
                  {queue.members}
                </span>
              </ReasonTooltip>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}
