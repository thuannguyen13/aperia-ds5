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

const count = (
  <span className="text-sm text-muted-foreground tabular-nums">3</span>
)

const DEALS = [
  {
    name: "Northwind Payments",
    stage: "Proposal",
    overdue: 3,
    volume: "$4.2M",
  },
  { name: "Blue Harbor Bank", stage: "Discovery", overdue: 0, volume: "$1.8M" },
  {
    name: "Cedar Credit Union",
    stage: "Negotiation",
    overdue: null,
    volume: "$650K",
  },
]

function Deals({ signal }: { signal: "word" | "colour" }) {
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

export const tableExamples = {
  "@intro": (
    <Example caption="Click a row, or Tab to it and press Enter: the whole row opens its record.">
      <div className="w-full max-w-xl">
        <TitledCard title="Prospects" figure={count}>
          <Deals signal="word" />
        </TitledCard>
      </div>
    </Example>
  ),
  "A row opens its record": (
    <DoDont
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
  "No line above the column headings": (
    <DoDont
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
  "No zebra stripes": (
    <DoDont
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
  "Colour isn't the only signal": (
    <DoDont
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
            <Deals signal="colour" />
          </TitledCard>
        </div>
      }
      badNote="a red or green number, with nothing saying what it means"
    />
  ),
  "Contact details are plain text": (
    <DoDont
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
