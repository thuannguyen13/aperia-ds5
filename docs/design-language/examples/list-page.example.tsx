import { useState } from "react"
import {
  ArrowUpDownIcon,
  Building2Icon,
  CalendarIcon,
  ChevronDownIcon,
  FilterIcon,
  InfoIcon,
  SearchIcon,
} from "lucide-react"
import {
  Badge,
  Button,
  EmptyState,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  ListToolbar,
  NoResults,
  PageHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  ToggleGroup,
  ToggleGroupItem,
  UNSORTED,
  filterRows,
  opensOnClick,
  sortRows,
  type FilterField,
  type FilterRule,
  type SortField,
} from "aperia-ds5"
import { ListSkeleton, MoneyValue } from "../recipes"
import { BeforeAfter, Screen } from "./before-after"

type Prospect = {
  id: number
  name: string
  owner: string
  stage: string
  volume: number
}

const PROSPECTS: Prospect[] = [
  {
    id: 101,
    name: "Northwind Payments",
    owner: "Dana Whitfield",
    stage: "Proposal",
    volume: 4_200_000,
  },
  {
    id: 102,
    name: "Blue Harbor Bank",
    owner: "Sam Ortega",
    stage: "Discovery",
    volume: 1_800_000,
  },
  {
    id: 103,
    name: "Cedar Credit Union",
    owner: "Dana Whitfield",
    stage: "Demo",
    volume: 6_500_000,
  },
  {
    id: 104,
    name: "Lumen Card Services",
    owner: "Priya Nair",
    stage: "Qualification",
    volume: 950_000,
  },
  {
    id: 105,
    name: "Pioneer Trust",
    owner: "Marcus Lee",
    stage: "Demo",
    volume: 2_300_000,
  },
  {
    id: 106,
    name: "Summit Federal",
    owner: "Sam Ortega",
    stage: "Proposal",
    volume: 3_100_000,
  },
]

const STAGES = ["Discovery", "Qualification", "Demo", "Proposal"]
const OWNERS = ["Dana Whitfield", "Marcus Lee", "Priya Nair", "Sam Ortega"]

const FIELDS: FilterField<Prospect>[] = [
  {
    id: "stage",
    label: "Stage",
    type: "enum",
    options: STAGES.map((stage) => ({ value: stage, text: stage })),
    read: (row) => row.stage,
  },
  {
    id: "owner",
    label: "Owner",
    type: "enum",
    options: OWNERS.map((owner) => ({ value: owner, text: owner })),
    read: (row) => row.owner,
  },
  {
    id: "volume",
    label: "Monthly Volume",
    type: "money",
    read: (row) => row.volume,
  },
]

const SORTS: SortField<Prospect>[] = [
  { value: "name", label: "Name", read: (row) => row.name },
  {
    value: "volume",
    label: "Monthly Volume",
    read: (row) => row.volume,
    starts: "desc",
  },
]

type State = "list" | "none" | "empty" | "loading"

function ProspectsTable({ rows }: { rows: Prospect[] }) {
  return (
    <div className="overflow-x-auto surface">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-4">Name</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Stage</TableHead>
            <TableHead className="pr-4 text-right">Monthly Volume</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              {...opensOnClick(`Open ${row.name}`, () => {})}
            >
              <TableCell className="pl-4 font-medium">{row.name}</TableCell>
              <TableCell>{row.owner}</TableCell>
              <TableCell>
                <Badge variant="outline">{row.stage}</Badge>
              </TableCell>
              <TableCell className="pr-4 text-right">
                <MoneyValue value={row.volume} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

/** The Prospects page: header, toolbar with chips and Sort, the table, and its no-match, empty and loading states. */
export function ListPageExample() {
  const [state, setState] = useState<State>("list")
  const [query, setQuery] = useState("")
  const [rules, setRules] = useState<FilterRule[]>([
    { field: "stage", operator: "is", values: ["Demo", "Proposal"] },
  ])
  const [sort, setSort] = useState(UNSORTED)
  const searched = PROSPECTS.filter((row) =>
    row.name.toLowerCase().includes(query.toLowerCase())
  )
  const rows =
    state === "none"
      ? []
      : sortRows(filterRows(searched, FIELDS, rules), SORTS, sort)

  const header = (
    <PageHeader
      title="Prospects"
      subtitle="Companies you are working to sign."
      actions={<Button>Add Prospect</Button>}
    />
  )

  return (
    <Screen
      controls={
        <>
          <span>Show</span>
          <ToggleGroup
            type="single"
            variant="outline"
            size="sm"
            aria-label="State to show"
            value={state}
            onValueChange={(next) => next && setState(next as State)}
          >
            <ToggleGroupItem value="list">List</ToggleGroupItem>
            <ToggleGroupItem value="none">No Match</ToggleGroupItem>
            <ToggleGroupItem value="empty">Empty</ToggleGroupItem>
            <ToggleGroupItem value="loading">Loading</ToggleGroupItem>
          </ToggleGroup>
        </>
      }
      caption="Add or change a filter, sort, or search. Click a row: the whole row opens the prospect."
    >
      {state === "loading" ? (
        <ListSkeleton
          title={120}
          actions={1}
          filters={1}
          sort
          columns={[2, 1.5, 1, 1]}
          rows={6}
          rowHeight={37}
        />
      ) : state === "empty" ? (
        <>
          {header}
          <EmptyState
            icon={Building2Icon}
            title="No Prospects"
            className="surface"
          />
        </>
      ) : (
        <>
          {header}
          <ListToolbar
            search={{
              placeholder: "Search prospects",
              value: query,
              onChange: setQuery,
            }}
            filters={{ fields: FIELDS, value: rules, onChange: setRules }}
            shown={rows.length}
            total={PROSPECTS.length}
            noun={["prospect", "prospects"]}
            sort={{ fields: SORTS, value: sort, onChange: setSort }}
          />
          {rows.length === 0 ? (
            <NoResults
              className="surface"
              onClear={() => {
                setQuery("")
                setRules([])
                setState("list")
              }}
            />
          ) : (
            <ProspectsTable rows={rows} />
          )}
        </>
      )}
    </Screen>
  )
}

const MERCHANTS = [
  { mid: "492001837716", name: "Harbor Lane Bistro LLC", score: 748 },
  { mid: "492001902245", name: "Apex Digital Goods Inc", score: 911 },
]

/** Titan's hand-built toolbar and linked names, against ListToolbar and rows that open. */
export function ListPageBeforeAfter() {
  return (
    <BeforeAfter
      beforeNote="a toolbar built by hand; blue names, a Details button on each row, headings that sort"
      afterNote="the library’s toolbar, Sort at its end; plain names, and the row opens the merchant"
      before={
        <>
          <div className="flex flex-wrap items-center gap-2">
            <span>Report Date:</span>
            <Button variant="outline" className="font-normal">
              10/28/2026
              <CalendarIcon data-icon="inline-end" />
            </Button>
            <Button variant="link" className="px-1">
              Edit View
            </Button>
            <Button variant="outline" className="ml-auto">
              <FilterIcon data-icon="inline-start" />
              Filter
            </Button>
            <InputGroup className="w-44">
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
              <InputGroupInput aria-label="Search" placeholder="Search MID" />
            </InputGroup>
          </div>
          <div className="overflow-x-auto surface">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-4">
                    MID <ArrowUpDownIcon className="inline size-3.5" />
                  </TableHead>
                  <TableHead>
                    Merchant Name{" "}
                    <ArrowUpDownIcon className="inline size-3.5" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MERCHANTS.map((row) => (
                  <TableRow key={row.mid}>
                    <TableCell className="pl-4 tabular-nums">
                      {row.mid}
                    </TableCell>
                    <TableCell className="pr-4">
                      <span className="flex flex-wrap items-center gap-2">
                        <a href="#" className="text-primary">
                          {row.name}
                        </a>
                        <Badge variant="outline">
                          <InfoIcon />
                          DQ Details
                        </Badge>
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      }
      after={
        <>
          <ListToolbar
            start={
              <>
                <Button variant="outline" className="font-normal">
                  <CalendarIcon data-icon="inline-start" />
                  <span className="text-muted-foreground max-sm:sr-only">
                    Report Date
                  </span>
                  <span className="tabular-nums">10/28/2026</span>
                </Button>
                <Button variant="outline" className="font-normal">
                  <span className="text-muted-foreground">View</span>
                  My Queue
                  <ChevronDownIcon
                    data-icon="inline-end"
                    className="text-muted-foreground"
                  />
                </Button>
              </>
            }
            search={{
              placeholder: "Search MID or merchant name",
              value: "",
              onChange: () => {},
            }}
            shown={2}
            total={2}
            noun={["merchant", "merchants"]}
          />
          <div className="overflow-x-auto surface">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-4">MID</TableHead>
                  <TableHead className="pr-4">Merchant Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MERCHANTS.map((row) => (
                  <TableRow
                    key={row.mid}
                    {...opensOnClick(`Open ${row.name}`, () => {})}
                  >
                    <TableCell className="pl-4 tabular-nums">
                      {row.mid}
                    </TableCell>
                    <TableCell className="pr-4">{row.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      }
    />
  )
}

export const listPageExamples = {
  "How it looks and behaves": <ListPageExample />,
  "Before and after": <ListPageBeforeAfter />,
}
