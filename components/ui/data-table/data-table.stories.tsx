import type { Meta, StoryObj } from "@storybook/react-vite"
import { Download, MoreHorizontal } from "lucide-react"
import { Badge } from "../badge/badge"
import { Button } from "../button/button"
import { Checkbox } from "../checkbox/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu/dropdown-menu"
import {
  DataTable,
  DataTableColumnHeader,
  DataTableContent,
  DataTableFilter,
  DataTablePagination,
  DataTableViewOptions,
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
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "merchant",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Merchant" />
    ),
  },
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
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "volume",
    header: ({ column }) => (
      <div className="text-right">
        <DataTableColumnHeader column={column} title="Volume" />
      </div>
    ),
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
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-xs">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(row.original.email)}
          >
            Copy email
          </DropdownMenuItem>
          <DropdownMenuItem>View merchant</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

function CustomLayoutExample() {
  const table = useDataTable({ columns, data: merchants })
  const selected = table.getFilteredSelectedRowModel().rows.length

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 py-4">
        <DataTableViewOptions table={table} />
        <Button variant="outline" disabled={!selected}>
          <Download data-icon="inline-start" />
          Export {selected || ""}
        </Button>
        <DataTableFilter
          table={table}
          column="email"
          placeholder="Filter emails..."
          className="ml-auto"
        />
      </div>
      <DataTableContent table={table} />
      <DataTablePagination table={table} />
    </div>
  )
}

const meta: Meta<typeof DataTable<Merchant>> = {
  title: "UI/DataTable",
  component: DataTable,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Import from `aperia-ds5/data-table`. Pass `columns` and `data`; sorting, filtering, pagination, row selection and column visibility are built in. For a different layout, see Build your own. [View in Figma](https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18719-212930)",
      },
    },
  },
  args: {
    columns,
    data: merchants,
    filterColumn: "merchant",
    filterPlaceholder: "Filter merchants...",
  },
  argTypes: {
    columns: {
      control: false,
      description:
        "TanStack column definitions: which fields show, how cells render, and which columns sort or hide.",
    },
    data: {
      control: "object",
      description: "The rows. Edit the JSON to change what the table shows.",
    },
    filterColumn: {
      control: "select",
      options: ["none", "merchant", "status", "email"],
      mapping: { none: undefined },
      description:
        "Column id the search input filters on. Omit to hide the input.",
    },
    filterPlaceholder: { control: "text" },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const ManyRows: Story = { args: { data: manyMerchants } }

export const FilterByEmail: Story = {
  args: { filterColumn: "email", filterPlaceholder: "Filter emails..." },
}

export const PlainColumns: Story = {
  args: {
    columns: [
      { accessorKey: "merchant", header: "Merchant" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "volume", header: "Volume" },
    ],
  },
}

export const WithoutFilter: Story = { args: { filterColumn: undefined } }

export const Empty: Story = { args: { data: [] } }

export const CustomLayout: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Built from the parts with useDataTable: the Columns menu and an Export button that reads the selection sit on the left, the filter on the right.",
      },
    },
  },
  render: () => <CustomLayoutExample />,
}
