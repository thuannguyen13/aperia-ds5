import { useState, useTransition, type ReactNode } from "react"
import { toast } from "sonner"
import { DownloadIcon, PlusIcon } from "lucide-react"
import {
  Badge,
  Button,
  Checkbox,
  ConfirmDialog,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FormSheet,
  ListPager,
  ListToolbar,
  PageHeader,
  ReasonTooltip,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SheetForm,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Toaster,
  useSheetForm,
  type FormSchema,
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

// Selecting rows on a list of merchants: the checkbox column from the data table's parts, the selection bar at the
// toolbar's right end in the place of the list's actions (the search stays beside it), Edit Selected setting one field
// on every selected row, and Delete Selected asking first with the count, or saying why it cannot.

type Merchant = {
  id: string
  name: string
  stage: string
  owner: string
  volume: number
  /** A merchant other records use, which cannot be deleted. */
  inUse?: boolean
}

const MERCHANTS: Merchant[] = [
  {
    id: "m1",
    name: "Harbor Coffee",
    stage: "Active",
    owner: "Dana Whitfield",
    volume: 482_150,
  },
  {
    id: "m2",
    name: "Northside Hardware",
    stage: "Onboarding",
    owner: "Marcus Lee",
    volume: 129_400,
  },
  {
    id: "m3",
    name: "Lumen Pharmacy",
    stage: "Active",
    owner: "Dana Whitfield",
    volume: 903_220,
    inUse: true,
  },
  {
    id: "m4",
    name: "Parkway Auto",
    stage: "Closed",
    owner: "Priya Shah",
    volume: 58_710,
  },
  {
    id: "m5",
    name: "Blue Fern Florist",
    stage: "Active",
    owner: "Marcus Lee",
    volume: 76_300,
  },
  {
    id: "m6",
    name: "Summit Outfitters",
    stage: "Onboarding",
    owner: "Priya Shah",
    volume: 344_980,
    inUse: true,
  },
]

const NOUN = ["merchant", "merchants"] as const

/** The fields Edit Selected can set on many merchants at once, each with its choices. */
const BULK_FIELDS = {
  stage: {
    label: "Stage",
    choices: ["Onboarding", "Active", "Closed"],
    missing: "Pick a stage.",
  },
  owner: {
    label: "Owner",
    choices: ["Dana Whitfield", "Marcus Lee", "Priya Shah"],
    missing: "Pick an owner.",
  },
} as const
type BulkField = keyof typeof BULK_FIELDS
type BulkDraft = { field: BulkField; value: string }

const bulkSchema: FormSchema<BulkDraft> = {
  safeParse(input) {
    const draft = input as BulkDraft
    return draft.value
      ? { success: true, data: draft }
      : {
          success: false,
          error: {
            issues: [
              { path: ["value"], message: BULK_FIELDS[draft.field].missing },
            ],
          },
        }
  },
}

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
  {
    accessorKey: "name",
    header: "Merchant",
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  },
  {
    accessorKey: "stage",
    header: "Stage",
    cell: ({ row }) => <Badge variant="outline">{row.original.stage}</Badge>,
  },
  { accessorKey: "owner", header: "Owner" },
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

/** "3 merchants" as a title: "3 Merchants". */
const titled = (count: number) =>
  plural(count, ...NOUN).replace(/^\d+ \w/, (m) => m.toUpperCase())

/** The sheet Edit Selected opens: which field, then its new value. */
function BulkEditForm({ onSave }: { onSave: (draft: BulkDraft) => void }) {
  const form = useSheetForm<BulkDraft>({ field: "stage", value: "" })
  const [pending, startTransition] = useTransition()
  const field = BULK_FIELDS[form.draft.field]
  return (
    <SheetForm
      form={form}
      onSubmit={() => {
        const parsed = form.check(bulkSchema, form.draft)
        if (parsed) startTransition(() => onSave(parsed))
      }}
      pending={pending}
      submit="Save Changes"
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="bulk-field">Field</FieldLabel>
          <Select
            value={form.draft.field}
            onValueChange={(next) => {
              form.set("field", next as BulkField)
              form.set("value", "")
            }}
          >
            <SelectTrigger id="bulk-field" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {(Object.keys(BULK_FIELDS) as BulkField[]).map((key) => (
                <SelectItem key={key} value={key}>
                  {BULK_FIELDS[key].label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field data-invalid={Boolean(form.errors.value)}>
          <FieldLabel htmlFor="bulk-value">{field.label}</FieldLabel>
          <Select
            value={form.draft.value}
            onValueChange={(next) => form.set("value", next)}
          >
            <SelectTrigger
              id="bulk-value"
              className="w-full"
              aria-invalid={Boolean(form.errors.value)}
            >
              <SelectValue placeholder={field.choices[0]} />
            </SelectTrigger>
            <SelectContent>
              {field.choices.map((choice) => (
                <SelectItem key={choice} value={choice}>
                  {choice}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError>{form.errors.value}</FieldError>
        </Field>
      </FieldGroup>
    </SheetForm>
  )
}

/** The list's own actions, shown while nothing is selected. */
const listActions = (
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
)

/** The list: the search stays while rows are ticked, and the selection bar takes the list's actions' place. */
function MerchantList() {
  const [data, setData] = useState(MERCHANTS)
  const [query, setQuery] = useState("")
  const [editing, setEditing] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const table = useDataTable({ columns, data })
  const selected = table.getSelectedRowModel().rows
  const count = selected.length
  const blockedCount = selected.filter((row) => row.original.inUse).length
  const blocked =
    blockedCount > 0
      ? `${plural(blockedCount, "of the selected merchants is", "of the selected merchants are")} in use and cannot be deleted.`
      : null

  return (
    <>
      <PageHeader title="Merchants" />
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
          count > 0 ? (
            <SelectionBar
              count={count}
              label="Selected merchants"
              onClear={() => table.resetRowSelection()}
            >
              <Button variant="outline">
                <DownloadIcon data-icon="inline-start" />
                Export Selected
              </Button>
              <Button variant="outline" onClick={() => setEditing(true)}>
                Edit Selected
              </Button>
              <ReasonTooltip reason={blocked}>
                <Button
                  variant="destructive"
                  disabled={Boolean(blocked)}
                  onClick={() => setConfirming(true)}
                >
                  Delete Selected
                </Button>
              </ReasonTooltip>
            </SelectionBar>
          ) : (
            listActions
          )
        }
      />
      <div className="overflow-x-auto surface">
        <DataTableContent table={table} className={EDGES} />
      </div>
      <DataTablePagination table={table} noun={NOUN} className="py-0" />
      <FormSheet
        open={editing}
        onOpenChange={setEditing}
        title={`Edit ${titled(count)}`}
      >
        {editing && (
          <BulkEditForm
            onSave={({ field, value }) => {
              const ids = new Set(selected.map((row) => row.original.id))
              setData((rows) =>
                rows.map((row) =>
                  ids.has(row.id) ? { ...row, [field]: value } : row
                )
              )
              setEditing(false)
              toast(`${plural(count, ...NOUN)} updated.`)
            }}
          />
        )}
      </FormSheet>
      <ConfirmDialog
        open={confirming}
        onOpenChange={setConfirming}
        title={`Delete ${titled(count)}?`}
        action={`Delete ${titled(count)}`}
        onConfirm={() => {
          const gone = new Set(selected.map((row) => row.original.id))
          table.resetRowSelection()
          setData((rows) => rows.filter((row) => !gone.has(row.id)))
          setConfirming(false)
          toast(`${plural(gone.size, ...NOUN)} deleted.`)
        }}
      >
        This permanently deletes the{" "}
        {plural(count, ...NOUN).replace(/^(\d+) /, "$1 selected ")}.
      </ConfirmDialog>
      <Toaster />
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
                <TableCell className="font-medium">{row.name}</TableCell>
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

/** The list toolbar with its search; `selected` puts the selection bar in the place of `children`, the list's actions. */
function Toolbar({
  query = "",
  selected = 0,
  children,
}: {
  query?: string
  selected?: number
  children?: ReactNode
}) {
  return (
    <ListToolbar
      search={{
        placeholder: "Search merchants",
        value: query,
        onChange: () => {},
      }}
      actions={selected > 0 ? <Bar count={selected} /> : children}
    />
  )
}

function Stack({ children }: { children: ReactNode }) {
  return <div className="flex w-full flex-col gap-5">{children}</div>
}

export const selectingRowsExamples = {
  "@intro": (
    <Screen caption="Tick a row: the selection bar takes the place of Export and Add Merchant, and the search stays. Edit Selected sets one field on every ticked row. Tick Lumen Pharmacy or Summit Outfitters to see why Delete Selected cannot be used.">
      <MerchantList />
    </Screen>
  ),
  "Add checkboxes only for an action on several rows": (
    <DoDont
      stack
      good={
        <Stack>
          <Toolbar selected={1} />
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
          <Toolbar selected={2} />
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
  "Keep the search, filters, and Sort in reach": (
    <DoDont
      stack
      good={
        <Stack>
          <Toolbar selected={2} />
          <Rows ticked={["m1", "m3"]} />
        </Stack>
      }
      bad={
        <Stack>
          <Bar count={2} />
          <Rows ticked={["m1", "m3"]} />
        </Stack>
      }
      goodNote="the search stays beside the selection bar"
      badNote="the selection bar in the toolbar's place, so searching means clearing the selection first"
    />
  ),
  "Select the rows on the page shown": (
    <DoDont
      stack
      good={
        <Stack>
          <Toolbar selected={4} />
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
          <Toolbar selected={57} />
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
          <Toolbar query="harbor" selected={3} />
          <Rows ticked={["m1"]} rows={MERCHANTS.slice(0, 1)} />
        </Stack>
      }
      goodNote="the search for harbor cleared the selection"
      badNote="3 selected, but only 1 row is in view after the search"
    />
  ),
}
