import {
  ArrowRightIcon,
  MailIcon,
  PencilIcon,
  PlusIcon,
  StickyNoteIcon,
  XIcon,
} from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Checkbox,
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
  PageHeader,
  RecordActions,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "aperia-ds5"
import {
  DetailRow,
  DetailSection,
  MoneyValue,
  PeopleStack,
  RecordActivity,
  StatTile,
  Timeline,
  TimelineEntry,
  TimelineSaid,
  TimelineWhen,
  TitledCard,
} from "../recipes"
import { money } from "@/lib/format"
import { BeforeAfter, Screen } from "./before-after"

const hoursAgo = (hours: number) => new Date(Date.now() - hours * 3_600_000)
const strong = (text: string) => <span className="text-foreground">{text}</span>

const TEAM = [
  { id: 1, name: "Dana Whitfield", role: "Owner" },
  { id: 2, name: "Marcus Lee", role: "Sales Rep", detail: "40% commission" },
  { id: 3, name: "Priya Nair", role: "Solutions Engineer" },
  { id: 4, name: "Sam Ortega", role: "Sales Rep" },
]

const LINES = [
  { product: "Card Processing", rate: "2.45% + $0.10", volume: 3_400_000 },
  { product: "ACH Payments", rate: "$0.25 per item", volume: 800_000 },
]

const TASKS = [
  { title: "Send Proposal", type: "Email", done: true, when: "11/20/2026" },
  { title: "Pricing Review", type: "Meeting", done: false, when: "12/02/2026" },
]

function LinesCard() {
  return (
    <TitledCard
      title="Line Items"
      action={
        <Button variant="outline">
          <PencilIcon data-icon="inline-start" />
          Edit
        </Button>
      }
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-4">Product</TableHead>
            <TableHead>Rate</TableHead>
            <TableHead className="pr-4 text-right">Monthly Volume</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {LINES.map((line) => (
            <TableRow key={line.product}>
              <TableCell className="pl-4">{line.product}</TableCell>
              <TableCell className="tabular-nums">{line.rate}</TableCell>
              <TableCell className="pr-4 text-right">
                <MoneyValue value={line.volume} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TitledCard>
  )
}

function DetailsCard() {
  return (
    <TitledCard title="Details">
      <CardContent className="pb-4">
        <DetailSection>
          <DetailRow label="Source">Partner referral</DetailRow>
          <DetailRow label="Current Processor">Heartland</DetailRow>
          <DetailRow label="Contract Ends">03/31/2027</DetailRow>
        </DetailSection>
      </CardContent>
    </TitledCard>
  )
}

function TasksCard() {
  return (
    <TitledCard
      title="Tasks"
      figure="1 of 2"
      action={
        <Button variant="outline">
          <PlusIcon data-icon="inline-start" />
          Add Task
        </Button>
      }
    >
      <ItemGroup className="pb-1">
        {TASKS.map((task) => (
          <Item key={task.title} size="sm" className="rounded-none px-4">
            <ItemMedia>
              <Checkbox defaultChecked={task.done} aria-label={task.title} />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{task.title}</ItemTitle>
              <ItemDescription>{task.type}</ItemDescription>
            </ItemContent>
            <span className="text-xs text-muted-foreground tabular-nums">
              {task.when}
            </span>
          </Item>
        ))}
      </ItemGroup>
    </TitledCard>
  )
}

function NotesCard() {
  return (
    <RecordActivity
      title="Notes"
      items={[0]}
      add={
        <Button variant="outline">
          <PlusIcon data-icon="inline-start" />
          Add Note
        </Button>
      }
      list={() => (
        <Timeline>
          <TimelineEntry icon={StickyNoteIcon} title="Note" boxed last>
            <div className="self-stretch rounded-lg bg-muted/60 px-3 py-2 text-xs leading-5">
              Wants interchange-plus pricing before their board meets on the
              14th.
            </div>
            <TimelineWhen date={hoursAgo(26)} user="Marcus Lee" />
          </TimelineEntry>
        </Timeline>
      )}
    />
  )
}

function ContactsCard() {
  return (
    <TitledCard title="Contacts" figure="2">
      <ItemGroup className="pb-2">
        {[
          { name: "Alicia Moreno", role: "CFO" },
          { name: "Ben Carter", role: "Controller" },
        ].map((person) => (
          <Item key={person.name} size="sm" className="rounded-none px-4">
            <ItemMedia>
              <Avatar size="sm">
                <AvatarFallback>
                  {person.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{person.name}</ItemTitle>
              <ItemDescription>{person.role}</ItemDescription>
            </ItemContent>
          </Item>
        ))}
      </ItemGroup>
    </TitledCard>
  )
}

function ActivityCard() {
  return (
    <RecordActivity
      items={[0, 1]}
      list={() => (
        <Timeline>
          <TimelineEntry icon={ArrowRightIcon} title="Stage change">
            <TimelineSaid>
              Changed stage from {strong("Demo")} to {strong("Proposal")}
            </TimelineSaid>
            <TimelineWhen date={hoursAgo(30)} user="Dana Whitfield" />
          </TimelineEntry>
          <TimelineEntry icon={MailIcon} title="Email" last>
            <TimelineSaid>Sent {strong("Pricing proposal")}</TimelineSaid>
            <TimelineWhen date={hoursAgo(80)} user="Marcus Lee" />
          </TimelineEntry>
        </Timeline>
      )}
    />
  )
}

/** An opportunity's page: header, tiles, then a main and a side column of cards once the page is wide enough. */
export function RecordPageExample() {
  return (
    <Screen
      className="sm:p-4"
      caption="Make the window narrower: under 960px of content the side column drops under the main one, and on a phone every card stacks."
    >
      <PageHeader
        title="Northwind Card Processing"
        subtitle="Opportunity #659 · Northwind Payments"
        media={
          <Avatar size="xl" shape="square">
            <AvatarFallback>NP</AvatarFallback>
          </Avatar>
        }
        actions={<Button variant="outline">Send Email</Button>}
        menu={
          <RecordActions
            onEdit={() => {}}
            onDelete={() => {}}
            actions={[
              {
                label: "Change Stage",
                icon: ArrowRightIcon,
                onSelect: () => {},
              },
              {
                label: "Close as Lost",
                icon: XIcon,
                onSelect: () => {},
                destructive: true,
              },
            ]}
          />
        }
        properties={[
          ["Stage", <Badge variant="outline">Proposal</Badge>],
          ["Expected Close", "12/15/2026"],
          ["Monthly Volume", <MoneyValue value={4_200_000} />],
          [
            "Sales Team",
            <PeopleStack
              people={TEAM}
              title="Sales Team"
              empty="No sales team"
            />,
          ],
        ]}
      />
      <div className="grid grid-cols-2 gap-4 @min-[48rem]:grid-cols-4">
        <StatTile label="Monthly Volume" value={money(4_200_000)} />
        <StatTile label="Annual Revenue" value={money(186_400)} />
        <StatTile label="Days in Stage" value="12" />
        <StatTile label="Tasks Done" value="1 of 2" />
      </div>
      <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-4 @min-[60rem]:grid-cols-4">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-4 @min-[60rem]:col-span-3">
          <LinesCard />
          <DetailsCard />
          <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-4 @min-[60rem]:grid-cols-2">
            <TasksCard />
            <NotesCard />
          </div>
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)] gap-4">
          <ContactsCard />
          <ActivityCard />
        </div>
      </div>
    </Screen>
  )
}

/** Titan’s merchant header and hand-headed card, against PageHeader and a TitledCard. */
export function RecordPageBeforeAfter() {
  return (
    <BeforeAfter
      beforeNote="facts with colons; a card with its own heading, a link for its action, and links in every row"
      afterNote="facts as label over value; a titled card whose action is a button; the status a badge"
      before={
        <>
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-medium">Harbor Lane Bistro LLC</h1>
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1">
              <dt className="text-muted-foreground">MID:</dt>
              <dd className="tabular-nums">492001837716</dd>
              <dt className="text-muted-foreground">MCC:</dt>
              <dd>5812 Eating Places, Restaurants</dd>
            </dl>
          </div>
          <Card className="gap-3 py-3">
            <CardHeader className="flex flex-row items-center justify-between px-3">
              <CardTitle className="text-sm">Alert Status</CardTitle>
              <a href="#" className="text-sm text-primary">
                View Alert History
              </a>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-3 px-3">
              <Button size="xs" className="bg-blue-600 text-white">
                Unworked
              </Button>
              <span className="tabular-nums">10/28/2026</span>
              <a href="#" className="text-primary">
                View Alerted Merchants
              </a>
            </CardContent>
          </Card>
        </>
      }
      after={
        <>
          <PageHeader
            title="Harbor Lane Bistro LLC"
            subtitle="Merchant #492001837716"
            properties={[
              ["MCC", "5812 Eating Places, Restaurants"],
              ["Processor", "Repay"],
            ]}
          />
          <TitledCard
            title="Alert Status"
            action={<Button variant="outline">View Alert History</Button>}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-4">Disposition</TableHead>
                  <TableHead className="pr-4">Report Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="pl-4">
                    <Badge variant="secondary">Unworked</Badge>
                  </TableCell>
                  <TableCell className="pr-4 tabular-nums">
                    10/28/2026
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TitledCard>
        </>
      }
    />
  )
}

export const recordPageExamples = {
  "How it looks and behaves": <RecordPageExample />,
  "Before and after": <RecordPageBeforeAfter />,
}
