import { ChevronDownIcon } from "lucide-react"
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
import { IconButton, TableGroupRow } from "../recipes"
import { forceState, useForcedStates } from "../states"

// The Anatomy drawing of the Tables pattern page: a table of records as it sits on a list page, on its own surface.
// The part list lives in the page's Markdown; each part is marked in the order of that list.

const ROWS = [
  { name: "Northwind Payments", stage: "Proposal", volume: "$4,200,000" },
  { name: "Blue Harbor Bank", stage: "Discovery", volume: "$1,800,000" },
  { name: "Cedar Credit Union", stage: "Negotiation", volume: "$650,000" },
]

/** The first row shows its button as it does under the pointer; the other rows hold none. */
function TableDrawing() {
  useForcedStates()
  return (
    <div className="w-[40rem] max-w-full overflow-clip surface">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-4">Prospect</TableHead>
            <TableHead>Stage</TableHead>
            <TableHead className="pr-4 text-right">Monthly Volume</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableGroupRow colSpan={3} trailing="$6,650,000" className="pr-4">
            Texas
          </TableGroupRow>
          {ROWS.map((row, index) => (
            <TableRow
              key={row.name}
              {...opensOnClick(row.name, () => {})}
              {...(index === 0 ? forceState("hover") : {})}
            >
              <TableCell className="pl-4">{row.name}</TableCell>
              <TableCell>
                <span className="inline-flex items-center gap-1">
                  <Badge variant="outline">{row.stage}</Badge>
                  {index === 0 && (
                    <IconButton
                      label={`Change stage of ${row.name}`}
                      size="icon-xs"
                    >
                      <ChevronDownIcon />
                    </IconButton>
                  )}
                </span>
              </TableCell>
              <TableCell className="pr-4 text-right tabular-nums">
                {row.volume}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export const tablesAnatomy = (
  <Anatomy
    targets={{
      1: { selector: ".surface", side: "top" },
      2: { selector: "thead tr", side: "left" },
      3: { selector: "[data-slot=table-group-row]", side: "left" },
      4: {
        selector: "tbody tr:not([data-slot=table-group-row]):nth-child(3)",
        side: "left",
      },
      5: { selector: 'button[aria-label^="Change stage"]', side: "bottom" },
    }}
  >
    <TableDrawing />
  </Anatomy>
)
