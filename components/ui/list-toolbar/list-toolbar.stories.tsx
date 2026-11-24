import { useMemo, useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { Building2Icon, CalendarIcon, ChevronDownIcon } from "lucide-react"
import { ListToolbar, NoResults } from "./list-toolbar"
import { filterRows, type FilterField, type FilterRule } from "./filters"
import { sortRows, UNSORTED, type SortField } from "../sort-control/sort"
import { Avatar, AvatarFallback } from "../avatar/avatar"
import { Badge } from "../badge/badge"
import { Button } from "../button/button"
import { EmptyState } from "../empty-state/empty-state"
import { EmptyValue } from "../empty-value/empty-value"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table/table"
import { ToggleGroup, ToggleGroupItem } from "../toggle-group/toggle-group"
import { formatDate, initials, money } from "@/lib/format"

const meta: Meta<typeof ListToolbar> = {
  title: "Patterns/ListToolbar",
  component: ListToolbar,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          'Every list page\'s one toolbar, a section of the page above its table or board: `start` (what picks the list\'s scope: a Board and Table switch, a report date, a saved view), the search, the filters, any `children`, how many rows are left ("12 of 40"), and one Sort at the right end (`SortControl`, sorted with `sortRows`).\n\nFilters are one model in two forms. A list describes what it can filter by (`FilterField`: an id, a label and a type, `text`, `number`, `money`, `enum`, `day` or `boolean`), and holds the filters on as `FilterRule`s (a field, an operator, its values). **Chips** (the default): Add Filter lists the columns, and each filter on is a chip that reads as a sentence, "MC Band is High, Critical", its operator and values changed in place and removed with ×. **Dropdowns** (`form: "dropdowns"`), for a list with only a few filters: each field is a fixed select, switch or From and To on the row. Apply the rules with `filterRows`, or send them to the server.\n\nOn a phone, in either form, the filters go behind one Filters button that counts those on; they\'re set in a sheet from the bottom and show as chips that clear on a tap. When nothing matches, the list shows `NoResults` with Clear Filters.',
      },
    },
  },
  argTypes: {
    search: { control: false },
    filters: { control: false },
    sort: { control: false },
    start: { control: false },
    children: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof ListToolbar>

// Titan's Merchant View: many columns, so the filters are chips the user builds.

type Merchant = {
  mid: string
  name: string
  mcc: number
  queue: string
  band: "Very Low" | "Low" | "Medium" | "High" | "Critical"
  score: number
  net: number | null
  alerted: string
}

const MERCHANTS: Merchant[] = [
  {
    mid: "492001837716",
    name: "Harbor Lane Bistro LLC",
    mcc: 5812,
    queue: "Mastercard Default Monitoring",
    band: "High",
    score: 742,
    net: 184_250,
    alerted: "2026-11-18",
  },
  {
    mid: "492001902245",
    name: "Apex Digital Goods Inc",
    mcc: 5816,
    queue: "MC Critical Band Watch",
    band: "Critical",
    score: 911,
    net: 92_400,
    alerted: "2026-11-20",
  },
  {
    mid: "492001655390",
    name: "Northgate Auto Repair",
    mcc: 7538,
    queue: "New and Ramping Merchants",
    band: "Medium",
    score: 512,
    net: 38_900,
    alerted: "2026-11-09",
  },
  {
    mid: "492002114068",
    name: "Lumen Wellness Supply Co",
    mcc: 5499,
    queue: "Mastercard Default Monitoring",
    band: "Critical",
    score: 884,
    net: null,
    alerted: "2026-11-21",
  },
  {
    mid: "492002230512",
    name: "Coastline Ticket Exchange",
    mcc: 7922,
    queue: "MC Critical Band Watch",
    band: "High",
    score: 705,
    net: 412_000,
    alerted: "2026-11-15",
  },
  {
    mid: "492002318840",
    name: "Maple Street Florist",
    mcc: 5992,
    queue: "New and Ramping Merchants",
    band: "Low",
    score: 318,
    net: 12_300,
    alerted: "2026-10-30",
  },
]

const BANDS = ["Very Low", "Low", "Medium", "High", "Critical"]
const QUEUES = [
  "Mastercard Default Monitoring",
  "MC Critical Band Watch",
  "New and Ramping Merchants",
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
  { id: "net", label: "Net Amount", type: "money", read: (row) => row.net },
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

function MerchantList({
  initial = [],
  appControls = false,
}: {
  initial?: FilterRule[]
  appControls?: boolean
}) {
  const [query, setQuery] = useState("")
  const [rules, setRules] = useState(initial)
  const [sort, setSort] = useState(UNSORTED)
  const rows = sortRows(
    filterRows(
      MERCHANTS.filter((row) =>
        `${row.mid} ${row.name}`.toLowerCase().includes(query.toLowerCase())
      ),
      MERCHANT_FIELDS,
      rules
    ),
    MERCHANT_SORTS,
    sort
  )
  return (
    <div className="flex flex-col gap-5">
      <ListToolbar
        start={
          appControls && (
            <>
              <Button variant="outline" className="font-normal">
                <CalendarIcon data-icon="inline-start" />
                <span className="text-muted-foreground max-sm:sr-only">
                  Report Date
                </span>
                <span className="tabular-nums">11/22/2026</span>
              </Button>
              <Button variant="outline" className="font-normal">
                <span className="text-muted-foreground">View</span>
                My View
                <ChevronDownIcon
                  data-icon="inline-end"
                  className="text-muted-foreground"
                />
              </Button>
            </>
          )
        }
        search={{
          placeholder: "Search MID or merchant name",
          value: query,
          onChange: setQuery,
        }}
        filters={{ fields: MERCHANT_FIELDS, value: rules, onChange: setRules }}
        shown={rows.length}
        total={MERCHANTS.length}
        noun={["merchant", "merchants"]}
        sort={{ fields: MERCHANT_SORTS, value: sort, onChange: setSort }}
      />
      {rows.length === 0 ? (
        <NoResults
          className="surface"
          onClear={() => {
            setQuery("")
            setRules([])
          }}
        />
      ) : (
        <div className="overflow-clip surface">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-4">MID</TableHead>
                <TableHead>Merchant Name</TableHead>
                <TableHead>Detection Queue</TableHead>
                <TableHead className="text-right">MCC</TableHead>
                <TableHead>MC Band</TableHead>
                <TableHead className="text-right">MC Score</TableHead>
                <TableHead className="text-right">Net Amount</TableHead>
                <TableHead className="pr-4">Last Alert</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.mid} className="cursor-pointer">
                  <TableCell className="pl-4 tabular-nums">{row.mid}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.queue}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {row.mcc}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{row.band}</Badge>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {row.score}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {row.net === null ? <EmptyValue /> : money(row.net)}
                  </TableCell>
                  <TableCell className="pr-4 tabular-nums">
                    {formatDate(row.alerted)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

/** Chips, the default: Add Filter, then each filter on reads as a sentence, its operator and values changed in place. */
export const Default: Story = {
  render: () => <MerchantList />,
}

/** Filters on: an enum of two choices, a number and a text. */
export const ChipsOn: Story = {
  render: () => (
    <MerchantList
      initial={[
        { field: "band", operator: "is", values: ["High", "Critical"] },
        { field: "score", operator: "gte", values: ["700"] },
        {
          field: "queue",
          operator: "is_not",
          values: ["New and Ramping Merchants"],
        },
      ]}
    />
  ),
}

/**
 * An app's own controls in `start`: Titan's report date and saved view. The toolbar lays them out and knows nothing
 * about them.
 */
export const AppControls: Story = {
  render: () => (
    <MerchantList
      appControls
      initial={[
        { field: "band", operator: "is", values: ["High", "Critical"] },
      ]}
    />
  ),
}

/** A phone: the Filters button counts those on and opens them in a sheet; those on are chips that clear on a tap. */
export const Phone: Story = {
  render: () => (
    <MerchantList
      initial={[
        { field: "band", operator: "is", values: ["High", "Critical"] },
        { field: "score", operator: "gte", values: ["700"] },
      ]}
    />
  ),
  globals: { viewport: { value: "mobile1", isRotated: false } },
}

// Sales Portal's Prospects: two filters, so they are dropdowns.

type Prospect = {
  id: number
  name: string
  owner: string
  products: string[]
  stage: "Discovery" | "Proposal" | "Negotiation" | "Won"
  volume: number | null
  updated: string
}

const PROSPECTS: Prospect[] = [
  {
    id: 1,
    name: "Northwind Payments",
    owner: "Dana Whitfield",
    products: ["CardTrack"],
    stage: "Proposal",
    volume: 4_200_000,
    updated: "2026-11-18",
  },
  {
    id: 2,
    name: "Blue Harbor Bank",
    owner: "Marcus Lee",
    products: ["Merchant Hub"],
    stage: "Discovery",
    volume: 1_840_000,
    updated: "2026-11-20",
  },
  {
    id: 3,
    name: "Cedar Credit Union",
    owner: "Priya Raman",
    products: [],
    stage: "Negotiation",
    volume: 650_000,
    updated: "2026-11-02",
  },
  {
    id: 4,
    name: "Summit Federal",
    owner: "Dana Whitfield",
    products: ["CardTrack", "Dispute Desk"],
    stage: "Won",
    volume: 9_100_000,
    updated: "2026-10-28",
  },
  {
    id: 5,
    name: "Lakeshore Merchants",
    owner: "Owen Brooks",
    products: ["Merchant Hub"],
    stage: "Discovery",
    volume: null,
    updated: "2026-11-21",
  },
  {
    id: 6,
    name: "Granite State Bank",
    owner: "Marcus Lee",
    products: ["Dispute Desk"],
    stage: "Proposal",
    volume: 2_300_000,
    updated: "2026-11-12",
  },
  {
    id: 7,
    name: "Pioneer Trust",
    owner: "Priya Raman",
    products: ["CardTrack"],
    stage: "Negotiation",
    volume: 5_750_000,
    updated: "2026-11-15",
  },
]

const PRODUCTS = ["CardTrack", "Merchant Hub", "Dispute Desk"]
const STAGES = ["Discovery", "Proposal", "Negotiation", "Won"]

const PROSPECT_FIELDS: FilterField<Prospect>[] = [
  {
    id: "product",
    label: "Current Product",
    type: "enum",
    all: "All products",
    // A prospect counts under each product it uses.
    read: (row) => row.products,
    options: PRODUCTS.map((name) => ({
      value: name,
      text: name,
      count: PROSPECTS.filter((row) => row.products.includes(name)).length,
      media: (
        <Avatar size="xs" shape="square" aria-hidden>
          <AvatarFallback>{initials(name)}</AvatarFallback>
        </Avatar>
      ),
    })),
  },
  {
    id: "stage",
    label: "Stage",
    type: "enum",
    all: "All stages",
    read: (row) => row.stage,
    options: STAGES.map((name) => ({
      value: name,
      text: name,
      label: <Badge variant="secondary">{name}</Badge>,
      count: PROSPECTS.filter((row) => row.stage === name).length,
    })),
  },
]

const PROSPECT_SORTS: SortField<Prospect>[] = [
  { value: "name", label: "Name", read: (row) => row.name, starts: "asc" },
  {
    value: "volume",
    label: "Annual Volume",
    read: (row) => row.volume,
    starts: "desc",
  },
  {
    value: "updated",
    label: "Last Updated",
    read: (row) => row.updated,
    starts: "desc",
  },
]

function ProspectsList({
  initial = [],
  initialQuery = "",
}: {
  initial?: FilterRule[]
  initialQuery?: string
}) {
  const [query, setQuery] = useState(initialQuery)
  const [rules, setRules] = useState(initial)
  const [sort, setSort] = useState(UNSORTED)
  const rows = useMemo(
    () =>
      sortRows(
        filterRows(
          PROSPECTS.filter((row) =>
            row.name.toLowerCase().includes(query.trim().toLowerCase())
          ),
          PROSPECT_FIELDS,
          rules
        ),
        PROSPECT_SORTS,
        sort
      ),
    [query, rules, sort]
  )
  return (
    <div className="flex flex-col gap-5">
      <ListToolbar
        search={{
          placeholder: "Search prospects",
          value: query,
          onChange: setQuery,
        }}
        filters={{
          fields: PROSPECT_FIELDS,
          value: rules,
          onChange: setRules,
          form: "dropdowns",
        }}
        shown={rows.length}
        total={PROSPECTS.length}
        noun={["prospect", "prospects"]}
        sort={{ fields: PROSPECT_SORTS, value: sort, onChange: setSort }}
      />
      {rows.length === 0 ? (
        <NoResults
          className="surface"
          onClear={() => {
            setQuery("")
            setRules([])
          }}
        />
      ) : (
        <div className="overflow-clip surface">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-4">Prospect</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead className="text-right">Annual Volume</TableHead>
                <TableHead className="pr-4">Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id} className="cursor-pointer">
                  <TableCell className="pl-4">
                    <span className="flex items-center gap-2">
                      <Avatar size="sm" shape="square" aria-hidden>
                        <AvatarFallback>{initials(row.name)}</AvatarFallback>
                      </Avatar>
                      {row.name}
                    </span>
                  </TableCell>
                  <TableCell>{row.owner}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{row.stage}</Badge>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {row.volume === null ? <EmptyValue /> : money(row.volume)}
                  </TableCell>
                  <TableCell className="pr-4 tabular-nums">
                    {formatDate(row.updated)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

/** Dropdowns, for a list with only a few filters: each is a select on the row, its choices counted. */
export const Dropdowns: Story = {
  render: () => <ProspectsList />,
}

/** Dropdowns on. At phone width they're chips under the search that clear on a tap, and the button counts them. */
export const DropdownsOn: Story = {
  render: () => (
    <ProspectsList
      initial={[
        { field: "product", operator: "is", values: ["CardTrack"] },
        { field: "stage", operator: "is", values: ["Negotiation"] },
      ]}
    />
  ),
}

/** Nothing matches: `NoResults`, with Clear Filters back to the whole list. */
export const NoMatch: Story = {
  render: () => <ProspectsList initialQuery="Acme" />,
}

type Request = {
  id: number
  merchant: string
  mine: boolean
  requested: string
}

const REQUESTS: Request[] = [
  {
    id: 1041,
    merchant: "Northwind Payments",
    mine: true,
    requested: "2026-11-03",
  },
  {
    id: 1042,
    merchant: "Blue Harbor Bank",
    mine: false,
    requested: "2026-11-09",
  },
  { id: 1043, merchant: "Pioneer Trust", mine: true, requested: "2026-11-17" },
  {
    id: 1044,
    merchant: "Summit Federal",
    mine: false,
    requested: "2026-11-20",
  },
]

const REQUEST_FIELDS: FilterField<Request>[] = [
  {
    id: "mine",
    label: "Assigned to Me",
    type: "boolean",
    read: (row) => row.mine,
  },
  {
    id: "requested",
    label: "Requested",
    type: "day",
    read: (row) => row.requested,
  },
]

/** A switch and a span of days as dropdowns: the Requests list. */
export const SwitchAndDates: Story = {
  render: function Render() {
    const [query, setQuery] = useState("")
    const [rules, setRules] = useState<FilterRule[]>([
      { field: "requested", operator: "between", values: ["2026-11-01", ""] },
    ])
    const rows = filterRows(
      REQUESTS.filter((row) =>
        row.merchant.toLowerCase().includes(query.toLowerCase())
      ),
      REQUEST_FIELDS,
      rules
    )
    return (
      <ListToolbar
        search={{
          placeholder: "Search requests",
          value: query,
          onChange: setQuery,
        }}
        filters={{
          fields: REQUEST_FIELDS,
          value: rules,
          onChange: setRules,
          form: "dropdowns",
        }}
        shown={rows.length}
        total={REQUESTS.length}
        noun={["request", "requests"]}
      />
    )
  },
}

/** A board's toolbar: the Board and Table switch first, in `start`. */
export const WithLayoutSwitch: Story = {
  render: function Render() {
    const [layout, setLayout] = useState("board")
    const [query, setQuery] = useState("")
    return (
      <ListToolbar
        start={
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
        shown={24}
        total={24}
      />
    )
  },
}

/** The list itself is empty, not filtered: an `EmptyState`, and no toolbar, since there is nothing to search. */
export const EmptyList: Story = {
  render: () => (
    <EmptyState icon={Building2Icon} title="No Prospects" className="surface" />
  ),
}
