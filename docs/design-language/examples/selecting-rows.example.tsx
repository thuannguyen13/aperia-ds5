import { useState, type ReactNode } from "react"
import { DownloadIcon, PlusIcon } from "lucide-react"
import {
  Badge,
  Button,
  Checkbox,
  ConfirmDialog,
  ListPager,
  ListToolbar,
  PageHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "aperia-ds5"
import {
  DataTableContent,
  DataTablePagination,
  useDataTable,
  type ColumnDef,
  type DataTableFeatures,
} from "@/components/ui/data-table"
import { money, plural } from "@/lib/format"
import { DoDont } from "../blocks"
import { SelectionBar } from "../recipes"
import { Screen } from "./before-after"

// Selecting rows on a list of merchants: the checkbox column from the data table's parts, the selection bar in the
// toolbar's place, and Delete Selected asking first with the count.

type Merchant = { id: string; name: string; stage: string; volume: number }

const MERCHANTS: Merchant[] = [
  { id: "m1", name: "Harbor Coffee", stage: "Active", volume: 482_150 },
  {
    id: "m2",
    name: "Northside Hardware",
    stage: "Onboarding",
    volume: 129_400,
  },
  { id: "m3", name: "Lumen Pharmacy", stage: "Active", volume: 903_220 },
  { id: "m4", name: "Parkway Auto", stage: "Closed", volume: 58_710 },
  { id: "m5", name: "Blue Fern Florist", stage: "Active", volume: 76_300 },
  { id: "m6", name: "Summit Outfitters", stage: "Onboarding", volume: 344_980 },
]

const NOUN = ["merchant", "merchants"] as const

// The table's first and last cells on the page's 16px line, as on Tables.
const EDGES = "[&_tr>*:first-child]:pl-4 [&_tr>*:last-child]:pr-4"

const columns: ColumnDef<DataTableFeatures, Merchant>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        aria-label="Select All on This Page"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label={`Select ${row.original.name}`}
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  { accessorKey: "name", header: "Merchant" },
  {
    accessorKey: "stage",
    header: "Stage",
    cell: ({ row }) => <Badge variant="outline">{row.original.stage}</Badge>,
  },
  {
    accessorKey: "volume",
    header: () => <div className="text-right">Monthly Volume</div>,
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        {money(row.original.volume)}
      </div>
    ),
  },
]

/** The list: search and Export in the toolbar, the bar in its place while rows are ticked, Delete Selected asking first. */
function MerchantList() {
  const [data, setData] = useState(MERCHANTS)
  const [query, setQuery] = useState("")
  const [confirming, setConfirming] = useState(false)
  const table = useDataTable({ columns, data })
  const selected = table.getSelectedRowModel().rows
  const count = selected.length
  const named = plural(count, ...NOUN)
  const title = named.replace(/^\d+ \w/, (m) => m.toUpperCase())

  return (
    <>
      <PageHeader title="Merchants" />
      {count > 0 ? (
        <SelectionBar
          count={count}
          label="Selected merchants"
          onClear={() => table.resetRowSelection()}
        >
          <Button variant="outline">
            <DownloadIcon data-icon="inline-start" />
            Export Selected
          </Button>
          <Button variant="destructive" onClick={() => setConfirming(true)}>
            Delete Selected
          </Button>
        </SelectionBar>
      ) : (
        <ListToolbar
          search={{
            placeholder: "Search merchants",
            value: query,
            onChange: (value) => {
              setQuery(value)
              table.getColumn("name")?.setFilterValue(value)
              table.resetRowSelection()
            },
          }}
          actions={
            <>
              <Button variant="outline">
                <DownloadIcon data-icon="inline-start" />
                Export
              </Button>
              <Button>
                <PlusIcon data-icon="inline-start" />
                Add Merchant
              </Button>
            </>
          }
        />
      )}
      <div className="overflow-x-auto surface">
        <DataTableContent table={table} className={EDGES} />
      </div>
      <DataTablePagination table={table} noun={NOUN} className="py-0" />
      <ConfirmDialog
        open={confirming}
        onOpenChange={setConfirming}
        title={`Delete ${title}?`}
        action={`Delete ${title}`}
        onConfirm={() => {
          const gone = new Set(selected.map((row) => row.original.id))
          table.resetRowSelection()
          setData((rows) => rows.filter((row) => !gone.has(row.id)))
          setConfirming(false)
        }}
      >
        This permanently deletes the {named.replace(/^(\d+) /, "$1 selected ")}.
      </ConfirmDialog>
    </>
  )
}

// ─── Do / Don't ───────────────────────────────────────────────────────────

/** A few rows of the list, with the ticked ones in the Selected state. `all` overrides Select all's look. */
function Rows({
  ticked,
  rows = MERCHANTS.slice(0, 4),
  all,
}: {
  ticked: string[]
  rows?: Merchant[]
  all?: boolean | "indeterminate"
}) {
  const header =
    all ??
    (ticked.length === rows.length
      ? true
      : ticked.length > 0
        ? "indeterminate"
        : false)
  return (
    <div className="overflow-x-auto surface">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-0 pl-4">
              <Checkbox aria-label="Select All on This Page" checked={header} />
            </TableHead>
            <TableHead>Merchant</TableHead>
            <TableHead className="pr-4 text-right">Monthly Volume</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => {
            const on = ticked.includes(row.id)
            return (
              <TableRow key={row.id} data-state={on ? "selected" : undefined}>
                <TableCell className="pl-4">
                  <Checkbox aria-label={`Select ${row.name}`} checked={on} />
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell className="pr-4 text-right tabular-nums">
                  {money(row.volume)}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

function Bar({ count }: { count: number }) {
  return (
    <SelectionBar count={count} label="Selected merchants" onClear={() => {}}>
      <Button variant="outline">
        <DownloadIcon data-icon="inline-start" />
        Export Selected
      </Button>
      <Button variant="destructive">Delete Selected</Button>
    </SelectionBar>
  )
}

function Toolbar({
  query = "",
  children,
}: {
  query?: string
  children?: ReactNode
}) {
  return (
    <ListToolbar
      search={{
        placeholder: "Search merchants",
        value: query,
        onChange: () => {},
      }}
      actions={children}
    />
  )
}

function Stack({ children }: { children: ReactNode }) {
  return <div className="flex w-full flex-col gap-5">{children}</div>
}

export const selectingRowsExamples = {
  "@intro": (
    <Screen caption="Tick a row: the selection bar takes the toolbar's place. Delete Selected asks first, with the count. Search while nothing is ticked: a new search clears the selection.">
      <MerchantList />
    </Screen>
  ),
  "Add checkboxes only for an action on several rows": (
    <DoDont
      stack
      good={
        <Stack>
          <Bar count={1} />
          <Rows ticked={["m1"]} />
        </Stack>
      }
      bad={
        <Stack>
          <Toolbar>
            <Button>
              <PlusIcon data-icon="inline-start" />
              Add Merchant
            </Button>
          </Toolbar>
          <Rows ticked={["m1"]} />
        </Stack>
      }
      goodNote="a ticked row brings up the actions it is for"
      badNote="a ticked row on a list with nothing to do with it"
    />
  ),
  "Name the count in the selection bar": (
    <DoDont
      stack
      good={
        <Stack>
          <Bar count={2} />
          <Rows ticked={["m1", "m3"]} />
        </Stack>
      }
      bad={
        <Stack>
          <Toolbar>
            <Button variant="outline">Export</Button>
            <Button variant="destructive">Delete</Button>
          </Toolbar>
          <Rows ticked={["m1", "m3"]} />
        </Stack>
      }
      badNote="the actions in the toolbar, with nothing that says how many rows they act on"
    />
  ),
  "Select the rows on the page shown": (
    <DoDont
      stack
      good={
        <Stack>
          <Bar count={4} />
          <Rows ticked={["m1", "m2", "m3", "m4"]} />
          <ListPager
            page={1}
            pageSize={4}
            total={57}
            noun={NOUN}
            onPageChange={() => {}}
          />
        </Stack>
      }
      bad={
        <Stack>
          <Bar count={57} />
          <Rows ticked={["m1", "m2", "m3", "m4"]} />
          <ListPager
            page={1}
            pageSize={4}
            total={57}
            noun={NOUN}
            onPageChange={() => {}}
          />
        </Stack>
      }
      goodNote="Select all ticks the 4 rows in view"
      badNote="one tick selects all 57, most of them on pages no one has opened"
    />
  ),
  "Clear the selection when the search or filters change": (
    <DoDont
      stack
      good={
        <Stack>
          <Toolbar query="harbor" />
          <Rows ticked={[]} rows={MERCHANTS.slice(0, 1)} />
        </Stack>
      }
      bad={
        <Stack>
          <Bar count={3} />
          <Rows ticked={["m1"]} rows={MERCHANTS.slice(0, 1)} />
        </Stack>
      }
      goodNote="the search for harbor cleared the selection"
      badNote="3 selected, but only 1 row is in view after the search"
    />
  ),
}
