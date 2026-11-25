import { useState } from "react"
import {
  moveItem,
  SortableList,
  SortableRow,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "aperia-ds5"
import { Anatomy } from "../anatomy"

// Reordering's anatomy: a pipeline's stages in a reorderable table, drawn inline since nothing opens a panel.

const STAGES = [
  { id: 1, name: "Lead", deals: 42 },
  { id: 2, name: "Discovery", deals: 18 },
  { id: 3, name: "Demo", deals: 11 },
  { id: 4, name: "Proposal", deals: 7 },
]

function Stages() {
  const [rows, setRows] = useState(STAGES)
  return (
    <div className="w-[28rem] overflow-hidden surface">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10" />
            <TableHead>Stage</TableHead>
            <TableHead className="text-right">Deals</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <SortableList
            ids={rows.map((row) => row.id)}
            name={(id) => rows.find((row) => row.id === id)?.name ?? "Row"}
            onMove={(from, to) => setRows((was) => moveItem(was, from, to))}
          >
            {rows.map((stage) => (
              <SortableRow key={stage.id} id={stage.id}>
                {(row, handle) => (
                  <TableRow {...row}>
                    <TableCell className="py-1 pl-2">
                      {handle(`Reorder ${stage.name}`)}
                    </TableCell>
                    <TableCell>{stage.name}</TableCell>
                    <TableCell className="text-right tabular-nums">
                      {stage.deals}
                    </TableCell>
                  </TableRow>
                )}
              </SortableRow>
            ))}
          </SortableList>
        </TableBody>
      </Table>
    </div>
  )
}

export const reorderingAnatomy = (
  <Anatomy
    targets={{
      1: { selector: "[data-slot=table-body]", side: "bottom" },
      2: {
        selector: "[data-slot=table-body] > [data-slot=table-row]:nth-child(3)",
        side: "right",
      },
      3: {
        selector:
          '[data-slot=table-body] > [data-slot=table-row]:nth-child(2) button[aria-label^="Reorder"]',
        side: "left",
      },
    }}
  >
    <Stages />
  </Anatomy>
)
