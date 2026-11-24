import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  ArrowRightIcon,
  CheckIcon,
  FlagIcon,
  PhoneIcon,
  PlusIcon,
  StickyNoteIcon,
} from "lucide-react"
import {
  Timeline,
  TimelineEntry,
  TimelineSaid,
  TimelineWhen,
} from "./timeline-entry"

const minutesAgo = (minutes: number) => new Date(Date.now() - minutes * 60_000)
const strong = (text: string) => <span className="text-foreground">{text}</span>

/** A note as an app shows one under an entry: a muted box, clamped to three lines. */
function Note({ children }: { children: string }) {
  return (
    <div className="mt-1.5 self-stretch rounded-lg bg-muted/60 px-3 py-2">
      {/* The clamp is on the text inside the padded box, so the cut lines never show in the padding. */}
      <p className="line-clamp-3 text-xs leading-5 whitespace-pre-line text-foreground">
        {children}
      </p>
    </div>
  )
}

const meta: Meta<typeof TimelineEntry> = {
  title: "Design Language/Recipes/TimelineEntry",
  component: TimelineEntry,
  tags: ["!dev"],
  parameters: {
    docs: {
      description: {
        component:
          "A record's history as a timeline, the one look of Activity on every record's page: `Timeline` around `TimelineEntry`s, each led by an icon on a line that threads them and stops at the last. An entry says what happened (`TimelineSaid`, the changed values in the body color), then when and who (`TimelineWhen`), then any note in its box (with `boxed`, so the icon sits on the box's first line). What each entry says stays with the app. Put it in `RecordActivity`.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof TimelineEntry>

/** A green check over a task's icon once it's done: the app's own color, passed as `badge`. */
const done = (
  <span
    aria-hidden
    className="absolute -right-0.5 -bottom-0.5 flex size-2.5 items-center justify-center rounded-full bg-emerald-600 text-white ring-2 ring-card"
  >
    <CheckIcon className="size-1.75" strokeWidth={4.5} />
  </span>
)

export const Activity: Story = {
  render: () => (
    <Timeline>
      <TimelineEntry icon={ArrowRightIcon} title="Stage change">
        <TimelineSaid>
          Changed stage from {strong("Demo")} to {strong("Proposal")}
        </TimelineSaid>
        <TimelineWhen date={minutesAgo(42)} user="Maria Chen" />
      </TimelineEntry>
      <TimelineEntry icon={PhoneIcon} title="Call" badge={done}>
        <TimelineSaid>Changed {strong("Discovery call")} to Done</TimelineSaid>
        <TimelineWhen date={minutesAgo(26 * 60)} user="Maria Chen" />
        <Note>
          {
            "Spoke with Dana (CFO). They process about 40k card transactions a month through two gateways and want one statement. Wants pricing on interchange-plus before the board meeting on the 14th."
          }
        </Note>
      </TimelineEntry>
      <TimelineEntry icon={FlagIcon} title="Priority change">
        <TimelineSaid>Changed priority to {strong("Urgent")}</TimelineSaid>
        <TimelineWhen date={minutesAgo(4 * 24 * 60)} user="James Ortiz" />
      </TimelineEntry>
      <TimelineEntry icon={PlusIcon} title="Created" last>
        <TimelineSaid>Created at {strong("Qualification")}</TimelineSaid>
        {/* No one: the system created it. */}
        <TimelineWhen date={minutesAgo(40 * 24 * 60)} user={null} />
      </TimelineEntry>
    </Timeline>
  ),
}

/** Notes open with their box, so each icon drops to the box's first line (`boxed`). */
export const Notes: Story = {
  render: () => (
    <Timeline>
      {[
        {
          note: "Sent the revised rate sheet. Waiting on their processor contract end date.",
          at: 3 * 60,
          user: "Maria Chen",
        },
        {
          note: "Merchant asked about chargeback handling for their recurring billing. Looping in the risk team before we quote.\n\nFollow-up booked for Thursday.",
          at: 6 * 24 * 60,
          user: "James Ortiz",
        },
      ].map((each, at, all) => (
        <TimelineEntry
          key={each.at}
          icon={StickyNoteIcon}
          title="Note"
          boxed
          last={at === all.length - 1}
        >
          <Note>{each.note}</Note>
          <TimelineWhen date={minutesAgo(each.at)} user={each.user} />
        </TimelineEntry>
      ))}
    </Timeline>
  ),
}
