import { ArrowRightIcon, PencilIcon, PlusIcon } from "lucide-react"
import { Anatomy } from "../anatomy"
import {
  RecordActivity,
  Timeline,
  TimelineEntry,
  TimelineSaid,
  TimelineWhen,
} from "../recipes"

// The Anatomy drawing of the History page: a record's history card with its first entries, drawn inline since the sheet
// that View All opens is not part of it. Each part is marked in the order of the part list in history.md.

type Entry = {
  id: number
  icon: typeof PencilIcon
  kind: string
  said: React.ReactNode
  at: Date
  user: string | null
  note?: string
}

const hoursAgo = (hours: number) => new Date(Date.now() - hours * 3_600_000)
const strong = (text: string) => <span className="text-foreground">{text}</span>

const ENTRIES: Entry[] = [
  {
    id: 1,
    icon: ArrowRightIcon,
    kind: "Stage change",
    said: (
      <>
        Changed stage from {strong("Demo")} to {strong("Proposal")}
      </>
    ),
    at: hoursAgo(76),
    user: "Maria Chen",
  },
  {
    id: 2,
    icon: PencilIcon,
    kind: "Edit",
    said: <>Changed expected close to {strong("12/15/2026")}</>,
    at: hoursAgo(130),
    user: "James Ortiz",
    note: "Northwind wants one statement across both gateways, and interchange-plus pricing before their board meets on the 14th.",
  },
  {
    id: 3,
    icon: PlusIcon,
    kind: "Created",
    said: <>Created at {strong("Qualification")}</>,
    at: hoursAgo(200),
    user: null,
  },
  {
    id: 4,
    icon: PlusIcon,
    kind: "Created",
    said: <>Created at {strong("Qualification")}</>,
    at: hoursAgo(300),
    user: null,
  },
]

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
        {item.note && (
          <div className="mt-1.5 self-stretch rounded-lg bg-muted/60 px-3 py-2">
            <p className="line-clamp-3 text-xs leading-5 whitespace-pre-line text-foreground">
              {item.note}
            </p>
          </div>
        )}
      </TimelineEntry>
    ))}
  </Timeline>
)

const CONTENT = "[data-slot=card-content] ol > li"
// The first entry shows the parts of one line. The second has a note, so its line is long enough to mark. The third is
// one the app made, with no person.
const FIRST = `${CONTENT}:nth-child(1)`
const SECOND = `${CONTENT}:nth-child(2)`

export const historyAnatomy = (
  <Anatomy
    zoom={1.25}
    targets={{
      1: { selector: "[data-slot=card]", side: "top", align: "start" },
      2: { selector: "[data-slot=card-title]", side: "left" },
      3: { selector: "[data-slot=card-action] button", side: "right" },
      4: { selector: `${CONTENT}:nth-child(3)`, side: "right" },
      5: { selector: `${FIRST} > div:first-child > span[title]`, side: "left" },
      6: { selector: `${FIRST} > div:last-child > p`, side: "right" },
      7: {
        selector: `${FIRST} > div:last-child > div > span:first-child`,
        side: "left",
      },
      8: {
        selector: `${FIRST} > div:last-child > div > span:last-child`,
        side: "right",
      },
      9: {
        selector: `${SECOND} > div:last-child > div.rounded-lg`,
        side: "right",
      },
      10: {
        selector: `${SECOND} > div:first-child > span[aria-hidden]`,
        side: "left",
      },
    }}
  >
    <div className="w-[30rem]">
      <RecordActivity items={ENTRIES} list={list} latest={3} />
    </div>
  </Anatomy>
)
