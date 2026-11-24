import { useState, useTransition } from "react"
import { ChevronDownIcon, LockIcon, SearchIcon } from "lucide-react"
import {
  Badge,
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FormSheet,
  IN_USE_DELETE,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Label,
  ListToolbar,
  MoneyValue,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SheetDelete,
  SheetForm,
  SortableList,
  SortableRow,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  moveItem,
  opensOnClick,
  useSheetForm,
  type FormSchema,
} from "aperia-ds5"
import { cn } from "@/lib/utils"
import { BeforeAfter, Screen } from "./before-after"

type Column = { id: string; label: string; shown: boolean }
type View = { id: string; name: string; columns: Column[] }

// Titan's Merchant View: MID and Merchant Name can't be hidden.
const LOCKED = ["MID", "Merchant Name"]
const COLUMNS: Column[] = [
  { id: "queue", label: "Detection Queue", shown: true },
  { id: "band", label: "MC Band", shown: true },
  { id: "score", label: "MC Score", shown: true },
  { id: "mcc", label: "MCC", shown: false },
  { id: "net", label: "Net Amount", shown: false },
  { id: "alerted", label: "Last Alert", shown: true },
]

// Figures are right-aligned.
const FIGURES = ["score", "mcc", "net"]

const VIEWS: View[] = [
  { id: "default", name: "Default View", columns: COLUMNS },
  {
    id: "mine",
    name: "My Queue",
    columns: COLUMNS.map((c) => ({ ...c, shown: c.id !== "alerted" })),
  },
]

const MERCHANTS = [
  {
    mid: "492001837716",
    name: "Harbor Lane Bistro LLC",
    queue: "Mastercard Default Monitoring",
    band: "High",
    score: 748,
    mcc: 5812,
    net: 184_250,
    alerted: "11/18/2026",
  },
  {
    mid: "492001902245",
    name: "Apex Digital Goods Inc",
    queue: "MC Critical Band Watch",
    band: "Critical",
    score: 911,
    mcc: 5816,
    net: 92_400,
    alerted: "11/20/2026",
  },
  {
    mid: "492001655390",
    name: "Northgate Auto Repair",
    queue: "New and Ramping Merchants",
    band: "Medium",
    score: 512,
    mcc: 7538,
    net: -1_250.5,
    alerted: "11/09/2026",
  },
]

type Draft = { name: string; isDefault: boolean; columns: Column[] }

const viewSchema: FormSchema<Draft> = {
  safeParse(input) {
    const value = input as Draft
    return value.name.trim()
      ? { success: true, data: value }
      : {
          success: false,
          error: {
            issues: [{ path: ["name"], message: "Enter a view name." }],
          },
        }
  },
}

function ViewPicker({
  views,
  current,
  onPick,
  onEdit,
  onCreate,
}: {
  views: View[]
  current: View
  onPick: (id: string) => void
  onEdit: () => void
  onCreate: () => void
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="font-normal">
          <span className="text-muted-foreground">View</span>
          {current.name}
          <ChevronDownIcon
            data-icon="inline-end"
            className="text-muted-foreground"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {views.map((view) => (
          <DropdownMenuCheckboxItem
            key={view.id}
            checked={view.id === current.id}
            onSelect={() => onPick(view.id)}
          >
            {view.name}
          </DropdownMenuCheckboxItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={onEdit}>Edit View</DropdownMenuItem>
        <DropdownMenuItem onSelect={onCreate}>Create View</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function ViewForm({
  view,
  isLast,
  onSave,
  onDelete,
}: {
  view: View | null
  isLast: boolean
  onSave: (draft: Draft) => void
  onDelete: () => void
}) {
  const form = useSheetForm<Draft>({
    name: view?.name ?? "",
    isDefault: false,
    columns: view?.columns ?? COLUMNS,
  })
  const { draft, set, errors, check } = form
  const [query, setQuery] = useState("")
  const [pending, startTransition] = useTransition()
  const shown =
    LOCKED.length + draft.columns.filter((column) => column.shown).length
  const total = LOCKED.length + draft.columns.length
  const matches = (label: string) =>
    label.toLowerCase().includes(query.trim().toLowerCase())

  function submit() {
    const parsed = check(viewSchema, draft)
    if (parsed) startTransition(() => onSave(parsed))
  }

  return (
    <SheetForm
      form={form}
      onSubmit={submit}
      pending={pending}
      submit={view ? "Save View" : "Create View"}
      start={
        view && (
          <SheetDelete
            title="Delete View?"
            action="Delete View"
            onDelete={onDelete}
            reason={isLast ? IN_USE_DELETE : null}
          >
            This permanently deletes {view.name}.
          </SheetDelete>
        )
      }
    >
      <FieldGroup>
        <Field data-invalid={Boolean(errors.name)}>
          <FieldLabel htmlFor="view-name">View Name</FieldLabel>
          <Input
            id="view-name"
            autoFocus
            placeholder="e.g. My Queue"
            value={draft.name}
            aria-invalid={Boolean(errors.name)}
            onChange={(event) => set("name", event.target.value)}
          />
          <FieldError>{errors.name}</FieldError>
        </Field>
        <Field orientation="horizontal">
          <Checkbox
            id="view-default"
            checked={draft.isDefault}
            onCheckedChange={(on) => set("isDefault", on === true)}
          />
          <FieldLabel htmlFor="view-default" className="font-normal">
            Set as My Default View
          </FieldLabel>
        </Field>
        <Field>
          <div className="flex items-center justify-between">
            <Label id="view-columns">Columns</Label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => set("columns", COLUMNS)}
            >
              Reset to Default
            </Button>
          </div>
          <InputGroup>
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput
              aria-label="Search columns"
              placeholder="Search columns"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </InputGroup>
          <p className="text-xs text-muted-foreground tabular-nums">
            {shown} of {total} shown
          </p>
          <ul aria-labelledby="view-columns" className="flex flex-col">
            {LOCKED.filter(matches).map((label) => (
              <li
                key={label}
                className="flex h-8 items-center gap-2 pl-7 text-sm"
              >
                <LockIcon
                  className="size-4 text-muted-foreground"
                  aria-label="Always shown"
                />
                {label}
              </li>
            ))}
          </ul>
          <div className="flex flex-col">
            <SortableList
              ids={draft.columns.map((column) => column.id)}
              name={(id) =>
                draft.columns.find((column) => column.id === id)?.label ??
                "Column"
              }
              onMove={(from, to) =>
                set("columns", moveItem(draft.columns, from, to))
              }
            >
              {draft.columns
                .filter((column) => matches(column.label))
                .map((column) => (
                  <SortableRow key={column.id} id={column.id}>
                    {(row, handle) => (
                      <div
                        {...row}
                        className="flex h-8 items-center gap-2 text-sm"
                      >
                        {handle(`Reorder ${column.label}`)}
                        <Checkbox
                          id={`column-${column.id}`}
                          checked={column.shown}
                          onCheckedChange={(on) =>
                            set(
                              "columns",
                              draft.columns.map((each) =>
                                each.id === column.id
                                  ? { ...each, shown: on === true }
                                  : each
                              )
                            )
                          }
                        />
                        <Label
                          htmlFor={`column-${column.id}`}
                          className="font-normal"
                        >
                          {column.label}
                        </Label>
                      </div>
                    )}
                  </SortableRow>
                ))}
            </SortableList>
          </div>
        </Field>
      </FieldGroup>
    </SheetForm>
  )
}

/** The Merchant View list with its saved views: pick one, edit it, or create one. */
export function SavedViewsExample() {
  const [views, setViews] = useState(VIEWS)
  const [currentId, setCurrentId] = useState("mine")
  const [editing, setEditing] = useState<"edit" | "create" | null>(null)
  const [query, setQuery] = useState("")
  const current = views.find((view) => view.id === currentId) ?? views[0]
  const columns = current.columns.filter((column) => column.shown)
  const rows = MERCHANTS.filter((row) =>
    `${row.mid} ${row.name}`.toLowerCase().includes(query.toLowerCase())
  )

  function save(draft: Draft) {
    if (editing === "edit") {
      setViews((was) =>
        was.map((view) =>
          view.id === current.id
            ? { ...view, name: draft.name.trim(), columns: draft.columns }
            : view
        )
      )
    } else {
      const id = `view-${views.length + 1}`
      setViews((was) => [
        ...was,
        { id, name: draft.name.trim(), columns: draft.columns },
      ])
      setCurrentId(id)
    }
    setEditing(null)
  }

  return (
    <Screen caption="Open the View picker, then Edit View. Clear the name and save to see the refusal.">
      <ListToolbar
        start={
          <ViewPicker
            views={views}
            current={current}
            onPick={setCurrentId}
            onEdit={() => setEditing("edit")}
            onCreate={() => setEditing("create")}
          />
        }
        search={{
          placeholder: "Search MID or merchant name",
          value: query,
          onChange: setQuery,
        }}
        shown={rows.length}
        total={MERCHANTS.length}
        noun={["merchant", "merchants"]}
      />
      <div className="overflow-x-auto surface">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-4">MID</TableHead>
              <TableHead>Merchant Name</TableHead>
              {columns.map((column, i) => (
                <TableHead
                  key={column.id}
                  className={cn(
                    FIGURES.includes(column.id) && "text-right",
                    i === columns.length - 1 && "pr-4"
                  )}
                >
                  {column.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.mid}
                {...opensOnClick(`Open ${row.name}`, () => {})}
              >
                <TableCell className="pl-4 tabular-nums">{row.mid}</TableCell>
                <TableCell>{row.name}</TableCell>
                {columns.map((column, i) => (
                  <TableCell
                    key={column.id}
                    className={cn(
                      "tabular-nums",
                      FIGURES.includes(column.id) && "text-right",
                      i === columns.length - 1 && "pr-4"
                    )}
                  >
                    {column.id === "band" ? (
                      <Badge variant="secondary">{row.band}</Badge>
                    ) : column.id === "net" ? (
                      <MoneyValue value={row.net} cents />
                    ) : (
                      row[column.id as keyof typeof row]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <FormSheet
        open={editing !== null}
        onOpenChange={(open) => !open && setEditing(null)}
        title={editing === "create" ? "Create View" : "Edit View"}
      >
        {editing && (
          <ViewForm
            key={`${editing}-${current.id}`}
            view={editing === "edit" ? current : null}
            isLast={views.length <= 1}
            onSave={save}
            onDelete={() => {
              const rest = views.filter((view) => view.id !== current.id)
              setViews(rest)
              setCurrentId(rest[0].id)
              setEditing(null)
            }}
          />
        )}
      </FormSheet>
    </Screen>
  )
}

/** Titan's hand-built row against the picker; an empty name saved against one refused. */
export function SavedViewsBeforeAfter() {
  return (
    <BeforeAfter
      beforeNote="a label, a dropdown and a link; an empty name saved as “Untitled view”"
      afterNote="one picker; an empty name refused beside the field"
      before={
        <>
          <div className="flex flex-wrap items-center gap-2">
            <span>View:</span>
            <Select defaultValue="untitled">
              <SelectTrigger className="w-44" aria-label="View">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mine">My Queue</SelectItem>
                <SelectItem value="untitled">Untitled view</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="link" className="px-1">
              Edit View
            </Button>
          </div>
          <Field>
            <FieldLabel htmlFor="before-view-name">View Name</FieldLabel>
            <Input id="before-view-name" placeholder="Enter name" />
          </Field>
        </>
      }
      after={
        <>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" className="font-normal">
              <span className="text-muted-foreground">View</span>
              My Queue
              <ChevronDownIcon
                data-icon="inline-end"
                className="text-muted-foreground"
              />
            </Button>
          </div>
          <Field data-invalid>
            <FieldLabel htmlFor="after-view-name">View Name</FieldLabel>
            <Input
              id="after-view-name"
              aria-invalid
              placeholder="e.g. My Queue"
            />
            <FieldError>Enter a view name.</FieldError>
          </Field>
        </>
      }
    />
  )
}

export const savedViewsExamples = {
  "How it looks and behaves": <SavedViewsExample />,
  "Before and after": <SavedViewsBeforeAfter />,
}
