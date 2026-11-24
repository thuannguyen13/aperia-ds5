import { useState } from "react"
import { HistoryIcon, PencilIcon, Trash2Icon } from "lucide-react"
import {
  Button,
  EmptyState,
  ListToolbar,
  NoResults,
  RelativeTime,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  ToggleGroup,
  ToggleGroupItem,
  filterRows,
  opensOnClick,
  type FilterField,
  type FilterRule,
} from "aperia-ds5"
import { BeforeAfter, Screen } from "./before-after"

type Entry = {
  id: number
  at: string
  who: string
  record: "Opportunity" | "Prospect" | "Role"
  action: string
  sentence: string
  changes: string[]
  more: number
  /** The record still exists, so the row opens it. */
  exists: boolean
}

const hoursAgo = (hours: number) =>
  new Date(Date.now() - hours * 3_600_000).toISOString()

const ENTRIES: Entry[] = [
  {
    id: 1,
    at: hoursAgo(3),
    who: "Dana Whitfield",
    record: "Opportunity",
    action: "Changed stage",
    sentence: "Changed Northwind Payments to Proposal",
    changes: [
      "Stage: Demo → Proposal",
      "Expected Close: 12/15/2026 → 12/31/2026",
    ],
    more: 0,
    exists: true,
  },
  {
    id: 2,
    at: hoursAgo(20),
    who: "Sam Ortega",
    record: "Prospect",
    action: "Edited",
    sentence: "Edited Blue Harbor Bank",
    changes: [
      "Owner: Sam Ortega → Priya Nair",
      "Monthly Volume: $1,200,000 → $1,800,000",
    ],
    more: 3,
    exists: true,
  },
  {
    id: 3,
    at: hoursAgo(50),
    who: "Priya Nair",
    record: "Role",
    action: "Changed permission",
    sentence: "Changed Sales Rep permissions",
    changes: ["Prospects, View: All → Owned"],
    more: 0,
    exists: true,
  },
  {
    id: 4,
    at: hoursAgo(98),
    who: "Dana Whitfield",
    record: "Prospect",
    action: "Deleted",
    sentence: "Deleted Lumen Card Services",
    changes: [],
    more: 0,
    exists: false,
  },
]

const options = (values: string[]) =>
  [...new Set(values)].map((value) => ({ value, text: value }))

const FIELDS: FilterField<Entry>[] = [
  {
    id: "record",
    label: "Record",
    type: "enum",
    all: "All records",
    options: options(ENTRIES.map((entry) => entry.record)),
    read: (entry) => entry.record,
  },
  {
    id: "who",
    label: "Who",
    type: "enum",
    all: "Everyone",
    options: options(ENTRIES.map((entry) => entry.who)),
    read: (entry) => entry.who,
  },
  {
    id: "action",
    label: "Action",
    type: "enum",
    all: "All actions",
    options: options(ENTRIES.map((entry) => entry.action)),
    read: (entry) => entry.action,
  },
  {
    id: "day",
    label: "Day",
    type: "day",
    read: (entry) => entry.at.slice(0, 10),
  },
]

function What({ entry }: { entry: Entry }) {
  return (
    <>
      <span className="font-medium">{entry.sentence}</span>
      {(entry.changes.length > 0 || entry.more > 0) && (
        <ul className="mt-1 flex flex-col gap-0.5 text-xs text-muted-foreground">
          {entry.changes.map((change) => (
            <li key={change}>{change}</li>
          ))}
          {entry.more > 0 && <li>and {entry.more} more</li>}
        </ul>
      )}
    </>
  )
}

/** The Audit Log: search and filter it, open a row, or show it with nothing logged. */
export function AuditLogExample() {
  const [query, setQuery] = useState("")
  const [rules, setRules] = useState<FilterRule[]>([])
  const [logged, setLogged] = useState("some")
  const [opened, setOpened] = useState<string | null>(null)
  const entries = logged === "some" ? ENTRIES : []
  const rows = filterRows(
    entries.filter((entry) =>
      `${entry.sentence} ${entry.changes.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase())
    ),
    FIELDS,
    rules
  )
  return (
    <Screen
      controls={
        <>
          <span>Show</span>
          <ToggleGroup
            type="single"
            variant="outline"
            size="sm"
            aria-label="Entries"
            value={logged}
            onValueChange={(next) => next && setLogged(next)}
          >
            <ToggleGroupItem value="some">Entries</ToggleGroupItem>
            <ToggleGroupItem value="none">Nothing Logged</ToggleGroupItem>
          </ToggleGroup>
        </>
      }
      caption={
        opened
          ? `Opened ${opened}.`
          : "Search “Acme” to see the no-match state. A row opens its record, except the deleted prospect’s."
      }
    >
      {entries.length === 0 ? (
        <EmptyState icon={HistoryIcon} title="No Entries" className="surface" />
      ) : (
        <>
          <ListToolbar
            search={{
              placeholder: "Search the log",
              value: query,
              onChange: setQuery,
            }}
            filters={{
              fields: FIELDS,
              value: rules,
              onChange: setRules,
              form: "dropdowns",
            }}
            shown={rows.length}
            total={entries.length}
            noun={["entry", "entries"]}
          />
          {rows.length === 0 ? (
            <NoResults
              className="surface"
              onClear={() => {
                setQuery("")
                setRules([])
              }}
            />
          ) : (
            <div className="overflow-x-auto surface">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-4">When</TableHead>
                    <TableHead>Who</TableHead>
                    <TableHead className="pr-4">What</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((entry) => (
                    <TableRow
                      key={entry.id}
                      {...(entry.exists
                        ? opensOnClick(entry.sentence, () =>
                            setOpened(entry.sentence.replace(/^\S+ /, ""))
                          )
                        : {})}
                    >
                      <TableCell className="pl-4 align-top whitespace-nowrap text-muted-foreground">
                        <RelativeTime value={entry.at} />
                      </TableCell>
                      <TableCell className="align-top whitespace-nowrap">
                        {entry.who}
                      </TableCell>
                      <TableCell className="pr-4 align-top whitespace-normal">
                        <What entry={entry} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </>
      )}
    </Screen>
  )
}

/** A linked sentence, a full timestamp and Edit and Delete, against a row that opens and can only be read. */
export function AuditLogBeforeAfter() {
  const entry = ENTRIES[0]
  return (
    <BeforeAfter
      beforeNote="only the sentence links; a full timestamp; Edit and Delete on a log entry"
      afterNote="the whole row opens the record; “3h ago” with the exact time on hover; read-only"
      before={
        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-3">Timestamp</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="pr-3" />
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="pl-3 align-top tabular-nums">
                  2026-11-23 09:14:07 UTC
                </TableCell>
                <TableCell className="align-top whitespace-normal">
                  <a href="#audit" className="text-primary underline">
                    {entry.sentence}
                  </a>{" "}
                  by {entry.who}
                </TableCell>
                <TableCell className="pr-3 align-top">
                  <span className="flex gap-0.5">
                    <Button size="icon-xs" variant="ghost" aria-label="Edit">
                      <PencilIcon />
                    </Button>
                    <Button size="icon-xs" variant="ghost" aria-label="Delete">
                      <Trash2Icon />
                    </Button>
                  </span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      }
      after={
        <div className="overflow-x-auto surface">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-4">When</TableHead>
                <TableHead>Who</TableHead>
                <TableHead className="pr-4">What</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow {...opensOnClick(entry.sentence, () => {})}>
                <TableCell className="pl-4 align-top whitespace-nowrap text-muted-foreground">
                  <RelativeTime value={entry.at} />
                </TableCell>
                <TableCell className="align-top whitespace-nowrap">
                  {entry.who}
                </TableCell>
                <TableCell className="pr-4 align-top whitespace-normal">
                  <What entry={entry} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      }
    />
  )
}

export const auditLogExamples = {
  "How it looks and behaves": <AuditLogExample />,
  "Before and after": <AuditLogBeforeAfter />,
}
