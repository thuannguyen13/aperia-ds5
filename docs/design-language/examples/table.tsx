import { PencilIcon, Trash2Icon } from "lucide-react"
import {
  Badge,
  Button,
  Separator,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  opensOnClick,
} from "aperia-ds5"
import { DoDont, Example } from "../blocks"
import { forceState, useForcedStates } from "../states"
import { IconButton, TaskTable, TitledCard, Wide } from "./shared"

const CONTACTS = [
  {
    name: "Dana Whitfield",
    phone: "(214) 555-0142",
    email: "dana@northwind.com",
  },
  {
    name: "Marcus Lee",
    phone: "(469) 555-0187",
    email: "marcus@blueharbor.com",
  },
]

function Contacts({ links }: { links: boolean }) {
  const link = "text-primary underline underline-offset-2"
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="pl-4">Name</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead className="pr-4">Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {CONTACTS.map((c) => (
          <TableRow
            key={c.name}
            {...(links ? {} : opensOnClick(c.name, () => {}))}
          >
            <TableCell className="pl-4">{c.name}</TableCell>
            <TableCell className="tabular-nums">
              {links ? <span className={link}>{c.phone}</span> : c.phone}
            </TableCell>
            <TableCell className="pr-4">
              {links ? <span className={link}>{c.email}</span> : c.email}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

const count = <span>3</span>

const DEALS = [
  {
    name: "Northwind Payments",
    stage: "Proposal",
    overdue: 3,
    volume: "$4,200,000",
  },
  {
    name: "Blue Harbor Bank",
    stage: "Discovery",
    overdue: 0,
    volume: "$1,800,000",
  },
  {
    name: "Cedar Credit Union",
    stage: "Negotiation",
    overdue: null,
    volume: "$650,000",
  },
]

function Deals({ signal }: { signal: "word" | "color" }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="pl-4">Prospect</TableHead>
          <TableHead>Stage</TableHead>
          <TableHead>Overdue</TableHead>
          <TableHead className="pr-4 text-right">Volume</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {DEALS.map((d) => (
          <TableRow key={d.name} {...opensOnClick(d.name, () => {})}>
            <TableCell className="pl-4">{d.name}</TableCell>
            <TableCell>
              <Badge variant="outline">{d.stage}</Badge>
            </TableCell>
            <TableCell>
              {d.overdue == null ? (
                <span className="text-muted-foreground">—</span>
              ) : signal === "word" ? (
                d.overdue > 0 ? (
                  <span className="inline-flex items-center gap-1.5 text-destructive">
                    <span className="size-1.5 rounded-full bg-destructive" />
                    {d.overdue} overdue
                  </span>
                ) : (
                  <span className="text-muted-foreground">None</span>
                )
              ) : (
                <span
                  className={
                    d.overdue > 0
                      ? "font-semibold text-destructive"
                      : "text-green-700"
                  }
                >
                  {d.overdue}
                </span>
              )}
            </TableCell>
            <TableCell className="pr-4 text-right tabular-nums">
              {d.volume}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function inCard(table: React.ReactNode) {
  return (
    <Wide>
      <TitledCard title="Tasks" figure={count}>
        {table}
      </TitledCard>
    </Wide>
  )
}

/** A row in each state, named in its first cell. Hover and focus are the row's own state styles, marked with `data-force`. */
function RowStates() {
  useForcedStates()
  const rows = [
    { state: "Default", props: {} },
    { state: "Hover", props: forceState("hover") },
    { state: "Focus", props: forceState("focus") },
    { state: "Selected", props: { "data-state": "selected" } },
  ]
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="pl-4">State</TableHead>
          <TableHead>Task</TableHead>
          <TableHead className="pr-4">Owner</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row.state}
            {...opensOnClick(`${row.state} row`, () => {})}
            {...row.props}
          >
            <TableCell className="pl-4 text-muted-foreground">
              {row.state}
            </TableCell>
            <TableCell>Send the pricing proposal</TableCell>
            <TableCell className="pr-4">Dana Whitfield</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export const tableExamples = {
  States: (
    <Example caption="Each row shows the state named in its first cell.">
      {inCard(<RowStates />)}
    </Example>
  ),
  "@intro": (
    <Example caption="Click a row, or Tab to it and press Enter: the whole row opens its record.">
      <div className="w-full max-w-xl">
        <TitledCard title="Prospects" figure={count}>
          <Deals signal="word" />
        </TitledCard>
      </div>
    </Example>
  ),
  "Open the record from the whole row": (
    <DoDont
      stack
      good={inCard(<TaskTable />)}
      bad={inCard(
        <TaskTable
          extra={() => (
            <Button variant="outline" size="xs">
              Open
            </Button>
          )}
        />
      )}
      badNote="an Open button on each row"
    />
  ),
  "Edit and delete on the record's page": (
    <DoDont
      stack
      good={inCard(<TaskTable />)}
      bad={inCard(
        <TaskTable
          extra={(t) => (
            <span className="inline-flex">
              <IconButton label={`Edit ${t.name}`}>
                <PencilIcon />
              </IconButton>
              <IconButton label={`Delete ${t.name}`}>
                <Trash2Icon />
              </IconButton>
            </span>
          )}
        />
      )}
    />
  ),
  "Put the column headings right under the card header": (
    <DoDont
      stack
      good={inCard(<TaskTable />)}
      bad={inCard(
        <>
          <Separator />
          <TaskTable />
        </>
      )}
      badNote="a line between the title and the headings"
    />
  ),
  "Keep table rows plain": (
    <DoDont
      stack
      good={inCard(<TaskTable />)}
      bad={
        <Wide>
          <TitledCard title="Tasks" figure={count}>
            <div className="[&_tbody_tr:nth-child(odd)]:bg-muted">
              <TaskTable />
            </div>
          </TitledCard>
        </Wide>
      }
    />
  ),
  "Pair every color with a word or an icon": (
    <DoDont
      stack
      good={
        <div className="w-full max-w-xl">
          <TitledCard title="Prospects">
            <Deals signal="word" />
          </TitledCard>
        </div>
      }
      bad={
        <div className="w-full max-w-xl">
          <TitledCard title="Prospects">
            <Deals signal="color" />
          </TitledCard>
        </div>
      }
      badNote="a red or green number, with nothing saying what it means"
    />
  ),
  "Show contact details as plain text": (
    <DoDont
      stack
      good={
        <div className="w-full max-w-xl">
          <TitledCard title="Contacts">
            <Contacts links={false} />
          </TitledCard>
        </div>
      }
      bad={
        <div className="w-full max-w-xl">
          <TitledCard title="Contacts">
            <Contacts links />
          </TitledCard>
        </div>
      }
      badNote="a column of blue, underlined links"
    />
  ),
}
