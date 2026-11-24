import { useId, useState, useTransition } from "react"
import { toast } from "sonner"
import {
  CalendarIcon,
  ListChecksIcon,
  MailIcon,
  PencilIcon,
  PhoneIcon,
  PlusIcon,
  type LucideIcon,
} from "lucide-react"
import {
  Button,
  Checkbox,
  EmptyState,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FormSheet,
  IconButton,
  Input,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
  SheetDelete,
  SheetForm,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TitledCard,
  Toaster,
  useSheetForm,
  type FormSchema,
} from "aperia-ds5"
import { BeforeAfter, Screen } from "./before-after"

type Task = {
  id: number
  title: string
  type: "Call" | "Email" | "Meeting"
  due: string
  done?: { by: string; on: string }
}

const TYPE_ICON: Record<Task["type"], LucideIcon> = {
  Call: PhoneIcon,
  Email: MailIcon,
  Meeting: CalendarIcon,
}

// Northwind Payments' opportunity, seen on 11/23/2026.
const TODAY = "11/23/2026"
const TASKS: Task[] = [
  {
    id: 1,
    title: "Discovery Call",
    type: "Call",
    due: "11/10/2026",
    done: { by: "Dana Whitfield", on: "11/09/2026" },
  },
  { id: 2, title: "Send Proposal", type: "Email", due: "11/18/2026" },
  { id: 3, title: "Schedule Demo", type: "Meeting", due: TODAY },
  { id: 4, title: "Pricing Review", type: "Meeting", due: "12/02/2026" },
]

function dueLabel(due: string) {
  // MM/DD/YYYY compares by its year, then month and day.
  const key = (day: string) => day.slice(6) + day.slice(0, 5)
  if (key(due) < key(TODAY)) return `Overdue, was due ${due}`
  return due === TODAY ? "Due today" : `Due ${due}`
}

// Shows on pointing, on keyboard focus and always on touch.
const QUIET =
  "opacity-0 group-hover/item:opacity-100 focus-visible:opacity-100 pointer-coarse:opacity-100"

function TaskRow({
  task,
  onTick,
  onEdit,
}: {
  task: Task
  onTick: (done: boolean) => void
  onEdit: () => void
}) {
  const titleId = useId()
  const Icon = TYPE_ICON[task.type]
  const late = !task.done && dueLabel(task.due).startsWith("Overdue")
  const status = task.done ? (
    <span className="text-xs text-muted-foreground tabular-nums">
      {task.done.by} · {task.done.on}
    </span>
  ) : (
    <span
      className={
        late
          ? "text-xs text-destructive tabular-nums"
          : "text-xs text-muted-foreground tabular-nums"
      }
    >
      {dueLabel(task.due)}
    </span>
  )
  return (
    <Item
      role="listitem"
      className="items-center gap-x-3 rounded-none border-0 border-border px-4 py-3 not-first:border-t"
    >
      <ItemMedia>
        <Checkbox
          checked={Boolean(task.done)}
          aria-labelledby={titleId}
          onCheckedChange={(on) => onTick(on === true)}
        />
      </ItemMedia>
      <ItemContent className="min-w-0 gap-0.5">
        <ItemTitle>
          <span id={titleId}>{task.title}</span>
        </ItemTitle>
        <ItemDescription className="flex flex-wrap items-center gap-1 text-xs">
          <Icon className="size-3 shrink-0" aria-hidden />
          {task.type}
          <span className="@min-[40rem]/tasks:hidden">· {status}</span>
        </ItemDescription>
      </ItemContent>
      <ItemActions className="min-h-7 items-center gap-3">
        <span className="hidden @min-[40rem]/tasks:inline">{status}</span>
        {!task.done && (
          <IconButton
            label="Edit"
            aria-label={`Edit ${task.title}`}
            className={QUIET}
            onClick={onEdit}
          >
            <PencilIcon />
          </IconButton>
        )}
      </ItemActions>
    </Item>
  )
}

const taskSchema: FormSchema<{ title: string }> = {
  safeParse(input) {
    const value = input as { title: string }
    return value.title.trim()
      ? { success: true, data: value }
      : {
          success: false,
          error: {
            issues: [{ path: ["title"], message: "Enter a task name." }],
          },
        }
  },
}

function TaskForm({
  task,
  onSave,
  onDelete,
}: {
  task: Task
  onSave: (title: string) => void
  onDelete: () => void
}) {
  const form = useSheetForm({ title: task.title })
  const [pending, startTransition] = useTransition()
  return (
    <SheetForm
      form={form}
      onSubmit={() => {
        const parsed = form.check(taskSchema, form.draft)
        if (parsed) startTransition(() => onSave(parsed.title.trim()))
      }}
      pending={pending}
      submit="Save Changes"
      start={
        <SheetDelete
          title="Delete Task?"
          action="Delete Task"
          onDelete={onDelete}
        >
          This permanently deletes {task.title}.
        </SheetDelete>
      }
    >
      <FieldGroup>
        <Field data-invalid={Boolean(form.errors.title)}>
          <FieldLabel htmlFor="task-title">Task</FieldLabel>
          <Input
            id="task-title"
            autoFocus
            value={form.draft.title}
            aria-invalid={Boolean(form.errors.title)}
            onChange={(event) => form.set("title", event.target.value)}
          />
          <FieldError>{form.errors.title}</FieldError>
        </Field>
      </FieldGroup>
    </SheetForm>
  )
}

const headerButtons = (
  <>
    <Button variant="outline">Apply Template</Button>
    <Button variant="outline">
      <PlusIcon data-icon="inline-start" />
      Add Task
    </Button>
  </>
)

/** An opportunity's Tasks card: tick a task, or point at a row and press Edit. */
export function TaskChecklistExample() {
  const [tasks, setTasks] = useState(TASKS)
  const [editing, setEditing] = useState<Task | null>(null)
  const done = tasks.filter((task) => task.done).length

  function tick(task: Task, on: boolean) {
    const before = tasks
    setTasks((was) =>
      was.map((each) =>
        each.id === task.id
          ? {
              ...each,
              done: on ? { by: "Dana Whitfield", on: TODAY } : undefined,
            }
          : each
      )
    )
    if (on)
      toast(`Done: ${task.title}`, {
        action: { label: "Undo", onClick: () => setTasks(before) },
      })
  }

  return (
    <Screen caption="Tick a task to see the message with Undo. Point at a row that isn’t done to reveal Edit.">
      <TitledCard
        title="Tasks"
        figure={`${done} of ${tasks.length}`}
        action={<span className="flex flex-wrap gap-2">{headerButtons}</span>}
      >
        <ItemGroup role="list" className="@container/tasks gap-0">
          {tasks.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              onTick={(on) => tick(task, on)}
              onEdit={() => setEditing(task)}
            />
          ))}
        </ItemGroup>
      </TitledCard>
      <TitledCard title="Tasks">
        <EmptyState
          icon={ListChecksIcon}
          title="No Tasks"
          actionClassName="flex-row flex-wrap justify-center"
          action={headerButtons}
        />
      </TitledCard>
      <FormSheet
        open={editing !== null}
        onOpenChange={(open) => !open && setEditing(null)}
        title="Edit Task"
      >
        {editing && (
          <TaskForm
            key={editing.id}
            task={editing}
            onSave={(title) => {
              setTasks((was) =>
                was.map((each) =>
                  each.id === editing.id ? { ...each, title } : each
                )
              )
              setEditing(null)
            }}
            onDelete={() => {
              setTasks((was) => was.filter((each) => each.id !== editing.id))
              setEditing(null)
            }}
          />
        )}
      </FormSheet>
      <Toaster />
    </Screen>
  )
}

/** A table of tasks with Done buttons and a red date, against the checklist rows. */
export function TaskChecklistBeforeAfter() {
  const shown = TASKS.slice(1, 3)
  return (
    <BeforeAfter
      beforeNote="a solid Done button on every row; late shown only by a red date"
      afterNote="a checkbox; late said in words; Edit appears on pointing"
      before={
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-3">Task</TableHead>
                <TableHead>Due</TableHead>
                <TableHead className="pr-3" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {shown.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="pl-3">{task.title}</TableCell>
                  <TableCell
                    className={
                      task.due === "11/18/2026"
                        ? "text-destructive tabular-nums"
                        : "tabular-nums"
                    }
                  >
                    {task.due}
                  </TableCell>
                  <TableCell className="pr-3">
                    <span className="flex justify-end gap-1">
                      <Button size="xs" variant="link">
                        Edit
                      </Button>
                      <Button size="xs">Done</Button>
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      }
      after={
        <TitledCard title="Tasks" figure={`0 of ${shown.length}`}>
          <ItemGroup role="list" className="@container/tasks gap-0">
            {shown.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                onTick={() => {}}
                onEdit={() => {}}
              />
            ))}
          </ItemGroup>
        </TitledCard>
      }
    />
  )
}

export const taskChecklistExamples = {
  "How it looks and behaves": <TaskChecklistExample />,
  "Before and after": <TaskChecklistBeforeAfter />,
}
