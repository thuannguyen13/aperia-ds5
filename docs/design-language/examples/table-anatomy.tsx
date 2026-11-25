import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "aperia-ds5"
import { Anatomy } from "../anatomy"

// The Anatomy drawing of the Table component page: the building block alone, with its own parts. The part list lives in
// the page's Markdown; each part is marked in the order of that list.

const ITEMS = [
  { item: "Payment gateway", quantity: "12", amount: "$24,000" },
  { item: "Chargeback alerts", quantity: "12", amount: "$3,600" },
  { item: "Onboarding", quantity: null, amount: "$1,500" },
]

function TableDrawing() {
  return (
    <div className="w-[34rem] max-w-full">
      <Table>
        <TableCaption>Line items on opportunity #659</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Item</TableHead>
            <TableHead className="text-right">Quantity</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ITEMS.map((row) => (
            <TableRow key={row.item}>
              <TableCell>{row.item}</TableCell>
              <TableCell className="text-right tabular-nums">
                {row.quantity ?? (
                  <span className="text-muted-foreground">—</span>
                )}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {row.amount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell />
            <TableCell className="text-right tabular-nums">$29,100</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}

export const tableAnatomy = (
  <Anatomy
    targets={{
      1: { selector: "table", side: "top" },
      2: { selector: "thead tr", side: "left" },
      3: { selector: "tbody tr:nth-child(2)", side: "left" },
      4: { selector: "tbody tr:nth-child(2) td:nth-child(3)", side: "right" },
      5: { selector: "tfoot", side: "left" },
      6: { selector: "caption", side: "right" },
    }}
  >
    <TableDrawing />
  </Anatomy>
)
