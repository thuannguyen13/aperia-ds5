import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  ArrowRightIcon,
  MailIcon,
  PencilIcon,
  PhoneIcon,
  PlusIcon,
  StickyNoteIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button/button"
import { EmptyState } from "@/components/ui/empty-state/empty-state"
import {
  Timeline,
  TimelineEntry,
  TimelineSaid,
  TimelineWhen,
} from "./timeline-entry"
import { RecordActivity } from "./record-activity"

type Entry = {
  id: number
  icon: typeof PhoneIcon
  kind: string
  said: React.ReactNode
  at: Date
  user: string | null
  note?: string
}

const hoursAgo = (hours: number) => new Date(Date.now() - hours * 3_600_000)
const strong = (text: string) => <span className="text-foreground">{text}</span>

const KINDS = [
  {
    icon: PhoneIcon,
    kind: "Call",
    said: (n: number) => <>Changed {strong(`Follow-up call ${n}`)} to Done</>,
  },
  {
    icon: MailIcon,
    kind: "Email",
    said: (n: number) => <>Changed {strong(`Pricing email ${n}`)} to Done</>,
  },
  {
    icon: PencilIcon,
    kind: "Edit",
    said: () => <>Changed expected close to {strong("12/15/2026")}</>,
  },
  {
    icon: ArrowRightIcon,
    kind: "Stage change",
    said: () => (
      <>
        Changed stage from {strong("Demo")} to {strong("Proposal")}
      </>
    ),
  },
]
const USERS = ["Maria Chen", "James Ortiz", "Priya Raman"]

/** A history of `count` entries, newest first, the oldest the record's creation. */
const history = (count: number): Entry[] =>
  Array.from({ length: count }, (_, at) => {
    if (at === count - 1)
      return {
        id: at,
        icon: PlusIcon,
        kind: "Created",
        said: <>Created at {strong("Qualification")}</>,
        at: hoursAgo(at * 30 + 2),
        user: null,
      }
    const kind = KINDS[at % KINDS.length]
    return {
      id: at,
      icon: kind.icon,
      kind: kind.kind,
      said: kind.said(count - at),
      at: hoursAgo(at * 30 + 2),
      user: USERS[at % USERS.length],
      note:
        at === 1
          ? "Northwind wants one statement across both their gateways, and interchange-plus pricing before their board meets on the 14th. Their current processor contract ends in March, with a $495 early termination fee they'd like us to cover."
          : undefined,
    }
  })

const list = (items: readonly Entry[]) => (
  <Timeline>
    {items.map((item, at) => (
      <TimelineEntry
        key={item.id}
        icon={item.icon}
        title={item.kind}
        last={at === items.length - 1}
      >
        <TimelineSaid>{item.said}</TimelineSaid>
        <TimelineWhen date={item.at} user={item.user} />
        {item.note && <Note>{item.note}</Note>}
      </TimelineEntry>
    ))}
  </Timeline>
)

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

const meta: Meta<typeof RecordActivity<Entry>> = {
  title: "Design Language/Recipes/RecordActivity",
  component: RecordActivity,
  tags: ["!dev"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A record's history in a card, newest first, so the page keeps one scroll: the latest ten on the page and, past that, View All in the header opening every entry in a sheet. `list` draws the entries it's given, usually a `Timeline`, the same in the card and the sheet. Notes are the same card titled Notes, with their own empty state and `add`: Add sits in the header while there are notes, and in the empty state while there are none.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-xl">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof RecordActivity<Entry>>

export const Default: Story = {
  render: () => <RecordActivity items={history(5)} list={list} />,
}

/** Past ten entries: the latest ten, and View All Activity opens every one in a sheet. */
export const LongHistory: Story = {
  render: () => <RecordActivity items={history(24)} list={list} />,
}

export const Empty: Story = {
  render: () => <RecordActivity items={[]} list={list} />,
}

const addNote = (
  <Button variant="outline">
    <PlusIcon data-icon="inline-start" />
    Add Note
  </Button>
)

const notes = (
  items: readonly { id: number; note: string; at: Date; user: string }[]
) => (
  <Timeline>
    {items.map((item, at) => (
      <TimelineEntry
        key={item.id}
        icon={StickyNoteIcon}
        title="Note"
        boxed
        last={at === items.length - 1}
      >
        <Note>{item.note}</Note>
        <TimelineWhen date={item.at} user={item.user} />
      </TimelineEntry>
    ))}
  </Timeline>
)

/** Notes, with Add in the header beside them. */
export const Notes: Story = {
  render: () => (
    <RecordActivity
      title="Notes"
      items={[
        {
          id: 1,
          note: "Sent the revised rate sheet. Waiting on their processor contract end date.",
          at: hoursAgo(3),
          user: "Maria Chen",
        },
        {
          id: 2,
          note: "Asked about chargeback handling for recurring billing. Looping in the risk team before we quote.",
          at: hoursAgo(140),
          user: "James Ortiz",
        },
      ]}
      list={notes}
      add={addNote}
      empty={
        <EmptyState icon={StickyNoteIcon} title="No Notes" action={addNote} />
      }
    />
  ),
}

/** No notes yet: Add moves into the empty state, and the header has none. */
export const NotesEmpty: Story = {
  render: () => (
    <RecordActivity
      title="Notes"
      items={[]}
      list={notes}
      add={addNote}
      empty={
        <EmptyState icon={StickyNoteIcon} title="No Notes" action={addNote} />
      }
    />
  ),
}
