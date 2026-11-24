import type { Meta, StoryObj } from "@storybook/react-vite"
import { addDays, today } from "@/lib/format"
import { RelativeTime } from "./relative-time"

const minutesAgo = (minutes: number) => new Date(Date.now() - minutes * 60_000)

const meta: Meta<typeof RelativeTime> = {
  title: "Patterns/RelativeTime",
  component: RelativeTime,
  tags: ["autodocs"],
  args: { value: minutesAgo(3 * 24 * 60), label: undefined },
  parameters: {
    docs: {
      description: {
        component:
          'How long ago something happened, as "3d ago", with the exact date on hover (and the time and zone for a moment), so a relative date can always be checked. Use it for every "when" in a list, a timeline or a header. A YYYY-MM-DD day reads in days; a moment under a day old reads "Just now", "5m ago" or "3h ago". `label` leads it inside the hover target: "Created 4mo ago".',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof RelativeTime>

export const Default: Story = {}

export const Moments: Story = {
  render: () => (
    <ul className="flex flex-col gap-2 text-sm">
      {[0, 5, 3 * 60, 26 * 60, 9 * 24 * 60, 50 * 24 * 60, 400 * 24 * 60].map(
        (minutes) => (
          <li key={minutes}>
            <RelativeTime value={minutesAgo(minutes)} />
          </li>
        )
      )}
    </ul>
  ),
}

export const Days: Story = {
  render: () => (
    <ul className="flex flex-col gap-2 text-sm">
      {[0, -1, -6, -20, -120].map((days) => (
        <li key={days}>
          <RelativeTime value={addDays(today(), days)} />
        </li>
      ))}
    </ul>
  ),
}

/** In a record's header line: "Created 4mo ago", the date on hover over all of it. */
export const WithLabel: Story = {
  render: () => (
    <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
      <span>Opportunity #659</span>
      <span aria-hidden>·</span>
      <RelativeTime label="Created" value={addDays(today(), -128)} />
      <span aria-hidden>·</span>
      <RelativeTime label="Updated" value={minutesAgo(0)} />
    </p>
  ),
}
