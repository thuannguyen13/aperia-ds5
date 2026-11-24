import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { FlagSwitch } from "./flag-switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table/table"

const meta: Meta<typeof FlagSwitch> = {
  title: "Patterns/FlagSwitch",
  component: FlagSwitch,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "An on/off choice in a grid, such as a role's permission or a notification's channel: a small switch with Yes or No beside it, so the state reads without color, and the switch and its word are one target, lit on hover. `label` names the cell for a screen reader (row and column). With a `reason` it can't change: faded, with a lock, and the reason in a tooltip that keyboard reaches too. `disabled` alone fades it with no reason, such as while the grid loads. `className` goes on the switch, for an app's own \"on\" color.",
      },
    },
  },
  args: {
    on: true,
    label: "Sales Rep: Prospects, Delete",
    disabled: false,
  },
  argTypes: {
    on: { control: "boolean" },
    disabled: { control: "boolean" },
    reason: { control: "text" },
    className: { control: "text" },
    onChange: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof FlagSwitch>

export const Default: Story = {
  render: function Render(args) {
    const [on, setOn] = useState(args.on)
    return <FlagSwitch {...args} on={on} onChange={setOn} />
  },
}

export const Locked: Story = {
  args: {
    reason: "You cannot remove your own role's access to Roles.",
  },
  render: (args) => <FlagSwitch {...args} onChange={() => {}} />,
}

const CHANNELS = [
  { channel: "app", label: "In App" },
  { channel: "email", label: "Email" },
  { channel: "teams", label: "Teams" },
] as const

const EVENTS = [
  { event: "assigned", label: "Prospect assigned to me" },
  { event: "stage", label: "Deal changed stage" },
  { event: "due", label: "Task due tomorrow" },
  { event: "mention", label: "Mentioned in a note" },
] as const

type Choice = Record<string, Record<string, boolean>>

/** Notification settings: one row per event, one column per channel. Email for mentions is locked. */
export const InATable: Story = {
  render: function Render() {
    const [choices, setChoices] = useState<Choice>(() =>
      Object.fromEntries(
        EVENTS.map(({ event }) => [
          event,
          { app: true, email: event !== "due", teams: event === "mention" },
        ])
      )
    )
    return (
      <div className="w-[36rem] overflow-hidden surface">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-3">Event</TableHead>
              {CHANNELS.map((each) => (
                <TableHead key={each.channel} className="px-2.5">
                  {each.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {EVENTS.map(({ event, label }) => (
              <TableRow key={event}>
                <TableCell className="pl-3">{label}</TableCell>
                {CHANNELS.map((each) => (
                  <TableCell key={each.channel} className="px-2.5 py-0">
                    <FlagSwitch
                      on={choices[event][each.channel]}
                      label={`${label}, ${each.label}`}
                      reason={
                        event === "mention" && each.channel === "email"
                          ? "Mentions always email you."
                          : undefined
                      }
                      onChange={(on) =>
                        setChoices((was) => ({
                          ...was,
                          [event]: { ...was[event], [each.channel]: on },
                        }))
                      }
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  },
}

/** Before the choices load, every switch waits, with no reason to give. */
export const Loading: Story = {
  args: { on: true, disabled: true },
  render: (args) => <FlagSwitch {...args} onChange={() => {}} />,
}
