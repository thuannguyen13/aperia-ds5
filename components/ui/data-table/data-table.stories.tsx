import type { Meta, StoryObj } from "@storybook/react-vite"
import { Download, MoreHorizontal, Plus } from "lucide-react"
import { Badge } from "../badge/badge"
import { Button } from "../button/button"
import { Checkbox } from "../checkbox/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu/dropdown-menu"
import type { FilterField } from "../list-toolbar/filters"
import type { SortOption } from "../sort-control/sort"
import {
  DataTable,
  DataTableContent,
  DataTablePagination,
  DataTableToolbar,
  useDataTable,
  type ColumnDef,
  type DataTableFeatures,
} from "."

type Merchant = {
  id: string
  merchant: string
  status: "active" | "review" | "closed"
  email: string
  volume: number
}

const merchants: Merchant[] = [
  {
    id: "m1",
    merchant: "Harbor Coffee",
    status: "active",
    email: "ops@harborcoffee.com",
    volume: 482150,
  },
  {
    id: "m2",
    merchant: "Northside Hardware",
    status: "review",
    email: "billing@northsidehw.com",
    volume: 129400,
  },
  {
    id: "m3",
    merchant: "Lumen Pharmacy",
    status: "active",
    email: "finance@lumenrx.com",
    volume: 903220,
  },
  {
    id: "m4",
    merchant: "Parkway Auto",
    status: "closed",
    email: "owner@parkwayauto.com",
    volume: 58710,
  },
  {
    id: "m5",
    merchant: "Blue Fern Florist",
    status: "active",
    email: "hello@bluefern.com",
    volume: 76300,
  },
  {
    id: "m6",
    merchant: "Summit Outfitters",
    status: "active",
    email: "accounts@summitout.com",
    volume: 344980,
  },
  {
    id: "m7",
    merchant: "Cedar Street Deli",
    status: "review",
    email: "cedar.deli@gmail.com",
    volume: 41250,
  },
  {
    id: "m8",
    merchant: "Orbit Electronics",
    status: "active",
    email: "ar@orbitelec.com",
    volume: 1208400,
  },
  {
    id: "m9",
    merchant: "Maple Dental Group",
    status: "active",
    email: "office@mapledental.com",
    volume: 265100,
  },
  {
    id: "m10",
    merchant: "Tidewater Books",
    status: "closed",
    email: "shop@tidewaterbooks.com",
    volume: 19870,
  },
  {
    id: "m11",
    merchant: "Granite Fitness",
    status: "active",
    email: "front@granitefit.com",
    volume: 158320,
  },
  {
    id: "m12",
    merchant: "Copper Kettle Bakery",
    status: "review",
    email: "orders@copperkettle.com",
    volume: 63440,
  },
]

const statusVariant = {
  active: "secondary",
  review: "outline",
  closed: "destructive",
} as const

// 57 rows, so Previous and Next have six pages to move through
const manyMerchants: Merchant[] = Array.from({ length: 57 }, (_, i) => {
  const base = merchants[i % merchants.length]
  return {
    ...base,
    id: `m${i + 1}`,
    merchant: `${base.merchant} #${Math.floor(i / merchants.length) + 1}`,
    volume: Math.round(base.volume * (0.6 + ((i * 37) % 80) / 100)),
  }
})

const columns: ColumnDef<DataTableFeatures, Merchant>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableHiding: false,
  },
  { accessorKey: "merchant", header: "Merchant" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue<Merchant["status"]>("status")
      return (
        <Badge variant={statusVariant[status]} className="capitalize">
          {status}
        </Badge>
      )
    },
  },
  { accessorKey: "email", header: "Email" },
  {
    accessorKey: "volume",
    header: () => <div className="text-right">Volume</div>,
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(row.getValue("volume"))}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    enableGlobalFilter: false,
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-sm" aria-label="More actions">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(row.original.email)}
          >
            Copy Email
          </DropdownMenuItem>
          <DropdownMenuItem>View Merchant</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

// What the list filters by: each field's id is a column's id.
const filterFields: FilterField[] = [
  {
    id: "status",
    label: "Status",
    type: "enum",
    all: "All statuses",
    options: [
      { value: "active", text: "Active" },
      { value: "review", text: "Review" },
      { value: "closed", text: "Closed" },
    ],
  },
  { id: "volume", label: "Volume", type: "money" },
]

// What the list sorts by: each value is a column's id.
const sortFields: SortOption[] = [
  { value: "merchant", label: "Merchant" },
  { value: "volume", label: "Volume", starts: "desc" },
]

const NOUN = ["merchant", "merchants"] as const

function BuildYourOwnExample() {
  const table = useDataTable({ columns, data: merchants })
  const selected = table.getFilteredSelectedRowModel().rows.length

  return (
    <div className="w-full">
      <DataTableToolbar
        table={table}
        search={{ placeholder: "Search merchants" }}
        filters={{ fields: filterFields }}
        sort={sortFields}
        noun={NOUN}
        actions={
          <Button variant="outline" disabled={!selected}>
            <Download data-icon="inline-start" />
            Export {selected || ""}
          </Button>
        }
      />
      <DataTableContent table={table} />
      <DataTablePagination table={table} noun={NOUN} />
    </div>
  )
}

const meta: Meta<typeof DataTable<Merchant>> = {
  title: "Components/Lists and Tables/Data Table",
  component: DataTable,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Import from `aperia-ds5/data-table`. A data table is a list: the same toolbar (`ListToolbar`, with the search, the filters, the Columns menu in its slot, Sort, and the list's actions), the table, and the count and pages under it (`ListPager`). Pass `columns` and `data`, then `search`, `filters` (each field's `id` a column's id), `sort` (each `value` a column's id) and `actions`. Column headings are plain text: the list sorts from Sort, not from its headings. For a different layout, see Build your own. [View in Figma](https://www.figma.com/design/uXivJU4N3R0LWu0mbimHWt/Aperia-Shadcn-Library--Enhanced-?node-id=18719-212930)",
      },
    },
  },
  args: {
    columns,
    data: merchants,
    noun: NOUN,
    search: { placeholder: "Search merchants" },
    filters: { fields: filterFields },
    sort: sortFields,
    columnsMenu: true,
  },
  argTypes: {
    columns: {
      control: false,
      description:
        "TanStack column definitions: which fields show, how cells render, and which columns hide.",
    },
    data: {
      control: "object",
      description: "The rows. Edit the JSON to change what the table shows.",
    },
    search: {
      control: "object",
      description:
        "The list's search: `placeholder`, and `column` to look in one column only. Left out, no search.",
    },
    filters: {
      control: false,
      description:
        "What the list filters by (`FilterField`, each `id` a column's id) and `form`: `advanced` or `simple`.",
    },
    sort: {
      control: false,
      description:
        "What the list sorts by (`SortOption`, each `value` a column's id), in one Sort button.",
    },
    actions: { control: false },
    columnsMenu: { control: "boolean" },
    filterColumn: { table: { disable: true } },
    filterPlaceholder: { table: { disable: true } },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const ManyRows: Story = { args: { data: manyMerchants } }

/** Simple filters: each field is a fixed control on the toolbar, for a list with four filters or fewer. */
export const SimpleFilters: Story = {
  args: { filters: { fields: filterFields, form: "simple" } },
}

/** The list's own buttons sit at the right end of the toolbar, the primary last. */
export const WithActions: Story = {
  args: {
    actions: (
      <>
        <Button variant="outline">
          <Download data-icon="inline-start" />
          Export
        </Button>
        <Button>
          <Plus data-icon="inline-start" />
          Add Merchant
        </Button>
      </>
    ),
  },
}

/** A search that looks in one column only. */
export const SearchOneColumn: Story = {
  args: { search: { placeholder: "Search emails", column: "email" } },
}

export const PlainColumns: Story = {
  args: {
    columns: [
      { accessorKey: "merchant", header: "Merchant" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "volume", header: "Volume" },
    ],
    filters: undefined,
    sort: undefined,
    columnsMenu: false,
  },
}

export const Empty: Story = { args: { data: [] } }

export const BuildYourOwn: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Built from the parts with `useDataTable`: `DataTableToolbar` with an Export button that reads the selection, `DataTableContent`, and `DataTablePagination`.",
      },
    },
  },
  render: () => <BuildYourOwnExample />,
}
