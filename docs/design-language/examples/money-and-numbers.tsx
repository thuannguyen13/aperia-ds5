import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "aperia-ds5"
import { money } from "aperia-ds5/format"
import { DoDont } from "../blocks"
import { MoneyValue } from "../recipes"

// Live Do / Don't pairs for the Money and Numbers page, keyed by the rule's heading.

const ROWS = [
  { name: "Harbor Payments", value: 48500 },
  { name: "First National", value: 1840000 },
]

export const moneyAndNumbersExamples = {
  "Line numbers up": (
    <DoDont
      stack
      good={
        <div className="w-72">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Merchant</TableHead>
                <TableHead className="text-right">Volume</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ROWS.map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell className="text-right">
                    <MoneyValue value={row.value} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      }
      bad={
        <div className="w-72">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Merchant</TableHead>
                <TableHead>Volume</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ROWS.map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{money(row.value)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      }
    />
  ),
  "Write a negative amount in parentheses": (
    <DoDont
      good={
        <span className="text-sm">
          Balance: <MoneyValue value={-125.5} />
        </span>
      }
      bad={
        <span className="text-sm">
          Balance:{" "}
          <span className="text-destructive tabular-nums">-$125.50</span>
        </span>
      }
    />
  ),
}
