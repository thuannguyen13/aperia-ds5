import { useState, type ComponentProps, type ReactNode } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { ExternalLinkIcon, ListChecksIcon, StoreIcon } from "lucide-react"
import {
  AppContent,
  AppHeader,
  AppSidebar,
  AppSidebarSearch,
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
  ListPager,
  ListToolbar,
  NoResults,
  PageHeader,
  SidebarInset,
  SidebarProvider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  UNSORTED,
  filterRows,
  opensOnClick,
  pageRows,
  sortRows,
  type AppCrumbs,
  type AppNavGroup,
  type FilterField,
  type FilterRule,
  type SortField,
} from "aperia-ds5"
import {
  Bar,
  BarChart,
  CHART_MARGIN,
  ChartContainer,
  ChartGrid,
  ChartLegend,
  ChartLegendContent,
  ChartTip,
  XAxis,
  YAxis,
  chartAxisProps,
  type ChartConfig,
} from "@/components/ui/chart"
import { formatDate, initials, percent } from "@/lib/format"
import { MoneyValue, StatTile, TitledCard } from "../recipes"

// Titan's three screens rebuilt from aperia-ds5, each in the real app shell and the whole window, for the desktop and
// phone frames on the Examples pages. Hidden from the sidebar. Every name and number is invented demo data.

const meta: Meta = {
  title: "Design Language/Examples/Titan Screens",
  tags: ["!dev", "!autodocs"],
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj

const REPORT_DATE = "Report date 11/22/2026"

const GROUPS: AppNavGroup[] = [
  {
    label: "Risk",
    items: [
      { href: "/queues", label: "Queue View", icon: ListChecksIcon },
      { href: "/merchants", label: "Merchant View", icon: StoreIcon },
    ],
  },
]

// Links in a frame go nowhere.
const FrameLink = ({ href, ...props }: ComponentProps<"a">) => (
  <a href={href} onClick={(event) => event.preventDefault()} {...props} />
)

function Shell({
  path,
  crumbs,
  children,
}: {
  path: string
  crumbs?: AppCrumbs
  children: ReactNode
}) {
  const [searching, setSearching] = useState(false)
  return (
    <SidebarProvider className="h-svh min-h-0">
      <AppSidebar
        brand={{ name: "Foresight" }}
        groups={GROUPS}
        currentPath={path}
        link={FrameLink}
        search={<AppSidebarSearch onOpen={() => setSearching(true)} />}
        user={{ name: "Dana Ruiz", role: "Analyst" }}
        onSignOut={() => {}}
      />
      <CommandDialog open={searching} onOpenChange={setSearching}>
        <CommandInput placeholder="Search merchants and queues" />
        <CommandList>
          <CommandEmpty>No Results</CommandEmpty>
        </CommandList>
      </CommandDialog>
      <SidebarInset className="min-h-0 overflow-hidden">
        <AppHeader crumbs={crumbs} link={FrameLink}>
          <AppContent>{children}</AppContent>
        </AppHeader>
      </SidebarInset>
    </SidebarProvider>
  )
}

// ---- Queue View -------------------------------------------------------------------------------------------------

type Queue = {
  name: string
  alerted: number
  unworked: number
  inProgress: number
  worked: number
}

const QUEUE_ROWS: Queue[] = [
  {
    name: "Mastercard Default Monitoring",
    alerted: 48,
    unworked: 21,
    inProgress: 7,
    worked: 20,
  },
  {
    name: "MC Critical Band Watch",
    alerted: 31,
    unworked: 9,
    inProgress: 4,
    worked: 18,
  },
  {
    name: "New and Ramping Merchants",
    alerted: 64,
    unworked: 40,
    inProgress: 6,
    worked: 18,
  },
]

const count = (value: number) => value.toLocaleString("en-US")

function QueuesPage() {
  const [query, setQuery] = useState("")
  const rows = QUEUE_ROWS.filter((row) =>
    row.name.toLowerCase().includes(query.toLowerCase())
  )
  return (
    <>
      <PageHeader title="Queue View" subtitle={REPORT_DATE} />
      <ListToolbar
        search={{
          placeholder: "Search detection queues",
          value: query,
          onChange: setQuery,
        }}
        shown={rows.length}
        total={QUEUE_ROWS.length}
        noun={["queue", "queues"]}
      />
      {rows.length === 0 ? (
        <NoResults className="surface" onClear={() => setQuery("")} />
      ) : (
        <>
          <div className="overflow-x-auto surface">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-4">Detection Queue</TableHead>
                  <TableHead className="text-right">
                    Alerted Merchants
                  </TableHead>
                  <TableHead className="text-right">Unworked</TableHead>
                  <TableHead className="text-right">In Progress</TableHead>
                  <TableHead className="text-right">Worked</TableHead>
                  <TableHead className="pr-4 text-right">% Worked</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    {...opensOnClick(`Open ${row.name}`, () => {})}
                  >
                    <TableCell className="pl-4 font-medium">
                      {row.name}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {count(row.alerted)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {count(row.unworked)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {count(row.inProgress)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {count(row.worked)}
                    </TableCell>
                    <TableCell className="pr-4 text-right tabular-nums">
                      {percent(row.worked, row.alerted)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <ListPager
            page={1}
            total={rows.length}
            noun={["queue", "queues"]}
            onPageChange={() => {}}
          />
        </>
      )}
    </>
  )
}

// ---- Merchant View ----------------------------------------------------------------------------------------------

type Band = "Very Low" | "Low" | "Medium" | "High" | "Critical"

type Merchant = {
  mid: string
  name: string
  mcc: number
  queue: string
  band: Band
  score: number
  alerted: string
}

const BANDS: Band[] = ["Very Low", "Low", "Medium", "High", "Critical"]
const QUEUES = QUEUE_ROWS.map((queue) => queue.name)

const bandOf = (score: number): Band =>
  score < 350
    ? "Very Low"
    : score < 500
      ? "Low"
      : score < 650
        ? "Medium"
        : score < 850
          ? "High"
          : "Critical"

// The merchants the list toolbar's stories use, then invented ones built the same way every time, 30 in all.
const NAMED: Merchant[] = [
  {
    mid: "492001837716",
    name: "Harbor Lane Bistro LLC",
    mcc: 5812,
    queue: "Mastercard Default Monitoring",
    band: "High",
    score: 748,
    alerted: "2026-11-18",
  },
  {
    mid: "492001902245",
    name: "Apex Digital Goods Inc",
    mcc: 5816,
    queue: "MC Critical Band Watch",
    band: "Critical",
    score: 911,
    alerted: "2026-11-20",
  },
  {
    mid: "492001655390",
    name: "Northgate Auto Repair",
    mcc: 7538,
    queue: "New and Ramping Merchants",
    band: "Medium",
    score: 512,
    alerted: "2026-11-09",
  },
  {
    mid: "492002114068",
    name: "Lumen Wellness Supply Co",
    mcc: 5499,
    queue: "Mastercard Default Monitoring",
    band: "Critical",
    score: 884,
    alerted: "2026-11-21",
  },
  {
    mid: "492002230512",
    name: "Coastline Ticket Exchange",
    mcc: 7922,
    queue: "MC Critical Band Watch",
    band: "High",
    score: 705,
    alerted: "2026-11-15",
  },
  {
    mid: "492002318840",
    name: "Maple Street Florist",
    mcc: 5992,
    queue: "New and Ramping Merchants",
    band: "Low",
    score: 318,
    alerted: "2026-10-30",
  },
]

const PLACES = [
  "Bayside",
  "Copper Kettle",
  "Elm Row",
  "Granite Peak",
  "Ironwood",
  "Juniper",
  "Kestrel",
  "Lakeview",
  "Meadowbrook",
  "Oak Hollow",
  "Pinecrest",
  "Quarry Hill",
  "Redwood",
  "Silver Birch",
  "Tidewater",
  "Willow Creek",
  "Amber Ridge",
  "Bluestone",
  "Cedar Point",
  "Driftwood",
  "Fernbrook",
  "Golden Mile",
  "Hillcrest",
  "Larkspur",
]

const KINDS: [string, number][] = [
  ["Grill", 5812],
  ["Market", 5411],
  ["Auto Care", 7538],
  ["Gifts", 5947],
  ["Salon", 7230],
  ["Outfitters", 5699],
]

const MERCHANT_ROWS: Merchant[] = [
  ...NAMED,
  ...PLACES.map((place, at): Merchant => {
    const [kind, mcc] = KINDS[(at * 5) % KINDS.length]
    const score = 300 + ((at * 137) % 650)
    return {
      mid: String(492002400000 + at * 7919),
      name: `${place} ${kind}`,
      mcc,
      queue: QUEUES[at % QUEUES.length],
      band: bandOf(score),
      score,
      alerted: `2026-11-${String(22 - (at % 20)).padStart(2, "0")}`,
    }
  }),
]

const MERCHANT_FIELDS: FilterField<Merchant>[] = [
  { id: "mid", label: "MID", type: "text", read: (row) => row.mid },
  { id: "name", label: "Merchant Name", type: "text", read: (row) => row.name },
  {
    id: "queue",
    label: "Detection Queue",
    type: "enum",
    options: QUEUES.map((queue) => ({ value: queue, text: queue })),
    read: (row) => row.queue,
  },
  { id: "mcc", label: "MCC", type: "number", read: (row) => row.mcc },
  {
    id: "band",
    label: "MC Band",
    type: "enum",
    options: BANDS.map((band) => ({ value: band, text: band })),
    read: (row) => row.band,
  },
  { id: "score", label: "MC Score", type: "number", read: (row) => row.score },
  {
    id: "alerted",
    label: "Last Alert",
    type: "day",
    read: (row) => row.alerted,
  },
]

const MERCHANT_SORTS: SortField<Merchant>[] = [
  { value: "name", label: "Merchant Name", read: (row) => row.name },
  {
    value: "score",
    label: "MC Score",
    read: (row) => row.score,
    starts: "desc",
  },
  {
    value: "alerted",
    label: "Last Alert",
    read: (row) => row.alerted,
    starts: "desc",
  },
]

function MerchantsPage() {
  const [query, setQuery] = useState("")
  const [rules, setRules] = useState<FilterRule[]>([])
  const [sort, setSort] = useState(UNSORTED)
  const [page, setPage] = useState(1)
  // A new search, filter or sort starts again at page 1.
  const changed =
    <T,>(set: (value: T) => void) =>
    (value: T) => {
      set(value)
      setPage(1)
    }
  const matched = sortRows(
    filterRows(
      MERCHANT_ROWS.filter((row) =>
        `${row.mid} ${row.name}`.toLowerCase().includes(query.toLowerCase())
      ),
      MERCHANT_FIELDS,
      rules
    ),
    MERCHANT_SORTS,
    sort
  )
  const rows = pageRows(matched, page)
  return (
    <>
      <PageHeader title="Merchant View" subtitle={REPORT_DATE} />
      <ListToolbar
        search={{
          placeholder: "Search MID or merchant name",
          value: query,
          onChange: changed(setQuery),
        }}
        filters={{
          fields: MERCHANT_FIELDS,
          value: rules,
          onChange: changed(setRules),
        }}
        shown={matched.length}
        total={MERCHANT_ROWS.length}
        noun={["merchant", "merchants"]}
        sort={{
          fields: MERCHANT_SORTS,
          value: sort,
          onChange: changed(setSort),
        }}
      />
      {matched.length === 0 ? (
        <NoResults
          className="surface"
          onClear={() => {
            setQuery("")
            setRules([])
            setPage(1)
          }}
        />
      ) : (
        <>
          <div className="overflow-x-auto surface">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-4">MID</TableHead>
                  <TableHead>Merchant Name</TableHead>
                  <TableHead className="text-right">MCC</TableHead>
                  <TableHead>Detection Queue</TableHead>
                  <TableHead>MC Band</TableHead>
                  <TableHead className="pr-4 text-right">MC Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.mid}
                    {...opensOnClick(`Open ${row.name}`, () => {})}
                  >
                    <TableCell className="pl-4 tabular-nums">
                      {row.mid}
                    </TableCell>
                    <TableCell className="font-medium">{row.name}</TableCell>
                    <TableCell className="text-right tabular-nums">
                      {row.mcc}
                    </TableCell>
                    <TableCell>{row.queue}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{row.band}</Badge>
                    </TableCell>
                    <TableCell className="pr-4 text-right tabular-nums">
                      {row.score}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <ListPager
            page={page}
            total={matched.length}
            noun={["merchant", "merchants"]}
            onPageChange={setPage}
          />
        </>
      )}
    </>
  )
}

// ---- Merchant record --------------------------------------------------------------------------------------------

const MERCHANT = NAMED[0]

const ALERTS = [
  {
    status: "Unworked",
    reported: "2026-11-22",
    alerted: "2026-11-18",
    queue: "Mastercard Default Monitoring",
    parameters: "Chargeback ratio, Refund ratio",
  },
  {
    status: "Worked",
    reported: "2026-10-25",
    alerted: "2026-10-21",
    queue: "MC Critical Band Watch",
    parameters: "MC Score above 700",
  },
]

const SCORES = [
  { period: "Jul", merchant: 612, mcc: 540 },
  { period: "Aug", merchant: 655, mcc: 548 },
  { period: "Sep", merchant: 690, mcc: 551 },
  { period: "Oct", merchant: 721, mcc: 560 },
  { period: "Nov", merchant: 748, mcc: 566 },
]

const scoreChart: ChartConfig = {
  merchant: { label: "Merchant", color: "var(--chart-1)" },
  mcc: { label: "MCC Average", color: "var(--chart-2)" },
}

const axis = chartAxisProps()

const TRANSACTIONS = [
  {
    month: "Nov 2026",
    sales: 1_842,
    amount: 96_420,
    refunds: 3_180,
    chargebacks: 14,
  },
  {
    month: "Oct 2026",
    sales: 2_015,
    amount: 104_870,
    refunds: 2_460,
    chargebacks: 9,
  },
  {
    month: "Sep 2026",
    sales: 1_968,
    amount: 101_250,
    refunds: 1_920,
    chargebacks: 6,
  },
  {
    month: "Aug 2026",
    sales: 2_104,
    amount: 108_930,
    refunds: 1_640,
    chargebacks: 4,
  },
]

function AlertStatusCard() {
  return (
    <TitledCard title="Alert Status" figure={ALERTS.length}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-4">Disposition</TableHead>
            <TableHead>Report Date</TableHead>
            <TableHead>Last Alerted</TableHead>
            <TableHead>Detection Queue</TableHead>
            <TableHead className="pr-4">Violated Parameters</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ALERTS.map((alert) => (
            <TableRow key={alert.reported}>
              <TableCell className="pl-4">
                <Badge variant="secondary">{alert.status}</Badge>
              </TableCell>
              <TableCell className="tabular-nums">
                {formatDate(alert.reported)}
              </TableCell>
              <TableCell className="tabular-nums">
                {formatDate(alert.alerted)}
              </TableCell>
              <TableCell>{alert.queue}</TableCell>
              <TableCell className="pr-4">{alert.parameters}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TitledCard>
  )
}

function ScoreCard() {
  return (
    <TitledCard title="MC Score">
      <div className="flex flex-col gap-4 px-4 pb-4">
        <StatTile plain label="Current Score" value={MERCHANT.score}>
          <Badge variant="secondary">{MERCHANT.band}</Badge>
        </StatTile>
        <ChartContainer config={scoreChart} className="h-64 w-full">
          <BarChart data={SCORES} margin={CHART_MARGIN}>
            <ChartGrid />
            <XAxis dataKey="period" {...axis} />
            <YAxis domain={[0, 1000]} {...axis} />
            <ChartTip />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="merchant" fill="var(--color-merchant)" radius={4} />
            <Bar dataKey="mcc" fill="var(--color-mcc)" radius={4} />
          </BarChart>
        </ChartContainer>
      </div>
    </TitledCard>
  )
}

function TransactionsCard() {
  return (
    <TitledCard title="Transaction History">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-4">Month</TableHead>
            <TableHead className="text-right">Sales</TableHead>
            <TableHead className="text-right">Sales Amount</TableHead>
            <TableHead className="text-right">Refunds</TableHead>
            <TableHead className="pr-4 text-right">Chargebacks</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {TRANSACTIONS.map((row) => (
            <TableRow key={row.month}>
              <TableCell className="pl-4">{row.month}</TableCell>
              <TableCell className="text-right tabular-nums">
                {count(row.sales)}
              </TableCell>
              <TableCell className="text-right">
                <MoneyValue value={row.amount} />
              </TableCell>
              <TableCell className="text-right">
                <MoneyValue value={row.refunds} />
              </TableCell>
              <TableCell className="pr-4 text-right tabular-nums">
                {count(row.chargebacks)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TitledCard>
  )
}

function MerchantRecordPage() {
  return (
    <>
      <PageHeader
        title={MERCHANT.name}
        subtitle={`Merchant #${MERCHANT.mid}`}
        media={
          <Avatar size="xl" shape="square">
            <AvatarFallback>{initials(MERCHANT.name)}</AvatarFallback>
          </Avatar>
        }
        actions={
          <Button variant="outline">
            VW Risk Report
            <ExternalLinkIcon data-icon="inline-end" />
          </Button>
        }
        properties={[
          ["MCC", "5812 Eating Places, Restaurants"],
          ["Boarded", "03/14/2024"],
          ["Processor", "Keystone Processing"],
        ]}
      />
      <div className="grid grid-cols-[minmax(0,1fr)] gap-4">
        <AlertStatusCard />
        <ScoreCard />
        <TransactionsCard />
      </div>
    </>
  )
}

// ---- Stories ----------------------------------------------------------------------------------------------------

export const Queues: Story = {
  render: () => (
    <Shell path="/queues" crumbs={[]}>
      <QueuesPage />
    </Shell>
  ),
}

export const Merchants: Story = {
  render: () => (
    <Shell path="/merchants" crumbs={[]}>
      <MerchantsPage />
    </Shell>
  ),
}

export const MerchantRecord: Story = {
  render: () => (
    <Shell
      path={`/merchants/${MERCHANT.mid}`}
      crumbs={[{ label: "Merchant View", href: "/merchants" }]}
    >
      <MerchantRecordPage />
    </Shell>
  ),
}
