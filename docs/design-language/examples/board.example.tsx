import { useState, type ReactNode } from "react"
import {
  BanknoteIcon,
  Building2Icon,
  CalendarIcon,
  TargetIcon,
} from "lucide-react"
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  EmptyState,
  ListToolbar,
  ToggleGroup,
  ToggleGroupItem,
  openable,
} from "aperia-ds5"
import { cn } from "@/lib/utils"
import { BeforeAfter, Screen } from "./before-after"

type Deal = {
  id: number
  name: string
  prospect: string
  value: number
  close: string
  priority?: string
}

const STAGES: { name: string; deals: Deal[] }[] = [
  {
    name: "Discovery",
    deals: [
      {
        id: 659,
        name: "Card Issuing Program",
        prospect: "Northwind Payments",
        value: 420_000,
        close: "01/15/2027",
        priority: "High",
      },
      {
        id: 662,
        name: "Fraud Monitoring Add-On",
        prospect: "Blue Harbor Bank",
        value: 85_000,
        close: "02/03/2027",
      },
    ],
  },
  {
    name: "Demo",
    deals: [
      {
        id: 648,
        name: "Merchant Acquiring",
        prospect: "Cedar Credit Union",
        value: 650_000,
        close: "12/19/2026",
        priority: "High",
      },
    ],
  },
  {
    name: "Proposal",
    deals: [
      {
        id: 631,
        name: "Commercial Cards",
        prospect: "Lumen Card Services",
        value: 95_000,
        close: "12/05/2026",
      },
    ],
  },
  { name: "Closed Won", deals: [] },
]

const money = (value: number) =>
  value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  })

function Detail({
  icon: Icon,
  children,
}: {
  icon: typeof CalendarIcon
  children: ReactNode
}) {
  return (
    <span className="flex h-5 max-w-full min-w-0 items-center gap-1.5 text-xs text-muted-foreground tabular-nums">
      <Icon className="size-3 shrink-0" aria-hidden />
      <span className="truncate">{children}</span>
    </span>
  )
}

function DealCard({
  deal,
  onOpen,
}: {
  deal: Deal
  onOpen: (name: string) => void
}) {
  const open = openable(`Open ${deal.name}`, () => onOpen(deal.name))
  return (
    <Card size="sm" {...open} className={cn("shrink-0 gap-2", open.className)}>
      <CardHeader className="gap-0.5">
        <Detail icon={Building2Icon}>{deal.prospect}</Detail>
        <CardTitle className="line-clamp-2">{deal.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-start gap-2">
        <div className="flex flex-col gap-0.5">
          <Detail icon={BanknoteIcon}>{money(deal.value)}</Detail>
          <Detail icon={CalendarIcon}>{deal.close}</Detail>
        </div>
        {deal.priority && <Badge variant="outline">{deal.priority}</Badge>}
      </CardContent>
    </Card>
  )
}

/** A column just under the page, with its header pinned: the stage, its count and its total. */
function Column({
  name,
  deals,
  children,
}: {
  name: string
  deals: Deal[]
  children: ReactNode
}) {
  const total = deals.reduce((sum, deal) => sum + deal.value, 0)
  return (
    <div className="flex flex-col gap-3 rounded-lg bg-(--column) p-2 [--column:color-mix(in_oklab,var(--shadow-color)_3%,transparent)] dark:[--column:color-mix(in_oklab,var(--shadow-color)_18%,transparent)]">
      <div className="sticky top-0 z-10 -mx-2 -mt-2 -mb-2 flex flex-wrap items-center gap-x-2 gap-y-1 rounded-t-lg bg-background bg-[linear-gradient(var(--column),var(--column))] px-3 py-2">
        <h2 className="flex min-w-0 text-sm font-semibold">
          <Badge variant="secondary">{name}</Badge>
        </h2>
        <span className="text-xs text-muted-foreground tabular-nums">
          {deals.length}
        </span>
        <span className="ml-auto text-xs text-muted-foreground tabular-nums">
          {deals.length ? money(total) : "—"}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {children}
        {deals.length === 0 && (
          <EmptyState
            icon={TargetIcon}
            title="No Opportunities"
            className="p-4"
          />
        )}
      </div>
    </div>
  )
}

/** The Pipeline board: the toolbar with its Board / Table switch, then a column per stage. */
export function BoardExample() {
  const [layout, setLayout] = useState("board")
  const [query, setQuery] = useState("")
  const [opened, setOpened] = useState<string | null>(null)
  const count = STAGES.reduce((sum, stage) => sum + stage.deals.length, 0)
  return (
    <Screen
      caption={
        opened
          ? `Opened ${opened}. The whole card is the target.`
          : "Click a card, or Tab to one and press Enter: the whole card opens the opportunity."
      }
    >
      <ListToolbar
        layout={
          <ToggleGroup
            type="single"
            variant="outline"
            aria-label="Layout"
            value={layout}
            onValueChange={(next) => next && setLayout(next)}
          >
            <ToggleGroupItem value="board">Board</ToggleGroupItem>
            <ToggleGroupItem value="table">Table</ToggleGroupItem>
          </ToggleGroup>
        }
        search={{
          placeholder: "Search opportunities",
          value: query,
          onChange: setQuery,
        }}
        shown={count}
        total={count}
        noun={["opportunity", "opportunities"]}
      />
      <div className="overflow-x-auto pb-1">
        <div className="grid auto-cols-[minmax(16rem,1fr)] grid-flow-col gap-4">
          {STAGES.map((stage) => {
            const deals = stage.deals.filter((deal) =>
              `${deal.name} ${deal.prospect}`
                .toLowerCase()
                .includes(query.toLowerCase())
            )
            return (
              <Column key={stage.name} name={stage.name} deals={deals}>
                {deals.map((deal) => (
                  <DealCard key={deal.id} deal={deal} onOpen={setOpened} />
                ))}
              </Column>
            )
          })}
        </div>
      </div>
    </Screen>
  )
}

const DEAL = STAGES[0].deals[0]

/** A card with its own View link and a solid stage pill, against the card that opens as a whole. */
export function BoardBeforeAfter() {
  return (
    <BeforeAfter
      beforeNote="a View button and a link inside the card, a solid pill, a bare header"
      afterNote="the whole card opens; the header has the badge, count and total"
      before={
        <div className="flex w-full max-w-72 flex-col gap-2 self-center rounded-lg bg-muted/60 p-2">
          <h2 className="px-1 text-sm font-semibold">Discovery</h2>
          <Card size="sm" className="gap-2">
            <CardHeader className="gap-1">
              <CardTitle>{DEAL.name}</CardTitle>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-xs text-primary underline"
              >
                {DEAL.prospect}
              </a>
            </CardHeader>
            <CardContent className="flex items-center justify-between gap-2">
              <span className="rounded-md bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                Discovery
              </span>
              <Button size="xs">View</Button>
            </CardContent>
          </Card>
        </div>
      }
      after={
        <div className="w-full max-w-72 self-center">
          <Column name="Discovery" deals={STAGES[0].deals.slice(0, 1)}>
            <DealCard deal={DEAL} onOpen={() => {}} />
          </Column>
        </div>
      }
    />
  )
}

export const boardExamples = {
  "How it looks and behaves": <BoardExample />,
  "Before and after": <BoardBeforeAfter />,
}
