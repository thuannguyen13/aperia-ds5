import { useState, useTransition } from "react"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  PencilIcon,
  PlusIcon,
  Trash2Icon,
} from "lucide-react"
import {
  Badge,
  Button,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FormSheet,
  IN_USE_DELETE,
  Input,
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
  Toaster,
  ToggleGroup,
  ToggleGroupItem,
  moveItem,
  opensOnClick,
  useSheetForm,
  type FormSchema,
  type SortableRowProps,
} from "aperia-ds5"
import { TableGroupRow, TitledCard } from "../recipes"
import { cn } from "@/lib/utils"
import { BeforeAfter, Screen } from "./before-after"

/** A sortable row that also opens: the drag's class and the focus ring's, both kept. */
function opening(
  row: SortableRowProps,
  opens: ReturnType<typeof opensOnClick> | null
) {
  return opens
    ? { ...row, ...opens, className: cn(row.className, opens.className) }
    : row
}

type Stage = {
  id: number
  name: string
  group: "Open" | "Closed"
  inUse: number
  color: string
}

// Each app colors its own stage badges; these stand in for Sales Portal's.
const STAGES: Stage[] = [
  {
    id: 1,
    name: "Discovery",
    group: "Open",
    inUse: 18,
    color: "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-200",
  },
  {
    id: 2,
    name: "Qualification",
    group: "Open",
    inUse: 11,
    color:
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200",
  },
  {
    id: 3,
    name: "Demo",
    group: "Open",
    inUse: 7,
    color:
      "bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-200",
  },
  {
    id: 4,
    name: "Proposal",
    group: "Open",
    inUse: 0,
    color: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200",
  },
  {
    id: 5,
    name: "Closed Won",
    group: "Closed",
    inUse: 42,
    color: "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200",
  },
  {
    id: 6,
    name: "Closed Lost",
    group: "Closed",
    inUse: 0,
    color: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200",
  },
]
const GROUPS = ["Open", "Closed"] as const

type Access = "edit" | "delete" | "none"

const stageSchema: FormSchema<{ name: string }> = {
  safeParse(input) {
    const value = input as { name: string }
    return value.name.trim()
      ? { success: true, data: value }
      : {
          success: false,
          error: {
            issues: [{ path: ["name"], message: "Enter a stage name." }],
          },
        }
  },
}

function StageForm({
  stage,
  readOnly,
  onSave,
  onDelete,
}: {
  stage: Stage | null
  readOnly: boolean
  onSave: (name: string) => void
  onDelete: () => void
}) {
  const form = useSheetForm({ name: stage?.name ?? "" })
  const [pending, startTransition] = useTransition()
  return (
    <SheetForm
      form={form}
      onSubmit={() => {
        const parsed = form.check(stageSchema, form.draft)
        if (parsed) startTransition(() => onSave(parsed.name.trim()))
      }}
      pending={pending}
      submit={stage ? "Save Changes" : "Add Stage"}
      readOnly={readOnly}
      start={
        stage && (
          <SheetDelete
            title="Delete Stage?"
            action="Delete Stage"
            onDelete={onDelete}
            reason={stage.inUse > 0 ? IN_USE_DELETE : null}
          >
            This permanently deletes {stage.name}.
          </SheetDelete>
        )
      }
    >
      <FieldGroup>
        <Field data-invalid={Boolean(form.errors.name)}>
          <FieldLabel htmlFor="stage-name">Name</FieldLabel>
          <Input
            id="stage-name"
            autoFocus
            disabled={readOnly}
            placeholder="e.g. Negotiation"
            value={form.draft.name}
            aria-invalid={Boolean(form.errors.name)}
            onChange={(event) => form.set("name", event.target.value)}
          />
          <FieldError>{form.errors.name}</FieldError>
        </Field>
      </FieldGroup>
    </SheetForm>
  )
}

/** The Stages card: rows open their sheet, the grip reorders within a group, and access changes what opens. */
export function OptionListExample() {
  const [stages, setStages] = useState(STAGES)
  const [open, setOpen] = useState<Stage | "new" | null>(null)
  const [access, setAccess] = useState<Access>("edit")

  function reorder(group: Stage["group"], from: number, to: number) {
    setStages((was) => {
      const moved = moveItem(
        was.filter((stage) => stage.group === group),
        from,
        to
      )
      return GROUPS.flatMap((each) =>
        each === group ? moved : was.filter((stage) => stage.group === each)
      )
    })
  }

  const editing = open !== null && open !== "new" ? open : null

  return (
    <Screen
      controls={
        <>
          <span>The viewer may</span>
          <ToggleGroup
            type="single"
            variant="outline"
            size="sm"
            aria-label="What the viewer may do"
            value={access}
            onValueChange={(next) => next && setAccess(next as Access)}
          >
            <ToggleGroupItem value="edit">Edit</ToggleGroupItem>
            <ToggleGroupItem value="delete">Only Delete</ToggleGroupItem>
            <ToggleGroupItem value="none">Neither</ToggleGroupItem>
          </ToggleGroup>
        </>
      }
      caption="Open a row: Proposal and Closed Lost can be deleted, the others are in use. Drag a grip, or press Space on it and use the arrows."
    >
      <TitledCard
        title="Stages"
        figure={stages.length}
        action={
          access === "edit" && (
            <Button variant="outline" onClick={() => setOpen("new")}>
              <PlusIcon data-icon="inline-start" />
              Add Stage
            </Button>
          )
        }
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10 pl-2" />
              <TableHead>Name</TableHead>
              <TableHead className="pr-4 text-right">In Use</TableHead>
            </TableRow>
          </TableHeader>
          {GROUPS.map((group) => {
            const rows = stages.filter((stage) => stage.group === group)
            return (
              <TableBody key={group}>
                <TableGroupRow colSpan={3}>{group}</TableGroupRow>
                <SortableList
                  ids={rows.map((stage) => stage.id)}
                  name={(id) =>
                    rows.find((stage) => stage.id === id)?.name ?? "Stage"
                  }
                  onMove={(from, to) => reorder(group, from, to)}
                >
                  {rows.map((stage) => (
                    <SortableRow key={stage.id} id={stage.id}>
                      {(row, handle) => (
                        <TableRow
                          {...opening(
                            row,
                            access === "none"
                              ? null
                              : opensOnClick(`Open ${stage.name}`, () =>
                                  setOpen(stage)
                                )
                          )}
                        >
                          <TableCell className="w-10 py-1 pl-2">
                            {access === "edit" &&
                              handle(`Reorder ${stage.name}`)}
                          </TableCell>
                          <TableCell>
                            <Badge className={stage.color}>{stage.name}</Badge>
                          </TableCell>
                          <TableCell className="pr-4 text-right tabular-nums">
                            {stage.inUse}
                          </TableCell>
                        </TableRow>
                      )}
                    </SortableRow>
                  ))}
                </SortableList>
              </TableBody>
            )
          })}
        </Table>
      </TitledCard>
      <FormSheet
        open={open !== null}
        onOpenChange={(next) => !next && setOpen(null)}
        title={
          editing ? (access === "edit" ? "Edit Stage" : "Stage") : "Add Stage"
        }
      >
        {open !== null && (
          <StageForm
            key={editing?.id ?? "new"}
            stage={editing}
            readOnly={access !== "edit"}
            onSave={(name) => {
              setStages((was) =>
                editing
                  ? was.map((stage) =>
                      stage.id === editing.id ? { ...stage, name } : stage
                    )
                  : [
                      ...was,
                      {
                        id: was.length + 1,
                        name,
                        group: "Open",
                        inUse: 0,
                        color: "bg-muted text-foreground",
                      },
                    ]
              )
              setOpen(null)
            }}
            onDelete={() => {
              setStages((was) =>
                was.filter((stage) => stage.id !== editing?.id)
              )
              setOpen(null)
            }}
          />
        )}
      </FormSheet>
      <Toaster />
    </Screen>
  )
}

/** Per-row buttons and arrows, against a row that opens and a grip. */
export function OptionListBeforeAfter() {
  const rows = STAGES.slice(2, 5)
  return (
    <BeforeAfter
      beforeNote="pencil, bin and arrows on every row; the grayed bin says nothing"
      afterNote="the row opens its sheet; a grip reorders; In Use on the right"
      before={
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-3">Stage</TableHead>
                <TableHead>Deals</TableHead>
                <TableHead className="pr-3" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((stage) => (
                <TableRow key={stage.id}>
                  <TableCell className="pl-3">{stage.name}</TableCell>
                  <TableCell className="tabular-nums">{stage.inUse}</TableCell>
                  <TableCell className="pr-3">
                    <span className="flex justify-end gap-0.5">
                      <Button size="icon-xs" variant="ghost" aria-label="Up">
                        <ArrowUpIcon />
                      </Button>
                      <Button size="icon-xs" variant="ghost" aria-label="Down">
                        <ArrowDownIcon />
                      </Button>
                      <Button size="icon-xs" variant="ghost" aria-label="Edit">
                        <PencilIcon />
                      </Button>
                      <Button
                        size="icon-xs"
                        variant="ghost"
                        aria-label="Delete"
                        disabled={stage.inUse > 0}
                      >
                        <Trash2Icon />
                      </Button>
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      }
      after={
        <TitledCard title="Stages" figure={rows.length}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10 pl-2" />
                <TableHead>Name</TableHead>
                <TableHead className="pr-4 text-right">In Use</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <SortableList
                ids={rows.map((stage) => stage.id)}
                name={() => "Stage"}
                onMove={() => {}}
              >
                {rows.map((stage) => (
                  <SortableRow key={stage.id} id={stage.id}>
                    {(row, handle) => (
                      <TableRow
                        {...opening(
                          row,
                          opensOnClick(`Open ${stage.name}`, () => {})
                        )}
                      >
                        <TableCell className="w-10 py-1 pl-2">
                          {handle(`Reorder ${stage.name}`)}
                        </TableCell>
                        <TableCell>
                          <Badge className={stage.color}>{stage.name}</Badge>
                        </TableCell>
                        <TableCell className="pr-4 text-right tabular-nums">
                          {stage.inUse}
                        </TableCell>
                      </TableRow>
                    )}
                  </SortableRow>
                ))}
              </SortableList>
            </TableBody>
          </Table>
        </TitledCard>
      }
    />
  )
}

export const optionListExamples = {
  "How it looks and behaves": <OptionListExample />,
  "Before and after": <OptionListBeforeAfter />,
}
