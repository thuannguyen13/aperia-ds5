import type { ReactNode } from "react"
import { InboxIcon } from "lucide-react"
import {
  Badge,
  PageHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  opensOnClick,
} from "aperia-ds5"
import { DoDont, Example } from "../blocks"
import { StatusDot, TitledCard } from "../recipes"
import { AppStatusColors, STATES } from "./app-status"

// A record's status: a word in a badge, in the app's own status pairs (stood in for by brand.example.css), in one
// place on every screen.

type State = keyof typeof STATES

function Status({ state }: { state: State }) {
  const { label, className } = STATES[state]
  return <Badge className={className}>{label}</Badge>
}

const TASKS: { name: string; owner: string; state: State }[] = [
  {
    name: "Send the pricing proposal",
    owner: "Dana Whitfield",
    state: "overdue",
  },
  { name: "Review the signed agreement", owner: "Marcus Lee", state: "review" },
  { name: "Schedule onboarding", owner: "Priya Raman", state: "inProgress" },
]

/** The app's classes, then the example. */
function WithColors({ children }: { children: ReactNode }) {
  return (
    <>
      <AppStatusColors />
      {children}
    </>
  )
}

function TaskTable({
  status = (state: State) => <Status state={state} />,
  inName = false,
}: {
  status?: (state: State) => ReactNode
  inName?: boolean
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="pl-4">Task</TableHead>
          <TableHead>Owner</TableHead>
          {!inName && <TableHead className="pr-4">Status</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {TASKS.map((task) => (
          <TableRow key={task.name} {...opensOnClick(task.name, () => {})}>
            <TableCell className="pl-4">
              {inName
                ? `${task.name} (${STATES[task.state].label})`
                : task.name}
            </TableCell>
            <TableCell className={inName ? "pr-4" : undefined}>
              {task.owner}
            </TableCell>
            {!inName && (
              <TableCell className="pr-4">{status(task.state)}</TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function Card({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-xl">
      <TitledCard title="Tasks">{children}</TitledCard>
    </div>
  )
}

export const statusExamples = {
  "@intro": (
    <Example caption="Colored badges for states people must notice, a plain badge for a stage, and a dot beside a word for a condition in a line of text.">
      <WithColors>
        {(Object.keys(STATES) as State[]).map((state) => (
          <Status key={state} state={state} />
        ))}
        <Badge variant="outline">Proposal</Badge>
        <StatusDot dot="bg-status-red-foreground">2 failed</StatusDot>
      </WithColors>
    </Example>
  ),
  "What is available": (
    <Example
      caption="The same status in its own table column and as a property in the record's page header."
      className="flex-col items-stretch"
    >
      <WithColors>
        <PageHeader
          title="Send the pricing proposal"
          properties={[
            ["Owner", "Dana Whitfield"],
            ["Status", <Status key="status" state="overdue" />],
          ]}
        />
        <Card>
          <TaskTable />
        </Card>
      </WithColors>
    </Example>
  ),
  "Use one word and one color for each state": (
    <DoDont
      good={
        <WithColors>
          <div className="grid gap-3">
            <PageHeader
              title="Send the pricing proposal"
              properties={[["Status", <Status key="s" state="overdue" />]]}
            />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              In the Tasks table <Status state="overdue" />
            </div>
          </div>
        </WithColors>
      }
      bad={
        <WithColors>
          <div className="grid gap-3">
            <PageHeader
              title="Send the pricing proposal"
              properties={[
                [
                  "Status",
                  <Badge key="s" className={STATES.review.className}>
                    Late
                  </Badge>,
                ],
              ]}
            />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              In the Tasks table <Status state="overdue" />
            </div>
          </div>
        </WithColors>
      }
      badNote="Overdue in red in the table, Late in amber on the record"
    />
  ),
  "Use status color only for state": (
    <DoDont
      good={
        <WithColors>
          <div className="grid w-full max-w-64 gap-2">
            <span className="text-sm font-semibold">Northwind Payments</span>
            <span className="justify-self-start">
              <Status state="inProgress" />
            </span>
          </div>
        </WithColors>
      }
      bad={
        <WithColors>
          <div className="grid w-full max-w-64 gap-2">
            <span className="text-status-blue-foreground flex items-center gap-1.5 text-sm font-semibold">
              <InboxIcon className="size-4" />
              Northwind Payments
            </span>
            <span className="text-sm text-muted-foreground">In Progress</span>
          </div>
        </WithColors>
      }
      badNote="the state's color on the name and an icon, the state itself in plain gray"
    />
  ),
  "Give the status its own column or property": (
    <DoDont
      stack
      good={
        <WithColors>
          <Card>
            <TaskTable />
          </Card>
        </WithColors>
      }
      bad={
        <WithColors>
          <Card>
            <TaskTable inName />
          </Card>
        </WithColors>
      }
      badNote="the status written into each task's name"
    />
  ),
}
