import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  opensOnClick,
} from "aperia-ds5"
import { Anatomy } from "../anatomy"
import { StatusDot } from "../recipes"
import { AppStatusColors, STATES } from "./app-status"

// The Anatomy drawing of the Status pattern page: a table of prospects with a Stage column (plain badges), a Status
// column (colored badges in the app's status pairs, stood in for by brand.example.css), and an Import column (a dot
// and a word). The part list lives in the page's Markdown; each part is marked in its last row, in the order of that
// list.

const ROWS = [
  {
    name: "Northwind Payments",
    stage: "Proposal",
    state: "active",
    failed: "2 failed",
  },
  {
    name: "Blue Harbor Bank",
    stage: "Discovery",
    state: "review",
    failed: "No failures",
  },
  {
    name: "Cedar Credit Union",
    stage: "Negotiation",
    state: "overdue",
    failed: "5 failed",
  },
] as const

function StatusDrawing() {
  return (
    <div className="w-[44rem] max-w-full overflow-clip surface">
      <AppStatusColors />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-4">Prospect</TableHead>
            <TableHead>Stage</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="pr-4">Import</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ROWS.map((row) => (
            <TableRow key={row.name} {...opensOnClick(row.name, () => {})}>
              <TableCell className="pl-4">{row.name}</TableCell>
              <TableCell>
                <Badge variant="outline">{row.stage}</Badge>
              </TableCell>
              <TableCell>
                <Badge className={STATES[row.state].className}>
                  {STATES[row.state].label}
                </Badge>
              </TableCell>
              <TableCell className="pr-4">
                {row.failed === "No failures" ? (
                  row.failed
                ) : (
                  <StatusDot dot="bg-status-red-foreground">
                    {row.failed}
                  </StatusDot>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export const statusAnatomy = (
  <Anatomy
    targets={{
      1: {
        selector: "tbody tr:last-child [data-variant=outline]",
        side: "bottom",
      },
      2: {
        selector: "tbody tr:last-child [data-variant=default]",
        side: "bottom",
      },
      3: {
        selector: "tbody tr:last-child td:nth-child(4) > span",
        side: "bottom",
      },
    }}
  >
    <StatusDrawing />
  </Anatomy>
)
